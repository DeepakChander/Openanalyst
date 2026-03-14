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
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <path d="M16 11a4 4 0 0 1 4 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a4 4 0 0 1 4-4" />
                <circle cx="12" cy="6" r="1" fill="currentColor" stroke="none" />
                <path d="M9 22v-2" />
                <path d="M15 22v-2" />
                <path d="M12 19v3" />
            </svg>
        ),
    },
    {
        label: 'Integrations',
        value: '27',
        numValue: 27,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <circle cx="5" cy="6" r="2" />
                <circle cx="19" cy="6" r="2" />
                <circle cx="5" cy="18" r="2" />
                <circle cx="19" cy="18" r="2" />
                <path d="M9.5 10.5L6.5 7.5" />
                <path d="M14.5 10.5L17.5 7.5" />
                <path d="M9.5 13.5L6.5 16.5" />
                <path d="M14.5 13.5L17.5 16.5" />
            </svg>
        ),
    },
    {
        label: 'Avg ROI',
        value: '340%',
        numValue: 340,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
                <line x1="2" y1="22" x2="22" y2="22" />
            </svg>
        ),
    },
];

const Stats: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Word-by-word reveal
        gsap.from('.intro-word', {
            opacity: 0.1,
            y: 20,
            stagger: 0.06,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.intro-text-block',
                start: 'top 75%',
                toggleActions: 'play none none reverse',
            }
        });

        // Metric cards
        gsap.from('.intro-metric', {
            y: 40, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'back.out(1.4)',
            scrollTrigger: {
                trigger: '.intro-metrics',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
        });

        // Counter animation
        const counters = gsap.utils.toArray<HTMLElement>('.intro-counter');
        counters.forEach((counter) => {
            const target = parseInt(counter.dataset.target || '0');
            gsap.from(counter, {
                textContent: 0,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
                onUpdate: function () {
                    const val = Math.round(parseFloat(counter.textContent || '0'));
                    counter.textContent = val.toString();
                },
            });
        });
    }, { scope: sectionRef });

    const statement = 'We build AI agents that run your entire marketing stack';

    return (
        <section ref={sectionRef} style={{
            padding: '120px 0',
            background: 'var(--bg-ivory)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
                {/* Split: Large text left, visual right */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 0.8fr',
                    gap: '60px',
                    alignItems: 'center',
                    marginBottom: '80px',
                }}>
                    <div className="intro-text-block">
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                            fontWeight: 800,
                            color: 'var(--text-dark)',
                            lineHeight: 1.15,
                            letterSpacing: '-0.03em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0 0.25em',
                        }}>
                            {statement.split(' ').map((word, i) => (
                                <span key={i} className="intro-word" style={{
                                    display: 'inline-block',
                                    color: ['AI', 'agents'].includes(word) ? 'var(--rust)' : undefined,
                                }}>
                                    {word}
                                </span>
                            ))}
                        </h2>
                    </div>

                    <div>
                        <p style={{
                            fontSize: '16px',
                            lineHeight: 1.7,
                            color: 'var(--text-muted)',
                            fontFamily: 'var(--font-body)',
                        }}>
                            From campaign planning to execution, OpenAnalyst deploys autonomous AI agents
                            that handle research, content creation, ad management, and optimization —
                            across every channel, on autopilot.
                        </p>
                    </div>
                </div>

                {/* Metric Cards */}
                <div className="intro-metrics" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                }}>
                    {metrics.map((metric) => (
                        <div key={metric.label} className="intro-metric" style={{
                            padding: '36px 32px',
                            borderRadius: '20px',
                            background: '#ffffff',
                            border: '1px solid var(--border-light)',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '16px',
                        }}>
                            {/* Icon */}
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '14px',
                                background: 'rgba(255, 107, 0, 0.06)',
                                border: '1px solid rgba(255, 107, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--rust)',
                            }}>
                                {metric.icon}
                            </div>

                            <div
                                className="intro-counter"
                                data-target={metric.numValue}
                                style={{
                                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                                    fontWeight: 800,
                                    fontFamily: 'var(--font-heading)',
                                    color: 'var(--text-dark)',
                                    letterSpacing: '-0.03em',
                                    lineHeight: 1,
                                }}
                            >
                                {metric.value}
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '12px',
                                color: 'var(--rust)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                            }}>
                                {metric.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .intro-text-block {
                        grid-column: 1 / -1;
                    }
                    section > div > div:first-child {
                        grid-template-columns: 1fr !important;
                        gap: 32px !important;
                    }
                    .intro-metrics {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Stats;
