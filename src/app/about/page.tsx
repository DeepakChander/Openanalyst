import { Header, Footer } from '@/components';

export default function AboutPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, paddingTop: '128px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '896px', margin: '0 auto', padding: '0 16px' }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                        fontWeight: 700,
                        marginBottom: '32px',
                        lineHeight: 1.1
                    }}>
                        Revolutionizing <span style={{ color: '#ff8552' }}>Data Analysis</span>
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#d1d5db',
                        marginBottom: '48px',
                        lineHeight: 1.7
                    }}>
                        OpenAnalyst was born from a simple idea: data should be accessible, understandable, and actionable for everyone, not just data scientists.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '48px',
                        marginBottom: '80px'
                    }}>
                        {/* Our Mission Card */}
                        <div style={{
                            padding: '32px',
                            borderRadius: '16px',
                            backgroundColor: '#18181b',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                marginBottom: '16px',
                                color: '#ffffff'
                            }}>
                                Our Mission
                            </h3>
                            <p style={{ color: '#9ca3af', lineHeight: 1.6 }}>
                                To democratize access to advanced analytics through intuitive AI agents that act as your personal data scientists.
                            </p>
                        </div>

                        {/* Our Vision Card */}
                        <div style={{
                            padding: '32px',
                            borderRadius: '16px',
                            backgroundColor: '#18181b',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                marginBottom: '16px',
                                color: '#ffffff'
                            }}>
                                Our Vision
                            </h3>
                            <p style={{ color: '#9ca3af', lineHeight: 1.6 }}>
                                A world where every decision is backed by data-driven insights, instantly available at your fingertips.
                            </p>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div style={{ marginBottom: '80px' }}>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            marginBottom: '32px',
                            color: '#ffffff'
                        }}>
                            Our Story
                        </h2>
                        <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: '24px' }}>
                            Founded in 2024, OpenAnalyst emerged from the frustration of watching businesses struggle to extract meaningful insights from their data. Our founders, with backgrounds in AI research and enterprise software, set out to build something different.
                        </p>
                        <p style={{ color: '#9ca3af', lineHeight: 1.8 }}>
                            Today, we're a team of passionate engineers, data scientists, and designers working together to make data analysis accessible to everyone. Our AI agents are trusted by thousands of users worldwide.
                        </p>
                    </div>

                    {/* Values Section */}
                    <div>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            marginBottom: '32px',
                            color: '#ffffff'
                        }}>
                            Our Values
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '24px'
                        }}>
                            {[
                                { title: 'Innovation', desc: 'We push the boundaries of what\'s possible with AI and data.' },
                                { title: 'Simplicity', desc: 'Complex problems deserve elegant, simple solutions.' },
                                { title: 'Trust', desc: 'Your data security and privacy are our top priorities.' },
                                { title: 'Impact', desc: 'We measure success by the value we create for our users.' }
                            ].map((value, i) => (
                                <div key={i} style={{
                                    padding: '24px',
                                    borderRadius: '12px',
                                    backgroundColor: '#18181b',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <h4 style={{
                                        fontSize: '1.125rem',
                                        fontWeight: 600,
                                        marginBottom: '8px',
                                        color: '#ff8552'
                                    }}>
                                        {value.title}
                                    </h4>
                                    <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.6 }}>
                                        {value.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
