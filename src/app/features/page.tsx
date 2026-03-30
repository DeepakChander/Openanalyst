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
        accent: '#FF6B00', dark: true,
    },
    {
        id: '02', title: 'Deep Analytics', subtitle: 'Research & Intelligence',
        description: 'Surface insights buried in your data with research agents that analyze competitors, identify market trends, and deliver actionable intelligence.',
        details: ['Competitor intelligence with real-time monitoring', 'Trend detection across social, search, and news', 'Audience segmentation with behavioral clustering', 'ROI attribution across touchpoints'],
        accent: '#8B5CF6', dark: false,
    },
    {
        id: '03', title: 'Universal Integrations', subtitle: '27+ Connected Platforms',
        description: 'Connect your entire martech stack. OpenAnalyst orchestrates data across 27+ platforms, creating a unified view of your marketing ecosystem.',
        details: ['Gmail, Slack, Google Drive native integrations', 'Ad platforms: Google, Meta, TikTok, LinkedIn', 'CRM: HubSpot, Salesforce, Airtable', 'Payments: Stripe, Shopify, Analytics'],
        accent: '#10B981', dark: true,
    },
    {
        id: '04', title: 'Agentic Skills', subtitle: 'Beyond Simple Automation',
        description: '14 specialized agentic skills that go beyond simple automation — each one a complete workflow engine capable of end-to-end task execution.',
        details: ['Content creation with brand voice consistency', 'Social media scheduling and engagement', 'Lead scoring and qualification workflows', 'Custom skill builder for unique workflows'],
        accent: '#F59E0B', dark: false,
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

/* ═══════════ VIDEO PLACEHOLDER ═══════════ */
function VideoPlaceholder({ color, label }: { color: string; label: string }) {
    return (
        <div style={{
            width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden',
            background: 'var(--bg-dark-card)', border: '1px solid var(--border-dark-default)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            position: 'relative', boxShadow: `0 24px 64px -16px ${color}15`,
        }}>
            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', height: '60%', borderRadius: '50%', background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.3, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, position: 'relative', zIndex: 1 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="8 5 20 12 8 19" /></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dark-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>{label} Demo</span>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.04)' }}>
                <div style={{ width: '35%', height: '100%', borderRadius: '0 2px 2px 0', background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
            </div>
        </div>
    );
}

/* ═══════════ MAIN PAGE ═══════════ */
export default function FeaturesPage() {
    const pageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero
        gsap.from('.fp-hero-label', { y: 16, opacity: 0, duration: 0.5, delay: 0.2 });
        gsap.from('.fp-hero-line', { y: 80, opacity: 0, stagger: 0.12, duration: 1, ease: 'power4.out', delay: 0.3 });
        gsap.from('.fp-hero-sub', { y: 24, opacity: 0, duration: 0.7, delay: 0.8 });
        gsap.from('.fp-hero-cta', { y: 20, opacity: 0, duration: 0.5, delay: 1 });

        // Stats
        gsap.from('.fp-stat', { y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(1.2)', scrollTrigger: { trigger: '.fp-stats', start: 'top 88%' } });

        // Feature panels
        gsap.utils.toArray<HTMLElement>('.fp-panel').forEach((panel) => {
            gsap.from(panel.querySelector('.fp-panel-text'), { x: -40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: panel, start: 'top 82%' } });
            gsap.from(panel.querySelector('.fp-panel-visual'), { x: 40, opacity: 0, scale: 0.95, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: panel, start: 'top 82%' } });
        });
    }, { scope: pageRef });

    return (
        <div ref={pageRef} style={{ minHeight: '100vh' }}>
            <Header />

            {/* ═══ HERO — Dark ═══ */}
            <section className="dark-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 140, paddingBottom: 80, background: 'var(--bg-dark-primary)' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', top: '20%', left: '30%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(255,107,0,0.05)', filter: 'blur(100px)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <div className="fp-hero-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, marginBottom: 32, border: '1px solid rgba(255,107,0,0.2)', background: 'rgba(255,107,0,0.06)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B00', boxShadow: '0 0 8px rgba(255,107,0,0.5)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF8533', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Capabilities</span>
                    </div>

                    <h1>
                        {['Every tool', 'you need.'].map((line, i) => (
                            <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                                <span className="fp-hero-line" style={{
                                    display: 'block', fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em',
                                    ...(i === 1 ? { background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } : { color: '#FAFAFA' }),
                                }}>{line}</span>
                            </span>
                        ))}
                    </h1>

                    <p className="fp-hero-sub" style={{ maxWidth: 520, margin: '28px auto 36px', fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', color: 'var(--text-dark-secondary)', lineHeight: 1.8 }}>
                        42 AI agents, 14 agentic skills, and 27+ integrations — orchestrated to transform your marketing from reactive to predictive.
                    </p>

                    <div className="fp-hero-cta" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://app.openanalyst.com" className="btn-primary" style={{ textDecoration: 'none' }}>Start Free Trial <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                        <a href="#features" className="btn-outline" style={{ textDecoration: 'none', color: 'var(--text-dark-secondary)', borderColor: 'var(--border-dark-default)' }}>Explore Features</a>
                    </div>
                </div>
            </section>

            {/* ═══ STATS BAR — Light ═══ */}
            <section className="fp-stats light-section" style={{ padding: '60px 24px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-default)' }}>
                <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
                    {stats.map((stat, i) => (
                        <div key={i} className="fp-stat">
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 4 }}>
                                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ FEATURE PANELS — Alternating Dark/Light ═══ */}
            <div id="features">
                {features.map((feature, i) => {
                    const isDark = feature.dark;
                    const isReversed = i % 2 !== 0;

                    return (
                        <section key={feature.id} className={`fp-panel ${isDark ? 'dark-section' : 'light-section'}`} style={{
                            padding: '120px 24px', background: isDark ? 'var(--bg-dark-primary)' : 'var(--bg-white)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            {/* Ambient glow */}
                            <div style={{
                                position: 'absolute', top: '20%', ...(isReversed ? { left: '10%' } : { right: '10%' }),
                                width: 500, height: 500, borderRadius: '50%',
                                background: `radial-gradient(circle, ${feature.accent}${isDark ? '06' : '04'} 0%, transparent 70%)`,
                                filter: 'blur(80px)', pointerEvents: 'none',
                            }} />

                            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isReversed ? '1.15fr 0.85fr' : '0.85fr 1.15fr', gap: 64, alignItems: 'center' }}>
                                {/* Text side */}
                                <div className="fp-panel-text" style={{ order: isReversed ? 2 : 1 }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 48, fontWeight: 900, color: isDark ? 'rgba(255,107,0,0.06)' : 'rgba(0,0,0,0.03)', lineHeight: 1, display: 'block', marginBottom: 12 }}>{feature.id}</span>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: feature.accent, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 12 }}>{feature.subtitle}</span>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 20, color: isDark ? '#FAFAFA' : 'var(--text-primary)' }}>{feature.title}</h3>
                                    <p style={{ fontSize: 16, color: isDark ? 'var(--text-dark-secondary)' : 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32 }}>{feature.description}</p>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        {feature.details.map((detail, j) => (
                                            <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: isDark ? 'var(--text-dark-secondary)' : 'var(--text-secondary)' }}>
                                                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: feature.accent, flexShrink: 0, marginTop: 7 }} />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Video placeholder */}
                                <div className="fp-panel-visual" style={{ order: isReversed ? 1 : 2, height: 400 }}>
                                    <VideoPlaceholder color={feature.accent} label={feature.title} />
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>

            <Footer />

            <style>{`
                @media (max-width: 900px) {
                    .fp-panel > div { grid-template-columns: 1fr !important; gap: 40px !important; }
                    .fp-panel-text, .fp-panel-visual { order: unset !important; }
                    .fp-stats > div { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 600px) {
                    .fp-stats > div { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
