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

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import './ScrollTestPage.css'

gsap.registerPlugin(ScrollTrigger)

// ─── Config ──────────────────────────────────────────────────────────────────

const TYPES = [
  { id: 'type1', label: 'Type 1', desc: 'Left → right sweep' },
  { id: 'type2', label: 'Type 2', desc: 'Top → bottom tilt' },
  { id: 'type3', label: 'Type 3', desc: 'Up & forward burst' },
  { id: 'type4', label: 'Type 4', desc: 'Fleeting moments' },
  { id: 'type5', label: 'Type 5', desc: 'Alternating rows' },
  { id: 'type6', label: 'Type 6', desc: 'Rotating descent' },
]

const ITEM_COUNT = 18 // 3 columns × 6 rows

const COLORS = [
  '#d4b8e0', '#b8cfe0', '#c4b8e0', '#b8e0c4', '#e0b8b8', '#e0d4b8',
  '#c4e0b8', '#b8d4e0', '#e0c4b8', '#d4e0b8', '#b8b8e0', '#e0b8d4',
  '#d4c4e0', '#c4d4e0', '#d4b8c4', '#b8c4e0', '#e0d4c4', '#c4e0d4',
]

// ─── Animation — verbatim from the Scroll3DGrid demo ─────────────────────────

function applyAnimation(grid, animationType) {
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
    },
  })

  switch (animationType) {

    case 'type1':
      grid.style.setProperty('--perspective', '1000px')
      grid.style.setProperty('--grid-inner-scale', '0.5')
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
          { yPercent: () => gsap.utils.random(100, 1000), rotationY: -45, filter: 'brightness(200%)' },
          { ease: 'power2', yPercent: () => gsap.utils.random(-1000, -100), rotationY: 45, filter: 'brightness(0%)' }, 0)
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

// CSS vars set per type — need to be cleared between switches
const CSS_VARS = ['--perspective','--grid-width','--grid-inner-scale','--grid-item-ratio','--grid-columns','--grid-gap']
const CSS_VAR_DEFAULTS = { '--perspective':'3000px','--grid-width':'50%','--grid-inner-scale':'1','--grid-item-ratio':'0.8','--grid-columns':'3','--grid-gap':'1vw' }

export default function ScrollTestPage() {
  const gridRef    = useRef(null)
  const lenisRef   = useRef(null)
  const [activeType, setActiveType] = useState('type2')

  // Init Lenis once
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.on('scroll', () => ScrollTrigger.update())
    const rafLoop = (time) => { lenis.raf(time); requestAnimationFrame(rafLoop) }
    requestAnimationFrame(rafLoop)
    lenisRef.current = lenis
    return () => { lenis.destroy() }
  }, [])

  // Re-apply animation whenever type changes
  useEffect(() => {
    if (!gridRef.current) return

    // 1. Kill existing ScrollTriggers and clear GSAP state
    ScrollTrigger.getAll().forEach(t => t.kill())
    const gridWrap       = gridRef.current.querySelector('.grid-wrap')
    const gridItems      = gridRef.current.querySelectorAll('.grid__item')
    const gridItemsInner = [...gridItems].map(i => i.querySelector('.grid__item-inner'))
    gsap.set([gridWrap, gridItems, gridItemsInner], { clearProps: 'all' })

    // 2. Reset CSS vars
    CSS_VARS.forEach(v => gridRef.current.style.setProperty(v, CSS_VAR_DEFAULTS[v]))

    // 3. Scroll to top BEFORE creating the new ScrollTrigger
    window.scrollTo(0, 0)
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })

    // 4. Apply animation on the next frame so layout/scroll have settled
    const raf = requestAnimationFrame(() => {
      applyAnimation(gridRef.current, activeType)
    })

    return () => cancelAnimationFrame(raf)
  }, [activeType])

  return (
    <div className="scroll-test">

      {/* Sticky type selector */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
        padding: '12px 24px', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <span style={{ opacity: 0.4, fontSize: '0.75rem', marginRight: 4 }}>ANIMATION</span>
        {TYPES.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveType(t.id)}
            style={{
              background: activeType === t.id ? '#9E18AC' : 'rgba(255,255,255,0.08)',
              color: '#fff', border: 'none', borderRadius: 6,
              padding: '6px 14px', cursor: 'pointer', fontSize: '0.8rem',
              fontWeight: activeType === t.id ? 600 : 400,
              transition: 'background 0.2s',
            }}
          >
            {t.label} <span style={{ opacity: 0.55 }}>— {t.desc}</span>
          </button>
        ))}
      </div>

      {/* Intro */}
      <section className="section-intro">
        <div>
          <h1>Scroll Test</h1>
          <p style={{ opacity: 0.4, fontSize: '1rem', marginTop: '1rem' }}>
            Active: <strong>{TYPES.find(t => t.id === activeType)?.desc}</strong> — scroll slowly
          </p>
        </div>
      </section>

      {/* Grid section */}
      <div className="grid-section">
        <div className="content-title">
          Fleeting moments,<br />existence's dance.
        </div>
        <div className="grid" ref={gridRef}>
          <div className="grid-wrap">
            {Array.from({ length: ITEM_COUNT }).map((_, i) => (
              <div key={i} className="grid__item">
                <div
                  className="grid__item-inner"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
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
