import { Link } from 'react-router-dom'

const AppleIcon = () => (
  <svg viewBox="0 0 814 1000" className="w-5 h-5 fill-white shrink-0">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 264.5-317.3 70 0 127.9 46.5 170.7 46.5 41 0 106.2-49.1 183.1-49.1 29.4 0 108.2 2.6 168.9 80.7zm-126.6-169.1c-30.7 36.4-78.7 64.5-126.7 64.5-5.2 0-10.4-.5-15.5-1.5 1-52.4 27.5-104.2 58.8-139.5 35.1-38.4 90-68.5 138.1-72.4 4.2 55.1-15.2 110.2-54.7 148.9z"/>
  </svg>
)

const AndroidIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1a1a1a] shrink-0">
    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C7.08 3.04 6 4.6 6 6.5h12c0-1.9-1.08-3.46-2.47-4.34zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
  </svg>
)

export default function BetaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans leading-relaxed">
      <div className="max-w-[720px] mx-auto px-6 py-[60px] pb-20 text-center">

        <img
          src="/assets/brand/EmberLogo-Vert-BlackTxt.svg"
          alt="Ember Stories"
          className="h-28 mx-auto mb-10"
        />

        <h1 className="text-[32px] font-semibold mb-4 tracking-[-0.5px] text-foreground">
          Welcome to Ember Beta.
        </h1>

        <p className="text-lg text-foreground mb-3">
          You're shaping Ember Stories before it's released to the world.
          Thank you for being here.
        </p>

        <p className="text-lg text-muted-foreground mb-12">
          Select your device below to get started. Installation takes about 60 seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">

          <Link
            to="/ios"
            className="flex-1 bg-black text-white rounded-lg px-6 py-5 flex items-center gap-4 hover:opacity-90 transition-opacity no-underline text-left"
          >
            <AppleIcon />
            <div>
              <div className="font-semibold text-[17px]">Install on iPhone</div>
              <div className="text-white/70 text-sm mt-0.5">iOS via TestFlight</div>
            </div>
            <span className="ml-auto text-white/50 text-lg">→</span>
          </Link>

          <Link
            to="/android"
            className="flex-1 bg-[#3DDC84] text-[#1a1a1a] rounded-lg px-6 py-5 flex items-center gap-4 hover:opacity-90 transition-opacity no-underline text-left"
          >
            <AndroidIcon />
            <div>
              <div className="font-semibold text-[17px]">Install on Android</div>
              <div className="text-[#1a1a1a]/60 text-sm mt-0.5">Android via Google Play</div>
            </div>
            <span className="ml-auto text-[#1a1a1a]/40 text-lg">→</span>
          </Link>

        </div>

        <div className="h-px bg-border my-[48px]" />
        <h2 className="text-[22px] font-semibold mb-4 text-foreground">Questions or Comments?</h2>
        <p className="text-muted-foreground mb-3 text-[17px]">When you encounter bugs, something you don't like, or have a suggestion, please let us know.</p>
        <p className="text-muted-foreground text-[17px]">Your feedback is incredibly valuable and will directly shape the product.</p>
        <p className="text-[19px] my-[24px]"><a href="mailto:feedback@emberstories.com" className="text-primary no-underline hover:underline">feedback@emberstories.com</a>.</p>

      </div>
    </div>
  )
}
