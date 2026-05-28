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
    title: "Ethan's 7th Birthday",
    dateRange: 'April 13, 2021',
    centerpiece: {
      src: '/assets/images/hero/hero-birthday-centerpiece.jpg',
      stubColor: '#b8889a',
    },
    thumbnails: {
      left: {
        src: '/assets/images/hero/hero-birthday-landscape.jpg',
        stubColor: '#a89483',
        avatar: { src: '/assets/images/hero/avatar-03.jpg', stubColor: '#e8a0bf' },
      },
      right: {
        src: '/assets/images/hero/hero-birthday-portrait.jpg',
        stubColor: '#7c9ca0',
        avatar: { src: '/assets/images/hero/avatar-04.jpg', stubColor: '#a9c4d8' },
      },
    },
  },
  travel: {
    id: 'travel',
    title: 'Fall Break in Zion & the Grand Canyon',
    dateRange: 'October 14 – 21, 2023',
    centerpiece: {
      src: '/assets/images/hero/hero-travel-centerpiece.jpg',
      stubColor: '#b08968',
    },
    thumbnails: {
      left: {
        src: '/assets/images/hero/hero-travel-landscape.jpg',
        stubColor: '#8a9a7c',
        avatar: { src: '/assets/images/hero/avatar-01.jpg', stubColor: '#9b86bd' },
      },
      right: {
        src: '/assets/images/hero/hero-travel-portrait.jpg',
        stubColor: '#a78a7f',
        avatar: { src: '/assets/images/hero/avatar-02.jpg', stubColor: '#7a9e9f' },
      },
    },
  },
  holiday: {
    id: 'holiday',
    title: 'Halloween 2018',
    dateRange: 'October 31, 2018',
    centerpiece: {
      src: '/assets/images/hero/hero-holiday-centerpiece.jpg',
      stubColor: '#c08552',
    },
    thumbnails: {
      left: {
        src: '/assets/images/hero/hero-holiday-landscape.jpg',
        stubColor: '#8a6a7e',
        avatar: { src: '/assets/images/hero/avatar-09.jpg', stubColor: '#d4a574' },
      },
      right: {
        src: '/assets/images/hero/hero-holiday-portrait.jpg',
        stubColor: '#9a8c83',
        avatar: { src: '/assets/images/hero/avatar-12.jpg', stubColor: '#8a9474' },
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
//
// Each shape carries its own src + orientation. `stubColors` are kept as
// fallbacks should an image fail to load.
export const HERO_BG_LAYERS = [
  {
    id: 'back',
    blurPx: 24,
    opacityRange: [0.3, 0.5],
    stubColors: ['#f4e9e3', '#e9eff3', '#f0eae3', '#ede5ec'],
    shapes: [
      { src: '/assets/images/hero/bg-back-01.png', isPortrait: false },
      { src: '/assets/images/hero/bg-back-02.png', isPortrait: false },
      {
        src: '/assets/images/hero/bg-back-03.png',
        isPortrait: false,
        position: { top: '0.70%', left: '62%' }, // hand-placed override
      },
      { src: '/assets/images/hero/bg-back-04.png', isPortrait: true },
    ],
  },
  {
    id: 'mid',
    blurPx: 12,
    opacityRange: [0.4, 0.6],
    stubColors: ['#e8d5d0', '#d5dfe5', '#dfd5d5'],
    shapes: [
      { src: '/assets/images/hero/bg-mid-01.png', isPortrait: false },
      { src: '/assets/images/hero/bg-mid-02.png', isPortrait: false },
      { src: '/assets/images/hero/bg-mid-03.png', isPortrait: true },
    ],
  },
  {
    id: 'front',
    blurPx: 6,
    opacityRange: [0.5, 0.7],
    stubColors: ['#d4bab2', '#bcc8d2', '#c9bdc3'],
    shapes: [
      { src: '/assets/images/hero/bg-front-01.png', isPortrait: false },
      { src: '/assets/images/hero/bg-front-02.png', isPortrait: false },
      { src: '/assets/images/hero/bg-front-03.png', isPortrait: true },
    ],
  },
]
