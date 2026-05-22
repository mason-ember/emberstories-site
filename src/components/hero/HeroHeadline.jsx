import StoreCTAs from '@/components/site/StoreCTAs'

// Headline, subhead, and below-composition CTA. Static — no parallax, no
// phase-driven motion (text must stay readable). See Hero.md §3.

export default function HeroHeadline() {
  return (
    <div className="hero-headline">
      <h1>Rescue your stories from the cloud</h1>
      <h2>
        Ember transforms your family's photos into stories worth sharing and reliving.
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
