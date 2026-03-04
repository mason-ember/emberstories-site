import { Button } from '@/components/ui/button'

function StepCard({ number, title, children }) {
  return (
    <div className="bg-muted rounded-lg border border-border p-6 mb-4 flex gap-8 items-center">

      {/* Left: content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
          Step {number}
        </p>
        <h2 className="text-[20px] font-semibold mb-3 text-foreground">
          {title}
        </h2>
        {children}
      </div>

      {/* Right: image placeholder */}
      <div className="w-[120px] h-[120px] shrink-0 rounded-lg border-2 border-dashed border-ember-gray-300 bg-ember-gray-100 flex items-center justify-center text-ember-gray-400 text-xs">
        image
      </div>

    </div>
  )
}

export default function TestFlightPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans leading-relaxed">
      <div className="max-w-[720px] mx-auto px-6 py-[60px] pb-20">

        <h1 className="text-[32px] font-semibold mb-4 tracking-[-0.5px] text-foreground">
          You're helping shape Ember.
        </h1>

        <p className="text-lg text-foreground mb-10">
          Ember is currently in private beta.{' '}
          This build gives you early access before public release.
          Installation takes about 60 seconds.
        </p>

        <StepCard number={1} title="Install Apple TestFlight">
          <p className="text-muted-foreground mb-5 text-[17px]">
            TestFlight is Apple's official beta testing app.{' '}
            If you don't already have it installed, download it below.
          </p>
          <Button asChild variant="outline" size="lg">
            <a
              href="https://apps.apple.com/us/app/testflight/id899247664"
              target="_blank"
              rel="noreferrer"
            >
              Download TestFlight
            </a>
          </Button>
        </StepCard>

        <StepCard number={2} title="Install Ember Beta">
          <p className="text-muted-foreground mb-5 text-[17px]">
            Once TestFlight is installed, tap the button below.
          </p>
          <Button asChild size="lg">
            <a href="YOUR_TESTFLIGHT_LINK_HERE" target="_blank" rel="noreferrer">
              Install Ember Beta
            </a>
          </Button>
        </StepCard>

        <StepCard number={3} title='Tap "Install" Inside TestFlight'>
          <p className="text-muted-foreground text-[17px]">
            When Ember appears in TestFlight, tap{' '}
            <strong className="text-foreground">Install</strong>.{' '}
            The app will download to your home screen.
          </p>
        </StepCard>

        <div className="h-px bg-border my-[60px]" />

        <div className="bg-muted p-6 rounded-lg border border-border">
          <h2 className="text-[22px] font-semibold mb-2.5 text-foreground">
            What to Expect
          </h2>
          <p className="text-muted-foreground mb-5 text-[17px]">This is an early build.</p>
          <p className="text-muted-foreground mb-5 text-[17px]">
            You may encounter bugs. Features may evolve quickly.
          </p>
          <p className="text-muted-foreground text-[17px]">
            Your feedback directly shapes the product.
          </p>
        </div>

        <footer className="mt-[60px] text-sm text-muted-foreground">
          <p className="mb-2">Questions or comments can be sent to <a
              href="mailto:feedback@emberstories.com"
              className="text-primary no-underline hover:underline"
            >
              feedback@emberstories.com
            </a>.</p>
        </footer>

      </div>
    </div>
  )
}
