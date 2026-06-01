import React from 'react'

export type LightboxArtwork = {
  src: string
  alt: string
  sectionTitle?: string
}

interface Props {
  artwork: LightboxArtwork
  onClose: () => void
}

export default function MuseumLightbox({ artwork, onClose }: Props) {
  const closeRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="museum-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={artwork.alt || 'Photo'}
      data-no-flower
    >
      <button
        type="button"
        className="museum-lightbox__backdrop"
        onClick={onClose}
        aria-label="Return to gallery"
      />

      <div className="museum-lightbox__stage">
        <figure className="museum-lightbox__frame">
          <div className="museum-lightbox__border">
            <div className="museum-lightbox__mat">
              <div className="museum-lightbox__canvas">
                <img src={artwork.src} alt={artwork.alt || ''} />
              </div>
            </div>
          </div>
          {(artwork.sectionTitle || artwork.alt) && (
            <figcaption className="museum-lightbox__caption">
              {artwork.sectionTitle && (
                <span className="museum-lightbox__section font-hand text-[18px] text-white/70">
                  {artwork.sectionTitle}
                </span>
              )}
              <span className="museum-lightbox__alt font-inter text-sm text-white/90">{artwork.alt}</span>
            </figcaption>
          )}
        </figure>

        <button
          ref={closeRef}
          type="button"
          className="museum-lightbox__close font-inter text-sm"
          onClick={onClose}
          aria-label="Return to gallery"
        >
          Return to gallery
        </button>
      </div>
    </div>
  )
}
