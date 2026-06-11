import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { QRCodeSVG } from 'qrcode.react'
import './StoreModal.css'

// QR-code modal shown on desktop when a user clicks a store CTA. Mirrors
// the pops.fyi pattern: scan with phone camera to install. On touch devices
// the modal is bypassed entirely — StoreCTAs follows the link directly.
//
// A null/empty qrValue means the store listing isn't live yet (see
// src/data/storeUrls.js) — the modal shows a "coming soon" notice
// instead of a QR code.
//
// Closes on ESC, backdrop click, and the explicit × button. Body scroll
// locked while open. Renders into document.body via a portal so stacking
// contexts don't interfere with the backdrop.

export default function StoreModal({
  open,
  onClose,
  title,
  subtitle,
  qrValue,
  directUrl,
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="store-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="store-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="store-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="store-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseGlyph />
        </button>

        <h2 id="store-modal-title" className="store-modal-title">{title}</h2>
        <p className="store-modal-subtitle">{subtitle}</p>

        <div className="store-modal-qr">
          {qrValue ? (
            <QRCodeSVG value={qrValue} size={240} level="M" />
          ) : (
            <div className="store-modal-placeholder">
              <strong>Coming soon</strong>
              <span>
                Our Google Play listing is being finalized.
                Please check back shortly.
              </span>
            </div>
          )}
        </div>

        {directUrl && (
          <a
            href={directUrl}
            target="_blank"
            rel="noreferrer"
            className="store-modal-direct"
          >
            Or open the store directly
          </a>
        )}
      </div>
    </div>,
    document.body,
  )
}

function CloseGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
