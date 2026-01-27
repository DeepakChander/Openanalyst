import { Header, Footer, Integrations as IntegrationsSection } from '@/components';

export default function IntegrationsPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, paddingTop: '128px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        marginBottom: '32px',
                        textAlign: 'center',
                        color: '#ffffff'
                    }}>
                        Integrations
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#9ca3af',
                        textAlign: 'center',
                        marginBottom: '64px',
                        maxWidth: '672px',
                        margin: '0 auto 64px'
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
