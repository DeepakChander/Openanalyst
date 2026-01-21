import { Header, Footer } from '@/components';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-20 container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8">
                        Revolutionizing <span className="text-brand-primary">Data Analysis</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                        OpenAnalyst was born from a simple idea: data should be accessible, understandable, and actionable for everyone, not just data scientists.
                    </p>

                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        <div className="p-8 rounded-2xl bg-brand-secondary border border-white/10">
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-gray-400">To democratize access to advanced analytics through intuitive AI agents that act as your personal data scientists.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-brand-secondary border border-white/10">
                            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                            <p className="text-gray-400">A world where every decision is backed by data-driven insights, instantly available at your fingertips.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
