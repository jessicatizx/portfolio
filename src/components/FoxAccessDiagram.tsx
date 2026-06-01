import React from 'react'

type NodeProps = {
  x: number
  y: number
  label: string
  labelOffset?: { x?: number; y?: number }
  dimmed?: boolean
  children: React.ReactNode
}

function AccessNode({ x, y, label, labelOffset = {}, dimmed = false, children }: NodeProps) {
  const lx = labelOffset.x ?? 0
  const ly = labelOffset.y ?? -50
  const radius = 36

  return (
    <g transform={`translate(${x}, ${y})`} opacity={dimmed ? 0.34 : 1}>
      <text
        x={lx}
        y={ly}
        textAnchor="middle"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 11.5,
          fontWeight: 600,
          fill: '#ffffff',
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </text>
      <ellipse cx={0} cy={20} rx={34} ry={6} fill="rgba(0,0,0,0.35)" />
      <circle r={radius} fill="#ffffff" />
      <circle r={radius + 5} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="4 5" />
      <g transform="translate(0, -5)">{children}</g>
    </g>
  )
}

function GroupsIcon() {
  return (
    <g>
      <circle cx="-12" cy="4" r="11" fill="#67e8f9" />
      <circle cx="0" cy="-6" r="12" fill="#38bdf8" />
      <circle cx="12" cy="4" r="11" fill="#0ea5e9" />
      <ellipse cx="0" cy="12" rx={20} ry={3.5} fill="rgba(14,116,144,0.2)" />
    </g>
  )
}

function UsersIcon() {
  return (
    <g>
      <circle r={16} fill="url(#foxUserGrad)" />
      <circle cy="-4" r={6} fill="#fff" />
      <path d="M-10 10 Q0 3 10 10" fill="#fff" />
    </g>
  )
}

function TitlesIcon() {
  return (
    <g>
      <rect x="-14" y="-10" width={28} height={22} rx={3} fill="#4b5563" />
      <rect x="-14" y="-10" width={28} height={7} rx={3} fill="#374151" />
      <path d="M-3 2 L0 -3 L3 2 Z" fill="#fff" />
      <line x1="-12" y1="-6" x2="12" y2="-6" stroke="#6b7280" strokeWidth="2" />
    </g>
  )
}

function CompaniesIcon() {
  return (
    <g>
      <rect x="-12" y="-3" width={24} height={18} rx={2} fill="#93c5fd" />
      <rect x="-9" y="1" width={4} height={4} fill="#dbeafe" />
      <rect x="-2" y="1" width={4} height={4} fill="#dbeafe" />
      <rect x="5" y="1" width={4} height={4} fill="#dbeafe" />
      <rect x="-10" y="-12" width={20} height={9} rx={1} fill="#60a5fa" />
      <rect x="-7" y={7} width={3.5} height={5} fill="#4ade80" rx={1} />
      <rect x={3.5} y={7} width={3.5} height={5} fill="#4ade80" rx={1} />
    </g>
  )
}

function ApplicationsIcon() {
  return (
    <g>
      <rect x="-14" y="-14" width={28} height={28} rx={8} fill="url(#foxAppGrad)" />
      <path d="M-6 3 L0 -6 L6 3 L0 -1 Z" fill="#fff" />
      <circle cx="10" cy="-10" r={6} fill="#ef4444" />
      <text
        x={10}
        y={-7}
        textAnchor="middle"
        fill="#fff"
        style={{ fontSize: 8, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}
      >
        1
      </text>
    </g>
  )
}

const NODE_RADIUS = 36
const HUB = { x: 92, y: 152 }

const NODES = [
  { key: 'users', x: 278, y: 52, label: 'Users', dimmed: false, labelOffset: { x: 0, y: -48 } },
  { key: 'titles', x: 392, y: 118, label: 'Titles', dimmed: true, labelOffset: { x: 0, y: -48 } },
  { key: 'companies', x: 392, y: 218, label: 'Companies', dimmed: true, labelOffset: { x: 0, y: 56 } },
  { key: 'applications', x: 278, y: 252, label: 'Applications', dimmed: false, labelOffset: { x: 0, y: 56 } },
] as const

const ICONS: Record<(typeof NODES)[number]['key'], () => React.ReactNode> = {
  users: UsersIcon,
  titles: TitlesIcon,
  companies: CompaniesIcon,
  applications: ApplicationsIcon,
}

interface FoxAccessDiagramProps {
  className?: string
}

export default function FoxAccessDiagram({ className = '' }: FoxAccessDiagramProps) {
  return (
    <figure
      className={`mx-auto w-full max-w-[320px] shrink-0 sm:max-w-[360px] lg:mx-0 lg:ml-auto lg:w-[min(100%,400px)] lg:max-w-[400px] ${className}`.trim()}
    >
      <div
        className="overflow-visible rounded-card px-1 py-2"
        style={{
          background: '#0c0c0e',
          border: '1px solid rgba(0,0,0,0.12)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.1)',
        }}
      >
        <svg
          viewBox="0 -28 470 348"
          className="block h-auto w-full overflow-visible"
          aria-labelledby="fox-access-diagram-title"
        >
          <title id="fox-access-diagram-title">
            Access control system: Groups hub with Users, Applications, Titles, and Companies
          </title>
          <defs>
            <linearGradient id="foxUserGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="foxAppGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {NODES.map((node) => {
            const dx = node.x - HUB.x
            const dy = node.y - HUB.y
            const len = Math.hypot(dx, dy) || 1
            const nx = dx / len
            const ny = dy / len
            const x1 = HUB.x + nx * NODE_RADIUS
            const y1 = HUB.y + ny * NODE_RADIUS
            const x2 = node.x - nx * NODE_RADIUS
            const y2 = node.y - ny * NODE_RADIUS
            const Icon = ICONS[node.key]
            return (
              <React.Fragment key={node.key}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  opacity={node.dimmed ? 0.35 : 0.85}
                />
                <AccessNode
                  x={node.x}
                  y={node.y}
                  label={node.label}
                  dimmed={node.dimmed}
                  labelOffset={node.labelOffset}
                >
                  <Icon />
                </AccessNode>
              </React.Fragment>
            )
          })}

          <AccessNode x={HUB.x} y={HUB.y} label="Groups" labelOffset={{ x: 0, y: -50 }}>
            <GroupsIcon />
          </AccessNode>
        </svg>
      </div>
    </figure>
  )
}
