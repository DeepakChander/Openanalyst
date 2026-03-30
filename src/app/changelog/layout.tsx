import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog - Product Updates & Release Notes",
  description:
    "Stay up to date with OpenAnalyst product updates, new features, AI agent improvements, and platform enhancements.",
  alternates: {
    canonical: "https://openanalyst.com/changelog/",
  },
  openGraph: {
    title: "Changelog - OpenAnalyst Product Updates",
    description:
      "Latest product updates, new features, and improvements to the OpenAnalyst AI marketing platform.",
    url: "https://openanalyst.com/changelog/",
  },
};

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
