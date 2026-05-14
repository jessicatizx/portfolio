interface ProjectChipProps {
  label: string
  year: string
  dark?: boolean
}

/** Shared frosted-glass label chip */
export default function ProjectChip({ label, year, dark = false }: ProjectChipProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="rounded-pill px-3 py-2 font-ui text-xs font-medium tracking-wide"
        style={dark
          ? { background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.12)', color: '#111110' }
          : { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#ffffff' }
        }
      >
        {label}
      </span>
      <span style={{ color: dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)' }} className="font-ui text-xs">·</span>
      <span style={{ color: dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)' }} className="font-ui text-xs">{year}</span>
    </div>
  )
}
