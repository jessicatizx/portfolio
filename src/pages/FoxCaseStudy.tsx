import React from 'react'
import FoxThumbnail from '../components/FoxThumbnail'
import FoxAccessDiagram from '../components/FoxAccessDiagram'
import FoxImpactSection from '../components/FoxImpactSection'

interface Props {
  onBack: () => void
}

export default function FoxCaseStudy({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-content items-center justify-between px-20 py-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 font-inter text-sm text-ink-secondary transition-colors hover:text-ink-primary"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <nav className="flex items-center gap-8">
            <a
              href="https://www.linkedin.com/in/jessica-ti"
              target="_blank"
              rel="noopener"
              className="font-hand text-[18px] text-ink-secondary transition-colors hover:text-ink-primary"
            >
              LinkedIn
            </a>
            <a
              href="#playground"
              className="font-hand text-[18px] text-ink-secondary transition-colors hover:text-ink-primary"
            >
              Playground
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-content px-20">
        {/* ── Title block ── */}
        <section className="pt-16 pb-12">
          <h1 className="font-serif text-[clamp(36px,4vw,52px)] leading-tight tracking-[-0.04em] text-ink-primary">
            Fox Entertainment
          </h1>
          <p className="mt-3 font-inter text-base text-ink-secondary" style={{ maxWidth: 560 }}>
            Revolutionizing vendor management for enhanced efficiency
          </p>
        </section>

        {/* ── Metadata ── */}
        <section className="border-t border-black/[0.07] py-8">
          <div className="mb-6 grid grid-cols-4 gap-8">
            {[
              { label: 'Project', value: 'Fox Entertainment Admin Portal Redesign' },
              { label: 'Timeline', value: '2024' },
              { label: 'Organisation', value: 'Corporate Engineering' },
              { label: 'Role', value: 'Product and Content Designer' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="mb-1 font-inter text-xs font-medium uppercase tracking-widest text-ink-tertiary">{label}</p>
                <p className="font-inter text-sm text-ink-primary">{value}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-1 font-inter text-xs font-medium uppercase tracking-widest text-ink-tertiary">Team</p>
            <p className="font-inter text-sm text-ink-secondary">
              Product manager, designers, marketing and engineering
            </p>
          </div>
        </section>

        {/* ── Hero ── */}
        <section className="py-12">
          <div
            data-no-flower
            className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]"
          >
            <FoxThumbnail eager />
          </div>
        </section>

        <section className="border-t border-black/[0.07] py-16">
          <p className="mb-8 font-hand text-[18px] text-ink-tertiary">The goal</p>
          <h2
            className="font-serif text-[clamp(22px,2.4vw,30px)] leading-snug tracking-[-0.03em] text-ink-primary"
            style={{ maxWidth: 720 }}
          >
            Simplifying management of 40,000+ film vendors during enterprise onboarding and offboarding processes at
            Fox Entertainment
          </h2>

          <div className="mt-14 flex flex-col items-start gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="min-w-0 max-w-[340px] shrink-0">
              <p className="mb-6 font-hand text-[18px] text-ink-tertiary">Context</p>
              <div className="space-y-4 font-inter text-[15px] leading-relaxed text-ink-secondary">
                <p>
                  The Admin Portal is an internal enterprise platform managing 40,000+ external vendors and contractors
                  across Fox. Product Managers at Fox request application access for external team members.
                </p>
                <p>
                  The logic runs as such where there is an{' '}
                  <strong className="font-semibold text-ink-primary">Access Control System</strong>. The ACS is made up of
                  3 parts:
                </p>
                <ol className="list-decimal space-y-2 pl-5">
                  <li>
                    <strong className="font-semibold text-ink-primary">Applications</strong>, which are specialized
                    software for film/TV production
                  </li>
                  <li>
                    <strong className="font-semibold text-ink-primary">Groups</strong>, which are gateway to specific
                    applications
                  </li>
                  <li>
                    <strong className="font-semibold text-ink-primary">Users</strong>, to be added to groups to gain
                    access to the applications
                  </li>
                </ol>
              </div>
            </div>
            <FoxAccessDiagram />
          </div>
        </section>

        <section className="border-t border-black/[0.07] py-16">
          <p className="mb-6 font-hand text-[18px] text-ink-tertiary">Problem</p>
          <p className="mb-10 max-w-xl font-inter text-[15px] leading-relaxed text-ink-secondary">
            How did we find ourselves in this problem space of needing better onboarding and offboarding processes?
          </p>
          <h2
            className="mb-10 font-serif text-[clamp(24px,2.8vw,34px)] leading-snug tracking-[-0.03em] text-ink-primary"
            style={{ maxWidth: 640 }}
          >
            Vendor management bottlenecks creating revenue loss &amp; security risks
          </h2>
          <div className="max-w-xl space-y-4 font-inter text-[15px] leading-relaxed text-ink-secondary">
            <p>
              Users spent <strong className="font-semibold text-ink-primary">10+ hours</strong> weekly managing vendors,
              resulting in delays and multitasking during meetings which hindered productivity.
            </p>
            <p>
              As a result of these delays, specifically for onboarding ones, vendors without key app access caused{' '}
              <strong className="font-semibold text-ink-primary">2-week</strong>{' '}
              <strong className="font-semibold text-ink-primary">production setbacks</strong>, risking millions of
              dollars of revenue loss. On the other hand, deactivation delays{' '}
              <strong className="font-semibold text-ink-primary">heightened security risks</strong> by allowing former
              vendors access to sensitive data, while ongoing use of costly applications strained finances.
            </p>
          </div>
        </section>

        <section className="border-t border-black/[0.07] py-16">
          <p className="mb-8 font-hand text-[18px] text-ink-tertiary">Discovery</p>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="min-w-0 max-w-[380px] sm:max-w-[400px]">
              <h3 className="mb-6 font-serif text-[clamp(20px,2.2vw,26px)] leading-snug tracking-[-0.03em] text-ink-primary">
                How I dealt with ambiguity
              </h3>
              <div className="space-y-4 font-inter text-[15px] leading-relaxed text-ink-secondary">
                <p>
                  As someone <strong className="font-semibold text-ink-primary">completely new</strong> to how a studio
                  operated behind the scenes, I had to{' '}
                  <strong className="font-semibold text-ink-primary">quickly grasp</strong> a complex ecosystem of
                  vendors, content houses, and multiple stakeholder types.
                </p>
                <p>
                  After studying the products&apos; workflows intensively and asking lots of questions, I got a much
                  better idea. To focus our team&apos;s efforts effectively, I conducted a{' '}
                  <strong className="font-semibold text-ink-primary">heuristic evaluation</strong> of the portal&apos;s
                  user onboarding and offboarding flows, identifying key friction points and usability issues.
                </p>
              </div>
            </div>
            <figure className="mx-auto w-full max-w-[220px] shrink-0 sm:max-w-[240px] lg:mx-0 lg:w-[260px]">
              <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
                <img
                  src="/fox-heuristic-evaluation-hi.png"
                  srcSet="/fox-heuristic-evaluation-hi.png 1864w, /fox-heuristic-evaluation-clean.png 932w"
                  sizes="(min-width: 1024px) 260px, 240px"
                  alt="Heuristic evaluation notes for portal onboarding and offboarding flows"
                  className="block h-auto w-full bg-white"
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-3 font-inter text-[11px] leading-snug text-ink-tertiary">
                Visibility of system status and match with the real world
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="border-t border-black/[0.07] py-16">
          <h3 className="mb-6 font-serif text-[clamp(20px,2.2vw,26px)] leading-snug tracking-[-0.03em] text-ink-primary">
            Specific Pain point 1 - Heavy cognitive load and requires users to actively use recall
          </h3>
          <div className="max-w-xl space-y-4 font-inter text-[15px] leading-relaxed text-ink-secondary">
            <p>
              Users struggle to quickly recognize which groups to assign users to, relying heavily on recall or
              backtracking.
            </p>
            <p>
              In the admin portal, there are{' '}
              <strong className="font-semibold text-ink-primary">&gt; 300 groups</strong>, and requests specified
              assigning users to a particular application. However, due to inconsistent naming conventions, there&apos;s{' '}
              <strong className="font-semibold text-ink-primary">
                no clear relationship between group names and application names
              </strong>
              .
            </p>
          </div>

          <div className="mt-16 max-w-xl">
            <p
              className="mb-6 font-inter text-xs font-semibold uppercase tracking-widest text-ink-tertiary"
              style={{ letterSpacing: '0.1em' }}
            >
              Additional problem context via moderated testing
            </p>
            <h4 className="mb-6 font-serif text-[clamp(18px,2vw,24px)] leading-snug tracking-[-0.02em] text-ink-primary">
              Hacky Workarounds
            </h4>
            <div
              className="mb-6 rounded-xl px-5 py-4"
              style={{
                background: 'linear-gradient(135deg, rgba(228,190,155,0.2) 0%, rgba(245,230,210,0.35) 100%)',
                border: '1px solid rgba(200,155,110,0.28)',
              }}
            >
              <p className="font-inter text-[14px] leading-relaxed text-ink-primary">
                <span aria-hidden>💡 </span>
                <strong className="font-semibold">Key User Research Insight:</strong> Users&apos; word choice revealed
                their mental models
              </p>
            </div>
            <div className="space-y-4 font-inter text-[15px] leading-relaxed text-ink-secondary">
              <p>PMs had developed two workarounds for group assignments:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Using external notepads to track group names</li>
                <li>
                  &quot;Mirroring&quot; — copying group settings from existing vendor accounts with similar roles
                </li>
              </ul>
              <p>
                <strong className="font-semibold text-ink-primary">Problem:</strong> The process is lengthy and
                unintuitive with lots of going back and forth between the two, breaking established system patterns
              </p>
            </div>
          </div>
          <figure className="mt-10">
            <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
              <img
                src="/fox-mirroring-workaround-hi.png"
                srcSet="/fox-mirroring-workaround-hi.png 2048w, /fox-mirroring-workaround-clean.png 980w"
                sizes="(min-width: 1024px) 960px, 100vw"
                alt="Annotated screenshots showing hidden actions, tedious manual mirroring, and repeated group cross-referencing"
                className="block h-auto w-full"
                decoding="async"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 pl-1 font-inter text-xs text-ink-tertiary">
              Users mirroring an old vendor&apos;s group permissions to add new users to it
            </figcaption>
          </figure>

          <div className="mt-16 max-w-xl">
            <p
              className="mb-6 font-inter text-xs font-semibold uppercase tracking-widest text-ink-tertiary"
              style={{ letterSpacing: '0.1em' }}
            >
              Additional problem context via user interviews
            </p>
            <h4 className="mb-6 font-serif text-[clamp(18px,2vw,24px)] leading-snug tracking-[-0.02em] text-ink-primary">
              Additional Insights from the Community
            </h4>
            <p className="font-inter text-[15px] leading-relaxed text-ink-secondary">
              After conducting additional user interviews, other frustrations surfaced too, including the fact that there
              was unintuitive wording for group assignments, and frequently used features were also hidden. These were
              all things I took into consideration for my re-design.
            </p>
          </div>

          <div className="mt-16">
            <h3
              className="mb-8 font-serif text-[clamp(20px,2.2vw,26px)] leading-snug tracking-[-0.03em] text-ink-primary"
              style={{ maxWidth: 720 }}
            >
              Specific Pain point 2 - Inefficient and disorganized requests to onboard or offboard
            </h3>
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:gap-12">
              <div className="min-w-0 max-w-lg">
                <p className="mb-6 font-inter text-[15px] leading-relaxed text-ink-secondary">
                  It takes too many steps to onboard new users or deactivate old ones
                </p>
                <div className="space-y-4 font-inter text-[15px] leading-relaxed text-ink-secondary">
                  <p>
                    Of the ~10 hours, users spent{' '}
                    <strong className="font-semibold text-ink-primary">3-4 hours per week</strong> manually adding
                    vendors one-by-one between Slack and the portal as there could be{' '}
                    <strong className="font-semibold text-ink-primary">hundreds of them</strong>
                  </p>
                  <ol className="list-decimal space-y-4 pl-5">
                    <li>
                      For projects which involved{' '}
                      <strong className="font-semibold text-ink-primary">100+ vendors</strong> (frequent), this created
                      significant bottlenecks in project kickoff
                    </li>
                    <li>
                      15% error rate in user provisioning due to:
                      <ul className="mt-2 list-disc space-y-2 pl-5">
                        <li>
                          <strong className="font-semibold text-ink-primary">Scattered onboarding requests</strong>{' '}
                          across multiple Slack channels
                        </li>
                        <li>
                          <strong className="font-semibold text-ink-primary">Missed follow-up messages</strong> for
                          vendor access
                        </li>
                        <li>
                          <strong className="font-semibold text-ink-primary">Manual cross-referencing</strong> between
                          systems
                        </li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
              <figure className="w-full shrink-0 lg:pt-8">
                <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
                  <img
                    src="/fox-slack-onboarding-hi.png"
                    srcSet="/fox-slack-onboarding-hi.png 1200w, /fox-slack-onboarding-clean.png 820w"
                    sizes="(min-width: 1024px) 320px, 100vw"
                    alt="Slack messages showing scattered onboarding requests with 54 pending notifications"
                    className="block h-auto w-full"
                    decoding="async"
                    loading="lazy"
                  />
                </div>
              </figure>
            </div>
          </div>
        </section>

        <section className="border-t border-black/[0.07] py-16">
          <h2
            className="mb-6 font-serif text-[clamp(24px,2.8vw,34px)] leading-snug tracking-[-0.03em] text-ink-primary"
            style={{ maxWidth: 720 }}
          >
            Why aren&apos;t users using filters to narrow the vendor list down?
          </h2>
          <p className="mb-10 max-w-xl font-inter text-[15px] leading-relaxed text-ink-secondary">
            There are filters available, so why aren&apos;t users using them to narrow down the vendors to a single view?
            After all, the vendors are organized in specific categories.
          </p>
          <figure className="mb-12">
            <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
              <img
                src="/fox-filters-critique-hi.png"
                srcSet="/fox-filters-critique-hi.png 4096w, /fox-filters-critique-clean.png 1024w"
                sizes="100vw"
                alt="Annotated critique of the Users filter UI — confusing wording, visual clutter, and combined search and filters"
                className="block h-auto w-full"
                decoding="async"
                loading="lazy"
              />
            </div>
          </figure>
          <p className="mb-4 font-hand text-[18px] text-ink-tertiary">And so I asked…</p>
          <h2
            className="font-serif text-[clamp(24px,2.8vw,34px)] leading-snug tracking-[-0.03em] text-ink-primary"
            style={{ maxWidth: 720 }}
          >
            How might we help users quickly access vendor lists without manual name-by-name searches?
          </h2>
        </section>

        <section className="border-t border-black/[0.07] py-16">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:gap-12">
            <div className="min-w-0 max-w-lg">
              <p
                className="mb-6 font-inter text-xs font-semibold uppercase tracking-widest text-ink-tertiary"
                style={{ letterSpacing: '0.1em' }}
              >
                Competitive analysis
              </p>
              <p className="mb-8 font-inter text-[15px] leading-relaxed text-ink-secondary">
                Comparing with other products to keep filters simple yet powerful
              </p>
              <p className="mb-3 font-inter text-[15px] font-medium text-ink-primary">Key research areas:</p>
              <ul className="mb-8 list-disc space-y-3 pl-5 font-inter text-[15px] leading-relaxed text-ink-secondary">
                <li>
                  Deep dive into enterprise vs customer filtering needs to seek out what was the appropriate level of
                  complexity and power for our filter panel
                </li>
                <li>Competitive analysis of enterprise solutions</li>
                <li>Card sorting to optimize filter hierarchy</li>
              </ul>
              <p className="font-inter text-[15px] leading-relaxed text-ink-secondary">
                My focus was on creating an intuitive yet powerful filtering system that could surface exact vendor
                combinations while remaining flexible for different use cases.
              </p>
            </div>
            <figure className="w-full shrink-0">
              <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
                <img
                  src="/fox-competitive-analysis-hi.png"
                  srcSet="/fox-competitive-analysis-hi.png 2400w, /fox-competitive-analysis-clean.png 1000w"
                  sizes="(min-width: 1024px) 420px, 100vw"
                  alt="Competitive analysis collage — Handshake, Expedia, IKEA, and Monday.com filter patterns"
                  className="block h-auto w-full"
                  decoding="async"
                  loading="lazy"
                />
              </div>
            </figure>
          </div>
        </section>

        <section className="border-t border-black/[0.07] py-12">
          <h2
            className="mb-4 font-serif text-[clamp(22px,2.6vw,32px)] leading-snug tracking-[-0.03em] text-ink-primary"
            style={{ maxWidth: 720 }}
          >
            Narrowing down based on principles &amp; constraints
          </h2>
          <p className="mb-5 max-w-2xl font-inter text-[15px] leading-relaxed text-ink-secondary">
            While there were many iterations of filters that I designed, I relied on design principles and constraints to
            narrow down to the best option, which ended up being the panels that slide out from the left
          </p>
          <div className="mb-8 grid max-w-3xl grid-cols-1 gap-6 font-inter text-[14px] leading-snug text-ink-secondary md:grid-cols-2 md:gap-8">
            <div>
              <p className="mb-2 text-[13px] font-medium text-ink-primary">Key Considerations:</p>
              <ul className="list-disc space-y-1 pl-4">
                <li>Users needed maximum table visibility for decision-making</li>
                <li>Constraint as system heavily relied on pop-up modules that also needed to accommodate filters</li>
                <li>Design system already utilized sliding panels</li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-[13px] font-medium text-ink-primary">
                Solution Selection: I chose sliding filter panels because they:
              </p>
              <ul className="list-disc space-y-1 pl-4">
                <li>Preserved crucial table real estate</li>
                <li>Worked seamlessly within existing pop-up constraints</li>
                <li>Leveraged familiar design patterns</li>
              </ul>
            </div>
          </div>
          <figure>
            <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
              <img
                src="/fox-filter-iterations-hi.png"
                srcSet="/fox-filter-iterations-hi.png 2400w, /fox-filter-iterations-clean.png 1000w"
                sizes="100vw"
                alt="Six filter design explorations labeled A through F, from dropdown panels to sliding sidebars"
                className="block h-auto w-full"
                decoding="async"
                loading="lazy"
              />
            </div>
          </figure>
        </section>

        <section className="border-t border-black/[0.07] py-12">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-center lg:gap-12">
            <div className="min-w-0 max-w-lg">
              <p
                className="mb-6 font-inter text-xs font-semibold uppercase tracking-widest text-ink-tertiary"
                style={{ letterSpacing: '0.1em' }}
              >
                Card sorting
              </p>
              <h3 className="mb-5 font-serif text-[clamp(20px,2.2vw,26px)] leading-snug tracking-[-0.03em] text-ink-primary">
                Different workflows resulted in little consensus
              </h3>
              <p className="font-inter text-[15px] leading-relaxed text-ink-secondary">
                I also conducted card sorting to determine the optimal order of filters, revealing minimal similarity
                among participants&apos; groupings beyond the first two filters. This highlighted the need to prioritize
                key filters while providing flexibility for users to customize their filtering experience, ensuring
                adaptability to diverse mental models.
              </p>
            </div>
            <figure className="w-full shrink-0">
              <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
                <img
                  src="/fox-card-sorting-hi.png"
                  srcSet="/fox-card-sorting-hi.png 2400w, /fox-card-sorting-clean.png 960w"
                  sizes="(min-width: 1024px) 420px, 100vw"
                  alt="Card sorting results from Sarah and Lauren, with consensus on Status and Assigned Group"
                  className="block h-auto w-full"
                  decoding="async"
                  loading="lazy"
                />
              </div>
            </figure>
          </div>
        </section>

        <section className="border-t border-black/[0.07] py-12">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-center lg:gap-12">
            <div className="min-w-0 max-w-lg">
              <p
                className="mb-6 font-inter text-xs font-semibold uppercase tracking-widest text-ink-tertiary"
                style={{ letterSpacing: '0.1em' }}
              >
                Stakeholder relationships &amp; getting feedback
              </p>
              <h3 className="mb-5 font-serif text-[clamp(20px,2.2vw,26px)] leading-snug tracking-[-0.03em] text-ink-primary">
                Validating concepts
              </h3>
              <div className="space-y-4 font-inter text-[15px] leading-relaxed text-ink-secondary">
                <p>
                  To ensure that my team would be spending our time and effort solving the right problem, I made sure to
                  validate my ideas and get stakeholder buy-in. This is just one of the many slide decks I made during
                  my internship, presenting data and using good storytelling to get people as high-ranking as
                  Vice-Presidents to be on board with my ideas.
                </p>
                <p>
                  I received a lot of feedback, some of which are detailed below. I had to discern which ones were good
                  UX recommendations and which designs were worth pushing for.
                </p>
              </div>
            </div>
            <figure className="w-full shrink-0">
              <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
                <img
                  src="/fox-stakeholder-feedback-hi.png"
                  srcSet="/fox-stakeholder-feedback-hi.png 2400w, /fox-stakeholder-feedback-clean.png 980w"
                  sizes="(min-width: 1024px) 420px, 100vw"
                  alt="Fox Entertainment user research session slide — validating need for filter functionality"
                  className="block h-auto w-full"
                  decoding="async"
                  loading="lazy"
                />
              </div>
            </figure>
          </div>
        </section>

        <section className="border-t border-black/[0.07] py-12">
          <p className="mb-8 font-hand text-[18px] text-ink-tertiary">The solution</p>
          <h2
            className="mb-10 font-serif text-[clamp(24px,2.8vw,34px)] leading-snug tracking-[-0.03em] text-ink-primary"
            style={{ maxWidth: 720 }}
          >
            What are the details, changes and improvements with the new design?
          </h2>
          <figure className="mb-10">
            <div
              data-no-flower
              className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]"
            >
              <FoxThumbnail eager />
            </div>
            <figcaption className="mt-3 pl-1 font-inter text-xs text-ink-tertiary">
              Interactive prototype — filter panel and vendor management flows in the admin portal
            </figcaption>
          </figure>

          <div className="mb-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,460px)] lg:items-center lg:gap-12">
            <div className="min-w-0 max-w-lg">
              <h3 className="mb-5 font-serif text-[clamp(20px,2.2vw,26px)] leading-snug tracking-[-0.03em] text-ink-primary">
                New Design: What has changed?
              </h3>
              <div className="space-y-4 font-inter text-[15px] leading-relaxed text-ink-secondary">
                <p>
                  Clearer information hierarchy with reusable patterns that can exist across all modules
                </p>
                <p>
                  To create distinction between the search bar and filters, I made sure that the filters would have its
                  own distinct panel at the side, reusing an existing panel component that existed in the design system.
                  This was done after experimenting with several different ways to show filters.
                </p>
                <p>
                  It was also essential that whatever filters I created for the Users, Groups and Applications Panel
                  could be used on other modules in the Admin Portal too.
                </p>
              </div>
            </div>
            <figure className="w-full shrink-0">
              <div
                data-no-flower
                className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]"
              >
                <FoxThumbnail snapshot="filters-open" />
              </div>
            </figure>
          </div>

          <figure>
            <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
              <img
                src="/fox-filters-old-vs-new-hi.png"
                srcSet="/fox-filters-old-vs-new-hi.png 2400w, /fox-filters-old-vs-new-clean.png 1000w"
                sizes="100vw"
                alt="Old design 100+ steps vs new design 5 steps — mirroring groups and streamlined filters"
                className="block h-auto w-full"
                decoding="async"
                loading="lazy"
              />
            </div>
          </figure>
        </section>

        <section className="border-t border-black/[0.07] py-12">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,460px)] lg:items-start lg:gap-12">
            <div className="min-w-0 max-w-lg">
              <h3 className="mb-5 font-serif text-[clamp(20px,2.2vw,26px)] leading-snug tracking-[-0.03em] text-ink-primary">
                Group Assignment &amp; Mirroring: What has changed?
              </h3>
              <p className="mb-6 font-inter text-[15px] leading-relaxed text-ink-secondary">
                Group assignment can be done within a streamlined flow without needing to reference other platforms or
                pages
              </p>
              <div className="mb-5">
                <p className="mb-2 font-inter text-[14px] font-medium text-ink-primary">Surfaced Critical Functions:</p>
                <ul className="list-disc space-y-1 pl-5 font-inter text-[15px] leading-relaxed text-ink-secondary">
                  <li>Moved group assignment from hidden Actions menu to primary view</li>
                  <li>Added two clear options: mirror groups or manual search</li>
                </ul>
              </div>
              <div className="mb-6">
                <p className="mb-2 font-inter text-[14px] font-medium text-ink-primary">Enhanced Visual Hierarchy:</p>
                <ul className="list-disc space-y-1 pl-5 font-inter text-[15px] leading-relaxed text-ink-secondary">
                  <li>Redesigned tab navigation with stronger visual indicators</li>
                  <li>Made current section instantly recognizable for users</li>
                </ul>
              </div>
              <p className="font-inter text-[15px] leading-relaxed text-ink-secondary">
                This reorganization prioritized frequently-used features while improving overall navigation clarity.
              </p>
            </div>
            <figure className="w-full shrink-0 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
                <img
                  src="/fox-group-mirroring-ui-hi.png"
                  srcSet="/fox-group-mirroring-ui-hi.png 2400w, /fox-group-mirroring-ui-clean.png 980w"
                  sizes="(min-width: 1024px) 460px, 100vw"
                  alt="Hazel Ann user modal — Groups tab with mirror groups from another user and manual search"
                  className="block h-auto w-full"
                  decoding="async"
                  loading="lazy"
                />
              </div>
            </figure>
          </div>
        </section>

        <section className="border-t border-black/[0.07] py-12">
          <p className="mb-6 font-hand text-[18px] text-ink-tertiary">New Core Features</p>
          <h3 className="mb-5 font-serif text-[clamp(20px,2.2vw,28px)] leading-snug tracking-[-0.02em] text-ink-primary">
            Ensuring efficiency while meeting security standards — being careful not to add users to groups
            they&apos;re not supposed to be in
          </h3>
          <div className="mb-10 space-y-4 font-inter text-[15px] leading-relaxed text-ink-secondary">
            <p>
              While this solution made it much easier to copy groups from an existing user to a new one, this did not
              have to mean that it would also be easier to add users to groups they aren&apos;t authorized to have access
              to. Via close collaboration with my PM, we uncovered opportunities to streamline security validations
              without compromising our strict access controls.
            </p>
            <p>
              We developed an intelligent pre-validation system that automatically flags potential violations without
              causing too much friction to the user experience.
            </p>
          </div>
          <figure>
            <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
              <img
                src="/fox-security-validation-hi.png"
                srcSet="/fox-security-validation-hi.png 2400w, /fox-security-validation-clean.png 1000w"
                sizes="100vw"
                alt="Group mirroring flow with high-security pre-validation warning before confirm"
                className="block h-auto w-full"
                decoding="async"
                loading="lazy"
              />
            </div>
          </figure>
        </section>

        <section className="border-t border-black/[0.07] py-12">
          <p className="mb-6 font-hand text-[18px] text-ink-tertiary">Iteration</p>
          <h3 className="mb-5 font-serif text-[clamp(20px,2.2vw,28px)] leading-snug tracking-[-0.02em] text-ink-primary">
            Introducing design changes at the right time
          </h3>
          <p className="mb-10 font-inter text-[15px] leading-relaxed text-ink-secondary">
            I initially set the mirroring feature as the default to save users time, but this overwhelmed them due to
            their reluctance to change and other design updates. Moving it to a prominent button allowed users to adopt
            it at their own pace, with the option to make it the default later as they became more familiar.
          </p>
          <figure>
            <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
              <img
                src="/fox-mirror-iteration-hi.png"
                srcSet="/fox-mirror-iteration-hi.png 2400w, /fox-mirror-iteration-clean.png 1000w"
                sizes="100vw"
                alt="Earlier iteration with mirror as default vs later iteration with assign groups as default"
                className="block h-auto w-full"
                decoding="async"
                loading="lazy"
              />
            </div>
          </figure>

          <div className="mt-16 grid grid-cols-1 items-start gap-10 border-t border-black/[0.07] pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(300px,460px)] lg:gap-12">
            <div className="min-w-0 max-w-lg">
              <h3 className="mb-5 font-serif text-[clamp(20px,2.2vw,26px)] leading-snug tracking-[-0.02em] text-ink-primary">
                Bringing clarity with better copy
              </h3>
              <div
                className="mb-6 rounded-xl px-5 py-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(228,190,155,0.2) 0%, rgba(245,230,210,0.35) 100%)',
                  border: '1px solid rgba(200,155,110,0.28)',
                }}
              >
                <p className="font-inter text-[14px] leading-relaxed text-ink-primary">
                  <span aria-hidden>💡 </span>
                  <strong className="font-semibold">Key Research Insight:</strong> PMs using the portal often lacked
                  technical knowledge of film production terms, leading to confusion from inconsistent terminology.
                </p>
              </div>
              <p className="mb-3 font-inter text-[14px] font-medium text-ink-primary">Solution:</p>
              <ul className="list-disc space-y-1.5 pl-5 font-inter text-[15px] leading-relaxed text-ink-secondary">
                <li>Standardized language across projects</li>
                <li>Simplified technical jargon</li>
                <li>Refined copy for new mirroring feature to ensure clarity</li>
                <li>Tested various phrasings to maximize understanding</li>
              </ul>
            </div>
            <figure className="w-full shrink-0">
              <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
                <img
                  src="/fox-copy-style-guide-hi.png"
                  srcSet="/fox-copy-style-guide-hi.png 2400w, /fox-copy-style-guide-clean.png 1000w"
                  sizes="(min-width: 1024px) 460px, 100vw"
                  alt="Fox terminology style guide — how to use, examples, and where terms appear"
                  className="block h-auto w-full"
                  decoding="async"
                  loading="lazy"
                />
              </div>
            </figure>
          </div>
        </section>

        <FoxImpactSection />

        <section className="border-t border-black/[0.07] py-16">
          <p className="mb-8 font-hand text-[18px] text-ink-tertiary">Conclusion</p>
          <figure>
            <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
              <img
                src="/fox-filters-conclusion-hi.png"
                srcSet="/fox-filters-conclusion-hi.png 2400w, /fox-filters-conclusion-clean.png 1000w"
                sizes="100vw"
                alt="Old vs new filter design — integrated cluttered filters compared to separated search and sliding filter panel"
                className="block h-auto w-full"
                decoding="async"
                loading="lazy"
              />
            </div>
          </figure>
        </section>

        <section className="border-t border-black/[0.07] py-16">
          <p className="mb-8 font-hand text-[18px] text-ink-tertiary">Reflections</p>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-12">
            <div className="min-w-0 max-w-[380px] sm:max-w-[400px]">
              <h3 className="mb-5 font-serif text-[clamp(20px,2.2vw,26px)] leading-snug tracking-[-0.03em] text-ink-primary">
                <span aria-hidden>1. ⚖️ </span>
                It&apos;s all about balance
              </h3>
              <div className="space-y-4 font-inter text-[15px] leading-relaxed text-ink-secondary">
                <p>Whether it be within design or outside of design.</p>
                <p>
                  Outside of design, my approach combines passionate advocacy for better design practices with
                  strategic stakeholder management. I have learned to pick my battles wisely and compromise where
                  necessary. Above all, I have learnt that creativity is not confined to just my work. Sometimes, to
                  engage stakeholders, I&apos;ll need to think of out-of-the-box methods too.
                </p>
              </div>
            </div>
            <figure className="mx-auto w-full max-w-[240px] shrink-0 sm:max-w-[260px] lg:mx-0 lg:w-[280px]">
              <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
                <img
                  src="/fox-reflections-workshop-hi.png"
                  srcSet="/fox-reflections-workshop-hi.png 1487w, /fox-reflections-workshop-clean.png 743w"
                  sizes="(min-width: 1024px) 280px, 260px"
                  alt="Stakeholder workshop with printed Fox portal mockups and handwritten category tags on a desk"
                  className="block h-auto w-full"
                  decoding="async"
                  loading="lazy"
                />
              </div>
            </figure>
          </div>

          <div className="mt-14 flex flex-col items-start gap-8 border-t border-black/[0.07] pt-14 lg:flex-row lg:items-center lg:gap-12">
            <div className="min-w-0 max-w-[380px] sm:max-w-[400px]">
              <h3 className="mb-5 font-serif text-[clamp(20px,2.2vw,26px)] leading-snug tracking-[-0.03em] text-ink-primary">
                <span aria-hidden>2. 💻 </span>
                The constraints that come with Product Design make it more exciting
              </h3>
              <p className="font-inter text-[15px] leading-relaxed text-ink-secondary">
                In just a few weeks, I&apos;ve grown significantly as a budding designer in tech and discovered that a
                career in product design is deeply intriguing, fulfilling and sustainable. Working in the real-world
                industry has taught me the value of adaptability—navigating constraints and finding creative solutions
                is incredibly rewarding. Most importantly, seeing the tangible impact of my work on people&apos;s lives is
                an experience I&apos;ll always cherish.
              </p>
            </div>
            <figure className="mx-auto w-full max-w-[240px] shrink-0 sm:max-w-[260px] lg:mx-0 lg:w-[280px]">
              <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
                <img
                  src="/fox-reflections-studio-hi.png"
                  srcSet="/fox-reflections-studio-hi.png 2000w, /fox-reflections-studio-clean.png 1000w"
                  sizes="(min-width: 1024px) 280px, 260px"
                  alt="On a film production set with crew, cameras, and studio lighting"
                  className="block h-auto w-full"
                  decoding="async"
                  loading="lazy"
                />
              </div>
            </figure>
          </div>

          <div className="mt-14 flex flex-col items-start gap-8 border-t border-black/[0.07] pt-14 lg:flex-row lg:items-center lg:gap-12">
            <div className="min-w-0 max-w-[380px] sm:max-w-[400px]">
              <h3 className="mb-5 font-serif text-[clamp(20px,2.2vw,26px)] leading-snug tracking-[-0.03em] text-ink-primary">
                <span aria-hidden>3. 🗣️ </span>
                Don&apos;t just ask questions, ask good questions!
              </h3>
              <div className="space-y-4 font-inter text-[15px] leading-relaxed text-ink-secondary">
                <p>Both within work and outside of work.</p>
                <p>
                  Within work, good design stems from being prepared with the right questions — enough to understand
                  the user&apos;s needs, but not so much till it might lead to information overload and inefficiency.
                  Outside of work, thoughtful questions help build stronger relationships, which I believe are essential
                  for job satisfaction and gaining stakeholder trust—both personally and professionally.
                </p>
              </div>
            </div>
            <figure className="mx-auto w-full max-w-[240px] shrink-0 sm:max-w-[260px] lg:mx-0 lg:w-[280px]">
              <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
                <img
                  src="/fox-reflections-memorabilia-hi.png"
                  srcSet="/fox-reflections-memorabilia-hi.png 1504w, /fox-reflections-memorabilia-clean.png 752w"
                  sizes="(min-width: 1024px) 280px, 260px"
                  alt="Fox Sports memorabilia on a desk — trading card, cap, founders day caricature, and badge holder"
                  className="block h-auto w-full"
                  decoding="async"
                  loading="lazy"
                />
              </div>
            </figure>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/[0.07]">
        <div className="mx-auto flex max-w-content items-center justify-between px-20 py-12">
          <p className="font-ui text-xs text-ink-tertiary">
            Made with tea, persistence and countless hours in Claude &amp; Cursor
          </p>
          <a
            href="https://www.linkedin.com/in/jessica-ti"
            target="_blank"
            rel="noopener"
            className="font-ui text-xs font-medium text-ink-secondary transition-colors hover:text-ink-primary"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  )
}
