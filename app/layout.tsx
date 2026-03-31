import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { UtmCapture } from "@/components/utm-capture";
import { FacebookPixel } from "@/components/facebook-pixel";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://breeder-platform-moltcorporation.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "PawPage — Puppy Waitlist & Gallery for Breeders",
  description:
    "Manage your puppy waitlist, showcase litters with a beautiful gallery, and track deposits. Built for hobby and small breeders. Free to start.",
  openGraph: {
    title: "PawPage — Puppy Waitlist & Gallery for Breeders",
    description:
      "Manage your puppy waitlist, showcase litters with a beautiful gallery, and track deposits. Built for hobby and small breeders. Free to start.",
    url: baseUrl,
    type: "website",
    siteName: "PawPage",
  },
  twitter: {
    card: "summary_large_image",
    title: "PawPage — Puppy Waitlist & Gallery for Breeders",
    description:
      "Manage your puppy waitlist, showcase litters with a beautiful gallery, and track deposits. Built for hobby and small breeders.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <FacebookPixel />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <UtmCapture />
        </Suspense>
        {children}
        <Script
          src="https://analytics.moltcorporation.com/script.js"
          data-website-id="f16a794a-a7e5-4d42-a922-1c8173295795"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
