/**
 * Judges Journal Page - ACKS II Judge Tools and Content
 * 
 * Displays the converted judges journal content organized by categories
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Crown, Scroll, Sword, Users, Map, Calculator, Search, Shield } from 'lucide-react';

export default function JudgesJournalPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          ACKS II Judges Journal
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Essential tools, guidance, and expanded content for ACKS II Judges. 
          From campaign management to advanced rules, everything needed to run epic adventures.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search journal content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-2xl font-bold text-foreground">175</div>
          <div className="text-sm text-muted-foreground">Journal Entries</div>
        </div>
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-2xl font-bold text-foreground">Judge</div>
          <div className="text-sm text-muted-foreground">Tools & Guidance</div>
        </div>
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-2xl font-bold text-foreground">Expanded</div>
          <div className="text-sm text-muted-foreground">Content</div>
        </div>
      </div>

      {/* Coming Soon Message */}
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="mb-6">
          <Shield className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Judges Journal Content Coming Soon
          </h2>
          <p className="text-muted-foreground mb-6">
            We have successfully converted 175 Judges Journal files and are now working on 
            organizing and displaying this valuable judge content. This will include:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-2">
              <Crown className="w-5 h-5 text-primary mr-2" />
              <h3 className="font-semibold">Campaign Tools</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced campaign management, NPCs, and world-building tools
            </p>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-2">
              <Map className="w-5 h-5 text-primary mr-2" />
              <h3 className="font-semibold">Adventure Design</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Guidelines for creating compelling dungeons and wilderness areas
            </p>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-2">
              <Users className="w-5 h-5 text-primary mr-2" />
              <h3 className="font-semibold">NPCs & Organizations</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Ready-to-use characters and organizations for your campaigns
            </p>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center mb-2">
              <Calculator className="w-5 h-5 text-primary mr-2" />
              <h3 className="font-semibold">Optional Rules</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Extended mechanics and variant rules for expanded gameplay
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link 
            href="/rules" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Scroll className="w-4 h-4 mr-2" />
            Explore Rules in the Meantime
          </Link>
        </div>
      </div>
    </div>
  );
} 