import Link from 'next/link';
import { Header, Footer } from '@/components';

export default function NotFound() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#1A1A1A', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: '120px 20px 60px',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* Background glow */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px', height: '500px',
                    background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none', borderRadius: '50%',
                }} />

                <h1 style={{
                    fontSize: 'clamp(6rem, 20vw, 10rem)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                    userSelect: 'none',
                }}>
                    404
                </h1>
                <h2 style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    fontWeight: 700, marginBottom: '16px',
                    position: 'relative', zIndex: 10,
                    fontFamily: 'var(--font-heading)',
                }}>Page Not Found</h2>
                <p style={{
                    color: '#8A8A8A', maxWidth: '400px',
                    marginBottom: '32px', position: 'relative', zIndex: 10,
                    fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 1.7,
                    fontFamily: 'var(--font-body)',
                }}>
                    The page you&apos;re looking for seems to have vanished into the digital void.
                </p>
                <Link
                    href="/"
                    className="btn-primary"
                    style={{ position: 'relative', zIndex: 10 }}
                >
                    Return Home
                </Link>
            </main>
            <Footer />
        </div>
    );
}
