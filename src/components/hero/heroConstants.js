// Central tunables for hero motion. See Hero.md §6, §7.
// Local values (exact stagger ms, easing curves) are expected to drift during
// build; keep them here so iteration is one file, not seven.

// Phase cycle
export const PHASE_DURATION_MS = 6000

// Slide-over transition
export const SLIDE_DURATION = 0.55 // seconds; GSAP duration unit
export const SLIDE_EASE_IN = 'power2.in' // outgoing
export const SLIDE_EASE_OUT = 'power2.out' // incoming

// Per-tile slide axis + per-tile stagger from phase-change instant (ms).
// Direction reads "old goes this way, new comes from the opposite side"
// (Instagram-Stories pattern). Same axis for each tile keeps the transition
// directional rather than chaotic.
export const TILE_CONFIG = {
  centerpiece: { direction: 'up', delayMs: 0 },
  'thumb-left': { direction: 'left', delayMs: 50 },
  'thumb-right': { direction: 'right', delayMs: 100 },
}

// Avatar pop/bounce
export const AVATAR_POP_OUT_MS = 150
export const AVATAR_POP_IN_DELAY_MS = 700 // fires after photo settles
export const AVATAR_POP_IN_OUT = 0.18 // duration of overshoot in seconds
export const AVATAR_SETTLE = 0.12 // settle from overshoot in seconds
export const AVATAR_OVERSHOOT_SCALE = 1.08
// Per-side stagger so left avatar pops in just before right.
export const AVATAR_STAGGER_MS = 80

// Centerpiece title (separate from photo)
export const TITLE_FADE_OUT_MS = 150
export const TITLE_FADE_IN_DELAY_MS = 800
export const TITLE_FADE_IN_DURATION = 0.32

// Mouse parallax — per-element. Each entry can specify:
//   depth      isotropic px displacement (sets both X and Y to the same value)
//   depthX     horizontal displacement (overrides depth on X axis)
//   depthY     vertical displacement (overrides depth on Y axis)
//   lerp       GSAP quickTo duration in seconds — higher = smoother/laggier,
//              lower = snappier/more responsive
//
// Per-tile personalities:
//   centerpiece — anchored: small depths, slow lerp (the eye of the storm)
//   thumb-left  — horizontal bias: slides side-to-side more than it bobs
//   thumb-right — vertical bias:   bobs up-and-down more than it slides
// The thumbs don't just travel by different amounts — they *respond* on
// different timescales (snappier than the centerpiece) and prefer different
// axes, giving each an independent feel.
//
// Avatars inherit a matching bias from their parent tile but float on top:
// slightly higher depths and faster lerp so they appear detached.
//
// Backgrounds: deeper layers use slower lerp (dreamier, cloud-like).
export const PARALLAX = {
  bgBack:  { depth: 30, lerp: 0.9 },
  bgMid:   { depth: 20, lerp: 0.7 },
  bgFront: { depth: 12, lerp: 0.5 },
  tile: {
    centerpiece:   { depthX: 5,  depthY: 4,  lerp: 0.8 },
    'thumb-left':  { depthX: 17, depthY: 6,  lerp: 0.30 }, // hard horizontal bias, whip-snappy
    'thumb-right': { depthX: 6,  depthY: 19, lerp: 0.45 }, // hard vertical bias, deliberate glide
  },
  avatar: {
    left:  { depthX: 19, depthY: 7,  lerp: 0.26 }, // slight bump over thumb-left for "floats on its own"
    right: { depthX: 7,  depthY: 21, lerp: 0.40 }, // slight bump over thumb-right for "floats on its own"
  },
  sticker: { depth: 14, lerp: 0.5 },
}

// Scroll-parallax coefficients per bg tier. Used by useScrollParallax.
//   0   = element scrolls with the page (no parallax)
//   1   = element is pinned to its starting viewport position
// Distant (back) > near (front) so the deepest layer drifts away most slowly,
// reinforcing the depth illusion.
export const BG_SCROLL_PARALLAX = {
  bgBack:  0.45,
  bgMid:   0.30,
  bgFront: 0.15,
}

// Responsive breakpoint matching existing site convention
export const MOBILE_BREAKPOINT_PX = 768
