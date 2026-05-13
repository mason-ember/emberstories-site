import { Button } from '@/components/ui/button'

// Headline, subhead, and below-composition CTA. Static — no parallax, no
// phase-driven motion (text must stay readable). See Hero.md §3.

export default function HeroHeadline() {
  return (
    <div className="hero-headline">
      <h1>Rescue your stories from the cloud</h1>
      <h2>
        Ember transforms your forgotten photos into living memories.
      </h2>
    </div>
  )
}

export function HeroCTA() {
  return (
    <div className="hero-cta-row">
      <Button size="lg" type="button">
        Get Ember Stories
      </Button>
    </div>
  )
}
