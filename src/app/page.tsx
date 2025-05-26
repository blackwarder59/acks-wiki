import { Sword, Shield, Scroll, BookOpen, Crown, Hammer } from 'lucide-react'
import Link from 'next/link'

/**
 * ACKS II Wiki Homepage
 * 
 * Features:
 * - Welcome message and overview
 * - Quick access cards to main content categories
 * - Recent updates and popular content
 * - Mobile-responsive grid layout
 * - Call-to-action for getting started
 */
export default function HomePage() {
  const contentCategories = [
    {
      title: 'Monsters',
      description: '292 creatures from the Auran Empire and beyond',
      icon: <Sword className="h-8 w-8" />,
      href: '/monsters',
      count: '292 entries',
      color: 'text-red-600 dark:text-red-400'
    },
    {
      title: 'Spells',
      description: 'Arcane and divine magic for all character levels',
      icon: <Scroll className="h-8 w-8" />,
      href: '/spells',
      count: '300+ spells',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Classes',
      description: 'Character classes and templates for every playstyle',
      icon: <Shield className="h-8 w-8" />,
      href: '/classes',
      count: '20+ classes',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Equipment',
      description: 'Weapons, armor, and gear for adventurers',
      icon: <Hammer className="h-8 w-8" />,
      href: '/equipment',
      count: 'Complete catalog',
      color: 'text-amber-600 dark:text-amber-400'
    },
    {
      title: 'Rules',
      description: 'Core mechanics and campaign guidelines',
      icon: <BookOpen className="h-8 w-8" />,
      href: '/rules',
      count: 'Full rulebook',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Judge Tools',
      description: 'Resources for game masters and judges',
      icon: <Crown className="h-8 w-8" />,
      href: '/judge-tools',
      count: 'GM resources',
      color: 'text-indigo-600 dark:text-indigo-400'
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          Welcome to the <span className="text-primary">ACKS II</span> Wiki
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Your comprehensive guide to the Adventurer Conqueror King System II. 
          Explore monsters, spells, classes, and rules for epic fantasy campaigns 
          in the declining Auran Empire.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/monsters"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Sword className="h-5 w-5 mr-2" />
            Browse Monsters
          </Link>
          <Link
            href="/rules/character-creation"
            className="inline-flex items-center px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors font-medium"
          >
            <Shield className="h-5 w-5 mr-2" />
            Create Character
          </Link>
        </div>
      </div>

      {/* Content Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {contentCategories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group block p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-primary/50"
          >
            <div className="flex items-start space-x-4">
              <div className={`${category.color} group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {category.description}
                </p>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-muted rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Content Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">292</div>
            <div className="text-sm text-muted-foreground">Monsters</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">300+</div>
            <div className="text-sm text-muted-foreground">Spells</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">20+</div>
            <div className="text-sm text-muted-foreground">Classes</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">620+</div>
            <div className="text-sm text-muted-foreground">Total Pages</div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          New to ACKS II?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Start your journey in the world of sword and sorcery. Learn the basics 
          of character creation, explore the setting, and discover what makes 
          ACKS II unique among fantasy RPGs.
        </p>
        <Link
          href="/rules/getting-started"
          className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
        >
          <BookOpen className="h-5 w-5 mr-2" />
          Getting Started Guide
        </Link>
      </div>
    </div>
  )
}
