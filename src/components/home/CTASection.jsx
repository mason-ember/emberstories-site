import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 45, damping: 18 })

  // Card fades in as hero exits, fades out before People section
  const opacity = useTransform(smooth, [0.28, 0.42, 0.52, 0.62], [0, 1, 1, 0])
  const scale   = useTransform(smooth, [0.28, 0.42], reduced ? [1, 1] : [0.94, 1])

  return (
    <section
      style={{ height: '110vh', position: 'relative', zIndex: 10 }}
      className="flex flex-col items-center justify-center text-center px-6"
    >
      <motion.div
        style={{ opacity, scale, pointerEvents: 'none' }}
      >
        <div
          style={{ pointerEvents: 'auto' }}
          className="bg-white/80 backdrop-blur-md rounded-2xl px-8 py-8 max-w-md shadow-lg"
        >
          <p className="text-[28px] font-semibold tracking-tight text-foreground mb-6 leading-snug">
            Your moments,<br />beautifully remembered.
          </p>
          <Button asChild size="lg">
            <Link to="/beta">Get Early Access</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
