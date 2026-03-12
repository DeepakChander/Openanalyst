'use client';

import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';
import Magnetic from '@/components/Magnetic';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const pageRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.contact-hero', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        });
        gsap.from('.contact-left', {
            x: -40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
        });
        gsap.from('.contact-right', {
            x: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.3,
        });
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

            if (!response.ok) throw new Error('Something went wrong. Please try again.');
            setIsSubmitted(true);

            // Morph success message in
            if (successRef.current) {
                gsap.from(successRef.current, {
                    scale: 0.8,
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'back.out(1.4)',
                });
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Ripple effect on submit button
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
            position: absolute; width: ${size}px; height: ${size}px;
            left: ${e.clientX - rect.left - size / 2}px;
            top: ${e.clientY - rect.top - size / 2}px;
            background: rgba(255,255,255,0.3); border-radius: 50%;
            transform: scale(0); pointer-events: none;
        `;
        button.appendChild(ripple);
        gsap.to(ripple, {
            scale: 2, opacity: 0, duration: 0.6, ease: 'power2.out',
            onComplete: () => ripple.remove(),
        });
        // Bounce the button
        gsap.fromTo(button, { scale: 0.97 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    };

    return (
        <div ref={pageRef} style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            <Header />
            <main style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
                    {/* Hero */}
                    <div className="contact-hero" style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--syntax-comment)', marginBottom: '16px' }}>
                            {'// CONTACT'}
                        </p>
                        <h1 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800,
                            lineHeight: 1.1, marginBottom: '16px',
                        }}>
                            Get in Touch
                        </h1>
                        <p style={{ fontSize: '16px', color: 'var(--muted)', fontFamily: 'var(--font-body)', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
                            Have questions about our AI marketing agent? We&apos;d love to hear from you.
                        </p>
                    </div>

                    {/* Split Layout */}
                    <div className="contact-split-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.3fr',
                        gap: '32px',
                        alignItems: 'start',
                    }}>
                        {/* Left Panel — Company Info */}
                        <div className="contact-left">
                            <div style={{
                                padding: '32px',
                                borderRadius: '20px',
                                backgroundColor: 'var(--terminal-bg)',
                                border: '1px solid rgba(255,255,255,0.08)',
                            }}>
                                <div style={{ marginBottom: '32px' }}>
                                    <h3 style={{
                                        fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700,
                                        color: '#ffffff', marginBottom: '12px',
                                    }}>
                                        Let&apos;s talk
                                    </h3>
                                    <p style={{ fontSize: '14px', color: '#a89890', lineHeight: 1.7 }}>
                                        Whether you&apos;re exploring AI marketing or ready to deploy, we&apos;re here to help.
                                    </p>
                                </div>

                                {/* Contact details */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '36px', height: '36px', borderRadius: '10px',
                                            backgroundColor: 'rgba(204,122,96,0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '14px', color: 'var(--primary)',
                                        }}>@</div>
                                        <div>
                                            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#6b6260', marginBottom: '2px' }}>{'// email'}</p>
                                            <a href="mailto:team@openanalyst.com" style={{ fontSize: '13px', color: '#d4d4d8', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>
                                                team@openanalyst.com
                                            </a>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '36px', height: '36px', borderRadius: '10px',
                                            backgroundColor: 'rgba(204,122,96,0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '14px', color: 'var(--primary)',
                                        }}>◎</div>
                                        <div>
                                            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#6b6260', marginBottom: '2px' }}>{'// location'}</p>
                                            <p style={{ fontSize: '13px', color: '#d4d4d8', fontFamily: 'var(--font-mono)' }}>San Francisco, CA</p>
                                        </div>
                                    </div>

                                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', marginTop: '8px' }}>
                                        <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#6b6260', marginBottom: '12px' }}>{'// socials'}</p>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {[
                                                { label: 'X', href: 'https://x.com/OpenAnalystInc' },
                                                { label: 'in', href: 'https://www.linkedin.com/in/openanalyst-inc/' },
                                                { label: 'ig', href: 'https://www.instagram.com/openanalystinc/' },
                                            ].map((social) => (
                                                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" style={{
                                                    width: '36px', height: '36px', borderRadius: '10px',
                                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '12px', color: '#a89890', fontFamily: 'var(--font-mono)',
                                                    textDecoration: 'none', transition: 'all 0.3s ease', fontWeight: 600,
                                                }}
                                                    onMouseEnter={(e) => {
                                                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)';
                                                        (e.currentTarget as HTMLElement).style.color = 'var(--primary)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                                                        (e.currentTarget as HTMLElement).style.color = '#a89890';
                                                    }}
                                                >
                                                    {social.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick CTA */}
                            <div style={{ marginTop: '16px', textAlign: 'center' }}>
                                <Magnetic>
                                    <a href="https://app.openanalyst.com" style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                        fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 500,
                                        color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.3s ease',
                                    }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
                                    >
                                        Or just get started &rarr;
                                    </a>
                                </Magnetic>
                            </div>
                        </div>

                        {/* Right Panel — Form */}
                        <div className="contact-right">
                            <div className="terminal-card" style={{ position: 'relative', overflow: 'hidden' }}>
                                <div className="terminal-card-header">
                                    <div className="terminal-dots"><span /><span /><span /></div>
                                    <span style={{ color: '#6b7280', fontSize: '11px', marginLeft: '8px' }}>contact-form.tsx</span>
                                </div>
                                <div style={{ padding: '32px 24px', position: 'relative' }}>
                                    {/* Form */}
                                    <form ref={formRef} onSubmit={handleSubmit} style={{
                                        opacity: isSubmitted ? 0.15 : 1,
                                        filter: isSubmitted ? 'blur(2px)' : 'none',
                                        transition: 'all 0.4s ease',
                                        pointerEvents: isSubmitted ? 'none' : 'auto',
                                    }}>
                                        {/* Floating label input — Name */}
                                        <div className="floating-field" style={{ marginBottom: '24px', position: 'relative' }}>
                                            <input
                                                type="text"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                placeholder=" "
                                                style={{
                                                    width: '100%', padding: '18px 16px 8px',
                                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '10px', color: '#d4d4d8', fontSize: '14px',
                                                    fontFamily: 'var(--font-mono)', outline: 'none',
                                                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(204, 122, 96, 0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            />
                                            <label htmlFor="name" style={{
                                                position: 'absolute', left: '16px', top: '14px',
                                                fontSize: '12px', fontFamily: 'var(--font-mono)',
                                                color: 'var(--syntax-comment)', pointerEvents: 'none',
                                                transition: 'all 0.2s ease',
                                            }}>
                                                {'// your_name'}
                                            </label>
                                        </div>

                                        {/* Floating label input — Email */}
                                        <div className="floating-field" style={{ marginBottom: '24px', position: 'relative' }}>
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                placeholder=" "
                                                style={{
                                                    width: '100%', padding: '18px 16px 8px',
                                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '10px', color: '#d4d4d8', fontSize: '14px',
                                                    fontFamily: 'var(--font-mono)', outline: 'none',
                                                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(204, 122, 96, 0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            />
                                            <label htmlFor="email" style={{
                                                position: 'absolute', left: '16px', top: '14px',
                                                fontSize: '12px', fontFamily: 'var(--font-mono)',
                                                color: 'var(--syntax-comment)', pointerEvents: 'none',
                                                transition: 'all 0.2s ease',
                                            }}>
                                                {'// your_email'}
                                            </label>
                                        </div>

                                        {/* Floating label input — Message */}
                                        <div className="floating-field" style={{ marginBottom: '24px', position: 'relative' }}>
                                            <textarea
                                                id="message"
                                                rows={4}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                required
                                                placeholder=" "
                                                style={{
                                                    width: '100%', padding: '18px 16px 8px',
                                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '10px', color: '#d4d4d8', fontSize: '14px',
                                                    fontFamily: 'var(--font-mono)', outline: 'none', resize: 'vertical',
                                                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(204, 122, 96, 0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            />
                                            <label htmlFor="message" style={{
                                                position: 'absolute', left: '16px', top: '14px',
                                                fontSize: '12px', fontFamily: 'var(--font-mono)',
                                                color: 'var(--syntax-comment)', pointerEvents: 'none',
                                                transition: 'all 0.2s ease',
                                            }}>
                                                {'// your_message'}
                                            </label>
                                        </div>

                                        {error && (
                                            <p style={{ color: 'var(--error)', fontSize: '13px', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>{error}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            onClick={handleButtonClick}
                                            style={{
                                                width: '100%', padding: '14px', position: 'relative', overflow: 'hidden',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                                backgroundColor: isSubmitting ? 'var(--primary-dark)' : 'var(--primary)',
                                                color: '#ffffff', fontWeight: 600, fontFamily: 'var(--font-mono)', fontSize: '14px',
                                                borderRadius: '10px', border: 'none',
                                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.3s ease', opacity: isSubmitting ? 0.7 : 1,
                                            }}
                                        >
                                            <span style={{ color: 'var(--cmd-prefix)', fontSize: '12px' }}>$</span>
                                            {isSubmitting ? 'sending...' : 'send_message'}
                                        </button>
                                    </form>

                                    {/* Success overlay */}
                                    {isSubmitted && (
                                        <div ref={successRef} style={{
                                            position: 'absolute',
                                            inset: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 2,
                                        }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{
                                                    width: '56px', height: '56px', borderRadius: '50%',
                                                    background: 'rgba(46, 204, 113, 0.1)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    margin: '0 auto 20px',
                                                }}>
                                                    <span style={{ color: 'var(--syntax-string)', fontSize: '28px' }}>✓</span>
                                                </div>
                                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', color: 'var(--syntax-string)', marginBottom: '8px' }}>
                                                    ✓ Message sent successfully.
                                                </p>
                                                <p style={{ color: '#8a7a72', fontSize: '14px' }}>
                                                    Thank you for reaching out. We&apos;ll get back to you soon.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                    .floating-field input:focus + label,
                    .floating-field input:not(:placeholder-shown) + label,
                    .floating-field textarea:focus + label,
                    .floating-field textarea:not(:placeholder-shown) + label {
                        transform: translateY(-12px) scale(0.85);
                        color: var(--primary) !important;
                    }
                    @media (max-width: 768px) {
                        .contact-split-grid {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}</style>
            </main>
            <Footer />
        </div>
    );
}
