import './globals.css'
import Navigation from '@/components/layout/Navigation.jsx'
import MouseFollower from '@/components/ui/MouseFollower.jsx'

import { ReactNode } from 'react'

export const metadata = {
  title: 'SOUFIAN ALJAOUI | Portfolio',
  description: 'Web Developer Portfolio',
  icons: {
    icon: '/images/logo.png',
  },

}

export default function RootLayout({
  children,
}: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <MouseFollower />
          {children}
      </body>
    </html>
  )
}