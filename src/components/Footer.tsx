'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

/* ───────────────────── SVG Social Icons (colorful) ───────────────────── */
const XIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#FFFFFF" />
    </svg>
);

const InstagramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <defs>
            <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="5%" stopColor="#fdf497" />
                <stop offset="45%" stopColor="#fd5949" />
                <stop offset="60%" stopColor="#d6249f" />
                <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="url(#ig-grad)" />
    </svg>
);

const LinkedInIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2" />
    </svg>
);

interface FooterProps {
    ctaWords?: string[];
    ctaHighlight?: string;
    ctaSubtitle?: string;
}

const Footer: React.FC<FooterProps> = ({
    ctaWords = ["Let's", 'build', 'something', 'extraordinary.'],
    ctaHighlight = 'extraordinary.',
    ctaSubtitle = 'Join thousands of marketers using AI to scale campaigns 10x faster.',
}) => {
    const footerRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);
    const row3Ref = useRef<HTMLDivElement>(null);
    const tweensRef = useRef<gsap.core.Tween[]>([]);
    const auroraRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

    // Build infinite marquee loops with GSAP
    const buildMarqueeLoop = useCallback((
        track: HTMLDivElement,
        speed: number,
        direction: 1 | -1
    ) => {
        const halfWidth = track.scrollWidth / 2;
        const duration = halfWidth / speed;

        if (direction === -1) {
            gsap.set(track, { x: 0 });
            return gsap.to(track, {
                x: -halfWidth,
                duration,
                ease: 'none',
                repeat: -1,
            });
        } else {
            gsap.set(track, { x: -halfWidth });
            return gsap.to(track, {
                x: 0,
                duration,
                ease: 'none',
                repeat: -1,
            });
        }
    }, []);

    useEffect(() => {
        const tracks = [
            { ref: row1Ref, speed: 50, dir: -1 as const },
            { ref: row2Ref, speed: 35, dir: 1 as const },
            { ref: row3Ref, speed: 60, dir: -1 as const },
        ];

        const tweens: gsap.core.Tween[] = [];

        tracks.forEach(({ ref, speed, dir }) => {
            if (ref.current) {
                const tween = buildMarqueeLoop(ref.current, speed, dir);
                tweens.push(tween);
            }
        });

        tweensRef.current = tweens;

        const velocityTracker = ScrollTrigger.create({
            trigger: marqueeRef.current,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
                const velocity = Math.abs(self.getVelocity());
                const speedMultiplier = 1 + Math.min(velocity / 800, 4);
                tweens.forEach((tween) => {
                    gsap.to(tween, {
                        timeScale: speedMultiplier,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: true,
                    });
                });
            },
        });

        const marqueeEl = marqueeRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            if (!marqueeEl) return;
            const rect = marqueeEl.getBoundingClientRect();
            const mouseXRel = (e.clientX - rect.left) / rect.width;
            const skewVal = (mouseXRel - 0.5) * 5;

            const rows = marqueeEl.querySelectorAll<HTMLElement>('.footer-brand-row');
            rows.forEach((row, i) => {
                const mult = i === 1 ? -0.7 : (i === 0 ? 1 : 0.8);
                gsap.to(row, {
                    skewX: skewVal * mult,
                    duration: 0.6,
                    ease: 'power2.out',
                    overwrite: true,
                });
            });
        };

        const handleMouseLeave = () => {
            if (!marqueeEl) return;
            const rows = marqueeEl.querySelectorAll<HTMLElement>('.footer-brand-row');
            rows.forEach((row) => {
                gsap.to(row, {
                    skewX: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.5)',
                    overwrite: true,
                });
            });
        };

        if (marqueeEl) {
            marqueeEl.addEventListener('mousemove', handleMouseMove);
            marqueeEl.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            tweens.forEach(t => t.kill());
            velocityTracker.kill();
            if (marqueeEl) {
                marqueeEl.removeEventListener('mousemove', handleMouseMove);
                marqueeEl.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [buildMarqueeLoop]);

    // Footer grid cursor glow
    useEffect(() => {
        const gridEl = gridRef.current;
        if (!gridEl) return;

        const handleGridMouse = (e: MouseEvent) => {
            const rect = gridEl.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            gridEl.style.setProperty('--glow-x', `${x}px`);
            gridEl.style.setProperty('--glow-y', `${y}px`);
        };

        gridEl.addEventListener('mousemove', handleGridMouse);
        return () => gridEl.removeEventListener('mousemove', handleGridMouse);
    }, []);

    // Magnetic social icons
    useEffect(() => {
        const socialBtns = document.querySelectorAll<HTMLElement>('.footer-social-magnetic');

        const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

        socialBtns.forEach((btn) => {
            const move = (e: MouseEvent) => {
                const rect = btn.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) * 0.3;
                const dy = (e.clientY - cy) * 0.3;
                gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
            };
            const leave = () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
            };
            btn.addEventListener('mousemove', move);
            btn.addEventListener('mouseleave', leave);
            handlers.push({ el: btn, move, leave });
        });

        return () => {
            handlers.forEach(({ el, move, leave }) => {
                el.removeEventListener('mousemove', move);
                el.removeEventListener('mouseleave', leave);
            });
        };
    }, []);

    useGSAP(() => {
        // CTA heading character reveal
        const words = gsap.utils.toArray<HTMLElement>('.cta-word');
        gsap.from(words, {
            opacity: 0,
            y: 40,
            rotateX: 40,
            filter: 'blur(8px)',
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer-cta-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        });

        gsap.from('.footer-cta-btn', {
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

        gsap.from('.footer-cta-badge', {
            y: -20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer-cta-section',
                start: 'top 82%',
                toggleActions: 'play none none reverse',
            }
        });

        // Footer grid stagger reveal
        gsap.from('.footer-col-reveal', {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer-dark-grid',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
        });

        // Newsletter section
        gsap.from('.footer-newsletter-reveal', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer-newsletter-reveal',
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            }
        });

        // Bottom bar
        gsap.from('.footer-bottom-reveal', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer-bottom-reveal',
                start: 'top 95%',
                toggleActions: 'play none none reverse',
            }
        });

        // Marquee section reveal
        gsap.from('.footer-brand-section', {
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.footer-brand-section',
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            }
        });

        // Aurora blob parallax
        if (auroraRef.current) {
            const blobs = auroraRef.current.querySelectorAll<HTMLElement>('.aurora-blob');
            blobs.forEach((blob, i) => {
                gsap.to(blob, {
                    y: i % 2 === 0 ? -40 : 40,
                    x: i % 2 === 0 ? 20 : -20,
                    scrollTrigger: {
                        trigger: '.footer-dark-grid',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    }
                });
            });
        }
    }, { scope: footerRef });

    const scrollToTop = () => {
        gsap.to(window, { scrollTo: { y: 0 }, duration: 1.2, ease: 'power3.inOut' });
    };

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setEmailSubmitted(true);
            setTimeout(() => {
                setEmailSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };

    const linkGroups = [
        {
            title: 'Product',
            links: [
                { label: 'Features', href: '/features' },
                { label: 'Docs', href: '/docs' },
                { label: 'Changelog', href: '/changelog' },
            ]
        },
        {
            title: 'Company',
            links: [
                { label: 'About', href: '/about' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact', href: '/contact' },
            ]
        },
        {
            title: 'Resources',
            links: [
                { label: 'Blog', href: '/resources' },
                { label: 'Case Studies', href: '/resources?tab=case-studies' },
                { label: 'FAQs', href: '/resources?tab=faqs' },
            ]
        },
        {
            title: 'Legal',
            links: [
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms of Use', href: '/terms-of-use' },
            ]
        },
    ];

    const ctaWordsLocal = ctaWords;

    const socials = [
        { label: 'X (Twitter)', href: 'https://x.com/OpenAnalystInc', icon: <XIcon />, color: '#FFFFFF', hoverBg: 'rgba(255,255,255,0.1)' },
        { label: 'Instagram', href: 'https://www.instagram.com/openanalystinc/', icon: <InstagramIcon />, color: '#E4405F', hoverBg: 'rgba(228,64,95,0.15)' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/openanalyst-inc/', icon: <LinkedInIcon />, color: '#0A66C2', hoverBg: 'rgba(10,102,194,0.15)' },
    ];

    return (
        <footer ref={footerRef}>
            {/* ═══ Pre-Footer CTA Section — Dark with Aurora ═══ */}
            <div className="footer-cta-section" style={{
                padding: 'clamp(100px, 12vw, 180px) 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: '#050505',
            }}>
                {/* Aurora gradient blobs */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                    <div style={{
                        position: 'absolute',
                        width: '800px', height: '800px',
                        background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 60%)',
                        top: '30%', left: '20%',
                        transform: 'translate(-50%, -50%)',
                        filter: 'blur(100px)',
                    }} />
                    <div style={{
                        position: 'absolute',
                        width: '600px', height: '600px',
                        background: 'radial-gradient(circle, rgba(255,140,50,0.08) 0%, transparent 60%)',
                        top: '60%', right: '-5%',
                        filter: 'blur(80px)',
                    }} />
                    <div style={{
                        position: 'absolute',
                        width: '400px', height: '400px',
                        background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 60%)',
                        bottom: '10%', left: '60%',
                        filter: 'blur(60px)',
                    }} />
                </div>

                {/* Subtle grid overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Badge */}
                    <div className="footer-cta-badge" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 20px',
                        borderRadius: '9999px',
                        border: '1px solid rgba(255,107,0,0.2)',
                        background: 'rgba(255,107,0,0.06)',
                        marginBottom: '32px',
                        fontSize: '13px',
                        fontFamily: 'var(--font-mono)',
                        color: '#FF8533',
                        letterSpacing: '0.03em',
                    }}>
                        <span style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: '#FF6B00',
                            boxShadow: '0 0 8px rgba(255,107,0,0.6)',
                            animation: 'glowPulse 2s ease-in-out infinite',
                        }} />
                        Ready to transform your marketing
                    </div>

                    <h2 style={{
                        fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        marginBottom: '24px',
                        lineHeight: 0.95,
                        fontFamily: 'var(--font-heading)',
                        maxWidth: '900px',
                        letterSpacing: '-0.04em',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '0 0.25em',
                    }}>
                        {ctaWordsLocal.map((word, i) => (
                            <span key={i} className="cta-word" style={{
                                display: 'inline-block',
                                ...(word === ctaHighlight ? {
                                    background: 'linear-gradient(135deg, #FF8533, #FF6B00, #FFB380)',
                                    backgroundSize: '200% 200%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    animation: 'shimmerGradient 4s ease infinite',
                                } : {}),
                            }}>
                                {word}
                            </span>
                        ))}
                    </h2>

                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255,255,255,0.5)',
                        maxWidth: '500px',
                        margin: '0 auto 48px',
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-body)',
                    }}>
                        {ctaSubtitle}
                    </p>

                    <div className="footer-cta-btn" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
                        <a href="https://app.openanalyst.com" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '18px 44px',
                            fontSize: '16px',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 600,
                            color: '#FFFFFF',
                            background: 'linear-gradient(135deg, #FF6B00, #FF8533)',
                            border: 'none',
                            borderRadius: '9999px',
                            textDecoration: 'none',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            boxShadow: '0 4px 30px rgba(255,107,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                            cursor: 'pointer',
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 8px 50px rgba(255,107,0,0.45), inset 0 1px 0 rgba(255,255,255,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 4px 30px rgba(255,107,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                            }}
                        >
                            Get Started Free
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s' }}>
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <Link href="/contact" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '18px 44px',
                            fontSize: '16px',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 500,
                            color: 'rgba(255,255,255,0.8)',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '9999px',
                            textDecoration: 'none',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            cursor: 'pointer',
                            backdropFilter: 'blur(10px)',
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)';
                                e.currentTarget.style.color = '#FF8533';
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.background = 'rgba(255,107,0,0.06)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                            }}
                        >
                            Talk to Sales
                        </Link>
                    </div>
                </div>
            </div>

            {/* ═══ Immersive 3-Row Brand Marquee — Dark ═══ */}
            <div className="footer-brand-section footer-brand-dark" ref={marqueeRef}>
                <div className="fbm-glow-top" />

                {/* Row 1 */}
                <div className="footer-brand-row footer-brand-row-1">
                    <div className="footer-brand-track" ref={row1Ref}>
                        {[0, 1].map((s) => (
                            <React.Fragment key={s}>
                                {['OPEN', 'ANALYST', 'OPEN', 'ANALYST', 'OPEN', 'ANALYST'].map((word, i) => (
                                    <React.Fragment key={`${s}-${i}`}>
                                        <span className="fbm-text-ghost size-lg">{word}</span>
                                        <span className="fbm-sep"><span className="fbm-sep-dot" /></span>
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Row 2 — HERO */}
                <div className="footer-brand-row footer-brand-row-2">
                    <div className="footer-brand-track" ref={row2Ref}>
                        {[0, 1].map((s) => (
                            <React.Fragment key={s}>
                                {[0, 1, 2, 3].map((i) => (
                                    <React.Fragment key={`${s}-${i}`}>
                                        <span className="fbm-text-hero">OPENANALYST</span>
                                        <span className="fbm-sep"><span className="fbm-sep-diamond" /></span>
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Row 3 */}
                <div className="footer-brand-row footer-brand-row-3">
                    <div className="footer-brand-track" ref={row3Ref}>
                        {[0, 1].map((s) => (
                            <React.Fragment key={s}>
                                {['AI', 'MARKETING', 'AGENT', '—', 'PLAN', '·', 'CREATE', '·', 'OPTIMIZE', '—', 'AI', 'MARKETING', 'AGENT', '—', 'PLAN', '·', 'CREATE', '·', 'OPTIMIZE', '—'].map((word, i) => (
                                    <React.Fragment key={`${s}-${i}`}>
                                        <span className="fbm-text-ghost size-sm">{word}</span>
                                        {word !== '·' && word !== '—' && (
                                            <span className="fbm-sep"><span className="fbm-sep-dot" /></span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="fbm-glow-bottom" />
            </div>

            {/* ═══ Main Footer Grid — Premium Dark ═══ */}
            <div className="footer-dark-grid" ref={gridRef} style={{
                background: '#050505',
                position: 'relative',
                overflow: 'hidden',
                padding: '80px 24px 0',
            }}>
                {/* Aurora background */}
                <div ref={auroraRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                    <div className="aurora-blob" style={{
                        position: 'absolute',
                        width: '600px', height: '600px',
                        background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 60%)',
                        top: '-10%', right: '10%',
                        filter: 'blur(100px)',
                    }} />
                    <div className="aurora-blob" style={{
                        position: 'absolute',
                        width: '500px', height: '500px',
                        background: 'radial-gradient(circle, rgba(255,140,50,0.04) 0%, transparent 60%)',
                        bottom: '20%', left: '-5%',
                        filter: 'blur(80px)',
                    }} />
                </div>

                {/* Dot grid pattern */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                    maskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                {/* Cursor glow on the grid */}
                <div className="footer-grid-glow" style={{
                    position: 'absolute',
                    width: '500px', height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 60%)',
                    pointerEvents: 'none',
                    left: 'var(--glow-x, -500px)',
                    top: 'var(--glow-y, -500px)',
                    transform: 'translate(-50%, -50%)',
                    transition: 'left 0.3s ease, top 0.3s ease',
                    zIndex: 0,
                }} />

                {/* Animated gradient top separator */}
                <div className="footer-separator-glow" />

                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    {/* Links Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1.4fr repeat(4, 1fr)',
                        gap: '48px',
                        marginBottom: '60px',
                    }}>
                        {/* Brand column */}
                        <div className="footer-col-reveal">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #FF6B00, #E85D00)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    overflow: 'hidden',
                                    boxShadow: '0 0 20px rgba(255,107,0,0.2)',
                                }}>
                                    <img src="/images/logo.png" alt="OpenAnalyst" width={22} height={22} style={{ objectFit: 'contain' }} />
                                </div>
                                <span style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '17px',
                                    fontWeight: 700,
                                    color: '#FFFFFF',
                                }}>
                                    OpenAnalyst
                                </span>
                            </div>
                            <p style={{
                                fontSize: '14px',
                                color: 'rgba(255,255,255,0.45)',
                                lineHeight: 1.7,
                                maxWidth: '260px',
                                marginBottom: '24px',
                            }}>
                                AI marketing agents that plan, create, and optimize your campaigns autonomously.
                            </p>

                            {/* Colorful Social Icons with Magnetic Effect */}
                            <div style={{ display: 'flex', gap: '12px' }}>
                                {socials.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer-social-magnetic"
                                        aria-label={social.label}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            background: 'rgba(255,255,255,0.03)',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                            cursor: 'pointer',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = social.color;
                                            e.currentTarget.style.background = social.hoverBg;
                                            e.currentTarget.style.boxShadow = `0 0 20px ${social.color}33`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Link columns */}
                        {linkGroups.map((group) => (
                            <div key={group.title} className="footer-col-reveal">
                                <p style={{
                                    fontSize: '11px',
                                    color: '#FF6B00',
                                    marginBottom: '20px',
                                    fontWeight: 600,
                                    fontFamily: 'var(--font-mono)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                }}>
                                    {group.title}
                                </p>
                                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {group.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="footer-link-animated"
                                                style={{
                                                    fontSize: '14px',
                                                    color: 'rgba(255,255,255,0.5)',
                                                    textDecoration: 'none',
                                                    transition: 'all 0.25s ease',
                                                    fontFamily: 'var(--font-body)',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = '#FFFFFF';
                                                    e.currentTarget.style.transform = 'translateX(4px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                                                    e.currentTarget.style.transform = 'translateX(0)';
                                                }}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Newsletter Section */}
                    <div className="footer-newsletter-reveal" style={{
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        paddingTop: '40px',
                        paddingBottom: '40px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '24px',
                    }}>
                        <div>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: 700,
                                color: '#FFFFFF',
                                fontFamily: 'var(--font-heading)',
                                marginBottom: '6px',
                            }}>
                                Stay in the loop
                            </h3>
                            <p style={{
                                fontSize: '14px',
                                color: 'rgba(255,255,255,0.4)',
                                fontFamily: 'var(--font-body)',
                                margin: 0,
                            }}>
                                Get product updates, AI marketing tips, and early access to new features.
                            </p>
                        </div>
                        <form onSubmit={handleNewsletterSubmit} style={{
                            display: 'flex',
                            gap: '8px',
                            position: 'relative',
                        }}>
                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <input
                                    type="email"
                                    placeholder="you@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                    style={{
                                        padding: '12px 18px',
                                        fontSize: '14px',
                                        fontFamily: 'var(--font-body)',
                                        color: '#FFFFFF',
                                        background: 'rgba(255,255,255,0.04)',
                                        border: `1px solid ${emailFocused ? 'rgba(255,107,0,0.5)' : 'rgba(255,255,255,0.1)'}`,
                                        borderRadius: '10px',
                                        outline: 'none',
                                        width: '100%',
                                        minWidth: '200px',
                                        maxWidth: '260px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: emailFocused ? '0 0 20px rgba(255,107,0,0.1)' : 'none',
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={emailSubmitted}
                                style={{
                                    padding: '12px 24px',
                                    fontSize: '14px',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 600,
                                    color: '#FFFFFF',
                                    background: emailSubmitted ? '#16A34A' : 'linear-gradient(135deg, #FF6B00, #FF8533)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    cursor: emailSubmitted ? 'default' : 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    whiteSpace: 'nowrap',
                                }}
                                onMouseEnter={(e) => {
                                    if (!emailSubmitted) {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,107,0,0.3)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {emailSubmitted ? (
                                    <>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                        Subscribed
                                    </>
                                ) : (
                                    'Subscribe'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Bottom bar */}
                    <div className="footer-bottom-reveal" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                        paddingTop: '24px',
                        paddingBottom: '32px',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.35)',
                        fontFamily: 'var(--font-mono)',
                    }}>
                        <p style={{ margin: 0 }}>
                            &copy; {new Date().getFullYear()} OpenAnalyst Inc. All rights reserved.
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <a href="mailto:team@openanalyst.com" style={{
                                color: 'rgba(255,255,255,0.35)',
                                textDecoration: 'none',
                                transition: 'color 0.2s',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = '#FF6B00'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
                            >
                                team@openanalyst.com
                            </a>

                            {/* Back to top button */}
                            <button
                                onClick={scrollToTop}
                                aria-label="Back to top"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '9999px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(255,255,255,0.03)',
                                    color: 'rgba(255,255,255,0.4)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    padding: 0,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#FF6B00';
                                    e.currentTarget.style.color = '#FF6B00';
                                    e.currentTarget.style.background = 'rgba(255,107,0,0.08)';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,107,0,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 19V5M5 12l7-7 7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
