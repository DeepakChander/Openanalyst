'use client';

import React, { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

interface StatCard {
    label: string;
    value: string;
    numericValue: number;
    suffix: string;
    description: string;
    icon: string;
    accentColor: string;
}

const stats: StatCard[] = [
    {
        label: 'Campaigns',
        value: '10K+',
        numericValue: 10000,
        suffix: '+',
        description: 'Marketing campaigns deployed and optimized by AI agents worldwide',
        icon: '◆',
        accentColor: '#CC7A60',
    },
    {
        label: 'Integrations',
        value: '27+',
        numericValue: 27,
        suffix: '+',
        description: 'Connected platforms via MCP protocol',
        icon: '⬡',
        accentColor: '#3b82f6',
    },
    {
        label: 'Uptime',
        value: '99.9%',
        numericValue: 99.9,
        suffix: '%',
        description: 'Infrastructure reliability guarantee',
        icon: '●',
        accentColor: '#22c55e',
    },
    {
        label: 'Faster',
        value: '10x',
        numericValue: 10,
        suffix: 'x',
        description: 'Speed improvement over manual workflows',
        icon: '▲',
        accentColor: '#f59e0b',
    },
];

const Stats: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    gsap.registerPlugin(ScrollTrigger, useGSAP);

    // Section-level mouse glow
    const handleSectionMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const glow = e.currentTarget.querySelector('.section-mouse-glow') as HTMLElement;
        if (glow) {
            glow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(204,122,96,0.07) 0%, transparent 60%)`;
        }
    }, []);

    // Card-level 3D tilt with internal parallax
    const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
            rotateY: x * 12,
            rotateX: -y * 10,
            duration: 0.4,
            ease: 'power2.out',
        });

        // Internal parallax — number moves more than label
        const num = card.querySelector('.stat-number') as HTMLElement;
        const label = card.querySelector('.stat-label') as HTMLElement;
        if (num) gsap.to(num, { x: x * 15, y: y * 10, duration: 0.3, ease: 'power2.out' });
        if (label) gsap.to(label, { x: x * 5, y: y * 3, duration: 0.3, ease: 'power2.out' });

        // Cursor glow
        const glow = card.querySelector('.card-glow') as HTMLElement;
        if (glow) {
            glow.style.background = `radial-gradient(250px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(204,122,96,0.15) 0%, transparent 60%)`;
        }
    }, []);

    const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });

        const num = card.querySelector('.stat-number') as HTMLElement;
        const label = card.querySelector('.stat-label') as HTMLElement;
        if (num) gsap.to(num, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        if (label) gsap.to(label, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });

        const glow = card.querySelector('.card-glow') as HTMLElement;
        if (glow) glow.style.background = 'none';
    }, []);

    useGSAP(() => {
        // Heading reveal
        gsap.from('.stats-heading-text', {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        });

        // Cards — dramatic stagger entrance with blur + scale + rotation
        const cards = gsap.utils.toArray<HTMLElement>('.stat-card-wrapper');
        gsap.from(cards, {
            y: 80,
            opacity: 0,
            scale: 0.85,
            rotateX: -15,
            filter: 'blur(8px)',
            stagger: { each: 0.12, from: 'start' },
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.stats-bento', start: 'top 85%', toggleActions: 'play none none reverse' }
        });

        // Counter animations with shimmer on complete
        cards.forEach((wrapper) => {
            const counter = wrapper.querySelector('.stat-number') as HTMLElement;
            if (!counter) return;

            const target = parseFloat(counter.dataset.target || '0');
            const suffix = counter.dataset.suffix || '';
            const isDecimal = target % 1 !== 0;

            gsap.from(counter, {
                textContent: 0,
                duration: 2.5,
                ease: 'power2.out',
                snap: { textContent: isDecimal ? 0.1 : 1 },
                scrollTrigger: { trigger: wrapper, start: 'top 85%', toggleActions: 'play none none none' },
                onUpdate: function () {
                    const val = parseFloat(counter.textContent || '0');
                    if (isDecimal) {
                        counter.textContent = val.toFixed(1) + suffix;
                    } else if (val >= 1000) {
                        counter.textContent = Math.floor(val / 1000) + 'K' + suffix;
                    } else {
                        counter.textContent = Math.floor(val) + suffix;
                    }
                },
                onComplete: function () {
                    // Shimmer animation on number after count finishes
                    const line = wrapper.querySelector('.accent-line') as HTMLElement;
                    if (line) {
                        gsap.fromTo(line, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.6, ease: 'power3.out' });
                    }
                },
            });
        });
    }, { scope: containerRef });

    return (
        <>
            <style>{`
                @keyframes shimmerStat {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                @keyframes borderRotate {
                    to { --stat-angle: 360deg; }
                }
                @property --stat-angle {
                    syntax: '<angle>';
                    initial-value: 0deg;
                    inherits: false;
                }
                .stat-card-inner::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 20px;
                    padding: 1px;
                    background: conic-gradient(from var(--stat-angle), transparent 40%, rgba(204,122,96,0.3) 50%, transparent 60%);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    animation: borderRotate 4s linear infinite;
                }
                .stat-card-inner:hover::before {
                    opacity: 1;
                }
            `}</style>

            <section
                ref={sectionRef}
                onMouseMove={handleSectionMouseMove}
                style={{
                    padding: '120px 0',
                    background: 'var(--terminal-bg)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Ambient gradient mesh background */}
                <div style={{
                    position: 'absolute',
                    top: '-200px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '900px',
                    height: '600px',
                    background: 'radial-gradient(ellipse at center, rgba(204,122,96,0.1) 0%, rgba(204,122,96,0.03) 40%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                {/* Noise grain overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    opacity: 0.03,
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay',
                }} />

                {/* Section mouse glow */}
                <div className="section-mouse-glow" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transition: 'background 0.15s ease' }} />

                <div ref={containerRef} style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                    {/* Section heading */}
                    <div className="stats-heading-text" style={{ marginBottom: '64px', textAlign: 'center' }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--primary)', marginBottom: '16px', letterSpacing: '0.05em' }}>
                            {'// PERFORMANCE_METRICS'}
                        </p>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                            fontWeight: 800,
                            color: '#ffffff',
                            lineHeight: 1.1,
                            maxWidth: '600px',
                            margin: '0 auto 16px',
                        }}>
                            Numbers that{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, var(--primary-light), var(--primary), var(--primary-dark))',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>speak volumes</span>
                        </h2>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#6b7280', maxWidth: '400px', margin: '0 auto' }}>
                            Trusted by marketers and teams worldwide.
                        </p>
                    </div>

                    {/* Bento grid — asymmetric: first card larger */}
                    <div className="stats-bento" style={{
                        display: 'grid',
                        gridTemplateColumns: '1.4fr 1fr 1fr',
                        gridTemplateRows: 'auto auto',
                        gap: '16px',
                    }}>
                        {stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className="stat-card-wrapper"
                                style={{
                                    perspective: '900px',
                                    gridColumn: i === 0 ? 'span 1' : undefined,
                                    gridRow: i === 0 ? 'span 2' : undefined,
                                }}
                            >
                                <div
                                    className="stat-card-inner"
                                    onMouseMove={handleCardMouseMove}
                                    onMouseLeave={handleCardMouseLeave}
                                    style={{
                                        willChange: 'transform',
                                        transformStyle: 'preserve-3d',
                                        position: 'relative',
                                        height: '100%',
                                        borderRadius: '20px',
                                        background: 'rgba(30, 30, 46, 0.6)',
                                        backdropFilter: 'blur(20px)',
                                        WebkitBackdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
                                        overflow: 'hidden',
                                        cursor: 'default',
                                        transition: 'box-shadow 0.3s ease',
                                    }}
                                >
                                    {/* Cursor glow overlay */}
                                    <div className="card-glow" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: '20px', zIndex: 2 }} />

                                    {/* Card content */}
                                    <div style={{
                                        padding: i === 0 ? '40px 36px' : '28px 28px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: i === 0 ? 'space-between' : 'flex-start',
                                        height: '100%',
                                        position: 'relative',
                                        zIndex: 1,
                                    }}>
                                        {/* Top row: icon + label */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: i === 0 ? '32px' : '16px' }}>
                                            <span style={{
                                                fontSize: i === 0 ? '14px' : '10px',
                                                color: stat.accentColor,
                                                filter: `drop-shadow(0 0 8px ${stat.accentColor}50)`,
                                            }}>{stat.icon}</span>
                                            <span style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '11px',
                                                color: '#6b7280',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                            }}>{stat.label}</span>
                                        </div>

                                        {/* Number */}
                                        <div style={{ position: 'relative' }}>
                                            <div
                                                className="stat-number"
                                                data-target={stat.numericValue}
                                                data-suffix={stat.suffix}
                                                style={{
                                                    fontSize: i === 0 ? 'clamp(4rem, 8vw, 6rem)' : 'clamp(2.5rem, 4vw, 3.5rem)',
                                                    fontWeight: 800,
                                                    fontFamily: 'var(--font-heading)',
                                                    lineHeight: 0.95,
                                                    letterSpacing: '-0.03em',
                                                    fontVariantNumeric: 'tabular-nums',
                                                    marginBottom: '8px',
                                                    background: `linear-gradient(135deg, #ffffff 30%, ${stat.accentColor})`,
                                                    backgroundClip: 'text',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                }}
                                            >
                                                {stat.value}
                                            </div>

                                            {/* Glow halo behind number */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '30%',
                                                transform: 'translate(-50%, -50%)',
                                                width: i === 0 ? '200px' : '120px',
                                                height: i === 0 ? '100px' : '60px',
                                                background: `radial-gradient(ellipse, ${stat.accentColor}15 0%, transparent 70%)`,
                                                pointerEvents: 'none',
                                                filter: 'blur(20px)',
                                            }} />

                                            {/* Accent underline */}
                                            <div className="accent-line" style={{
                                                height: '2px',
                                                width: i === 0 ? '60px' : '32px',
                                                background: `linear-gradient(90deg, ${stat.accentColor}, transparent)`,
                                                borderRadius: '2px',
                                                transform: 'scaleX(0)',
                                                transformOrigin: 'left center',
                                            }} />
                                        </div>

                                        {/* Description — only on first (large) card */}
                                        {i === 0 && (
                                            <p className="stat-label" style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '13px',
                                                color: '#6b7280',
                                                lineHeight: 1.6,
                                                marginTop: '24px',
                                                maxWidth: '280px',
                                            }}>
                                                {stat.description}
                                            </p>
                                        )}

                                        {/* Smaller cards get a compact label */}
                                        {i !== 0 && (
                                            <p className="stat-label" style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '11px',
                                                color: '#4a4a5a',
                                                marginTop: '8px',
                                            }}>
                                                {stat.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Decorative corner code */}
                                    {i === 0 && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '16px',
                                            right: '20px',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '11px',
                                            color: '#2a2a3a',
                                            zIndex: 1,
                                        }}>
                                            {'metrics.resolve()'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Stats;
