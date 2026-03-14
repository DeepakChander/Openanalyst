'use client';

import { useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';
import Magnetic from '@/components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

type Category = 'All' | 'Blog' | 'Case Studies' | 'FAQs';

const categories: Category[] = ['All', 'Blog', 'Case Studies', 'FAQs'];

const resources = [
    {
        title: 'Getting Started with AI Marketing',
        desc: 'A comprehensive guide to leveraging AI agents for your marketing strategy, from setup to your first automated campaign.',
        category: 'Blog' as Category,
        date: 'Mar 10, 2026',
    },
    {
        title: 'Case Study: 10x ROI with Automated Campaigns',
        desc: 'How a mid-market SaaS company used OpenAnalyst to scale paid acquisition and cut CAC by 60%.',
        category: 'Case Studies' as Category,
        date: 'Feb 28, 2026',
    },
    {
        title: 'How to Set Up Your First Campaign',
        desc: 'Step-by-step walkthrough for creating, launching, and optimizing your first AI-powered marketing campaign.',
        category: 'Blog' as Category,
        date: 'Feb 15, 2026',
    },
    {
        title: 'The Future of Marketing Automation',
        desc: 'Why traditional automation tools are being replaced by AI agents that think, adapt, and optimize in real-time.',
        category: 'Blog' as Category,
        date: 'Jan 30, 2026',
    },
    {
        title: 'Case Study: From 0 to 50K Leads in 90 Days',
        desc: 'An e-commerce brand shares how OpenAnalyst agents managed multi-channel campaigns across Google, Meta, and email.',
        category: 'Case Studies' as Category,
        date: 'Jan 18, 2026',
    },
    {
        title: 'AI-Driven Content Strategy Playbook',
        desc: 'How to use AI agents to research, plan, and execute a content marketing strategy that drives organic growth.',
        category: 'Blog' as Category,
        date: 'Jan 5, 2026',
    },
    {
        title: 'Case Study: Agency Scales to 100 Clients',
        desc: 'A digital marketing agency used OpenAnalyst to manage campaigns for 100+ clients without adding headcount.',
        category: 'Case Studies' as Category,
        date: 'Dec 20, 2025',
    },
    {
        title: 'Integrating OpenAnalyst with Your Stack',
        desc: 'Connect OpenAnalyst to HubSpot, Salesforce, Google Ads, Meta, Slack, and 20+ other tools in minutes.',
        category: 'Blog' as Category,
        date: 'Dec 8, 2025',
    },
];

const faqs = [
    {
        q: 'What is OpenAnalyst and how does it work?',
        a: 'OpenAnalyst is an AI-powered marketing platform that uses intelligent agents to plan, execute, and optimize your marketing campaigns. Our agents connect to your existing tools and autonomously manage campaigns across channels like Google Ads, Meta, email, and more.',
    },
    {
        q: 'How is OpenAnalyst different from traditional marketing automation?',
        a: 'Traditional automation tools follow pre-set rules. OpenAnalyst agents learn from your data, adapt to market changes in real-time, and make decisions like a seasoned marketer would \u2014 but 24/7 and at scale.',
    },
    {
        q: 'Do I need technical expertise to use OpenAnalyst?',
        a: 'Not at all. OpenAnalyst is designed for marketers, not engineers. You describe your goals in plain English, and our AI agents handle the technical execution. No coding or API knowledge required.',
    },
    {
        q: 'What integrations does OpenAnalyst support?',
        a: 'We integrate with 27+ marketing tools including Google Ads, Meta Ads, HubSpot, Salesforce, Mailchimp, Slack, Gmail, Shopify, and more. New integrations are added regularly based on user feedback.',
    },
    {
        q: 'Is my data secure with OpenAnalyst?',
        a: 'Absolutely. We use enterprise-grade encryption (AES-256 at rest, TLS 1.3 in transit), SOC 2 Type II compliance, and never share your data with third parties. You retain full ownership of all your data.',
    },
    {
        q: 'Can I try OpenAnalyst before committing?',
        a: 'Yes. We offer a free tier with limited agent runs so you can experience the platform firsthand. No credit card required to get started.',
    },
];

export default function ResourcesPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<Category>('All');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

    const filteredResources = activeTab === 'All'
        ? resources
        : resources.filter((r) => r.category === activeTab);

    useGSAP(() => {
        gsap.from('.resources-hero', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        });

        const reveals = gsap.utils.toArray<HTMLElement>('.resources-reveal');
        reveals.forEach((el) => {
            gsap.from(el, {
                y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            });
        });
    }, { scope: pageRef });

    const toggleFaq = useCallback((index: number) => {
        const el = faqRefs.current[index];
        if (!el) return;

        if (openFaq === index) {
            // Close
            gsap.to(el, {
                height: 0, opacity: 0, duration: 0.3, ease: 'power2.inOut',
                onComplete: () => setOpenFaq(null),
            });
        } else {
            // Close previous
            if (openFaq !== null && faqRefs.current[openFaq]) {
                gsap.to(faqRefs.current[openFaq]!, {
                    height: 0, opacity: 0, duration: 0.25, ease: 'power2.inOut',
                });
            }
            setOpenFaq(index);
            // Open new
            gsap.set(el, { height: 'auto', opacity: 1 });
            const h = el.offsetHeight;
            gsap.fromTo(el,
                { height: 0, opacity: 0 },
                { height: h, opacity: 1, duration: 0.35, ease: 'power2.out' },
            );
        }
    }, [openFaq]);

    const categoryColor = (cat: Category) => {
        switch (cat) {
            case 'Blog': return 'var(--rust)';
            case 'Case Studies': return '#3b82f6';
            case 'FAQs': return '#2ecc71';
            default: return 'var(--text-muted)';
        }
    };

    return (
        <div ref={pageRef} style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#1A1A1A' }}>
            <Header />
            <main style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                        position: 'absolute', inset: '-20%',
                        background: `
                            radial-gradient(ellipse 50% 40% at 30% 30%, rgba(255,107,0,0.08) 0%, transparent 60%),
                            radial-gradient(ellipse 40% 50% at 70% 60%, rgba(255,133,51,0.05) 0%, transparent 60%)
                        `,
                        pointerEvents: 'none',
                    }} />

                    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>

                        {/* Hero */}
                        <div className="resources-hero" style={{ textAlign: 'center', marginBottom: '56px' }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                Resources
                            </p>
                            <h1 style={{
                                fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800,
                                lineHeight: 1.1, marginBottom: '24px',
                            }}>
                                <span className="text-gradient">Resources</span>
                            </h1>
                            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '580px', margin: '0 auto' }}>
                                Guides, case studies, and insights to help you get the most out of AI-powered marketing.
                            </p>
                        </div>

                        {/* Category Tabs */}
                        <div className="resources-reveal" style={{ marginBottom: '40px' }}>
                            <div style={{
                                display: 'flex', gap: '8px', flexWrap: 'wrap',
                                justifyContent: 'center',
                            }}>
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveTab(cat)}
                                        style={{
                                            padding: '8px 20px',
                                            borderRadius: '9999px',
                                            border: '1px solid',
                                            borderColor: activeTab === cat ? 'var(--rust)' : '#E5E5E5',
                                            backgroundColor: activeTab === cat ? 'var(--rust)' : 'transparent',
                                            color: activeTab === cat ? '#ffffff' : 'var(--text-muted)',
                                            fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600,
                                            cursor: 'pointer', transition: 'all 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (activeTab !== cat) {
                                                e.currentTarget.style.borderColor = 'var(--rust)';
                                                e.currentTarget.style.color = 'var(--rust)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (activeTab !== cat) {
                                                e.currentTarget.style.borderColor = '#E5E5E5';
                                                e.currentTarget.style.color = 'var(--text-muted)';
                                            }
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Resource Cards Grid */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '20px', marginBottom: '80px',
                        }}>
                            {filteredResources.map((resource, i) => (
                                <div key={i} style={{
                                    padding: '28px 24px',
                                    borderRadius: '16px',
                                    backgroundColor: '#F5F5F5',
                                    border: '1px solid #E5E5E5',
                                    transition: 'all 0.3s ease',
                                    cursor: 'default',
                                    display: 'flex', flexDirection: 'column',
                                }}
                                    onMouseEnter={(e) => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.borderColor = 'var(--rust)';
                                        el.style.transform = 'translateY(-4px)';
                                        el.style.boxShadow = '0 8px 24px rgba(255,107,0,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.borderColor = '#E5E5E5';
                                        el.style.transform = 'translateY(0)';
                                        el.style.boxShadow = 'none';
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                                            padding: '3px 10px', borderRadius: '9999px',
                                            backgroundColor: `${categoryColor(resource.category)}15`,
                                            color: categoryColor(resource.category),
                                        }}>
                                            {resource.category}
                                        </span>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                                            {resource.date}
                                        </span>
                                    </div>
                                    <h3 style={{
                                        fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700,
                                        color: '#1A1A1A', marginBottom: '10px', lineHeight: 1.3,
                                    }}>
                                        {resource.title}
                                    </h3>
                                    <p style={{
                                        color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6,
                                        fontFamily: 'var(--font-body)', flex: 1,
                                    }}>
                                        {resource.desc}
                                    </p>
                                    <div style={{ marginTop: '16px' }}>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600,
                                            color: 'var(--rust)', cursor: 'pointer',
                                        }}>
                                            Read more &rarr;
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* FAQ Section */}
                        <div className="resources-reveal" style={{ marginBottom: '80px' }}>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700,
                                color: '#1A1A1A', marginBottom: '12px',
                            }}>
                                Frequently Asked Questions
                            </h2>
                            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '32px', maxWidth: '600px' }}>
                                Everything you need to know about OpenAnalyst and AI marketing.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {faqs.map((faq, i) => (
                                    <div key={i} style={{
                                        borderRadius: '14px',
                                        backgroundColor: '#F5F5F5',
                                        border: '1px solid #E5E5E5',
                                        overflow: 'hidden',
                                        transition: 'border-color 0.3s ease',
                                        ...(openFaq === i ? { borderColor: 'var(--rust)' } : {}),
                                    }}>
                                        <button
                                            onClick={() => toggleFaq(i)}
                                            style={{
                                                width: '100%', padding: '20px 24px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                backgroundColor: 'transparent', border: 'none',
                                                cursor: 'pointer', textAlign: 'left',
                                                gap: '16px',
                                            }}
                                        >
                                            <span style={{
                                                fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 600,
                                                color: '#1A1A1A',
                                            }}>
                                                {faq.q}
                                            </span>
                                            <span style={{
                                                fontFamily: 'var(--font-mono)', fontSize: '18px',
                                                color: 'var(--rust)', flexShrink: 0,
                                                transition: 'transform 0.3s ease',
                                                transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                                            }}>
                                                +
                                            </span>
                                        </button>
                                        <div
                                            ref={(el) => { faqRefs.current[i] = el; }}
                                            style={{ height: 0, opacity: 0, overflow: 'hidden' }}
                                        >
                                            <div style={{ padding: '0 24px 20px' }}>
                                                <p style={{
                                                    color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7,
                                                    fontFamily: 'var(--font-body)',
                                                }}>
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="resources-reveal" style={{
                            textAlign: 'center', padding: '48px 24px',
                            borderRadius: '20px',
                            backgroundColor: '#F5F5F5',
                            border: '1px solid #E5E5E5',
                        }}>
                            <h3 style={{
                                fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700,
                                color: '#1A1A1A', marginBottom: '12px',
                            }}>
                                Ready to transform your marketing?
                            </h3>
                            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>
                                Get started with OpenAnalyst today and let AI agents handle your marketing campaigns.
                            </p>
                            <Magnetic>
                                <a href="https://app.openanalyst.com" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '14px 32px', fontSize: '15px', fontFamily: 'var(--font-mono)', fontWeight: 600,
                                    color: '#FFFFFF', backgroundColor: 'var(--rust)', borderRadius: '9999px',
                                    textDecoration: 'none', transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 20px rgba(255, 107, 0, 0.25)',
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--rust-light)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--rust)';
                                    }}
                                >
                                    Get Started Free &rarr;
                                </a>
                            </Magnetic>
                        </div>
                    </div>
                </div>

                <style>{`
                    @media (max-width: 768px) {
                        .resources-reveal > div:first-child {
                            grid-template-columns: repeat(2, 1fr) !important;
                        }
                    }
                    @media (max-width: 480px) {
                        .resources-reveal > div:first-child {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}</style>
            </main>
            <Footer />
        </div>
    );
}
