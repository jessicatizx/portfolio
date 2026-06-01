import SiteNav, { type SitePage } from '../components/SiteNav'

interface Props {
  onNavigate: (page: SitePage) => void
}

export default function AboutPage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-bg">
      <SiteNav onNavigate={onNavigate} active="about" />

      <main className="mx-auto max-w-content px-20 py-20">
        <p className="mb-4 font-hand text-[20px] text-ink-tertiary">About</p>
        <h1 className="mb-10 font-serif text-[clamp(36px,4vw,48px)] leading-tight tracking-[-0.04em] text-ink-primary">
          Jessica Ti
        </h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <div className="max-w-xl space-y-5 font-inter text-[16px] leading-relaxed text-ink-secondary">
            <p>
              I&apos;m a product and content designer who likes turning messy problems into experiences that feel
              clear, human, and a little bit delightful.
            </p>
            <p>
              My work spans enterprise tools, social products, and the in-between spaces where strategy, language,
              and interface design meet. I care about clarity under constraints, thoughtful copy, and the small
              details that help people feel oriented.
            </p>
            <p>
              Outside of design, I&apos;m usually tinkering, writing, or finding small ways to make everyday moments
              feel warmer — the same instinct that shows up in my playground experiments.
            </p>
          </div>

          <div
            className="aspect-[4/5] w-full max-w-[280px] rounded-card bg-gradient-to-br from-[#f3ebe3] to-[#e8ddd2] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            aria-hidden
          />
        </div>
      </main>
    </div>
  )
}
