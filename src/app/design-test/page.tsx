import React from 'react'
import { PaletteSwitcher } from '@/components/ui/palette-switcher'
import { Sword, Shield, Scroll, BookOpen, Crown, Hammer } from 'lucide-react'

/**
 * Design System Test Page
 * 
 * This page showcases all the design tokens and color palettes in action.
 * It serves as a visual testing ground for the interactive palette switcher
 * and demonstrates how all components respond to palette changes.
 * 
 * Features:
 * - Interactive palette switcher
 * - Sample hero section with gradients
 * - Content cards with different gradient treatments
 * - Typography scale demonstration
 * - Spacing and component examples
 */

export default function DesignTestPage() {
  const contentCards = [
    {
      title: 'Monsters',
      description: '292 creatures from the Auran Empire',
      icon: <Sword className="h-8 w-8" />,
      gradient: 'bg-gradient-monsters',
      count: '292 entries'
    },
    {
      title: 'Spells',
      description: 'Arcane and divine magic for all levels',
      icon: <Scroll className="h-8 w-8" />,
      gradient: 'bg-gradient-spells',
      count: '300+ spells'
    },
    {
      title: 'Classes',
      description: 'Character classes and templates',
      icon: <Shield className="h-8 w-8" />,
      gradient: 'bg-gradient-classes',
      count: '20+ classes'
    },
    {
      title: 'Equipment',
      description: 'Weapons, armor, and gear',
      icon: <Hammer className="h-8 w-8" />,
      gradient: 'bg-gradient-equipment',
      count: 'Complete catalog'
    },
    {
      title: 'Rules',
      description: 'Core mechanics and guidelines',
      icon: <BookOpen className="h-8 w-8" />,
      gradient: 'bg-gradient-rules',
      count: 'Full rulebook'
    },
    {
      title: 'Journal',
      description: 'Judges guidance and adventures',
      icon: <Crown className="h-8 w-8" />,
      gradient: 'bg-gradient-journal',
      count: 'Expert advice'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header with Palette Switcher */}
      <header className="bg-gradient-hero hero-animated relative overflow-visible">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-white font-bold mb-2" style={{ fontSize: 'var(--font-size-hero)' }}>
                Design System Test
              </h1>
              <p className="text-white/90 text-lg max-w-2xl">
                Interactive color palette testing for the ACKS II Wiki. 
                Change palettes and see the entire design system update instantly.
              </p>
            </div>
            <PaletteSwitcher />
          </div>
        </div>
      </header>

      <main className="container py-12 space-y-16">
        {/* Typography Scale Demo */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Typography Scale
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Hero Size (Responsive)</p>
              <h1 style={{ fontSize: 'var(--font-size-hero)', color: 'var(--color-primary)' }}>
                Hero Typography
              </h1>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Section Size (Responsive)</p>
              <h2 style={{ fontSize: 'var(--font-size-section)', color: 'var(--color-secondary)' }}>
                Section Typography
              </h2>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Card Size</p>
              <h3 style={{ fontSize: 'var(--font-size-card)' }}>
                Card Typography
              </h3>
            </div>
          </div>
        </section>

        {/* Content Cards Demo */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Content Cards with Gradients
          </h2>
          <div className="grid-auto-fit">
            {contentCards.map((card, index) => (
              <div 
                key={index}
                className="card-hover relative overflow-hidden rounded-xl shadow-lg"
              >
                {/* Gradient Background */}
                <div className={`${card.gradient} p-6 text-white`}>
                  <div className="flex items-center gap-3 mb-3">
                    {card.icon}
                    <h3 className="text-xl font-bold">{card.title}</h3>
                  </div>
                  <p className="text-white/90 mb-4">{card.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">{card.count}</span>
                    <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons & Interactive Elements */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Interactive Elements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Primary Buttons</h3>
              <div className="space-y-3">
                <button className="btn-primary w-full">Primary Action</button>
                <button 
                  className="w-full px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    borderColor: 'var(--color-primary)',
                    color: 'var(--color-primary)'
                  }}
                >
                  Secondary Action
                </button>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Color Swatches</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg border shadow-sm"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                  <span className="text-sm">Primary</span>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg border shadow-sm"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  />
                  <span className="text-sm">Secondary</span>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg border shadow-sm"
                    style={{ backgroundColor: 'var(--color-accent-emerald)' }}
                  />
                  <span className="text-sm">Accent</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Spacing Scale</h3>
              <div className="space-y-2">
                <div 
                  className="bg-blue-100 dark:bg-blue-900 rounded"
                  style={{ height: 'var(--space-xs)' }}
                />
                <div 
                  className="bg-blue-200 dark:bg-blue-800 rounded"
                  style={{ height: 'var(--space-sm)' }}
                />
                <div 
                  className="bg-blue-300 dark:bg-blue-700 rounded"
                  style={{ height: 'var(--space-md)' }}
                />
                <div 
                  className="bg-blue-400 dark:bg-blue-600 rounded"
                  style={{ height: 'var(--space-lg)' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Gradient Showcase */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Gradient System
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['hero', 'monsters', 'spells', 'classes', 'equipment', 'rules', 'journal'].map((gradient) => (
              <div key={gradient} className="text-center">
                <div 
                  className={`bg-gradient-${gradient} h-24 rounded-lg mb-2 shadow-lg`}
                />
                <p className="text-sm capitalize text-gray-600 dark:text-gray-400">
                  {gradient}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Instructions */}
        <section className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">
            🎨 How to Test
          </h2>
          <div className="space-y-2 text-blue-800 dark:text-blue-200">
            <p>• <strong>Click the palette switcher</strong> in the top-right corner of the hero section</p>
            <p>• <strong>Try different color schemes</strong> and watch the entire page transform instantly</p>
            <p>• <strong>Notice how gradients, buttons, and colors</strong> all update consistently</p>
            <p>• <strong>Your selection is saved</strong> and will persist when you reload the page</p>
            <p>• <strong>Test on mobile and desktop</strong> to see responsive design in action</p>
          </div>
        </section>
      </main>
    </div>
  )
} 