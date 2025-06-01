/**
 * Individual Spell Detail Page
 * 
 * This page displays detailed information about a specific spell
 * using the spell data from real-spells.json
 */

import { notFound } from 'next/navigation';
import { ArrowLeft, Sparkles, Clock, Target, Zap, Book } from 'lucide-react';
import Link from 'next/link';
import realSpells from '@/data/real-spells.json';

interface SpellPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SpellPage({ params }: SpellPageProps) {
  const { id } = await params;
  
  // Find the spell by ID
  const spell = realSpells.find(s => s.id === id);
  
  if (!spell) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <Link 
          href="/spells" 
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Spells
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {spell.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  spell.magicType === 'Arcane' 
                    ? 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30'
                    : 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30'
                }`}>
                  {spell.magicType}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium text-primary bg-primary/10">
                  Level {spell.level}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium text-muted-foreground bg-muted">
                  {spell.spellType}
                </span>
              </div>
            </div>
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Spell Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-2">
              <Target className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="font-semibold text-card-foreground">Range</h3>
            </div>
            <p className="text-sm text-muted-foreground">{spell.range}</p>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="font-semibold text-card-foreground">Duration</h3>
            </div>
            <p className="text-sm text-muted-foreground">{spell.duration}</p>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-2">
              <Zap className="w-5 h-5 text-yellow-500 mr-2" />
              <h3 className="font-semibold text-card-foreground">Magic Type</h3>
            </div>
            <p className="text-sm text-muted-foreground">{spell.magicType}</p>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-2">
              <Book className="w-5 h-5 text-purple-500 mr-2" />
              <h3 className="font-semibold text-card-foreground">Spell Type</h3>
            </div>
            <p className="text-sm text-muted-foreground">{spell.spellType}</p>
          </div>
        </div>

        {/* Description */}
        {spell.description && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Description</h2>
            <div className="p-6 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground leading-relaxed">
                {spell.description}
              </p>
            </div>
          </div>
        )}

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-lg font-semibold text-card-foreground mb-3">Spell Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Level:</span>
                <span className="font-medium">{spell.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Magic Type:</span>
                <span className="font-medium">{spell.magicType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Spell Type:</span>
                <span className="font-medium">{spell.spellType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Range:</span>
                <span className="font-medium">{spell.range}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{spell.duration}</span>
              </div>
            </div>
          </div>

          {/* Similar Spells */}
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-lg font-semibold text-card-foreground mb-3">Similar Spells</h3>
            <div className="space-y-2">
              {realSpells
                .filter(s => s.id !== spell.id && (s.level === spell.level || s.magicType === spell.magicType))
                .slice(0, 5)
                .map(similarSpell => (
                  <Link
                    key={similarSpell.id}
                    href={`/spells/${similarSpell.id}`}
                    className="block p-2 rounded-md hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground hover:text-primary">
                        {similarSpell.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Level {similarSpell.level}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/spells"
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Browse All Spells
          </Link>
          
          <Link
            href={`/spells?level=${spell.level}`}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
          >
            View Level {spell.level} Spells
          </Link>
        </div>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: SpellPageProps) {
  const { id } = await params;
  const spell = realSpells.find(s => s.id === id);
  
  if (!spell) {
    return {
      title: 'Spell Not Found',
    };
  }

  return {
    title: `${spell.name} - ACKS II Spells`,
    description: spell.description || `Level ${spell.level} ${spell.magicType} spell - ${spell.spellType}`,
  };
} 