import { useState } from 'react'
import { Button } from '@/components/ui/button'

const AndroidIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#1a1a1a] shrink-0">
    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C7.08 3.04 6 4.6 6 6.5h12c0-1.9-1.08-3.46-2.47-4.34zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
  </svg>
)

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function AndroidSignupPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'android-beta-signup', email }),
    })
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
  }

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
        </p>

        <div className="bg-[#3DDC84] rounded-lg px-5 py-3 mb-10 text-[15px] text-[#1a1a1a] font-medium flex items-center justify-center gap-2">
          <AndroidIcon />
          Android installation instructions.
        </div>

        {status === 'success' ? (
          <div className="bg-muted border border-border rounded-lg px-6 py-8 text-center">
            <p className="text-[22px] font-semibold text-foreground mb-3">You're on the list.</p>
            <p className="text-muted-foreground text-[17px]">
              We'll add your Gmail address to the beta program and send you an installation link shortly.
            </p>
          </div>
        ) : (
          <div className="bg-muted border border-border rounded-lg px-6 py-6 text-left">
            <p className="text-sm font-extrabold uppercase tracking-widest text-primary mb-2">Step 1 of 2</p>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">Request Beta Access</h2>
            <p className="text-muted-foreground text-[17px] mb-6">
              Android's beta program requires us to add you by email before you can install.
              Enter your <strong className="text-foreground">Gmail address</strong> below and we'll
              send you an installation link once you've been added — usually within a day.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                name="email"
                required
                placeholder="your@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={status === 'submitting'}
                className="flex-1 px-4 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-[16px] disabled:opacity-50"
              />
              <Button type="submit" size="lg" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Request Access'}
              </Button>
            </form>
            {status === 'error' && (
              <p className="text-red-500 text-sm mt-3">Something went wrong. Please try emailing us at <a href="mailto:feedback@emberstories.com" className="underline">feedback@emberstories.com</a>.</p>
            )}
            <p className="text-muted-foreground text-sm mt-4">
              Once added, you'll receive an email with a link to <strong className="text-foreground">Step 2</strong> — the installation guide.
            </p>
          </div>
        )}

        <div className="h-px bg-border my-[48px]" />
        <h2 className="text-[22px] font-semibold mb-4 text-foreground">Questions or Comments?</h2>
        <p className="text-muted-foreground mb-3 text-[17px]">When you encounter bugs, something you don't like, or have a suggestion, please let us know.</p>
        <p className="text-muted-foreground text-[17px]">Your feedback is incredibly valuable and will directly shape the product.</p>
        <p className="text-[19px] my-[24px]"><a href="mailto:feedback@emberstories.com" className="text-primary no-underline hover:underline">feedback@emberstories.com</a>.</p>

      </div>
    </div>
  )
}
