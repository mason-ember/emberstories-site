import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const backgroundElements = [
  { type: 'photo',  color: '#d4b8e0', rotation: -5,  top: '5%',  left: '2%',  width: 180, aspect: '3/4', yStart: 300, yEnd: -150, zStart: -700,  rotateYStart: -15 },
  { type: 'photo',  color: '#b8cfe0', rotation:  4,  top: '4%',  left: '62%', width: 220, aspect: '4/3', yStart: 180, yEnd: -250, zStart: -500,  rotateYStart:  10 },
  { type: 'avatar', color: '#e0d4b8', rotation:  0,  top: '18%', left: '82%', width: 100,               yStart: 220, yEnd: -180, zStart: -400,  rotateYStart:   8 },
  { type: 'photo',  color: '#b8e0c4', rotation: -3,  top: '52%', left: '4%',  width: 200, aspect: '4/3', yStart: 400, yEnd: -100, zStart: -900,  rotateYStart: -12 },
  { type: 'avatar', color: '#e0b8b8', rotation:  0,  top: '58%', left: '24%', width: 80,                yStart: 150, yEnd: -200, zStart: -350,  rotateYStart:  14 },
  { type: 'photo',  color: '#c4b8e0', rotation:  6,  top: '62%', left: '58%', width: 190, aspect: '3/4', yStart: 340, yEnd: -130, zStart: -800,  rotateYStart: -18 },
  { type: 'avatar', color: '#b8e0d4', rotation:  0,  top: '72%', left: '86%', width: 90,                yStart: 260, yEnd: -160, zStart: -600,  rotateYStart:   6 },
]

function BgElement({ el, smoothProgress, reduced }) {
  const y        = useTransform(smoothProgress, [0, 1], reduced ? [0, 0] : [el.yStart, el.yEnd])
  const z        = useTransform(smoothProgress, [0, 1], reduced ? [0, 0] : [el.zStart, 0])
  const rotateY  = useTransform(smoothProgress, [0, 1], reduced ? [0, 0] : [el.rotateYStart, 0])

  const shared = {
    position: 'absolute',
    top: el.top,
    left: el.left,
    width: el.width,
    opacity: 0.22,
    rotate: el.rotation,
  }

  if (el.type === 'avatar') {
    return (
      <motion.div
        style={{ ...shared, y, z, rotateY, height: el.width, borderRadius: '50%',
          background: el.color, boxShadow: '0 4px 20px rgba(0,0,0,0.10)' }}
      />
    )
  }

  return (
    <motion.div
      style={{ ...shared, y, z, rotateY, aspectRatio: el.aspect, borderRadius: 8,
        background: el.color, boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
    />
  )
}

export default function FinalCTASection() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  })

  const sectionRotateX = useTransform(smoothProgress, [0, 0.5], reduced ? [0, 0] : [18, 0])

  return (
    <section ref={ref} className="relative bg-ember-gray-50 overflow-hidden py-40 px-6">

      {/* Perspective wrapper for background elements */}
      <div style={{ perspective: '1200px', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <motion.div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', rotateX: sectionRotateX }}>
          {backgroundElements.map((el, i) => (
            <BgElement key={i} el={el} smoothProgress={smoothProgress} reduced={reduced} />
          ))}
        </motion.div>
      </div>

      {/* Foreground text + CTA */}
      <div className="relative z-10 max-w-[640px] mx-auto text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-extrabold uppercase tracking-widest text-primary mb-4">
            Private Beta
          </p>
          <h2 className="text-[48px] sm:text-[64px] font-semibold tracking-tight text-foreground leading-none mb-6">
            Ember to Remember.
          </h2>
          <p className="text-[20px] text-muted-foreground mb-10 leading-relaxed">
            Embrace now, tomorrow may fade.
          </p>
          <Button asChild size="lg">
            <Link to="/beta">Join the Beta</Link>
          </Button>
        </motion.div>
      </div>

    </section>
  )
}
