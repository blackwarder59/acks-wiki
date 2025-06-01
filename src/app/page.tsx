import { Sword, Shield, Scroll, BookOpen, Crown, Hammer, Star, Users, Trophy, Zap, GraduationCap, Map, Compass } from 'lucide-react'
import Link from 'next/link'

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
    href: '/getting-started',
    features: ['What is ACKS II?', 'Create First Character', 'Basic Rules', 'Sample Adventure'],
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
    priority: 'high'
  },
  {
    title: 'Player Resources',
    description: 'Everything players need for characters and adventures',
    icon: <Users className="h-8 w-8" />,
    href: '/player-resources',
    features: ['Character Creation', 'Classes & Races', 'Spells & Equipment', 'Advancement'],
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
    priority: 'high'
  },
  {
    title: 'Judge Resources',
    description: 'Tools and content for Game Masters',
    icon: <Crown className="h-8 w-8" />,
    href: '/judge-resources',
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
    features: ['Core Rulebook', 'Monstrous Manual', 'Judge\'s Journal', 'Cross-References'],
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
    priority: 'medium'
  },
  {
    title: 'Advanced Play',
    description: 'High-level rules for domains, economics, and warfare',
    icon: <Zap className="h-8 w-8" />,
    href: '/advanced-play',
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
    description: '292 creatures from the Auran Empire and beyond',
    icon: <Sword className="h-8 w-8" />,
    href: '/monsters',
    count: '292 entries',
    gradient: 'from-red-500 to-orange-600',
    bgGradient: 'from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30'
  },
  {
    title: 'Spells',
    description: 'Arcane and divine magic for all character levels',
    icon: <Scroll className="h-8 w-8" />,
    href: '/spells',
    count: '300+ spells',
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
    href: '/judge-tools',
    count: 'GM resources',
    gradient: 'from-indigo-500 to-purple-600',
    bgGradient: 'from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
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

            {/* Dual-purpose CTA buttons */}
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
                href="/monsters"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Sword className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                Explore Monsters
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

            {/* Quick stats with visual appeal */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { number: '292', label: 'Monsters', icon: Sword },
                { number: '300+', label: 'Spells', icon: Scroll },
                { number: '20+', label: 'Classes', icon: Shield },
                { number: '620+', label: 'Total Pages', icon: BookOpen },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-800 rounded-lg shadow-md mb-3">
                    <stat.icon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.number}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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

        {/* Secondary sections in a compact row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {journeySections.filter(section => section.priority === 'medium').map((section) => (
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
          <Link
            href="/getting-started"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <BookOpen className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
            Complete Beginner's Guide
            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
          </Link>
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
