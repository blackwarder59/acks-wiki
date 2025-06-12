#!/usr/bin/env node

/**
 * Extract Individual Monsters from ACKS II Monster Listings
 * 
 * This script extracts individual monsters from the large monster listings
 * markdown file and creates separate files for each monster.
 */

import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

/**
 * Extract individual monster entries from the monster listings markdown
 */
function extractMonsters(markdownContent) {
  const monsters = [];
  
  // Fix Unicode characters before processing
  markdownContent = markdownContent
    .replace(/⟪/g, '⟪')   // Mathematical left angle bracket
    .replace(/⟫/g, '⟫')   // Mathematical right angle bracket  
    .replace(/–/g, '–')    // En dash
    .replace(/—/g, '—')    // Em dash
    .replace(/'/g, "'")    // Left single quotation mark
    .replace(/'/g, "'")    // Right single quotation mark
    .replace(/"/g, '"')    // Left double quotation mark
    .replace(/"/g, '"')    // Right double quotation mark
    .replace(/…/g, '...')   // Horizontal ellipsis
    .replace(/ë/g, 'ë')    // e with diaeresis
    .replace(/\u00A0/g, ' ') // Non-breaking space to regular space
    .replace(/\uFFFD/g, '?'); // Replace Unicode replacement character with ?
  
  // Split by ### headers (monster names)
  const sections = markdownContent.split(/^### /m);
  
  for (let i = 1; i < sections.length; i++) {
    const section = '### ' + sections[i];
    
    // Extract monster name (first line)
    const nameMatch = section.match(/^### (.+)$/m);
    if (!nameMatch) continue;
    
    const monsterName = nameMatch[1].trim();
    
    // Find the content for this monster (until the next ### or end)
    const contentMatch = section.match(/^### .+\n([\s\S]+?)(?=^### |\z)/m);
    const content = contentMatch ? contentMatch[1] : section;
    
    // Extract description (first paragraph after the title)
    const descriptionMatch = content.match(/^(.+?)(?:\n\n|\n\|)/s);
    const description = descriptionMatch ? descriptionMatch[1].trim() : '';
    
    // Extract stats table
    const statsMatch = content.match(/\|[^|]*Type:[^|]*\|[^|]*\|[\s\S]*?(?=\n\n|\n(?![\s|]))/);
    const statsTable = statsMatch ? statsMatch[0] : '';
    
    // Extract encounter table
    const encounterMatch = content.match(/\|[^|]*Lair:[^|]*\|[^|]*\|[\s\S]*?(?=\n\n|\n(?![\s|]))/);
    const encounterTable = encounterMatch ? encounterMatch[0] : '';
    
    // Extract combat section
    const combatMatch = content.match(/\n\n([\s\S]*?)(?=\n\n(?:[A-Z]|$))/);
    const combat = combatMatch ? combatMatch[1] : '';
    
    // Create monster object
    const monster = {
      name: monsterName,
      markdown: section,
      html: marked(section),
      description,
      statsTable,
      encounterTable,
      combat,
      id: monsterName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    
    // Parse stats from table
    if (statsTable) {
      monster.stats = parseStatsTable(statsTable);
    }
    
    // Parse encounter info
    if (encounterTable) {
      monster.encounterInfo = parseEncounterTable(encounterTable);
    }
    
    monsters.push(monster);
  }
  
  return monsters;
}

/**
 * Parse stats table into structured data
 */
function parseStatsTable(tableText) {
  const stats = {};
  const rows = tableText.split('\n').filter(row => row.trim().startsWith('|'));
  
  for (const row of rows) {
    const cells = row.split('|').map(cell => cell.trim()).filter(Boolean);
    
    if (cells.length >= 2) {
      const key = cells[0].replace(/[*:]/g, '').trim();
      const value = cells[1].trim();
      
      const statMap = {
        'Type': 'type',
        'Size': 'size',
        'Speed': 'speed',
        'Armor Class': 'armorClass',
        'Hit Dice': 'hitDice',
        'Attacks': 'attacks',
        'Damage': 'damage',
        'Save': 'save',
        'Morale': 'morale',
        'Vision': 'vision',
        'Other Senses': 'otherSenses',
        'Proficiencies': 'proficiencies',
        'Normal Load': 'normalLoad'
      };
      
      if (statMap[key]) {
        stats[statMap[key]] = value;
      }
    }
  }
  
  return stats;
}

/**
 * Parse encounter table
 */
function parseEncounterTable(tableText) {
  const encounter = {};
  const rows = tableText.split('\n').filter(row => row.trim().startsWith('|'));
  
  for (const row of rows) {
    const cells = row.split('|').map(cell => cell.trim()).filter(Boolean);
    
    if (cells.length >= 2) {
      const key = cells[0].replace(/[*:]/g, '').trim();
      const value = cells[1].trim();
      
      const encounterMap = {
        'Lair': 'lair',
        'Dungeon Enc': 'dungeonEnc',
        'Wilderness Enc': 'wildernessEnc',
        'Alignment': 'alignment',
        'Treasure Type': 'treasureType',
        'XP': 'xp'
      };
      
      if (encounterMap[key]) {
        encounter[encounterMap[key]] = value;
        
        // Parse XP as number
        if (key === 'XP') {
          encounter.xp = parseInt(value.replace(/,/g, ''), 10) || 0;
        }
      }
    }
  }
  
  return encounter;
}

/**
 * Main processing function
 */
function processMonsterListings(inputFile, outputDir) {
  console.log(`Reading ${inputFile}...`);
  
  const markdown = fs.readFileSync(inputFile, 'utf-8');
  const monsters = extractMonsters(markdown);
  
  console.log(`Found ${monsters.length} monsters`);
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Save individual monster files
  for (const monster of monsters) {
    const filename = path.join(outputDir, `${monster.id}.json`);
    fs.writeFileSync(filename, JSON.stringify(monster, null, 2));
    console.log(`✅ Saved ${monster.name} to ${filename}`);
  }
  
  // Create index file
  const indexFile = path.join(outputDir, 'index.json');
  const index = {
    totalMonsters: monsters.length,
    processedAt: new Date().toISOString(),
    monsters: monsters.map(m => ({
      id: m.id,
      name: m.name,
      type: m.stats?.type,
      xp: m.encounterInfo?.xp
    }))
  };
  
  fs.writeFileSync(indexFile, JSON.stringify(index, null, 2));
  console.log(`\n📋 Created index at ${indexFile}`);
  
  // Create a combined file with just the first 10 monsters for testing
  const sampleFile = path.join(outputDir, 'sample-monsters.json');
  fs.writeFileSync(sampleFile, JSON.stringify(monsters.slice(0, 10), null, 2));
  console.log(`📄 Created sample file with first 10 monsters at ${sampleFile}`);
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node extract-monsters-individually.js <input-file> <output-dir>');
  console.log('Example: node extract-monsters-individually.js ./ACKS_II_Content/Monstrous_Manual/01_chapter_2_monster_listings.md ./converted/individual-monsters');
  process.exit(1);
}

const [inputFile, outputDir] = args;
processMonsterListings(inputFile, outputDir); 