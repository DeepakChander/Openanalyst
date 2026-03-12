'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface NavItem {
    label: string;
    path: string;
    cmd: string;
    children?: NavItem[];
}

const navItems: NavItem[] = [
    { label: 'features', path: '/features', cmd: '$ cd /features' },
    {
        label: 'solutions',
        path: '/solutions-by-agents',
        cmd: '$ cd /solutions',
        children: [
            { label: 'ai_agents', path: '/solutions-by-agents', cmd: '$ ai_agents' },
        ]
    },
    { label: 'pricing', path: '/pricing', cmd: '$ cd /pricing' },
    { label: 'about', path: '/about', cmd: '$ cd /about' },
    { label: 'contact', path: '/contact', cmd: '$ cd /contact' },
];

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    gsap.registerPlugin(useGSAP);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useGSAP(() => {
        if (isMobileMenuOpen) {
            gsap.to(mobileMenuRef.current, { opacity: 1, visibility: 'visible', duration: 0.4, ease: 'power2.out' });
            gsap.from('.mobile-nav-item', { x: -40, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(1.2)', delay: 0.1 });
        } else {
            gsap.to(mobileMenuRef.current, { opacity: 0, visibility: 'hidden', duration: 0.3, ease: 'power2.in' });
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Inject header-specific animations */}
            <style>{`
                @keyframes cursorBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                @keyframes borderGlow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes navSlideIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes dotPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.4); }
                }
                .header-nav-pill {
                    animation: navSlideIn 0.5s ease both;
                }
                .header-nav-pill:nth-child(1) { animation-delay: 0.05s; }
                .header-nav-pill:nth-child(2) { animation-delay: 0.1s; }
                .header-nav-pill:nth-child(3) { animation-delay: 0.15s; }
                .header-nav-pill:nth-child(4) { animation-delay: 0.2s; }
                .header-nav-pill:nth-child(5) { animation-delay: 0.25s; }
                .header-nav-pill a:hover .nav-hover-bg {
                    opacity: 1;
                }
                .header-cta-btn {
                    animation: navSlideIn 0.5s ease 0.3s both;
                }
                .header-gradient-line {
                    background: linear-gradient(90deg, transparent, var(--primary-light), var(--primary), var(--primary-light), transparent);
                    background-size: 200% 100%;
                    animation: borderGlow 4s ease infinite;
                }
            `}</style>

            <header
                ref={headerRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                {/* Main bar */}
                <div style={{
                    backgroundColor: isScrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.88)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    padding: isScrolled ? '0' : '0',
                }}>
                    <div style={{
                        maxWidth: '1280px',
                        margin: '0 auto',
                        padding: isScrolled ? '10px 24px' : '14px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}>
                        {/* Logo — macOS dots + terminal path + blinking cursor */}
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                            {/* macOS traffic light dots like 10x.in */}
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f57', display: 'block' }} />
                                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#febc2e', display: 'block' }} />
                                <span style={{
                                    width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28c840', display: 'block',
                                    animation: 'dotPulse 2s ease-in-out infinite',
                                }} />
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '17px',
                                fontWeight: 700,
                                color: 'var(--foreground)',
                                letterSpacing: '-0.03em',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                ~/
                                <span style={{ color: 'var(--primary)' }}>openanalyst</span>
                                {/* Blinking cursor like skillsmp.com */}
                                <span style={{
                                    display: 'inline-block',
                                    width: '2px',
                                    height: '18px',
                                    backgroundColor: 'var(--primary)',
                                    marginLeft: '2px',
                                    animation: 'cursorBlink 1s step-end infinite',
                                }} />
                            </span>
                        </Link>

                        {/* Desktop Nav — bordered pill buttons like skillsmp.com */}
                        <nav className="hidden lg:flex" style={{ alignItems: 'center' }}>
                            <ul style={{ display: 'flex', alignItems: 'center', gap: '6px', listStyle: 'none', margin: 0, padding: 0 }}>
                                {navItems.map((item) => (
                                    <li
                                        key={item.label}
                                        className="header-nav-pill"
                                        style={{ position: 'relative' }}
                                        onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <Link
                                            href={item.path}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                padding: '7px 16px',
                                                fontSize: '13px',
                                                fontFamily: 'var(--font-mono)',
                                                fontWeight: 500,
                                                borderRadius: '9999px',
                                                textDecoration: 'none',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                                color: pathname === item.path ? '#fff' : '#2d2520',
                                                backgroundColor: pathname === item.path ? 'var(--terminal-bg)' : 'transparent',
                                                border: pathname === item.path ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                                                boxShadow: pathname === item.path ? '0 2px 12px rgba(30,30,46,0.3)' : 'none',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (pathname !== item.path) {
                                                    e.currentTarget.style.backgroundColor = 'var(--terminal-bg)';
                                                    e.currentTarget.style.color = '#d4d4d8';
                                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(30,30,46,0.25)';
                                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (pathname !== item.path) {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.color = '#2d2520';
                                                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                }
                                            }}
                                        >
                                            <span style={{
                                                fontSize: '11px',
                                                fontWeight: 700,
                                                color: pathname === item.path ? 'var(--cmd-prefix)' : 'var(--primary)',
                                                transition: 'color 0.3s ease',
                                            }}>$</span>
                                            <span>{item.cmd.replace('$ ', '')}</span>
                                            {item.children && (
                                                <svg style={{ width: '10px', height: '10px', transition: 'transform 0.2s ease', transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)', marginLeft: '2px' }} viewBox="0 0 12 12" fill="none">
                                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </Link>

                                        {/* Dropdown */}
                                        {item.children && activeDropdown === item.label && (
                                            <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', minWidth: '220px', marginTop: '8px', zIndex: 50 }}>
                                                <div className="terminal-card" style={{ padding: 0 }}>
                                                    <div className="terminal-card-header">
                                                        <div className="terminal-dots"><span /><span /><span /></div>
                                                        <span style={{ color: '#6b7280', fontSize: '11px', fontFamily: 'var(--font-mono)', marginLeft: '8px' }}>solutions/</span>
                                                    </div>
                                                    <div style={{ padding: '8px' }}>
                                                        {item.children.map((child) => (
                                                            <Link key={child.label} href={child.path} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 12px', fontSize: '13px', fontFamily: 'var(--font-mono)', color: '#d4d4d8', borderRadius: '6px', transition: 'all 0.2s ease', textDecoration: 'none' }}
                                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#ffffff'; }}
                                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#d4d4d8'; }}
                                                            >
                                                                <span style={{ color: 'var(--cmd-prefix)', fontSize: '11px' }}>$</span>
                                                                <span>{child.label}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* CTA — Sign In only, no view_pricing */}
                        <div className="hidden lg:flex header-cta-btn" style={{ alignItems: 'center' }}>
                            <a
                                href="https://app.openanalyst.com"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 20px',
                                    fontSize: '13px',
                                    fontFamily: 'var(--font-mono)',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    color: '#fff',
                                    backgroundColor: 'var(--terminal-bg)',
                                    borderRadius: '9999px',
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    boxShadow: '0 2px 12px rgba(30,30,46,0.2)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(204, 122, 96, 0.35)';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(30,30,46,0.2)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <span style={{ color: 'var(--cmd-prefix)', fontSize: '11px' }}>$</span>
                                Sign In
                                <span style={{ marginLeft: '2px' }}>→</span>
                            </a>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                            className="flex lg:hidden"
                            style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '44px', height: '44px', backgroundColor: 'transparent', border: 'none', gap: '6px', padding: '10px', cursor: 'pointer' }}
                        >
                            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: 'var(--foreground)', borderRadius: '9999px', transition: 'all 0.3s ease', transform: isMobileMenuOpen ? 'translateY(8px) rotate(45deg)' : 'none' }} />
                            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: 'var(--foreground)', borderRadius: '9999px', transition: 'all 0.3s ease', opacity: isMobileMenuOpen ? 0 : 1 }} />
                            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: 'var(--foreground)', borderRadius: '9999px', transition: 'all 0.3s ease', transform: isMobileMenuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
                        </button>
                    </div>
                </div>

                {/* Animated gradient bottom line — the signature accent */}
                <div className="header-gradient-line" style={{
                    height: isScrolled ? '2px' : '1px',
                    transition: 'height 0.4s ease',
                    opacity: isScrolled ? 1 : 0.6,
                }} />
            </header>

            {/* Mobile Menu Overlay */}
            <div
                ref={mobileMenuRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'var(--terminal-bg)',
                    zIndex: 99,
                    paddingTop: '80px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    opacity: 0,
                    visibility: 'hidden',
                    overflowY: 'auto',
                }}
            >
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '32px', paddingBottom: '32px' }}>
                    {/* Terminal boot text */}
                    <div className="mobile-nav-item" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#6b7280', marginBottom: '24px', padding: '0 16px' }}>
                        <p style={{ color: 'var(--cmd-prefix)', marginBottom: '4px' }}>OpenAnalyst v2.0</p>
                        <p>navigation loaded. {navItems.length} routes available.</p>
                        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, var(--primary), transparent)', marginTop: '12px' }} />
                    </div>

                    {navItems.map((item) => (
                        <div key={item.label} className="mobile-nav-item">
                            <Link
                                href={item.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '18px 16px',
                                    fontSize: '18px',
                                    fontFamily: 'var(--font-mono)',
                                    fontWeight: 600,
                                    color: pathname === item.path ? 'var(--primary)' : '#d4d4d8',
                                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                                    transition: 'all 0.3s ease',
                                    textDecoration: 'none',
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span style={{ color: 'var(--cmd-prefix)', fontSize: '13px', fontWeight: 700 }}>$</span>
                                <span style={{ color: 'var(--syntax-keyword)', fontSize: '15px' }}>cd</span>
                                /{item.label}
                                {pathname === item.path && (
                                    <span style={{
                                        marginLeft: 'auto',
                                        fontSize: '10px',
                                        padding: '2px 8px',
                                        borderRadius: '9999px',
                                        backgroundColor: 'rgba(204, 122, 96, 0.15)',
                                        color: 'var(--primary)',
                                    }}>active</span>
                                )}
                            </Link>
                        </div>
                    ))}

                    <div className="mobile-nav-item" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '40px', padding: '0 16px' }}>
                        <a
                            href="https://app.openanalyst.com"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '8px',
                                width: '100%',
                                padding: '16px',
                                fontSize: '15px',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 600,
                                color: '#ffffff',
                                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                boxShadow: '0 4px 24px rgba(204, 122, 96, 0.3)',
                            }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span style={{ color: 'var(--cmd-prefix)', fontSize: '12px' }}>$</span>
                            get_started
                            <span>→</span>
                        </a>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
