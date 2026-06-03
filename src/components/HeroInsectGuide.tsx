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

/** Viewport coordinates — insect uses `position: fixed` so it is not clipped by hero overflow. */
function cueAnchor(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  return {
    x: r.left + r.width / 2,
    y: r.bottom - 6,
  }
}

function angleDeg(dx: number, dy: number) {
  return (Math.atan2(dy, dx) * 180) / Math.PI
}

/** Mostly-horizontal hops stay level; only longer diagonal legs get a small arc. */
function travelSway(dx: number, dy: number, t: number) {
  const dist = Math.hypot(dx, dy) || 1
  const flat = Math.abs(dy) < Math.abs(dx) * 0.38
  if (flat) return { px: 0, py: 0 }

  const sway = Math.sin(t * Math.PI * 2.1)
  const amp = Math.min(10, dist * 0.045)
  return {
    px: (-dy / dist) * amp * sway,
    py: (dx / dist) * amp * sway,
  }
}

export function useHeroInsectTour({
  containerRef,
  enabled = true,
  pauseDuration = 2200,
  travelDuration = 2800,
  initialDelay = 1600,
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
    let phaseStart = 0
    let travelFrom = { x: 0, y: 0, rot: -12 }
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

    function measureTarget(el: HTMLElement, fromX = travelFrom.x, fromY = travelFrom.y) {
      const anchor = cueAnchor(el)
      const dx = anchor.x - fromX
      const dy = anchor.y - fromY
      return {
        ...anchor,
        rot: angleDeg(dx, dy) + 90,
      }
    }

    const waitForLayout = () =>
      new Promise<void>(resolve => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      })

    async function run() {
      if (document.fonts?.ready) {
        await Promise.race([document.fonts.ready, sleep(2800)])
      }
      await sleep(initialDelay)
      if (!alive) return

      let cues = getCues()
      for (let i = 0; cues.length === 0 && i < 30 && alive; i += 1) {
        await sleep(100)
        cues = getCues()
      }

      const container = containerRef.current
      if (!container || cues.length === 0) return

      await waitForLayout()

      const first = measureTarget(cues[0].el)
      travelFrom = { x: first.x - 40, y: first.y + 28, rot: first.rot - 18 }
      setTransform({ ...travelFrom, scale: 0.88, opacity: 1 })

      /** Re-read cue position every frame so wrapped/reflowed text stays targeted. */
      const animateTravel = (
        resolveTarget: () => { x: number; y: number; rot: number },
        duration: number,
        opts?: { fadeOut?: boolean }
      ) =>
        new Promise<void>(resolve => {
          const from = { ...travelFrom }
          phaseStart = performance.now()
          const travelLoop = (now: number) => {
            if (!alive) return
            const t = Math.min(1, (now - phaseStart) / duration)
            const e = easeInOutCubic(t)
            const to = resolveTarget()
            const dx = to.x - from.x
            const dy = to.y - from.y
            const flat = Math.abs(dy) < Math.abs(dx) * 0.38
            const { px, py } = travelSway(dx, dy, e)
            const opacity = opts?.fadeOut ? Math.max(0, 1 - t * 1.15) : 1
            const x = from.x + dx * e + px
            const y = from.y + dy * e + py

            setTransform({
              x,
              y,
              rot:
                angleDeg(to.x - x, to.y - y) +
                90 +
                (flat ? 0 : Math.sin(e * Math.PI * 5) * 4),
              scale: 0.92 + (flat ? 0 : Math.sin(e * Math.PI) * 0.06),
              opacity,
            })

            if (t < 1) raf = requestAnimationFrame(travelLoop)
            else {
              travelFrom = { x: to.x, y: to.y, rot: to.rot }
              resolve()
            }
          }
          raf = requestAnimationFrame(travelLoop)
        })

      while (alive) {
        const list = getCues()
        if (list.length === 0) break

        const { id, el } = list[cueIndex % list.length]

        if (pauseCue) {
          onLeaveRef.current(pauseCue)
          pauseCue = null
        }

        await animateTravel(() => measureTarget(el), travelDuration)

        if (!alive) break

        let target = measureTarget(el)
        phaseStart = performance.now()
        pauseCue = id
        onVisitRef.current(id, { x: target.x, y: target.y })

        await new Promise<void>(resolve => {
          const pauseLoop = (now: number) => {
            if (!alive) return
            const elapsed = now - phaseStart
            const bob = elapsed / 1000
            const fresh = measureTarget(el)
            target = fresh
            onVisitRef.current(id, { x: fresh.x, y: fresh.y })
            setTransform({
              x: fresh.x + Math.sin(bob * 2.6) * 4,
              y: fresh.y + Math.cos(bob * 3.2) * 5,
              rot: fresh.rot + Math.sin(bob * 4.1) * 7,
              scale: 1 + Math.sin(bob * 5) * 0.04,
              opacity: 1,
            })
            if (elapsed < pauseDuration) {
              raf = requestAnimationFrame(pauseLoop)
            } else {
              travelFrom = { x: fresh.x, y: fresh.y, rot: fresh.rot }
              resolve()
            }
          }
          raf = requestAnimationFrame(pauseLoop)
        })

        if (!alive) break
        onLeaveRef.current(id)
        pauseCue = null

        if (id === 'sf') {
          const exitFrom = { ...travelFrom }
          await animateTravel(
            () => ({
              x: exitFrom.x + Math.max(180, window.innerWidth * 0.22),
              y: exitFrom.y - 120,
              rot: exitFrom.rot - 32,
            }),
            2400,
            { fadeOut: true }
          )
          if (alive) setTransform(t => ({ ...t, opacity: 0 }))
          break
        }

        cueIndex += 1
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

function HoverflyMark() {
  return (
    <svg
      viewBox="0 0 30.8707 26.9462"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="hero-insect__svg"
    >
      <path d="M30.8059 15.6359C27.5307 19.9696 20.9888 14.0341 18.1273 10.5247C18.4447 10.3849 18.4823 10.0004 18.4615 9.82568C29.0388 8.55005 31.0983 13.1677 30.8059 15.6359Z" fill="#353533" stroke="#353533" strokeWidth="0.07776" />
      <path d="M0.0648187 15.5269C3.33995 19.8605 9.88186 13.925 12.7434 10.4156C12.4259 10.2758 12.3883 9.89135 12.4092 9.71661C1.83189 8.44098 -0.227604 13.0586 0.0648187 15.5269Z" fill="#353533" stroke="#353533" strokeWidth="0.07776" />
      <path d="M18.1482 0.651499L18.2735 0.826243C18.6286 0.666061 19.5101 0.341328 20.1952 0.323853C20.2648 0.265605 20.3456 0.127266 20.1116 0.0398941C19.6034 0.112704 18.4991 0.336959 18.1482 0.651499Z" fill="#353533" stroke="#353533" strokeWidth="0.07776" />
      <path d="M12.8219 0.717084L12.6757 0.957357C12.307 0.835295 11.3902 0.548484 10.7069 0.603083C10.632 0.552446 10.5383 0.423293 10.7627 0.311782C11.2754 0.33082 12.4426 0.441007 12.8219 0.717084Z" fill="#353533" stroke="#353533" strokeWidth="0.07776" />
      <path d="M16.4772 2.96695L16.331 2.85774C16.3811 2.15876 17.5076 1.1103 18.0646 0.673435L18.19 0.891865C17.2375 1.53842 16.6513 2.54465 16.4772 2.96695Z" fill="#353533" stroke="#353533" strokeWidth="0.07776" />
      <path d="M14.4511 3.05428L14.5973 2.94507C14.5472 2.24609 13.4207 1.19763 12.8637 0.760768L12.7384 0.979198C13.6908 1.62575 14.2771 2.63199 14.4511 3.05428Z" fill="#353533" stroke="#353533" strokeWidth="0.07776" />
      <path d="M17.626 4.03722C17.9045 4.53961 18.2484 5.84145 17.3962 7.02971C17.7165 6.9569 18.3821 6.5448 18.4824 5.47886C18.4894 5.22402 18.3278 4.57893 17.626 4.03722Z" fill="#FE9D1A" stroke="#FE9D1A" strokeWidth="0.07776" />
      <path d="M13.6574 6.92054C12.7718 6.11672 13.0516 4.678 13.3023 4.05911C11.4976 5.10757 12.62 6.57834 13.4067 7.18266L13.6574 6.92054Z" fill="#FE9D1A" stroke="#FE9D1A" strokeWidth="0.07776" />
      <path d="M13.741 6.72391C14.465 6.18511 16.1346 5.67108 17.2709 6.96419C17.814 5.74098 18.2902 3.02807 15.5999 2.92323C14.3606 2.88682 12.2538 3.59599 13.741 6.72391Z" fill="#353533" stroke="#353533" strokeWidth="0.07776" />
      <path d="M21.1351 7.68779L20.5502 7.55673C21.1184 5.47727 22.5972 4.05456 23.2656 3.60314C23.7502 3.34103 23.746 3.71236 23.6833 3.93079C22.2463 4.92683 21.3857 6.85047 21.1351 7.68779Z" fill="#353533" stroke="#353533" strokeWidth="0.07776" />
      <path d="M9.73061 7.81607L10.2614 7.42567C9.69326 5.34622 8.21444 3.92351 7.54605 3.47209C7.06146 3.20997 7.06564 3.5813 7.1283 3.79973C8.56535 4.79578 9.47996 6.97875 9.73061 7.81607Z" fill="#353533" stroke="#353533" strokeWidth="0.07776" />
      <path d="M18.0855 23.1499C15.7848 24.6495 13.7739 23.9099 12.9217 23.2651C13.7401 24.8595 14.5983 25.1655 14.9315 25.1157C14.9733 26.2266 15.224 26.9287 15.3911 26.9069C15.5247 26.8894 15.7949 25.7055 15.9132 25.1157C16.7153 25.1157 17.6956 23.8051 18.0855 23.1499Z" fill="#353533" />
      <path d="M12.7801 23.1499C13.5321 23.8124 15.6459 24.74 18.0855 23.1499C17.6956 23.8051 16.7153 25.1157 15.9132 25.1157C15.7949 25.7055 15.5247 26.8894 15.3911 26.9069C15.224 26.9287 14.9733 26.2266 14.9315 25.1157C14.5904 25.1667 13.6992 24.8449 12.8637 23.1499" stroke="#353533" strokeWidth="0.07776" />
      <path d="M18.9419 20.9219C15.9843 23.246 13.0447 21.7738 11.9447 20.7471L12.7802 22.6912C14.9023 24.2464 17.2988 23.3392 18.2317 22.6912L18.9419 20.9219Z" fill="#EDC03F" stroke="#EDC03F" strokeWidth="0.07776" />
      <path d="M19.1717 16.597C16.0803 19.62 12.9542 17.8566 11.7776 16.597V18.3444C15.2532 21.018 18.0994 19.4584 19.0881 18.3444L19.1717 16.597Z" fill="#EDC03F" stroke="#EDC03F" strokeWidth="0.07776" />
      <path d="M18.545 13.0147C15.8547 15.4786 13.2884 14.0414 12.3415 13.0147L11.9446 14.3908C14.3007 17.0994 17.5912 15.5194 18.9419 14.3908C18.8751 13.9016 18.6495 13.2696 18.545 13.0147Z" fill="#EDC03F" stroke="#EDC03F" strokeWidth="0.07776" />
      <path d="M19.2343 18.825C16.26 21.4112 13.0517 19.9026 11.8193 18.825L11.9864 20.354C15.0777 22.7654 17.9393 21.4607 18.9837 20.5069L19.2343 18.825Z" fill="#353533" stroke="#353533" strokeWidth="0.07776" />
      <path d="M17.8558 11.0707C15.6334 13.4472 13.7827 12.0609 13.1352 11.0707L12.4668 12.5342C14.8229 14.9107 17.4868 13.5244 18.5242 12.5342L17.8558 11.0707Z" fill="#353533" stroke="#353533" strokeWidth="0.07776" />
      <path d="M18.0855 9.23591C18.0855 10.8766 16.7291 12.2066 15.3241 12.2066C13.9191 12.2066 12.7801 10.8766 12.7801 9.23591C12.7801 7.59527 13.9191 6.26526 15.3241 6.26526C16.7291 6.26526 18.0855 7.59527 18.0855 9.23591Z" fill="#DCA02E" />
      <path d="M20.3831 7.77235C20.0824 8.19174 18.7818 8.54414 18.1691 8.66792C18.2693 8.84266 18.2109 9.19215 18.1691 9.34505C20.3581 8.73345 20.9332 8.12912 20.9471 7.90341L20.3831 7.77235Z" fill="#353533" stroke="#353533" strokeWidth="0.07776" />
      <path d="M12.665 8.7554C12.1639 8.77068 10.8367 7.94631 10.3623 7.52226C10.2941 7.71315 9.99626 7.88306 9.85587 7.94416C11.6772 9.35361 12.4875 9.44749 12.665 9.31825L12.665 8.7554Z" fill="#353533" stroke="#353533" strokeWidth="0.07776" />
    </svg>
  )
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
        <HoverflyMark />
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
