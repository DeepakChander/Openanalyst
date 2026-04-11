'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer, Integrations } from '@/components';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ DATA ═══════════ */
const features = [
    {
        id: '01', title: 'AI-Powered Campaigns', subtitle: 'Intelligent Automation',
        description: 'Launch, monitor, and optimize multi-channel marketing campaigns powered by 42 specialist AI agents that understand your brand, audience, and objectives.',
        details: ['Multi-channel orchestration across email, social, ads', 'Real-time performance optimization with AI feedback loops', 'A/B testing with automated winner selection', 'Predictive budget allocation across channels'],
        accent: '#FF6B00',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
        ),
    },
    {
        id: '02', title: 'Deep Analytics', subtitle: 'Research & Intelligence',
        description: 'Surface insights buried in your data with research agents that analyze competitors, identify market trends, and deliver actionable intelligence.',
        details: ['Competitor intelligence with real-time monitoring', 'Trend detection across social, search, and news', 'Audience segmentation with behavioral clustering', 'ROI attribution across touchpoints'],
        accent: '#8B5CF6',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/><path d="M10 7v6"/><path d="M7 10h6"/>
            </svg>
        ),
    },
    {
        id: '03', title: 'Universal Integrations', subtitle: '27+ Connected Platforms',
        description: 'Connect your entire martech stack. OpenAnalyst orchestrates data across 27+ platforms, creating a unified view of your marketing ecosystem.',
        details: ['Gmail, Slack, Google Drive native integrations', 'Ad platforms: Google, Meta, TikTok, LinkedIn', 'CRM: HubSpot, Salesforce, Airtable', 'Payments: Stripe, Shopify, Analytics'],
        accent: '#10B981',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M12 1v4"/><path d="M12 19v4"/><path d="M4.22 4.22l2.83 2.83"/><path d="M16.95 16.95l2.83 2.83"/><path d="M1 12h4"/><path d="M19 12h4"/><path d="M4.22 19.78l2.83-2.83"/><path d="M16.95 7.05l2.83-2.83"/>
            </svg>
        ),
    },
    {
        id: '04', title: 'Agentic Skills', subtitle: 'Beyond Simple Automation',
        description: '14 specialized agentic skills that go beyond simple automation — each one a complete workflow engine capable of end-to-end task execution.',
        details: ['Content creation with brand voice consistency', 'Social media scheduling and engagement', 'Lead scoring and qualification workflows', 'Custom skill builder for unique workflows'],
        accent: '#F59E0B',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
        ),
    },
];

const stats = [
    { value: 42, suffix: '+', label: 'AI Agents' },
    { value: 14, suffix: '', label: 'Agentic Skills' },
    { value: 27, suffix: '+', label: 'Integrations' },
    { value: 99, suffix: '%', label: 'Uptime SLA' },
];

/* ═══════════ ANIMATED COUNTER ═══════════ */
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    useEffect(() => {
        if (!visible || !ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, { val: value, duration: 2, ease: 'power2.out', onUpdate: () => { if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix; } });
    }, [visible, value, suffix]);
    return <span ref={ref}>0{suffix}</span>;
}

/* ═══════════ MAIN PAGE ═══════════ */
export default function FeaturesPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const heroInnerRef = useRef<HTMLDivElement>(null);
    const [activeFeature, setActiveFeature] = useState(0);

    useGSAP(() => {
        /* ── Hero entrance ── */
        gsap.fromTo('.fp-hero-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.2 });
        gsap.fromTo('.fp-hero-heading', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.35 });
        gsap.fromTo('.fp-hero-sub', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.7 });

        /* ── Card deck fan-out on scroll ── */
        const cards = gsap.utils.toArray<HTMLElement>('.fp-card');
        if (cards.length === 4) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.fp-card-deck',
                    start: 'top 70%',
                    end: 'bottom 30%',
                    scrub: 0.8,
                },
            });
            /* Cards start stacked at center, fan out to their positions */
            tl.fromTo(cards[0], { x: 0, y: 0, rotation: 0, scale: 0.92 }, { x: '-135%', y: -20, rotation: -6, scale: 1, duration: 1 }, 0);
            tl.fromTo(cards[1], { x: 0, y: 0, rotation: 0, scale: 0.95 }, { x: '-45%', y: -8, rotation: -2, scale: 1, duration: 1 }, 0);
            tl.fromTo(cards[2], { x: 0, y: 0, rotation: 0, scale: 0.95 }, { x: '45%', y: -8, rotation: 2, scale: 1, duration: 1 }, 0);
            tl.fromTo(cards[3], { x: 0, y: 0, rotation: 0, scale: 0.92 }, { x: '135%', y: -20, rotation: 6, scale: 1, duration: 1 }, 0);
        }

        /* ── Stats counter entrance ── */
        gsap.fromTo('.fp-stat', { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: '.fp-stats-section', start: 'top 88%' },
        });

        /* ── Sticky walkthrough: highlight active feature block ── */
        gsap.utils.toArray<HTMLElement>('.fp-feature-block').forEach((block, i) => {
            ScrollTrigger.create({
                trigger: block,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => setActiveFeature(i),
                onEnterBack: () => setActiveFeature(i),
            });
            gsap.fromTo(block, { y: 40, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: block, start: 'top 85%' },
            });
        });

        /* ── Hero 3D perspective scroll ── */
        if (heroInnerRef.current) {
            gsap.to(heroInnerRef.current, {
                y: 80,
                scale: 0.92,
                rotateX: -5,
                opacity: 0.6,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroInnerRef.current.parentElement,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }
    }, { scope: pageRef });

    return (
        <div ref={pageRef} style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <Header />

            {/* ═══ HERO — Light with card deck ═══ */}
            <section className="section" style={{
                minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', background: 'var(--bg-white)', position: 'relative',
                paddingTop: 'clamp(100px, 15vw, 140px)', paddingBottom: 40, overflow: 'hidden',
                perspective: 1200,
            }}>
                <div ref={heroInnerRef} style={{ transformOrigin: 'center top', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Grid background */}
                <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'linear-gradient(to right, rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.07) 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                    maskImage: 'radial-gradient(ellipse 80% 85% at 50% 40%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 85% at 50% 40%, black 0%, transparent 70%)',
                }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: '10%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(255,107,0,0.25) 0%, rgba(255,107,0,0.5) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: '25%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(255,107,0,0.15) 0%, rgba(255,107,0,0.25) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, right: '25%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.25) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, right: '10%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.5) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: '38%', height: 1, pointerEvents: 'none', background: 'linear-gradient(to right, transparent 0%, rgba(255,107,0,0.3) 30%, rgba(139,92,246,0.3) 70%, transparent 100%)' }} />

                <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 24px' }}>
                    <div className="fp-hero-label" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
                        borderRadius: 999, marginBottom: 28,
                        border: '1px solid var(--border-orange)', background: 'var(--orange-50)',
                    }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--orange)', boxShadow: 'var(--orange-glow)' }} />
                        <span className="label-mono" style={{ fontSize: 11 }}>Capabilities</span>
                    </div>

                    <h1 className="fp-hero-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                        fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05,
                        color: 'var(--text-primary)', marginBottom: 24,
                    }}>
                        Every tool <span className="text-gradient">you need.</span>
                    </h1>

                    <p className="fp-hero-sub" style={{
                        maxWidth: 540, margin: '0 auto', fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
                        color: 'var(--text-secondary)', lineHeight: 1.8,
                    }}>
                        42 AI agents, 14 agentic skills, and 27+ integrations — orchestrated to transform your marketing from reactive to predictive.
                    </p>
                </div>

                {/* ── Card Deck ── */}
                <div className="fp-card-deck" style={{
                    position: 'relative', width: '100%', maxWidth: 900,
                    height: 280, marginTop: 60,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    {features.map((f, i) => (
                        <div key={f.id} className="fp-card" style={{
                            position: 'absolute',
                            width: 180, height: 220,
                            borderRadius: 'var(--radius-xl)', padding: 24,
                            background: 'var(--bg-white)',
                            border: `1px solid ${f.accent}20`,
                            boxShadow: `var(--shadow-lg), 0 0 0 1px ${f.accent}08`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center', gap: 16, textAlign: 'center',
                            zIndex: 4 - i, willChange: 'transform',
                        }}>
                            <div style={{
                                width: 56, height: 56, borderRadius: 'var(--radius-lg)',
                                background: `${f.accent}08`, border: `1px solid ${f.accent}18`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {f.icon}
                            </div>
                            <div>
                                <span className="label-mono" style={{ fontSize: 10, color: f.accent, display: 'block', marginBottom: 6 }}>{f.id}</span>
                                <span style={{
                                    fontFamily: 'var(--font-heading)', fontWeight: 700,
                                    fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.3,
                                }}>{f.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </section>

            {/* ═══ STATS — Light horizontal row ═══ */}
            <section className="fp-stats-section" style={{
                padding: '60px 24px', background: 'var(--bg-surface)',
                borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
            }}>
                <div className="container" style={{
                    maxWidth: 900, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 32, textAlign: 'center',
                }}>
                    {stats.map((stat, i) => (
                        <div key={i} className="fp-stat" style={{ padding: '12px 0' }}>
                            <div style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                                fontWeight: 800, letterSpacing: '-0.03em',
                                color: 'var(--text-primary)', marginBottom: 4,
                            }}>
                                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="label-mono" style={{ fontSize: 11 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ FEATURE PANELS — Interactive split showcase ═══ */}
            <section id="features" style={{
                background: 'var(--bg-white)', padding: 'var(--space-section) 24px',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* Subtle background accent */}
                <div aria-hidden="true" style={{
                    position: 'absolute', top: '50%', right: '-10%', transform: 'translateY(-50%)',
                    width: 600, height: 600, borderRadius: '50%',
                    background: `radial-gradient(circle, ${features[activeFeature].accent}06 0%, transparent 60%)`,
                    filter: 'blur(80px)', pointerEvents: 'none', transition: 'background 0.8s ease',
                }} />

                <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
                    {/* Section heading */}
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <p className="label-mono" style={{ marginBottom: 12 }}>Core Features</p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                            Built for the future <span className="text-gradient">of marketing</span>
                        </h2>
                    </div>

                    {/* Split panel: Left selector + Right showcase */}
                    <div className="fp-split" style={{ display: 'flex', gap: 0, minHeight: 480, borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>

                        {/* Left — Feature selector list */}
                        <div style={{
                            width: 340, flexShrink: 0, background: 'var(--bg-surface)',
                            borderRight: '1px solid var(--border)',
                            display: 'flex', flexDirection: 'column',
                        }}>
                            {features.map((f, i) => {
                                const isActive = activeFeature === i;
                                return (
                                    <button key={f.id}
                                        onClick={() => setActiveFeature(i)}
                                        className="fp-selector-btn"
                                        style={{
                                            flex: 1, display: 'flex', alignItems: 'center', gap: 16,
                                            padding: '24px 28px', border: 'none', cursor: 'pointer',
                                            background: isActive ? 'var(--bg-white)' : 'transparent',
                                            borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                                            position: 'relative', textAlign: 'left',
                                            transition: 'background 0.3s ease',
                                        }}
                                    >
                                        {/* Animated accent bar */}
                                        <div style={{
                                            position: 'absolute', left: 0, top: 0, bottom: 0,
                                            width: 3, borderRadius: '0 2px 2px 0',
                                            background: isActive ? f.accent : 'transparent',
                                            boxShadow: isActive ? `0 0 12px ${f.accent}40` : 'none',
                                            transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                                        }} />

                                        {/* Number */}
                                        <span style={{
                                            fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 900,
                                            color: isActive ? f.accent : 'var(--border)',
                                            lineHeight: 1, minWidth: 36,
                                            transition: 'color 0.4s ease',
                                            filter: isActive ? `drop-shadow(0 0 8px ${f.accent}30)` : 'none',
                                        }}>{f.id}</span>

                                        {/* Text */}
                                        <div>
                                            <span style={{
                                                fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600,
                                                letterSpacing: '0.1em', textTransform: 'uppercase',
                                                color: isActive ? f.accent : 'var(--text-muted)',
                                                display: 'block', marginBottom: 3,
                                                transition: 'color 0.4s ease',
                                            }}>{f.subtitle}</span>
                                            <span style={{
                                                fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700,
                                                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                                                letterSpacing: '-0.01em',
                                                transition: 'color 0.4s ease',
                                            }}>{f.title}</span>
                                        </div>

                                        {/* Arrow indicator */}
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke={isActive ? f.accent : 'var(--border)'}
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            style={{ marginLeft: 'auto', flexShrink: 0, transition: 'all 0.3s ease', transform: isActive ? 'translateX(0)' : 'translateX(-4px)', opacity: isActive ? 1 : 0.3 }}>
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right — Feature showcase */}
                        <div style={{
                            flex: 1, padding: '48px 44px', position: 'relative',
                            background: 'var(--bg-white)', overflow: 'hidden',
                        }}>
                            {/* Large faded number watermark */}
                            <span className="fp-watermark" style={{
                                position: 'absolute', top: -10, right: -5,
                                fontFamily: 'var(--font-heading)', fontSize: 200, fontWeight: 900,
                                color: `${features[activeFeature].accent}06`,
                                lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                                transition: 'color 0.6s ease',
                            }}>{features[activeFeature].id}</span>

                            {/* Accent glow */}
                            <div style={{
                                position: 'absolute', top: 40, right: 40,
                                width: 200, height: 200, borderRadius: '50%',
                                background: `radial-gradient(circle, ${features[activeFeature].accent}08 0%, transparent 70%)`,
                                filter: 'blur(40px)', pointerEvents: 'none',
                                transition: 'background 0.6s ease',
                            }} />

                            {/* Content */}
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                {/* Icon + subtitle row */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                                    <div className="fp-showcase-icon" style={{
                                        width: 52, height: 52, borderRadius: 14,
                                        background: `${features[activeFeature].accent}08`,
                                        border: `1.5px solid ${features[activeFeature].accent}20`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'all 0.4s ease',
                                        boxShadow: `0 4px 16px ${features[activeFeature].accent}10`,
                                    }}>
                                        {features[activeFeature].icon}
                                    </div>
                                    <div>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
                                            letterSpacing: '0.1em', textTransform: 'uppercase',
                                            color: features[activeFeature].accent,
                                            display: 'block', marginBottom: 2,
                                        }}>{features[activeFeature].subtitle}</span>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: 9,
                                            color: 'var(--text-muted)', letterSpacing: '0.05em',
                                        }}>Feature {features[activeFeature].id} of 04</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="fp-showcase-title" style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                                    fontWeight: 800, color: 'var(--text-primary)',
                                    letterSpacing: '-0.02em', lineHeight: 1.15,
                                    marginBottom: 16,
                                }}>{features[activeFeature].title}</h3>

                                {/* Description */}
                                <p className="fp-showcase-desc" style={{
                                    fontSize: 15, color: 'var(--text-secondary)',
                                    lineHeight: 1.8, marginBottom: 28, maxWidth: 500,
                                }}>{features[activeFeature].description}</p>

                                {/* Details grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 20px' }}>
                                    {features[activeFeature].details.map((detail, j) => (
                                        <div key={j} className="fp-detail-item" style={{
                                            display: 'flex', alignItems: 'flex-start', gap: 10,
                                            padding: '10px 12px', borderRadius: 10,
                                            background: 'var(--bg-surface)',
                                            border: '1px solid var(--border)',
                                            transition: 'all 0.3s ease',
                                        }}>
                                            <div style={{
                                                width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                                                background: `${features[activeFeature].accent}10`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                                                    <path d="M3 8L6.5 11.5L13 4.5" stroke={features[activeFeature].accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <span style={{
                                                fontSize: 12, color: 'var(--text-secondary)',
                                                lineHeight: 1.5, fontWeight: 500,
                                            }}>{detail}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom progress dots */}
                                <div style={{ display: 'flex', gap: 6, marginTop: 32 }}>
                                    {features.map((f, i) => (
                                        <button key={i} onClick={() => setActiveFeature(i)} style={{
                                            width: activeFeature === i ? 28 : 8, height: 8,
                                            borderRadius: 4, border: 'none', cursor: 'pointer',
                                            background: activeFeature === i ? f.accent : 'var(--border)',
                                            transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                                            boxShadow: activeFeature === i ? `0 0 8px ${f.accent}40` : 'none',
                                        }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ INTEGRATIONS — Connected nodes visualization ═══ */}
            <Integrations />

            <Footer
                ctaWords={['Unlock', 'every', 'marketing', 'superpower.']}
                ctaHighlight="superpower."
                ctaSubtitle="42 AI agents, one platform. Your competitors are already using it."
            />

            <style>{`
                /* ── Selector button hover ── */
                .fp-selector-btn:hover {
                    background: var(--bg-white) !important;
                }

                /* ── Stats responsive ── */
                @media (max-width: 1024px) {
                    .fp-stats-section .container { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 600px) {
                    .fp-stats-section .container { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
                }
                @media (max-width: 360px) {
                    .fp-stats-section .container { grid-template-columns: 1fr !important; }
                }

                /* ── Card deck responsive ── */
                @media (max-width: 768px) {
                    .fp-card-deck { height: 240px !important; }
                    .fp-card { width: 140px !important; height: 180px !important; padding: 16px !important; }
                }
                @media (max-width: 480px) {
                    .fp-card-deck { height: 200px !important; }
                    .fp-card { width: 110px !important; height: 150px !important; padding: 12px !important; }
                    .fp-card svg { width: 20px !important; height: 20px !important; }
                }

                /* ── Split feature panel responsive ── */
                @media (max-width: 900px) {
                    .fp-split {
                        flex-direction: column !important;
                    }
                    .fp-split > div:first-child {
                        width: 100% !important;
                        flex-direction: row !important;
                        overflow-x: auto !important;
                        border-right: none !important;
                        border-bottom: 1px solid var(--border) !important;
                    }
                    .fp-selector-btn {
                        flex: none !important;
                        width: auto !important;
                        min-width: 160px !important;
                        padding: 16px 20px !important;
                        border-bottom: none !important;
                        border-right: 1px solid var(--border) !important;
                    }
                    .fp-selector-btn > div:first-child {
                        left: auto !important;
                        bottom: 0 !important;
                        top: auto !important;
                        width: 100% !important;
                        height: 3px !important;
                        border-radius: 2px 2px 0 0 !important;
                    }
                    .fp-watermark {
                        font-size: 120px !important;
                    }
                }
                @media (max-width: 600px) {
                    .fp-split > div:last-child {
                        padding: 28px 20px !important;
                    }
                    .fp-detail-item {
                        grid-column: span 2 !important;
                    }
                }
            `}</style>
        </div>
    );
}
