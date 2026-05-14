import { useEffect, useState } from 'react'

// Detects touch-primary devices (phones, tablets) using the standard
// media-query signal: `(hover: none) and (pointer: coarse)`. Mouse-driven
// laptops with touchscreens (Surface, hybrids) return false here, which is
// what we want — they have a mouse so should get the QR modal flow.
export function useIsTouchDevice() {
  const [touch, setTouch] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)')
    const handler = (e) => setTouch(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return touch
}
