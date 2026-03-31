'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const platforms = [
    {
        name: 'Web App', status: 'available', category: 'core',
        desc: 'Full-featured web application accessible from any browser.',
        features: ['All AI agents', 'Real-time dashboard', 'Team collaboration', '27+ integrations'],
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    },
    {
        name: 'Desktop', status: 'coming-soon', category: 'native',
        desc: 'Native macOS & Windows with system-level integrations.',
        features: ['Native notifications', 'Menu bar access', 'Offline mode', 'System shortcuts'],
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    },
    {
        name: 'Mobile', status: 'coming-soon', category: 'native',
        desc: 'On-the-go campaign management with push notifications.',
        features: ['Push notifications', 'Quick actions', 'Performance alerts', 'Voice commands'],
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    },
    {
        name: 'CLI', status: 'available', category: 'developer',
        desc: 'Power-user terminal interface for automation workflows.',
        features: ['Scriptable workflows', 'CI/CD integration', 'BYOK support', 'Batch operations'],
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
    },
];

const filters = [
    { label: 'All Platforms', value: 'all' },
    { label: 'Core', value: 'core' },
    { label: 'Native Apps', value: 'native' },
    { label: 'Developer', value: 'developer' },
];

const PlatformAvailability: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const filtered = activeFilter === 'all' ? platforms : platforms.filter(p => p.category === activeFilter);

    useGSAP(() => {
        gsap.fromTo('.plat-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: containerRef.current, start: 'top 82%' } });
        gsap.fromTo('.plat-heading', { y: 30, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } });
        gsap.fromTo('.plat-card', { y: 50, opacity: 0, scale: 0.95 }, {
            y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: 'back.out(1.3)',
            scrollTrigger: { trigger: '.plat-grid', start: 'top 85%' },
        });
    }, { scope: containerRef });

    return (
        <section id="platform" ref={containerRef} style={{
            padding: 'clamp(80px, 10vw, 120px) 24px',
            background: '#212121',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Gradient blur orbs */}
            <div style={{
                position: 'absolute', bottom: '-10%', left: '10%',
                width: 500, height: 500, borderRadius: '50%',
                background: 'rgba(248,154,74,0.8)', filter: 'blur(250px)',
                opacity: 0.7, pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', top: '-5%', right: '5%',
                width: 450, height: 450, borderRadius: '50%',
                background: 'rgba(53,198,189,0.5)', filter: 'blur(250px)',
                opacity: 0.7, pointerEvents: 'none',
            }} />

            {/* Noise texture overlay */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                backgroundSize: '128px 128px',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Heading */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <p className="plat-label" style={{
                        fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.5)', marginBottom: 16,
                    }}>Platform</p>
                    <h2 className="plat-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                        fontWeight: 800, color: '#fff', letterSpacing: '-0.03em',
                        textShadow: '0 0 10px rgba(0,0,0,0.1)',
                    }}>
                        Available <span style={{
                            fontStyle: 'italic', fontWeight: 400,
                            background: 'linear-gradient(135deg, #FF8533, #FF6B00)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>everywhere</span>
                    </h2>
                </div>

                {/* Filter pills */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
                    {filters.map(f => (
                        <button key={f.value} onClick={() => setActiveFilter(f.value)} style={{
                            padding: '8px 20px', borderRadius: 999,
                            background: activeFilter === f.value ? '#212121' : 'transparent',
                            border: `1px solid ${activeFilter === f.value ? '#fff' : 'rgba(255,255,255,0.3)'}`,
                            color: activeFilter === f.value ? '#fff' : 'rgba(255,255,255,0.6)',
                            fontSize: 13, fontWeight: 600, cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontFamily: 'var(--font-body)',
                        }}>{f.label}</button>
                    ))}
                </div>

                {/* Cards grid */}
                <div className="plat-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.min(filtered.length, 4)}, 1fr)`,
                    gap: 16, maxWidth: 1000, margin: '0 auto',
                }}>
                    {filtered.map((p) => (
                        <div key={p.name} className="plat-card" style={{
                            padding: '28px 24px', borderRadius: 20,
                            background: '#fff',
                            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                            display: 'flex', flexDirection: 'column',
                            transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,0,0,0.1)'; }}
                        >
                            {/* Header: icon + status */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: 14,
                                    background: 'rgba(255,107,0,0.06)', color: '#FF6B00',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '1px solid rgba(255,107,0,0.1)',
                                }}>{p.icon}</div>
                                <span style={{
                                    fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                                    padding: '5px 12px', borderRadius: 999, textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    background: p.status === 'available' ? 'rgba(16,185,129,0.08)' : 'rgba(0,0,0,0.04)',
                                    color: p.status === 'available' ? '#10B981' : '#999',
                                    border: `1px solid ${p.status === 'available' ? 'rgba(16,185,129,0.15)' : 'rgba(0,0,0,0.08)'}`,
                                }}>{p.status === 'available' ? 'Available' : 'Coming Soon'}</span>
                            </div>

                            {/* Name + desc */}
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: '#212121', marginBottom: 6 }}>{p.name}</h3>
                            <p style={{ fontSize: 13, color: '#777', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>{p.desc}</p>

                            {/* Features */}
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {p.features.map((f, fi) => (
                                    <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#555' }}>
                                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
