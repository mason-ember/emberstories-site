import { Button } from '@/components/ui/button'

function Step({ number, title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-[22px] font-semibold mt-10 mb-2.5 text-[#3B074B]">
        Step {number} — {title}
      </h2>
      {children}
    </div>
  )
}

export default function TestFlightPage() {
  return (
    <div className="min-h-screen bg-white text-[#3B074B] font-sans leading-relaxed">
      <div className="max-w-[720px] mx-auto px-6 py-[60px] pb-20">

        <h1 className="text-[32px] font-semibold mb-4 tracking-[-0.5px] text-[#3B074B]">
          You're helping shape Ember.
        </h1>

        <p className="text-lg text-[#444] mb-10">
          Ember is currently in private beta.{' '}
          This build gives you early access before public release.
          Installation takes about 60 seconds.
        </p>

        <Step number={1} title="Install Apple TestFlight">
          <p className="text-[#666] mb-5 text-[17px]">
            TestFlight is Apple's official beta testing app.{' '}
            If you don't already have it installed, download it below.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[#ddd] bg-white text-[#444] hover:bg-[#f5f5f5] hover:text-[#3B074B]"
          >
            <a
              href="https://apps.apple.com/us/app/testflight/id899247664"
              target="_blank"
              rel="noreferrer"
            >
              Download TestFlight
            </a>
          </Button>
        </Step>

        <Step number={2} title="Install Ember Beta">
          <p className="text-[#666] mb-5 text-[17px]">
            Once TestFlight is installed, tap the button below.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-br from-[#ff6a00] to-[#ff8c42] text-white shadow-[0_4px_14px_rgba(255,106,0,0.35)] hover:shadow-[0_6px_18px_rgba(255,106,0,0.45)] hover:-translate-y-0.5 transition-all"
          >
            <a href="YOUR_TESTFLIGHT_LINK_HERE" target="_blank" rel="noreferrer">
              Install Ember Beta
            </a>
          </Button>
        </Step>

        <Step number={3} title='Tap "Install" Inside TestFlight'>
          <p className="text-[#666] text-[17px]">
            When Ember appears in TestFlight, tap <strong className="text-[#3B074B]">Install</strong>.{' '}
            The app will download to your home screen.
          </p>
        </Step>

        <div className="h-px bg-[#eee] my-[60px]" />

        <div className="bg-[#f9f9f9] p-6 rounded-[10px] border border-[#eee]">
          <h2 className="text-[22px] font-semibold mb-2.5 text-[#3B074B]">What to Expect</h2>
          <p className="text-[#666] mb-5 text-[17px]">This is an early build.</p>
          <p className="text-[#666] mb-5 text-[17px]">
            You may encounter bugs. Features may evolve quickly.
          </p>
          <p className="text-[#666] text-[17px]">
            Your feedback directly shapes the product.
          </p>
        </div>

        <footer className="mt-[60px] text-sm text-[#888]">
          <p className="mb-2">Need help? Reach out directly.</p>
          <p>
            William Shewman
            <br />
            <a
              href="mailto:william@emberstories.com"
              className="text-[#3498db] no-underline hover:underline"
            >
              william@emberstories.com
            </a>
          </p>
        </footer>

      </div>
    </div>
  )
}
