'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const navItems = [
    { label: 'Features', path: '/features' },
    { label: 'About', path: '/about' },
    { label: 'Resources', path: '/resources' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 50);
            if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsMenuOpen(false); }, [pathname]);

    useEffect(() => {
        if (isMenuOpen) { document.body.style.overflow = 'hidden'; }
        else { document.body.style.overflow = ''; }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    useGSAP(() => {
        if (isMenuOpen && menuRef.current) {
            gsap.to(menuRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.5, ease: 'power4.inOut' });
            gsap.from('.menu-link', { y: 60, opacity: 0, filter: 'blur(8px)', stagger: 0.06, duration: 0.7, ease: 'power4.out', delay: 0.25 });
            gsap.from('.menu-cta', { y: 30, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.6 });
        } else if (menuRef.current) {
            gsap.to(menuRef.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.4, ease: 'power4.inOut' });
        }
    }, [isMenuOpen]);

    return (
        <>
            <header ref={headerRef} style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                display: 'flex', justifyContent: 'center',
                padding: isScrolled ? '10px 20px' : '18px 20px',
                transition: 'all 0.5s var(--ease-out)',
                transform: isHidden && !isMenuOpen ? 'translateY(-120%)' : 'translateY(0)',
                pointerEvents: 'none',
            }}>
                {/* ── LIGHT GLASS PILL ── */}
                <div style={{
                    position: 'relative', maxWidth: 960, width: '100%', pointerEvents: 'auto',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 8px 8px 20px',
                    borderRadius: 'var(--radius-full)',
                    background: isScrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(20px) saturate(1.2)',
                    WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
                    border: `1px solid ${isScrolled ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.03)'}`,
                    boxShadow: isScrolled ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                    transition: 'all 0.5s var(--ease-out)',
                }}>
                    {/* Logo */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', zIndex: 101, flexShrink: 0 }}>
                        <div style={{
                            width: 30, height: 30, borderRadius: 'var(--radius-sm)',
                            background: 'var(--gradient-orange)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflow: 'hidden', boxShadow: 'var(--shadow-orange)',
                        }}>
                            <img src="/images/new-logo.png" alt="OpenAnalyst" width={20} height={20} style={{ objectFit: 'contain' }} />
                        </div>
                        <span style={{
                            fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700,
                            color: 'var(--text-primary)', letterSpacing: '-0.02em',
                        }}>OpenAnalyst</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: 2, margin: '0 8px' }}>
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link key={item.label} href={item.path} className="nav-link-v2" style={{
                                    position: 'relative', padding: '6px 14px', fontSize: 13,
                                    fontFamily: 'var(--font-body)', fontWeight: 500,
                                    color: isActive ? 'var(--orange)' : 'var(--text-secondary)',
                                    textDecoration: 'none', borderRadius: 'var(--radius-md)',
                                    transition: 'color 0.25s ease', whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                }}>
                                    {item.label}
                                    {/* Orange underline — slides in from left on hover */}
                                    <span style={{
                                        position: 'absolute', bottom: 2, left: 14, right: 14,
                                        height: 2, borderRadius: 1,
                                        background: 'var(--orange)',
                                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                                        transformOrigin: 'left',
                                        transition: 'transform 0.3s var(--ease-out)',
                                    }} />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right side */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        {/* Download CTA */}
                        <Link href="/download" className="hidden md:inline-flex nav-download-btn" style={{
                            alignItems: 'center', gap: 5,
                            padding: '8px 16px', fontSize: 13,
                            fontFamily: 'var(--font-body)', fontWeight: 600,
                            color: 'var(--text-primary)',
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-full)', textDecoration: 'none',
                            transition: 'all 0.3s var(--ease-out)',
                            whiteSpace: 'nowrap',
                        }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download
                        </Link>

                        {/* Desktop CTA */}
                        <a href="https://app.openanalyst.com" className="hidden md:inline-flex" style={{
                            alignItems: 'center', gap: 6,
                            padding: '8px 20px', fontSize: 13,
                            fontFamily: 'var(--font-body)', fontWeight: 600,
                            color: '#FFFFFF', background: 'var(--orange)',
                            borderRadius: 'var(--radius-full)', textDecoration: 'none',
                            transition: 'all 0.3s var(--ease-out)',
                            boxShadow: 'var(--shadow-orange), inset 0 1px 0 rgba(255,255,255,0.15)',
                            whiteSpace: 'nowrap',
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--orange-hover)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-orange-lg), inset 0 1px 0 rgba(255,255,255,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'var(--orange)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-orange), inset 0 1px 0 rgba(255,255,255,0.15)';
                            }}
                        >
                            Get Started
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>

                        {/* Hamburger */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="lg:hidden" style={{
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                            width: 36, height: 36,
                            background: isMenuOpen ? 'var(--orange-50)' : 'var(--bg-surface)',
                            border: `1px solid ${isMenuOpen ? 'var(--border-orange)' : 'var(--border)'}`,
                            borderRadius: '50%', gap: 5, cursor: 'pointer', zIndex: 101,
                            transition: 'all 0.3s ease',
                        }}>
                            <span style={{ display: 'block', width: 16, height: 1.5, background: isMenuOpen ? 'var(--orange)' : 'var(--text-primary)', borderRadius: 'var(--radius-full)', transition: 'all 0.3s var(--ease-out)', transform: isMenuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
                            <span style={{ display: 'block', width: 16, height: 1.5, background: isMenuOpen ? 'var(--orange)' : 'var(--text-primary)', borderRadius: 'var(--radius-full)', transition: 'all 0.3s var(--ease-out)', opacity: isMenuOpen ? 0 : 1, transform: isMenuOpen ? 'scaleX(0)' : 'scaleX(1)' }} />
                            <span style={{ display: 'block', width: 16, height: 1.5, background: isMenuOpen ? 'var(--orange)' : 'var(--text-primary)', borderRadius: 'var(--radius-full)', transition: 'all 0.3s var(--ease-out)', transform: isMenuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── MOBILE MENU OVERLAY — Frosted Glass ── */}
            <div ref={menuRef} style={{
                position: 'fixed', inset: 0,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(40px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(40px) saturate(1.5)',
                zIndex: 99, clipPath: 'inset(0 0 100% 0)',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                padding: '120px 40px 60px',
            }}>
                {/* Subtle radial glow */}
                <div style={{
                    position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 400, height: 400, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginBottom: 60 }}>
                    {navItems.map((item) => (
                        <Link key={item.label} href={item.path} className="menu-link" onClick={() => setIsMenuOpen(false)} style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                            fontWeight: 800,
                            color: pathname === item.path ? 'var(--orange)' : 'var(--text-primary)',
                            textDecoration: 'none', letterSpacing: '-0.03em',
                            lineHeight: 1.3, transition: 'color 0.3s ease', padding: '4px 0',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--orange)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = pathname === item.path ? 'var(--orange)' : 'var(--text-primary)'; }}
                        >{item.label}</Link>
                    ))}
                </nav>

                <div className="menu-cta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                    <Link href="/download" onClick={() => setIsMenuOpen(false)} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        fontSize: 15, padding: '16px 44px',
                        fontFamily: 'var(--font-body)', fontWeight: 600,
                        color: 'var(--text-primary)',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-full)', textDecoration: 'none',
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download Desktop
                    </Link>
                    <a href="https://app.openanalyst.com" className="btn-primary" onClick={() => setIsMenuOpen(false)} style={{ fontSize: 15, padding: '16px 44px' }}>
                        Get Started
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <a href="mailto:team@openanalyst.com" style={{
                        color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s',
                        fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em',
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--orange)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                    >team@openanalyst.com</a>
                </div>
            </div>

            {/* Nav link hover — underline slides in */}
            <style>{`
                .nav-link-v2:hover { color: var(--text-primary) !important; }
                .nav-link-v2:hover span { transform: scaleX(1) !important; }
                .nav-download-btn:hover {
                    border-color: var(--orange) !important;
                    color: var(--orange) !important;
                    background: var(--orange-50) !important;
                    transform: translateY(-1px);
                }
                .nav-download-btn:hover svg { opacity: 1 !important; stroke: var(--orange); }
            `}</style>
        </>
    );
};

export default Header;
