import HeroAndMosaicSection from '@/components/home/HeroAndMosaicSection'
import PeopleSection from '@/components/home/PeopleSection'
import FinalCTASection from '@/components/home/FinalCTASection'

export default function HomePage() {
  return (
    <div className="bg-white text-foreground font-sans">

      {/* ── Hero + Photo Sweep + CTA ──────────────────────────────────── */}
      <HeroAndMosaicSection />

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
