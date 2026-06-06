import React from 'react'
import CaseStudyHeader from '../components/CaseStudyHeader'
import type { SitePage } from '../components/SiteNav'

interface Props {
  onBack: () => void
  onNavigate: (page: SitePage) => void
}

const InstagramCaseStudyUnlocked = React.lazy(() => import('./InstagramCaseStudyUnlocked'))
const PhotoCarousel = React.lazy(() =>
  import('./instagramCaseStudyParts').then((m) => ({ default: m.PhotoCarousel })),
)

type GatePhase = 'locked' | 'decrypting' | 'expanding' | 'unlocked'

export default function InstagramCaseStudy({ onBack, onNavigate }: Props) {
  const [password, setPassword] = React.useState('')
  const [phase, setPhase] = React.useState<GatePhase>('locked')
  const [wrong, setWrong] = React.useState(false)
  const [revealed, setRevealed] = React.useState(false)
  const [activeStep, setActiveStep] = React.useState(0)
  const [timelineVisible, setTimelineVisible] = React.useState(false)
  const [activePath, setActivePath] = React.useState<'under16' | 'over16'>('under16')

  // After the phone finishes its reveal animation, slide the timeline in
  React.useEffect(() => {
    if (!revealed) return
    const t = setTimeout(() => setTimelineVisible(true), 2600)
    return () => clearTimeout(t)
  }, [revealed])

  // Reset to under16 path whenever the user switches features
  React.useEffect(() => { setActivePath('under16') }, [activeStep])

  const handlePathComplete = React.useCallback(() => {
    setActivePath(prev => prev === 'under16' ? 'over16' : 'under16')
  }, [])

  const handleSubmit = () => {
    if (!password.trim() || phase !== 'locked') return
    if (password.trim().toLowerCase() !== 'duality') {
      setWrong(true)
      setTimeout(() => setWrong(false), 600)
      return
    }
    setPhase('decrypting')
    setTimeout(() => setPhase('expanding'), 1000)
    setTimeout(() => {
      setPhase('unlocked')
      requestAnimationFrame(() => requestAnimationFrame(() => setRevealed(true)))
    }, 1900)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="min-h-screen bg-bg">

      <CaseStudyHeader onBack={onBack} onNavigate={onNavigate} />

      <main className="mx-auto max-w-content px-20">

        {/* ── Title block ── */}
        <section className="pt-16 pb-12">
          <div className="mb-4 flex items-center gap-3">
            <img src="/ig-icon.png" alt="Instagram" style={{ height: 28, width: 'auto' }} />
          </div>
          <h1 className="font-serif text-[clamp(36px,4vw,52px)] leading-tight tracking-[-0.04em] text-ink-primary">
            Instagram
          </h1>
          <p className="mt-3 font-inter text-base text-ink-secondary" style={{ maxWidth: 560 }}>
            Designing a local offboarding experience for new social media regulations
          </p>
        </section>

        {/* ── Metadata ── */}
        <section className="border-t border-black/[0.07] py-8">
          <div className="grid grid-cols-4 gap-8 mb-6">
            {[
              { label: 'Project',      value: "Australia's Social Media Ban" },
              { label: 'Timeline',     value: 'Aug – Dec 2025' },
              { label: 'Organisation', value: 'Trust & Safety' },
              { label: 'Role',         value: 'UX Designer' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-inter text-xs font-medium uppercase tracking-widest text-ink-tertiary mb-1">{label}</p>
                <p className="font-inter text-sm text-ink-primary">{value}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="font-inter text-xs font-medium uppercase tracking-widest text-ink-tertiary mb-1">Team</p>
            <p className="font-inter text-sm text-ink-secondary">
              Engineering Manager, General Counsel, Product Designer, Product Manager, Policy Manager (across Instagram, Facebook, Messenger and Threads)
            </p>
          </div>
        </section>

        {/* ── Hero image ── */}
        <section className="py-12">
          <div className="overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.08)]">
            <img
              src="/instagram-thumb.png"
              alt="Instagram case study thumbnail"
              className="block w-full h-auto scale-[1.18]"
              style={{ transformOrigin: 'center 45%' }}
            />
          </div>
        </section>

        {/* ── The goal ── */}
        <section className="py-16 border-t border-black/[0.07]">
          <p className="font-hand text-[18px] text-ink-tertiary mb-8">The goal</p>
            <div className="grid grid-cols-2 gap-16 items-start">
            <h2 className="font-serif text-[clamp(22px,2.4vw,30px)] leading-snug tracking-[-0.03em] text-ink-primary">
              Enable a clear and trustworthy transition out of and back into social connection
            </h2>
            <div>
              <p className="font-hand text-[18px] text-ink-tertiary mb-4">Context</p>
              <p className="font-inter text-[15px] leading-relaxed text-ink-secondary">
                For many teens, social media holds their connection to identity and friendships. In December 2025, the world's first social media ban took effect in Australia where every teen 16 and under, banned overnight. For social media companies, there was no precedent for this. No guidance on how to help hundreds of thousands of teens understand what was happening to their accounts, or what came next.{' '}
                <strong className="font-semibold text-ink-primary">We were inventing the playbook.</strong>
              </p>
            </div>
          </div>

          {/* Problem */}
          <div className="mt-20">
            <p className="font-hand text-[18px] text-ink-tertiary mb-6">Problem</p>
            <p className="font-inter text-[15px] leading-relaxed text-ink-secondary mb-10">
              Unlike previous regulations that targeted individual features, the Australia social media ban introduced an entirely new operational change of bringing teens off the whole app entirely. Given that there was no such precedent for this, this invited the problem of...
            </p>
            {/* Problem statement callout */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(139,109,168,0.13) 0%, rgba(162,125,190,0.10) 100%)',
              border: '1px solid rgba(139,109,168,0.22)',
              borderRadius: 16,
              padding: '40px 48px',
              marginBottom: 36,
              textAlign: 'center',
            }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'rgba(112,80,145,0.70)',
                marginBottom: 18,
              }}>Problem statement</p>
              <p style={{
                fontFamily: '"Fjord One", serif',
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 1.55,
                color: '#2c1f38',
                letterSpacing: '-0.01em',
              }}>
                How might we guide teens through temporary account restrictions in a way that feels clear, supportive and transparent?
              </p>
            </div>
            <div className="mt-12">
              <p className="font-hand text-[18px] text-ink-tertiary mb-6">Constraints</p>
              <div className="flex flex-col gap-4">
                {[
                  {
                    label: 'Evolving regulation',
                    body: (
                      <>
                        The law was still being defined as we designed. Key enforcement details arrived in fragments, which meant{' '}
                        <strong className="font-semibold text-ink-primary">decisions had to be made under uncertainty</strong>
                        {' '}and revised quickly.
                      </>
                    ),
                  },
                  {
                    label: 'Ecosystem consistency',
                    body: (
                      <>
                        The policy applied across Meta's full app family including Instagram, Facebook, Messenger and Threads. Each platform has different product behaviours and codebase constraints, meaning that I had to{' '}
                        <strong className="font-semibold text-ink-primary">collaborate extensively and closely with designers across all apps.</strong>
                      </>
                    ),
                  },
                  { label: 'Legally defensible enforcement', body: "Every design decision needed to hold up against the regulation's requirements which would be reviewed by the Australian government or we would risk a hefty fine." },
                  { label: 'Six-week timeline', body: "Core experiences had to be design-ready in just under a month and a half, across all four apps simultaneously." },
                ].map(({ label, body }) => (
                  <div key={label} className="flex gap-6 items-start">
                    <p className="font-inter text-[13px] font-medium text-ink-primary whitespace-nowrap pt-[2px]" style={{ minWidth: 200 }}>{label}</p>
                    <p className="font-inter text-[15px] leading-relaxed text-ink-secondary">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Password gate / revealed content ── */}
        <section className="py-16 border-t border-black/[0.07]">
          {/* "The solution" label always visible */}
          {phase !== 'unlocked' && (
            <div className="mb-10">
              <p className="font-hand text-[18px] text-ink-tertiary">The solution</p>
            </div>
          )}
          {phase !== 'unlocked' ? (
            /* ── Locked / decrypting / expanding card ── */
            <div
              style={{
                maxWidth: 520,
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 20,
                border: '1px solid rgba(0,0,0,0.07)',
                background: '#fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)',
                transform: phase === 'expanding' ? 'scale(1.04) translateY(-6px)' : 'scale(1) translateY(0)',
                opacity: phase === 'expanding' ? 0 : 1,
                transition: phase === 'expanding'
                  ? 'transform 1.0s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.9s ease-out'
                  : 'none',
              }}
            >
              {/* Shimmer bar – only visible during decrypting */}
              {phase === 'decrypting' && <div className="gate-shimmer-bar" />}

              <div style={{ padding: '56px 48px', textAlign: 'center' }}>
                {/* Lock icon */}
                <div style={{ marginBottom: 24, display:'flex', justifyContent:'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                    stroke={phase === 'decrypting' ? '#c084fc' : '#a0a0a0'}
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition: 'stroke 0.4s ease' }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>

                <h3 className="font-serif text-[22px] tracking-[-0.03em] text-ink-primary mb-3">
                  The work is mysterious and important.
                </h3>
                <p className="font-inter text-sm text-ink-secondary leading-relaxed mb-8">
                  This case study isn't publicly available due to a Confidentiality agreement. To request access, please enter the password or feel free to{' '}
                  <a href="mailto:jessica@example.com" className="underline underline-offset-2 hover:text-ink-primary transition-colors">
                    email me here!
                  </a>
                </p>

                <style>{`
                  @keyframes gate-shake {
                    0%,100% { transform: translateX(0); }
                    20%     { transform: translateX(-7px); }
                    40%     { transform: translateX(7px); }
                    60%     { transform: translateX(-5px); }
                    80%     { transform: translateX(4px); }
                  }
                `}</style>
                <div style={{ animation: wrong ? 'gate-shake 0.5s ease' : 'none' }}>
                  <input
                    type="password"
                    placeholder={phase === 'decrypting' ? 'Verifying…' : 'Enter password...'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setWrong(false) }}
                    onKeyDown={handleKeyDown}
                    disabled={phase === 'decrypting'}
                    className="w-full rounded-lg border bg-bg px-4 py-3 font-inter text-sm text-ink-primary placeholder:text-ink-tertiary focus:outline-none focus:ring-2 mb-3 disabled:opacity-50"
                    style={{
                      borderColor: wrong ? 'rgba(200,80,80,0.5)' : 'rgba(0,0,0,0.12)',
                      boxShadow: wrong ? '0 0 0 3px rgba(200,80,80,0.1)' : undefined,
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                  />
                  {wrong && (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(180,60,60,0.85)', marginBottom: 10, marginTop: -6 }}>
                      Incorrect password. Try again.
                    </p>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={phase === 'decrypting'}
                    className="w-full rounded-lg bg-ink-primary px-4 py-3 font-inter text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {phase === 'decrypting' ? 'Unlocking…' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <React.Suspense
              fallback={
                <div className="py-16 text-center">
                  <p className="font-inter text-sm text-ink-secondary animate-pulse">Loading case study…</p>
                </div>
              }
            >
              <InstagramCaseStudyUnlocked
                revealed={revealed}
                timelineVisible={timelineVisible}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                activePath={activePath}
                setActivePath={setActivePath}
                handlePathComplete={handlePathComplete}
              />
            </React.Suspense>
          )}
        </section>
        <section className="py-16 border-t border-black/[0.07]">
          <React.Suspense fallback={<div className="h-48 animate-pulse rounded-card bg-black/[0.04]" aria-hidden />}>
            <PhotoCarousel />
          </React.Suspense>
        </section>

      </main>

    </div>
  )
}
