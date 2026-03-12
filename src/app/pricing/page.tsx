import { Header, Footer, Pricing as PricingSection } from '@/components';

export default function PricingPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, paddingTop: '80px' }}>
                <PricingSection />
            </main>
            <Footer />
        </div>
    );
}
