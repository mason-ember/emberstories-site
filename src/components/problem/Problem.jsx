import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './problem.css'

gsap.registerPlugin(ScrollTrigger)

// Problem section — three full-stage movements stitched together by scroll:
//   1. Pinned hero stage. The lede pins centered (top-third bias) while a
//      rotated rail of memory photos drifts L→R behind it. At the end of
//      the pin, the lede and rail fade out.
//   2. Combined dyad stage. 100vh, 50/50 split — text (problem + answer,
//      stacked, voice-contrast preserved) on the left; phone graphic on
//      the right. Per-half bg colors are configurable via CSS variables.
//   3. Coda stage. Dark background. Four fragments arrive scattered and
//      align as the section enters viewport; closing line fades in last.
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
  const codaRef = useRef(null)
  const [woven, setWoven] = useState(false)

  // Pin + scrub timeline. All scroll-driven motion lives here.
  // Scoped to desktop via gsap.matchMedia — on mobile, the rail goes static
  // (see problem.css mobile breakpoint) and no GSAP code runs at all.
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const mm = gsap.matchMedia()

    mm.add(
      '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
      () => {
        // Lede centering — xPercent/yPercent: -50 is the GSAP-native way to
        // pull the absolutely-positioned lede back by half its own size,
        // matching translate(-50%, -50%). Sets the offset once so the
        // fade-in's y animation below composes on top of the centering
        // rather than overwriting it.
        gsap.set(ledeRef.current, { xPercent: -50, yPercent: -50 })

        // Lede fade-up as the section approaches viewport — pre-pin, so by
        // the time the pin engages the lede is at full opacity.
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
        // pin. Starts the instant the lede reaches full opacity ('top 35%'
        // — same end-point as the lede fade-in trigger) and continues
        // straight through pin engagement and all the way to the end of
        // the pin. The rail keeps drifting laterally even during the
        // fade-out, so the user never sees the photos sit static.
        //
        // Translation range: 0 → -(trackWidth - viewportWidth). At x=0 the
        // first photo's left edge sits at the viewport's left edge; at the
        // end the last photo's right edge sits at the viewport's right
        // edge — no leading or trailing dead space.
        //
        // Total scroll-distance for the motion: 215vh (35vh pre-pin +
        // 180vh of pin = motion ends exactly when the pin releases).
        gsap.to(railRef.current, {
          x: () => {
            const track = railRef.current
            if (!track) return 0
            const trackWidth = track.scrollWidth
            const viewportWidth = window.innerWidth
            return -(trackWidth - viewportWidth)
          },
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 35%',
            end: '+=215%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        // Pin timeline. Only handles pin behavior and the lede + rail
        // fade-out at the very end of the pin. Rail x is driven separately
        // (above). The next beat (combined dyad stage) lives in normal
        // flow below — it appears as soon as the pin releases, so the
        // fade-out is timed so the pin stage is empty just before release.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top top',
              end: '+=180%',
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          // Fade out timed to complete right as the pin releases (0.85 →
          // 1.0). Rail is still drifting through the fade because its x
          // ScrollTrigger runs to the same end point.
          .to(
            [ledeRef.current, railFrameRef.current],
            { opacity: 0, duration: 0.15, ease: 'power2.in' },
            0.85,
          )

        // Images load asynchronously; recompute ScrollTrigger geometry once
        // they're in so the pin distance accounts for the real rail width.
        const onLoad = () => ScrollTrigger.refresh()
        if (document.readyState === 'complete') {
          ScrollTrigger.refresh()
        } else {
          window.addEventListener('load', onLoad, { once: true })
        }
      },
    )

    return () => mm.revert()
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
      </div>

      {/* ─── Combined dyad stage: 50/50 split ───────────────────────────── */}
      {/* Each half has its own bg, controllable via the per-half CSS vars
          --dyad-text-bg and --dyad-visual-bg defined on .problem-section. */}
      <div className="problem-dyad-stage">
        <div className="problem-dyad-half problem-dyad-half--text">
          <div className="problem-dyad-text-inner">
            <div className="problem-dyad-side problem-dyad-problem">
              <h3 className="problem-subhead">
                Cloud storage preserves photos
              </h3>
              <p>
                Our phones and cloud services do a remarkable job preserving
                our photos. But somewhere along the way, the stories began to
                disappear — fragmented across devices, buried in endless
                scrolling, reduced to isolated files instead of shared family
                narratives.
              </p>
            </div>
            <div className="problem-dyad-side problem-dyad-answer">
              <h3 className="problem-subhead">Ember preserves stories</h3>
              <p>
                Ember turns your photos back into stories — the kind you used
                to tell. And because the best memories are shared, Ember
                identifies photos from those who were there with you —
                weaving them into a single, shared story.
              </p>
            </div>
          </div>
        </div>
        <div
          className="problem-dyad-half problem-dyad-half--visual"
          aria-hidden="true"
        >
          {/* Phone graphic of the app goes here. */}
        </div>
      </div>

      {/* ─── Coda stage: dark bg, light text ────────────────────────────── */}
      <div className="problem-coda-stage">
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
