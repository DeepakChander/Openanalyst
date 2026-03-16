import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers - Join the OpenAnalyst Team",
  description:
    "Join OpenAnalyst and build the future of AI-powered marketing. We're a remote-first team hiring engineers, marketers, and product minds. See open positions.",
  keywords: [
    "OpenAnalyst careers",
    "AI marketing jobs",
    "remote AI jobs",
    "marketing tech jobs",
    "OpenAnalyst hiring",
    "startup jobs AI",
  ],
  alternates: {
    canonical: "https://openanalyst.com/careers/",
  },
  openGraph: {
    title: "Careers at OpenAnalyst - Build the Future of AI Marketing",
    description:
      "Remote-first culture. Join our team building AI agents that automate marketing for thousands of companies worldwide.",
    url: "https://openanalyst.com/careers/",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
