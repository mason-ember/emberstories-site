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
  const gridWrap        = grid.querySelector('.grid-wrap')
  const gridItems       = grid.querySelectorAll('.grid__item')
  const gridItemsInner  = [...gridItems].map(item => item.querySelector('.grid__item-inner')).filter(Boolean)

  grid.style.setProperty('--perspective', '1600px')
  grid.style.setProperty('--grid-inner-scale', '0.5')
  grid.style.setProperty('--grid-columns', '8')
  grid.style.setProperty('--grid-width', '200%')
  grid.style.setProperty('--grid-gap', '3vw')

  gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: gridWrap,
      start: 'top bottom+=100%',
      endTrigger: '#ember-to-remember',
      end: 'bottom top',
      scrub: true,
    },
  })
    .set(gridWrap, { rotationY: 25 })
    .set(gridItems, { z: () => gsap.utils.random(-800, 200) })
    .fromTo(gridItems, { xPercent: () => gsap.utils.random(-300, 0) }, { xPercent: () => gsap.utils.random(0, 300) }, 0)
    .fromTo(gridItemsInner, { scale: 2 }, { scale: 0.5 }, 0)
}

export default function HomePage() {
  const gridRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.on('scroll', () => ScrollTrigger.update())
    const rafLoop = (time) => { lenis.raf(time); requestAnimationFrame(rafLoop) }
    requestAnimationFrame(rafLoop)

    // Wait for all grid images to have their natural dimensions before
    // applying the animation — ScrollTrigger needs the final page height.
    if (gridRef.current) {
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
      lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className="scroll-test">

      {/* Hero */}
      <section className="section-intro">
        <div>
          <img
            src="/assets/brand/EmberLogo-Vert-BlackTxt.svg"
            alt="Ember Stories"
            style={{ height: 96, margin: '0 auto 40px', display: 'block' }}
          />
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 20, maxWidth: 680 }}>
            Rescue your life story
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.7, maxWidth: 680, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Ember transforms the photos you've lost to the cloud into interactive stories that can be relived, shared, and passed down.
          </p>
          <Button asChild size="lg">
            <Link to="/beta">Join the Beta</Link>
          </Button>
        </div>
      </section>

      {/* Photo grid */}
      <div className="grid-section">
        <div className="content-title">
          <div style={{ background: 'rgba(245,245,245,0.75)', backdropFilter: 'blur(16px)', borderRadius: 7, padding: '2rem 3rem', display: 'inline-block', maxWidth: 580, textAlign: 'left' }}>
            <p style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 600, letterSpacing: '-0.5px', lineHeight: 1.3, color: '#000', marginBottom: '1.25rem' }}>
              Your family's memories—finally in one place.
            </p>
            <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.7, marginBottom: '0.9rem' }}>
              Ember is a shared photo app for families. Think Apple or Google Photos—but built for households, not individuals.
            </p>
            <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.7, marginBottom: '0.9rem' }}>
              When your photos overlap—vacations, birthdays, holidays—Ember automatically brings them together into a single, shared story.
            </p>
            <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.7, marginBottom: '0.9rem' }}>
              You stay in control. Nothing is uploaded or shared without your permission.
            </p>
            <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              We're currently in beta and looking for early testers. Your feedback will directly shape the product.
            </p>
            <Button asChild size="lg">
              <Link to="/beta">Get Early Access</Link>
            </Button>
          </div>
        </div>
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
      </div>

      {/* Ember to Remember */}
      <section className="section-intro" id="ember-to-remember" style={{ height: '60vh' }}>
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
