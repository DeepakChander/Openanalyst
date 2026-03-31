'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: '01', title: 'Connect Your Stack',
        desc: 'Link Gmail, Slack, HubSpot, and 24 more tools in 60 seconds. Our agents plug into your existing workflow without any code changes.',
        color: '#FF6B00',
    },
    {
        num: '02', title: 'Set Your Goals',
        desc: 'Tell agents what to optimize — revenue, leads, or custom KPIs. Using your data, OpenAnalyst generates automated strategies that cover 95%+ of your marketing needs.',
        color: '#FF8533',
    },
    {
        num: '03', title: 'Agents Activate',
        desc: '42 AI agents start working immediately — planning, creating, optimizing. The platform continuously evaluates performance and surfaces opportunities before your competitors do.',
        color: '#FFB366',
    },
    {
        num: '04', title: 'Watch Results Grow',
        desc: 'Real-time ROI tracking and continuous optimization. When something shifts, OpenAnalyst alerts the right owners and takes corrective action. Every cycle strengthens future performance.',
        color: '#FF6B00',
    },
];

const iconPaths = [
    // Globe - connect integrations
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
    // Bullseye - set goals
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-14a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
    // Rocket - agents activate
    'M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33.26zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83L11.17 17zm6.48-3.7c-.47.47-1.15.68-1.81.55l-1.33-.26.76-3.1 3.65-3.65c.59.97 1.1 2.63.7 3.97-.12.39-.31.76-.58 1.08l-1.39 1.41zM7.25 14c-.37.58-.57 1.25-.57 1.95 0 1.02.41 1.94 1.08 2.61.67.67 1.59 1.08 2.61 1.08.7 0 1.37-.2 1.95-.57l-5.07-5.07z',
    // Chart trending up - results
    'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z',
];

const HowItWorks: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    useGSAP(() => {
        // Pin the left visual
        if (visualRef.current && sectionRef.current) {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                pin: visualRef.current,
                pinSpacing: false,
            });
        }

        // Track active step
        steps.forEach((_, i) => {
            const card = document.querySelector(`.hiw-step-${i}`);
            if (card) {
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 60%',
                    end: 'bottom 40%',
                    onEnter: () => setActiveStep(i),
                    onEnterBack: () => setActiveStep(i),
                });
            }
        });

        // Animate cards on scroll
        gsap.utils.toArray<HTMLElement>('.hiw-step-card').forEach((card) => {
            gsap.fromTo(card,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 80%' },
                }
            );
        });
    }, { scope: sectionRef });

    return (
        <section id="how-it-works" ref={sectionRef} style={{
            background: 'var(--bg-primary)',
            position: 'relative',
            minHeight: '300vh',
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', position: 'relative' }}>
                {/* Left — Sticky visual */}
                <div ref={visualRef} className="hiw-visual-wrap" style={{
                    width: '45%', height: '100vh',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', flexShrink: 0,
                }}>
                    <div style={{ position: 'relative', width: 320, height: 400 }}>
                        {/* Glowing orb */}
                        <div style={{
                            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                            width: 240, height: 120, borderRadius: '50%',
                            background: 'radial-gradient(ellipse, rgba(255,107,0,0.12) 0%, transparent 70%)',
                            filter: 'blur(40px)',
                        }} />

                        {/* Central diamond shape */}
                        <div style={{
                            position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%) rotate(45deg)',
                            width: 80, height: 80, borderRadius: 16,
                            border: '2px solid #FF6B00',
                            background: 'rgba(255,107,0,0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF6B00" style={{ transform: 'rotate(-45deg)' }}>
                                <path d={iconPaths[activeStep]} />
                            </svg>
                        </div>

                        {/* Orbiting ellipse rings */}
                        <div style={{
                            position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
                            width: 260, height: 60, borderRadius: '50%',
                            border: '1px solid rgba(255,107,0,0.25)',
                        }} />
                        <div style={{
                            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                            width: 300, height: 70, borderRadius: '50%',
                            border: '1px solid rgba(255,107,0,0.12)',
                        }} />

                        {/* Vertical connection lines */}
                        <div style={{
                            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                            width: 1, height: 260,
                            background: 'linear-gradient(to bottom, rgba(255,107,0,0.4), rgba(255,107,0,0.08))',
                        }} />
                        {/* Diagonal lines */}
                        <div style={{
                            position: 'absolute', top: 20, left: '50%', transformOrigin: 'bottom center',
                            width: 1, height: 240, transform: 'translateX(-50%) rotate(-25deg)',
                            background: 'linear-gradient(to bottom, rgba(255,107,0,0.2), transparent)',
                        }} />
                        <div style={{
                            position: 'absolute', top: 20, left: '50%', transformOrigin: 'bottom center',
                            width: 1, height: 240, transform: 'translateX(-50%) rotate(25deg)',
                            background: 'linear-gradient(to bottom, rgba(255,107,0,0.2), transparent)',
                        }} />

                        {/* Floating icon boxes */}
                        {steps.map((step, i) => {
                            const positions = [
                                { top: 20, left: '50%', ml: -20 },
                                { top: 80, left: '25%', ml: -20 },
                                { top: 80, left: '75%', ml: -20 },
                                { top: 140, left: '50%', ml: -20 },
                            ];
                            const pos = positions[i];
                            return (
                                <div key={i} style={{
                                    position: 'absolute', top: pos.top, left: pos.left, marginLeft: pos.ml,
                                    width: 40, height: 40, borderRadius: 8,
                                    background: activeStep === i ? 'rgba(255,107,0,0.1)' : 'var(--bg-white)',
                                    border: `1px solid ${activeStep === i ? '#FF6B00' : 'var(--border)'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.5s ease',
                                    boxShadow: activeStep === i ? '0 0 20px rgba(255,107,0,0.3)' : 'none',
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill={activeStep === i ? '#FF6B00' : 'rgba(0,0,0,0.2)'} style={{ transition: 'fill 0.5s ease' }}>
                                        <path d={iconPaths[i]} />
                                    </svg>
                                </div>
                            );
                        })}

                        {/* Horizontal dashed line */}
                        <div style={{
                            position: 'absolute', top: 200, left: -40, right: -40,
                            height: 1, borderTop: '1px dashed rgba(255,107,0,0.25)',
                        }} />
                        {/* Diamond endpoints */}
                        <div style={{
                            position: 'absolute', top: 196, left: -48,
                            width: 10, height: 10, transform: 'rotate(45deg)',
                            background: '#FF6B00',
                        }} />
                        <div style={{
                            position: 'absolute', top: 196, right: -48,
                            width: 10, height: 10, transform: 'rotate(45deg)',
                            background: '#FF6B00',
                        }} />

                        {/* Step indicator */}
                        <div style={{
                            position: 'absolute', bottom: -50, left: '50%', transform: 'translateX(-50%)',
                            fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF6B00',
                            letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                        }}>
                            Step {steps[activeStep].num} of 04
                        </div>
                    </div>
                </div>

                {/* Right — Scroll cards */}
                <div style={{ width: '55%', padding: '120px 0 120px 60px' }}>
                    {/* Section header */}
                    <div style={{ marginBottom: 80 }}>
                        <p style={{
                            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            color: '#FF6B00', marginBottom: 16,
                        }}>How It Works</p>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
                            fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                        }}>
                            From zero to <span style={{
                                fontStyle: 'italic',
                                background: 'linear-gradient(135deg, #FF8533, #FF6B00)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            }}>results</span> in minutes
                        </h2>
                    </div>

                    {/* Step cards */}
                    {steps.map((step, i) => (
                        <div key={i} className={`hiw-step-${i} hiw-step-card`} style={{
                            marginBottom: i < steps.length - 1 ? '40vh' : 120,
                            position: 'relative',
                            paddingLeft: 40,
                        }}>
                            {/* Dot indicator */}
                            <div style={{
                                position: 'absolute', left: 0, top: 6,
                                width: 14, height: 14, borderRadius: '50%',
                                background: activeStep === i ? '#FF6B00' : 'rgba(0,0,0,0.1)',
                                transition: 'all 0.4s ease',
                                boxShadow: activeStep === i ? '0 0 12px rgba(255,107,0,0.5)' : 'none',
                            }} />

                            {/* Vertical connector line */}
                            {i < steps.length - 1 && (
                                <div style={{
                                    position: 'absolute', left: 6, top: 24,
                                    width: 1, height: 'calc(40vh - 10px)',
                                    borderLeft: '1px dashed rgba(0,0,0,0.1)',
                                }} />
                            )}

                            <p style={{
                                fontFamily: 'var(--font-mono)', fontSize: 12,
                                color: 'var(--text-muted)', marginBottom: 8,
                                letterSpacing: '0.05em',
                            }}>Step {step.num}</p>

                            <h3 style={{
                                fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                                fontWeight: 800, color: activeStep === i ? 'var(--text-primary)' : 'var(--text-muted)',
                                letterSpacing: '-0.02em', marginBottom: 16,
                                transition: 'color 0.4s ease',
                                lineHeight: 1.2,
                            }}>{step.title}</h3>

                            <p style={{
                                fontSize: 15, color: activeStep === i ? 'var(--text-secondary)' : 'var(--text-faint)',
                                lineHeight: 1.7, maxWidth: 500,
                                transition: 'color 0.4s ease',
                            }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile responsive */}
            <style>{`
                @media (max-width: 900px) {
                    .hiw-visual-wrap { display: none !important; }
                    #how-it-works > div { display: block !important; }
                    #how-it-works > div > div:last-child { width: 100% !important; padding: 80px 24px !important; }
                }
            `}</style>
        </section>
    );
};

export default HowItWorks;
