'use client';

import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const pageRef = useRef<HTMLDivElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.ct-hero-label', { y: 16, opacity: 0, duration: 0.5, delay: 0.2 });
        gsap.from('.ct-hero-line', { y: 80, opacity: 0, stagger: 0.12, duration: 1, ease: 'power4.out', delay: 0.3 });
        gsap.from('.ct-hero-sub', { y: 20, opacity: 0, duration: 0.6, delay: 0.8 });
        gsap.from('.ct-left', { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.4 });
        gsap.from('.ct-right', { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.5 });
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
                gsap.from(successRef.current, { scale: 0.8, y: 20, opacity: 0, duration: 0.6, ease: 'back.out(1.4)' });
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputStyle = (focused: boolean): React.CSSProperties => ({
        width: '100%', padding: '18px 16px 8px',
        backgroundColor: 'var(--bg-white)', border: `1px solid ${focused ? 'var(--orange)' : 'var(--border-default)'}`,
        borderRadius: 12, color: 'var(--text-primary)', fontSize: 14,
        fontFamily: 'var(--font-body)', outline: 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: focused ? '0 0 0 3px rgba(255,107,0,0.08)' : 'none',
    });

    return (
        <div ref={pageRef} style={{ minHeight: '100vh' }}>
            <Header />

            {/* ═══ HERO — Dark ═══ */}
            <section className="dark-section" style={{ paddingTop: 160, paddingBottom: 60, background: 'var(--bg-dark-primary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 50% 60% at 50% 50%, black 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse 50% 60% at 50% 50%, black 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', top: '20%', left: '40%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,107,0,0.04)', filter: 'blur(100px)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <div className="ct-hero-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, marginBottom: 32, border: '1px solid rgba(255,107,0,0.2)', background: 'rgba(255,107,0,0.06)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B00', boxShadow: '0 0 8px rgba(255,107,0,0.5)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF8533', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contact</span>
                    </div>
                    <h1>
                        {['Get in', 'Touch'].map((line, i) => (
                            <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                                <span className="ct-hero-line" style={{
                                    display: 'block', fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                                    fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em',
                                    ...(i === 1 ? { background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } : { color: '#FAFAFA' }),
                                }}>{line}</span>
                            </span>
                        ))}
                    </h1>
                    <p className="ct-hero-sub" style={{ maxWidth: 480, margin: '24px auto 0', fontSize: 16, color: 'var(--text-dark-secondary)', lineHeight: 1.7 }}>
                        Have questions about our AI marketing agents? We&apos;d love to hear from you.
                    </p>
                </div>
            </section>

            {/* ═══ FORM — Light ═══ */}
            <section className="light-section" style={{ padding: '80px 24px 100px', background: 'var(--bg-surface)' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <div className="contact-split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 32, alignItems: 'start' }}>
                        {/* Left — Info */}
                        <div className="ct-left">
                            <div style={{ padding: 36, borderRadius: 20, background: 'var(--bg-white)', border: '1px solid var(--border-default)' }}>
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

                                    <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: 20, marginTop: 8 }}>
                                        <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Follow us</p>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            {[
                                                { label: 'X', href: 'https://x.com/OpenAnalystInc' },
                                                { label: 'in', href: 'https://www.linkedin.com/in/openanalyst-inc/' },
                                                { label: 'ig', href: 'https://www.instagram.com/openanalystinc/' },
                                            ].map((social) => (
                                                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" style={{
                                                    width: 40, height: 40, borderRadius: 12,
                                                    background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
                                                    textDecoration: 'none', transition: 'all 0.3s ease', fontWeight: 600,
                                                }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.color = '#FF6B00'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                                                >{social.label}</a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right — Form */}
                        <div className="ct-right">
                            <div style={{ padding: 36, borderRadius: 20, background: 'var(--bg-white)', border: '1px solid var(--border-default)', position: 'relative', overflow: 'hidden' }}>
                                <form onSubmit={handleSubmit} style={{ opacity: isSubmitted ? 0.15 : 1, filter: isSubmitted ? 'blur(2px)' : 'none', transition: 'all 0.4s ease', pointerEvents: isSubmitted ? 'none' : 'auto' }}>
                                    {[
                                        { id: 'name', label: 'Your name', type: 'text', value: name, onChange: setName },
                                        { id: 'email', label: 'Your email', type: 'email', value: email, onChange: setEmail },
                                    ].map((field) => (
                                        <div key={field.id} className="floating-field" style={{ marginBottom: 24, position: 'relative' }}>
                                            <input type={field.type} id={field.id} value={field.value} onChange={(e) => field.onChange(e.target.value)} required placeholder=" "
                                                style={inputStyle(false)}
                                                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,107,0,0.08)'; }}
                                                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none'; }}
                                            />
                                            <label htmlFor={field.id} style={{ position: 'absolute', left: 16, top: 14, fontSize: 13, color: 'var(--text-muted)', pointerEvents: 'none', transition: 'all 0.2s ease' }}>{field.label}</label>
                                        </div>
                                    ))}
                                    <div className="floating-field" style={{ marginBottom: 24, position: 'relative' }}>
                                        <textarea id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required placeholder=" "
                                            style={{ ...inputStyle(false), resize: 'vertical' }}
                                            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,107,0,0.08)'; }}
                                            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none'; }}
                                        />
                                        <label htmlFor="message" style={{ position: 'absolute', left: 16, top: 14, fontSize: 13, color: 'var(--text-muted)', pointerEvents: 'none', transition: 'all 0.2s ease' }}>Your message</label>
                                    </div>

                                    {error && <p style={{ color: 'var(--error)', fontSize: 13, marginBottom: 12, fontFamily: 'var(--font-mono)' }}>{error}</p>}

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

            {/* ═══ GLOBAL PRESENCE — Dark ═══ */}
            <section className="dark-section" style={{ padding: '80px 24px', background: 'var(--bg-dark-primary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#FF8533', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>Global Presence</p>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#FAFAFA', marginBottom: 32, letterSpacing: '-0.02em' }}>
                        Serving teams in <span className="text-gradient">150+ countries</span>
                    </h2>
                    <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border-dark-default)' }}>
                        <img src="/images/misc/world-map.png" alt="OpenAnalyst global presence" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                </div>
            </section>

            <Footer />

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
                }
            `}</style>
        </div>
    );
}
