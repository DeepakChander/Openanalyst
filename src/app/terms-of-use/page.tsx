import { Header, Footer } from '@/components';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-20 container mx-auto px-4">
                <h1 className="text-4xl font-heading font-bold mb-8">Terms of Use</h1>
                <div className="prose prose-invert max-w-none text-gray-400">
                    <p>Last updated: January 20, 2026</p>
                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing or using OpenAnalyst, you agree to be bound by these terms...</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
