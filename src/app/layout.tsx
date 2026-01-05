import type { Metadata } from 'next'
import './globals.css'
import { LogoBar } from '@/components/LogoBar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Learn Math - iiskills.cloud',
  description: 'Advanced Mathematics Tutorial Platform - iiskills.cloud',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <LogoBar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
