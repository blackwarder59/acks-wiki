#!/usr/bin/env node

/**
 * Simple Monster Extraction Script
 * 
 * This script extracts a few sample monsters from the ACKS II content
 * and creates JSON data that can be used in the wiki instead of mockups.
 * 
 * This is a temporary solution to get real content working quickly.
 */

const fs = require('fs');
const path = require('path');

// Read the monster listings file
const monsterFile = path.join(__dirname, '../ACKS_II_Content/Monstrous_Manual/01_chapter_2_monster_listings.md');
const content = fs.readFileSync(monsterFile, 'utf-8');

// Simple function to extract monster data
function extractMonster(text, startPattern, endPattern) {
  const startIndex = text.indexOf(startPattern);
  if (startIndex === -1) return null;
  
  const endIndex = text.indexOf(endPattern, startIndex + startPattern.length);
  const monsterText = text.substring(startIndex, endIndex === -1 ? startIndex + 3000 : endIndex);
  
  // Extract basic info
  const nameMatch = monsterText.match(/### (.+)/);
  const name = nameMatch ? nameMatch[1] : 'Unknown';
  
  // Extract description (first paragraph)
  const descMatch = monsterText.match(/### .+\n\n(.+?)\n\n/s);
  const description = descMatch ? descMatch[1].replace(/\n/g, ' ') : 'No description available.';
  
  // Extract stats from the primary characteristics table
  const stats = {};
  const typeMatch = monsterText.match(/\*\*Type:\*\*\s*\|\s*(.+)/);
  const sizeMatch = monsterText.match(/\*\*Size:\*\*\s*\|\s*(.+)/);
  const speedMatch = monsterText.match(/\*\*Speed.*:\*\*\s*\|\s*(.+)/);
  const acMatch = monsterText.match(/\*\*Armor Class:\*\*\s*\|\s*(.+)/);
  const hdMatch = monsterText.match(/\*\*Hit Dice:\*\*\s*\|\s*(.+)/);
  const attacksMatch = monsterText.match(/\*\*Attacks:\*\*\s*\|\s*(.+)/);
  const damageMatch = monsterText.match(/\*\*Damage:\*\*\s*\|\s*(.+)/);
  const saveMatch = monsterText.match(/\*\*Save:\*\*\s*\|\s*(.+)/);
  const moraleMatch = monsterText.match(/\*\*Morale:\*\*\s*\|\s*(.+)/);
  const alignmentMatch = monsterText.match(/\*\*Alignment:\*\*\s*\|\s*(.+)/);
  const xpMatch = monsterText.match(/\*\*XP:\*\*\s*\|\s*(.+)/);
  
  if (typeMatch) stats.type = typeMatch[1].trim();
  if (sizeMatch) stats.size = sizeMatch[1].trim();
  if (speedMatch) stats.speed = speedMatch[1].trim();
  if (acMatch) stats.armorClass = acMatch[1].trim();
  if (hdMatch) stats.hitDice = hdMatch[1].trim();
  if (attacksMatch) stats.attacks = attacksMatch[1].trim();
  if (damageMatch) stats.damage = damageMatch[1].trim();
  if (saveMatch) stats.save = saveMatch[1].trim();
  if (moraleMatch) stats.morale = moraleMatch[1].trim();
  if (alignmentMatch) stats.alignment = alignmentMatch[1].trim();
  if (xpMatch) stats.xp = xpMatch[1].trim();
  
  // Create a simple ID from the name
  const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  
  return {
    id,
    name,
    contentType: 'MONSTER',
    description,
    stats,
    sourceFile: '01_chapter_2_monster_listings.md',
    category: 'Monstrous Manual'
  };
}

// Extract a few sample monsters
const monsters = [];

// Extract Giant Acanthaspis
const acanthaspis = extractMonster(content, '### Acanthaspis, Giant', '### Amphisbaena');
if (acanthaspis) monsters.push(acanthaspis);

// Extract Amphisbaena
const amphisbaena = extractMonster(content, '### Amphisbaena', '### Ant, Giant');
if (amphisbaena) monsters.push(amphisbaena);

// Extract Giant Ant
const giantAnt = extractMonster(content, '### Ant, Giant', '### ');
if (giantAnt) monsters.push(giantAnt);

// Create output directory
const outputDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the monsters to a JSON file
const outputFile = path.join(outputDir, 'sample-monsters.json');
const output = {
  metadata: {
    generatedAt: new Date().toISOString(),
    contentType: 'MONSTER',
    itemCount: monsters.length,
    source: 'ACKS II Monstrous Manual',
    note: 'Sample monsters extracted for wiki development'
  },
  data: monsters
};

fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));

console.log(`✅ Extracted ${monsters.length} sample monsters to ${outputFile}`);
console.log('Monsters extracted:');
monsters.forEach(monster => {
  console.log(`  - ${monster.name} (${monster.id})`);
});

console.log('\n🎉 You can now use real ACKS II monsters in the wiki instead of mockups!'); 