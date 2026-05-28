import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MOBILE_BREAKPOINT_PX } from './heroConstants'

// Single mousemove listener on the hero root; children register a ref + a
// per-element parallax config via useParallax(config). The provider dispatches
// translate3d updates to each registered element using gsap.quickTo for
// smooth interpolation.
//
// Each element can specify:
//   - depthX / depthY (px) — anisotropic displacement
//   - depth (shorthand for both)
//   - lerp (seconds) — quickTo duration; lower = snappier
//
// Parallax is disabled on touch devices (no `hover: hover`) and at mobile
// widths. See Hero.md §6, §11.5.

const DEFAULT_LERP = 0.6

const HeroParallaxContext = createContext(null)

function normalize(input) {
  if (typeof input === 'number') {
    return { depthX: input, depthY: input, lerp: DEFAULT_LERP }
  }
  if (input && typeof input === 'object') {
    const depthX = input.depthX ?? input.depth ?? 0
    const depthY = input.depthY ?? input.depth ?? 0
    const lerp = input.lerp ?? DEFAULT_LERP
    return { depthX, depthY, lerp }
  }
  return { depthX: 0, depthY: 0, lerp: DEFAULT_LERP }
}

export function HeroParallaxProvider({ heroRef, children }) {
  const registry = useRef(new Map())
  const idCounter = useRef(0)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || typeof window === 'undefined') return

    const supportsHover = window.matchMedia('(hover: hover)').matches
    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`).matches
    if (!supportsHover || isMobile) return

    const tweens = new Map() // id -> { x, y, lerp }

    const getTween = (id, el, lerp) => {
      let t = tweens.get(id)
      if (!t || t.lerp !== lerp) {
        t = {
          x: gsap.quickTo(el, 'x', { duration: lerp, ease: 'power2.out' }),
          y: gsap.quickTo(el, 'y', { duration: lerp, ease: 'power2.out' }),
          lerp,
        }
        tweens.set(id, t)
      }
      return t
    }

    let rafScheduled = false
    let lastEvent = null

    const dispatch = () => {
      rafScheduled = false
      if (!lastEvent) return
      const rect = hero.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const nx = (lastEvent.clientX - cx) / (rect.width / 2)
      const ny = (lastEvent.clientY - cy) / (rect.height / 2)

      registry.current.forEach(({ ref, depthX, depthY, lerp }, id) => {
        const el = ref.current
        if (!el) return
        const t = getTween(id, el, lerp)
        // Negative for parallax illusion (elements drift opposite to cursor).
        t.x(-nx * depthX)
        t.y(-ny * depthY)
      })
    }

    const handleMouseMove = (e) => {
      lastEvent = e
      if (rafScheduled) return
      rafScheduled = true
      requestAnimationFrame(dispatch)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      tweens.clear()
    }
  }, [heroRef])

  const register = useCallback((ref, config) => {
    const id = ++idCounter.current
    const { depthX, depthY, lerp } = normalize(config)
    registry.current.set(id, { ref, depthX, depthY, lerp })
    return () => registry.current.delete(id)
  }, [])

  return (
    <HeroParallaxContext.Provider value={{ register }}>
      {children}
    </HeroParallaxContext.Provider>
  )
}

// Accepts a config object ({ depth, depthX, depthY, lerp }) or a number
// (isotropic depth, default lerp).
export function useParallax(config) {
  const ctx = useContext(HeroParallaxContext)
  const ref = useRef(null)

  // Serialize the config to a primitive so the effect doesn't re-fire on
  // every render due to fresh object references with identical values.
  const configKey =
    typeof config === 'number'
      ? `n:${config}`
      : `o:${config?.depth ?? ''}:${config?.depthX ?? ''}:${config?.depthY ?? ''}:${config?.lerp ?? ''}`

  useEffect(() => {
    if (!ctx || !ref.current) return
    return ctx.register(ref, config)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx, configKey])

  return ref
}
