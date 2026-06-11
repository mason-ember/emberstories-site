import { useState } from 'react'
import StoreModal from './StoreModal'
import { STORE_URLS, STORE_FALLBACK_URL } from '@/data/storeUrls'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'
import './StoreCTAs.css'

// Reusable store CTA pair using the official Apple App Store and Google
// Play badges. Touch/desktop behavior is preserved from the prior pill
// implementation:
//   - Touch devices (phone/tablet): tapping a badge navigates directly
//     to the platform store URL.
//   - Mouse devices (desktop/laptop): clicking opens a modal with a QR
//     code that the user can scan with their phone camera.
//
// URLs live in src/data/storeUrls.js. The badges remain rendered as <a>
// elements so right-click "Open in new tab" / middle-click work
// universally; desktop click is intercepted and the modal opens instead.

const STORE_COPY = {
  apple: {
    label: 'Download on the App Store',
    badge: '/assets/badges/Download_on_the_App_Store_Badge_US_blk.svg',
    modalTitle: 'Download on iOS',
    modalSubtitle: 'Scan with your iPhone camera to install.',
  },
  google: {
    label: 'Get it on Google Play',
    badge: '/assets/badges/GetItOnGooglePlay_Badge_Web_color_English.svg',
    modalTitle: 'Download on Android',
    modalSubtitle: 'Scan with your phone camera to install.',
  },
}

export default function StoreCTAs() {
  const [openStore, setOpenStore] = useState(null) // 'apple' | 'google' | null
  const isTouch = useIsTouchDevice()

  const handleClick = (store) => (e) => {
    if (isTouch) return // Let the anchor follow the href normally.
    e.preventDefault()
    setOpenStore(store)
  }

  const renderBadge = (store) => {
    const c = STORE_COPY[store]
    return (
      <a
        key={store}
        href={STORE_URLS[store] ?? STORE_FALLBACK_URL}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick(store)}
        className={`store-cta store-cta--${store}`}
        aria-label={c.label}
      >
        <img src={c.badge} alt={c.label} />
      </a>
    )
  }

  return (
    <>
      <div className="store-ctas">
        {renderBadge('apple')}
        {renderBadge('google')}
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
