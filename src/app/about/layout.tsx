import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Our Mission, Values & Team",
  description:
    "Learn about OpenAnalyst — the AI marketing platform founded in 2024. Discover our mission to democratize AI-powered marketing, our core values, team, and company milestones.",
  keywords: [
    "about OpenAnalyst",
    "AI marketing company",
    "marketing AI startup",
    "OpenAnalyst team",
    "AI marketing mission",
  ],
  alternates: {
    canonical: "https://openanalyst.com/about/",
  },
  openGraph: {
    title: "About OpenAnalyst - AI Marketing Agent Platform",
    description:
      "Founded in 2024, OpenAnalyst is on a mission to democratize AI-powered marketing. 42 AI agents serving 10,000+ campaigns across 150+ countries.",
    url: "https://openanalyst.com/about/",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
