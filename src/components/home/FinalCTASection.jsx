import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

// Background elements — mix of photo slots and avatar circles
// Replace src values once real assets are available
const backgroundElements = [
  { type: 'photo',   color: '#d4b8e0', rotation: -5,  top: '8%',  left: '2%',  width: 180, aspect: '3/4', speed: 0.4 },
  { type: 'photo',   color: '#b8cfe0', rotation:  4,  top: '5%',  left: '65%', width: 220, aspect: '4/3', speed: 0.6 },
  { type: 'avatar',  color: '#e0d4b8', rotation:  0,  top: '20%', left: '80%', width: 100, speed: 0.3 },
  { type: 'photo',   color: '#b8e0c4', rotation: -3,  top: '55%', left: '5%',  width: 200, aspect: '4/3', speed: 0.5 },
  { type: 'avatar',  color: '#e0b8b8', rotation:  0,  top: '60%', left: '25%', width: 80,  speed: 0.4 },
  { type: 'photo',   color: '#c4b8e0', rotation:  6,  top: '65%', left: '60%', width: 190, aspect: '3/4', speed: 0.6 },
  { type: 'avatar',  color: '#b8e0d4', rotation:  0,  top: '75%', left: '88%', width: 90,  speed: 0.3 },
]

function BackgroundElement({ el, scrollYProgress, reduced }) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [el.speed * 60, el.speed * -60]
  )

  const style = {
    position: 'absolute',
    top: el.top,
    left: el.left,
    width: el.width,
    opacity: 0.25,
    rotate: el.rotation,
  }

  if (el.type === 'avatar') {
    return (
      <motion.div style={{ ...style, y, height: el.width, borderRadius: '50%', background: el.color, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
    )
  }

  return (
    <motion.div style={{ ...style, y, aspectRatio: el.aspect, borderRadius: 8, background: el.color, boxShadow: '0 4px 20px rgba(0,0,0,0.10)' }} />
  )
}

export default function FinalCTASection() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <section ref={ref} className="relative bg-ember-gray-50 overflow-hidden py-40 px-6">

      {/* Drifting background elements */}
      {backgroundElements.map((el, i) => (
        <BackgroundElement key={i} el={el} scrollYProgress={scrollYProgress} reduced={reduced} />
      ))}

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
