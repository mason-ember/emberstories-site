import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

// Hand-tuned positions — edit these once real photos are dropped in
const photos = [
  { src: '/assets/images/home/photo1.jpg', rotation: -6, top: '4%',  left: '3%',  width: 220, aspect: '3/4' },
  { src: '/assets/images/home/photo2.jpg', rotation:  3, top: '2%',  left: '38%', width: 300, aspect: '4/3' },
  { src: '/assets/images/home/photo3.jpg', rotation: -2, top: '2%',  left: '72%', width: 200, aspect: '3/4' },
  { src: '/assets/images/home/photo4.jpg', rotation:  5, top: '38%', left: '12%', width: 260, aspect: '4/3' },
  { src: '/assets/images/home/photo5.jpg', rotation: -4, top: '36%', left: '55%', width: 230, aspect: '3/4' },
  { src: '/assets/images/home/photo6.jpg', rotation:  2, top: '68%', left: '5%',  width: 200, aspect: '4/3' },
  { src: '/assets/images/home/photo7.jpg', rotation: -7, top: '65%', left: '38%', width: 240, aspect: '3/4' },
  { src: '/assets/images/home/photo8.jpg', rotation:  4, top: '70%', left: '68%', width: 270, aspect: '4/3' },
]

// Placeholder colors shown until real photos are available
const placeholderColors = [
  '#d4b8e0', '#b8cfe0', '#e0d4b8', '#b8e0c4',
  '#e0b8b8', '#c4b8e0', '#e0c4b8', '#b8e0d4',
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const photoVariants = {
  hidden: { opacity: 0, y: 50 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

function Photo({ photo, index, reduced }) {
  const hasImage = false // flip to true once photos are in public/assets/images/home/

  return (
    <motion.div
      variants={reduced ? undefined : photoVariants}
      style={{
        position: 'absolute',
        top: photo.top,
        left: photo.left,
        width: photo.width,
        rotate: reduced ? 0 : photo.rotation,
        aspectRatio: photo.aspect,
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      }}
    >
      {hasImage ? (
        <img
          src={photo.src}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div style={{ width: '100%', height: '100%', background: placeholderColors[index % placeholderColors.length] }} />
      )}
    </motion.div>
  )
}

export default function MosaicSection() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  return (
    <section ref={ref} className="relative bg-white overflow-hidden" style={{ minHeight: '140vh' }}>

      {/* Mosaic */}
      <motion.div
        variants={reduced ? undefined : containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {photos.map((photo, i) => (
          <Photo key={i} photo={photo} index={i} reduced={reduced} />
        ))}
      </motion.div>

      {/* Copy + CTA — centered over the mosaic */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6"
           style={{ minHeight: '140vh' }}>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-8 max-w-md shadow-sm"
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
