import { Header, Footer, Pricing as PricingSection, Integrations } from '@/components';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-20">
                <PricingSection />
                <Integrations />
            </main>
            <Footer />
        </div>
    );
}
