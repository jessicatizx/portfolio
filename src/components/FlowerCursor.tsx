import React from 'react'

// 10-petal flower cursor — matches the nav logo's circle-petal visual language
// Hides itself (restores system cursor) when the pointer is over [data-no-flower]

const PETALS       = 10
const CENTER_R     = 5.5
const PETAL_R      = 5
const PETAL_DIST   = 11.5   // px from centre to petal centre
const BOX          = 40     // viewBox / displayed px size

const petalPositions = Array.from({ length: PETALS }, (_, i) => {
  const angle = (i * (360 / PETALS) * Math.PI) / 180
  return {
    cx: BOX / 2 + PETAL_DIST * Math.cos(angle),
    cy: BOX / 2 + PETAL_DIST * Math.sin(angle),
  }
})

export default function FlowerCursor() {
  const [pos,    setPos]    = React.useState({ x: -200, y: -200 })
  const [onCard, setOnCard] = React.useState(false)
  const [inside, setInside] = React.useState(false)

  // Suppress the system cursor everywhere
  React.useEffect(() => {
    const style = document.createElement('style')
    style.id = 'flower-cursor-global'
    style.textContent = `* { cursor: none !important; }`
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setInside(true)
      const el = document.elementFromPoint(e.clientX, e.clientY)
      setOnCard(!!el?.closest('[data-no-flower]'))
    }
    const onLeave = () => setInside(false)
    const onEnter = () => setInside(true)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  // Restore default cursor on cards via inline style (overrides the global none)
  React.useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-no-flower]')
    cards.forEach(el => {
      el.style.cursor = onCard ? 'auto' : ''
    })
  }, [onCard])

  const visible = inside && !onCard

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: BOX,
        height: BOX,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 999998,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.12s ease',
      }}
    >
      <svg
        width={BOX} height={BOX}
        viewBox={`0 0 ${BOX} ${BOX}`}
        fill="none"
      >
        {petalPositions.map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={PETAL_R} fill="#F4C7DB" />
        ))}
        <circle cx={BOX / 2} cy={BOX / 2} r={CENTER_R} fill="#E8A0BF" />
      </svg>
    </div>
  )
}
