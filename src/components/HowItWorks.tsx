'use client';

import React, { useRef, useState } from 'react';
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

/* Step icons */
const iconPaths = [
    // Globe - connect
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
    // Bullseye - goals
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-14a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
    // Rocket - activate
    'M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33.26zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83L11.17 17zm6.48-3.7c-.47.47-1.15.68-1.81.55l-1.33-.26.76-3.1 3.65-3.65c.59.97 1.1 2.63.7 3.97-.12.39-.31.76-.58 1.08l-1.39 1.41zM7.25 14c-.37.58-.57 1.25-.57 1.95 0 1.02.41 1.94 1.08 2.61.67.67 1.59 1.08 2.61 1.08.7 0 1.37-.2 1.95-.57l-5.07-5.07z',
    // Chart trending - results
    'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z',
];

/* Marketing-related decorative icons (12 total) */
const marketingIcons = [
    // Email marketing
    'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z',
    // Social media share
    'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z',
    // Ad campaign / megaphone
    'M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1l5 3V6L5 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z',
    // Analytics/pie chart
    'M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2 0v9h9c-.47-4.69-4.24-8.46-9-9zm0 11v9c4.75-.54 8.53-4.31 9-9h-9z',
    // Content/document
    'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
    // SEO/search
    'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
    // Users/audience
    'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    // Lightning/automation
    'M7 2v11h3v9l7-12h-4l4-8z',
    // Calendar/scheduling
    'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z',
    // Dollar/revenue
    'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z',
    // Funnel/conversion
    'M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z',
    // Growth chart
    'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
];

const HowItWorks: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    useGSAP(() => {
        if (visualRef.current && sectionRef.current) {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                pin: visualRef.current,
                pinSpacing: false,
            });
        }

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

    /* Positions for the 12 decorative marketing icons in the visual */
    const decoPositions = [
        { top: 15, left: '18%' },
        { top: 15, left: '82%' },
        { top: 55, left: '8%' },
        { top: 55, left: '92%' },
        { top: 100, left: '15%' },
        { top: 100, left: '85%' },
        { top: 145, left: '25%' },
        { top: 145, left: '75%' },
        { top: 185, left: '10%' },
        { top: 185, left: '90%' },
        { top: 220, left: '22%' },
        { top: 220, left: '78%' },
    ];

    return (
        <section id="how-it-works" ref={sectionRef} style={{
            background: 'var(--bg-white)',
            position: 'relative',
            minHeight: '300vh',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', position: 'relative' }}>
                {/* Left — Sticky light visual */}
                <div ref={visualRef} className="hiw-visual-wrap" style={{
                    width: '45%', height: '100vh',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', flexShrink: 0,
                    background: 'var(--bg-white)',
                    borderRight: '1px solid var(--border)',
                }}>
                    {/* Animated gradient background */}
                    <div className="hiw-gradient-bg" style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
                    }}>
                        {/* Mesh gradient orb 1 */}
                        <div className="hiw-orb-1" style={{
                            position: 'absolute', top: '10%', left: '20%',
                            width: 300, height: 300, borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
                            filter: 'blur(60px)',
                        }} />
                        {/* Mesh gradient orb 2 */}
                        <div className="hiw-orb-2" style={{
                            position: 'absolute', bottom: '15%', right: '10%',
                            width: 250, height: 250, borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
                            filter: 'blur(50px)',
                        }} />
                        {/* Mesh gradient orb 3 */}
                        <div className="hiw-orb-3" style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            width: 400, height: 400, borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(255,133,51,0.04) 0%, transparent 60%)',
                            filter: 'blur(80px)',
                        }} />
                    </div>

                    {/* Grid pattern overlay */}
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        backgroundImage: 'linear-gradient(rgba(255,107,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.06) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 80%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 80%)',
                    }} />

                    <div style={{ position: 'relative', width: 380, height: 500 }}>
                        {/* Vertical main line with animated gradient */}
                        <div style={{
                            position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
                            width: 2, height: 320,
                        }}>
                            <div className="hiw-line-flow" style={{
                                width: '100%', height: '100%',
                                background: 'linear-gradient(to bottom, rgba(255,107,0,0.5), rgba(255,107,0,0.1), transparent)',
                            }} />
                        </div>

                        {/* Diagonal connection lines - 6 total */}
                        {[-40, -25, -12, 12, 25, 40].map((angle, idx) => (
                            <div key={idx} style={{
                                position: 'absolute', top: -10, left: '50%', transformOrigin: 'bottom center',
                                width: 1, height: 300, transform: `translateX(-50%) rotate(${angle}deg)`,
                                background: `linear-gradient(to bottom, rgba(255,107,0,${idx % 2 === 0 ? 0.18 : 0.08}), transparent 80%)`,
                            }} />
                        ))}

                        {/* 4 Main step icon boxes */}
                        {steps.map((_, i) => {
                            const positions = [
                                { top: -5, left: '50%', ml: -24 },
                                { top: 65, left: '28%', ml: -24 },
                                { top: 65, left: '72%', ml: -24 },
                                { top: 140, left: '50%', ml: -24 },
                            ];
                            const pos = positions[i];
                            const isActive = activeStep === i;
                            return (
                                <div key={i} style={{
                                    position: 'absolute', top: pos.top, left: pos.left, marginLeft: pos.ml,
                                    width: 48, height: 48, borderRadius: 12,
                                    background: isActive
                                        ? 'linear-gradient(135deg, rgba(255,107,0,0.12), rgba(255,133,51,0.06))'
                                        : 'var(--bg-white)',
                                    border: `1.5px solid ${isActive ? 'rgba(255,107,0,0.5)' : 'var(--border)'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                                    boxShadow: isActive
                                        ? '0 0 24px rgba(255,107,0,0.15), 0 4px 16px rgba(255,107,0,0.08)'
                                        : 'var(--shadow-sm)',
                                    zIndex: 3,
                                }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24"
                                        fill={isActive ? '#FF6B00' : 'rgba(15,23,42,0.15)'}
                                        style={{ transition: 'fill 0.5s ease', filter: isActive ? 'drop-shadow(0 0 4px rgba(255,107,0,0.3))' : 'none' }}>
                                        <path d={iconPaths[i]} />
                                    </svg>
                                </div>
                            );
                        })}

                        {/* 12 Decorative marketing icon boxes */}
                        {decoPositions.map((pos, idx) => {
                            const isNear = Math.abs(idx - activeStep * 3) < 3;
                            return (
                                <div key={`d-${idx}`} style={{
                                    position: 'absolute', top: pos.top, left: pos.left,
                                    transform: 'translateX(-50%)',
                                    width: 34, height: 34, borderRadius: 8,
                                    background: isNear ? 'rgba(255,107,0,0.06)' : 'var(--bg-surface)',
                                    border: `1px solid ${isNear ? 'rgba(255,107,0,0.2)' : 'var(--border)'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
                                    boxShadow: isNear ? '0 2px 8px rgba(255,107,0,0.06)' : 'var(--shadow-xs)',
                                    zIndex: 2,
                                }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24"
                                        fill={isNear ? 'rgba(255,107,0,0.6)' : 'rgba(15,23,42,0.12)'}
                                        style={{ transition: 'fill 0.6s ease' }}>
                                        <path d={marketingIcons[idx]} />
                                    </svg>
                                </div>
                            );
                        })}

                        {/* Horizontal dashed line with gradient */}
                        <div style={{
                            position: 'absolute', top: 260, left: -60, right: -60,
                            height: 1,
                        }}>
                            <div style={{
                                width: '100%', height: '100%',
                                background: 'linear-gradient(to right, transparent, rgba(255,107,0,0.25), transparent)',
                            }} />
                            <div style={{
                                position: 'absolute', top: -1, left: 0, right: 0, height: 3,
                                borderTop: '1px dashed rgba(255,107,0,0.2)',
                            }} />
                        </div>

                        {/* Diamond endpoints with glow */}
                        {[-68, undefined].map((leftVal, idx) => (
                            <div key={idx} style={{
                                position: 'absolute', top: 255,
                                ...(idx === 0 ? { left: -68 } : { right: -68 }),
                                width: 12, height: 12, transform: 'rotate(45deg)',
                                background: 'linear-gradient(135deg, #FF6B00, #FF8533)',
                                boxShadow: '0 0 8px rgba(255,107,0,0.3)',
                            }} />
                        ))}

                        {/* Central diamond shape */}
                        <div className="hiw-diamond" style={{
                            position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%) rotate(45deg)',
                            width: 100, height: 100, borderRadius: 20,
                            border: '2px solid rgba(255,107,0,0.5)',
                            background: 'linear-gradient(135deg, rgba(255,107,0,0.1) 0%, rgba(255,107,0,0.03) 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 40px rgba(255,107,0,0.1), 0 8px 32px rgba(255,107,0,0.06), inset 0 0 20px rgba(255,107,0,0.05)',
                            zIndex: 4,
                        }}>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="#FF6B00" style={{
                                transform: 'rotate(-45deg)',
                                filter: 'drop-shadow(0 0 4px rgba(255,107,0,0.3))',
                                transition: 'all 0.5s ease',
                            }}>
                                <path d={iconPaths[activeStep]} />
                            </svg>
                        </div>

                        {/* Orbiting ellipse rings */}
                        {[
                            { bottom: 35, w: 300, h: 70, opacity: 0.15 },
                            { bottom: 20, w: 370, h: 85, opacity: 0.08 },
                            { bottom: 8, w: 420, h: 100, opacity: 0.04 },
                        ].map((ring, i) => (
                            <div key={`ring-${i}`} style={{
                                position: 'absolute', bottom: ring.bottom, left: '50%',
                                transform: 'translateX(-50%)',
                                width: ring.w, height: ring.h, borderRadius: '50%',
                                border: `1px solid rgba(255,107,0,${ring.opacity})`,
                            }} />
                        ))}

                        {/* Bottom ambient glow */}
                        <div style={{
                            position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)',
                            width: 350, height: 200, borderRadius: '50%',
                            background: 'radial-gradient(ellipse, rgba(255,107,0,0.08) 0%, transparent 60%)',
                            filter: 'blur(50px)', pointerEvents: 'none',
                        }} />

                        {/* Step indicator */}
                        <div style={{
                            position: 'absolute', bottom: -35, left: '50%', transform: 'translateX(-50%)',
                            fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF6B00',
                            letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                            textShadow: '0 0 10px rgba(255,107,0,0.3)',
                        }}>
                            Step {steps[activeStep].num} of 04
                        </div>
                    </div>
                </div>

                {/* Right — Scroll cards (light) */}
                <div style={{ width: '55%', padding: '120px 0 120px 60px' }}>
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

                    {steps.map((step, i) => (
                        <div key={i} className={`hiw-step-${i} hiw-step-card`} style={{
                            marginBottom: i < steps.length - 1 ? '40vh' : 120,
                            position: 'relative',
                            paddingLeft: 40,
                        }}>
                            <div style={{
                                position: 'absolute', left: 0, top: 6,
                                width: 14, height: 14, borderRadius: '50%',
                                background: activeStep === i ? '#FF6B00' : 'var(--border)',
                                transition: 'all 0.4s ease',
                                boxShadow: activeStep === i ? '0 0 12px rgba(255,107,0,0.3)' : 'none',
                            }} />

                            {i < steps.length - 1 && (
                                <div style={{
                                    position: 'absolute', left: 6, top: 24,
                                    width: 1, height: 'calc(40vh - 10px)',
                                    borderLeft: '1px dashed var(--border)',
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
                                fontSize: 15, color: activeStep === i ? 'var(--text-secondary)' : 'var(--text-muted)',
                                lineHeight: 1.7, maxWidth: 500,
                                transition: 'color 0.4s ease',
                            }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                /* Animated gradient orbs */
                .hiw-orb-1 {
                    animation: hiwFloat1 8s ease-in-out infinite;
                }
                .hiw-orb-2 {
                    animation: hiwFloat2 10s ease-in-out infinite;
                }
                .hiw-orb-3 {
                    animation: hiwFloat3 12s ease-in-out infinite;
                }
                @keyframes hiwFloat1 {
                    0%, 100% { transform: translate(0, 0); opacity: 0.8; }
                    33% { transform: translate(30px, -20px); opacity: 1; }
                    66% { transform: translate(-20px, 15px); opacity: 0.6; }
                }
                @keyframes hiwFloat2 {
                    0%, 100% { transform: translate(0, 0); opacity: 0.7; }
                    50% { transform: translate(-25px, -30px); opacity: 1; }
                }
                @keyframes hiwFloat3 {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
                    50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
                }

                /* Line flow animation */
                .hiw-line-flow {
                    animation: hiwLineFlow 3s ease-in-out infinite;
                }
                @keyframes hiwLineFlow {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }

                /* Diamond pulse */
                .hiw-diamond {
                    animation: hiwDiamondPulse 4s ease-in-out infinite;
                }
                @keyframes hiwDiamondPulse {
                    0%, 100% { box-shadow: 0 0 40px rgba(255,107,0,0.1), 0 8px 32px rgba(255,107,0,0.06), inset 0 0 20px rgba(255,107,0,0.05); }
                    50% { box-shadow: 0 0 60px rgba(255,107,0,0.15), 0 8px 48px rgba(255,107,0,0.08), inset 0 0 30px rgba(255,107,0,0.08); }
                }

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
