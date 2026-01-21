import { Header, Footer, Features as FeaturesSection, WhatSetsApart, HowItWorks } from '@/components';

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-20">
                <FeaturesSection />
                <WhatSetsApart />
                <HowItWorks />
            </main>
            <Footer />
        </div>
    );
}
