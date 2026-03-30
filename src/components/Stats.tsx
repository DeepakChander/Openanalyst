'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const metrics = [
    { numValue: 50, suffix: '+', label: 'AI Agents', desc: 'Specialized for every channel' },
    { numValue: 27, suffix: '+', label: 'Integrations', desc: 'Connected platforms & tools' },
    { numValue: 340, suffix: '%', label: 'Avg ROI', desc: 'Return on investment' },
    { numValue: 10, suffix: 'K+', label: 'Campaigns', desc: 'Deployed worldwide' },
];

const Stats: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Heading word-by-word reveal
        gsap.from('.stat-word', {
            opacity: 0.08, y: 20, filter: 'blur(4px)', stagger: 0.04, duration: 0.5, ease: 'power3.out',
            scrollTrigger: { trigger: '.stat-heading', start: 'top 82%', toggleActions: 'play none none reverse' },
        });

        // Divider lines grow from center
        gsap.from('.stat-divider', {
            scaleY: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
            scrollTrigger: { trigger: '.stat-numbers', start: 'top 85%', toggleActions: 'play none none reverse' },
        });

        // Numbers entrance
        gsap.from('.stat-number-block', {
            y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: '.stat-numbers', start: 'top 85%', toggleActions: 'play none none reverse' },
        });

        // Animated counters
        const counters = gsap.utils.toArray<HTMLElement>('.stat-counter');
        counters.forEach((counter) => {
            const target = parseInt(counter.dataset.target || '0');
            gsap.from(counter, {
                textContent: 0, duration: 2.2, ease: 'power2.out',
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
        <section ref={sectionRef} className="light-section" style={{
            padding: '100px 0 80px',
            background: 'var(--bg-white)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Subtle mesh gradient */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'var(--gradient-mesh-light)',
            }} />

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                {/* Heading */}
                <div className="stat-heading" style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)',
                        fontWeight: 800, color: 'var(--text-primary)',
                        lineHeight: 1.15, letterSpacing: '-0.03em',
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.25em',
                        maxWidth: '700px', margin: '0 auto',
                    }}>
                        {statement.split(' ').map((word, i) => (
                            <span key={i} className="stat-word" style={{
                                display: 'inline-block',
                                ...((['AI', 'agents'].includes(word)) ? {
                                    background: 'var(--orange-gradient)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                } : {}),
                            }}>{word}</span>
                        ))}
                    </h2>
                </div>

                {/* Pure typography metrics — massive numbers */}
                <div className="stat-numbers" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 0,
                }}>
                    {metrics.map((metric, i) => (
                        <React.Fragment key={metric.label}>
                            {/* Divider line (not before first) */}
                            {i > 0 && (
                                <div className="stat-divider" style={{
                                    width: '1px',
                                    height: '72px',
                                    background: 'linear-gradient(180deg, transparent, var(--border-default), transparent)',
                                    transformOrigin: 'center',
                                    flexShrink: 0,
                                }} />
                            )}

                            <div className="stat-number-block" style={{
                                flex: 1,
                                textAlign: 'center',
                                padding: '0 20px',
                            }}>
                                {/* Big number */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    justifyContent: 'center',
                                    gap: '2px',
                                    marginBottom: '8px',
                                }}>
                                    <span
                                        className="stat-counter"
                                        data-target={metric.numValue}
                                        style={{
                                            fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
                                            fontWeight: 900,
                                            fontFamily: 'var(--font-heading)',
                                            letterSpacing: '-0.04em',
                                            lineHeight: 1,
                                            background: 'var(--orange-gradient)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                        }}
                                    >
                                        {metric.numValue}
                                    </span>
                                    <span style={{
                                        fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                                        fontWeight: 800,
                                        fontFamily: 'var(--font-heading)',
                                        color: 'var(--orange)',
                                        letterSpacing: '-0.02em',
                                    }}>
                                        {metric.suffix}
                                    </span>
                                </div>

                                {/* Label */}
                                <div style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    color: 'var(--text-primary)',
                                    marginBottom: '4px',
                                }}>
                                    {metric.label}
                                </div>

                                {/* Description */}
                                <div style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '12px',
                                    color: 'var(--text-muted)',
                                }}>
                                    {metric.desc}
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .stat-numbers {
                        flex-wrap: wrap !important;
                    }
                    .stat-number-block {
                        flex: 0 0 50% !important;
                        margin-bottom: 32px !important;
                    }
                    .stat-divider {
                        display: none !important;
                    }
                }
                @media (max-width: 480px) {
                    .stat-number-block {
                        flex: 0 0 100% !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Stats;
