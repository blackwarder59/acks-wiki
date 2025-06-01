const fs = require('fs');
const path = require('path');

/**
 * Enhanced ACKS II Monster Extraction Script
 * 
 * This script parses the actual ACKS II monster format from the markdown files
 * and extracts real monster data with proper stats, descriptions, and tables.
 * 
 * @author ACKS II Wiki Development Team
 */

function extractMonstersFromFile(filePath) {
  console.log(`\n📖 Reading file: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const monsters = [];
  
  // Split content by monster headers (### Monster Name)
  const monsterSections = content.split(/(?=^### [^#])/gm).filter(section => 
    section.trim().length > 0 && section.includes('###')
  );
  
  console.log(`🔍 Found ${monsterSections.length} potential monster sections`);
  
  for (const section of monsterSections) {
    try {
      const monster = parseMonsterSection(section);
      if (monster) {
        monsters.push(monster);
        console.log(`✅ Extracted: ${monster.name}`);
      }
    } catch (error) {
      console.warn(`⚠️  Failed to parse monster section: ${error.message}`);
    }
  }
  
  return monsters;
}

function parseMonsterSection(section) {
  const lines = section.split('\n');
  
  // Extract monster name from header
  const nameMatch = section.match(/^### (.+?)$/m);
  if (!nameMatch) return null;
  
  const name = nameMatch[1].trim();
  
  // Extract description (text before ###### Combat or first table)
  const descriptionMatch = section.match(/^### .+?\n\n(.*?)(?=\n###### |$|\n\|)/s);
  const description = descriptionMatch ? descriptionMatch[1].trim() : '';
  
  // Extract primary characteristics table
  const primaryTable = extractTable(section, 'Primary Characteristics');
  const secondaryTable = extractTable(section, 'Secondary Characteristics');
  const encounterTable = extractTable(section, 'Encounters');
  
  // Parse stats from primary table
  const stats = parseStatsFromTable(primaryTable);
  
  // Parse encounter info
  const encounterInfo = parseEncounterInfo(encounterTable);
  
  // Extract combat section
  const combatMatch = section.match(/###### Combat\n\n(.*?)(?=\n###### |$|\n\|)/s);
  const combat = combatMatch ? combatMatch[1].trim() : '';
  
  // Extract ecology section
  const ecologyMatch = section.match(/###### Ecology\n\n(.*?)(?=\n###### |$|\n\|)/s);
  const ecology = ecologyMatch ? ecologyMatch[1].trim() : '';
  
  // Extract spoils section
  const spoilsMatch = section.match(/###### Spoils\n\n(.*?)(?=\n###### |$|\n\|)/s);
  const spoils = spoilsMatch ? spoilsMatch[1].trim() : '';
  
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
    name,
    description,
    combat,
    ecology,
    spoils,
    stats,
    encounterInfo,
    sourceFile: 'ACKS_II_Content/Monstrous_Manual/01_chapter_2_monster_listings.md',
    category: 'monster'
  };
}

function extractTable(section, tableName) {
  // Look for table with specific name
  const tableRegex = new RegExp(`\\*\\*[^*]*${tableName}[^*]*\\*\\*[^|]*\\|[^|]*\\|\\s*\\n((?:\\|[^\\n]*\\|\\s*\\n)+)`, 'i');
  const match = section.match(tableRegex);
  
  if (!match) return {};
  
  const tableContent = match[1];
  const rows = tableContent.split('\n').filter(row => row.trim().startsWith('|'));
  
  const data = {};
  for (const row of rows) {
    const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell);
    if (cells.length >= 2) {
      const key = cells[0].replace(/\*\*/g, '').replace(/:/g, '').trim();
      const value = cells[1].replace(/\*\*/g, '').trim();
      if (key && value) {
        data[key] = value;
      }
    }
  }
  
  return data;
}

function parseStatsFromTable(table) {
  return {
    type: table['Type'] || 'Unknown',
    size: table['Size'] || 'Medium',
    speed: table['Speed (land)'] || table['Speed'] || '30\'',
    armorClass: parseNumber(table['Armor Class']) || 10,
    hitDice: table['Hit Dice'] || '1d8',
    attacks: table['Attacks'] || '1',
    damage: table['Damage'] || '1d6',
    save: table['Save'] || 'F1',
    morale: table['Morale'] || '0',
    vision: table['Vision'] || 'Normal',
    otherSenses: table['Other Senses'] || '',
    proficiencies: table['Proficiencies'] || 'None',
    normalLoad: table['Normal Load'] || ''
  };
}

function parseEncounterInfo(table) {
  return {
    lair: table['Lair'] || '',
    dungeonEnc: table['Dungeon Enc'] || '',
    wildernessEnc: table['Wilderness Enc'] || '',
    alignment: table['Alignment'] || 'Neutral',
    treasureType: table['Treasure Type'] || '',
    xp: parseNumber(table['XP']) || 0
  };
}

function parseNumber(str) {
  if (!str) return null;
  const match = str.match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

function main() {
  console.log('🚀 ACKS II Monster Extraction - Enhanced Version');
  console.log('================================================');
  
  const inputFile = 'ACKS_II_Content/Monstrous_Manual/01_chapter_2_monster_listings.md';
  const outputFile = 'src/data/all-monsters.json';
  
  // Extract monsters
  const monsters = extractMonstersFromFile(inputFile);
  
  console.log(`\n📊 Extraction Summary:`);
  console.log(`   Total monsters extracted: ${monsters.length}`);
  
  if (monsters.length > 0) {
    // Ensure output directory exists
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write to file
    fs.writeFileSync(outputFile, JSON.stringify(monsters, null, 2));
    console.log(`✅ Monsters saved to: ${outputFile}`);
    
    // Show sample of extracted monsters
    console.log(`\n🎯 Sample extracted monsters:`);
    monsters.slice(0, 5).forEach(monster => {
      console.log(`   - ${monster.name} (${monster.stats.type}, AC ${monster.stats.armorClass}, HD ${monster.stats.hitDice}, XP ${monster.encounterInfo.xp})`);
    });
    
    if (monsters.length > 5) {
      console.log(`   ... and ${monsters.length - 5} more monsters`);
    }
  } else {
    console.log('❌ No monsters were extracted');
  }
}

if (require.main === module) {
  main();
}

module.exports = { extractMonstersFromFile, parseMonsterSection }; 