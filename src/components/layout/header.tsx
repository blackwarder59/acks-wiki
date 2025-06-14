'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Sword } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { CompactSearchInput } from '@/components/ui/search-input'
import { MobileNavigation, MobileNavToggle } from '@/components/ui/mobile-navigation'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CompactPaletteSwitcher } from '@/components/ui/palette-switcher'
import { TooltipProvider } from '@/components/ui/tooltip-provider'
import { TooltipTrigger } from '@/components/ui/tooltip-trigger'

/**
 * Main header component for the ACKS II Wiki.
 * 
 * Features:
 * - Enhanced mobile navigation with gesture support
 * - Breadcrumb navigation showing content hierarchy
 * - ACKS II branding with sword icon
 * - Navigation links to main content categories
 * - Integrated search functionality
 * - Interactive color palette switcher for real-time theming
 * - Theme toggle button (light/dark mode)
 * - Accessible navigation with proper ARIA labels
 * - Mobile-first design with smooth animations
 */
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const toggleMobileMenu = (open: boolean) => {
    setIsMobileMenuOpen(open)
  }

  /**
   * Handle search from the global search input
   * Navigate to search page with the query
   */
  const handleGlobalSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const navigationItems = [
    { href: '/rules', label: 'ACKS II Rulebook', status: 'wip' },
    { href: '/monsters', label: 'Monsters', status: 'soon' },
    { href: '/spells', label: 'Spells', status: 'soon' },
    { href: '/judges-journal', label: 'Judges Journal', status: 'soon' },
  ]

  // Show breadcrumbs on content pages (not on home page)
  const showBreadcrumbs = pathname !== '/'

  return (
    <>
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
          <div className="flex-1 flex justify-center items-center">
            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => {
                const link = (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      pathname.startsWith(item.href)
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                    {item.status === 'wip' && (
                      <span className="ml-2 inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-200">
                        Under Construction
                      </span>
                    )}
                  </Link>
                )

                if (item.status === 'soon') {
                  return (
                    <TooltipTrigger
                      key={item.href}
                      content={<div className="p-2 text-sm">Coming Soon</div>}
                    >
                      {link}
                    </TooltipTrigger>
                  )
                }
                return link
              })}
            </nav>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-sm mx-4">
            <CompactSearchInput 
              placeholder="Search monsters, spells, classes..."
              className="w-full"
              onSearch={handleGlobalSearch}
            />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Color Palette Switcher */}
            <CompactPaletteSwitcher />
            
            {/* Visual palette indicator - shows current colors */}
            <div className="hidden sm:flex items-center gap-1">
              <div 
                className="w-3 h-3 rounded-full border border-muted-foreground/30"
                style={{ backgroundColor: 'var(--color-primary)' }}
                title="Primary color"
              />
              <div 
                className="w-3 h-3 rounded-full border border-muted-foreground/30"
                style={{ backgroundColor: 'var(--color-secondary)' }}
                title="Secondary color"
              />
            </div>
            
            {/* Theme Toggle */}
            <ThemeToggle />

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <MobileNavToggle 
                  isOpen={isMobileMenuOpen}
                  onToggle={toggleMobileMenu}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        {showBreadcrumbs && (
          <div className="border-t border-border bg-muted/30">
            <div className="container mx-auto px-4 py-2">
              <Breadcrumb 
                maxItems={3}
                className="text-sm"
              />
            </div>
          </div>
        )}
    </header>

      {/* Enhanced Mobile Navigation */}
      <MobileNavigation 
        isOpen={isMobileMenuOpen}
        onToggle={toggleMobileMenu}
        enableGestures={true}
      />
    </>
  )
} 