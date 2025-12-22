import './globals.css'
import MouseFollower from '@/components/ui/MouseFollower.jsx'

import { ReactNode } from 'react'

export const metadata = {
  title: 'SOUFIAN ALJAOUI | Full-Stack Web Developer Portfolio',
  description: 'Explore the portfolio of Soufian Aljaoui, a web developer specializing in modern web apps, React, Next.js, and clean UI/UX design.',
  keywords: [
    'Soufian Aljaoui',
    'Web Developer',
    'Frontend Developer',
    'Full-Stack Developer',
    'React',
    'Next.js',
    'Portfolio',
    'UI/UX Design',
  ],
  authors: [{ name: 'Soufian Aljaoui', url: 'https://yourwebsite.com' }],
  creator: 'Soufian Aljaoui',
  publisher: 'Soufian Aljaoui',
  metadataBase: new URL('https://yourwebsite.com'),
  openGraph: {
    title: 'SOUFIAN ALJAOUI | Web Developer Portfolio',
    description: 'Showcasing modern web development projects and UI/UX design.',
    url: 'https://yourwebsite.com',
    siteName: 'Soufian Aljaoui Portfolio',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Soufian Aljaoui Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOUFIAN ALJAOUI | Portfolio',
    description: 'Full-Stack Web Developer Portfolio featuring React, Next.js, and UI/UX projects.',
    creator: '@YourTwitterHandle',
    images: ['/images/logo.png'],
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  themeColor: '#111827', // dark gray for browser UI
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