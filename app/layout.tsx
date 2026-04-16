import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { PropertyProvider } from '@/contexts/PropertyContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'HP VERSE REAL ESTATE | Premium Real Estate',
  description: 'Discover luxury properties and premium real estate with HP VERSE REAL ESTATE. Find your dream home among our exclusive collection of villas, penthouses, and apartments.',
  keywords: ['real estate', 'luxury homes', 'premium properties', 'villas', 'penthouses', 'apartments', 'HP VERSE REAL ESTATE'],
  icons: {
    icon: '/hp background.png',
    apple: '/hp background.png',
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
