import React from 'react'
import SplashScreen from './components/SplashScreen'
import InstagramThumbnail from './components/InstagramThumbnail'
import FoxThumbnail from './components/FoxThumbnail'
import LetterboxdThumbnail from './components/LetterboxdThumbnail'
import ProjectChip from './components/ProjectChip'
import InstagramCaseStudy from './pages/InstagramCaseStudy'

import FlowerCursor from './components/FlowerCursor'
import JessicaFilmStrip from './components/JessicaFilmStrip'

// ── Grain overlay ────────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '300px 300px',
        opacity: 0.038,
      }}
    />
  )
}

// ── Nav ──────────────────────────────────────────────────────────
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between px-20 py-4">
        <a href="/" aria-label="Home">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="6" fill="#E8A0BF"/>
            <circle cx="14" cy="4"  r="4" fill="#F4C7DB"/>
            <circle cx="14" cy="24" r="4" fill="#F4C7DB"/>
            <circle cx="4"  cy="14" r="4" fill="#F4C7DB"/>
            <circle cx="24" cy="14" r="4" fill="#F4C7DB"/>
          </svg>
        </a>
        <nav className="flex items-center gap-8">
          <a href="https://www.linkedin.com/in/jessica-ti" target="_blank" rel="noopener"
             className="font-hand text-[18px] text-ink-secondary transition-colors hover:text-ink-primary">
            LinkedIn
          </a>
          <a href="#playground"
             className="font-hand text-[18px] text-ink-secondary transition-colors hover:text-ink-primary">
            Playground
          </a>
        </nav>
      </div>
    </header>
  )
}

// ── Floating icon helper ─────────────────────────────────────────
// Outer wrapper: slow horizontal traversal across full section width
// Inner div: gentle vertical / rotational wobble
function FloatIcon({ wobbleCls, traverseCls, top, label, children }: {
  wobbleCls: string
  traverseCls: string
  top: string
  label: string
  children: React.ReactNode
}) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div className={traverseCls} style={{ position: 'absolute', top, left: -60 }}>
      <div
        className={`hero-float ${wobbleCls}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className={`float-label${hovered ? ' float-label--visible' : ''}`}>
          {label}
        </span>
        <div style={{
          transform: hovered ? 'scale(1.18)' : 'scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────
function Hero() {
  const [cupsVisible, setCupsVisible] = React.useState(false)
  const [bridgeVisible, setBridgeVisible] = React.useState(false)
  const [filmVisible, setFilmVisible] = React.useState(false)
  const [glowSpreading, setGlowSpreading] = React.useState(false)
  const [pos, setPos] = React.useState({ x: 0, y: 0 })

  function handleMouseMove(e: React.MouseEvent) {
    setPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section className="relative mx-auto max-w-content px-20 py-24 overflow-hidden">

      {/* Sketch filter def — hidden */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <filter id="sketch-wobble">
            <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="2" result="noise" seed="4"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.8" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
      </svg>

      {/* Code </> — traverses near top edge */}
      <FloatIcon wobbleCls="hero-float--code" traverseCls="hero-traverse--code" top="8%" label="I code!">
        <svg width="48" height="36" viewBox="0 0 32 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#sketch-wobble)' }}>
          <polyline points="10 2 2 11 10 20"/>
          <polyline points="22 2 30 11 22 20"/>
          <line x1="18" y1="1" x2="14" y2="21"/>
        </svg>
      </FloatIcon>

      {/* Pen nib — traverses near bottom edge */}
      <FloatIcon wobbleCls="hero-float--pen" traverseCls="hero-traverse--pen" top="78%" label="I write!">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#sketch-wobble)' }}>
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
          <path d="M12 12 L10 14"/>
        </svg>
      </FloatIcon>

      {/* Palette — traverses near top, offset phase */}
      <FloatIcon wobbleCls="hero-float--palette" traverseCls="hero-traverse--palette" top="88%" label="I design!">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#sketch-wobble)' }}>
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c.553 0 1.09-.049 1.607-.151a1 1 0 0 0 .785-.983v-2.545a1 1 0 0 1 1-1H19a3 3 0 0 0 3-3 8.001 8.001 0 0 0-10-7.748z"/>
          <circle cx="8.5"  cy="8.5"  r="1.1" fill="currentColor" stroke="none"/>
          <circle cx="12"   cy="6"    r="1.1" fill="currentColor" stroke="none"/>
          <circle cx="15.5" cy="8.5"  r="1.1" fill="currentColor" stroke="none"/>
          <circle cx="6.5"  cy="12"   r="1.1" fill="currentColor" stroke="none"/>
        </svg>
      </FloatIcon>

      <div className="relative max-w-hero">

        {/* Flowers — appear on hover of "crafting little surprises" */}
        {/* Top: pink tulips — above "designer" */}
        <img src="/flower-tulip-pink.png" aria-hidden alt=""
          className="pointer-events-none absolute"
          style={{
            width: 110, top: -30, left: '22%',
            opacity: glowSpreading ? 1 : 0,
            transform: glowSpreading ? 'translateX(-50%) translateY(0px)' : 'translateX(-50%) translateY(12px)',
            transition: 'opacity 0.6s ease 0.0s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.0s',
          }}
        />
        {/* Left: purple daisy — above "of" in "Outside of work" */}
        <img src="/flower-daisy.png" aria-hidden alt=""
          className="pointer-events-none absolute"
          style={{
            width: 90, top: '58%', left: '9%',
            opacity: glowSpreading ? 1 : 0,
            transform: glowSpreading ? 'translateX(-50%) translateY(0px)' : 'translateX(-50%) translateY(12px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        />
        {/* Mauve tulips — always visible, blooms fully on hover */}
        <img src="/flower-tulip-mauve.png" aria-hidden alt=""
          className="pointer-events-none absolute"
          style={{
            width: 88, top: '40%', left: '75%',
            opacity: glowSpreading ? 1 : 0.82,
            transform: glowSpreading ? 'translateX(-50%) translateY(-4px) rotate(3deg)' : 'translateX(-50%) translateY(0px) rotate(0deg)',
            transition: 'opacity 0.6s ease 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s',
          }}
        />
        {/* Bottom: spiky flowers — above "San Francisco" */}
        <img src="/flower-spiky.png" aria-hidden alt=""
          className="pointer-events-none absolute"
          style={{
            width: 115, bottom: '8%', left: '38%',
            opacity: glowSpreading ? 1 : 0,
            transform: glowSpreading ? 'translateX(-50%) translateY(0px)' : 'translateX(-50%) translateY(12px)',
            transition: 'opacity 0.6s ease 0.05s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s',
          }}
        />

        <p className="hero-text text-[clamp(26px,2.8vw,32px)] leading-relaxed text-ink-primary">
          <span
            className="hero-underline cursor-default"
            onMouseEnter={() => setFilmVisible(true)}
            onMouseLeave={() => setFilmVisible(false)}
            onMouseMove={handleMouseMove}
          >Jessica Ti</span> is a designer and writer who enjoys shaping strategy, turning ambiguity into clear experiences that <span
            className="hero-underline cursor-default"
            onMouseEnter={() => setCupsVisible(true)}
            onMouseLeave={() => setCupsVisible(false)}
            onMouseMove={handleMouseMove}
          >shape how people connect</span> and&hellip; just{' '}
          <span className={`feel-human${glowSpreading ? ' feel-human--spread' : ''}`}>feel human.</span>
        </p>
        <p className="hero-text mt-4 text-[clamp(26px,2.8vw,32px)] leading-relaxed text-ink-secondary">
          Outside of work, she's a tinkerer at heart, <span
            className="hero-underline cursor-default"
            onMouseEnter={() => setGlowSpreading(true)}
            onMouseLeave={() => setGlowSpreading(false)}
          >crafting little surprises</span>{' '}
          that spark joy for others.
        </p>
        <p className="mt-6 flex items-center gap-2 font-hand text-[22px] text-ink-secondary">
          Currently at
          <span className="inline-flex items-center">
            <img src="/ig-icon.png" alt="Instagram" className="inline-block align-middle" style={{ height: '30px', width: 'auto' }} />
          </span>
          . Based in <span
            className="hero-underline cursor-default"
            onMouseEnter={() => setBridgeVisible(true)}
            onMouseLeave={() => setBridgeVisible(false)}
            onMouseMove={handleMouseMove}
          >San Francisco</span>.
        </p>
      </div>

      {/* Hover image — cups */}
      <img
        src="/hover-cups.png"
        alt=""
        aria-hidden
        className="pointer-events-none fixed z-50 w-48 transition-opacity duration-200"
        style={{ left: pos.x, top: pos.y - 16, opacity: cupsVisible ? 1 : 0, transform: 'translate(-50%, -100%)' }}
      />
      {/* Hover image — bridge */}
      <img
        src="/hover-bridge.png"
        alt=""
        aria-hidden
        className="pointer-events-none fixed z-50 w-48 transition-opacity duration-200"
        style={{ left: pos.x, top: pos.y - 16, opacity: bridgeVisible ? 1 : 0, transform: 'translate(-50%, -100%)' }}
      />
      {/* Film strip — Jessica Ti */}
      <JessicaFilmStrip visible={filmVisible} x={pos.x} y={pos.y} />
    </section>
  )
}

// ── Projects ─────────────────────────────────────────────────────
const projects = [
  { id: 'instagram',  Thumb: InstagramThumbnail, label: 'Instagram',        year: '2025', darkChip: false, caption: 'Designing for teens during Australia\'s world-first social media ban' },
  { id: 'fox',        Thumb: FoxThumbnail,        label: 'Fox Entertainment', year: '2024', darkChip: false, caption: 'Reimagining how fans experience live sports and entertainment' },
  { id: 'letterboxd', Thumb: LetterboxdThumbnail, label: 'Letterboxd',        year: '2024', darkChip: false, caption: 'Social film logging for the people who treat watching as a ritual' },
]

const CARD_BADGES: Record<string, { text: string; bg: string; border: string; color: string }> = {
  instagram:  { text: 'check it out!', bg: 'rgba(228,175,200,0.38)', border: 'rgba(210,140,170,0.28)', color: '#7a3a55' },
  fox:        { text: 'coming soon',   bg: 'rgba(228,190,155,0.38)', border: 'rgba(200,155,110,0.28)', color: '#6a4020' },
  letterboxd: { text: 'in production', bg: 'rgba(195,180,232,0.38)', border: 'rgba(160,140,210,0.28)', color: '#4a3570' },
}

function Projects({ onNavigate, splashDone }: { onNavigate: (page: 'home' | 'instagram') => void; splashDone: boolean }) {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)
  const [pos,       setPos]       = React.useState({ x: 0, y: 0 })

  return (
    <section className="mx-auto max-w-content px-20 pb-24">
      <style>{`
        @keyframes badge-pop {
          from { opacity: 0; transform: translateY(-50%) scale(0.78) rotate(-3deg); }
          to   { opacity: 1; transform: translateY(-50%) scale(1)    rotate(0deg);  }
        }
      `}</style>

      {/* Section label */}
      <div className="flex items-center gap-5 pb-10">
        <span className="font-hand text-[17px] text-ink-tertiary whitespace-nowrap">Selected work</span>
        <div className="flex-1" style={{ height: '0.5px', background: 'rgba(0,0,0,0.09)' }} />
      </div>

      <div className="flex flex-col gap-8">
        {projects.map(({ id, Thumb, label, year, darkChip, caption }) => (
          <div key={id} className="relative">
            <div className="relative">
              <article
                data-no-flower
                className="relative overflow-hidden rounded-card transition-all duration-300 hover:-translate-y-0.5 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]"
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                onMouseMove={e  => setPos({ x: e.clientX, y: e.clientY })}
              >
                <button
                  className="block w-full text-left"
                  onClick={() => id === 'instagram' && onNavigate('instagram')}
                  style={{ cursor: id === 'instagram' ? 'pointer' : 'default' }}
                >
                  {id === 'instagram'
                    ? <InstagramThumbnail ready={splashDone} />
                    : <Thumb />}
                </button>
              </article>
              <div className="absolute bottom-6 left-6" style={{ zIndex: 50 }}>
                <ProjectChip label={label} year={year} dark={darkChip} />
              </div>
            </div>
            <p className="mt-3 pl-1 font-hand text-[15px] text-ink-tertiary leading-relaxed">
              {caption}
            </p>
          </div>
        ))}
      </div>

      {/* Cursor badge — follows mouse, unique per card */}
      {hoveredId && CARD_BADGES[hoveredId] && (
        <div
          key={hoveredId}
          style={{
            position: 'fixed',
            left: pos.x + 16,
            top: pos.y,
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            zIndex: 9998,
            background: CARD_BADGES[hoveredId].bg,
            color: CARD_BADGES[hoveredId].color,
            border: `1px solid ${CARD_BADGES[hoveredId].border}`,
            padding: '7px 18px 6px',
            borderRadius: '999px',
            fontFamily: "'La Belle Aurore', cursive",
            fontSize: '17px',
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            animation: 'badge-pop 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {CARD_BADGES[hoveredId].text}
        </div>
      )}
    </section>
  )
}

// ── Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-black/[0.07]">
      <div className="mx-auto flex max-w-content items-center justify-between px-20 py-12">
        <p className="font-ui text-xs text-ink-tertiary">Made with tea, persistence and countless hours in Claude &amp; Cursor</p>
        <a href="https://www.linkedin.com/in/jessica-ti" target="_blank" rel="noopener"
           className="font-ui text-xs font-medium text-ink-secondary transition-colors hover:text-ink-primary">
          LinkedIn
        </a>
      </div>
    </footer>
  )
}

// ── App ──────────────────────────────────────────────────────────
export default function App() {
  const [page,       setPage]       = React.useState<'home' | 'instagram'>('home')
  const [splashDone, setSplashDone] = React.useState(false)

  if (page === 'instagram') {
    return <InstagramCaseStudy onBack={() => setPage('home')} />
  }

  return (
    <>
      <FlowerCursor />
      {!splashDone && (
        <SplashScreen onDone={() => setSplashDone(true)} />
      )}
      <div className="min-h-screen bg-bg">
        <GrainOverlay />
        <Nav />
        <main>
          <Hero />
          <Projects onNavigate={setPage} splashDone={splashDone} />
        </main>
        <Footer />
      </div>
    </>
  )
}
