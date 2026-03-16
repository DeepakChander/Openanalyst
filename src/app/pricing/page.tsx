'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ DATA ═══════════ */
const creditsTiers = [
    { tier: 'Starter', credits: '500', price: '$5', perCredit: '$0.010', save: '' },
    { tier: 'Standard', credits: '2,500', price: '$20', perCredit: '$0.008', save: '20%' },
    { tier: 'Pro', credits: '10,000', price: '$60', perCredit: '$0.006', save: '40%' },
    { tier: 'Scale', credits: '50,000', price: '$200', perCredit: '$0.004', save: '60%' },
    { tier: 'Enterprise', credits: '500,000', price: '$1,500', perCredit: '$0.003', save: '70%' },
];

const faqs = [
    { q: 'What are credits and how do they work?', a: 'Credits are the universal currency for using AI models on OpenAnalyst. Different models consume different amounts of credits per token processed. You can track your credit usage in real-time from the dashboard.' },
    { q: 'Can I switch between plans?', a: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to the new plan features. Credits carry over within the billing period.' },
    { q: 'What happens when I run out of credits?', a: 'Your campaigns will pause until credits are replenished. You can set up auto-recharge to ensure uninterrupted service, or upgrade to a higher plan for more credits.' },
    { q: 'Is there a free trial?', a: 'Yes! Our Trial Pack gives you 500 credits for just $1, valid for 15 days. It includes access to 5 Agentic Skills, 26 Specialist Agents, and 5 MCP integrations.' },
    { q: 'What MCPs (integrations) are included?', a: 'The Trial Pack includes Gmail, Google Drive, Slack, Google Ads, and Meta Ads. The Growth Pack includes all 27 MCPs, adding HubSpot, LinkedIn, TikTok Ads, Stripe, and many more.' },
    { q: 'How does CLI pricing with BYOK work?', a: 'With Bring Your Own Key (BYOK), you connect your own API keys for LLM providers (OpenAI, Anthropic, etc.) and only pay for OpenAnalyst credits that power the agentic orchestration layer.' },
];

const comparisons = [
    { feature: 'AI Agents', trial: '26', growth: '42', cli: '42' },
    { feature: 'Agentic Skills', trial: '5', growth: '14', cli: '14' },
    { feature: 'MCP Integrations', trial: '5', growth: '27+', cli: '27+' },
    { feature: 'Analytics', trial: 'Basic', growth: 'Advanced', cli: 'Advanced' },
    { feature: 'Support', trial: 'Email', growth: 'Priority', cli: 'Community' },
    { feature: 'BYOK Support', trial: '—', growth: '—', cli: '✓' },
    { feature: 'CI/CD Integration', trial: '—', growth: '—', cli: '✓' },
    { feature: 'Custom Workflows', trial: '—', growth: '✓', cli: '✓' },
];

/* ═══════════ ANIMATED NUMBER ═══════════ */
function AnimatedPrice({ value, prefix = '$' }: { value: string; prefix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (hasAnimated || !ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const numVal = parseInt(value.replace(/[^0-9]/g, ''));
                    if (isNaN(numVal)) { setHasAnimated(true); return; }
                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: numVal,
                        duration: 1.2,
                        ease: 'power2.out',
                        onUpdate: () => {
                            if (ref.current) ref.current.textContent = prefix + Math.round(obj.val);
                        },
                    });
                    setHasAnimated(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, prefix, hasAnimated]);

    return <span ref={ref}>{prefix}0</span>;
}

/* ═══════════ CARD MOUSE GLOW ═══════════ */
function useCardGlow() {
    const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--glow-x', `${x}px`);
        card.style.setProperty('--glow-y', `${y}px`);
    }, []);
    return handleMove;
}

/* ═══════════ MAIN PAGE ═══════════ */
export default function PricingPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const cardGlow = useCardGlow();

    const handleCardHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, { rotateY: x * 6, rotateX: -y * 4, duration: 0.3, ease: 'power2.out' });
    }, []);

    const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    }, []);

    const toggleFaq = (index: number) => {
        if (openFaq === index) {
            const content = document.querySelector(`.faq-content-${index}`) as HTMLElement;
            if (content) gsap.to(content, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.inOut' });
            setOpenFaq(null);
        } else {
            if (openFaq !== null) {
                const prev = document.querySelector(`.faq-content-${openFaq}`) as HTMLElement;
                if (prev) gsap.to(prev, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.inOut' });
            }
            setOpenFaq(index);
            setTimeout(() => {
                const content = document.querySelector(`.faq-content-${index}`) as HTMLElement;
                if (content) gsap.fromTo(content, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' });
            }, 10);
        }
    };

    useGSAP(() => {
        // Hero
        gsap.from('.ph-label', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.2 });
        gsap.from('.ph-word', { y: '110%', opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power4.out', delay: 0.3 });
        gsap.from('.ph-sub', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.7 });

        // Cards
        gsap.from('.price-card', {
            y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.pricing-cards-section', start: 'top 85%', once: true },
        });

        // Credit tiers
        gsap.from('.credit-row', {
            x: -20, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out',
            scrollTrigger: { trigger: '.credits-section', start: 'top 85%', once: true },
        });

        // Comparison
        gsap.from('.compare-row', {
            x: -20, opacity: 0, stagger: 0.04, duration: 0.4, ease: 'power3.out',
            scrollTrigger: { trigger: '.compare-section', start: 'top 85%', once: true },
        });

        // FAQs
        gsap.fromTo('.faq-item',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out',
            scrollTrigger: { trigger: '.faq-section', start: 'top 90%', once: true },
        });

        // Bottom CTA
        gsap.from('.bottom-cta-content', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.bottom-cta', start: 'top 85%', once: true },
        });
    }, { scope: pageRef });

    const plans = [
        {
            name: 'Trial Pack', price: '$1', numPrice: '1', period: '', credits: '500 credits · 15 days',
            desc: 'Perfect for testing the waters',
            features: ['5 Agentic Marketing Skills', '26 Specialist Agents', '5 MCPs (Gmail, Drive, Slack, Ads)', 'Basic Analytics', 'Email Support'],
            cta: 'Start Trial', ctaLink: 'https://app.openanalyst.com', popular: false,
        },
        {
            name: 'Growth Pack', price: '$399', numPrice: '399', period: '/mo', credits: '15,000 credits · 30 days',
            desc: 'For teams ready to scale',
            features: ['14 Agentic Marketing Skills', '42 Specialist Agents', 'All 27 MCP Integrations', 'Google/Meta/TikTok Ads', 'Advanced Analytics', 'Priority Support (1-Day TAT)'],
            cta: 'Get Growth Pack', ctaLink: 'https://app.openanalyst.com', popular: true,
        },
        {
            name: 'CLI Pricing', price: 'BYOK', numPrice: '', period: '', credits: 'Credits-based · $5 to $5K',
            desc: 'For developers and power users',
            features: ['Bring Your Own API Keys', 'Full agent access (42 agents)', '27+ MCP integrations', 'CI/CD pipeline integration', 'Scriptable workflows', 'Community support'],
            cta: 'Install CLI', ctaLink: '/docs', popular: false,
        },
    ];

    // Shared styles
    const sectionLabel: React.CSSProperties = {
        fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#FF6B00',
        textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '16px',
    };

    const sectionHeading: React.CSSProperties = {
        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4.5vw, 3rem)',
        fontWeight: 800, letterSpacing: '-0.03em', color: '#1A1A1A', lineHeight: 1.1,
    };

    return (
        <div ref={pageRef} style={{ minHeight: '100vh', background: '#FFFFFF' }}>
            <Header />

            {/* ═══════════ HERO ═══════════ */}
            <section style={{
                paddingTop: '160px', paddingBottom: '80px',
                textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
                {/* Subtle dot grid */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)',
                    backgroundSize: '28px 28px', pointerEvents: 'none',
                }} />
                {/* Gradient glow */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '600px', height: '400px',
                    background: 'radial-gradient(ellipse, rgba(255,107,0,0.06) 0%, transparent 65%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto', padding: '0 24px' }}>
                    <span className="ph-label" style={sectionLabel}>Pricing</span>

                    <h1 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 7vw, 5rem)',
                        fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em',
                        color: '#1A1A1A', marginBottom: '24px',
                    }}>
                        <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                            <span className="ph-word" style={{ display: 'inline-block' }}>Invest&nbsp;</span>
                        </span>
                        <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                            <span className="ph-word" style={{ display: 'inline-block' }}>in&nbsp;</span>
                        </span>
                        <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                            <span className="ph-word text-gradient" style={{ display: 'inline-block' }}>growth.</span>
                        </span>
                    </h1>

                    <p className="ph-sub" style={{
                        fontSize: 'clamp(16px, 1.4vw, 19px)', color: '#666',
                        lineHeight: 1.7, maxWidth: '460px', margin: '0 auto',
                        fontFamily: 'var(--font-body)',
                    }}>
                        Start with $1 or scale to enterprise. Pay only for what you use with transparent, credit-based pricing.
                    </p>
                </div>
            </section>

            {/* ═══════════ PRICING CARDS ═══════════ */}
            <section className="pricing-cards-section" style={{
                padding: '0 24px 100px', position: 'relative',
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px',
                        alignItems: 'stretch',
                    }}>
                        {plans.map((plan) => (
                            <div key={plan.name} className="price-card" style={{ perspective: '1000px' }}>
                                <div
                                    onMouseMove={(e) => { handleCardHover(e); cardGlow(e); }}
                                    onMouseLeave={handleCardLeave}
                                    style={{
                                        willChange: 'transform', transformStyle: 'preserve-3d',
                                        height: '100%', position: 'relative',
                                    }}
                                >
                                    <div style={{
                                        borderRadius: '20px',
                                        border: plan.popular ? '2px solid #FF6B00' : '1px solid #E5E5E5',
                                        backgroundColor: '#FFFFFF',
                                        height: '100%', display: 'flex', flexDirection: 'column',
                                        position: 'relative', overflow: 'hidden',
                                        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                                        boxShadow: plan.popular
                                            ? '0 0 0 1px rgba(255,107,0,0.1), 0 20px 60px rgba(255,107,0,0.1), 0 4px 20px rgba(0,0,0,0.06)'
                                            : '0 2px 16px rgba(0,0,0,0.04)',
                                        // Glow effect on hover
                                        background: plan.popular
                                            ? 'radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255,107,0,0.04), transparent 40%), #FFFFFF'
                                            : 'radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(0,0,0,0.015), transparent 40%), #FFFFFF',
                                    }}>
                                        {/* Popular badge */}
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
                                            {/* Plan name */}
                                            <h3 style={{
                                                fontFamily: 'var(--font-heading)', fontSize: '18px',
                                                fontWeight: 700, color: '#1A1A1A', marginBottom: '4px',
                                            }}>{plan.name}</h3>
                                            <p style={{
                                                fontFamily: 'var(--font-body)', fontSize: '13px',
                                                color: '#999', marginBottom: '20px',
                                            }}>{plan.desc}</p>

                                            {/* Price */}
                                            <div style={{ marginBottom: '4px', lineHeight: 1 }}>
                                                {plan.numPrice ? (
                                                    <span style={{
                                                        fontFamily: 'var(--font-heading)', fontSize: '48px',
                                                        fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.03em',
                                                    }}>
                                                        <AnimatedPrice value={plan.numPrice} />
                                                    </span>
                                                ) : (
                                                    <span style={{
                                                        fontFamily: 'var(--font-mono)', fontSize: '36px',
                                                        fontWeight: 800, color: '#FF6B00',
                                                    }}>BYOK</span>
                                                )}
                                                {plan.period && (
                                                    <span style={{ fontSize: '15px', color: '#999', fontFamily: 'var(--font-body)' }}>{plan.period}</span>
                                                )}
                                            </div>

                                            <p style={{
                                                fontFamily: 'var(--font-mono)', fontSize: '12px',
                                                color: '#999', marginBottom: '28px',
                                            }}>{plan.credits}</p>

                                            {/* Divider */}
                                            <div style={{
                                                height: '1px', background: '#F0F0F0',
                                                marginBottom: '24px',
                                            }} />

                                            {/* Features */}
                                            <ul style={{
                                                listStyle: 'none', margin: '0 0 32px', padding: 0,
                                                display: 'flex', flexDirection: 'column', gap: '12px', flex: 1,
                                            }}>
                                                {plan.features.map((f, j) => (
                                                    <li key={j} style={{
                                                        display: 'flex', alignItems: 'flex-start', gap: '10px',
                                                        fontSize: '13.5px', color: '#4A4A4A',
                                                        fontFamily: 'var(--font-body)',
                                                    }}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                                                            <circle cx="8" cy="8" r="8" fill={plan.popular ? 'rgba(255,107,0,0.1)' : 'rgba(0,0,0,0.04)'} />
                                                            <path d="M5 8l2 2 4-4" stroke={plan.popular ? '#FF6B00' : '#666'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* CTA */}
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
                </div>
            </section>

            {/* ═══════════ SOCIAL PROOF STRIP ═══════════ */}
            <section style={{
                padding: '40px 24px',
                borderTop: '1px solid #F0F0F0',
                borderBottom: '1px solid #F0F0F0',
                background: '#FAFAFA',
            }}>
                <div style={{
                    maxWidth: '800px', margin: '0 auto',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '40px', flexWrap: 'wrap',
                }}>
                    {[
                        { num: '2,400+', label: 'Teams' },
                        { num: '10M+', label: 'Campaigns' },
                        { num: '99.9%', label: 'Uptime' },
                        { num: '4.9/5', label: 'Rating' },
                    ].map((s, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{
                                fontFamily: 'var(--font-heading)', fontSize: '20px',
                                fontWeight: 800, color: '#1A1A1A',
                            }}>{s.num}</div>
                            <div style={{
                                fontFamily: 'var(--font-body)', fontSize: '11px',
                                color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em',
                            }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════ CLI CREDIT TIERS ═══════════ */}
            <section className="credits-section" style={{
                padding: '100px 24px', background: '#FFFFFF',
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <span style={sectionLabel}>CLI Credit Tiers</span>
                        <h2 style={sectionHeading}>
                            Volume-based <span className="text-gradient">savings</span>
                        </h2>
                    </div>

                    <div style={{
                        borderRadius: '16px', border: '1px solid #E5E5E5',
                        overflow: 'hidden', background: '#FFFFFF',
                        boxShadow: '0 1px 8px rgba(0,0,0,0.03)',
                    }}>
                        {/* Header */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 0.7fr',
                            padding: '14px 24px', background: '#FAFAFA',
                            borderBottom: '1px solid #E5E5E5',
                        }}>
                            {['Tier', 'Credits', 'Price', 'Per Credit', 'Savings'].map((h) => (
                                <span key={h} style={{
                                    fontFamily: 'var(--font-mono)', fontSize: '10px',
                                    color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em',
                                    fontWeight: 600,
                                }}>{h}</span>
                            ))}
                        </div>
                        {/* Rows */}
                        {creditsTiers.map((row, i) => (
                            <div key={i} className="credit-row" style={{
                                display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 0.7fr',
                                padding: '14px 24px', alignItems: 'center',
                                borderBottom: i < creditsTiers.length - 1 ? '1px solid #F0F0F0' : 'none',
                                transition: 'background 0.2s ease',
                                cursor: 'default',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,107,0,0.02)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                            >
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1A1A1A', fontWeight: 600 }}>{row.tier}</span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#666' }}>{row.credits}</span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#666' }}>{row.price}</span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#FF6B00', fontWeight: 600 }}>{row.perCredit}</span>
                                <span>{row.save && (
                                    <span style={{
                                        fontFamily: 'var(--font-mono)', fontSize: '11px',
                                        color: '#10B981', fontWeight: 600,
                                        background: 'rgba(16,185,129,0.08)',
                                        padding: '3px 8px', borderRadius: '6px',
                                    }}>-{row.save}</span>
                                )}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ COMPARISON TABLE ═══════════ */}
            <section className="compare-section" style={{
                padding: '100px 24px', background: '#FAFAFA',
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <span style={sectionLabel}>Compare Plans</span>
                        <h2 style={sectionHeading}>
                            Find your <span className="text-gradient">perfect fit</span>
                        </h2>
                    </div>

                    <div style={{
                        borderRadius: '16px', border: '1px solid #E5E5E5',
                        overflow: 'hidden', background: '#FFFFFF',
                        boxShadow: '0 1px 8px rgba(0,0,0,0.03)',
                    }}>
                        {/* Header */}
                        <div className="compare-row" style={{
                            display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
                            padding: '16px 24px', background: '#FAFAFA',
                            borderBottom: '1px solid #E5E5E5',
                            position: 'sticky', top: '64px', zIndex: 10,
                        }}>
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: '10px',
                                color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em',
                            }}>Feature</span>
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: '10px',
                                color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em',
                                textAlign: 'center',
                            }}>Trial</span>
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: '10px',
                                color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '0.08em',
                                textAlign: 'center', fontWeight: 700,
                            }}>Growth</span>
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: '10px',
                                color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em',
                                textAlign: 'center',
                            }}>CLI</span>
                        </div>

                        {/* Rows */}
                        {comparisons.map((row, i) => (
                            <div key={i} className="compare-row" style={{
                                display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
                                padding: '14px 24px',
                                borderBottom: i < comparisons.length - 1 ? '1px solid #F5F5F5' : 'none',
                                transition: 'background 0.15s ease',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,107,0,0.015)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                            >
                                <span style={{ fontSize: '14px', color: '#1A1A1A', fontWeight: 500, fontFamily: 'var(--font-body)' }}>{row.feature}</span>
                                <span style={{ fontSize: '14px', color: '#666', textAlign: 'center', fontFamily: 'var(--font-body)' }}>{row.trial}</span>
                                <span style={{
                                    fontSize: '14px', color: '#1A1A1A', textAlign: 'center',
                                    fontWeight: 600, fontFamily: 'var(--font-body)',
                                }}>{row.growth}</span>
                                <span style={{ fontSize: '14px', color: '#666', textAlign: 'center', fontFamily: 'var(--font-body)' }}>{row.cli}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ FAQ ═══════════ */}
            <section className="faq-section" style={{
                padding: '100px 24px', background: '#FFFFFF',
            }}>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <span style={sectionLabel}>FAQ</span>
                        <h2 style={sectionHeading}>
                            Common <span className="text-gradient">questions</span>
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} className="faq-item" style={{
                                borderRadius: '14px',
                                border: '1px solid',
                                borderColor: openFaq === i ? 'rgba(255,107,0,0.25)' : '#E5E5E5',
                                backgroundColor: openFaq === i ? 'rgba(255,107,0,0.02)' : '#FFFFFF',
                                transition: 'border-color 0.3s ease, background-color 0.3s ease',
                                overflow: 'hidden',
                            }}>
                                <button onClick={() => toggleFaq(i)} style={{
                                    width: '100%', padding: '20px 24px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600,
                                    color: '#1A1A1A', textAlign: 'left',
                                }}>
                                    <span style={{ paddingRight: '16px' }}>{faq.q}</span>
                                    <span style={{
                                        width: '28px', height: '28px', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        backgroundColor: openFaq === i ? '#FF6B00' : 'rgba(0,0,0,0.04)',
                                        color: openFaq === i ? '#FFFFFF' : '#666',
                                        fontSize: '16px', fontWeight: 300, flexShrink: 0,
                                        transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                                        transition: 'all 0.3s ease',
                                    }}>+</span>
                                </button>
                                <div className={`faq-content-${i}`} style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
                                    <p style={{
                                        padding: '0 24px 20px', fontSize: '14px',
                                        color: '#666', lineHeight: 1.8, fontFamily: 'var(--font-body)',
                                    }}>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Still have questions? */}
                    <div style={{
                        textAlign: 'center', marginTop: '40px',
                        padding: '24px', borderRadius: '14px',
                        background: '#FAFAFA', border: '1px solid #F0F0F0',
                    }}>
                        <p style={{
                            fontFamily: 'var(--font-body)', fontSize: '15px',
                            color: '#666', marginBottom: '12px',
                        }}>Still have questions?</p>
                        <a href="/contact" className="btn-outline" style={{
                            fontSize: '13px', padding: '10px 24px', borderRadius: '10px',
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                        }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            Talk to us
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════════ BOTTOM CTA ═══════════ */}
            <section className="bottom-cta" style={{
                padding: '100px 24px', position: 'relative', overflow: 'hidden',
                background: '#FAFAFA', borderTop: '1px solid #F0F0F0',
            }}>
                {/* Glow */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '600px', height: '300px',
                    background: 'radial-gradient(ellipse, rgba(255,107,0,0.05) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }} />

                <div className="bottom-cta-content" style={{
                    position: 'relative', textAlign: 'center', maxWidth: '560px', margin: '0 auto',
                }}>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                        fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.03em',
                        marginBottom: '16px',
                    }}>Ready to grow faster?</h2>
                    <p style={{
                        fontFamily: 'var(--font-body)', fontSize: '16px',
                        color: '#666', lineHeight: 1.7, marginBottom: '32px',
                    }}>
                        Start with $1 and see results in days. No credit card required for trial.
                    </p>
                    <div style={{
                        display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap',
                    }}>
                        <a href="https://app.openanalyst.com" className="btn-primary" style={{
                            fontSize: '15px', padding: '14px 32px', borderRadius: '50px',
                        }}>
                            Start Free Trial
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a href="/contact" className="btn-outline" style={{
                            fontSize: '15px', padding: '14px 32px', borderRadius: '50px',
                        }}>Talk to Sales</a>
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
                @media (max-width: 900px) {
                    .pricing-cards-section > div > div {
                        grid-template-columns: 1fr !important;
                        max-width: 480px !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                    .compare-row {
                        grid-template-columns: 1.5fr 0.8fr 0.8fr 0.8fr !important;
                        font-size: 12px !important;
                        padding: 12px 12px !important;
                    }
                    .compare-row span {
                        font-size: 12px !important;
                    }
                    /* Fix sticky header overlap on mobile */
                    .compare-row[style*="sticky"] {
                        position: relative !important;
                        top: 0 !important;
                    }
                    .credit-row, .credits-section div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr 1fr 1fr 1fr !important;
                    }
                    .credit-row span:last-child, .credits-section div[style*="grid-template-columns"] span:last-child {
                        display: none !important;
                    }
                }
                @media (max-width: 480px) {
                    .compare-row {
                        grid-template-columns: 1.2fr 0.7fr 0.7fr 0.7fr !important;
                        padding: 10px 8px !important;
                        gap: 4px !important;
                    }
                    .compare-row span {
                        font-size: 11px !important;
                    }
                    .credit-row {
                        padding: 10px 12px !important;
                        gap: 8px !important;
                    }
                    .credit-row span {
                        font-size: 11px !important;
                    }
                }
            `}</style>
        </div>
    );
}
