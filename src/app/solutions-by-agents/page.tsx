'use client';

import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';

gsap.registerPlugin(ScrollTrigger);

const featuredAgent = {
    name: 'AI Vibe Marketer',
    role: 'Full-Stack Marketing Agent',
    desc: 'The flagship autonomous agent that plans, creates, and optimizes campaigns across every channel. From audience segmentation and content creation to real-time budget optimization and ROI tracking — all on autopilot.',
    capabilities: ['Multi-channel orchestration', 'A/B testing & optimization', 'Content generation', 'Budget allocation', 'Performance analytics', 'Audience targeting'],
    stats: [
        { label: 'Avg ROI', value: '340%', color: '#10B981' },
        { label: 'Campaigns', value: '10K+', color: '#FF6B00' },
        { label: 'Channels', value: '8', color: '#3B82F6' },
    ],
};

const agents = [
    { name: 'Content Strategist', desc: 'AI-powered content planning, creation, and distribution across all channels.', color: '#3B82F6', metric: '+4x content output', capabilities: ['Blog generation', 'Social copy', 'Email sequences'] },
    { name: 'Market Researcher', desc: 'Real-time market research with competitor analysis and trend forecasting.', color: '#10B981', metric: '10x faster insights', capabilities: ['Competitor tracking', 'Trend detection', 'Market sizing'] },
    { name: 'Customer Insights', desc: 'Deep customer segmentation, behavior analysis, and predictive modeling.', color: '#F59E0B', metric: '92% accuracy', capabilities: ['Behavioral clustering', 'Churn prediction', 'LTV modeling'] },
    { name: 'Ad Campaign Manager', desc: 'Automated ad creation, A/B testing, and cross-platform budget optimization.', color: '#8B5CF6', metric: '-31% CPA', capabilities: ['Google Ads', 'Meta Ads', 'LinkedIn Ads'] },
    { name: 'SEO Specialist', desc: 'AI-driven SEO optimization, keyword research, and content gap analysis.', color: '#EC4899', metric: '+47% traffic', capabilities: ['Keyword research', 'On-page SEO', 'Rank tracking'] },
];

export default function SolutionsPage() {
    const pageRef = useRef<HTMLDivElement>(null);

    const handleCardHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, { rotateY: x * 5, rotateX: -y * 3, duration: 0.3, ease: 'power2.out' });
    }, []);

    const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    }, []);

    useGSAP(() => {
        gsap.fromTo('.sol-hero-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.2 });
        gsap.fromTo('.sol-hero-line', { y: 80, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power4.out', delay: 0.3 });
        gsap.fromTo('.sol-hero-sub', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.8 });

        gsap.fromTo('.sol-featured', { y: 60, opacity: 0, filter: 'blur(4px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.sol-featured', start: 'top 85%' } });

        gsap.fromTo('.sol-agent-card', { y: 50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: 'back.out(1.2)', scrollTrigger: { trigger: '.sol-agents-grid', start: 'top 85%' } });

        gsap.fromTo('.sol-cta-content', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: '.sol-cta', start: 'top 85%' } });
    }, { scope: pageRef });

    return (
        <div ref={pageRef} style={{ minHeight: '100vh' }}>
            <Header />

            {/* ═══ HERO — Light ═══ */}
            <section className="light-section" style={{ paddingTop: 160, paddingBottom: 80, background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
                {/* Decorative grid */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', top: '10%', right: '20%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,107,0,0.04)', filter: 'blur(100px)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <div className="sol-hero-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, marginBottom: 32, border: '1px solid rgba(255,107,0,0.2)', background: 'rgba(255,107,0,0.06)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B00', boxShadow: '0 0 8px rgba(255,107,0,0.5)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI Agents</span>
                    </div>

                    <h1>
                        {['Meet Your AI', 'Marketing Team'].map((line, i) => (
                            <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                                <span className="sol-hero-line" style={{
                                    display: 'block', fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                                    fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em',
                                    ...(i === 1 ? { background: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 40%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } : { color: 'var(--text-primary)' }),
                                }}>{line}</span>
                            </span>
                        ))}
                    </h1>

                    <p className="sol-hero-sub" style={{ maxWidth: 520, margin: '28px auto 0', fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        Deploy specialized AI marketing agents tailored for your campaigns and growth goals. Each agent is a complete specialist.
                    </p>
                </div>
            </section>

            {/* ═══ FEATURED AGENT — Light (Dossier Style) ═══ */}
            <section className="light-section" style={{ padding: '100px 24px', background: 'var(--bg-surface)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div className="sol-featured" style={{
                        display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 0,
                        borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow-lg)',
                    }}>
                        {/* Left — Info */}
                        <div style={{ padding: '48px 44px', background: 'var(--bg-white)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                                <span style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.15)', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#FF6B00', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Most Popular</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
                                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.5)' }} /> Active
                                </span>
                            </div>

                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.02em' }}>{featuredAgent.name}</h2>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange)', marginBottom: 16, letterSpacing: '0.04em' }}>{featuredAgent.role}</p>
                            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 28 }}>{featuredAgent.desc}</p>

                            {/* Capabilities */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                                {featuredAgent.capabilities.map((cap) => (
                                    <span key={cap} style={{ padding: '5px 12px', borderRadius: 999, background: 'var(--bg-surface)', border: '1px solid var(--border)', fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{cap}</span>
                                ))}
                            </div>

                            <a href="https://app.openanalyst.com" className="btn-primary" style={{ textDecoration: 'none', fontSize: 14, padding: '12px 28px' }}>
                                Deploy Agent <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </a>
                        </div>

                        {/* Right — Stats panel (dark invert) */}
                        <div style={{ padding: '48px 36px', background: 'var(--bg-dark)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-on-dark-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Performance</p>
                            {featuredAgent.stats.map((stat) => (
                                <div key={stat.label} style={{ padding: '20px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: stat.color, marginBottom: 4, letterSpacing: '-0.02em' }}>{stat.value}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-on-dark-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ OTHER AGENTS — Light Bento Grid ═══ */}
            <section className="light-section" style={{ padding: '100px 24px', background: 'var(--bg-white)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 56 }}>
                        <p className="label-mono" style={{ color: 'var(--orange)', marginBottom: 12 }}>Specialist Agents</p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                            Your <span className="text-gradient">complete</span> AI marketing team
                        </h2>
                    </div>

                    <div className="sol-agents-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
                        {agents.map((agent, i) => {
                            const isWide = i < 2;
                            return (
                                <div key={agent.name} className="sol-agent-card" style={{ gridColumn: isWide ? 'span 3' : 'span 2', perspective: 800 }}>
                                    <div onMouseMove={handleCardHover} onMouseLeave={handleCardLeave} style={{ willChange: 'transform', transformStyle: 'preserve-3d', height: '100%' }}>
                                        <div style={{
                                            padding: 28, borderRadius: 20,
                                            background: 'var(--bg-surface)', border: '1px solid var(--border)',
                                            transition: 'all 0.3s ease', height: '100%',
                                            display: 'flex', flexDirection: 'column', cursor: 'default',
                                        }}
                                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${agent.color}40`; e.currentTarget.style.boxShadow = `0 8px 32px ${agent.color}15`; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                                        >
                                            {/* Header */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: agent.color, boxShadow: `0 0 8px ${agent.color}40`, flexShrink: 0 }} />
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: agent.color, padding: '3px 8px', borderRadius: 6, background: `${agent.color}10` }}>{agent.metric}</span>
                                            </div>

                                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{agent.name}</h3>
                                            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16, flex: 1 }}>{agent.desc}</p>

                                            {/* Capability tags */}
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                                {agent.capabilities.map((cap) => (
                                                    <span key={cap} style={{ padding: '3px 10px', borderRadius: 999, background: 'var(--bg-white)', border: '1px solid var(--border)', fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{cap}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══ CTA — Light ═══ */}
            <section className="sol-cta light-section" style={{ padding: '100px 24px', background: 'var(--bg-surface)' }}>
                <div className="sol-cta-content" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.03em' }}>
                        Put your AI team <span className="text-gradient">to work</span>
                    </h2>
                    <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.7 }}>
                        Deploy all agents with a single click. Start seeing results in hours, not weeks.
                    </p>
                    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://app.openanalyst.com" className="btn-primary" style={{ textDecoration: 'none' }}>Start Free Trial <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                        <a href="/contact" className="btn-outline" style={{ textDecoration: 'none' }}>Talk to Sales</a>
                    </div>
                </div>
            </section>

            <Footer
                ctaWords={['Deploy', 'agents.', 'Dominate', 'channels.']}
                ctaHighlight="channels."
                ctaSubtitle="Set your goals, activate agents, and watch your growth compound daily."
            />

            <style>{`
                @media (max-width: 1024px) {
                    .sol-agents-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    .sol-agents-grid > * { grid-column: span 1 !important; }
                }
                @media (max-width: 900px) {
                    .sol-featured { grid-template-columns: 1fr !important; }
                    .sol-agents-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
