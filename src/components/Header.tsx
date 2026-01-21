'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from './Button';

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

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Register GSAP plugins (if any needed, keeping it simple for now)
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
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled
                ? 'py-3 bg-white/90 backdrop-blur-md border-b border-black/5'
                : 'py-6 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 relative">
                        <img
                            src="/images/logo.png"
                            alt="OpenAnalyst Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span className="font-accent text-xl font-semibold tracking-tight text-black group-hover:text-black/80 transition-colors">
                        OpenAnalyst
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-1">
                        {navItems.map((item) => (
                            <li
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${pathname === item.href
                                        ? 'text-brand-primary bg-black/5'
                                        : 'text-gray-600 hover:text-black hover:bg-black/5'
                                        }`}
                                >
                                    {item.label}
                                    {item.children && (
                                        <svg className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none">
                                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </Link>
                                {item.children && activeDropdown === item.label && (
                                    <ul className="absolute top-full left-1/2 -translate-x-1/2 min-w-[200px] bg-white border border-black/5 rounded-lg p-2 mt-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                                        {item.children.map((child) => (
                                            <li key={child.label}>
                                                <Link
                                                    href={child.href}
                                                    className="block px-4 py-3 text-sm text-gray-600 hover:text-black hover:bg-brand-primary/10 rounded-md transition-colors"
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
                <div className="hidden lg:flex items-center gap-3">
                    <Button href="/waitlist" variant="stroke">
                        Join Waitlist
                    </Button>
                    <Button href="/download" variant="fill">
                        Get Started
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden flex flex-col justify-center items-center w-11 h-11 bg-transparent border-none gap-[6px] p-2.5"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <span className={`block w-6 h-0.5 bg-black rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-[8px] rotate-45' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-black rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-black rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-[8px] -rotate-45' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                ref={mobileMenuRef}
                className="fixed inset-0 bg-white z-40 pt-20 px-4 opacity-0 invisible overflow-y-auto"
            >
                <nav className="flex flex-col gap-2 py-8">
                    {navItems.map((item) => (
                        <div key={item.label} className="mobile-nav-item">
                            <Link
                                href={item.href}
                                className="block p-4 text-2xl font-heading font-semibold text-black border-b border-black/5 hover:text-brand-primary hover:pl-6 transition-all duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                            {item.children && (
                                <div className="pl-4 mt-2 mb-2">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.label}
                                            href={child.href}
                                            className="block py-3 px-4 text-lg text-gray-500 hover:text-brand-primary transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="flex flex-col gap-4 mt-8 px-4 mobile-nav-item">
                        <Button href="/waitlist" variant="stroke" className="w-full justify-center">
                            Join Waitlist
                        </Button>
                        <Button href="/download" variant="fill" className="w-full justify-center">
                            Get Started
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
