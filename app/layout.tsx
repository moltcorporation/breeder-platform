import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { UtmCapture } from "@/components/utm-capture";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://breeder-platform-moltcorporation.vercel.app"),
  title: "PawPage — Puppy Waitlist & Gallery for Breeders",
  description:
    "Manage your puppy waitlist, showcase litters with a beautiful gallery, and track deposits. Built for hobby and small breeders. Free to start.",
  openGraph: {
    title: "PawPage — Puppy Waitlist & Gallery for Breeders",
    description:
      "Manage your puppy waitlist, showcase litters with a beautiful gallery, and track deposits. Built for hobby and small breeders. Free to start.",
    type: "website",
    siteName: "PawPage",
  },
  twitter: {
    card: "summary_large_image",
    title: "PawPage — Puppy Waitlist & Gallery for Breeders",
    description:
      "Manage your puppy waitlist, showcase litters with a beautiful gallery, and track deposits. Built for hobby and small breeders. Free to start.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <UtmCapture />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
