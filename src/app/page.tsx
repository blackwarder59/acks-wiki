import { Sword, Shield, Scroll, BookOpen, Crown, Hammer, Star, Users, Trophy, Zap } from 'lucide-react'
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
export default function HomePage() {
  const contentCategories = [
    {
      title: 'Monsters',
      description: '292 creatures from the Auran Empire and beyond',
      icon: <Sword className="h-8 w-8" />,
      href: '/monsters',
      count: '292 entries',
      gradient: 'from-red-500 to-orange-600',
      bgGradient: 'from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    {
      title: 'Spells',
      description: 'Arcane and divine magic for all character levels',
      icon: <Scroll className="h-8 w-8" />,
      href: '/spells',
      count: '300+ spells',
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Classes',
      description: 'Character classes and templates for every playstyle',
      icon: <Shield className="h-8 w-8" />,
      href: '/classes',
      count: '20+ classes',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Equipment',
      description: 'Weapons, armor, and gear for adventurers',
      icon: <Hammer className="h-8 w-8" />,
      href: '/equipment',
      count: 'Complete catalog',
      gradient: 'from-amber-500 to-yellow-600',
      bgGradient: 'from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30',
      iconColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      title: 'Rules',
      description: 'Core mechanics and campaign guidelines',
      icon: <BookOpen className="h-8 w-8" />,
      href: '/rules',
      count: 'Full rulebook',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Judge Tools',
      description: 'Resources for game masters and judges',
      icon: <Crown className="h-8 w-8" />,
      href: '/judge-tools',
      count: 'GM resources',
      gradient: 'from-indigo-500 to-purple-600',
      bgGradient: 'from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400'
    },
  ]

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
            {/* Main heading with enhanced typography */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-medium rounded-full mb-6">
                <Star className="h-4 w-4" />
                The Complete ACKS II Reference
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                <span className="block text-slate-900 dark:text-white">Welcome to the</span>
                <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  ACKS II Wiki
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Your complete companion to the <strong>Adventurer Conqueror King System II</strong>. 
                Explore 292 monsters, 300+ spells, and comprehensive rules for epic fantasy campaigns.
              </p>
            </div>

            {/* Enhanced action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/monsters"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Sword className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                Explore Monsters
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
              </Link>
              <Link
                href="/rules/character-creation"
                className="group inline-flex items-center px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-500 transform hover:scale-105 transition-all duration-200"
              >
                <Shield className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                Create Character
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

      {/* Enhanced Content Categories */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Explore the Archive
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Dive deep into the world of ACKS II with our comprehensive collection of rules, creatures, and lore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contentCategories.map((category, index) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative block"
            >
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.bgGradient} p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20`}>
                {/* Decorative gradient overlay */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.gradient} opacity-10 rounded-full blur-xl transform translate-x-8 -translate-y-8`} />
                
                {/* Icon with enhanced styling */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {category.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-slate-900 group-hover:to-slate-600 dark:group-hover:from-white dark:group-hover:to-slate-300 transition-all duration-300">
                    {category.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Count badge */}
                  <div className="inline-flex items-center gap-2">
                    <span className={`px-3 py-1 bg-gradient-to-r ${category.gradient} text-white text-sm font-medium rounded-full shadow-sm`}>
                      {category.count}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-slate-600 dark:text-slate-400">
                      →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Enhanced Getting Started Section */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full mb-6">
            <Users className="h-4 w-4" />
            New Player Friendly
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            New to ACKS II?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Start your journey in the world of sword and sorcery. Learn the basics of character creation, 
            explore the setting, and discover what makes ACKS II unique among fantasy RPGs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rules/getting-started"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <BookOpen className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
              Getting Started Guide
              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            </Link>
            <Link
              href="/rules/quick-reference"
              className="group inline-flex items-center px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-500 transform hover:scale-105 transition-all duration-200"
            >
              <Zap className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
              Quick Reference
              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
