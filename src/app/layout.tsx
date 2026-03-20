import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://openclaw101.vip";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OpenClaw 101 - Master Your AI Assistant in 7 Days",
    template: "%s | OpenClaw 101",
  },
  description:
    "414+ tutorials and 5490+ skills for OpenClaw AI assistant. From setup to advanced automation.",
  keywords: [
    "OpenClaw",
    "AI assistant",
    "tutorials",
    "skills",
    "ClawHub",
    "AI agent",
    "OpenClaw skills",
    "OpenClaw tutorials",
    "AI automation",
    "self-hosted AI",
  ],
  authors: [{ name: "OpenClaw 101" }],
  creator: "OpenClaw 101",
  publisher: "OpenClaw 101",
  openGraph: {
    title: "OpenClaw 101 - Master Your AI Assistant in 7 Days",
    description:
      "414+ tutorials and 5490+ skills for OpenClaw AI assistant. From setup to advanced automation.",
    url: SITE_URL,
    siteName: "OpenClaw 101",
    locale: "en_US",
    alternateLocale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenClaw 101 - Master Your AI Assistant | 414+ Tutorials & 5490+ Skills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw 101 - Master Your AI Assistant in 7 Days",
    description:
      "414+ tutorials and 5490+ skills for OpenClaw AI assistant. From setup to advanced automation.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}/en`,
      zh: `${SITE_URL}/zh`,
    },
  },
};

const GA_ID = "G-JSHGKV6LDM";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="alternate" type="application/rss+xml" title="OpenClaw 101 Tutorials" href="https://openclaw101.vip/feed.xml" />

        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1509155490380091"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
