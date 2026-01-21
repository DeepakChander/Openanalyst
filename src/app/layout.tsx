import type { Metadata } from "next";
// import localFont from "next/font/local"; // Example for local fonts if needed later
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenAnalyst | AI-Powered Analytics Platform",
  description: "Transform your data into actionable intelligence with our cutting-edge AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black selection:bg-brand-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
