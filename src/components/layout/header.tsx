'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Sword } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

/**
 * Main header component for the ACKS II Wiki.
 * 
 * Features:
 * - Responsive design with mobile hamburger menu
 * - ACKS II branding with sword icon
 * - Navigation links to main content categories
 * - Search bar (placeholder for now)
 * - Theme toggle button
 * - Accessible navigation with proper ARIA labels
 * - Mobile-first design with smooth animations
 */
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navigationItems = [
    { href: '/monsters', label: 'Monsters' },
    { href: '/spells', label: 'Spells' },
    { href: '/classes', label: 'Classes' },
    { href: '/equipment', label: 'Equipment' },
    { href: '/rules', label: 'Rules' },
    { href: '/judge-tools', label: 'Judge Tools' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Sword className="h-6 w-6 text-primary" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">ACKS II</span>
                <span className="text-xs text-muted-foreground -mt-1">Wiki</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-sm mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search monsters, spells, classes..."
                className="
                  w-full pl-10 pr-4 py-2 text-sm
                  bg-background border border-input rounded-md
                  focus:outline-none focus:ring-2 focus:ring-ring
                  placeholder:text-muted-foreground
                "
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="
                      w-full pl-10 pr-4 py-2 text-sm
                      bg-background border border-input rounded-md
                      focus:outline-none focus:ring-2 focus:ring-ring
                      placeholder:text-muted-foreground
                    "
                  />
                </div>
              </div>

              {/* Mobile Navigation Links */}
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 