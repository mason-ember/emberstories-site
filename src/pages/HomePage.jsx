import { useEffect } from 'react'
import Lenis from 'lenis'
import Hero from '@/components/hero/Hero'
import SiteFooter from '@/components/site/SiteFooter'
import SiteHeader from '@/components/site/SiteHeader'
import './HomePage.css'

// Marketing homepage. Header + hero + placeholder sections to come.
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
        <PlaceholderSection />
      </main>
      <SiteFooter />
    </>
  )
}

function PlaceholderSection() {
  return (
    <section className="placeholder-section">
      <div className="placeholder-section-inner">
      <h2>Why do you need Ember?</h2>
      <h1>You're losing your stories</h1>
      <p>The cliches are true - time flies and the kids grow up fast. Your photos continue to pile in the cloud - your memories obscured by a solution built for storage, not story telling.</p>
      <p>Ember captures and maintains the richness of your life story, allowing you to relive your most cherished memories.</p>
      </div>
    </section>
  )
}
