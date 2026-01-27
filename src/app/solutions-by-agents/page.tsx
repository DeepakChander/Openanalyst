import { Header, Footer } from '@/components';

export default function SolutionsPage() {
    const agents = [
        { name: 'Financial Analyst', desc: 'Autonomous agent designed to handle financial analysis tasks with expert precision.' },
        { name: 'Marketing Strategist', desc: 'AI-powered marketing insights and campaign optimization for maximum ROI.' },
        { name: 'Sales OPS', desc: 'Streamline your sales operations with intelligent pipeline management.' },
        { name: 'HR Assistant', desc: 'Automate HR analytics and workforce planning with AI assistance.' },
        { name: 'Code Reviewer', desc: 'Automated code analysis and review for better software quality.' },
        { name: 'Security Auditor', desc: 'Continuous security monitoring and vulnerability assessment.' }
    ];

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
                        color: '#ff8552'
                    }}>
                        Solutions by Agents
                    </h1>
                    <p style={{
                        textAlign: 'center',
                        color: '#9ca3af',
                        marginBottom: '64px',
                        maxWidth: '672px',
                        margin: '0 auto 64px',
                        fontSize: '1.125rem'
                    }}>
                        Deploy specialized AI agents tailored for your specific industry and use case.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '32px'
                    }}>
                        {agents.map((agent, i) => (
                            <div key={i} style={{
                                padding: '32px',
                                borderRadius: '12px',
                                backgroundColor: '#18181b',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 700,
                                    color: '#ffffff',
                                    marginBottom: '8px'
                                }}>
                                    {agent.name}
                                </h3>
                                <p style={{
                                    color: '#9ca3af',
                                    marginBottom: '16px',
                                    lineHeight: 1.6
                                }}>
                                    {agent.desc}
                                </p>
                                <span style={{
                                    color: '#ff8552',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    Learn more <span>→</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
