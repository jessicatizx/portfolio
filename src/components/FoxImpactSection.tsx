const IMPACT_STATS = [
  {
    value: '87%',
    label: 'Increment in use of filters button',
  },
  {
    value: '82%',
    label: 'Decrement in number of users not onboarded/ deactivated in time',
  },
  {
    value: '37%',
    label: 'Of group assignments are through the mirroring function',
  },
] as const

function ImpactStatCard({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex min-h-[168px] flex-col justify-between rounded-2xl px-5 py-6 sm:min-h-[180px] sm:px-6 sm:py-7"
      style={{ background: '#4a6f94' }}
    >
      <p className="font-serif text-[clamp(36px,4.2vw,48px)] font-normal leading-none tracking-[-0.03em] text-white">
        {value}
      </p>
      <p className="mt-6 font-inter text-[13px] leading-snug text-white/95 sm:text-[14px]">
        {label}
      </p>
    </div>
  )
}

export default function FoxImpactSection() {
  return (
    <section
      className="border-t border-black/[0.07] py-16"
      aria-labelledby="fox-impact-heading"
    >
      <div
        className="rounded-2xl px-8 py-12 sm:px-10 sm:py-14 lg:px-12"
        style={{ background: 'linear-gradient(180deg, #f7f2ea 0%, #f3ede4 100%)' }}
      >
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-14">
          <div className="min-w-0 max-w-xl">
            <h2
              id="fox-impact-heading"
              className="mb-6 font-serif text-[clamp(26px,3vw,34px)] leading-snug tracking-[-0.03em] text-ink-primary"
            >
              Making a difference
            </h2>
            <div className="space-y-4 font-inter text-[15px] leading-relaxed text-ink-secondary">
              <p>
                The redesigned admin portal transformed Fox&apos;s vendor management workflow, creating measurable
                improvements in operational efficiency and compliance. By collaborating closely with the data science
                team, we tracked key performance indicators that validated our design decisions.
              </p>
              <p>
                Our streamlined filtering system significantly reduced the time administrators spent searching for
                relevant vendor information. The introduction of the mirroring function revolutionized the group
                assignment process, eliminating redundant work for managing similar vendor profiles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3 lg:gap-4">
            {IMPACT_STATS.map((stat) => (
              <ImpactStatCard key={stat.value} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
