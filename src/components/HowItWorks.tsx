'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ═══ Pattern #6: Vertical SVG timeline with line-draw + sliding cards ═══ */

const steps = [
    {
        num: '01', title: 'Connect Your Stack',
        desc: 'Link Gmail, Slack, HubSpot, and 24 more tools in 60 seconds. Zero configuration needed.',
        detail: 'Drag, drop, done.',
        color: '#FF6B00',
        icons: ['Gmail', 'Slack', 'HubSpot'],
    },
    {
        num: '02', title: 'Set Your Goals',
        desc: 'Tell your AI agents what to optimize — revenue, leads, engagement, or custom KPIs.',
        detail: 'Natural language, not dashboards.',
        color: '#8B5CF6',
        icons: ['Target', 'Budget', 'Channels'],
    },
    {
        num: '03', title: 'Agents Activate',
        desc: 'Specialized AI agents start working immediately — planning, creating, and optimizing campaigns.',
        detail: '42 agents, always on.',
        color: '#10B981',
        icons: ['Content', 'Ads', 'SEO'],
    },
    {
        num: '04', title: 'Watch Results Grow',
        desc: 'Real-time analytics, live ROI tracking, and continuous optimization — all on autopilot.',
        detail: '340% average ROI.',
        color: '#F59E0B',
        icons: ['ROI', 'Leads', 'Growth'],
    },
];

const HowItWorks: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<SVGLineElement>(null);

    useGSAP(() => {
        // Heading
        gsap.fromTo('.hiw-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
        gsap.fromTo('.hiw-title-word', { y: 20, opacity: 0, filter: 'blur(4px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.05, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });

        // SVG line draws with scroll
        if (lineRef.current) {
            const length = lineRef.current.getTotalLength();
            gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
            gsap.to(lineRef.current, {
                strokeDashoffset: 0, ease: 'none',
                scrollTrigger: { trigger: '.hiw-timeline', start: 'top 70%', end: 'bottom 40%', scrub: 1 },
            });
        }

        // Cards slide in alternating directions
        gsap.utils.toArray<HTMLElement>('.hiw-step').forEach((el, i) => {
            gsap.fromTo(el,
                { x: i % 2 === 0 ? -60 : 60, y: 20, opacity: 0 },
                { x: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%' } }
            );
        });

        // Step dots scale in
        gsap.fromTo('.hiw-dot', { scale: 0 }, {
            scale: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.2,
            scrollTrigger: { trigger: '.hiw-timeline', start: 'top 75%' },
        });
    }, { scope: sectionRef });

    return (
        <section id="how-it-works" ref={sectionRef} style={{
            padding: 'var(--space-section) 24px',
            background: 'var(--bg-primary)',
            position: 'relative', overflow: 'hidden',
        }}>
            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 72 }}>
                    <p className="hiw-label label-mono" style={{ marginBottom: 16 }}>How It Works</p>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)',
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.25em',
                    }}>
                        {'From zero to results in minutes'.split(' ').map((word, i) => (
                            <span key={i} className="hiw-title-word" style={{
                                display: 'inline-block',
                                ...(word === 'results' ? { color: 'var(--orange)' } : {}),
                            }}>{word}</span>
                        ))}
                    </h2>
                </div>

                {/* Timeline */}
                <div className="hiw-timeline" style={{
                    maxWidth: 700, margin: '0 auto',
                    position: 'relative', padding: '0 0 0 48px',
                }}>
                    {/* SVG vertical line that draws on scroll */}
                    <svg style={{
                        position: 'absolute', left: 19, top: 0, width: 2, height: '100%',
                        overflow: 'visible',
                    }}>
                        {/* Background track */}
                        <line x1="1" y1="0" x2="1" y2="100%" stroke="var(--border)" strokeWidth="2" />
                        {/* Animated fill line */}
                        <line ref={lineRef} x1="1" y1="0" x2="1" y2="100%"
                            stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" />
                    </svg>

                    {/* Steps */}
                    {steps.map((step, i) => (
                        <div key={i} className="hiw-step" style={{
                            position: 'relative',
                            marginBottom: i < steps.length - 1 ? 56 : 0,
                        }}>
                            {/* Dot on timeline */}
                            <div className="hiw-dot" style={{
                                position: 'absolute', left: -37, top: 12,
                                width: 16, height: 16, borderRadius: '50%',
                                background: step.color,
                                border: '3px solid var(--bg-primary)',
                                boxShadow: `0 0 0 3px ${step.color}25, 0 0 16px ${step.color}20`,
                            }} />

                            {/* Card */}
                            <div style={{
                                padding: '32px 28px', borderRadius: 'var(--radius-xl)',
                                background: 'var(--bg-white)',
                                border: '1px solid var(--border)',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'all 0.4s var(--ease-out)',
                                position: 'relative', overflow: 'hidden',
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = `${step.color}30`;
                                    e.currentTarget.style.boxShadow = `0 8px 32px ${step.color}10`;
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                {/* Faded number */}
                                <span style={{
                                    position: 'absolute', top: 12, right: 20,
                                    fontFamily: 'var(--font-heading)', fontSize: 56, fontWeight: 900,
                                    color: `${step.color}08`, lineHeight: 1, pointerEvents: 'none',
                                }}>{step.num}</span>

                                {/* Step number badge */}
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14,
                                }}>
                                    <span style={{
                                        width: 28, height: 28, borderRadius: 'var(--radius-sm)',
                                        background: `${step.color}12`, border: `1px solid ${step.color}20`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: step.color,
                                    }}>{step.num}</span>
                                    <span style={{
                                        fontFamily: 'var(--font-mono)', fontSize: 11,
                                        color: step.color, letterSpacing: '0.06em', textTransform: 'uppercase',
                                    }}>{step.detail}</span>
                                </div>

                                <h3 style={{
                                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                                    fontWeight: 700, color: 'var(--text-primary)',
                                    marginBottom: 8, letterSpacing: '-0.01em',
                                }}>{step.title}</h3>

                                <p style={{
                                    fontSize: 14, color: 'var(--text-secondary)',
                                    lineHeight: 1.7, margin: 0,
                                }}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 600px) {
                    #how-it-works { padding: clamp(48px, 8vw, 80px) 16px !important; }
                }
            `}</style>
        </section>
    );
};

export default HowItWorks;
