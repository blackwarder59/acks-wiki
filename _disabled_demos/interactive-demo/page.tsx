'use client';

/**
 * Interactive Features Demo Page for ACKS II Wiki
 * 
 * Demonstrates all interactive features including copy-to-clipboard
 * functionality and bidirectional linking system.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { 
  CopyButton, 
  Backlinks, 
  createCopyContent,
  BaseContentCard
} from '@/components/ui';
import { 
  ReferenceRegistry,
  type ReferenceEntry as Reference,
  ContentType,
  ReferenceType
} from '@/lib/cross-references';
import { ContentCategory } from '@/lib/types/content';

// Mock data for demonstration
const mockContent = {
  id: 'fireball-spell',
  contentType: ContentType.SPELL,
  title: 'Fireball',
  description: 'A 3rd level arcane spell that creates a fiery explosion in a target area.',
  sourceFile: 'spells.md',
  category: ContentCategory.RULEBOOK,
  stats: {
    level: 3,
    range: '150 feet',
    duration: 'Instantaneous',
    school: 'Evocation',
    components: 'V, S, M (a tiny ball of bat guano and sulfur)'
  },
  details: `This spell creates a brilliant flash of fire that detonates with a low roar, dealing 1d6 points of damage per caster level (maximum 10d6) to every creature within a 20-foot radius. The explosion creates almost no pressure.

Any creature caught within the spell's area of effect may attempt a saving throw vs. spell for half damage. The fireball sets fire to combustibles and damages objects in the area. It can melt metals with low melting points, such as lead, gold, copper, silver, and bronze.`
};

// Mock references for backlinks demo
const mockReferences: Reference[] = [
  {
    id: 'ref1',
    sourceId: 'wizard-class',
    targetId: 'fireball-spell',
    referenceType: ReferenceType.MENTIONS,
    context: 'Wizards can learn and cast fireball as a 3rd level spell.',
    originalText: 'fireball',
    confidence: 0.95,
    position: { start: 156, end: 164 },
    validated: true,
    createdAt: new Date()
  },
  {
    id: 'ref2',
    sourceId: 'meteor-swarm',
    targetId: 'fireball-spell',
    referenceType: ReferenceType.RELATED,
    context: 'Each meteor that hits deals damage as a fireball spell.',
    originalText: 'fireball',
    confidence: 0.88,
    position: { start: 67, end: 75 },
    validated: true,
    createdAt: new Date(Date.now() - 86400000)
  },
  {
    id: 'ref3',
    sourceId: 'fire-trap',
    targetId: 'fireball-spell',
    referenceType: ReferenceType.VARIANT,
    context: 'The blast is similar to a fireball but only affects a 5-foot radius.',
    originalText: 'fireball',
    confidence: 0.72,
    position: { start: 28, end: 36 },
    validated: true,
    createdAt: new Date(Date.now() - 172800000)
  },
  {
    id: 'ref4',
    sourceId: 'protection-from-fire',
    targetId: 'fireball-spell',
    referenceType: ReferenceType.REQUIRES,
    context: 'This spell protects against fire-based attacks like fireball.',
    originalText: 'fireball',
    confidence: 0.85,
    position: { start: 51, end: 59 },
    validated: true,
    createdAt: new Date(Date.now() - 259200000)
  },
  {
    id: 'ref5',
    sourceId: 'red-dragon',
    targetId: 'fireball-spell',
    referenceType: ReferenceType.MENTIONS,
    context: 'Red dragons are immune to fire damage, including from fireball spells.',
    originalText: 'fireball',
    confidence: 0.91,
    position: { start: 58, end: 66 },
    validated: true,
    createdAt: new Date(Date.now() - 345600000)
  }
];

// Create mock registry
const createMockRegistry = (): ReferenceRegistry => {
  const registry = new ReferenceRegistry();
  
  // Add mock references using the registry's import method
  registry.import(mockReferences);
  
  return registry;
};

export default function InteractiveDemoPage() {
  const [registry] = useState(() => createMockRegistry());
  const [copyCount, setCopyCount] = useState(0);
  const [lastCopiedFormat, setLastCopiedFormat] = useState<string>('');

  const handleCopySuccess = (content: string, format: string) => {
    setCopyCount(prev => prev + 1);
    setLastCopiedFormat(format);
    console.log(`Copied ${content.length} characters in ${format} format`);
  };

  const handleBacklinkClick = (reference: Reference) => {
    console.log('Backlink clicked:', reference);
    alert(`Navigating to: ${reference.sourceId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Interactive Features Demo</h1>
        <p className="text-muted-foreground">
          This page demonstrates the copy-to-clipboard functionality and bidirectional linking system
          implemented for the ACKS II Wiki content display system.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{copyCount}</div>
            <div className="text-xs text-muted-foreground">Copy Actions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{mockReferences.length}</div>
            <div className="text-xs text-muted-foreground">Backlinks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{lastCopiedFormat || 'None'}</div>
            <div className="text-xs text-muted-foreground">Last Format</div>
          </div>
        </div>
      </div>

      {/* Copy Button Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Copy-to-Clipboard Functionality</h2>
        <p className="text-muted-foreground">
          The enhanced copy system supports multiple formats and provides visual feedback.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Simple Text Copy */}
          <div className="p-4 border border-border rounded-lg space-y-3">
            <h3 className="font-medium">Simple Text Copy</h3>
            <div className="flex items-center gap-3">
              <CopyButton
                content="This is a simple text string to copy."
                onCopySuccess={handleCopySuccess}
              />
              <span className="text-sm text-muted-foreground">Basic copy functionality</span>
            </div>
          </div>

          {/* Multi-format Copy */}
          <div className="p-4 border border-border rounded-lg space-y-3">
            <h3 className="font-medium">Multi-format Copy</h3>
            <div className="flex items-center gap-3">
              <CopyButton
                content={createCopyContent(mockContent)}
                config={{
                  showFormatSelector: true,
                  defaultFormat: 'markdown'
                }}
                onCopySuccess={handleCopySuccess}
              />
              <span className="text-sm text-muted-foreground">Multiple format options</span>
            </div>
          </div>

          {/* Different Variants */}
          <div className="p-4 border border-border rounded-lg space-y-3">
            <h3 className="font-medium">Button Variants</h3>
            <div className="flex items-center gap-2">
              <CopyButton
                content="Default variant"
                variant="default"
                size="sm"
                onCopySuccess={handleCopySuccess}
              />
              <CopyButton
                content="Outline variant"
                variant="outline"
                size="sm"
                onCopySuccess={handleCopySuccess}
              />
              <CopyButton
                content="Ghost variant"
                variant="ghost"
                size="sm"
                onCopySuccess={handleCopySuccess}
              />
              <CopyButton
                content="Minimal variant"
                variant="minimal"
                size="sm"
                onCopySuccess={handleCopySuccess}
              />
            </div>
          </div>

          {/* Different Sizes */}
          <div className="p-4 border border-border rounded-lg space-y-3">
            <h3 className="font-medium">Button Sizes</h3>
            <div className="flex items-center gap-2">
              <CopyButton
                content="Small size"
                size="sm"
                onCopySuccess={handleCopySuccess}
              />
              <CopyButton
                content="Medium size"
                size="md"
                onCopySuccess={handleCopySuccess}
              />
              <CopyButton
                content="Large size"
                size="lg"
                onCopySuccess={handleCopySuccess}
              />
            </div>
          </div>
        </div>

        {/* Copy Content Formats */}
        <div className="p-4 border border-border rounded-lg space-y-3">
          <h3 className="font-medium">Content Format Examples</h3>
          <p className="text-sm text-muted-foreground">
            The copy system automatically generates multiple formats from content objects:
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Text Format:</h4>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {createCopyContent(mockContent).text}
              </pre>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Markdown Format:</h4>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {createCopyContent(mockContent).markdown}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Content Card with Copy and Backlinks */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Enhanced Content Card</h2>
        <p className="text-muted-foreground">
          Content cards now include copy functionality and backlinks display.
        </p>

        <BaseContentCard
          content={mockContent}
          showCopyButton={true}
          showBacklinks={true}
          referenceRegistry={registry}
          variant="detailed"
          onCopy={(content) => {
            setCopyCount(prev => prev + 1);
            console.log('Content copied from card:', content.substring(0, 50) + '...');
          }}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Level:</strong> {mockContent.stats.level}
              </div>
              <div>
                <strong>Range:</strong> {mockContent.stats.range}
              </div>
              <div>
                <strong>Duration:</strong> {mockContent.stats.duration}
              </div>
              <div>
                <strong>School:</strong> {mockContent.stats.school}
              </div>
            </div>
            
            <div>
              <strong>Components:</strong> {mockContent.stats.components}
            </div>
            
            <div className="text-sm text-muted-foreground">
              {mockContent.details}
            </div>
          </div>
        </BaseContentCard>
      </section>

      {/* Standalone Backlinks */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Backlinks System</h2>
        <p className="text-muted-foreground">
          The backlinks system shows bidirectional references with filtering and sorting options.
        </p>

        <div className="border border-border rounded-lg p-6">
          <Backlinks
            contentId={mockContent.id}
            contentType={mockContent.contentType}
            registry={registry}
            onBacklinkClick={handleBacklinkClick}
            config={{
              initialLimit: 10,
              showConfidence: true,
              showReferenceTypes: true,
              groupByContentType: true,
              enableSorting: true,
              enableFiltering: true,
              minConfidence: 0.5
            }}
          />
        </div>
      </section>

      {/* Features Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Features Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Copy Features */}
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-3">Copy-to-Clipboard Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Multiple content formats (text, markdown, JSON, HTML)</li>
              <li>• Visual feedback with animations</li>
              <li>• Keyboard accessibility</li>
              <li>• Format selection dropdown</li>
              <li>• Fallback for older browsers</li>
              <li>• Haptic feedback on mobile</li>
              <li>• Customizable styling and positioning</li>
              <li>• Error handling and recovery</li>
            </ul>
          </div>

          {/* Backlinks Features */}
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium mb-3">Backlinks System Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Bidirectional reference tracking</li>
              <li>• Confidence score display</li>
              <li>• Reference type indicators</li>
              <li>• Content type grouping</li>
              <li>• Filtering and sorting options</li>
              <li>• Expandable context preview</li>
              <li>• Performance optimization</li>
              <li>• Customizable display options</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Implementation Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Implementation Notes</h2>
        <div className="p-4 bg-muted/30 rounded-lg space-y-3">
          <h3 className="font-medium">Technical Highlights</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Modern Clipboard API with execCommand fallback</li>
            <li>• TypeScript interfaces for type safety</li>
            <li>• React hooks for state management</li>
            <li>• Accessible design with ARIA labels</li>
            <li>• Mobile-first responsive design</li>
            <li>• Performance optimized with memoization</li>
            <li>• Integration with existing cross-reference system</li>
            <li>• Comprehensive error handling</li>
          </ul>
        </div>
      </section>
    </div>
  );
} 