import { Header, Footer } from '@/components';

export default function GenericPage({ params }: { params: { slug: string } }) {
    // Using this as a template for simple text pages
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-20 container mx-auto px-4">
                <h1 className="text-4xl font-heading font-bold mb-8 capitalize">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none text-gray-400">
                    <p>Last updated: January 20, 2026</p>
                    <p>At OpenAnalyst, we take your privacy seriously...</p>
                    {/* Placeholder content */}
                    <h3>1. Information We Collect</h3>
                    <p>We collect information you provide directly to us...</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
