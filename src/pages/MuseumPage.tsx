import React from 'react'
import SiteNav, { type SitePage } from '../components/SiteNav'
import MuseumPanel from '../components/MuseumPanel'
import MuseumLightbox, { type LightboxArtwork } from '../components/MuseumLightbox'
import type { FrameSpec } from '../data/museumSections'
import { MUSEUM_SECTION_COUNT } from '../data/museumSections'

const PANEL_COUNT = MUSEUM_SECTION_COUNT
const PANEL_WIDTH = 1080

interface Props {
  onNavigate: (page: SitePage) => void
}

export default function MuseumPage({ onNavigate }: Props) {
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const loopingRef = React.useRef(false)
  const [lightbox, setLightbox] = React.useState<LightboxArtwork | null>(null)

  const handleFrameSelect = React.useCallback((spec: FrameSpec, sectionTitle?: string) => {
    if (!spec.src) return
    setLightbox({
      src: spec.src,
      alt: spec.alt ?? '',
      sectionTitle,
    })
  }, [])

  const panels = React.useMemo(
    () => [...Array(PANEL_COUNT * 2)].map((_, i) => i),
    []
  )

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollLeft = PANEL_COUNT * PANEL_WIDTH
  }, [])

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const onScroll = () => {
      if (loopingRef.current) return
      const loopW = PANEL_COUNT * PANEL_WIDTH

      if (el.scrollLeft >= loopW * 2 - 60) {
        loopingRef.current = true
        el.scrollLeft = loopW
        requestAnimationFrame(() => {
          loopingRef.current = false
        })
      } else if (el.scrollLeft <= 20) {
        loopingRef.current = true
        el.scrollLeft = loopW
        requestAnimationFrame(() => {
          loopingRef.current = false
        })
      }
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="museum-page flex min-h-screen flex-col bg-[#ebe4da]">
      <SiteNav onNavigate={onNavigate} active="museum" />

      <div className="museum-header px-8 pt-8 pb-4">
        <p className="font-hand text-[22px] text-ink-secondary">Exhibition: Now showing</p>
        <h1 className="font-serif text-[clamp(28px,3.5vw,40px)] tracking-[-0.03em] text-ink-primary">
          We are museums of everything we&apos;ve ever{'\u00a0'}loved
        </h1>
        <p className="mt-2 font-inter text-sm text-ink-tertiary">Scroll sideways to walk the gallery →</p>
      </div>

      <div ref={scrollerRef} className="museum-scroller flex-1 overflow-x-auto overflow-y-hidden">
        <div className="museum-track flex h-full" style={{ width: panels.length * PANEL_WIDTH }}>
          {panels.map((i) => (
            <MuseumPanel
              key={i}
              sectionIndex={i % PANEL_COUNT}
              onFrameSelect={handleFrameSelect}
            />
          ))}
        </div>
      </div>

      {lightbox && <MuseumLightbox artwork={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  )
}
