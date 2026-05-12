// Hero phase content. See emberstories-site-kb/planning/site_content/Home/Hero.md §5.
//
// Each phase represents one Ember story archetype. The hero cycles through these
// in PHASE_ORDER. Reorder = edit PHASE_ORDER below. Do not randomize — first phase
// shapes first impressions.
//
// Stub stage: every photo + avatar entry has `src: null` and a `stubColor` used
// as a flat background. Components render the image when `src` is populated and
// fall back to `stubColor` otherwise. Drop in real assets by populating `src`;
// `stubColor` becomes inert.

export const PHASE_ORDER = ['milestone', 'travel', 'holiday']

export const HERO_PHASES = {
  milestone: {
    id: 'milestone',
    title: "Becca's 4th Birthday",
    centerpiece: { src: null, stubColor: '#b8889a' }, // dusty rose-mauve — birthday warm
    thumbnails: {
      left: {
        src: null,
        stubColor: '#a89483', // warm taupe
        avatar: { src: null, stubColor: '#e8a0bf' }, // blush
      },
      right: {
        src: null,
        stubColor: '#7c9ca0', // dusty teal
        avatar: { src: null, stubColor: '#a9c4d8' }, // soft blue
      },
    },
  },
  travel: {
    id: 'travel',
    title: 'Fall Break in Yellowstone',
    centerpiece: { src: null, stubColor: '#b08968' }, // canyon terracotta
    thumbnails: {
      left: {
        src: null,
        stubColor: '#8a9a7c', // forest sage
        avatar: { src: null, stubColor: '#9b86bd' }, // muted purple
      },
      right: {
        src: null,
        stubColor: '#a78a7f', // muted clay
        avatar: { src: null, stubColor: '#7a9e9f' }, // muted teal
      },
    },
  },
  holiday: {
    id: 'holiday',
    title: 'Halloween 2018',
    centerpiece: { src: null, stubColor: '#c08552' }, // pumpkin amber
    thumbnails: {
      left: {
        src: null,
        stubColor: '#8a6a7e', // muted plum
        avatar: { src: null, stubColor: '#d4a574' }, // orange-tan
      },
      right: {
        src: null,
        stubColor: '#9a8c83', // warm gray
        avatar: { src: null, stubColor: '#8a9474' }, // dusty olive
      },
    },
  },
}

// Background blurry parallax photo layers. Three depth tiers from deepest to
// shallowest (see Hero.md §6). During stub stage these render as flat pastel
// shapes; later they become pre-blurred photos.
//
// `count` controls how many shapes per tier. `depth` is the parallax coefficient
// (higher = moves more = perceived farther). `blurPx` is the export-time blur
// applied to the image (held here for documentation; stub stage doesn't blur).

// Parallax depth + lerp per tier live in heroConstants.PARALLAX (bgBack /
// bgMid / bgFront) — looked up by id in HeroBackground.
export const HERO_BG_LAYERS = [
  {
    id: 'back',
    count: 4,
    blurPx: 24,
    stubColors: ['#f4e9e3', '#e9eff3', '#f0eae3', '#ede5ec'],
    opacityRange: [0.4, 0.6],
  },
  {
    id: 'mid',
    count: 3,
    blurPx: 12,
    stubColors: ['#e8d5d0', '#d5dfe5', '#dfd5d5'],
    opacityRange: [0.5, 0.7],
  },
  {
    id: 'front',
    count: 3,
    blurPx: 6,
    stubColors: ['#d4bab2', '#bcc8d2', '#c9bdc3'],
    opacityRange: [0.6, 0.8],
  },
]
