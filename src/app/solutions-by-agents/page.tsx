import { Header, Footer } from '@/components';

export default function SolutionsPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-20 container mx-auto px-4">
                <h1 className="text-5xl font-heading font-bold mb-8 text-center text-brand-primary">Solutions by Agents</h1>
                <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
                    Deploy specialized AI agents tailored for your specific industry and use case.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {['Financial Analyst', 'Marketing Strategist', 'Sales OPS', 'HR Assistant', 'Code Reviewer', 'Security Auditor'].map((agent) => (
                        <div key={agent} className="p-8 rounded-xl bg-brand-secondary border border-white/10 hover:border-brand-primary/50 transition-colors group">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary">{agent}</h3>
                            <p className="text-gray-400 mb-4">Autonomous agent designed to handle {agent.toLowerCase()} tasks with expert precision.</p>
                            <span className="text-brand-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                Learn more <span>→</span>
                            </span>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
