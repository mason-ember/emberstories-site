import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

// Each photo has hand-tuned position + per-item scroll animation parameters.
// yStart/yEnd: vertical travel (px). zStart: depth origin. rotateYStart: horizontal tilt origin.
const photos = [
  { rotation: -6, top: '4%',  left: '3%',  width: 220, aspect: '3/4', color: '#d4b8e0', yStart: 320,  yEnd: -180, zStart: -900,  rotateYStart: -18 },
  { rotation:  3, top: '2%',  left: '38%', width: 300, aspect: '4/3', color: '#b8cfe0', yStart: 180,  yEnd: -280, zStart: -600,  rotateYStart:  12 },
  { rotation: -2, top: '2%',  left: '72%', width: 200, aspect: '3/4', color: '#c4b8e0', yStart: 420,  yEnd: -120, zStart: -1200, rotateYStart: -22 },
  { rotation:  5, top: '38%', left: '12%', width: 260, aspect: '4/3', color: '#b8e0c4', yStart: 260,  yEnd: -220, zStart: -750,  rotateYStart:  15 },
  { rotation: -4, top: '36%', left: '55%', width: 230, aspect: '3/4', color: '#e0b8b8', yStart: 500,  yEnd: -100, zStart: -1400, rotateYStart: -10 },
  { rotation:  2, top: '68%', left: '5%',  width: 200, aspect: '4/3', color: '#e0d4b8', yStart: 140,  yEnd: -340, zStart: -500,  rotateYStart:  20 },
  { rotation: -7, top: '65%', left: '38%', width: 240, aspect: '3/4', color: '#c4e0b8', yStart: 380,  yEnd: -160, zStart: -1100, rotateYStart: -14 },
  { rotation:  4, top: '70%', left: '68%', width: 270, aspect: '4/3', color: '#b8d4e0', yStart: 220,  yEnd: -260, zStart: -800,  rotateYStart:  8  },
]

const hasImage = false // flip to true once photos exist in public/assets/images/home/

function PhotoItem({ photo, index, smoothProgress, reduced }) {
  const y        = useTransform(smoothProgress, [0, 1], reduced ? [0, 0] : [photo.yStart, photo.yEnd])
  const z        = useTransform(smoothProgress, [0, 1], reduced ? [0, 0] : [photo.zStart, 0])
  const rotateY  = useTransform(smoothProgress, [0, 1], reduced ? [0, 0] : [photo.rotateYStart, 0])
  const brightness = useTransform(smoothProgress, [0, 0.4, 1], reduced ? [1, 1, 1] : [0.25, 0.7, 1])
  const filter   = useTransform(brightness, v => `brightness(${v})`)

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: photo.top,
        left: photo.left,
        width: photo.width,
        aspectRatio: photo.aspect,
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
        rotate: reduced ? 0 : photo.rotation,
        y, z, rotateY, filter,
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

export default function MosaicSection() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Spring smoothing — equivalent to Lenis lerp, makes motion feel cinematic
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  })

  // Whole-section rotateX: starts tilted back, flattens as you scroll through
  const sectionRotateX = useTransform(smoothProgress, [0, 0.6], reduced ? [0, 0] : [22, 0])

  return (
    <section ref={ref} className="relative bg-white overflow-hidden" style={{ minHeight: '160vh' }}>

      {/* Perspective wrapper */}
      <div style={{ perspective: '1200px', position: 'absolute', inset: 0 }}>
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            rotateX: sectionRotateX,
          }}
        >
          {photos.map((photo, i) => (
            <PhotoItem
              key={i}
              photo={photo}
              index={i}
              smoothProgress={smoothProgress}
              reduced={reduced}
            />
          ))}
        </motion.div>
      </div>

      {/* Copy + CTA — centered, floats over the mosaic */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: '160vh' }}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white/85 backdrop-blur-sm rounded-2xl px-8 py-8 max-w-md shadow-sm"
        >
          <p className="text-[28px] font-semibold tracking-tight text-foreground mb-6 leading-snug">
            Your moments,<br />beautifully remembered.
          </p>
          <Button asChild size="lg">
            <Link to="/beta">Get Early Access</Link>
          </Button>
        </motion.div>
      </div>

    </section>
  )
}
