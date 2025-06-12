/**
 * Individual Monster Detail Page
 * 
 * This page displays detailed information about a specific monster
 * using the actual converted monster data and the MarkdownHtmlDisplay component.
 */

import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import allMonsters from '@/data/all-monsters.json';
import { MarkdownHtmlDisplay } from '@/components/content/markdown-html-display';
import { promises as fs } from 'fs';
import path from 'path';

interface MonsterPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Server-side function to load converted monster data
 * This runs only on the server and won't be bundled for the client
 */
async function loadConvertedMonster(id: string) {
  try {
    const convertedPath = path.join(process.cwd(), 'converted', 'individual-monsters', `${id}.json`);
    
    // Check if file exists and read it
    try {
      await fs.access(convertedPath);
      const convertedData = await fs.readFile(convertedPath, 'utf8');
      return JSON.parse(convertedData);
    } catch {
      // File doesn't exist or can't be read
      return null;
    }
  } catch (error) {
    console.warn(`Could not load converted monster file for ${id}:`, error);
    return null;
  }
}

export default async function MonsterPage({ params }: MonsterPageProps) {
  // Await params in Next.js 15
  const { id } = await params;
  
  // Find the monster by ID in the main list
  const monster = allMonsters.find(m => m.id === id);
  
  if (!monster) {
    notFound();
  }

  // Load the richer converted monster file using server-side function
  const convertedMonster = await loadConvertedMonster(id);

  // Use the converted content if available, otherwise fall back to all-monsters.json
  const markdownContent = convertedMonster ? {
    html: convertedMonster.html,
    sections: [
      {
        title: 'Full Entry',
        level: 1,
        html: convertedMonster.html
      }
    ],
    metadata: {
      name: monster.name,
      stats: {
        type: monster.stats.type,
        size: monster.stats.size,
        speed: monster.stats.speed,
        armorClass: monster.stats.armorClass?.toString(),
        hitDice: monster.stats.hitDice,
        attacks: monster.stats.attacks,
        damage: monster.stats.damage,
        save: monster.stats.save,
        morale: monster.stats.morale,
        vision: monster.stats.vision,
        otherSenses: monster.stats.otherSenses,
        proficiencies: monster.stats.proficiencies,
        normalLoad: monster.stats.normalLoad
      },
      encounterInfo: {
        lair: monster.encounterInfo.lair,
        dungeonEnc: monster.encounterInfo.dungeonEnc,
        wildernessEnc: monster.encounterInfo.wildernessEnc,
        alignment: monster.encounterInfo.alignment,
        treasureType: monster.encounterInfo.treasureType,
        xp: monster.encounterInfo.xp
      }
    },
    rawMarkdown: convertedMonster.markdown || ''
  } : {
    // Fallback to the original format using all-monsters.json
    html: monster.description || '',
    sections: [
      {
        title: 'Description',
        level: 2,
        html: monster.description || 'No description available.'
      },
      {
        title: 'Combat',
        level: 2,
        html: monster.combat || 'No combat information available.'
      },
      {
        title: 'Ecology',
        level: 2,
        html: monster.ecology || 'No ecology information available.'
      },
      {
        title: 'Spoils',
        level: 2,
        html: monster.spoils || 'No spoils information available.'
      }
    ].filter(section => section.html !== 'No description available.' && section.html !== 'No combat information available.' && section.html !== 'No ecology information available.' && section.html !== 'No spoils information available.'),
    metadata: {
      name: monster.name,
      stats: {
        type: monster.stats.type,
        size: monster.stats.size,
        speed: monster.stats.speed,
        armorClass: monster.stats.armorClass?.toString(),
        hitDice: monster.stats.hitDice,
        attacks: monster.stats.attacks,
        damage: monster.stats.damage,
        save: monster.stats.save,
        morale: monster.stats.morale,
        vision: monster.stats.vision,
        otherSenses: monster.stats.otherSenses,
        proficiencies: monster.stats.proficiencies,
        normalLoad: monster.stats.normalLoad
      },
      encounterInfo: {
        lair: monster.encounterInfo.lair,
        dungeonEnc: monster.encounterInfo.dungeonEnc,
        wildernessEnc: monster.encounterInfo.wildernessEnc,
        alignment: monster.encounterInfo.alignment,
        treasureType: monster.encounterInfo.treasureType,
        xp: monster.encounterInfo.xp
      }
    },
    rawMarkdown: `# ${monster.name}\n\n${monster.description}\n\n## Combat\n\n${monster.combat}\n\n## Ecology\n\n${monster.ecology}\n\n## Spoils\n\n${monster.spoils}`
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Navigation */}
      <div className="mb-6">
        <Link 
          href="/monsters" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Monsters
        </Link>
      </div>

      {/* Monster Display */}
      <MarkdownHtmlDisplay 
        content={markdownContent}
        contentType="monster"
        className="mb-8"
      />

      {/* Additional Information */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Source File:</span>
            <span className="ml-2 text-muted-foreground">{monster.sourceFile}</span>
          </div>
          <div>
            <span className="font-medium">Category:</span>
            <span className="ml-2 text-muted-foreground">{monster.category}</span>
          </div>
          {monster.stats.otherSenses && (
            <div className="md:col-span-2">
              <span className="font-medium">Other Senses:</span>
              <span className="ml-2 text-muted-foreground">{monster.stats.otherSenses}</span>
            </div>
          )}
          {monster.stats.proficiencies && (
            <div className="md:col-span-2">
              <span className="font-medium">Proficiencies:</span>
              <span className="ml-2 text-muted-foreground">{monster.stats.proficiencies}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation to Related Monsters */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          <ExternalLink className="h-4 w-4 inline mr-1" />
          Explore more creatures in the <Link href="/monsters" className="text-primary hover:underline">Monster Compendium</Link>
        </div>
      </div>
    </div>
  );
}

// Generate static params for all monsters (optional - for static generation)
export async function generateStaticParams() {
  return allMonsters.map((monster) => ({
    id: monster.id,
  }));
}

// Metadata for SEO
export async function generateMetadata({ params }: MonsterPageProps) {
  const { id } = await params;
  const monster = allMonsters.find(m => m.id === id);
  
  if (!monster) {
    return {
      title: 'Monster Not Found - ACKS II Wiki',
      description: 'The requested monster could not be found.',
    };
  }

  return {
    title: `${monster.name} - ACKS II Wiki`,
    description: monster.description ? 
      monster.description.substring(0, 160) + (monster.description.length > 160 ? '...' : '') :
      `Details about ${monster.name} from the ACKS II monster compendium.`,
  };
} 