import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ToolsHub - Free Online Tools for PDF, Images, Text & More",
  description:
    "Access 50+ free online tools for PDF conversion, image editing, text formatting, calculators, SEO optimization and more. No downloads required!",
  keywords: "online tools, PDF tools, image tools, text tools, calculators, SEO tools, free tools",
  authors: [{ name: "ToolsHub" }],
  creator: "ToolsHub",
  publisher: "ToolsHub",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolshub.com",
    title: "ToolsHub - Free Online Tools for PDF, Images, Text & More",
    description:
      "Access 50+ free online tools for PDF conversion, image editing, text formatting, calculators, SEO optimization and more. No downloads required!",
    siteName: "ToolsHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolsHub - Free Online Tools",
    description: "Access 50+ free online tools for PDF, images, text and more",
    creator: "@toolshub",
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://toolshub.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
