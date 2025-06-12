/**
 * Enhanced Hero Section Component - ACKS II Wiki
 * 
 * Features:
 * - Gradient background using design token system
 * - Floating decorative elements with CSS animations
 * - Dual-path user journey CTAs for different user types
 * - Responsive design with mobile-first approach
 * - Accessibility-compliant with proper ARIA labels
 * - Performance-optimized CSS-only animations
 * - Full integration with color palette switching system
 */

'use client'

import { GraduationCap, Sword, Shield, Scroll, Crown, BookOpen, Star, Zap } from 'lucide-react'
import Link from 'next/link'

/**
 * Props for the Enhanced Hero Section
 */
export interface EnhancedHeroProps {
  className?: string;
}

/**
 * Enhanced Hero Section Component
 * 
 * This component creates a visually stunning hero section that serves as the centerpiece
 * of the homepage, providing clear user journey paths and compelling visual elements.
 */
export function EnhancedHero({ className = '' }: EnhancedHeroProps) {
  return (
    <section 
      className={`hero-enhanced relative min-h-[80vh] flex items-center overflow-hidden ${className}`}
      aria-label="Hero section with navigation paths"
    >
      {/* Gradient Background using Design Tokens */}
      <div className="hero-background absolute inset-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-hero" />
        
        {/* Secondary overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10" />
        
        {/* Radial gradient for center focus */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.1)_70%)]" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="floating-decorations absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Sword - Top Left */}
        <div className="floating-element floating-element-1 absolute top-20 left-16 text-white/20">
          <Sword size={48} className="transform rotate-45" />
        </div>
        
        {/* Shield - Top Right */}
        <div className="floating-element floating-element-2 absolute top-32 right-20 text-white/15">
          <Shield size={40} className="transform -rotate-12" />
        </div>
        
        {/* Scroll - Middle Left */}
        <div className="floating-element floating-element-3 absolute top-1/2 left-8 text-white/25">
          <Scroll size={36} className="transform rotate-12" />
        </div>
        
        {/* Crown - Bottom Right */}
        <div className="floating-element floating-element-4 absolute bottom-20 right-16 text-white/20">
          <Crown size={44} className="transform -rotate-6" />
        </div>
        
        {/* Book - Bottom Left */}
        <div className="floating-element floating-element-5 absolute bottom-32 left-20 text-white/15">
          <BookOpen size={38} className="transform rotate-6" />
        </div>
        
        {/* Additional decorative circles */}
        <div className="absolute top-16 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl floating-element floating-element-6" />
        <div className="absolute bottom-24 left-1/3 w-32 h-32 bg-white/5 rounded-full blur-2xl floating-element floating-element-7" />
      </div>

      {/* Main Hero Content */}
      <div className="hero-content relative z-10 w-full max-w-7xl mx-auto px-4 py-16 text-center">
        {/* Badge/Tag Line */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-8 border border-white/20">
          <Star className="h-4 w-4" />
          From Adventurer to Conqueror to King
        </div>
        
        {/* Main Headline */}
        <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-lg">
          <span className="block mb-2">Master the</span>
          <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent drop-shadow-none">
            Adventurous Domains
          </span>
        </h1>
        
        {/* Subheading */}
        <p className="hero-subheading text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12 drop-shadow-md">
          Your complete ACKS II reference guide for epic adventures, strategic conquests, and legendary rule.
          Whether you're new to the system or a seasoned veteran, find exactly what you need.
        </p>

        {/* Dual-Path User Journey CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          {/* New Player Path */}
          <button
            onClick={() => alert('🚧 Getting Started guide coming soon! This comprehensive guide will help new players learn ACKS II from the ground up.')}
            className="hero-cta hero-cta-primary group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 hover:translate-y-[-2px] transition-all duration-300 border border-white/20 backdrop-blur-sm relative"
            aria-label="Start your ACKS II journey - for new players (coming soon)"
          >
            <GraduationCap className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-lg">New to ACKS II?</span>
            <div className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">SOON</div>
          </button>
          
          {/* Experienced Player Path */}
          <Link
            href="/monsters"
            className="hero-cta hero-cta-secondary group inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 hover:translate-y-[-2px] transition-all duration-300 border border-white/20 backdrop-blur-sm"
            aria-label="Jump to content - for experienced players"
          >
            <Zap className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-lg">Find Content Fast</span>
            <div className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</div>
          </Link>
        </div>

        {/* Quick Stats Dashboard */}
        <div className="hero-stats grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { number: '167', label: 'Monsters', icon: Sword, color: 'text-red-300' },
            { number: '317', label: 'Spells', icon: Scroll, color: 'text-purple-300' },
            { number: '20+', label: 'Classes', icon: Shield, color: 'text-blue-300' },
            { number: '620+', label: 'Total Pages', icon: BookOpen, color: 'text-green-300' },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="hero-stat text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg mb-3 border border-white/20 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-white drop-shadow-md">{stat.number}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Visual Flow Indicator */}
        <div className="hero-flow-indicator mt-12 animate-bounce" aria-hidden="true">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto relative">
            <div className="w-1 h-3 bg-white/70 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* CSS Animations for Floating Elements */}
      <style jsx>{`
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-element-1 { animation-delay: 0s; }
        .floating-element-2 { animation-delay: 1s; }
        .floating-element-3 { animation-delay: 2s; }
        .floating-element-4 { animation-delay: 3s; }
        .floating-element-5 { animation-delay: 4s; }
        .floating-element-6 { animation-delay: 0.5s; }
        .floating-element-7 { animation-delay: 2.5s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }
        
        .hero-stat {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .floating-element {
            display: none;
          }
          
          .hero-headline {
            font-size: 2.5rem;
            line-height: 1.1;
          }
          
          .hero-subheading {
            font-size: 1.125rem;
          }
        }
        
        @media (max-width: 768px) {
          .floating-decorations .floating-element {
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  )
}

export default EnhancedHero 