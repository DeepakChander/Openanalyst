'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

interface Skill {
    id: number;
    name: string;
    filename: string;
    command: string;
    description: string;
    features: string[];
    accentColor: string;
    icon: string;
    gradient: string;
}

const skills: Skill[] = [
    {
        id: 1, name: 'AI-Vibe-Marketer', filename: 'ai-vibe-marketer.ts',
        command: '$ skill run ai-vibe-marketer',
        description: 'Full-stack marketing agent for campaign planning, creation, and optimization across every channel.',
        features: ['Multi-channel campaigns', 'A/B testing', 'Performance tracking', 'Budget engine'],
        accentColor: '#CC7A60', icon: '◆',
        gradient: 'linear-gradient(135deg, #CC7A60, #e8a990, #a85d45)',
    },
    {
        id: 2, name: 'Customer-Segmentation', filename: 'customer-segmentation.ts',
        command: '$ skill run customer-segmentation',
        description: 'Automatic audience segmentation by behavior, demographics, and engagement patterns.',
        features: ['Behavioral clustering', 'Demographic profiling', 'Engagement scoring', 'Predictive modeling'],
        accentColor: '#3b82f6', icon: '⬡',
        gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa, #2563eb)',
    },
    {
        id: 3, name: 'Market-Research-Reports', filename: 'market-research-reports.ts',
        command: '$ skill run market-research-reports',
        description: 'Comprehensive market research with competitor analysis, trend forecasting, and actionable insights.',
        features: ['Competitor analysis', 'Trend forecasting', 'Market sizing', 'Opportunity mapping'],
        accentColor: '#22c55e', icon: '●',
        gradient: 'linear-gradient(135deg, #22c55e, #4ade80, #16a34a)',
    },
    {
        id: 4, name: 'AI-Search-Optimization', filename: 'ai-search-optimization.ts',
        command: '$ skill run ai-search-optimization',
        description: 'Optimize your presence across AI search engines and traditional SEO for maximum discoverability.',
        features: ['AI search optimization', 'Structured data', 'Content gap analysis', 'Ranking intelligence'],
        accentColor: '#a855f7', icon: '▲',
        gradient: 'linear-gradient(135deg, #a855f7, #c084fc, #7c3aed)',
    },
    {
        id: 5, name: 'SEO-Content-Optimizer', filename: 'seo-content-optimizer.ts',
        command: '$ skill run seo-content-optimizer',
        description: 'Create and optimize ranking content with keyword research, gap analysis, and performance tracking.',
        features: ['Keyword research', 'Content scoring', 'Gap analysis', 'Performance tracking'],
        accentColor: '#f59e0b', icon: '★',
        gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24, #d97706)',
    },
];

const Features: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const [mousePositions, setMousePositions] = useState<Record<number, { x: number; y: number }>>({});
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const particleContainerRef = useRef<HTMLDivElement>(null);

    gsap.registerPlugin(ScrollTrigger, useGSAP);

    // 3D tilt + holographic glow tracking
    const handleCardMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (y - 0.5) * -12;
        const rotateY = (x - 0.5) * 12;

        gsap.to(card, {
            rotateX, rotateY,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 800,
        });

        setMousePositions(prev => ({ ...prev, [index]: { x: e.clientX - rect.left, y: e.clientY - rect.top } }));
    }, []);

    const handleCardEnter = useCallback((index: number) => {
        setActiveCard(index);
        const card = cardRefs.current[index];
        if (!card) return;

        gsap.to(card, {
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out',
        });

        // Animate the inner icon
        const icon = card.querySelector('.skill-icon-3d');
        if (icon) {
            gsap.to(icon, {
                z: 40, scale: 1.3, rotateY: 15,
                duration: 0.5, ease: 'back.out(1.7)',
            });
        }

        // Animate features stagger
        const features = card.querySelectorAll('.feature-tag');
        gsap.fromTo(features, { y: 4, opacity: 0.6 }, {
            y: 0, opacity: 1, stagger: 0.05, duration: 0.3, ease: 'power2.out',
        });
    }, []);

    const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
        setActiveCard(null);
        const card = e.currentTarget;

        gsap.to(card, {
            rotateX: 0, rotateY: 0, scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
        });

        const icon = card.querySelector('.skill-icon-3d');
        if (icon) {
            gsap.to(icon, { z: 0, scale: 1, rotateY: 0, duration: 0.5, ease: 'power3.out' });
        }
    }, []);

    // Floating particles
    useEffect(() => {
        if (!particleContainerRef.current) return;
        const container = particleContainerRef.current;
        const particles: HTMLDivElement[] = [];

        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            const size = Math.random() * 4 + 2;
            p.style.cssText = `
                position: absolute;
                width: ${size}px; height: ${size}px;
                border-radius: 50%;
                background: ${skills[Math.floor(Math.random() * skills.length)].accentColor};
                opacity: 0;
                pointer-events: none;
            `;
            container.appendChild(p);
            particles.push(p);

            gsap.set(p, {
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
            });

            gsap.to(p, {
                y: `+=${Math.random() * -200 - 100}`,
                x: `+=${Math.random() * 100 - 50}`,
                opacity: Math.random() * 0.4 + 0.1,
                duration: Math.random() * 8 + 6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 4,
            });
        }

        return () => {
            particles.forEach(p => p.remove());
        };
    }, []);

    useGSAP(() => {
        // Section header
        gsap.from('.features-section-tag', {
            y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
        });

        gsap.from('.features-title-word', {
            y: 80, opacity: 0, rotateX: -40,
            stagger: 0.08, duration: 0.8, ease: 'expo.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 78%' }
        });

        gsap.from('.features-subtitle', {
            y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }
        });

        // Terminal preview
        gsap.from('.features-terminal-preview', {
            y: 60, opacity: 0, scale: 0.92, duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: '.features-terminal-preview', start: 'top 85%' }
        });

        // Cards with stagger + 3D entrance
        const cards = gsap.utils.toArray<HTMLElement>('.skill-card-wrapper');
        cards.forEach((card, i) => {
            gsap.from(card, {
                y: 100,
                opacity: 0,
                scale: 0.85,
                rotateX: -15,
                filter: 'blur(8px)',
                duration: 0.9,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
                delay: i * 0.1,
            });
        });

        // Continuous floating animation for icons
        gsap.utils.toArray<HTMLElement>('.skill-icon-3d').forEach((icon, i) => {
            gsap.to(icon, {
                y: -6, duration: 2 + i * 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut',
                delay: i * 0.4,
            });
        });
    }, { scope: containerRef });

    const currentSkill = skills[activeCard ?? 0];

    return (
        <>
            <style>{`
                @property --holo-angle {
                    syntax: '<angle>';
                    initial-value: 0deg;
                    inherits: false;
                }

                @keyframes holoRotate {
                    to { --holo-angle: 360deg; }
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                @keyframes pulseRing {
                    0% { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(2.5); opacity: 0; }
                }

                .skill-card-wrapper {
                    perspective: 1000px;
                    transform-style: preserve-3d;
                }

                .skill-card-inner {
                    position: relative;
                    height: 100%;
                    border-radius: 20px;
                    transform-style: preserve-3d;
                    transition: box-shadow 0.4s ease;
                    will-change: transform;
                    cursor: pointer;
                    overflow: hidden;
                }

                .skill-card-inner::before {
                    content: '';
                    position: absolute;
                    inset: -1px;
                    border-radius: 21px;
                    padding: 1.5px;
                    background: conic-gradient(
                        from var(--holo-angle),
                        transparent 0%,
                        var(--card-accent) 15%,
                        transparent 30%,
                        rgba(255,255,255,0.1) 50%,
                        transparent 70%,
                        var(--card-accent) 85%,
                        transparent 100%
                    );
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    animation: holoRotate 4s linear infinite;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    z-index: 0;
                }

                .skill-card-wrapper:hover .skill-card-inner::before {
                    opacity: 1;
                }

                .skill-card-inner .holo-glow {
                    position: absolute;
                    inset: 0;
                    border-radius: 20px;
                    pointer-events: none;
                    z-index: 1;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .skill-card-wrapper:hover .holo-glow {
                    opacity: 1;
                }

                .skill-card-inner .shimmer-line {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    background-size: 200% 100%;
                    animation: shimmer 3s linear infinite;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: 2;
                }

                .skill-card-wrapper:hover .shimmer-line {
                    opacity: 1;
                }

                .skill-icon-3d {
                    transform-style: preserve-3d;
                    will-change: transform;
                }

                .pulse-ring {
                    position: absolute;
                    inset: -4px;
                    border-radius: 16px;
                    border: 1px solid var(--card-accent);
                    animation: pulseRing 2s ease-out infinite;
                    pointer-events: none;
                }

                .feature-tag {
                    transition: all 0.3s ease;
                }

                .skill-card-wrapper:hover .feature-tag {
                    border-color: var(--card-accent);
                }

                .terminal-tab-btn {
                    position: relative;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-family: var(--font-mono);
                    font-size: 11px;
                    padding: 4px 10px;
                    border-radius: 6px;
                    transition: all 0.25s ease;
                }

                .terminal-tab-btn::after {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    background: var(--primary);
                    border-radius: 2px;
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                }

                .terminal-tab-active::after {
                    width: 100%;
                }

                @media (max-width: 768px) {
                    .skills-card-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .skills-card-grid > * {
                        grid-column: span 1 !important;
                    }
                    .features-terminal-preview {
                        display: none;
                    }
                }

                @media (min-width: 769px) and (max-width: 1024px) {
                    .skills-card-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .skills-card-grid > * {
                        grid-column: span 1 !important;
                    }
                }
            `}</style>

            <section ref={containerRef} style={{
                padding: '140px 0 120px',
                background: 'var(--surface)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Ambient background effects */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(204,122,96,0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(59,130,246,0.03) 0%, transparent 60%)',
                }} />

                {/* Floating particles */}
                <div ref={particleContainerRef} style={{
                    position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
                }} />

                {/* Dot grid */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4,
                    backgroundImage: 'radial-gradient(circle, rgba(204,122,96,0.07) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }} />

                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

                    {/* Section Header */}
                    <div style={{ marginBottom: '72px', textAlign: 'center' }}>
                        <div className="features-section-tag" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '6px 16px', borderRadius: '9999px', marginBottom: '20px',
                            background: 'rgba(204,122,96,0.08)', border: '1px solid rgba(204,122,96,0.15)',
                        }}>
                            <span style={{
                                width: '6px', height: '6px', borderRadius: '50%',
                                background: 'var(--primary)', boxShadow: '0 0 8px rgba(204,122,96,0.5)',
                            }} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--primary)', letterSpacing: '0.08em', fontWeight: 600 }}>
                                READY-TO-DEPLOY SKILLS
                            </span>
                        </div>

                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                            fontWeight: 800,
                            color: 'var(--foreground)',
                            lineHeight: 1.1,
                            maxWidth: '700px',
                            margin: '0 auto 20px',
                            perspective: '600px',
                        }}>
                            {'Marketing Skills Your '.split(' ').map((word, i) => (
                                <span key={i} className="features-title-word" style={{ display: 'inline-block', marginRight: '0.3em' }}>
                                    {word}
                                </span>
                            ))}
                            <span className="features-title-word" style={{
                                display: 'inline-block',
                                background: 'linear-gradient(135deg, var(--primary-light), var(--primary), var(--primary-dark))',
                                backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                backgroundSize: '200% 200%',
                                animation: 'gradientShift 4s ease infinite',
                            }}>AI Agent</span>{' '}
                            <span className="features-title-word" style={{ display: 'inline-block' }}>Masters</span>
                        </h2>

                        <p className="features-subtitle" style={{
                            fontFamily: 'var(--font-mono)', fontSize: '14px',
                            color: 'var(--muted)', maxWidth: '480px', margin: '0 auto',
                            lineHeight: 1.7,
                        }}>
                            Deploy specialized agents that handle your entire marketing stack — from research to execution.
                        </p>
                    </div>

                    {/* Interactive Terminal Preview */}
                    <div className="features-terminal-preview" style={{ marginBottom: '48px' }}>
                        <div className="terminal-card" style={{
                            overflow: 'hidden',
                            boxShadow: '0 20px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.04)',
                        }}>
                            <div className="terminal-card-header">
                                <div className="terminal-dots"><span /><span /><span /></div>
                                <span style={{ color: '#6b7280', fontSize: '11px', marginLeft: '8px' }}>{currentSkill.filename}</span>
                                <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                                    {skills.map((s, i) => (
                                        <button
                                            key={s.id}
                                            onClick={() => setActiveCard(i)}
                                            className={`terminal-tab-btn ${(activeCard ?? 0) === i ? 'terminal-tab-active' : ''}`}
                                            style={{
                                                color: (activeCard ?? 0) === i ? 'var(--primary)' : '#4a4a5a',
                                                backgroundColor: (activeCard ?? 0) === i ? 'rgba(204,122,96,0.1)' : 'transparent',
                                            }}
                                        >
                                            {s.name.split('-')[0]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div style={{ padding: '28px', fontSize: '13px', lineHeight: 2, fontFamily: 'var(--font-mono)', minHeight: '180px' }}>
                                <div style={{ color: 'var(--syntax-comment)', marginBottom: '4px' }}>
                                    {`/** @skill ${currentSkill.name} — ${currentSkill.description} */`}
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    <span style={{ color: 'var(--syntax-keyword)' }}>export default</span>{' '}
                                    <span style={{ color: '#d4d4d8' }}>{'{'}</span>
                                </div>
                                <div style={{ paddingLeft: '20px' }}>
                                    <span style={{ color: '#d4d4d8' }}>name:</span>{' '}
                                    <span style={{ color: 'var(--syntax-string)' }}>&quot;{currentSkill.name}&quot;</span>,
                                </div>
                                <div style={{ paddingLeft: '20px' }}>
                                    <span style={{ color: '#d4d4d8' }}>capabilities:</span>{' '}
                                    <span style={{ color: '#d4d4d8' }}>[</span>
                                    {currentSkill.features.map((f, i) => (
                                        <span key={i}>
                                            <span style={{ color: 'var(--syntax-string)' }}>&quot;{f}&quot;</span>
                                            {i < currentSkill.features.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                    <span style={{ color: '#d4d4d8' }}>],</span>
                                </div>
                                <div><span style={{ color: '#d4d4d8' }}>{'};'}</span></div>
                                <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                                    <span style={{ color: 'var(--cmd-prefix)' }}>$</span>{' '}
                                    <span style={{ color: '#d4d4d8' }}>skill run</span>{' '}
                                    <span style={{ color: currentSkill.accentColor }}>{currentSkill.name.toLowerCase()}</span>
                                </div>
                                <div style={{ color: 'var(--syntax-string)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    ✓ Skill loaded.
                                    <span style={{
                                        display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%',
                                        backgroundColor: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.5)',
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Skill Cards Grid — Equal height, 3 on top, 2 centered below */}
                    <div className="skills-card-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gap: '20px',
                    }}>
                        {skills.map((skill, index) => {
                            const mp = mousePositions[index];
                            const isActive = activeCard === index;

                            // First 3 cards: span 2 cols each (fills 6 cols)
                            // Last 2 cards: span 2 cols each but offset to center (col 2-3 and 4-5)
                            const gridColumn = index < 3
                                ? 'span 2'
                                : index === 3 ? '2 / 4' : '4 / 6';

                            return (
                                <div
                                    key={skill.id}
                                    className="skill-card-wrapper"
                                    style={{ gridColumn }}
                                    onMouseEnter={() => handleCardEnter(index)}
                                >
                                    <div
                                        ref={el => { cardRefs.current[index] = el; }}
                                        className="skill-card-inner"
                                        onMouseMove={(e) => handleCardMove(e, index)}
                                        onMouseLeave={(e) => handleCardLeave(e, index)}
                                        style={{
                                            '--card-accent': skill.accentColor,
                                            background: isActive
                                                ? `linear-gradient(145deg, rgba(30,30,46,0.97), rgba(30,30,46,0.92))`
                                                : 'rgba(255,255,255,0.85)',
                                            border: '1px solid',
                                            borderColor: isActive ? 'transparent' : 'var(--border)',
                                            boxShadow: isActive
                                                ? `0 20px 60px ${skill.accentColor}20, 0 0 0 1px ${skill.accentColor}30, inset 0 1px 0 rgba(255,255,255,0.05)`
                                                : '0 2px 12px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)',
                                        } as React.CSSProperties}
                                    >
                                        {/* Holographic cursor glow */}
                                        <div className="holo-glow" style={{
                                            background: mp
                                                ? `radial-gradient(300px circle at ${mp.x}px ${mp.y}px, ${skill.accentColor}18 0%, transparent 60%)`
                                                : 'none',
                                        }} />

                                        {/* Top shimmer line */}
                                        <div className="shimmer-line" />

                                        {/* Card content */}
                                        <div style={{
                                            padding: '28px 24px',
                                            position: 'relative',
                                            zIndex: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            minHeight: '320px',
                                        }}>
                                            {/* Icon with 3D pop */}
                                            <div style={{ marginBottom: '20px', position: 'relative', display: 'inline-flex' }}>
                                                <div className="skill-icon-3d" style={{
                                                    width: '48px', height: '48px',
                                                    borderRadius: '14px',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '20px',
                                                    background: isActive
                                                        ? `linear-gradient(135deg, ${skill.accentColor}30, ${skill.accentColor}10)`
                                                        : `linear-gradient(135deg, ${skill.accentColor}15, ${skill.accentColor}05)`,
                                                    border: `1px solid ${skill.accentColor}${isActive ? '40' : '20'}`,
                                                    color: skill.accentColor,
                                                    filter: isActive ? `drop-shadow(0 4px 12px ${skill.accentColor}40)` : 'none',
                                                    transition: 'all 0.4s ease',
                                                    position: 'relative',
                                                }}>
                                                    {skill.icon}
                                                    {isActive && <div className="pulse-ring" style={{ '--card-accent': skill.accentColor } as React.CSSProperties} />}
                                                </div>
                                            </div>

                                            {/* Name */}
                                            <h3 style={{
                                                fontFamily: 'var(--font-heading)',
                                                fontSize: '18px',
                                                fontWeight: 700,
                                                color: isActive ? '#ffffff' : 'var(--foreground)',
                                                marginBottom: '8px',
                                                transition: 'color 0.3s ease',
                                                letterSpacing: '-0.01em',
                                            }}>
                                                {skill.name.replace(/-/g, ' ')}
                                            </h3>

                                            {/* Description */}
                                            <p style={{
                                                fontSize: '13.5px',
                                                lineHeight: 1.65,
                                                color: isActive ? '#a89890' : 'var(--muted)',
                                                marginBottom: '20px',
                                                transition: 'color 0.3s ease',
                                                flex: 1,
                                            }}>
                                                {skill.description}
                                            </p>

                                            {/* Feature tags */}
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                                                {skill.features.map((f, i) => (
                                                    <span key={i} className="feature-tag" style={{
                                                        fontFamily: 'var(--font-mono)',
                                                        fontSize: '11px',
                                                        padding: '4px 10px',
                                                        borderRadius: '8px',
                                                        backgroundColor: isActive ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)',
                                                        color: isActive ? `${skill.accentColor}cc` : 'var(--muted)',
                                                        border: `1px solid ${isActive ? `${skill.accentColor}25` : 'transparent'}`,
                                                        transition: 'all 0.3s ease',
                                                    }}>
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Command bar */}
                                            <div style={{
                                                padding: '10px 14px',
                                                borderRadius: '10px',
                                                backgroundColor: isActive ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.03)',
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '12px',
                                                transition: 'all 0.3s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                <div>
                                                    <span style={{ color: isActive ? 'var(--cmd-prefix)' : skill.accentColor, fontSize: '11px' }}>$</span>{' '}
                                                    <span style={{ color: isActive ? '#d4d4d8' : '#6b7280' }}>skill run {skill.name.toLowerCase()}</span>
                                                </div>
                                                <span style={{
                                                    fontSize: '14px',
                                                    color: isActive ? skill.accentColor : 'var(--muted)',
                                                    transition: 'all 0.3s ease',
                                                    transform: isActive ? 'translateX(0)' : 'translateX(-4px)',
                                                    opacity: isActive ? 1 : 0.5,
                                                }}>
                                                    →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Features;
