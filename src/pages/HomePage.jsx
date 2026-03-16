import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import MosaicSection from '@/components/home/MosaicSection'
import PeopleSection from '@/components/home/PeopleSection'
import FinalCTASection from '@/components/home/FinalCTASection'

// Peek photos — first few mosaic photos visible at the bottom of the hero
// Mirrors the first 3 entries in MosaicSection so they appear continuous
const peekPhotos = [
  { color: '#d4b8e0', rotation: -6, left: '3%',  width: 180, aspect: '3/4' },
  { color: '#b8cfe0', rotation:  3, left: '36%', width: 240, aspect: '4/3' },
  { color: '#c4b8e0', rotation: -2, left: '72%', width: 160, aspect: '3/4' },
]

export default function HomePage() {
  const reduced = useReducedMotion()

  return (
    <div className="bg-white text-foreground font-sans">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-40">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
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
        </div>

        {/* Photo peek — bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none">
          {peekPhotos.map((p, i) => (
            <motion.div
              key={i}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: p.left,
                width: p.width,
                aspectRatio: p.aspect,
                rotate: reduced ? 0 : p.rotation,
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                background: p.color,
              }}
            />
          ))}
        </div>

      </section>

      {/* ── Mosaic + CTA ─────────────────────────────────────────────── */}
      <MosaicSection />

      {/* ── People ───────────────────────────────────────────────────── */}
      <PeopleSection />

      {/* ── Ember to Remember ────────────────────────────────────────── */}
      <FinalCTASection />

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-border py-10 px-6 text-center">
        <p className="text-muted-foreground text-sm mb-3">© 2026 William Mason Shewman, LLC</p>
        <div className="flex justify-center gap-6 text-sm">
          <a href="/privacy.html" className="text-muted-foreground hover:text-foreground transition-colors no-underline">Privacy Policy</a>
          <a href="/terms.html" className="text-muted-foreground hover:text-foreground transition-colors no-underline">Terms of Service</a>
        </div>
      </footer>

    </div>
  )
}
