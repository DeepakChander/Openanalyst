'use client';

import { useState } from 'react';
import { Header, Footer } from '@/components';

export default function WaitlistPage() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            // Here you would typically send the email to your backend
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 16px 80px' }}>
                <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
                    {/* Coming Soon Badge */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        backgroundColor: 'rgba(255, 133, 82, 0.1)',
                        border: '1px solid rgba(255, 133, 82, 0.3)',
                        borderRadius: '9999px',
                        marginBottom: '32px'
                    }}>
                        <span style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#ff8552',
                            borderRadius: '50%',
                            animation: 'pulse 2s infinite'
                        }} />
                        <span style={{ color: '#ff8552', fontSize: '0.875rem', fontWeight: 600 }}>
                            Coming Soon
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        marginBottom: '24px'
                    }}>
                        Something <span style={{ color: '#ff8552' }}>Amazing</span> is Brewing
                    </h1>

                    {/* Description */}
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#9ca3af',
                        lineHeight: 1.7,
                        marginBottom: '48px',
                        maxWidth: '480px',
                        margin: '0 auto 48px'
                    }}>
                        We're building the future of AI-powered analytics. Be the first to experience it when we launch.
                    </p>

                    {!isSubmitted ? (
                        <>
                            {/* Email Form */}
                            <form onSubmit={handleSubmit} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                maxWidth: '440px',
                                margin: '0 auto 32px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    gap: '12px',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center'
                                }}>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{
                                            flex: '1',
                                            minWidth: '240px',
                                            padding: '16px 20px',
                                            backgroundColor: '#18181b',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '12px',
                                            color: '#ffffff',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        style={{
                                            padding: '16px 32px',
                                            backgroundColor: '#ff8552',
                                            color: '#ffffff',
                                            fontWeight: 700,
                                            borderRadius: '12px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Join Waitlist
                                    </button>
                                </div>
                            </form>

                            {/* Trust Indicators */}
                            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                🔒 No spam, ever. We respect your privacy.
                            </p>
                        </>
                    ) : (
                        /* Success Message */
                        <div style={{
                            padding: '32px',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            borderRadius: '16px',
                            maxWidth: '440px',
                            margin: '0 auto'
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 16px'
                            }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22c55e', marginBottom: '8px' }}>
                                You're on the list!
                            </h3>
                            <p style={{ color: '#9ca3af' }}>
                                We'll notify you as soon as we launch. Get ready for something special.
                            </p>
                        </div>
                    )}

                    {/* Features Preview */}
                    <div style={{
                        marginTop: '80px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                        gap: '24px'
                    }}>
                        {[
                            { icon: '🚀', title: 'Lightning Fast', desc: 'Real-time analytics' },
                            { icon: '🤖', title: 'AI Powered', desc: 'Smart insights' },
                            { icon: '🔗', title: '24+ Integrations', desc: 'Connect everything' },
                            { icon: '🛡️', title: 'Enterprise Ready', desc: 'Bank-grade security' }
                        ].map((feature, i) => (
                            <div key={i} style={{
                                padding: '24px 16px',
                                backgroundColor: '#18181b',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.05)'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{feature.icon}</div>
                                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>
                                    {feature.title}
                                </h4>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Social Proof */}
                    <div style={{ marginTop: '64px' }}>
                        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '16px' }}>
                            Join 2,000+ professionals already on the waitlist
                        </p>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '-8px'
                        }}>
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: `hsl(${i * 60}, 70%, 60%)`,
                                    border: '2px solid #000000',
                                    marginLeft: i > 0 ? '-12px' : '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: '#ffffff'
                                }}>
                                    {String.fromCharCode(65 + i)}
                                </div>
                            ))}
                            <span style={{
                                marginLeft: '8px',
                                padding: '4px 12px',
                                backgroundColor: '#18181b',
                                borderRadius: '9999px',
                                fontSize: '0.875rem',
                                color: '#9ca3af'
                            }}>
                                +2k
                            </span>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

            {/* Pulse Animation */}
            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
}
