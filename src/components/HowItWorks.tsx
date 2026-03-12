'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Magnetic from './Magnetic';

const HowItWorks: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    gsap.registerPlugin(ScrollTrigger, useGSAP);

    useGSAP(() => {
        gsap.from('.workflow-heading', {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        });

        // Animate the connecting line
        gsap.fromTo('.workflow-line-fill', {
            scaleY: 0,
        }, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.workflow-steps',
                start: 'top 75%',
                end: 'bottom 60%',
                scrub: 1,
            }
        });

        // Animate each step
        const steps = gsap.utils.toArray<HTMLElement>('.workflow-step');
        steps.forEach((step) => {
            gsap.from(step, {
                y: 60,
                opacity: 0,
                filter: 'blur(4px)',
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: step,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            });
        });

        // Animate orbiting icons in step 1
        const orbitIcons = gsap.utils.toArray<HTMLElement>('.orbit-icon');
        orbitIcons.forEach((icon, i) => {
            gsap.to(icon, {
                y: `${-8 - i * 3}`,
                x: `${(i % 2 === 0 ? 6 : -6)}`,
                duration: 2.5 + i * 0.4,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            });
        });

        // Counter animation for step 3 metrics
        const counters = gsap.utils.toArray<HTMLElement>('.metric-counter');
        counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target') || '0');
            gsap.fromTo(counter, { innerText: '0' }, {
                innerText: target,
                duration: 2,
                ease: 'power2.out',
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                }
            });
        });

    }, { scope: containerRef });

    // Pre-computed positions (rounded to avoid floating-point hydration mismatches)
    const integrationIcons = [
        { name: 'Gmail', logo: 'https://cdn.simpleicons.org/gmail/EA4335', x: 80, y: 0 },
        { name: 'Slack', logo: 'https://cdn.simpleicons.org/slack', x: 40, y: 69 },
        { name: 'HubSpot', logo: 'https://cdn.simpleicons.org/hubspot/FF7A59', x: -40, y: 69 },
        { name: 'LinkedIn', logo: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>')}`, x: -80, y: 0 },
        { name: 'Google Ads', logo: 'https://cdn.simpleicons.org/googleads/4285F4', x: -40, y: -69 },
        { name: 'Stripe', logo: 'https://cdn.simpleicons.org/stripe/635BFF', x: 40, y: -69 },
    ];

    return (
        <section ref={containerRef} style={{
            padding: '100px 0 120px',
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--background)',
        }}>
            {/* Decorative blurs */}
            <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', background: 'rgba(204,122,96,0.05)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: 'rgba(204,122,96,0.04)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div className="workflow-heading" style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        color: 'var(--syntax-comment)',
                        marginBottom: '16px',
                    }}>
                        {'/** @section HOW_IT_WORKS */'}
                    </p>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        fontWeight: 700,
                        color: 'var(--foreground)',
                        marginBottom: '12px',
                    }}>
                        Three Steps to <span className="text-gradient">AI Marketing</span>
                    </h2>
                    <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '500px', margin: '0 auto', fontFamily: 'var(--font-body)' }}>
                        Go from zero to deployed AI agent in under 60 seconds.
                    </p>
                </div>

                {/* 3-Step Workflow */}
                <div className="workflow-steps" style={{ position: 'relative', maxWidth: '960px', margin: '0 auto' }}>
                    {/* Vertical Connecting Line */}
                    <div style={{
                        position: 'absolute',
                        left: '39px',
                        top: '60px',
                        bottom: '60px',
                        width: '2px',
                        background: 'var(--border)',
                        zIndex: 0,
                    }}>
                        <div className="workflow-line-fill" style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(to bottom, var(--primary), var(--primary-light))',
                            transformOrigin: 'top center',
                        }} />
                    </div>

                    {/* Step 1: Connect */}
                    <div className="workflow-step" style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr 1fr',
                        gap: '32px',
                        alignItems: 'center',
                        marginBottom: '80px',
                        position: 'relative',
                        zIndex: 1,
                    }}>
                        {/* Step Number */}
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '36px',
                            fontWeight: 800,
                            color: '#ffffff',
                            flexShrink: 0,
                            boxShadow: '0 8px 32px rgba(204,122,96,0.3)',
                        }}>
                            1
                        </div>

                        {/* Text Content */}
                        <div>
                            <h3 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                                fontWeight: 700,
                                color: 'var(--foreground)',
                                marginBottom: '8px',
                            }}>
                                Connect
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                color: 'var(--muted)',
                                lineHeight: 1.7,
                                fontFamily: 'var(--font-body)',
                            }}>
                                Link your marketing stack in 60 seconds. Gmail, Slack, HubSpot, Google Ads, and 23 more integrations ready to go.
                            </p>
                        </div>

                        {/* Visual: Floating integration icons converging */}
                        <div style={{
                            position: 'relative',
                            height: '200px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            {/* Central node */}
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 32px rgba(204,122,96,0.3)',
                                zIndex: 2,
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                <img
                                    src="/images/logo.png"
                                    alt="OpenAnalyst"
                                    width={40}
                                    height={40}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            {/* Orbiting icons */}
                            {integrationIcons.map((icon) => (
                                <div
                                    key={icon.name}
                                    className="orbit-icon"
                                    style={{
                                        position: 'absolute',
                                        left: `calc(50% + ${icon.x}px - 20px)`,
                                        top: `calc(50% + ${icon.y}px - 20px)`,
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid var(--border)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                        willChange: 'transform',
                                    }}
                                >
                                    <img
                                        src={icon.logo}
                                        alt={icon.name}
                                        width={22}
                                        height={22}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: Configure */}
                    <div className="workflow-step" style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr 1fr',
                        gap: '32px',
                        alignItems: 'center',
                        marginBottom: '80px',
                        position: 'relative',
                        zIndex: 1,
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '36px',
                            fontWeight: 800,
                            color: '#ffffff',
                            flexShrink: 0,
                            boxShadow: '0 8px 32px rgba(204,122,96,0.3)',
                        }}>
                            2
                        </div>

                        <div>
                            <h3 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                                fontWeight: 700,
                                color: 'var(--foreground)',
                                marginBottom: '8px',
                            }}>
                                Configure
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                color: 'var(--muted)',
                                lineHeight: 1.7,
                                fontFamily: 'var(--font-body)',
                            }}>
                                Tell your AI agent what to optimize. Set goals, channels, budget, and let the agent build your strategy.
                            </p>
                        </div>

                        {/* Visual: Terminal card with config command */}
                        <div>
                            <div className="terminal-card" style={{ boxShadow: '0 12px 40px rgba(30, 30, 46, 0.2)' }}>
                                <div className="terminal-card-header">
                                    <div className="terminal-dots">
                                        <span /><span /><span />
                                    </div>
                                    <span style={{ color: '#6b7280', fontSize: '11px', marginLeft: '8px' }}>terminal</span>
                                </div>
                                <div style={{ padding: '16px 20px', fontSize: '13px', lineHeight: 2, fontFamily: 'var(--font-mono)' }}>
                                    <div>
                                        <span style={{ color: '#39ff14' }}>$</span>{' '}
                                        <span style={{ color: '#3b82f6' }}>agent</span>{' '}
                                        <span style={{ color: '#d4d4d8' }}>config</span>
                                    </div>
                                    <div style={{ paddingLeft: '16px' }}>
                                        <span style={{ color: '#e5c07b' }}>--goals</span>{' '}
                                        <span style={{ color: '#98c379' }}>&quot;engagement, roi&quot;</span>
                                    </div>
                                    <div style={{ paddingLeft: '16px' }}>
                                        <span style={{ color: '#e5c07b' }}>--channels</span>{' '}
                                        <span style={{ color: '#98c379' }}>&quot;email, social&quot;</span>
                                    </div>
                                    <div style={{ paddingLeft: '16px' }}>
                                        <span style={{ color: '#e5c07b' }}>--budget</span>{' '}
                                        <span style={{ color: '#d19a66' }}>5000</span>
                                    </div>
                                    <div style={{ marginTop: '4px' }}>
                                        <span style={{ color: '#98c379' }}>{'✓ Agent configured. Ready to deploy.'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Deploy */}
                    <div className="workflow-step" style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr 1fr',
                        gap: '32px',
                        alignItems: 'center',
                        position: 'relative',
                        zIndex: 1,
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '36px',
                            fontWeight: 800,
                            color: '#ffffff',
                            flexShrink: 0,
                            boxShadow: '0 8px 32px rgba(204,122,96,0.3)',
                        }}>
                            3
                        </div>

                        <div>
                            <h3 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                                fontWeight: 700,
                                color: 'var(--foreground)',
                                marginBottom: '8px',
                            }}>
                                Deploy
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                color: 'var(--muted)',
                                lineHeight: 1.7,
                                fontFamily: 'var(--font-body)',
                            }}>
                                Watch your AI agent work. Real-time metrics, live campaign tracking, and continuous optimization.
                            </p>
                        </div>

                        {/* Visual: Light-themed dashboard mockup */}
                        <div style={{
                            borderRadius: '16px',
                            border: '1px solid var(--border)',
                            background: '#ffffff',
                            overflow: 'hidden',
                            boxShadow: '0 12px 40px rgba(26, 18, 16, 0.08)',
                        }}>
                            {/* Mini dashboard header */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 16px',
                                borderBottom: '1px solid var(--border)',
                                background: 'var(--surface)',
                            }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2ecc71' }} />
                                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>Agent Live Dashboard</span>
                            </div>
                            {/* Metrics grid */}
                            <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                                {[
                                    { label: 'Campaigns', value: '12', suffix: '', color: 'var(--primary)' },
                                    { label: 'ROI', value: '340', suffix: '%', color: '#2ecc71' },
                                    { label: 'Reach', value: '1.2', suffix: 'M', color: '#3b82f6' },
                                ].map((metric) => (
                                    <div key={metric.label} style={{
                                        padding: '12px',
                                        borderRadius: '10px',
                                        backgroundColor: 'var(--surface)',
                                        textAlign: 'center',
                                    }}>
                                        <div style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontSize: '22px',
                                            fontWeight: 700,
                                            color: metric.color,
                                            lineHeight: 1.2,
                                        }}>
                                            <span className="metric-counter" data-target={metric.value}>{metric.value}</span>{metric.suffix}
                                        </div>
                                        <div style={{
                                            fontSize: '10px',
                                            fontFamily: 'var(--font-mono)',
                                            color: 'var(--muted)',
                                            marginTop: '4px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                        }}>
                                            {metric.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Progress bars */}
                            <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {[
                                    { label: 'Email', pct: 78, color: 'var(--primary)' },
                                    { label: 'Social', pct: 92, color: '#2ecc71' },
                                    { label: 'Search', pct: 65, color: '#3b82f6' },
                                ].map((bar) => (
                                    <div key={bar.label}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{bar.label}</span>
                                            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--foreground)', fontWeight: 600 }}>{bar.pct}%</span>
                                        </div>
                                        <div style={{ height: '4px', borderRadius: '9999px', backgroundColor: 'var(--border)', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${bar.pct}%`, borderRadius: '9999px', backgroundColor: bar.color, transition: 'width 1.5s ease' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center', marginTop: '64px' }}>
                    <Magnetic>
                        <a
                            href="https://app.openanalyst.com"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '14px 30px',
                                fontSize: '14px',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 600,
                                color: '#ffffff',
                                backgroundColor: 'var(--primary)',
                                borderRadius: '9999px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 20px rgba(204, 122, 96, 0.3)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 6px 28px rgba(204, 122, 96, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(204, 122, 96, 0.3)';
                            }}
                        >
                            <span style={{ color: 'var(--cmd-prefix)', fontSize: '12px' }}>$</span>
                            get_started
                        </a>
                    </Magnetic>
                </div>
            </div>

            {/* Responsive styles */}
            <style>{`
                @media (max-width: 768px) {
                    .workflow-step {
                        grid-template-columns: 60px 1fr !important;
                        gap: 16px !important;
                        margin-bottom: 48px !important;
                    }
                    .workflow-step > div:nth-child(1) {
                        width: 60px !important;
                        height: 60px !important;
                        font-size: 28px !important;
                    }
                    .workflow-step > div:nth-child(3) {
                        grid-column: 1 / -1;
                        margin-left: 76px;
                    }
                }
                @media (max-width: 480px) {
                    .workflow-step > div:nth-child(3) {
                        margin-left: 0;
                    }
                }
            `}</style>
        </section>
    );
};

export default HowItWorks;
