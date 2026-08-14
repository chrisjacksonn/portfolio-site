import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const ZOOM_STEP = 1.5
// 1 means one image pixel per screen pixel, which is already fully legible for
// these diagrams. Going past it means rasterizing a 12000px-wide SVG, which
// locks up the renderer for long enough to feel broken.
const MAX_SCALE = 1

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

// Wheel deltas arrive in pixels, lines or pages depending on the device
const deltaToPixels = (event) => {
  if (event.deltaMode === 1) return event.deltaY * 16
  if (event.deltaMode === 2) return event.deltaY * 100
  return event.deltaY
}

// A wide architecture diagram. Too detailed to read at column width, so the
// inline version is a preview and the real reading happens in the overlay,
// where it can be magnified, scrolled and dragged around.
const DiagramFigure = ({ src, alt, caption }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [natural, setNatural] = useState(null)
  // scale is absolute: 1 means one image pixel per screen pixel
  const [scale, setScale] = useState(null)
  const [fitScale, setFitScale] = useState(null)
  const [isPanning, setIsPanning] = useState(false)
  const scrollRef = useRef(null)
  const imageRef = useRef(null)
  const anchorRef = useRef(null)
  const dragRef = useRef(null)
  // Survives past pointerup so the click that follows can tell a real click
  // from the tail end of a pan
  const movedRef = useRef(false)

  // Close on Escape, and keep the page behind the overlay from scrolling
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  // Work out the scale that fits the whole diagram on screen. That doubles as
  // the zoom-out floor, so you can never shrink it past fully visible.
  useLayoutEffect(() => {
    if (!isOpen || !natural) return
    const measure = () => {
      const el = scrollRef.current
      if (!el) return
      const padding = 40
      const fit = Math.min(
        (el.clientWidth - padding) / natural.width,
        (el.clientHeight - padding) / natural.height,
        1
      )
      setFitScale(fit)
      setScale((current) => (current === null ? fit : clamp(current, fit, MAX_SCALE)))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [isOpen, natural])

  // Zoom while holding one point of the diagram still under the cursor. The
  // buttons pass no coordinates and pivot around the middle of the view.
  const zoomBy = useCallback((factor, clientX, clientY) => {
    const el = scrollRef.current
    const img = imageRef.current
    if (!el || !img || scale === null || fitScale === null) return

    const next = clamp(scale * factor, fitScale, MAX_SCALE)
    if (next === scale) return

    const imageRect = img.getBoundingClientRect()
    const boxRect = el.getBoundingClientRect()
    const pivotX = clientX ?? boxRect.left + boxRect.width / 2
    const pivotY = clientY ?? boxRect.top + boxRect.height / 2

    anchorRef.current = {
      fx: clamp((pivotX - imageRect.left) / imageRect.width, 0, 1),
      fy: clamp((pivotY - imageRect.top) / imageRect.height, 0, 1),
      pivotX,
      pivotY
    }
    setScale(next)
  }, [scale, fitScale])

  // Put the anchored point back under the cursor once the new size is laid out
  useLayoutEffect(() => {
    const el = scrollRef.current
    const img = imageRef.current
    const anchor = anchorRef.current
    anchorRef.current = null
    if (!el || !img || !anchor) return
    const boxRect = el.getBoundingClientRect()
    el.scrollLeft = img.offsetLeft + anchor.fx * img.offsetWidth - (anchor.pivotX - boxRect.left)
    el.scrollTop = img.offsetTop + anchor.fy * img.offsetHeight - (anchor.pivotY - boxRect.top)
  }, [scale])

  // Native listener rather than onWheel: React attaches wheel handlers
  // passively, so preventDefault there is ignored and the page scrolls anyway
  useEffect(() => {
    const el = scrollRef.current
    if (!isOpen || !el) return
    const handleWheel = (e) => {
      e.preventDefault()
      // Exponential so each notch is a constant ratio, and trackpad pinch
      // (which arrives as ctrl + wheel) lands on the same curve
      zoomBy(Math.exp(-deltaToPixels(e) * 0.0015), e.clientX, e.clientY)
    }
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [isOpen, zoomBy])

  const canZoomIn = scale !== null && scale < MAX_SCALE - 0.001
  const canZoomOut = scale !== null && fitScale !== null && scale > fitScale + 0.001

  // Grab anywhere on the diagram to pan it, or click without moving to zoom.
  // Panning is mouse only: touch devices already pan natively, and hijacking
  // that would cost momentum scrolling. Tapping to zoom still works on touch.
  const handlePointerDown = (e) => {
    const el = scrollRef.current
    if (!el || e.button !== 0) return
    movedRef.current = false
    const canPan =
      e.pointerType === 'mouse' &&
      (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight)

    dragRef.current = {
      pointerId: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      left: el.scrollLeft,
      top: el.scrollTop,
      moved: false,
      canPan,
      onImage: e.target === imageRef.current
    }

    if (!canPan) return
    // Capture keeps the pan alive if the cursor leaves the overlay mid-drag.
    // Not essential, so never let it take the drag down with it.
    try {
      el.setPointerCapture(e.pointerId)
    } catch {
      // no capture available; dragging still works inside the element
    }
    setIsPanning(true)
  }

  const handlePointerMove = (e) => {
    const el = scrollRef.current
    const drag = dragRef.current
    if (!el || !drag) return
    const dx = e.clientX - drag.x
    const dy = e.clientY - drag.y
    // Past this much travel it was a drag, not a click, so releasing must not
    // also zoom. Small enough that a steady hand still registers as a click.
    if (!drag.moved && Math.hypot(dx, dy) > 4) drag.moved = true
    if (!drag.canPan) return
    el.scrollLeft = drag.left - dx
    el.scrollTop = drag.top - dy
  }

  const handlePointerUp = (e) => {
    const el = scrollRef.current
    const drag = dragRef.current
    if (!drag) return
    if (el && el.hasPointerCapture(drag.pointerId)) {
      try {
        el.releasePointerCapture(drag.pointerId)
      } catch {
        // already released
      }
    }
    dragRef.current = null
    setIsPanning(false)
    movedRef.current = drag.moved

    if (drag.moved || !drag.onImage) return
    // A click only ever steps in toward the cursor. At full zoom it does
    // nothing: zooming back out is the button's job, so a stray click can
    // never throw away the position you worked to find.
    if (canZoomIn) zoomBy(ZOOM_STEP, e.clientX, e.clientY)
  }

  // Clicking the space around the diagram closes it. Guarded on movement so
  // that releasing a pan out over the backdrop doesn't dismiss the overlay.
  const handleBackdropClick = (e) => {
    e.stopPropagation()
    if (e.target === imageRef.current || movedRef.current) return
    setIsOpen(false)
  }

  const open = () => {
    setScale(null)
    setFitScale(null)
    setIsOpen(true)
  }

  return (
    <>
      <figure className="diagram-figure">
        <button
          type="button"
          className="diagram-preview"
          onClick={open}
          aria-label={`Expand diagram: ${alt}`}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={(e) => setNatural({ width: e.target.naturalWidth, height: e.target.naturalHeight })}
          />
          <span className="diagram-expand-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L19,20.5L20.5,19L15.5,14M9.5,14C7,14 5,12 5,9.5C5,7 7,5 9.5,5C12,5 14,7 14,9.5C14,12 12,14 9.5,14M12,10H10V12H9V10H7V9H9V7H10V9H12V10Z" />
            </svg>
            Click to expand
          </span>
        </button>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>

      {isOpen && (
        <div
          className="diagram-overlay"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <div className="diagram-overlay-bar" onClick={(e) => e.stopPropagation()}>
            <span className="diagram-overlay-title">{alt}</span>
            <div className="diagram-overlay-actions">
              <button
                type="button"
                className="diagram-icon-button"
                onClick={() => zoomBy(1 / ZOOM_STEP)}
                disabled={!canZoomOut}
                aria-label="Zoom out"
                title="Zoom out"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L19,20.5L20.5,19L15.5,14M9.5,14C7,14 5,12 5,9.5C5,7 7,5 9.5,5C12,5 14,7 14,9.5C14,12 12,14 9.5,14M7,9H12V10H7V9Z" />
                </svg>
              </button>
              <button
                type="button"
                className="diagram-icon-button"
                onClick={() => zoomBy(ZOOM_STEP)}
                disabled={!canZoomIn}
                aria-label="Zoom in"
                title="Zoom in"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L19,20.5L20.5,19L15.5,14M9.5,14C7,14 5,12 5,9.5C5,7 7,5 9.5,5C12,5 14,7 14,9.5C14,12 12,14 9.5,14M12,10H10V12H9V10H7V9H9V7H10V9H12V10Z" />
                </svg>
              </button>
              <button
                type="button"
                className="diagram-icon-button diagram-overlay-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close diagram"
                title="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className={`diagram-overlay-scroll ${canZoomIn ? 'is-zoomable' : ''} ${canZoomOut ? 'is-pannable' : ''} ${isPanning ? 'is-panning' : ''}`}
            ref={scrollRef}
            onClick={handleBackdropClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <img
              ref={imageRef}
              src={src}
              alt={alt}
              draggable={false}
              style={natural && scale ? { width: `${Math.round(natural.width * scale)}px` } : { visibility: 'hidden' }}
              onLoad={(e) => setNatural({ width: e.target.naturalWidth, height: e.target.naturalHeight })}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default DiagramFigure
