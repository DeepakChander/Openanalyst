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
    // Connect - puzzle
    'M4.5 9.5a2 2 0 0 1 2-2H9V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2.5h2.5a2 2 0 0 1 2 2V12H17a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2.5v2.5a2 2 0 0 1-2 2H15V18a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2.5H6.5a2 2 0 0 1-2-2V18H7a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H4.5V9.5z',
    // Target
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
    // Lightning
    'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    // Trending
    'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z',
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
            background: '#0A0A0A',
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
                            background: 'radial-gradient(ellipse, rgba(255,107,0,0.25) 0%, transparent 70%)',
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
                            border: '1px solid rgba(255,107,0,0.3)',
                        }} />
                        <div style={{
                            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                            width: 300, height: 70, borderRadius: '50%',
                            border: '1px solid rgba(255,107,0,0.15)',
                        }} />

                        {/* Vertical connection lines */}
                        <div style={{
                            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                            width: 1, height: 260,
                            background: 'linear-gradient(to bottom, rgba(255,107,0,0.5), rgba(255,107,0,0.1))',
                        }} />
                        {/* Diagonal lines */}
                        <div style={{
                            position: 'absolute', top: 20, left: '50%', transformOrigin: 'bottom center',
                            width: 1, height: 240, transform: 'translateX(-50%) rotate(-25deg)',
                            background: 'linear-gradient(to bottom, rgba(255,107,0,0.3), transparent)',
                        }} />
                        <div style={{
                            position: 'absolute', top: 20, left: '50%', transformOrigin: 'bottom center',
                            width: 1, height: 240, transform: 'translateX(-50%) rotate(25deg)',
                            background: 'linear-gradient(to bottom, rgba(255,107,0,0.3), transparent)',
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
                                    background: activeStep === i ? 'rgba(255,107,0,0.15)' : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${activeStep === i ? '#FF6B00' : 'rgba(255,255,255,0.08)'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.5s ease',
                                    boxShadow: activeStep === i ? '0 0 20px rgba(255,107,0,0.3)' : 'none',
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill={activeStep === i ? '#FF6B00' : 'rgba(255,255,255,0.3)'} style={{ transition: 'fill 0.5s ease' }}>
                                        <path d={iconPaths[i]} />
                                    </svg>
                                </div>
                            );
                        })}

                        {/* Horizontal dashed line */}
                        <div style={{
                            position: 'absolute', top: 200, left: -40, right: -40,
                            height: 1, borderTop: '1px dashed rgba(255,107,0,0.2)',
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
                            fontWeight: 800, color: '#fff', letterSpacing: '-0.03em',
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
                                background: activeStep === i ? '#FF6B00' : 'rgba(255,255,255,0.15)',
                                transition: 'all 0.4s ease',
                                boxShadow: activeStep === i ? '0 0 12px rgba(255,107,0,0.5)' : 'none',
                            }} />

                            {/* Vertical connector line */}
                            {i < steps.length - 1 && (
                                <div style={{
                                    position: 'absolute', left: 6, top: 24,
                                    width: 1, height: 'calc(40vh - 10px)',
                                    borderLeft: '1px dashed rgba(255,255,255,0.08)',
                                }} />
                            )}

                            <p style={{
                                fontFamily: 'var(--font-mono)', fontSize: 12,
                                color: 'rgba(255,255,255,0.4)', marginBottom: 8,
                                letterSpacing: '0.05em',
                            }}>Step {step.num}</p>

                            <h3 style={{
                                fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                                fontWeight: 800, color: activeStep === i ? '#fff' : 'rgba(255,255,255,0.5)',
                                letterSpacing: '-0.02em', marginBottom: 16,
                                transition: 'color 0.4s ease',
                                lineHeight: 1.2,
                            }}>{step.title}</h3>

                            <p style={{
                                fontSize: 15, color: activeStep === i ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
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
