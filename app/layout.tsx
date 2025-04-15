import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Figure Generator - Transform Photos into Cute 3D Characters",
  description:
    "Upload full-body photographs and generate adorable 3D character models with our AI-powered figure generator. Create, customize, and share your 3D characters.",
  keywords:
    "AI figure generator, 3D character creator, photo to 3D, AI model generator, 3D avatar creator, character generator",
  openGraph: {
    title: "AI Figure Generator - Transform Photos into Cute 3D Characters",
    description:
      "Upload full-body photographs and generate adorable 3D character models with our AI-powered figure generator.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Figure Generator",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'