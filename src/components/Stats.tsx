'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
    {
        value: 50, suffix: '+', label: 'AI Agents', color: '#FF6B00',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
            </svg>
        ),
    },
    {
        value: 27, suffix: '+', label: 'Integrations', color: '#8B5CF6',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="8" height="12" rx="2" /><rect x="14" y="6" width="8" height="12" rx="2" /><path d="M10 12h4" />
            </svg>
        ),
    },
    {
        value: 340, suffix: '%', label: 'Avg ROI', color: '#10B981',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
            </svg>
        ),
    },
    {
        value: 10, suffix: 'K+', label: 'Campaigns', color: '#3B82F6',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),
    },
];

function AnimatedNumber({ value, suffix, color, delay }: { value: number; suffix: string; color: string; delay: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!visible || !ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, {
            val: value, duration: 1.8, delay, ease: 'power2.out',
            onUpdate: () => { if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix; },
        });
    }, [visible, value, suffix, delay]);

    return (
        <span ref={ref} style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 5vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color,
        }}>0{suffix}</span>
    );
}

const Stats: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo('.stats-heading-word', { y: 16, opacity: 0 }, {
            y: 0, opacity: 1,
            stagger: 0.04, duration: 0.4, ease: 'power3.out',
            scrollTrigger: { trigger: '.stats-heading', start: 'top 88%' },
        });

        gsap.fromTo('.stats-card', { y: 40, opacity: 0, scale: 0.95 }, {
            y: 0, opacity: 1, scale: 1,
            stagger: 0.1, duration: 0.6, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: '.stats-grid', start: 'top 90%' },
        });

        gsap.fromTo('.stats-icon', { scale: 0, rotation: -90 }, {
            scale: 1, rotation: 0,
            stagger: 0.1, duration: 0.5, delay: 0.3, ease: 'back.out(2)',
            scrollTrigger: { trigger: '.stats-grid', start: 'top 88%' },
        });

        gsap.utils.toArray<SVGPathElement>('.stats-chart-line').forEach((path, i) => {
            const length = path.getTotalLength();
            gsap.fromTo(path,
                { strokeDasharray: length, strokeDashoffset: length },
                { strokeDashoffset: 0, duration: 1.5, delay: 0.4 + i * 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: '.stats-grid', start: 'top 88%' } }
            );
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} style={{
            padding: 'clamp(48px, 6vw, 80px) 24px',
            background: 'var(--bg-warm)',
            position: 'relative', overflow: 'hidden',
        }}>
            <div className="container">
                <div className="stats-heading" style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                        fontWeight: 800, letterSpacing: '-0.03em',
                        color: 'var(--text-primary)',
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.25em',
                        maxWidth: 600, margin: '0 auto',
                    }}>
                        {'We build AI agents that run your entire marketing stack'.split(' ').map((word, i) => (
                            <span key={i} className="stats-heading-word" style={{
                                display: 'inline-block',
                                ...(word === 'AI' || word === 'agents' ? {
                                    background: 'var(--gradient-orange-text)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                } : {}),
                            }}>{word}</span>
                        ))}
                    </h2>
                </div>

                <div className="stats-grid" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14,
                    maxWidth: 900, margin: '0 auto',
                }}>
                    {metrics.map((m, i) => (
                        <div key={i} className="stats-card" style={{
                            padding: '24px 16px 20px',
                            borderRadius: 'var(--radius-lg)',
                            background: 'var(--bg-white)',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1.5px solid var(--border)',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = `0 8px 30px ${m.color}18`;
                                e.currentTarget.style.borderColor = `${m.color}30`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                        >
                            {/* Icon */}
                            <div className="stats-icon" style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: `${m.color}10`,
                                border: `1px solid ${m.color}20`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 12px',
                                color: m.color,
                            }}>
                                {m.icon}
                            </div>

                            {/* Number */}
                            <div style={{ marginBottom: 4 }}>
                                <AnimatedNumber value={m.value} suffix={m.suffix} color={m.color} delay={i * 0.12} />
                            </div>

                            {/* Label */}
                            <div style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 13, fontWeight: 600,
                                color: 'var(--text-secondary)', marginBottom: 10,
                            }}>{m.label}</div>

                            {/* Mini chart */}
                            <svg viewBox="0 0 120 24" style={{ width: '80%', height: 20, overflow: 'visible', margin: '0 auto', display: 'block' }}>
                                <path className="stats-chart-line" d={
                                    i === 0 ? 'M0 20 Q20 18 40 14 Q60 10 80 12 Q100 6 120 2' :
                                    i === 1 ? 'M0 14 Q20 18 40 10 Q60 6 80 10 Q100 16 120 6' :
                                    i === 2 ? 'M0 18 Q30 16 50 12 Q70 8 90 6 Q110 3 120 2' :
                                    'M0 20 Q15 22 30 16 Q50 12 70 14 Q90 8 120 4'
                                } fill="none" stroke={m.color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 10px !important;
                    }
                }
                @media (max-width: 480px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 8px !important;
                    }
                    .stats-card {
                        padding: 18px 12px 16px !important;
                    }
                }
                @media (max-width: 360px) {
                    .stats-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Stats;
