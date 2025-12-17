import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import "@/styles/navbar.css"
import "@/styles/scrollbar.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Artisan Interiors - Transform Your Space",
  description: "Premium interior design and planning services that blend elegance with functionality",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased overflow-x-hidden w-full`}>
        <div className="w-full overflow-x-hidden">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  )
}
