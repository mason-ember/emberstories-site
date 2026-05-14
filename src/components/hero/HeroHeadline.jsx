import StoreCTAs from '@/components/site/StoreCTAs'

// Headline, subhead, and below-composition CTA. Static — no parallax, no
// phase-driven motion (text must stay readable). See Hero.md §3.

export default function HeroHeadline() {
  return (
    <div className="hero-headline">
      <h1>Rescue your stories from the cloud</h1>
      <h2>
        Ember scans and monitors your photo library for meaningful memories, creating organized stories to be shared and relived.
      </h2>
    </div>
  )
}

export function HeroCTA() {
  return (
    <div className="hero-cta-row">
      <p className="hero-cta-kicker">Try Ember Stories for free</p>
      <StoreCTAs />
    </div>
  )
}
