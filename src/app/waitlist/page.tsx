'use client';

import { useState, useEffect } from 'react';
import { Header, Footer } from '@/components';

export default function WaitlistPage() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [waitlistCount] = useState(2147);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
        }
    };

    return (
        <div className="waitlist-page">
            <Header />

            {/* Animated mesh gradient background */}
            <div className="waitlist-bg">
                <div
                    className="waitlist-orb waitlist-orb-1"
                    style={{ left: `${mousePos.x * 0.3 + 10}%`, top: `${mousePos.y * 0.3 + 5}%` }}
                />
                <div
                    className="waitlist-orb waitlist-orb-2"
                    style={{ left: `${100 - mousePos.x * 0.2}%`, top: `${mousePos.y * 0.4 + 20}%` }}
                />
                <div className="waitlist-orb waitlist-orb-3" />
                <div className="waitlist-grid-overlay" />
            </div>

            <main className={`waitlist-main ${isVisible ? 'waitlist-visible' : ''}`}>
                {/* Hero Section */}
                <section className="waitlist-hero">
                    <div className="waitlist-badge">
                        <span className="waitlist-badge-dot" />
                        <span className="waitlist-badge-text">Early Access</span>
                        <span className="waitlist-badge-divider" />
                        <span className="waitlist-badge-count">{waitlistCount.toLocaleString()} on the list</span>
                    </div>

                    <h1 className="waitlist-title">
                        The future of analytics
                        <br />
                        <span className="waitlist-title-accent">starts here.</span>
                    </h1>

                    <p className="waitlist-subtitle">
                        OpenAnalyst transforms raw data into actionable intelligence with AI that
                        understands your business. Join the pioneers shaping the next generation of analytics.
                    </p>

                    {/* Email Form */}
                    {!isSubmitted ? (
                        <div className="waitlist-form-wrapper">
                            <form onSubmit={handleSubmit} className="waitlist-form">
                                <div className="waitlist-input-group">
                                    <svg className="waitlist-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                    <input
                                        type="email"
                                        placeholder="you@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="waitlist-input"
                                    />
                                    <button type="submit" className="waitlist-submit">
                                        Request Access
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                            <div className="waitlist-trust">
                                <div className="waitlist-trust-item">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                    <span>No credit card required</span>
                                </div>
                                <span className="waitlist-trust-sep" />
                                <div className="waitlist-trust-item">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                    <span>Privacy-first</span>
                                </div>
                                <span className="waitlist-trust-sep" />
                                <div className="waitlist-trust-item">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                                    <span>Cancel anytime</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="waitlist-success">
                            <div className="waitlist-success-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff8552" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <path d="m9 11 3 3L22 4" />
                                </svg>
                            </div>
                            <h3 className="waitlist-success-title">You're in.</h3>
                            <p className="waitlist-success-pos">Position #{waitlistCount + 1} on the waitlist</p>
                            <p className="waitlist-success-desc">
                                We'll reach out when your spot opens up. Keep an eye on your inbox.
                            </p>
                        </div>
                    )}
                </section>

                {/* Stats Bar */}
                <section className="waitlist-stats">
                    {[
                        { value: '50ms', label: 'Avg. Query Time' },
                        { value: '24+', label: 'Integrations' },
                        { value: '99.9%', label: 'Uptime SLA' },
                        { value: '10x', label: 'Faster Insights' },
                    ].map((stat, i) => (
                        <div key={i} className="waitlist-stat">
                            <span className="waitlist-stat-value">{stat.value}</span>
                            <span className="waitlist-stat-label">{stat.label}</span>
                        </div>
                    ))}
                </section>

                {/* Features */}
                <section className="waitlist-features">
                    <div className="waitlist-features-header">
                        <span className="waitlist-section-tag">What you'll get</span>
                        <h2 className="waitlist-section-title">Built for teams who move fast</h2>
                    </div>
                    <div className="waitlist-features-grid">
                        {[
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                                    </svg>
                                ),
                                title: 'Real-time Processing',
                                desc: 'Sub-50ms query execution across billions of data points with our proprietary engine.',
                            },
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2a4 4 0 0 0-4 4c0 2 1.3 3.7 4 6 2.7-2.3 4-4 4-6a4 4 0 0 0-4-4z" />
                                        <path d="M12 12v10" />
                                        <path d="M4.93 15.5C2.8 16.5 1.5 17.8 1.5 19.3 1.5 21.3 6.2 23 12 23s10.5-1.7 10.5-3.7c0-1.5-1.3-2.8-3.43-3.8" />
                                    </svg>
                                ),
                                title: 'AI-Native Intelligence',
                                desc: 'Ask questions in plain English. Our models surface patterns humans miss.',
                            },
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="3" width="20" height="14" rx="2" />
                                        <path d="M8 21h8" />
                                        <path d="M12 17v4" />
                                        <path d="m6 8 2 2 4-4" />
                                    </svg>
                                ),
                                title: 'Live Dashboards',
                                desc: 'Collaborative dashboards that update as your data changes. Share with your whole team.',
                            },
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                ),
                                title: 'Enterprise Security',
                                desc: 'SOC 2 Type II certified. End-to-end encryption. Your data never leaves your control.',
                            },
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                    </svg>
                                ),
                                title: 'Universal Connectors',
                                desc: '24+ native integrations. Connect Snowflake, BigQuery, Postgres, and more in minutes.',
                            },
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                ),
                                title: 'Team Collaboration',
                                desc: 'Shared workspaces, annotations, and real-time co-editing for data-driven teams.',
                            },
                        ].map((feature, i) => (
                            <div key={i} className="waitlist-feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="waitlist-feature-icon">{feature.icon}</div>
                                <h3 className="waitlist-feature-title">{feature.title}</h3>
                                <p className="waitlist-feature-desc">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Social Proof / Logos */}
                <section className="waitlist-social">
                    <p className="waitlist-social-label">Trusted by teams at</p>
                    <div className="waitlist-logos">
                        {['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma'].map((name, i) => (
                            <span key={i} className="waitlist-logo-text">{name}</span>
                        ))}
                    </div>
                </section>

                {/* Bottom CTA */}
                {!isSubmitted && (
                    <section className="waitlist-bottom-cta">
                        <div className="waitlist-bottom-cta-inner">
                            <h2 className="waitlist-bottom-title">Ready to see what's next?</h2>
                            <p className="waitlist-bottom-desc">
                                Spots are limited. Join the waitlist today and be among the first to experience OpenAnalyst.
                            </p>
                            <button
                                className="waitlist-bottom-btn"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                Claim Your Spot
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 19V5" />
                                    <path d="m5 12 7-7 7 7" />
                                </svg>
                            </button>
                        </div>
                    </section>
                )}
            </main>

            <Footer />

            <style jsx global>{`
                /* ====== Waitlist Page Styles ====== */
                .waitlist-page {
                    min-height: 100vh;
                    background: #050505;
                    color: #ffffff;
                    overflow-x: hidden;
                    position: relative;
                }

                /* Animated Background */
                .waitlist-bg {
                    position: fixed;
                    inset: 0;
                    z-index: 0;
                    overflow: hidden;
                    pointer-events: none;
                }

                .waitlist-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(120px);
                    opacity: 0.35;
                    transition: left 0.8s ease-out, top 0.8s ease-out;
                }

                .waitlist-orb-1 {
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, #ff8552 0%, transparent 70%);
                }

                .waitlist-orb-2 {
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, #3498db 0%, transparent 70%);
                }

                .waitlist-orb-3 {
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, #576A6A 0%, transparent 70%);
                    left: 50%;
                    bottom: -10%;
                    animation: waitlist-float 15s ease-in-out infinite;
                }

                .waitlist-grid-overlay {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
                    background-size: 64px 64px;
                    mask-image: radial-gradient(ellipse 60% 60% at 50% 40%, black 20%, transparent 70%);
                    -webkit-mask-image: radial-gradient(ellipse 60% 60% at 50% 40%, black 20%, transparent 70%);
                }

                @keyframes waitlist-float {
                    0%, 100% { transform: translate(-50%, 0); }
                    50% { transform: translate(-50%, -40px); }
                }

                /* Main Content */
                .waitlist-main {
                    position: relative;
                    z-index: 1;
                    opacity: 0;
                    transform: translateY(24px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }

                .waitlist-main.waitlist-visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* Hero */
                .waitlist-hero {
                    max-width: 720px;
                    margin: 0 auto;
                    padding: 160px 24px 80px;
                    text-align: center;
                }

                .waitlist-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 6px 18px;
                    background: rgba(255, 133, 82, 0.08);
                    border: 1px solid rgba(255, 133, 82, 0.2);
                    border-radius: 9999px;
                    margin-bottom: 40px;
                    font-size: 0.8rem;
                }

                .waitlist-badge-dot {
                    width: 6px;
                    height: 6px;
                    background: #ff8552;
                    border-radius: 50%;
                    animation: waitlist-pulse 2s ease-in-out infinite;
                }

                .waitlist-badge-text {
                    color: #ff8552;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }

                .waitlist-badge-divider {
                    width: 1px;
                    height: 14px;
                    background: rgba(255, 255, 255, 0.15);
                }

                .waitlist-badge-count {
                    color: rgba(255, 255, 255, 0.5);
                    font-variant-numeric: tabular-nums;
                }

                @keyframes waitlist-pulse {
                    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 133, 82, 0.4); }
                    50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(255, 133, 82, 0); }
                }

                .waitlist-title {
                    font-family: var(--font-heading);
                    font-size: clamp(2.8rem, 7vw, 4.5rem);
                    font-weight: 700;
                    line-height: 1.05;
                    letter-spacing: -0.03em;
                    margin-bottom: 28px;
                    color: #ffffff;
                }

                .waitlist-title-accent {
                    background: linear-gradient(135deg, #ff8552 0%, #ff6b35 50%, #e85d26 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .waitlist-subtitle {
                    font-size: 1.15rem;
                    color: rgba(255, 255, 255, 0.5);
                    line-height: 1.75;
                    max-width: 540px;
                    margin: 0 auto 48px;
                }

                /* Form */
                .waitlist-form-wrapper {
                    max-width: 520px;
                    margin: 0 auto;
                }

                .waitlist-form {
                    width: 100%;
                }

                .waitlist-input-group {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.06);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 6px;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }

                .waitlist-input-group:focus-within {
                    border-color: rgba(255, 133, 82, 0.5);
                    box-shadow: 0 0 0 4px rgba(255, 133, 82, 0.08);
                }

                .waitlist-input-icon {
                    margin-left: 16px;
                    color: rgba(255, 255, 255, 0.3);
                    flex-shrink: 0;
                }

                .waitlist-input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    padding: 14px 12px;
                    color: #ffffff;
                    font-size: 0.95rem;
                    outline: none;
                    min-width: 0;
                }

                .waitlist-input::placeholder {
                    color: rgba(255, 255, 255, 0.3);
                }

                .waitlist-submit {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 28px;
                    background: linear-gradient(135deg, #ff8552 0%, #ff6b35 100%);
                    color: #ffffff;
                    font-weight: 600;
                    font-size: 0.9rem;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    flex-shrink: 0;
                }

                .waitlist-submit:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 24px rgba(255, 133, 82, 0.3);
                }

                .waitlist-submit:active {
                    transform: translateY(0);
                }

                /* Trust */
                .waitlist-trust {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                    margin-top: 20px;
                    flex-wrap: wrap;
                }

                .waitlist-trust-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: rgba(255, 255, 255, 0.35);
                    font-size: 0.8rem;
                }

                .waitlist-trust-sep {
                    width: 3px;
                    height: 3px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.15);
                }

                /* Success */
                .waitlist-success {
                    max-width: 400px;
                    margin: 0 auto;
                    padding: 48px 32px;
                    background: rgba(255, 133, 82, 0.06);
                    border: 1px solid rgba(255, 133, 82, 0.15);
                    border-radius: 24px;
                    text-align: center;
                    animation: waitlist-scale-in 0.5s ease-out;
                }

                @keyframes waitlist-scale-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }

                .waitlist-success-icon {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: rgba(255, 133, 82, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                }

                .waitlist-success-title {
                    font-family: var(--font-heading);
                    font-size: 1.75rem;
                    font-weight: 700;
                    margin-bottom: 8px;
                }

                .waitlist-success-pos {
                    color: #ff8552;
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-bottom: 12px;
                    font-variant-numeric: tabular-nums;
                }

                .waitlist-success-desc {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.95rem;
                    line-height: 1.6;
                }

                /* Stats */
                .waitlist-stats {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 24px 80px;
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1px;
                    background: rgba(255, 255, 255, 0.06);
                    border-radius: 20px;
                    overflow: hidden;
                }

                .waitlist-stat {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    padding: 32px 16px;
                    background: rgba(5, 5, 5, 0.9);
                }

                .waitlist-stat-value {
                    font-family: var(--font-heading);
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #ff8552;
                    font-variant-numeric: tabular-nums;
                }

                .waitlist-stat-label {
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.4);
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                }

                /* Features */
                .waitlist-features {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 80px 24px;
                }

                .waitlist-features-header {
                    text-align: center;
                    margin-bottom: 56px;
                }

                .waitlist-section-tag {
                    display: inline-block;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    color: #ff8552;
                    margin-bottom: 16px;
                }

                .waitlist-section-title {
                    font-family: var(--font-heading);
                    font-size: clamp(1.75rem, 4vw, 2.5rem);
                    font-weight: 700;
                    letter-spacing: -0.02em;
                }

                .waitlist-features-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1px;
                    background: rgba(255, 255, 255, 0.06);
                    border-radius: 20px;
                    overflow: hidden;
                }

                .waitlist-feature-card {
                    padding: 40px 32px;
                    background: rgba(5, 5, 5, 0.9);
                    transition: background 0.3s ease;
                }

                .waitlist-feature-card:hover {
                    background: rgba(255, 133, 82, 0.04);
                }

                .waitlist-feature-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    background: rgba(255, 133, 82, 0.08);
                    border: 1px solid rgba(255, 133, 82, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ff8552;
                    margin-bottom: 20px;
                }

                .waitlist-feature-title {
                    font-family: var(--font-heading);
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 10px;
                    color: #ffffff;
                }

                .waitlist-feature-desc {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.45);
                    line-height: 1.65;
                }

                /* Social Proof */
                .waitlist-social {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 64px 24px;
                    text-align: center;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                }

                .waitlist-social-label {
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.3);
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    margin-bottom: 32px;
                }

                .waitlist-logos {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 48px;
                    flex-wrap: wrap;
                }

                .waitlist-logo-text {
                    font-family: var(--font-heading);
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.15);
                    letter-spacing: 0.02em;
                    transition: color 0.3s ease;
                }

                .waitlist-logo-text:hover {
                    color: rgba(255, 255, 255, 0.35);
                }

                /* Bottom CTA */
                .waitlist-bottom-cta {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 24px 100px;
                }

                .waitlist-bottom-cta-inner {
                    text-align: center;
                    padding: 64px 40px;
                    background: linear-gradient(135deg, rgba(255, 133, 82, 0.08) 0%, rgba(52, 152, 219, 0.06) 100%);
                    border: 1px solid rgba(255, 133, 82, 0.12);
                    border-radius: 24px;
                    position: relative;
                    overflow: hidden;
                }

                .waitlist-bottom-cta-inner::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 30% 50%, rgba(255, 133, 82, 0.08) 0%, transparent 60%);
                    pointer-events: none;
                }

                .waitlist-bottom-title {
                    font-family: var(--font-heading);
                    font-size: clamp(1.5rem, 3.5vw, 2.25rem);
                    font-weight: 700;
                    margin-bottom: 16px;
                    letter-spacing: -0.02em;
                    position: relative;
                }

                .waitlist-bottom-desc {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 1rem;
                    max-width: 440px;
                    margin: 0 auto 32px;
                    line-height: 1.65;
                    position: relative;
                }

                .waitlist-bottom-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 36px;
                    background: linear-gradient(135deg, #ff8552 0%, #ff6b35 100%);
                    color: #ffffff;
                    font-weight: 600;
                    font-size: 0.95rem;
                    border: none;
                    border-radius: 14px;
                    cursor: pointer;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    position: relative;
                }

                .waitlist-bottom-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(255, 133, 82, 0.3);
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .waitlist-hero {
                        padding: 140px 20px 60px;
                    }

                    .waitlist-input-group {
                        flex-direction: column;
                        padding: 8px;
                        border-radius: 14px;
                    }

                    .waitlist-input-icon {
                        display: none;
                    }

                    .waitlist-input {
                        padding: 14px 16px;
                        text-align: center;
                    }

                    .waitlist-submit {
                        width: 100%;
                        justify-content: center;
                        border-radius: 10px;
                    }

                    .waitlist-stats {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .waitlist-features-grid {
                        grid-template-columns: 1fr;
                    }

                    .waitlist-trust {
                        flex-direction: column;
                        gap: 8px;
                    }

                    .waitlist-trust-sep {
                        display: none;
                    }

                    .waitlist-logos {
                        gap: 24px;
                    }
                }
            `}</style>
        </div>
    );
}
