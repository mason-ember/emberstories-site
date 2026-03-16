import { useScroll, useTransform, useSpring, useReducedMotion, motion } from 'framer-motion'

const hasImage = false // flip to true once photos exist in public/assets/images/home/

// 4 columns × 5 rows = 20 photos
// Even columns (0,2): portrait-landscape-portrait-landscape-portrait
// Odd  columns (1,3): landscape-portrait-landscape-portrait-landscape
// All photos 260px wide — perspective projection makes right columns appear smaller/farther

const COLORS = [
  '#d4b8e0', '#b8cfe0', '#c4b8e0', '#b8e0c4', '#e0b8b8',
  '#e0d4b8', '#c4e0b8', '#b8d4e0', '#e0c4b8', '#d4e0b8',
  '#b8b8e0', '#e0b8d4', '#d4c4e0', '#c4d4e0', '#d4b8c4',
  '#b8c4e0', '#e0d4c4', '#c4e0d4', '#e0c4d4', '#d4e0c4',
]

function buildColumns() {
  const cols = []
  let photoIndex = 0
  for (let col = 0; col < 4; col++) {
    const isEven = col % 2 === 0
    const photos = []
    for (let row = 0; row < 5; row++) {
      const isPortrait = isEven ? row % 2 === 0 : row % 2 !== 0
      photos.push({
        index: photoIndex,
        aspect: isPortrait ? '3/4' : '4/3',
        color: COLORS[photoIndex % COLORS.length],
      })
      photoIndex++
    }
    cols.push(photos)
  }
  return cols
}

const columns = buildColumns()

// Vertical offset per column — creates the staircase that becomes the diagonal in perspective
const COL_OFFSET = 110  // px — each column shifted up from the previous
const COL_WIDTH  = 260  // px
const COL_GAP    =  16  // px
const ROW_GAP    =  16  // px

export default function ScrollPhotoGrid() {
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll() // window-level scroll

  const smooth = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 18,
    restDelta: 0.001,
  })

  // Entire grid translates from below viewport to above as user scrolls
  const gridY = useTransform(smooth, [0.05, 0.72], reduced ? ['0vh', '0vh'] : ['120vh', '-160vh'])
  // Subtle X drift reinforces the diagonal sweep direction
  const gridX = useTransform(smooth, [0.05, 0.72], reduced ? ['0vw', '0vw'] : ['0vw', '-6vw'])

  if (reduced) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
        // Perspective must be on the parent, not the rotated element
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          // Offset grid left so the leftmost column bleeds off-screen at start
          left: '-5vw',
          top: 0,
          width: 4 * COL_WIDTH + 3 * COL_GAP,
          // rotateY tilts the plane: left = close/large, right = small/far
          rotateY: 32,
          y: gridY,
          x: gridX,
          transformStyle: 'preserve-3d',
        }}
      >
        {columns.map((photos, colIndex) => (
          <div
            key={colIndex}
            style={{
              position: 'absolute',
              left: colIndex * (COL_WIDTH + COL_GAP),
              top: 0,
              width: COL_WIDTH,
              // Staircase: each column shifted upward, creating diagonal in perspective
              transform: `translateY(${-colIndex * COL_OFFSET}px)`,
            }}
          >
            {photos.map((photo, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  width: COL_WIDTH,
                  aspectRatio: photo.aspect,
                  borderRadius: 10,
                  overflow: 'hidden',
                  marginBottom: ROW_GAP,
                  boxShadow: '0 6px 32px rgba(0,0,0,0.13)',
                }}
              >
                {hasImage ? (
                  <img
                    src={`/assets/images/home/photo${String(photo.index + 1).padStart(2, '0')}.jpg`}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: photo.color }} />
                )}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
