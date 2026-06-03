import React from 'react'

interface Props {
  onDone: () => void
}

const STORAGE_KEY = 'tea-splash-seen'

/** Figma artboards (1728×1117) — exact exports from meep file */
const FRAMES = {
  pinkApproach: '/splash/01-pink-approach.svg',
  blueApproach: '/splash/02-blue-approach.svg',
  collide: '/splash/03-collide.svg?v=2',
  spill: '/splash/04-spill.svg',
  fall: '/splash/05-fall.svg',
  disappear: '/splash/06-disappear.svg',
  teaRise: '/splash/07-tea-rise.svg',
  teaRiseMore: '/splash/08-tea-rise-more.svg',
  teaFull: '/splash/09-tea-full.svg',
  jessicaTea: '/splash/10-jessica-tea.png',
  waitNo: '/splash/14-wait-no.png',
  jessicaCorrection: '/splash/11-jessica-correction.png',
  justJessica: '/splash/12-just-jessica.png',
  jessicaTi: '/splash/13-jessica-ti.png?v=2',
} as const

function Frame({
  src,
  className,
  style,
}: {
  src: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      className={`tea-splash__frame${className ? ` ${className}` : ''}`}
      style={style}
    />
  )
}

/** Scales name/text PNGs on small viewports without fighting frame keyframe transforms. */
function TextFrame({
  src,
  className,
  layerClassName,
}: {
  src: string
  className: string
  layerClassName?: string
}) {
  return (
    <div className={`tea-splash__text-layer${layerClassName ? ` ${layerClassName}` : ''}`}>
      <Frame src={src} className={className} />
    </div>
  )
}

export default function SplashScreen({ onDone }: Props) {
  const [fadeOut, setFadeOut] = React.useState(false)
  const reducedMotion = React.useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const hasSeenBefore = React.useRef(
    typeof window !== 'undefined' && !!localStorage.getItem(STORAGE_KEY)
  )

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, '1')
  }, [])

  React.useEffect(() => {
    if (reducedMotion) {
      const t = window.setTimeout(() => {
        setFadeOut(true)
        window.setTimeout(onDone, 650)
      }, 900)
      return () => window.clearTimeout(t)
    }

    const ts = [
      window.setTimeout(() => setFadeOut(true), 5400),
      window.setTimeout(onDone, 6850),
    ]
    return () => ts.forEach(clearTimeout)
  }, [onDone, reducedMotion])

  return (
    <div
      className={`tea-splash${fadeOut ? ' tea-splash--out' : ''}${reducedMotion ? ' tea-splash--reduced' : ''}`}
      aria-hidden={fadeOut}
    >
      <div className="tea-splash__stage">
        {reducedMotion ? (
          <Frame src={FRAMES.jessicaTi} className="tea-splash__frame--final" />
        ) : (
          <>
            {/* Sequence 1 — opposing entrances (Figma keyframes 01 + 02) */}
            <div className="tea-splash__approach" aria-hidden>
              <Frame src={FRAMES.pinkApproach} className="tea-splash__frame--pink-approach" />
              <Frame src={FRAMES.blueApproach} className="tea-splash__frame--blue-approach" />
            </div>

            <Frame src={FRAMES.collide} className="tea-splash__frame--collide" />
            <Frame src={FRAMES.spill} className="tea-splash__frame--spill" />
            <Frame src={FRAMES.fall} className="tea-splash__frame--fall" />
            <Frame src={FRAMES.disappear} className="tea-splash__frame--disappear" />
            <Frame src={FRAMES.teaRise} className="tea-splash__frame--tea-rise" />
            <Frame src={FRAMES.teaRiseMore} className="tea-splash__frame--tea-rise-more" />
            <Frame src={FRAMES.teaFull} className="tea-splash__frame--tea-full" />
            <TextFrame
              src={FRAMES.jessicaTea}
              className="tea-splash__frame--jessica-tea"
              layerClassName="tea-splash__text-layer--jessica-tea"
            />
            <TextFrame
              src={FRAMES.waitNo}
              className="tea-splash__frame--wait-no"
              layerClassName="tea-splash__text-layer--wait-no"
            />
            <TextFrame
              src={FRAMES.jessicaCorrection}
              className="tea-splash__frame--jessica-correction"
              layerClassName="tea-splash__text-layer--jessica-correction"
            />
            <TextFrame
              src={FRAMES.justJessica}
              className="tea-splash__frame--just-jessica"
              layerClassName="tea-splash__text-layer--just-jessica"
            />
            <TextFrame
              src={FRAMES.jessicaTi}
              className="tea-splash__frame--jessica-ti"
              layerClassName="tea-splash__text-layer--jessica-ti"
            />
          </>
        )}
      </div>

      {hasSeenBefore.current && (
        <button type="button" className="tea-splash__skip" onClick={onDone}>
          skip intro
        </button>
      )}
    </div>
  )
}
