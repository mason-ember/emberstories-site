import { useEffect, useRef, useState } from 'react'
import HeroBackground from '@/components/hero/HeroBackground'
import { HeroParallaxProvider } from '@/components/hero/HeroParallaxContext'
import { HeroScrollParallaxProvider } from '@/components/hero/HeroScrollParallaxContext'
import './problem.css'

// Problem section — simplified pass.
//
// The pinned-hero + parallax-rail + dyad + coda composition is on hold while
// we move the site toward a more conventional consumer-SaaS flow
// (Hero → Problem → Solution → How It Works → ...). For now the section is
// a single centered lede that fades in as it enters the viewport.
//
// The blurred photo-shape background that previously lived in the Hero now
// lives here. Both parallax providers ride on sectionRef, so mouse + scroll
// math is anchored to this section's rect rather than the hero's. The Hero
// keeps its own providers for tile/avatar/sticker parallax — these are
// independent instances.

export default function Problem() {
  const sectionRef = useRef(null)
  const ledeRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ledeRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      className="problem-section"
      ref={sectionRef}
      aria-labelledby="problem-headline"
    >
      <HeroScrollParallaxProvider heroRef={sectionRef} triggerOnEnter>
        <HeroParallaxProvider heroRef={sectionRef}>
          <div className="problem-pin-stage">
            <HeroBackground />
            <div
              className={`problem-pin-lede${visible ? ' is-visible' : ''}`}
              ref={ledeRef}
            >
              <h2 id="problem-headline" className="problem-headline">
                We used to reminisce
              </h2>
              <p className="problem-lede">
                We capture more of our lives than any generation before us —
                birthdays, vacations, holidays, weekend fun. Our phones are
                full of moments our parents would have framed or added to
                photo albums. Yet somehow, they feel distant — like files
                rather than memories.
              </p>
            </div>
          </div>
        </HeroParallaxProvider>
      </HeroScrollParallaxProvider>
    </section>
  )
}
