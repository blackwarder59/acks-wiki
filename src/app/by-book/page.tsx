/**
 * ACKS II By Book Navigation Page
 * 
 * Organizes all content by source publication for easy reference
 * and traditional RPG book-based navigation.
 */

import { BookOpen, Sword, Shield, Crown, Scroll, Users, Hammer, Star, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

/**
 * Book definitions with their sections and content organization
 */
const acksBooks = [
  {
    id: 'core-rulebook',
    title: 'ACKS II Core Rulebook',
    subtitle: 'The Complete Player and Judge Reference',
    description: 'Everything you need to play ACKS II, from character creation to campaign management.',
    cover: '/images/acks-core-cover.jpg', // We'll add this later
    gradient: 'from-blue-600 to-indigo-700',
    bgGradient: 'from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50',
    sections: [
      {
        title: 'Character Creation',
        description: 'Classes, races, backgrounds, and abilities',
        href: '/rules/character-creation',
        icon: <Users className="h-5 w-5" />,
        count: '20+ Classes'
      },
      {
        title: 'Core Rules',
        description: 'Basic mechanics, combat, and core systems',
        href: '/rules/core-mechanics',
        icon: <Shield className="h-5 w-5" />,
        count: 'Complete System'
      },
      {
        title: 'Equipment & Magic',
        description: 'Weapons, armor, spells, and magical items',
        href: '/equipment',
        icon: <Hammer className="h-5 w-5" />,
        count: '300+ Items'
      },
      {
        title: 'Spells',
        description: 'Arcane and divine magic for all levels',
        href: '/spells',
        icon: <Scroll className="h-5 w-5" />,
        count: '317 Spells'
      },
      {
        title: 'Campaign Rules',
        description: 'Domain management, economics, and mass combat',
        href: '/rules/campaign',
        icon: <Crown className="h-5 w-5" />,
        count: 'Advanced Play'
      }
    ],
    stats: {
      pages: '400+',
      lastUpdated: 'v144 - Ready for Layout',
      version: '2.0'
    }
  },
  {
    id: 'monstrous-manual',
    title: 'ACKS II Monstrous Manual',
    subtitle: 'Creatures of the Auran Empire and Beyond',
    description: 'A comprehensive bestiary featuring monsters from across the known world and beyond.',
    cover: '/images/acks-monsters-cover.jpg',
    gradient: 'from-red-600 to-orange-700',
    bgGradient: 'from-red-50 to-orange-100 dark:from-red-950/50 dark:to-orange-950/50',
    sections: [
      {
        title: 'Monster Listings A-M',
        description: 'Creatures from Aboleth to Minotaur',
        href: '/monsters?filter=a-m',
        icon: <Sword className="h-5 w-5" />,
        count: '80+ Monsters'
      },
      {
        title: 'Monster Listings N-Z',
        description: 'Creatures from Naga to Zombie',
        href: '/monsters?filter=n-z',
        icon: <Sword className="h-5 w-5" />,
        count: '87+ Monsters'
      },
      {
        title: 'Monster Creation',
        description: 'Guidelines for creating custom monsters',
        href: '/rules/monster-creation',
        icon: <Star className="h-5 w-5" />,
        count: 'GM Tools'
      },
      {
        title: 'Encounter Tables',
        description: 'Random encounters by terrain and region',
        href: '/rules/encounters',
        icon: <Shield className="h-5 w-5" />,
        count: 'All Terrains'
      }
    ],
    stats: {
      pages: '200+',
      lastUpdated: 'v46 - Parts I, II, III',
      version: '2.0'
    }
  },
  {
    id: 'judges-journal',
    title: 'ACKS II Judge\'s Journal',
    subtitle: 'Advanced Rules and Campaign Resources',
    description: 'Expanded rules, optional systems, and comprehensive campaign management tools.',
    cover: '/images/acks-journal-cover.jpg',
    gradient: 'from-purple-600 to-violet-700',
    bgGradient: 'from-purple-50 to-violet-100 dark:from-purple-950/50 dark:to-violet-950/50',
    sections: [
      {
        title: 'Advanced Classes',
        description: 'Specialized character classes and templates',
        href: '/classes?source=judges-journal',
        icon: <Users className="h-5 w-5" />,
        count: '15+ Classes'
      },
      {
        title: 'Campaign Management',
        description: 'Tools for running long-term campaigns',
        href: '/rules/campaign-management',
        icon: <Crown className="h-5 w-5" />,
        count: 'GM Resources'
      },
      {
        title: 'Optional Rules',
        description: 'Alternative systems and house rules',
        href: '/rules/optional',
        icon: <Star className="h-5 w-5" />,
        count: 'Variant Systems'
      },
      {
        title: 'Adventures',
        description: 'Ready-to-play scenarios and campaigns',
        href: '/adventures',
        icon: <BookOpen className="h-5 w-5" />,
        count: 'Multiple Adventures'
      }
    ],
    stats: {
      pages: '150+',
      lastUpdated: 'v57 - Ready for Layout',
      version: '2.0'
    }
  }
]

export default function ByBookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6 border border-white/20">
            <BookOpen className="h-4 w-4" />
            Navigate by Source Book
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            ACKS II Complete Library
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Explore content organized by source publication. Perfect for traditional RPG reference 
            and understanding how different rules and content relate within each book.
          </p>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-12">
          {acksBooks.map((book, bookIndex) => (
            <div key={book.id} className="group">
              {/* Book Header */}
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${book.bgGradient} p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 mb-6`}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  {/* Book Info */}
                  <div className="flex-1">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${book.gradient} text-white text-sm font-medium rounded-full mb-4 shadow-sm`}>
                      <BookOpen className="h-4 w-4" />
                      Book {bookIndex + 1} of 3
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                      {book.title}
                    </h2>
                    
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-3">
                      {book.subtitle}
                    </p>
                    
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {book.description}
                    </p>
                    
                    {/* Book Stats */}
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>{book.stats.pages} pages</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span>Version {book.stats.version}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span>{book.stats.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Book Cover Placeholder */}
                  <div className={`flex-shrink-0 w-24 h-32 bg-gradient-to-br ${book.gradient} rounded-lg shadow-lg flex items-center justify-center`}>
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Book Sections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {book.sections.map((section, sectionIndex) => (
                  <Link
                    key={sectionIndex}
                    href={section.href}
                    className="group/section relative block"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-slate-200 dark:border-slate-700">
                      {/* Section Icon */}
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${book.gradient} shadow-md mb-4 group-hover/section:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {section.icon}
                        </div>
                      </div>

                      {/* Section Content */}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {section.title}
                      </h3>
                      
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                        {section.description}
                      </p>
                      
                      {/* Content Count */}
                      <div className={`inline-block px-2 py-1 bg-gradient-to-r ${book.gradient} text-white text-xs font-medium rounded-full shadow-sm mb-3`}>
                        {section.count}
                      </div>
                      
                      {/* Arrow Indicator */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          Explore
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover/section:text-slate-600 dark:group-hover/section:text-slate-300 group-hover/section:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Navigation Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium rounded-full mb-6">
            <Star className="h-4 w-4" />
            Quick Navigation
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Jump to Specific Content
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { title: 'All Monsters', href: '/monsters', icon: <Sword className="h-4 w-4" /> },
              { title: 'All Spells', href: '/spells', icon: <Scroll className="h-4 w-4" /> },
              { title: 'All Classes', href: '/classes', icon: <Users className="h-4 w-4" /> },
              { title: 'All Equipment', href: '/equipment', icon: <Hammer className="h-4 w-4" /> },
              { title: 'All Rules', href: '/rules', icon: <BookOpen className="h-4 w-4" /> }
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 border border-slate-200 dark:border-slate-700"
              >
                {link.icon}
                <span className="text-sm font-medium">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 