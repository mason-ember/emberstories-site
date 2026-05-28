import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import { MOBILE_BREAKPOINT_PX } from './heroConstants'

// Scroll-driven parallax. Mirrors HeroParallaxContext (mouse) but listens to
// window scroll instead. Children register a ref + a coefficient; the provider
// translates each element vertically to "lag" behind the page scroll, creating
// a depth illusion: distant layers (high coefficient) appear pinned, near
// layers (low coefficient) appear closer to normal scroll behavior.
//
// Coefficient semantics:
//   0   = no parallax (element scrolls with the page as usual)
//   0.5 = element drifts upward at half the page-scroll rate
//   1   = element is pinned to its starting viewport position
//
// Implemented as a sibling to the mouse parallax via the wrapper-div pattern:
// each bg shape is rendered as an outer (scroll-parallax target) wrapping an
// inner (mouse-parallax target). Both transforms compose naturally because
// they live on different DOM nodes.
//
// Listens to native window scroll events. Works whether or not Lenis is
// active — Lenis writes to window.scrollY so the listener fires on each
// smooth-scroll tick.

const HeroScrollParallaxContext = createContext(null)

export function HeroScrollParallaxProvider({ heroRef, children, triggerOnEnter = false }) {
  const registry = useRef(new Map())
  const idCounter = useRef(0)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || typeof window === 'undefined') return

    // Disable on mobile — scroll parallax is a desktop-feeling polish and
    // touch-scroll devices tend to react poorly to small jank in scroll-driven
    // transforms.
    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`).matches
    if (isMobile) return

    let rafScheduled = false

    const dispatch = () => {
      rafScheduled = false
      const heroRect = hero.getBoundingClientRect()
      // Hero is fully past viewport top → bg shapes have already scrolled away,
      // no need to keep computing.
      if (heroRect.bottom < 0) return
      // Two reference frames:
      //   default (hero, starts at page top): scrollPx grows once the top edge
      //     scrolls past viewport top.
      //   triggerOnEnter (sections below the fold): scrollPx grows the moment
      //     the section's top edge crosses the viewport bottom, so parallax is
      //     already in motion when the section is first seen.
      const viewportH = window.innerHeight
      const scrollPx = triggerOnEnter
        ? Math.max(0, viewportH - heroRect.top)
        : Math.max(0, -heroRect.top)

      registry.current.forEach(({ ref, coefficient }) => {
        const el = ref.current
        if (!el) return
        const ty = scrollPx * coefficient
        el.style.transform = `translate3d(0, ${ty}px, 0)`
      })
    }

    const onScroll = () => {
      if (rafScheduled) return
      rafScheduled = true
      requestAnimationFrame(dispatch)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    dispatch() // initial paint
    return () => window.removeEventListener('scroll', onScroll)
  }, [heroRef, triggerOnEnter])

  const register = useCallback((ref, coefficient) => {
    const id = ++idCounter.current
    registry.current.set(id, { ref, coefficient })
    return () => registry.current.delete(id)
  }, [])

  return (
    <HeroScrollParallaxContext.Provider value={{ register }}>
      {children}
    </HeroScrollParallaxContext.Provider>
  )
}

export function useScrollParallax(coefficient) {
  const ctx = useContext(HeroScrollParallaxContext)
  const ref = useRef(null)

  useEffect(() => {
    if (!ctx || !ref.current) return
    return ctx.register(ref, coefficient)
  }, [ctx, coefficient])

  return ref
}
