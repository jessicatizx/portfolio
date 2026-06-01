export type SitePage = 'home' | 'instagram' | 'fox' | 'museum' | 'about'

interface Props {
  onNavigate: (page: SitePage) => void
  active?: SitePage
}

export default function SiteNav({ onNavigate, active }: Props) {
  const linkCls = (page: SitePage) =>
    `font-hand text-[18px] transition-colors ${
      active === page ? 'text-ink-primary' : 'text-ink-secondary hover:text-ink-primary'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between px-20 py-4">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          aria-label="Home"
          className="rounded-md transition-opacity hover:opacity-80"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
            <circle cx="14" cy="14" r="6" fill="#E8A0BF" />
            <circle cx="14" cy="4" r="4" fill="#F4C7DB" />
            <circle cx="14" cy="24" r="4" fill="#F4C7DB" />
            <circle cx="4" cy="14" r="4" fill="#F4C7DB" />
            <circle cx="24" cy="14" r="4" fill="#F4C7DB" />
          </svg>
        </button>
        <nav className="flex items-center gap-8">
          <button type="button" onClick={() => onNavigate('museum')} className={linkCls('museum')}>
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
