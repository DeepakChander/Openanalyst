'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const navItems = [
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
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

    gsap.registerPlugin(useGSAP);

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

    // Lock body scroll when menu is open
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
                duration: 0.6,
                ease: 'power4.inOut',
            });
            gsap.from('.menu-link', {
                y: 80,
                opacity: 0,
                stagger: 0.08,
                duration: 0.8,
                ease: 'power4.out',
                delay: 0.3,
            });
            gsap.from('.menu-cta', {
                y: 40,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out',
                delay: 0.7,
            });
        } else if (menuRef.current) {
            gsap.to(menuRef.current, {
                clipPath: 'inset(0 0 100% 0)',
                duration: 0.5,
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
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isHidden && !isMenuOpen ? 'translateY(-100%)' : 'translateY(0)',
                    padding: '16px 24px',
                }}
            >
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: isScrolled ? '10px 24px' : '12px 24px',
                    borderRadius: '16px',
                    background: isScrolled ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: `1px solid ${isScrolled ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.03)'}`,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                    {/* Logo */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', zIndex: 101 }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #FF6B00, #E85D00)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }}>
                            <img src="/images/logo.png" alt="OpenAnalyst" width={24} height={24} style={{ objectFit: 'contain' }} />
                        </div>
                        <span style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#1A1A1A',
                            letterSpacing: '-0.03em',
                        }}>
                            OpenAnalyst
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: '4px' }}>
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.path}
                                style={{
                                    padding: '8px 16px',
                                    fontSize: '14px',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 500,
                                    color: pathname === item.path ? '#F97316' : '#8A8A8A',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease',
                                    borderRadius: '8px',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = '#1A1A1A'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = pathname === item.path ? '#F97316' : '#8A8A8A'; }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* Desktop CTA */}
                        <a
                            href="https://app.openanalyst.com"
                            className="hidden lg:inline-flex btn-primary"
                            style={{ padding: '10px 24px', fontSize: '13px' }}
                        >
                            Get Started
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>

                        {/* Hamburger */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '44px',
                                height: '44px',
                                background: 'none',
                                border: 'none',
                                gap: '6px',
                                cursor: 'pointer',
                                zIndex: 101,
                            }}
                        >
                            <span style={{
                                display: 'block',
                                width: '24px',
                                height: '2px',
                                background: '#1A1A1A',
                                borderRadius: '9999px',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                transform: isMenuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
                            }} />
                            <span style={{
                                display: 'block',
                                width: '24px',
                                height: '2px',
                                background: '#1A1A1A',
                                borderRadius: '9999px',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                opacity: isMenuOpen ? 0 : 1,
                                transform: isMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
                            }} />
                            <span style={{
                                display: 'block',
                                width: '24px',
                                height: '2px',
                                background: '#1A1A1A',
                                borderRadius: '9999px',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                transform: isMenuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
                            }} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Full-screen Menu Overlay */}
            <div
                ref={menuRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: '#FFFFFF',
                    zIndex: 99,
                    clipPath: 'inset(0 0 100% 0)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '120px 40px 60px',
                }}
            >
                <nav style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
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
                                fontSize: 'clamp(2rem, 6vw, 4rem)',
                                fontWeight: 800,
                                color: pathname === item.path ? '#FF6B00' : '#1A1A1A',
                                textDecoration: 'none',
                                letterSpacing: '-0.03em',
                                lineHeight: 1.2,
                                transition: 'color 0.3s ease',
                                textTransform: 'uppercase',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#FF6B00'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = pathname === item.path ? '#FF6B00' : '#1A1A1A'; }}
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
                        style={{ fontSize: '16px', padding: '18px 48px' }}
                    >
                        Get Started
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    <div style={{
                        display: 'flex',
                        gap: '24px',
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                    }}>
                        <a href="mailto:team@openanalyst.com" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#FF6B00'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                        >
                            team@openanalyst.com
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
