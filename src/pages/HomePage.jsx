import Hero from '@/components/hero/Hero'

// Marketing homepage. Currently just the hero — additional sections (problem,
// solution, how-it-works, demo, social proof, CTA, footer) will follow.
// Planning: emberstories-site-kb/planning/site_content/Home/

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* Future sections render below the hero. */}
    </main>
  )
}
