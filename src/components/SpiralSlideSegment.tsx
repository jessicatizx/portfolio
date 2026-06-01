import React from 'react'

type Variant = 'entrance' | 'tube' | 'exit'

interface Props {
  variant?: Variant
}

const RED = '#c62828'
const RED_DARK = '#8e0000'
const RED_LIGHT = '#e53935'
const INNER = '#2d1212'
const CREAM = '#f5f0ea'

/** Ring cross-section of the tube at a given center. */
function TubeRing({
  cx,
  cy,
  rx,
  ry,
  rim = 14,
}: {
  cx: number
  cy: number
  rx: number
  ry: number
  rim?: number
}) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx + 4} ry={ry + 3} fill={RED_DARK} opacity="0.25" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={RED} />
      <ellipse cx={cx} cy={cy} rx={rx - rim} ry={ry - rim * 0.72} fill={INNER} />
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx - rim * 0.55}
        ry={ry - rim * 0.5}
        fill="none"
        stroke={RED_LIGHT}
        strokeWidth="2"
        opacity="0.35"
      />
    </g>
  )
}

/** Connect two rings with tube walls (solid red, no gradients). */
function TubeWall({
  x1,
  y1,
  r1x,
  r1y,
  x2,
  y2,
  r2x,
  r2y,
  side,
}: {
  x1: number
  y1: number
  r1x: number
  r1y: number
  x2: number
  y2: number
  r2x: number
  r2y: number
  side: 'outer' | 'inner'
}) {
  const sign = side === 'outer' ? 1 : -1
  const ox1 = x1 + sign * r1x
  const oy1a = y1 - r1y * 0.55
  const oy1b = y1 + r1y * 0.55
  const ox2 = x2 + sign * r2x
  const oy2a = y2 - r2y * 0.55
  const oy2b = y2 + r2y * 0.55
  return (
    <path
      d={`M ${ox1} ${oy1a} Q ${(ox1 + ox2) / 2} ${(y1 + y2) / 2 - 20} ${ox2} ${oy2a}
         L ${ox2} ${oy2b} Q ${(ox1 + ox2) / 2} ${(y1 + y2) / 2 + 20} ${ox1} ${oy1b} Z`}
      fill={side === 'outer' ? RED : RED_DARK}
    />
  )
}

function EntranceTop() {
  return (
    <g>
      {/* Platform / lip around the hole */}
      <ellipse cx={160} cy={58} rx={98} ry={58} fill={RED_DARK} />
      <ellipse cx={160} cy={56} rx={92} ry={54} fill={RED} />
      <ellipse cx={160} cy={54} rx={78} ry={44} fill={INNER} />
      {/* Inner depth */}
      <ellipse cx={160} cy={52} rx={62} ry={34} fill="#1a0a0a" />
      <ellipse cx={160} cy={50} rx={48} ry={24} fill="#120808" opacity="0.9" />

      {/* Rim highlight */}
      <ellipse
        cx={160}
        cy={48}
        rx={88}
        ry={50}
        fill="none"
        stroke={RED_LIGHT}
        strokeWidth="3"
        opacity="0.5"
      />

      {/* Ladder rungs inside (climb in cue) */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={152}
          y={36 + i * 10}
          width={16}
          height={3}
          rx={1}
          fill={RED_LIGHT}
          opacity={0.45 - i * 0.08}
        />
      ))}

      {/* Label */}
      <text
        x={160}
        y={118}
        textAnchor="middle"
        fill={RED_DARK}
        style={{ fontFamily: 'La Belle Aurore, cursive', fontSize: 18, opacity: 0.7 }}
      >
        climb in
      </text>
    </g>
  )
}

function ExitBottom() {
  return (
    <g>
      <ellipse cx={160} cy={468} rx={100} ry={58} fill={RED_DARK} />
      <ellipse cx={160} cy={466} rx={94} ry={54} fill={RED} />
      <ellipse cx={160} cy={464} rx={80} ry={44} fill={INNER} />
      <ellipse cx={160} cy={462} rx={66} ry={34} fill="#1a0a0a" />
      {/* Slide exit flare */}
      <path
        d="M 95 464 Q 160 510 225 464 L 210 450 Q 160 485 110 450 Z"
        fill={RED}
        opacity="0.85"
      />
      <text
        x={160}
        y={430}
        textAnchor="middle"
        fill={RED_DARK}
        style={{ fontFamily: 'La Belle Aurore, cursive', fontSize: 17, opacity: 0.65 }}
      >
        wheee ↓
      </text>
    </g>
  )
}

function TubeBody({ offsetY = 0 }: { offsetY?: number }) {
  const rings = [
    { cx: 200, cy: 36 + offsetY, rx: 72, ry: 38 },
    { cx: 118, cy: 200 + offsetY, rx: 76, ry: 40 },
    { cx: 205, cy: 368 + offsetY, rx: 74, ry: 39 },
    { cx: 115, cy: Math.min(500 + offsetY, 498), rx: 70, ry: 36 },
  ]

  return (
    <g>
      {/* Central support column */}
      <rect x={148} y={0} width={24} height={520} fill={RED_DARK} rx={4} />
      <rect x={151} y={0} width={18} height={520} fill={RED} rx={3} opacity="0.9" />

      {rings.map((r, i) => {
        if (i === rings.length - 1) return null
        const n = rings[i + 1]
        return (
          <React.Fragment key={i}>
            <TubeWall
              x1={r.cx}
              y1={r.cy}
              r1x={r.rx}
              r1y={r.ry}
              x2={n.cx}
              y2={n.cy}
              r2x={n.rx}
              r2y={n.ry}
              side="outer"
            />
            <TubeWall
              x1={r.cx}
              y1={r.cy}
              r1x={r.rx * 0.5}
              r1y={r.ry * 0.5}
              x2={n.cx}
              y2={n.cy}
              r2x={n.rx * 0.5}
              r2y={n.ry * 0.5}
              side="inner"
            />
          </React.Fragment>
        )
      })}

      {rings.map((r, i) => (
        <TubeRing key={i} cx={r.cx} cy={r.cy} rx={r.rx} ry={r.ry} rim={13} />
      ))}

      {/* Segment joint lines (like bolted tube sections) */}
      {[130, 260, 390].map((y) => (
        <line
          key={y}
          x1={52}
          y1={y}
          x2={268}
          y2={y}
          stroke={RED_DARK}
          strokeWidth="1.5"
          opacity="0.35"
          strokeDasharray="6 8"
        />
      ))}
    </g>
  )
}

export default function SpiralSlideSegment({ variant = 'tube' }: Props) {
  return (
    <svg
      width={320}
      height={520}
      viewBox="0 0 320 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={variant !== 'entrance'}
      aria-label={variant === 'entrance' ? 'Spiral slide entrance' : undefined}
      className="block shrink-0"
    >
      <title>{variant === 'entrance' ? 'Spiral slide — climb in at the top' : 'Spiral slide section'}</title>
      <rect width={320} height={520} fill={CREAM} />

      <TubeBody offsetY={variant === 'entrance' ? 72 : 0} />

      {variant === 'entrance' && <EntranceTop />}

      {variant === 'exit' && <ExitBottom />}

      {/* Subtle outer rail */}
      <path
        d="M 42 0 L 58 80 L 48 200 L 38 340 L 52 480 L 48 520"
        fill="none"
        stroke={RED_DARK}
        strokeWidth="2.5"
        opacity="0.2"
      />
      <path
        d="M 278 0 L 262 90 L 272 210 L 282 350 L 268 470 L 272 520"
        fill="none"
        stroke={RED_DARK}
        strokeWidth="2.5"
        opacity="0.2"
      />
    </svg>
  )
}
