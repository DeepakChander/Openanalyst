import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with OpenAnalyst",
  description:
    "Contact OpenAnalyst for demos, partnerships, support, or enterprise inquiries. Our team is ready to help you automate your marketing with AI agents.",
  keywords: [
    "contact OpenAnalyst",
    "AI marketing demo",
    "marketing automation support",
    "OpenAnalyst support",
    "enterprise AI marketing",
  ],
  alternates: {
    canonical: "https://openanalyst.com/contact/",
  },
  openGraph: {
    title: "Contact OpenAnalyst - AI Marketing Platform",
    description:
      "Get in touch for demos, support, or enterprise inquiries. Let us help you automate your marketing.",
    url: "https://openanalyst.com/contact/",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
