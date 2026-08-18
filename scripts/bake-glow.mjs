// Bakes the coloured glow into a detail image's pixels.
//
// The five floating detail images carry their glow in the webp itself rather
// than in CSS, because iOS Safari renders `filter: drop-shadow` on an alpha
// webp as a rectangle. A plain png -> webp conversion therefore silently ships
// an image with no glow, and the container widths in style.css assume the glow
// margin is inside the canvas.
//
// Usage (sharp is not a project dependency, install it ad hoc):
//   npm i --no-save sharp
//   node scripts/bake-glow.mjs encore path/to/source.png public/images/EncoreDesk.webp
//
// GOTCHA, do not "simplify" the loop below: sharp applies chained operations in
// its own fixed order rather than call order, so
// `.extractChannel(3).blur().linear(opacity, 0)` applies the opacity to the
// colour channels before the alpha is ever extracted, and every layer comes out
// at full strength. Materialise a buffer between each step and do the opacity
// multiply on the raw mask bytes, as here.
import sharp from 'sharp'

// [imageWidth, cssWidth, colour, [[cssRadius, opacity], ...]]
const RECIPES = {
  // Verified against this script (Aug 2026).
  encore: [1800, 940, { r: 64, g: 142, b: 150 }, [[20, 0.40], [45, 0.25]]],
  // Transcribed from the original bake, not re-verified against this script.
  qquote: [1600, 740, { r: 218, g: 108, b: 53 }, [[18, 0.50], [36, 0.35], [70, 0.24]]],
  watai: [2000, 950, { r: 255, g: 206, b: 26 }, [[18, 0.45], [36, 0.30], [70, 0.20]]],
  aeon: [2400, 1200, { r: 134, g: 100, b: 225 }, [[18, 0.75], [36, 0.55], [70, 0.38]]],
  // Shopify's live file is a legacy full-strength bake that was approved as-is.
  shopify: [1600, 700, { r: 47, g: 107, b: 74 }, [[18, 1], [36, 1], [70, 1]]]
}

const [name, src, out] = process.argv.slice(2)
const recipe = RECIPES[name]
if (!recipe || !src || !out) {
  console.error('usage: node scripts/bake-glow.mjs <' + Object.keys(RECIPES).join('|') + '> <source.png> <out.webp>')
  process.exit(1)
}

const [IMG_W, CSS_W, COLOR, LAYERS] = recipe
const scale = IMG_W / CSS_W
const sigmas = LAYERS.map(([cssRadius]) => (cssRadius * scale) / 2)
const margin = Math.round(2.2 * Math.max(...sigmas))

const base = await sharp(src)
  .trim()
  .resize({ width: IMG_W })
  .extend({ top: margin, bottom: margin, left: margin, right: margin,
            background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()

const { width: W, height: H } = await sharp(base).metadata()

const layers = []
for (let i = 0; i < LAYERS.length; i++) {
  const opacity = LAYERS[i][1]
  const alpha = await sharp(base).extractChannel(3).png().toBuffer()
  const { data, info } = await sharp(alpha).blur(sigmas[i]).raw().toBuffer({ resolveWithObject: true })
  const px = info.width * info.height
  const mask = Buffer.alloc(px)
  // index by info.channels: a greyscale image can decode as 3 channels
  for (let p = 0; p < px; p++) mask[p] = Math.round(data[p * info.channels] * opacity)
  const layer = await sharp({ create: { width: info.width, height: info.height, channels: 3, background: COLOR } })
    .joinChannel(mask, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toBuffer()
  layers.push({ sigma: sigmas[i], layer })
}

// widest blur on the bottom, tighter above it, artwork on top
const ordered = layers.sort((a, b) => b.sigma - a.sigma).map((l) => ({ input: l.layer }))
await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([...ordered, { input: base }])
  .webp({ quality: 90 })
  .toFile(out)

console.log(`${name}: ${W}x${H} canvas, margin ${margin}px, sigmas ${sigmas.map((s) => s.toFixed(1)).join('/')} -> ${out}`)
