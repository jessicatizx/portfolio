import React from 'react'

type Phase = 'idle' | 'pour' | 'spread' | 'mop' | 'pause'

const TEA = {
  fill: 'rgba(122, 168, 108, 0.72)',
  deep: 'rgba(92, 138, 82, 0.55)',
  shine: 'rgba(168, 198, 155, 0.35)',
}

const MOP_BRUSH = 26
const CLEAN_THRESHOLD = 0.94
const MIN_MOP_POINTS = 28
const MIN_MOP_MS = 4500
const REPEAT_MS = 9000
const SPILL_HEIGHT = 58

function dispatchMop(active: boolean) {
  window.dispatchEvent(new CustomEvent('tea-mop', { detail: { active } }))
}

/** Spill path along bottom of band — starts at mug pour point (left, low). */
function buildSpillBlobs(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1)
    const wobble = Math.sin(t * Math.PI * 4.2) * 0.018 + Math.sin(t * 13) * 0.01
    const startBias = t < 0.12 ? (0.12 - t) * 0.06 : 0
    return {
      nx: t,
      ny: 0.38 + wobble - startBias * 0.5,
      rx: 0.018 + Math.sin(t * 9) * 0.006 + 0.012,
      ry: 0.008 + Math.cos(t * 7) * 0.003 + 0.006,
      rot: (t - 0.5) * 0.7 + Math.sin(t * 11) * 0.2,
    }
  })
}

const SPILL_BLOBS = buildSpillBlobs(48)

function MugGraphic({ pouring }: { pouring: boolean }) {
  return (
    <svg
      width={72}
      height={92}
      viewBox="0 0 72 92"
      aria-hidden
      className={`tea-mug${pouring ? ' tea-mug--pour' : ''}`}
      style={{ overflow: 'visible' }}
    >
      <ellipse cx="36" cy="74" rx="28" ry="5" fill="rgba(0,0,0,0.06)" />
      <g className="tea-mug__body">
        <path
          d="M18 28 Q18 18 28 14 H44 Q54 18 54 28 V52 Q54 62 44 66 H28 Q18 62 18 52 Z"
          fill="#f5f0e8"
          stroke="rgba(120,100,85,0.35)"
          strokeWidth="1.2"
        />
        <g className="tea-mug__liquid">
          <path
            d="M22 32 H50 V48 Q50 54 44 56 H28 Q22 54 22 48 Z"
            fill={TEA.fill}
          />
          <path d="M24 36 Q36 40 48 36" fill="none" stroke={TEA.shine} strokeWidth="2" strokeLinecap="round" />
        </g>
        <path
          d="M54 32 Q62 30 64 36 Q62 42 54 40"
          fill="none"
          stroke="rgba(120,100,85,0.4)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <ellipse cx="30" cy="22" rx="14" ry="5" fill="none" stroke="rgba(120,100,85,0.3)" strokeWidth="1.2" />
      </g>
      <g className="tea-mug__stream" opacity={pouring ? 1 : 0}>
        <path
          d="M50 54 Q52 60 56 66 Q58 70 62 74"
          fill="none"
          stroke={TEA.deep}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M51 55 Q53 61 57 67 Q59 71 61 75"
          fill="none"
          stroke={TEA.fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />
      </g>
    </svg>
  )
}

function RugCursor({ x, y, visible }: { x: number; y: number; visible: boolean }) {
  return (
    <div
      aria-hidden
      className="tea-rug-cursor"
      style={{
        left: x,
        top: y,
        opacity: visible ? 1 : 0,
      }}
    >
      <svg width="44" height="36" viewBox="0 0 44 36" fill="none">
        <rect x="4" y="6" width="36" height="22" rx="3" fill="#c4a882" stroke="rgba(90,70,50,0.35)" strokeWidth="1" />
        <rect x="6" y="8" width="32" height="18" rx="2" fill="#d9c4a8" />
        <path d="M4 10 H2 M4 16 H2 M4 22 H2 M40 10 H42 M40 16 H42 M40 22 H42" stroke="#a88868" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M8 28 H36" stroke="rgba(90,70,50,0.25)" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
  )
}

function countTeaPixels(canvas: HTMLCanvasElement): number {
  const ctx = canvas.getContext('2d')
  if (!ctx) return 1
  const w = canvas.width
  const h = canvas.height
  const data = ctx.getImageData(0, 0, w, h).data
  let tea = 0
  const step = 6
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (data[(y * w + x) * 4 + 3] > 28) tea++
    }
  }
  return Math.max(tea, 1)
}

export default function TeaSpillFooter() {
  const footerRef = React.useRef<HTMLElement>(null)
  const stageRef = React.useRef<HTMLDivElement>(null)
  const mugWrapRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const spreadRef = React.useRef(0)
  const cleanedRef = React.useRef(0)
  const initialTeaRef = React.useRef(0)
  const mopStartedAtRef = React.useRef(0)
  const mopPointsRef = React.useRef<{ x: number; y: number }[]>([])
  const rafRef = React.useRef<number>(0)
  const cycleRef = React.useRef(0)

  const [phase, setPhase] = React.useState<Phase>('idle')
  const [inView, setInView] = React.useState(false)
  const [mopPos, setMopPos] = React.useState({ x: -100, y: -100 })
  const [spread, setSpread] = React.useState(0)
  const reducedMotion = React.useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const resizeCanvas = React.useCallback(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = stage.clientWidth
    const h = SPILL_HEIGHT
    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }, [])

  const drawSpill = React.useCallback((progress: number, eraseMask?: (ctx: CanvasRenderingContext2D) => void) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.clientWidth
    const h = canvas.clientHeight

    ctx.clearRect(0, 0, w, h)

    const visibleCount = Math.floor(SPILL_BLOBS.length * progress)
    for (let i = 0; i < visibleCount; i++) {
      const b = SPILL_BLOBS[i]
      if (b.nx < 0.1) continue
      const x = b.nx * w
      const y = b.ny * h
      const rx = b.rx * w
      const ry = b.ry * h
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(b.rot)
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, ry))
      g.addColorStop(0, TEA.fill)
      g.addColorStop(0.55, TEA.deep)
      g.addColorStop(1, 'rgba(122, 168, 108, 0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    if (eraseMask) eraseMask(ctx)
  }, [])

  const applyMopStrokes = React.useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.globalCompositeOperation = 'destination-out'
    for (const p of mopPointsRef.current) {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, MOP_BRUSH)
      g.addColorStop(0, 'rgba(0,0,0,0.92)')
      g.addColorStop(0.45, 'rgba(0,0,0,0.45)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(p.x, p.y, MOP_BRUSH, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalCompositeOperation = 'source-over'
  }, [])

  const sampleCleanRatio = React.useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || initialTeaRef.current <= 0) return 0
    const remaining = countTeaPixels(canvas)
    return 1 - remaining / initialTeaRef.current
  }, [])

  const pushMopPoint = React.useCallback((x: number, y: number) => {
    const points = mopPointsRef.current
    const last = points[points.length - 1]
    if (!last) {
      points.push({ x, y })
      return
    }
    const dist = Math.hypot(x - last.x, y - last.y)
    if (dist < 4) return
    const steps = Math.max(1, Math.ceil(dist / 7))
    for (let i = 1; i <= steps; i++) {
      const t = i / steps
      points.push({
        x: last.x + (x - last.x) * t,
        y: last.y + (y - last.y) * t,
      })
    }
    if (points.length > 500) {
      mopPointsRef.current = points.slice(-400)
    }
  }, [])

  const beginMopPhase = React.useCallback(() => {
    spreadRef.current = 1
    mopPointsRef.current = []
    mopStartedAtRef.current = performance.now()
    drawSpill(1)
    const canvas = canvasRef.current
    initialTeaRef.current = canvas ? countTeaPixels(canvas) : 1
    setPhase('mop')
    dispatchMop(true)
  }, [drawSpill])

  const startCycle = React.useCallback(() => {
    if (reducedMotion.current) return
    cycleRef.current += 1
    const id = cycleRef.current
    spreadRef.current = 0
    cleanedRef.current = 0
    mopPointsRef.current = []
    setSpread(0)
    setPhase('pour')
    dispatchMop(false)

    window.setTimeout(() => {
      if (cycleRef.current !== id) return
      setPhase('spread')
    }, 900)

    const spreadStart = performance.now()
    const spreadDuration = 2200

    const tickSpread = (now: number) => {
      if (cycleRef.current !== id) return
      const t = Math.min(1, (now - spreadStart) / spreadDuration)
      const eased = 1 - Math.pow(1 - t, 2.4)
      spreadRef.current = eased
      setSpread(eased)
      drawSpill(eased)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tickSpread)
      } else {
        spreadRef.current = 1
        beginMopPhase()
      }
    }
    window.setTimeout(() => {
      if (cycleRef.current !== id) return
      rafRef.current = requestAnimationFrame(tickSpread)
    }, 900)
  }, [drawSpill, beginMopPhase])

  const endMopPhase = React.useCallback(() => {
    dispatchMop(false)
    setPhase('pause')
    drawSpill(0)
    setSpread(0)
    spreadRef.current = 0
    window.setTimeout(() => {
      if (footerRef.current && inView) startCycle()
    }, REPEAT_MS)
  }, [drawSpill, inView, startCycle])

  const mopAt = React.useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      setMopPos({ x: clientX, y: clientY })

      pushMopPoint(x, y)
      drawSpill(spreadRef.current, applyMopStrokes)

      const ratio = sampleCleanRatio()
      cleanedRef.current = ratio
      const mopMs = performance.now() - mopStartedAtRef.current
      const enoughMopping =
        mopPointsRef.current.length >= MIN_MOP_POINTS && mopMs >= MIN_MOP_MS

      if (enoughMopping && ratio >= CLEAN_THRESHOLD) {
        cancelAnimationFrame(rafRef.current)
        endMopPhase()
      }
    },
    [drawSpill, applyMopStrokes, pushMopPoint, endMopPhase, sampleCleanRatio]
  )

  React.useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const refresh = () => {
      const progress = spreadRef.current
      const points = [...mopPointsRef.current]
      resizeCanvas()
      if (phase === 'mop' || phase === 'spread' || phase === 'pour') {
        drawSpill(progress, phase === 'mop' ? applyMopStrokes : undefined)
        mopPointsRef.current = points
      }
    }

    refresh()
    const ro = new ResizeObserver(refresh)
    ro.observe(stage)
    window.addEventListener('resize', refresh)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', refresh)
    }
  }, [resizeCanvas, drawSpill, applyMopStrokes, phase])

  React.useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  React.useEffect(() => {
    if (!inView) {
      cycleRef.current += 1
      cancelAnimationFrame(rafRef.current)
      dispatchMop(false)
      setPhase('idle')
      drawSpill(0)
      return
    }
    if (phase !== 'idle') return
    const t = window.setTimeout(startCycle, 1400)
    return () => clearTimeout(t)
  }, [inView, phase, startCycle, drawSpill])

  React.useEffect(() => {
    if (phase !== 'mop') return

    const onMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      if (
        e.clientY < rect.top - 20 ||
        e.clientY > rect.bottom + 40 ||
        e.clientX < rect.left - 20 ||
        e.clientX > rect.right + 20
      ) {
        return
      }
      mopAt(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', onMove)
    const timeout = window.setTimeout(() => {
      if (cleanedRef.current < CLEAN_THRESHOLD) endMopPhase()
    }, 18000)

    return () => {
      window.removeEventListener('mousemove', onMove)
      clearTimeout(timeout)
    }
  }, [phase, mopAt, endMopPhase])

  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current)
      dispatchMop(false)
    }
  }, [])

  const pouring = phase === 'pour' || phase === 'spread'
  const mopActive = phase === 'mop'

  return (
    <>
      <footer ref={footerRef} className="tea-footer relative border-t border-black/[0.07]">
        <div className="relative z-10 mx-auto flex max-w-content items-center justify-between px-20 pb-3 pt-12">
          <p className="font-ui text-xs text-ink-tertiary">
            Made with tea, persistence and countless hours in Claude &amp; Cursor
          </p>
          <a
            href="https://www.linkedin.com/in/jessica-ti"
            target="_blank"
            rel="noopener"
            className="font-ui text-xs font-medium text-ink-secondary transition-colors hover:text-ink-primary"
          >
            LinkedIn
          </a>
        </div>

        <div
          ref={stageRef}
          className="tea-spill-band"
          style={{ pointerEvents: mopActive ? 'auto' : 'none' }}
          aria-hidden
        >
          <div ref={mugWrapRef} className="tea-mug-wrap">
            <MugGraphic pouring={pouring} />
          </div>
          <canvas ref={canvasRef} className="tea-spill-canvas" />
          {mopActive && (
            <p className="tea-mop-hint font-hand text-[15px] text-[#6a8f62]">
              oops, could you help to mop up?
            </p>
          )}
        </div>
      </footer>

      <RugCursor x={mopPos.x} y={mopPos.y} visible={mopActive} />
    </>
  )
}
