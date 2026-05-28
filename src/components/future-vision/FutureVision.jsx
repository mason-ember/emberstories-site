import { useEffect, useRef, useState } from 'react'
import './future-vision.css'

// §6 — Future Vision / Roadmap. Groups upcoming work into four themed
// directions rather than a flat 13-item feature list. Visually echoes the
// "embers of a fire waiting to be relit" line from §5 via a warm-glow
// gradient against deep aubergine.

const groups = [
  {
    id: 'experiences',
    title: 'Bigger experiences',
    items: [
      'TV — the living-room experience',
      'Web viewer',
      'Tablet app',
    ],
  },
  {
    id: 'stories',
    title: 'Richer stories',
    items: [
      'Video support',
      'Voice notes',
      'Story shorts for social',
      'Manual story creation',
    ],
  },
  {
    id: 'memory',
    title: 'Smarter memory',
    items: [
      'Facial recognition',
      'Deeper photo understanding',
      'LLM-generated narratives',
      'Collection stories from thematic patterns',
    ],
  },
  {
    id: 'circles',
    title: 'Bigger circles',
    items: [
      'Cross-household contribution & sharing',
      'Multi-household support',
    ],
  },
]

export default function FutureVision() {
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
    <section className="fv-section" aria-labelledby="fv-heading">
      <div className="fv-glow" aria-hidden="true" />

      <div
        ref={ref}
        className={`fv-inner${visible ? ' is-visible' : ''}`}
      >
        <header className="fv-header">
          <p className="fv-eyebrow">What's next</p>
          <h2 id="fv-heading" className="fv-heading">
            We're just getting started
          </h2>
          <p className="fv-lede">
            Here are a few of the things we're working on:
          </p>
        </header>

        <ul className="fv-groups">
          {groups.map((g, i) => (
            <li
              key={g.id}
              className="fv-group"
              style={{ '--fv-group-delay': `${i * 100}ms` }}
            >
              <h3 className="fv-group-title">{g.title}</h3>
              <ul className="fv-items">
                {g.items.map((item) => (
                  <li key={item} className="fv-item">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="fv-pricing">
          Free during launch. A monthly subscription is coming later this
          year.
        </p>
      </div>
    </section>
  )
}
