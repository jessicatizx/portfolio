/** Frame-sequence morph — uses pre-exported Figma PNGs, zero flubber / no main-thread freeze. */
import React from 'react'
import './MetaInfinityMorph.css'

const FRAMES = [
  '/meta-morph/morph-01.png',
  '/meta-morph/morph-02.png',
  '/meta-morph/morph-03.png',
  '/meta-morph/morph-04.png',
  '/meta-morph/morph-05.png',
  '/meta-morph/morph-06.png',
  '/meta-morph/morph-07.png',
  '/meta-morph/morph-08.png',
  '/meta-morph/morph-09.png',
] as const

const EASE = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const TIMING = {
  metaHold: 600,
  toCircle: 1000,
  circleHold: 1700,
  toMeta: 1000,
} as const

const CYCLE_MS =
  TIMING.metaHold + TIMING.toCircle + TIMING.circleHold + TIMING.toMeta

type Phase = 'meta-hold' | 'to-circle' | 'circle-hold' | 'to-meta'

const PHASES: Array<{ phase: Phase; duration: number }> = [
  { phase: 'meta-hold', duration: TIMING.metaHold },
  { phase: 'to-circle', duration: TIMING.toCircle },
  { phase: 'circle-hold', duration: TIMING.circleHold },
  { phase: 'to-meta', duration: TIMING.toMeta },
]

function phaseAt(elapsed: number): { phase: Phase; local: number } {
  let t = ((elapsed % CYCLE_MS) + CYCLE_MS) % CYCLE_MS
  for (const { phase, duration } of PHASES) {
    if (t < duration) return { phase, local: t / duration }
    t -= duration
  }
  return { phase: 'meta-hold', local: 0 }
}

function frameIndex(phase: Phase, local: number): number {
  const last = FRAMES.length - 1
  switch (phase) {
    case 'meta-hold':
      return 0
    case 'circle-hold':
      return last
    case 'to-circle':
      return Math.min(last, Math.round(EASE(local) * last))
    case 'to-meta':
      return Math.max(0, Math.round((1 - EASE(local)) * last))
  }
}

/** Infinity (frame 0) sits higher and slightly smaller; circle (frame 9) stays at Figma ref. */
const MARK_TOP = { meta: 20, circle: 32 } as const
const MARK_WIDTH = { meta: 34, circle: 40 } as const
const MARK_MAX_W = { meta: 560, circle: 660 } as const

function frameTop(frame: number): string {
  const t = frame / (FRAMES.length - 1)
  const top = MARK_TOP.meta + t * (MARK_TOP.circle - MARK_TOP.meta)
  return `${top}%`
}

function frameWidth(frame: number): { width: string; maxWidth: number } {
  const t = frame / (FRAMES.length - 1)
  const width = MARK_WIDTH.meta + t * (MARK_WIDTH.circle - MARK_WIDTH.meta)
  const maxWidth = MARK_MAX_W.meta + t * (MARK_MAX_W.circle - MARK_MAX_W.meta)
  return { width: `${width}%`, maxWidth: Math.round(maxWidth) }
}

export default function MetaMorphThumbnail({ compact = false }: { compact?: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [frame, setFrame] = React.useState(0)
  const [active, setActive] = React.useState(false)
  const reducedMotion = React.useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  React.useEffect(() => {
    FRAMES.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.12, rootMargin: '120px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  React.useEffect(() => {
    if (!active || reducedMotion) {
      setFrame(0)
      return
    }

    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const { phase, local } = phaseAt(now - start)
      setFrame(frameIndex(phase, local))
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, reducedMotion])

  const aspectRatio = '1728 / 1117'
  const markSize = frameWidth(frame)

  return (
    <div
      ref={ref}
      className="meta-morph meta-morph--tile"
      style={{
        aspectRatio,
        borderRadius: 0,
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
      }}
      aria-hidden
    >
      <img
        src="/meta-morph/bg-thumb.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <img
        src={FRAMES[frame]}
        alt=""
        style={{
          position: 'absolute',
          left: '50%',
          top: frameTop(frame),
          width: markSize.width,
          maxWidth: markSize.maxWidth,
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  )
}
