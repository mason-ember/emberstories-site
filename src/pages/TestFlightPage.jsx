import { Button } from '@/components/ui/button'

function StepCard({ number, title, image, alt, children }) {
  return (
    <div className="bg-muted rounded-lg border border-border p-6 mb-4 flex gap-8 items-center">

      {/* Left: content */}
      <div className="flex-1 min-w-0 text-left">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
          Step {number}
        </p>
        <h2 className="text-[20px] font-semibold mb-3 text-foreground">
          {title}
        </h2>
        {children}
      </div>

      {/* Right: image or placeholder */}
      {image ? (
        <img src={image} alt={alt} className="w-[120px] h-[120px] shrink-0 rounded-lg object-contain" />
      ) : (
        <div className="w-[120px] h-[120px] shrink-0 rounded-lg border-2 border-dashed border-ember-gray-300 bg-ember-gray-100 flex items-center justify-center text-ember-gray-400 text-xs">
          image
        </div>
      )}

    </div>
  )
}

export default function TestFlightPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans leading-relaxed">
      <div className="max-w-[720px] mx-auto px-6 py-[60px] pb-20 text-center">

        <img
          src="/assets/brand/EmberLogo-Vert-BlackTxt.svg"
          alt="Ember Stories"
          className="h-28 mx-auto mb-10"
        />

        <h1 className="text-[32px] font-semibold mb-4 tracking-[-0.5px] text-foreground">
          You're shaping Ember.
        </h1>

        <p className="text-lg text-foreground mb-10">
          Ember Stories is currently in private beta.
          This build gives you early access before public release.
          Installation takes about 60 seconds.
        </p>

        <StepCard number={1} title="Install Apple TestFlight" image="/assets/images/testing/testflight.webp" alt="TestFlight app icon">
          <p className="text-muted-foreground mb-5 text-[17px]">
            TestFlight is Apple's official beta testing app.
            If you don't already have it installed, download it below.
          </p>
          <Button asChild size="lg">
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
            When Ember appears in TestFlight, tap <strong className="text-foreground">Install</strong>.
            The app will download to your home screen.
          </p>
        </StepCard>

        <StepCard number={4} title="Open Ember Anytime">
          <p className="text-muted-foreground text-[17px]">
            Once installed, tap the Ember icon on your home screen to open the app whenever you'd like.
          </p>
        </StepCard>

        <div className="h-px bg-border my-[48px]" />
          <h2 className="text-[22px] font-semibold mb-4 text-foreground">Questions or Comments?</h2>
          <p className="text-muted-foreground mb-3 text-[17px]">When you encounter bugs, something you don't like, or have a suggestion, please let us know.</p>
          <p className="text-muted-foreground text-[17px]">Your feedback is incredibly valuable and will directly shape the product.</p>
          <p className="text-[19px] my-[24px]"><a href="mailto:feedback@emberstories.com" className="text-primary no-underline hover:underline">feedback@emberstories.com</a>.</p>
      </div>
    </div>
  )
}
