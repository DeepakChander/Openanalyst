import { Header, Footer, Features as FeaturesSection, WhatSetsApart, HowItWorks } from '@/components';

export default function FeaturesPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, paddingTop: '80px' }}>
                <FeaturesSection />
                <WhatSetsApart />
                <HowItWorks />
            </main>
            <Footer />
        </div>
    );
}
