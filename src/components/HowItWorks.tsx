'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: '01', title: 'Connect', subtitle: 'Your Stack',
        desc: 'Link Gmail, Slack, HubSpot, and 24 more tools in 60 seconds.',
        color: '#FF6B00',
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4m0 14v4M4.22 4.22l2.83 2.83m8.48 8.48l2.83 2.83M1 12h4m14 0h4M4.22 19.78l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>,
    },
    {
        num: '02', title: 'Set', subtitle: 'Your Goals',
        desc: 'Tell agents what to optimize — revenue, leads, or custom KPIs.',
        color: '#8B5CF6',
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    },
    {
        num: '03', title: 'Agents', subtitle: 'Activate',
        desc: '42 AI agents start working immediately — planning, creating, optimizing.',
        color: '#10B981',
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/></svg>,
    },
    {
        num: '04', title: 'Watch', subtitle: 'Results Grow',
        desc: 'Real-time ROI tracking and continuous optimization. 340% avg ROI.',
        color: '#F59E0B',
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
    },
];

const HowItWorks: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState<number | null>(null);

    useGSAP(() => {
        gsap.fromTo('.hiw-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
        gsap.fromTo('.hiw-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
        gsap.fromTo('.hiw-card', { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.7, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.hiw-grid', start: 'top 85%' } });
        gsap.fromTo('.hiw-line', { scaleX: 0 }, { scaleX: 1, stagger: 0.2, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.hiw-grid', start: 'top 80%' } });
        gsap.fromTo('.hiw-dot', { scale: 0 }, { scale: 1, stagger: 0.15, duration: 0.4, ease: 'back.out(2)', scrollTrigger: { trigger: '.hiw-grid', start: 'top 82%' } });
    }, { scope: sectionRef });

    return (
        <section id="how-it-works" ref={sectionRef} style={{
            padding: 'var(--space-section-sm) 24px',
            background: 'var(--bg-primary)',
        }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <p className="hiw-label label-mono" style={{ marginBottom: 12 }}>How It Works</p>
                    <h2 className="hiw-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                        fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)',
                    }}>
                        From zero to <span className="text-gradient">results</span> in minutes
                    </h2>
                </div>

                {/* 4 horizontal cards with connector dots and lines */}
                <div className="hiw-grid" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
                    maxWidth: 1060, margin: '0 auto', position: 'relative',
                }}>
                    {steps.map((step, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                            {/* Connector line */}
                            {i > 0 && (
                                <div className="hiw-line" style={{
                                    position: 'absolute', top: 20, left: '-50%', right: '50%', height: 2,
                                    background: `linear-gradient(90deg, ${steps[i - 1].color}30, ${step.color}30)`,
                                    transformOrigin: 'left', zIndex: 0,
                                }} />
                            )}

                            {/* Dot with icon */}
                            <div className="hiw-dot" style={{
                                width: 42, height: 42, borderRadius: '50%',
                                background: hovered === i ? step.color : 'var(--bg-white)',
                                border: `2px solid ${hovered === i ? step.color : step.color + '25'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: 16, position: 'relative', zIndex: 1,
                                transition: 'all 0.3s var(--ease-out)',
                                boxShadow: hovered === i ? `0 0 16px ${step.color}30` : 'var(--shadow-sm)',
                                color: hovered === i ? '#fff' : step.color,
                            }}>
                                {step.icon}
                            </div>

                            {/* Card */}
                            <div className="hiw-card" style={{
                                padding: '20px 16px', borderRadius: 'var(--radius-lg)',
                                background: 'var(--bg-white)', border: '1px solid var(--border)',
                                boxShadow: 'var(--shadow-sm)', textAlign: 'center',
                                width: '100%', height: '100%',
                                transition: 'all 0.3s var(--ease-out)',
                                transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
                                borderColor: hovered === i ? `${step.color}25` : 'var(--border)',
                            }}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <span style={{
                                    fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
                                    color: step.color, letterSpacing: '0.1em', display: 'block', marginBottom: 6,
                                }}>STEP {step.num}</span>
                                <h3 style={{
                                    fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 800,
                                    color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.2,
                                }}>
                                    {step.title} <span style={{ color: step.color }}>{step.subtitle}</span>
                                </h3>
                                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .hiw-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
                    .hiw-line { display: none !important; }
                }
                @media (max-width: 480px) {
                    .hiw-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
};

export default HowItWorks;
