'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/lib/theme-provider'

/**
 * Theme toggle button component that cycles through light, dark, and system themes.
 * Uses Lucide React icons and provides visual feedback for the current theme.
 * 
 * Features:
 * - Cycles through: light → dark → system → light
 * - Shows appropriate icon for current theme
 * - Accessible with proper ARIA labels
 * - Responsive design for mobile and desktop
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const handleToggle = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />
      case 'dark':
        return <Moon className="h-5 w-5" />
      case 'system':
        return <Monitor className="h-5 w-5" />
      default:
        return <Sun className="h-5 w-5" />
    }
  }

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode'
      case 'dark':
        return 'Switch to system mode'
      case 'system':
        return 'Switch to light mode'
      default:
        return 'Toggle theme'
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="
        inline-flex items-center justify-center
        h-10 w-10 rounded-md
        border border-input
        bg-background
        hover:bg-accent hover:text-accent-foreground
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        transition-colors duration-200
        text-muted-foreground hover:text-foreground
      "
      aria-label={getLabel()}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  )
} 