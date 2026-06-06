import React from 'react'

export default function InstagramThumbnail({ ready = false, compact = false }: { ready?: boolean; compact?: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = React.useState(false)
  const [inView, setInView] = React.useState(false)

  const playing = ready && inView

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.12, rootMargin: '0px 0px 8% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden${compact ? '' : ' rounded-card'}${playing ? ' ig-thumb--playing' : ''}`}
      style={compact ? { aspectRatio: '1024 / 641' } : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{`
        @keyframes ig-thumb-drift {
          0%   { transform: scale(1.172) translate3d(0, 0%, 0); }
          100% { transform: scale(1.198) translate3d(0, -1.05%, 0); }
        }
        @keyframes ig-thumb-glow {
          0%, 100% { opacity: 0.045; }
          50%      { opacity: 0.1; }
        }
        @keyframes ig-thumb-scrim {
          0%, 100% { opacity: 0.94; }
          50%      { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ig-thumb--playing .ig-thumb__img,
          .ig-thumb--playing .ig-thumb__glow,
          .ig-thumb--playing .ig-thumb__scrim {
            animation: none !important;
          }
        }
        .ig-thumb--playing .ig-thumb__img {
          animation: ig-thumb-drift 18s cubic-bezier(0.42, 0, 0.58, 1) infinite alternate;
        }
        .ig-thumb--playing .ig-thumb__glow {
          animation: ig-thumb-glow 10s ease-in-out infinite;
        }
        .ig-thumb--playing .ig-thumb__scrim {
          animation: ig-thumb-scrim 12s ease-in-out infinite;
        }
      `}</style>

      <img
        src="/instagram-thumb.png"
        alt="Instagram — What does the world's first social media ban look like?"
        className="ig-thumb__img block w-full h-auto"
        style={{
          transformOrigin: 'center 45%',
          transform: hovered
            ? 'scale(1.22) translateY(-2%)'
            : playing
              ? undefined
              : 'scale(1.18) translateY(0%)',
          animation: hovered ? 'none' : undefined,
          transition: hovered ? 'transform 2.2s cubic-bezier(0.16, 1, 0.3, 1)' : undefined,
        }}
      />

      <div
        className="ig-thumb__scrim pointer-events-none absolute inset-x-0 bottom-0 h-28"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.48) 20%, rgba(0,0,0,0.24) 50%, rgba(0,0,0,0.06) 72%, transparent 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.54) 0%, rgba(0,0,0,0.38) 20%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.05) 68%, transparent 100%)',
          opacity: hovered ? 1 : undefined,
          transition: hovered ? 'background 1.6s ease, opacity 0.6s ease' : undefined,
        }}
      />

      <div
        className="ig-thumb__glow pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 58% 42%, rgba(232,160,191,0.14) 0%, rgba(200,140,200,0.06) 42%, transparent 68%)',
          opacity: hovered ? 1 : playing ? undefined : 0,
          transition: hovered ? 'opacity 1.4s ease' : undefined,
        }}
      />
    </div>
  )
}
