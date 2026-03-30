'use client';

import React, { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Platform {
    name: string;
    icon: string;
    status: 'available' | 'coming-soon';
    description: string;
    features: string[];
}

const platforms: Platform[] = [
    {
        name: 'Web App',
        icon: '◎',
        status: 'available',
        description: 'Full-featured web application accessible from any browser.',
        features: ['All AI agents & skills', 'Real-time dashboard', 'Team collaboration', '27+ integrations'],
    },
    {
        name: 'Desktop (macOS)',
        icon: '◆',
        status: 'coming-soon',
        description: 'Native macOS application with system-level integrations.',
        features: ['Native notifications', 'Menu bar access', 'Offline mode', 'System shortcuts'],
    },
    {
        name: 'Mobile (iOS)',
        icon: '●',
        status: 'coming-soon',
        description: 'On-the-go campaign management with push notifications.',
        features: ['Push notifications', 'Quick actions', 'Performance alerts', 'Voice commands'],
    },
    {
        name: 'CLI',
        icon: '▲',
        status: 'available',
        description: 'Power-user terminal interface for automation workflows.',
        features: ['Scriptable workflows', 'CI/CD integration', 'BYOK support', 'Batch operations'],
    },
];

const PlatformAvailability: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleCardHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, { rotateY: x * 6, rotateX: -y * 4, duration: 0.4, ease: 'power2.out' });
    }, []);

    const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    }, []);

    useGSAP(() => {
        gsap.from('.platform-heading', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        });

        gsap.from('.platform-card', {
            y: 60, opacity: 0, scale: 0.9, stagger: 0.12, duration: 0.8, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: '.platform-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="light-section" style={{
            padding: '120px 0',
            background: 'var(--bg-white)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                <div className="platform-heading" style={{ textAlign: 'center', marginBottom: '56px' }}>
                    <span style={{
                        display: 'inline-block',
                        fontFamily: 'var(--font-mono)', fontSize: '12px',
                        color: 'var(--rust)', textTransform: 'uppercase',
                        letterSpacing: '0.12em', marginBottom: '16px',
                    }}>
                        Platform
                    </span>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 800,
                        color: 'var(--text-dark)',
                        letterSpacing: '-0.03em',
                        marginBottom: '12px',
                    }}>
                        Available everywhere
                    </h2>
                    <p style={{
                        fontSize: '16px', color: 'var(--text-muted)',
                        maxWidth: '480px', margin: '0 auto',
                        fontFamily: 'var(--font-body)',
                    }}>
                        Access OpenAnalyst from your preferred platform.
                    </p>
                </div>

                <div className="platform-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '16px',
                }}>
                    {platforms.map((platform) => (
                        <div key={platform.name} className="platform-card" style={{ perspective: '800px' }}>
                            <div
                                onMouseMove={handleCardHover}
                                onMouseLeave={handleCardLeave}
                                style={{
                                    willChange: 'transform', transformStyle: 'preserve-3d', height: '100%',
                                    borderRadius: '20px', overflow: 'hidden',
                                    background: '#ffffff',
                                    border: `1px solid ${platform.status === 'available' ? 'rgba(255,107,0,0.12)' : 'var(--border-light)'}`,
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                                }}
                            >
                                <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <div style={{
                                            width: '48px', height: '48px', borderRadius: '14px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '20px',
                                            background: 'rgba(255,107,0,0.08)',
                                            color: 'var(--rust)',
                                            border: '1px solid rgba(255,107,0,0.10)',
                                        }}>
                                            {platform.icon}
                                        </div>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                                            padding: '4px 12px', borderRadius: '9999px', textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            backgroundColor: platform.status === 'available' ? 'rgba(46,204,113,0.1)' : 'rgba(255,107,0,0.06)',
                                            color: platform.status === 'available' ? '#16a34a' : 'var(--text-muted)',
                                            border: `1px solid ${platform.status === 'available' ? 'rgba(46,204,113,0.2)' : 'rgba(255,107,0,0.08)'}`,
                                        }}>
                                            {platform.status === 'available' ? 'Available' : 'Coming Soon'}
                                        </span>
                                    </div>

                                    <h3 style={{
                                        fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700,
                                        color: 'var(--text-dark)', marginBottom: '8px',
                                    }}>
                                        {platform.name}
                                    </h3>

                                    <p style={{
                                        fontSize: '13px', lineHeight: 1.65,
                                        color: 'var(--text-muted)', marginBottom: '16px', flex: 1,
                                    }}>
                                        {platform.description}
                                    </p>

                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        {platform.features.map((f, i) => (
                                            <li key={i} style={{
                                                display: 'flex', alignItems: 'center', gap: '8px',
                                                fontSize: '12px', color: 'var(--text-muted)',
                                            }}>
                                                <span style={{ color: 'var(--rust)', fontSize: '10px' }}>✓</span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PlatformAvailability;
