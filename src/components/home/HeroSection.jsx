import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 45, damping: 18 })

  const opacity = useTransform(smooth, [0, 0.18, 0.28], [1, 1, 0])
  const y       = useTransform(smooth, [0, 0.28], reduced ? [0, 0] : [0, -40])

  return (
    <section
      style={{ height: '100vh', position: 'relative', zIndex: 10 }}
      className="flex flex-col items-center justify-center text-center px-6"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ opacity, y }}
      >
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
      </motion.div>
    </section>
  )
}
