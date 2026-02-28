import type { Metadata } from "next";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Our Story 💜",
  description: "A beautiful timeline of how your love story began.",
  openGraph: {
    title: "Our Story 💜",
    description: "A beautiful timeline of how your love story began.",
    siteName: "Our Story",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story 💜",
    description: "A beautiful timeline of how your love story began.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden overflow-y-auto">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
