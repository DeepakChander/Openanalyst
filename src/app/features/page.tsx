'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';

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

        /* ── CTA entrance ── */
        gsap.fromTo('.fp-cta-inner', { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.fp-cta-section', start: 'top 85%' },
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
                paddingTop: 140, paddingBottom: 40, overflow: 'hidden',
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

            {/* ═══ FEATURE PANELS — Alternating full-width blocks ═══ */}
            <section id="features" style={{ background: 'var(--bg-white)', paddingBottom: 'var(--space-section-sm)' }}>
                <div style={{ padding: '0 24px' }}>
                    {/* Section heading */}
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <p className="label-mono" style={{ marginBottom: 12 }}>Core Features</p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                            Built for the future <span className="text-gradient">of marketing</span>
                        </h2>
                    </div>

                    {/* 2x2 Feature grid */}
                    <div className="fp-feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 1000, margin: '0 auto' }}>
                        {features.map((f, i) => (
                            <div key={f.id} className="fp-feature-block" style={{
                                padding: '32px 28px', borderRadius: 'var(--radius-xl)',
                                background: i === 0 ? 'var(--bg-dark)' : 'var(--bg-surface)',
                                border: `1px solid ${i === 0 ? 'rgba(255,107,0,0.15)' : 'var(--border)'}`,
                                boxShadow: 'var(--shadow-md)',
                                transition: 'all 0.3s var(--ease-out)',
                                position: 'relative', overflow: 'hidden',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${f.accent}12`; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                            >
                                {/* Faded number */}
                                <span style={{ position: 'absolute', top: 16, right: 20, fontFamily: 'var(--font-heading)', fontSize: 56, fontWeight: 900, color: i === 0 ? 'rgba(255,107,0,0.08)' : `${f.accent}06`, lineHeight: 1, pointerEvents: 'none' }}>{f.id}</span>

                                {/* Icon */}
                                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: i === 0 ? 'rgba(255,107,0,0.15)' : `${f.accent}10`, border: `1px solid ${i === 0 ? 'rgba(255,107,0,0.25)' : f.accent + '20'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: i === 0 ? '#FF6B00' : f.accent }}>
                                    {f.icon}
                                </div>

                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: i === 0 ? '#FF8533' : f.accent, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{f.subtitle}</span>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: i === 0 ? '#FAFAFA' : 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.01em' }}>{f.title}</h3>
                                <p style={{ fontSize: 14, color: i === 0 ? 'rgba(255,255,255,0.6)' : 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>{f.description}</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {f.details.map((detail, j) => (
                                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)' }}>
                                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke={f.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            {detail}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA — Dark (single dark section) ═══ */}
            <section className="fp-cta-section dark-section section" style={{
                background: 'var(--bg-dark)', textAlign: 'center',
            }}>
                {/* Grid bg */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                    maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)',
                }} />
                {/* Glow */}
                <div style={{
                    position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
                    width: 600, height: 400, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
                    filter: 'blur(80px)', pointerEvents: 'none',
                }} />

                <div className="fp-cta-inner container" style={{ maxWidth: 700, position: 'relative', zIndex: 2 }}>
                    <span className="label-mono" style={{ color: 'var(--orange)', display: 'block', marginBottom: 20, fontSize: 11 }}>Get Started</span>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                        fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
                        color: '#FAFAFA', marginBottom: 20,
                    }}>
                        Ready to transform your marketing?
                    </h2>
                    <p style={{
                        fontSize: 'clamp(1rem, 1.3vw, 1.1rem)', color: 'var(--text-on-dark-secondary)',
                        lineHeight: 1.8, maxWidth: 480, margin: '0 auto 36px',
                    }}>
                        Join teams using OpenAnalyst to automate campaigns, surface insights, and drive growth with AI.
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://app.openanalyst.com" className="btn-primary" style={{ textDecoration: 'none' }}>
                            Start Free Trial
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </a>
                        <a href="/about" className="btn-outline" style={{ textDecoration: 'none' }}>
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            <Footer
                ctaWords={['Unlock', 'every', 'marketing', 'superpower.']}
                ctaHighlight="superpower."
                ctaSubtitle="42 AI agents, one platform. Your competitors are already using it."
            />

            <style>{`
                /* ── Stats responsive ── */
                @media (max-width: 1024px) {
                    .fp-stats-section .container { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 600px) {
                    .fp-stats-section .container { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
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

                /* ── Sticky walkthrough responsive ── */
                @media (max-width: 900px) {
                    #features .container {
                        grid-template-columns: 1fr !important;
                        gap: 48px !important;
                    }
                    .fp-sticky-visual {
                        position: relative !important;
                        top: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
}
