import type { Metadata } from 'next';
import { Header, Footer } from '@/components';

export const metadata: Metadata = {
    title: "Changelog - Product Updates & Release Notes",
    description: "Stay up to date with OpenAnalyst product updates, new features, AI agent improvements, and platform enhancements.",
    alternates: { canonical: "https://openanalyst.com/changelog/" },
};

const releases = [
    {
        date: 'January 20, 2026', version: 'v2.0.0', title: 'The Agentic Era', isLatest: true,
        items: ['Introduced autonomous AI agents for complex workflows', 'New dark mode dashboard interface', 'Added integrations with Linear and Notion', '3D agent constellation in hero section', 'Complete website redesign with hybrid theme'],
    },
    {
        date: 'December 15, 2025', version: 'v1.5.0', title: 'Performance Boost', isLatest: false,
        items: ['50% faster query processing', 'Mobile responsiveness improvements', 'New integrations: Calendly, Supabase, Airtable'],
    },
    {
        date: 'November 1, 2025', version: 'v1.4.0', title: 'Multi-Channel Launch', isLatest: false,
        items: ['Multi-channel campaign orchestration', 'Google Ads and Meta Ads connectors', 'Real-time performance dashboard'],
    },
    {
        date: 'September 10, 2025', version: 'v1.3.0', title: 'AI Search Optimization', isLatest: false,
        items: ['AI search engine optimization module', 'Structured data generation', 'Content gap analysis tooling'],
    },
];

export default function ChangelogPage() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />

            {/* Dark hero */}
            <section className="dark-section" style={{ paddingTop: 160, paddingBottom: 60, background: 'var(--bg-dark-primary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 50% 60% at 50% 50%, black 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse 50% 60% at 50% 50%, black 0%, transparent 70%)' }} />
                <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, marginBottom: 32, border: '1px solid rgba(255,107,0,0.2)', background: 'rgba(255,107,0,0.06)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B00', boxShadow: '0 0 8px rgba(255,107,0,0.5)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF8533', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Changelog</span>
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#FAFAFA', letterSpacing: '-0.03em', marginBottom: 16 }}>
                        What&apos;s <span className="text-gradient">new</span>
                    </h1>
                    <p style={{ fontSize: 16, color: 'var(--text-dark-secondary)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
                        Product updates, new features, and improvements.
                    </p>
                </div>
            </section>

            {/* Timeline — Light */}
            <main style={{ flex: 1, padding: '80px 24px 100px', background: 'var(--bg-surface)' }}>
                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {releases.map((release, i) => (
                            <div key={i} style={{ position: 'relative', borderLeft: '2px solid var(--border-default)', paddingLeft: 32, paddingBottom: i < releases.length - 1 ? 48 : 0 }}>
                                {/* Dot */}
                                <span style={{
                                    position: 'absolute', left: -6, top: 8, width: 10, height: 10, borderRadius: '50%',
                                    background: release.isLatest ? '#FF6B00' : 'var(--border-default)',
                                    boxShadow: release.isLatest ? '0 0 12px rgba(255,107,0,0.4)' : 'none',
                                }} />

                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{release.date}</span>
                                    {release.isLatest && (
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, color: '#fff', background: '#FF6B00', padding: '2px 8px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Latest</span>
                                    )}
                                </div>

                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{release.version} — {release.title}</h2>

                                <ul style={{ listStyleType: 'none', padding: 0, margin: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {release.items.map((item, j) => (
                                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--orange)', flexShrink: 0, marginTop: 8 }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
