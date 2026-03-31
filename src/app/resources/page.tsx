'use client';

import { useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';

gsap.registerPlugin(ScrollTrigger);

type Category = 'All' | 'Blog' | 'Case Studies' | 'FAQs';
const categories: Category[] = ['All', 'Blog', 'Case Studies', 'FAQs'];

const resources = [
    { title: 'Getting Started with AI Marketing', desc: 'A comprehensive guide to leveraging AI agents for your marketing strategy.', category: 'Blog' as Category, date: 'Mar 10, 2026', img: '/images/blog/rise-of-ai.png' },
    { title: 'Case Study: 10x ROI with Automated Campaigns', desc: 'How a mid-market SaaS company scaled paid acquisition and cut CAC by 60%.', category: 'Case Studies' as Category, date: 'Feb 28, 2026', img: '/images/cases/roi-340.png' },
    { title: 'How to Set Up Your First Campaign', desc: 'Step-by-step walkthrough for creating and optimizing your first AI campaign.', category: 'Blog' as Category, date: 'Feb 15, 2026', img: '/images/blog/multi-channel.png' },
    { title: 'The Future of Marketing Automation', desc: 'Why traditional automation is being replaced by AI agents that think and adapt.', category: 'Blog' as Category, date: 'Jan 30, 2026', img: '/images/blog/future-martech.png' },
    { title: 'Case Study: From 0 to 50K Leads in 90 Days', desc: 'An e-commerce brand managed multi-channel campaigns across Google, Meta, and email.', category: 'Case Studies' as Category, date: 'Jan 18, 2026', img: '/images/cases/global-scale.png' },
    { title: 'AI-Driven Content Strategy Playbook', desc: 'How to use AI agents for a content marketing strategy that drives organic growth.', category: 'Blog' as Category, date: 'Jan 5, 2026', img: '/images/blog/content-gen.png' },
    { title: 'Case Study: Agency Scales to 100 Clients', desc: 'A digital marketing agency managed campaigns for 100+ clients without adding headcount.', category: 'Case Studies' as Category, date: 'Dec 20, 2025', img: '/images/blog/measuring-roi.png' },
    { title: 'Integrating OpenAnalyst with Your Stack', desc: 'Connect to HubSpot, Salesforce, Google Ads, Meta, Slack, and 20+ tools in minutes.', category: 'Blog' as Category, date: 'Dec 8, 2025', img: '/images/blog/segmentation.png' },
];

const faqs = [
    { q: 'What is OpenAnalyst and how does it work?', a: 'OpenAnalyst is an AI-powered marketing platform that uses intelligent agents to plan, execute, and optimize your marketing campaigns. Our agents connect to your existing tools and autonomously manage campaigns across channels.' },
    { q: 'How is OpenAnalyst different from traditional automation?', a: 'Traditional automation follows pre-set rules. OpenAnalyst agents learn from your data, adapt to market changes in real-time, and make decisions like a seasoned marketer — but 24/7 and at scale.' },
    { q: 'Do I need technical expertise?', a: 'Not at all. OpenAnalyst is designed for marketers. You describe your goals in plain English, and our AI agents handle the technical execution. No coding required.' },
    { q: 'What integrations are supported?', a: 'We integrate with 27+ tools including Google Ads, Meta Ads, HubSpot, Salesforce, Mailchimp, Slack, Gmail, Shopify, and more. New integrations are added regularly.' },
    { q: 'Is my data secure?', a: 'Enterprise-grade encryption (AES-256 at rest, TLS 1.3 in transit), SOC 2 Type II compliance. We never share your data with third parties. You retain full ownership.' },
    { q: 'Can I try before committing?', a: 'Yes. We offer a free trial so you can experience the platform firsthand. No credit card required to get started.' },
];

export default function ResourcesPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const heroInnerRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<Category>('All');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

    const filtered = activeTab === 'All' ? resources : resources.filter((r) => r.category === activeTab);

    useGSAP(() => {
        gsap.fromTo('.res-hero-decoration', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, delay: 0.1, ease: 'power3.out' });
        gsap.fromTo('.res-hero-heading', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', delay: 0.25 });
        gsap.fromTo('.res-hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.6 });
        gsap.fromTo('.res-hero-tabs', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.8 });

        gsap.utils.toArray<HTMLElement>('.res-reveal').forEach((el) => {
            gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
        });

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

    const toggleFaq = useCallback((index: number) => {
        const el = faqRefs.current[index];
        if (!el) return;
        if (openFaq === index) {
            gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.inOut', onComplete: () => setOpenFaq(null) });
        } else {
            if (openFaq !== null && faqRefs.current[openFaq]) {
                gsap.to(faqRefs.current[openFaq]!, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.inOut' });
            }
            setOpenFaq(index);
            gsap.set(el, { height: 'auto', opacity: 1 });
            const h = el.offsetHeight;
            gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.35, ease: 'power2.out' });
        }
    }, [openFaq]);

    const catColor = (cat: Category) => cat === 'Blog' ? '#FF6B00' : cat === 'Case Studies' ? '#3B82F6' : '#10B981';

    return (
        <div ref={pageRef} style={{ minHeight: '100vh' }}>
            <Header />

            {/* ═══ HERO — Light (asymmetric with large gradient circle) ═══ */}
            <section className="light-section" style={{ paddingTop: 160, paddingBottom: 60, background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden', perspective: 1200 }}>
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
                    <h1 className="res-hero-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 20 }}>
                        <span style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 40%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Resources</span>
                    </h1>

                    <p className="res-hero-sub" style={{ maxWidth: 520, margin: '0 auto 40px', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        Guides, case studies, and insights to help you get the most out of AI-powered marketing.
                    </p>

                    {/* Category tabs inline in hero */}
                    <div className="res-hero-tabs" style={{ display: 'inline-flex', gap: 6, padding: 4, borderRadius: 12, background: 'var(--bg-white)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                        {categories.map((cat) => (
                            <button key={cat} onClick={() => setActiveTab(cat)} style={{
                                padding: '8px 20px', borderRadius: 9, border: 'none',
                                background: activeTab === cat ? 'var(--orange)' : 'transparent',
                                color: activeTab === cat ? '#fff' : 'var(--text-muted)',
                                fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600,
                                cursor: 'pointer', transition: 'all 0.3s var(--ease-spring)',
                            }}>{cat}</button>
                        ))}
                    </div>
                </div>
                </div>
            </section>

            {/* ═══ CONTENT — Light ═══ */}
            <section className="light-section" style={{ padding: '80px 24px 100px', background: 'var(--bg-surface)' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    {/* Resource cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 80 }}>
                        {filtered.map((r, i) => (
                            <div key={i} style={{
                                borderRadius: 20, overflow: 'hidden',
                                background: 'var(--bg-white)', border: '1px solid var(--border)',
                                transition: 'all 0.3s var(--ease-spring)', cursor: 'default',
                                display: 'flex', flexDirection: 'column',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = catColor(r.category); e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${catColor(r.category)}12`; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                {/* Thumbnail */}
                                <div className="ai-img-container" style={{ height: 160 }}>
                                    <img src={r.img} alt={r.title} style={{ width: '100%', height: '100%', transition: 'transform 0.5s var(--ease-spring)' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                                    />
                                </div>
                                <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: `${catColor(r.category)}10`, color: catColor(r.category), textTransform: 'uppercase', letterSpacing: '0.04em' }}>{r.category}</span>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>{r.date}</span>
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.3 }}>{r.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.7, flex: 1 }}>{r.desc}</p>
                                    <div style={{ marginTop: 16 }}>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--orange)' }}>Read more &rarr;</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FAQ */}
                    <div className="res-reveal">
                        <div style={{ textAlign: 'center', marginBottom: 40 }}>
                            <p className="label-mono" style={{ color: 'var(--orange)', marginBottom: 12 }}>FAQ</p>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Frequently Asked Questions</h2>
                        </div>
                        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {faqs.map((faq, i) => (
                                <div key={i} style={{
                                    borderRadius: 16, background: 'var(--bg-white)', border: `1px solid ${openFaq === i ? 'var(--orange)' : 'var(--border)'}`,
                                    overflow: 'hidden', transition: 'border-color 0.3s ease',
                                }}>
                                    <button onClick={() => toggleFaq(i)} style={{
                                        width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16,
                                    }}>
                                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</span>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--orange)', flexShrink: 0, transition: 'transform 0.3s ease', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                                    </button>
                                    <div ref={(el) => { faqRefs.current[i] = el; }} style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
                                        <div style={{ padding: '0 24px 20px' }}>
                                            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>{faq.a}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="res-reveal" style={{ textAlign: 'center', padding: '56px 24px', borderRadius: 24, background: 'var(--bg-white)', border: '1px solid var(--border)', marginTop: 80, boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>
                            Ready to transform your marketing?
                        </h3>
                        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 28px' }}>
                            Get started with OpenAnalyst today and let AI agents handle your campaigns.
                        </p>
                        <a href="https://app.openanalyst.com" className="btn-primary" style={{ textDecoration: 'none' }}>
                            Get Started Free <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </a>
                    </div>
                </div>
            </section>

            <Footer
                ctaWords={['Knowledge', 'fuels', 'unstoppable', 'growth.']}
                ctaHighlight="growth."
                ctaSubtitle="From playbooks to deep dives — everything you need to win with AI marketing."
            />

            <style>{`
                @media (max-width: 600px) {
                    .res-hero-tabs { flex-wrap: wrap !important; }
                }
            `}</style>
        </div>
    );
}
