import type { FrameSpec, MuseumSection } from '../data/museumSections'
import { MUSEUM_SECTIONS } from '../data/museumSections'
function FrameInner({ spec }: { spec: FrameSpec }) {
  const hasImage = Boolean(spec.src)

  return (
    <>
      <div className="museum-spotlight" aria-hidden />
      <div className="museum-frame__border">
        <div className="museum-frame__mat">
          <div className="museum-frame__canvas" data-museum-slot>
            {hasImage ? (
              <img src={spec.src} alt={spec.alt ?? ''} loading="lazy" />
            ) : (
              <span className="museum-frame__hint font-hand">coming soon</span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function MuseumFrame({
  spec,
  onSelect,
}: {
  spec: FrameSpec
  onSelect?: (spec: FrameSpec) => void
}) {
  const hasImage = Boolean(spec.src)
  const interactive = hasImage && onSelect

  return (
    <figure
      className={`museum-frame${interactive ? ' museum-frame--interactive' : ''}`}
      style={{ left: spec.left, top: spec.top, width: spec.width, height: spec.height }}
    >
      {interactive ? (
        <button
          type="button"
          className="museum-frame__hit"
          onClick={() => onSelect(spec)}
          aria-label={`View ${spec.alt ?? 'artwork'} full size`}
        >
          <FrameInner spec={spec} />
        </button>
      ) : (
        <FrameInner spec={spec} />
      )}
    </figure>
  )
}

function SectionPlacard({ galleryLabel, title }: { galleryLabel: string; title: string }) {
  return (
    <div className="museum-placard" aria-label={`Section: ${title}`}>
      <p className="museum-placard__eyebrow font-ui text-[10px] uppercase tracking-[0.2em] text-ink-tertiary">
        {galleryLabel}
      </p>
      <h2 className="museum-placard__title font-hand text-[22px] leading-snug text-ink-secondary">{title}</h2>
    </div>
  )
}

interface Props {
  sectionIndex: number
  onFrameSelect?: (spec: FrameSpec, sectionTitle?: string) => void
}

export default function MuseumPanel({ sectionIndex, onFrameSelect }: Props) {
  const section: MuseumSection = MUSEUM_SECTIONS[sectionIndex % MUSEUM_SECTIONS.length]
  const kind = section.kind ?? 'standard'

  const galleryLabel =
    kind === 'standard'
      ? `GALLERY ${String((sectionIndex % MUSEUM_SECTIONS.length) + 1).padStart(2, '0')}`
      : ''

  return (
    <section className="museum-panel" aria-label={section.title}>
      <div className={`museum-wall${kind !== 'standard' ? ` museum-wall--${kind}` : ''}`}>
        <div className="museum-wall__molding museum-wall__molding--top" />
        <div className="museum-wall__molding museum-wall__molding--mid" />

        {(kind === 'standard' || kind === 'special') && (
          <>
            <SectionPlacard
              galleryLabel={kind === 'special' ? 'Special gallery' : galleryLabel}
              title={section.title}
            />
            {section.frames.map((spec, i) => (
              <MuseumFrame
                key={`${section.id}-${i}`}
                spec={spec}
                onSelect={
                  onFrameSelect
                    ? (frame) =>
                        onFrameSelect(frame, kind === 'special' ? undefined : section.title)
                    : undefined
                }
              />
            ))}
            {kind === 'special' && (
              <div className="museum-placard museum-placard--thanks" aria-label="Thank you for visiting">
                <p className="museum-placard__title font-hand text-[22px] leading-snug text-ink-secondary">
                  Thank you for visiting... more to come soon!
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="museum-floor">
        <div className="museum-floor__planks" />
      </div>
    </section>
  )
}
