/**
 * Individual Class Detail Page
 * 
 * This page displays detailed information about a specific character class
 * using the class data and markdown files with the MarkdownHtmlDisplay component.
 */

import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Users, Shield, Heart, Zap, Book } from 'lucide-react';
import Link from 'next/link';
import allClasses from '@/data/all-classes.json';
import { MarkdownHtmlDisplay } from '@/components/content/markdown-html-display';
import { promises as fs } from 'fs';
import path from 'path';

interface ClassPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Server-side function to load class markdown content
 * This runs only on the server and won't be bundled for the client
 */
async function loadClassContent(sourceFile: string) {
  try {
    const classPath = path.join(process.cwd(), sourceFile);
    
    // Check if file exists and read it
    try {
      await fs.access(classPath);
      const classMarkdown = await fs.readFile(classPath, 'utf8');
      return {
        markdown: classMarkdown,
        html: classMarkdown // For now, we'll use the raw markdown content as HTML
      };
    } catch {
      // File doesn't exist or can't be read
      return {
        markdown: '',
        html: ''
      };
    }
  } catch (error) {
    console.warn(`Could not load class file ${sourceFile}:`, error);
    return {
      markdown: '',
      html: ''
    };
  }
}

export default async function ClassPage({ params }: ClassPageProps) {
  // Await params in Next.js 15
  const { id } = await params;
  
  // Find the class by ID in the main list
  const classData = allClasses.find(c => c.id === id);
  
  if (!classData) {
    notFound();
  }

  // Load the class markdown file using server-side function
  const classContent = await loadClassContent(classData.sourceFile);
  
  // Fallback content if file couldn't be loaded
  const fallbackHtml = `<h1>${classData.name}</h1><p>${classData.description}</p>`;
  const finalHtml = classContent.html || fallbackHtml;

  // Structure the content for MarkdownHtmlDisplay
  const markdownContent = {
    html: finalHtml,
    sections: [
      {
        title: 'Full Class Description',
        level: 1,
        html: finalHtml
      }
    ],
    metadata: {
      name: classData.name,
      category: classData.category,
      keyAttribute: classData.keyAttribute,
      requirements: classData.requirements,
      hitDice: classData.hitDice,
      maximumLevel: classData.maximumLevel,
      classPowers: classData.classPowers,
      combatProgression: classData.combatProgression,
      proficiencyProgression: classData.proficiencyProgression,
      templatesCount: classData.templatesCount
    },
    rawMarkdown: classContent.markdown
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Navigation */}
      <div className="mb-6">
        <Link 
          href="/classes" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Classes
        </Link>
      </div>

      {/* Quick Stats Card */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{classData.name}</h1>
            <p className="text-lg text-muted-foreground">{classData.description}</p>
          </div>
          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-2 rounded-full">
            {classData.category}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <div>
              <div className="font-medium">Key Attribute</div>
              <div className="text-muted-foreground">{classData.keyAttribute}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-red-500" />
            <div>
              <div className="font-medium">Hit Dice</div>
              <div className="text-muted-foreground">{classData.hitDice}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-blue-500" />
            <div>
              <div className="font-medium">Max Level</div>
              <div className="text-muted-foreground">{classData.maximumLevel}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-green-500" />
            <div>
              <div className="font-medium">Templates</div>
              <div className="text-muted-foreground">{classData.templatesCount}</div>
            </div>
          </div>
        </div>

        {classData.requirements && classData.requirements !== 'None' && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
            <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
              <ExternalLink className="h-4 w-4" />
              <span className="font-medium">Requirements:</span>
              <span>{classData.requirements}</span>
            </div>
          </div>
        )}
      </div>

      {/* Class Powers Summary */}
      {classData.classPowers && classData.classPowers.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
            Class Powers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {classData.classPowers.map((power, index) => (
              <div key={index} className="text-sm text-muted-foreground bg-background border border-border rounded px-3 py-2">
                {power}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Combat Progression */}
      {classData.combatProgression && (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-500" />
            Combat Progression
          </h3>
          <p className="text-sm text-muted-foreground">{classData.combatProgression}</p>
        </div>
      )}

      {/* Proficiency Progression */}
      {classData.proficiencyProgression && (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Book className="h-5 w-5 mr-2 text-purple-500" />
            Proficiency Progression
          </h3>
          <p className="text-sm text-muted-foreground">{classData.proficiencyProgression}</p>
        </div>
      )}

      {/* Full Class Description */}
      <MarkdownHtmlDisplay 
        content={markdownContent}
        contentType="class"
        className="mb-8"
      />

      {/* Navigation to Related Classes */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          <ExternalLink className="h-4 w-4 inline mr-1" />
          Explore more character options in the <Link href="/classes" className="text-primary hover:underline">Class Compendium</Link>
        </div>
      </div>
    </div>
  );
}

// Generate static params for all classes (optional - for static generation)
export async function generateStaticParams() {
  return allClasses.map((classData) => ({
    id: classData.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ClassPageProps) {
  const { id } = await params;
  const classData = allClasses.find(c => c.id === id);
  
  if (!classData) {
    return {
      title: 'Class Not Found',
      description: 'The requested character class could not be found.',
    };
  }
  
  return {
    title: `${classData.name} - ACKS II Character Classes`,
    description: `Learn about the ${classData.name} character class in ACKS II. ${classData.description}`,
    keywords: `ACKS II, character class, ${classData.name}, ${classData.category}, ${classData.keyAttribute}, tabletop RPG`,
  };
} 