'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Magnetic from './Magnetic';

const Footer: React.FC = () => {
    const footerRef = useRef<HTMLElement>(null);

    gsap.registerPlugin(ScrollTrigger, useGSAP);

    useGSAP(() => {
        // Word-by-word opacity reveal on CTA heading
        const words = gsap.utils.toArray<HTMLElement>('.cta-word');
        gsap.from(words, {
            opacity: 0.1,
            y: 10,
            stagger: 0.08,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer-cta-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        });

        gsap.from('.footer-cta-button', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer-cta-section',
                start: 'top 75%',
                toggleActions: 'play none none reverse',
            }
        });

        gsap.from('.footer-reveal', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer-content',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
        });
    }, { scope: footerRef });

    const linkGroups = [
        {
            title: 'product/',
            links: [
                { label: 'features', href: '/features' },
                { label: 'pricing', href: '/pricing' },
                { label: 'solutions', href: '/solutions-by-agents' },
                { label: 'docs', href: '/docs' },
            ]
        },
        {
            title: 'company/',
            links: [
                { label: 'about', href: '/about' },
                { label: 'contact', href: '/contact' },
            ]
        },
        {
            title: 'social/',
            links: [
                { label: 'x_twitter', href: 'https://x.com/OpenAnalystInc', external: true },
                { label: 'instagram', href: 'https://www.instagram.com/openanalystinc/', external: true },
                { label: 'linkedin', href: 'https://www.linkedin.com/in/openanalyst-inc/', external: true },
            ]
        },
        {
            title: 'legal/',
            links: [
                { label: 'privacy_policy', href: '/privacy-policy' },
                { label: 'terms_of_use', href: '/terms-of-use' },
            ]
        },
    ];

    const ctaWords = ['Let', 'your', 'AI', 'agent', 'get', 'to', 'work.'];

    return (
        <footer ref={footerRef} style={{ fontFamily: 'var(--font-mono)' }}>
            {/* CTA Section */}
            <div className="footer-cta-section" style={{
                padding: '120px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--background)',
            }}>
                {/* Decorative blob */}
                <div className="morph-blob" style={{
                    position: 'absolute',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(204,122,96,0.08) 0%, transparent 70%)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        fontWeight: 700,
                        color: 'var(--foreground)',
                        marginBottom: '40px',
                        lineHeight: 1.1,
                        fontFamily: 'var(--font-heading)',
                        maxWidth: '700px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '0 0.3em',
                    }}>
                        {ctaWords.map((word, i) => (
                            <span key={i} className="cta-word" style={{ display: 'inline-block' }}>
                                {word}
                            </span>
                        ))}
                    </h2>
                    <div className="footer-cta-button">
                        <Magnetic>
                            <a
                                href="https://app.openanalyst.com"
                                className="animate-glow-pulse"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '16px 36px',
                                    fontSize: '15px',
                                    fontFamily: 'var(--font-mono)',
                                    fontWeight: 600,
                                    color: '#ffffff',
                                    backgroundColor: 'var(--primary)',
                                    borderRadius: '9999px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <span style={{ color: 'var(--cmd-prefix)', fontSize: '12px' }}>$</span>
                                get_started
                            </a>
                        </Magnetic>
                    </div>
                </div>

                {/* Logo Marquee — large semi-transparent text */}
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: 0,
                    right: 0,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                }}>
                    <div className="animate-marquee-scroll" style={{
                        display: 'flex',
                        width: 'max-content',
                        gap: '0',
                    }}>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <span key={i} style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(4rem, 10vw, 8rem)',
                                fontWeight: 800,
                                color: 'var(--foreground)',
                                opacity: 0.04,
                                whiteSpace: 'nowrap',
                                paddingRight: '80px',
                                lineHeight: 1,
                                userSelect: 'none',
                            }}>
                                OpenAnalyst
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Content - Dark Terminal */}
            <div className="footer-content" style={{
                backgroundColor: '#1a1210',
                color: '#a89890',
                padding: '60px 20px 30px',
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Terminal header */}
                    <div className="footer-reveal" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '40px',
                        paddingBottom: '20px',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f57', display: 'inline-block' }} />
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#febc2e', display: 'inline-block' }} />
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28c840', display: 'inline-block' }} />
                        </div>
                        <span style={{ fontSize: '12px', color: '#6b6260', marginLeft: '8px' }}>~/openanalyst — footer</span>
                    </div>

                    {/* Links Grid */}
                    <div className="footer-reveal" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '40px',
                        marginBottom: '60px',
                    }}>
                        {linkGroups.map((group) => (
                            <div key={group.title}>
                                <p style={{
                                    fontSize: '12px',
                                    color: 'var(--primary)',
                                    marginBottom: '16px',
                                    fontWeight: 600,
                                }}>
                                    drwxr-xr-x {group.title}
                                </p>
                                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {group.links.map((link) => (
                                        <li key={link.label}>
                                            {(link as { external?: boolean }).external ? (
                                                <a
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="footer-link"
                                                    style={{
                                                        fontSize: '13px',
                                                        color: '#8a7a72',
                                                        textDecoration: 'none',
                                                        transition: 'color 0.2s ease',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        position: 'relative',
                                                    }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.color = '#8a7a72'; }}
                                                >
                                                    -rw-r--r-- {link.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    className="footer-link"
                                                    style={{
                                                        fontSize: '13px',
                                                        color: '#8a7a72',
                                                        textDecoration: 'none',
                                                        transition: 'color 0.2s ease',
                                                        position: 'relative',
                                                        display: 'inline-block',
                                                    }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.color = '#8a7a72'; }}
                                                >
                                                    -rw-r--r-- {link.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact */}
                    <div className="footer-reveal" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '24px',
                        marginBottom: '40px',
                        paddingBottom: '30px',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        fontSize: '12px',
                    }}>
                        <a href="mailto:team@openanalyst.com" className="footer-link" style={{ color: '#8a7a72', textDecoration: 'none', transition: 'color 0.2s', position: 'relative', display: 'inline-block' }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = '#8a7a72'; }}
                        >
                            team@openanalyst.com
                        </a>
                        <span style={{ color: '#4a3a32' }}>|</span>
                        <span>San Francisco, California</span>
                    </div>

                    {/* Bottom */}
                    <div className="footer-reveal" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '12px',
                        color: '#5a4a42',
                    }}>
                        <p style={{ margin: 0 }}>
                            <span style={{ color: 'var(--syntax-comment)' }}>{'// '}</span>
                            <span style={{ color: 'var(--primary)' }}>OpenAnalyst</span>
                            {' '}&copy; {new Date().getFullYear()} | Built with AI
                            <span className="typing-cursor" style={{
                                display: 'inline-block',
                                width: '2px',
                                height: '12px',
                                backgroundColor: 'var(--primary)',
                                marginLeft: '4px',
                                verticalAlign: 'middle',
                                animation: 'blink 1s step-end infinite',
                            }} />
                        </p>
                        <p style={{ margin: 0, color: '#4a3a32' }}>
                            v2.0.0
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .footer-link {
                    position: relative;
                }
                .footer-link::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: var(--primary);
                    transform: scaleX(0);
                    transform-origin: left center;
                    transition: transform 0.3s ease;
                }
                .footer-link:hover::after {
                    transform: scaleX(1);
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
