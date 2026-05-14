import { useState } from 'react'
import { Button } from '@/components/ui/button'
import StoreModal from './StoreModal'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'
import './StoreCTAs.css'

// Reusable store CTA pair: iOS (black) + Android (Play green) with their
// platform glyphs. Same color/glyph language as BetaPage's install buttons.
//
// Behavior follows pops.fyi:
//   - Touch devices (phone/tablet): tapping a CTA navigates directly to
//     the platform store URL.
//   - Mouse devices (desktop/laptop): clicking opens a modal with a QR
//     code that the user can scan with their phone camera.
//
// URLs in STORE_URLS are placeholders — replace when real App Store /
// Google Play URLs are assigned. The buttons remain rendered as <a>
// elements so right-click "Open in new tab" / middle-click work
// universally; desktop click is intercepted and the modal opens instead.

const STORE_URLS = {
  apple: 'https://emberstories.com', // TODO: real App Store URL
  google: 'https://emberstories.com', // TODO: real Google Play URL
}

const STORE_COPY = {
  apple: {
    label: 'iOS',
    modalTitle: 'Download on iOS',
    modalSubtitle: 'Scan with your phone camera to install Ember.',
  },
  google: {
    label: 'Android',
    modalTitle: 'Download on Android',
    modalSubtitle: 'Scan with your phone camera to install Ember.',
  },
}

const AppleIcon = () => (
  <svg
    viewBox="0 0 814 1000"
    fill="currentColor"
    aria-hidden="true"
    style={{ width: 20, height: 20 }}
  >
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 264.5-317.3 70 0 127.9 46.5 170.7 46.5 41 0 106.2-49.1 183.1-49.1 29.4 0 108.2 2.6 168.9 80.7zm-126.6-169.1c-30.7 36.4-78.7 64.5-126.7 64.5-5.2 0-10.4-.5-15.5-1.5 1-52.4 27.5-104.2 58.8-139.5 35.1-38.4 90-68.5 138.1-72.4 4.2 55.1-15.2 110.2-54.7 148.9z" />
  </svg>
)

const AndroidIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ width: 20, height: 20 }}
  >
    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C7.08 3.04 6 4.6 6 6.5h12c0-1.9-1.08-3.46-2.47-4.34zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
  </svg>
)

const ICONS = { apple: AppleIcon, google: AndroidIcon }

export default function StoreCTAs() {
  const [openStore, setOpenStore] = useState(null) // 'apple' | 'google' | null
  const isTouch = useIsTouchDevice()

  const handleClick = (store) => (e) => {
    if (isTouch) return // Let the anchor follow the href normally.
    e.preventDefault()
    setOpenStore(store)
  }

  const renderButton = (store) => {
    const Icon = ICONS[store]
    return (
      <Button
        asChild
        type="button"
        className="store-cta"
        data-store={store}
      >
        <a
          href={STORE_URLS[store]}
          target="_blank"
          rel="noreferrer"
          onClick={handleClick(store)}
        >
          <Icon />
          {STORE_COPY[store].label}
        </a>
      </Button>
    )
  }

  return (
    <>
      <div className="store-ctas">
        {renderButton('apple')}
        {renderButton('google')}
      </div>

      <StoreModal
        open={openStore !== null}
        onClose={() => setOpenStore(null)}
        title={openStore ? STORE_COPY[openStore].modalTitle : ''}
        subtitle={openStore ? STORE_COPY[openStore].modalSubtitle : ''}
        qrValue={openStore ? STORE_URLS[openStore] : ''}
        directUrl={openStore ? STORE_URLS[openStore] : ''}
      />
    </>
  )
}
