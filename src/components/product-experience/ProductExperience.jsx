import { useState } from 'react'
import './product-experience.css'

// Product Experience (§3) — button-controlled carousel.
// One slide visible at a time; buttons above the carousel switch between
// Timeline View, Story Detail, and Shared Stories. Slide switch is a
// keyed remount so the enter animation plays each time.
//
// Spec: emberstories-site-kb/planning/site_content/Home/3_Product_Experience.md

const slides = [
  {
    id: 'timeline',
    label: 'Timeline View',
    heading: 'All of your stories in one place',
    body: 'Your memories are easy to find and available in chronological order — just like you remember them.',
    image: '/assets/images/ux/timeline-grid.png',
    imageAlt: 'A grid of Ember stories arranged by year',
  },
  {
    id: 'detail',
    label: 'Story Detail',
    heading: 'Every memory, fully told',
    body: 'Each story unfolds as a narrative — photos in sequence, places named, people remembered. The moments you lived, presented the way they deserve.',
    image: '/assets/images/ux/story-detail.png',
    imageAlt: 'A single Ember story opened in detail view',
  },
  {
    id: 'contributors',
    label: 'Built Together',
    heading: 'The whole story, from every angle',
    body: 'When household members share a moment, their photos weave into one story — the way it actually happened.',
    image: '/assets/images/ux/shared-stories.jpg',
    imageAlt: 'An Ember story built from photos contributed by multiple household members',
  },
]

export default function ProductExperience() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = slides[activeIdx]

  return (
    <section className="px-section" aria-label="Product experience">
      <div
        className="px-tabs"
        role="tablist"
        aria-label="Product experience slides"
      >
        {slides.map((s, i) => {
          const isActive = i === activeIdx
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`px-panel-${s.id}`}
              id={`px-tab-${s.id}`}
              className={`px-tab${isActive ? ' is-active' : ''}`}
              onClick={() => setActiveIdx(i)}
            >
              {s.label}
            </button>
          )
        })}
      </div>

      <div
        className="px-slide-wrap"
        role="tabpanel"
        id={`px-panel-${active.id}`}
        aria-labelledby={`px-tab-${active.id}`}
      >
        <div className="px-slide" key={active.id}>
          <div className="px-slide-text">
            <h2 className="px-slide-heading">{active.heading}</h2>
            <p className="px-slide-body">{active.body}</p>
          </div>
          <div className="px-slide-visual" aria-hidden={!active.image}>
            {active.image ? (
              <img
                src={active.image}
                alt={active.imageAlt}
                className="px-slide-image"
                decoding="async"
              />
            ) : (
              <div className="px-slide-placeholder">
                <span>Placeholder — {active.label}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
