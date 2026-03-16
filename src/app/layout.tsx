import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import AgentationProvider from "@/components/AgentationProvider";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseOverlay from "@/components/NoiseOverlay";
import CursorGlow from "@/components/CursorGlow";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://openanalyst.com";
const SITE_NAME = "OpenAnalyst";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OpenAnalyst - AI Marketing Agent Platform | Automate Campaigns with AI",
    template: "%s | OpenAnalyst",
  },
  description:
    "OpenAnalyst is the AI marketing agent platform that plans, creates, and optimizes campaigns across every channel. 42 AI agents, 27+ integrations, real-time optimization. Start for $1.",
  keywords: [
    "AI marketing agent",
    "AI marketing platform",
    "AI marketing automation",
    "automated marketing campaigns",
    "AI campaign optimization",
    "marketing automation software",
    "AI content generation",
    "multi-channel marketing automation",
    "predictive marketing analytics",
    "AI ad optimization",
    "AI-powered marketing",
    "marketing AI agents",
    "autonomous marketing",
    "campaign automation",
    "ROI optimization",
    "audience segmentation",
    "A/B testing automation",
    "lead scoring AI",
    "AI marketing tools",
    "marketing intelligence platform",
  ],
  authors: [{ name: "OpenAnalyst Inc." }],
  creator: "OpenAnalyst Inc.",
  publisher: "OpenAnalyst Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "OpenAnalyst - AI Marketing Agent Platform | Automate Campaigns with AI",
    description:
      "42 AI agents that plan, create, and optimize your marketing campaigns across every channel. Real-time optimization, 27+ integrations. Start for $1.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenAnalyst - AI Marketing Agent Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenAnalyst - AI Marketing Agent Platform",
    description:
      "42 AI agents that plan, create, and optimize your marketing campaigns across every channel. Start for $1.",
    images: ["/og-image.png"],
    creator: "@openanalyst",
    site: "@openanalyst",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "GOOGLE_SITE_VERIFICATION_CODE",
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "OpenAnalyst",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
      description:
        "AI marketing agent platform that automates campaign management across all channels with 42 specialized AI agents.",
      foundingDate: "2024",
      sameAs: [
        "https://twitter.com/openanalyst",
        "https://linkedin.com/company/openanalyst",
        "https://github.com/openanalyst",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "OpenAnalyst",
      publisher: { "@id": `${SITE_URL}/#organization` },
      description:
        "AI marketing agent platform that plans, creates, and optimizes campaigns across every channel.",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/docs?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "OpenAnalyst",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, macOS, Windows, Linux",
      offers: [
        {
          "@type": "Offer",
          name: "Trial Pack",
          price: "1.00",
          priceCurrency: "USD",
          description: "500 credits, 26 agents, 5 integrations — 15 day trial",
        },
        {
          "@type": "Offer",
          name: "Growth Pack",
          price: "399.00",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            billingDuration: "P1M",
          },
          description: "25,000 credits/mo, 42 agents, 27+ integrations, priority support",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        ratingCount: "500",
      },
      featureList:
        "AI Marketing Agents, Campaign Automation, Predictive Analytics, Multi-Channel Orchestration, A/B Testing, Content Generation, Lead Scoring, ROI Optimization",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakartaSans.variable} ${bricolageGrotesque.variable} ${jetbrainsMono.variable}`}>
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PLDWLN54');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PLDWLN54"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <SmoothScroll>
          <ScrollToTop />
          {children}
        </SmoothScroll>
        <ScrollProgress />
        <CursorGlow />
        <NoiseOverlay />
        <AgentationProvider />
      </body>
    </html>
  );
}
