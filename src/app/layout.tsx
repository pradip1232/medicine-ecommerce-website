import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/providers/AuthProvider'
import { CartProvider } from '@/providers/CartProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sanjeevika - Premium Ayurvedic Products',
  description: 'Discover authentic Ayurvedic products for health and wellness. Natural, trusted, and effective solutions for your well-being.',
  keywords: 'ayurveda, natural products, health, wellness, herbal medicine, organic',
  authors: [{ name: 'Sanjeevika' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}