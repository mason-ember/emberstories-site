import Hero from '@/components/hero/Hero'
import SiteFooter from '@/components/site/SiteFooter'
import SiteHeader from '@/components/site/SiteHeader'
import './HomePage.css'

// Marketing homepage. Header + hero + placeholder sections to come.
// Planning: emberstories-site-kb/planning/site_content/Home/

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PlaceholderSection />
      </main>
      <SiteFooter />
    </>
  )
}

function PlaceholderSection() {
  return (
    <section className="placeholder-section">
      <div className="placeholder-section-inner">
        <h2>The next section lives here.</h2>
        <p>
          This is placeholder copy that takes the spot of an upcoming section —
          likely the problem framing ("your memories are getting lost"), the
          solution overview, or the how-it-works walkthrough described in the
          Home_Outline planning doc. It's here so we can see the hero in context
          and confirm the page flows naturally from the cycling story tiles into
          the rest of the narrative.
        </p>
        <p>
          We'll replace this block with a real section soon. The next decisions
          are which section comes first (problem vs. solution vs. how-it-works)
          and whether it uses alternating image/text rows, a stepped 1-2-3
          layout, or something more native to Ember's voice.
        </p>
      </div>
    </section>
  )
}
