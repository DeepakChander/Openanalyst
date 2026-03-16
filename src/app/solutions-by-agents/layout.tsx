import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Marketing Agents - 42 Specialized Agents for Every Channel",
  description:
    "Meet OpenAnalyst's 42 AI marketing agents: AI Vibe Marketer, Content Strategist, Ad Optimizer, Audience Analyst, Lead Scorer, and more. Each agent autonomously handles specialized marketing tasks.",
  keywords: [
    "AI marketing agents",
    "AI vibe marketer",
    "autonomous marketing agents",
    "AI content strategist",
    "AI ad optimizer",
    "AI audience analyst",
    "AI lead scorer",
    "marketing automation agents",
  ],
  alternates: {
    canonical: "https://openanalyst.com/solutions-by-agents/",
  },
  openGraph: {
    title: "42 AI Marketing Agents - Autonomous Campaign Management",
    description:
      "Discover OpenAnalyst's specialized AI agents: content creation, ad optimization, audience analysis, lead scoring, and more.",
    url: "https://openanalyst.com/solutions-by-agents/",
  },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
