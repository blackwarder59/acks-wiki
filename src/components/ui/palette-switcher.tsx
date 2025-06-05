'use client'

import React, { useState, useEffect } from 'react'
import { Palette, Crown, Leaf, Waves, Flame, Check } from 'lucide-react'

/**
 * Interactive Color Palette Switcher Component
 * 
 * This component allows users to test different color palettes in real-time
 * by applying data attributes to the document root element. The CSS design tokens
 * system responds instantly to palette changes using CSS custom properties.
 * 
 * Features:
 * - Real-time palette switching
 * - Visual preview of each palette
 * - Persistent selection via localStorage
 * - Smooth transitions between palettes
 * - Accessible keyboard navigation
 */

type PaletteOption = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  primaryColor: string
  secondaryColor: string
  previewGradient: string
}

const paletteOptions: PaletteOption[] = [
  {
    id: 'acks-royal',
    name: 'ACKS Royal',
    description: 'Classic gold and crimson - regal and authoritative',
    icon: <Crown className="h-4 w-4" />,
    primaryColor: '#D4AF37',
    secondaryColor: '#DC143C',
    previewGradient: 'linear-gradient(135deg, #D4AF37 0%, #DC143C 100%)'
  },
  {
    id: 'forest-mystique',
    name: 'Forest Mystique',
    description: 'Deep greens and earth tones - natural and mystical',
    icon: <Leaf className="h-4 w-4" />,
    primaryColor: '#228B22',
    secondaryColor: '#8B4513',
    previewGradient: 'linear-gradient(135deg, #228B22 0%, #8B4513 100%)'
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    description: 'Blues and sea greens - calm and mysterious',
    icon: <Waves className="h-4 w-4" />,
    primaryColor: '#1E90FF',
    secondaryColor: '#20B2AA',
    previewGradient: 'linear-gradient(135deg, #1E90FF 0%, #20B2AA 100%)'
  },
  {
    id: 'volcanic-forge',
    name: 'Volcanic Forge',
    description: 'Fiery oranges and golds - bold and energetic',
    icon: <Flame className="h-4 w-4" />,
    primaryColor: '#FF4500',
    secondaryColor: '#FFD700',
    previewGradient: 'linear-gradient(135deg, #FF4500 0%, #FFD700 100%)'
  }
]

interface PaletteSwitcherProps {
  className?: string
  showLabels?: boolean
}

export function PaletteSwitcher({ className = '', showLabels = true }: PaletteSwitcherProps) {
  const [activePalette, setActivePalette] = useState<string>('acks-royal')
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  // Load saved palette from localStorage on component mount
  useEffect(() => {
    const savedPalette = localStorage.getItem('acks-wiki-palette')
    if (savedPalette && paletteOptions.find(p => p.id === savedPalette)) {
      setActivePalette(savedPalette)
      applyPalette(savedPalette)
    }
  }, [])

  /**
   * Apply the selected palette to the document root
   * This immediately changes all CSS custom properties throughout the app
   */
  const applyPalette = (paletteId: string) => {
    document.documentElement.setAttribute('data-palette', paletteId)
  }

  /**
   * Handle palette selection with persistence and smooth transition
   */
  const handlePaletteChange = (paletteId: string) => {
    setActivePalette(paletteId)
    applyPalette(paletteId)
    localStorage.setItem('acks-wiki-palette', paletteId)
    
    // Auto-collapse after selection for better UX
    setTimeout(() => setIsExpanded(false), 1000)
  }

  const activePaletteOption = paletteOptions.find(p => p.id === activePalette)

  return (
    <div className={`relative ${className}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
        aria-label="Toggle color palette options"
        aria-expanded={isExpanded}
      >
        <Palette className="h-4 w-4" />
        {showLabels && (
          <span className="text-sm font-medium">
            {activePaletteOption?.name || 'Color Theme'}
          </span>
        )}
        <div 
          className="w-4 h-4 rounded-full border-2 border-white/50"
          style={{ background: activePaletteOption?.previewGradient }}
          aria-hidden="true"
        />
      </button>

      {/* Expanded Palette Options */}
      {isExpanded && (
        <div className="absolute top-full mt-2 right-0 z-50 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 min-w-80">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Choose Color Theme
          </h3>
          
          <div className="space-y-2">
            {paletteOptions.map((palette) => (
              <button
                key={palette.id}
                onClick={() => handlePaletteChange(palette.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left ${
                  activePalette === palette.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-600'
                    : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-pressed={activePalette === palette.id}
              >
                {/* Preview Gradient */}
                <div 
                  className="w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-gray-600 flex-shrink-0"
                  style={{ background: palette.previewGradient }}
                  aria-hidden="true"
                />
                
                {/* Palette Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {palette.icon}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {palette.name}
                    </span>
                    {activePalette === palette.id && (
                      <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {palette.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Info Footer */}
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Theme changes are applied instantly and saved automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Compact version for headers and constrained spaces
 * Styled specifically for light backgrounds and header integration
 */
export function CompactPaletteSwitcher({ className = '' }: { className?: string }) {
  const [activePalette, setActivePalette] = useState<string>('acks-royal')
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  // Load saved palette from localStorage on component mount
  useEffect(() => {
    const savedPalette = localStorage.getItem('acks-wiki-palette')
    if (savedPalette && paletteOptions.find(p => p.id === savedPalette)) {
      setActivePalette(savedPalette)
      applyPalette(savedPalette)
    }
  }, [])

  /**
   * Apply the selected palette to the document root
   */
  const applyPalette = (paletteId: string) => {
    document.documentElement.setAttribute('data-palette', paletteId)
  }

  /**
   * Handle palette selection with persistence
   */
  const handlePaletteChange = (paletteId: string) => {
    setActivePalette(paletteId)
    applyPalette(paletteId)
    localStorage.setItem('acks-wiki-palette', paletteId)
    
    // Auto-collapse after selection
    setTimeout(() => setIsExpanded(false), 1000)
  }

  const activePaletteOption = paletteOptions.find(p => p.id === activePalette)

  return (
    <div className={`relative ${className}`}>
      {/* Compact Toggle Button - Header Friendly */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-200"
        aria-label="Toggle color palette options"
        aria-expanded={isExpanded}
        title={`Current theme: ${activePaletteOption?.name || 'ACKS Royal'}`}
      >
        <div 
          className="w-5 h-5 rounded-full border-2 border-muted-foreground/30"
          style={{ background: activePaletteOption?.previewGradient }}
          aria-hidden="true"
        />
      </button>

      {/* Expanded Palette Options */}
      {isExpanded && (
        <div className="absolute top-full mt-2 right-0 z-50 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 min-w-80">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Choose Color Theme
          </h3>
          
          <div className="space-y-2">
            {paletteOptions.map((palette) => (
              <button
                key={palette.id}
                onClick={() => handlePaletteChange(palette.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left ${
                  activePalette === palette.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-600'
                    : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-pressed={activePalette === palette.id}
              >
                {/* Preview Gradient */}
                <div 
                  className="w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-gray-600 flex-shrink-0"
                  style={{ background: palette.previewGradient }}
                  aria-hidden="true"
                />
                
                {/* Palette Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {palette.icon}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {palette.name}
                    </span>
                    {activePalette === palette.id && (
                      <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {palette.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Info Footer */}
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Theme changes are applied instantly and saved automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 