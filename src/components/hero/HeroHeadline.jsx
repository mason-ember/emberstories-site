import { Button } from '@/components/ui/button'

// Headline, subhead, and below-composition CTA. Static — no parallax, no
// phase-driven motion (text must stay readable). See Hero.md §3.

export default function HeroHeadline() {
  return (
    <div className="hero-headline">
      <h1>Rescue and relive your life stories</h1>
      <p>
        Ember transforms the moments you've lost to cloud storage into living memories.
      </p>
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
