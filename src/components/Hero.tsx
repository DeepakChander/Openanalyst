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
        { src: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Sarah&backgroundColor=ffd5dc' },
        { src: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Alex&backgroundColor=c0aede' },
        { src: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Jordan&backgroundColor=b6e3f4' },
        { src: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Morgan&backgroundColor=d1f4d1' },
        { src: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Riley&backgroundColor=ffeab6' },
    ];

    const logos: { name: string; icon: React.ReactNode }[] = [
        { name: 'Google', icon: (
            <svg viewBox="0 0 48 48" width="18" height="18">
                <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
                <path d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
                <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
                <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.001-.001 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
            </svg>
        )},
        { name: 'Meta', icon: (
            <svg viewBox="0 0 48 48" width="18" height="18">
                <linearGradient id="metaGrad" x1="6.228" y1="4.896" x2="42.077" y2="43.432" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#0064E1"/>
                    <stop offset=".4" stopColor="#0064E1"/>
                    <stop offset=".83" stopColor="#0073EE"/>
                    <stop offset="1" stopColor="#0082FB"/>
                </linearGradient>
                <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z" fill="url(#metaGrad)"/>
                <path d="M29.2 15.4c-1.6 0-3 .8-4.2 2.1-.5.6-1 1.3-1.4 2.1-.4-.8-.9-1.5-1.4-2.1-1.2-1.3-2.6-2.1-4.2-2.1-3.2 0-5.6 3.2-5.6 7.6 0 5.2 4.4 10.6 9.2 13.2.6.3 1.3.5 2 .5s1.4-.2 2-.5c4.8-2.6 9.2-8 9.2-13.2 0-4.4-2.4-7.6-5.6-7.6z" fill="#fff"/>
            </svg>
        )},
        { name: 'HubSpot', icon: (
            <svg viewBox="0 0 48 48" width="18" height="18">
                <path d="M34.4 15.2v-4.6c1.2-.7 2-2 2-3.4 0-2.2-1.8-4-4-4s-4 1.8-4 4c0 1.4.8 2.7 2 3.4v4.6c-1.7.4-3.3 1.3-4.5 2.5l-12-9.3c.1-.3.1-.6.1-1 0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4c.8 0 1.6-.3 2.2-.7l11.8 9.2c-.6 1.2-1 2.6-1 4 0 1.4.4 2.8 1 4l-3.4 3.4c-.3-.1-.6-.1-.9-.1-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-.3 0-.6-.1-.9l3.4-3.4c1.7 1.2 3.8 2 6.1 2 5.8 0 10.4-4.7 10.4-10.4 0-4.6-3-8.6-7.1-10z" fill="#FF7A59"/>
            </svg>
        )},
        { name: 'Slack', icon: (
            <svg viewBox="0 0 48 48" width="18" height="18">
                <path d="M14 28.5c0 2.485-2.017 4.5-4.5 4.5S5 30.985 5 28.5 7.017 24 9.5 24H14v4.5z" fill="#E01E5A"/>
                <path d="M16.5 28.5c0-2.485 2.017-4.5 4.5-4.5s4.5 2.015 4.5 4.5v11c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5v-11z" fill="#E01E5A"/>
                <path d="M21 14c-2.483 0-4.5-2.015-4.5-4.5S18.517 5 21 5s4.5 2.015 4.5 4.5V14H21z" fill="#36C5F0"/>
                <path d="M21 16.5c2.483 0 4.5 2.017 4.5 4.5s-2.017 4.5-4.5 4.5H9.5C7.017 25.5 5 23.485 5 21s2.017-4.5 4.5-4.5H21z" fill="#36C5F0"/>
                <path d="M34 19.5c0-2.483 2.015-4.5 4.5-4.5S43 17.017 43 19.5 40.985 24 38.5 24H34v-4.5z" fill="#2EB67D"/>
                <path d="M31.5 19.5c0 2.483-2.015 4.5-4.5 4.5s-4.5-2.017-4.5-4.5v-11C22.5 6.015 24.515 4 27 4s4.5 2.015 4.5 4.5v11z" fill="#2EB67D"/>
                <path d="M27 34c2.485 0 4.5 2.017 4.5 4.5S29.485 43 27 43s-4.5-2.017-4.5-4.5V34H27z" fill="#ECB22E"/>
                <path d="M27 31.5c-2.485 0-4.5-2.017-4.5-4.5s2.015-4.5 4.5-4.5h11.5c2.485 0 4.5 2.017 4.5 4.5s-2.015 4.5-4.5 4.5H27z" fill="#ECB22E"/>
            </svg>
        )},
        { name: 'Shopify', icon: (
            <svg viewBox="0 0 48 48" width="18" height="18">
                <path d="M37.216 8.342c-.024-.178-.152-.306-.33-.33a3.216 3.216 0 0 0-.728-.052s-2.458-.052-3.258-.052c-.624-.624-1.378-1.222-2.128-1.222h-.052c-.35-.35-.728-.572-1.128-.702-.402-1.22-1.074-2.284-1.906-2.778-.596-.364-1.228-.416-1.724-.416-1.58.052-2.998 1.168-4.078 3.144-.754 1.382-1.326 3.144-1.482 4.5l-3.414 1.048S16.35 11.55 16.2 12c-.154.416 0 0 0 0l-2.892 22.142L28.4 37l9.362-2.34S37.24 8.52 37.216 8.342zM26.504 10.506l-3.854 1.196c.442-1.626 1.222-3.248 2.678-3.882.442.91.884 2.166 1.176 2.686zM24.286 6.268c1.742.052 2.886 2.166 3.354 3.518-.052 0-2.184.676-4.55 1.404.858-3.31 1.196-4.37 1.196-4.922z" fill="#95BF47"/>
                <path d="M36.888 8.012c-.176 0-.352.024-.528.05 0 0-2.458-.052-3.258-.052-.624-.624-1.378-1.222-2.128-1.222h-.052c-.052-.052-.102-.102-.154-.154 0 0-1.092.39-2.834 1.014.442-1.626 1.222-3.248 2.678-3.882.052 0 .104.052.156.052.856.416 1.56 1.248 2.062 2.31.546.176 1.196.546 1.95 1.612.208.026.35.05.444.102.026.052.026.078.05.13-.152-.026-.31-.026-.386.04z" fill="#5E8E3E"/>
                <path d="M28.4 37l-15.092 3.142L16.2 12S28.4 37 28.4 37z" fill="#95BF47"/>
                <path d="M28.4 37l9.362-2.34S34.87 11.76 34.87 11.55c-.154-.416-.308-.624-.624-.754-.104-.052-.206-.078-.336-.078s-2.458-.052-3.258-.052c-.416-.416-.91-.832-1.404-1.066l-.024 27.4H28.4z" fill="#5E8E3E"/>
                <path d="M23.778 17.026c0 .73 1.612 1.38 3.596 2.336 2.726 1.3 3.232 3.362 3.128 4.87-.182 2.596-2.388 4.102-4.766 4.232-2.83.156-4.506-1.222-4.506-1.222l.598-2.544s1.664 1.222 3.024 1.118c.884-.066 1.326-.65 1.274-1.144-.078-1.066-2.05-1.482-3.622-2.752-1.118-.91-1.638-2.336-1.482-3.934.232-2.362 2.258-4.81 6.448-4.81.988 0 1.924.338 1.924.338l-.806 2.88s-.936-.442-1.95-.416c-1.69.04-1.86 1.196-1.86 1.508v.54z" fill="#fff"/>
            </svg>
        )},
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
            <div className="hero-grid" style={{
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
                    <div className="hero-ctas" style={{
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
                                <img
                                    key={i}
                                    src={a.src}
                                    alt=""
                                    width={32}
                                    height={32}
                                    style={{
                                        width: '32px', height: '32px', borderRadius: '50%',
                                        border: '2px solid #FFFFFF',
                                        marginLeft: i > 0 ? '-8px' : '0',
                                        zIndex: 5 - i,
                                        position: 'relative',
                                        objectFit: 'cover',
                                        background: '#F0F0F0',
                                    }}
                                />
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
                                <div key={i} title={l.name} style={{
                                    width: '30px', height: '30px', borderRadius: '8px',
                                    background: '#F5F5F5',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    transition: 'box-shadow 0.2s ease',
                                }}>
                                    {l.icon}
                                </div>
                            ))}
                            <span style={{
                                fontSize: '11px', color: '#999',
                                fontFamily: 'var(--font-body)',
                            }}>+45 more</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT — Dashboard mockup (hidden on mobile) */}
                <div className="hero-dashboard-mobile-hide" style={{
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
