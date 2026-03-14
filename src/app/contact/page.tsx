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
        gsap.from('.contact-hero', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        });
        gsap.from('.contact-left', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
        });
        gsap.from('.contact-right', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.3,
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

            if (successRef.current) {
                gsap.from(successRef.current, {
                    scale: 0.8, y: 20, opacity: 0,
                    duration: 0.6, ease: 'back.out(1.4)',
                });
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div ref={pageRef} style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#1A1A1A' }}>
            <Header />
            <main style={{ paddingTop: '160px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
                    {/* Hero — Linear-inspired minimal */}
                    <div className="contact-hero" style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <h1 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            marginBottom: '16px',
                            letterSpacing: '-0.03em',
                        }}>
                            Get in Touch
                        </h1>
                        <p style={{ fontSize: '17px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
                            Have questions about our AI marketing agent? We&apos;d love to hear from you.
                        </p>
                    </div>

                    {/* Split Layout — Info left, Form right */}
                    <div className="contact-split-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.3fr',
                        gap: '40px',
                        alignItems: 'start',
                    }}>
                        {/* Left Panel */}
                        <div className="contact-left">
                            <div style={{
                                padding: '36px',
                                borderRadius: '20px',
                                backgroundColor: '#FAFAFA',
                                border: '1px solid #E5E5E5',
                            }}>
                                <h3 style={{
                                    fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700,
                                    color: '#1A1A1A', marginBottom: '12px',
                                }}>
                                    Let&apos;s talk
                                </h3>
                                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '32px', fontFamily: 'var(--font-body)' }}>
                                    Whether you&apos;re exploring AI marketing or ready to deploy, we&apos;re here to help.
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                        <div style={{
                                            width: '40px', height: '40px', borderRadius: '12px',
                                            backgroundColor: 'rgba(255,107,0,0.06)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '16px', color: 'var(--rust)',
                                        }}>@</div>
                                        <div>
                                            <p style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '2px' }}>Email</p>
                                            <a href="mailto:team@openanalyst.com" style={{ fontSize: '14px', color: '#1A1A1A', textDecoration: 'none', fontWeight: 500 }}>
                                                team@openanalyst.com
                                            </a>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                        <div style={{
                                            width: '40px', height: '40px', borderRadius: '12px',
                                            backgroundColor: 'rgba(255,107,0,0.06)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '16px', color: 'var(--rust)',
                                        }}>◎</div>
                                        <div>
                                            <p style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '2px' }}>Location</p>
                                            <p style={{ fontSize: '14px', color: '#1A1A1A', fontWeight: 500 }}>San Francisco, CA</p>
                                        </div>
                                    </div>

                                    <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '20px', marginTop: '8px' }}>
                                        <p style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '12px' }}>Follow us</p>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {[
                                                { label: 'X', href: 'https://x.com/OpenAnalystInc' },
                                                { label: 'in', href: 'https://www.linkedin.com/in/openanalyst-inc/' },
                                                { label: 'ig', href: 'https://www.instagram.com/openanalystinc/' },
                                            ].map((social) => (
                                                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" style={{
                                                    width: '40px', height: '40px', borderRadius: '12px',
                                                    backgroundColor: 'rgba(255,107,0,0.04)',
                                                    border: '1px solid #E5E5E5',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
                                                    textDecoration: 'none', transition: 'all 0.3s ease', fontWeight: 600,
                                                }}
                                                    onMouseEnter={(e) => {
                                                        (e.currentTarget as HTMLElement).style.borderColor = '#FF6B00';
                                                        (e.currentTarget as HTMLElement).style.color = '#FF6B00';
                                                        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,107,0,0.06)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        (e.currentTarget as HTMLElement).style.borderColor = '#E5E5E5';
                                                        (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                                                        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,107,0,0.04)';
                                                    }}
                                                >
                                                    {social.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel — Form with floating labels */}
                        <div className="contact-right">
                            <div style={{
                                padding: '36px',
                                borderRadius: '20px',
                                backgroundColor: '#FAFAFA',
                                border: '1px solid #E5E5E5',
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                <form onSubmit={handleSubmit} style={{
                                    opacity: isSubmitted ? 0.15 : 1,
                                    filter: isSubmitted ? 'blur(2px)' : 'none',
                                    transition: 'all 0.4s ease',
                                    pointerEvents: isSubmitted ? 'none' : 'auto',
                                }}>
                                    <div className="floating-field" style={{ marginBottom: '24px', position: 'relative' }}>
                                        <input
                                            type="text" id="name" value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required placeholder=" "
                                            style={{
                                                width: '100%', padding: '18px 16px 8px',
                                                backgroundColor: '#FFFFFF',
                                                border: '1px solid #E5E5E5',
                                                borderRadius: '12px', color: '#1A1A1A', fontSize: '14px',
                                                fontFamily: 'var(--font-body)', outline: 'none',
                                                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                            }}
                                            onFocus={(e) => {
                                                e.currentTarget.style.borderColor = '#FF6B00';
                                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 0, 0.08)';
                                            }}
                                            onBlur={(e) => {
                                                e.currentTarget.style.borderColor = '#E5E5E5';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        />
                                        <label htmlFor="name" style={{
                                            position: 'absolute', left: '16px', top: '14px',
                                            fontSize: '13px', fontFamily: 'var(--font-body)',
                                            color: 'var(--text-muted)', pointerEvents: 'none',
                                            transition: 'all 0.2s ease',
                                        }}>
                                            Your name
                                        </label>
                                    </div>

                                    <div className="floating-field" style={{ marginBottom: '24px', position: 'relative' }}>
                                        <input
                                            type="email" id="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required placeholder=" "
                                            style={{
                                                width: '100%', padding: '18px 16px 8px',
                                                backgroundColor: '#FFFFFF',
                                                border: '1px solid #E5E5E5',
                                                borderRadius: '12px', color: '#1A1A1A', fontSize: '14px',
                                                fontFamily: 'var(--font-body)', outline: 'none',
                                                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                            }}
                                            onFocus={(e) => {
                                                e.currentTarget.style.borderColor = '#FF6B00';
                                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 0, 0.08)';
                                            }}
                                            onBlur={(e) => {
                                                e.currentTarget.style.borderColor = '#E5E5E5';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        />
                                        <label htmlFor="email" style={{
                                            position: 'absolute', left: '16px', top: '14px',
                                            fontSize: '13px', fontFamily: 'var(--font-body)',
                                            color: 'var(--text-muted)', pointerEvents: 'none',
                                            transition: 'all 0.2s ease',
                                        }}>
                                            Your email
                                        </label>
                                    </div>

                                    <div className="floating-field" style={{ marginBottom: '24px', position: 'relative' }}>
                                        <textarea
                                            id="message" rows={4} value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required placeholder=" "
                                            style={{
                                                width: '100%', padding: '18px 16px 8px',
                                                backgroundColor: '#FFFFFF',
                                                border: '1px solid #E5E5E5',
                                                borderRadius: '12px', color: '#1A1A1A', fontSize: '14px',
                                                fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical',
                                                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                            }}
                                            onFocus={(e) => {
                                                e.currentTarget.style.borderColor = '#FF6B00';
                                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 0, 0.08)';
                                            }}
                                            onBlur={(e) => {
                                                e.currentTarget.style.borderColor = '#E5E5E5';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        />
                                        <label htmlFor="message" style={{
                                            position: 'absolute', left: '16px', top: '14px',
                                            fontSize: '13px', fontFamily: 'var(--font-body)',
                                            color: 'var(--text-muted)', pointerEvents: 'none',
                                            transition: 'all 0.2s ease',
                                        }}>
                                            Your message
                                        </label>
                                    </div>

                                    {error && (
                                        <p style={{ color: 'var(--error)', fontSize: '13px', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>{error}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        style={{
                                            width: '100%', padding: '14px', position: 'relative', overflow: 'hidden',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                            backgroundColor: isSubmitting ? '#E85D00' : '#FF6B00',
                                            color: '#FFFFFF', fontWeight: 600, fontFamily: 'var(--font-body)', fontSize: '15px',
                                            borderRadius: '12px', border: 'none',
                                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.3s ease', opacity: isSubmitting ? 0.7 : 1,
                                            boxShadow: '0 2px 12px rgba(255,107,0,0.2)',
                                        }}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                        {!isSubmitting && <span>&rarr;</span>}
                                    </button>
                                </form>

                                {isSubmitted && (
                                    <div ref={successRef} style={{
                                        position: 'absolute', inset: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        zIndex: 2,
                                    }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '56px', height: '56px', borderRadius: '50%',
                                                background: 'rgba(46, 204, 113, 0.1)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                margin: '0 auto 20px',
                                            }}>
                                                <span style={{ color: '#2ecc71', fontSize: '28px' }}>✓</span>
                                            </div>
                                            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: '#1A1A1A', marginBottom: '8px', fontWeight: 600 }}>
                                                Message sent!
                                            </p>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                                                Thank you for reaching out. We&apos;ll get back to you soon.
                                            </p>
                                        </div>
                                    </div>
                                )}
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
                        color: var(--rust) !important;
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
