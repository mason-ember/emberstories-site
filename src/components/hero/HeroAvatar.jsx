import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useParallax } from './HeroParallaxContext'
import {
  AVATAR_OVERSHOOT_SCALE,
  AVATAR_POP_IN_DELAY_MS,
  AVATAR_POP_IN_OUT,
  AVATAR_SETTLE,
  AVATAR_STAGGER_MS,
  PARALLAX,
} from './heroConstants'

// Circular photo avatar with pop-out → swap → pop-in choreography.
//
// On phase change: scales to 0 (old gone), swaps to new content, waits for
// parent tile to finish sliding, then bounces back in. This keeps the avatar
// always belonging to a settled photo behind it. See Hero.md §7.

export default function HeroAvatar({ avatar, side }) {
  const slotRef = useParallax(PARALLAX.avatar[side])
  const innerRef = useRef(null)
  const [displayed, setDisplayed] = useState(avatar)
  const prevAvatarRef = useRef(avatar)

  useEffect(() => {
    if (avatar === prevAvatarRef.current) return
    prevAvatarRef.current = avatar

    const el = innerRef.current
    if (!el) return

    const sideDelay = side === 'right' ? AVATAR_STAGGER_MS / 1000 : 0

    const tl = gsap.timeline()
    tl.to(el, { scale: 0, duration: 0.15, ease: 'power2.in' })
      .call(() => setDisplayed(avatar))
      .to(
        el,
        { scale: AVATAR_OVERSHOOT_SCALE, duration: AVATAR_POP_IN_OUT, ease: 'power2.out' },
        `+=${AVATAR_POP_IN_DELAY_MS / 1000 + sideDelay}`,
      )
      .to(el, { scale: 1, duration: AVATAR_SETTLE, ease: 'power2.inOut' })

    return () => tl.kill()
  }, [avatar, side])

  const bgStyle = displayed.src
    ? { backgroundImage: `url(${displayed.src})` }
    : { backgroundColor: displayed.stubColor }

  return (
    <div ref={slotRef} className="hero-avatar-slot" aria-hidden="true">
      <div ref={innerRef} className="hero-avatar" style={bgStyle} />
    </div>
  )
}
