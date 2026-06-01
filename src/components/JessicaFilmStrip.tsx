import React from 'react'

const FRAMES = [
  '/jessica-film-1.png',
  '/jessica-film-2.png',
  '/jessica-film-3.png',
  '/jessica-film-4.png',
  '/jessica-film-5.png',
]

const STRIP_FRAMES = [...FRAMES, ...FRAMES]

interface Props {
  visible: boolean
  x: number
  y: number
}

export default function JessicaFilmStrip({ visible, x, y }: Props) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-50"
      style={{
        left: x,
        top: y - 20,
        transform: 'translate(-50%, -100%)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="jessica-film-strip">
        <div className="jessica-film-strip__sprocket jessica-film-strip__sprocket--top" />
        <div className="jessica-film-strip__window">
          <div
            className="jessica-film-strip__track"
            style={{ animationPlayState: visible ? 'running' : 'paused' }}
          >
            {STRIP_FRAMES.map((src, i) => (
              <div key={`${src}-${i}`} className="jessica-film-strip__frame">
                <img src={src} alt="" draggable={false} />
              </div>
            ))}
          </div>
          <div className="jessica-film-strip__grain" />
          <div className="jessica-film-strip__warmth" />
        </div>
        <div className="jessica-film-strip__sprocket jessica-film-strip__sprocket--bottom" />
      </div>
    </div>
  )
}
