import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s · ${profile.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: profile.name, url: profile.linkedin.href }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en_US",
    firstName: "Vinayak",
    lastName: "Magdum",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.shortTitle,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      jobTitle: profile.role,
      description: siteConfig.description,
      email: `mailto:${profile.email}`,
      url: siteUrl,
      sameAs: [profile.linkedin.href],
      address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
      worksFor: { "@type": "Organization", name: "Shework" },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Cardiff University" },
        { "@type": "CollegeOrUniversity", name: "MIT-WPU" },
      ],
      knowsAbout: [
        "Large Language Models",
        "Retrieval-Augmented Generation",
        "Agentic AI",
        "Semantic Search",
        "Document Intelligence",
        "Python",
        "FastAPI",
        "Prompt Engineering",
        "LLM Output Validation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.shortTitle,
      description: siteConfig.description,
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so reveal animations can safely hide content until it scrolls in. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
