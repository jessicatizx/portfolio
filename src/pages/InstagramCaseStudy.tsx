import React from 'react'

interface Props {
  onBack: () => void
}

const photos = [
  '/aus-photo-1.png',
  '/aus-photo-2.png',
  '/aus-photo-3.png',
  '/aus-photo-4.png',
  '/aus-photo-5.png',
]

// Triple the array so there's always content in every direction
const CLONED = [...photos, ...photos, ...photos]
const PEEK = 50
const GAP = 12

// ── Iter1Block — ranked comparison table + interactive screen pair ─────────────
// Hover key encodes both phase (prior / ban) and concept (what / when / why / means)
type HoverPhrase =
  | 'prior-what' | 'prior-when' | 'prior-why'
  | 'ban-why' | 'ban-what' | 'ban-means'
  | null;

const ITER1_COLORS: Record<string, string> = {
  what:  '#5b4fa8',
  when:  '#4a6bcf',
  why:   '#8a6aa0',
  means: '#9b8ea0',
};
const ITER1_HIGHLIGHTS: Record<string, string> = {
  what:  'rgba(91,79,168,0.13)',
  when:  'rgba(74,107,207,0.13)',
  why:   'rgba(138,106,160,0.13)',
  means: 'rgba(155,142,160,0.13)',
};

function Iter1Block() {
  const [hovered, setHovered] = React.useState<HoverPhrase>(null);

  const concept = (k: HoverPhrase) => k ? k.split('-')[1] : '';

  const tag = (key: Exclude<HoverPhrase, null>, text: string) => (
    <span
      onMouseEnter={() => setHovered(key)}
      onMouseLeave={() => setHovered(null)}
      style={{
        color: ITER1_COLORS[concept(key)] ?? '#5e5660',
        fontWeight: 500,
        background: hovered === key ? (ITER1_HIGHLIGHTS[concept(key)] ?? 'transparent') : 'transparent',
        borderRadius: 3,
        padding: '1px 3px',
        cursor: 'pointer',
        transition: 'background 0.25s ease',
      }}
    >
      {text}
    </span>
  );

  // Table data
  const columns: { label: string; rows: { key: Exclude<HoverPhrase, null>; rank: string; tied?: boolean; text: string }[] }[] = [
    {
      label: 'Prior communications',
      rows: [
        { key: 'prior-what', rank: '1', tied: true,  text: 'What was happening' },
        { key: 'prior-when', rank: '1', tied: true,  text: 'When it was happening' },
        { key: 'prior-why',  rank: '3', tied: false, text: 'Why it was happening' },
      ],
    },
    {
      label: 'Once ban had kicked in',
      rows: [
        { key: 'ban-why',   rank: '1', tied: false, text: 'Why it was happening' },
        { key: 'ban-what',  rank: '2', tied: false, text: 'What was happening' },
        { key: 'ban-means', rank: '3', tied: false, text: 'What it means for me' },
      ],
    },
  ];

  return (
    <>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.75, color: '#5e5660', margin: '20px auto 16px', maxWidth: 680 }}>
        These were the findings from the research which influenced our design iterations.
      </p>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, lineHeight: 1.6, color: '#b0a4bc', margin: '0 auto 10px', maxWidth: 680, display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v5M6 9v1" stroke="#b0a4bc" strokeWidth="1.4" strokeLinecap="round"/><circle cx="6" cy="6" r="5.25" stroke="#b0a4bc" strokeWidth="1"/></svg>
        Hover any row to highlight where it appears in the screens below
      </p>
      <div style={{ display: 'flex', gap: 0, maxWidth: 680, margin: '0 auto', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        {columns.map((col, ci) => (
          <div key={ci} style={{ flex: 1, borderRight: ci === 0 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
            <div style={{ padding: '12px 18px 10px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: 'rgba(0,0,0,0.018)' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' as const, color: '#b0a4bc' }}>{col.label}</span>
            </div>
            {col.rows.map((row, ri) => {
              const isActive = hovered === row.key;
              const c = concept(row.key);
              const color = ITER1_COLORS[c] ?? '#9b8ea0';
              const highlight = ITER1_HIGHLIGHTS[c] ?? 'rgba(155,142,160,0.1)';
              return (
                <div
                  key={ri}
                  onMouseEnter={() => setHovered(row.key)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 14px 12px 0',
                    borderBottom: ri < col.rows.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                    background: isActive ? highlight : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    borderLeft: `3px solid ${isActive ? color : `${color}55`}`,
                    paddingLeft: 15,
                  }}
                >
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700,
                    color: color,
                    letterSpacing: '0.04em', flexShrink: 0, minWidth: 18,
                    opacity: isActive ? 1 : 0.55,
                    transition: 'opacity 0.2s ease',
                  }}>
                    #{row.rank}{row.tied ? '=' : ''}
                  </span>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 13.5, lineHeight: 1.5,
                    color: color,
                    fontWeight: isActive ? 600 : 400,
                    opacity: isActive ? 1 : 0.7,
                    transition: 'opacity 0.2s ease, font-weight 0.2s ease',
                    flex: 1,
                  }}>
                    {row.text}
                  </span>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ opacity: isActive ? 0.85 : 0.3, transition: 'opacity 0.2s ease', flexShrink: 0 }}>
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <Iter1ScreenPair hoveredPhrase={hovered} />
    </>
  );
}

// ── Iter1ScreenPair — QP + FSI side by side, no device shell ─────────────────
function Iter1ScreenPair({ hoveredPhrase = null }: { hoveredPhrase?: HoverPhrase }) {
  // Scale-up helper: qpScale amplifies more since QP text is smaller
  const magnify = (active: boolean, scale = 1.18): React.CSSProperties => ({
    display: 'inline-block',
    transform: active ? `scale(${scale})` : 'scale(1)',
    transformOrigin: 'center center',
    transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
    background: active ? 'rgba(255,255,220,0.55)' : 'transparent',
    borderRadius: 3,
    padding: '1px 4px',
    transitionProperty: 'transform, background',
  });
  const PW = 150; // phone width — two fit side by side in the right column
  const PH = 340; // display height (clipped)
  const FF = '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
  const mk = (url: string, sz = 24): React.CSSProperties => ({
    background: '#0c1014',
    WebkitMaskImage: `url('${url}')`, maskImage: `url('${url}')`,
    WebkitMaskSize: `${sz}px ${sz}px`, maskSize: `${sz}px ${sz}px`,
    WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
  });

  // FSI Figma assets
  const fsiLevels   = 'https://www.figma.com/api/mcp/asset/24d7a85a-800f-4b4a-a308-8d9cf868e63d';
  const fsiClose    = 'https://www.figma.com/api/mcp/asset/2e2cab6b-6b3c-46d8-b922-2e85e9ff66a3';
  const fsiSettings = 'https://www.figma.com/api/mcp/asset/5892e9e5-4e3f-44a4-8571-b011cb0da649';
  const fsiUsers    = 'https://www.figma.com/api/mcp/asset/e0b39711-54d6-4c7e-b6b8-2b1af42cebb7';
  const FSI_W = 374.751;
  const fsiScale = PW / FSI_W;
  const qpScale  = PW / FRAME_W;

  const phoneShell: React.CSSProperties = {
    width: PW, height: PH,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.09)',
    boxShadow: '0 8px 28px rgba(0,0,0,0.10)',
    flexShrink: 0,
  };

  const colLabel = (text: string) => (
    <p style={{ margin: '0 0 10px', fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' as const, color: '#b0a4bc' }}>{text}</p>
  );

  return (
    <div style={{ display: 'flex', gap: 0, marginTop: 16, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>

      {/* ── Left column: Prior communications → QP ── */}
      <div style={{ flex: 1, paddingTop: 16, paddingRight: 16, borderRight: '1px solid rgba(0,0,0,0.07)' }}>
        {colLabel('Prior communications')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <div style={phoneShell}>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <QPPhoneInner
                phoneW={PW}
                headline={
                  <p style={{ fontSize:15.5, fontWeight:700, color:'#0c1014', lineHeight:'19.3px', letterSpacing:'-0.31px', margin:0, textAlign:'center' }}>
                    <span style={magnify(hoveredPhrase === 'prior-when', 1.55)}>Soon</span>
                    {", "}
                    <span style={magnify(hoveredPhrase === 'prior-what', 1.35)}>{"people under 16 won't be able to use social media"}</span>
                  </p>
                }
                body={
                  <p style={{ fontSize:13.5, color:'#0c1014', lineHeight:'17.4px', letterSpacing:'-0.14px', margin:0, textAlign:'center' }}>
                    <span style={magnify(hoveredPhrase === 'prior-why', 1.35)}>Due to laws in Australia</span>
                    {", you won't be able to use Instagram until you turn 16."}
                  </p>
                }
                cta={<span style={{ fontSize:13, fontWeight:600, color:'#4a5df9' }}>{"I'm 16 or over"}</span>}
              />
            </div>
          </div>
          <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9b8ea0', letterSpacing: '0.02em' }}>Quick Prompt</p>
        </div>
      </div>

      {/* ── Right column: Once ban kicked in → FSI + Steps ── */}
      <div style={{ flex: 1, paddingTop: 16, paddingLeft: 16 }}>
        {colLabel('Once ban had kicked in')}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>

          {/* FSI screen */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
            <div style={phoneShell}>
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{ width: FSI_W, transformOrigin: 'top left', transform: `scale(${fsiScale})`, fontFamily: FF, display: 'flex', flexDirection: 'column', height: 812, background: '#fff' }}>
              {/* Status bar */}
              <div style={{ height: 51.889, display: 'flex', alignItems: 'center', padding: '0 15.37px', justifyContent: 'space-between', flexShrink: 0 }}>
                <span style={{ fontWeight: 600, fontSize: 16.34, color: '#0c1014' }}>9:41</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {/* Signal bars */}
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="#0c1014"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
                  {/* Wifi */}
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.8" r="1.2" fill="#0c1014"/><path d="M4.8 7.4a4.5 4.5 0 0 1 6.4 0" stroke="#0c1014" strokeWidth="1.3" strokeLinecap="round"/><path d="M2 4.6a8 8 0 0 1 12 0" stroke="#0c1014" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  {/* Battery */}
                  <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#0c1014" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#0c1014"/><path d="M23.5 4.5v4a2 2 0 0 0 0-4Z" fill="#0c1014" opacity="0.4"/></svg>
                </div>
              </div>
              {/* Nav bar — wordmark + hamburger */}
              <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 15.37px', flexShrink: 0 }}>
                <img src="/ig-wordmark.png" alt="Instagram" style={{ height: 28, objectFit: 'contain' }} />
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                  <rect width="20" height="2" rx="1" fill="#0c1014"/>
                  <rect y="6" width="20" height="2" rx="1" fill="#0c1014"/>
                  <rect y="12" width="20" height="2" rx="1" fill="#0c1014"/>
                </svg>
              </div>
              {/* Avatar */}
              <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 16px', flexShrink: 0 }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f5c842', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={PHOTOS.alex} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              {/* Headline */}
              <div style={{ padding: '0 32px 12px', textAlign: 'center', flexShrink: 0 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 24, lineHeight: '30px', color: '#000' }}>
                  <span style={magnify(hoveredPhrase === 'ban-why')}>Due to laws in Australia</span>
                  {", "}
                  <span style={magnify(hoveredPhrase === 'ban-what')}>people under 16 can no longer use social media</span>
                </p>
                <p style={{ margin: '8px 0 0', fontSize: 13.5, color: '#6a6a6a', lineHeight: '18px' }}>
                  {"You'll be able to use your Instagram account on dd/mm/yy"}
                </p>
              </div>
              {/* Bullet cells */}
              {([
                { icon: fsiSettings, title: "What happened",         body: "Due to laws in Australia, people under 16 can no longer use social media, including Instagram and Threads." },
                { icon: fsiUsers,    title: "What this means for you", body: "You won't be able to use your Instagram account until you're 16, and your profile won't be visible to you or others until then." },
              ] as { icon: string; title: string; body: string }[]).map(({ icon, title, body }) => (
                <div key={title} style={{ display: 'flex', gap: 12, padding: '12px 24px', alignItems: 'flex-start', flexShrink: 0 }}>
                  <div style={{ paddingTop: 2, flexShrink: 0 }}>
                    <div style={{ width: 24, height: 24, ...mk(icon) }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14, lineHeight: '18px', color: '#0c1014' }}>{title}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 13.5, lineHeight: '17px', color: '#0c1014' }}>{body}</p>
                  </div>
                </div>
              ))}
              {/* More information row */}
              <div style={{ display: 'flex', gap: 12, padding: '12px 24px 0', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="1.5" y="1.5" width="21" height="21" rx="4" stroke="#0c1014" strokeWidth="1.5"/>
                    <rect x="5" y="7.5" width="14" height="1.8" rx="0.9" fill="#0c1014"/>
                    <rect x="5" y="11.1" width="14" height="1.8" rx="0.9" fill="#0c1014"/>
                    <rect x="5" y="14.7" width="9" height="1.8" rx="0.9" fill="#0c1014"/>
                  </svg>
                </div>
                <p style={{ margin: 0, fontWeight: 500, fontSize: 14, lineHeight: '18px', color: '#0c1014' }}>Learn more about what this means for you</p>
              </div>
              <div style={{ flex: 1 }} />
              {/* CTAs */}
              <div style={{ padding: '16px', flexShrink: 0 }}>
                <div style={{ background: '#4a5df9', borderRadius: 8, padding: '13px', display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>See next steps</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: '#4a5df9' }}>{"I'm 16 or over"}</span>
                </div>
              </div>
              {/* Home affordance */}
              <div style={{ height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 130, height: 5, borderRadius: 100, background: '#0c1014' }} />
              </div>
            </div>
          </div>
        </div>
            <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9b8ea0', letterSpacing: '0.02em' }}>Full-screen interstitial</p>
          </div>

          {/* Steps screen */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
            <div style={phoneShell}>
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                <div style={{ width: 376, transformOrigin: 'top left', transform: `scale(${PW / 376})` }}>
                  <Screen2 />
                </div>
              </div>
            </div>
            <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9b8ea0', letterSpacing: '0.02em' }}>Steps you can take now</p>
          </div>

        </div>{/* end right screens row */}
      </div>{/* end right column */}

    </div>
  );
}

// ── Research iteration #1 — ranked card shuffle (usability testing) ──────────
function ResearchIteration1Shuffle() {
  const CARDS = ["What's happening", "When is it happening", "Why is it happening"];

  const [slotOf, setSlotOf] = React.useState<number[]>([0, 1, 2]);
  const [pausedState, setPausedState] = React.useState(false);
  const pausedRef = React.useRef(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const pause = (v: boolean) => { pausedRef.current = v; setPausedState(v); };

  // Slow swap every 5.5s, alternating direction
  const dirRef = React.useRef(1);
  React.useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      const d = dirRef.current;
      setSlotOf(prev => prev.map(s => (s + d + 3) % 3));
      dirRef.current = d * -1;
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Stop 7s after section scrolls into view
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let stopTimer: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        stopTimer = setTimeout(() => pause(true), 9000);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => { observer.disconnect(); if (stopTimer) clearTimeout(stopTimer); };
  }, []);

  const RANK_COLORS = ['#6b4ea8', '#9080b2', '#b5a8cc'];
  const BOB_DUR = [5.2, 6.8, 5.9]; // slightly different bob speeds per card

  return (
    <>
      <style>{`
        @keyframes rsd-bob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>

      <div
        ref={containerRef}
        onMouseEnter={() => pause(true)}
        onMouseLeave={() => pause(false)}
        style={{
          marginTop: 20,
          padding: '24px 0 32px',
          background: 'linear-gradient(180deg, rgba(139,109,168,0.05) 0%, transparent 100%)',
          cursor: 'default',
          userSelect: 'none',
        }}
      >
        {/* Rank labels — fixed slot positions */}
        <div style={{ display: 'flex', marginBottom: 14 }}>
          {['#1', '#2', '#3'].map((rank, i) => (
            <div key={i} style={{
              flex: 1,
              textAlign: 'center',
              fontFamily: 'Inter, sans-serif',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color: RANK_COLORS[i],
            }}>
              {rank}
            </div>
          ))}
        </div>

        {/* Cards container */}
        <div style={{ position: 'relative', height: 100, marginTop: 10 }}>
          {CARDS.map((label, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `calc(${slotOf[i]} * 33.333% + 8px)`,
                width: 'calc(33.333% - 16px)',
                top: 0,
                height: '100%',
                boxSizing: 'border-box' as const,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center' as const,
                fontFamily: '"Fjord One", Georgia, serif',
                fontSize: 'clamp(13px, 1.5vw, 17px)',
                lineHeight: 1.42,
                letterSpacing: '-0.02em',
                color: '#2a2235',
                background: 'linear-gradient(168deg, #fefdfb 0%, #f8f4fc 50%, #f1eaf8 100%)',
                border: '1px solid rgba(100,78,128,0.17)',
                borderRadius: 4,
                boxShadow: 'none',
                transition: 'left 1.3s cubic-bezier(0.34, 1.4, 0.64, 1)',
                animation: `rsd-bob ${BOB_DUR[i]}s ease-in-out infinite`,
                animationPlayState: pausedState ? 'paused' : 'running',
                willChange: 'left',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Pause hint */}
        <div style={{
          marginTop: 18,
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          fontSize: 11,
          letterSpacing: '0.05em',
          color: 'rgba(139,109,168,0.38)',
          transition: 'opacity 0.4s ease',
          opacity: pausedState ? 1 : 0,
        }}>
          paused — move cursor away to resume
        </div>
      </div>
    </>
  );
}

function PhotoCarousel() {
  const n = photos.length
  const [idx, setIdx] = React.useState(n) // start at index n (first photo in middle copy)
  const [animate, setAnimate] = React.useState(true)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = React.useState(800)

  React.useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const cardWidth = (containerWidth - 2 * PEEK - 2 * GAP) / 3
  const slideUnit = cardWidth + GAP
  const translateX = -(idx * slideUnit) + PEEK

  const go = (dir: 1 | -1) => {
    setAnimate(true)
    setIdx(i => i + dir)
  }

  const handleTransitionEnd = () => {
    // Silently snap back into the middle copy to keep the loop seamless
    if (idx < n) {
      setAnimate(false)
      setIdx(prev => prev + n)
    } else if (idx >= 2 * n) {
      setAnimate(false)
      setIdx(prev => prev - n)
    }
  }

  React.useEffect(() => {
    if (!animate) {
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimate(true))
      )
      return () => cancelAnimationFrame(raf)
    }
  }, [animate])

  return (
    <div>
      <div className="relative flex items-center gap-4">
        <button
          onClick={() => go(-1)}
          className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-black/[0.1] bg-white shadow-sm transition-opacity hover:opacity-70"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="#111110" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div ref={containerRef} className="flex-1 overflow-hidden">
          <div
            className="flex"
            style={{
              gap: GAP,
              transform: `translateX(${translateX}px)`,
              transition: animate ? 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {CLONED.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 overflow-hidden rounded-xl"
                style={{ width: cardWidth }}
              >
                <img
                  src={src}
                  alt={`Research trip photo ${(i % n) + 1}`}
                  className="block w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => go(1)}
          className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-black/[0.1] bg-white shadow-sm transition-opacity hover:opacity-70"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="#111110" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <p className="mt-4 font-inter text-xs text-ink-tertiary text-center">
        Photos from our research trip in Australia
      </p>
    </div>
  )
}


// ── Local photos (served from /public) ───────────────────────────────────
const PHOTOS = {
  yours:    '/ig-story-yours.png',   // silhouette — Your story
  mwells77: '/ig-story-mwells.png',  // cartoon girl — mwells77
  aimi:     '/ig-story-aimi.png',    // camera person — aimi.allover
  alex:     '/ig-story-alex.png',    // cool cat — alex.any...
  shayli:   '/ig-avatar-shayli.png', // couple — shayli_thomas avatar
  post:     '/ig-post-shayli.png',   // woman in water — shayli post
}

// Story ring gradient ring helpers
const STORY_RING = 'linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'

// ── Screen 2: "Steps you can take now" (Figma node 2824:192909) ──────────
function Screen2() {
  const S: React.CSSProperties = { fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }

  const cells = [
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>,
      title: 'Review your phone number',
      sub: "We'll text you at 3********4 when you can use Instagram again.",
      dot: true,
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8l10 6 10-6"/></svg>,
      title: 'Review your email',
      sub: "We'll email you at a*****3@gmail.com when you can use Instagram again.",
      dot: true,
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/><path d="M12 15v5M9 18h6"/></svg>,
      title: 'Download your information',
      sub: 'You can save a copy of your activity, posts and messages.',
      dot: true,
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
      title: 'Review your birthday',
      sub: 'You can use Instagram again on 8 June 2027.',
      dot: false,
    },
  ]

  return (
    <div style={{ ...S, width: 376, height: 812, background: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Status bar */}
      <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <span style={{ fontSize: 16.4, fontWeight: 600, color: '#000', letterSpacing: '-0.3px' }}>5:26</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="#000"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.8" r="1.2" fill="#000"/><path d="M4.8 7.4a4.5 4.5 0 0 1 6.4 0" stroke="#000" strokeWidth="1.3" strokeLinecap="round"/><path d="M2 4.6a8 8 0 0 1 12 0" stroke="#000" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#000" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#000"/></svg>
        </div>
      </div>

      {/* Nav bar with back chevron */}
      <div style={{ height: 42, display: 'flex', alignItems: 'center', padding: '0 15px', background: '#fff' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </div>

      {/* Body */}
      <div style={{ padding: '28px 32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {/* Teen avatar */}
        <div style={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', background: '#FFD93D', flexShrink: 0, marginBottom: 16 }}>
          <img src={PHOTOS.mwells77} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Title */}
        <p style={{ fontSize: 24, fontWeight: 700, color: '#000', textAlign: 'center', lineHeight: '30px', letterSpacing: '0.07px', margin: '0 0 8px' }}>
          Steps you can take now
        </p>
        {/* Subtitle */}
        <p style={{ fontSize: 14, color: '#0c1014', textAlign: 'center', lineHeight: '18px', letterSpacing: '-0.15px', margin: 0 }}>
          When you turn 16, your profile and all your posts, messages and activity will be restored.{' '}
          <span style={{ color: '#3849da', fontWeight: 600 }}>Learn more</span>
        </p>
      </div>

      {/* Section header */}
      <div style={{ padding: '14px 16px', marginTop: 16 }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: '#000', lineHeight: '20px', letterSpacing: '-0.32px', margin: 0 }}>What you can do</p>
      </div>

      {/* List cells */}
      {cells.map((cell, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', minHeight: 48 }}>
          <div style={{ flexShrink: 0, paddingTop: 0 }}>{cell.icon}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 16, color: '#0c1014', lineHeight: '20px', letterSpacing: '-0.32px', margin: '0 0 2px' }}>{cell.title}</p>
            <p style={{ fontSize: 14, color: '#8e8e8e', lineHeight: '18px', letterSpacing: '-0.15px', margin: 0 }}>{cell.sub}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 2, flexShrink: 0 }}>
            {cell.dot && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#E1306C', flexShrink: 0 }}/>}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="#6a717a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      ))}

      {/* Done button — pinned to bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff' }}>
        <div style={{ margin: '0 15px 0', padding: '15px 0 0' }}>
          <div style={{ background: '#4a5df9', borderRadius: 7.7, padding: '12.5px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: '#fff', letterSpacing: '-0.15px' }}>Done</span>
          </div>
        </div>
        <div style={{ height: 33, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 129, height: 5, borderRadius: 100, background: '#0c1014' }}/>
        </div>
      </div>
    </div>
  )
}

// ── Profile banner thumbnail (suite + explorations option 03) ───────────────
const PROFILE_BANNER_W = 473
const PROFILE_BANNER_H = 1024

function ProfileBannerScreen() {
  return (
    <img
      src="/suite-profile-banner.png"
      alt="Profile banner"
      width={PROFILE_BANNER_W}
      height={PROFILE_BANNER_H}
      style={{ width: PROFILE_BANNER_W, height: PROFILE_BANNER_H, display: 'block' }}
    />
  )
}

// ── Exploration FSI — matches explorations Option 02 reference (inline SVGs) ─
const EXPLORATION_FSI_W = 374.751
const FSI_BLUE = '#4a5df9'

const FsiIconInstagram = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="#0c1014" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4.25" stroke="#0c1014" strokeWidth="1.5" />
    <circle cx="17.25" cy="6.75" r="1.1" fill="#0c1014" />
  </svg>
)

const FsiIconProfile = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9.5" stroke="#0c1014" strokeWidth="1.5" />
    <circle cx="12" cy="10" r="3.25" stroke="#0c1014" strokeWidth="1.5" />
    <path d="M6.25 18.25c.85-2.65 2.95-4.25 5.75-4.25s4.9 1.6 5.75 4.25" stroke="#0c1014" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

function ExplorationFSIScreen({
  headline = 'Due to laws in Australia, soon, people under 16 can no longer use social media',
  meansBody = "You will not be able to use your Instagram account until you turn 16. This means you can't use Instagram, and your profile won't be visible to you or others until then. We'll let you know when you can use Instagram again.",
}: {
  headline?: string
  meansBody?: string
}) {
  const S: React.CSSProperties = { fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }

  const bullets = [
    {
      icon: <FsiIconInstagram />,
      title: "What's happening",
      body: 'Due to laws in Australia, people under 16 will no longer be able to use social media, including Instagram.',
    },
    {
      icon: <FsiIconProfile />,
      title: 'What this means for you',
      body: meansBody,
    },
  ]

  return (
    <div style={{ ...S, width: EXPLORATION_FSI_W, height: 812, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 16.4, fontWeight: 600, color: '#0c1014', letterSpacing: '-0.3px' }}>5:26</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="#0c1014"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.8" r="1.2" fill="#0c1014"/><path d="M4.8 7.4a4.5 4.5 0 0 1 6.4 0" stroke="#0c1014" strokeWidth="1.3" strokeLinecap="round"/><path d="M2 4.6a8 8 0 0 1 12 0" stroke="#0c1014" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#0c1014" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#0c1014"/><path d="M23.5 4.5v4a2 2 0 0 0 0-4Z" fill="#0c1014" opacity="0.4"/></svg>
        </div>
      </div>
      <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ padding: '8px 24px 20px', flexShrink: 0 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 24, lineHeight: '30px', letterSpacing: '0.07px', color: '#000', textAlign: 'left' }}>
            {headline}
          </p>
        </div>
        {bullets.map(({ icon, title, body }) => (
          <div key={title} style={{ display: 'flex', gap: 12, padding: '10px 24px', alignItems: 'flex-start', flexShrink: 0 }}>
            <div style={{ flexShrink: 0, width: 24, height: 24 }}>{icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 14, lineHeight: '18px', letterSpacing: '-0.15px', color: '#0c1014' }}>{title}</p>
              <p style={{ margin: '4px 0 0', fontSize: 13.5, lineHeight: '17.4px', letterSpacing: '-0.14px', color: '#0c1014' }}>{body}</p>
            </div>
          </div>
        ))}
        <div style={{ flex: 1, minHeight: 24 }} />
        <div style={{ padding: '8px 16px 0', flexShrink: 0 }}>
          <div style={{ background: FSI_BLUE, borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: '#fff', letterSpacing: '-0.15px' }}>See next steps</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: FSI_BLUE, letterSpacing: '-0.15px' }}>{"I'm 16 or over"}</span>
          </div>
        </div>
        <div style={{ height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: 130, height: 5, borderRadius: 100, background: '#0c1014' }} />
        </div>
      </div>
    </div>
  )
}

// ── Age verification bottom sheet (Figma node 2824:192907) ──────────────
// ── "Choose how you want to confirm your age" full sheet (Figma node 2824:178563) ──
function Screen6AgeMethodPicker({ visible }: { visible: boolean }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 40, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ width: FRAME_W, height: 812, transformOrigin: 'top left', transform: `scale(${SCALE})`, position: 'relative', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>

        {/* Scrim */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', opacity: visible ? 1 : 0, transition: 'opacity 0.35s ease' }}/>

        {/* Black status bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, background: '#000', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px 0 20px', opacity: visible ? 1 : 0, transition: 'opacity 0.35s ease' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#f1f4f7', letterSpacing: '-0.3px' }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="#f1f4f7"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.8" r="1.2" fill="#f1f4f7"/><path d="M4.8 7.4a4.5 4.5 0 0 1 6.4 0" stroke="#f1f4f7" strokeWidth="1.3" strokeLinecap="round"/><path d="M2 4.6a8 8 0 0 1 12 0" stroke="#f1f4f7" strokeWidth="1.3" strokeLinecap="round"/></svg>
            <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#f1f4f7" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#f1f4f7"/><path d="M23.5 4.5v4a2 2 0 0 0 0-4Z" fill="#f1f4f7" opacity="0.4"/></svg>
          </div>
        </div>

        {/* Full sheet — 748px */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 748,
          borderRadius: '32px 32px 0 0',
          background: '#fff',
          overflow: 'hidden',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.44s cubic-bezier(0.32, 0.72, 0, 1)',
        }}>
          {/* Nav bar row with X */}
          <div style={{ height: 56, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="#1c2b33" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Content */}
          <div style={{ padding: '0 16px 0' }}>
            {/* Headline */}
            <p style={{ fontSize: 24, fontWeight: 700, color: '#1c2b33', lineHeight: '30px', letterSpacing: '0.12px', margin: '0 0 24px' }}>
              Choose how you want to confirm your age
            </p>

            {/* List cell table */}
            <div style={{ border: '0.5px solid #e4e6e8', borderRadius: 16, overflow: 'hidden' }}>
              {/* Option 1: Video selfie — selected */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px', borderBottom: '0.5px solid #e4e6e8' }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.723v6.554a1 1 0 0 1-1.447.894L15 14M4 8h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#1c2b33', margin: '0 0 3px', lineHeight: '20px' }}>Take a video selfie</p>
                  <p style={{ fontSize: 13, color: '#65676b', margin: '0 0 3px', lineHeight: '18px' }}>It's used to estimate your age, then deleted.</p>
                  <p style={{ fontSize: 12, color: '#8a8d91', margin: 0, lineHeight: '16px' }}>Results can take 1-2 minutes</p>
                </div>
                {/* Selected radio */}
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" stroke="#0064e0" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="6" fill="#0064e0"/>
                  </svg>
                </div>
              </div>

              {/* Option 2: Upload ID — unselected */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px' }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"/>
                    <circle cx="8" cy="11" r="2"/>
                    <path d="M14 10h4M14 13h3"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#1c2b33', margin: '0 0 3px', lineHeight: '20px' }}>Upload your ID</p>
                  <p style={{ fontSize: 13, color: '#65676b', margin: '0 0 3px', lineHeight: '18px' }}>It's used to confirm your age, then deleted. You can use a driver's license or passport.</p>
                  <p style={{ fontSize: 12, color: '#8a8d91', margin: 0, lineHeight: '16px' }}>Results usually take 1-2 minutes</p>
                </div>
                {/* Unselected radio */}
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" stroke="#8a8d91" strokeWidth="1.5"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <div style={{ padding: '16px 16px 12px' }}>
              <div style={{ background: '#0064e0', borderRadius: 9999, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: '#f1f4f7', lineHeight: '19px' }}>Continue</span>
              </div>
            </div>
            <div style={{ height: 34, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8 }}>
              <div style={{ width: 134, height: 5, borderRadius: 9999, background: '#354855' }}/>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// ── "Help us confirm your age" sheet (Figma node 2824:178561) ────────────────
function Screen5AgeConfirm({ visible, continueHovered, continueActive }: { visible: boolean; continueHovered?: boolean; continueActive?: boolean }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 30, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ width: FRAME_W, height: 812, transformOrigin: 'top left', transform: `scale(${SCALE})`, position: 'relative', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>

        {/* Scrim */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', opacity: visible ? 1 : 0, transition: 'opacity 0.35s ease' }}/>

        {/* Black status bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, background: '#000', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px 0 20px', opacity: visible ? 1 : 0, transition: 'opacity 0.35s ease' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#f1f4f7', letterSpacing: '-0.3px' }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="#f1f4f7"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.8" r="1.2" fill="#f1f4f7"/><path d="M4.8 7.4a4.5 4.5 0 0 1 6.4 0" stroke="#f1f4f7" strokeWidth="1.3" strokeLinecap="round"/><path d="M2 4.6a8 8 0 0 1 12 0" stroke="#f1f4f7" strokeWidth="1.3" strokeLinecap="round"/></svg>
            <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#f1f4f7" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#f1f4f7"/><path d="M23.5 4.5v4a2 2 0 0 0 0-4Z" fill="#f1f4f7" opacity="0.4"/></svg>
          </div>
        </div>

        {/* 3/4 sheet — 596px */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 596,
          borderRadius: '32px 32px 0 0',
          background: '#fff',
          overflow: 'hidden',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.44s cubic-bezier(0.32, 0.72, 0, 1)',
        }}>
          {/* Drag handle */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: '#cbd2d9' }}/>
          </div>

          {/* X close */}
          <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="#1c2b33" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Content */}
          <div style={{ padding: '8px 16px 0' }}>
            {/* Headline */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 24, fontWeight: 700, color: '#1c2b33', lineHeight: '30px', letterSpacing: '0.12px', margin: '0 0 10px' }}>Help us confirm your age</p>
              <p style={{ fontSize: 15, color: '#1c2b33', lineHeight: '20px', letterSpacing: '-0.04px', margin: 0 }}>We need some more info before you can update your birthday.</p>
            </div>

            {/* List items */}
            <div style={{ border: '0.5px solid #e4e6e8', borderRadius: 16, overflow: 'hidden' }}>
              {[
                {
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                  text: 'This helps us protect younger people in our community.',
                },
                {
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
                  text: "We'll also use it to tailor the accounts we recommend and the ads you see.",
                },
                {
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
                  text: 'The info you share is used to confirm your age, then deleted.',
                },
              ].map(({ icon, text }, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', borderBottom: i < arr.length - 1 ? '0.5px solid #e4e6e8' : 'none' }}>
                  <div style={{ flexShrink: 0, marginTop: 1, color: '#1c2b33' }}>{icon}</div>
                  <p style={{ fontSize: 15, color: '#1c2b33', lineHeight: '20px', letterSpacing: '-0.04px', margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <div style={{ padding: '16px 16px 12px' }}>
              <div style={{
                background: '#0064e0',
                borderRadius: 9999,
                padding: '14px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: continueActive ? 'scale(0.97)' : continueHovered ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
              }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: '#f1f4f7', lineHeight: '19px' }}>Continue</span>
              </div>
            </div>
            <div style={{ height: 34, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8 }}>
              <div style={{ width: 134, height: 5, borderRadius: 9999, background: '#354855' }}/>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

function Screen4AgeVerification({ visible, saveHovered, saveActive }: { visible: boolean; saveHovered?: boolean; saveActive?: boolean }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 20, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Everything rendered at FRAME_W×812 then scaled down */}
      <div style={{ width: FRAME_W, height: 812, transformOrigin: 'top left', transform: `scale(${SCALE})`, position: 'relative', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>

        {/* Scrim over existing screen */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', opacity: visible ? 1 : 0, transition: 'opacity 0.35s ease' }}/>

        {/* Black status bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, background: '#000', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px 0 20px', opacity: visible ? 1 : 0, transition: 'opacity 0.35s ease' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#f1f4f7', letterSpacing: '-0.3px' }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="#f1f4f7"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.8" r="1.2" fill="#f1f4f7"/><path d="M4.8 7.4a4.5 4.5 0 0 1 6.4 0" stroke="#f1f4f7" strokeWidth="1.3" strokeLinecap="round"/><path d="M2 4.6a8 8 0 0 1 12 0" stroke="#f1f4f7" strokeWidth="1.3" strokeLinecap="round"/></svg>
            <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#f1f4f7" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#f1f4f7"/><path d="M23.5 4.5v4a2 2 0 0 0 0-4Z" fill="#f1f4f7" opacity="0.4"/></svg>
          </div>
        </div>

        {/* Bottom sheet — slides up */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 768,
          borderRadius: '32px 32px 0 0',
          background: '#fff',
          overflow: 'hidden',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.44s cubic-bezier(0.32, 0.72, 0, 1)',
        }}>
          {/* Drag handle */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: '#cbd2d9' }}/>
          </div>

          {/* X close */}
          <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="#1c2b33" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Content */}
          <div style={{ padding: '8px 16px 0', flex: 1 }}>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 24, fontWeight: 700, color: '#1c2b33', lineHeight: '30px', letterSpacing: '0.12px', margin: '0 0 10px' }}>Edit your birthday</p>
              <p style={{ fontSize: 15, color: '#1c2b33', lineHeight: '20px', letterSpacing: '-0.04px', margin: 0 }}>This birthday is used for the accounts and profiles in this Accounts Center. Any changes you make will apply to all of them.</p>
            </div>
            {/* Filled text input */}
            <div style={{ border: '1px solid #cbd2d9', borderRadius: 8, padding: '10px 14px' }}>
              <p style={{ fontSize: 12, color: '#465a69', margin: '0 0 2px', letterSpacing: '-0.04px' }}>Birthday (28 years old)</p>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#1c2b33', margin: 0 }}>November 4, 2000</p>
            </div>
          </div>

          {/* Footer: Save button + date picker + indicator */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            {/* Save button */}
            <div style={{ padding: '16px 16px 12px' }}>
              <div style={{
                background: saveActive ? '#0050b3' : '#0064e0',
                borderRadius: 9999, padding: '14px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: saveActive ? 'scale(0.97)' : saveHovered ? 'scale(1.04)' : 'scale(1)',
                transition: 'background 0.1s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
              }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: '#f1f4f7', lineHeight: '19px' }}>Save</span>
              </div>
            </div>

            {/* iOS-style date picker */}
            <div style={{ height: 197, position: 'relative', overflow: 'hidden' }}>
              {/* Selected row highlight — sits behind text via zIndex */}
              <div style={{ position: 'absolute', top: 82, left: 9, right: 9, height: 34, background: '#cbd2d9', borderRadius: 8, zIndex: 0 }}/>
              <div style={{ display: 'flex', height: '100%', position: 'relative', zIndex: 1 }}>
                {/* Month */}
                <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  {['August','September','October','November','December','January','February'].map((m, i) => (
                    <div key={m} style={{ height: 28, display: 'flex', alignItems: 'center', fontSize: i === 3 ? 23 : 20, color: '#1c2b33', opacity: i === 3 ? 1 : 0.20, letterSpacing: '0.36px', whiteSpace: 'nowrap' }}>{m}</div>
                  ))}
                </div>
                {/* Day */}
                <div style={{ flex: '0 0 15%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  {['1','2','3','4','5','6','7'].map((d, i) => (
                    <div key={d} style={{ height: 28, display: 'flex', alignItems: 'center', fontSize: i === 3 ? 23 : 20, color: '#1c2b33', opacity: i === 3 ? 1 : 0.20, letterSpacing: '0.36px' }}>{d}</div>
                  ))}
                </div>
                {/* Year */}
                <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  {['1993','1994','1995','1996','1997','1998','1999'].map((y, i) => (
                    <div key={y} style={{ height: 28, display: 'flex', alignItems: 'center', fontSize: i === 3 ? 23 : 20, color: '#1c2b33', opacity: i === 3 ? 1 : 0.20, letterSpacing: '0.36px' }}>{y}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <div style={{ height: 34, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8 }}>
              <div style={{ width: 134, height: 5, borderRadius: 9999, background: '#354855' }}/>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Checkpoint screen (Figma node 1189:40831) ────────────────────────────
const FRAME_W   = 376
const SCALE     = 290 / FRAME_W
const DISPLAY_W = Math.round(FRAME_W * SCALE)
const DISPLAY_H = Math.round(812 * SCALE)

function Screen3Checkpoint({ btnActive, btnHovered, over16Hovered, over16Active, scrollOffset = 0 }: { btnActive: boolean; btnHovered?: boolean; over16Hovered?: boolean; over16Active?: boolean; scrollOffset?: number }) {
  return (
    <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative', background: '#fff', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>

      {/* Status bar — fixed, never scrolls */}
      <div style={{ position: 'relative', zIndex: 2, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px 0 20px', background: '#fff' }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#1c2b33', letterSpacing: '-0.3px', lineHeight: '20px' }}>9:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="#0c1014"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.8" r="1.2" fill="#0c1014"/><path d="M4.8 7.4a4.5 4.5 0 0 1 6.4 0" stroke="#0c1014" strokeWidth="1.3" strokeLinecap="round"/><path d="M2 4.6a8 8 0 0 1 12 0" stroke="#0c1014" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#0c1014" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#0c1014"/><path d="M23.5 4.5v4a2 2 0 0 0 0-4Z" fill="#0c1014" opacity="0.4"/></svg>
        </div>
      </div>

      {/* Nav bar — fixed, never scrolls */}
      <div style={{ position: 'relative', zIndex: 2, height: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 17px 10px', background: '#fff' }}>
        <img src="/ig-wordmark.png" alt="Instagram" style={{ height: 31, width: 'auto', objectFit: 'contain' }} />
        <svg width="22" height="16" viewBox="0 0 22 16" fill="#0c1014">
          <rect y="0" width="22" height="2.2" rx="1.1"/>
          <rect y="6.9" width="22" height="2.2" rx="1.1"/>
          <rect y="13.8" width="22" height="2.2" rx="1.1"/>
        </svg>
      </div>

      {/* Scrollable body — shifts upward as scrollOffset grows */}
      <div style={{
        transform: `translateY(-${scrollOffset}px)`,
        transition: 'transform 0.88s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        paddingBottom: 130,
      }}>

        {/* Headline — profile photo + title + subtitle */}
        <div style={{ padding: '24px 32px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 13, borderBottom: '0.5px solid #e2e2e2', background: '#fff' }}>
          {/* Profile photo: yellow ring + avatar */}
          <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#FFD23F', padding: 5, flexShrink: 0 }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
              <img src={PHOTOS.mwells77} alt="chchoitoi" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <p style={{ fontSize: 22, fontWeight: 700, color: '#000', lineHeight: '28px', letterSpacing: '0.07px', textAlign: 'center', margin: 0 }}>
            Due to laws in Australia, people under 16 can no longer use social media
          </p>
          <p style={{ fontSize: 14, fontWeight: 400, color: '#737373', lineHeight: '19px', letterSpacing: '-0.16px', textAlign: 'center', margin: 0 }}>
            You'll be able to use your Instagram account on dd/mm/yy
          </p>
        </div>

        {/* What happened */}
        <div style={{ padding: '14px 16px 6px' }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#000', letterSpacing: '-0.32px', lineHeight: '20px', margin: 0 }}>What happened</p>
        </div>
        <div style={{ padding: '8px 16px 14px' }}>
          <p style={{ fontSize: 13.5, color: '#0c1014', lineHeight: '17.5px', letterSpacing: '-0.14px', margin: 0 }}>
            Due to laws in Australia, people under 16 can no longer use social media, including Instagram and Threads.
          </p>
        </div>

        {/* What this means for you */}
        <div style={{ padding: '14px 16px 6px' }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#000', letterSpacing: '-0.32px', lineHeight: '20px', margin: 0 }}>What this means for you</p>
        </div>
        <div style={{ padding: '8px 16px 14px' }}>
          <p style={{ fontSize: 13.5, color: '#0c1014', lineHeight: '17.5px', letterSpacing: '-0.14px', margin: 0 }}>
            You won't be able to use your Instagram account until you're 16, and your profile won't be visible to you or others until then. When you turn 16, we'll let you know you can use Instagram, and your profile, posts, messages and activity will be restored.
          </p>
        </div>

        {/* More information */}
        <div style={{ padding: '14px 16px 6px' }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#000', letterSpacing: '-0.32px', lineHeight: '20px', margin: 0 }}>More information</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 16px 12px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <rect x="3" y="2" width="18" height="20" rx="2.5" stroke="#0c1014" strokeWidth="1.5"/>
            <line x1="7" y1="7" x2="17" y2="7" stroke="#0c1014" strokeWidth="1.4" strokeLinecap="round"/>
            <line x1="7" y1="11" x2="17" y2="11" stroke="#0c1014" strokeWidth="1.4" strokeLinecap="round"/>
            <line x1="7" y1="15" x2="13" y2="15" stroke="#0c1014" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 14, color: '#000', lineHeight: '20px' }}>Learn more about what this means for you</span>
        </div>

      </div>{/* end scrollable body */}

      {/* Bottom button — absolute pinned */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff' }}>
        <div style={{ height: 0.5, background: '#dbdbdb' }} />
        <div style={{ padding: '12px 16px 4px' }}>
          <div style={{
            background: btnActive ? '#3848e0' : '#4a5df9',
            borderRadius: 8, padding: '12px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: btnActive ? 'scale(0.97)' : btnHovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'background 0.1s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: '#fff', letterSpacing: '-0.15px' }}>See next steps</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px 0 10px' }}>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: '#4a5df9', letterSpacing: '-0.15px', display: 'inline-block', transform: over16Active ? 'scale(0.95)' : over16Hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1)' }}>I'm 16 or over</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>
          <div style={{ width: 129, height: 5, borderRadius: 100, background: '#0c1014' }}/>
        </div>
      </div>

    </div>
  )
}

// ── Shared status bar used across new screens ─────────────────────────────
function SBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? '#fff' : '#0c1014'
  return (
    <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px 0 20px', background: dark ? '#000' : '#fff' }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: c, letterSpacing: '-0.3px' }}>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill={c}><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.8" r="1.2" fill={c}/><path d="M4.8 7.4a4.5 4.5 0 0 1 6.4 0" stroke={c} strokeWidth="1.3" strokeLinecap="round"/><path d="M2 4.6a8 8 0 0 1 12 0" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill={c}/><path d="M23.5 4.5v4a2 2 0 0 0 0-4Z" fill={c} opacity="0.4"/></svg>
      </div>
    </div>
  )
}
function HomeInd({ dark = false }: { dark?: boolean }) {
  return (
    <div style={{ height: 34, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8 }}>
      <div style={{ width: 134, height: 5, borderRadius: 100, background: dark ? '#fff' : '#0c1014' }}/>
    </div>
  )
}

// ── REACTIVATION SCREENS ──────────────────────────────────────────────────

// Screen React1: Welcome back dialog over feed (node 1190-70157)
function ScreenReact1({ btnActive, btnHovered }: { btnActive?: boolean; btnHovered?: boolean }) {
  return (
    <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative', background: '#fff', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>

      {/* ── Feed background (no blur) ── */}
      {/* Status bar */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px 0 20px', background: '#fff' }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#0c1014', letterSpacing: '-0.3px' }}>5:26</span>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="#0c1014"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.8" r="1.2" fill="#0c1014"/><path d="M4.8 7.4a4.5 4.5 0 0 1 6.4 0" stroke="#0c1014" strokeWidth="1.3" strokeLinecap="round"/><path d="M2 4.6a8 8 0 0 1 12 0" stroke="#0c1014" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#0c1014" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#0c1014"/><path d="M23.5 4.5v4a2 2 0 0 0 0-4Z" fill="#0c1014" opacity="0.4"/></svg>
        </div>
      </div>
      {/* Nav bar */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: '#fff' }}>
        <img src="/ig-wordmark.png" alt="Instagram" style={{ height: 28, width: 'auto' }} />
        <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.84-7.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9l20-7Z"/></svg>
        </div>
      </div>
      {/* Stories row */}
      <div style={{ display: 'flex', padding: '4px 2px 10px', background: '#fff', borderBottom: '0.5px solid #dbdfe4' }}>
        {/* Your story */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: '4px 8px', flexShrink: 0 }}>
          <div style={{ position: 'relative', width: 58, height: 58 }}>
            <div style={{ width: 58, height: 58, borderRadius: '50%', overflow: 'hidden', border: '1px solid #e0e0e0' }}>
              <img src={PHOTOS.yours} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 18, height: 18, borderRadius: '50%', background: '#3897f0', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="8" height="8" viewBox="0 0 10 10"><path d="M5 2v6M2 5h6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </div>
          </div>
          <span style={{ fontSize: 10, color: '#6a717a' }}>Your story</span>
        </div>
        {/* Find friends — gradient ring */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: '4px 8px', flexShrink: 0 }}>
          <div style={{ width: 58, height: 58, borderRadius: '50%', background: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)', padding: 2 }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid #fff', background: '#e8d5f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#833ab4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
          </div>
          <span style={{ fontSize: 10, color: '#0c1014' }}>Find friends</span>
        </div>
        {[
          { label: 'chantouflowe...', photo: PHOTOS.aimi,  ring: STORY_RING },
          { label: 'aimi.allover',   photo: PHOTOS.mwells77, ring: STORY_RING },
        ].map(({ label, photo, ring }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: '4px 8px', flexShrink: 0 }}>
            <div style={{ width: 58, height: 58, borderRadius: '50%', background: ring, padding: 2 }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid #fff' }}>
                <img src={photo} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            <span style={{ fontSize: 10, color: '#0c1014', maxWidth: 66, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
          </div>
        ))}
      </div>
      {/* Post header */}
      <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 14px', justifyContent: 'space-between', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <img src={PHOTOS.mwells77} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: '#0c1014', margin: 0, lineHeight: '17px' }}>henrythecoloradodog</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#0095f6' }}>Follow</span>
          <svg width="20" height="5" viewBox="0 0 20 5" fill="#0c1014"><circle cx="2.5" cy="2.5" r="2.5"/><circle cx="10" cy="2.5" r="2.5"/><circle cx="17.5" cy="2.5" r="2.5"/></svg>
        </div>
      </div>
      {/* Post image — fills space */}
      <div style={{ width: '100%', height: 330, overflow: 'hidden' }}>
        <img src={PHOTOS.post} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
      </div>
      {/* Tab bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '0.5px solid #dbdfe4' }}>
        <div style={{ display: 'flex', height: 47, alignItems: 'center' }}>
          {['/tab-home.png','/tab-search.png','/tab-add.png','/tab-reels.png','/tab-profile.png'].map((src, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={src} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
            </div>
          ))}
        </div>
        <HomeInd />
      </div>

      {/* ── Dark dimmer over entire screen ── */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,16,20,0.70)', zIndex: 10 }}/>

      {/* ── White status bar text overlay (on top of dimmer) ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, zIndex: 11, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px 0 20px', pointerEvents: 'none' }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '-0.3px' }}>5:26</span>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="#fff"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.8" r="1.2" fill="#fff"/><path d="M4.8 7.4a4.5 4.5 0 0 1 6.4 0" stroke="#fff" strokeWidth="1.3" strokeLinecap="round"/><path d="M2 4.6a8 8 0 0 1 12 0" stroke="#fff" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#fff" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#fff"/><path d="M23.5 4.5v4a2 2 0 0 0 0-4Z" fill="#fff" opacity="0.4"/></svg>
        </div>
      </div>

      {/* ── Promotional dialog — bottom-anchored ── */}
      <div style={{
        position: 'absolute', bottom: 56, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        zIndex: 12,
      }}>
        <div style={{
          width: 342,
          background: '#fff',
          borderRadius: 40,
          overflow: 'hidden',
        }}>
          {/* Illustration */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 28, paddingBottom: 4, height: 128, position: 'relative' }}>
            {/* Colourful illo: three overlapping people-figure circles */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: 192, height: 100 }}>
              {/* Left — person 3 */}
              <div style={{ position: 'absolute', left: 10, width: 74, height: 74, borderRadius: '50%', overflow: 'hidden', border: '3px solid #fff', zIndex: 1 }}>
                <img src="/react-person3.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              {/* Centre — person 2 (slightly larger, on top) */}
              <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: 82, height: 82, borderRadius: '50%', overflow: 'hidden', border: '3px solid #fff', zIndex: 3 }}>
                <img src="/react-person2.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              {/* Right — person 1 — with + badge */}
              <div style={{ position: 'absolute', right: 10, width: 74, height: 74, borderRadius: '50%', overflow: 'hidden', border: '3px solid #fff', zIndex: 2 }}>
                <img src="/react-person1.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
            </div>
          </div>
          {/* Text + buttons */}
          <div style={{ padding: '4px 28px 28px' }}>
            <p style={{ fontSize: 26, fontWeight: 700, color: '#0c1014', lineHeight: '32px', letterSpacing: '-0.2px', margin: '0 0 8px' }}>Welcome back to Instagram!</p>
            <p style={{ fontSize: 14, color: '#0c1014', lineHeight: '18px', margin: '0 0 24px' }}>It's good to see you again. Catch up on what you might have missed while you were away.</p>
            <div style={{
              background: btnActive ? '#3d47d9' : '#5751f0',
              borderRadius: 12, padding: '12px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 12,
              transform: btnActive ? 'scale(0.97)' : btnHovered ? 'scale(1.02)' : 'scale(1)',
              transition: 'background 0.1s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
            }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Continue</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#5751f0' }}>Not now</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── White home indicator (on dark bg) ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 34, zIndex: 13, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8 }}>
        <div style={{ width: 134, height: 5, borderRadius: 100, background: '#fff' }}/>
      </div>
    </div>
  )
}

// Screen React2: Turn on notifications (node 1190-70115)
function ScreenReact2({ btnActive, btnHovered }: { btnActive?: boolean; btnHovered?: boolean }) {
  return (
    <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative', background: '#fff', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      <SBar />
      {/* X close */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4l14 14M18 4L4 18" stroke="#0c1014" strokeWidth="1.8" strokeLinecap="round"/></svg>
      </div>
      {/* Headline */}
      <div style={{ padding: '8px 28px 0' }}>
        <p style={{ fontSize: 20, fontWeight: 700, color: '#0c1014', lineHeight: '25px', letterSpacing: '-0.45px', margin: '0 0 8px' }}>Turn on notifications</p>
        <p style={{ fontSize: 14, color: '#6a717a', lineHeight: '18px', margin: 0 }}>Pick up right where you left off. Stay updated with likes, comments and new followers.</p>
      </div>
      {/* Illo */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '48px 0' }}>
        <svg width="130" height="130" viewBox="0 0 130 130" fill="none">
          {/* Notification bubble */}
          <rect x="25" y="15" width="80" height="70" rx="16" stroke="url(#ng)" strokeWidth="3" fill="none"/>
          <path d="M55 85v5a10 10 0 0 0 20 0v-5" stroke="url(#ng)" strokeWidth="3" strokeLinecap="round" fill="none"/>
          {/* Heart */}
          <path d="M65 55 C65 55 50 44 50 36 a8 8 0 0 1 15-3 a8 8 0 0 1 15 3 C80 44 65 55 65 55Z" fill="url(#ng)"/>
          <defs>
            <linearGradient id="ng" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#f09433"/>
              <stop offset="0.5" stopColor="#e6683c"/>
              <stop offset="1" stopColor="#bc1888"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Bottom buttons */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <div style={{ padding: '0 16px 12px' }}>
          <div style={{
            background: btnActive ? '#3d47d9' : '#5751f0',
            borderRadius: 12, padding: '13px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: btnActive ? 'scale(0.97)' : btnHovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'background 0.1s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Turn on notifications</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#0c1014' }}>Skip</span>
        </div>
        <HomeInd />
      </div>
    </div>
  )
}

// Screen React3: Sync contacts (node 1190-70101)
function ScreenReact3({ btnActive, btnHovered }: { btnActive?: boolean; btnHovered?: boolean }) {
  const bullets = [
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, text: "We'll use your contacts to help you connect with friends who joined while you were away and recommend things you care about." },
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>, text: "Your contacts will be periodically synced and stored securely on our servers." },
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 0 0 4.93 19.07M4.93 4.93A10 10 0 0 1 19.07 19.07"/></svg>, text: "You can turn off syncing at any time in Settings." },
  ]
  return (
    <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative', background: '#fff', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      <SBar />
      {/* X close */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4l14 14M18 4L4 18" stroke="#0c1014" strokeWidth="1.8" strokeLinecap="round"/></svg>
      </div>
      {/* Headline */}
      <div style={{ padding: '8px 28px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 20, fontWeight: 700, color: '#0c1014', lineHeight: '25px', letterSpacing: '-0.45px', margin: '0 0 8px' }}>Instagram is more fun with friends. Sync your contacts to see who joined while you were away.</p>
        <p style={{ fontSize: 14, color: '#737373', lineHeight: '18px', margin: 0 }}>Allowing access to your contacts helps us offer you a better service.</p>
      </div>
      {/* Bullet list */}
      <div style={{ padding: '0 28px' }}>
        {bullets.map(({ icon, text }, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 18 }}>
            <div style={{ flexShrink: 0, marginTop: 2 }}>{icon}</div>
            <p style={{ fontSize: 14, color: '#0c1014', lineHeight: '18px', margin: 0 }}>{text}</p>
          </div>
        ))}
      </div>
      {/* Bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <p style={{ fontSize: 12, color: '#6a717a', textAlign: 'center', lineHeight: '16px', margin: '0 16px 12px', letterSpacing: '0.1px' }}>By tapping Next, you can choose to sync your contacts or skip this step.</p>
        <div style={{ padding: '0 16px 10px' }}>
          <div style={{
            background: btnActive ? '#3d47d9' : '#5751f0',
            borderRadius: 12, padding: '13px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: btnActive ? 'scale(0.97)' : btnHovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'background 0.1s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Next</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#0c1014' }}>Skip</span>
        </div>
        <HomeInd />
      </div>
    </div>
  )
}

// Screen React4: Discover People (node 1190-69949)
function ScreenReact4() {
  const people = [
    { name: 'Sarah', handle: 'spacefairy.88', photo: PHOTOS.mwells77 },
    { name: 'Peter Young', handle: 'pyoung.21', photo: PHOTOS.aimi },
    { name: 'jessjess', handle: 'jessjess.1018', photo: PHOTOS.alex },
    { name: 'Jennifer Giggles', handle: 'jennifer.giggles', photo: PHOTOS.shayli },
    { name: 'tiffany wong', handle: 't.wong', photo: PHOTOS.mwells77 },
    { name: 'benny ko', handle: 'bennyknockout', photo: PHOTOS.aimi },
  ]
  return (
    <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative', background: '#fff', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      <SBar />
      {/* Nav */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4l14 14M18 4L4 18" stroke="#0c1014" strokeWidth="1.8" strokeLinecap="round"/></svg>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#0c1014', letterSpacing: '-0.3px' }}>Discover People</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#0095f6' }}>Skip</span>
      </div>
      {/* People list */}
      <div style={{ overflowY: 'hidden', height: 580 }}>
        {people.map(({ name, handle, photo }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
              <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#0c1014', margin: 0, lineHeight: '18px' }}>{name}</p>
              <p style={{ fontSize: 12, color: '#737373', margin: 0, lineHeight: '16px' }}>{handle}</p>
            </div>
            <div style={{ background: '#5751f0', borderRadius: 8, padding: '6px 16px', flexShrink: 0 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Follow</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.5 1.5l11 11M12.5 1.5l-11 11" stroke="#737373" strokeWidth="1.4" strokeLinecap="round"/></svg>
          </div>
        ))}
      </div>
      {/* Bottom Next */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '0.5px solid #dbdfe4', padding: '12px 16px' }}>
        <div style={{ background: '#5751f0', borderRadius: 12, padding: '13px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Next</span>
        </div>
        <HomeInd />
      </div>
    </div>
  )
}

// ── PARENTAL VIEW SCREENS ─────────────────────────────────────────────────

// Screen Parent1: Notifications feed (node 8450-41163)
function ScreenParent1({ notifHovered, notifActive }: { notifHovered?: boolean; notifActive?: boolean }) {
  return (
    <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative', background: '#fff', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      <SBar />
      {/* Nav */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', gap: 6, padding: '0 16px' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#0c1014', letterSpacing: '-0.3px' }}>Notifications</span>
      </div>
      {/* Section: Today */}
      <div style={{ padding: '10px 16px 4px' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0c1014' }}>Today</span>
      </div>
      {/* Key notification — tappable */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 16px',
        background: notifActive ? '#f0f0f0' : notifHovered ? '#f8f8f8' : '#fff',
        transition: 'background 0.15s ease',
        cursor: 'pointer',
      }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e0e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#465a69" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, color: '#0c1014', lineHeight: '18px', margin: '0 0 2px' }}>
            <span style={{ fontWeight: 400 }}>Due to laws in Australia, </span>
            <span style={{ fontWeight: 600 }}>{'{username}'}</span>
            <span style={{ fontWeight: 400 }}> won't be able to use Instagram until they turn 16. This means supervision has been removed. </span>
            <span style={{ color: '#737373', fontSize: 12 }}>1h</span>
          </p>
        </div>
      </div>
      {/* Another notification */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
          <img src={PHOTOS.mwells77} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, color: '#0c1014', lineHeight: '18px', margin: 0 }}>
            <span style={{ fontWeight: 600 }}>pierre_thecomet</span>
            <span> started following you. </span>
            <span style={{ color: '#737373', fontSize: 12 }}>2h</span>
          </p>
        </div>
        <div style={{ background: '#5751f0', borderRadius: 8, padding: '5px 12px', flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>Follow back</span>
        </div>
      </div>
      {/* Section: Yesterday */}
      <div style={{ padding: '10px 16px 4px' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0c1014' }}>Yesterday</span>
      </div>
      {[
        { name: 'alex.anyways18', action: ' liked your post.', time: '1d', photo: PHOTOS.alex },
        { name: 'theo.rivers_',   action: ' liked your post.', time: '1d', photo: '/react-person1.png' },
        { name: 'maya_wu',        action: ' liked your post.', time: '1d', photo: '/react-person2.png' },
        { name: 'celine.m_art',   action: ' liked your post.', time: '1d', photo: '/react-person3.png' },
      ].map(({ name, action, time, photo }, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderTop: i === 0 ? '0.5px solid #f0f0f0' : 'none' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, color: '#0c1014', lineHeight: '18px', margin: 0 }}>
              <span style={{ fontWeight: 600 }}>{name}</span><span>{action} </span>
              <span style={{ color: '#737373', fontSize: 12 }}>{time}</span>
            </p>
          </div>
        </div>
      ))}
      {/* Tab bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '0.5px solid #dbdfe4' }}>
        <div style={{ display: 'flex', height: 47, alignItems: 'center' }}>
          {['/tab-home.png','/tab-search.png','/tab-add.png','/tab-reels.png','/tab-profile.png'].map((src, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={src} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
            </div>
          ))}
        </div>
        <HomeInd />
      </div>
    </div>
  )
}

// Screen Parent2: Supervision removed detail sheet (node 8450-41200)
function ScreenParent2({ visible }: { visible: boolean }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 20, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ width: FRAME_W, height: 812, transformOrigin: 'top left', transform: `scale(${SCALE})`, position: 'relative', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
        {/* Scrim */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', opacity: visible ? 1 : 0, transition: 'opacity 0.35s ease' }}/>
        {/* Dark status bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, background: '#0f191e', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px 0 20px', opacity: visible ? 1 : 0, transition: 'opacity 0.35s ease' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '-0.3px' }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="#fff"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.8" r="1.2" fill="#fff"/><path d="M4.8 7.4a4.5 4.5 0 0 1 6.4 0" stroke="#fff" strokeWidth="1.3" strokeLinecap="round"/><path d="M2 4.6a8 8 0 0 1 12 0" stroke="#fff" strokeWidth="1.3" strokeLinecap="round"/></svg>
            <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#fff" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#fff"/><path d="M23.5 4.5v4a2 2 0 0 0 0-4Z" fill="#fff" opacity="0.4"/></svg>
          </div>
        </div>
        {/* Bottom sheet */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 640,
          borderRadius: '24px 24px 0 0',
          background: '#fff',
          overflow: 'hidden',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.44s cubic-bezier(0.32,0.72,0,1)',
        }}>
          {/* Handle */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: '#cbd2d9' }}/>
          </div>
          {/* Nav bar */}
          <div style={{ height: 54, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4l14 14M18 4L4 18" stroke="#0a1317" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
          {/* Content */}
          <div style={{ padding: '0 16px' }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: '#0a1317', lineHeight: '28px', margin: '0 0 20px' }}>
              Supervision for {'{username}'} has been removed
            </p>
            {/* User card */}
            <div style={{ border: '1px solid #dee3e9', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src={PHOTOS.mwells77} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 500, color: '#0a1317', margin: '0 0 2px' }}>{'{username}'}</p>
                <p style={{ fontSize: 14, color: '#465a69', margin: 0 }}>Supervision is removed</p>
              </div>
            </div>
            {/* Info items */}
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#0a1317" strokeWidth="1.6"/><line x1="12" y1="8" x2="12" y2="12" stroke="#0a1317" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#0a1317"/></svg>,
                title: 'Why this happened',
                body: 'Due to laws in Australia, people under 16 can no longer use Instagram until they turn 16.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#0a1317" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9 22 9 12 15 12 15 22" stroke="#0a1317" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                title: 'What this means',
                body: 'Supervision for your teen on Instagram has been removed. Once your teen turns 16, you can set up supervision again.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="#0a1317" strokeWidth="1.6"/><path d="M19.07 4.93A10 10 0 0 0 4.93 19.07M4.93 4.93A10 10 0 0 1 19.07 19.07" stroke="#0a1317" strokeWidth="1.6" strokeLinecap="round"/></svg>,
                title: 'How to support your teen',
                body: "If your teen is 16 or over, you can work with them to review their birthday. ",
              },
            ].map(({ icon, title, body }, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 18 }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}>{icon}</div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 500, color: '#0a1317', margin: '0 0 3px' }}>{title}</p>
                  <p style={{ fontSize: 14, color: '#465a69', lineHeight: '19px', margin: 0 }}>{body}{i === 2 && <span style={{ color: '#0064e0', fontWeight: 500 }}>Learn more</span>}</p>
                </div>
              </div>
            ))}
          </div>
          {/* OK button */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px' }}>
            <div style={{ background: '#0064e0', borderRadius: 9999, padding: '13px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: '#fff' }}>OK</span>
            </div>
            <HomeInd />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── SIGN UP FLOW SCREENS ──────────────────────────────────────────────────

// Instagram gradient icon shared by sign-up screens
function IgGradientIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="igG" x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="#f09433"/><stop offset="0.25" stopColor="#e6683c"/>
          <stop offset="0.5" stopColor="#dc2743"/><stop offset="0.75" stopColor="#cc2366"/>
          <stop offset="1" stopColor="#bc1888"/>
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="48" height="48" rx="13" stroke="url(#igG)" strokeWidth="3.5" fill="none"/>
      <circle cx="28" cy="28" r="11" stroke="url(#igG)" strokeWidth="3.5" fill="none"/>
      <circle cx="40" cy="15.5" r="3" fill="url(#igG)"/>
    </svg>
  )
}

// Screen Signup1: App cold start splash (node 4-273597)
function ScreenSignup1() {
  return (
    <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative', background: '#fff', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <SBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <IgGradientIcon size={72} />
      </div>
      <div style={{ paddingBottom: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 11, color: '#6a717a', letterSpacing: '0.2px' }}>from</span>
        <svg width="60" height="14" viewBox="0 0 60 14" fill="none">
          <text x="0" y="12" fontFamily="-apple-system, sans-serif" fontSize="13" fontWeight="600" fill="#cc1a8e">∞ Meta</text>
        </svg>
      </div>
      <HomeInd />
    </div>
  )
}

// Screen Signup2: Login / Create account (node 4-117705)
function ScreenSignup2({ createHovered, createActive }: { createHovered?: boolean; createActive?: boolean }) {
  return (
    <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative', background: 'linear-gradient(160deg,#f0f4ff 0%,#e8f0fe 40%,#f5f0ff 100%)', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      <SBar />
      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
        <IgGradientIcon size={64} />
      </div>
      {/* Input fields */}
      <div style={{ padding: '52px 18px 0' }}>
        <div style={{ border: '1px solid #cbd2d9', borderRadius: 10, padding: '12px 14px', marginBottom: 12, background: '#fff' }}>
          <p style={{ fontSize: 15, color: '#8595a4', margin: 0 }}>Username, mobile number or email</p>
        </div>
        <div style={{ border: '1px solid #cbd2d9', borderRadius: 10, padding: '12px 14px', marginBottom: 16, background: '#fff' }}>
          <p style={{ fontSize: 15, color: '#8595a4', margin: 0 }}>Password</p>
        </div>
        <div style={{ background: '#0064e0', borderRadius: 9999, padding: '13px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 500, color: '#fff', letterSpacing: '-0.08px' }}>Log in</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 0' }}>
          <span style={{ fontSize: 16, fontWeight: 500, color: '#1c2b33' }}>Forgot password?</span>
        </div>
      </div>
      {/* Create new account button */}
      <div style={{ position: 'absolute', bottom: 72, left: 17, right: 17 }}>
        <div style={{
          border: '1px solid #0064e0', borderRadius: 9999,
          padding: '12px 0', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: createActive ? 'scale(0.97)' : createHovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
          background: createActive ? 'rgba(0,100,224,0.06)' : 'transparent',
        }}>
          <span style={{ fontSize: 15, color: '#0064e0', letterSpacing: '-0.08px' }}>Create new account</span>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 42, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <span style={{ fontSize: 12, color: '#6a717a' }}>∞ Meta</span>
      </div>
      <HomeInd />
    </div>
  )
}

// Screen Signup3: Name entry (node 4-117707) — zoom-through
function ScreenSignup3() {
  return (
    <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative', background: 'linear-gradient(160deg,#f0f4ff 0%,#e8f0fe 40%,#f5f0ff 100%)', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      <SBar />
      <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
      </div>
      <div style={{ padding: '0 20px' }}>
        <p style={{ fontSize: 24, fontWeight: 700, color: '#1c2b33', letterSpacing: '0.12px', lineHeight: '30px', margin: '0 0 6px' }}>What's your name?</p>
        <p style={{ fontSize: 15, color: '#465a69', lineHeight: '20px', margin: '0 0 28px' }}>Add your name so friends can find you.</p>
        <div style={{ border: '1.5px solid #0064e0', borderRadius: 10, padding: '12px 14px', background: '#fff', marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: '#465a69', margin: '0 0 2px' }}>Full name</p>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#1c2b33', margin: 0 }}>Alex Chen</p>
        </div>
        <div style={{ background: '#0064e0', borderRadius: 9999, padding: '13px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>Next</span>
        </div>
      </div>
    </div>
  )
}

// Screen Signup4: Username entry (node 4-117709) — zoom-through
function ScreenSignup4() {
  return (
    <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative', background: 'linear-gradient(160deg,#f0f4ff 0%,#e8f0fe 40%,#f5f0ff 100%)', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      <SBar />
      <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
      </div>
      <div style={{ padding: '0 20px' }}>
        <p style={{ fontSize: 24, fontWeight: 700, color: '#1c2b33', letterSpacing: '0.12px', lineHeight: '30px', margin: '0 0 6px' }}>Create a username</p>
        <p style={{ fontSize: 15, color: '#465a69', lineHeight: '20px', margin: '0 0 28px' }}>You'll use this to log in and it will be visible on your profile.</p>
        <div style={{ border: '1.5px solid #0064e0', borderRadius: 10, padding: '12px 14px', background: '#fff', marginBottom: 8 }}>
          <p style={{ fontSize: 12, color: '#465a69', margin: '0 0 2px' }}>Username</p>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#1c2b33', margin: 0 }}>alex.anyways18</p>
        </div>
        <p style={{ fontSize: 12, color: '#0064e0', margin: '0 0 20px' }}>alex.anyways18 is available</p>
        <div style={{ background: '#0064e0', borderRadius: 9999, padding: '13px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>Next</span>
        </div>
      </div>
    </div>
  )
}

// Screen Signup5: Birthday (node 4-117710) — slow down + focus
function ScreenSignup5({ btnActive, btnHovered }: { btnActive?: boolean; btnHovered?: boolean }) {
  return (
    <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative', background: 'linear-gradient(160deg,#f0f4ff 0%,#e8f0fe 40%,#f5f0ff 100%)', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      <SBar />
      <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
      </div>
      <div style={{ padding: '0 20px' }}>
        <p style={{ fontSize: 24, fontWeight: 700, color: '#1c2b33', letterSpacing: '0.12px', lineHeight: '30px', margin: '0 0 5px' }}>What's your birthday?</p>
        <p style={{ fontSize: 15, color: '#465a69', lineHeight: '20px', margin: '0 0 24px' }}>
          Use your own birthday, even if this account is for a business, a pet or something else. No one else will see this on your profile.{' '}
          <span style={{ color: '#0064e0' }}>Why do I need to provide my birthday?</span>
        </p>
        <div style={{ border: '1px solid #cbd2d9', borderRadius: 10, padding: '10px 14px', background: '#fff', marginBottom: 14 }}>
          <p style={{ fontSize: 12, color: '#465a69', margin: '0 0 2px' }}>Birthday (14 years old)</p>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#1c2b33', margin: 0 }}>November 4, 2011</p>
        </div>
        <div style={{
          background: btnActive ? '#0050b3' : '#0064e0',
          borderRadius: 20, padding: '13px 0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: btnActive ? 'scale(0.97)' : btnHovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'background 0.1s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
          marginBottom: 0,
        }}>
          <span style={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>Next</span>
        </div>
      </div>
      {/* Date picker at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#ededed', height: 228 }}>
        <div style={{ height: 197, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 82, left: 9, right: 9, height: 34, background: '#d8d8d8', borderRadius: 8, zIndex: 0 }}/>
          <div style={{ display: 'flex', height: '100%', position: 'relative', zIndex: 1 }}>
            <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              {['August','September','October','November','December','January','February'].map((m, i) => (
                <div key={m} style={{ height: 28, display: 'flex', alignItems: 'center', fontSize: i === 3 ? 23 : 20, color: '#1c2b33', opacity: i === 3 ? 1 : 0.22, letterSpacing: '0.36px', whiteSpace: 'nowrap' }}>{m}</div>
              ))}
            </div>
            <div style={{ flex: '0 0 15%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              {['1','2','3','4','5','6','7'].map((d, i) => (
                <div key={d} style={{ height: 28, display: 'flex', alignItems: 'center', fontSize: i === 3 ? 23 : 20, color: '#1c2b33', opacity: i === 3 ? 1 : 0.22 }}>{d}</div>
              ))}
            </div>
            <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              {['2008','2009','2010','2011','2012','2013','2014'].map((y, i) => (
                <div key={y} style={{ height: 28, display: 'flex', alignItems: 'center', fontSize: i === 3 ? 23 : 20, color: '#1c2b33', opacity: i === 3 ? 1 : 0.22 }}>{y}</div>
              ))}
            </div>
          </div>
        </div>
        <HomeInd />
      </div>
    </div>
  )
}

// Screen Signup6: Under-16 warning (node 4-117716)
function ScreenSignup6() {
  return (
    <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative', background: 'linear-gradient(160deg,#f0f4ff 0%,#e8f0fe 40%,#f5f0ff 100%)', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      <SBar />
      <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
      </div>
      <div style={{ padding: '0 20px' }}>
        <p style={{ fontSize: 24, fontWeight: 700, color: '#1c2b33', letterSpacing: '0.12px', lineHeight: '30px', margin: '0 0 16px' }}>You're not old enough to create an account in Australia</p>
        <p style={{ fontSize: 15, color: '#465a69', lineHeight: '20px', margin: '0 0 24px' }}>
          Due to laws in Australia, you need to be at least 16 years old to create an account. You can try again when you turn 16.
        </p>
        <div style={{ background: '#0064e0', borderRadius: 9999, padding: '13px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>OK</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span style={{ fontSize: 15, color: '#1c2b33', fontWeight: 500 }}>Update birthday</span>
        </div>
      </div>
    </div>
  )
}

// Screen Signup7: Account type / private prompt (node 4-117711)
function ScreenSignup7() {
  return (
    <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative', background: 'linear-gradient(160deg,#f0f4ff 0%,#e8f0fe 40%,#f5f0ff 100%)', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      <SBar />
      <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
      </div>
      <div style={{ padding: '0 20px' }}>
        <p style={{ fontSize: 24, fontWeight: 700, color: '#1c2b33', letterSpacing: '0.12px', lineHeight: '30px', margin: '0 0 8px' }}>Set your account to private</p>
        <p style={{ fontSize: 15, color: '#465a69', lineHeight: '20px', margin: '0 0 28px' }}>
          With a private account, only people you approve can see your photos and videos.
        </p>
        <div style={{ background: '#fff', border: '1px solid #dee3e9', borderRadius: 14, padding: '16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a1317" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#0a1317', margin: '0 0 2px' }}>Private account</p>
            <p style={{ fontSize: 13, color: '#465a69', margin: 0 }}>Only approved followers can see your content</p>
          </div>
        </div>
        <div style={{ background: '#0064e0', borderRadius: 9999, padding: '13px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>Continue</span>
        </div>
      </div>
    </div>
  )
}

// Screen Signup8: "We couldn't create an account" alert over login (node 1190-71984)
function ScreenSignup8({ alertVisible }: { alertVisible?: boolean }) {
  return (
    <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative', background: 'linear-gradient(160deg,#f0f4ff 0%,#e8f0fe 40%,#f5f0ff 100%)', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      {/* Dimmed login screen behind */}
      <div style={{ position: 'absolute', inset: 0, opacity: alertVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.42)', zIndex: 1 }}/>
        <SBar />
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
          <IgGradientIcon size={64} />
        </div>
        <div style={{ padding: '52px 18px 0' }}>
          <div style={{ border: '1px solid #cbd2d9', borderRadius: 10, padding: '12px 14px', marginBottom: 12, background: '#fff' }}>
            <p style={{ fontSize: 15, color: '#8595a4', margin: 0 }}>Username, mobile number or email</p>
          </div>
          <div style={{ border: '1px solid #cbd2d9', borderRadius: 10, padding: '12px 14px', marginBottom: 16, background: '#fff' }}>
            <p style={{ fontSize: 15, color: '#8595a4', margin: 0 }}>Password</p>
          </div>
          <div style={{ background: '#0064e0', borderRadius: 9999, padding: '13px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>Log in</span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 72, left: 17, right: 17 }}>
          <div style={{ border: '1px solid #0064e0', borderRadius: 9999, padding: '12px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 15, color: '#0064e0' }}>Create new account</span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 42, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <span style={{ fontSize: 12, color: '#6a717a' }}>∞ Meta</span>
        </div>
      </div>
      {/* iOS-style alert */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: alertVisible ? 1 : 0,
        transform: alertVisible ? 'scale(1)' : 'scale(0.92)',
        transition: 'opacity 0.28s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
        pointerEvents: 'none',
      }}>
        <div style={{
          background: 'rgba(242,242,242,0.92)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderRadius: 14,
          width: 270,
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
        }}>
          <div style={{ padding: '18px 18px 14px', textAlign: 'center' }}>
            <p style={{ fontSize: 17, fontWeight: 600, color: '#000', lineHeight: '22px', margin: '0 0 6px', letterSpacing: '-0.41px' }}>We couldn't create an account for you</p>
            <p style={{ fontSize: 15, color: '#000', lineHeight: '20px', margin: 0, letterSpacing: '-0.24px' }}>We were not able to sign you up for Instagram.</p>
          </div>
          <div style={{ borderTop: '0.5px solid rgba(60,60,67,0.36)', padding: '12px 0', display: 'flex', justifyContent: 'center' }}>
            <span style={{ fontSize: 17, fontWeight: 600, color: '#007aff', letterSpacing: '-0.41px' }}>OK</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Pixel-faithful phone mockup (Figma node 2824:192571) ─────────────────
function PhoneMockup({ activeFeature = 0, activePath = 'under16', onPathComplete }: { activeFeature?: number; activePath?: 'under16' | 'over16'; onPathComplete?: () => void }) {
  // Screen slide state
  const [screenIdx, setScreenIdx] = React.useState(0)

  // Checkpoint scroll simulation
  const [checkScroll, setCheckScroll] = React.useState(0)

  // Age verification bottom sheet
  const [showAgeSheet,        setShowAgeSheet]        = React.useState(false)
  const [showAgeConfirmSheet, setShowAgeConfirmSheet] = React.useState(false)
  const [showAgeMethodSheet,  setShowAgeMethodSheet]  = React.useState(false)
  const [saveHovered,         setSaveHovered]         = React.useState(false)
  const [saveActive,          setSaveActive]          = React.useState(false)
  const [continueHovered,     setContinueHovered]     = React.useState(false)
  const [continueActive,      setContinueActive]      = React.useState(false)

  // Glass cursor state
  const [cx, setCx]             = React.useState(DISPLAY_W / 2)
  const [cy, setCy]             = React.useState(DISPLAY_H / 2)
  const [cursorOpacity, setCursorOpacity] = React.useState(0)
  const [cursorScale,   setCursorScale]   = React.useState(1)
  const [btnActive,     setBtnActive]     = React.useState(false)
  const [btnHovered,    setBtnHovered]    = React.useState(false)
  const [over16Hovered, setOver16Hovered] = React.useState(false)
  const [over16Active,  setOver16Active]  = React.useState(false)
  const [screenZoom,    setScreenZoom]    = React.useState(1)
  const [zoomOrigin,    setZoomOrigin]    = React.useState({ x: DISPLAY_W / 2, y: DISPLAY_H / 2 })

  // Parental view: supervision removed sheet
  const [showParentSheet, setShowParentSheet] = React.useState(false)
  // Sign up: alert overlay on final screen
  const [showSignupAlert, setShowSignupAlert] = React.useState(false)
  // Notification hover for parental view
  const [notifHovered, setNotifHovered] = React.useState(false)
  const [notifActive,  setNotifActive]  = React.useState(false)
  // "Create new account" hover
  const [createHovered, setCreateHovered] = React.useState(false)
  const [createActive,  setCreateActive]  = React.useState(false)

  // coords — feature-dependent
  const BTN_X    = DISPLAY_W / 2
  const BTN_Y    = activeFeature === 0 ? Math.round(374 * SCALE) : Math.round(718 * SCALE)
  const OVER16_X = DISPLAY_W / 2
  const OVER16_Y = activeFeature === 0 ? Math.round(416 * SCALE) : Math.round(775 * SCALE)
  const BACK_X   = Math.round(27 * SCALE)
  const BACK_Y   = Math.round(73 * SCALE)

  // Helper
  const move = (x: number, y: number) => { setCx(x); setCy(y) }

  React.useEffect(() => {
    let alive = true
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

    async function tapBtn(bx: number, by: number, onHover: (v: boolean) => void, onActive: (v: boolean) => void, zoom = false) {
      move(bx, by); await sleep(550)
      if (zoom) { setZoomOrigin({ x: bx, y: by }); setScreenZoom(1.42) }
      onHover(true); await sleep(zoom ? 600 : 450)
      setCursorScale(0.78); onActive(true); onHover(false); await sleep(145)
      setCursorScale(1);    onActive(false); await sleep(120)
      if (zoom) { await sleep(0) }
    }

    async function run() {
      await sleep(900)
      if (!alive) return

      // ─────────────────────────────────────────────────────────────────
      // Feature 0: Advanced Notifications
      // Feature 1: Checkpoint
      // ─────────────────────────────────────────────────────────────────
      if (activeFeature === 0 || activeFeature === 1) {
        if (activeFeature === 0) {
          move(160, Math.round(148 * SCALE)); setCursorOpacity(0)
          await sleep(50); setCursorOpacity(0.82); await sleep(600)
          move(105, Math.round(155 * SCALE)); await sleep(800)
          move(200, Math.round(152 * SCALE)); await sleep(700)
          move(155, Math.round(190 * SCALE)); await sleep(700)
          move(90,  Math.round(210 * SCALE)); await sleep(900)
          move(160, Math.round(222 * SCALE)); await sleep(700)
          move(75,  Math.round(230 * SCALE)); await sleep(800)
          move(195, Math.round(258 * SCALE)); await sleep(900)
          move(105, Math.round(270 * SCALE)); await sleep(800)
          move(170, Math.round(278 * SCALE)); await sleep(700)
        } else {
          move(DISPLAY_W / 2, Math.round(148 * SCALE)); setCursorOpacity(0)
          await sleep(50); setCursorOpacity(0.82); await sleep(300)
          move(150, Math.round(168 * SCALE)); await sleep(500)
          move(210, Math.round(192 * SCALE)); await sleep(450)
          move(170, Math.round(290 * SCALE)); await sleep(550)
          move(90,  Math.round(308 * SCALE)); await sleep(450)
          move(195, Math.round(375 * SCALE)); await sleep(500)
          move(100, Math.round(410 * SCALE)); await sleep(450)
          move(DISPLAY_W / 2, Math.round(450 * SCALE)); await sleep(350)
          setCheckScroll(120)
          move(DISPLAY_W / 2, Math.round(320 * SCALE)); await sleep(950)
          move(160, Math.round(440 * SCALE)); await sleep(500)
          move(220, Math.round(460 * SCALE)); await sleep(450)
        }
        if (!alive) return
        if (activePath === 'under16') {
          move(BTN_X, BTN_Y); await sleep(600)
          setZoomOrigin({ x: BTN_X, y: BTN_Y }); setScreenZoom(1.42); setBtnHovered(true); await sleep(650)
          setCursorScale(0.78); setBtnActive(true); setBtnHovered(false); await sleep(150)
          setCursorScale(1);   setBtnActive(false); await sleep(130)
          if (!alive) return
          setScreenIdx(1); await sleep(320); setScreenZoom(1); await sleep(400)
          setCursorOpacity(0); move(160, Math.round(200 * SCALE)); await sleep(100)
          setCursorOpacity(0.82); await sleep(400)
          move(100, Math.round(240 * SCALE)); await sleep(900)
          move(200, Math.round(260 * SCALE)); await sleep(800)
          move(80,  Math.round(300 * SCALE)); await sleep(900)
          move(BACK_X, BACK_Y); await sleep(800)
          setCursorScale(0.78); await sleep(150); setCursorScale(1); await sleep(120)
          if (!alive) return
          setScreenIdx(0); await sleep(500)
          if (activeFeature === 1) { setCheckScroll(0); await sleep(300) }
          setCursorOpacity(0); await sleep(500)
        } else {
          move(OVER16_X, OVER16_Y); await sleep(600)
          setZoomOrigin({ x: OVER16_X, y: OVER16_Y }); setScreenZoom(1.42); setOver16Hovered(true); await sleep(650)
          setCursorScale(0.78); setOver16Active(true); setOver16Hovered(false); await sleep(150)
          setCursorScale(1);    setOver16Active(false); await sleep(130)
          if (!alive) return
          setShowAgeSheet(true); setScreenZoom(1); await sleep(650)
          move(DISPLAY_W / 2, Math.round(200 * SCALE)); await sleep(600)
          move(145, Math.round(360 * SCALE)); await sleep(550)
          move(90,  Math.round(640 * SCALE)); await sleep(700)
          move(215, Math.round(640 * SCALE)); await sleep(650)
          move(295, Math.round(640 * SCALE)); await sleep(600)
          const SAVE_Y = Math.round(545 * SCALE)
          move(DISPLAY_W / 2, SAVE_Y); await sleep(700)
          setSaveHovered(true); await sleep(600)
          setCursorScale(0.78); setSaveActive(true); setSaveHovered(false); await sleep(150)
          setCursorScale(1);    setSaveActive(false); await sleep(130)
          if (!alive) return
          setShowAgeConfirmSheet(true); await sleep(750)
          move(DISPLAY_W / 2, Math.round(330 * SCALE)); await sleep(600)
          move(DISPLAY_W / 2 - 20, Math.round(415 * SCALE)); await sleep(550)
          move(DISPLAY_W / 2 - 10, Math.round(465 * SCALE)); await sleep(500)
          move(DISPLAY_W / 2,      Math.round(510 * SCALE)); await sleep(500)
          const CONT_Y = Math.round(742 * SCALE)
          move(DISPLAY_W / 2, CONT_Y); await sleep(700)
          setContinueHovered(true); await sleep(600)
          setCursorScale(0.78); setContinueActive(true); setContinueHovered(false); await sleep(150)
          setCursorScale(1);    setContinueActive(false); await sleep(130)
          if (!alive) return
          setShowAgeMethodSheet(true); await sleep(700)
          move(DISPLAY_W / 2, Math.round(285 * SCALE)); await sleep(700)
          move(DISPLAY_W / 2, Math.round(410 * SCALE)); await sleep(750)
          move(DISPLAY_W / 2 - 15, Math.round(455 * SCALE)); await sleep(600)
          setCursorOpacity(0); await sleep(500)
          setShowAgeMethodSheet(false); await sleep(320)
          setShowAgeConfirmSheet(false); await sleep(260)
          setShowAgeSheet(false)
          if (activeFeature === 1) { setCheckScroll(0) }
          await sleep(400)
        }

      // ─────────────────────────────────────────────────────────────────
      // Feature 2: Reactivation (4 screens)
      // ─────────────────────────────────────────────────────────────────
      } else if (activeFeature === 2) {
        // Screen 0: Welcome back dialog
        move(160, Math.round(180 * SCALE)); setCursorOpacity(0)
        await sleep(50); setCursorOpacity(0.82); await sleep(500)
        move(140, Math.round(340 * SCALE)); await sleep(700)
        move(200, Math.round(360 * SCALE)); await sleep(600)
        move(DISPLAY_W / 2, Math.round(395 * SCALE)); await sleep(650) // approach dialog content
        if (!alive) return
        // Tap "Continue"
        const r1BtnY = Math.round(490 * SCALE)
        await tapBtn(DISPLAY_W / 2, r1BtnY, setBtnHovered, setBtnActive)
        if (!alive) return
        setScreenIdx(1); await sleep(340)

        // Screen 1: Turn on notifications
        setCursorOpacity(0); move(DISPLAY_W / 2, Math.round(200 * SCALE)); await sleep(80)
        setCursorOpacity(0.82); await sleep(350)
        move(150, Math.round(280 * SCALE)); await sleep(600)
        move(DISPLAY_W / 2, Math.round(420 * SCALE)); await sleep(700)
        if (!alive) return
        // Tap "Turn on notifications"
        const r2BtnY = Math.round(704 * SCALE)
        await tapBtn(DISPLAY_W / 2, r2BtnY, setBtnHovered, setBtnActive)
        if (!alive) return
        setScreenIdx(2); await sleep(340)

        // Screen 2: Sync contacts
        setCursorOpacity(0); move(DISPLAY_W / 2, Math.round(200 * SCALE)); await sleep(80)
        setCursorOpacity(0.82); await sleep(300)
        move(140, Math.round(360 * SCALE)); await sleep(650)
        move(200, Math.round(420 * SCALE)); await sleep(600)
        move(160, Math.round(470 * SCALE)); await sleep(550)
        if (!alive) return
        // Tap "Next"
        const r3BtnY = Math.round(714 * SCALE)
        await tapBtn(DISPLAY_W / 2, r3BtnY, setBtnHovered, setBtnActive)
        if (!alive) return
        setScreenIdx(3); await sleep(340)

        // Screen 3: Discover People — wander, then fade
        setCursorOpacity(0); move(DISPLAY_W / 2, Math.round(160 * SCALE)); await sleep(80)
        setCursorOpacity(0.82); await sleep(300)
        move(120, Math.round(220 * SCALE)); await sleep(600)
        move(200, Math.round(300 * SCALE)); await sleep(650)
        move(140, Math.round(380 * SCALE)); await sleep(600)
        move(200, Math.round(450 * SCALE)); await sleep(550)
        setCursorOpacity(0); await sleep(500)
        // Reset
        setScreenIdx(0); await sleep(200)

      // ─────────────────────────────────────────────────────────────────
      // Feature 3: Parental View (2 screens / sheet)
      // ─────────────────────────────────────────────────────────────────
      } else if (activeFeature === 3) {
        // Screen 0: Notifications feed
        move(160, Math.round(168 * SCALE)); setCursorOpacity(0)
        await sleep(50); setCursorOpacity(0.82); await sleep(500)
        move(140, Math.round(140 * SCALE)); await sleep(700) // wander toward key notification
        move(200, Math.round(150 * SCALE)); await sleep(600)
        move(160, Math.round(158 * SCALE)); await sleep(650)
        if (!alive) return
        // Hover over "Due to laws..." notification
        const notifY = Math.round(158 * SCALE)
        move(DISPLAY_W / 2, notifY); await sleep(500)
        setNotifHovered(true); await sleep(650)
        setCursorScale(0.78); setNotifActive(true); setNotifHovered(false); await sleep(150)
        setCursorScale(1);    setNotifActive(false); await sleep(120)
        if (!alive) return
        setShowParentSheet(true); await sleep(600)

        // Wander the sheet content
        move(DISPLAY_W / 2, Math.round(320 * SCALE)); await sleep(700)
        move(140, Math.round(400 * SCALE)); await sleep(650)
        move(210, Math.round(440 * SCALE)); await sleep(600)
        move(160, Math.round(490 * SCALE)); await sleep(600)
        move(200, Math.round(540 * SCALE)); await sleep(600)
        setCursorOpacity(0); await sleep(600)
        setShowParentSheet(false); await sleep(350)

      // ─────────────────────────────────────────────────────────────────
      // Feature 4: Sign Up Flow (8 screens)
      // ─────────────────────────────────────────────────────────────────
      } else if (activeFeature === 4) {
        // Screen 0: Splash — just show briefly, no cursor
        setCursorOpacity(0)
        await sleep(1200)
        if (!alive) return
        // Auto-advance to login screen quickly
        setScreenIdx(1); await sleep(500)

        // Screen 1: Login — cursor appears, moves to "Create new account"
        move(DISPLAY_W / 2, Math.round(350 * SCALE)); setCursorOpacity(0)
        await sleep(80); setCursorOpacity(0.82); await sleep(400)
        move(180, Math.round(480 * SCALE)); await sleep(500)
        move(DISPLAY_W / 2, Math.round(600 * SCALE)); await sleep(600)
        if (!alive) return
        // Tap "Create new account"
        const createBtnY = Math.round(660 * SCALE)
        await tapBtn(DISPLAY_W / 2, createBtnY, setCreateHovered, setCreateActive)
        if (!alive) return
        setScreenIdx(2); await sleep(280)

        // Screens 2 & 3: Name + Username — zoom through fast
        setCursorOpacity(0)
        await sleep(320)
        setScreenIdx(3); await sleep(250)

        // Screen 4: Birthday — slow down
        setScreenIdx(4); await sleep(500)
        move(DISPLAY_W / 2, Math.round(200 * SCALE)); setCursorOpacity(0)
        await sleep(80); setCursorOpacity(0.82); await sleep(400)
        move(140, Math.round(260 * SCALE)); await sleep(700)
        move(DISPLAY_W / 2, Math.round(310 * SCALE)); await sleep(700)
        // Drift across date picker
        move(100, Math.round(580 * SCALE)); await sleep(700)
        move(200, Math.round(580 * SCALE)); await sleep(650)
        move(290, Math.round(580 * SCALE)); await sleep(600)
        if (!alive) return
        // Tap "Next" on birthday
        const bBtnY = Math.round(340 * SCALE)
        await tapBtn(DISPLAY_W / 2, bBtnY, setBtnHovered, setBtnActive)
        if (!alive) return
        setScreenIdx(5); await sleep(340)

        // Screen 5: Under-16 warning
        setCursorOpacity(0); move(DISPLAY_W / 2, Math.round(250 * SCALE)); await sleep(80)
        setCursorOpacity(0.82); await sleep(300)
        move(150, Math.round(310 * SCALE)); await sleep(600)
        move(200, Math.round(360 * SCALE)); await sleep(550)
        if (!alive) return
        // Tap OK → account type
        const u16BtnY = Math.round(445 * SCALE)
        await tapBtn(DISPLAY_W / 2, u16BtnY, setBtnHovered, setBtnActive)
        if (!alive) return
        setScreenIdx(6); await sleep(300)

        // Screen 6: Account type — quick wander
        setCursorOpacity(0); move(DISPLAY_W / 2, Math.round(200 * SCALE)); await sleep(60)
        setCursorOpacity(0.82); await sleep(250)
        move(150, Math.round(310 * SCALE)); await sleep(400)
        if (!alive) return
        // Tap Continue
        const acBtnY = Math.round(440 * SCALE)
        await tapBtn(DISPLAY_W / 2, acBtnY, setBtnHovered, setBtnActive)
        if (!alive) return
        setScreenIdx(7); await sleep(340)

        // Screen 7: "We couldn't create an account" — THE KEY SCREEN
        setCursorOpacity(0); move(DISPLAY_W / 2, Math.round(350 * SCALE)); await sleep(80)
        setShowSignupAlert(true); await sleep(300)
        setCursorOpacity(0.82)
        // Wander over alert
        move(DISPLAY_W / 2, Math.round(380 * SCALE)); await sleep(700)
        move(DISPLAY_W / 2 - 30, Math.round(400 * SCALE)); await sleep(650)
        move(DISPLAY_W / 2 + 20, Math.round(420 * SCALE)); await sleep(700)
        move(DISPLAY_W / 2, Math.round(450 * SCALE)); await sleep(800)
        setCursorOpacity(0); await sleep(600)
        setShowSignupAlert(false); await sleep(300)
        // Reset
        setScreenIdx(0)
      }

      if (alive) onPathComplete?.()
    }

    run()
    return () => { alive = false }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ position: 'relative', display: 'inline-block', flexShrink: 0 }}>
      {/* ── Glass iPhone case ── */}
      <div style={{
        padding: 10,
        borderRadius: 46,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.07) 100%)',
        border: '0.4px solid rgba(255,255,255,0.28)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 60px 120px rgba(0,0,0,0.22), 0 20px 48px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.06)',
        position: 'relative',
        userSelect: 'none',
      }}>
        {/* ── Left buttons: mute toggle + vol+ + vol- ── */}
        <div style={{ position: 'absolute', left: -5, top: 88, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ width: 5, height: 20, borderRadius: '2px 0 0 2px', background: 'linear-gradient(90deg, rgba(190,200,215,0.75), rgba(215,225,238,0.45))', border: '0.5px solid rgba(255,255,255,0.4)' }}/>
          <div style={{ width: 5, height: 30, borderRadius: '2px 0 0 2px', background: 'linear-gradient(90deg, rgba(190,200,215,0.75), rgba(215,225,238,0.45))', border: '0.5px solid rgba(255,255,255,0.4)', marginTop: 8 }}/>
          <div style={{ width: 5, height: 30, borderRadius: '2px 0 0 2px', background: 'linear-gradient(90deg, rgba(190,200,215,0.75), rgba(215,225,238,0.45))', border: '0.5px solid rgba(255,255,255,0.4)' }}/>
        </div>
        {/* ── Right power button ── */}
        <div style={{ position: 'absolute', right: -5, top: 120, width: 5, height: 44, borderRadius: '0 2px 2px 0', background: 'linear-gradient(270deg, rgba(190,200,215,0.75), rgba(215,225,238,0.45))', border: '0.5px solid rgba(255,255,255,0.4)' }}/>

        {/* ── Phone screen ── */}
        <div style={{
          width:  DISPLAY_W,
          height: DISPLAY_H,
          borderRadius: 36,
          overflow: 'hidden',
          boxShadow: '0 0 0 0.5px rgba(0,0,0,0.12)',
          background: '#fff',
          position: 'relative',
        }}>

      {/* ── Zoom layer — wraps only the screen content, not cursor/sheets ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        transform: `scale(${screenZoom})`,
        transformOrigin: `${zoomOrigin.x}px ${zoomOrigin.y}px`,
        transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform',
      }}>

      {/* ── Sliding screen track ── */}
      {(activeFeature === 0 || activeFeature === 1) && (
      <div style={{
        display: 'flex',
        width:  FRAME_W * 2,
        height: 812,
        transformOrigin: 'top left',
        transform: `scale(${SCALE}) translateX(${screenIdx === 0 ? 0 : -FRAME_W}px)`,
        transition: 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}>
        {activeFeature === 1 ? (
          <Screen3Checkpoint btnActive={btnActive} btnHovered={btnHovered} over16Hovered={over16Hovered} over16Active={over16Active} scrollOffset={checkScroll} />
        ) : (
        <div style={{ width: FRAME_W, height: 812, flexShrink: 0, position: 'relative' }}>
        <div style={{ height:52, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', background:'#fff' }}>
          <span style={{ fontSize:16.4, fontWeight:600, color:'#0c1014', letterSpacing:'-0.3px' }}>5:26</span>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="#0c1014"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.8" r="1.2" fill="#0c1014"/><path d="M4.8 7.4a4.5 4.5 0 0 1 6.4 0" stroke="#0c1014" strokeWidth="1.3" strokeLinecap="round"/><path d="M2 4.6a8 8 0 0 1 12 0" stroke="#0c1014" strokeWidth="1.3" strokeLinecap="round"/></svg>
            <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#0c1014" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#0c1014"/><path d="M23.5 4.5v4a2 2 0 0 0 0-4Z" fill="#0c1014" opacity="0.4"/></svg>
          </div>
        </div>
        <div style={{ height:48, display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 15px 8px', background:'#fff' }}>
          <img src="/ig-wordmark.png" alt="Instagram" style={{ height:31, width:'auto', objectFit:'contain' }} />
          <div style={{ display:'flex', gap:23, alignItems:'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.84-7.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>
            <div style={{ position:'relative' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9l20-7Z"/></svg>
              <div style={{ position:'absolute', top:-6, right:-7, minWidth:16, height:16, borderRadius:8, background:'#E1306C', border:'2px solid #fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, color:'#fff', lineHeight:1, padding:'0 4px' }}>1</div>
            </div>
          </div>
        </div>
        <div style={{ display:'flex', padding:'4px 4px 12px', background:'#fff', overflowX:'hidden' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:7, padding:'7px 8px 0', flexShrink:0, width:86 }}>
            <div style={{ position:'relative', width:66, height:66 }}>
              <div style={{ width:66, height:66, borderRadius:'50%', overflow:'hidden', border:'1px solid #e0e0e0' }}>
                <img src={PHOTOS.yours} alt="Your story" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
              <div style={{ position:'absolute', bottom:1, right:1, width:19, height:19, borderRadius:'50%', background:'#3897f0', border:'2px solid #fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="9" height="9" viewBox="0 0 10 10"><path d="M5 2v6M2 5h6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>
              </div>
            </div>
            <span style={{ fontSize:11, color:'#6a717a', textAlign:'center', lineHeight:'14px' }}>Your story</span>
          </div>
          {[{ user:'mwells77', photo: PHOTOS.mwells77, ring: STORY_RING },{ user:'aimi.allover', photo: PHOTOS.aimi, ring: STORY_RING },{ user:'alex.any...', photo: PHOTOS.alex, ring: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)' }].map(({ user, photo, ring }) => (
            <div key={user} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:7, padding:'7px 8px 0', flexShrink:0, width:86 }}>
              <div style={{ width:66, height:66, borderRadius:'50%', background:ring, padding:2.5, flexShrink:0 }}>
                <div style={{ width:'100%', height:'100%', borderRadius:'50%', overflow:'hidden', border:'2.5px solid #fff' }}>
                  <img src={photo} alt={user} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </div>
              </div>
              <span style={{ fontSize:11, color:'#0c1014', textAlign:'center', lineHeight:'14px', maxWidth:80, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user}</span>
            </div>
          ))}
        </div>
        <div style={{ background:'#fff' }}>
          <div style={{ height:27, display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:15 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="#0c1014" strokeWidth="1.4" strokeLinecap="round"/></svg>
          </div>
          <div style={{ padding:'12px 30px 24px', display:'flex', flexDirection:'column', gap:15, alignItems:'center' }}>
            <div style={{ textAlign:'center' }}>
              <p style={{ fontSize:15.5, fontWeight:700, color:'#0c1014', lineHeight:'19.3px', letterSpacing:'-0.31px', margin:'0 0 5px' }}>Soon, people under 16 will no longer be able to use social media</p>
              <p style={{ fontSize:13.5, fontWeight:400, color:'#0c1014', lineHeight:'17.4px', letterSpacing:'-0.14px', margin:0 }}>Due to laws in Australia, you won't be able to use Instagram until you turn 16, and your profile won't be visible to you or others until then.</p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:11, alignItems:'center', width:'100%' }}>
              <div style={{ background: btnActive ? '#3848e0' : '#4a5df9', borderRadius:7.8, padding:'7.5px 0', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', transform: btnActive ? 'scale(0.97)' : btnHovered ? 'scale(1.04)' : 'scale(1)', transition:'background 0.1s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)' }}>
                <span style={{ fontSize:13.5, fontWeight:600, color:'#fff', letterSpacing:'-0.15px' }}>See next steps</span>
              </div>
              <span style={{ fontSize:13, fontWeight:600, color:'#4a5df9', letterSpacing:'-0.14px', display:'inline-block', transform: over16Active ? 'scale(0.95)' : over16Hovered ? 'scale(1.06)' : 'scale(1)', transition:'transform 0.28s cubic-bezier(0.34,1.56,0.64,1)' }}>I'm 16 or over</span>
            </div>
          </div>
        </div>
        <div style={{ height:0.5, background:'#dbdfe4' }} />
        <div style={{ height:52, display:'flex', alignItems:'center', padding:'0 15px', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:9 }}>
            <div style={{ width:32, height:32, borderRadius:'50%', overflow:'hidden', background:'#eee', flexShrink:0 }}>
              <img src={PHOTOS.shayli} alt="shayli_thomas" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </div>
            <span style={{ fontSize:13.5, fontWeight:600, color:'#0c1014', letterSpacing:'-0.14px' }}>shayli_thomas</span>
          </div>
          <svg width="20" height="5" viewBox="0 0 20 5" fill="#0c1014"><circle cx="2.5" cy="2.5" r="2.5"/><circle cx="10" cy="2.5" r="2.5"/><circle cx="17.5" cy="2.5" r="2.5"/></svg>
        </div>
        <div style={{ width:'100%', height:330, overflow:'hidden' }}>
          <img src={PHOTOS.post} alt="post" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%' }} />
        </div>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'#fff', borderTop:'0.5px solid #dbdfe4', zIndex:10 }}>
          <div style={{ display:'flex', height:47, alignItems:'center' }}>
            {[{src:'/tab-home.png',label:'Home'},{src:'/tab-search.png',label:'Search'},{src:'/tab-add.png',label:'Add'},{src:'/tab-reels.png',label:'Reels'},{src:'/tab-profile.png',label:'Profile'}].map(({ src, label }) => (
              <div key={label} style={{ flex:1, display:'flex', justifyContent:'center', alignItems:'center' }}>
                <img src={src} alt={label} style={{ width:24, height:24, objectFit:'contain' }} />
              </div>
            ))}
          </div>
          <div style={{ height:33, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:129, height:5, borderRadius:100, background:'#0c1014' }}/>
          </div>
        </div>
        </div>
        )}
        <div style={{ width: FRAME_W, height: 812, flexShrink: 0, overflow: 'hidden' }}>
          <Screen2 />
        </div>
      </div>
      )}

      {/* ── Feature 2: Reactivation (4-screen track) ── */}
      {activeFeature === 2 && (
      <div style={{
        display: 'flex',
        width:  FRAME_W * 4,
        height: 812,
        transformOrigin: 'top left',
        transform: `scale(${SCALE}) translateX(${-screenIdx * FRAME_W}px)`,
        transition: 'transform 0.36s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}>
        <ScreenReact1 btnActive={btnActive} btnHovered={btnHovered} />
        <ScreenReact2 btnActive={btnActive} btnHovered={btnHovered} />
        <ScreenReact3 btnActive={btnActive} btnHovered={btnHovered} />
        <ScreenReact4 />
      </div>
      )}

      {/* ── Feature 3: Parental View (1-screen + overlay sheet) ── */}
      {activeFeature === 3 && (
      <div style={{
        display: 'flex',
        width:  FRAME_W,
        height: 812,
        transformOrigin: 'top left',
        transform: `scale(${SCALE})`,
      }}>
        <ScreenParent1 notifHovered={notifHovered} notifActive={notifActive} />
      </div>
      )}

      {/* ── Feature 4: Sign Up Flow (8-screen track) ── */}
      {activeFeature === 4 && (
      <div style={{
        display: 'flex',
        width:  FRAME_W * 8,
        height: 812,
        transformOrigin: 'top left',
        transform: `scale(${SCALE}) translateX(${-screenIdx * FRAME_W}px)`,
        transition: 'transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}>
        <ScreenSignup1 />
        <ScreenSignup2 createHovered={createHovered} createActive={createActive} />
        <ScreenSignup3 />
        <ScreenSignup4 />
        <ScreenSignup5 btnActive={btnActive} btnHovered={btnHovered} />
        <ScreenSignup6 />
        <ScreenSignup7 />
        <ScreenSignup8 alertVisible={showSignupAlert} />
      </div>
      )}

      </div>{/* ── end zoom layer ── */}

      {/* ── Glass cursor (display-level, not inside scaled content) ── */}
      <div style={{
        position: 'absolute',
        left:  cx - 14,
        top:   cy - 14,
        width:  28,
        height: 28,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 32%, rgba(255,255,255,0.22), rgba(255,255,255,0.06))',
        border: '0.75px solid rgba(255,255,255,0.45)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.14), 0 1px 2px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.35)',
        opacity: cursorOpacity,
        transform: `scale(${cursorScale})`,
        transition: 'left 0.55s cubic-bezier(0.25,0.46,0.45,0.94), top 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.25s ease, transform 0.12s ease',
        pointerEvents: 'none',
        zIndex: 50,
      }}/>

      {/* ── Age verification sheet overlay ── */}
      <Screen4AgeVerification visible={showAgeSheet} saveHovered={saveHovered} saveActive={saveActive} />
      <Screen5AgeConfirm visible={showAgeConfirmSheet} continueHovered={continueHovered} continueActive={continueActive} />
      <Screen6AgeMethodPicker visible={showAgeMethodSheet} />
      {/* ── Parental view: supervision sheet ── */}
      {activeFeature === 3 && <ScreenParent2 visible={showParentSheet} />}

        </div>{/* ── end phone screen ── */}
      </div>{/* ── end glass case ── */}
    </div>
  )
}


// ── Shared QP phone inner markup ──────────────────────────────────────────────
function QPPhoneInner({ headline, cta, phoneW = 140, body }: { headline: React.ReactNode; cta: React.ReactNode; phoneW?: number; body?: React.ReactNode }) {
  return (
    <div style={{ width: FRAME_W, transformOrigin: 'top left', transform: `scale(${phoneW / FRAME_W})`, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      <div style={{ height:52, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', background:'#fff' }}>
        <span style={{ fontSize:16.4, fontWeight:600, color:'#0c1014', letterSpacing:'-0.3px' }}>5:26</span>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="#0c1014"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
          <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#0c1014" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#0c1014"/></svg>
        </div>
      </div>
      <div style={{ height:48, display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 15px 8px', background:'#fff' }}>
        <img src="/ig-wordmark.png" alt="Instagram" style={{ height:31, width:'auto', objectFit:'contain' }} />
        <div style={{ display:'flex', gap:23, alignItems:'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.84-7.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>
        </div>
      </div>
      <div style={{ display:'flex', padding:'4px 4px 10px', background:'#fff', overflowX:'hidden' }}>
        {[{ user:'mwells77', photo: PHOTOS.mwells77, ring: STORY_RING },{ user:'aimi.all...', photo: PHOTOS.aimi, ring: STORY_RING },{ user:'alex.any...', photo: PHOTOS.alex, ring: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)' }].map(({ user, photo, ring }) => (
          <div key={user} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:7, padding:'7px 8px 0', flexShrink:0, width:86 }}>
            <div style={{ width:66, height:66, borderRadius:'50%', background:ring, padding:2.5 }}>
              <div style={{ width:'100%', height:'100%', borderRadius:'50%', overflow:'hidden', border:'2.5px solid #fff' }}>
                <img src={photo} alt={user} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
            </div>
            <span style={{ fontSize:11, color:'#0c1014', textAlign:'center', lineHeight:'14px', maxWidth:80, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user}</span>
          </div>
        ))}
      </div>
      <div style={{ background:'#fff', padding:'8px 15px 0', display:'flex', alignItems:'center', justifyContent:'flex-end' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="#0c1014" strokeWidth="1.4" strokeLinecap="round"/></svg>
      </div>
      <div style={{ padding:'10px 30px 22px', display:'flex', flexDirection:'column', gap:13, alignItems:'center', background:'#fff' }}>
        {headline}
        {body !== undefined ? body : <p style={{ fontSize:13.5, color:'#0c1014', lineHeight:'17.4px', letterSpacing:'-0.14px', margin:0, textAlign:'center' }}>Due to laws in Australia, you won't be able to use Instagram until you turn 16.</p>}
        <div style={{ background:'#4a5df9', borderRadius:7.8, padding:'7.5px 0', width:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:13.5, fontWeight:600, color:'#fff' }}>See next steps</span>
        </div>
        {cta}
      </div>
      <div style={{ background:'#fff' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'7.72px 15.43px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:7.7 }}>
            <div style={{ width:38.6, height:38.6, borderRadius:'50%', overflow:'hidden', flexShrink:0 }}>
              <img src="/feed-poster-avatar.png" alt="shayli_thomas" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </div>
            <span style={{ fontSize:13.5, fontWeight:600, color:'#0c1014', letterSpacing:'-0.14px' }}>shayli_thomas</span>
          </div>
          <svg width="20" height="4" viewBox="0 0 20 4" fill="#0c1014"><circle cx="2" cy="2" r="2"/><circle cx="10" cy="2" r="2"/><circle cx="18" cy="2" r="2"/></svg>
        </div>
        <img src="/feed-post-photo.png" alt="shayli post" style={{ width:'100%', display:'block', aspectRatio:'1/1', objectFit:'cover' }} />
      </div>
    </div>
  );
}

// ── ContentAltDemo ────────────────────────────────────────────────────────────
function ContentAltDemo({ phoneW = 158, playing = false, frozen = false }: { phoneW?: number; playing?: boolean; frozen?: boolean }) {
  const phoneH = Math.round(phoneW * 2);
  const [alt, setAlt] = React.useState<1 | 2>(1);
  const [hovered, setHovered] = React.useState(false);
  const cycleRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const changingWord: Record<1 | 2, string> = { 1: 'people under 16', 2: 'you' };
  const lockedAlt: 1 | 2 = 1;

  const startCycle = React.useCallback(() => {
    if (frozen) return;
    if (cycleRef.current) clearInterval(cycleRef.current);
    cycleRef.current = setInterval(() => setAlt(p => p === 1 ? 2 : 1), 2800);
  }, [frozen]);

  const stopCycle = React.useCallback(() => {
    if (cycleRef.current) { clearInterval(cycleRef.current); cycleRef.current = null; }
    if (pauseRef.current) { clearTimeout(pauseRef.current); pauseRef.current = null; }
  }, []);

  React.useEffect(() => {
    if (frozen) {
      stopCycle();
      return;
    }
    if (playing || hovered) {
      const t = setTimeout(startCycle, 700);
      return () => clearTimeout(t);
    } else {
      stopCycle();
    }
  }, [frozen, playing, hovered, startCycle, stopCycle]);

  React.useEffect(() => () => stopCycle(), [stopCycle]);

  const handleSelect = (n: 1 | 2) => {
    if (frozen) return;
    setAlt(n);
    stopCycle();
    if (hovered) { pauseRef.current = setTimeout(startCycle, 4000); }
  };

  const opts: { n: 1 | 2; label: string; chosen: boolean; reason: string }[] = [
    { n: 1, label: '"people under 16"', chosen: true,  reason: 'Accurate while conveying who the ban affects' },
    { n: 2, label: '"you"',              chosen: false, reason: 'Factually incorrect for misclassified adults' },
  ];

  const displayAlt = frozen ? lockedAlt : alt;

  return (
    <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}
      onMouseEnter={() => { if (!frozen) setHovered(true); }}
      onMouseLeave={() => { if (!frozen) setHovered(false); }}
    >
      {/* Phone LEFT */}
      <div style={{ width: phoneW, height: phoneH, borderRadius: 18, overflow: 'hidden', position: 'relative', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 10px 32px rgba(0,0,0,0.11)', background: '#fff', flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <QPPhoneInner
            phoneW={phoneW}
            headline={<p style={{ fontSize:15.5, fontWeight:700, color:'#0c1014', lineHeight:'19.3px', letterSpacing:'-0.31px', margin:0, textAlign:'center' }}>{'Soon, '}<span key={frozen ? 'frozen-pu16' : displayAlt} className={frozen ? undefined : 'word-highlight'} style={frozen ? { backgroundColor: 'rgba(185,166,220,0.24)', borderRadius: 3, padding: '0 2px', margin: '0 -2px', boxShadow: '0 0 0 2px rgba(185,166,220,0.14)' } : undefined}>{changingWord[displayAlt]}</span>{" won't be able to use social media"}</p>}
            cta={<span style={{ fontSize:13, fontWeight:600, color:'#4a5df9' }}>{"I'm 16 or over"}</span>}
          />
        </div>
      </div>
      {/* Controls RIGHT — vertical list matching CTAAltDemo style */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, minWidth: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 10, overflow: 'hidden', marginBottom: 8 }}>
          {opts.map(({ n, label }, i) => {
            const active = displayAlt === n;
            return (
              <button key={n} type="button" disabled={frozen} onClick={() => handleSelect(n)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: active ? 600 : 400, color: active ? '#1a1614' : '#b0a8ba', background: active ? 'rgba(155,142,160,0.07)' : '#fff', border: 'none', borderLeft: `2.5px solid ${active ? '#9b8ea0' : 'transparent'}`, borderTop: i > 0 ? '1px solid rgba(0,0,0,0.06)' : 'none', padding: '8px 10px', cursor: frozen ? 'default' : 'pointer', transition: 'all 0.15s ease', outline: 'none', textAlign: 'left' as const, width: '100%', opacity: frozen && !active ? 0.85 : 1 }}>
                <span style={{ flex: 1 }}>{label}</span>
              </button>
            );
          })}
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontStyle: 'italic', color: opts.find(o => o.n === displayAlt)!.chosen ? 'rgba(100,152,90,0.9)' : 'rgba(175,110,95,0.85)', margin: 0, transition: frozen ? 'none' : 'color 0.22s' }}>
          {opts.find(o => o.n === displayAlt)!.chosen ? '✓ ' : '✗ '}{opts.find(o => o.n === displayAlt)!.reason}
        </p>
      </div>
    </div>
  );
}

// ── TimingAltDemo ─────────────────────────────────────────────────────────────
function TimingAltDemo({ phoneW = 158, playing = false }: { phoneW?: number; playing?: boolean }) {
  const phoneH = Math.round(phoneW * 2);
  const [alt, setAlt] = React.useState<1 | 2 | 3>(1);
  const [hovered, setHovered] = React.useState(false);
  const cycleRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // What shows in the phone headline for each option
  const timingWord: Record<1 | 2 | 3, string> = {
    1: 'Soon',
    2: 'In 7 days',
    3: 'On December 10',
  };

  const opts: { n: 1 | 2 | 3; label: string; chosen: boolean; reason: string }[] = [
    { n: 1, label: '"Soon"',                        chosen: true,  reason: 'Most accurate given a ±48 hr delivery window we couldn\'t avoid' },
    { n: 2, label: '"In 3 weeks" / "In 7 days"',   chosen: false, reason: 'A ±48 hr technical variance between accounts made any countdown misleading' },
    { n: 3, label: '"On December 10"',              chosen: false, reason: 'Most precise, but timezone lag between Sydney and SF introduced inaccuracy' },
  ];

  const startCycle = React.useCallback(() => {
    if (cycleRef.current) clearInterval(cycleRef.current);
    cycleRef.current = setInterval(() => setAlt(p => p === 3 ? 1 : (p + 1) as 1 | 2 | 3), 2800);
  }, []);

  const stopCycle = React.useCallback(() => {
    if (cycleRef.current) { clearInterval(cycleRef.current); cycleRef.current = null; }
    if (pauseRef.current) { clearTimeout(pauseRef.current); pauseRef.current = null; }
  }, []);

  React.useEffect(() => {
    if (playing || hovered) {
      const t = setTimeout(startCycle, 700);
      return () => clearTimeout(t);
    } else {
      stopCycle();
    }
  }, [playing, hovered, startCycle, stopCycle]);

  React.useEffect(() => () => stopCycle(), [stopCycle]);

  const handleSelect = (n: 1 | 2 | 3) => {
    setAlt(n);
    stopCycle();
    if (hovered) { pauseRef.current = setTimeout(startCycle, 4000); }
  };

  const current = opts.find(o => o.n === alt)!;

  return (
    <div
      style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Phone mockup */}
      <div style={{ width: phoneW, height: phoneH, borderRadius: 18, overflow: 'hidden', position: 'relative', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 10px 32px rgba(0,0,0,0.11)', background: '#fff', flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <QPPhoneInner
            phoneW={phoneW}
            headline={
              <p style={{ fontSize: 15.5, fontWeight: 700, color: '#0c1014', lineHeight: '19.3px', letterSpacing: '-0.31px', margin: 0, textAlign: 'center' }}>
                <span key={alt} className="word-highlight">{timingWord[alt]}</span>
                {', people under 16 won\'t be able to use social media'}
              </p>
            }
            cta={<span style={{ fontSize: 13, fontWeight: 600, color: '#4a5df9' }}>{"I'm 16 or over"}</span>}
          />
        </div>
      </div>

      {/* Option list */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, minWidth: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 10, overflow: 'hidden', marginBottom: 8 }}>
          {opts.map(({ n, label }, i) => {
            const active = alt === n;
            return (
              <button
                key={n} type="button"
                onClick={() => handleSelect(n)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontFamily: 'Inter, sans-serif', fontSize: 10.5,
                  fontWeight: active ? 600 : 400,
                  color: active ? '#1a1614' : '#b0a8ba',
                  background: active ? 'rgba(155,142,160,0.07)' : '#fff',
                  border: 'none',
                  borderLeft: `2.5px solid ${active ? '#9b8ea0' : 'transparent'}`,
                  borderTop: i > 0 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                  padding: '8px 10px', cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  outline: 'none', textAlign: 'left' as const, width: '100%',
                }}
              >
                <span style={{ flex: 1 }}>{label}</span>
              </button>
            );
          })}
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontStyle: 'italic', color: current.chosen ? 'rgba(100,152,90,0.9)' : 'rgba(175,110,95,0.85)', margin: 0, transition: 'color 0.22s' }}>
          {current.chosen ? '✓ ' : '✗ '}{current.reason}
        </p>
      </div>
    </div>
  );
}

// ── CTAAltDemo ────────────────────────────────────────────────────────────────
function CTAAltDemo({ phoneW = 158, playing = false }: { phoneW?: number; playing?: boolean }) {
  const phoneH = Math.round(phoneW * 2);
  const [alt, setAlt] = React.useState<1 | 2 | 3 | 4>(1);
  const [hovered, setHovered] = React.useState(false);
  const cycleRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const ctas: Record<1 | 2 | 3 | 4, { label: string; chosen: boolean; reason: string }> = {
    1: { label: "I'm 16 or over",           chosen: true,  reason: 'conversational, accurate, does not imply anything about age' },
    2: { label: 'Confirm my age',            chosen: false, reason: 'more explicitly implies that this would be the path to age verification' },
    3: { label: 'Verify my age',             chosen: false, reason: "same read as above, 'verify' may also imply a data-collection step" },
    4: { label: "This doesn't apply to me",  chosen: false, reason: "ambiguous and dismissive, could invite under-16s who feel exempt for other reasons" },
  };

  const startCycle = React.useCallback(() => {
    if (cycleRef.current) clearInterval(cycleRef.current);
    cycleRef.current = setInterval(() => setAlt(p => (p === 4 ? 1 : (p + 1) as 1|2|3|4)), 2800);
  }, []);

  const stopCycle = React.useCallback(() => {
    if (cycleRef.current) { clearInterval(cycleRef.current); cycleRef.current = null; }
    if (pauseRef.current) { clearTimeout(pauseRef.current); pauseRef.current = null; }
  }, []);

  React.useEffect(() => {
    if (playing || hovered) {
      const t = setTimeout(startCycle, 700);
      return () => clearTimeout(t);
    } else {
      stopCycle();
    }
  }, [playing, hovered, startCycle, stopCycle]);

  React.useEffect(() => () => stopCycle(), [stopCycle]);

  const handleSelect = (n: 1 | 2 | 3 | 4) => {
    setAlt(n);
    stopCycle();
    if (hovered) { pauseRef.current = setTimeout(startCycle, 4000); }
  };

  return (
    <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Phone LEFT */}
      <div style={{ width: phoneW, height: phoneH, borderRadius: 18, overflow: 'hidden', position: 'relative', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 10px 32px rgba(0,0,0,0.11)', background: '#fff', flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <QPPhoneInner
            phoneW={phoneW}
            headline={<p style={{ fontSize:15.5, fontWeight:700, color:'#0c1014', lineHeight:'19.3px', letterSpacing:'-0.31px', margin:0, textAlign:'center' }}>{"Soon, people under 16 won't be able to use social media"}</p>}
            cta={<span key={alt} className="word-highlight" style={{ fontSize:13, fontWeight:600, color:'#4a5df9' }}>{ctas[alt].label}</span>}
          />
        </div>
      </div>
      {/* Controls RIGHT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, minWidth: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 10, overflow: 'hidden', marginBottom: 8 }}>
          {([1, 2, 3, 4] as const).map((n, i) => {
            const { label, chosen } = ctas[n];
            const active = alt === n;
            return (
              <button key={n} onClick={() => handleSelect(n)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: active ? 600 : 400, color: active ? '#1a1614' : '#b0a8ba', background: active ? 'rgba(155,142,160,0.07)' : '#fff', border: 'none', borderLeft: `2.5px solid ${active ? '#9b8ea0' : 'transparent'}`, borderTop: i > 0 ? '1px solid rgba(0,0,0,0.06)' : 'none', padding: '8px 10px', cursor: 'pointer', transition: 'all 0.15s ease', outline: 'none', textAlign: 'left' as const, width: '100%' }}>
                <span style={{ flex: 1 }}>{label}</span>
                {chosen && <span style={{ fontSize: 9, color: '#7aab6e', fontStyle: 'italic', fontWeight: 400, flexShrink: 0, marginLeft: 4 }}>chosen</span>}
              </button>
            );
          })}
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontStyle: 'italic', color: ctas[alt].chosen ? 'rgba(100,152,90,0.9)' : 'rgba(175,110,95,0.85)', margin: 0, transition: 'color 0.22s' }}>
          {ctas[alt].chosen ? '✓ ' : '✗ '}{ctas[alt].reason}
        </p>
      </div>
    </div>
  );
}

// ── UserAmbiguityFlowchart ────────────────────────────────────────────────────
function UserAmbiguityFlowchart() {
  // Fixed geometry — all connector math derived from these constants
  const LINE    = 'rgba(139,109,168,0.22)';
  // Animated shimmer helpers — a soft glow travels along each connector segment
  // with staggered delays to suggest directional flow through the chart.
  const H = (delay: number): React.CSSProperties => ({
    background: `linear-gradient(90deg, ${LINE} 0%, rgba(185,160,220,0.65) 50%, ${LINE} 100%)`,
    backgroundSize: '200% 100%',
    animation: `uaf-h 2.6s ease-in-out ${delay}s infinite`,
  });
  const V = (delay: number): React.CSSProperties => ({
    background: `linear-gradient(180deg, ${LINE} 0%, rgba(185,160,220,0.65) 50%, ${LINE} 100%)`,
    backgroundSize: '100% 200%',
    animation: `uaf-v 2.6s ease-in-out ${delay}s infinite`,
  });
  const CARD_H  = 80;   // px, fixed height for both mid-level cards
  const GAP     = 16;   // px gap between the two mid-level cards
  const TOTAL_H = CARD_H * 2 + GAP;          // 176 — height of the fork connector & mid-card column
  const topCenter  = CARD_H / 2;             // 40  — center of the prepare card
  const botCenter  = CARD_H + GAP + CARD_H / 2; // 136 — center of the age-verify card
  const entryY     = TOTAL_H / 2;            // 88  — aligns with main-card center
  const FORK_W     = 44;
  const junctionX  = 22;
  const ARROW_W    = 32;
  // Leaf card geometry
  const LEAF_H       = 34;
  const LEAF_GAP     = 9;
  const LEAF_GRID_H  = LEAF_H * 2 + LEAF_GAP; // 77 — top group (2×2)
  const BOT_GRID_H   = LEAF_H;                 // 34 — bottom group (single row of 2)
  const PANEL_W      = 112 * 2 + LEAF_GAP;     // 233 — right panel width
  // Absolute top positions within the right panel (height = TOTAL_H = 176)
  const TOP_LEAF_TOP = Math.round(topCenter - LEAF_GRID_H / 2); // ≈ 2
  const BOT_LEAF_TOP = Math.round(botCenter - BOT_GRID_H / 2);  // ≈ 119

  const midCard: React.CSSProperties = {
    width: 178,
    height: CARD_H,
    border: '1px solid rgba(139,109,168,0.16)',
    borderRadius: 12,
    padding: '12px 16px',
    background: '#faf9f7',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const eyebrow: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: 8.5,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#b0a8ba',
    margin: '0 0 5px',
  };

  const midTitle: React.CSSProperties = {
    fontFamily: '"Fjord One", serif',
    fontSize: 13,
    color: '#2c1f38',
    margin: 0,
    lineHeight: 1.45,
    fontWeight: 400,
  };

  return (
    <>
    <style>{`
      @keyframes uaf-h {
        0%   { background-position: 200% 50%; }
        42%  { background-position: -200% 50%; }
        100% { background-position: -200% 50%; }
      }
      @keyframes uaf-v {
        0%   { background-position: 50% 200%; }
        42%  { background-position: 50% -200%; }
        100% { background-position: 50% -200%; }
      }
    `}</style>
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', justifyContent: 'center' }}>

      {/* ① Main communications card */}
      <div style={{
        width: 198,
        flexShrink: 0,
        border: '1px solid rgba(139,109,168,0.20)',
        borderRadius: 14,
        padding: '18px 20px',
        background: 'linear-gradient(145deg, rgba(139,109,168,0.05) 0%, #faf9f7 100%)',
      }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase' as const, color: '#b0a8ba', margin: '0 0 7px' }}>
          Core communication
        </p>
        <p style={{ fontFamily: '"Fjord One", serif', fontSize: 15, color: '#2c1f38', margin: '0 0 12px', lineHeight: 1.4, fontWeight: 400 }}>
          Account communications
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {["What's happening", "Why it's happening", "When it's happening"].map(t => (
            <span key={t} style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: '#7b5ea7', lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(139,109,168,0.40)', flexShrink: 0 }} />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ② Fork connector — entry at entryY, branches at topCenter & botCenter */}
      <div style={{ position: 'relative', width: FORK_W, height: TOTAL_H, flexShrink: 0 }}>
        {/* Entry: horizontal from left edge to junction */}
        <div style={{ position: 'absolute', left: 0, top: entryY - 0.75, width: junctionX, height: 1.5, ...H(0) }} />
        {/* Vertical bar: from top-card centre to bottom-card centre */}
        <div style={{ position: 'absolute', left: junctionX - 0.75, top: topCenter, width: 1.5, height: botCenter - topCenter, ...V(0.35) }} />
        {/* Top branch: junction → right edge at top-card centre */}
        <div style={{ position: 'absolute', left: junctionX, top: topCenter - 0.75, right: 0, height: 1.5, ...H(0.65) }} />
        {/* Bottom branch: junction → right edge at bottom-card centre */}
        <div style={{ position: 'absolute', left: junctionX, top: botCenter - 0.75, right: 0, height: 1.5, ...H(0.80) }} />
      </div>

      {/* ③ Two mid-level cards stacked */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, flexShrink: 0 }}>
        <div style={midCard}>
          <p style={eyebrow}>Under 16</p>
          <p style={midTitle}>What you can do to prepare for the ban</p>
        </div>
        <div style={midCard}>
          <p style={eyebrow}>16 and over</p>
          <p style={midTitle}>Age verification</p>
        </div>
      </div>

      {/* ④ Dual arrow connector — lines at topCenter and botCenter */}
      <div style={{ position: 'relative', width: ARROW_W, height: TOTAL_H, flexShrink: 0 }}>
        <div style={{ position: 'absolute', left: 0, top: topCenter - 0.75, right: 0, height: 1.5, ...H(0.95) }} />
        <div style={{ position: 'absolute', left: 0, top: botCenter - 0.75, right: 0, height: 1.5, ...H(1.10) }} />
      </div>

      {/* ⑤ Right panel — both leaf groups absolutely positioned within TOTAL_H */}
      <div style={{ position: 'relative', width: PANEL_W, height: TOTAL_H, flexShrink: 0 }}>

        {/* Top group: 4 cards in 2×2, centred at topCenter */}
        <div style={{ position: 'absolute', top: TOP_LEAF_TOP, left: 0, right: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: LEAF_GAP }}>
            {['Add your phone number', 'Add your email', 'Download your info', 'Review your birthday'].map(label => (
              <div key={label} style={{
                height: LEAF_H,
                border: '1px solid rgba(139,109,168,0.13)',
                borderRadius: 8,
                padding: '0 12px',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}>
                <p style={{ fontFamily: 'Inter, sans-serif', margin: 0, fontSize: 11, color: '#4a3d54', fontWeight: 500, lineHeight: 1.3 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom group: 2 cards in a single row, centred at botCenter */}
        <div style={{ position: 'absolute', top: BOT_LEAF_TOP, left: 0, right: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: LEAF_GAP }}>
            {['Submit a photo of your ID', 'Face verification'].map(label => (
              <div key={label} style={{
                height: LEAF_H,
                border: '1px solid rgba(139,109,168,0.13)',
                borderRadius: 8,
                padding: '0 12px',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}>
                <p style={{ fontFamily: 'Inter, sans-serif', margin: 0, fontSize: 11, color: '#4a3d54', fontWeight: 500, lineHeight: 1.3 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
    </>
  );
}

// ── PhraseCloudSection ────────────────────────────────────────────────────────
function PhraseCloudSection() {
  const phrases = [
    {
      display: "won't be able to use your account anymore",
      cloud: "won't be able to\nuse your account anymore",
      reason: "Almost made the cut — but 'your account' framed this as an Instagram-specific ban. The legislation covered all social media, so we needed language that reflected the broader scope.",
      chosen: false,
    },
    {
      display: "paused",
      cloud: "paused",
      reason: "A strong early contender. Research showed teens understood 'paused' well — but it felt too casual for a restriction that could last up to three years.",
      chosen: false,
    },
    {
      display: "banned",
      cloud: "banned",
      reason: "Too punitive. The goal was to inform, not shame — 'banned' carried a disciplinary weight the tone didn't warrant.",
      chosen: false,
    },
    {
      display: "suspended",
      cloud: "suspended",
      reason: "Same punitive register as 'banned', and already used internally for bad-actor enforcement — reusing it here risked conflating two very different consequences.",
      chosen: false,
    },
    {
      display: "frozen",
      cloud: "frozen",
      reason: "Tested worse than 'paused' on reversibility. Fewer teens felt confident their account would return once they turned 16.",
      chosen: false,
    },
    {
      display: "disabled",
      cloud: "disabled",
      reason: "Implied permanence, and carried a punitive weight we wanted to avoid throughout the experience.",
      chosen: false,
    },
    {
      display: "restricted",
      cloud: "restricted",
      reason: "Already an established Instagram term with a distinct enforcement meaning. Using it here would have created confusion with an existing state.",
      chosen: false,
    },
    {
      display: "won't be able to use social media",
      cloud: "won't be able to\nuse social media",
      reason: "Teens understood it immediately, and framing the restriction as a social media-wide change rather than an Instagram one was both more accurate and better for the business.",
      chosen: true,
    },
  ];

  // [left%, top%] — compressed to a tighter vertical band
  const positions: [number, number][] = [
    [2,   3],   // won't be able to use your account anymore
    [74,  2],   // paused
    [85, 36],   // banned
    [2,  65],   // suspended
    [66, 73],   // frozen
    [30, 78],   // disabled
    [78, 60],   // restricted
    [4,  40],   // won't be able to use social media (chosen)
  ];

  const cloudSize = (display: string) =>
    display.length > 25 ? 10.5 : display.length > 10 ? 15 : 22;

  const stageSize = (display: string) =>
    display.length > 30 ? 26 : display.length > 15 ? 34 : 46;

  const [activeIdx, setActiveIdx] = React.useState(0);
  const [visible, setVisible]     = React.useState(true);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const transitionTo = (idx: number) => {
    setVisible(false);
    setTimeout(() => { setActiveIdx(idx); setVisible(true); }, 280);
  };

  const resetCycle = React.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveIdx(p => (p + 1) % phrases.length);
        setVisible(true);
      }, 280);
    }, 7000);
  }, [phrases.length]);

  const goPrev = () => {
    const idx = (activeIdx - 1 + phrases.length) % phrases.length;
    transitionTo(idx);
    resetCycle();
  };

  const goNext = () => {
    const idx = (activeIdx + 1) % phrases.length;
    transitionTo(idx);
    resetCycle();
  };

  React.useEffect(() => {
    resetCycle();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [resetCycle]);

  const active = phrases[activeIdx];

  return (
    <div style={{ position: 'relative', height: 390, marginTop: 40 }}>
      {/* Subtle radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 50% at 50% 48%, rgba(155,130,200,0.08) 0%, transparent 72%)', pointerEvents: 'none' }} />

      {/* Scattered cloud words */}
      {phrases.map((phrase, i) => {
        const [left, top] = positions[i];
        const isActive = i === activeIdx;
        return (
          <button
            key={i}
            onClick={() => { transitionTo(i); resetCycle(); }}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: `${top}%`,
              fontFamily: phrase.display.length > 10 ? 'Inter, sans-serif' : "'Georgia', serif",
              fontSize: cloudSize(phrase.display),
              fontWeight: isActive ? 600 : 400,
              color: isActive
                ? (phrase.chosen ? '#6a9464' : '#9b8ea0')
                : (phrase.chosen ? '#b8ceB5' : '#d4ccd8'),
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              whiteSpace: 'pre' as const,
              lineHeight: 1.45,
              textAlign: 'left' as const,
              transition: 'color 0.35s ease',
              opacity: isActive ? 1 : 0.75,
            }}
          >
            {phrase.cloud}
          </button>
        );
      })}

      {/* Centre stage */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{
          textAlign: 'center',
          padding: '0 80px',
          maxWidth: 580,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.28s ease, transform 0.28s ease',
        }}>
          {active.chosen ? (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#7aab6e', margin: '0 0 14px' }}>✓ chosen</p>
          ) : (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#c4bcc8', margin: '0 0 14px' }}>considered</p>
          )}
          <h3 className="font-serif" style={{
            fontSize: stageSize(active.display),
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            color: active.chosen ? '#4f7a4a' : '#1a1614',
            margin: '0 0 18px',
            fontWeight: 400,
          }}>
            "{active.display}"
          </h3>
          {active.reason && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, lineHeight: 1.72, color: '#8a7e90', margin: 0 }}>
              {active.reason}
            </p>
          )}
        </div>
      </div>

      {/* Navigation: arrows + dots + hint */}
      <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        {/* Arrows + dots row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Prev arrow */}
          <button
            onClick={goPrev}
            style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(155,142,160,0.3)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9b8ea0', transition: 'all 0.15s ease', flexShrink: 0 }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6.5 2L3.5 5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {phrases.map((_, i) => (
              <button
                key={i}
                onClick={() => { transitionTo(i); resetCycle(); }}
                style={{ width: i === activeIdx ? 18 : 6, height: 6, borderRadius: 3, background: i === activeIdx ? '#9b8ea0' : '#e4dce8', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.25s ease' }}
              />
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={goNext}
            style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(155,142,160,0.3)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9b8ea0', transition: 'all 0.15s ease', flexShrink: 0 }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2L6.5 5l-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Hint */}
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#c4bcc8', margin: 0, letterSpacing: '0.04em' }}>
          or click any word to explore
        </p>
      </div>
    </div>
  );
}

// ── DecisionCardsSection ──────────────────────────────────────────────────────
function DecisionCardsSection() {
  const [expanded, setExpanded] = React.useState<'lang' | 'cta' | null>(null);
  const [modalIn, setModalIn]   = React.useState(false);
  const [card1H, setCard1H]     = React.useState(false);
  const [card2H, setCard2H]     = React.useState(false);

  // Custom lagging cursor
  const cursorActive = card1H || card2H;
  const mouseRef  = React.useRef({ x: 0, y: 0 });
  const lagRef    = React.useRef({ x: 0, y: 0 });
  const rafRef    = React.useRef<number | null>(null);
  const [dotPos, setDotPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!cursorActive) { if (rafRef.current) cancelAnimationFrame(rafRef.current); return; }
    const loop = () => {
      lagRef.current.x += (mouseRef.current.x - lagRef.current.x) * 0.1;
      lagRef.current.y += (mouseRef.current.y - lagRef.current.y) * 0.1;
      setDotPos({ x: lagRef.current.x, y: lagRef.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [cursorActive]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const openModal = (which: 'lang' | 'cta') => {
    setExpanded(which);
    requestAnimationFrame(() => requestAnimationFrame(() => setModalIn(true)));
  };
  const closeModal = React.useCallback(() => {
    setModalIn(false);
    setTimeout(() => setExpanded(null), 300);
  }, []);

  React.useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [closeModal]);

  const expandIcon = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M7 1h3v3M4 7l6-6M1 4V1h3M5 4l-4 4"/>
    </svg>
  );

  const cardBase: React.CSSProperties = {
    borderRadius: 16, border: '1px solid rgba(0,0,0,0.07)',
    padding: '28px 30px', background: '#faf9f7',
    cursor: 'none', position: 'relative', transition: 'box-shadow 0.2s ease, transform 0.2s ease',
  };

  const modalContent = {
    lang: {
      label: 'Header',
      title: '"People under 16" not "You"',
      body: 'Direct address ("you") was considered to reduce banner blindness through more engaging copy, but it would have been factually incorrect for misclassified adults. Third-person framing resolved both problems: it kept the message accurate across both user groups, and gave me a natural way to introduce the scope of the ban ("people under 16") within the tight character constraints of a push notification.',
      demo: <ContentAltDemo phoneW={200} />,
    },
    cta: {
      label: 'Secondary CTA',
      title: '"I\'m 16 or over"',
      body: 'This was a thorny one that had to thread a regulatory needle. It had to give misclassified adults a genuine exit without appearing to coach teens into circumventing the ban. Any wording that implied a formal verification step risked being read by the Australian government as facilitating age workarounds.',
      demo: <CTAAltDemo phoneW={200} />,
    },
  };

  return (
    <>
      {/* Lagging purple cursor dot */}
      {cursorActive && (
        <div style={{ position: 'fixed', left: dotPos.x, top: dotPos.y, width: 12, height: 12, borderRadius: '50%', background: 'rgba(139,109,168,0.85)', pointerEvents: 'none', zIndex: 99999, transform: 'translate(-50%, -50%)', boxShadow: '0 0 0 3px rgba(139,109,168,0.18)' }} />
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }} onMouseMove={handleMouseMove}>

        {/* Card 1 — Language framing */}
        <div
          style={{ ...cardBase, boxShadow: card1H ? '0 8px 28px rgba(0,0,0,0.08)' : '0 2px 6px rgba(0,0,0,0.04)', transform: card1H ? 'translateY(-2px)' : 'none' }}
          onMouseEnter={(e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; lagRef.current = { x: e.clientX, y: e.clientY }; setCard1H(true); }}
          onMouseLeave={() => setCard1H(false)}
          onClick={() => openModal('lang')}
        >
          {/* Expand affordance */}
          <div style={{ position: 'absolute', top: 14, right: 14, width: 26, height: 26, borderRadius: 7, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9b8ea0', opacity: card1H ? 1 : 0, transition: 'opacity 0.18s ease' }}>
            {expandIcon}
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#9b8ea0', marginBottom: 16, marginTop: 0 }}>Header</p>
          <h3 className="font-serif" style={{ fontSize: 18, lineHeight: 1.35, letterSpacing: '-0.02em', color: '#1a1614', margin: '0 0 12px' }}>
            "People under 16" not "You"
          </h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, lineHeight: 1.7, color: '#5e5660', margin: '0 0 8px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
            Direct address ("you") was considered to reduce banner blindness through more engaging copy, but it would have been factually incorrect for misclassified adults. Third-person framing resolved both problems: it kept the message accurate across both user groups, and gave me a natural way to introduce the scope of the ban ("people under 16") within the tight character constraints of a push notification.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#c4bcc8', margin: '0 0 20px' }}>Read more</p>
          <div onClick={e => e.stopPropagation()}>
            <ContentAltDemo playing={card1H} />
          </div>
        </div>

        {/* Card 2 — Secondary CTA */}
        <div
          style={{ ...cardBase, boxShadow: card2H ? '0 8px 28px rgba(0,0,0,0.08)' : '0 2px 6px rgba(0,0,0,0.04)', transform: card2H ? 'translateY(-2px)' : 'none' }}
          onMouseEnter={(e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; lagRef.current = { x: e.clientX, y: e.clientY }; setCard2H(true); }}
          onMouseLeave={() => setCard2H(false)}
          onClick={() => openModal('cta')}
        >
          {/* Expand affordance */}
          <div style={{ position: 'absolute', top: 14, right: 14, width: 26, height: 26, borderRadius: 7, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9b8ea0', opacity: card2H ? 1 : 0, transition: 'opacity 0.18s ease' }}>
            {expandIcon}
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#9b8ea0', marginBottom: 16, marginTop: 0 }}>Secondary CTA</p>
          <h3 className="font-serif" style={{ fontSize: 18, lineHeight: 1.35, letterSpacing: '-0.02em', color: '#1a1614', margin: '0 0 12px' }}>
            "I'm 16 or over"
          </h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, lineHeight: 1.7, color: '#5e5660', margin: '0 0 8px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
            This was a thorny one that had to thread a regulatory needle. It had to give misclassified adults a genuine exit without appearing to coach teens into circumventing the ban. Any wording that implied a formal verification step risked being read by the Australian government as facilitating age workarounds.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#c4bcc8', margin: '0 0 20px' }}>Read more</p>
          <div onClick={e => e.stopPropagation()}>
            <CTAAltDemo playing={card2H} />
          </div>
        </div>

      </div>

      {/* Modal overlay */}
      {expanded && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', background: modalIn ? 'rgba(15,12,10,0.42)' : 'rgba(15,12,10,0)', backdropFilter: modalIn ? 'blur(8px)' : 'blur(0px)', WebkitBackdropFilter: modalIn ? 'blur(8px)' : 'blur(0px)', transition: 'background 0.28s ease, backdrop-filter 0.28s ease, -webkit-backdrop-filter 0.28s ease' }}
          onClick={closeModal}
        >
          <div
            style={{ background: '#faf9f7', borderRadius: 22, padding: '44px 48px 48px', maxWidth: 680, width: '100%', position: 'relative', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto', transform: modalIn ? 'scale(1) translateY(0)' : 'scale(0.93) translateY(16px)', opacity: modalIn ? 1 : 0, transition: 'transform 0.32s cubic-bezier(0.34,1.1,0.64,1), opacity 0.24s ease', boxShadow: '0 40px 100px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button onClick={closeModal} style={{ position: 'absolute', top: 16, right: 16, width: 30, height: 30, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.07)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', outline: 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.13)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.07)')}
            >
              <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 1l8 8M9 1l-8 8" stroke="#1a1614" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            {/* Content */}
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#9b8ea0', marginBottom: 12, marginTop: 0 }}>
              {expanded === 'lang' ? 'Header' : 'Secondary CTA'}
            </p>
            <h3 className="font-serif" style={{ fontSize: 24, lineHeight: 1.3, letterSpacing: '-0.025em', color: '#1a1614', margin: '0 0 14px' }}>
              {modalContent[expanded].title}
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.75, color: '#5e5660', margin: '0 0 32px' }}>
              {modalContent[expanded].body}
            </p>
            {modalContent[expanded].demo}
          </div>
        </div>
      )}
    </>
  );
}

// ── SketchBCard ───────────────────────────────────────────────────────────────
function SketchBCard() {
  const [step, setStep]           = React.useState(0);
  const [fading, setFading]       = React.useState(false);
  const [cursorTop, setCursorTop] = React.useState(52);   // % of SVG height
  const [cursorVis, setCursorVis] = React.useState(false);
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => timers.current.forEach(clearTimeout);

  const runCycle = React.useCallback(() => {
    clear();
    const t = timers.current;
    // Reset to screen 0
    setStep(0);
    setFading(false);
    setCursorTop(52);
    setCursorVis(false);

    const CURSOR_IN = 500;
    const CURSOR_MOVE = 900;
    const FADE_AT = 6200;       // after slow drift + beat on "See next steps"
    const STEP2_AT = 6700;
    const HOLD_STEP2 = 10500; // linger on steps screen before looping back

    t.push(setTimeout(() => setCursorVis(true), CURSOR_IN));
    t.push(setTimeout(() => setCursorTop(75.7), CURSOR_MOVE));
    t.push(setTimeout(() => setFading(true), FADE_AT));
    t.push(setTimeout(() => {
      setStep(1);
      setFading(false);
      setCursorVis(false);
    }, STEP2_AT));
    t.push(setTimeout(runCycle, STEP2_AT + HOLD_STEP2));
  }, []);

  React.useEffect(() => {
    const kickoff = setTimeout(runCycle, 400);
    return () => { clearTimeout(kickoff); clear(); };
  }, [runCycle]);

  const sk: React.CSSProperties = {
    background: '#fff',
    border: '1px solid #e8e2f0',
    borderRadius: 14,
    padding: '22px 18px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  };

  return (
    <div style={sk}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#a898be', margin: 0 }}>Option B</p>
        <div style={{ display: 'flex', gap: 5 }}>
          {[0, 1].map(i => (
            <div key={i} style={{ width: i === step ? 16 : 5, height: 5, borderRadius: 3, background: i === step ? '#7c6a9e' : '#e4ddf0', transition: 'all 0.3s ease' }} />
          ))}
        </div>
      </div>

      {/* SVG + cursor overlay */}
      <div style={{ position: 'relative' }}>
        <div style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.55s ease' }}>
          {step === 0 ? (
            <svg viewBox="0 0 160 300" style={{ width: '100%', display: 'block', fontFamily: 'Inter, sans-serif' }}>
              <rect x="16" y="6" width="128" height="288" rx="18" fill="#faf8fd" stroke="#c8bedd" strokeWidth="0.75"/>
              <rect x="56" y="12" width="48" height="7" rx="3.5" fill="#ede8f6"/>
              {/* IG icon placeholder */}
              <rect x="62" y="36" width="36" height="36" rx="7" fill="#ede8f6" stroke="#c8bedd" strokeWidth="0.75"/>
              <line x1="62" y1="36" x2="98" y2="72" stroke="#c8bedd" strokeWidth="0.75"/>
              <line x1="98" y1="36" x2="62" y2="72" stroke="#c8bedd" strokeWidth="0.75"/>
              {/* Headline */}
              <rect x="28" y="84" width="104" height="6" rx="3" fill="#d8d0ec"/>
              <rect x="36" y="96" width="88" height="6" rx="3" fill="#d8d0ec"/>
              <rect x="46" y="108" width="68" height="6" rx="3" fill="#d8d0ec"/>
              <line x1="28" y1="128" x2="132" y2="128" stroke="#e8e2f0" strokeWidth="0.75"/>
              <rect x="28" y="138" width="104" height="4" rx="2" fill="#ece8f6"/>
              <rect x="28" y="147" width="80" height="4" rx="2" fill="#ece8f6"/>
              <rect x="28" y="156" width="94" height="4" rx="2" fill="#ece8f6"/>
              {/* Single CTA */}
              <rect x="28" y="188" width="104" height="32" rx="9" fill="#ede8fc" stroke="#7c5ec0" strokeWidth="0.9"/>
              <text x="80" y="209" textAnchor="middle" fontSize="9.5" fill="#6a4eb8" fontWeight="600" fontFamily="Inter, sans-serif">See next steps</text>
            </svg>
          ) : (
            <svg viewBox="0 0 160 300" style={{ width: '100%', display: 'block', fontFamily: 'Inter, sans-serif' }}>
              <rect x="16" y="6" width="128" height="288" rx="18" fill="#faf8fd" stroke="#c8bedd" strokeWidth="0.75"/>
              <rect x="56" y="12" width="48" height="7" rx="3.5" fill="#ede8f6"/>
              {/* Screen header */}
              <rect x="28" y="28" width="104" height="7" rx="3.5" fill="#d8d0ec"/>
              <rect x="36" y="41" width="80" height="4" rx="2" fill="#ece8f6"/>
              {/* 4 under-16 action cells */}
              {[0, 1, 2, 3].map(i => (
                <g key={i}>
                  <rect x="26" y={58 + i * 42} width="108" height="32" rx="8" fill="#f4f1fb" stroke="#d0c8e8" strokeWidth="0.75"/>
                  <rect x="36" y={69 + i * 42} width="58" height="5" rx="2.5" fill="#d4cce8"/>
                  <rect x="36" y={79 + i * 42} width="80" height="3.5" rx="1.75" fill="#ece8f6"/>
                </g>
              ))}
              {/* "If you're 16 or over" divider */}
              <line x1="26" y1="233" x2="134" y2="233" stroke="#e8e2f0" strokeWidth="0.75"/>
              <text x="80" y="244" textAnchor="middle" fontSize="7" fill="#9080b2" fontWeight="600" letterSpacing="0.05em" fontFamily="Inter, sans-serif">IF YOU'RE 16 OR OVER</text>
              <rect x="26" y="250" width="108" height="32" rx="8" fill="#f4f1fb" stroke="#d0c8e8" strokeWidth="0.75"/>
              <rect x="36" y="261" width="58" height="5" rx="2.5" fill="#d4cce8"/>
              <rect x="36" y="271" width="80" height="3.5" rx="1.75" fill="#ece8f6"/>
            </svg>
          )}
        </div>

        {/* Cursor circle — only on screen 0 */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: `${cursorTop}%`,
          transform: 'translate(-50%, -50%)',
          width: '9%',
          aspectRatio: '1',
          borderRadius: '50%',
          border: '1.5px solid rgba(106,80,168,0.7)',
          background: 'rgba(106,80,168,0.08)',
          backdropFilter: 'blur(1px)',
          opacity: cursorVis ? 1 : 0,
          transition: `top 3.8s cubic-bezier(0.35,0,0.15,1), opacity 0.5s ease`,
          pointerEvents: 'none',
        }} />
      </div>

      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, lineHeight: 1.65, color: '#7a6e82', margin: 0 }}>
        One QP CTA for everyone with the next screen having headers to delineate the options. This was less ideal from a design perspective but much easier to build from an eng POV which seemed like an attractive option given the tight timeline.
      </p>
    </div>
  );
}

// ── SuiteSection ─────────────────────────────────────────────────────────────
function SuiteSection() {
  const ff  = 'system-ui, -apple-system, sans-serif';
  const PH_W = 112, PH_H = 224;

  const [stage, setStage] = React.useState(0);
  const [screensVisible, setScreensVisible] = React.useState(true);

  // ── Purple cursor over phones (scoped to hover zone; no fixed viewport bleed) ──
  const [hoveringScreens, setHoveringScreens] = React.useState(false);
  const cursorZoneRef    = React.useRef<HTMLDivElement | null>(null);
  const mouseClientRef   = React.useRef({ x: 0, y: 0 });
  const lagLocalRef      = React.useRef({ x: 0, y: 0 });
  const dotRaf           = React.useRef<number | null>(null);
  const [dotPos, setDotPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!hoveringScreens) {
      if (dotRaf.current) cancelAnimationFrame(dotRaf.current);
      dotRaf.current = null;
      return;
    }
    const loop = () => {
      const zone = cursorZoneRef.current;
      if (!zone) {
        dotRaf.current = requestAnimationFrame(loop);
        return;
      }
      const { x: cx, y: cy } = mouseClientRef.current;
      const under = document.elementFromPoint(cx, cy);
      if (!under || !zone.contains(under)) {
        if (dotRaf.current) cancelAnimationFrame(dotRaf.current);
        dotRaf.current = null;
        setHoveringScreens(false);
        return;
      }
      const rect = zone.getBoundingClientRect();
      const tx = cx - rect.left;
      const ty = cy - rect.top;
      lagLocalRef.current.x += (tx - lagLocalRef.current.x) * 0.1;
      lagLocalRef.current.y += (ty - lagLocalRef.current.y) * 0.1;
      setDotPos({ x: lagLocalRef.current.x, y: lagLocalRef.current.y });
      dotRaf.current = requestAnimationFrame(loop);
    };
    dotRaf.current = requestAnimationFrame(loop);
    return () => { if (dotRaf.current) cancelAnimationFrame(dotRaf.current); dotRaf.current = null; };
  }, [hoveringScreens]);

  const goToStage = (i: number) => {
    if (i === stage) return;
    setScreensVisible(false);
    setStage(i);
    setTimeout(() => setScreensVisible(true), 80);
  };

  // ── Rationale copy ─────────────────────────────────────────────────────
  const rationale = [
    "Given that we were opting for increased urgency in our communications to avoid an oversaturation effect, we opted for a soft quick prompt for 2 weeks out. It wouldn't be missed since it appeared on the home page which is a visually prominent location. But it also struck a nice balance for an initial touchpoint as users do not need to interact with the messaging at any point yet.",
    "Now that we're one week out, we increased the aggressiveness of the approach to a dismissable full-screen interstitial. Teens would now either need to tap \"See next steps\" or 'X' out of this interstitial completely. With our increasingly aggressive approach, it was also apt that there was more surface area to introduce more critical information without hiding it behind an additional click.",
    "On the day the law takes effect, the interstitial becomes non-dismissable. Access is fully gated unless they are able to age verify and prove that they are 16 or older.",
  ];

  const mk = (url: string, sz = 24): React.CSSProperties => ({
    background: '#0c1014',
    WebkitMaskImage: `url('${url}')`,
    maskImage: `url('${url}')`,
    WebkitMaskSize: `${sz}px ${sz}px`,
    maskSize: `${sz}px ${sz}px`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  });
  const Scaled = ({ nW, children }: { nW: number; children: React.ReactNode }) => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ width: nW, transformOrigin: 'top left', transform: `scale(${PH_W / nW})`, fontFamily: ff }}>
        {children}
      </div>
    </div>
  );
  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div style={{ width: PH_W, height: PH_H, borderRadius: 16, overflow: 'hidden', position: 'relative',
      background: '#fff', border: '1px solid rgba(0,0,0,0.10)', boxShadow: '0 6px 20px rgba(0,0,0,0.10)', flexShrink: 0 }}>
      {children}
    </div>
  );
  const Lbl = ({ t }: { t: string }) => (
    <p style={{ margin: '7px 0 0', fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#9b8ea0', textAlign: 'center', letterSpacing: '0.02em' }}>{t}</p>
  );

  // ── Asset URLs ──
  const smsScreen   = 'https://www.figma.com/api/mcp/asset/d32f39ae-4230-4469-b1b7-dc55267f965d';

  const eBack       = 'https://www.figma.com/api/mcp/asset/641cb6b0-8f8b-4a65-bb74-519b0e6332ea';
  const eArchive    = 'https://www.figma.com/api/mcp/asset/719b648b-5d0a-48b4-a6b3-87fbecf3e181';
  const eTrash      = 'https://www.figma.com/api/mcp/asset/653eb28f-9ef6-4480-84ae-503d730fd332';
  const eEnvelope   = 'https://www.figma.com/api/mcp/asset/e3bca7da-c205-4d56-9090-b3a1fcd21017';
  const eMore       = 'https://www.figma.com/api/mcp/asset/1cebd764-3fdd-42bd-b9c0-401b4f3440b0';
  const eIgGlyph    = 'https://www.figma.com/api/mcp/asset/0cfc15eb-f853-4501-9f33-70b98d85eeef';
  const eIgLockup   = 'https://www.figma.com/api/mcp/asset/092b338f-0f23-4c46-8bc5-2dc5cba031ab';
  const eChevDown   = 'https://www.figma.com/api/mcp/asset/ce7a33e7-95f0-42a9-935d-720b8e1dd7ec';
  const eStar       = 'https://www.figma.com/api/mcp/asset/0b469a42-512b-4c89-bae8-1fc804c92306';
  const eOverflow   = 'https://www.figma.com/api/mcp/asset/c2d9f66f-2a51-4e02-a7bc-4023c27ecc9b';
  const eWifi       = 'https://www.figma.com/api/mcp/asset/9e6fa348-3bc3-46c1-a694-b715842f7d59';
  const eSignal     = 'https://www.figma.com/api/mcp/asset/eeb34b9c-9397-414b-93b8-a489033d8ed4';

  const smsIgIcon   = '/sms-ig-icon.png';

  // Reusable SMS phone — only the bubble text changes per timing stage
  const SMSPhone = ({ msg }: { msg: string }) => (
    <Shell>
      <Scaled nW={375}>
        <div style={{ width: 375, height: 750, display: 'flex', flexDirection: 'column', background: '#f2f2f7', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          {/* Status bar */}
          <div style={{ height: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 20px 8px' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#000', letterSpacing: '-0.3px' }}>1:24</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg width="17" height="11" viewBox="0 0 17 11" fill="#000"><rect x="0" y="7.5" width="3" height="3.5" rx="0.5"/><rect x="4.5" y="5" width="3" height="6" rx="0.5"/><rect x="9" y="2" width="3" height="9" rx="0.5"/><rect x="13.5" y="0" width="3" height="11" rx="0.5"/></svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                <path d="M7.5 9.5 L9 11 L6 11 Z" fill="#000"/>
                <path d="M4.8 7 Q7.5 4.2 10.2 7" stroke="#000" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
                <path d="M2 4.5 Q7.5 -0.5 13 4.5" stroke="#000" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
              </svg>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 22, height: 11, borderRadius: 3, border: '1px solid rgba(0,0,0,0.35)', padding: '1.5px', boxSizing: 'border-box' as const }}>
                  <div style={{ width: '75%', height: '100%', background: '#000', borderRadius: 1.5 }} />
                </div>
                <div style={{ width: 2, height: 5, background: 'rgba(0,0,0,0.35)', borderRadius: '0 1px 1px 0', marginLeft: 1 }} />
              </div>
            </div>
          </div>
          {/* Nav bar */}
          <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 16px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <svg width="10" height="17" viewBox="0 0 10 17" fill="none"><path d="M8 1.5L2 8.5L8 15.5" stroke="#007AFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div style={{ width: 19, height: 19, borderRadius: '50%', background: '#007AFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>5</span>
              </div>
            </div>
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#c7c7cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle cx="7.5" cy="5.5" r="3" fill="white" opacity="0.85"/>
                  <path d="M1 15 Q1.5 10 7.5 10 Q13.5 10 14 15" fill="white" opacity="0.85"/>
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <span style={{ fontSize: 11.5, color: '#007AFF' }}>39041</span>
                <svg width="7" height="5" viewBox="0 0 7 5" fill="none"><path d="M1 1.5l2.5 2 2.5-2" stroke="#007AFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>
          {/* Timestamp */}
          <div style={{ textAlign: 'center', padding: '4px 0 10px' }}>
            <p style={{ margin: 0, fontSize: 11.5, color: '#8e8e93', lineHeight: '16px' }}>Text Message • SMS</p>
            <p style={{ margin: 0, fontSize: 11.5, color: '#8e8e93', lineHeight: '16px' }}>Wed, Aug 13 at 8:29 PM</p>
          </div>
          {/* Chat bubbles */}
          <div style={{ padding: '0 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Main message */}
            <div style={{ display: 'flex', alignItems: 'flex-end', maxWidth: '82%' }}>
              <svg width="10" height="19" viewBox="0 0 10 19" style={{ flexShrink: 0 }}>
                <path d="M10 19 C5 15, 0 9, 0 0 L10 0 Z" fill="#e9e9eb"/>
              </svg>
              <div style={{ background: '#e9e9eb', borderRadius: '0 18px 18px 2px', padding: '9px 13px' }}>
                <p style={{ margin: 0, fontSize: 17, color: '#000', lineHeight: '22px', letterSpacing: '-0.408px' }}>{msg}</p>
              </div>
            </div>
            {/* Link preview */}
            <div style={{ display: 'flex', alignItems: 'flex-end', marginLeft: 10 }}>
              <div style={{ background: '#e9e9eb', borderRadius: 18, padding: '8px 14px 8px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={smsIgIcon} alt="Instagram" style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0 }} />
                <div>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#000', lineHeight: '19px' }}>See next steps · Instagram</p>
                  <p style={{ margin: 0, fontSize: 13, color: '#848484' }}>instagram.com</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          {/* Input bar */}
          <div style={{ borderTop: '0.5px solid #c8c8cc', padding: '8px 12px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid #8e8e93', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 2v9M2 6.5h9" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <div style={{ flex: 1, height: 34, borderRadius: 17, background: '#fff', border: '1px solid #c7c7cc', display: 'flex', alignItems: 'center', padding: '0 14px' }}>
              <span style={{ fontSize: 15, color: '#8e8e93' }}>Text Message • SMS</span>
            </div>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0 }}>
              <path d="M11 3 C8 3, 4 5.5, 4 9.5 C4 13 7 15.5 11 15.5 C11 15.5 10 17 9 18 L14 16.5 C16.5 15 18 12.5 18 9.5 C18 5.5 14 3 11 3Z" stroke="#8e8e93" strokeWidth="1.3" fill="none"/>
            </svg>
          </div>
        </div>
      </Scaled>
    </Shell>
  );

  // ── Email phone mockup (built from Figma node 2824:233022) ───────────────
  const emIgGlyph  = 'https://www.figma.com/api/mcp/asset/0752093c-ffba-4657-b576-97d12d5ffcdf';
  const emLockup   = 'https://www.figma.com/api/mcp/asset/d50df503-2c3c-45a4-a529-98e3d64036c8';
  const emBack     = 'https://www.figma.com/api/mcp/asset/3d9324c7-48b6-42f2-b517-56b5d5a119ec';
  const emArchive  = 'https://www.figma.com/api/mcp/asset/815ac254-0d63-4adf-bf93-3247dd681b99';
  const emTrash    = 'https://www.figma.com/api/mcp/asset/6a8875a5-2e54-4de8-ae7a-a3daae375d41';
  const emEnvelope = 'https://www.figma.com/api/mcp/asset/94623456-569a-4100-839c-c366f719a245';
  const emMore     = 'https://www.figma.com/api/mcp/asset/69576c5f-0f14-40f6-8068-56d77ec911c9';
  const emOverflow = 'https://www.figma.com/api/mcp/asset/267e570a-da1f-476d-8d01-ba23cd5ef16a';
  const emChevDn   = 'https://www.figma.com/api/mcp/asset/aa209ea8-9813-4c99-8187-c0c1d5825962';
  const emWifi     = 'https://www.figma.com/api/mcp/asset/5c56756c-aee1-4dd7-a369-77ea96d17ed6';
  const emSignal   = 'https://www.figma.com/api/mcp/asset/60b6232c-d07a-42e7-9cf9-72b0a960bcb7';
  const em941      = 'https://www.figma.com/api/mcp/asset/e2d34f9c-4a7a-4bcf-b2bb-82ddee0a894a';
  const emMeta     = 'https://www.figma.com/api/mcp/asset/1e18839f-5ad0-48fd-8ff2-3e119d50adfa';

  const EmailPhone = () => (
    <Shell>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'scroll' }} className="no-scrollbar">
        <Scaled nW={375}>
          <div style={{ width: 375, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', background: '#fff' }}>
            {/* Status bar */}
            <div style={{ height: 40, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px' }}>
              <img src={em941} alt="" style={{ height: 10 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <img src={emSignal} alt="" style={{ height: 10 }} />
                <img src={emWifi} alt="" style={{ height: 10 }} />
              </div>
            </div>
            {/* Action bar */}
            <div style={{ height: 45, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', borderBottom: '0.5px solid #e8e8e8' }}>
              <img src={emBack} alt="" style={{ height: 22 }} />
              <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                <img src={emArchive} alt="" style={{ height: 22 }} />
                <img src={emTrash} alt="" style={{ height: 22 }} />
                <img src={emEnvelope} alt="" style={{ height: 22 }} />
                <img src={emMore} alt="" style={{ height: 22 }} />
              </div>
            </div>
            {/* Subject */}
            <div style={{ background: '#fff', padding: '12px 14px 8px' }}>
              <p style={{ margin: 0, fontSize: 19, color: '#292929', lineHeight: 1.3, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>In 2 weeks, you won't be able to use Instagram</p>
            </div>
            {/* Sender row */}
            <div style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 14px 10px', borderBottom: '0.5px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fff', border: '0.5px solid rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={emIgGlyph} alt="" style={{ width: 22, height: 22 }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ fontSize: 14.5, color: '#292929', fontWeight: 500 }}>Instagram</span>
                    <span style={{ fontSize: 10, color: '#686b70' }}>Nov 10</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 12.5, color: '#5f6267' }}>to me</span>
                    <img src={emChevDn} alt="" style={{ height: 5 }} />
                  </div>
                </div>
              </div>
              <img src={emOverflow} alt="" style={{ height: 18 }} />
            </div>
            {/* Instagram lockup header */}
            <div style={{ background: '#fff', padding: '18px 0 14px', display: 'flex', justifyContent: 'center', borderBottom: '1px solid #f0f0f0' }}>
              <img src={emLockup} alt="Instagram" style={{ height: 28 }} />
            </div>
            {/* Body */}
            <div style={{ background: '#fff', padding: '15px', fontSize: 14, color: '#000', lineHeight: '18px' }}>
              <p style={{ margin: '0 0 12px' }}>Hi mwells77,</p>
              <p style={{ margin: '0 0 12px', fontSize: 13.5, lineHeight: '17px' }}>You won't be able to use social media, including Instagram and Threads, until you turn 16.</p>
              <p style={{ margin: '0 0 5px', fontWeight: 600 }}>What's happening</p>
              <p style={{ margin: '0 0 12px', fontSize: 13.5, lineHeight: '17px' }}>Due to laws in Australia, we won't be able to allow people under 16 who live in Australia to use Instagram starting in 2 weeks.</p>
              <p style={{ margin: '0 0 5px', fontWeight: 600 }}>What this means for you</p>
              <p style={{ margin: '0 0 12px', fontSize: 13.5, lineHeight: '17px' }}>You won't be visible to anyone on Instagram. You also won't be able to use your account until you turn 16. <span style={{ color: '#4a5df9', fontWeight: 600 }}>Learn more</span></p>
              <p style={{ margin: '0 0 8px', fontSize: 13.5, lineHeight: '17px' }}>We'll let you know as soon as you can use Instagram again. In the meantime, steps you can take:</p>
              <ul style={{ margin: '0 0 12px', paddingLeft: 18, fontSize: 13.5, lineHeight: '20px' }}>
                <li style={{ marginBottom: 3 }}><span style={{ color: '#4a5df9', fontWeight: 600 }}>Download your information</span> including your activity, posts and messages.</li>
                <li style={{ marginBottom: 3 }}><span style={{ color: '#4a5df9', fontWeight: 600 }}>Update your phone number</span> so we can text you when your account is back.</li>
                <li><span style={{ color: '#4a5df9', fontWeight: 600 }}>Update your email address</span> so we can email you when your account is back.</li>
              </ul>
              <p style={{ margin: '0 0 12px', fontSize: 13.5, lineHeight: '17px' }}>If you're 16 or over, you can <span style={{ color: '#4a5df9', fontWeight: 600 }}>review your birthday</span>.</p>
              <p style={{ margin: '0 0 3px' }}>Thanks,</p>
              <p style={{ margin: 0 }}>The Instagram Team</p>
            </div>
            {/* CTA + footer */}
            <div style={{ background: '#fff', padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, borderTop: '1px solid #f0f0f0' }}>
              <div style={{ background: '#4a5df9', borderRadius: 8, padding: '13px 20px', width: '100%', textAlign: 'center', boxSizing: 'border-box' as const }}>
                <span style={{ color: '#fff', fontWeight: 500, fontSize: 14 }}>Go to Instagram</span>
              </div>
              <span style={{ fontSize: 12, color: '#65676b' }}>from</span>
              <img src={emMeta} alt="Meta" style={{ height: 14 }} />
              <p style={{ margin: 0, fontSize: 11, color: '#65676b', textAlign: 'center', lineHeight: '15px' }}>
                © Instagram. Meta Platforms, Inc., 1601 Willow Road, Menlo Park, CA 94025<br /><br />
                This message was sent to <span style={{ color: '#0095f6' }}>user_email@gmail.com</span>. <span style={{ color: '#0095f6' }}>Learn more</span>
              </p>
            </div>
          </div>
        </Scaled>
      </div>
    </Shell>
  );

  const nLevels     = 'https://www.figma.com/api/mcp/asset/ae8bb837-0881-4469-a7f2-07ab37db1b4d';
  const nInfo       = 'https://www.figma.com/api/mcp/asset/e6fe4952-ab74-4abc-be2d-91b6905e3392';
  const nPhoto1     = 'https://www.figma.com/api/mcp/asset/5e94b372-a333-4261-941d-4c0cc6078b6c';
  const nPhoto2     = 'https://www.figma.com/api/mcp/asset/248c77d7-dc6e-4147-aba3-dff6eda856b9';
  const nMedia1     = 'https://www.figma.com/api/mcp/asset/e3d3687c-a77d-4359-9572-43a3ff44c9bb';

  const pLockBg     = 'https://www.figma.com/api/mcp/asset/861fc607-4866-40ba-baaf-bc6e74654693';
  const pIgIcon     = 'https://www.figma.com/api/mcp/asset/bacd4cfc-3da7-4ca4-8ac7-c9600e7891c3';

  const bnLevels    = 'https://www.figma.com/api/mcp/asset/db5c2604-c45e-4aae-a7a1-960dd5d3f8b8';
  const bnNewPost   = 'https://www.figma.com/api/mcp/asset/e3646081-4da6-46d4-b826-8b3a55a6dcb2';
  const bnMenu      = 'https://www.figma.com/api/mcp/asset/38806a87-14c2-4798-bcb5-3083cce94ec1';
  const bnRing      = 'https://www.figma.com/api/mcp/asset/d7c2c3cf-32bc-489b-b676-c67b9e3b0cc4';
  const bnPeople    = 'https://www.figma.com/api/mcp/asset/2e224c43-ef47-49fe-8df8-333d8d4598af';
  const bnGridIcon  = 'https://www.figma.com/api/mcp/asset/8130c8d2-e462-4158-afca-c8824e6803a5';
  const bnPhotos    = [
    'https://www.figma.com/api/mcp/asset/9d3a600e-5dca-4fbe-b906-3a452750101c',
    'https://www.figma.com/api/mcp/asset/b3ef96a0-644d-443d-b359-67025d744f52',
    'https://www.figma.com/api/mcp/asset/d75a3a6e-6949-4864-9d6b-35bf1f0a1e19',
    'https://www.figma.com/api/mcp/asset/38a57af9-9755-4dde-a02c-4d5bdc1c7ef4',
    'https://www.figma.com/api/mcp/asset/511f6fbe-dd82-4ffb-a9a5-f258854dff94',
    'https://www.figma.com/api/mcp/asset/72260491-2d64-446b-9ae7-d828a02cca0f',
  ];
  const BW = 375.213;

  const stageLabels = ['2 weeks out', '1 week out', 'Checkpoint day'];
  const stageTags   = ['First touch', 'Escalation', 'D-day'];

  return (
    <div style={{ marginTop: 0 }}>

      {/* Milestone selector */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          {stageLabels.map((label, i) => {
            const active = stage === i
            return (
              <React.Fragment key={label}>
                <button
                  type="button"
                  onClick={() => goToStage(i)}
                  aria-pressed={active}
                  aria-label={`${label} — ${stageTags[i]}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '6px 10px',
                    borderRadius: 8,
                    flexShrink: 0,
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.background = 'rgba(155,142,160,0.07)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <div
                    style={{
                      width: active ? 10 : 8,
                      height: active ? 10 : 8,
                      borderRadius: '50%',
                      background: active ? '#9b8ea0' : 'transparent',
                      border: `2px solid ${active ? '#9b8ea0' : '#d4ccd8'}`,
                      transition: 'all 0.25s ease',
                      boxShadow: active ? '0 0 0 3px rgba(155,142,160,0.14)' : 'none',
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase' as const,
                        color: active ? '#9b8ea0' : '#c4bcc8',
                        transition: 'color 0.25s ease',
                      }}
                    >
                      {stageTags[i]}
                    </span>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 11,
                        fontWeight: active ? 600 : 400,
                        color: active ? '#1a1614' : '#b0a8ba',
                        whiteSpace: 'nowrap' as const,
                        transition: 'color 0.25s ease, font-weight 0.2s ease',
                      }}
                    >
                      {label}
                    </span>
                  </div>
                </button>
                {i < stageLabels.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background: 'linear-gradient(90deg, rgba(155,142,160,0.28), rgba(155,142,160,0.12))',
                      margin: '0 4px',
                    }}
                  />
                )}
              </React.Fragment>
            )
          })}
      </div>

      {/* ── Rationale ── */}
      <div style={{
        opacity: screensVisible ? 1 : 0,
        transform: screensVisible ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        marginBottom: 24,
        padding: '14px 18px',
        background: 'rgba(155,142,160,0.06)',
        borderRadius: 10,
        borderLeft: `3px solid ${stage === 2 ? 'rgba(192,57,43,0.4)' : 'rgba(155,142,160,0.35)'}`,
      }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.75, color: '#5e5660', margin: 0 }}>
          {rationale[stage]}
        </p>
      </div>

      {/* ── Screens (purple-cursor wrapper) ── */}
      <div
        ref={cursorZoneRef}
        style={{ position: 'relative', overflow: 'hidden', opacity: screensVisible ? 1 : 0, transform: screensVisible ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}
        onMouseEnter={(e) => {
          const z = cursorZoneRef.current;
          if (!z) return;
          const r = z.getBoundingClientRect();
          mouseClientRef.current = { x: e.clientX, y: e.clientY };
          const tx = e.clientX - r.left;
          const ty = e.clientY - r.top;
          lagLocalRef.current = { x: tx, y: ty };
          setDotPos({ x: tx, y: ty });
          setHoveringScreens(true);
        }}
        onMouseLeave={() => setHoveringScreens(false)}
        onPointerLeave={() => setHoveringScreens(false)}
        onMouseMove={(e) => { mouseClientRef.current = { x: e.clientX, y: e.clientY }; }}
      >

      {/* ── 2 weeks row ── */}
      {stage === 0 && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingTop: 4, overflowX: 'auto', paddingBottom: 4, cursor: 'none' }}>

          {/* Quick Prompt */}
          <div style={{ flexShrink: 0 }}>
            <Shell>
              <Scaled nW={FRAME_W}>
                <div style={{ height:52, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', background:'#fff' }}>
                  <span style={{ fontSize:16.4, fontWeight:600, color:'#0c1014' }}>5:26</span>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <svg width="18" height="12" viewBox="0 0 18 12" fill="#0c1014"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
                    <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#0c1014" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#0c1014"/></svg>
                  </div>
                </div>
                <div style={{ height:48, display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 15px 8px', background:'#fff' }}>
                  <img src="/ig-wordmark.png" alt="Instagram" style={{ height:31, objectFit:'contain' }} />
                  <div style={{ display:'flex', gap:23 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.84-7.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>
                  </div>
                </div>
                <div style={{ display:'flex', padding:'4px 4px 10px', background:'#fff' }}>
                  {[{u:'mwells77',p:PHOTOS.mwells77,r:STORY_RING},{u:'aimi.allover',p:PHOTOS.aimi,r:STORY_RING},{u:'alex.any...',p:PHOTOS.alex,r:'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)'}].map(({u,p,r})=>(
                    <div key={u} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:7, padding:'7px 8px 0', flexShrink:0, width:86 }}>
                      <div style={{ width:66, height:66, borderRadius:'50%', background:r, padding:2.5 }}>
                        <div style={{ width:'100%', height:'100%', borderRadius:'50%', overflow:'hidden', border:'2.5px solid #fff' }}>
                          <img src={p} alt={u} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                        </div>
                      </div>
                      <span style={{ fontSize:11, color:'#0c1014', textAlign:'center', lineHeight:'14px', maxWidth:80, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{u}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background:'#fff', padding:'6px 15px 0', display:'flex', justifyContent:'flex-end' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="#0c1014" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </div>
                <div style={{ padding:'10px 30px 20px', display:'flex', flexDirection:'column', gap:12, alignItems:'center', background:'#fff' }}>
                  <p style={{ fontSize:15.5, fontWeight:700, color:'#0c1014', lineHeight:'19.3px', margin:0, textAlign:'center' }}>Soon, people under 16 will no longer be able to use social media</p>
                  <p style={{ fontSize:13.5, color:'#0c1014', lineHeight:'17.4px', margin:0, textAlign:'center' }}>Due to laws in Australia, you won't be able to use Instagram until you turn 16.</p>
                  <div style={{ background:'#4a5df9', borderRadius:7.8, padding:'7.5px 0', width:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontSize:13.5, fontWeight:600, color:'#fff' }}>See next steps</span>
                  </div>
                  <span style={{ fontSize:13, fontWeight:600, color:'#4a5df9' }}>{"I'm 16 or over"}</span>
                </div>
                {/* Feed post below QP card */}
                <div style={{ background:'#fff' }}>
                  {/* Post header */}
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'7.72px 15.43px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:7.7 }}>
                      <div style={{ width:38.6, height:38.6, borderRadius:'50%', overflow:'hidden', flexShrink:0 }}>
                        <img src="/feed-poster-avatar.png" alt="shayli_thomas" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      </div>
                      <span style={{ fontSize:13.5, fontWeight:600, color:'#0c1014', letterSpacing:'-0.14px' }}>shayli_thomas</span>
                    </div>
                    <svg width="20" height="4" viewBox="0 0 20 4" fill="#0c1014">
                      <circle cx="2" cy="2" r="2"/><circle cx="10" cy="2" r="2"/><circle cx="18" cy="2" r="2"/>
                    </svg>
                  </div>
                  {/* Post photo */}
                  <img src="/feed-post-photo.png" alt="shayli post" style={{ width:'100%', display:'block', aspectRatio:'1/1', objectFit:'cover' }} />
                </div>
              </Scaled>
            </Shell>
            <Lbl t="Quick Prompt" />
          </div>

          {/* SMS */}
          <div style={{ flexShrink: 0 }}>
            <SMSPhone msg="Due to laws in Australia, in 2 weeks you won't be able to use Instagram until you turn 16. See next steps." />
            <Lbl t="SMS" />
          </div>

          {/* Email — built from Figma */}
          <div style={{ flexShrink: 0 }}>
            <EmailPhone />
            <Lbl t="Email" />
          </div>

          {/* In-app notifications */}
          <div style={{ flexShrink: 0 }}>
            <Shell>
              <img src="/suite-inapp-notif.png" alt="In-app notif" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </Shell>
            <Lbl t="In-app notif" />
          </div>

          {/* Push notification */}
          <div style={{ flexShrink: 0 }}>
            <Shell>
              <img src="/suite-push-notif.png" alt="Push notif" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </Shell>
            <Lbl t="Push notif" />
          </div>

          {/* Profile banner */}
          <div style={{ flexShrink: 0 }}>
            <Shell>
              <Scaled nW={PROFILE_BANNER_W}>
                <ProfileBannerScreen />
              </Scaled>
            </Shell>
            <Lbl t="Profile banner" />
          </div>

        </div>
      )}

      {/* ── 1 week out — FSI + profile banner only ── */}
      {stage === 1 && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingTop: 4, overflowX: 'auto', paddingBottom: 4, cursor: 'none' }}>

          {/* Dismissable full-screen interstitial */}
          <div style={{ flexShrink: 0 }}>
            <Shell>
              <Scaled nW={EXPLORATION_FSI_W}>
                <ExplorationFSIScreen headline="Due to laws in Australia, in 1 week, people under 16 will no longer be able to use social media" />
              </Scaled>
            </Shell>
            <Lbl t="Full-screen interstitial" />
          </div>

          {/* Profile banner */}
          <div style={{ flexShrink: 0 }}>
            <Shell>
              <Scaled nW={PROFILE_BANNER_W}>
                <ProfileBannerScreen />
              </Scaled>
            </Shell>
            <Lbl t="Profile banner" />
          </div>

        </div>
      )}

      {/* ── Checkpoint day ── */}
      {stage === 2 && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingTop: 4, overflowX: 'auto', paddingBottom: 4, cursor: 'none' }}>

          {/* Blocking screen */}
          <div style={{ flexShrink: 0 }}>
            <Shell>
              <Scaled nW={FRAME_W}>
                <Screen3Checkpoint btnActive={false} scrollOffset={0} />
              </Scaled>
            </Shell>
            <Lbl t="Blocking screen" />
          </div>

          {/* SMS */}
          <div style={{ flexShrink: 0 }}>
            <SMSPhone msg="Due to laws in Australia, your Instagram account is now restricted. See next steps to find out what you can do." />
            <Lbl t="SMS" />
          </div>

          {/* Email */}
          <div style={{ flexShrink: 0 }}>
            <EmailPhone />
            <Lbl t="Email" />
          </div>

          {/* In-app notif */}
          <div style={{ flexShrink: 0 }}>
            <Shell>
              <img src="/suite-inapp-notif.png" alt="In-app notif" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </Shell>
            <Lbl t="In-app notif" />
          </div>

          {/* Push notif */}
          <div style={{ flexShrink: 0 }}>
            <Shell>
              <img src="/suite-push-notif.png" alt="Push notif" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </Shell>
            <Lbl t="Push notif" />
          </div>

          {/* Profile banner */}
          <div style={{ flexShrink: 0 }}>
            <Shell>
              <Scaled nW={PROFILE_BANNER_W}>
                <ProfileBannerScreen />
              </Scaled>
            </Shell>
            <Lbl t="Profile banner" />
          </div>

        </div>
      )}

        {/* Purple cursor dot — absolute inside zone so it never tracks the rest of the page */}
        {hoveringScreens && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: dotPos.x,
              top: dotPos.y,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'rgba(139,109,168,0.85)',
              pointerEvents: 'none',
              zIndex: 30,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 0 3px rgba(139,109,168,0.18)',
            }}
          />
        )}

      </div>{/* end cursor wrapper */}
    </div>
  );
}

// ── FinalPickSlider ─────────────────────────────────────────────────────────
// Animated slider that transitions the phone mockup from QP → FSI as time moves
// from "3 weeks out" to "1 week out"
function FinalPickSlider() {
  const [t, setT] = React.useState(0);
  const startRef = React.useRef<number | null>(null);
  const rafRef   = React.useRef<number | null>(null);
  const PERIOD   = 5000; // ms per half-cycle (3 wks → 1 wk)
  const PAUSE    = 1400; // ms to hold at each end

  React.useEffect(() => {
    let alive = true;
    // phase: 0 = forward (0→1), 1 = pause-at-1, 2 = reverse (1→0), 3 = pause-at-0
    let phase = 0;
    let phaseStart = 0;

    function tick(now: number) {
      if (!alive) return;
      if (startRef.current === null) { startRef.current = now; phaseStart = now; }
      const elapsed = now - phaseStart;
      let val: number;

      if (phase === 0) {
        const p = Math.min(elapsed / PERIOD, 1);
        val = (1 - Math.cos(p * Math.PI)) / 2;
        if (p >= 1) { phase = 1; phaseStart = now; }
      } else if (phase === 1) {
        val = 1;
        if (elapsed >= PAUSE) { phase = 2; phaseStart = now; }
      } else if (phase === 2) {
        const p = Math.min(elapsed / PERIOD, 1);
        val = 1 - (1 - Math.cos(p * Math.PI)) / 2;
        if (p >= 1) { phase = 3; phaseStart = now; }
      } else {
        val = 0;
        if (elapsed >= PAUSE) { phase = 0; phaseStart = now; }
      }

      setT(val!);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { alive = false; if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const ff       = 'system-ui, -apple-system, sans-serif';
  const PH_W     = 130;
  const qpScale  = PH_W / FRAME_W;      // 130/376 ≈ 0.3457
  const FSI_W    = 374.751;
  const fsiScale = PH_W / FSI_W;        // 130/374.751 ≈ 0.347
  const PH_H     = 238;

  const fsiClose    = 'https://www.figma.com/api/mcp/asset/2e2cab6b-6b3c-46d8-b922-2e85e9ff66a3';
  const fsiSettings = 'https://www.figma.com/api/mcp/asset/5892e9e5-4e3f-44a4-8571-b011cb0da649';
  const fsiUsers    = 'https://www.figma.com/api/mcp/asset/e0b39711-54d6-4c7e-b6b8-2b1af42cebb7';
  const mk = (url: string, sz = 24) => ({ background: '#0c1014', WebkitMaskImage: `url('${url}')`, maskImage: `url('${url}')`, WebkitMaskSize: `${sz}px ${sz}px`, maskSize: `${sz}px ${sz}px`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' } as React.CSSProperties);

  // Crossfade window: QP → FSI between t=0.35 and t=0.65
  const fsiOpacity = Math.max(0, Math.min(1, (t - 0.35) / 0.3));
  const qpOpacity  = 1 - fsiOpacity;
  const sliderPct  = t * 100;

  // Derive readable label
  const weekLabel  = t < 0.33 ? '3 weeks out' : t < 0.66 ? '2 weeks out' : '1 week out';
  const screenLabel = t < 0.5 ? 'Quick Prompt' : 'Full-screen interstitial';
  const accentCol  = `hsl(${136 - t * 96},${46 + t * 14}%,${55 - t * 12}%)`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: 160 }}>
      {/* Phone mockup */}
      <div style={{ width: PH_W, height: PH_H, borderRadius: 18, background: '#fff', border: '1px solid rgba(0,0,0,0.10)', overflow: 'hidden', position: 'relative', boxShadow: '0 8px 28px rgba(0,0,0,0.13)', flexShrink: 0 }}>

        {/* ── QP screen layer ── */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: qpOpacity }}>
          <div style={{ width: FRAME_W, transformOrigin: 'top left', transform: `scale(${qpScale})`, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
            <div style={{ height:52, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', background:'#fff' }}>
              <span style={{ fontSize:16.4, fontWeight:600, color:'#0c1014' }}>5:26</span>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <svg width="18" height="12" viewBox="0 0 18 12" fill="#0c1014"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
                <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#0c1014" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#0c1014"/></svg>
              </div>
            </div>
            <div style={{ height:48, display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 15px 8px', background:'#fff' }}>
              <img src="/ig-wordmark.png" alt="Instagram" style={{ height:31, width:'auto', objectFit:'contain' }} />
              <div style={{ display:'flex', gap:23, alignItems:'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.84-7.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>
              </div>
            </div>
            <div style={{ display:'flex', padding:'4px 4px 10px', background:'#fff', overflowX:'hidden' }}>
              {[{ user:'mwells77', photo: PHOTOS.mwells77, ring: STORY_RING },{ user:'aimi.allover', photo: PHOTOS.aimi, ring: STORY_RING },{ user:'alex.any...', photo: PHOTOS.alex, ring: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)' }].map(({ user, photo, ring }) => (
                <div key={user} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:7, padding:'7px 8px 0', flexShrink:0, width:86 }}>
                  <div style={{ width:66, height:66, borderRadius:'50%', background:ring, padding:2.5 }}>
                    <div style={{ width:'100%', height:'100%', borderRadius:'50%', overflow:'hidden', border:'2.5px solid #fff' }}>
                      <img src={photo} alt={user} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    </div>
                  </div>
                  <span style={{ fontSize:11, color:'#0c1014', textAlign:'center', lineHeight:'14px', maxWidth:80, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user}</span>
                </div>
              ))}
            </div>
            <div style={{ background:'#fff', padding:'8px 15px 0', display:'flex', alignItems:'center', justifyContent:'flex-end' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="#0c1014" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </div>
            <div style={{ padding:'10px 30px 22px', display:'flex', flexDirection:'column', gap:13, alignItems:'center', background:'#fff' }}>
              <p style={{ fontSize:15.5, fontWeight:700, color:'#0c1014', lineHeight:'19.3px', letterSpacing:'-0.31px', margin:0, textAlign:'center' }}>Soon, people under 16 will no longer be able to use social media</p>
              <p style={{ fontSize:13.5, color:'#0c1014', lineHeight:'17.4px', letterSpacing:'-0.14px', margin:0, textAlign:'center' }}>Due to laws in Australia, you won't be able to use Instagram until you turn 16.</p>
              <div style={{ background:'#4a5df9', borderRadius:7.8, padding:'7.5px 0', width:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:13.5, fontWeight:600, color:'#fff' }}>See next steps</span>
              </div>
              <span style={{ fontSize:13, fontWeight:600, color:'#4a5df9' }}>{"I'm 16 or over"}</span>
            </div>
          </div>
        </div>

        {/* ── FSI screen layer ── */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: fsiOpacity }}>
          <div style={{ width: FSI_W, transformOrigin: 'top left', transform: `scale(${fsiScale})`, fontFamily: ff, display: 'flex', flexDirection: 'column', height: 812, background: '#fff' }}>
            <div style={{ height: 51.889, display: 'flex', alignItems: 'center', padding: '0 15.37px', justifyContent: 'space-between', flexShrink: 0 }}>
              <span style={{ fontWeight: 600, fontSize: 16.34, color: '#0c1014' }}>5:26</span>
            </div>
            <div style={{ height: 42.28, display: 'flex', alignItems: 'center', padding: '0 15.37px', flexShrink: 0 }}>
              <div style={{ width: 23.062, height: 23.062, ...mk(fsiClose) }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '28px 32px', textAlign: 'center', flexShrink: 0 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 24, lineHeight: '30px', color: '#000' }}>
                  Due to laws in Australia, soon people under 16 will no longer be able to use social media
                </p>
              </div>
              {([
                { icon: fsiSettings, title: "What's happening", body: "Due to laws in Australia, people under 16 will no longer be able to use social media." },
                { icon: fsiUsers,    title: "What this means for you", body: "You will not be able to use your Instagram account until you turn 16." },
              ] as { icon: string; title: string; body: string }[]).map(({ icon, title, body }) => (
                <div key={title} style={{ display: 'flex', gap: 11.531, padding: '11.531px 23.062px', alignItems: 'flex-start', flexShrink: 0 }}>
                  <div style={{ paddingTop: 7.687, flexShrink: 0 }}><div style={{ width: 23.062, height: 23.062, ...mk(icon) }} /></div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14, lineHeight: '18px', color: '#0c1014' }}>{title}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 13.453, lineHeight: '17.296px', color: '#0c1014' }}>{body}</p>
                  </div>
                </div>
              ))}
              <div style={{ flex: 1 }} />
              <div style={{ padding: '15.37px', flexShrink: 0 }}>
                <div style={{ background: '#4a5df9', borderRadius: 8, padding: '12.492px', display: 'flex', justifyContent: 'center', marginBottom: 13 }}>
                  <span style={{ fontWeight: 600, fontSize: 13.45, color: '#fff' }}>See next steps</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: 13.45, color: '#4a5df9' }}>{"I'm 16 or over"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider track */}
      <div style={{ width: '100%', padding: '0 4px' }}>
        <div style={{ position: 'relative', height: 3, background: 'rgba(0,0,0,0.09)', borderRadius: 100 }}>
          <div style={{ position: 'absolute', left: 0, width: `${sliderPct}%`, height: '100%', background: `linear-gradient(90deg,#c4e0b8,${accentCol})`, borderRadius: 100 }} />
          <div style={{ position: 'absolute', top: '50%', left: `${sliderPct}%`, transform: 'translate(-50%,-50%)', width: 11, height: 11, borderRadius: '50%', background: '#fff', border: `2px solid ${accentCol}`, boxShadow: '0 2px 6px rgba(0,0,0,0.18)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: t < 0.2 ? '#5e5660' : '#c0b8c4', fontWeight: t < 0.2 ? 600 : 400 }}>3 wks out</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: t > 0.8 ? '#5e5660' : '#c0b8c4', fontWeight: t > 0.8 ? 600 : 400 }}>1 wk out</span>
        </div>
      </div>

      {/* Live label */}
      <div style={{ textAlign: 'center', minHeight: 32 }}>
        <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: accentCol }}>{weekLabel}</p>
        <p style={{ margin: '2px 0 0', fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#5e5660' }}>{screenLabel}</p>
      </div>
    </div>
  );
}

// ── Gate state machine ─────────────────────────────────────────────────────
// ── SolutionPrototype ─────────────────────────────────────────────────────────
// Self-contained copy of the interactive prototype block (own state, IntersectionObserver).
function SolutionPrototype() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [activePath, setActivePath] = React.useState<'under16' | 'over16'>('under16')
  const [timelineVisible, setTimelineVisible] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => { setActivePath('under16') }, [activeStep])

  React.useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimelineVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handlePathComplete = React.useCallback(() => {
    setActivePath(prev => prev === 'under16' ? 'over16' : 'under16')
  }, [])

  return (
    <div ref={rootRef} style={{
      background: '#e8d5eb',
      borderRadius: 24,
      padding: '48px 44px',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      columnGap: timelineVisible ? 64 : 0,
      alignItems: 'center',
      transition: 'column-gap 0.9s cubic-bezier(0.4,0,0.2,1)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Organic colour blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-18%', left: '-8%',  width: '55%', height: '70%', borderRadius: '60% 40% 55% 45%', background: 'radial-gradient(ellipse at 40% 40%, rgba(255,210,195,0.55) 0%, transparent 70%)', filter: 'blur(28px)' }}/>
        <div style={{ position: 'absolute', bottom: '-14%', right: '-6%', width: '50%', height: '65%', borderRadius: '45% 55% 40% 60%', background: 'radial-gradient(ellipse at 60% 60%, rgba(195,175,240,0.45) 0%, transparent 70%)', filter: 'blur(32px)' }}/>
        <div style={{ position: 'absolute', top: '30%', right: '10%',  width: '38%', height: '50%', borderRadius: '50% 50% 45% 55%', background: 'radial-gradient(ellipse at 50% 50%, rgba(255,220,230,0.38) 0%, transparent 70%)', filter: 'blur(24px)' }}/>
        <div style={{ position: 'absolute', bottom: '10%', left: '15%', width: '32%', height: '42%', borderRadius: '55% 45% 50% 50%', background: 'radial-gradient(ellipse at 50% 50%, rgba(180,215,210,0.30) 0%, transparent 70%)', filter: 'blur(20px)' }}/>
      </div>

      {/* Left: feature timeline */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', minWidth: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: timelineVisible ? 230 : 0, overflow: 'hidden', flexShrink: 0, transition: 'max-width 0.9s cubic-bezier(0.4,0,0.2,1)' }}>
          <div style={{ width: 210, opacity: timelineVisible ? 1 : 0, transform: timelineVisible ? 'translateX(0)' : 'translateX(-18px)', transition: 'opacity 0.45s ease 0.18s, transform 0.5s cubic-bezier(0.4,0,0.2,1) 0.12s', display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.32)', marginBottom: 18 }}>Features</p>
            {['Advanced notifications', 'Checkpoint', 'Reactivation', 'Parental view', 'Sign up flow'].map((title, i) => {
              const isActive = activeStep === i
              return (
                <div key={i} onClick={() => setActiveStep(i)} style={{ padding: '10px 14px', marginBottom: 3, borderRadius: 11, cursor: 'pointer', background: isActive ? 'rgba(255,255,255,0.38)' : 'transparent', backdropFilter: isActive ? 'blur(14px)' : 'none', WebkitBackdropFilter: isActive ? 'blur(14px)' : 'none', border: isActive ? '0.5px solid rgba(255,255,255,0.55)' : '0.5px solid transparent', boxShadow: isActive ? '0 4px 18px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.65)' : 'none', transition: 'background 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: isActive ? 500 : 400, color: isActive ? 'rgba(0,0,0,0.82)' : 'rgba(0,0,0,0.38)', lineHeight: 1.3, transition: 'color 0.22s ease' }}>{title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Centre: phone */}
      <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <PhoneMockup
          key={`sp-${activeStep}-${activePath}`}
          activeFeature={activeStep}
          activePath={activePath}
          onPathComplete={handlePathComplete}
        />
      </div>

      {/* Right: flow annotation */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', minWidth: 0, position: 'relative', zIndex: 1 }}>
        {(activeStep === 0 || activeStep === 1) && (
          <div style={{ maxWidth: timelineVisible ? 160 : 0, overflow: 'hidden', flexShrink: 0, transition: 'max-width 0.9s cubic-bezier(0.4,0,0.2,1)' }}>
            <div style={{ width: 148, display: 'flex', flexDirection: 'column', gap: 8, opacity: timelineVisible ? 1 : 0, transform: timelineVisible ? 'translateX(0)' : 'translateX(14px)', transition: 'opacity 0.45s ease 0.55s, transform 0.5s cubic-bezier(0.4,0,0.2,1) 0.45s' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.30)', margin: '0 0 6px 18px' }}>User flows</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 7, top: 18, bottom: 18, width: 1, background: 'rgba(0,0,0,0.14)' }}/>
                {[
                  { path: 'under16' as const, dotColor: '#4a5df9', label: 'Under 16',  action: '"See next steps"', dest: 'Offboarding flow' },
                  { path: 'over16'  as const, dotColor: 'rgba(0,0,0,0.30)', label: '16 or over', action: '"I\'m 16 or over"', dest: 'Age verification' },
                ].map(({ path, dotColor, label, action, dest }) => {
                  const isPlaying = activePath === path
                  return (
                    <div key={path} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, marginTop: 14 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: isPlaying ? dotColor : 'rgba(0,0,0,0.18)', flexShrink: 0, zIndex: 1, transition: 'background 0.3s ease' }}/>
                        <div style={{ width: 10, height: 1, background: 'rgba(0,0,0,0.14)' }}/>
                      </div>
                      <div onClick={() => setActivePath(path)} style={{ flex: 1, padding: '10px 12px', borderRadius: 11, cursor: 'pointer', background: isPlaying ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.16)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: isPlaying ? '0.5px solid rgba(255,255,255,0.58)' : '0.5px solid rgba(255,255,255,0.28)', boxShadow: isPlaying ? '0 3px 14px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.65)' : 'none', transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease' }}>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: isPlaying ? dotColor : 'rgba(0,0,0,0.30)', margin: '0 0 5px', transition: 'color 0.3s ease' }}>{label}</p>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, fontWeight: 500, color: isPlaying ? 'rgba(0,0,0,0.78)' : 'rgba(0,0,0,0.38)', margin: '0 0 7px', lineHeight: 1.35, transition: 'color 0.3s ease' }}>{action}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <div style={{ width: 14, height: 1, background: isPlaying ? 'rgba(0,0,0,0.20)' : 'rgba(0,0,0,0.10)' }}/>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 400, color: isPlaying ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.28)', margin: 0, lineHeight: 1.3, transition: 'color 0.3s ease' }}>{dest}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

type GatePhase = 'locked' | 'decrypting' | 'expanding' | 'unlocked'

export default function InstagramCaseStudy({ onBack }: Props) {
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

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-content items-center justify-between px-20 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-inter text-sm text-ink-secondary transition-colors hover:text-ink-primary"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <nav className="flex items-center gap-8">
            <a href="https://linkedin.com" target="_blank" rel="noopener"
               className="font-hand text-[18px] text-ink-secondary transition-colors hover:text-ink-primary">
              LinkedIn
            </a>
            <a href="#playground"
               className="font-hand text-[18px] text-ink-secondary transition-colors hover:text-ink-primary">
              Playground
            </a>
          </nav>
        </div>
      </header>

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
            /* ── Unlocked: revealed content ── */
            <div>
              {/* Label */}
              <div
                className="reveal-item mb-16"
                style={{ animationDelay: '0ms' }}
              >
                <p className="font-hand text-[18px] text-ink-tertiary mb-2">The solution</p>
                <h2 className="font-serif text-[clamp(22px,2.4vw,32px)] leading-snug tracking-[-0.03em] text-ink-primary" style={{ maxWidth: 560 }}>
                  An experience that...{' '}
                  <span className="font-inter text-ink-tertiary" style={{ whiteSpace: 'nowrap', fontSize: 'clamp(14px,1.4vw,18px)', fontWeight: 400 }}>gives teens advance notice about upcoming account restrictions and clear steps they can take to prepare</span>
                </h2>
              </div>

              {/* Timeline + phone two-column layout */}
              <div className="reveal-item" style={{ animationDelay: '120ms' }}>
                <div style={{
                  background: '#e8d5eb',
                  borderRadius: 24,
                  padding: '48px 44px',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto 1fr',
                  columnGap: timelineVisible ? 64 : 0,
                  alignItems: 'center',
                  transition: 'column-gap 0.9s cubic-bezier(0.4,0,0.2,1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Organic colour blobs — decorative, pointer-events off */}
                  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                    <div style={{ position: 'absolute', top: '-18%', left: '-8%',  width: '55%', height: '70%', borderRadius: '60% 40% 55% 45%', background: 'radial-gradient(ellipse at 40% 40%, rgba(255,210,195,0.55) 0%, transparent 70%)', filter: 'blur(28px)' }}/>
                    <div style={{ position: 'absolute', bottom: '-14%', right: '-6%', width: '50%', height: '65%', borderRadius: '45% 55% 40% 60%', background: 'radial-gradient(ellipse at 60% 60%, rgba(195,175,240,0.45) 0%, transparent 70%)', filter: 'blur(32px)' }}/>
                    <div style={{ position: 'absolute', top: '30%', right: '10%',  width: '38%', height: '50%', borderRadius: '50% 50% 45% 55%', background: 'radial-gradient(ellipse at 50% 50%, rgba(255,220,230,0.38) 0%, transparent 70%)', filter: 'blur(24px)' }}/>
                    <div style={{ position: 'absolute', bottom: '10%', left: '15%', width: '32%', height: '42%', borderRadius: '55% 45% 50% 50%', background: 'radial-gradient(ellipse at 50% 50%, rgba(180,215,210,0.30) 0%, transparent 70%)', filter: 'blur(20px)' }}/>
                  </div>

                  {/* ── Left grid cell: timeline, right-aligned so it grows toward the phone ── */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', minWidth: 0, position: 'relative', zIndex: 1 }}>
                  <div style={{
                    maxWidth: timelineVisible ? 230 : 0,
                    overflow: 'hidden',
                    flexShrink: 0,
                    transition: 'max-width 0.9s cubic-bezier(0.4,0,0.2,1)',
                  }}>
                  <div style={{
                    width: 210,
                    opacity: timelineVisible ? 1 : 0,
                    transform: timelineVisible ? 'translateX(0)' : 'translateX(-18px)',
                    transition: 'opacity 0.45s ease 0.18s, transform 0.5s cubic-bezier(0.4,0,0.2,1) 0.12s',
                    display: 'flex', flexDirection: 'column',
                  }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.32)', marginBottom: 18 }}>Features</p>

                    {['Advanced notifications', 'Checkpoint', 'Reactivation', 'Parental view', 'Sign up flow'].map((title, i) => {
                      const isActive = activeStep === i
                      return (
                        <div
                          key={i}
                          onClick={() => setActiveStep(i)}
                          style={{
                            padding: '10px 14px',
                            marginBottom: 3,
                            borderRadius: 11,
                            cursor: 'pointer',
                            background: isActive ? 'rgba(255,255,255,0.38)' : 'transparent',
                            backdropFilter: isActive ? 'blur(14px)' : 'none',
                            WebkitBackdropFilter: isActive ? 'blur(14px)' : 'none',
                            border: isActive ? '0.5px solid rgba(255,255,255,0.55)' : '0.5px solid transparent',
                            boxShadow: isActive ? '0 4px 18px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.65)' : 'none',
                            transition: 'background 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
                          }}
                        >
                          <span style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 13,
                            fontWeight: isActive ? 500 : 400,
                            color: isActive ? 'rgba(0,0,0,0.82)' : 'rgba(0,0,0,0.38)',
                            lineHeight: 1.3,
                            transition: 'color 0.22s ease',
                          }}>
                            {title}
                          </span>
                        </div>
                      )
                    })}
                  </div>{/* end inner timeline content */}
                  </div>{/* end maxWidth clip wrapper */}
                  </div>{/* end left grid cell */}

                  {/* ── Centre: phone ── */}
                  <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
                    <PhoneMockup
                      key={`${activeStep}-${activePath}`}
                      activeFeature={activeStep}
                      activePath={activePath}
                      onPathComplete={handlePathComplete}
                    />
                  </div>

                  {/* ── Right grid cell: flow annotation ── */}
                  <div style={{ display: 'flex', justifyContent: 'flex-start', minWidth: 0, position: 'relative', zIndex: 1 }}>
                    {(activeStep === 0 || activeStep === 1) && (
                      <div style={{
                        maxWidth: timelineVisible ? 160 : 0,
                        overflow: 'hidden',
                        flexShrink: 0,
                        transition: 'max-width 0.9s cubic-bezier(0.4,0,0.2,1)',
                      }}>
                      <div style={{
                        width: 148,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        opacity: timelineVisible ? 1 : 0,
                        transform: timelineVisible ? 'translateX(0)' : 'translateX(14px)',
                        transition: 'opacity 0.45s ease 0.55s, transform 0.5s cubic-bezier(0.4,0,0.2,1) 0.45s',
                      }}>

                        {/* Label */}
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.30)', margin: '0 0 6px 18px' }}>User flows</p>

                        {/* Fork connector + two path cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>

                          {/* Vertical fork line */}
                          <div style={{
                            position: 'absolute',
                            left: 7,
                            top: 18,
                            bottom: 18,
                            width: 1,
                            background: 'rgba(0,0,0,0.14)',
                          }}/>

                          {/* Path 1 — Under 16 */}
                          {[
                            { path: 'under16' as const, dotColor: '#4a5df9', label: 'Under 16', action: '"See next steps"', dest: 'Offboarding flow' },
                            { path: 'over16'  as const, dotColor: 'rgba(0,0,0,0.30)', label: '16 or over', action: '"I\'m 16 or over"', dest: 'Age verification' },
                          ].map(({ path, dotColor, label, action, dest }) => {
                            const isPlaying = activePath === path
                            return (
                              <div key={path} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, marginTop: 14 }}>
                                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: isPlaying ? dotColor : 'rgba(0,0,0,0.18)', flexShrink: 0, zIndex: 1, transition: 'background 0.3s ease' }}/>
                                  <div style={{ width: 10, height: 1, background: 'rgba(0,0,0,0.14)' }}/>
                                </div>
                                <div
                                  onClick={() => setActivePath(path)}
                                  style={{
                                  flex: 1, padding: '10px 12px', borderRadius: 11,
                                  cursor: 'pointer',
                                  background: isPlaying ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.16)',
                                  backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                                  border: isPlaying ? '0.5px solid rgba(255,255,255,0.58)' : '0.5px solid rgba(255,255,255,0.28)',
                                  boxShadow: isPlaying ? '0 3px 14px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.65)' : 'none',
                                  transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
                                }}>
                                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: isPlaying ? dotColor : 'rgba(0,0,0,0.30)', margin: '0 0 5px', transition: 'color 0.3s ease' }}>{label}</p>
                                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, fontWeight: 500, color: isPlaying ? 'rgba(0,0,0,0.78)' : 'rgba(0,0,0,0.38)', margin: '0 0 7px', lineHeight: 1.35, transition: 'color 0.3s ease' }}>{action}</p>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                    <div style={{ width: 14, height: 1, background: isPlaying ? 'rgba(0,0,0,0.20)' : 'rgba(0,0,0,0.10)' }}/>
                                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 400, color: isPlaying ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.28)', margin: 0, lineHeight: 1.3, transition: 'color 0.3s ease' }}>{dest}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })}

                        </div>
                      </div>
                      </div>
                    )}
                  </div>{/* end right grid cell */}

                </div>

              </div>

            </div>
          )}
        </section>

        {/* ── Explorations + Final pick + Escalation timeline + Design decisions — only visible when unlocked ── */}
        {phase === 'unlocked' && <>

        {/* ── Explorations ── */}
        <section className="py-16 border-t border-black/[0.07]">
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#9b8ea0', marginBottom: 10 }}>
            Design decision 01
          </p>
          <h2 className="font-serif" style={{ fontSize: 28, lineHeight: 1.25, letterSpacing: '-0.03em', color: '#1a1614', margin: '0 0 16px' }}>
            Explorations for entry points on how to communicate the social media ban to teens
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.75, color: '#5e5660', margin: '0 0 36px', maxWidth: 560 }}>
            The first significant round of explorations we did was to figure out the entry points for informing teens about the social media ban and the actions they can take.
          </p>

          {/* Three exploration options */}
          {(() => {
            const cardS: React.CSSProperties = { borderRadius: 16, border: '1px solid rgba(155,130,200,0.18)', padding: '20px 16px 18px', background: 'linear-gradient(150deg, rgba(244,240,251,0.65) 0%, rgba(250,247,244,1) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center' };
            const optLabel: React.CSSProperties = { fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b0a8b4', display: 'block', marginBottom: 14, textAlign: 'center' };
            const titleS: React.CSSProperties = { fontSize: 14, lineHeight: 1.35, letterSpacing: '-0.02em', color: '#1a1614', marginTop: 12, marginBottom: 8, textAlign: 'center' };
            const PhoneFrame = ({ children, h = 290 }: { children: React.ReactNode; h?: number }) => (
              <div style={{ width: 160, height: h, borderRadius: 20, background: '#fff', border: '1px solid rgba(0,0,0,0.10)', overflow: 'hidden', position: 'relative', boxShadow: '0 8px 28px rgba(0,0,0,0.11)', flexShrink: 0 }}>
                {children}
              </div>
            );
            const Notes = ({ pros, cons }: { pros: string[]; cons: string[] }) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Inter, sans-serif', fontSize: 11, lineHeight: 1.55, width: '100%' }}>
                <p style={{ margin: 0, color: '#1a1614', paddingLeft: 16, position: 'relative' }}>
                  <svg style={{ position: 'absolute', left: 0, top: '0.18em' }} width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 5.5L4.2 8.2L9.5 2.8" stroke="#5aaa5a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {pros.join(' · ')}
                </p>
                <p style={{ margin: 0, color: '#1a1614', paddingLeft: 16, position: 'relative' }}>
                  <svg style={{ position: 'absolute', left: 0, top: '0.18em' }} width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 2l7 7M9 2l-7 7" stroke="#d05050" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  {cons.join(' · ')}
                </p>
              </div>
            );
            const fS = 160 / EXPLORATION_FSI_W
            const fProfile = 160 / PROFILE_BANNER_W

            return (
              <div className="grid grid-cols-3 gap-6 mb-14">

                {/* ── Option 01: Quick Prompt — exact Feature 0 prototype screen ── */}
                <div style={cardS}>
                  <span style={optLabel}>Option 01</span>
                  <PhoneFrame>
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                      <div style={{ width: FRAME_W, transformOrigin: 'top left', transform: `scale(${160/FRAME_W})`, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                        <div style={{ height:52, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', background:'#fff' }}>
                          <span style={{ fontSize:16.4, fontWeight:600, color:'#0c1014', letterSpacing:'-0.3px' }}>5:26</span>
                          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                            <svg width="18" height="12" viewBox="0 0 18 12" fill="#0c1014"><rect x="0" y="8" width="3" height="4" rx="0.8"/><rect x="5" y="5" width="3" height="7" rx="0.8"/><rect x="10" y="2" width="3" height="10" rx="0.8"/><rect x="15" y="0" width="3" height="12" rx="0.8"/></svg>
                            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.8" r="1.2" fill="#0c1014"/><path d="M4.8 7.4a4.5 4.5 0 0 1 6.4 0" stroke="#0c1014" strokeWidth="1.3" strokeLinecap="round"/><path d="M2 4.6a8 8 0 0 1 12 0" stroke="#0c1014" strokeWidth="1.3" strokeLinecap="round"/></svg>
                            <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#0c1014" strokeOpacity="0.35" strokeWidth="1"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#0c1014"/><path d="M23.5 4.5v4a2 2 0 0 0 0-4Z" fill="#0c1014" opacity="0.4"/></svg>
                          </div>
                        </div>
                        <div style={{ height:48, display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 15px 8px', background:'#fff' }}>
                          <img src="/ig-wordmark.png" alt="Instagram" style={{ height:31, width:'auto', objectFit:'contain' }} />
                          <div style={{ display:'flex', gap:23, alignItems:'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.84-7.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>
                            <div style={{ position:'relative' }}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1014" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9l20-7Z"/></svg>
                              <div style={{ position:'absolute', top:-6, right:-7, minWidth:16, height:16, borderRadius:8, background:'#E1306C', border:'2px solid #fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, color:'#fff', lineHeight:1, padding:'0 4px' }}>1</div>
                            </div>
                          </div>
                        </div>
                        <div style={{ display:'flex', padding:'4px 4px 12px', background:'#fff', overflowX:'hidden' }}>
                          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:7, padding:'7px 8px 0', flexShrink:0, width:86 }}>
                            <div style={{ position:'relative', width:66, height:66 }}>
                              <div style={{ width:66, height:66, borderRadius:'50%', overflow:'hidden', border:'1px solid #e0e0e0' }}>
                                <img src={PHOTOS.yours} alt="Your story" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                              </div>
                              <div style={{ position:'absolute', bottom:1, right:1, width:19, height:19, borderRadius:'50%', background:'#3897f0', border:'2px solid #fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
                                <svg width="9" height="9" viewBox="0 0 10 10"><path d="M5 2v6M2 5h6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>
                              </div>
                            </div>
                            <span style={{ fontSize:11, color:'#6a717a', textAlign:'center', lineHeight:'14px' }}>Your story</span>
                          </div>
                          {[{ user:'mwells77', photo: PHOTOS.mwells77, ring: STORY_RING },{ user:'aimi.allover', photo: PHOTOS.aimi, ring: STORY_RING },{ user:'alex.any...', photo: PHOTOS.alex, ring: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)' }].map(({ user, photo, ring }) => (
                            <div key={user} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:7, padding:'7px 8px 0', flexShrink:0, width:86 }}>
                              <div style={{ width:66, height:66, borderRadius:'50%', background:ring, padding:2.5, flexShrink:0 }}>
                                <div style={{ width:'100%', height:'100%', borderRadius:'50%', overflow:'hidden', border:'2.5px solid #fff' }}>
                                  <img src={photo} alt={user} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                                </div>
                              </div>
                              <span style={{ fontSize:11, color:'#0c1014', textAlign:'center', lineHeight:'14px', maxWidth:80, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ background:'#fff' }}>
                          <div style={{ height:27, display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:15 }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="#0c1014" strokeWidth="1.4" strokeLinecap="round"/></svg>
                          </div>
                          <div style={{ padding:'12px 30px 24px', display:'flex', flexDirection:'column', gap:15, alignItems:'center' }}>
                            <div style={{ textAlign:'center' }}>
                              <p style={{ fontSize:15.5, fontWeight:700, color:'#0c1014', lineHeight:'19.3px', letterSpacing:'-0.31px', margin:'0 0 5px' }}>Soon, people under 16 will no longer be able to use social media</p>
                              <p style={{ fontSize:13.5, fontWeight:400, color:'#0c1014', lineHeight:'17.4px', letterSpacing:'-0.14px', margin:0 }}>Due to laws in Australia, you won't be able to use Instagram until you turn 16, and your profile won't be visible to you or others until then.</p>
                            </div>
                            <div style={{ display:'flex', flexDirection:'column', gap:11, alignItems:'center', width:'100%' }}>
                              <div style={{ background:'#4a5df9', borderRadius:7.8, padding:'7.5px 0', width:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                                <span style={{ fontSize:13.5, fontWeight:600, color:'#fff', letterSpacing:'-0.15px' }}>See next steps</span>
                              </div>
                              <span style={{ fontSize:13, fontWeight:600, color:'#4a5df9', letterSpacing:'-0.14px' }}>{"I'm 16 or over"}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ height:0.5, background:'#dbdfe4' }} />
                        <div style={{ height:52, display:'flex', alignItems:'center', padding:'0 15px', justifyContent:'space-between' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                            <div style={{ width:32, height:32, borderRadius:'50%', overflow:'hidden', background:'#eee', flexShrink:0 }}>
                              <img src={PHOTOS.shayli} alt="shayli_thomas" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                            </div>
                            <span style={{ fontSize:13.5, fontWeight:600, color:'#0c1014', letterSpacing:'-0.14px' }}>shayli_thomas</span>
                          </div>
                          <svg width="20" height="5" viewBox="0 0 20 5" fill="#0c1014"><circle cx="2.5" cy="2.5" r="2.5"/><circle cx="10" cy="2.5" r="2.5"/><circle cx="17.5" cy="2.5" r="2.5"/></svg>
                        </div>
                        <div style={{ width:'100%', height:330, overflow:'hidden' }}>
                          <img src={PHOTOS.post} alt="post" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%' }} />
                        </div>
                      </div>
                    </div>
                  </PhoneFrame>
                  <h3 className="font-serif" style={titleS}>Quick Prompt on the home feed</h3>
                  <Notes
                    pros={['High visibility · respects user autonomy']}
                    cons={['QP blindness from overexposure · not a permanent entry point']}
                  />
                </div>

                {/* ── Option 02: Full-screen interstitial ── */}
                <div style={cardS}>
                  <span style={optLabel}>Option 02</span>
                  <PhoneFrame>
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                      <div style={{ width: EXPLORATION_FSI_W, transformOrigin: 'top left', transform: `scale(${fS})` }}>
                        <ExplorationFSIScreen />
                      </div>
                    </div>
                  </PhoneFrame>
                  <h3 className="font-serif" style={titleS}>Full-screen interstitial</h3>
                  <Notes
                    pros={["Impossible to overlook"]}
                    cons={['Can feel like a punitive blocker · not a permanent entry point']}
                  />
                </div>

                {/* ── Option 03: Persistent profile banner (same as suite section) ── */}
                <div style={cardS}>
                  <span style={optLabel}>Option 03</span>
                  <PhoneFrame>
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                      <div style={{ width: PROFILE_BANNER_W, transformOrigin: 'top left', transform: `scale(${fProfile})` }}>
                        <ProfileBannerScreen />
                      </div>
                    </div>
                  </PhoneFrame>
                  <h3 className="font-serif" style={titleS}>Persistent profile banner</h3>
                  <Notes
                    pros={['Always available — teens can return on their own terms']}
                    cons={['Limited space to explain the situation · lower visibility surface']}
                  />
                </div>

              </div>
            );
          })()}

          {/* ── Final pick ── */}
          <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,#f4f0fb 0%,#faf9f7 100%)', border: '1px solid rgba(155,130,200,0.22)', padding: '32px 36px', marginBottom: 48, display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#9e7ecf' }}>Final pick</span>
                <div style={{ height: '0.5px', width: 24, background: 'rgba(155,130,200,0.4)' }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#b0a8b4' }}>Hybrid approach</span>
              </div>
              <h3 className="font-serif" style={{ fontSize: 22, lineHeight: 1.3, letterSpacing: '-0.025em', color: '#1a1614', margin: '0 0 14px' }}>
                A progressive communication system
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.7, color: '#5e5660', margin: '0 0 14px' }}>
                We came to the realization that none of these options alone could carry the full weight of the communication. With only three weeks to convey sweeping, legally significant changes to millions of teens, we{' '}
                <strong style={{ fontWeight: 600, color: '#1a1614' }}>
                  quickly realised the right solution wasn't a single surface. Instead, it was a sequenced suite adopting an increasingly aggressive approach.
                </strong>
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.7, color: '#5e5660', margin: '0 0 28px' }}>
                2 weeks ahead was the earliest we could reach them given the tight timeline of the project.
              </p>
            </div>

            {/* Escalation timeline — overview before interactive suite */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9b8ea0', margin: 0 }}>
                  Communication escalation timeline
                </p>
                <div style={{ flex: 1, height: '0.5px', background: 'rgba(0,0,0,0.09)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#b0a4b5' }}>low</span>
                  {['#c4e0b8', '#f5a843', '#e05555'].map(c => (
                    <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                  ))}
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#b0a4b5' }}>high</span>
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                {[
                  { time: '2 weeks out', style: 'Lightweight awareness', desc: 'Subtle in-app nudges informing teens the ban is coming, kept low-pressure and easy to dismiss.', intensity: 1, color: '#c4e0b8' },
                  { time: '1 week out', style: 'Interruptive flows', desc: 'Full-screen moments that pause the experience and require acknowledgement before continuing.', intensity: 2, color: '#f5a843' },
                  { time: 'Checkpoint day', style: 'Blocking experience', desc: 'Account access suspended. A clear, supportive screen explaining next steps and available options.', intensity: 3, color: '#e05555' },
                ].map(({ time, style: commsStyle, desc, intensity, color }, i, arr) => (
                  <div key={time} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '0 40px', padding: '20px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', alignItems: 'start' }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: '#9b8ea0', paddingTop: 3, margin: 0 }}>{time}</p>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {Array.from({ length: 3 }).map((_, j) => (
                            <div key={j} style={{ width: 7, height: 7, borderRadius: '50%', background: j < intensity ? color : 'rgba(0,0,0,0.08)' }} />
                          ))}
                        </div>
                        <p style={{ fontFamily: '"Fjord One", serif', fontSize: 15, color: '#1a1208', margin: 0 }}>{commsStyle}</p>
                      </div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#7a6e74', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="font-serif" style={{ fontSize: 22, lineHeight: 1.3, letterSpacing: '-0.025em', color: '#1a1614', margin: '8px 0 20px' }}>
              The final pick — what the explorations led to
            </h3>
            <SuiteSection />
          </div>
        </section>

        {/* ── Design decisions ── */}
        <section className="py-16 border-t border-black/[0.07]">
          {/* Section label */}
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#9b8ea0', marginBottom: 10 }}>
            Design decision 02
          </p>
          <h2 className="font-serif" style={{ fontSize: 28, lineHeight: 1.25, letterSpacing: '-0.03em', color: '#1a1614', margin: '0 0 16px' }}>
            Designing for users on both sides of the enforcement
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.75, color: '#5e5660', margin: '0 0 36px' }}>
            Now that we had the escalation framework down, there was a complication that stood in our way. Because enforcement relied on self-reported age rather than verified identity,{' '}
            <strong style={{ fontWeight: 600, color: '#1a1614' }}>
              the affected population included both legitimately underage users and incorrectly flagged adults who had entered the wrong birth year.
            </strong>{' '}
            This created a unique challenge: designing a single compliant experience that could support fundamentally different user intents without increasing confusion or policy risk.
          </p>

          {/* Split persona cards + constraint bridge */}
          <div style={{ marginBottom: 28 }}>
            {/* Two persona cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 0 }}>

              {/* Persona A */}
              <div style={{ borderRadius: 16, border: '1.5px solid rgba(74,93,249,0.32)', padding: '24px 28px 28px', background: 'linear-gradient(160deg,rgba(74,93,249,0.05) 0%,rgba(250,247,244,1) 100%)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(74,93,249,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="3" stroke="#4a5df9" strokeWidth="1.5"/><path d="M2 13.5c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#4a5df9" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#4a5df9' }}>Group A</span>
                </div>
                <h3 className="font-serif" style={{ fontSize: 17, lineHeight: 1.35, letterSpacing: '-0.02em', color: '#1a1614', margin: '0 0 10px' }}>
                  Teens genuinely under 16
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, lineHeight: 1.7, color: '#5e5660', margin: 0 }}>
                  The primary audience were teens who had inputted their birth year correctly and were genuinely under 16. They needed clear and empathetic communication about{' '}
                  <strong style={{ fontWeight: 600, color: '#1a1614' }}>
                    what was happening to their accounts and what steps they could take before the ban.
                  </strong>
                </p>
              </div>

              {/* Persona B */}
              <div style={{ borderRadius: 16, border: '1.5px solid rgba(230,140,80,0.40)', padding: '24px 28px 28px', background: 'linear-gradient(160deg,rgba(230,140,80,0.06) 0%,rgba(250,247,244,1) 100%)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(230,140,80,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="3" stroke="#c8742a" strokeWidth="1.5"/><path d="M2 13.5c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#c8742a" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 2l2 2m0-2l-2 2" stroke="#c8742a" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#c8742a' }}>Group B</span>
                </div>
                <h3 className="font-serif" style={{ fontSize: 17, lineHeight: 1.35, letterSpacing: '-0.02em', color: '#1a1614', margin: '0 0 10px' }}>
                  Users with an incorrect birth year
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, lineHeight: 1.7, color: '#5e5660', margin: 0 }}>
                  People 16 and older who had inputted the wrong birth year at sign-up, meaning the system wrongly flagged them as minors. Usage data showed this group was far more common than anticipated. They needed a{' '}
                  <strong style={{ fontWeight: 600, color: '#1a1614' }}>
                    clear way to exit the banning experience.
                  </strong>
                </p>
              </div>
            </div>
          </div>

          {/* ── Age-data ambiguity framing ── */}
          <div style={{ marginTop: 0, marginBottom: 48 }}>
            {/* Sub-question callout */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(139,109,168,0.11) 0%, rgba(162,125,190,0.07) 100%)',
              border: '1px solid rgba(139,109,168,0.22)',
              borderRadius: 16,
              padding: '40px 48px',
              marginBottom: 48,
              textAlign: 'center' as const,
            }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.10em',
                textTransform: 'uppercase' as const,
                color: 'rgba(112,80,145,0.70)',
                marginBottom: 18,
                marginTop: 0,
              }}>Sub-question</p>
              <p style={{
                fontFamily: '"Fjord One", serif',
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 1.55,
                color: '#2c1f38',
                letterSpacing: '-0.01em',
                margin: 0,
              }}>
                How might we create a compliant experience that supports both legitimately underage users and incorrectly flagged adults without increasing confusion?
              </p>
            </div>

            {/* ── Exploration sketches ── */}
            <div style={{ marginBottom: 56 }}>
              <h3 className="font-serif" style={{ fontSize: 20, lineHeight: 1.3, letterSpacing: '-0.02em', color: '#1a1614', margin: '0 0 6px', fontWeight: 400 }}>
                Explorations for an experience that supports both
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.75, color: '#5e5660', margin: '0 0 36px' }}>
                Three structural directions explored before landing on an approach.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>

                {/* ── Sketch A: bifurcated QP ── */}
                {(() => {
                  const sk: React.CSSProperties = { background: '#fff', border: '1px solid #e8e2f0', borderRadius: 14, padding: '22px 18px 18px', display: 'flex', flexDirection: 'column' as const, gap: 14 };
                  const lbl: React.CSSProperties = { fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#a898be', margin: 0 };
                  const cap: React.CSSProperties = { fontFamily: 'Inter, sans-serif', fontSize: 12.5, lineHeight: 1.65, color: '#7a6e82', margin: 0 };
                  return (
                    <div style={sk}>
                      <p style={lbl}>Option A</p>
                      <svg viewBox="0 0 160 300" style={{ width: '100%', fontFamily: 'Inter, sans-serif' }}>
                        <rect x="16" y="6" width="128" height="288" rx="18" fill="#faf8fd" stroke="#c8bedd" strokeWidth="0.75"/>
                        <rect x="56" y="12" width="48" height="7" rx="3.5" fill="#ede8f6"/>
                        {/* IG icon — wireframe placeholder (X in box) */}
                        <rect x="62" y="36" width="36" height="36" rx="7" fill="#ede8f6" stroke="#c8bedd" strokeWidth="0.75"/>
                        <line x1="62" y1="36" x2="98" y2="72" stroke="#c8bedd" strokeWidth="0.75"/>
                        <line x1="98" y1="36" x2="62" y2="72" stroke="#c8bedd" strokeWidth="0.75"/>
                        {/* Headline bars */}
                        <rect x="28" y="84" width="104" height="6" rx="3" fill="#d8d0ec"/>
                        <rect x="36" y="96" width="88" height="6" rx="3" fill="#d8d0ec"/>
                        <rect x="46" y="108" width="68" height="6" rx="3" fill="#d8d0ec"/>
                        {/* Divider */}
                        <line x1="28" y1="128" x2="132" y2="128" stroke="#e8e2f0" strokeWidth="0.75"/>
                        {/* Body copy bars */}
                        <rect x="28" y="138" width="104" height="4" rx="2" fill="#ece8f6"/>
                        <rect x="28" y="147" width="80" height="4" rx="2" fill="#ece8f6"/>
                        <rect x="28" y="156" width="94" height="4" rx="2" fill="#ece8f6"/>
                        {/* CTA primary */}
                        <rect x="28" y="188" width="104" height="32" rx="9" fill="#ede8fc" stroke="#7c5ec0" strokeWidth="0.9"/>
                        <text x="80" y="209" textAnchor="middle" fontSize="9.5" fill="#6a4eb8" fontWeight="600" fontFamily="Inter, sans-serif">See next steps</text>
                        {/* CTA secondary */}
                        <rect x="28" y="230" width="104" height="30" rx="9" fill="#faf8fd" stroke="#c0b4d8" strokeWidth="0.75"/>
                        <text x="80" y="250" textAnchor="middle" fontSize="9" fill="#9080b2" fontFamily="Inter, sans-serif">I'm 16 or over</text>
                      </svg>
                      <p style={cap}>This was the design preferred option where there were 2 CTAs on a single QP such that users could clearly put themselves into one of the 2 separate flows.</p>
                    </div>
                  );
                })()}

                {/* ── Sketch B: animated ── */}
                <SketchBCard />

                {/* ── Sketch C: motivation-based ── */}
                {(() => {
                  const sk: React.CSSProperties = { background: '#fff', border: '1px solid #e8e2f0', borderRadius: 14, padding: '22px 18px 18px', display: 'flex', flexDirection: 'column' as const, gap: 14 };
                  const lbl: React.CSSProperties = { fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#a898be', margin: 0 };
                  const cap: React.CSSProperties = { fontFamily: 'Inter, sans-serif', fontSize: 12.5, lineHeight: 1.65, color: '#7a6e82', margin: 0 };
                  return (
                    <div style={sk}>
                      <p style={lbl}>Option C</p>
                      <svg viewBox="0 0 160 300" style={{ width: '100%', fontFamily: 'Inter, sans-serif' }}>
                        <rect x="16" y="6" width="128" height="288" rx="18" fill="#faf8fd" stroke="#c8bedd" strokeWidth="0.75"/>
                        <rect x="56" y="12" width="48" height="7" rx="3.5" fill="#ede8f6"/>
                        {/* Screen title bar */}
                        <rect x="28" y="30" width="104" height="7" rx="3.5" fill="#d8d0ec"/>
                        <rect x="36" y="43" width="80" height="4" rx="2" fill="#ece8f6"/>
                        {/* "What would you like to do?" — two lines, contained */}
                        <text x="80" y="63" textAnchor="middle" fontSize="7" fill="#7c5ec0" fontWeight="600" letterSpacing="0.05em" fontFamily="Inter, sans-serif">WHAT WOULD YOU LIKE TO DO?</text>
                        {/* 4 motivation cells */}
                        {[0, 1, 2, 3].map(i => (
                          <g key={i}>
                            <rect x="26" y={74 + i * 50} width="108" height="40" rx="8" fill={i === 2 ? '#f2fbf0' : '#f4f1fb'} stroke={i === 2 ? '#b0d4aa' : '#d0c8e8'} strokeWidth="0.75"/>
                            <rect x="36" y={85 + i * 50} width="60" height="5" rx="2.5" fill={i === 2 ? '#b0d4aa' : '#d4cce8'}/>
                            <rect x="36" y={95 + i * 50} width="78" height="3.5" rx="1.75" fill={i === 2 ? '#d4edcf' : '#ece8f6'}/>
                            <rect x="122" y={86 + i * 50} width="7" height="7" rx="3.5" fill={i === 2 ? '#b0d4aa' : '#ddd6ec'}/>
                          </g>
                        ))}
                      </svg>
                      <p style={cap}>All actions surfaced together, framed by intent rather than separating it as age-related actions.</p>
                    </div>
                  );
                })()}

              </div>
            </div>

            {/* Bridge text */}
            <h3 className="font-serif" style={{ fontSize: 20, lineHeight: 1.3, letterSpacing: '-0.02em', color: '#1a1614', margin: '0 0 10px', fontWeight: 400 }}>
              Drawing out the bifurcated user flow
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.75, color: '#5e5660', margin: '0 0 32px' }}>
              We ultimately landed on Option A. We didn't want our over-16 users to unnecessarily see the next steps that are very specifically targeted at under-16 users, given their very different goals, so we wanted to give them forked experiences after a certain point. Prior to the fork, the core messaging on the QP or interstitial was still targeted to assume a primarily under-16 audience, since they were the majority of affected users. For those who were wrongly flagged, the same messaging would help them understand the stakes of staying in the experience: their account risks a temporary ban of up to three years. After that point, we would split users into their respective flows.
            </p>

            {/* Flowchart */}
            <UserAmbiguityFlowchart />
          </div>

          {/* Language framing header + decision cards */}
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#9b8ea0', marginTop: 48, marginBottom: 10 }}>
            Content decision 01
          </p>
          <h3 className="font-serif" style={{ fontSize: 20, lineHeight: 1.3, letterSpacing: '-0.02em', color: '#1a1614', margin: '0 0 12px', fontWeight: 400 }}>
            Writing for clarity without encouraging circumvention
          </h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.75, color: '#5e5660', margin: '0 0 32px' }}>
            After finalizing the bifurcated approach, getting the level of transparency right in these communications and beyond was one of the biggest challenges of this project. The examples below cover the header and CTA alone, and each had to go through several rounds of iteration with content, policy, and legal feedback before landing.
          </p>
          <DecisionCardsSection />
        </section>

        <section className="py-16 border-t border-black/[0.07]">
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#9b8ea0', marginBottom: 10 }}>
            Content decision 02
          </p>
          <h2 className="font-serif" style={{ fontSize: 28, lineHeight: 1.25, letterSpacing: '-0.03em', color: '#1a1614', fontWeight: 400, margin: '0 0 24px' }}>
            Communicating a first-of-its-kind ban to the teens it affects
          </h2>
          <p className="font-inter" style={{ fontSize: 15, lineHeight: 1.75, color: '#5e5660', margin: '0 0 8px', maxWidth: 680 }}>
            A collection of content designers brainstormed and considered a wide variety of verbs and phrases with the mission to best convey to teens that they were temporarily going to lose access to their accounts. We narrowed it down to the top few and then ran our top contenders through research, which you can find out more about in the subsequent section.
          </p>
          <PhraseCloudSection />
        </section>

        <section className="py-16 border-t border-black/[0.07]">
          <p className="font-inter" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#9b8ea0', margin: '0 0 12px' }}>
            Usability testing
          </p>
          <h2 className="font-serif" style={{ fontSize: 28, lineHeight: 1.25, letterSpacing: '-0.03em', color: '#1a1614', fontWeight: 400, margin: '0 0 24px' }}>
            Understanding teen behavior and patterns
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.75, color: '#5e5660', margin: 0, maxWidth: 680 }}>
            A team of us researchers and designers flew to Sydney to conduct 12 interviews with teen-parent pairs. The sessions were designed to assess how well teens understood our communications, whether the information felt sufficient, and whether the actions we offered mapped to what they actually needed to do.
          </p>

          <div style={{ marginTop: 48, paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="font-serif" style={{ fontSize: 22, lineHeight: 1.3, letterSpacing: '-0.025em', color: '#1a1614', fontWeight: 400, margin: '0 0 14px', maxWidth: 720 }}>
              Iteration #1: The order of the information in the communications
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.75, color: '#5e5660', margin: '0 0 28px', maxWidth: 720 }}>
              We wanted to understand how teens prioritised the information we needed to communicate, and whether that ranking shifted across the timeline.
            </p>
            <ResearchIteration1Shuffle />
            <Iter1Block />

            {/* Design decisions informed by the research */}
            <div style={{ marginTop: 32, paddingTop: 28, borderTop: '1px solid rgba(0,0,0,0.06)', maxWidth: 680, margin: '32px auto 0' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' as const, color: '#b0a4bc', margin: '0 0 14px' }}>Important decisions for "What it means for me"</p>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { title: 'Explicit timeline anchor', body: 'Post-ban, teens\' top priority was knowing when they\'d be back. Added "until you\'re 16" especially after pivoting away from "pause" language, and made the date clear across the screens.' },
                  { title: 'Review your birthday', body: 'Teens often have the right year on file but a wrong day or month. Since restoration is date-dependent, I pushed to surface their recorded birthday explicitly in the UI so reviewing and correcting it was frictionless.' },
                ].map(({ title, body }) => (
                  <div key={title} style={{ flex: 1, padding: '14px 16px', borderRadius: 8, background: 'rgba(139,109,168,0.05)', border: '1px solid rgba(139,109,168,0.12)' }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#5b4fa8', margin: '0 0 5px' }}>{title}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.65, color: '#5e5660', margin: 0 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 56, paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="font-serif" style={{ fontSize: 22, lineHeight: 1.3, letterSpacing: '-0.025em', color: '#1a1614', fontWeight: 400, margin: '0 0 16px', maxWidth: 720 }}>
              Iteration #2: Including a specific date or dynamic countdown
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.75, color: '#5e5660', margin: '0 0 28px', maxWidth: 720 }}>
              Participants consistently asked for a specific date or a dynamic countdown so they could orient themselves in time. That matched what we already believed was strongest from a UX perspective. In practice, technical constraints meant delivery could land within roughly a plus-or-minus forty-eight hour window relative to when the ban was enforced, which made a single precise timestamp misleading. We still needed enough transparency for the timeline to feel trustworthy and actionable, without overpromising exact timing we could not guarantee.
            </p>
          </div>

          <div style={{ marginTop: 8, padding: '28px 32px 36px', borderRadius: 16, background: 'linear-gradient(165deg, rgba(139,109,168,0.06) 0%, rgba(250,248,252,0.9) 100%)', border: '1px solid rgba(139,109,168,0.14)' }}>
            <p className="font-inter" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#9b8ea0', margin: '0 0 18px' }}>
              Copy alternatives
            </p>
            <TimingAltDemo phoneW={200} playing={false} />
          </div>
        </section>

        {/* ── Final solution prototype (repeated at end for context) ── */}
        <section className="py-16 border-t border-black/[0.07]">
          <div style={{ marginBottom: 28 }}>
            <p className="font-hand text-[18px] text-ink-tertiary mb-2">The solution, revisited</p>
            <h2 className="font-serif text-[clamp(20px,2.2vw,28px)] leading-snug tracking-[-0.03em] text-ink-primary" style={{ maxWidth: 560, fontWeight: 400 }}>
              The full end-to-end experience
            </h2>
          </div>
          <SolutionPrototype />
        </section>

        {/* ── Reflections ── */}
        <section className="py-12 border-t border-black/[0.07]">
          <p className="font-hand text-[18px] text-ink-tertiary mb-8">Reflections</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 720 }}>
            {[
              {
                n: '01',
                title: 'Overcommunication is a design deliverable',
                body: 'Alignment across product, engineering, legal, policy, and comms does not happen on its own at this scale. I treated documentation and decision rationale with the same rigour as the interface, so no one had to reconstruct my thinking from scratch.',
              },
              {
                n: '02',
                title: 'Legal consistency is the floor, not the ceiling',
                body: 'Cross-app alignment with Threads, Facebook, and Messenger was necessary and I respected it fully. But wherever the legal framework gave us room for design judgment, I pushed to use it in service of Instagram specifically, its visual language, its audience, and its relationship with users.',
              },
              {
                n: '03',
                title: 'Early trust required operating at full rigour',
                body: 'Two months into the company, I was handed ownership of a high-visibility project with real regulatory stakes. My opinions carried weight in rooms where I was still finding my footing, which meant I had to show up more prepared, more precise, and clearer on trade-offs than I might otherwise have been. I found the standard was the same regardless of tenure, and that pushed me.',
              },
            ].map(({ n, title, body }, i) => (
              <div key={n} style={{ display: 'flex', gap: 32, paddingTop: 22, paddingBottom: 22, borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: 'rgba(0,0,0,0.20)', letterSpacing: '0.05em', flexShrink: 0, paddingTop: 3, width: 20 }}>{n}</span>
                <div>
                  <h3 className="font-serif" style={{ fontSize: 16, fontWeight: 400, letterSpacing: '-0.02em', color: '#1a1614', margin: '0 0 6px', lineHeight: 1.35 }}>{title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.72, color: '#6a6068', margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        </> /* end unlocked-only sections */}

        {/* ── Photo gallery — always public ── */}
        <section className="py-16 border-t border-black/[0.07]">
          <PhotoCarousel />
        </section>

      </main>

    </div>
  )
}
