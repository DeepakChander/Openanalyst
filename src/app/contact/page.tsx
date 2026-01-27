import { Header, Footer } from '@/components';

export default function ContactPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <Header />
            <main style={{ flex: 1, paddingTop: '128px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        marginBottom: '24px',
                        color: '#ffffff'
                    }}>
                        Contact Us
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#9ca3af',
                        marginBottom: '48px',
                        maxWidth: '672px',
                        margin: '0 auto 48px'
                    }}>
                        Have questions? We'd love to hear from you.
                    </p>

                    <form style={{ maxWidth: '512px', margin: '0 auto', textAlign: 'left' }}>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: '#9ca3af',
                                marginBottom: '8px'
                            }}>
                                Name
                            </label>
                            <input
                                type="text"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    backgroundColor: '#18181b',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    color: '#ffffff',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: '#9ca3af',
                                marginBottom: '8px'
                            }}>
                                Email
                            </label>
                            <input
                                type="email"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    backgroundColor: '#18181b',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    color: '#ffffff',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: '#9ca3af',
                                marginBottom: '8px'
                            }}>
                                Message
                            </label>
                            <textarea
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    backgroundColor: '#18181b',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    color: '#ffffff',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    resize: 'vertical'
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '16px',
                                backgroundColor: '#ff8552',
                                color: '#ffffff',
                                fontWeight: 700,
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
