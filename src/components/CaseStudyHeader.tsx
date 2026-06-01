import type { SitePage } from './SiteNav'

interface Props {
  onBack: () => void
  onNavigate: (page: SitePage) => void
}

export default function CaseStudyHeader({ onBack, onNavigate }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between px-20 py-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 font-inter text-sm text-ink-secondary transition-colors hover:text-ink-primary"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
        <nav className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => onNavigate('museum')}
            className="font-hand text-[18px] text-ink-secondary transition-colors hover:text-ink-primary"
          >
            Museum
          </button>
          <a
            href="https://www.linkedin.com/in/jessica-ti"
            target="_blank"
            rel="noopener"
            className="font-hand text-[18px] text-ink-secondary transition-colors hover:text-ink-primary"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </header>
  )
}
