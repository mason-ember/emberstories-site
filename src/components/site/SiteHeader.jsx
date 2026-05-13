import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import './SiteHeader.css'

// Site-wide header. White bg, logo left, nav center-left, store CTAs right.
// Wireframe: emberstories-site-kb/planning/site_content/Home/ — top bar
// of ember-hero-wireframe-2.png. Currently lives only on the homepage; can
// be hoisted into a layout wrapper later if more pages adopt it.

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-header-logo" aria-label="Ember home">
          <img
            src="/assets/brand/EmberLogo-Horz-BlackTxt.svg"
            alt="Ember"
          />
        </Link>

        <nav className="site-header-nav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#get-app">Get App</a>
        </nav>

        <div className="site-header-actions">
          <Button
            type="button"
            size="sm"
            className="site-header-cta"
            data-store="apple"
          >
            App Store
          </Button>
          <Button
            type="button"
            size="sm"
            className="site-header-cta"
            data-store="google"
          >
            Google Play
          </Button>
        </div>
      </div>
    </header>
  )
}
