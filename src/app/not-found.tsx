import Link from 'next/link';
import { Header, Footer } from '@/components';

export default function NotFound() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main className="dark-section" style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: '120px 24px 60px',
                position: 'relative', overflow: 'hidden',
                background: 'var(--bg-dark-primary)',
            }}>
                {/* Grid pattern */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                    maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 70%)',
                }} />

                {/* Ambient glow */}
                <div style={{
                    position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 500, height: 500, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none', filter: 'blur(60px)',
                }} />

                {/* Giant 404 */}
                <h1 style={{
                    fontSize: 'clamp(8rem, 20vw, 14rem)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    background: 'linear-gradient(180deg, rgba(255,107,0,0.15) 0%, rgba(255,107,0,0.03) 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    lineHeight: 1, userSelect: 'none', position: 'relative', zIndex: 1,
                    letterSpacing: '-0.04em',
                }}>
                    404
                </h1>

                <h2 style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    fontWeight: 800, marginBottom: 16,
                    position: 'relative', zIndex: 10,
                    fontFamily: 'var(--font-heading)',
                    color: '#FAFAFA', letterSpacing: '-0.02em',
                }}>
                    Lost in the data?
                </h2>

                <p style={{
                    color: 'var(--text-dark-secondary)', maxWidth: 400,
                    marginBottom: 36, position: 'relative', zIndex: 10,
                    fontSize: 16, lineHeight: 1.7,
                }}>
                    The page you&apos;re looking for seems to have vanished. Let&apos;s get you back on track.
                </p>

                <div style={{ display: 'flex', gap: 14, position: 'relative', zIndex: 10 }}>
                    <Link href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
                        Return Home
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                    <Link href="/contact" className="btn-outline" style={{ textDecoration: 'none', color: 'var(--text-dark-secondary)', borderColor: 'var(--border-dark-default)' }}>
                        Contact Support
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
