import { useCallback, useEffect, useReducer, useRef } from 'react'
import HeroBackground from './HeroBackground'
import HeroHeadline, { HeroCTA } from './HeroHeadline'
import HeroPhaseTile from './HeroPhaseTile'
import HeroProgressDots from './HeroProgressDots'
import HeroStickers from './HeroStickers'
import { HeroParallaxProvider } from './HeroParallaxContext'
import { HeroScrollParallaxProvider } from './HeroScrollParallaxContext'
import { PHASE_DURATION_MS } from './heroConstants'
import { HERO_PHASES, PHASE_ORDER } from '@/data/heroPhases'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import './hero.css'

// Hero orchestrator.
//
// Owns:
//   - phase state machine (useReducer)
//   - auto-advance timer with pause/resume preserving elapsed time
//   - hover-to-pause and touch swipe (left/right)
//   - mouse-parallax registry (via HeroParallaxProvider)
//
// Reduced-motion seam is wired (usePrefersReducedMotion) but the policy
// is deferred per Hero.md §10.

const SWIPE_THRESHOLD_PX = 50

function initState() {
  return {
    phaseIndex: 0,
    phaseStartedAt: Date.now(),
    accumulatedElapsed: 0,
    isPaused: false,
  }
}

function phaseReducer(state, action) {
  switch (action.type) {
    case 'ADVANCE': {
      const next = (state.phaseIndex + 1) % PHASE_ORDER.length
      return { ...state, phaseIndex: next, phaseStartedAt: Date.now(), accumulatedElapsed: 0 }
    }
    case 'JUMP_TO': {
      if (action.index === state.phaseIndex) return state
      return {
        ...state,
        phaseIndex: action.index,
        phaseStartedAt: Date.now(),
        accumulatedElapsed: 0,
      }
    }
    case 'STEP': {
      const len = PHASE_ORDER.length
      const next = (state.phaseIndex + action.delta + len) % len
      return { ...state, phaseIndex: next, phaseStartedAt: Date.now(), accumulatedElapsed: 0 }
    }
    case 'PAUSE': {
      if (state.isPaused) return state
      return {
        ...state,
        isPaused: true,
        accumulatedElapsed: state.accumulatedElapsed + (Date.now() - state.phaseStartedAt),
      }
    }
    case 'RESUME': {
      if (!state.isPaused) return state
      return { ...state, isPaused: false, phaseStartedAt: Date.now() }
    }
    default:
      return state
  }
}

export default function Hero() {
  const heroRef = useRef(null)
  const [state, dispatch] = useReducer(phaseReducer, undefined, initState)
  const reduced = usePrefersReducedMotion()

  // Auto-advance timer, paused-aware.
  useEffect(() => {
    if (state.isPaused) return
    const elapsed = state.accumulatedElapsed + (Date.now() - state.phaseStartedAt)
    const remaining = Math.max(0, PHASE_DURATION_MS - elapsed)
    const timer = setTimeout(() => dispatch({ type: 'ADVANCE' }), remaining)
    return () => clearTimeout(timer)
  }, [state.isPaused, state.phaseIndex, state.phaseStartedAt, state.accumulatedElapsed])

  // Swipe (touch). Threshold on horizontal delta only.
  const touchStartRef = useRef({ x: 0, y: 0 })
  const onTouchStart = useCallback((e) => {
    const t = e.changedTouches[0]
    touchStartRef.current = { x: t.clientX, y: t.clientY }
  }, [])
  const onTouchEnd = useCallback((e) => {
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStartRef.current.x
    const dy = t.clientY - touchStartRef.current.y
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return
    dispatch({ type: 'STEP', delta: dx < 0 ? 1 : -1 })
  }, [])

  const onJump = useCallback((index) => dispatch({ type: 'JUMP_TO', index }), [])

  const phaseId = PHASE_ORDER[state.phaseIndex]
  const phase = HERO_PHASES[phaseId]

  // Suppress is currently a no-op; the seam exists for future policy work.
  void reduced

  return (
    <section ref={heroRef} className="hero" aria-label="Ember stories hero">
      <HeroScrollParallaxProvider heroRef={heroRef}>
      <HeroParallaxProvider heroRef={heroRef}>
        <HeroBackground />
        {/* OS platform stickers hidden for now — uncomment to restore */}
        {/* <HeroStickers /> */}

        <div className="hero-composition">
          <HeroHeadline />

          <div
            className="hero-tiles"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <HeroPhaseTile
              role="thumb-left"
              phaseId={phase.id}
              content={phase.thumbnails.left}
              avatar={phase.thumbnails.left.avatar}
            />
            <HeroPhaseTile
              role="centerpiece"
              phaseId={phase.id}
              content={phase.centerpiece}
              title={phase.title}
              dateRange={phase.dateRange}
            />
            <HeroPhaseTile
              role="thumb-right"
              phaseId={phase.id}
              content={phase.thumbnails.right}
              avatar={phase.thumbnails.right.avatar}
            />
          </div>

          <HeroProgressDots phaseIndex={state.phaseIndex} isPaused={state.isPaused} onJump={onJump} />
          <HeroCTA />
        </div>
      </HeroParallaxProvider>
      </HeroScrollParallaxProvider>
    </section>
  )
}
