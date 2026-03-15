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

export const metadata: Metadata = {
  title: "OpenClaw 101 - Master Your AI Assistant in 7 Days",
  description: "409+ tutorials and 5490+ skills for OpenClaw AI assistant. From setup to advanced automation.",
  keywords: ["OpenClaw", "AI assistant", "tutorials", "skills", "ClawHub", "AI agent"],
  authors: [{ name: "OpenClaw 101" }],
  openGraph: {
    title: "OpenClaw 101 - Master Your AI Assistant in 7 Days",
    description: "409+ tutorials and 5490+ skills for OpenClaw AI assistant.",
    url: "https://openclaw101.vip",
    siteName: "OpenClaw 101",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw 101 - Master Your AI Assistant in 7 Days",
    description: "409+ tutorials and 5490+ skills for OpenClaw AI assistant.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const GA_ID = "G-QX2N2KERB6";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://openclaw101.vip" />
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
