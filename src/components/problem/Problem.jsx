import { useEffect, useRef, useState } from 'react'
import './problem.css'

// Problem section — simplified pass.
//
// The pinned-hero + parallax-rail + dyad + coda composition is on hold while
// we move the site toward a more conventional consumer-SaaS flow
// (Hero → Problem → Solution → How It Works → ...). For now the section is
// a single centered lede that fades in as it enters the viewport.
//
// The original "We used to reminisce" headline is preserved (commented) for
// quick restoration; the longer Lede / Dyad / Coda copy still lives in
// emberstories-site-kb/planning/site_content/Home/2_Problem.md.

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
      <div className="problem-pin-stage">
        <div
          className={`problem-pin-lede${visible ? ' is-visible' : ''}`}
          ref={ledeRef}
        >
          <h2 id="problem-headline" className="problem-headline">
            We used to reminisce
          </h2>
          <p className="problem-lede">
            We capture more of our lives than any generation before us —
            birthdays, vacations, holidays, weekend fun. Our phones are full of
            moments our parents would have framed or added to photo albums. Yet
            somehow, they feel distant — like files rather than memories.
          </p>
        </div>
      </div>
    </section>
  )
}
