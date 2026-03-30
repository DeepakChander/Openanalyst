'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ═══ Pattern #3: Scroll-pinned dashboard that self-assembles ═══ */

const metrics = [
    { value: 50, suffix: '+', label: 'AI Agents', color: '#FF6B00' },
    { value: 27, suffix: '+', label: 'Integrations', color: '#8B5CF6' },
    { value: 340, suffix: '%', label: 'Avg ROI', color: '#10B981' },
    { value: 10, suffix: 'K+', label: 'Campaigns', color: '#3B82F6' },
];

function OdometerDigit({ value, delay }: { value: string; delay: number }) {
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
        gsap.fromTo(ref.current,
            { y: 30, opacity: 0, filter: 'blur(4px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, delay, ease: 'back.out(1.5)' }
        );
    }, [visible, delay]);

    return <span ref={ref} style={{ display: 'inline-block', opacity: 0 }}>{value}</span>;
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
            fontSize: 'clamp(3rem, 7vw, 5rem)',
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
            y: 24, opacity: 0, filter: 'blur(4px)',
            stagger: 0.05, duration: 0.5, ease: 'power3.out',
            scrollTrigger: { trigger: '.stats-heading', start: 'top 85%' },
        });

        gsap.fromTo('.stats-card', { y: 60, opacity: 0, scale: 0.9 }, {
            y: 60, opacity: 0, scale: 0.9,
            stagger: 0.12, duration: 0.8, ease: 'back.out(1.3)',
            scrollTrigger: { trigger: '.stats-grid', start: 'top 88%' },
        });

        // SVG chart line draws
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
            {/* Subtle radial depth */}
            <div style={{
                position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, 0)',
                width: 800, height: 800, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,107,0,0.03) 0%, transparent 60%)',
                pointerEvents: 'none',
            }} />

            <div className="container">
                {/* Heading */}
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

                {/* Stats cards — each unique, not a uniform grid */}
                <div className="stats-grid" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
                    maxWidth: 1000, margin: '0 auto',
                }}>
                    {metrics.map((m, i) => (
                        <div key={i} className="stats-card" style={{
                            padding: '36px 24px', borderRadius: 'var(--radius-xl)',
                            background: 'var(--bg-white)',
                            border: '1px solid var(--border)',
                            textAlign: 'center', position: 'relative', overflow: 'hidden',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'all 0.4s var(--ease-out)',
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = `0 12px 40px ${m.color}15`;
                                e.currentTarget.style.borderColor = `${m.color}30`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                        >
                            {/* Top accent bar */}
                            <div style={{
                                position: 'absolute', top: 0, left: 24, right: 24,
                                height: 3, borderRadius: '0 0 3px 3px',
                                background: m.color, opacity: 0.4,
                            }} />

                            {/* Number */}
                            <div style={{ marginBottom: 8 }}>
                                <AnimatedNumber value={m.value} suffix={m.suffix} color={m.color} delay={i * 0.15} />
                            </div>

                            {/* Label */}
                            <div style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 15, fontWeight: 700,
                                color: 'var(--text-primary)', marginBottom: 12,
                            }}>{m.label}</div>

                            {/* Mini SVG chart */}
                            <svg viewBox="0 0 120 32" style={{ width: '100%', height: 32, overflow: 'visible' }}>
                                <path className="stats-chart-line" d={
                                    i === 0 ? 'M0 28 Q20 24 40 20 Q60 16 80 18 Q100 12 120 4' :
                                    i === 1 ? 'M0 20 Q20 26 40 16 Q60 8 80 14 Q100 22 120 10' :
                                    i === 2 ? 'M0 24 Q30 22 50 18 Q70 14 90 10 Q110 6 120 4' :
                                    'M0 26 Q15 28 30 22 Q50 18 70 20 Q90 14 120 6'
                                } fill="none" stroke={m.color} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
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
