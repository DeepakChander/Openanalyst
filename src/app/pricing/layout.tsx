import type { Metadata } from "next";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are credits and how do they work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Credits are the universal currency for using AI models on OpenAnalyst. Different models consume different amounts of credits per token processed. You can track your credit usage in real-time from the dashboard.",
      },
    },
    {
      "@type": "Question",
      name: "Can I switch between plans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to the new plan features. Credits carry over within the billing period.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free trial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Our Trial Pack gives you 500 credits for just $1, valid for 15 days. It includes access to 5 Agentic Skills, 26 Specialist Agents, and 5 MCP integrations.",
      },
    },
    {
      "@type": "Question",
      name: "What MCPs (integrations) are included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Trial Pack includes Gmail, Google Drive, Slack, Google Ads, and Meta Ads. The Growth Pack includes all 27 MCPs, adding HubSpot, LinkedIn, TikTok Ads, Stripe, and many more.",
      },
    },
    {
      "@type": "Question",
      name: "How does CLI pricing with BYOK work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With Bring Your Own Key (BYOK), you connect your own API keys for LLM providers (OpenAI, Anthropic, etc.) and only pay for OpenAnalyst credits that power the agentic orchestration layer.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when I run out of credits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your campaigns will pause until credits are replenished. You can set up auto-recharge to ensure uninterrupted service, or upgrade to a higher plan for more credits.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Pricing - Plans Starting at $1 | AI Marketing Automation",
  description:
    "OpenAnalyst pricing: Trial Pack at $1 (500 credits, 26 agents), Growth Pack at $399/mo (25,000 credits, 42 agents, 27+ integrations). CLI BYOK pricing available. Start automating your marketing today.",
  keywords: [
    "OpenAnalyst pricing",
    "AI marketing pricing",
    "marketing automation cost",
    "AI marketing agent price",
    "affordable AI marketing",
    "marketing automation plans",
    "BYOK AI marketing",
  ],
  alternates: {
    canonical: "https://openanalyst.com/pricing/",
  },
  openGraph: {
    title: "Pricing - AI Marketing Plans Starting at $1",
    description:
      "Start with $1 Trial Pack or go all-in with $399/mo Growth Pack. 42 AI agents, 27+ integrations, predictive analytics.",
    url: "https://openanalyst.com/pricing/",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
