'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';

gsap.registerPlugin(useGSAP);

const HeroBackground = dynamic(() => import('./HeroScene').then(m => ({ default: m.default })), { ssr: false });
const DashboardMockup = dynamic(() => import('./HeroScene').then(m => ({ default: m.DashboardMockup })), { ssr: false });

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const [animReady, setAnimReady] = useState(false);

    useGSAP(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) { setAnimReady(true); return; }

        const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            onStart: () => setAnimReady(true),
            delay: 0.2,
        });

        // Badge
        tl.from('.hero-badge', { scale: 0.92, opacity: 0, duration: 0.5 }, 0);

        // Headline words — clip-mask reveal
        tl.from('.hero-word', {
            y: '110%',
            opacity: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: 'power4.out',
        }, 0.1);

        // Subheadline
        tl.from('.hero-sub', { y: 14, opacity: 0, duration: 0.5 }, 0.55);

        // CTAs
        tl.from('.hero-cta-primary', { scale: 0.9, opacity: 0, duration: 0.45, ease: 'back.out(1.5)' }, 0.7);
        tl.from('.hero-cta-secondary', { scale: 0.9, opacity: 0, duration: 0.45, ease: 'back.out(1.5)' }, 0.8);

        // Social proof
        tl.from('.hero-proof', { opacity: 0, y: 8, duration: 0.4 }, 0.9);

        // Logos
        tl.from('.hero-logos', { opacity: 0, duration: 0.5 }, 1.05);

    }, { scope: heroRef });

    useEffect(() => {
        const fb = setTimeout(() => { if (!animReady) setAnimReady(true); }, 2500);
        return () => clearTimeout(fb);
    }, [animReady]);

    const avatars = [
        { bg: '#FF6B00', init: 'SK' },
        { bg: '#3B82F6', init: 'AR' },
        { bg: '#8B5CF6', init: 'JM' },
        { bg: '#10B981', init: 'LT' },
        { bg: '#EC4899', init: 'DP' },
    ];

    const logos = [
        { name: 'Google', color: '#4285F4' },
        { name: 'Meta', color: '#0081FB' },
        { name: 'HubSpot', color: '#FF7A59' },
        { name: 'Slack', color: '#E01E5A' },
        { name: 'Shopify', color: '#7AB55C' },
    ];

    return (
        <section id="hero-section" ref={heroRef} style={{
            position: 'relative',
            minHeight: '100vh',
            overflow: 'hidden',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
        }}>
            {/* Animated gradient background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <HeroBackground />
            </div>

            {/* Grid noise texture */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
                backgroundSize: '24px 24px',
                pointerEvents: 'none',
            }} />

            {/* Main content */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: '1240px',
                margin: '0 auto',
                padding: '120px 32px 80px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '60px',
                alignItems: 'center',
            }}>
                {/* LEFT — Text content */}
                <div>
                    {/* Badge */}
                    <div className="hero-badge" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '6px 16px', borderRadius: '9999px',
                        border: '1px solid rgba(255,107,0,0.15)',
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                        marginBottom: '28px', fontSize: '13px',
                        fontFamily: 'var(--font-body)', fontWeight: 600, color: '#FF6B00',
                        boxShadow: '0 2px 12px rgba(255,107,0,0.06)',
                    }}>
                        <span style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: '#FF6B00', display: 'inline-block',
                            boxShadow: '0 0 8px rgba(255,107,0,0.5)',
                        }} />
                        AI-Powered Marketing Agents
                    </div>

                    {/* Headline */}
                    <h1 style={{
                        fontFamily: 'var(--font-heading)', fontWeight: 800,
                        fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                        lineHeight: 1.1, letterSpacing: '-0.03em',
                        color: '#1A1A1A', marginBottom: '24px',
                    }}>
                        {['Your', 'AI'].map((word, i) => (
                            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}>
                                <span className="hero-word" style={{ display: 'inline-block' }}>{word}</span>
                            </span>
                        ))}
                        <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                            <span className="hero-word" style={{
                                display: 'inline-block',
                                background: 'linear-gradient(135deg, #FF6B00, #FF8C3A)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>Marketing</span>
                        </span>
                        <br />
                        <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                            <span className="hero-word" style={{ display: 'inline-block' }}>Agent</span>
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="hero-sub" style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(16px, 1.3vw, 18px)',
                        color: '#666666', lineHeight: 1.7,
                        maxWidth: '460px', marginBottom: '32px',
                    }}>
                        AI agents that plan, create, and optimize your campaigns across every channel — on autopilot. See results in days, not months.
                    </p>

                    {/* CTAs */}
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: '12px',
                        marginBottom: '36px',
                    }}>
                        <a href="https://app.openanalyst.com" className="hero-cta-primary btn-primary" style={{
                            fontSize: '15px', padding: '14px 30px', borderRadius: '50px',
                        }}>
                            Start Free Trial
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a href="#how-it-works" className="hero-cta-secondary btn-outline" style={{
                            fontSize: '15px', padding: '14px 30px', borderRadius: '50px',
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                        }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="10 8 16 12 10 16 10 8" fill="#FF6B00" stroke="none" />
                            </svg>
                            Watch Demo
                        </a>
                    </div>

                    {/* Social Proof */}
                    <div className="hero-proof" style={{
                        display: 'flex', alignItems: 'center',
                        gap: '14px', fontSize: '13px', fontFamily: 'var(--font-body)',
                        color: '#999', marginBottom: '32px',
                    }}>
                        <div style={{ display: 'flex' }}>
                            {avatars.map((a, i) => (
                                <div key={i} style={{
                                    width: '28px', height: '28px', borderRadius: '50%',
                                    background: a.bg, border: '2px solid #FFFFFF',
                                    marginLeft: i > 0 ? '-8px' : '0',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '8px', fontWeight: 700, color: '#fff', zIndex: 5 - i,
                                    position: 'relative',
                                }}>{a.init}</div>
                            ))}
                        </div>
                        <span>
                            Trusted by <strong style={{ color: '#1A1A1A' }}>2,400+</strong> teams
                            <span style={{ margin: '0 8px', opacity: 0.3 }}>|</span>
                            <span style={{ color: '#FF6B00' }}>&#9733;</span> 4.9/5
                        </span>
                    </div>

                    {/* Integration logos */}
                    <div className="hero-logos" style={{
                        display: 'flex', alignItems: 'center', gap: '16px',
                    }}>
                        <span style={{
                            fontFamily: 'var(--font-body)', fontSize: '11px',
                            color: '#bbb', textTransform: 'uppercase',
                            letterSpacing: '0.06em', fontWeight: 500, whiteSpace: 'nowrap',
                        }}>Works with</span>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                        }}>
                            {logos.map((l, i) => (
                                <div key={i} style={{
                                    width: '28px', height: '28px', borderRadius: '8px',
                                    background: '#F5F5F5',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '10px', fontWeight: 700, color: l.color,
                                    fontFamily: 'var(--font-body)',
                                    border: '1px solid rgba(0,0,0,0.04)',
                                }}>
                                    {l.name.charAt(0)}
                                </div>
                            ))}
                            <span style={{
                                fontSize: '11px', color: '#999',
                                fontFamily: 'var(--font-body)',
                            }}>+45 more</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT — Dashboard mockup */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <DashboardMockup />
                </div>
            </div>

            {/* Bottom fade */}
            <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '80px',
                background: 'linear-gradient(to top, #FFFFFF, transparent)',
                zIndex: 2,
                pointerEvents: 'none',
            }} />
        </section>
    );
};

export default Hero;
