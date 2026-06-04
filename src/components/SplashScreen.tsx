import React from 'react'

interface Props {
  onDone: () => void
}

const STORAGE_KEY = 'tea-splash-seen'

/** Desktop artboards (1728×1117) */
const DESKTOP_FRAMES = {
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

/** iPhone artboards (393×852) — extra tea-rise beats for fluid fill */
const MOBILE_FRAMES = {
  pinkApproach: '/splash/mobile/m01-pink-approach.svg',
  blueApproach: '/splash/mobile/m02-blue-approach.svg',
  collide: '/splash/mobile/m03-collide.svg',
  spill: '/splash/mobile/m04-spill.svg',
  fall: '/splash/mobile/m05-fall.svg',
  disappear: '/splash/mobile/m06-disappear.png',
  teaRise1: '/splash/mobile/m07-tea-rise.svg',
  teaRise2: '/splash/mobile/m08-tea-rise-2.svg',
  teaRise3: '/splash/mobile/m09-tea-rise-3.svg',
  teaRise4: '/splash/mobile/m10-tea-rise-4.svg',
  teaFull: '/splash/mobile/m11-tea-full.svg',
  jessicaTea: '/splash/mobile/m12-jessica-tea.png',
  waitNo: '/splash/mobile/m13-wait-no.png',
  jessicaTi: '/splash/mobile/m14-jessica-ti.png',
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

function DesktopSequence() {
  const F = DESKTOP_FRAMES
  return (
    <div className="tea-splash__sequence tea-splash__sequence--desktop" aria-hidden>
      <div className="tea-splash__approach">
        <Frame src={F.pinkApproach} className="tea-splash__frame--pink-approach" />
        <Frame src={F.blueApproach} className="tea-splash__frame--blue-approach" />
      </div>
      <Frame src={F.collide} className="tea-splash__frame--collide" />
      <Frame src={F.spill} className="tea-splash__frame--spill" />
      <Frame src={F.fall} className="tea-splash__frame--fall" />
      <Frame src={F.disappear} className="tea-splash__frame--disappear" />
      <Frame src={F.teaRise} className="tea-splash__frame--tea-rise" />
      <Frame src={F.teaRiseMore} className="tea-splash__frame--tea-rise-more" />
      <Frame src={F.teaFull} className="tea-splash__frame--tea-full" />
      <TextFrame
        src={F.jessicaTea}
        className="tea-splash__frame--jessica-tea"
        layerClassName="tea-splash__text-layer--jessica-tea"
      />
      <TextFrame
        src={F.waitNo}
        className="tea-splash__frame--wait-no"
        layerClassName="tea-splash__text-layer--wait-no"
      />
      <TextFrame
        src={F.jessicaCorrection}
        className="tea-splash__frame--jessica-correction"
        layerClassName="tea-splash__text-layer--jessica-correction"
      />
      <TextFrame
        src={F.justJessica}
        className="tea-splash__frame--just-jessica"
        layerClassName="tea-splash__text-layer--just-jessica"
      />
      <TextFrame
        src={F.jessicaTi}
        className="tea-splash__frame--jessica-ti"
        layerClassName="tea-splash__text-layer--jessica-ti"
      />
    </div>
  )
}

function MobileSequence() {
  const F = MOBILE_FRAMES
  return (
    <div className="tea-splash__sequence tea-splash__sequence--mobile" aria-hidden>
      <div className="tea-splash__approach">
        <Frame src={F.pinkApproach} className="tea-splash__frame--pink-approach" />
        <Frame src={F.blueApproach} className="tea-splash__frame--blue-approach" />
      </div>
      <Frame src={F.collide} className="tea-splash__frame--collide" />
      <Frame src={F.spill} className="tea-splash__frame--spill" />
      <Frame src={F.fall} className="tea-splash__frame--fall" />
      <Frame src={F.disappear} className="tea-splash__frame--disappear" />
      <Frame src={F.teaRise1} className="tea-splash__frame--m-tea-rise-1" />
      <Frame src={F.teaRise2} className="tea-splash__frame--m-tea-rise-2" />
      <Frame src={F.teaRise3} className="tea-splash__frame--m-tea-rise-3" />
      <Frame src={F.teaRise4} className="tea-splash__frame--m-tea-rise-4" />
      <Frame src={F.teaFull} className="tea-splash__frame--m-tea-full" />
      <Frame src={F.jessicaTea} className="tea-splash__frame--m-jessica-tea" />
      <Frame src={F.waitNo} className="tea-splash__frame--m-wait-no" />
      <Frame src={F.jessicaTi} className="tea-splash__frame--m-jessica-ti" />
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
          <>
            <Frame
              src={DESKTOP_FRAMES.jessicaTi}
              className="tea-splash__frame--final tea-splash__frame--final-desktop"
            />
            <Frame
              src={MOBILE_FRAMES.jessicaTi}
              className="tea-splash__frame--final tea-splash__frame--final-mobile"
            />
          </>
        ) : (
          <>
            <DesktopSequence />
            <MobileSequence />
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
