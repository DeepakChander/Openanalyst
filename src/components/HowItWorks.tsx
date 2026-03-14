'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Cards stagger in from below, one at a time on scroll
        const cards = gsap.utils.toArray<HTMLElement>('.hiw-card');
        cards.forEach((card, i) => {
            gsap.from(card, {
                y: 80,
                opacity: 0,
                scale: 0.95,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                },
                delay: i * 0.1,
            });
        });

        // Progress line animation
        gsap.from('.hiw-progress-fill', {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.hiw-progress-bar',
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
        });

        // Step dots stagger
        gsap.from('.hiw-step-dot', {
            scale: 0,
            opacity: 0,
            stagger: 0.2,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
                trigger: '.hiw-progress-bar',
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
        });

        // Converging icons
        gsap.utils.toArray<HTMLElement>('.converge-icon').forEach((icon) => {
            gsap.to(icon, {
                x: 0, y: 0, opacity: 1,
                duration: 2, ease: 'power2.out',
                repeat: -1, repeatDelay: 1.5, yoyo: true,
            });
        });

        // Typing animation
        const lines = gsap.utils.toArray<HTMLElement>('.type-line');
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        lines.forEach((line, i) => {
            tl.fromTo(line, { width: 0, opacity: 1 }, { width: '100%', duration: 0.8, ease: 'steps(20)' }, i * 0.6);
        });

        // Counters
        gsap.utils.toArray<HTMLElement>('.deploy-counter').forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target') || '0');
            gsap.fromTo(counter, { innerText: '0' }, {
                innerText: target, duration: 2.5, ease: 'power2.out', snap: { innerText: 1 },
                scrollTrigger: { trigger: counter, start: 'top 90%', once: true },
            });
        });

        // Bars
        gsap.utils.toArray<HTMLElement>('.deploy-bar-fill').forEach((bar) => {
            const pct = bar.getAttribute('data-pct') || '0';
            gsap.fromTo(bar, { width: '0%' }, {
                width: `${pct}%`, duration: 1.5, ease: 'power2.out',
                scrollTrigger: { trigger: bar, start: 'top 90%', once: true },
            });
        });
    }, { scope: sectionRef });

    const integrationIcons = [
        { name: 'Gmail', src: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg', startX: -90, startY: -60 },
        { name: 'Slack', src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg', startX: 100, startY: -40 },
        { name: 'HubSpot', src: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png', startX: -80, startY: 70 },
    ];

    const terminalLines = [
        { prompt: true, text: 'agent configure --mode auto' },
        { prompt: false, text: '→ Analyzing marketing channels...' },
        { prompt: false, text: '→ Setting budget allocation: $5,000' },
        { prompt: false, text: '→ Optimizing for: engagement, ROI' },
        { prompt: false, text: '✓ Agent configured. Ready to deploy.' },
    ];

    const metrics = [
        { label: 'Campaigns', value: 12, suffix: '', color: 'var(--rust-light)' },
        { label: 'ROI', value: 340, suffix: '%', color: '#2ecc71' },
        { label: 'Reach', value: 48, suffix: 'K', color: '#3b82f6' },
    ];

    const channelBars = [
        { label: 'Email', pct: 78, color: 'var(--rust-light)' },
        { label: 'Social', pct: 92, color: '#2ecc71' },
        { label: 'Search', pct: 65, color: '#3b82f6' },
    ];

    return (
        <section id="how-it-works" ref={sectionRef} style={{
            background: 'var(--bg-ivory)', position: 'relative', overflow: 'hidden',
            padding: '100px 24px 80px',
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)',
                    marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>How It Works</p>
                <h2 style={{
                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                    fontWeight: 700, color: 'var(--text-dark)', marginBottom: '10px', lineHeight: 1.15,
                }}>
                    Three Steps to{' '}
                    <span style={{
                        background: 'linear-gradient(135deg, var(--rust), var(--rust-light))',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>AI Marketing</span>
                </h2>
                <p style={{
                    fontSize: '15px', color: 'var(--text-muted)', maxWidth: '420px',
                    margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.6,
                }}>Go from zero to deployed AI agent in under 60 seconds.</p>
            </div>

            {/* Animated step progress bar */}
            <div className="hiw-progress-bar" style={{
                maxWidth: '700px', margin: '0 auto 48px',
                display: 'flex', alignItems: 'center', padding: '0 20px',
            }}>
                {[
                    { num: '01', label: 'Connect' },
                    { num: '02', label: 'Configure' },
                    { num: '03', label: 'Deploy' },
                ].map((step, i) => (
                    <React.Fragment key={i}>
                        <div className="hiw-step-dot" style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flexShrink: 0,
                        }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #FF6B00, #FF8533)',
                                color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700,
                                boxShadow: '0 4px 16px rgba(255,107,0,0.25)',
                            }}>{step.num}</div>
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--rust)',
                                textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600,
                            }}>{step.label}</span>
                        </div>
                        {i < 2 && (
                            <div style={{ flex: 1, height: '2px', background: 'rgba(255,107,0,0.08)', position: 'relative', margin: '0 12px', marginBottom: '20px' }}>
                                <div className="hiw-progress-fill" style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(90deg, #FF6B00, #FF8533)',
                                    borderRadius: '2px',
                                }} />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* 3-column centered grid */}
            <div style={{
                maxWidth: '1140px', margin: '0 auto',
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px',
            }}>
                {/* Card 1: Connect */}
                <div className="hiw-card" style={cardStyle}>
                    <div style={cardInner}>
                        <h3 style={cardTitle}>Connect Your Stack</h3>
                        <p style={cardDesc}>
                            Link your marketing stack in 60 seconds. Gmail, Slack, HubSpot, and 23 more integrations.
                        </p>
                        <div style={{
                            flex: 1, position: 'relative',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            minHeight: '180px',
                        }}>
                            <div style={{
                                width: '56px', height: '56px', borderRadius: '16px',
                                background: 'linear-gradient(135deg, #FF6B00, #FF8533)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 8px 32px rgba(255,107,0,0.25)', zIndex: 2, position: 'relative',
                            }}>
                                <img src="/images/logo.png" alt="OpenAnalyst" width={36} height={36} style={{ objectFit: 'contain' }} />
                            </div>
                            {[80, 130, 170].map((r, i) => (
                                <div key={r} style={{
                                    position: 'absolute', width: `${r}px`, height: `${r}px`,
                                    borderRadius: '50%', border: `1px solid rgba(255,107,0,${0.15 - i * 0.04})`, pointerEvents: 'none',
                                }} />
                            ))}
                            {integrationIcons.map((icon) => (
                                <div key={icon.name} className="converge-icon" style={{
                                    position: 'absolute',
                                    transform: `translate(${icon.startX}px, ${icon.startY}px)`,
                                    opacity: 0.4, width: '42px', height: '42px', borderRadius: '12px',
                                    background: '#ffffff', border: '1px solid var(--border-light)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)', willChange: 'transform, opacity',
                                }}>
                                    <img src={icon.src} alt={icon.name} width={24} height={24} loading="lazy" style={{ objectFit: 'contain' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Card 2: Configure */}
                <div className="hiw-card" style={cardStyle}>
                    <div style={cardInner}>
                        <h3 style={cardTitle}>Set Your Strategy</h3>
                        <p style={cardDesc}>
                            Tell your AI agent what to optimize. Set goals, channels, budget, and let it build your strategy.
                        </p>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{
                                width: '100%', borderRadius: '14px',
                                background: '#0c0a09', border: '1px solid rgba(255,255,255,0.08)',
                                overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                            }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                                    background: 'rgba(0,0,0,0.3)',
                                }}>
                                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ff5f57' }} />
                                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#febc2e' }} />
                                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#28c840' }} />
                                    <span style={{ marginLeft: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)' }}>terminal</span>
                                </div>
                                <div style={{ padding: '16px 18px', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 2 }}>
                                    {terminalLines.map((line, i) => (
                                        <div key={i} className="type-line" style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: 0, opacity: 0 }}>
                                            {line.prompt && <span style={{ color: 'var(--rust-light)', marginRight: '6px' }}>$</span>}
                                            <span style={{ color: line.prompt ? '#ffffff' : (line.text.startsWith('✓') ? '#2ecc71' : 'rgba(255,255,255,0.5)') }}>
                                                {line.text}
                                            </span>
                                        </div>
                                    ))}
                                    <span style={{
                                        display: 'inline-block', width: '8px', height: '15px',
                                        background: 'var(--rust-light)', animation: 'blink 1s step-end infinite',
                                        marginTop: '4px', verticalAlign: 'middle', borderRadius: '1px',
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3: Deploy */}
                <div className="hiw-card" style={cardStyle}>
                    <div style={cardInner}>
                        <h3 style={cardTitle}>Watch It Work</h3>
                        <p style={cardDesc}>
                            Real-time metrics, live campaign tracking, and continuous AI-powered optimization.
                        </p>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{
                                width: '100%', borderRadius: '14px',
                                background: '#0c0a09', border: '1px solid rgba(255,255,255,0.08)',
                                overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                            }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                                    background: 'rgba(0,0,0,0.3)',
                                }}>
                                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2ecc71', boxShadow: '0 0 8px #2ecc71' }} />
                                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)' }}>Agent Live Dashboard</span>
                                    <span style={{ marginLeft: 'auto', fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#2ecc71', fontWeight: 600 }}>LIVE</span>
                                </div>
                                <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                                    {metrics.map((m) => (
                                        <div key={m.label} style={{
                                            padding: '12px 8px', borderRadius: '10px',
                                            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                                            textAlign: 'center',
                                        }}>
                                            <div style={{
                                                fontFamily: 'var(--font-heading)', fontSize: '20px',
                                                fontWeight: 700, color: m.color, lineHeight: 1.2,
                                            }}>
                                                <span className="deploy-counter" data-target={m.value}>{m.value}</span>{m.suffix}
                                            </div>
                                            <div style={{
                                                fontSize: '8px', fontFamily: 'var(--font-mono)',
                                                color: 'rgba(255,255,255,0.35)', marginTop: '4px',
                                                textTransform: 'uppercase', letterSpacing: '0.08em',
                                            }}>{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ padding: '4px 14px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {channelBars.map((bar) => (
                                        <div key={bar.label}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)' }}>{bar.label}</span>
                                                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#ffffff', fontWeight: 600 }}>{bar.pct}%</span>
                                            </div>
                                            <div style={{ height: '5px', borderRadius: '9999px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                                <div className="deploy-bar-fill" data-pct={bar.pct} style={{ height: '100%', width: 0, borderRadius: '9999px', background: `linear-gradient(90deg, ${bar.color}, ${bar.color}cc)` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes blink { 50% { opacity: 0; } }
                @media (max-width: 900px) {
                    #how-it-works > div:nth-child(3) {
                        grid-template-columns: 1fr !important;
                        max-width: 480px !important;
                    }
                    .hiw-progress-bar { display: none !important; }
                }
            `}</style>
        </section>
    );
};

const cardStyle: React.CSSProperties = {
    borderRadius: '24px',
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.06)',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
};

const cardInner: React.CSSProperties = {
    padding: '32px 28px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
};

const cardTitle: React.CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
    fontWeight: 700,
    color: 'var(--text-dark)',
    marginBottom: '10px',
    lineHeight: 1.2,
};

const cardDesc: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--text-muted)',
    lineHeight: 1.7,
    fontFamily: 'var(--font-body)',
    marginBottom: '20px',
};

export default HowItWorks;
