'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
}

const navItems: NavItem[] = [
    { label: 'Features', href: '/features' },
    {
        label: 'Solutions',
        href: '/solutions-by-agents',
        children: [
            { label: 'AI Agents', href: '/solutions-by-agents' },
            { label: 'Integrations', href: '/integrations' },
        ]
    },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
];

// Light background pages (most pages are dark)
const lightBackgroundPages = ['/some-light-page']; // Add any light pages here

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Almost all pages have dark background, so default to dark
    const isLightPage = lightBackgroundPages.includes(pathname);
    const isDarkPage = !isLightPage;

    gsap.registerPlugin(useGSAP);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Mobile menu animation
    useGSAP(() => {
        if (isMobileMenuOpen) {
            gsap.to(mobileMenuRef.current, {
                opacity: 1,
                visibility: 'visible',
                duration: 0.4,
                ease: 'power2.out'
            });

            gsap.from('.mobile-nav-item', {
                x: -50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: 'back.out(1.2)',
                delay: 0.1
            });
        } else {
            gsap.to(mobileMenuRef.current, {
                opacity: 0,
                visibility: 'hidden',
                duration: 0.3,
                ease: 'power2.in'
            });
        }
    }, [isMobileMenuOpen]);

    return (
        <header
            ref={headerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                transition: 'all 0.3s ease',
                padding: isScrolled ? '12px 0' : '20px 0',
                backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none',
            }}
        >
            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <div style={{ width: '40px', height: '40px', position: 'relative' }}>
                        <img
                            src="/images/logo.png"
                            alt="OpenAnalyst Logo"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                filter: isScrolled ? 'none' : 'brightness(0) invert(1)',
                                transition: 'filter 0.3s ease',
                            }}
                        />
                    </div>
                    <span
                        style={{
                            fontSize: '20px',
                            fontWeight: 600,
                            letterSpacing: '-0.025em',
                            color: isScrolled ? '#1f2937' : '#ffffff',
                            transition: 'color 0.3s ease',
                        }}
                    >
                        OpenAnalyst
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav style={{ display: 'none' }} className="lg:!block">
                    <ul style={{ display: 'flex', alignItems: 'center', gap: '4px', listStyle: 'none', margin: 0, padding: 0 }}>
                        {navItems.map((item) => (
                            <li
                                key={item.label}
                                style={{ position: 'relative' }}
                                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '8px 16px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        borderRadius: '6px',
                                        transition: 'all 0.2s ease',
                                        textDecoration: 'none',
                                        color: pathname === item.href ? '#ff8552' : (isScrolled ? '#374151' : '#ffffff'),
                                        backgroundColor: pathname === item.href ? (isScrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)') : 'transparent',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (pathname !== item.href) {
                                            e.currentTarget.style.backgroundColor = isScrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.15)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (pathname !== item.href) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }
                                    }}
                                >
                                    {item.label}
                                    {item.children && (
                                        <svg
                                            style={{
                                                width: '12px',
                                                height: '12px',
                                                transition: 'transform 0.2s ease',
                                                transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                                            }}
                                            viewBox="0 0 12 12"
                                            fill="none"
                                        >
                                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </Link>
                                {item.children && activeDropdown === item.label && (
                                    <ul
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            minWidth: '200px',
                                            backgroundColor: '#ffffff',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            borderRadius: '12px',
                                            padding: '8px',
                                            marginTop: '8px',
                                            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                            listStyle: 'none',
                                        }}
                                    >
                                        {item.children.map((child) => (
                                            <li key={child.label}>
                                                <Link
                                                    href={child.href}
                                                    style={{
                                                        display: 'block',
                                                        padding: '12px 16px',
                                                        fontSize: '14px',
                                                        color: '#4b5563',
                                                        borderRadius: '8px',
                                                        transition: 'all 0.2s ease',
                                                        textDecoration: 'none',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'rgba(255,133,82,0.1)';
                                                        e.currentTarget.style.color = '#000000';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                        e.currentTarget.style.color = '#4b5563';
                                                    }}
                                                >
                                                    {child.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* CTA Buttons */}
                <div style={{ display: 'none', alignItems: 'center', gap: '12px' }} className="lg:!flex">
                    <Link
                        href="/waitlist"
                        style={{
                            padding: '10px 20px',
                            fontSize: '14px',
                            fontWeight: 500,
                            textDecoration: 'none',
                            color: isScrolled ? '#374151' : '#ffffff',
                            border: isScrolled ? '1px solid #d1d5db' : '1px solid rgba(255, 255, 255, 0.4)',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                            backgroundColor: 'transparent',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = isScrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        Join Waitlist
                    </Link>
                    <Link
                        href="/download"
                        style={{
                            padding: '10px 20px',
                            fontSize: '14px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            color: '#ffffff',
                            backgroundColor: '#ff8552',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#e5753f';
                            e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ff8552';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        Download
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                    className="lg:!hidden"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '44px',
                        height: '44px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        gap: '6px',
                        padding: '10px',
                        cursor: 'pointer',
                    }}
                >
                    <span
                        style={{
                            display: 'block',
                            width: '24px',
                            height: '2px',
                            backgroundColor: isMobileMenuOpen ? '#000000' : (isScrolled ? '#000000' : '#ffffff'),
                            borderRadius: '9999px',
                            transition: 'all 0.3s ease',
                            transform: isMobileMenuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
                        }}
                    />
                    <span
                        style={{
                            display: 'block',
                            width: '24px',
                            height: '2px',
                            backgroundColor: isMobileMenuOpen ? '#000000' : (isScrolled ? '#000000' : '#ffffff'),
                            borderRadius: '9999px',
                            transition: 'all 0.3s ease',
                            opacity: isMobileMenuOpen ? 0 : 1,
                        }}
                    />
                    <span
                        style={{
                            display: 'block',
                            width: '24px',
                            height: '2px',
                            backgroundColor: isMobileMenuOpen ? '#000000' : (isScrolled ? '#000000' : '#ffffff'),
                            borderRadius: '9999px',
                            transition: 'all 0.3s ease',
                            transform: isMobileMenuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
                        }}
                    />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                ref={mobileMenuRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: '#ffffff',
                    zIndex: 40,
                    paddingTop: '80px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    opacity: 0,
                    visibility: 'hidden',
                    overflowY: 'auto',
                }}
            >
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '32px', paddingBottom: '32px' }}>
                    {navItems.map((item) => (
                        <div key={item.label} className="mobile-nav-item">
                            <Link
                                href={item.href}
                                style={{
                                    display: 'block',
                                    padding: '16px',
                                    fontSize: '24px',
                                    fontWeight: 600,
                                    color: '#000000',
                                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease',
                                    textDecoration: 'none',
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                            {item.children && (
                                <div style={{ paddingLeft: '16px', marginTop: '8px', marginBottom: '8px' }}>
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.label}
                                            href={child.href}
                                            style={{
                                                display: 'block',
                                                padding: '12px 16px',
                                                fontSize: '18px',
                                                color: '#6b7280',
                                                transition: 'color 0.2s ease',
                                                textDecoration: 'none',
                                            }}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="mobile-nav-item" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px', padding: '0 16px' }}>
                        <Link
                            href="/waitlist"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                padding: '16px',
                                fontSize: '16px',
                                fontWeight: 500,
                                color: '#1f2937',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                textDecoration: 'none',
                            }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Join Waitlist
                        </Link>
                        <Link
                            href="/download"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                padding: '16px',
                                fontSize: '16px',
                                fontWeight: 600,
                                color: '#ffffff',
                                backgroundColor: '#ff8552',
                                borderRadius: '8px',
                                textDecoration: 'none',
                            }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Download
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
