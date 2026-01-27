import { Header, Footer, Pricing as PricingSection } from '@/components';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-white text-black flex flex-col">
            <Header />
            <main className="flex-1 pt-20">
                <PricingSection />
            </main>
            <Footer />
        </div>
    );
}
