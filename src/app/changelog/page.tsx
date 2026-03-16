import type { Metadata } from 'next';
import { Header, Footer } from '@/components';

export const metadata: Metadata = {
  title: "Changelog - Product Updates & Release Notes",
  description:
    "Stay up to date with OpenAnalyst product updates, new features, AI agent improvements, and platform enhancements.",
  alternates: {
    canonical: "https://openanalyst.com/changelog/",
  },
};

export default function ChangelogPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#1A1A1A', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, paddingTop: '128px', paddingBottom: '80px', maxWidth: '768px', margin: '0 auto', padding: '128px 20px 80px', width: '100%', boxSizing: 'border-box' }}>
                <h1 style={{
                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: 800, marginBottom: '48px', letterSpacing: '-0.03em', color: '#1A1A1A',
                }}>Changelog</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                    <div style={{ position: 'relative', borderLeft: '2px solid #E5E5E5', paddingLeft: '32px', paddingBottom: '48px' }}>
                        <span style={{ position: 'absolute', left: '-6px', top: '8px', width: '10px', height: '10px', backgroundColor: '#FF6B00', borderRadius: '50%' }} />
                        <span style={{ fontSize: '13px', color: '#8A8A8A', marginBottom: '8px', display: 'block', fontFamily: 'var(--font-mono)' }}>January 20, 2026</span>
                        <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 700, color: '#1A1A1A', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>v2.0.0 - The Agentic Era</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#4A4A4A', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px', lineHeight: 1.7 }}>
                            <li>Introduced autonomous AI agents for complex workflows</li>
                            <li>New dark mode dashboard interface</li>
                            <li>Added integrations with Linear and Notion</li>
                        </ul>
                    </div>
                    <div style={{ position: 'relative', borderLeft: '2px solid #E5E5E5', paddingLeft: '32px', paddingBottom: '48px' }}>
                        <span style={{ position: 'absolute', left: '-6px', top: '8px', width: '10px', height: '10px', backgroundColor: '#E5E5E5', border: '2px solid #CCCCCC', borderRadius: '50%' }} />
                        <span style={{ fontSize: '13px', color: '#8A8A8A', marginBottom: '8px', display: 'block', fontFamily: 'var(--font-mono)' }}>December 15, 2025</span>
                        <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 700, color: '#1A1A1A', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>v1.5.0 - Performance Boost</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#4A4A4A', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px', lineHeight: 1.7 }}>
                            <li>50% faster query processing</li>
                            <li>Mobile responsiveness improvements</li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
