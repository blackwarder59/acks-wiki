'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, BookOpen, Sword, Shield, Scroll, Crown, Hammer } from 'lucide-react'

/**
 * Sidebar component for secondary navigation and quick access to content categories.
 * 
 * Features:
 * - Collapsible sections for different content types
 * - Quick links to popular content with proper URL parameters for filtering
 * - Mobile-responsive with slide-in behavior
 * - Accessible with proper ARIA labels
 * - Icons for visual hierarchy
 * - Smooth animations for expand/collapse
 * - Links only to existing routes and pages
 */

interface SidebarSection {
  title: string
  icon: React.ReactNode
  items: { href: string; label: string; count?: number; disabled?: boolean }[]
}

export function Sidebar({ className = '' }: { className?: string }) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['monsters', 'spells'])

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionTitle)
        ? prev.filter(title => title !== sectionTitle)
        : [...prev, sectionTitle]
    )
  }

  const sidebarSections: SidebarSection[] = [
    {
      title: 'monsters',
      icon: <Sword className="h-4 w-4" />,
      items: [
        { href: '/monsters', label: 'All Monsters', count: 167 },
        { href: '/monsters', label: 'Animals (Search on page)' },
        { href: '/monsters', label: 'Vermin (Search on page)' },
        { href: '/monsters', label: 'Monstrosities (Search on page)' },
        { href: '/monsters', label: 'Incarnations (Search on page)' },
        { href: '/monsters', label: 'High XP (Search on page)' },
      ]
    },
    {
      title: 'spells',
      icon: <Scroll className="h-4 w-4" />,
      items: [
        { href: '/spells', label: 'All Spells' },
        { href: '/spells?magicType=Arcane', label: 'Arcane Spells' },
        { href: '/spells?magicType=Divine', label: 'Divine Spells' },
        { href: '/spells?level=1', label: '1st Level' },
        { href: '/spells?level=2', label: '2nd Level' },
        { href: '/spells?level=3', label: '3rd Level' },
      ]
    },
    {
      title: 'rules',
      icon: <BookOpen className="h-4 w-4" />,
      items: [
        { href: '/rules', label: 'All Rules', count: 118 },
        { href: '/rules/character-creation', label: 'Character Creation', count: 15 },
        { href: '/rules/classes', label: 'Character Classes', count: 5 },
        { href: '/rules/proficiencies', label: 'Proficiencies', count: 6 },
        { href: '/rules/equipment', label: 'Equipment & Gear', count: 12 },
        { href: '/rules/spells', label: 'Spells & Magic', count: 8 },
        { href: '/rules/adventures', label: 'Adventures', count: 6 },
        { href: '/rules/campaigns', label: 'Campaigns', count: 10 },
        { href: '/rules/armies', label: 'Armies & War', count: 7 },
      ]
    },
    {
      title: 'judges-journal',
      icon: <Crown className="h-4 w-4" />,
      items: [
        { href: '/judges-journal', label: 'All Journal Content', count: 175 },
        { href: '/judges-journal', label: 'Campaign Tools (Coming Soon)', disabled: true },
        { href: '/judges-journal', label: 'Adventure Design (Coming Soon)', disabled: true },
        { href: '/judges-journal', label: 'NPCs & Organizations (Coming Soon)', disabled: true },
        { href: '/judges-journal', label: 'Optional Rules (Coming Soon)', disabled: true },
      ]
    },
    {
      title: 'coming-soon',
      icon: <Shield className="h-4 w-4" />,
      items: [
        { href: '#', label: 'Character Classes', disabled: true },
        { href: '#', label: 'Equipment Database', disabled: true },
        { href: '#', label: 'Judge Tools', disabled: true },
        { href: '#', label: 'Campaign Resources', disabled: true },
      ]
    },
  ]

  return (
    <aside className={`w-64 bg-card border-r border-border ${className}`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Navigation</h2>
        
        <nav className="space-y-2">
          {sidebarSections.map((section) => {
            const isExpanded = expandedSections.includes(section.title)
            
            return (
              <div key={section.title} className="space-y-1">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.title)}
                  className="
                    w-full flex items-center justify-between
                    px-3 py-2 text-sm font-medium
                    text-muted-foreground hover:text-foreground
                    hover:bg-accent rounded-md
                    transition-colors duration-200
                  "
                  aria-expanded={isExpanded}
                  aria-controls={`section-${section.title}`}
                >
                  <div className="flex items-center space-x-2">
                    {section.icon}
                    <span className="capitalize">{section.title.replace('-', ' ')}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {/* Section Items */}
                {isExpanded && (
                  <div
                    id={`section-${section.title}`}
                    className="ml-6 space-y-1 animate-in slide-in-from-top-2 duration-200"
                  >
                    {section.items.map((item) => (
                      <div key={item.href + item.label}>
                        {item.disabled ? (
                          <div className="
                            flex items-center justify-between
                            px-3 py-1.5 text-sm
                            text-muted-foreground/50 cursor-not-allowed
                            rounded-md
                          ">
                            <span>{item.label}</span>
                            {item.count && (
                              <span className="text-xs bg-muted/50 text-muted-foreground/50 px-2 py-0.5 rounded-full">
                                {item.count}
                              </span>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className="
                              flex items-center justify-between
                              px-3 py-1.5 text-sm
                              text-muted-foreground hover:text-foreground
                              hover:bg-accent rounded-md
                              transition-colors duration-200
                            "
                          >
                            <span>{item.label}</span>
                            {item.count && (
                              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                {item.count}
                              </span>
                            )}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="text-sm font-medium text-foreground mb-2">Content Stats</h3>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Total Monsters:</span>
              <span>167</span>
            </div>
            <div className="flex justify-between">
              <span>Rulebook Sections:</span>
              <span>118</span>
            </div>
            <div className="flex justify-between">
              <span>Journal Entries:</span>
              <span>175</span>
            </div>
            <div className="flex justify-between">
              <span>Total Content:</span>
              <span>499</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
} 