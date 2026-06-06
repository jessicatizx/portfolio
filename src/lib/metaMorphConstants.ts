/** Shared morph tokens — safe to import in the browser (no flubber). */
export const VIEWBOX = '0 0 400 260'
export const STROKE_COLOR = '#037DF6'

export type BakedFrame = {
  d: string
  fillRule: 'evenodd' | 'nonzero'
}

export type MorphBake = {
  metaHold: BakedFrame
  circleHold: BakedFrame
  toCircle: BakedFrame[]
  toMeta: BakedFrame[]
  steps: number
}
