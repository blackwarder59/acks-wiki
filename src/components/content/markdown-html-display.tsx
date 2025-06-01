'use client';

/**
 * Markdown HTML Display Component
 * 
 * This component displays HTML content that was converted from markdown files
 * using the manual converter. It handles sections, metadata, and provides
 * a clean display for ACKS II content.
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Sword, Heart, Zap } from 'lucide-react';

interface MarkdownSection {
  title: string;
  level: number;
  html: string;
}

interface MonsterStats {
  type?: string;
  size?: string;
  speed?: string;
  armorClass?: string;
  hitDice?: string;
  attacks?: string;
  damage?: string;
  save?: string;
  morale?: string;
  vision?: string;
}

interface EncounterInfo {
  lair?: string;
  dungeonEnc?: string;
  wildernessEnc?: string;
  alignment?: string;
  treasureType?: string;
  xp?: number;
}

interface MarkdownContent {
  html: string;
  sections: MarkdownSection[];
  metadata: {
    name?: string;
    stats?: MonsterStats;
    encounterInfo?: EncounterInfo;
  };
  rawMarkdown?: string;
}

interface MarkdownHtmlDisplayProps {
  content: MarkdownContent;
  contentType: 'monster' | 'spell' | 'class' | 'equipment' | 'rule';
  className?: string;
}

export function MarkdownHtmlDisplay({ 
  content, 
  contentType, 
  className = '' 
}: MarkdownHtmlDisplayProps) {
  // For monsters, display with special formatting
  if (contentType === 'monster' && content.metadata?.stats) {
    return (
      <Card className={`w-full ${className}`}>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between">
            {content.metadata.name || 'Unknown Monster'}
            {content.metadata.encounterInfo?.xp && (
              <Badge variant="outline" className="text-sm">
                XP {content.metadata.encounterInfo.xp}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <StatItem icon={<Shield className="h-4 w-4" />} label="AC" value={content.metadata.stats.armorClass} />
              <StatItem icon={<Heart className="h-4 w-4" />} label="HD" value={content.metadata.stats.hitDice} />
              <StatItem icon={<Sword className="h-4 w-4" />} label="Attacks" value={content.metadata.stats.attacks} />
              <StatItem icon={<Zap className="h-4 w-4" />} label="Damage" value={content.metadata.stats.damage} />
            </div>
            <div className="space-y-2">
              <StatItem label="Type" value={content.metadata.stats.type} />
              <StatItem label="Size" value={content.metadata.stats.size} />
              <StatItem label="Save" value={content.metadata.stats.save} />
              <StatItem label="Morale" value={content.metadata.stats.morale} />
            </div>
          </div>

          {/* Content Sections */}
          <div className="w-full">
            <CustomTabs
              content={content}
            />
          </div>

          {/* Encounter Info */}
          {content.metadata.encounterInfo && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Encounter Information</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {content.metadata.encounterInfo.lair && (
                  <div><span className="font-medium">Lair:</span> {content.metadata.encounterInfo.lair}</div>
                )}
                {content.metadata.encounterInfo.dungeonEnc && (
                  <div><span className="font-medium">Dungeon:</span> {content.metadata.encounterInfo.dungeonEnc}</div>
                )}
                {content.metadata.encounterInfo.wildernessEnc && (
                  <div><span className="font-medium">Wilderness:</span> {content.metadata.encounterInfo.wildernessEnc}</div>
                )}
                {content.metadata.encounterInfo.alignment && (
                  <div><span className="font-medium">Alignment:</span> {content.metadata.encounterInfo.alignment}</div>
                )}
                {content.metadata.encounterInfo.treasureType && (
                  <div><span className="font-medium">Treasure:</span> {content.metadata.encounterInfo.treasureType}</div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default display for other content types
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle>{content.metadata.name || 'Content'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: content.html }} 
        />
      </CardContent>
    </Card>
  );
}

// Helper component for stat display
function StatItem({ 
  icon, 
  label, 
  value 
}: { 
  icon?: React.ReactNode; 
  label: string; 
  value?: string;
}) {
  if (!value) return null;
  
  return (
    <div className="flex items-center space-x-2 text-sm">
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

// Custom Tabs Component (temporary replacement for shadcn/ui tabs)
function CustomTabs({ content }: { content: MarkdownContent }) {
  const [activeTab, setActiveTab] = useState<'description' | 'full' | 'sections'>('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'full', label: 'Full Entry' },
    ...(content.sections.length > 0 ? [{ id: 'sections', label: 'Sections' }] : [])
  ] as const;

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-border mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === 'description' && (
          <div className="prose prose-sm max-w-none">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: content.sections.find(s => s.html.length > 100)?.html || 
                       content.sections[0]?.html || 
                       '<p>No description available.</p>' 
              }} 
            />
          </div>
        )}

        {activeTab === 'full' && (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div 
              className="monster-content"
              style={{
                fontFamily: 'inherit'
              }}
              dangerouslySetInnerHTML={{ 
                __html: content.sections.find(s => s.title === 'Full Entry')?.html || content.html 
              }} 
            />
          </div>
        )}

        {activeTab === 'sections' && content.sections.length > 0 && (
          <div className="space-y-4">
            {content.sections.map((section, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <h3 className={`font-semibold text-lg mb-2`}>
                  {section.title}
                </h3>
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.html }} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MarkdownHtmlDisplay; 