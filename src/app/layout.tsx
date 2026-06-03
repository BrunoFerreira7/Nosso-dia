import type { Metadata } from "next";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Happy 23rd Birthday Anu!",
  description: "A birthday celebration page for Anu's 23rd birthday.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Happy 23rd Birthday Anu!",
    description: "A birthday celebration page for Anu's 23rd birthday.",
    siteName: "Happy Birthday Anu",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy 23rd Birthday Anu!",
    description: "A birthday celebration page for Anu's 23rd birthday.",
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
