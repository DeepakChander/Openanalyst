'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ═══ Pattern #4: Vertical tabs left + morphing preview right ═══ */

const features = [
    {
        id: 0, tab: 'Campaign Agent', title: 'AI-Vibe-Marketer',
        subtitle: 'Full-stack marketing agent',
        desc: 'Deploy an autonomous agent that plans, creates, and optimizes campaigns across every channel — all on autopilot.',
        color: '#FF6B00',
        caps: ['Multi-channel campaigns', 'A/B testing', 'Performance tracking', 'Budget optimization'],
        preview: [
            { ch: 'Email Campaign', stat: '2,400 sent', pct: 78 },
            { ch: 'Social Ads', stat: '4 platforms', pct: 92 },
            { ch: 'Retargeting', stat: '840 users', pct: 65 },
            { ch: 'Google Ads', stat: '$2.4k spend', pct: 85 },
        ],
    },
    {
        id: 1, tab: 'Segmentation', title: 'Customer Segmentation',
        subtitle: 'Automatic audience clustering',
        desc: 'Segment your audience by behavior, demographics, and engagement patterns with zero manual work.',
        color: '#3B82F6',
        caps: ['Behavioral clustering', 'Demographic profiling', 'Engagement scoring', 'Predictive modeling'],
        preview: [
            { ch: 'High Intent', stat: '3,240', pct: 92 },
            { ch: 'Engaged', stat: '12.4K', pct: 74 },
            { ch: 'At Risk', stat: '180', pct: 28 },
            { ch: 'New Users', stat: '2,800', pct: 56 },
        ],
    },
    {
        id: 2, tab: 'Research', title: 'Market Research',
        subtitle: 'Real-time intelligence',
        desc: 'Generate research reports with competitor analysis, trend forecasting, and strategic insights.',
        color: '#10B981',
        caps: ['Competitor analysis', 'Trend forecasting', 'Market sizing', 'Opportunity mapping'],
        preview: [
            { ch: 'Competitor Alert', stat: 'HIGH', pct: 95 },
            { ch: 'Trend Detected', stat: 'RISING', pct: 88 },
            { ch: 'Market Gap', stat: 'FOUND', pct: 72 },
            { ch: 'Opportunity', stat: 'OPEN', pct: 81 },
        ],
    },
    {
        id: 3, tab: 'AI Search', title: 'AI Search Optimization',
        subtitle: 'Next-gen search intelligence',
        desc: 'Optimize your brand across AI search engines — ChatGPT, Perplexity, Gemini — for maximum discoverability.',
        color: '#8B5CF6',
        caps: ['AI search optimization', 'Structured data', 'Content gap analysis', 'Ranking intelligence'],
        preview: [
            { ch: 'ChatGPT #1', stat: '97%', pct: 97 },
            { ch: 'Perplexity #2', stat: '89%', pct: 89 },
            { ch: 'Gemini #1', stat: '94%', pct: 94 },
            { ch: 'AI Visibility', stat: '+340%', pct: 85 },
        ],
    },
    {
        id: 4, tab: 'SEO Content', title: 'SEO Content Optimizer',
        subtitle: 'Content ranking engine',
        desc: 'Create content that ranks with intelligent keyword research, competitive gap analysis, and real-time tracking.',
        color: '#F59E0B',
        caps: ['Keyword research', 'Content scoring', 'Gap analysis', 'Rank tracking'],
        preview: [
            { ch: 'AI Marketing Guide', stat: '94/100', pct: 94 },
            { ch: 'Campaign Tips', stat: '87/100', pct: 87 },
            { ch: 'ROI Playbook', stat: '91/100', pct: 91 },
            { ch: 'Strategy Doc', stat: '88/100', pct: 88 },
        ],
    },
];

const TAB_DURATION = 7000;

const Features: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const progressRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Auto-advance with progress
    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (progressRef.current) {
            gsap.killTweensOf(progressRef.current);
            gsap.set(progressRef.current, { scaleY: 0 });
            gsap.to(progressRef.current, { scaleY: 1, duration: TAB_DURATION / 1000, ease: 'none' });
        }
        timerRef.current = setInterval(() => {
            setActive(p => (p + 1) % features.length);
        }, TAB_DURATION);
    }, []);

    useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startTimer]);
    useEffect(() => { startTimer(); }, [active, startTimer]);

    useGSAP(() => {
        gsap.from('.feat-label', { y: 16, opacity: 0, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
        gsap.from('.feat-heading', { y: 30, opacity: 0, filter: 'blur(6px)', duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
        gsap.from('.feat-content-area', { y: 40, opacity: 0, duration: 0.8, delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
    }, { scope: sectionRef });

    const f = features[active];

    return (
        <section ref={sectionRef} id="features" style={{
            padding: 'var(--space-section) 24px',
            background: 'var(--bg-white)',
            position: 'relative', overflow: 'hidden',
        }}>
            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <p className="feat-label label-mono" style={{ marginBottom: 16 }}>Features</p>
                    <h2 className="feat-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                        fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em',
                    }}>
                        Everything you need to <span className="text-gradient">dominate</span>
                    </h2>
                </div>

                {/* Vertical tabs (left) + Preview (right) */}
                <div className="feat-content-area feat-layout" style={{
                    display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40, alignItems: 'start',
                }}>
                    {/* Left — Vertical tabs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'relative' }}>
                        {features.map((feat, i) => (
                            <button key={feat.id} onClick={() => setActive(i)} style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '14px 16px', borderRadius: 'var(--radius-md)',
                                background: active === i ? 'var(--bg-surface)' : 'transparent',
                                border: `1px solid ${active === i ? 'var(--border)' : 'transparent'}`,
                                cursor: 'pointer', textAlign: 'left',
                                transition: 'all 0.3s var(--ease-out)',
                                position: 'relative', overflow: 'hidden',
                            }}>
                                {/* Progress fill for active tab */}
                                {active === i && (
                                    <div ref={active === i ? progressRef : undefined} style={{
                                        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                                        background: feat.color, borderRadius: 2,
                                        transformOrigin: 'top', transform: 'scaleY(0)',
                                    }} />
                                )}
                                <span style={{
                                    width: 32, height: 32, borderRadius: 'var(--radius-sm)',
                                    background: active === i ? `${feat.color}15` : 'var(--bg-surface)',
                                    border: `1px solid ${active === i ? `${feat.color}25` : 'var(--border-subtle)'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                                    color: active === i ? feat.color : 'var(--text-muted)',
                                    flexShrink: 0, transition: 'all 0.3s ease',
                                }}>0{feat.id + 1}</span>
                                <span style={{
                                    fontSize: 14, fontWeight: active === i ? 600 : 500,
                                    color: active === i ? 'var(--text-primary)' : 'var(--text-muted)',
                                    transition: 'all 0.3s ease',
                                }}>{feat.tab}</span>
                            </button>
                        ))}
                    </div>

                    {/* Right — Feature detail + preview */}
                    <div key={active} style={{ animation: 'featSlide 0.5s var(--ease-out) forwards' }}>
                        {/* Text content */}
                        <div style={{ marginBottom: 28 }}>
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: 11, color: f.color,
                                letterSpacing: '0.1em', textTransform: 'uppercase',
                                display: 'block', marginBottom: 8,
                            }}>{f.subtitle}</span>
                            <h3 style={{
                                fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                                fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10, letterSpacing: '-0.02em',
                            }}>{f.title}</h3>
                            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20, maxWidth: 500 }}>{f.desc}</p>

                            {/* Capabilities */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {f.caps.map((cap, ci) => (
                                    <span key={ci} style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 6,
                                        padding: '6px 12px', borderRadius: 'var(--radius-full)',
                                        background: 'var(--bg-surface)', border: '1px solid var(--border)',
                                        fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500,
                                        transition: 'all 0.2s ease',
                                    }}>
                                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke={f.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        {cap}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Live preview panel */}
                        <div style={{
                            padding: 24, borderRadius: 'var(--radius-xl)',
                            background: 'var(--bg-surface)', border: '1px solid var(--border)',
                            boxShadow: 'var(--shadow-md)',
                        }}>
                            {/* Preview header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.5)', animation: 'status-pulse 2s ease infinite' }} />
                                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>Live Preview</span>
                                <span style={{ marginLeft: 'auto', fontSize: 10, color: f.color, fontFamily: 'var(--font-mono)', fontWeight: 600, padding: '2px 8px', borderRadius: 'var(--radius-sm)', background: `${f.color}10` }}>{f.tab}</span>
                            </div>

                            {/* Data rows */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {f.preview.map((row, ri) => (
                                    <div key={ri} style={{
                                        display: 'flex', alignItems: 'center', gap: 12,
                                        padding: '10px 14px', borderRadius: 'var(--radius-md)',
                                        background: 'var(--bg-white)', border: '1px solid var(--border-subtle)',
                                        transition: 'all 0.3s var(--ease-out)',
                                    }}
                                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${f.color}30`; e.currentTarget.style.transform = 'translateX(3px)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                                    >
                                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>{row.ch}</span>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: f.color, fontFamily: 'var(--font-mono)' }}>{row.stat}</span>
                                        <div style={{ width: 80, height: 5, borderRadius: 3, background: 'var(--border-subtle)' }}>
                                            <div style={{ width: `${row.pct}%`, height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${f.color}, ${f.color}80)`, transition: 'width 0.8s var(--ease-out)' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes featSlide {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @media (max-width: 768px) {
                    .feat-layout { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
};

export default Features;
