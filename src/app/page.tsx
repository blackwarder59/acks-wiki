'use client'

import { Sword, Shield, Scroll, BookOpen, Crown, Hammer, Star, Users, Trophy, Zap, GraduationCap, Map, Compass } from 'lucide-react'
import Link from 'next/link'
import { EnhancedHero } from '@/components/ui/enhanced-hero'

/**
 * ACKS II Wiki Homepage - Hybrid Approach
 * 
 * Combines user journey navigation with immediate content access
 * Features stunning visuals with intuitive organization
 */

// User Journey Sections (How people approach the game)
const journeySections = [
  {
    title: 'Getting Started',
    description: 'New to ACKS II? Start your journey here',
    icon: <GraduationCap className="h-8 w-8" />,
    href: '#',
    pending: true,
    features: ['What is ACKS II?', 'Create First Character', 'Basic Rules', 'Sample Adventure'],
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
    priority: 'high'
  },
  {
    title: 'Player Resources',
    description: 'Everything players need for characters and adventures',
    icon: <Users className="h-8 w-8" />,
    href: '#',
    pending: true,
    features: ['Character Creation', 'Classes & Races', 'Spells & Equipment', 'Advancement'],
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
    priority: 'high'
  },
  {
    title: 'Judge Resources',
    description: 'Tools and content for Game Masters',
    icon: <Crown className="h-8 w-8" />,
    href: '#',
    pending: true,
    features: ['Monsters & Encounters', 'Campaign Tools', 'Rules Reference', 'Adventures'],
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30',
    priority: 'high'
  },
  {
    title: 'By Book',
    description: 'Browse content organized by source books',
    icon: <BookOpen className="h-8 w-8" />,
    href: '/by-book',
    pending: false,
    features: ['Core Rulebook', 'Monstrous Manual', 'Judge\'s Journal', 'Cross-References'],
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
    priority: 'medium'
  },
  {
    title: 'Advanced Play',
    description: 'High-level rules for domains, economics, and warfare',
    icon: <Zap className="h-8 w-8" />,
    href: '#',
    pending: true,
    features: ['Domain Management', 'Economic Systems', 'Mass Combat', 'Politics'],
    gradient: 'from-red-500 to-pink-600',
    bgGradient: 'from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30',
    priority: 'medium'
  }
]

// Content Categories (What people actually need to look up)
const contentCategories = [
  {
    title: 'Monsters',
    description: '167 creatures from the Auran Empire and beyond',
    icon: <Sword className="h-8 w-8" />,
    href: '/monsters',
    count: '167 entries',
    gradient: 'from-red-500 to-orange-600',
    bgGradient: 'from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30'
  },
  {
    title: 'Spells',
    description: 'Arcane and divine magic for all character levels',
    icon: <Scroll className="h-8 w-8" />,
    href: '/spells',
    count: '317 spells',
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30'
  },
  {
    title: 'Classes',
    description: 'Character classes and templates for every playstyle',
    icon: <Shield className="h-8 w-8" />,
    href: '/classes',
    count: '20+ classes',
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30'
  },
  {
    title: 'Equipment',
    description: 'Weapons, armor, and gear for adventurers',
    icon: <Hammer className="h-8 w-8" />,
    href: '/equipment',
    count: 'Complete catalog',
    gradient: 'from-amber-500 to-yellow-600',
    bgGradient: 'from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30'
  },
  {
    title: 'Rules',
    description: 'Core mechanics and campaign guidelines',
    icon: <BookOpen className="h-8 w-8" />,
    href: '/rules',
    count: 'Full rulebook',
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30'
  },
  {
    title: 'Judge Tools',
    description: 'Resources for game masters and judges',
    icon: <Crown className="h-8 w-8" />,
    href: '#',
    pending: true,
    count: 'GM resources',
    gradient: 'from-indigo-500 to-purple-600',
    bgGradient: 'from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section - New Design */}
      <EnhancedHero />

      {/* User Journey Navigation - Choose Your Path */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full mb-6">
            <Compass className="h-4 w-4" />
            Choose Your Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How Do You Want to Explore?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Different paths for different needs. Whether you're learning or looking up specific content, we've got you covered.
          </p>
        </div>

        {/* Priority sections (Getting Started, Player Resources, Judge Resources) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {journeySections.filter(section => section.priority === 'high').map((section) => (
            <div
              key={section.title}
              onClick={() => section.pending && alert(`🚧 ${section.title} section coming soon! This will include: ${section.features.join(', ')}`)}
              className={`group relative block ${section.pending ? 'cursor-pointer' : ''}`}
            >
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${section.bgGradient} p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20`}>
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${section.gradient} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {section.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {section.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {section.description}
                  </p>
                  
                  {/* Feature list */}
                  <ul className="space-y-2">
                    {section.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-1.5 h-1.5 bg-current rounded-full mr-3 opacity-60" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-slate-600 dark:text-slate-400">
                    {section.pending ? 'Coming Soon →' : 'Explore →'}
                  </div>
                </div>
                {section.pending && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                    SOON
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Secondary sections in a compact row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {journeySections.filter(section => section.priority === 'medium').map((section) => (
            section.pending ? (
              <div
                key={section.title}
                onClick={() => alert(`🚧 ${section.title} section coming soon! This will include: ${section.features.join(', ')}`)}
                className="group relative block cursor-pointer"
              >
                <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${section.bgGradient} p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102 border border-white/20`}>
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${section.gradient} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white scale-75">
                        {section.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        {section.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-slate-600 dark:text-slate-400">
                      SOON
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                    SOON
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={section.title}
                href={section.href}
                className="group relative block"
              >
                <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${section.bgGradient} p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102 border border-white/20`}>
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${section.gradient} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white scale-75">
                        {section.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        {section.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-slate-600 dark:text-slate-400">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            )
          ))}
        </div>
      </div>

      {/* Content Categories - Quick Access */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium rounded-full mb-6">
              <Map className="h-4 w-4" />
              Quick Access
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Jump Straight to Content
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Need something specific? Access all ACKS II content directly organized by type.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {contentCategories.map((category) => (
              category.pending ? (
                <div
                  key={category.title}
                  onClick={() => alert(`🚧 ${category.title} section coming soon! We're working on bringing you ${category.count.toLowerCase()}.`)}
                  className="group relative block cursor-pointer"
                >
                  <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${category.bgGradient} p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/20 text-center`}>
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${category.gradient} shadow-md mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                      <div className="text-white scale-75">
                        {category.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                        {category.title}
                      </h3>
                      
                      {/* Count badge */}
                      <div className={`inline-block px-2 py-1 bg-gradient-to-r ${category.gradient} text-white text-xs font-medium rounded-full shadow-sm`}>
                        {category.count}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                      SOON
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group relative block"
                >
                  <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${category.bgGradient} p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/20 text-center`}>
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${category.gradient} shadow-md mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                      <div className="text-white scale-75">
                        {category.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                        {category.title}
                      </h3>
                      
                      {/* Count badge */}
                      <div className={`inline-block px-2 py-1 bg-gradient-to-r ${category.gradient} text-white text-xs font-medium rounded-full shadow-sm`}>
                        {category.count}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Getting Started CTA */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full mb-6">
          <Users className="h-4 w-4" />
          New Player Friendly
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
          Ready to Begin Your Adventure?
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Whether you're a complete newcomer or a seasoned adventurer, we'll help you master 
          the Adventurer Conqueror King System II and build epic campaigns.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => alert('🚧 Complete Beginner\'s Guide coming soon! This will be a comprehensive introduction to ACKS II for new players.')}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 relative"
          >
            <BookOpen className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
            Complete Beginner's Guide
            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">SOON</div>
          </button>
          <Link
            href="/search"
            className="group inline-flex items-center px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-500 transform hover:scale-105 transition-all duration-200"
          >
            <Zap className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
            Search Everything
            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
