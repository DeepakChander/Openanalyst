'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const metrics = [
    {
        label: 'AI Agents',
        value: '50+',
        numValue: 50,
        suffix: '+',
        desc: 'Specialized marketing agents',
        color: '#FF6B00',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <path d="M16 11a4 4 0 0 1 4 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a4 4 0 0 1 4-4" />
            </svg>
        ),
    },
    {
        label: 'Integrations',
        value: '27',
        numValue: 27,
        suffix: '+',
        desc: 'Connected platforms & tools',
        color: '#8B5CF6',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <circle cx="5" cy="6" r="2" />
                <circle cx="19" cy="6" r="2" />
                <circle cx="5" cy="18" r="2" />
                <circle cx="19" cy="18" r="2" />
                <path d="M9.5 10.5L6.5 7.5M14.5 10.5L17.5 7.5M9.5 13.5L6.5 16.5M14.5 13.5L17.5 16.5" />
            </svg>
        ),
    },
    {
        label: 'Avg ROI',
        value: '340%',
        numValue: 340,
        suffix: '%',
        desc: 'Average return on investment',
        color: '#10B981',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
            </svg>
        ),
    },
];

const Stats: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from('.intro-word', {
            opacity: 0.1, y: 16, stagger: 0.05, duration: 0.4, ease: 'power3.out',
            scrollTrigger: { trigger: '.intro-text-block', start: 'top 80%', toggleActions: 'play none none reverse' },
        });
        gsap.from('.intro-desc', {
            opacity: 0, y: 12, duration: 0.5, ease: 'power2.out',
            scrollTrigger: { trigger: '.intro-desc', start: 'top 85%', toggleActions: 'play none none reverse' },
        });
        gsap.from('.intro-metric', {
            y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: '.intro-metrics', start: 'top 85%', toggleActions: 'play none none reverse' },
        });
        const counters = gsap.utils.toArray<HTMLElement>('.intro-counter');
        counters.forEach((counter) => {
            const target = parseInt(counter.dataset.target || '0');
            gsap.from(counter, {
                textContent: 0, duration: 2, ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: { trigger: counter, start: 'top 90%', toggleActions: 'play none none none' },
                onUpdate: function () {
                    counter.textContent = Math.round(parseFloat(counter.textContent || '0')).toString();
                },
            });
        });
    }, { scope: sectionRef });

    const statement = 'We build AI agents that run your entire marketing stack';

    return (
        <section ref={sectionRef} style={{
            padding: '80px 0 72px',
            background: 'var(--bg-ivory)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
                {/* Header: Heading left, description right */}
                <div className="stats-header" style={{
                    display: 'grid', gridTemplateColumns: '1.3fr 0.7fr',
                    gap: '40px', alignItems: 'end', marginBottom: '48px',
                }}>
                    <div className="intro-text-block">
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)',
                            fontWeight: 800, color: 'var(--text-dark)',
                            lineHeight: 1.15, letterSpacing: '-0.03em',
                            display: 'flex', flexWrap: 'wrap', gap: '0 0.25em',
                        }}>
                            {statement.split(' ').map((word, i) => (
                                <span key={i} className="intro-word" style={{
                                    display: 'inline-block',
                                    color: ['AI', 'agents'].includes(word) ? 'var(--rust)' : undefined,
                                }}>{word}</span>
                            ))}
                        </h2>
                    </div>
                    <p className="intro-desc" style={{
                        fontSize: '14px', lineHeight: 1.7,
                        color: 'var(--text-muted)', fontFamily: 'var(--font-body)',
                    }}>
                        From campaign planning to execution, OpenAnalyst deploys autonomous AI agents
                        that handle research, content creation, ad management, and optimization —
                        across every channel, on autopilot.
                    </p>
                </div>

                {/* Metric Cards — compact horizontal */}
                <div className="intro-metrics" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px',
                }}>
                    {metrics.map((metric) => (
                        <div key={metric.label} className="intro-metric" style={{
                            padding: '20px 24px',
                            borderRadius: '16px',
                            background: '#ffffff',
                            border: '1px solid rgba(0,0,0,0.05)',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                            display: 'flex', alignItems: 'center', gap: '16px',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            {/* Top accent line */}
                            <div style={{
                                position: 'absolute', top: 0, left: '20px', right: '20px',
                                height: '2px', borderRadius: '0 0 2px 2px',
                                background: metric.color, opacity: 0.4,
                            }} />

                            {/* Icon */}
                            <div style={{
                                width: '44px', height: '44px', borderRadius: '12px',
                                background: `${metric.color}0D`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: metric.color, flexShrink: 0,
                            }}>
                                {metric.icon}
                            </div>

                            {/* Text content */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                                    <span
                                        className="intro-counter"
                                        data-target={metric.numValue}
                                        style={{
                                            fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                                            fontWeight: 800, fontFamily: 'var(--font-heading)',
                                            color: 'var(--text-dark)', letterSpacing: '-0.03em',
                                            lineHeight: 1,
                                        }}
                                    >
                                        {metric.numValue}
                                    </span>
                                    <span style={{
                                        fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                                        fontWeight: 700, fontFamily: 'var(--font-heading)',
                                        color: metric.color,
                                    }}>
                                        {metric.suffix}
                                    </span>
                                </div>
                                <div style={{
                                    fontFamily: 'var(--font-body)', fontSize: '11px',
                                    color: 'var(--text-muted)', marginTop: '2px',
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                }}>
                                    {metric.desc}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .stats-header {
                        grid-template-columns: 1fr !important;
                        gap: 16px !important;
                    }
                    .intro-metrics {
                        grid-template-columns: 1fr !important;
                    }
                }
                @media (max-width: 480px) {
                    section[style*="padding: 80px 0 72px"] {
                        padding: 48px 0 40px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Stats;
