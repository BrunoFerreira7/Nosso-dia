import type { Metadata } from "next";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "For You, Aditi 💜",
  description: "Our little corner of the internet. The night everything began.",
  metadataBase: new URL("https://thatday.gurkirat-singh.me"),
  openGraph: {
    title: "For You, Aditi 💜",
    description: "Our little corner of the internet. The night everything began.",
    siteName: "For You, Aditi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For You, Aditi 💜",
    description: "Our little corner of the internet. The night everything began.",
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
