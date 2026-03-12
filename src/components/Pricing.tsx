'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Magnetic from './Magnetic';

const Pricing: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLDivElement>(null);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
    const priceRefs = useRef<(HTMLSpanElement | null)[]>([]);

    gsap.registerPlugin(ScrollTrigger, useGSAP);

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

    useGSAP(() => {
        gsap.from('.pricing-heading', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        });

        const cards = gsap.utils.toArray<HTMLElement>('.pricing-plan');
        gsap.from(cards, {
            y: 50, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: '.pricing-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
        });
    }, { scope: containerRef });

    const plans = [
        {
            name: 'Free', filename: 'free.config', monthlyPrice: 0, annualPrice: 0,
            credits: '300', features: ['Access to free models', '300 credits per month', 'Community support', '5 integrations', 'Basic analytics'],
            cta: '$ subscribe --plan free', featured: false, href: 'https://app.openanalyst.com',
        },
        {
            name: 'Basic', filename: 'basic.config', monthlyPrice: 19, annualPrice: 12,
            credits: '2,000', features: ['All Free features', '2,000 credits per month', 'Email support', '12 integrations', 'Standard analytics', 'API access'],
            cta: '$ subscribe --plan basic', featured: false, href: 'https://app.openanalyst.com',
        },
        {
            name: 'Pro', filename: 'pro.config', monthlyPrice: 49, annualPrice: 30,
            credits: '7,200', bonus: '20%', features: ['All Basic features', '6,000 + 20% bonus credits', 'Priority support', 'All 27 integrations', 'Advanced analytics', 'Custom workflows', 'Team collaboration'],
            cta: '$ subscribe --plan pro', featured: true, href: 'https://app.openanalyst.com',
        },
        {
            name: 'Enterprise', filename: 'enterprise.config', monthlyPrice: null, annualPrice: null,
            credits: 'Unlimited', features: ['All Pro features', 'Unlimited credits', '24/7 dedicated support', 'Custom integrations', 'SLA & compliance ready', 'On-premise deployment', 'Dedicated account manager'],
            cta: '$ contact --sales', featured: false, href: '/contact',
        },
    ];

    const getPrice = (plan: typeof plans[0]) => {
        if (plan.monthlyPrice === null) return 'Custom';
        return billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
    };

    // Animate billing toggle pill slide
    const handleBillingSwitch = (cycle: 'monthly' | 'annual') => {
        if (cycle === billingCycle) return;

        // Animate price counters
        plans.forEach((plan, i) => {
            if (plan.monthlyPrice === null) return;
            const el = priceRefs.current[i];
            if (!el) return;
            const oldVal = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            const newVal = cycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            gsap.fromTo(el, { innerText: oldVal }, {
                innerText: newVal,
                duration: 0.6,
                ease: 'power2.out',
                snap: { innerText: 1 },
            });
        });

        // Animate toggle pill
        if (toggleRef.current) {
            const pill = toggleRef.current.querySelector('.toggle-pill') as HTMLElement;
            if (pill) {
                gsap.to(pill, {
                    x: cycle === 'annual' ? pill.offsetWidth + 4 : 0,
                    duration: 0.35,
                    ease: 'back.out(1.2)',
                });
            }
        }

        setBillingCycle(cycle);
    };

    // Set initial toggle position
    useEffect(() => {
        if (toggleRef.current) {
            const pill = toggleRef.current.querySelector('.toggle-pill') as HTMLElement;
            if (pill && billingCycle === 'annual') {
                gsap.set(pill, { x: pill.offsetWidth + 4 });
            }
        }
    }, []);

    return (
        <section ref={containerRef} style={{
            padding: '100px 0 120px',
            background: 'var(--background)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div className="pricing-heading" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--syntax-comment)', marginBottom: '16px' }}>
                        {'/** @section PRICING */'}
                    </p>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '12px',
                    }}>
                        Simple, Transparent Pricing
                    </h2>
                    <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '500px', margin: '0 auto', fontFamily: 'var(--font-body)' }}>
                        Choose the plan that fits your needs. Flexible credit-based usage.
                    </p>
                </div>

                {/* Billing toggle with spring animation */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                    <div ref={toggleRef} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0px',
                        backgroundColor: 'var(--surface)', borderRadius: '9999px', padding: '4px',
                        border: '1px solid var(--border)', position: 'relative',
                    }}>
                        {/* Animated pill background */}
                        <div className="toggle-pill" style={{
                            position: 'absolute',
                            top: '4px',
                            left: '4px',
                            width: 'calc(50% - 4px)',
                            height: 'calc(100% - 8px)',
                            borderRadius: '9999px',
                            backgroundColor: 'var(--terminal-bg)',
                            pointerEvents: 'none',
                            zIndex: 0,
                        }} />

                        <button
                            onClick={() => handleBillingSwitch('monthly')}
                            style={{
                                fontFamily: 'var(--font-mono)', fontSize: '13px', padding: '10px 24px',
                                borderRadius: '9999px', border: 'none', cursor: 'pointer', fontWeight: 600,
                                transition: 'color 0.3s ease',
                                backgroundColor: 'transparent',
                                color: billingCycle === 'monthly' ? '#d4d4d8' : 'var(--muted)',
                                position: 'relative', zIndex: 1,
                            }}
                        >
                            --billing monthly
                        </button>
                        <button
                            onClick={() => handleBillingSwitch('annual')}
                            style={{
                                fontFamily: 'var(--font-mono)', fontSize: '13px', padding: '10px 24px',
                                borderRadius: '9999px', border: 'none', cursor: 'pointer', fontWeight: 600,
                                transition: 'color 0.3s ease', display: 'flex', alignItems: 'center', gap: '8px',
                                backgroundColor: 'transparent',
                                color: billingCycle === 'annual' ? '#d4d4d8' : 'var(--muted)',
                                position: 'relative', zIndex: 1,
                            }}
                        >
                            --billing yearly
                            <span style={{ backgroundColor: '#2ecc71', color: '#ffffff', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>-40%</span>
                        </button>
                    </div>
                </div>

                <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--muted)', marginBottom: '40px', fontFamily: 'var(--font-mono)' }}>
                    {billingCycle === 'annual' ? 'Billed annually. Cancel anytime.' : 'Billed monthly. Switch to annual and save 40%.'}
                </p>

                {/* Pricing Cards */}
                <div className="pricing-grid" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '16px', marginBottom: '60px',
                }}>
                    {plans.map((plan, planIndex) => (
                        <div key={plan.name} className="pricing-plan" style={{ perspective: '800px' }}>
                            <div
                                onMouseMove={handleCardHover}
                                onMouseLeave={handleCardLeave}
                                style={{ willChange: 'transform', transformStyle: 'preserve-3d', height: '100%' }}
                            >
                                <a href={plan.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                                    <div className="terminal-card" style={{
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                        {plan.featured && (
                                            <div style={{
                                                position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)',
                                                backgroundColor: 'var(--primary)', color: '#ffffff', fontSize: '10px',
                                                fontWeight: 700, padding: '4px 16px', borderRadius: '0 0 8px 8px',
                                                textTransform: 'uppercase', letterSpacing: '0.1em', zIndex: 2,
                                            }}>
                                                Most Popular
                                            </div>
                                        )}

                                        <div className="terminal-card-header">
                                            <div className="terminal-dots"><span /><span /><span /></div>
                                            <span style={{ color: '#6b7280', fontSize: '11px', marginLeft: '8px' }}>{plan.filename}</span>
                                        </div>
                                        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700, marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
                                                {plan.name}
                                            </h3>
                                            <div style={{ marginBottom: '16px', marginTop: '12px' }}>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--syntax-comment)' }}>const price = </span>
                                                <span style={{ fontSize: '32px', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                                                    {plan.monthlyPrice === null ? 'Custom' : (
                                                        <>$<span ref={(el) => { priceRefs.current[planIndex] = el; }}>{getPrice(plan)}</span></>
                                                    )}
                                                </span>
                                                {plan.monthlyPrice !== null && (
                                                    <span style={{ fontSize: '13px', color: '#8a7a72' }}>/mo</span>
                                                )}
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--syntax-comment)' }}>;</span>
                                            </div>

                                            {billingCycle === 'annual' && plan.monthlyPrice !== null && plan.monthlyPrice > 0 && (
                                                <p style={{ fontSize: '11px', color: '#6b6260', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
                                                    <span style={{ textDecoration: 'line-through' }}>${plan.monthlyPrice}/mo</span>{' '}
                                                    <span style={{ color: '#2ecc71' }}>Save ${(plan.monthlyPrice - (plan.annualPrice ?? 0)) * 12}/yr</span>
                                                </p>
                                            )}

                                            <div style={{ fontSize: '12px', color: '#a89890', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)' }}>
                                                <span style={{ color: 'var(--primary)' }}>●</span>
                                                <span style={{ fontWeight: 600 }}>{plan.credits}</span> credits/mo
                                                {plan.bonus && <span style={{ backgroundColor: 'rgba(46,204,113,0.15)', color: '#2ecc71', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>+{plan.bonus}</span>}
                                            </div>

                                            <ul style={{ listStyle: 'none', margin: '0 0 20px', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                                                {plan.features.slice(0, 5).map((feature, i) => (
                                                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#a89890' }}>
                                                        <span style={{ color: 'var(--primary)', fontSize: '14px', lineHeight: 1.2 }}>✓</span>
                                                        {feature}
                                                    </li>
                                                ))}
                                                {plan.features.length > 5 && (
                                                    <li style={{ fontSize: '11px', color: '#6b6260' }}>+{plan.features.length - 5} more</li>
                                                )}
                                            </ul>

                                            <div style={{
                                                width: '100%', textAlign: 'center', padding: '12px',
                                                borderRadius: '8px', fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 600,
                                                backgroundColor: plan.featured ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                                color: '#d4d4d8',
                                                border: '1px solid rgba(255,255,255,0.08)',
                                                transition: 'all 0.3s ease',
                                            }}>
                                                {plan.cta}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div style={{ textAlign: 'center' }}>
                    <div className="terminal-card" style={{ padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', background: 'rgba(204,122,96,0.08)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', background: 'rgba(204,122,96,0.06)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Get Started Today</p>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
                                Ready to get started?
                            </h3>
                            <p style={{ color: '#8a7a72', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px', fontFamily: 'var(--font-body)' }}>
                                Join thousands of marketers already using OpenAnalyst.
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
                                <Magnetic>
                                    <a href="https://app.openanalyst.com" style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                                        padding: '14px 30px', fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 600,
                                        color: '#ffffff', backgroundColor: 'var(--primary)', borderRadius: '9999px',
                                        textDecoration: 'none', transition: 'all 0.3s ease',
                                    }}>
                                        <span style={{ color: 'var(--cmd-prefix)', fontSize: '12px' }}>$</span> get_started
                                    </a>
                                </Magnetic>
                                <Link href="/contact" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '14px 30px', fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 500,
                                    color: '#d4d4d8', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '9999px',
                                    textDecoration: 'none', transition: 'all 0.3s ease',
                                }}>
                                    contact_sales
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
