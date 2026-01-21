import { Header, Footer } from '@/components';

export default function WaitlistPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-20 container mx-auto px-4 text-center">
                <h1 className="text-6xl font-heading font-bold mb-6">Join the Waitlist</h1>
                <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
                    Be the first to experience the future of autonomous analytics.
                    Limited spots available for early access.
                </p>
                <form className="max-w-md mx-auto space-y-4">
                    <input type="email" placeholder="Enter your email" className="w-full px-6 py-4 bg-brand-secondary border border-white/10 rounded-lg text-white focus:border-brand-primary outline-none" />
                    <button className="w-full py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,133,82,0.3)]">
                        Reserve My Spot
                    </button>
                </form>
            </main>
            <Footer />
        </div>
    );
}
