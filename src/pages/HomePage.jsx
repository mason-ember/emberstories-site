import { useEffect } from 'react'
import Lenis from 'lenis'
import Hero from '@/components/hero/Hero'
import Problem from '@/components/problem/Problem'
import SiteFooter from '@/components/site/SiteFooter'
import SiteHeader from '@/components/site/SiteHeader'

// Marketing homepage. Header + hero + problem + (more sections to come).
// Planning: emberstories-site-kb/planning/site_content/Home/
//
// Lenis is initialized at this page level so the smooth-scroll behavior is
// scoped to the homepage (the beta funnel pages keep native scroll for now).
// Hero's scroll parallax reads native window.scrollY which Lenis updates on
// each rAF tick — no coupling between the two.

export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    let rafId
    const tick = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Problem />
      </main>
      <SiteFooter />
    </>
  )
}
