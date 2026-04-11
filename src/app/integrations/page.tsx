import type { Metadata } from 'next';
import { Header, Footer, Integrations as IntegrationsSection } from '@/components';

export const metadata: Metadata = {
  title: "Integrations - Connect 27+ Marketing Tools & Platforms",
  description:
    "Connect OpenAnalyst with 27+ tools: Gmail, HubSpot, Google Ads, Meta, LinkedIn, Slack, Shopify, Stripe, Salesforce, TikTok, and more. Unified marketing automation.",
  keywords: [
    "marketing integrations",
    "AI marketing integrations",
    "HubSpot integration",
    "Google Ads integration",
    "Meta Ads integration",
    "Shopify marketing automation",
    "marketing tool integrations",
  ],
  alternates: {
    canonical: "https://openanalyst.com/integrations/",
  },
  openGraph: {
    title: "27+ Marketing Integrations - Connect Your Entire Stack",
    description:
      "Connect OpenAnalyst with Gmail, HubSpot, Google Ads, Meta, LinkedIn, Shopify, Stripe, and 20+ more tools.",
    url: "https://openanalyst.com/integrations/",
  },
};

export default function IntegrationsPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, paddingTop: 'clamp(88px, 12vw, 128px)', paddingBottom: '80px', background: 'var(--bg-primary)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <p className="label-mono" style={{ marginBottom: 16 }}>Ecosystem</p>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 16, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                            Connected to <span className="text-gradient">everything</span>
                        </h1>
                        <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
                            27+ native integrations that sync your entire marketing stack in real-time.
                        </p>
                    </div>
                    <IntegrationsSection />
                </div>
            </main>
            <Footer
                ctaWords={['Connect', 'everything.', 'Automate', 'anything.']}
                ctaHighlight="anything."
                ctaSubtitle="27+ integrations that plug into your stack and start working in seconds."
            />
        </div>
    );
}
