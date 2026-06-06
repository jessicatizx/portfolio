import React from 'react'

// ── Canvas (everything built at this res, then scaled to fit) ──
const IW = 1200
const IH = 675

// Portal card floats inside the canvas with a dark bg behind it
const PX = 50   // portal left offset
const PY = 40   // portal top offset
const PW = 1100 // portal width
const PH = 595  // portal height

// ── Data ──
type Status = 'ACTIVE' | 'EXPIRED' | 'EXPIRING' | 'PENDING'
type User = { init: string; color: string; name: string; email: string; role: string; org: string; expiryLabel: string; expiryDate: string; status: Status }

const ALL_USERS: User[] = [
  { init:'MG', color:'#818cf8', name:'Madeline Gold',      email:'madeline.gold@fox.com',      role:'Project Manager', org:'Distribution',   expiryLabel:'Expired',     expiryDate:'01/06/2022', status:'EXPIRED'  },
  { init:'JF', color:'#a78bfa', name:'Jonatan Feltman',    email:'jonatan.feltman@fox.com',    role:'Project Manager', org:'Pre-Production', expiryLabel:'In 6 days',   expiryDate:'06/06/2022', status:'ACTIVE'   },
  { init:'FP', color:'#34d399', name:'Facundo Pereyra',    email:'facundo.pereyra@fox.com',    role:'Developer',       org:'Visual Effects', expiryLabel:'In 12 days',  expiryDate:'12/06/2022', status:'EXPIRING' },
  { init:'AS', color:'#fbbf24', name:'Agostina Salvatore', email:'agostina.salvatore@fox.com', role:'Developer',       org:'Post-Production',expiryLabel:'In 30 days',  expiryDate:'30/06/2022', status:'ACTIVE'   },
  { init:'HF', color:'#f87171', name:'Haylie Franci',      email:'haylie.franci@fox.com',      role:'Developer',       org:'Legal',          expiryLabel:'In 45 days',  expiryDate:'15/07/2022', status:'PENDING'  },
  { init:'KG', color:'#60a5fa', name:'Kianna Geidt',       email:'kianna.geidt@fox.com',       role:'Project Manager', org:'Pre-Production', expiryLabel:'In 60 days',  expiryDate:'30/07/2022', status:'ACTIVE'   },
  { init:'GV', color:'#2dd4bf', name:'Giana Vaccaro',      email:'giana.vaccaro@fox.com',      role:'Designer',        org:'Marketing',      expiryLabel:'In 90 days',  expiryDate:'29/08/2022', status:'PENDING'  },
  { init:'LL', color:'#a3e635', name:'Leandro Longo',      email:'leandro.longo@fox.com',      role:'Designer',        org:'Production',     expiryLabel:'In 120 days', expiryDate:'28/09/2022', status:'ACTIVE'   },
  { init:'RM', color:'#c084fc', name:'Robert Mercer',      email:'robert.mercer@fox.com',      role:'Project Manager', org:'Development',    expiryLabel:'In 150 days', expiryDate:'28/10/2022', status:'ACTIVE'   },
  { init:'JR', color:'#22d3ee', name:'Joel Rasip',         email:'joel.rasip@fox.com',         role:'Developer',       org:'Operations',     expiryLabel:'In 180 days', expiryDate:'27/11/2022', status:'ACTIVE'   },
]

const BADGE: Record<Status, { color: string; bg: string }> = {
  ACTIVE:   { color:'#15803d', bg:'#dcfce7' },
  EXPIRED:  { color:'#b91c1c', bg:'#fee2e2' },
  EXPIRING: { color:'#c2410c', bg:'#ffedd5' },
  PENDING:  { color:'#b45309', bg:'#fef3c7' },
}

const NAV_MAIN   = ['Search','Dashboard','Workflows','Groups','Users','Companies','Titles','Assets','Applications']
const NAV_BOTTOM = ['Request Log','Help','Administration']
const COLS       = 'minmax(0,2.0fr) minmax(0,1.1fr) minmax(0,1.1fr) minmax(0,0.85fr) minmax(0,1.0fr)'

function Badge({ status }: { status: Status }) {
  const s = BADGE[status]
  return (
    <span style={{ display:'inline-block', fontSize:9.5, fontWeight:600, letterSpacing:'0.03em', color:s.color, background:s.bg, borderRadius:4, padding:'2px 5px', whiteSpace:'nowrap', width:'fit-content' }}>
      {status}
    </span>
  )
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div style={{ width:14, height:14, borderRadius:3, border:checked?'none':'1.5px solid #d1d5db', background:checked?'#3b82f6':'#fff', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', transition:'background 0.18s' }}>
      {checked && <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L4 7.5L8.5 2.5" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
  )
}

export type FoxThumbnailSnapshot = 'filters-open'

const SNAPSHOT_STATE = {
  'filters-open': {
    filterOpen: true,
    activeChk: false,
    pmChk: false,
    dateLabel: 'Next 180 days',
    applyPulse: false,
    filterBtnHl: false,
    isFiltered: false,
    zoomScale: 1.24,
  },
} as const

interface FoxThumbnailProps {
  /** Start the demo loop sooner (case study hero is in view on load). */
  eager?: boolean
  /** Begin the demo before the thumbnail scrolls into view (lookahead margin). */
  lookahead?: boolean
  /** Freeze on a key frame (no animation or cursor). */
  snapshot?: FoxThumbnailSnapshot
  /** Smaller tile for project grid layout. */
  compact?: boolean
}

function idleDelay(eager: boolean, lookahead: boolean): number {
  if (eager) return lookahead ? 0 : 500
  if (lookahead) return 600
  return 2600
}

// ── Component ──
export default function FoxThumbnail({ eager = false, lookahead = false, snapshot, compact = false }: FoxThumbnailProps) {
  const frozen = snapshot ? SNAPSHOT_STATE[snapshot] : null
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const [s, setS] = React.useState(1)

  const [filterOpen,  setFilterOpen]  = React.useState<boolean>(frozen?.filterOpen ?? false)
  const [activeChk,   setActiveChk]   = React.useState<boolean>(frozen?.activeChk ?? false)
  const [pmChk,       setPmChk]       = React.useState<boolean>(frozen?.pmChk ?? false)
  const [dateLabel,   setDateLabel]   = React.useState<string>(frozen?.dateLabel ?? 'Next 180 days')
  const [applyPulse,  setApplyPulse]  = React.useState<boolean>(frozen?.applyPulse ?? false)
  const [filterBtnHl, setFilterBtnHl] = React.useState<boolean>(frozen?.filterBtnHl ?? false)
  const [isFiltered,  setIsFiltered]  = React.useState<boolean>(frozen?.isFiltered ?? false)
  const [zoomScale,   setZoomScale]   = React.useState<number>(frozen?.zoomScale ?? 1)
  const [cur, setCur] = React.useState({ x:700, y:320, visible:false, pressed:false })

  React.useEffect(() => {
    const el = wrapRef.current; if (!el) return
    const obs = new ResizeObserver(([e]) => setS(e.contentRect.width / IW))
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const el = wrapRef.current; if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        threshold: 0,
        rootMargin: lookahead ? '0px 0px 55% 0px' : '0px',
      }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [lookahead])

  React.useEffect(() => {
    if (snapshot || !inView) return
    let alive = true
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))
    const move  = (x: number, y: number) => setCur(c => ({ ...c, x, y }))
    const click = async () => { setCur(c=>({...c,pressed:true})); await sleep(160); setCur(c=>({...c,pressed:false})) }

    // All cursor coords are in zoom-wrapper (IW×IH) space.
    // Portal card is offset by (PX=50, PY=40). Sidebar = 228px inside portal.
    // Filter panel: right:0 of portal (x = PX+PW-380 = 770..PX+PW = 1150), top = PY+54 = 94
    const FP_LEFT = PX + PW - 380  // 770  — filter panel left edge
    const CHK_X   = FP_LEFT + 22   // 792  — checkbox x

    async function loop() {
      while (alive) {
        setFilterOpen(false); setActiveChk(false); setPmChk(false)
        setDateLabel('Next 180 days'); setApplyPulse(false); setIsFiltered(false)
        setFilterBtnHl(false); setZoomScale(1)
        setCur({ x:700, y:320, visible:false, pressed:false })
        await sleep(idleDelay(eager, lookahead)); if (!alive) return

        // cursor → All Filters button
        setCur({ x:940, y:PY+70, visible:true, pressed:false })
        await sleep(400); move(PX+PW-150, PY+70); await sleep(700)
        setFilterBtnHl(true); await click()
        setFilterOpen(true); setFilterBtnHl(false)
        await sleep(700)

        // zoom in
        setZoomScale(1.30); await sleep(900); if (!alive) return

        // Active checkbox  (filter panel content top = PY+54+16+30+26 = PY+126 → y≈PY+133)
        move(CHK_X, PY + 133); await sleep(620)
        await click(); setActiveChk(true); await sleep(520)

        // Project Manager (after 4 status rows + divider + role header = +26*4+22+26 = +152)
        move(CHK_X, PY + 133 + 152); await sleep(620)
        await click(); setPmChk(true); await sleep(520)

        // Date dropdown (after 3 role rows + divider + date header + expiry selector+half = +26*3+22+26+32+16 = +174)
        move(FP_LEFT + 190, PY + 133 + 152 + 174); await sleep(580)
        await click(); setDateLabel('Next 30 days'); await sleep(480)

        // Apply Filters (after divider + save preset + half apply btn = +22+30+19 = +71)
        move(FP_LEFT + 190, PY + 133 + 152 + 174 + 71); await sleep(620)
        setApplyPulse(true); await click(); await sleep(340)

        // zoom out → filtered
        setZoomScale(1); await sleep(680)
        setFilterOpen(false); setIsFiltered(true); setApplyPulse(false)
        setCur({ x:700, y:320, visible:false, pressed:false })
        await sleep(3800); if (!alive) return
      }
    }
    loop()
    return () => { alive = false }
  }, [inView, eager, lookahead, snapshot])

  const rows = isFiltered
    ? ALL_USERS.filter(u => u.status === 'ACTIVE' && u.role === 'Project Manager')
    : ALL_USERS

  return (
    <div ref={wrapRef} style={{ position:'relative', width:'100%', aspectRatio:'16/9', overflow:'hidden', cursor:'default' }}>

      {/* Fit wrapper */}
      <div style={{ position:'absolute', left:0, top:0, width:IW, height:IH, transformOrigin:'top left', transform:`scale(${s})` }}>

        {/* ── Dark elegant background ── */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, #111b2e 0%, #0c1520 55%, #07101d 100%)' }}/>
        {/* subtle radial glow */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 60% 50%, rgba(59,130,246,0.06) 0%, transparent 65%)', pointerEvents:'none' }}/>

        {/* Zoom wrapper */}
        <div style={{ position:'absolute', inset:0, transformOrigin:'88% 48%', transform:`scale(${zoomScale})`, transition: snapshot ? 'none' : 'transform 0.88s cubic-bezier(0.16,1,0.3,1)' }}>

          {/* ── Portal card ── */}
          <div style={{ position:'absolute', left:PX, top:PY, width:PW, height:PH, borderRadius:10, overflow:'hidden', boxShadow:'0 24px 80px rgba(0,0,0,0.55), 0 4px 20px rgba(0,0,0,0.35)', fontFamily:'-apple-system,BlinkMacSystemFont,"Inter",sans-serif', display:'flex' }}>

            {/* Sidebar */}
            <div style={{ width:228, flexShrink:0, background:'#13162b', display:'flex', flexDirection:'column', paddingTop:18 }}>
              <div style={{ padding:'0 18px 14px', borderBottom:'1px solid rgba(255,255,255,0.07)', marginBottom:6 }}>
                <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                  <div style={{ width:30, height:30, borderRadius:7, background:'#3b82f6', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ color:'#fff', fontWeight:700, fontSize:12 }}>PA</span>
                  </div>
                  <span style={{ color:'#e2e8f0', fontSize:12.5, fontWeight:600 }}>Platform Admins</span>
                </div>
              </div>
              <div style={{ flex:1, padding:'4px 10px', overflow:'hidden' }}>
                {NAV_MAIN.map(item => (
                  <div key={item} style={{ display:'flex', alignItems:'center', gap:9, padding:'6px 9px', borderRadius:5, marginBottom:1, background:item==='Users'?'rgba(255,255,255,0.10)':'transparent', color:item==='Users'?'#e2e8f0':'#64748b', fontSize:12, fontWeight:item==='Users'?600:400 }}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" opacity="0.7">
                      {item==='Users' ? <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM13 14a5 5 0 0 0-10 0h10z"/> : <rect width="10" height="10" x="3" y="3" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4"/>}
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ padding:'8px 10px', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                {NAV_BOTTOM.map(item => (
                  <div key={item} style={{ color:'#475569', fontSize:11, padding:'4px 9px' }}>{item}</div>
                ))}
                <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 9px 2px' }}>
                  <div style={{ width:26, height:26, borderRadius:'50%', background:'#4f46e5', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ color:'#fff', fontWeight:700, fontSize:9 }}>IR</span>
                  </div>
                  <div>
                    <div style={{ color:'#e2e8f0', fontSize:10.5, fontWeight:600 }}>Ian Rueff</div>
                    <div style={{ color:'#475569', fontSize:9.5 }}>Super Admin</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div style={{ flex:1, background:'#fff', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
              {/* Page header */}
              <div style={{ padding:'15px 24px 12px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #e5e7eb', flexShrink:0 }}>
                <h1 style={{ fontSize:18, fontWeight:700, color:'#111827', margin:0 }}>Users</h1>
                <div style={{ display:'flex', gap:8 }}>
                  <div style={{ fontSize:11, fontWeight:500, color:'#374151', border:'1px solid #d1d5db', borderRadius:6, padding:'5px 12px', background:'#fff' }}>User Actions ▾</div>
                  <div style={{ fontSize:11, fontWeight:600, color:'#fff', background:'#3b82f6', borderRadius:6, padding:'5px 12px' }}>+ New User</div>
                </div>
              </div>

              {/* Search + filter bar */}
              <div style={{ padding:'9px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #e5e7eb', flexShrink:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:7, background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:6, padding:'5px 10px', width:220 }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="#9ca3af" strokeWidth="1.5"/><path d="M11 11L14 14" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  <span style={{ fontSize:11, color:'#9ca3af' }}>Search users</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  {isFiltered && <span style={{ fontSize:10.5, color:'#3b82f6', fontWeight:500 }}>Active · Project Manager</span>}
                  <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, fontWeight:500, color:filterBtnHl?'#3b82f6':'#374151', border:`1px solid ${filterBtnHl?'#3b82f6':'#d1d5db'}`, borderRadius:6, padding:'5px 12px', background:filterBtnHl?'#eff6ff':'#fff', transition:'all 0.15s' }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4h12M4 8h8M6 12h4"/></svg>
                    All Filters {isFiltered?'· 2':''}
                    {isFiltered && <span style={{ background:'#3b82f6', color:'#fff', borderRadius:'50%', width:14, height:14, fontSize:8, display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>2</span>}
                    <span style={{ fontSize:8 }}>▲</span>
                  </div>
                </div>
              </div>

              {/* Column headers */}
              <div style={{ display:'grid', gridTemplateColumns:COLS, padding:'6px 24px', borderBottom:'1.5px solid #e5e7eb', background:'#f9fafb', flexShrink:0 }}>
                {['NAME & EMAIL ↕','JOB TITLE ↕','EXPIRATION DATE ↕','STATUS ↕','ORGANIZATION ↕'].map(h => (
                  <span key={h} style={{ fontSize:9.5, fontWeight:600, color:'#6b7280', letterSpacing:'0.05em' }}>{h}</span>
                ))}
              </div>

              {/* Rows */}
              <div style={{ flex:1, overflowY:'hidden' }}>
                {rows.map((u, i) => (
                  <div key={u.email} style={{ display:'grid', gridTemplateColumns:COLS, padding:'7px 24px', borderBottom:'1px solid #f3f4f6', alignItems:'center', background:i%2===0?'#fff':'#fafafa' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:9, minWidth:0 }}>
                      <div style={{ width:28, height:28, borderRadius:'50%', background:u.color, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <span style={{ color:'#fff', fontWeight:700, fontSize:9.5 }}>{u.init}</span>
                      </div>
                      <div style={{ minWidth:0 }}>
                        <div style={{ fontSize:12, fontWeight:500, color:'#111827', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{u.name}</div>
                        <div style={{ fontSize:10, color:'#9ca3af', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{u.email}</div>
                      </div>
                    </div>
                    <span style={{ fontSize:11.5, color:'#374151' }}>{u.role}</span>
                    <div>
                      <div style={{ fontSize:11, color:u.expiryLabel==='Expired'?'#dc2626':u.expiryLabel.startsWith('In 6')||u.expiryLabel.startsWith('In 12')?'#ea580c':'#374151', fontWeight:u.expiryLabel==='Expired'?600:400 }}>{u.expiryLabel}</div>
                      <div style={{ fontSize:9.5, color:'#9ca3af' }}>{u.expiryDate}</div>
                    </div>
                    <Badge status={u.status}/>
                    <span style={{ fontSize:11.5, color:'#6b7280' }}>{u.org}</span>
                  </div>
                ))}
              </div>

              {/* Filter panel — slides in from right, positioned inside main content */}
              <div style={{ position:'absolute', right:0, top:49, width:380, background:'#fff', borderLeft:'1px solid #e5e7eb', boxShadow:'-8px 0 28px rgba(0,0,0,0.07)', transform:filterOpen?'translateX(0)':'translateX(102%)', transition: snapshot ? 'none' : 'transform 0.36s cubic-bezier(0.32,0.72,0,1)', zIndex:10, display:'flex', flexDirection:'column', padding:'16px 22px' }}>
                {/* Header */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14, flexShrink:0 }}>
                  <span style={{ fontSize:13, fontWeight:600, color:'#111827' }}>Filters</span>
                  <span style={{ fontSize:11, color:'#3b82f6', fontWeight:500 }}>Clear all</span>
                </div>

                {/* Status */}
                <div style={{ marginBottom:12, flexShrink:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
                    <span style={{ fontSize:12, fontWeight:600, color:'#374151' }}>Status</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.5"><path d="M4 10l4-4 4 4"/></svg>
                  </div>
                  {[
                    { label:'Active',                     st:'ACTIVE'  as Status, count:6, chk:activeChk },
                    { label:'Pending Request',            st:'PENDING' as Status, count:1, chk:false },
                    { label:'Pending Self-Registration',  st:'PENDING' as Status, count:2, chk:false },
                    { label:'Expired',                    st:'EXPIRED' as Status, count:1, chk:false },
                  ].map(row => (
                    <div key={row.label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'4px 0' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <Checkbox checked={row.chk}/>
                        <span style={{ fontSize:11.5, color:'#374151' }}>{row.label}</span>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <Badge status={row.st}/>
                        <span style={{ fontSize:10, color:'#9ca3af' }}>{row.count}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Role */}
                <div style={{ marginBottom:12, paddingTop:10, borderTop:'1px solid #f3f4f6', flexShrink:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
                    <span style={{ fontSize:12, fontWeight:600, color:'#374151' }}>Role</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.5"><path d="M4 10l4-4 4 4"/></svg>
                  </div>
                  {[
                    { label:'Project Manager', count:3, chk:pmChk  },
                    { label:'Developer',        count:5, chk:false },
                    { label:'Designer',         count:2, chk:false },
                  ].map(row => (
                    <div key={row.label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'4px 0' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <Checkbox checked={row.chk}/>
                        <span style={{ fontSize:11.5, color:'#374151' }}>{row.label}</span>
                      </div>
                      <span style={{ fontSize:10, color:'#9ca3af' }}>{row.count}</span>
                    </div>
                  ))}
                </div>

                {/* Date Range */}
                <div style={{ marginBottom:12, paddingTop:10, borderTop:'1px solid #f3f4f6', flexShrink:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                    <span style={{ fontSize:12, fontWeight:600, color:'#374151' }}>Date Range</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.5"><path d="M4 10l4-4 4 4"/></svg>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:6, padding:'6px 10px', marginBottom:6 }}>
                    <span style={{ fontSize:11, color:'#374151' }}>Expiration Date</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.5"><rect x="2" y="3" width="12" height="11" rx="1.5"/><path d="M5 1v3M11 1v3M2 7h12"/></svg>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', border:`1.5px solid ${dateLabel!=='Next 180 days'?'#3b82f6':'#e5e7eb'}`, borderRadius:6, padding:'6px 10px', transition:'border-color 0.2s' }}>
                    <span style={{ fontSize:11, color:'#374151', fontWeight:dateLabel!=='Next 180 days'?600:400 }}>{dateLabel}</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.5"><path d="M4 6l4 4 4-4"/></svg>
                  </div>
                </div>

                {/* Save as preset */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:9, borderTop:'1px solid #f3f4f6', marginBottom:12, flexShrink:0 }}>
                  <span style={{ fontSize:11.5, color:'#374151' }}>Save as preset</span>
                  <div style={{ width:32, height:18, borderRadius:9, background:'#e5e7eb', position:'relative' }}>
                    <div style={{ width:14, height:14, borderRadius:'50%', background:'#fff', position:'absolute', top:2, left:2, boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}/>
                  </div>
                </div>

                {/* Apply Filters */}
                <div style={{ width:'100%', padding:'8px 0', background:applyPulse?'#1d4ed8':'#3b82f6', color:'#fff', fontSize:12, fontWeight:600, borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', gap:6, transform:applyPulse?'scale(0.97)':'scale(1)', transition:'background 0.15s, transform 0.15s', flexShrink:0 }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.6"><path d="M2 4h12M4 8h8M6 12h4"/></svg>
                  Apply Filters
                </div>
              </div>
            </div>
          </div>{/* /portal card */}

          {/* ── Cursor dot ── */}
          {!snapshot && cur.visible && (
            <div style={{ position:'absolute', left:cur.x, top:cur.y, width:12, height:12, borderRadius:'50%', background:'rgba(10,18,40,0.80)', border:'1.5px solid rgba(255,255,255,0.92)', transform:`translate(-50%,-50%) scale(${cur.pressed?0.65:1})`, transition:'left 0.52s cubic-bezier(0.16,1,0.3,1), top 0.52s cubic-bezier(0.16,1,0.3,1), transform 0.13s ease', zIndex:100, pointerEvents:'none', boxShadow:'0 2px 8px rgba(0,0,0,0.35)' }}/>
          )}

        </div>{/* /zoom wrapper */}
      </div>{/* /fit wrapper */}
    </div>
  )
}
