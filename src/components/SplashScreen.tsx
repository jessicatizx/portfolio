import React from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Asset URLs from Figma (file: cZjmL7G3dpEeAAAvpqn4ia)
// Note: these URLs expire after 7 days — replace with local assets after that
// ─────────────────────────────────────────────────────────────────────────────

// Closed bud — 10 individual vector pieces (257 × 237.665 px in Figma)
const B = {
  v115: 'https://www.figma.com/api/mcp/asset/12425b8e-5b95-4dab-969f-07a2891047a7', // center dark petal (rises first)
  v116: 'https://www.figma.com/api/mcp/asset/65c59982-a307-4fcf-ac13-055aabbe8510', // right-of-center inner petal
  v113: 'https://www.figma.com/api/mcp/asset/8ad49e66-5780-4894-ac29-04cf826c57dd', // left mid petal (1.3° in bud)
  v114: 'https://www.figma.com/api/mcp/asset/4958c904-e148-4d35-8b97-11a73f325160', // right mid petal
  v111: 'https://www.figma.com/api/mcp/asset/89a5711f-25f8-4a32-8556-c68519dc0381', // left outer petal
  v112: 'https://www.figma.com/api/mcp/asset/9bbf7eb9-7be3-44ca-a259-c85d04c0be27', // right outer petal
  v120: 'https://www.figma.com/api/mcp/asset/0e8332a4-7edc-43b2-a3a6-48284d80ae05', // back-center petal
  v117: 'https://www.figma.com/api/mcp/asset/5af619c8-60f4-4603-8272-cc2041eea60a', // right leaf
  v118: 'https://www.figma.com/api/mcp/asset/856f5fcb-dea9-42a3-a953-cac010b3ae06', // left leaf (displayed mirrored)
  v119: 'https://www.figma.com/api/mcp/asset/57d91048-a0b4-4c4f-8723-b4214974cdf3', // bottom sepal
}

// Partially open — flat image (281 × 236 px in Figma)
const IMG_PARTIAL = 'https://www.figma.com/api/mcp/asset/d138b2c2-627d-43aa-bbf5-5c4f576bfb6f'

// Fully open — flat image (562 × 472 px in Figma)
const IMG_FULL = 'https://www.figma.com/api/mcp/asset/8f88a2b9-0a81-4707-8480-46e4216e8a70'

// Display sizes (scaled for viewport)
const BUD_W     = 214
const BUD_H     = Math.round(BUD_W * 237.665 / 257)   // ≈ 198
const PARTIAL_W = 250
const PARTIAL_H = Math.round(PARTIAL_W * 236.038 / 281) // ≈ 210
const FULL_W    = 340
const FULL_H    = Math.round(FULL_W * 472.076 / 562)   // ≈ 285

// Full bloom scales up from partial's visual size
const BLOOM_START_SCALE = PARTIAL_W / FULL_W
const BLOOM_EASE        = 'cubic-bezier(0.22, 1, 0.36, 1)'
const BLOOM_DURATION    = '1.45s'

const OPEN_EASE = 'cubic-bezier(0.25, 0.88, 0.45, 1)'   // smooth deceleration, no snap
const SETTLE    = 'cubic-bezier(0.33, 0.72, 0.25, 1)'

// ─────────────────────────────────────────────────────────────────────────────
// Assembled bud — individual pieces positioned exactly as in Figma,
// each piece animated for the staggered bloom effect.
// ─────────────────────────────────────────────────────────────────────────────
function BudAssembly({ opening }: { opening: boolean }) {
  // Helper: a petal piece with Figma inset + opening transform
  const Piece = ({
    src, inset, bleed, transform, origin, duration = 1.75, delay = 0, flip = false,
  }: {
    src: string
    inset: string
    bleed: string
    transform?: string
    origin?: string
    duration?: number
    delay?: number
    flip?: boolean
  }) => (
    <div style={{
      position: 'absolute',
      inset,
      transform: opening && transform ? transform : flip ? 'scaleX(-1)' : undefined,
      transformOrigin: origin ?? '50% 100%',
      transition: opening && transform
        ? `transform ${OPEN_EASE} ${duration}s ${delay}ms`
        : 'none',
    }}>
      <div style={{ position: 'absolute', inset: bleed }}>
        <img src={src} alt="" style={{
          display: 'block', width: '100%', height: '100%',
          transform: flip ? 'scaleX(-1)' : undefined,
        }} />
      </div>
    </div>
  )

  return (
    <div style={{ width: BUD_W, height: BUD_H, position: 'relative' }}>
      {/* Back-center petal — base layer */}
      <Piece src={B.v120} inset="26.72% 33.9% 8.27% 45.33%"  bleed="-0.79% -1.69% -0.67% -1.74%"
        transform="translateY(-3px) scaleY(1.02)" delay={0} duration={1.7} />

      {/* Outer petals — spread widest, slightly delayed */}
      <Piece src={B.v111} inset="30.08% 51.95% 15.85% 37.74%" bleed="-0.56% -3.26% -1.27% -3.4%"
        transform="translateX(-6px) translateY(1px)" origin="50% 100%" delay={420} duration={1.85} />
      <Piece src={B.v112} inset="10.73% 49.81% 8.48% 30.54%"  bleed="-0.81% -3.38% -0.57% -1.78%"
        transform="translateX(6px) translateY(1px)" origin="50% 100%" delay={420} duration={1.85} />

      {/* Mid petals — spread outward */}
      <Piece src={B.v113} inset="18.29% 25.01% 7.34% 50.21%"  bleed="-0.38% -1.51% -0.51% -1.06%"
        transform="translateX(-5px) translateY(-1px) rotate(0.8deg)" origin="50% 100%" delay={260} duration={1.8} />
      <Piece src={B.v114} inset="41.66% 52.53% 8.48% 25.22%"  bleed="-0.53% -1.27% -0.75% -1.57%"
        transform="translateX(5px) translateY(-1px)" origin="50% 100%" delay={260} duration={1.8} />

      {/* Inner right petal — rises with center */}
      <Piece src={B.v116} inset="0.21% 39.2% 61.92% 49.61%"   bleed="-1.68% -3.13% -1.71% -3.13%"
        transform="translateY(-6px) translateX(2px)" origin="50% 100%" delay={120} duration={1.75} />

      {/* Center dark petal — RISES FIRST */}
      <Piece src={B.v115} inset="0 42.39% 64.24% 43.94%"       bleed="-0.78% -2.56% -1.49% -2.56%"
        transform="translateY(-8px)" origin="50% 100%" delay={0} duration={1.7} />

      {/* Leaves — settle downward/outward last */}
      <Piece src={B.v117} inset="71% 0 0 53.7%"                bleed="-1.31% -1.1% -1.31% -1.06%"
        transform="translateX(5px) translateY(3px)" origin="0% 0%" duration={1.5} delay={560} />

      {/* Left leaf: render mirrored */}
      <div style={{
        position: 'absolute', inset: '71.11% 53.7% 0.06% 0',
        transform: opening ? 'translateX(-5px) translateY(3px)' : undefined,
        transformOrigin: '100% 0%',
        transition: opening ? `transform ${SETTLE} 1.5s 560ms` : 'none',
      }}>
        <div style={{ position: 'absolute', inset: '-1.31% -1.1% -1.31% -1.06%' }}>
          <img src={B.v118} alt="" style={{ display: 'block', width: '100%', height: '100%', transform: 'scaleX(-1)' }} />
        </div>
      </div>

      {/* Bottom sepal */}
      <Piece src={B.v119} inset="91.31% 44.72% 4.05% 44.75%"  bleed="-10.25% -3.32% -8.15% -3.41%" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main splash screen
// ─────────────────────────────────────────────────────────────────────────────
interface Props { onDone: () => void }

export default function SplashScreen({ onDone }: Props) {
  const [phase, setPhase] = React.useState<0 | 2 | 3>(0)
  const [fadeOut, setFadeOut] = React.useState(false)

  // Fine-grained crossfade flags
  const [budOpening,  setBudOpening]  = React.useState(false)
  const [budGone,     setBudGone]     = React.useState(false)
  const [partialIn,   setPartialIn]   = React.useState(false)
  const [partialGone, setPartialGone] = React.useState(false)
  const [fullIn,      setFullIn]      = React.useState(false)

  const hasSeenBefore = React.useRef(
    typeof window !== 'undefined' && !!localStorage.getItem('lotus-seen')
  )
  React.useEffect(() => { localStorage.setItem('lotus-seen', '1') }, [])

  React.useEffect(() => {
    const ts = [
      setTimeout(() => setBudOpening(true),  800),
      setTimeout(() => setPartialIn(true),  1050),   // overlap while petals still moving
      setTimeout(() => setBudGone(true),    1180),   // bud fades after petals have opened more
      setTimeout(() => setPartialGone(true), 2050),   // fade out in sync with full scale-up
      setTimeout(() => setFullIn(true),     2050),   // full bloom grows from partial size
      setTimeout(() => setPhase(2),         2500),   // glow
      setTimeout(() => setPhase(3),         3100),   // text fades up
      setTimeout(() => setFadeOut(true),    5000),   // hold text ~1.9s, then fade overlay
      setTimeout(onDone,                    6200),
    ]
    return () => ts.forEach(clearTimeout)
  }, [onDone])

  const budOpacity     = budGone     ? 0 : 1
  const partialOpacity = partialIn && !partialGone ? 1 : 0
  const glowVisible    = phase >= 2
  const textVisible    = phase >= 3
  const overlayOut     = fadeOut

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#fce9f5',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 32,
      opacity: overlayOut ? 0 : 1,
      transition: overlayOut ? 'opacity 1.15s cubic-bezier(0.4,0,0.2,1)' : 'none',
      pointerEvents: overlayOut ? 'none' : 'auto',
    }}>
      <style>{`
        @keyframes bud-breathe {
          0%, 100% { transform: scale(0.98); }
          50%       { transform: scale(1.00); }
        }
        @keyframes glow-breathe {
          0%, 100% { opacity: 0.80; }
          50%       { opacity: 1.00; }
        }
      `}</style>

      {/* ── Lotus container ──────────────────────────────────────── */}
      <div style={{ position: 'relative', width: FULL_W, height: FULL_H, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Watercolor glow — appears at full bloom */}
        <div style={{
          position: 'absolute',
          inset: '-20%',
          borderRadius: '50%',
          background: [
            'radial-gradient(ellipse 58% 50% at 50% 55%, rgba(210,140,170,0.32) 0%, transparent 68%)',
            'radial-gradient(ellipse 44% 38% at 55% 44%, rgba(178,148,210,0.22) 0%, transparent 62%)',
            'radial-gradient(ellipse 36% 30% at 44% 62%, rgba(160,210,195,0.16) 0%, transparent 58%)',
          ].join(', '),
          filter: 'blur(22px)',
          opacity: glowVisible ? 1 : 0,
          transform: glowVisible ? 'scale(1)' : 'scale(0.6)',
          transition: 'opacity 1.0s ease, transform 1.0s ease',
          animation: glowVisible ? 'glow-breathe 3.5s ease-in-out infinite' : 'none',
          pointerEvents: 'none',
        }} />

        {/* ── Bud (assembled Figma pieces) ── */}
        <div style={{
          position: 'absolute',
          opacity: budOpacity,
          transition: budGone ? 'opacity 0.7s ease-in-out' : 'none',
          animation: !budOpening ? 'bud-breathe 1.8s ease-in-out infinite' : 'none',
        }}>
          <BudAssembly opening={budOpening} />
        </div>

        {/* ── Partially open (fades as full scales up beneath) ── */}
        <img
          src={IMG_PARTIAL}
          alt=""
          style={{
            position: 'absolute',
            width: PARTIAL_W,
            height: PARTIAL_H,
            objectFit: 'contain',
            zIndex: 2,
            opacity: partialOpacity,
            transform: partialGone ? 'scale(1.02)' : 'scale(1)',
            transformOrigin: 'center center',
            transition: partialGone
              ? 'opacity 1.15s ease-in-out, transform 1.15s ease-in-out'
              : 'opacity 0.65s ease-in-out',
            pointerEvents: 'none',
          }}
        />

        {/* ── Fully open — scales up from partial size ── */}
        <div style={{
          position: 'absolute',
          width: FULL_W,
          height: FULL_H,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          transform: fullIn ? 'scale(1)' : `scale(${BLOOM_START_SCALE})`,
          opacity: fullIn ? 1 : 0,
          transformOrigin: 'center center',
          transition: `transform ${BLOOM_DURATION} ${BLOOM_EASE}, opacity 1.15s ease-in-out`,
          willChange: fullIn ? 'transform, opacity' : undefined,
          pointerEvents: 'none',
        }}>
          <img
            src={IMG_FULL}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </div>
      </div>

      {/* ── Text ── */}
      <p style={{
        fontFamily: "'La Belle Aurore', cursive",
        fontSize: 'clamp(18px, 2vw, 22px)',
        color: '#8a5a6a',
        letterSpacing: '0.06em',
        margin: 0,
        opacity: textVisible ? 1 : 0,
        transform: textVisible ? 'translateY(0)' : 'translateY(8px)',
        transition: fadeOut
          ? 'opacity 1.0s ease 0.15s, transform 1.0s ease 0.15s'
          : 'opacity 0.9s ease, transform 0.9s ease',
        pointerEvents: 'none',
      }}>
        where curiosity blooms...
      </p>

      {/* ── Skip intro (after first visit) ── */}
      {hasSeenBefore.current && (
        <button
          onClick={onDone}
          style={{
            position: 'absolute', bottom: 36, right: 44,
            fontFamily: "'La Belle Aurore', cursive",
            fontSize: 17, color: '#a07888',
            background: 'none', border: 'none', cursor: 'pointer',
            letterSpacing: '0.02em', padding: '8px 0',
            opacity: glowVisible ? 0.55 : 0,
            transition: 'opacity 0.8s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
        >
          skip intro
        </button>
      )}
    </div>
  )
}
