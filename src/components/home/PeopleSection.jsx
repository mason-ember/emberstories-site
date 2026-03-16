import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

// Placeholder avatars — replace src values once real portrait photos are available
const avatars = [
  { label: 'Mom',       color: '#c4b8e0' },
  { label: 'Dad',       color: '#b8cfe0' },
  { label: 'Grandma',   color: '#e0d4b8' },
  { label: 'Grandpa',   color: '#b8e0c4' },
  { label: 'Daughter',  color: '#e0b8b8' },
  { label: 'Son',       color: '#d4b8e0' },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
}

const avatarVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  show:   { opacity: 1, scale: 1,    y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function PeopleSection() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [30, -30])

  return (
    <section
      ref={ref}
      className="py-32 px-6 overflow-hidden"
      style={{
        position: 'relative',
        zIndex: 10,
        // Gradient fades the photo grid out as People content takes over
        background: 'linear-gradient(to bottom, transparent 0%, white 28%)',
      }}
    >
      <div className="max-w-[720px] mx-auto text-center">

        {/* Copy */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[32px] sm:text-[38px] font-semibold tracking-tight text-foreground leading-snug mb-3">
            Some memories live as moments.
          </p>
          <p className="text-[32px] sm:text-[38px] font-semibold tracking-tight text-muted-foreground leading-snug">
            Others live in the people who shaped them.
          </p>
        </motion.div>

        {/* Avatars */}
        <motion.div
          style={{ y }}
          variants={reduced ? undefined : containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {avatars.map((avatar, i) => (
            <motion.div
              key={i}
              variants={reduced ? undefined : avatarVariants}
              className="flex flex-col items-center gap-2"
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: '50%',
                  background: avatar.color,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                }}
              />
              <span className="text-sm text-muted-foreground font-medium">{avatar.label}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
