'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Portfolio</Link>
        <div className="flex space-x-6">
          {links.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={pathname === link.path ? 'text-blue-600' : 'text-gray-700'}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}