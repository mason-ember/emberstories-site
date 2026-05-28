import { useMemo } from 'react'
import { useParallax } from './HeroParallaxContext'
import { useScrollParallax } from './HeroScrollParallaxContext'
import { HERO_BG_LAYERS } from '@/data/heroPhases'
import { BG_SCROLL_PARALLAX, PARALLAX } from './heroConstants'

// Blurred parallax photo shapes at three depth tiers. Each shape responds
// to BOTH mouse and scroll, composed via the wrapper-div pattern:
//   .hero-bg-shape-slot   ← scroll-parallax target (owns position)
//     .hero-bg-shape       ← mouse-parallax target (owns image)
// See Hero.md §6.

const BG_PARALLAX_BY_ID = {
  back: PARALLAX.bgBack,
  mid: PARALLAX.bgMid,
  front: PARALLAX.bgFront,
}

const BG_SCROLL_BY_ID = {
  back: BG_SCROLL_PARALLAX.bgBack,
  mid: BG_SCROLL_PARALLAX.bgMid,
  front: BG_SCROLL_PARALLAX.bgFront,
}

// Stratified placement: split the hero into a 4×3 grid (12 cells) and assign
// each shape to a different cell, visited in a scattered order so neighbouring
// shapes (e.g. multiple back-layer shapes) don't land in adjacent cells.
// Within its cell each shape gets deterministic jitter so the layout never
// reads as a grid.
const CELL_COLS = 4
const CELL_ROWS = 3
// Index 9 → front-03 (the portrait front-layer shape). Routed to cell 4
// (middle row, leftmost column) so it stays clear of the bottom-right
// thumbnail's footprint.
const CELL_SEQUENCE = [0, 7, 2, 9, 5, 11, 1, 8, 3, 4, 6, 10]
const JITTER = 0.7 // 0..1 — fraction of cell size the shape can drift within

export default function HeroBackground() {
  const shapes = useMemo(() => {
    const out = []
    const cellW = 100 / CELL_COLS
    const cellH = 100 / CELL_ROWS
    let shapeIdx = 0
    HERO_BG_LAYERS.forEach((layer) => {
      layer.shapes.forEach((shapeData, i) => {
        const seed = (layer.id.charCodeAt(0) + i * 17) % 100
        const cellIndex = CELL_SEQUENCE[shapeIdx % CELL_SEQUENCE.length]
        shapeIdx++
        const cellRow = Math.floor(cellIndex / CELL_COLS)
        const cellCol = cellIndex % CELL_COLS
        // Jitter -0.5..0.5 from the cell's center, scaled by JITTER.
        const jx = ((seed * 7) % 100) / 100 - 0.5
        const jy = ((seed * 13) % 100) / 100 - 0.5
        // Per-shape position override (e.g. `position: { top: '0.7%', left: '62%' }`)
        // skips the cell + jitter computation. Useful for hand-placing
        // individual shapes that the grid layout doesn't get quite right.
        const top = shapeData.position?.top
          ?? `${cellRow * cellH + cellH * (0.5 + jy * JITTER)}%`
        const left = shapeData.position?.left
          ?? `${cellCol * cellW + cellW * (0.5 + jx * JITTER)}%`
        const size = 80 + ((seed * 11) % 140)
        const isPortrait = shapeData.isPortrait
        const width = isPortrait ? size * 0.75 : size
        const height = isPortrait ? size : size * 0.75
        const opacity =
          layer.opacityRange[0] +
          (((seed * 23) % 100) / 100) * (layer.opacityRange[1] - layer.opacityRange[0])
        const fallbackColor = layer.stubColors[i % layer.stubColors.length]
        out.push({
          id: `${layer.id}-${i}`,
          layerId: layer.id,
          top,
          left,
          width,
          height,
          opacity,
          src: shapeData.src,
          fallbackColor,
        })
      })
    })
    return out
  }, [])

  return (
    <div className="hero-bg" aria-hidden="true">
      {shapes.map((shape) => (
        <BgShape key={shape.id} shape={shape} />
      ))}
    </div>
  )
}

function BgShape({ shape }) {
  const scrollRef = useScrollParallax(BG_SCROLL_BY_ID[shape.layerId])
  const mouseRef = useParallax(BG_PARALLAX_BY_ID[shape.layerId])

  const slotStyle = {
    top: shape.top,
    left: shape.left,
    width: `${shape.width}px`,
    height: `${shape.height}px`,
    opacity: shape.opacity,
  }

  const innerStyle = {}
  if (shape.src) {
    innerStyle.backgroundImage = `url(${shape.src})`
    innerStyle.backgroundSize = 'contain'
    innerStyle.backgroundRepeat = 'no-repeat'
    innerStyle.backgroundPosition = 'center'
  } else {
    innerStyle.backgroundColor = shape.fallbackColor
  }

  return (
    <div ref={scrollRef} className="hero-bg-shape-slot" style={slotStyle}>
      <div
        ref={mouseRef}
        className="hero-bg-shape"
        data-has-image={shape.src ? 'true' : 'false'}
        style={innerStyle}
      />
    </div>
  )
}
