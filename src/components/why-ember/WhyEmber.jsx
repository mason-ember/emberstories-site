import { useEffect, useRef, useState } from 'react'
import './why-ember.css'

// §5 — Founder's note. Replaces a conventional Social Proof block.
// Two-column editorial spread: family-slides photo on the left,
// founder's note + Mad Men-inspired closer on the right.

export default function WhyEmber() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
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
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="why-section" aria-labelledby="why-heading">
      <div
        ref={ref}
        className={`why-grid${visible ? ' is-visible' : ''}`}
      >
        <figure className="why-visual">
          <img
            src="/assets/images/why/family-slides-photo.jpg"
            alt="A family gathered in a living room around a slide projector"
            className="why-image"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="why-text">
          <h2 id="why-heading" className="why-heading">
            Why we built Ember
          </h2>

          <p className="why-body">
            One of my earliest memories is of my grandfather at the slide
            projector, pulling our family into the living room to collectively
            remember and retell our stories. The carousel clicked, and the
            family chimed in. One by one — birthdays, trips, faces I'd never
            met — were handed down to me like a quiet inheritance. That's
            what photographs were then. Not files to be stored, but the
            embers of a fire waiting to be relit.
          </p>

          <p className="why-closer">
            Ember isn't just another photo app. It's a way back — to places
            we ache to return, to moments that remind us who we are, and who
            we love.
          </p>

          <p className="why-attribution">— Mason Shewman, Founder</p>
        </div>
      </div>
    </section>
  )
}
