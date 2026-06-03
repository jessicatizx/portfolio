import React from 'react'

export const HERO_CUE_ORDER = ['jessica', 'connect', 'surprises', 'sf'] as const
export type HeroCueId = (typeof HERO_CUE_ORDER)[number]

export const DEFAULT_CUE_SELECTOR = '[data-hero-cue]'

export interface HeroInsectTourConfig {
  containerRef: React.RefObject<HTMLElement | null>
  enabled?: boolean
  /** Pause at each phrase (ms). */
  pauseDuration?: number
  /** Flight time between phrases (ms). */
  travelDuration?: number
  /** Delay before the first visit (ms). */
  initialDelay?: number
  cueSelector?: string
  onVisit: (id: HeroCueId, anchor: { x: number; y: number }) => void
  onLeave: (id: HeroCueId) => void
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function cueAnchor(el: HTMLElement, container: HTMLElement) {
  const c = container.getBoundingClientRect()
  const r = el.getBoundingClientRect()
  return {
    x: r.left + r.width / 2 - c.left,
    y: r.bottom - c.top - 6,
  }
}

function angleDeg(dx: number, dy: number) {
  return (Math.atan2(dy, dx) * 180) / Math.PI
}

export function useHeroInsectTour({
  containerRef,
  enabled = true,
  pauseDuration = 2200,
  travelDuration = 2800,
  initialDelay = 3400,
  cueSelector = DEFAULT_CUE_SELECTOR,
  onVisit,
  onLeave,
}: HeroInsectTourConfig) {
  const [transform, setTransform] = React.useState({
    x: 0,
    y: 0,
    rot: -12,
    scale: 1,
    opacity: 0,
  })

  const onVisitRef = React.useRef(onVisit)
  const onLeaveRef = React.useRef(onLeave)
  onVisitRef.current = onVisit
  onLeaveRef.current = onLeave

  React.useEffect(() => {
    if (!enabled) {
      setTransform(t => ({ ...t, opacity: 0 }))
      return
    }

    let raf = 0
    let alive = true
    let cueIndex = 0
    let phase: 'travel' | 'pause' = 'travel'
    let phaseStart = 0
    let travelFrom = { x: 0, y: 0, rot: -12 }
    let travelTo = { x: 0, y: 0, rot: 12 }
    let currentCue: HeroCueId | null = null
    let pauseCue: HeroCueId | null = null

    const sleep = (ms: number) =>
      new Promise<void>(resolve => {
        const t0 = performance.now()
        const tick = (now: number) => {
          if (!alive) return
          if (now - t0 >= ms) resolve()
          else raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      })

    function getCues(): { id: HeroCueId; el: HTMLElement }[] {
      const root = containerRef.current
      if (!root) return []
      return HERO_CUE_ORDER.flatMap(id => {
        const el = root.querySelector<HTMLElement>(`${cueSelector}[data-hero-cue="${id}"]`)
        return el ? [{ id, el }] : []
      })
    }

    function measureTarget(el: HTMLElement, container: HTMLElement) {
      const anchor = cueAnchor(el, container)
      const dx = anchor.x - travelFrom.x
      const dy = anchor.y - travelFrom.y
      return {
        ...anchor,
        rot: angleDeg(dx, dy) + 90,
      }
    }

    async function run() {
      await sleep(initialDelay)
      if (!alive) return

      const container = containerRef.current
      const cues = getCues()
      if (!container || cues.length === 0) return

      const first = measureTarget(cues[0].el, container)
      travelFrom = { x: first.x - 40, y: first.y + 28, rot: first.rot - 18 }
      setTransform({ ...travelFrom, scale: 0.88, opacity: 1 })

      while (alive) {
        const list = getCues()
        if (list.length === 0) break

        const { id, el } = list[cueIndex % list.length]
        const target = measureTarget(el, container)

        phase = 'travel'
        phaseStart = performance.now()
        travelTo = { x: target.x, y: target.y, rot: target.rot }

        if (pauseCue) {
          onLeaveRef.current(pauseCue)
          pauseCue = null
        }

        await new Promise<void>(resolve => {
          const travelLoop = (now: number) => {
            if (!alive) return
            const t = Math.min(1, (now - phaseStart) / travelDuration)
            const e = easeInOutCubic(t)
            const dx = travelTo.x - travelFrom.x
            const dy = travelTo.y - travelFrom.y
            const sway = Math.sin(e * Math.PI * 2.35)
            const px = -dy * 0.14 * sway
            const py = dx * 0.14 * sway

            setTransform({
              x: travelFrom.x + dx * e + px,
              y: travelFrom.y + dy * e + py,
              rot: travelFrom.rot + (travelTo.rot - travelFrom.rot) * e + Math.sin(e * Math.PI * 5) * 6,
              scale: 0.9 + Math.sin(e * Math.PI) * 0.08,
              opacity: 1,
            })

            if (t < 1) raf = requestAnimationFrame(travelLoop)
            else {
              travelFrom = { ...travelTo, rot: travelTo.rot }
              resolve()
            }
          }
          raf = requestAnimationFrame(travelLoop)
        })

        if (!alive) break

        phase = 'pause'
        phaseStart = performance.now()
        currentCue = id
        pauseCue = id
        onVisitRef.current(id, { x: target.x, y: target.y })

        await new Promise<void>(resolve => {
          const pauseLoop = (now: number) => {
            if (!alive) return
            const elapsed = now - phaseStart
            const bob = elapsed / 1000
            setTransform({
              x: target.x + Math.sin(bob * 2.6) * 4,
              y: target.y + Math.cos(bob * 3.2) * 5,
              rot: target.rot + Math.sin(bob * 4.1) * 7,
              scale: 1 + Math.sin(bob * 5) * 0.04,
              opacity: 1,
            })
            if (elapsed < pauseDuration) raf = requestAnimationFrame(pauseLoop)
            else resolve()
          }
          raf = requestAnimationFrame(pauseLoop)
        })

        if (!alive) break
        onLeaveRef.current(id)
        pauseCue = null
        currentCue = null
        cueIndex = (cueIndex + 1) % list.length
      }
    }

    run()

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      if (pauseCue) onLeaveRef.current(pauseCue)
    }
  }, [
    containerRef,
    enabled,
    pauseDuration,
    travelDuration,
    initialDelay,
    cueSelector,
  ])

  return { transform, visible: enabled && transform.opacity > 0 }
}

interface InsectSpriteProps {
  transform: { x: number; y: number; rot: number; scale: number; opacity: number }
}

export function HeroInsectSprite({ transform }: InsectSpriteProps) {
  return (
    <div
      className="hero-insect"
      aria-hidden
      style={{
        opacity: transform.opacity,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${transform.rot}deg) scale(${transform.scale})`,
      }}
    >
      <div className="hero-insect__body">
        <img src="/hero-hoverfly.png" alt="" width={36} height={36} draggable={false} />
      </div>
    </div>
  )
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}
