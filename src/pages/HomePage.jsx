import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans leading-relaxed">
      <div className="max-w-[720px] mx-auto px-6 py-[60px] pb-20 text-center">

        <img
          src="/assets/brand/EmberLogo-Vert-BlackTxt.svg"
          alt="Ember Stories"
          className="h-28 mx-auto mb-10"
        />

        <h1 className="text-[32px] font-semibold mb-4 tracking-[-0.5px] text-foreground">
          Your family's story, beautifully told.
        </h1>

        <p className="text-lg text-muted-foreground mb-10 max-w-[520px] mx-auto">
          Ember Stories transforms your shared photos into collaborative, narrative-driven memories — built for the whole household.
        </p>

        <div className="bg-muted border border-border rounded-lg px-6 py-6 mb-10">
          <p className="text-sm font-extrabold uppercase tracking-widest text-primary mb-2">Private Beta</p>
          <p className="text-[17px] text-foreground font-medium mb-1">Ember is currently invite-only.</p>
          <p className="text-muted-foreground text-[16px] mb-5">If you received an invitation, tap below to get the app on your device.</p>
          <Button asChild size="lg">
            <Link to="/beta">Get Ember Beta</Link>
          </Button>
        </div>

        <div className="h-px bg-border my-[48px]" />

        <footer>
          <p className="text-muted-foreground text-sm mb-3">© 2026 William Mason Shewman, LLC</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="/privacy.html" className="text-muted-foreground hover:text-foreground transition-colors no-underline">Privacy Policy</a>
            <a href="/terms.html" className="text-muted-foreground hover:text-foreground transition-colors no-underline">Terms of Service</a>
          </div>
        </footer>

      </div>
    </div>
  )
}
