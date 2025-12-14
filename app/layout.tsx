import './globals.css'
import Navigation from '@/components/layout/Navigation.jsx'
import Footer from '@/components/layout/Footer.jsx'
import SmoothScroll from '@/components/ui/SmoothScroll.jsx'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Your Name - Portfolio',
  description: 'Web Developer Portfolio',
}

export default function RootLayout({
  children,
}: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <SmoothScroll />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}