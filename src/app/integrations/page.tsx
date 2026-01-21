import { Header, Footer, Integrations as IntegrationsSection } from '@/components';

export default function IntegrationsPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-20 container mx-auto px-4">
                <h1 className="text-5xl font-heading font-bold mb-8 text-center">Integrations</h1>
                <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                    Connect OpenAnalyst with your favorite tools and workflows.
                </p>
                <IntegrationsSection />
            </main>
            <Footer />
        </div>
    );
}
