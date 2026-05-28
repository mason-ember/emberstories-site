import { Link } from 'react-router-dom'
import './SiteHeader.css'

// Site-wide header. White bg, logo left, nav links right. The primary
// store CTAs (App Store / Google Play) live in the hero instead — see
// StoreCTAs.jsx — since the hero is where attention is highest.

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
          <a href="/support.html">Contact</a>
        </nav>
      </div>
    </header>
  )
}
