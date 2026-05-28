import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import HeroAvatar from './HeroAvatar'
import { useParallax } from './HeroParallaxContext'
import {
  PARALLAX,
  SLIDE_DURATION,
  SLIDE_EASE_IN,
  SLIDE_EASE_OUT,
  TILE_CONFIG,
  TITLE_FADE_IN_DELAY_MS,
  TITLE_FADE_IN_DURATION,
} from './heroConstants'

// One tile of the hero (centerpiece or thumbnail).
//
// Slide-over mechanics: outer slot is the parallax wrapper. Inner .hero-tile
// is the static photo clipper (overflow:hidden). Photo layers are absolutely
// positioned children. On phase change a new PhotoLayer is pushed; after the
// slide completes the outgoing layer is removed from the DOM. Direction is
// per-role (Hero.md §7).
//
// Props use phaseId (stable string) for change detection so callers may
// freely pass derived content/title objects without triggering phantom
// transitions on every render.

export default function HeroPhaseTile({ role, phaseId, content, title, dateRange, avatar }) {
  const tileConfig = TILE_CONFIG[role]
  const slotRef = useParallax(PARALLAX.tile[role])
  const [layers, setLayers] = useState(() => [{ id: 0, content }])
  const layerCounterRef = useRef(0)
  const prevPhaseIdRef = useRef(phaseId)

  useEffect(() => {
    if (prevPhaseIdRef.current === phaseId) return
    prevPhaseIdRef.current = phaseId

    const delay = tileConfig.delayMs
    const newId = ++layerCounterRef.current

    const addTimer = setTimeout(() => {
      setLayers((curr) => [{ id: newId, content }, ...curr])
    }, delay)

    const cleanupTimer = setTimeout(
      () => {
        setLayers((curr) => curr.filter((l) => l.id === newId))
      },
      delay + SLIDE_DURATION * 1000 + 100,
    )

    return () => {
      clearTimeout(addTimer)
      clearTimeout(cleanupTimer)
    }
  }, [phaseId, content, tileConfig.delayMs])

  const isCenterpiece = role === 'centerpiece'

  return (
    <div ref={slotRef} className="hero-tile-slot" data-role={role}>
      <div className="hero-tile">
        {layers.map((layer, idx) => (
          <PhotoLayer
            key={layer.id}
            content={layer.content}
            direction={tileConfig.direction}
            isEntering={idx === 0 && layers.length > 1}
            isExiting={idx > 0}
          />
        ))}
        {isCenterpiece && (
          <CenterpieceCaption title={title} dateRange={dateRange} phaseId={phaseId} />
        )}
      </div>
      {!isCenterpiece && avatar && (
        <HeroAvatar avatar={avatar} side={role === 'thumb-right' ? 'right' : 'left'} />
      )}
    </div>
  )
}

function PhotoLayer({ content, direction, isEntering, isExiting }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (isEntering) {
      const start = getSlideStart(direction)
      gsap.fromTo(
        el,
        { xPercent: start.x, yPercent: start.y },
        { xPercent: 0, yPercent: 0, duration: SLIDE_DURATION, ease: SLIDE_EASE_OUT },
      )
    } else if (isExiting) {
      const end = getSlideEnd(direction)
      gsap.to(el, {
        xPercent: end.x,
        yPercent: end.y,
        duration: SLIDE_DURATION,
        ease: SLIDE_EASE_IN,
      })
    }
  }, [isEntering, isExiting, direction])

  const style = content.src
    ? { backgroundImage: `url(${content.src})` }
    : { backgroundColor: content.stubColor }

  return <div ref={ref} className="hero-photo-layer" style={style} />
}

function CenterpieceCaption({ title, dateRange, phaseId }) {
  const ref = useRef(null)
  const [displayed, setDisplayed] = useState({ title, dateRange })
  const prevPhaseIdRef = useRef(phaseId)

  useEffect(() => {
    if (phaseId === prevPhaseIdRef.current) return
    prevPhaseIdRef.current = phaseId

    const el = ref.current
    if (!el) return

    const tl = gsap.timeline()
    tl.to(el, { opacity: 0, y: 6, duration: 0.15, ease: 'power2.in' })
      .call(() => setDisplayed({ title, dateRange }))
      .to(
        el,
        { opacity: 1, y: 0, duration: TITLE_FADE_IN_DURATION, ease: 'power2.out' },
        `+=${TITLE_FADE_IN_DELAY_MS / 1000}`,
      )

    return () => tl.kill()
  }, [title, dateRange, phaseId])

  return (
    <div ref={ref} className="hero-tile-caption">
      <div className="hero-tile-title">{displayed.title}</div>
      {displayed.dateRange && (
        <div className="hero-tile-date">{displayed.dateRange}</div>
      )}
    </div>
  )
}

function getSlideStart(direction) {
  switch (direction) {
    case 'up':
      return { x: 0, y: 100 }
    case 'left':
      return { x: 100, y: 0 }
    case 'right':
      return { x: -100, y: 0 }
    default:
      return { x: 0, y: 0 }
  }
}

function getSlideEnd(direction) {
  switch (direction) {
    case 'up':
      return { x: 0, y: -100 }
    case 'left':
      return { x: -100, y: 0 }
    case 'right':
      return { x: 100, y: 0 }
    default:
      return { x: 0, y: 0 }
  }
}
