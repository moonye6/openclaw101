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
    default: "OpenClaw Tutorial & Guide — Learn AI Agent Skills in 7 Days | OpenClaw 101",
    template: "%s | OpenClaw 101",
  },
  description:
    "The complete OpenClaw tutorial: 414+ guides and 5490+ skills to master the open-source AI agent. Learn how to install, configure, and automate with OpenClaw step by step.",
  keywords: [
    "OpenClaw tutorial",
    "OpenClaw guide",
    "how to use OpenClaw",
    "OpenClaw skills",
    "AI agent tutorial",
    "OpenClaw installation",
    "OpenClaw setup guide",
    "ClawHub skills",
    "OpenClaw automation",
    "self-hosted AI assistant",
    "OpenClaw vs ChatGPT",
    "open source AI agent",
  ],
  authors: [{ name: "OpenClaw 101 Team", url: SITE_URL }],
  creator: "OpenClaw 101",
  publisher: "OpenClaw 101",
  openGraph: {
    title: "OpenClaw Tutorial & Guide — Learn AI Agent Skills in 7 Days",
    description:
      "The complete OpenClaw tutorial: 414+ guides and 5490+ skills. From installation to advanced automation.",
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
        alt: "OpenClaw 101 Tutorial — 414+ Guides & 5490+ Skills for AI Agent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw Tutorial & Guide — Learn AI Agent Skills in 7 Days",
    description:
      "The complete OpenClaw tutorial: 414+ guides and 5490+ skills. From installation to advanced automation.",
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

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-JSHGKV6LDM";

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
        <meta name="theme-color" content="#0B0F19" />
        <link rel="alternate" type="application/rss+xml" title="OpenClaw 101 Tutorials" href="https://openclaw101.vip/feed.xml" />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1509155490380091"
          crossOrigin="anonymous"
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
