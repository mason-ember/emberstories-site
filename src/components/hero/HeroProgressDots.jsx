import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PHASE_DURATION_MS } from './heroConstants'
import { PHASE_ORDER } from '@/data/heroPhases'

// Three-dot progress indicator. Active dot is elongated and fills over the
// phase duration (Instagram-Stories pattern). Click a dot to jump phases.
// Hover anywhere on the centerpiece pauses; the pause is handled upstream
// in Hero.jsx and passed in via `isPaused`. See Hero.md §8.

export default function HeroProgressDots({ phaseIndex, isPaused, onJump }) {
  const fillRefs = useRef([])
  const tweenRef = useRef(null)

  // (Re)start fill whenever phase changes.
  useEffect(() => {
    if (tweenRef.current) {
      tweenRef.current.kill()
      tweenRef.current = null
    }
    fillRefs.current.forEach((el) => {
      if (el) gsap.set(el, { width: '0%' })
    })
    const activeFill = fillRefs.current[phaseIndex]
    if (!activeFill) return

    tweenRef.current = gsap.to(activeFill, {
      width: '100%',
      duration: PHASE_DURATION_MS / 1000,
      ease: 'none',
    })

    if (isPaused) tweenRef.current.pause()

    return () => {
      if (tweenRef.current) tweenRef.current.kill()
    }
    // intentionally not depending on isPaused; pause/resume handled below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseIndex])

  useEffect(() => {
    if (!tweenRef.current) return
    if (isPaused) tweenRef.current.pause()
    else tweenRef.current.resume()
  }, [isPaused])

  return (
    <div className="hero-dots" role="tablist" aria-label="Hero stories">
      {PHASE_ORDER.map((id, i) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={i === phaseIndex}
          aria-label={`Show ${id} story`}
          className={`hero-dot ${i === phaseIndex ? 'active' : ''}`}
          onClick={() => onJump(i)}
        >
          <span
            ref={(el) => {
              fillRefs.current[i] = el
            }}
            className="hero-dot-fill"
          />
        </button>
      ))}
    </div>
  )
}
