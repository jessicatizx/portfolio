import React from 'react'

export default function InstagramThumbnail({ ready = false }: { ready?: boolean }) {
  const [hovered, setHovered] = React.useState(false)
  void ready

  return (
    <div
      className="relative w-full overflow-hidden rounded-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image — drifts up on hover, revealing more */}
      <img
        src="/instagram-thumb.png"
        alt="Instagram — What does the world's first social media ban look like?"
        className="block h-auto w-full"
        style={{
          transformOrigin: 'center 45%',
          transform: hovered ? 'scale(1.22) translateY(-2%)' : 'scale(1.18) translateY(0%)',
          transition: 'transform 2.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Gradient scrim — deepens on hover */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.48) 20%, rgba(0,0,0,0.24) 50%, rgba(0,0,0,0.06) 72%, transparent 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.38) 20%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.05) 68%, transparent 100%)',
          transition: 'background 1.6s ease',
        }}
      />

      {/* Subtle warm blush glow on hover */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, rgba(232,160,191,0.10) 0%, transparent 65%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 1.8s ease',
        }}
      />
    </div>
  )
}
