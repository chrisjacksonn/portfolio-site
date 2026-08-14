// Two fixes to what mermaid-cli emits, both needed for the zoomable overlay.
//
// 1. The root is width="100%" with no height. Loaded through an <img> that
//    gives the SVG no intrinsic size, so the browser falls back to the default
//    300x150 replaced-element box and naturalWidth reports 300.
// 2. The root carries an inline max-width equal to the diagram's natural width.
//    Inside an <img> that caps the used width at 1:1, so magnifying past 100%
//    silently does nothing however wide the element is told to be.
//
// Both transforms are idempotent, so re-running is safe.
import { readFileSync, writeFileSync } from 'node:fs'

const files = [
  'public/images/shopify-architecture.svg',
  'public/images/shopify-invariants.svg'
]

for (const file of files) {
  const original = readFileSync(file, 'utf8')
  const viewBox = original.match(/viewBox="([\d.\-\s]+)"/)

  if (!viewBox) {
    console.error(`${file}: no viewBox found, skipped`)
    continue
  }

  const [, , width, height] = viewBox[1].trim().split(/\s+/).map(Number)
  const w = Math.ceil(width)
  const h = Math.ceil(height)

  let svg = original
  const notes = []

  if (svg.includes('width="100%"')) {
    svg = svg.replace('width="100%"', `width="${w}" height="${h}"`)
    notes.push(`sized ${w}x${h}`)
  }

  // Only the root element's max-width, left in place anywhere else
  const root = svg.slice(0, svg.indexOf('>') + 1)
  if (/max-width:\s*[\d.]+px;?\s*/.test(root)) {
    svg = svg.replace(root, root.replace(/max-width:\s*[\d.]+px;?\s*/, ''))
    notes.push('removed root max-width cap')
  }

  if (!notes.length) {
    console.log(`${file}: already patched`)
    continue
  }

  writeFileSync(file, svg)
  console.log(`${file}: ${notes.join(', ')}`)
}
