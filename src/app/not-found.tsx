import Link from 'next/link';
import { Header, Footer } from '@/components';

/* ═══ Pattern #44: Physics-responsive gravity text ═══ */
export default function NotFound() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: '120px 24px 60px',
                position: 'relative', overflow: 'hidden',
                background: 'var(--bg-primary)',
            }}>
                {/* Radial gradient depth */}
                <div style={{
                    position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 500, height: 500, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                {/* Giant 404 */}
                <h1 style={{
                    fontSize: 'clamp(10rem, 25vw, 16rem)',
                    fontFamily: 'var(--font-heading)', fontWeight: 900,
                    background: 'linear-gradient(180deg, var(--orange) 0%, rgba(255,107,0,0.1) 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    lineHeight: 0.9, userSelect: 'none', position: 'relative', zIndex: 1,
                    letterSpacing: '-0.06em',
                }}>404</h1>

                <h2 style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800,
                    marginBottom: 16, position: 'relative', zIndex: 10,
                    fontFamily: 'var(--font-heading)', color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                }}>Lost in the data?</h2>

                <p style={{
                    color: 'var(--text-secondary)', maxWidth: 400,
                    marginBottom: 36, position: 'relative', zIndex: 10,
                    fontSize: 16, lineHeight: 1.7,
                }}>The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back.</p>

                <div style={{ display: 'flex', gap: 14, position: 'relative', zIndex: 10 }}>
                    <Link href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
                        Return Home
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                    <Link href="/contact" className="btn-outline" style={{ textDecoration: 'none' }}>Contact Support</Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
