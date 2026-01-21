import { Header, Footer } from '@/components';

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-20 container mx-auto px-4">
                <h1 className="text-5xl font-heading font-bold mb-12 text-center">Latest Insights</h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <article key={i} className="group cursor-pointer">
                            <div className="aspect-video bg-brand-secondary rounded-xl mb-6 overflow-hidden border border-white/10 group-hover:border-brand-primary/50 transition-all">
                                <div className="w-full h-full bg-gradient-to-br from-brand-secondary to-black group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <span className="text-brand-primary text-sm font-bold uppercase tracking-wider">AI & Data</span>
                            <h3 className="text-2xl font-bold mt-2 mb-3 group-hover:text-brand-primary transition-colors">
                                The Future of Autonomous Analytics Agents
                            </h3>
                            <p className="text-gray-400 line-clamp-3">
                                How AI agents are transforming the way businesses interact with their data warehouses and reducing time-to-insight by 90%.
                            </p>
                        </article>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
