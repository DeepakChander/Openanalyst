'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

const Footer: React.FC = () => {
    return (
        <footer className="font-body">
            {/* CTA Section - Full Viewport Height */}
            <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Background Image - keep simpler or use light variant if available, for now masking with white gradient */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/footer-cta-bg.png"
                        alt="CTA Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50" />
                </div>

                {/* CTA Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-10 max-w-4xl leading-tight" style={{ fontStyle: 'italic' }}>
                        Let&apos;s build something<br />extraordinary together.
                    </h2>
                    <Button href="/contact" variant="fill" className="!bg-black !text-white hover:!bg-gray-800">
                        Start a Project
                    </Button>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-black/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>

            {/* Footer Content - Full Viewport Height */}
            <div className="min-h-screen bg-white px-6 lg:px-12 py-16 flex flex-col justify-between border-t border-black/5">
                <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">

                    {/* Top Row - Logo + Tagline */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-16 pb-8 border-b border-black/5">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <svg className="w-6 h-6 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            <span className="text-black font-semibold text-lg">OpenAnalyst<sup className="text-xs">®</sup></span>
                        </div>

                        {/* Tagline */}
                        <p className="text-gray-500 text-sm max-w-xs md:text-right">
                            Thoughts, updates and creative notes<br />from the OpenAnalyst team.
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-auto">
                        {/* Contact Info - Left Side */}
                        <div className="col-span-2 space-y-8">
                            {/* Mail */}
                            <div>
                                <span className="text-brand-primary text-xs font-medium uppercase tracking-wider">MAIL</span>
                                <a href="mailto:hello@openanalyst.com" className="block text-black text-sm mt-1 hover:text-brand-primary transition-colors">
                                    HELLO@OPENANALYST.COM ↗
                                </a>
                            </div>

                            {/* Address */}
                            <div>
                                <span className="text-brand-primary text-xs font-medium uppercase tracking-wider">ADDRESS</span>
                                <a href="#" className="block text-black text-sm mt-1 hover:text-brand-primary transition-colors">
                                    SAN FRANCISCO, CALIFORNIA ↗
                                </a>
                            </div>

                            {/* Phone */}
                            <div>
                                <span className="text-brand-primary text-xs font-medium uppercase tracking-wider">PHONE</span>
                                <a href="tel:+14155552830" className="block text-black text-sm mt-1 hover:text-brand-primary transition-colors">
                                    +1 (415) 555-2830 ↗
                                </a>
                            </div>
                        </div>

                        {/* Links Column */}
                        <div>
                            <span className="text-brand-primary text-xs font-medium uppercase tracking-wider mb-4 block">LINKS</span>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li><Link href="/" className="hover:text-black transition-colors">Studio</Link></li>
                                <li><Link href="/features" className="hover:text-black transition-colors">Projects</Link></li>
                                <li><Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link></li>
                                <li><Link href="/blog" className="hover:text-black transition-colors">Articles</Link></li>
                                <li><Link href="/contact" className="hover:text-black transition-colors">Contact</Link></li>
                                <li><Link href="/404" className="hover:text-black transition-colors">404</Link></li>
                            </ul>
                        </div>

                        {/* Social Column */}
                        <div>
                            <span className="text-brand-primary text-xs font-medium uppercase tracking-wider mb-4 block">SOCIAL</span>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li><a href="https://x.com/OpenAnalystInc" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">X/Twitter</a></li>
                                <li><a href="https://www.instagram.com/openanalystinc/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a></li>
                                <li><a href="https://www.linkedin.com/in/openanalyst-inc/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LinkedIn</a></li>
                            </ul>
                        </div>

                        {/* Legal Column */}
                        <div>
                            <span className="text-brand-primary text-xs font-medium uppercase tracking-wider mb-4 block">LEGAL</span>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li><Link href="/privacy-policy" className="hover:text-black transition-colors">Privacy and Policy</Link></li>
                                <li><Link href="/terms-of-use" className="hover:text-black transition-colors">Terms of Use</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Section - Large Brand Name */}
                    <div className="mt-auto pt-12">
                        {/* Large Brand Name - Full Width */}
                        <div className="border-t border-black/5 pt-8 overflow-hidden">
                            <h2
                                className="font-bold text-black tracking-tighter leading-none whitespace-nowrap"
                                style={{ fontSize: 'clamp(3rem, 15vw, 12rem)' }}
                            >
                                OpenAnalyst<sup className="text-[0.2em] align-super">®</sup>
                            </h2>
                        </div>

                        {/* Copyright */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8 text-xs text-gray-500">
                            <p>© {new Date().getFullYear()} OpenAnalyst. All rights reserved.</p>
                            <p>Crafted with <span className="text-brand-primary">♦</span> clarity & creativity.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
