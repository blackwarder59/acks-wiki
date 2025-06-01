import { Sword, Shield, Scroll, BookOpen, Crown, Hammer, Star, Users, Trophy, Zap, GraduationCap } from 'lucide-react'
import Link from 'next/link'

/**
 * Enhanced ACKS II Wiki Homepage
 * 
 * Features:
 * - Stunning hero section with gradients
 * - Visually appealing cards with depth
 * - Better visual hierarchy and spacing
 * - Intuitive navigation patterns
 * - Book-inspired design elements
 */
const navigationSections = [
  {
    title: 'Getting Started',
    description: 'New to ACKS II? Start your journey here',
    icon: <GraduationCap className="h-8 w-8" />,
    href: '/getting-started',
    features: ['What is ACKS II?', 'Create First Character', 'Basic Rules', 'Sample Adventure'],
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
    iconColor: 'text-green-600 dark:text-green-400'
  },
  {
    title: 'Player Resources',
    description: 'Everything players need for characters and adventures',
    icon: <Users className="h-8 w-8" />,
    href: '/player-resources',
    features: ['Character Creation', 'Classes & Races', 'Spells & Equipment', 'Advancement'],
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    title: 'Judge Resources',
    description: 'Tools and content for Game Masters',
    icon: <Crown className="h-8 w-8" />,
    href: '/judge-resources',
    features: ['Monsters & Encounters', 'Campaign Tools', 'Rules Reference', 'Adventures'],
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30',
    iconColor: 'text-purple-600 dark:text-purple-400'
  },
  {
    title: 'By Book',
    description: 'Browse content organized by source books',
    icon: <BookOpen className="h-8 w-8" />,
    href: '/by-book',
    features: ['Core Rulebook', 'Monstrous Manual', 'Judge\'s Journal', 'Cross-References'],
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
    iconColor: 'text-amber-600 dark:text-amber-400'
  },
  {
    title: 'Advanced Play',
    description: 'High-level rules for domains, economics, and warfare',
    icon: <Zap className="h-8 w-8" />,
    href: '/advanced-play',
    features: ['Domain Management', 'Economic Systems', 'Mass Combat', 'Politics'],
    gradient: 'from-red-500 to-pink-600',
    bgGradient: 'from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30',
    iconColor: 'text-red-600 dark:text-red-400'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced with journey messaging */}
      <div className="relative overflow-hidden">
        {/* Background with multiple gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-amber-50/50 to-orange-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-orange-300/20 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-blue-300/20 rounded-full blur-xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-medium rounded-full mb-6">
              <Star className="h-4 w-4" />
              From Adventurer to Conqueror to King
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="block text-slate-900 dark:text-white">Master the</span>
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                ACKS II System
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Whether you're creating your first character or ruling vast domains, 
              find exactly what you need with our comprehensive ACKS II reference.
            </p>

            {/* Journey-based CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/getting-started"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <GraduationCap className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                I'm New to ACKS II
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
              </Link>
              <Link
                href="/player-resources"
                className="group inline-flex items-center px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-500 transform hover:scale-105 transition-all duration-200"
              >
                <Users className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                I'm Ready to Play
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Sections */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Choose Your Path
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Every journey begins with a single step. Where will yours start?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {navigationSections.map((section, index) => (
            <Link
              key={section.title}
              href={section.href}
              className="group relative block"
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
                    Explore →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
