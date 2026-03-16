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

export default function AndroidPage() {
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

        <div className="bg-[#3DDC84] rounded-lg px-5 py-3 mb-3 text-[15px] text-[#1a1a1a] font-medium flex items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#1a1a1a] shrink-0">
            <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C7.08 3.04 6 4.6 6 6.5h12c0-1.9-1.08-3.46-2.47-4.34zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
          </svg>
          Android installation instructions.
        </div>

        <p className="text-sm text-muted-foreground mb-10">
          Installing on iPhone?{' '}
          <a href="/ios" className="text-primary hover:underline">Visit the iOS page →</a>
        </p>

        <StepCard number={1} title="Join the Ember Beta" image="/assets/images/testing/google-play-icon.png" alt="Google Play icon" imageSide>
          <p className="text-muted-foreground mb-5 text-[17px]">
            Open the link below on your Android phone. This takes you to Google Play's testing program for Ember. Tap <strong className="text-foreground">Become a tester</strong> to join.
          </p>
          <Button asChild size="lg">
            <a
              href="https://play.google.com/apps/testing/com.emberstories.EmberDev1"
              rel="noopener noreferrer"
            >
              Join the Beta
            </a>
          </Button>
        </StepCard>

        <StepCard number={2} title="Become Tester & Download" placeholder imageBelow>
          <ol className="text-muted-foreground text-[17px] list-decimal list-inside space-y-2">
            <li>Tap <strong className="text-foreground">Become a tester</strong></li>
            <li>Tap <strong className="text-foreground">Download it on Google Play</strong></li>
          </ol>
        </StepCard>

        <StepCard number={3} title="Tap Install" placeholder imageBelow>
          <p className="text-muted-foreground text-[17px]">
            On the Ember Play Store listing, tap <strong className="text-foreground">Install</strong>. The app will download to your phone.
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
