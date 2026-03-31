'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ═══ Features data ═══ */
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

const AUTO_PLAY_INTERVAL = 5000;
const ITEM_HEIGHT = 64;

const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

/* ═══ Live Preview Card ═══ */
function PreviewCard({ feature, isActive }: { feature: typeof features[0]; isActive: boolean }) {
    return (
        <div style={{
            padding: 28, borderRadius: 20,
            background: 'var(--bg-white)', border: '1px solid var(--border)',
            boxShadow: isActive ? '0 12px 40px rgba(0,0,0,0.06)' : 'none',
            height: '100%', display: 'flex', flexDirection: 'column',
        }}>
            {/* Header */}
            <div style={{ marginBottom: 24 }}>
                <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11, color: feature.color,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    display: 'block', marginBottom: 8,
                }}>{feature.subtitle}</span>
                <h3 style={{
                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
                    fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10, letterSpacing: '-0.02em',
                }}>{feature.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 480 }}>{feature.desc}</p>
            </div>

            {/* Capabilities */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                {feature.caps.map((cap, ci) => (
                    <span key={ci} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '5px 10px', borderRadius: 'var(--radius-full)',
                        background: 'var(--bg-surface)', border: '1px solid var(--border)',
                        fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500,
                    }}>
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke={feature.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        {cap}
                    </span>
                ))}
            </div>

            {/* Live preview panel */}
            <div style={{
                padding: 20, borderRadius: 16,
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                flex: 1,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.5)' }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>Live Preview</span>
                    <span style={{ marginLeft: 'auto', fontSize: 10, color: feature.color, fontFamily: 'var(--font-mono)', fontWeight: 600, padding: '2px 8px', borderRadius: 'var(--radius-sm)', background: `${feature.color}10` }}>{feature.tab}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {feature.preview.map((row, ri) => (
                        <div key={ri} style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '10px 14px', borderRadius: 12,
                            background: 'var(--bg-white)', border: '1px solid var(--border-subtle)',
                        }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>{row.ch}</span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: feature.color, fontFamily: 'var(--font-mono)' }}>{row.stat}</span>
                            <div style={{ width: 72, height: 5, borderRadius: 3, background: 'var(--border-subtle)' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={isActive ? { width: `${row.pct}%` } : { width: 0 }}
                                    transition={{ duration: 0.8, delay: ri * 0.1, ease: [0.4, 0, 0.2, 1] }}
                                    style={{ height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${feature.color}, ${feature.color}80)` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ═══ Main Component ═══ */
const Features: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const currentIndex = ((step % features.length) + features.length) % features.length;

    const nextStep = useCallback(() => {
        setStep(prev => prev + 1);
    }, []);

    const handleTabClick = (index: number) => {
        const diff = (index - currentIndex + features.length) % features.length;
        if (diff > 0) setStep(s => s + diff);
        else if (diff < 0) setStep(s => s + diff + features.length);
    };

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
        return () => clearInterval(interval);
    }, [nextStep, isPaused]);

    useGSAP(() => {
        gsap.fromTo('.feat-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
        gsap.fromTo('.feat-heading', { y: 30, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
        gsap.fromTo('.feat-carousel', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
    }, { scope: sectionRef });

    const getCardStatus = (index: number) => {
        const diff = index - currentIndex;
        const len = features.length;
        let normalizedDiff = diff;
        if (diff > len / 2) normalizedDiff -= len;
        if (diff < -len / 2) normalizedDiff += len;
        if (normalizedDiff === 0) return 'active';
        if (normalizedDiff === -1) return 'prev';
        if (normalizedDiff === 1) return 'next';
        return 'hidden';
    };

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

                {/* Carousel */}
                <div className="feat-carousel" style={{
                    display: 'flex', flexDirection: 'column', gap: 0,
                }}>
                    <div style={{
                        position: 'relative', overflow: 'hidden', borderRadius: 28,
                        display: 'flex', flexDirection: 'row',
                        minHeight: 540, border: '1px solid var(--border)',
                        background: 'var(--bg-white)',
                        boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
                    }}>
                        {/* Left — Scrolling tabs */}
                        <div style={{
                            width: 280, minWidth: 280,
                            position: 'relative', zIndex: 30,
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'flex-start', justifyContent: 'center',
                            overflow: 'hidden',
                            padding: '40px 0 40px 28px',
                            background: '#0F172A',
                        }}>
                            {/* Colored accent glow */}
                            <div style={{ position: 'absolute', top: '30%', left: '-20%', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${features[currentIndex].color}20 0%, transparent 70%)`, transition: 'background 0.6s ease', pointerEvents: 'none' }} />
                            {/* Fade edges */}
                            <div style={{ position: 'absolute', inset: '0 0 auto 0', height: 50, background: 'linear-gradient(to bottom, #0F172A, transparent)', zIndex: 40 }} />
                            <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: 50, background: 'linear-gradient(to top, #0F172A, transparent)', zIndex: 40 }} />

                            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', zIndex: 20 }}>
                                {features.map((feature, index) => {
                                    const isActive = index === currentIndex;
                                    const distance = index - currentIndex;
                                    const wrappedDistance = wrap(-(features.length / 2), features.length / 2, distance);

                                    return (
                                        <motion.div
                                            key={feature.id}
                                            style={{ height: ITEM_HEIGHT, width: 'fit-content', position: 'absolute' }}
                                            animate={{
                                                y: wrappedDistance * ITEM_HEIGHT,
                                                opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                                            }}
                                            transition={{ type: 'spring', stiffness: 90, damping: 22, mass: 1 }}
                                        >
                                            <button
                                                onClick={() => handleTabClick(index)}
                                                onMouseEnter={() => setIsPaused(true)}
                                                onMouseLeave={() => setIsPaused(false)}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: 12,
                                                    padding: '12px 20px', borderRadius: 999,
                                                    background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                                                    border: isActive ? `1px solid ${feature.color}60` : '1px solid rgba(255,255,255,0.08)',
                                                    cursor: 'pointer', textAlign: 'left',
                                                    transition: 'all 0.4s ease',
                                                    position: 'relative', zIndex: isActive ? 10 : 1,
                                                }}
                                            >
                                                <span style={{
                                                    width: 28, height: 28, borderRadius: 8,
                                                    background: isActive ? `${feature.color}25` : 'rgba(255,255,255,0.06)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                                                    color: isActive ? feature.color : 'rgba(255,255,255,0.4)',
                                                    flexShrink: 0, transition: 'all 0.3s ease',
                                                }}>0{feature.id + 1}</span>
                                                <span style={{
                                                    fontSize: 13, fontWeight: isActive ? 600 : 400,
                                                    color: isActive ? '#fff' : 'rgba(255,255,255,0.35)',
                                                    whiteSpace: 'nowrap', textTransform: 'uppercase',
                                                    letterSpacing: '0.04em',
                                                    transition: 'all 0.3s ease',
                                                }}>{feature.tab}</span>
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right — Stacked cards with content */}
                        <div style={{
                            flex: 1, position: 'relative',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '28px 36px',
                            overflow: 'hidden',
                            background: 'var(--bg-primary)',
                        }}>
                            <div style={{ position: 'relative', width: '100%', maxWidth: 500, minHeight: 440 }}>
                                {features.map((feature, index) => {
                                    const status = getCardStatus(index);
                                    const isActive = status === 'active';
                                    const isPrev = status === 'prev';
                                    const isNext = status === 'next';

                                    return (
                                        <motion.div
                                            key={feature.id}
                                            initial={false}
                                            animate={{
                                                x: isActive ? 0 : isPrev ? -60 : isNext ? 60 : 0,
                                                scale: isActive ? 1 : isPrev || isNext ? 0.92 : 0.85,
                                                opacity: isActive ? 1 : isPrev || isNext ? 0.3 : 0,
                                                rotateY: isPrev ? -4 : isNext ? 4 : 0,
                                                zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                                            }}
                                            transition={{ type: 'spring', stiffness: 260, damping: 25, mass: 0.8 }}
                                            style={{
                                                position: 'absolute', inset: 0,
                                                borderRadius: 20, overflow: 'hidden',
                                                transformOrigin: 'center center',
                                                pointerEvents: isActive ? 'auto' : 'none',
                                            }}
                                        >
                                            <PreviewCard feature={feature} isActive={isActive} />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile responsive */}
            <style>{`
                @media (max-width: 900px) {
                    .feat-carousel > div:first-child {
                        flex-direction: column !important;
                        border-radius: 20px !important;
                    }
                    .feat-carousel > div:first-child > div:first-child {
                        width: 100% !important;
                        min-width: unset !important;
                        min-height: 260px !important;
                        padding: 28px 16px !important;
                        border-radius: 20px 20px 0 0 !important;
                    }
                    .feat-carousel > div:first-child > div:last-child {
                        padding: 20px 16px !important;
                        min-height: 480px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Features;
