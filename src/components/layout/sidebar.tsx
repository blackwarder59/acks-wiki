'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, BookOpen, Sword, Shield, Scroll, Crown, Hammer } from 'lucide-react'

/**
 * Sidebar component for secondary navigation and quick access to content categories.
 * 
 * Features:
 * - Collapsible sections for different content types
 * - Quick links to popular content
 * - Mobile-responsive with slide-in behavior
 * - Accessible with proper ARIA labels
 * - Icons for visual hierarchy
 * - Smooth animations for expand/collapse
 */

interface SidebarSection {
  title: string
  icon: React.ReactNode
  items: { href: string; label: string; count?: number }[]
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
        { href: '/monsters/animals', label: 'Animals', count: 45 },
        { href: '/monsters/constructs', label: 'Constructs', count: 12 },
        { href: '/monsters/dragons', label: 'Dragons', count: 18 },
        { href: '/monsters/humanoids', label: 'Humanoids', count: 67 },
        { href: '/monsters/undead', label: 'Undead', count: 34 },
        { href: '/monsters/all', label: 'All Monsters', count: 292 },
      ]
    },
    {
      title: 'spells',
      icon: <Scroll className="h-4 w-4" />,
      items: [
        { href: '/spells/arcane', label: 'Arcane Spells' },
        { href: '/spells/divine', label: 'Divine Spells' },
        { href: '/spells/level-1', label: '1st Level' },
        { href: '/spells/level-2', label: '2nd Level' },
        { href: '/spells/level-3', label: '3rd Level' },
        { href: '/spells/all', label: 'All Spells', count: 300 },
      ]
    },
    {
      title: 'classes',
      icon: <Shield className="h-4 w-4" />,
      items: [
        { href: '/classes/fighter', label: 'Fighter' },
        { href: '/classes/explorer', label: 'Explorer' },
        { href: '/classes/thief', label: 'Thief' },
        { href: '/classes/mage', label: 'Mage' },
        { href: '/classes/crusader', label: 'Crusader' },
        { href: '/classes/venturer', label: 'Venturer' },
        { href: '/classes/all', label: 'All Classes', count: 20 },
      ]
    },
    {
      title: 'equipment',
      icon: <Hammer className="h-4 w-4" />,
      items: [
        { href: '/equipment/weapons', label: 'Weapons' },
        { href: '/equipment/armor', label: 'Armor' },
        { href: '/equipment/gear', label: 'Adventuring Gear' },
        { href: '/equipment/magic-items', label: 'Magic Items' },
        { href: '/equipment/all', label: 'All Equipment' },
      ]
    },
    {
      title: 'rules',
      icon: <BookOpen className="h-4 w-4" />,
      items: [
        { href: '/rules/character-creation', label: 'Character Creation' },
        { href: '/rules/combat', label: 'Combat' },
        { href: '/rules/magic', label: 'Magic' },
        { href: '/rules/campaigns', label: 'Campaigns' },
        { href: '/rules/domains', label: 'Domains' },
      ]
    },
    {
      title: 'judge-tools',
      icon: <Crown className="h-4 w-4" />,
      items: [
        { href: '/judge-tools/random-tables', label: 'Random Tables' },
        { href: '/judge-tools/treasure', label: 'Treasure Generation' },
        { href: '/judge-tools/npcs', label: 'NPC Generation' },
        { href: '/judge-tools/settlements', label: 'Settlements' },
        { href: '/judge-tools/wilderness', label: 'Wilderness' },
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
                      <Link
                        key={item.href}
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
              <span>292</span>
            </div>
            <div className="flex justify-between">
              <span>Total Spells:</span>
              <span>300+</span>
            </div>
            <div className="flex justify-between">
              <span>Character Classes:</span>
              <span>20+</span>
            </div>
            <div className="flex justify-between">
              <span>Total Pages:</span>
              <span>620+</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
} 