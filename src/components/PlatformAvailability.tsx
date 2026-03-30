'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ═══ Pattern #9: Platform cards with unique visual per platform ═══ */

const platforms = [
    {
        name: 'Web App', status: 'available',
        desc: 'Full-featured web application accessible from any browser.',
        features: ['All AI agents', 'Real-time dashboard', 'Team collaboration', '27+ integrations'],
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    },
    {
        name: 'Desktop', status: 'coming-soon',
        desc: 'Native macOS & Windows with system-level integrations.',
        features: ['Native notifications', 'Menu bar access', 'Offline mode', 'System shortcuts'],
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    },
    {
        name: 'Mobile', status: 'coming-soon',
        desc: 'On-the-go campaign management with push notifications.',
        features: ['Push notifications', 'Quick actions', 'Performance alerts', 'Voice commands'],
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    },
    {
        name: 'CLI', status: 'available',
        desc: 'Power-user terminal interface for automation workflows.',
        features: ['Scriptable workflows', 'CI/CD integration', 'BYOK support', 'Batch operations'],
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
    },
];

const PlatformAvailability: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.plat-label', { y: 16, opacity: 0, duration: 0.5, scrollTrigger: { trigger: containerRef.current, start: 'top 82%' } });
        gsap.from('.plat-heading', { y: 30, opacity: 0, filter: 'blur(6px)', duration: 0.8, scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } });
        gsap.fromTo('.plat-card', { y: 50, opacity: 0, scale: 0.95 }, {
            y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: 'back.out(1.3)',
            scrollTrigger: { trigger: '.plat-grid', start: 'top 85%' },
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} style={{
            padding: 'var(--space-section) 24px',
            background: 'var(--bg-surface)',
            position: 'relative', overflow: 'hidden',
        }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <p className="plat-label label-mono" style={{ marginBottom: 16 }}>Platform</p>
                    <h2 className="plat-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em',
                    }}>Available <span className="text-gradient">everywhere</span></h2>
                </div>

                <div className="plat-grid" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
                    maxWidth: 1000, margin: '0 auto',
                }}>
                    {platforms.map((p) => (
                        <div key={p.name} className="plat-card" style={{
                            padding: '28px 24px', borderRadius: 'var(--radius-xl)',
                            background: 'var(--bg-white)', border: '1px solid var(--border)',
                            boxShadow: 'var(--shadow-sm)',
                            display: 'flex', flexDirection: 'column',
                            transition: 'all 0.4s var(--ease-out)',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--orange-200)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 'var(--radius-md)',
                                    background: 'var(--orange-light)', color: 'var(--orange)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>{p.icon}</div>
                                <span style={{
                                    fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                                    padding: '4px 10px', borderRadius: 'var(--radius-full)', textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    background: p.status === 'available' ? 'rgba(16,185,129,0.08)' : 'var(--bg-surface)',
                                    color: p.status === 'available' ? '#10B981' : 'var(--text-muted)',
                                    border: `1px solid ${p.status === 'available' ? 'rgba(16,185,129,0.15)' : 'var(--border)'}`,
                                }}>{p.status === 'available' ? 'Available' : 'Coming Soon'}</span>
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{p.name}</h3>
                            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{p.desc}</p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {p.features.map((f, fi) => (
                                    <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) { .plat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 500px) { .plat-grid { grid-template-columns: 1fr !important; } }
            `}</style>
        </section>
    );
};

export default PlatformAvailability;
