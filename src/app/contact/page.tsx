'use client';

import { useState } from 'react';
import { Header, Footer } from '@/components';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

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
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <Header />
            <main style={{ flex: 1, paddingTop: '128px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        marginBottom: '24px',
                        color: '#ffffff'
                    }}>
                        Contact Us
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#9ca3af',
                        marginBottom: '48px',
                        maxWidth: '672px',
                        margin: '0 auto 48px'
                    }}>
                        Have questions? We'd love to hear from you.
                    </p>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} style={{ maxWidth: '512px', margin: '0 auto', textAlign: 'left' }}>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: '#9ca3af',
                                    marginBottom: '8px'
                                }}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        backgroundColor: '#18181b',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '8px',
                                        color: '#ffffff',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: '#9ca3af',
                                    marginBottom: '8px'
                                }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        backgroundColor: '#18181b',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '8px',
                                        color: '#ffffff',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: '#9ca3af',
                                    marginBottom: '8px'
                                }}>
                                    Message
                                </label>
                                <textarea
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        backgroundColor: '#18181b',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '8px',
                                        color: '#ffffff',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>
                            {error && (
                                <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '16px' }}>{error}</p>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    backgroundColor: isSubmitting ? '#cc6a42' : '#ff8552',
                                    color: '#ffffff',
                                    fontWeight: 700,
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease',
                                    opacity: isSubmitting ? 0.7 : 1
                                }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    ) : (
                        <div style={{
                            maxWidth: '512px',
                            margin: '0 auto',
                            padding: '48px 32px',
                            backgroundColor: 'rgba(255, 133, 82, 0.06)',
                            border: '1px solid rgba(255, 133, 82, 0.15)',
                            borderRadius: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                background: 'rgba(255, 133, 82, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px'
                            }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff8552" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <path d="m9 11 3 3L22 4" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>Message Sent!</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                Thank you for reaching out. We'll get back to you as soon as possible.
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
