import { interpolate } from 'flubber'

/** Figma 245:417 — exact blue band; gray cutouts are transparent holes. */
export const VIEWBOX = '0 0 400 260'

export const STROKE_COLOR = '#037DF6'
export const STROKE_WIDTH = 26

/** Figma Vector 147 — outer blue boundary (245:417 proportions). */
export const PATH_META_OUTER = `M 274.77 229.33 C 258.70 216.37 219.72 154.03 202.60 124.48 C 190.70 147.57 158.22 194.62 143.09 215.25 C 107.37 258.60 64.22 249.73 47.11 239.88 C 11.39 222.43 12.14 150.52 22.55 116.04 C 27.55 99.51 41.16 61.85 60.50 43.56 C 87.29 14.00 110.85 14.00 126.72 14.00 C 165.41 11.19 207.07 61.85 207.07 61.85 C 207.07 61.85 231.37 37.46 244.27 25.96 C 269.56 9.08 293.12 14.00 306.02 16.82 C 334.30 25.96 359.34 60.44 369.26 79.44 C 377.45 92.11 383.40 118.85 384.14 121.67 C 384.89 124.48 388.61 181.48 386.37 194.15 C 385.00 201.89 381.41 211.97 379.67 214.55 C 376.10 221.30 371.24 227.68 369.26 230.03 C 346.94 250.44 326.60 249.50 316.44 248.32 C 300.37 248.32 281.96 235.66 274.77 229.33 Z`

/** Figma Vector 148 — right inner cutout. */
const PATH_META_HOLE_R = `M 271.33 155.90 C 267.80 151.44 239.48 108.93 225.78 88.23 C 264.56 22.35 305.61 46.36 321.28 66.60 C 343.62 88.36 350.68 142.64 351.40 167.07 C 350.82 202.23 336.96 209.63 330.10 208.93 C 302.19 212.42 275.73 161.49 271.33 155.90 Z`

/** Figma Vector 149 — left inner cutout (horizontal flip per Figma transform). */
const PATH_META_HOLE_L = `M 136.85 164.83 C 140.38 160.37 168.69 117.88 182.40 97.19 C 143.61 31.35 101.58 51.45 85.42 75.02 C 63.08 96.77 57.50 151.59 56.77 175.99 C 61.18 206.13 75.62 208.92 82.48 208.22 C 110.40 211.71 132.44 170.42 136.85 164.83 Z`

function parsePath(d: string) {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) ?? []
  const segs: Array<{ type: 'M' | 'C' | 'Z'; x?: number; y?: number; x1?: number; y1?: number; x2?: number; y2?: number }> = []
  let i = 0
  let cmd = 'M'
  let x = 0
  let y = 0
  let startX = 0
  let startY = 0
  while (i < tokens.length) {
    const t = tokens[i]
    if (/^[a-zA-Z]$/.test(t)) {
      cmd = t
      i++
      if (cmd === 'Z' || cmd === 'z') {
        segs.push({ type: 'Z' })
        x = startX
        y = startY
      }
      continue
    }
    if (cmd === 'M') {
      x = +tokens[i++]
      y = +tokens[i++]
      startX = x
      startY = y
      segs.push({ type: 'M', x, y })
      cmd = 'C'
    } else if (cmd === 'C') {
      const x1 = +tokens[i++]
      const y1 = +tokens[i++]
      const x2 = +tokens[i++]
      const y2 = +tokens[i++]
      x = +tokens[i++]
      y = +tokens[i++]
      segs.push({ type: 'C', x1, y1, x2, y2, x, y })
    }
  }
  return segs
}

function scalePathFrom(d: string, cx: number, cy: number, scale: number) {
  const map = (x: number, y: number) => [cx + (x - cx) * scale, cy + (y - cy) * scale]
  return parsePath(d)
    .map((s) => {
      if (s.type === 'Z') return 'Z'
      if (s.type === 'M') {
        const [x, y] = map(s.x!, s.y!)
        return `M ${x.toFixed(2)} ${y.toFixed(2)}`
      }
      const [x1, y1] = map(s.x1!, s.y1!)
      const [x2, y2] = map(s.x2!, s.y2!)
      const [x, y] = map(s.x!, s.y!)
      return `C ${x1.toFixed(2)} ${y1.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

function pathCentroid(d: string) {
  const pts: Array<[number, number]> = []
  for (const s of parsePath(d)) {
    if (s.type === 'M' || s.type === 'C') pts.push([s.x!, s.y!])
    if (s.type === 'C') {
      pts.push([s.x1!, s.y1!], [s.x2!, s.y2!])
    }
  }
  const n = pts.length || 1
  const sx = pts.reduce((a, [x]) => a + x, 0)
  const sy = pts.reduce((a, [, y]) => a + y, 0)
  return { x: sx / n, y: sy / n }
}

const HOLE_R_CENTER = pathCentroid(PATH_META_HOLE_R)
const HOLE_L_CENTER = pathCentroid(PATH_META_HOLE_L)

/** Full blue band — outer minus inner loops (evenodd fill). */
export const PATH_META = `${PATH_META_OUTER} ${PATH_META_HOLE_R} ${PATH_META_HOLE_L}`

/** End — perfect circle (Figma 233:430 / node 233:433). */
export const PATH_CIRCLE = `M 200 62 A 48 48 0 1 1 199.99 62 Z`

/** Center cutout — matches stroked ring thickness (r 48 − stroke 26). */
const CIRCLE_CENTER = { x: 200, y: 110 }
const PATH_CIRCLE_HOLE = `M 200 88 A 22 22 0 1 1 199.99 88 Z`

/** In-between silhouettes (Figma 236:462–468) — scaled to match meta outer. */
const PATH_MIDS_TO_CIRCLE = [
  `M 123.76 130.81 C 123.76 68.58 163.76 39.10 199.96 71.85 C 236.14 104.60 239.95 157.01 205.67 193.04 C 171.38 229.07 123.76 196.32 123.76 130.81 C 123.76 62.02 163.76 32.55 199.96 65.30 C 236.14 98.05 276.14 137.36 276.14 130.81 C 276.14 124.26 236.14 84.95 199.96 45.65 C 163.76 6.35 123.76 39.10 123.76 130.81 Z`,
  `M 137.09 130.81 C 137.09 78.40 171.38 52.20 201.86 81.68 C 232.34 111.16 234.24 160.29 201.86 189.77 C 169.47 219.24 137.09 186.49 137.09 130.81 C 137.09 81.68 171.38 55.47 201.86 75.13 C 232.34 94.78 266.62 127.54 266.62 130.81 C 266.62 134.09 232.34 157.01 201.86 173.39 C 171.38 189.77 137.09 160.29 137.09 130.81 Z`,
  `M 152.33 130.81 C 152.33 91.50 182.81 71.85 201.86 98.05 C 220.91 124.26 222.81 163.57 201.86 186.49 C 180.90 209.42 152.33 183.22 152.33 130.81 C 152.33 98.05 182.81 78.40 201.86 88.23 C 220.91 98.05 251.38 124.26 251.38 130.81 C 251.38 137.36 220.91 157.01 201.86 170.12 C 182.81 183.22 152.33 157.01 152.33 130.81 Z`,
  `M 167.57 130.81 C 167.57 104.60 190.43 88.23 201.86 107.89 C 213.29 127.54 215.19 157.01 201.86 173.39 C 188.53 189.77 167.57 170.12 167.57 130.81 C 167.57 111.16 190.43 94.78 201.86 101.33 C 213.29 107.89 236.14 127.54 236.14 130.81 C 236.14 134.09 213.29 150.46 201.86 160.29 C 190.43 170.12 167.57 150.46 167.57 130.81 Z`,
  `M 180.90 130.81 C 180.90 111.16 194.24 101.33 201.86 114.44 C 209.48 127.54 211.38 150.46 201.86 163.57 C 192.34 176.67 180.90 160.29 180.90 130.81 C 180.90 117.71 194.24 107.89 201.86 111.16 C 209.48 114.44 224.72 127.54 224.72 134.09 C 224.72 140.64 209.48 150.46 201.86 157.01 C 194.24 163.57 180.90 147.19 180.90 130.81 Z`,
  `M 190.43 130.81 C 190.43 117.71 198.05 107.89 201.86 117.71 C 205.67 127.54 207.58 143.91 201.86 153.74 C 196.15 163.57 190.43 150.46 190.43 130.81 C 190.43 120.99 198.05 111.16 201.86 114.44 C 205.67 117.71 215.19 127.54 215.19 130.81 C 215.19 134.09 205.67 143.91 201.86 150.46 C 198.05 157.01 190.43 143.91 190.43 130.81 Z`,
  `M 196.15 130.81 C 196.15 120.99 199.96 114.44 201.86 120.99 C 203.77 127.54 204.72 140.64 201.86 147.19 C 199.00 153.74 196.15 143.91 196.15 130.81 C 196.15 124.26 199.96 117.71 201.86 120.99 C 203.77 124.26 209.48 130.81 209.48 130.81 C 209.48 130.81 203.77 137.36 201.86 143.91 C 199.96 150.46 196.15 140.64 196.15 130.81 Z`,
]

export const PATHS_TO_CIRCLE = [PATH_META_OUTER, ...PATH_MIDS_TO_CIRCLE, PATH_CIRCLE]
export const PATHS_TO_META = [...PATHS_TO_CIRCLE].reverse()

const FLUBBER_OPTS = { maxSegmentLength: 2.5 } as const

function buildChain(paths: string[]) {
  const segments: Array<(t: number) => string> = []
  for (let i = 0; i < paths.length - 1; i++) {
    segments.push(interpolate(paths[i], paths[i + 1], FLUBBER_OPTS))
  }
  return segments
}

let chainToCircle: Array<(t: number) => string> | null = null
let chainToMeta: Array<(t: number) => string> | null = null

function getChains() {
  if (chainToCircle && chainToMeta) {
    return { chainToCircle, chainToMeta }
  }
  try {
    chainToCircle = buildChain(PATHS_TO_CIRCLE)
    chainToMeta = buildChain(PATHS_TO_META)
  } catch {
    chainToCircle = []
    chainToMeta = []
  }
  return { chainToCircle, chainToMeta }
}

/** Meta cutouts only in the last ~8% of circle→meta. */
const HOLE_REVEAL_START = 0.92

/** Circle center cutout while shape is clearly circular (mirrors meta hole timing). */
const CIRCLE_HOLE_FADE_END = 0.12
const CIRCLE_HOLE_REVEAL_START = 0.88

function smoothstep(t: number) {
  const p = Math.min(Math.max(t, 0), 1)
  return p * p * (3 - 2 * p)
}

/** 0 = no cutouts, 1 = full meta holes. */
export function morphHoleProgress(direction: 'to-meta' | 'to-circle', morphProgress: number) {
  const p = Math.min(Math.max(morphProgress, 0), 1)
  if (direction === 'to-meta') {
    if (p <= HOLE_REVEAL_START) return 0
    return smoothstep((p - HOLE_REVEAL_START) / (1 - HOLE_REVEAL_START))
  }
  // Holes are shown during meta-hold; close immediately when morphing back to circle.
  return 0
}

function metaHolesAt(progress: number): string {
  const p = Math.min(Math.max(progress, 0), 1)
  if (p <= 0) return ''
  const r = scalePathFrom(PATH_META_HOLE_R, HOLE_R_CENTER.x, HOLE_R_CENTER.y, p)
  const l = scalePathFrom(PATH_META_HOLE_L, HOLE_L_CENTER.x, HOLE_L_CENTER.y, p)
  return `${r} ${l}`
}

function circleHoleAt(progress: number): string {
  const p = Math.min(Math.max(progress, 0), 1)
  if (p <= 0) return ''
  return scalePathFrom(PATH_CIRCLE_HOLE, CIRCLE_CENTER.x, CIRCLE_CENTER.y, p)
}

/** 0 = solid disk, 1 = full center cutout. */
export function morphCircleHoleProgress(direction: 'to-meta' | 'to-circle', morphProgress: number) {
  const p = Math.min(Math.max(morphProgress, 0), 1)
  if (direction === 'to-meta') {
    if (p >= CIRCLE_HOLE_FADE_END) return 0
    return smoothstep(1 - p / CIRCLE_HOLE_FADE_END)
  }
  if (p <= CIRCLE_HOLE_REVEAL_START) return 0
  return smoothstep((p - CIRCLE_HOLE_REVEAL_START) / (1 - CIRCLE_HOLE_REVEAL_START))
}

/** Filled ring — outer circle minus center hole (evenodd). */
export function pathCircleDonut(holeProgress: number): string {
  const hole = circleHoleAt(holeProgress)
  return hole ? `${PATH_CIRCLE} ${hole}` : PATH_CIRCLE
}

function pathToCompound(
  outer: string,
  metaHoleProgress: number,
  circleHoleProgress: number,
): string {
  const meta = metaHolesAt(metaHoleProgress)
  const circle = circleHoleAt(circleHoleProgress)
  const holes = [meta, circle].filter(Boolean).join(' ')
  return holes ? `${outer} ${holes}` : outer
}

/** Circle → meta: center hole while circular, then solid, then meta cutouts open. */
export function pathToMetaCompound(progress: number) {
  const p = Math.min(Math.max(progress, 0), 1)
  return pathToCompound(
    pathToMeta(p),
    morphHoleProgress('to-meta', p),
    morphCircleHoleProgress('to-meta', p),
  )
}

/** Meta → circle: meta cutouts close early, solid morph, then center hole at end. */
export function pathToCircleCompound(progress: number) {
  const p = Math.min(Math.max(progress, 0), 1)
  return pathToCompound(
    pathToCircle(p),
    morphHoleProgress('to-circle', p),
    morphCircleHoleProgress('to-circle', p),
  )
}

export function pathAlongChain(segments: Array<(t: number) => string>, progress: number): string {
  const n = segments.length
  if (n === 0) {
    return progress >= 0.5 ? PATH_CIRCLE : PATH_META_OUTER
  }
  const clamped = Math.min(Math.max(progress, 0), 1)
  const scaled = clamped * n
  const idx = Math.min(Math.floor(scaled), n - 1)
  const local = scaled - idx
  return segments[idx](local)
}

export function pathToCircle(progress: number) {
  return pathAlongChain(getChains().chainToCircle, progress)
}

export function pathToMeta(progress: number) {
  return pathAlongChain(getChains().chainToMeta, progress)
}

import type { BakedFrame, MorphBake } from './metaMorphConstants'

function frameToCircle(p: number): BakedFrame {
  return {
    d: pathToCircleCompound(p),
    fillRule:
      morphHoleProgress('to-circle', p) > 0.005 ||
      morphCircleHoleProgress('to-circle', p) > 0.005
        ? 'evenodd'
        : 'nonzero',
  }
}

function frameToMeta(p: number): BakedFrame {
  return {
    d: pathToMetaCompound(p),
    fillRule:
      morphHoleProgress('to-meta', p) > 0.005 ||
      morphCircleHoleProgress('to-meta', p) > 0.005
        ? 'evenodd'
        : 'nonzero',
  }
}

/** Build-time only — run via `npm run bake:morph`. */
export function getMorphBake(steps = 40): MorphBake {
  getChains()
  const toCircle: BakedFrame[] = []
  const toMeta: BakedFrame[] = []
  for (let i = 0; i <= steps; i++) {
    const p = i / steps
    try {
      toCircle.push(frameToCircle(p))
    } catch {
      toCircle.push({ d: p >= 0.5 ? PATH_CIRCLE : PATH_META_OUTER, fillRule: 'evenodd' })
    }
    try {
      toMeta.push(frameToMeta(p))
    } catch {
      toMeta.push({ d: p >= 0.5 ? PATH_META_OUTER : PATH_CIRCLE, fillRule: 'evenodd' })
    }
  }
  return {
    metaHold: { d: PATH_META, fillRule: 'evenodd' },
    circleHold: { d: pathCircleDonut(1), fillRule: 'evenodd' },
    toCircle,
    toMeta,
    steps,
  }
}
