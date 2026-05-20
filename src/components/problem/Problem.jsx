import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './problem.css'

gsap.registerPlugin(ScrollTrigger)

// Problem section — three movements:
//   1. Pinned hero stage. The lede pins top-left (80/80) while a rotated rail
//      of memory photos scrolls L→R behind it. At the end of the pin, the
//      lede and rail fade out.
//   2. Dyad in editorial column. Voice-contrast across the two halves:
//      problem side dimmed/smaller, answer side full presence.
//   3. Coda. Four fragments arrive scattered and align as the section enters
//      viewport; closing line fades in last.
//
// Source-of-truth copy + structural rationale:
// emberstories-site-kb/planning/site_content/Home/2_Problem.md

const RAIL_PHOTOS = [
  { src: '/assets/images/problem-rail/photo-01-l.jpg', orient: 'landscape' },
  { src: '/assets/images/problem-rail/photo-02-p.jpg', orient: 'portrait' },
  { src: '/assets/images/problem-rail/photo-03-l.jpg', orient: 'landscape' },
  { src: '/assets/images/problem-rail/photo-04-p.jpg', orient: 'portrait' },
  { src: '/assets/images/problem-rail/photo-05-l.jpg', orient: 'landscape' },
  { src: '/assets/images/problem-rail/photo-06-p.jpg', orient: 'portrait' },
  { src: '/assets/images/problem-rail/photo-07-l.jpg', orient: 'landscape' },
  { src: '/assets/images/problem-rail/photo-08-l.jpg', orient: 'landscape' },
  { src: '/assets/images/problem-rail/photo-09-p.jpg', orient: 'portrait' },
  { src: '/assets/images/problem-rail/photo-10-l.jpg', orient: 'landscape' },
  { src: '/assets/images/problem-rail/photo-11-p.jpg', orient: 'portrait' },
  { src: '/assets/images/problem-rail/photo-12-l.jpg', orient: 'landscape' },
]

const CODA_FRAGMENTS = [
  { text: 'Family vacations.',   dx: -42, rot: -1.4 },
  { text: 'Christmas mornings.', dx: 56,  rot: 1.6 },
  { text: 'Birthday parties.',   dx: -28, rot: -0.9 },
  { text: 'Weekend games.',      dx: 38,  rot: 1.1 },
]

export default function Problem() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const ledeRef = useRef(null)
  const railFrameRef = useRef(null)
  const railRef = useRef(null)
  const dyadProblemRef = useRef(null)
  const codaRef = useRef(null)
  const [woven, setWoven] = useState(false)

  // Pin + scrub timeline. All scroll-driven motion lives here.
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduceMotion) return // Reduced-motion users get the static fallback layout.

    const ctx = gsap.context(() => {
      // Lede fade-up as the section approaches viewport — pre-pin, so by the
      // time the pin engages the lede is at full opacity.
      gsap.fromTo(
        ledeRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 1,
          },
        },
      )

      // Rail horizontal motion — its OWN ScrollTrigger, separate from the
      // pin. Starts the instant the lede reaches full opacity ('top 35%' —
      // same end-point as the lede fade-in trigger) and continues straight
      // through pin engagement, the bulk of the pin, and into the crossfade
      // window. No static moment between "lede settled" and "rail moving";
      // the rail keeps drifting until it fades out with the lede.
      //
      // Total scroll-distance for the motion: ~287vh (35vh pre-pin +
      // 252vh of the 280vh pin = motion ends at ~90% of the pin, the same
      // moment the rail's opacity reaches 0). Stretching the motion across
      // more scroll naturally slows the rail compared to the previous
      // pin-only animation.
      gsap.to(railRef.current, {
        x: () => {
          const track = railRef.current
          if (!track) return 0
          const trackWidth = track.scrollWidth
          const viewportWidth = window.innerWidth
          return -(trackWidth - viewportWidth + 200)
        },
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 35%',
          end: '+=287%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Pin + crossfade timeline. Only handles pin behavior and the
      // lede→dyad-problem handoff at the end. Rail x is driven separately
      // (above), so the pin timeline no longer animates it.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: 'top top',
            end: '+=280%',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        // Crossfade window. Lede + rail fade out from 78%; dyad-problem
        // fades in from 82% (overlap of 4 percentage points = a true
        // crossfade rather than a sequential fade-out-then-in). Both
        // complete by 90% — which matches the rail's motion endpoint, so
        // the rail is still drifting laterally as it fades out.
        .to(
          [ledeRef.current, railFrameRef.current],
          { opacity: 0, duration: 0.12, ease: 'power2.in' },
          0.78,
        )
        .to(
          dyadProblemRef.current,
          { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' },
          0.82,
        )

      // Images load asynchronously; recompute ScrollTrigger geometry once
      // they're in so the pin distance accounts for the real rail width.
      const onLoad = () => ScrollTrigger.refresh()
      if (document.readyState === 'complete') {
        ScrollTrigger.refresh()
      } else {
        window.addEventListener('load', onLoad, { once: true })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Coda fragments scatter-align (one-shot, IntersectionObserver-driven).
  useEffect(() => {
    const el = codaRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setWoven(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.35 },
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
      {/* ─── Pinned hero stage ──────────────────────────────────────────── */}
      <div className="problem-pin-stage" ref={stageRef}>
        <div className="problem-pin-lede" ref={ledeRef}>
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

        <div
          className="problem-rail-frame"
          ref={railFrameRef}
          aria-hidden="true"
        >
          <div className="problem-rail-track" ref={railRef}>
            {RAIL_PHOTOS.map((photo, i) => (
              <figure
                key={photo.src}
                className={`problem-rail-photo problem-rail-photo--${photo.orient}`}
              >
                <img src={photo.src} alt="" loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </div>

        {/* Dyad-problem lives inside the pin stage. It crossfades in as the
            lede and rail fade out at the end of the pin, so the handoff
            between the two beats happens on a single frame — no gap. */}
        <div className="problem-pin-dyad-problem" ref={dyadProblemRef}>
          <h3 className="problem-subhead">Cloud storage preserves photos</h3>
          <p>
            Our phones and cloud services do a remarkable job preserving our
            photos. But somewhere along the way, the stories began to
            disappear — fragmented across devices, buried in endless
            scrolling, reduced to isolated files instead of shared family
            narratives.
          </p>
        </div>
      </div>

      {/* ─── Editorial flow: dyad-answer + coda ─────────────────────────── */}
      <div className="problem-inner">
        <div className="problem-dyad">
          <div className="problem-dyad-side problem-dyad-answer">
            <h3 className="problem-subhead">Ember preserves stories</h3>
            <p>
              Ember turns your photos back into stories — the kind you used to
              tell. And because the best memories are shared, Ember identifies
              photos from those who were there with you — weaving them into a
              single, shared story.
            </p>
          </div>
        </div>

        <hr className="problem-rule" aria-hidden="true" />

        <div
          ref={codaRef}
          className={`problem-coda${woven ? ' is-woven' : ''}`}
        >
          <p className="problem-fragments">
            {CODA_FRAGMENTS.map((f, i) => (
              <span
                key={f.text}
                className="problem-fragment"
                style={{
                  '--dx': `${f.dx}px`,
                  '--rot': `${f.rot}deg`,
                  '--delay': `${i * 0.18}s`,
                }}
              >
                {f.text}
              </span>
            ))}
          </p>
          <p className="problem-closing">
            Stories your household can relive together.
          </p>
        </div>
      </div>
    </section>
  )
}
