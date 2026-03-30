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

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    useGSAP(() => {
        if (isMenuOpen && menuRef.current) {
            gsap.to(menuRef.current, {
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.5,
                ease: 'power4.inOut',
            });
            gsap.from('.menu-link', {
                y: 60,
                opacity: 0,
                filter: 'blur(8px)',
                stagger: 0.06,
                duration: 0.7,
                ease: 'power4.out',
                delay: 0.25,
            });
            gsap.from('.menu-cta', {
                y: 30,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.out',
                delay: 0.6,
            });
        } else if (menuRef.current) {
            gsap.to(menuRef.current, {
                clipPath: 'inset(0 0 100% 0)',
                duration: 0.4,
                ease: 'power4.inOut',
            });
        }
    }, [isMenuOpen]);

    return (
        <>
            <header
                ref={headerRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    padding: isScrolled ? '12px 20px' : '20px 20px',
                    transition: 'all 0.5s var(--ease-spring)',
                    transform: isHidden && !isMenuOpen ? 'translateY(-120%)' : 'translateY(0)',
                    pointerEvents: 'none',
                }}
            >
                {/* Floating pill container */}
                <div style={{
                    position: 'relative',
                    maxWidth: '820px',
                    width: '100%',
                    pointerEvents: 'auto',
                }}>
                    {/* Animated conic border glow */}
                    <div className="nav-glow-border" style={{
                        position: 'absolute',
                        inset: '-1px',
                        borderRadius: '9999px',
                        background: 'conic-gradient(from var(--angle), transparent 50%, rgba(255,107,0,0.4) 70%, transparent 90%)',
                        animation: 'borderRotate 6s linear infinite',
                        opacity: isScrolled ? 0.6 : 0,
                        transition: 'opacity 0.5s ease',
                        pointerEvents: 'none',
                    }} />

                    {/* Pill body */}
                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 8px 8px 20px',
                        borderRadius: '9999px',
                        background: isScrolled
                            ? 'rgba(10, 10, 11, 0.88)'
                            : 'rgba(10, 10, 11, 0.6)',
                        backdropFilter: 'blur(24px) saturate(1.2)',
                        WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
                        border: `1px solid ${isScrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)'}`,
                        boxShadow: isScrolled
                            ? '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.03)'
                            : '0 4px 16px rgba(0,0,0,0.15)',
                        transition: 'all 0.5s var(--ease-spring)',
                    }}>
                        {/* Logo */}
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', zIndex: 101, flexShrink: 0 }}>
                            <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #FF6B00, #E85D00)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                boxShadow: '0 2px 8px rgba(255,107,0,0.3)',
                            }}>
                                <img src="/images/new-logo.png" alt="OpenAnalyst" width={20} height={20} style={{ objectFit: 'contain' }} />
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '15px',
                                fontWeight: 700,
                                color: '#FAFAFA',
                                letterSpacing: '-0.02em',
                            }}>
                                OpenAnalyst
                            </span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: '2px', margin: '0 8px' }}>
                            {navItems.map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.path}
                                        style={{
                                            position: 'relative',
                                            padding: '6px 14px',
                                            fontSize: '13px',
                                            fontFamily: 'var(--font-body)',
                                            fontWeight: 500,
                                            color: isActive ? '#FF6B00' : 'rgba(255,255,255,0.55)',
                                            textDecoration: 'none',
                                            transition: 'color 0.25s ease',
                                            borderRadius: '9999px',
                                            whiteSpace: 'nowrap',
                                        }}
                                        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
                                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                                    >
                                        {item.label}
                                        {/* Active dot */}
                                        {isActive && (
                                            <span style={{
                                                position: 'absolute',
                                                bottom: '0px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '3px',
                                                height: '3px',
                                                borderRadius: '50%',
                                                background: '#FF6B00',
                                                boxShadow: '0 0 6px rgba(255,107,0,0.5)',
                                            }} />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right Side */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                            {/* Desktop CTA */}
                            <a
                                href="https://app.openanalyst.com"
                                className="hidden md:inline-flex"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 20px',
                                    fontSize: '13px',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 600,
                                    color: '#FFFFFF',
                                    background: '#FF6B00',
                                    borderRadius: '9999px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s var(--ease-spring)',
                                    boxShadow: '0 2px 12px rgba(255,107,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
                                    whiteSpace: 'nowrap',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#E85D00';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,107,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#FF6B00';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(255,107,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)';
                                }}
                            >
                                Get Started
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>

                            {/* Hamburger */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                                className="lg:hidden"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '36px',
                                    height: '36px',
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '50%',
                                    gap: '5px',
                                    cursor: 'pointer',
                                    zIndex: 101,
                                    transition: 'background 0.2s ease',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                            >
                                <span style={{
                                    display: 'block', width: '16px', height: '1.5px',
                                    background: '#FAFAFA', borderRadius: '9999px',
                                    transition: 'all 0.3s var(--ease-spring)',
                                    transform: isMenuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
                                }} />
                                <span style={{
                                    display: 'block', width: '16px', height: '1.5px',
                                    background: '#FAFAFA', borderRadius: '9999px',
                                    transition: 'all 0.3s var(--ease-spring)',
                                    opacity: isMenuOpen ? 0 : 1,
                                    transform: isMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
                                }} />
                                <span style={{
                                    display: 'block', width: '16px', height: '1.5px',
                                    background: '#FAFAFA', borderRadius: '9999px',
                                    transition: 'all 0.3s var(--ease-spring)',
                                    transform: isMenuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                                }} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Full-screen Mobile Menu Overlay */}
            <div
                ref={menuRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'var(--bg-dark-primary)',
                    zIndex: 99,
                    clipPath: 'inset(0 0 100% 0)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '120px 40px 60px',
                }}
            >
                {/* Ambient glow */}
                <div style={{
                    position: 'absolute', top: '20%', left: '30%',
                    width: '400px', height: '400px', borderRadius: '50%',
                    background: 'rgba(255,107,0,0.06)', filter: 'blur(100px)',
                    pointerEvents: 'none',
                }} />

                <nav style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    marginBottom: '60px',
                }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.path}
                            className="menu-link"
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                                fontWeight: 800,
                                color: pathname === item.path ? '#FF6B00' : 'rgba(255,255,255,0.7)',
                                textDecoration: 'none',
                                letterSpacing: '-0.03em',
                                lineHeight: 1.3,
                                transition: 'color 0.3s ease',
                                padding: '4px 0',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#FF6B00'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = pathname === item.path ? '#FF6B00' : 'rgba(255,255,255,0.7)'; }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="menu-cta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <a
                        href="https://app.openanalyst.com"
                        className="btn-primary"
                        onClick={() => setIsMenuOpen(false)}
                        style={{ fontSize: '15px', padding: '16px 44px' }}
                    >
                        Get Started
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    <a href="mailto:team@openanalyst.com" style={{
                        color: 'var(--text-dark-muted)', textDecoration: 'none', transition: 'color 0.2s',
                        fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.04em',
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#FF6B00'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dark-muted)'; }}
                    >
                        team@openanalyst.com
                    </a>
                </div>
            </div>
        </>
    );
};

export default Header;
