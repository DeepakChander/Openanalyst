import { Header, Footer } from '@/components';

export default function ChangelogPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-20 container mx-auto px-4 max-w-3xl">
                <h1 className="text-5xl font-heading font-bold mb-12">Changelog</h1>

                <div className="space-y-12">
                    <div className="relative border-l border-white/10 pl-8 pb-12">
                        <span className="absolute -left-1.5 top-2 w-3 h-3 bg-brand-primary rounded-full"></span>
                        <span className="text-sm text-gray-400 mb-2 block">January 20, 2026</span>
                        <h2 className="text-2xl font-bold text-white mb-4">v2.0.0 - The Agentic Era</h2>
                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                            <li>Introduced autonomous AI agents for complex workflows</li>
                            <li>New dark mode dashboard interface</li>
                            <li>Added integrations with Linear and Notion</li>
                        </ul>
                    </div>
                    <div className="relative border-l border-white/10 pl-8 pb-12">
                        <span className="absolute -left-1.5 top-2 w-3 h-3 bg-brand-secondary border border-white/20 rounded-full"></span>
                        <span className="text-sm text-gray-400 mb-2 block">December 15, 2025</span>
                        <h2 className="text-2xl font-bold text-white mb-4">v1.5.0 - Performance Boost</h2>
                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                            <li>50% faster query processing</li>
                            <li>Mobile responsiveness improvements</li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
