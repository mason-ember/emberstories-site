import { Button } from '@/components/ui/button'

function StepCard({ number, title, image, alt, imageBelow = false, imageSide = false, placeholder = false, children }) {
  const imageEl = image ? (
    <img
      src={image}
      alt={alt}
      className={imageBelow
        ? 'w-full rounded-lg object-contain'
        : 'w-[80px] h-[80px] shrink-0 object-contain'
      }
    />
  ) : placeholder ? (
    <div className={`shrink-0 rounded-lg border-2 border-dashed border-ember-gray-300 bg-ember-gray-100 flex items-center justify-center text-ember-gray-400 text-xs ${imageBelow ? 'w-full h-[200px]' : 'w-[90px] h-[90px]'}`}>
      image
    </div>
  ) : null

  if (imageSide) {
    return (
      <div className="bg-muted rounded-lg border border-border py-4 px-4 mb-8 text-left">
        <p className="text-sm font-extrabold uppercase tracking-widest text-primary mb-1">
          Step {number}
        </p>
        <h2 className="text-[20px] font-semibold mb-3 text-foreground">
          {title}
        </h2>
        <div className="flex gap-6 items-start">
          <div className="flex-1 min-w-0">{children}</div>
          {imageEl}
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-muted rounded-lg border border-border py-4 px-4 mb-8 flex gap-6 ${imageBelow ? 'flex-col' : 'flex-row items-center'}`}>

      {/* Content */}
      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm font-extrabold uppercase tracking-widest text-primary mb-1">
          Step {number}
        </p>
        <h2 className="text-[20px] font-semibold mb-3 text-foreground">
          {title}
        </h2>
        {children}
      </div>

      {imageEl}

    </div>
  )
}

export default function IosPage() {
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

        <p className="text-lg text-foreground mb-6">
          Ember Stories is currently in private beta.
          This build gives you early access before public release.
          Installation takes about 60 seconds.
        </p>

        <div className="bg-black rounded-lg px-5 py-3 mb-3 text-[15px] text-white font-medium flex items-center justify-center gap-2">
          <svg viewBox="0 0 814 1000" className="w-4 h-4 fill-white shrink-0">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 264.5-317.3 70 0 127.9 46.5 170.7 46.5 41 0 106.2-49.1 183.1-49.1 29.4 0 108.2 2.6 168.9 80.7zm-126.6-169.1c-30.7 36.4-78.7 64.5-126.7 64.5-5.2 0-10.4-.5-15.5-1.5 1-52.4 27.5-104.2 58.8-139.5 35.1-38.4 90-68.5 138.1-72.4 4.2 55.1-15.2 110.2-54.7 148.9z"/>
          </svg>
          iOS installation instructions.
        </div>

        <p className="text-sm text-muted-foreground mb-10">
          Installing on Android?{' '}
          <a href="/android" className="text-primary hover:underline">Visit the Android page →</a>
        </p>

        <StepCard number={1} title="Install Apple TestFlight" image="/assets/images/testing/testflight-launch-icon.png" alt="TestFlight app icon" imageSide>
          <p className="text-muted-foreground mb-5 text-[17px]">
            TestFlight is Apple's official beta testing app.
            If you don't already have it installed, download it here.
          </p>
          <Button asChild size="lg">
            <a
              href="https://apps.apple.com/us/app/testflight/id899247664"
              rel="noopener noreferrer"
            >
              Download TestFlight
            </a>
          </Button>
        </StepCard>

        <StepCard number={2} title="Install Ember Beta">
          <p className="text-muted-foreground mb-5 text-[17px]">
            After TestFlight is installed, tap this button to join the Ember Beta.
          </p>
          <Button asChild size="lg">
            <a
              href="https://testflight.apple.com/join/4q4e415j"
              rel="noopener noreferrer"
            >
              Install Ember Beta
            </a>
          </Button>
        </StepCard>

        <StepCard number={3} title='Tap "Install" Inside TestFlight' image="/assets/images/testing/testflight-screenshot.png" alt="TestFlight install screen" imageBelow>
          <p className="text-muted-foreground text-[17px]">
            When Ember appears in TestFlight, tap <strong className="text-foreground">Install</strong>.
            The app will download to your home screen.
          </p>
        </StepCard>

        <StepCard number={4} title="Open Ember Anytime" image="/assets/images/testing/ember-launch-icon.png" alt="Ember app icon" imageSide>
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
