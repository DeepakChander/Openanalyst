import Link from 'next/link';
import { Header, Footer } from '@/components';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />

                <h1 className="text-[10rem] font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-white/20 to-transparent leading-none select-none">
                    404
                </h1>
                <h2 className="text-4xl font-bold mb-4 z-10">Page Not Found</h2>
                <p className="text-gray-400 max-w-md mb-8 z-10">
                    The page you're looking for seems to have vanished into the digital void.
                </p>
                <Link
                    href="/"
                    className="z-10 px-8 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,133,82,0.3)]"
                >
                    Return Home
                </Link>
            </main>
            <Footer />
        </div>
    );
}
