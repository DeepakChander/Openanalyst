'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ───── Step Data ───── */

const steps = [
    {
        num: '01',
        title: 'Connect Your Stack',
        desc: 'Link Gmail, Slack, HubSpot, and 24 more tools in 60 seconds. Our agents plug into your existing workflow without any code changes.',
        color: '#06B6D4',
        features: ['One-click OAuth for all major platforms', 'Zero-code setup — no developers needed', 'Bi-directional data sync in real time'],
        metric: { label: 'Avg setup time', value: '47s', sub: 'across all integrations' },
    },
    {
        num: '02',
        title: 'Set Your Goals',
        desc: 'Tell agents what to optimize — revenue, leads, or custom KPIs. Using your data, OpenAnalyst generates automated strategies that cover 95%+ of your marketing needs.',
        color: '#8B5CF6',
        features: ['Revenue, leads, or custom KPI targets', 'AI-generated strategy recommendations', 'Auto-adjusts based on historical data'],
        metric: { label: 'Strategy coverage', value: '95%', sub: 'of marketing needs automated' },
    },
    {
        num: '03',
        title: 'Agents Activate',
        desc: '42 AI agents start working immediately — planning, creating, optimizing. The platform continuously evaluates performance and surfaces opportunities before your competitors do.',
        color: '#10B981',
        features: ['42 specialized agents work in parallel', 'Continuous performance evaluation', 'Opportunity detection before competitors'],
        metric: { label: 'Active agents', value: '42', sub: 'working simultaneously' },
    },
    {
        num: '04',
        title: 'Watch Results Grow',
        desc: 'Real-time ROI tracking and continuous optimization. When something shifts, OpenAnalyst alerts the right owners and takes corrective action.',
        color: '#FF6B00',
        features: ['Real-time ROI dashboards', 'Auto-corrective actions on shifts', 'Every cycle strengthens future results'],
        metric: { label: 'Avg ROI lift', value: '3.2×', sub: 'within first 90 days' },
    },
];

const BRAND = '#FF6B00';

/* ───── Main Component ───── */

const HowItWorks: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    useGSAP(() => {
        if (!sectionRef.current) return;

        /* Animate step cards on scroll */
        gsap.utils.toArray<HTMLElement>('.hiw-card').forEach((card, i) => {
            gsap.fromTo(card,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            /* Track active step */
            ScrollTrigger.create({
                trigger: card,
                start: 'top 55%',
                end: 'bottom 45%',
                onEnter: () => setActiveStep(i),
                onEnterBack: () => setActiveStep(i),
            });
        });

        /* Animate the header */
        gsap.fromTo('.hiw-header',
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: '.hiw-header', start: 'top 85%' },
            }
        );
    }, { scope: sectionRef });

    return (
        <section id="how-it-works" ref={sectionRef} style={{
            background: 'var(--bg-white)',
            position: 'relative',
            padding: 'clamp(80px, 12vw, 160px) 0',
            overflow: 'hidden',
        }}>
            {/* Subtle background texture */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(circle, rgba(255,107,0,0.03) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
            }} />

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

                {/* ───── Header ───── */}
                <div className="hiw-header" style={{ textAlign: 'center', marginBottom: 'clamp(60px, 8vw, 100px)' }}>
                    <p style={{
                        fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        color: BRAND, marginBottom: 20,
                    }}>How It Works</p>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.1,
                        maxWidth: 600,
                        margin: '0 auto',
                    }}>
                        From zero to{' '}
                        <span style={{
                            fontStyle: 'italic',
                            background: `linear-gradient(135deg, #FF8533, ${BRAND})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>results</span>{' '}
                        in minutes
                    </h2>
                    <p style={{
                        fontSize: 16, color: 'var(--text-secondary)',
                        lineHeight: 1.7, maxWidth: 520, margin: '20px auto 0',
                    }}>
                        Four steps. No code. Full autopilot marketing that learns and improves with every cycle.
                    </p>
                </div>

                {/* ───── Timeline + Cards ───── */}
                <div style={{ position: 'relative' }}>

                    {/* Vertical timeline line */}
                    <div className="hiw-timeline-track" style={{
                        position: 'absolute',
                        left: 28,
                        top: 0,
                        bottom: 0,
                        width: 2,
                        background: 'var(--border)',
                        borderRadius: 1,
                    }}>
                        {/* Active progress fill */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, width: '100%',
                            height: `${((activeStep + 1) / steps.length) * 100}%`,
                            background: `linear-gradient(to bottom, ${BRAND}, ${steps[activeStep].color})`,
                            borderRadius: 1,
                            transition: 'height 0.8s cubic-bezier(0.16,1,0.3,1), background 0.6s ease',
                            boxShadow: `0 0 12px ${steps[activeStep].color}30`,
                        }} />
                    </div>

                    {/* Step cards */}
                    {steps.map((step, i) => {
                        const isActive = activeStep >= i;
                        const isCurrent = activeStep === i;

                        return (
                            <div
                                key={i}
                                className="hiw-card"
                                style={{
                                    position: 'relative',
                                    paddingLeft: 80,
                                    marginBottom: i < steps.length - 1 ? 'clamp(48px, 6vw, 72px)' : 0,
                                }}
                            >
                                {/* Timeline node */}
                                <div style={{
                                    position: 'absolute',
                                    left: 16,
                                    top: 28,
                                    width: 26,
                                    height: 26,
                                    borderRadius: '50%',
                                    background: isActive
                                        ? `linear-gradient(135deg, ${step.color}, ${step.color}CC)`
                                        : 'var(--bg-white)',
                                    border: `2.5px solid ${isActive ? step.color : 'var(--border)'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
                                    boxShadow: isCurrent
                                        ? `0 0 0 6px ${step.color}15, 0 0 20px ${step.color}20`
                                        : 'none',
                                    zIndex: 2,
                                }}>
                                    {isActive && (
                                        <svg width="10" height="10" viewBox="0 0 16 16" fill="white">
                                            <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                                        </svg>
                                    )}
                                </div>

                                {/* Card */}
                                <div style={{
                                    background: isCurrent
                                        ? 'var(--bg-white)'
                                        : 'var(--bg-white)',
                                    borderRadius: 20,
                                    padding: 'clamp(28px, 4vw, 40px)',
                                    border: `1.5px solid ${isCurrent ? step.color + '30' : 'var(--border)'}`,
                                    boxShadow: isCurrent
                                        ? `0 1px 3px rgba(0,0,0,0.04), 0 8px 32px ${step.color}08, 0 0 0 1px ${step.color}08`
                                        : '0 1px 3px rgba(0,0,0,0.03)',
                                    transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    {/* Large watermark number */}
                                    <span style={{
                                        position: 'absolute',
                                        top: -12,
                                        right: 20,
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: 'clamp(80px, 10vw, 120px)',
                                        fontWeight: 900,
                                        color: isCurrent ? `${step.color}06` : 'rgba(0,0,0,0.02)',
                                        lineHeight: 1,
                                        pointerEvents: 'none',
                                        transition: 'color 0.6s ease',
                                        userSelect: 'none',
                                    }}>{step.num}</span>

                                    {/* Step label */}
                                    <div style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 8,
                                        marginBottom: 14,
                                    }}>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: step.color,
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            padding: '4px 10px',
                                            borderRadius: 6,
                                            background: `${step.color}0A`,
                                            border: `1px solid ${step.color}18`,
                                        }}>Step {step.num}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
                                        fontWeight: 800,
                                        color: 'var(--text-primary)',
                                        letterSpacing: '-0.02em',
                                        marginBottom: 12,
                                        lineHeight: 1.2,
                                    }}>{step.title}</h3>

                                    {/* Description */}
                                    <p style={{
                                        fontSize: 15,
                                        color: 'var(--text-secondary)',
                                        lineHeight: 1.75,
                                        maxWidth: 520,
                                        marginBottom: 24,
                                    }}>{step.desc}</p>

                                    {/* Content split: features + metric */}
                                    <div style={{
                                        display: 'flex',
                                        gap: 'clamp(20px, 3vw, 40px)',
                                        alignItems: 'flex-start',
                                        flexWrap: 'wrap',
                                    }}>
                                        {/* Feature bullets */}
                                        <div style={{ flex: '1 1 280px' }}>
                                            {step.features.map((feat, fi) => (
                                                <div key={fi} style={{
                                                    display: 'flex', alignItems: 'flex-start', gap: 10,
                                                    marginBottom: fi < step.features.length - 1 ? 10 : 0,
                                                }}>
                                                    <div style={{
                                                        width: 18, height: 18, borderRadius: 5,
                                                        background: `${step.color}10`,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        flexShrink: 0, marginTop: 2,
                                                    }}>
                                                        <svg width="10" height="10" viewBox="0 0 16 16" fill={step.color}>
                                                            <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                                                        </svg>
                                                    </div>
                                                    <span style={{
                                                        fontSize: 13.5, color: 'var(--text-secondary)',
                                                        lineHeight: 1.5,
                                                    }}>{feat}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Metric card */}
                                        <div style={{
                                            flex: '0 0 auto',
                                            minWidth: 160,
                                            padding: '18px 22px',
                                            borderRadius: 14,
                                            background: `${step.color}06`,
                                            border: `1px solid ${step.color}12`,
                                        }}>
                                            <p style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: 10,
                                                fontWeight: 600,
                                                color: step.color,
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                marginBottom: 6,
                                                opacity: 0.8,
                                            }}>{step.metric.label}</p>
                                            <p style={{
                                                fontFamily: 'var(--font-heading)',
                                                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                                                fontWeight: 900,
                                                color: step.color,
                                                letterSpacing: '-0.02em',
                                                lineHeight: 1,
                                                marginBottom: 4,
                                            }}>{step.metric.value}</p>
                                            <p style={{
                                                fontSize: 11.5,
                                                color: 'var(--text-muted)',
                                                lineHeight: 1.4,
                                            }}>{step.metric.sub}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .hiw-timeline-track { left: 12px !important; }
                    .hiw-card { padding-left: 48px !important; }
                    .hiw-card > div:first-child { left: 0 !important; }
                }
                @media (max-width: 480px) {
                    .hiw-timeline-track { left: 8px !important; }
                    .hiw-card { padding-left: 36px !important; }
                    .hiw-card > div:first-child {
                        left: -4px !important;
                        width: 22px !important;
                        height: 22px !important;
                        top: 24px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default HowItWorks;
