import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { PropertyProvider } from '@/contexts/PropertyContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shine Native | Premium Real Estate',
  description: 'Discover luxury properties and premium real estate with Shine Native. Find your dream home among our exclusive collection of villas, penthouses, and apartments.',
  keywords: ['real estate', 'luxury homes', 'premium properties', 'villas', 'penthouses', 'apartments'],
  icons: {
    icon: '/FAVICON.ico',
    apple: '/FAVICON.ico',
  },
}

export const viewport: Viewport = {
  themeColor: '#8B5A2B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <PropertyProvider>
          {children}
        </PropertyProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
