import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - Blog, Case Studies & AI Marketing Guides",
  description:
    "Explore OpenAnalyst resources: AI marketing guides, case studies with real ROI data, best practices for campaign automation, and FAQs. Learn how to 10x your marketing with AI.",
  keywords: [
    "AI marketing blog",
    "marketing automation case studies",
    "AI marketing guides",
    "campaign automation best practices",
    "AI marketing resources",
    "marketing ROI case study",
  ],
  alternates: {
    canonical: "https://openanalyst.com/resources/",
  },
  openGraph: {
    title: "Resources - AI Marketing Guides & Case Studies",
    description:
      "Blog posts, case studies, and guides on AI marketing automation. Learn how companies 10x their ROI with OpenAnalyst.",
    url: "https://openanalyst.com/resources/",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
