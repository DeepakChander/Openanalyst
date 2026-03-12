import { Header, Footer, Integrations as IntegrationsSection } from '@/components';

export default function IntegrationsPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, paddingTop: '128px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--syntax-comment)', marginBottom: '16px', textAlign: 'center' }}>
                        {'// INTEGRATIONS'}
                    </p>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        marginBottom: '32px',
                        textAlign: 'center',
                        fontFamily: 'var(--font-heading)',
                    }}>
                        Integrations
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--muted)',
                        textAlign: 'center',
                        marginBottom: '64px',
                        maxWidth: '672px',
                        margin: '0 auto 64px',
                        fontFamily: 'var(--font-body)',
                    }}>
                        Connect OpenAnalyst with your favorite tools and workflows.
                    </p>
                    <IntegrationsSection />
                </div>
            </main>
            <Footer />
        </div>
    );
}
