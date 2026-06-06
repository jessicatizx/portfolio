import React from 'react'
import { createPortal } from 'react-dom'
import SplashScreen from './components/SplashScreen'
import InstagramThumbnail from './components/InstagramThumbnail'
import MetaMorphThumbnail from './components/MetaMorphThumbnail'
import FoxThumbnail from './components/FoxThumbnail'
import LetterboxdThumbnail from './components/LetterboxdThumbnail'
import ProjectChip from './components/ProjectChip'
const InstagramCaseStudy = React.lazy(() => import('./pages/InstagramCaseStudy'))
const FoxCaseStudy = React.lazy(() => import('./pages/FoxCaseStudy'))
const MuseumPage = React.lazy(() => import('./pages/MuseumPage'))
const AboutPage = React.lazy(() => import('./pages/AboutPage'))

import FlowerCursor from './components/FlowerCursor'
import TeaSpillFooter from './components/TeaSpillFooter'
import JessicaFilmStrip from './components/JessicaFilmStrip'
import {
  HeroInsectSprite,
  useHeroInsectTour,
  usePrefersReducedMotion,
  type HeroCueId,
} from './components/HeroInsectGuide'
import SiteNav, { type SitePage } from './components/SiteNav'

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

function cueClass(active: boolean) {
  return `hero-interactive hero-underline cursor-default${active ? ' hero-interactive--active' : ''}`
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-bg" aria-busy="true" />}>
      {children}
    </React.Suspense>
  )
}

class PageErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <p className="font-serif text-2xl text-ink-primary mb-3">This page failed to load</p>
            <p className="font-inter text-sm text-ink-secondary mb-6">
              Try refreshing. If it keeps happening, restart the dev server with{' '}
              <code className="text-xs">npm run dev</code>.
            </p>
            <button
              type="button"
              className="rounded-lg bg-ink-primary px-4 py-2 font-inter text-sm text-white"
              onClick={() => {
                this.setState({ hasError: false })
                window.location.reload()
              }}
            >
              Refresh
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// ── Hero ─────────────────────────────────────────────────────────
function Hero({ splashReady }: { splashReady: boolean }) {
  const heroTextRef = React.useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [userCue, setUserCue] = React.useState<HeroCueId | null>(null)
  const [insectCue, setInsectCue] = React.useState<HeroCueId | null>(null)
  const [demoAnchor, setDemoAnchor] = React.useState({ x: 0, y: 0 })
  const [pos, setPos] = React.useState({ x: 0, y: 0 })

  const isActive = (id: HeroCueId) => userCue === id || insectCue === id

  const { transform: insectTransform } = useHeroInsectTour({
    containerRef: heroTextRef,
    enabled: splashReady && !reducedMotion,
    onVisit: (id, anchor) => {
      setDemoAnchor({ x: anchor.x, y: anchor.y })
      setInsectCue(id)
    },
    onLeave: id => {
      setInsectCue(prev => (prev === id ? null : prev))
    },
  })

  function handleMouseMove(e: React.MouseEvent) {
    setPos({ x: e.clientX, y: e.clientY })
  }

  function overlayPos(id: HeroCueId) {
    if (userCue === id) return pos
    if (insectCue === id) return demoAnchor
    return pos
  }

  const filmVisible = isActive('jessica')
  const cupsVisible = isActive('connect')
  const glowSpreading = isActive('surprises')
  const bridgeVisible = isActive('sf')

  React.useEffect(() => {
    if (!insectCue || !heroTextRef.current) return
    const update = () => {
      const root = heroTextRef.current
      const el = root?.querySelector<HTMLElement>(`[data-hero-cue="${insectCue}"]`)
      if (!root || !el) return
      const r = el.getBoundingClientRect()
      setDemoAnchor({ x: r.left + r.width / 2, y: r.bottom - 6 })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [insectCue])

  return (
    <>
      {!reducedMotion &&
        createPortal(
          <HeroInsectSprite transform={insectTransform} />,
          document.body
        )}

      <section className="relative mx-auto max-w-content overflow-x-clip px-20 py-24">
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

      <div ref={heroTextRef} className="relative max-w-hero overflow-visible">
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
            data-hero-cue="jessica"
            className={cueClass(isActive('jessica'))}
            onMouseEnter={() => setUserCue('jessica')}
            onMouseLeave={() => setUserCue(null)}
            onMouseMove={handleMouseMove}
          >Jessica Ti</span> is a designer and writer who enjoys shaping strategy, turning ambiguity into clear experiences that <span
            data-hero-cue="connect"
            className={cueClass(isActive('connect'))}
            onMouseEnter={() => setUserCue('connect')}
            onMouseLeave={() => setUserCue(null)}
            onMouseMove={handleMouseMove}
          >shape how people connect</span> and&hellip; just{' '}
          <span className={`feel-human${glowSpreading ? ' feel-human--spread' : ''}`}>feel human.</span>
        </p>
        <p className="hero-text mt-4 text-[clamp(26px,2.8vw,32px)] leading-relaxed text-ink-secondary">
          Outside of work, she's a tinkerer at heart, <span
            data-hero-cue="surprises"
            className={cueClass(isActive('surprises'))}
            onMouseEnter={() => setUserCue('surprises')}
            onMouseLeave={() => setUserCue(null)}
          >crafting little surprises</span>{' '}
          that spark joy for others.
        </p>
        <p className="mt-6 flex items-center gap-2 font-hand text-[22px] text-ink-secondary">
          Currently at
          <span className="inline-flex items-center">
            <img src="/ig-icon.png" alt="Instagram" className="inline-block align-middle" style={{ height: '30px', width: 'auto' }} />
          </span>
          . Based in <span
            data-hero-cue="sf"
            className={cueClass(isActive('sf'))}
            onMouseEnter={() => setUserCue('sf')}
            onMouseLeave={() => setUserCue(null)}
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
        style={{
          left: overlayPos('connect').x,
          top: overlayPos('connect').y - 16,
          opacity: cupsVisible ? 1 : 0,
          transform: 'translate(-50%, -100%)',
        }}
      />
      {/* Hover image — bridge */}
      <img
        src="/hover-bridge.png"
        alt=""
        aria-hidden
        className="pointer-events-none fixed z-50 w-48 transition-opacity duration-200"
        style={{
          left: overlayPos('sf').x,
          top: overlayPos('sf').y - 16,
          opacity: bridgeVisible ? 1 : 0,
          transform: 'translate(-50%, -100%)',
        }}
      />
      {/* Film strip — Jessica Ti */}
      <JessicaFilmStrip
        visible={filmVisible}
        x={overlayPos('jessica').x}
        y={overlayPos('jessica').y}
      />
    </section>
    </>
  )
}

// ── Projects ─────────────────────────────────────────────────────
type ProjectId = 'meta' | 'instagram' | 'fox' | 'letterboxd'

const projects: Array<{
  id: ProjectId
  label: string
  year: string
  darkChip: boolean
  caption: string
  navigable: boolean
}> = [
  {
    id: 'meta',
    label: 'Meta',
    year: '2026',
    darkChip: false,
    caption: 'Designing AI systems people can trust and use with confidence',
    navigable: false,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    year: '2025',
    darkChip: false,
    caption: 'Defining how teens navigate the world\'s first social media ban',
    navigable: true,
  },
  {
    id: 'fox',
    label: 'Fox Entertainment',
    year: '2024',
    darkChip: false,
    caption: 'Revolutionizing vendor management for enhanced efficiency',
    navigable: true,
  },
  {
    id: 'letterboxd',
    label: 'Letterboxd',
    year: '2024',
    darkChip: false,
    caption: 'Reimagining social connection around film discovery and discussion',
    navigable: false,
  },
]

const CARD_BADGES: Record<ProjectId, { text: string; bg: string; border: string; color: string }> = {
  meta:       { text: 'coming soon',  bg: 'rgba(140,190,255,0.38)', border: 'rgba(90,150,230,0.28)', color: '#2a5080' },
  instagram:  { text: 'check it out!', bg: 'rgba(228,175,200,0.38)', border: 'rgba(210,140,170,0.28)', color: '#7a3a55' },
  fox:        { text: 'now showing',   bg: 'rgba(228,190,155,0.38)', border: 'rgba(200,155,110,0.28)', color: '#6a4020' },
  letterboxd: { text: 'in production', bg: 'rgba(195,180,232,0.38)', border: 'rgba(160,140,210,0.28)', color: '#4a3570' },
}

function ProjectThumb({ id, splashDone }: { id: ProjectId; splashDone: boolean }) {
  switch (id) {
    case 'meta':
      return <MetaMorphThumbnail compact />
    case 'instagram':
      return <InstagramThumbnail ready={splashDone} compact />
    case 'fox':
      return <FoxThumbnail lookahead compact />
    case 'letterboxd':
      return <LetterboxdThumbnail compact />
  }
}

function Projects({ onNavigate, splashDone }: { onNavigate: (page: SitePage) => void; splashDone: boolean }) {
  const [hoveredId, setHoveredId] = React.useState<ProjectId | null>(null)
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

      <div className="grid grid-cols-2 gap-6">
        {projects.map(({ id, label, year, darkChip, caption, navigable }) => (
          <div
            key={id}
            className="relative min-w-0"
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative">
              <article
                data-no-flower
                className="relative overflow-hidden rounded-card transition-all duration-300 hover:-translate-y-0.5 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]"
                onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}
              >
                {navigable ? (
                  <button
                    className="block w-full text-left"
                    onClick={() => (id === 'instagram' || id === 'fox') && onNavigate(id)}
                  >
                    <ProjectThumb id={id} splashDone={splashDone} />
                  </button>
                ) : (
                  <div className="block w-full">
                    <ProjectThumb id={id} splashDone={splashDone} />
                  </div>
                )}
              </article>
              <div className="absolute bottom-4 left-4" style={{ zIndex: 50 }}>
                <ProjectChip label={label} year={year} dark={darkChip} />
              </div>
            </div>
            <p
              className={`pl-1 font-inter text-[13px] text-ink-tertiary leading-relaxed transition-all duration-200 ease-out ${
                hoveredId === id
                  ? 'mt-2.5 opacity-100 max-h-24'
                  : 'mt-0 opacity-0 max-h-0 overflow-hidden'
              }`}
              aria-hidden={hoveredId !== id}
            >
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

// ── App ──────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = React.useState<SitePage>('home')
  const [splashDone, setSplashDone] = React.useState(false)

  if (page === 'instagram') {
    return (
      <PageErrorBoundary>
        <PageShell>
          <InstagramCaseStudy onBack={() => setPage('home')} onNavigate={setPage} />
        </PageShell>
      </PageErrorBoundary>
    )
  }

  if (page === 'fox') {
    return (
      <PageShell>
        <FoxCaseStudy onBack={() => setPage('home')} onNavigate={setPage} />
      </PageShell>
    )
  }

  if (page === 'museum') {
    return (
      <PageShell>
        <FlowerCursor />
        <MuseumPage onNavigate={setPage} />
      </PageShell>
    )
  }

  if (page === 'about') {
    return (
      <PageShell>
        <FlowerCursor />
        <AboutPage onNavigate={setPage} />
      </PageShell>
    )
  }

  return (
    <>
      <FlowerCursor />
      {!splashDone && (
        <SplashScreen onDone={() => setSplashDone(true)} />
      )}
      <div className="min-h-screen bg-bg">
        <GrainOverlay />
        <SiteNav onNavigate={setPage} active="home" />
        <main>
          <Hero splashReady={splashDone} />
          <Projects onNavigate={setPage} splashDone={splashDone} />
        </main>
        <TeaSpillFooter />
      </div>
    </>
  )
}
