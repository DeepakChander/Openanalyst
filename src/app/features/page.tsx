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
    const [activeFeature, setActiveFeature] = useState(0);

    useGSAP(() => {
        /* ── Hero entrance ── */
        gsap.from('.fp-hero-label', { y: 16, opacity: 0, duration: 0.5, delay: 0.2 });
        gsap.from('.fp-hero-heading', { y: 60, opacity: 0, duration: 1, ease: 'power4.out', delay: 0.35 });
        gsap.from('.fp-hero-sub', { y: 24, opacity: 0, duration: 0.7, delay: 0.7 });

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
        gsap.from('.fp-stat', {
            y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(1.2)',
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
            gsap.from(block, {
                y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: block, start: 'top 85%' },
            });
        });

        /* ── CTA entrance ── */
        gsap.from('.fp-cta-inner', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.fp-cta-section', start: 'top 85%' },
        });
    }, { scope: pageRef });

    return (
        <div ref={pageRef} style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <Header />

            {/* ═══ HERO — Light with card deck ═══ */}
            <section className="section" style={{
                minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', background: 'var(--bg-white)', position: 'relative',
                paddingTop: 140, paddingBottom: 40,
            }}>
                {/* Subtle grid bg */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                    maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 70%)',
                }} />
                {/* Warm orange glow */}
                <div style={{
                    position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
                    width: 700, height: 700, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)',
                    filter: 'blur(60px)', pointerEvents: 'none',
                }} />

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

            {/* ═══ STICKY WALKTHROUGH — Light ═══ */}
            <section id="features" className="section" style={{ background: 'var(--bg-white)', padding: '0 24px' }}>
                <div className="container" style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
                    alignItems: 'start', paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)',
                }}>
                    {/* Left — Sticky visual */}
                    <div className="fp-sticky-visual" style={{
                        position: 'sticky', top: 140,
                        height: 'fit-content',
                    }}>
                        <div style={{
                            borderRadius: 'var(--radius-2xl)', overflow: 'hidden',
                            background: 'var(--bg-surface)', border: '1px solid var(--border)',
                            padding: 48, minHeight: 420,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                            borderColor: `${features[activeFeature].accent}25`,
                            boxShadow: `0 24px 80px -16px ${features[activeFeature].accent}12`,
                        }}>
                            {/* Accent glow */}
                            <div style={{
                                position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
                                width: '70%', height: '70%', borderRadius: '50%',
                                background: `radial-gradient(circle, ${features[activeFeature].accent}06 0%, transparent 70%)`,
                                filter: 'blur(40px)', pointerEvents: 'none',
                                transition: 'background 0.6s ease',
                            }} />

                            {/* Large number */}
                            <span style={{
                                fontFamily: 'var(--font-heading)', fontSize: 120, fontWeight: 900,
                                color: `${features[activeFeature].accent}08`,
                                lineHeight: 1, position: 'absolute', top: 24, right: 32,
                                transition: 'color 0.4s ease',
                                userSelect: 'none',
                            }}>{features[activeFeature].id}</span>

                            {/* Icon */}
                            <div style={{
                                width: 80, height: 80, borderRadius: 'var(--radius-xl)',
                                background: `${features[activeFeature].accent}08`,
                                border: `1px solid ${features[activeFeature].accent}18`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: 24, transition: 'all 0.4s ease',
                                position: 'relative',
                            }}>
                                <div style={{ transform: 'scale(1.4)' }}>
                                    {features[activeFeature].icon}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 style={{
                                fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                                fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)',
                                marginBottom: 8, textAlign: 'center', position: 'relative',
                                transition: 'color 0.3s ease',
                            }}>{features[activeFeature].title}</h3>

                            <span className="label-mono" style={{
                                color: features[activeFeature].accent,
                                fontSize: 11, position: 'relative',
                            }}>{features[activeFeature].subtitle}</span>

                            {/* Progress dots */}
                            <div style={{
                                display: 'flex', gap: 8, marginTop: 32, position: 'relative',
                            }}>
                                {features.map((f, i) => (
                                    <div key={i} style={{
                                        width: i === activeFeature ? 24 : 8, height: 8,
                                        borderRadius: 'var(--radius-full)',
                                        background: i === activeFeature ? f.accent : 'var(--border)',
                                        transition: 'all 0.4s var(--ease-out)',
                                    }} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right — Scrolling feature blocks */}
                    <div className="fp-scroll-column" style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
                        {features.map((f, i) => (
                            <div key={f.id} className="fp-feature-block" style={{ paddingTop: i === 0 ? 0 : 0 }}>
                                {/* Number + subtitle */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                    <span style={{
                                        fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
                                        color: f.accent, background: `${f.accent}08`,
                                        padding: '4px 10px', borderRadius: 'var(--radius-sm)',
                                        border: `1px solid ${f.accent}18`,
                                    }}>{f.id}</span>
                                    <span className="label-mono" style={{ color: f.accent, fontSize: 11 }}>{f.subtitle}</span>
                                </div>

                                {/* Title */}
                                <h3 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                                    fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15,
                                    color: 'var(--text-primary)', marginBottom: 16,
                                }}>{f.title}</h3>

                                {/* Description */}
                                <p style={{
                                    fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8,
                                    marginBottom: 24,
                                }}>{f.description}</p>

                                {/* Detail bullets */}
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {f.details.map((detail, j) => (
                                        <li key={j} style={{
                                            display: 'flex', alignItems: 'flex-start', gap: 12,
                                            fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7,
                                        }}>
                                            <span style={{
                                                width: 20, height: 20, borderRadius: 'var(--radius-sm)',
                                                background: `${f.accent}08`, border: `1px solid ${f.accent}15`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                flexShrink: 0, marginTop: 2,
                                            }}>
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={f.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>

                                {/* Divider between blocks */}
                                {i < features.length - 1 && (
                                    <div style={{
                                        marginTop: 48, height: 1,
                                        background: 'linear-gradient(90deg, var(--border) 0%, transparent 100%)',
                                    }} />
                                )}
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

            <Footer />

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
