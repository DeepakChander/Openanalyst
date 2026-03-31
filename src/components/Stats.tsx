'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
    { value: 50, suffix: '+', label: 'AI Agents', color: '#FF6B00' },
    { value: 27, suffix: '+', label: 'Integrations', color: '#8B5CF6' },
    { value: 340, suffix: '%', label: 'Avg ROI', color: '#10B981' },
    { value: 10, suffix: 'K+', label: 'Campaigns', color: '#3B82F6' },
];

/* ── Spotlight Glow Card — pointer-tracking border glow ── */
function SpotlightCard({ children, color, className = '' }: { children: React.ReactNode; color: string; className?: string }) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handlePointerMove = (e: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--spot-x', `${x}px`);
            card.style.setProperty('--spot-y', `${y}px`);
        };

        card.addEventListener('pointermove', handlePointerMove);
        return () => card.removeEventListener('pointermove', handlePointerMove);
    }, []);

    return (
        <div ref={cardRef} className={`spotlight-card ${className}`} style={{
            '--spot-color': color,
        } as React.CSSProperties}>
            {children}
        </div>
    );
}

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
            val: value, duration: 2, delay, ease: 'power2.out',
            onUpdate: () => { if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix; },
        });
    }, [visible, value, suffix, delay]);

    return (
        <span ref={ref} style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 7vw, 4.5rem)',
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
        gsap.fromTo('.stats-heading-word', { y: 24, opacity: 0, filter: 'blur(4px)' }, {
            y: 0, opacity: 1, filter: 'blur(0px)',
            stagger: 0.05, duration: 0.5, ease: 'power3.out',
            scrollTrigger: { trigger: '.stats-heading', start: 'top 85%' },
        });

        gsap.fromTo('.stats-card', { y: 60, opacity: 0, scale: 0.9 }, {
            y: 0, opacity: 1, scale: 1,
            stagger: 0.12, duration: 0.8, ease: 'back.out(1.3)',
            scrollTrigger: { trigger: '.stats-grid', start: 'top 88%' },
        });

        gsap.utils.toArray<SVGPathElement>('.stats-chart-line').forEach((path, i) => {
            const length = path.getTotalLength();
            gsap.fromTo(path,
                { strokeDasharray: length, strokeDashoffset: length },
                { strokeDashoffset: 0, duration: 2, delay: 0.5 + i * 0.2, ease: 'power2.out',
                    scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' } }
            );
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} style={{
            padding: 'var(--space-section) 24px',
            background: 'var(--bg-warm)',
            position: 'relative', overflow: 'hidden',
        }}>
            <div style={{
                position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, 0)',
                width: 800, height: 800, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,107,0,0.03) 0%, transparent 60%)',
                pointerEvents: 'none',
            }} />

            <div className="container">
                <div className="stats-heading" style={{ textAlign: 'center', marginBottom: 64 }}>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 800, letterSpacing: '-0.03em',
                        color: 'var(--text-primary)',
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.25em',
                        maxWidth: 700, margin: '0 auto',
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
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
                    maxWidth: 1000, margin: '0 auto',
                }}>
                    {metrics.map((m, i) => (
                        <SpotlightCard key={i} color={m.color} className="stats-card">
                            {/* Top accent bar */}
                            <div style={{
                                position: 'absolute', top: 0, left: 20, right: 20,
                                height: 3, borderRadius: '0 0 3px 3px',
                                background: m.color, opacity: 0.6,
                            }} />

                            <div style={{ marginBottom: 8 }}>
                                <AnimatedNumber value={m.value} suffix={m.suffix} color={m.color} delay={i * 0.15} />
                            </div>

                            <div style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 15, fontWeight: 700,
                                color: 'var(--text-primary)', marginBottom: 12,
                            }}>{m.label}</div>

                            <svg viewBox="0 0 120 32" style={{ width: '100%', height: 32, overflow: 'visible' }}>
                                <path className="stats-chart-line" d={
                                    i === 0 ? 'M0 28 Q20 24 40 20 Q60 16 80 18 Q100 12 120 4' :
                                    i === 1 ? 'M0 20 Q20 26 40 16 Q60 8 80 14 Q100 22 120 10' :
                                    i === 2 ? 'M0 24 Q30 22 50 18 Q70 14 90 10 Q110 6 120 4' :
                                    'M0 26 Q15 28 30 22 Q50 18 70 20 Q90 14 120 6'
                                } fill="none" stroke={m.color} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                            </svg>
                        </SpotlightCard>
                    ))}
                </div>
            </div>

            <style>{`
                .spotlight-card {
                    padding: 36px 24px;
                    border-radius: var(--radius-xl);
                    background: var(--bg-white);
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s var(--ease-out);
                    border: 1.5px solid var(--border);
                    box-shadow: var(--shadow-sm);
                }

                .spotlight-card::before {
                    content: '';
                    position: absolute;
                    inset: -1px;
                    border-radius: inherit;
                    background: radial-gradient(
                        250px circle at var(--spot-x, 50%) var(--spot-y, 50%),
                        var(--spot-color, #FF6B00) 0%,
                        transparent 100%
                    );
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    z-index: -1;
                    pointer-events: none;
                }

                .spotlight-card::after {
                    content: '';
                    position: absolute;
                    inset: 1.5px;
                    border-radius: calc(var(--radius-xl) - 1.5px);
                    background: var(--bg-white);
                    z-index: -1;
                    pointer-events: none;
                }

                .spotlight-card:hover::before {
                    opacity: 1;
                }

                .spotlight-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 40px color-mix(in srgb, var(--spot-color) 15%, transparent);
                    border-color: transparent;
                }

                @media (max-width: 768px) {
                    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 480px) {
                    .stats-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
};

export default Stats;
