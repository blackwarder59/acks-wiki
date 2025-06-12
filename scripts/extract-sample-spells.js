#!/usr/bin/env node

/**
 * Simple Spell Extraction Script
 * 
 * This script extracts some basic spell information from the ACKS II content
 * and creates JSON data that can be used in the wiki.
 * 
 * This is a temporary solution to get more content types working quickly.
 */

const fs = require('fs');
const path = require('path');

// Read the spell descriptions file
const spellFile = path.join(__dirname, '../ACKS_II_Content/Rulebook/56_spell_descriptions.md');
const content = fs.readFileSync(spellFile, 'utf-8');

// Simple function to extract spell data
function extractSpell(text, spellName) {
  const pattern = new RegExp(`###### ${spellName}([\\s\\S]*?)(?=###### |$)`, 'i');
  const match = text.match(pattern);
  
  if (!match) return null;
  
  const spellText = match[1];
  
  // Extract basic info
  const lines = spellText.split('\n').filter(line => line.trim());
  
  // First line usually contains level and type info
  const firstLine = lines[0] || '';
  const levelMatch = firstLine.match(/(\d+)(?:st|nd|rd|th)\s+level/i);
  const level = levelMatch ? parseInt(levelMatch[1]) : 1;
  
  // Extract description (usually the main paragraph)
  let description = '';
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line && !line.startsWith('*') && !line.startsWith('|') && !line.startsWith('EXAMPLE')) {
      description = line;
      break;
    }
  }
  
  // Extract range, duration, etc. from the first line or subsequent lines
  const rangeMatch = spellText.match(/Range:\s*([^,\n]+)/i) || spellText.match(/(\d+['\s]*(?:feet?|ft))/i);
  const durationMatch = spellText.match(/Duration:\s*([^,\n]+)/i) || spellText.match(/(instantaneous|permanent|concentration)/i);
  
  const range = rangeMatch ? rangeMatch[1].trim() : 'Touch';
  const duration = durationMatch ? durationMatch[1].trim() : 'Instantaneous';
  
  // Create a simple ID from the name
  const id = spellName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  
  return {
    id,
    name: spellName,
    contentType: 'SPELL',
    level,
    description: description || `A ${level}${level === 1 ? 'st' : level === 2 ? 'nd' : level === 3 ? 'rd' : 'th'} level spell.`,
    range,
    duration,
    spellType: 'Arcane', // Default, could be improved with better parsing
    sourceFile: '56_spell_descriptions.md',
    category: 'Rulebook'
  };
}

// Extract a few sample spells
const spells = [];

// Common spells to look for
const spellNames = [
  'Fireball',
  'Magic Missile', 
  'Cure Light Wounds',
  'Shield',
  'Sleep',
  'Web',
  'Lightning Bolt',
  'Fly',
  'Invisibility'
];

spellNames.forEach(spellName => {
  const spell = extractSpell(content, spellName);
  if (spell) {
    spells.push(spell);
    console.log(`✅ Extracted: ${spellName}`);
  } else {
    console.log(`❌ Not found: ${spellName}`);
  }
});

// Create output directory
const outputDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the spells to a JSON file
const outputFile = path.join(outputDir, 'sample-spells.json');
const output = {
  metadata: {
    generatedAt: new Date().toISOString(),
    contentType: 'SPELL',
    itemCount: spells.length,
    source: 'ACKS II Rulebook',
    note: 'Sample spells extracted for wiki development'
  },
  data: spells
};

fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));

console.log(`\n✅ Extracted ${spells.length} sample spells to ${outputFile}`);
if (spells.length > 0) {
  console.log('Spells extracted:');
  spells.forEach(spell => {
    console.log(`  - ${spell.name} (Level ${spell.level}, ${spell.id})`);
  });
}

console.log('\n🎉 You can now search for real ACKS II spells in the wiki!'); 