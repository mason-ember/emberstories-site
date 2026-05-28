import { Link } from 'react-router-dom'
import './SiteFooter.css'

// Site-wide footer. Logo, tagline, links, copyright. Reusable across any
// React-routed page (homepage, beta funnels, etc.). The static legal HTML
// pages in public/ — privacy.html, terms.html, account-deletion.html —
// are linked TO from here but can't import this component themselves.
//
// Pair with <SiteHeader /> for the standard site chrome.

const LINKS = [
  { label: 'Privacy', href: '/privacy.html' },
  { label: 'Terms',   href: '/terms.html' },
  { label: 'Contact', href: '/support.html' },
]

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Link to="/" className="site-footer-logo" aria-label="Ember home">
          <img
            src="/assets/brand/EmberLogo-Vert-BlackTxt.svg"
            alt="Ember"
          />
        </Link>

        <p className="site-footer-tagline">Ember to Remember.</p>

        <nav className="site-footer-nav" aria-label="Footer">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <p className="site-footer-copyright">
          © {year} Ember Stories Inc.
        </p>
      </div>
    </footer>
  )
}
