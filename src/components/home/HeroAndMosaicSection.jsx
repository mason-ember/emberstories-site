import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

// 14 photos hand-positioned to cover the viewport when at rest.
// Rows of 4 with 2 fill photos in the middle to close gaps.
// left/top are CSS percentage strings. enterAt/exitAt are scroll progress values.
// Photos stagger their entry from left and exit to right.
const photos = [
  // Row 1 — top
  { aspect: '3/4', color: '#d4b8e0', left:  '0%', top:  '0%', rot: -6, enterAt: 0.22, exitAt: 0.70 },
  { aspect: '4/3', color: '#b8cfe0', left: '23%', top: '-2%', rot:  3, enterAt: 0.25, exitAt: 0.73 },
  { aspect: '3/4', color: '#c4b8e0', left: '50%', top:  '1%', rot: -3, enterAt: 0.23, exitAt: 0.71 },
  { aspect: '4/3', color: '#b8e0c4', left: '73%', top: '-1%', rot:  5, enterAt: 0.27, exitAt: 0.74 },
  // Row 2 — middle
  { aspect: '4/3', color: '#e0b8b8', left: '-2%', top: '32%', rot:  4, enterAt: 0.28, exitAt: 0.77 },
  { aspect: '3/4', color: '#e0d4b8', left: '24%', top: '28%', rot: -5, enterAt: 0.31, exitAt: 0.79 },
  { aspect: '4/3', color: '#c4e0b8', left: '46%', top: '33%', rot:  2, enterAt: 0.29, exitAt: 0.78 },
  { aspect: '3/4', color: '#b8d4e0', left: '73%', top: '30%', rot: -4, enterAt: 0.26, exitAt: 0.75 },
  // Row 3 — bottom
  { aspect: '3/4', color: '#e0c4b8', left:  '2%', top: '62%', rot: -3, enterAt: 0.33, exitAt: 0.81 },
  { aspect: '4/3', color: '#d4e0b8', left: '26%', top: '65%', rot:  6, enterAt: 0.35, exitAt: 0.83 },
  { aspect: '3/4', color: '#b8b8e0', left: '52%', top: '60%', rot: -7, enterAt: 0.34, exitAt: 0.82 },
  { aspect: '4/3', color: '#e0b8d4', left: '74%', top: '63%', rot:  3, enterAt: 0.32, exitAt: 0.80 },
  // Fill — close middle gaps
  { aspect: '4/3', color: '#d4c4e0', left: '12%', top: '47%', rot:  5, enterAt: 0.30, exitAt: 0.78 },
  { aspect: '3/4', color: '#c4d4e0', left: '62%', top: '46%', rot: -2, enterAt: 0.36, exitAt: 0.84 },
]

const hasImage = false // flip to true once photos exist in public/assets/images/home/

// Each photo is its own component so it can call useTransform independently
function SweepPhoto({ photo, index, smooth, offLeft, offRight, reduced }) {
  const enterEnd = photo.enterAt + 0.16
  const exitEnd  = photo.exitAt  + 0.13

  const x = useTransform(
    smooth,
    [photo.enterAt, enterEnd, photo.exitAt, exitEnd],
    reduced ? [0, 0, 0, 0] : [offLeft, 0, 0, offRight]
  )
  // rotateY: angled toward viewer as it enters from left, angled away as it exits right
  const rotateY = useTransform(
    smooth,
    [photo.enterAt, enterEnd, photo.exitAt, exitEnd],
    reduced ? [0, 0, 0, 0] : [-38, 0, 0, 28]
  )
  // z: starts slightly close, exits far back (moving further away as it moves right)
  const z = useTransform(
    smooth,
    [photo.enterAt, enterEnd, photo.exitAt, exitEnd],
    reduced ? [0, 0, 0, 0] : [120, 0, 0, -900]
  )
  // Scale down slightly on exit to reinforce receding depth
  const scale = useTransform(
    smooth,
    [photo.exitAt, exitEnd],
    reduced ? [1, 1] : [1, 0.8]
  )
  const opacity = useTransform(
    smooth,
    [photo.enterAt, photo.enterAt + 0.04, exitEnd - 0.04, exitEnd],
    [0, 1, 1, 0]
  )

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: photo.left,
        top: photo.top,
        width: '25%',
        aspectRatio: photo.aspect,
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.16)',
        rotate: reduced ? 0 : photo.rot,
        x, rotateY, z, scale, opacity,
      }}
    >
      {hasImage ? (
        <img
          src={`/assets/images/home/photo${index + 1}.jpg`}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div style={{ width: '100%', height: '100%', background: photo.color }} />
      )}
    </motion.div>
  )
}

export default function HeroAndMosaicSection() {
  const containerRef = useRef(null)
  const reduced = useReducedMotion()

  // Measure viewport width for reliable off-screen pixel values
  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1440))
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const offLeft  = -(vw * 1.35)
  const offRight =   vw * 1.6

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 })

  // Hero text: fully visible → fades out as photos start entering
  const heroOpacity = useTransform(smooth, [0, 0.18, 0.30], [1, 1, 0])
  const heroY       = useTransform(smooth, [0, 0.30], [0, -50])

  // CTA card: fades in once photos are covering the background
  const ctaOpacity = useTransform(smooth, [0.48, 0.62], [0, 1])
  const ctaScale   = useTransform(smooth, [0.48, 0.62], [0.94, 1])
  // CTA fades out as photos exit
  const ctaExitOpacity = useTransform(smooth, [0.48, 0.62, 0.80, 0.90], [0, 1, 1, 0])

  return (
    // Tall container — 300vh gives enough scroll runway for the full animation
    <div ref={containerRef} style={{ height: '300vh' }}>

      {/* Sticky viewport — pinned for the full scroll duration */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Perspective wrapper for 3D photo sweep */}
        <div style={{ perspective: '1100px', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}>
            {photos.map((photo, i) => (
              <SweepPhoto
                key={i}
                photo={photo}
                index={i}
                smooth={smooth}
                offLeft={offLeft}
                offRight={offRight}
                reduced={reduced}
              />
            ))}
          </div>
        </div>

        {/* ── Hero text ── */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, pointerEvents: 'none' }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
        >
          <div style={{ pointerEvents: 'auto' }}>
            <img
              src="/assets/brand/EmberLogo-Vert-BlackTxt.svg"
              alt="Ember Stories"
              className="h-24 mx-auto mb-10"
            />
            <h1 className="text-[36px] sm:text-[48px] font-semibold tracking-tight text-foreground max-w-[620px] mx-auto leading-tight mb-5">
              Your family's stories deserve more than a camera roll.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-[480px] mx-auto mb-10 leading-relaxed">
              Ember transforms your shared photos into memories your household can relive together.
            </p>
            <Button asChild size="lg">
              <Link to="/beta">Join the Beta</Link>
            </Button>
          </div>
        </motion.div>

        {/* ── CTA over photos ── */}
        <motion.div
          style={{ opacity: ctaExitOpacity, scale: ctaScale, pointerEvents: 'none' }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20"
        >
          <div
            style={{ pointerEvents: 'auto' }}
            className="bg-white/85 backdrop-blur-md rounded-2xl px-8 py-8 max-w-md shadow-lg"
          >
            <p className="text-[28px] font-semibold tracking-tight text-foreground mb-6 leading-snug">
              Your moments,<br />beautifully remembered.
            </p>
            <Button asChild size="lg">
              <Link to="/beta">Get Early Access</Link>
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
