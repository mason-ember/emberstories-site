import { useEffect, useRef, useState } from 'react'
import './how-it-works.css'

// How It Works (§4) — three locked steps as numbered cards.
// Spec: emberstories-site-kb/planning/site_content/Home/4_How_It_Works.md
//
// The section's job is reassurance: "this is easy and won't take long."
// Snaps back to a light background after the dark PX section above.

const steps = [
  {
    n: '1',
    title: 'Give Ember full access to your photo library',
  },
  {
    n: '2',
    title: 'Ember automatically creates stories from your photos',
  },
  {
    n: '3',
    title: 'Approve, share, and relive them with your household',
  },
]

export default function HowItWorks() {
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
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="hiw-section" aria-labelledby="hiw-heading">
      <div
        ref={ref}
        className={`hiw-inner${visible ? ' is-visible' : ''}`}
      >
        <h2 id="hiw-heading" className="hiw-heading">
          How Ember Works
        </h2>

        <ol className="hiw-steps">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="hiw-step"
              style={{ '--hiw-step-delay': `${i * 120}ms` }}
            >
              <span className="hiw-step-numeral" aria-hidden="true">
                {s.n}
              </span>
              <div className="hiw-step-body">
                <p className="hiw-step-title">{s.title}</p>
                {s.tagline && (
                  <p className="hiw-step-tagline">{s.tagline}</p>
                )}
              </div>
            </li>
          ))}
        </ol>

        <p className="hiw-trust">
          Nothing is published until you say so. Every story is yours to
          share, keep private, or delete.
        </p>
      </div>
    </section>
  )
}
