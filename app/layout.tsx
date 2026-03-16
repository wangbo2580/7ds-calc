import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title:
    "7DS Origin Pity Calculator - Seven Deadly Sins Origin Pull Calculator",
  description:
    "Calculate how many pulls you need for a guaranteed 5-star in Seven Deadly Sins: Origin. Free pity calculator with probability charts and resource planner.",
  keywords: [
    "seven deadly sins origin pity calculator",
    "7ds origin calculator",
    "7ds origin pity",
    "seven deadly sins origin pull calculator",
    "7ds origin gacha calculator",
    "seven deadly sins origin how many pulls",
    "7ds origin banner",
    "seven deadly sins origin summon calculator",
  ],
  openGraph: {
    title: "7DS Origin Pity Calculator",
    description:
      "Calculate how many pulls you need for a guaranteed 5-star in Seven Deadly Sins: Origin.",
    type: "website",
    siteName: "7DS Calc",
    url: "https://7dscalc.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "7DS Origin Pity Calculator",
    description:
      "Free pity calculator for Seven Deadly Sins: Origin with probability charts.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://7dscalc.com",
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
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GG0FGP0PSP"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GG0FGP0PSP');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
