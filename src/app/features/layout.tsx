import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features - AI Agents, Campaign Automation & Analytics",
  description:
    "Explore OpenAnalyst features: 42 AI marketing agents, multi-channel campaign automation, predictive analytics, A/B testing, content generation, audience segmentation, and real-time ROI optimization.",
  keywords: [
    "AI marketing features",
    "campaign automation features",
    "AI content generation",
    "predictive marketing analytics",
    "multi-channel marketing",
    "A/B testing automation",
    "audience segmentation AI",
    "marketing ROI optimization",
  ],
  alternates: {
    canonical: "https://openanalyst.com/features/",
  },
  openGraph: {
    title: "Features - AI Marketing Agents & Campaign Automation",
    description:
      "42 AI agents for campaign automation, content generation, predictive analytics, and multi-channel optimization. See all OpenAnalyst features.",
    url: "https://openanalyst.com/features/",
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
