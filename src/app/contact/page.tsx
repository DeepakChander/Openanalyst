'use client';

import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';
import Globe from '@/components/Globe';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const pageRef = useRef<HTMLDivElement>(null);
    const heroInnerRef = useRef<HTMLDivElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo('.ct-hero-badge', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, delay: 0.2, ease: 'back.out(1.4)' });
        gsap.fromTo('.ct-hero-heading', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.35, ease: 'power4.out' });
        gsap.fromTo('.ct-hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.6 });
        gsap.fromTo('.ct-left', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.ct-left', start: 'top 88%' } });
        gsap.fromTo('.ct-right', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.ct-right', start: 'top 88%' } });
        gsap.fromTo('.ct-map-section', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.ct-map-section', start: 'top 88%' } });

        /* ── Hero 3D perspective scroll ── */
        if (heroInnerRef.current) {
            gsap.to(heroInnerRef.current, {
                y: 80,
                scale: 0.92,
                rotateX: -5,
                opacity: 0.6,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroInnerRef.current.parentElement,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }
    }, { scope: pageRef });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) return;
        setIsSubmitting(true);
        setError('');
        try {
            const response = await fetch('/api/webhook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, source: 'contact' }),
            });
            if (!response.ok) throw new Error('Something went wrong.');
            setIsSubmitted(true);
            if (successRef.current) {
                gsap.fromTo(successRef.current, { scale: 0.8, y: 20, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' });
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        width: '100%', padding: '18px 16px 8px',
        backgroundColor: 'var(--bg-white)', border: '1px solid var(--border)',
        borderRadius: 12, color: 'var(--text-primary)', fontSize: 14,
        fontFamily: 'var(--font-body)', outline: 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    };

    return (
        <div ref={pageRef} style={{ minHeight: '100vh' }}>
            <Header />

            {/* ═══ HERO — Light (left-aligned with decorative circle) ═══ */}
            <section className="light-section" style={{ paddingTop: 'clamp(100px, 15vw, 160px)', paddingBottom: 60, background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden', perspective: 1200 }}>
                <div ref={heroInnerRef} style={{ transformOrigin: 'center top' }}>
                {/* Grid background */}
                <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'linear-gradient(to right, rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.07) 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                    maskImage: 'radial-gradient(ellipse 80% 85% at 50% 40%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 85% at 50% 40%, black 0%, transparent 70%)',
                }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: '10%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(255,107,0,0.25) 0%, rgba(255,107,0,0.5) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: '25%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(255,107,0,0.15) 0%, rgba(255,107,0,0.25) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, right: '25%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.25) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, right: '10%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.5) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: '38%', height: 1, pointerEvents: 'none', background: 'linear-gradient(to right, transparent 0%, rgba(255,107,0,0.3) 30%, rgba(139,92,246,0.3) 70%, transparent 100%)' }} />

                <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <div className="ct-hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 999, marginBottom: 28, background: 'var(--orange-light)', border: '1px solid rgba(255,107,0,0.15)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13L2 4"/></svg>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Contact</span>
                    </div>

                    <h1 className="ct-hero-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 0 }}>
                        Get in <span style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 40%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Touch</span>
                    </h1>

                    <p className="ct-hero-sub" style={{ maxWidth: 480, margin: '24px auto 0', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        Have questions about our AI marketing agents? We&apos;d love to hear from you.
                    </p>
                </div>
                </div>
            </section>

            {/* ═══ FORM — Light ═══ */}
            <section className="light-section" style={{ padding: '80px 24px 100px', background: 'var(--bg-surface)' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <div className="contact-split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 32, alignItems: 'start' }}>
                        {/* Left — Info */}
                        <div className="ct-left">
                            <div style={{ padding: 36, borderRadius: 20, background: 'var(--bg-white)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Let&apos;s talk</h3>
                                <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
                                    Whether you&apos;re exploring AI marketing or ready to deploy, we&apos;re here to help.
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    {[
                                        { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13L2 4"/></svg>, label: 'Email', value: 'team@openanalyst.com', href: 'mailto:team@openanalyst.com' },
                                        { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>, label: 'Location', value: 'San Francisco, CA' },
                                    ].map((item) => (
                                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--orange-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                                            <div>
                                                <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</p>
                                                {item.href ? (
                                                    <a href={item.href} style={{ fontSize: 14, color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>{item.value}</a>
                                                ) : (
                                                    <p style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500, margin: 0 }}>{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, marginTop: 8 }}>
                                        <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Follow us</p>
                                        <div style={{ display: 'flex', gap: 10 }}>
                                            {/* X / Twitter */}
                                            <a href="https://x.com/OpenAnalystInc" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" style={{
                                                width: 40, height: 40, borderRadius: 12, background: 'var(--bg-surface)', border: '1px solid var(--border)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s ease',
                                            }}
                                                onMouseEnter={(e) => { e.currentTarget.style.background = '#000'; e.currentTarget.style.borderColor = '#000'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-surface)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#0F172A" />
                                                </svg>
                                            </a>
                                            {/* LinkedIn */}
                                            <a href="https://www.linkedin.com/in/openanalyst-inc/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{
                                                width: 40, height: 40, borderRadius: 12, background: 'var(--bg-surface)', border: '1px solid var(--border)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s ease',
                                            }}
                                                onMouseEnter={(e) => { e.currentTarget.style.background = '#0A66C2'; e.currentTarget.style.borderColor = '#0A66C2'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-surface)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </a>
                                            {/* Instagram */}
                                            <a href="https://www.instagram.com/openanalystinc/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{
                                                width: 40, height: 40, borderRadius: 12, background: 'var(--bg-surface)', border: '1px solid var(--border)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s ease',
                                            }}
                                                onMouseEnter={(e) => { e.currentTarget.style.background = '#E4405F'; e.currentTarget.style.borderColor = '#E4405F'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-surface)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <defs><radialGradient id="ig-g" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="5%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs>
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="url(#ig-g)" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right — Form */}
                        <div className="ct-right">
                            <div style={{ padding: 36, borderRadius: 20, background: 'var(--bg-white)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                                <form onSubmit={handleSubmit} style={{ opacity: isSubmitted ? 0.15 : 1, filter: isSubmitted ? 'blur(2px)' : 'none', transition: 'all 0.4s ease', pointerEvents: isSubmitted ? 'none' : 'auto' }}>
                                    {[
                                        { id: 'name', label: 'Your name', type: 'text', value: name, onChange: setName },
                                        { id: 'email', label: 'Your email', type: 'email', value: email, onChange: setEmail },
                                    ].map((field) => (
                                        <div key={field.id} className="floating-field" style={{ marginBottom: 24, position: 'relative' }}>
                                            <input type={field.type} id={field.id} value={field.value} onChange={(e) => field.onChange(e.target.value)} required placeholder=" "
                                                style={inputStyle}
                                                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,107,0,0.08)'; }}
                                                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                                            />
                                            <label htmlFor={field.id} style={{ position: 'absolute', left: 16, top: 14, fontSize: 13, color: 'var(--text-muted)', pointerEvents: 'none', transition: 'all 0.2s ease' }}>{field.label}</label>
                                        </div>
                                    ))}
                                    <div className="floating-field" style={{ marginBottom: 24, position: 'relative' }}>
                                        <textarea id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required placeholder=" "
                                            style={{ ...inputStyle, resize: 'vertical' }}
                                            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,107,0,0.08)'; }}
                                            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                                        />
                                        <label htmlFor="message" style={{ position: 'absolute', left: 16, top: 14, fontSize: 13, color: 'var(--text-muted)', pointerEvents: 'none', transition: 'all 0.2s ease' }}>Your message</label>
                                    </div>

                                    {error && <p style={{ color: '#EF4444', fontSize: 13, marginBottom: 12, fontFamily: 'var(--font-mono)' }}>{error}</p>}

                                    <button type="submit" disabled={isSubmitting} className="btn-primary" style={{
                                        width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px',
                                        borderRadius: 12, opacity: isSubmitting ? 0.7 : 1,
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    }}>
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                        {!isSubmitting && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
                                    </button>
                                </form>

                                {isSubmitted && (
                                    <div ref={successRef} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                                            </div>
                                            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--text-primary)', marginBottom: 8, fontWeight: 600 }}>Message sent!</p>
                                            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>We&apos;ll get back to you soon.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ GLOBAL PRESENCE — Interactive 3D Globe ═══ */}
            <section className="ct-globe-section dark-section" style={{ padding: '100px 24px 80px', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
                {/* Subtle radial background */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(255,107,0,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
                    {/* Top heading */}
                    <div style={{ textAlign: 'center', marginBottom: 12 }}>
                        <p className="label-mono" style={{ color: '#FF8533', marginBottom: 12 }}>Global Presence</p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#FAFAFA', marginBottom: 12, letterSpacing: '-0.03em' }}>
                            Serving teams in <span className="text-gradient">150+ countries</span>
                        </h2>
                        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 420, margin: '0 auto', lineHeight: 1.6 }}>
                            Drag the globe to explore our worldwide infrastructure.
                        </p>
                    </div>

                    {/* Globe + side panels layout */}
                    <div className="globe-layout" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 0 }}>

                        {/* Left cities */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifySelf: 'end', paddingRight: 32 }}>
                            {[
                                { city: 'San Francisco', region: 'US-WEST-1', flag: '🇺🇸', color: '#FF6B00', ms: '12ms' },
                                { city: 'Sao Paulo', region: 'SA-EAST-1', flag: '🇧🇷', color: '#F97316', ms: '38ms' },
                                { city: 'London', region: 'EU-WEST-2', flag: '🇬🇧', color: '#3B82F6', ms: '18ms' },
                                { city: 'Dubai', region: 'ME-SOUTH-1', flag: '🇦🇪', color: '#14B8A6', ms: '32ms' },
                            ].map((loc, i) => (
                                <div key={i} className="globe-city-card" style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '14px 18px', borderRadius: 12,
                                    background: 'rgba(255,255,255,0.025)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'default', minWidth: 220,
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${loc.color}50`; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; }}
                                >
                                    <span style={{ fontSize: 22 }}>{loc.flag}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700, color: '#FAFAFA' }}>{loc.city}</div>
                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{loc.region}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: loc.color, fontFamily: 'var(--font-mono)' }}>{loc.ms}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
                                            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B98180' }} />
                                            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Live</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Center: Animated Globe */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            <Globe size={460} />
                        </div>

                        {/* Right cities */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifySelf: 'start', paddingLeft: 32 }}>
                            {[
                                { city: 'Mumbai', region: 'AP-SOUTH-1', flag: '🇮🇳', color: '#10B981', ms: '28ms' },
                                { city: 'Singapore', region: 'AP-SE-1', flag: '🇸🇬', color: '#8B5CF6', ms: '22ms' },
                                { city: 'Tokyo', region: 'AP-NE-1', flag: '🇯🇵', color: '#F59E0B', ms: '15ms' },
                                { city: 'Sydney', region: 'AP-SE-2', flag: '🇦🇺', color: '#EC4899', ms: '35ms' },
                            ].map((loc, i) => (
                                <div key={i} className="globe-city-card" style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '14px 18px', borderRadius: 12,
                                    background: 'rgba(255,255,255,0.025)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'default', minWidth: 220,
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${loc.color}50`; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; }}
                                >
                                    <span style={{ fontSize: 22 }}>{loc.flag}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700, color: '#FAFAFA' }}>{loc.city}</div>
                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{loc.region}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: loc.color, fontFamily: 'var(--font-mono)' }}>{loc.ms}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
                                            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B98180' }} />
                                            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Live</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats bar below */}
                    <div className="globe-stats" style={{
                        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1,
                        background: 'rgba(255,255,255,0.04)', borderRadius: 16, overflow: 'hidden',
                        marginTop: 48, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto',
                    }}>
                        {[
                            { value: '150+', label: 'Countries' },
                            { value: '8', label: 'Regions' },
                            { value: '99.99%', label: 'Uptime SLA' },
                            { value: '<50ms', label: 'Avg Latency' },
                        ].map((s, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.015)', padding: '24px 16px', textAlign: 'center' }}>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 800, color: '#FF6B00', marginBottom: 4 }}>{s.value}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <style>{`
                    @media (max-width: 1024px) {
                        .globe-layout {
                            grid-template-columns: 1fr !important;
                            gap: 32px !important;
                        }
                        .globe-layout > div:first-child { order: 2; justify-self: center !important; padding-right: 0 !important; }
                        .globe-layout > div:nth-child(2) { order: 1; }
                        .globe-layout > div:last-child { order: 3; justify-self: center !important; padding-left: 0 !important; }
                        .globe-layout > div:first-child,
                        .globe-layout > div:last-child {
                            display: grid !important;
                            grid-template-columns: repeat(2, 1fr) !important;
                            gap: 10px !important;
                            width: 100%;
                            max-width: 520px;
                        }
                    }
                    @media (max-width: 580px) {
                        .globe-layout > div:first-child,
                        .globe-layout > div:last-child {
                            grid-template-columns: 1fr !important;
                        }
                        .globe-stats { grid-template-columns: repeat(2, 1fr) !important; }
                    }
                `}</style>
            </section>

            <Footer
                ctaWords={['Great', 'partnerships', 'start', 'here.']}
                ctaHighlight="here."
                ctaSubtitle="Whether you have questions or a vision — we're ready to make it happen."
            />

            <style>{`
                .floating-field input:focus + label,
                .floating-field input:not(:placeholder-shown) + label,
                .floating-field textarea:focus + label,
                .floating-field textarea:not(:placeholder-shown) + label {
                    transform: translateY(-12px) scale(0.85);
                    color: var(--orange) !important;
                }
                @media (max-width: 768px) {
                    .contact-split-grid { grid-template-columns: 1fr !important; }
                    .globe-stats { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 480px) {
                    .globe-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 1px !important; }
                }
            `}</style>
        </div>
    );
}
