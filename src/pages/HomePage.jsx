import ScrollPhotoGrid from '@/components/home/ScrollPhotoGrid'
import HeroSection from '@/components/home/HeroSection'
import CTASection from '@/components/home/CTASection'
import PeopleSection from '@/components/home/PeopleSection'
import FinalCTASection from '@/components/home/FinalCTASection'

export default function HomePage() {
  return (
    // No background on the outer wrapper — white comes from body, allowing fixed grid to show through
    <div className="text-foreground font-sans" style={{ background: 'transparent' }}>

      {/* Fixed 3D photo grid — spans the full page behind all content */}
      <ScrollPhotoGrid />

      {/* ── Hero (100vh) ─────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── CTA over photos (110vh, crescendo) ───────────────────────── */}
      <CTASection />

      {/* ── People (grid exits here) ─────────────────────────────────── */}
      <PeopleSection />

      {/* ── Ember to Remember ────────────────────────────────────────── */}
      <FinalCTASection />

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-border py-10 px-6 text-center" style={{ position: 'relative', zIndex: 10 }}>
        <p className="text-muted-foreground text-sm mb-3">© 2026 William Mason Shewman, LLC</p>
        <div className="flex justify-center gap-6 text-sm">
          <a href="/privacy.html" className="text-muted-foreground hover:text-foreground transition-colors no-underline">Privacy Policy</a>
          <a href="/terms.html" className="text-muted-foreground hover:text-foreground transition-colors no-underline">Terms of Service</a>
        </div>
      </footer>

    </div>
  )
}
