/**
 * ScrollTestPage — /scroll-test
 *
 * Faithful port of the Scroll3DGrid type4 animation ("Fleeting moments, existence's dance.")
 * Uses GSAP + ScrollTrigger + Lenis, the exact libraries and values from the original demo.
 *
 * To experiment:
 *  - Change ANIMATION_TYPE to 'type1'–'type6' to compare animation styles
 *  - Adjust CSS vars in the applyAnimation function
 *  - Adjust ITEM_COUNT and column/row counts
 */

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { Button } from '@/components/ui/button'
import './ScrollTestPage.css'

gsap.registerPlugin(ScrollTrigger)

// ─── Config ──────────────────────────────────────────────────────────────────

const ANIMATION_TYPE = 'type1'
// type1: left to right rotation
// type2: top to bottom slight rotation
// type3: up and forward
// type4: vertical left aligned
// type5: rows alternating left to right
// type6: top to bottom photos rotating
const ITEM_COUNT = 18 // 3 columns × 6 rows

const COLORS = [
  '#d4b8e0', '#b8cfe0', '#c4b8e0', '#b8e0c4', '#e0b8b8', '#e0d4b8',
  '#c4e0b8', '#b8d4e0', '#e0c4b8', '#d4e0b8', '#b8b8e0', '#e0b8d4',
  '#d4c4e0', '#c4d4e0', '#d4b8c4', '#b8c4e0', '#e0d4c4', '#c4e0d4',
]

// ─── Animation — verbatim from the Scroll3DGrid demo ─────────────────────────

function applyAnimation(grid, animationType, triggerOverrides = {}) {
  const gridWrap  = grid.querySelector('.grid-wrap')
  const gridItems = grid.querySelectorAll('.grid__item')
  const gridItemsInner = [...gridItems].map(item => item.querySelector('.grid__item-inner'))

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: gridWrap,
      start: 'top bottom+=5%',
      end: 'bottom top-=5%',
      scrub: true,
      ...triggerOverrides,
    },
  })

  switch (animationType) {

    case 'type1':
      grid.style.setProperty('--perspective', '1000px')
      grid.style.setProperty('--grid-inner-scale', '0.5')
      grid.style.setProperty('--grid-columns', '8')
      grid.style.setProperty('--grid-width', '200%')
      grid.style.setProperty('--grid-gap', '4vw')
      timeline
        .set(gridWrap, { rotationY: 25 })
        .set(gridItems, { z: () => gsap.utils.random(-1600, 200) })
        .fromTo(gridItems, { xPercent: () => gsap.utils.random(-1000, -500) }, { xPercent: () => gsap.utils.random(500, 1000) }, 0)
        .fromTo(gridItemsInner, { scale: 2 }, { scale: 0.5 }, 0)
      break

    case 'type2':
      grid.style.setProperty('--grid-width', '160%')
      grid.style.setProperty('--perspective', '2000px')
      grid.style.setProperty('--grid-inner-scale', '0.5')
      grid.style.setProperty('--grid-item-ratio', '0.8')
      grid.style.setProperty('--grid-columns', '6')
      grid.style.setProperty('--grid-gap', '14vw')
      timeline
        .set(gridWrap, { rotationX: 20 })
        .set(gridItems, { z: () => gsap.utils.random(-3000, -1000) })
        .fromTo(gridItems,
          { yPercent: () => gsap.utils.random(100, 1000), rotationY: -45 },
          { ease: 'power2', yPercent: () => gsap.utils.random(-1000, -100), rotationY: 45 }, 0)
        .fromTo(gridWrap, { rotationZ: -5 }, { rotationX: -20, rotationZ: 10, scale: 1.2 }, 0)
        .fromTo(gridItemsInner, { scale: 2 }, { scale: 0.5 }, 0)
      break

    case 'type3':
      grid.style.setProperty('--grid-width', '105%')
      grid.style.setProperty('--grid-columns', '8')
      grid.style.setProperty('--perspective', '1500px')
      grid.style.setProperty('--grid-inner-scale', '0.5')
      timeline
        .set(gridItems, {
          transformOrigin: '50% 0%',
          z: () => gsap.utils.random(-5000, -2000),
          rotationX: () => gsap.utils.random(-65, -25),
          filter: 'brightness(0%)',
        })
        .to(gridItems, {
          xPercent: () => gsap.utils.random(-150, 150),
          yPercent: () => gsap.utils.random(-300, 300),
          rotationX: 0,
          filter: 'brightness(200%)',
        }, 0)
        .to(gridWrap, { z: 6500 }, 0)
        .fromTo(gridItemsInner, { scale: 2 }, { scale: 0.5 }, 0)
      break

    case 'type4':
      grid.style.setProperty('--grid-width', '50%')
      grid.style.setProperty('--perspective', '3000px')
      grid.style.setProperty('--grid-item-ratio', '0.8')
      grid.style.setProperty('--grid-columns', '3')
      grid.style.setProperty('--grid-gap', '1vw')
      timeline
        .set(gridWrap, { transformOrigin: '0% 50%', rotationY: 30, xPercent: -75 })
        .set(gridItems, { transformOrigin: '50% 0%' })
        .to(gridItems, { duration: 0.5, ease: 'power2',    z: 500,  stagger: 0.04 }, 0)
        .to(gridItems, { duration: 0.5, ease: 'power2.in', z: 0,    stagger: 0.04 }, 0.5)
        .fromTo(gridItems,
          { rotationX: -70, filter: 'brightness(120%)' },
          { duration: 1, rotationX: 70, filter: 'brightness(0%)', stagger: 0.04 }, 0)
      break

    case 'type5': {
      grid.style.setProperty('--grid-width', '120%')
      grid.style.setProperty('--grid-columns', '8')
      grid.style.setProperty('--grid-gap', '0')
      // Simple row grouping without the getGrid utility
      const rows = {}
      gridItems.forEach((item, i) => {
        const row = Math.floor(i / 8)
        ;(rows[row] || (rows[row] = [])).push(item)
      })
      const evenRows = Object.values(rows).filter((_, i) => i % 2 === 0).flat()
      const oddRows  = Object.values(rows).filter((_, i) => i % 2 !== 0).flat()
      timeline
        .set(gridWrap, { rotationX: 50 })
        .to(gridWrap, { rotationX: 30 })
        .fromTo(gridItems, { filter: 'brightness(0%)' }, { filter: 'brightness(100%)' }, 0)
        .to(evenRows, { xPercent: -100, ease: 'power1' }, 0)
        .to(oddRows,  { xPercent:  100, ease: 'power1' }, 0)
      break
    }

    case 'type6':
      grid.style.setProperty('--perspective', '2500px')
      grid.style.setProperty('--grid-width', '100%')
      grid.style.setProperty('--grid-gap', '6px')
      grid.style.setProperty('--grid-columns', '3')
      grid.style.setProperty('--grid-item-ratio', '1')
      timeline
        .fromTo(gridItems,
          { transformOrigin: '50% 200%', rotationX: 0, yPercent: 400 },
          { yPercent: 0, rotationY: 360, opacity: 0.2, scale: 0.8, stagger: 0.03 })
      break

    default:
      break
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ScrollTestPage() {
  const grid1Ref = useRef(null)
  const grid2Ref = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.on('scroll', () => ScrollTrigger.update())
    const rafLoop = (time) => { lenis.raf(time); requestAnimationFrame(rafLoop) }
    requestAnimationFrame(rafLoop)

    // Start type1 early so the animation begins the moment the user scrolls
    if (grid1Ref.current) applyAnimation(grid1Ref.current, 'type1', { start: 'top bottom+=100%' })
    if (grid2Ref.current) applyAnimation(grid2Ref.current, 'type2')

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
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 20, maxWidth: 620 }}>
            Your family's stories deserve more than a camera roll.
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.6, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Ember transforms your shared photos into memories your household can relive together.
          </p>
          <Button asChild size="lg">
            <Link to="/beta">Join the Beta</Link>
          </Button>
        </div>
      </section>

      {/* Grid 1 — type1 */}
      <div className="grid-section">
        <div className="content-title">
          Fleeting moments,<br />existence's dance.
        </div>
        <div className="grid" ref={grid1Ref}>
          <div className="grid-wrap">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="grid__item">
                <div className="grid__item-inner" style={{ background: COLORS[i % COLORS.length] }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Separator */}
      <div style={{ textAlign: 'center', padding: '2rem 0', opacity: 0.3, fontSize: '0.85rem' }}>Type 2</div>

      {/* Grid 2 — type2 */}
      <div className="grid-section">
        <div className="content-title">
          Impermanence guides<br />life's river.
        </div>
        <div className="grid" ref={grid2Ref}>
          <div className="grid-wrap">
            {Array.from({ length: ITEM_COUNT }).map((_, i) => (
              <div key={`b${i}`} className="grid__item">
                <div className="grid__item-inner" style={{ background: COLORS[(i + 6) % COLORS.length] }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Outro */}
      <section className="section-outro">
        <p>End of test — change ANIMATION_TYPE in ScrollTestPage.jsx to compare</p>
      </section>

    </div>
  )
}
