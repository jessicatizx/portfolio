import React from 'react'

const PHRASES = ['she designs...', 'she writes...', 'and also (vibe)codes...']

const BLOOMS = [
  { stops: ['#96d4c4','#a8dcd0','#bae6d8','#ccefe2','#daf5ec','#e8f8f4','#f0fbf8','#f6fdfc'] },
  { stops: ['#d28caa','#dba0bc','#e4b4ca','#ecc8d8','#f0d8e4','#f5e4ed','#f8eff4','#faf5f8'] },
  { stops: ['#c2b4e8','#cfc0ec','#d8ccf0','#e4daf4','#eee8f8','#f4f0fb','#f8f5fd','#fbf9fe'] },
]
const OFFSETS   = ['0%','10%','24%','42%','60%','76%','88%','100%'] as const
const OPACITIES = [1.00, 0.92, 0.75, 0.50, 0.26, 0.10, 0.03, 0]   as const

interface Props {
  onDone: () => void
}

export default function SplashScreen({ onDone }: Props) {
  const [phase,   setPhase]   = React.useState(0)
  const [textIdx, setTextIdx] = React.useState(-1)
  const hasSeenBefore = React.useRef(
    typeof window !== 'undefined' && !!localStorage.getItem('splash-seen')
  )
  React.useEffect(() => { localStorage.setItem('splash-seen', '1') }, [])

  // ── Main timeline ──────────────────────────────────────────────
  React.useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1),    900),    // green bloom splashes
      setTimeout(() => setTextIdx(0), 2700),    // "she designs..."
      setTimeout(() => setTextIdx(1), 6700),    // "she writes..."
      setTimeout(() => setTextIdx(2),10700),    // "and also (vibe)codes..."
      setTimeout(() => setPhase(2),  14200),    // blooms dissolve
      setTimeout(() => setPhase(5),  14800),    // splash fades out
      setTimeout(onDone,             15600),
    ]
    return () => t.forEach(clearTimeout)
  }, [onDone])

  const textStyle: React.CSSProperties = {
    fontFamily: "'La Belle Aurore', cursive",
    fontSize: 'clamp(26px, 3.2vw, 46px)',
    color: '#4e4d4a',
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#ffffff',
      overflow: 'hidden',
      opacity: phase === 5 ? 0 : 1,
      transition: phase === 5 ? 'opacity 0.8s ease' : 'none',
    }}>
      <style>{`
        @keyframes write-organic {
          0%   { clip-path: inset(0 100%  -0.45em 0); }
          6%   { clip-path: inset(0 94%   -0.45em 0); }
          16%  { clip-path: inset(0 80%   -0.45em 0); }
          30%  { clip-path: inset(0 62%   -0.45em 0); }
          46%  { clip-path: inset(0 44%   -0.45em 0); }
          57%  { clip-path: inset(0 33%   -0.45em 0); }
          61%  { clip-path: inset(0 29%   -0.45em 0); }
          72%  { clip-path: inset(0 18%   -0.45em 0); }
          86%  { clip-path: inset(0 6%    -0.45em 0); }
          100% { clip-path: inset(0 0%    -0.45em 0); }
        }
        @keyframes pen-travel {
          0%   { left: 0%;   }   6%   { left: 6%;  }
          16%  { left: 20%;  }   30%  { left: 38%; }
          46%  { left: 56%;  }   57%  { left: 67%; }
          61%  { left: 71%;  }   72%  { left: 82%; }
          86%  { left: 94%;  }   100% { left: 100%; }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 0.7; }
          50%      { opacity: 0.15; }
        }
      `}</style>

      {/* ── Bloom layers ────────────────────────────────────────────── */}
      {BLOOMS.map((bloom, i) => {
        const isActive   = textIdx === i
        const isDone     = textIdx > i
        const shouldShow = i === 0 ? phase >= 1 : isActive
        const opacity    = phase >= 2 ? 0 : shouldShow ? 1 : 0
        const transition =
          phase >= 2   ? 'opacity 3.0s ease'
          : shouldShow ? 'opacity 1.6s ease'
          : isDone     ? 'opacity 1.2s ease'
          : 'none'
        return (
          <svg key={i} width="100%" height="100%" viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid slice"
            style={{ position:'absolute', inset:0, opacity, transition, pointerEvents:'none' }}>
            <defs>
              <filter id={`bf-${i}`} filterUnits="userSpaceOnUse" x="-400" y="-320" width="1800" height="1240">
                <feTurbulence type="fractalNoise" baseFrequency="0.004 0.006"
                  numOctaves="5" seed={19 + i * 11} result="n"/>
                <feDisplacementMap in="SourceGraphic" in2="n" scale="88"
                  xChannelSelector="R" yChannelSelector="G" result="d"/>
                <feGaussianBlur in="d" stdDeviation="4"/>
              </filter>
              <radialGradient id={`bg-${i}`} cx="50%" cy="50%" r="50%">
                {bloom.stops.map((c, j) => (
                  <stop key={j} offset={OFFSETS[j]} stopColor={c} stopOpacity={OPACITIES[j]}/>
                ))}
              </radialGradient>
            </defs>
            <ellipse cx="500" cy="295" rx="440" ry="340"
              fill={`url(#bg-${i})`} filter={`url(#bf-${i})`}
              style={{
                transformBox: 'fill-box', transformOrigin: 'center',
                transform: (i === 0 ? phase >= 1 : textIdx >= i) ? 'scale(1)' : 'scale(0.004)',
                transition: (i === 0 ? phase >= 1 : textIdx >= i)
                  ? 'transform 6.0s cubic-bezier(0.03, 0.58, 0.20, 1.0)' : 'none',
              } as React.CSSProperties}
            />
          </svg>
        )
      })}

      {/* ── Phrases ─────────────────────────────────────────────────── */}
      <div style={{
        position:'absolute', inset:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        pointerEvents:'none',
        opacity: phase >= 2 ? 0 : 1,
        transition: phase >= 2 ? 'opacity 2.2s ease' : 'none',
      }}>
        {PHRASES.map((phrase, i) => {
          const isActive = textIdx === i
          const isDone   = textIdx > i
          const dur      = i === 2 ? '2.4s' : '2.0s'
          return (
            <div key={i} style={{
              position:'absolute', display:'inline-block',
              opacity: isActive ? 1 : 0,
              transition: isActive ? 'opacity 0.3s ease' : isDone ? 'opacity 0.6s ease' : 'none',
            }}>
              <span style={{
                ...textStyle, display:'inline-block',
                animation: isActive ? `write-organic ${dur} cubic-bezier(0.4,0,0.6,1) forwards` : 'none',
                clipPath: isDone ? 'inset(0 0% -0.45em 0)' : isActive ? undefined : 'inset(0 100% -0.45em 0)',
              }}>{phrase}</span>
              {isActive && (
                <span style={{
                  position:'absolute', top:'12%', height:'76%',
                  width:'1.5px', background:'#4e4d4a', borderRadius:'1px',
                  animation: `pen-travel ${dur} cubic-bezier(0.4,0,0.6,1) forwards, cursor-blink 0.55s ease infinite`,
                  pointerEvents:'none',
                }}/>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Skip intro (shown after first visit) ────────────────────── */}
      {hasSeenBefore.current && (
        <button
          onClick={onDone}
          style={{
            position:'absolute', bottom:'36px', right:'44px',
            fontFamily:"'La Belle Aurore', cursive",
            fontSize:'17px', color:'#4e4d4a',
            background:'none', border:'none', cursor:'pointer',
            letterSpacing:'0.02em',
            opacity: phase >= 1 ? 0.55 : 0,
            transition:'opacity 1.2s ease 2s',
            padding:'8px 0', zIndex:10,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
        >
          skip intro
        </button>
      )}
    </div>
  )
}
