import { useMemo } from 'react'
import { useParallax } from './HeroParallaxContext'
import { HERO_BG_LAYERS } from '@/data/heroPhases'
import { PARALLAX } from './heroConstants'

// Blurred parallax photo shapes at three depth tiers. Stub stage: flat
// pastel rectangles. Once real images land, each shape gets a pre-blurred
// background-image. See Hero.md §6.

const BG_PARALLAX_BY_ID = {
  back: PARALLAX.bgBack,
  mid: PARALLAX.bgMid,
  front: PARALLAX.bgFront,
}

// Stratified placement: split the hero into a 4×3 grid (12 cells) and assign
// each shape to a different cell, visited in a scattered order so neighbouring
// shapes (e.g. multiple back-layer shapes) don't land in adjacent cells.
// Within its cell each shape gets deterministic jitter so the layout never
// reads as a grid.
const CELL_COLS = 4
const CELL_ROWS = 3
const CELL_SEQUENCE = [0, 7, 2, 9, 5, 11, 1, 8, 3, 6, 4, 10]
const JITTER = 0.7 // 0..1 — fraction of cell size the shape can drift within

export default function HeroBackground() {
  const shapes = useMemo(() => {
    const out = []
    const cellW = 100 / CELL_COLS
    const cellH = 100 / CELL_ROWS
    let shapeIdx = 0
    HERO_BG_LAYERS.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const seed = (layer.id.charCodeAt(0) + i * 17) % 100
        const cellIndex = CELL_SEQUENCE[shapeIdx % CELL_SEQUENCE.length]
        shapeIdx++
        const cellRow = Math.floor(cellIndex / CELL_COLS)
        const cellCol = cellIndex % CELL_COLS
        // Jitter -0.5..0.5 from the cell's center, scaled by JITTER.
        const jx = ((seed * 7) % 100) / 100 - 0.5
        const jy = ((seed * 13) % 100) / 100 - 0.5
        const top = cellRow * cellH + cellH * (0.5 + jy * JITTER)
        const left = cellCol * cellW + cellW * (0.5 + jx * JITTER)
        const size = 80 + ((seed * 11) % 140)
        const isPortrait = seed % 10 < 4 // ~40% portrait
        const width = isPortrait ? size * 0.75 : size
        const height = isPortrait ? size : size * 0.75
        const opacity =
          layer.opacityRange[0] +
          (((seed * 23) % 100) / 100) * (layer.opacityRange[1] - layer.opacityRange[0])
        const color = layer.stubColors[i % layer.stubColors.length]
        out.push({
          id: `${layer.id}-${i}`,
          layerId: layer.id,
          top: `${top}%`,
          left: `${left}%`,
          width,
          height,
          opacity,
          color,
        })
      }
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
  const ref = useParallax(BG_PARALLAX_BY_ID[shape.layerId])
  return (
    <div
      ref={ref}
      className="hero-bg-shape"
      style={{
        top: shape.top,
        left: shape.left,
        width: `${shape.width}px`,
        height: `${shape.height}px`,
        backgroundColor: shape.color,
        opacity: shape.opacity,
      }}
    />
  )
}
