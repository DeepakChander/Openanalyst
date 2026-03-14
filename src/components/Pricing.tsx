'use client';

import React, { useRef, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Pricing: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleCardHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
        gsap.to(card, { rotateY: x * 6, rotateX: -y * 4, duration: 0.3, ease: 'power2.out' });
    }, []);

    const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    }, []);

    useGSAP(() => {
        gsap.from('.pricing-heading', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
        gsap.from('.pricing-plan', {
            y: 50, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: '.pricing-grid', start: 'top 85%', toggleActions: 'play none none reverse' },
        });
    }, { scope: containerRef });

    const plans = [
        {
            name: 'Trial Pack', price: '$1', period: '', credits: '500 credits · 15 days',
            desc: 'Perfect for testing the waters',
            features: ['5 Agentic Marketing Skills', '26 Specialist Agents', '5 MCPs (Gmail, Drive, Slack, Ads)', 'Basic Analytics', 'Email Support'],
            cta: 'Start Trial', ctaLink: 'https://app.openanalyst.com', popular: false,
        },
        {
            name: 'Growth Pack', price: '$399', period: '/mo', credits: '15,000 credits · 30 days',
            desc: 'For teams ready to scale',
            features: ['14 Agentic Marketing Skills', '42 Specialist Agents', 'All 27 MCP Integrations', 'Google/Meta/TikTok Ads', 'Advanced Analytics', 'Priority Support (1-Day TAT)'],
            cta: 'Get Growth Pack', ctaLink: 'https://app.openanalyst.com', popular: true,
        },
        {
            name: 'CLI Pricing', price: 'BYOK', period: '', credits: 'Credits-based · $5 to $5K',
            desc: 'For developers and power users',
            features: ['Bring Your Own API Keys', 'Full agent access (42 agents)', '27+ MCP integrations', 'CI/CD pipeline integration', 'Scriptable workflows', 'Community support'],
            cta: 'Install CLI', ctaLink: '/docs', popular: false,
        },
    ];

    return (
        <section ref={containerRef} style={{
            padding: '120px 0', background: '#FAFAFA',
            position: 'relative', overflow: 'hidden',
        }}>
            <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '700px', height: '400px',
                background: 'radial-gradient(ellipse, rgba(255,107,0,0.04) 0%, transparent 65%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div className="pricing-heading" style={{ textAlign: 'center', marginBottom: '56px' }}>
                    <span style={{
                        display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '12px',
                        color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px',
                    }}>Pricing</span>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.03em', marginBottom: '16px',
                    }}>Simple, transparent pricing</h2>
                    <p style={{
                        fontSize: '16px', color: '#666', maxWidth: '460px', margin: '0 auto',
                        fontFamily: 'var(--font-body)', lineHeight: 1.7,
                    }}>Start with $1 or scale to enterprise. Pay only for what you use.</p>
                </div>

                {/* Cards */}
                <div className="pricing-grid" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px', alignItems: 'stretch', marginBottom: '40px',
                }}>
                    {plans.map((plan) => (
                        <div key={plan.name} className="pricing-plan" style={{ perspective: '1000px' }}>
                            <div
                                onMouseMove={handleCardHover}
                                onMouseLeave={handleCardLeave}
                                style={{ willChange: 'transform', transformStyle: 'preserve-3d', height: '100%' }}
                            >
                                <div style={{
                                    borderRadius: '20px',
                                    border: plan.popular ? '2px solid #FF6B00' : '1px solid #E5E5E5',
                                    backgroundColor: '#FFFFFF',
                                    height: '100%', display: 'flex', flexDirection: 'column',
                                    position: 'relative', overflow: 'hidden',
                                    transition: 'box-shadow 0.3s ease',
                                    boxShadow: plan.popular
                                        ? '0 0 0 1px rgba(255,107,0,0.1), 0 20px 60px rgba(255,107,0,0.1), 0 4px 20px rgba(0,0,0,0.06)'
                                        : '0 2px 16px rgba(0,0,0,0.04)',
                                    background: plan.popular
                                        ? 'radial-gradient(500px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255,107,0,0.04), transparent 40%), #FFFFFF'
                                        : '#FFFFFF',
                                }}>
                                    {plan.popular && (
                                        <div style={{
                                            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                                            background: 'linear-gradient(135deg, #FF6B00, #E85D00)',
                                            color: '#FFFFFF', fontSize: '10px', fontWeight: 700,
                                            padding: '6px 20px', borderRadius: '0 0 10px 10px',
                                            textTransform: 'uppercase', letterSpacing: '0.1em',
                                            fontFamily: 'var(--font-mono)', zIndex: 2,
                                            boxShadow: '0 4px 12px rgba(255,107,0,0.25)',
                                        }}>Most Popular</div>
                                    )}

                                    <div style={{
                                        padding: plan.popular ? '52px 32px 36px' : '36px 32px',
                                        flex: 1, display: 'flex', flexDirection: 'column',
                                    }}>
                                        <h3 style={{
                                            fontFamily: 'var(--font-heading)', fontSize: '18px',
                                            fontWeight: 700, color: '#1A1A1A', marginBottom: '4px',
                                        }}>{plan.name}</h3>
                                        <p style={{
                                            fontFamily: 'var(--font-body)', fontSize: '13px',
                                            color: '#999', marginBottom: '20px',
                                        }}>{plan.desc}</p>

                                        <div style={{ marginBottom: '4px', lineHeight: 1 }}>
                                            <span style={{
                                                fontFamily: plan.price === 'BYOK' ? 'var(--font-mono)' : 'var(--font-heading)',
                                                fontSize: plan.price === 'BYOK' ? '32px' : '48px',
                                                fontWeight: 800,
                                                color: plan.price === 'BYOK' ? '#FF6B00' : '#1A1A1A',
                                                letterSpacing: '-0.03em',
                                            }}>{plan.price}</span>
                                            {plan.period && <span style={{ fontSize: '15px', color: '#999' }}>{plan.period}</span>}
                                        </div>

                                        <p style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '12px',
                                            color: '#999', marginBottom: '28px',
                                        }}>{plan.credits}</p>

                                        <div style={{ height: '1px', background: '#F0F0F0', marginBottom: '24px' }} />

                                        <ul style={{
                                            listStyle: 'none', margin: '0 0 32px', padding: 0,
                                            display: 'flex', flexDirection: 'column', gap: '12px', flex: 1,
                                        }}>
                                            {plan.features.map((f, j) => (
                                                <li key={j} style={{
                                                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                                                    fontSize: '13.5px', color: '#4A4A4A', fontFamily: 'var(--font-body)',
                                                }}>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                                                        <circle cx="8" cy="8" r="8" fill={plan.popular ? 'rgba(255,107,0,0.1)' : 'rgba(0,0,0,0.04)'} />
                                                        <path d="M5 8l2 2 4-4" stroke={plan.popular ? '#FF6B00' : '#666'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>

                                        <a
                                            href={plan.ctaLink}
                                            className={plan.popular ? 'btn-primary' : 'btn-outline'}
                                            style={{
                                                display: 'block', width: '100%', textAlign: 'center',
                                                padding: '14px', fontSize: '14px', borderRadius: '12px',
                                                ...(plan.popular ? {} : { color: '#1A1A1A', borderColor: '#E5E5E5' }),
                                            }}
                                        >{plan.cta}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View all pricing link */}
                <div style={{ textAlign: 'center' }}>
                    <Link href="/pricing" style={{
                        fontFamily: 'var(--font-body)', fontSize: '14px',
                        color: '#FF6B00', fontWeight: 600, textDecoration: 'none',
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        transition: 'gap 0.2s ease',
                    }}>
                        View full pricing details
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .pricing-grid {
                        grid-template-columns: 1fr !important;
                        max-width: 480px !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Pricing;
