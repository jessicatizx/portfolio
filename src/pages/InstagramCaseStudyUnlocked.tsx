import React from 'react'
import {
  Iter1Block,
  ResearchIteration1Shuffle,
  SuiteSection,
  SketchBCard,
  UserAmbiguityFlowchart,
  DecisionCardsSection,
  PhraseCloudSection,
  TimingAltDemo,
  SolutionPrototype,
  PhoneMockup,
  ExplorationFSIScreen,
  ProfileBannerScreen,
  FRAME_W,
  EXPLORATION_FSI_W,
  PROFILE_BANNER_W,
  PHOTOS,
  STORY_RING,
} from './instagramCaseStudyParts'

interface Props {
  revealed: boolean
  timelineVisible: boolean
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  activePath: 'under16' | 'over16'
  setActivePath: React.Dispatch<React.SetStateAction<'under16' | 'over16'>>
  handlePathComplete: () => void
}

export default function InstagramCaseStudyUnlocked({
  revealed,
  timelineVisible,
  activeStep,
  setActiveStep,
  activePath,
  setActivePath,
  handlePathComplete,
}: Props) {
  return (
    <>
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
    </>
  )
}
