import './globals.css'
import Navigation from '@/components/layout/Navigation.jsx'
import MouseFollower from '@/components/ui/MouseFollower.jsx'

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
        <MouseFollower />
        {/* <Navigation /> */}
          {children}
      </body>
    </html>
  )
}