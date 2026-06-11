import { useEffect, useRef, useState } from 'react'
import StoreModal from '@/components/site/StoreModal'
import { STORE_URLS, STORE_FALLBACK_URL } from '@/data/storeUrls'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'
import './final-cta.css'

// §7 — Final Call To Action. Headline + subhead + official store badges.
// Mirrors the touch/desktop click behavior of <StoreCTAs />: phones link
// straight to the store, desktops open a QR modal.
//
// URLs live in src/data/storeUrls.js.

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

export default function FinalCTA() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [openStore, setOpenStore] = useState(null)
  const isTouch = useIsTouchDevice()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const handleClick = (store) => (e) => {
    if (isTouch) return
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
        className={`fcta-badge fcta-badge--${store}`}
        aria-label={c.label}
      >
        <img src={c.badge} alt={c.label} />
      </a>
    )
  }

  return (
    <section className="fcta-section" aria-labelledby="fcta-heading">
      <div
        ref={ref}
        className={`fcta-inner${visible ? ' is-visible' : ''}`}
      >
        <h2 id="fcta-heading" className="fcta-heading">
          Bring your stories home.
        </h2>
        <p className="fcta-sub">
          Free during launch on iOS and Android.
        </p>
        <div className="fcta-badges">
          {renderBadge('apple')}
          {renderBadge('google')}
        </div>
      </div>

      <StoreModal
        open={openStore !== null}
        onClose={() => setOpenStore(null)}
        title={openStore ? STORE_COPY[openStore].modalTitle : ''}
        subtitle={openStore ? STORE_COPY[openStore].modalSubtitle : ''}
        qrValue={openStore ? STORE_URLS[openStore] : ''}
        directUrl={openStore ? STORE_URLS[openStore] : ''}
      />
    </section>
  )
}
