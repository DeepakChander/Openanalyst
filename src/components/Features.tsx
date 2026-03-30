'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════
   DATA
   ═══════════════════════════════════════ */
const features = [
    { id: 0, tab: 'Campaign Agent', name: 'AI-Vibe-Marketer', title: 'Full-stack marketing agent', desc: 'Deploy an autonomous agent that plans, creates, and optimizes campaigns across every channel — all on autopilot.', color: '#FF6B00', caps: ['Multi-channel campaigns', 'A/B testing', 'Performance tracking', 'Budget optimization'] },
    { id: 1, tab: 'Segmentation', name: 'Customer Segmentation', title: 'Automatic audience clustering', desc: 'Segment your audience by behavior, demographics, and engagement patterns with zero manual work.', color: '#3B82F6', caps: ['Behavioral clustering', 'Demographic profiling', 'Engagement scoring', 'Predictive modeling'] },
    { id: 2, tab: 'Research', name: 'Market Research', title: 'Real-time market intelligence', desc: 'Generate comprehensive research reports with competitor analysis, trend forecasting, and strategic insights.', color: '#10B981', caps: ['Competitor analysis', 'Trend forecasting', 'Market sizing', 'Opportunity mapping'] },
    { id: 3, tab: 'AI Search', name: 'AI Search Optimization', title: 'Next-gen search intelligence', desc: 'Optimize your brand across AI search engines — ChatGPT, Perplexity, Gemini — for maximum discoverability.', color: '#8B5CF6', caps: ['AI search optimization', 'Structured data', 'Content gap analysis', 'Ranking intelligence'] },
    { id: 4, tab: 'SEO Content', name: 'SEO Content Optimizer', title: 'Content ranking engine', desc: 'Create content that ranks with intelligent keyword research, competitive gap analysis, and real-time tracking.', color: '#F59E0B', caps: ['Keyword research', 'Content scoring', 'Gap analysis', 'Rank tracking'] },
];

const TAB_DURATION = 8000; // 8 seconds per tab auto-rotation

const featureImages = [
    '/images/features/campaign-agent.png',
    '/images/features/segmentation.png',
    '/images/features/research.png',
    '/images/features/ai-search.png',
    '/images/features/seo-content.png',
];

/* ═══════════════════════════════════════
   VIDEO PLACEHOLDER
   ═══════════════════════════════════════ */
function VideoPlaceholder({ color, label }: { color: string; label: string }) {
    return (
        <div style={{
            width: '100%', height: '100%', borderRadius: 16, overflow: 'hidden',
            background: 'var(--bg-dark-card)',
            border: '1px solid var(--border-dark-default)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
            boxShadow: `0 24px 64px -16px ${color}15, 0 0 0 1px rgba(255,255,255,0.03)`,
        }}>
            {/* Ambient color glow */}
            <div style={{
                position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '60%', height: '60%', borderRadius: '50%',
                background: `radial-gradient(circle, ${color}12 0%, transparent 70%)`,
                filter: 'blur(40px)', pointerEvents: 'none',
            }} />

            {/* Grid pattern */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.3,
                backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
            }} />

            {/* Play button */}
            <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: `${color}15`, border: `1px solid ${color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16, position: 'relative', zIndex: 1,
                transition: 'all 0.3s var(--ease-spring)',
                cursor: 'pointer',
            }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill={color} stroke="none">
                    <polygon points="8 5 20 12 8 19" />
                </svg>
            </div>

            {/* Label */}
            <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dark-muted)',
                letterSpacing: '0.06em', textTransform: 'uppercase', position: 'relative', zIndex: 1,
            }}>
                {label} Demo
            </span>

            {/* Bottom bar mimicking video timeline */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
                background: 'rgba(255,255,255,0.04)',
            }}>
                <div style={{
                    width: '35%', height: '100%', borderRadius: '0 2px 2px 0',
                    background: `linear-gradient(90deg, ${color}, ${color}80)`,
                }} />
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════ */
const Features: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const tabIndicatorRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const progressRef = useRef<HTMLDivElement>(null);
    const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressTweenRef = useRef<gsap.core.Tween | null>(null);

    const switchTab = useCallback((idx: number) => {
        if (idx === active) return;
        setActive(idx);
    }, [active]);

    // Auto-rotate tabs with progress bar
    useEffect(() => {
        const startProgress = () => {
            if (progressRef.current) {
                progressTweenRef.current?.kill();
                gsap.set(progressRef.current, { scaleX: 0 });
                progressTweenRef.current = gsap.to(progressRef.current, {
                    scaleX: 1, duration: TAB_DURATION / 1000, ease: 'none',
                });
            }
        };

        startProgress();
        autoTimerRef.current = setInterval(() => {
            setActive(p => (p + 1) % features.length);
            startProgress();
        }, TAB_DURATION);

        return () => {
            if (autoTimerRef.current) clearInterval(autoTimerRef.current);
            progressTweenRef.current?.kill();
        };
    }, []);

    // Restart progress on manual tab switch
    useEffect(() => {
        if (autoTimerRef.current) clearInterval(autoTimerRef.current);
        if (progressRef.current) {
            progressTweenRef.current?.kill();
            gsap.set(progressRef.current, { scaleX: 0 });
            progressTweenRef.current = gsap.to(progressRef.current, {
                scaleX: 1, duration: TAB_DURATION / 1000, ease: 'none',
            });
        }
        autoTimerRef.current = setInterval(() => {
            setActive(p => (p + 1) % features.length);
        }, TAB_DURATION);

        // Animate tab indicator
        const btn = tabRefs.current[active];
        const indicator = tabIndicatorRef.current;
        if (btn && indicator) {
            const parent = btn.parentElement;
            if (parent) {
                const parentRect = parent.getBoundingClientRect();
                const btnRect = btn.getBoundingClientRect();
                gsap.to(indicator, { x: btnRect.left - parentRect.left, width: btnRect.width, duration: 0.4, ease: 'power3.out' });
            }
        }

        return () => { if (autoTimerRef.current) clearInterval(autoTimerRef.current); };
    }, [active]);

    useGSAP(() => {
        gsap.from('.feat-badge', { y: 20, opacity: 0, filter: 'blur(4px)', duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
        gsap.from('.feat-heading', { y: 30, opacity: 0, filter: 'blur(6px)', duration: 0.8, ease: 'power4.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } });
        gsap.from('.feat-sub', { y: 16, opacity: 0, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
        gsap.from('.feat-tabs-wrap', { y: 20, opacity: 0, duration: 0.6, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' } });
        gsap.from('.feat-content', { y: 40, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
    }, { scope: sectionRef });

    const f = features[active];

    return (
        <section ref={sectionRef} id="features" className="dark-section" style={{
            padding: '120px 24px 140px', background: 'var(--bg-dark-primary)',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Background ambient glow */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }} aria-hidden="true">
                <div style={{
                    position: 'absolute', width: '50vw', height: '50vw', maxWidth: 600, maxHeight: 600,
                    top: '5%', right: '-8%', borderRadius: '50%',
                    background: `${f.color}08`, filter: 'blur(100px)', transition: 'background 1.5s ease',
                }} />
                <div style={{
                    position: 'absolute', width: '35vw', height: '35vw', maxWidth: 400, maxHeight: 400,
                    bottom: '0', left: '-5%', borderRadius: '50%',
                    background: 'rgba(255,107,0,0.03)', filter: 'blur(90px)',
                }} />
            </div>

            <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div className="feat-badge" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '4px 14px 4px 4px', borderRadius: 100,
                        background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.2)',
                        marginBottom: 16, fontSize: 12, fontWeight: 600, color: '#FF8533',
                    }}>
                        <span style={{
                            width: 20, height: 20, borderRadius: '50%', background: '#FF6B00',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                        </span>
                        Features
                    </div>
                    <h2 className="feat-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                        fontWeight: 800, color: '#FAFAFA', lineHeight: 1.1, letterSpacing: '-0.03em',
                        maxWidth: 580, margin: '0 auto 12px',
                    }}>
                        Everything you need to <span className="text-gradient">dominate</span> marketing
                    </h2>
                    <p className="feat-sub" style={{ fontSize: 15, color: 'var(--text-dark-secondary)', maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>
                        Deploy specialized AI agents that handle your entire marketing stack.
                    </p>
                </div>

                {/* Tab bar */}
                <div className="feat-tabs-wrap" style={{ marginBottom: 48 }}>
                    <div className="feat-tabs-scroll" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            position: 'relative', display: 'inline-flex',
                            background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 4,
                            border: '1px solid rgba(255,255,255,0.06)',
                        }}>
                            {/* Sliding indicator */}
                            <div ref={tabIndicatorRef} style={{
                                position: 'absolute', top: 4, left: 0, height: 'calc(100% - 8px)',
                                borderRadius: 9, background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.06)',
                            }} />
                            {features.map((feat, i) => (
                                <button
                                    key={feat.id}
                                    ref={el => { tabRefs.current[i] = el; }}
                                    onClick={() => switchTab(i)}
                                    style={{
                                        position: 'relative', zIndex: 1,
                                        padding: '8px 18px', fontSize: 13, fontWeight: 600,
                                        color: active === i ? '#FAFAFA' : 'rgba(255,255,255,0.4)',
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        transition: 'color 0.3s ease', fontFamily: 'var(--font-body)',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {feat.tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Progress bar under tabs */}
                    <div style={{
                        maxWidth: 300, margin: '12px auto 0', height: 2, borderRadius: 1,
                        background: 'rgba(255,255,255,0.06)',
                    }}>
                        <div ref={progressRef} style={{
                            height: '100%', borderRadius: 1,
                            background: `linear-gradient(90deg, ${f.color}, ${f.color}60)`,
                            transformOrigin: 'left', transform: 'scaleX(0)',
                            transition: 'background 0.3s ease',
                        }} />
                    </div>
                </div>

                {/* Content: left description + right video placeholder */}
                <div className="feat-content feat-split" style={{
                    display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 48, alignItems: 'center',
                }}>
                    {/* Left — text */}
                    <div key={`text-${active}`} style={{
                        animation: 'featFadeIn 0.5s var(--ease-spring) forwards',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: `${f.color}15`, border: `1px solid ${f.color}25`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: f.color,
                            }}>
                                0{f.id + 1}
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: 11, color: f.color,
                                letterSpacing: '0.08em', textTransform: 'uppercase',
                            }}>
                                {f.title}
                            </span>
                        </div>
                        <h3 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                            fontWeight: 800, color: '#FAFAFA', marginBottom: 12, lineHeight: 1.1, letterSpacing: '-0.02em',
                        }}>{f.name}</h3>
                        <p style={{ fontSize: 15, color: 'var(--text-dark-secondary)', lineHeight: 1.7, marginBottom: 24 }}>{f.desc}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {f.caps.map((cap, ci) => (
                                <div key={ci} style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '8px 14px', borderRadius: 8,
                                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                                    fontSize: 13, color: 'var(--text-dark-secondary)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'default',
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = `${f.color}40`;
                                        e.currentTarget.style.transform = 'translateX(3px)';
                                        e.currentTarget.style.color = '#FAFAFA';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                        e.currentTarget.style.color = 'var(--text-dark-secondary)';
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8L6.5 11.5L13 4.5" stroke={f.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {cap}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — feature image */}
                    <div key={`img-${active}`} className="ai-img-container" style={{
                        height: 380, borderRadius: 20, overflow: 'hidden',
                        border: '1px solid var(--border-dark-default)',
                        boxShadow: `0 24px 64px -16px ${f.color}15`,
                        animation: 'featFadeIn 0.6s var(--ease-spring) forwards',
                    }}>
                        <img src={featureImages[active]} alt={f.tab} style={{
                            width: '100%', height: '100%',
                        }} />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes featFadeIn {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @media (max-width: 900px) {
                    .feat-split { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 768px) {
                    .feat-tabs-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
                }
            `}</style>
        </section>
    );
};

export default Features;
