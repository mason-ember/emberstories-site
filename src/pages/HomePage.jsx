import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { Button } from '@/components/ui/button'
import './ScrollTestPage.css'

gsap.registerPlugin(ScrollTrigger)

const hasImage = true
const COLORS = [
  '#d4b8e0', '#b8cfe0', '#c4b8e0', '#b8e0c4', '#e0b8b8', '#e0d4b8',
  '#c4e0b8', '#b8d4e0', '#e0c4b8', '#d4e0b8', '#b8b8e0', '#e0b8d4',
  '#d4c4e0', '#c4d4e0', '#d4b8c4', '#b8c4e0', '#e0d4c4', '#c4e0d4',
]

function applyAnimation(grid) {
  // Prevent double-initialization (e.g. during dev StrictMode remounts).
  if (grid.dataset.gsapApplied === 'true') return
  grid.dataset.gsapApplied = 'true'

  const gridWrap        = grid.querySelector('.grid-wrap')
  const gridItems       = grid.querySelectorAll('.grid__item')
  const gridItemsInner  = [...gridItems].map(item => item.querySelector('.grid__item-inner')).filter(Boolean)

  grid.style.setProperty('--perspective', '1600px')
  grid.style.setProperty('--grid-inner-scale', '0.5')
  grid.style.setProperty('--grid-columns', '8')
  grid.style.setProperty('--grid-width', '200%')
  grid.style.setProperty('--grid-gap', '3vw')

  // Lock the "random" values so ScrollTrigger refresh/scrub never re-rolls them.
  const zVals = Array.from(gridItems, () => gsap.utils.random(-800, 200))
  const xFromVals = Array.from(gridItems, () => gsap.utils.random(-300, 0))
  const xToVals = Array.from(gridItems, () => gsap.utils.random(0, 300))

  gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '.section-intro',
      start: 'bottom bottom',
      endTrigger: '#ember-to-remember',
      end: 'bottom top',
      scrub: true,
    },
  })
    .set(gridWrap, { rotationY: 25 })
    .set(gridItems, { z: (i) => zVals[i] })
    .fromTo(gridItems, { xPercent: (i) => xFromVals[i] }, { xPercent: (i) => xToVals[i] }, 0)
    .fromTo(gridItemsInner, { scale: 2 }, { scale: 0.5 }, 0)
}

export default function HomePage() {
  const gridRef = useRef(null)
  const nextSectionRef = useRef(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenisRef.current = lenis
    lenis.on('scroll', () => ScrollTrigger.update())
    const rafLoop = (time) => { lenis.raf(time); requestAnimationFrame(rafLoop) }
    requestAnimationFrame(rafLoop)

    // Wait for all grid images to have their natural dimensions before
    // applying the animation — ScrollTrigger needs the final page height.
    if (gridRef.current && window.innerWidth > 768) {
      const images = [...gridRef.current.querySelectorAll('img')]
      const imagePromises = images.map(img => {
        if (img.complete && img.naturalHeight > 0) return Promise.resolve()
        return new Promise(resolve => {
          img.addEventListener('load', resolve, { once: true })
          img.addEventListener('error', resolve, { once: true })
        })
      })
      Promise.all(imagePromises).then(() => {
        requestAnimationFrame(() => applyAnimation(gridRef.current))
      })
    }

    return () => {
      lenisRef.current = null
      lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const scrollToNextSection = () => {
    const target = nextSectionRef.current
    if (!target) return

    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(target, {
        offset: -24,
        duration: 3.2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      })
      return
    }

    // Fallback if Lenis isn't ready for any reason.
    const startY = window.scrollY || window.pageYOffset || 0
    const targetY = target.getBoundingClientRect().top + startY - 24
    const delta = targetY - startY
    const durationMs = 3200
    const start = performance.now()
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs)
      window.scrollTo(0, startY + delta * easeOutCubic(t))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  return (
    <div className="scroll-test">

      {/* Hero */}
      <section className="section-intro">
        <div>
          <img
            src="/assets/brand/EmberLogo-Vert-BlackTxt.svg"
            alt="Ember Stories"
            style={{ height: 120, margin: '0 auto 40px', display: 'block' }}
          />
          <h1 style={{ fontSize: 'clamp(2.4rem, 6.5vw, 4.25rem)', fontWeight: 650, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16, maxWidth: 860 }}>
            Your photos are fragmented.
          </h1>
          <p style={{ fontSize: 'clamp(1.05rem, 1.35vw, 1.25rem)', fontWeight: 500, letterSpacing: '-0.01em', opacity: 0.75, maxWidth: 860, margin: '0 auto 14px', lineHeight: 1.35 }}>
            Across devices. Across people. Across time.
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)', fontWeight: 650, letterSpacing: '-0.02em', opacity: 0.9, maxWidth: 860, margin: '0 auto 36px', lineHeight: 1.2 }}>
            And so are your memories.
          </h2>
          <Button size="lg" type="button" onClick={scrollToNextSection}>
            ↓ Let Ember help
          </Button>
        </div>
      </section>

      {/* Photo grid */}
      <div className="grid-section">
        <div className="content-title" ref={nextSectionRef}>
          <div className="grid-overlay-card" style={{ background: 'rgba(250, 250, 250, 0.8)', backdropFilter: 'blur(16px)', borderRadius: 7, display: 'inline-block', maxWidth: 580, textAlign: 'left' }}>
            <p style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 600, letterSpacing: '-0.5px', lineHeight: 1.3, color: '#000', marginBottom: '1.25rem' }}>
              Your family's memories - finally in one place.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              Ember is a shared photo app for families. Think Apple or Google Photos, but built for households - not individuals.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              When your photos overlap (vacations, birthdays, holidays), Ember automatically combines them into a single shared story.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              You stay in control. Nothing is uploaded or shared without your permission.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              We're currently in beta and looking for early testers. Your feedback will directly shape the product.
            </p>
            <Button asChild size="lg">
              <Link to="/beta">Get Early Access</Link>
            </Button>
          </div>
        </div>
        {/* Mobile static collage — shown on ≤768px, hidden on desktop via CSS */}
        <div className="grid-mobile-collage">
          {Array.from({ length: 12 }).map((_, i) => (
            <img
              key={i}
              src={`/assets/images/home/photo${String(i + 1).padStart(2, '0')}.jpg`}
              alt=""
            />
          ))}
        </div>

        {window.innerWidth > 768 && (
          <div className="grid" ref={gridRef}>
            <div className="grid-wrap">
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="grid__item">
                  {hasImage
                    ? <img src={`/assets/images/home/photo${String(i + 1).padStart(2, '0')}.jpg`} alt="" />
                    : <div className="grid__item-inner" style={{ aspectRatio: '4/3', background: COLORS[i % COLORS.length] }} />
                  }
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ember to Remember */}
      <section className="section-intro" id="ember-to-remember" style={{ height: '60vh', marginBottom: '8rem' }}>
        <div>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '1rem' }}>
            Private Beta
          </p>
          <p style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 600, letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: '2rem' }}>
            Ember to Remember.
          </p>
          <Button asChild size="lg">
            <Link to="/beta">Join the Beta</Link>
          </Button>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '2.5rem 1.5rem', borderTop: '1px solid #e5e5e5' }}>
        <p style={{ fontSize: '0.85rem', color: '#a3a3a3', marginBottom: '0.75rem' }}>© 2026 William Mason Shewman, LLC</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.85rem' }}>
          <a href="/privacy.html" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="/terms.html"   style={{ color: '#a3a3a3', textDecoration: 'none' }}>Terms of Service</a>
        </div>
      </footer>

    </div>
  )
}
