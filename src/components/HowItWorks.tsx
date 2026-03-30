'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Header
        gsap.from('.hiw-label', { y: 16, opacity: 0, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
        gsap.from('.hiw-title', { y: 30, opacity: 0, filter: 'blur(6px)', duration: 0.8, ease: 'power4.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
        gsap.from('.hiw-desc', { y: 16, opacity: 0, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } });

        // Cards stagger
        gsap.utils.toArray<HTMLElement>('.hiw-card').forEach((card, i) => {
            gsap.from(card, {
                y: 80, opacity: 0, scale: 0.95, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 88%' },
                delay: i * 0.1,
            });
        });

        // Step progress dots
        gsap.from('.hiw-step-dot', {
            scale: 0, opacity: 0, stagger: 0.2, duration: 0.5, ease: 'back.out(2)',
            scrollTrigger: { trigger: '.hiw-progress-bar', start: 'top 90%' },
        });

        // Progress line fill
        gsap.from('.hiw-progress-fill', {
            scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power2.out',
            scrollTrigger: { trigger: '.hiw-progress-bar', start: 'top 90%' },
        });

        // Integration icons converge
        gsap.utils.toArray<HTMLElement>('.converge-icon').forEach((icon) => {
            gsap.to(icon, {
                x: 0, y: 0, opacity: 1, duration: 2, ease: 'power2.out',
                repeat: -1, repeatDelay: 1.5, yoyo: true,
            });
        });

        // Agent cards activate
        gsap.utils.toArray<HTMLElement>('.agent-activate').forEach((el, i) => {
            gsap.from(el, {
                x: -20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 + i * 0.2,
                scrollTrigger: { trigger: el, start: 'top 90%' },
            });
        });

        // Deploy counters
        gsap.utils.toArray<HTMLElement>('.deploy-counter').forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target') || '0');
            gsap.fromTo(counter, { innerText: '0' }, {
                innerText: target, duration: 2.5, ease: 'power2.out', snap: { innerText: 1 },
                scrollTrigger: { trigger: counter, start: 'top 90%', once: true },
            });
        });

        // Deploy bar fills
        gsap.utils.toArray<HTMLElement>('.deploy-bar-fill').forEach((bar) => {
            const pct = bar.getAttribute('data-pct') || '0';
            gsap.fromTo(bar, { width: '0%' }, {
                width: `${pct}%`, duration: 1.5, ease: 'power2.out',
                scrollTrigger: { trigger: bar, start: 'top 90%', once: true },
            });
        });
    }, { scope: sectionRef });

    const integrationIcons = [
        { name: 'Gmail', src: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg', startX: -80, startY: -50 },
        { name: 'Slack', src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg', startX: 90, startY: -35 },
        { name: 'HubSpot', src: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png', startX: -70, startY: 60 },
    ];

    const agents = [
        { name: 'Vibe Marketer', status: 'Active', color: '#FF6B00', metric: '+340% ROI' },
        { name: 'SEO Strategist', status: 'Analyzing', color: '#14B8A6', metric: '+47% traffic' },
        { name: 'Ad Optimizer', status: 'Optimizing', color: '#3B82F6', metric: '-31% CPA' },
    ];

    const metrics = [
        { label: 'Campaigns', value: 12, suffix: '', color: '#FF8533' },
        { label: 'ROI', value: 340, suffix: '%', color: '#10B981' },
        { label: 'Reach', value: 48, suffix: 'K', color: '#3B82F6' },
    ];

    const channelBars = [
        { label: 'Email', pct: 78, color: '#FF8533' },
        { label: 'Social', pct: 92, color: '#10B981' },
        { label: 'Search', pct: 65, color: '#3B82F6' },
    ];

    return (
        <section id="how-it-works" ref={sectionRef} className="light-section" style={{
            background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden',
            padding: '120px 24px 100px',
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
                <p className="hiw-label" style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange)',
                    marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600,
                }}>How It Works</p>
                <h2 className="hiw-title" style={{
                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                    fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                }}>
                    Three Steps to{' '}
                    <span className="text-gradient">AI Marketing</span>
                </h2>
                <p className="hiw-desc" style={{
                    fontSize: 15, color: 'var(--text-muted)', maxWidth: 440,
                    margin: '0 auto', lineHeight: 1.7,
                }}>Go from zero to deployed AI agent in under 60 seconds.</p>
            </div>

            {/* Step progress bar */}
            <div className="hiw-progress-bar" style={{
                maxWidth: 700, margin: '0 auto 56px',
                display: 'flex', alignItems: 'center', padding: '0 20px',
            }}>
                {[
                    { num: '01', label: 'Connect' },
                    { num: '02', label: 'Activate' },
                    { num: '03', label: 'Grow' },
                ].map((step, i) => (
                    <React.Fragment key={i}>
                        <div className="hiw-step-dot" style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0,
                        }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: '50%',
                                background: 'var(--orange-gradient)',
                                color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
                                boxShadow: '0 4px 16px rgba(255,107,0,0.25)',
                            }}>{step.num}</div>
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--orange)',
                                textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600,
                            }}>{step.label}</span>
                        </div>
                        {i < 2 && (
                            <div style={{ flex: 1, height: 2, background: 'rgba(255,107,0,0.08)', position: 'relative', margin: '0 12px', marginBottom: 20 }}>
                                <div className="hiw-progress-fill" style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(90deg, #FF6B00, #FF8533)',
                                    borderRadius: 2,
                                }} />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* 3-column cards */}
            <div style={{
                maxWidth: 1140, margin: '0 auto',
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
            }}>
                {/* Card 1: Connect Your Stack */}
                <div className="hiw-card" style={cardStyle}>
                    <div style={cardInner}>
                        {/* Faded number */}
                        <span style={fadedNum}>01</span>
                        <h3 style={cardTitle}>Connect Your Stack</h3>
                        <p style={cardDesc}>
                            Link your marketing stack in 60 seconds. Gmail, Slack, HubSpot, and 24 more integrations.
                        </p>
                        <div style={{
                            flex: 1, position: 'relative', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', minHeight: 180,
                        }}>
                            {/* Center hub */}
                            <div style={{
                                width: 52, height: 52, borderRadius: 14,
                                background: 'var(--orange-gradient)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 8px 32px rgba(255,107,0,0.25)', zIndex: 2, position: 'relative',
                            }}>
                                <img src="/images/logo.png" alt="OA" width={32} height={32} style={{ objectFit: 'contain' }} />
                            </div>
                            {/* Orbit rings */}
                            {[72, 120, 160].map((r, i) => (
                                <div key={r} style={{
                                    position: 'absolute', width: r, height: r, borderRadius: '50%',
                                    border: `1px solid rgba(255,107,0,${0.15 - i * 0.04})`, pointerEvents: 'none',
                                }} />
                            ))}
                            {/* Converging icons */}
                            {integrationIcons.map((icon) => (
                                <div key={icon.name} className="converge-icon" style={{
                                    position: 'absolute',
                                    transform: `translate(${icon.startX}px, ${icon.startY}px)`,
                                    opacity: 0.4, width: 40, height: 40, borderRadius: 10,
                                    background: '#ffffff', border: '1px solid var(--border-default)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)', willChange: 'transform, opacity',
                                }}>
                                    <img src={icon.src} alt={icon.name} width={22} height={22} loading="lazy" style={{ objectFit: 'contain' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Card 2: Activate AI Agents — NO TERMINAL */}
                <div className="hiw-card" style={cardStyle}>
                    <div style={cardInner}>
                        <span style={fadedNum}>02</span>
                        <h3 style={cardTitle}>Activate AI Agents</h3>
                        <p style={cardDesc}>
                            Choose your agents, set goals and budget. They start working immediately — no configuration needed.
                        </p>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {agents.map((agent, i) => (
                                <div key={agent.name} className="agent-activate" style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '12px 14px', borderRadius: 12,
                                    background: 'var(--bg-surface)',
                                    border: '1px solid var(--border-default)',
                                    transition: 'all 0.3s ease',
                                }}>
                                    {/* Agent avatar */}
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 10,
                                        background: `${agent.color}12`, border: `1px solid ${agent.color}20`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={agent.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
                                        </svg>
                                    </div>
                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 1 }}>{agent.name}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <span style={{
                                                width: 5, height: 5, borderRadius: '50%',
                                                background: '#10B981',
                                                boxShadow: '0 0 6px rgba(16,185,129,0.5)',
                                                animation: 'statusPulse 2s ease infinite',
                                            }} />
                                            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{agent.status}</span>
                                        </div>
                                    </div>
                                    {/* Metric */}
                                    <span style={{
                                        fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
                                        color: agent.color, padding: '3px 8px', borderRadius: 6,
                                        background: `${agent.color}08`,
                                    }}>{agent.metric}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Card 3: Watch Results Grow */}
                <div className="hiw-card" style={cardStyle}>
                    <div style={cardInner}>
                        <span style={fadedNum}>03</span>
                        <h3 style={cardTitle}>Watch Results Grow</h3>
                        <p style={cardDesc}>
                            Real-time metrics, live campaign tracking, and continuous AI-powered optimization.
                        </p>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {/* Metric counters */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                                {metrics.map((m) => (
                                    <div key={m.label} style={{
                                        padding: '14px 8px', borderRadius: 12,
                                        background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
                                        textAlign: 'center',
                                    }}>
                                        <div style={{
                                            fontFamily: 'var(--font-heading)', fontSize: 22,
                                            fontWeight: 800, color: m.color, lineHeight: 1.2,
                                        }}>
                                            <span className="deploy-counter" data-target={m.value}>{m.value}</span>{m.suffix}
                                        </div>
                                        <div style={{
                                            fontSize: 8, fontFamily: 'var(--font-mono)',
                                            color: 'var(--text-muted)', marginTop: 4,
                                            textTransform: 'uppercase', letterSpacing: '0.08em',
                                        }}>{m.label}</div>
                                    </div>
                                ))}
                            </div>
                            {/* Channel bars */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {channelBars.map((bar) => (
                                    <div key={bar.label}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontSize: 11, fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontWeight: 500 }}>{bar.label}</span>
                                            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 600 }}>{bar.pct}%</span>
                                        </div>
                                        <div style={{ height: 5, borderRadius: 9999, background: 'var(--border-subtle)', overflow: 'hidden' }}>
                                            <div className="deploy-bar-fill" data-pct={bar.pct} style={{
                                                height: '100%', width: 0, borderRadius: 9999,
                                                background: `linear-gradient(90deg, ${bar.color}, ${bar.color}cc)`,
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 1024px) {
                    #how-it-works > div:nth-child(3) {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 16px !important;
                    }
                }
                @media (max-width: 900px) {
                    #how-it-works > div:nth-child(3) {
                        grid-template-columns: 1fr !important;
                        max-width: 520px !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                    .hiw-progress-bar { display: none !important; }
                }
                @media (max-width: 600px) {
                    #how-it-works { padding: 80px 16px 60px !important; }
                }
            `}</style>
        </section>
    );
};

const fadedNum: React.CSSProperties = {
    position: 'absolute', top: 16, right: 20,
    fontFamily: 'var(--font-heading)', fontSize: 56, fontWeight: 900,
    color: 'rgba(0,0,0,0.03)', lineHeight: 1, pointerEvents: 'none',
};

const cardStyle: React.CSSProperties = {
    borderRadius: 24,
    background: 'var(--bg-white)',
    border: '1px solid var(--border-default)',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
    position: 'relative',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
};

const cardInner: React.CSSProperties = {
    padding: '32px 28px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
};

const cardTitle: React.CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 10,
    lineHeight: 1.2,
};

const cardDesc: React.CSSProperties = {
    fontSize: 14,
    color: 'var(--text-muted)',
    lineHeight: 1.7,
    fontFamily: 'var(--font-body)',
    marginBottom: 20,
};

export default HowItWorks;
