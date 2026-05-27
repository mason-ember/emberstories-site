import { useEffect, useRef, useState } from 'react'
import StoreCTAs from '@/components/site/StoreCTAs'
import './solution.css'

// Solution section — pairs an editorial serif headline + supporting copy
// with the device-pair screenshot of the app. Text on the left, phones
// on the right. Mirrors the layout the user mocked at:
// /Users/williamshewman/Desktop/solution-section.jpg
//
// Copy lives inline here for now; once we settle on the section, the
// source-of-truth doc will land at
// emberstories-site-kb/planning/site_content/Home/3_Solution.md.

export default function Solution() {
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
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      className="solution-section"
      aria-labelledby="solution-headline"
    >
      <div
        ref={ref}
        className={`solution-grid${visible ? ' is-visible' : ''}`}
      >
        <div className="solution-text">
          <h2 id="solution-headline" className="solution-headline">
            Ember recreates and preserves your life stories
          </h2>
          <p className="solution-body">
            And because the best moments are shared, Ember finds photos from
            loved ones who were there with you — weaving them into a single,
            shared memory.
          </p>
          <div className="solution-ctas">
            <StoreCTAs />
          </div>
        </div>

        <div className="solution-visual" aria-hidden="true">
          <img
            src="/assets/images/solution/iphone17-dual.png"
            alt=""
            className="solution-devices"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
