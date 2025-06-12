const fs = require('fs');
const path = require('path');

/**
 * Enhanced ACKS II Spell Extraction Script
 * 
 * This script parses the actual ACKS II spell format from the markdown files
 * and extracts real spell data with proper stats, descriptions, and details.
 * 
 * @author ACKS II Wiki Development Team
 */

function extractSpellsFromFile(filePath) {
  console.log(`\n📖 Reading file: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const spells = [];
  
  // Split content by spell headers (###### Spell Name)
  const spellSections = content.split(/(?=^#{6} [^#])/gm).filter(section => 
    section.trim().length > 0 && section.includes('######')
  );
  
  console.log(`🔍 Found ${spellSections.length} potential spell sections`);
  
  for (const section of spellSections) {
    try {
      const spell = parseSpellSection(section);
      if (spell) {
        spells.push(spell);
        console.log(`✅ Extracted: ${spell.name} (Level ${spell.level})`);
      }
    } catch (error) {
      console.warn(`⚠️  Failed to parse spell section: ${error.message}`);
    }
  }
  
  return spells;
}

function parseSpellSection(section) {
  // Extract spell name from header (###### Spell Name)
  const nameMatch = section.match(/^#{6} (.+?)$/m);
  if (!nameMatch) return null;
  
  const name = nameMatch[1].trim();
  
  // Skip if this looks like a chapter header or non-spell content
  if (name.toLowerCase().includes('chapter') || 
      name.toLowerCase().includes('spell') && name.toLowerCase().includes('list') ||
      name.toLowerCase().includes('description') ||
      name.toLowerCase().includes('format') ||
      name.toLowerCase().includes('index') ||
      name.toLowerCase().includes('defined terms') ||
      name.length < 3) {
    return null;
  }
  
  // Extract spell type line (Arcane/Divine X Type: Y)
  const typeLineMatch = section.match(/^((?:Arcane|Divine)[^:]+Type:[^\n]+)$/m);
  const typeLine = typeLineMatch ? typeLineMatch[1].trim() : '';
  
  // Parse magic type and level from type line
  const magicTypeMatch = typeLine.match(/(Arcane|Divine)/);
  const magicType = magicTypeMatch ? magicTypeMatch[1] : 'Arcane';
  
  const levelMatch = typeLine.match(/(?:Arcane|Divine)\s+(\d+)/);
  const level = levelMatch ? parseInt(levelMatch[1]) : 1;
  
  const spellTypeMatch = typeLine.match(/Type:\s*(.+)$/);
  const spellType = spellTypeMatch ? spellTypeMatch[1].trim() : '';
  
  // Extract range and duration line
  const rangeLineMatch = section.match(/^Range:\s*([^D]+)Duration:\s*(.+)$/m);
  const range = rangeLineMatch ? rangeLineMatch[1].trim() : '';
  const duration = rangeLineMatch ? rangeLineMatch[2].trim() : '';
  
  // Extract description (everything after the range/duration line)
  const descriptionMatch = section.match(/^Range:[^\n]+\n\n(.*?)(?=\n#{6}|$)/s);
  let description = descriptionMatch ? descriptionMatch[1].trim() : '';
  
  // Clean up description
  description = description.replace(/\*\*[^*]+\*\*:\s*[^\n]+\n?/g, '').trim();
  
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
    name,
    level,
    magicType,
    spellType,
    range,
    duration,
    description,
    sourceFile: 'ACKS_II_Content/Rulebook/56_spell_descriptions.md',
    category: 'spell'
  };
}

function extractSpellDetails(section) {
  const details = {};
  
  // Look for spell stat patterns
  const patterns = {
    range: /\*\*Range\*\*:\s*([^\n]+)/i,
    duration: /\*\*Duration\*\*:\s*([^\n]+)/i,
    'casting time': /\*\*Casting Time\*\*:\s*([^\n]+)/i,
    components: /\*\*Components\*\*:\s*([^\n]+)/i,
    'saving throw': /\*\*Saving Throw\*\*:\s*([^\n]+)/i,
    'spell resistance': /\*\*Spell Resistance\*\*:\s*([^\n]+)/i,
    school: /\*\*School\*\*:\s*([^\n]+)/i,
    'magic type': /\*\*Magic Type\*\*:\s*([^\n]+)/i
  };
  
  for (const [key, pattern] of Object.entries(patterns)) {
    const match = section.match(pattern);
    if (match) {
      details[key] = match[1].trim();
    }
  }
  
  return details;
}

function extractSpellLevel(section, spellName) {
  // Look for level indicators in various formats
  const levelPatterns = [
    /\*\*Level\*\*:\s*(\d+)/i,
    /Level\s+(\d+)/i,
    /(\d+)(?:st|nd|rd|th)\s+Level/i,
    /\(Level\s+(\d+)\)/i
  ];
  
  for (const pattern of levelPatterns) {
    const match = section.match(pattern);
    if (match) {
      return parseInt(match[1]);
    }
  }
  
  // Try to infer from spell list context if available
  const listMatch = section.match(/(?:^|\n)(\d+)(?:st|nd|rd|th)?\s+Level[^:]*:.*?${spellName}/im);
  if (listMatch) {
    return parseInt(listMatch[1]);
  }
  
  return 1; // Default to level 1 if not found
}

function main() {
  console.log('🚀 ACKS II Spell Extraction - Enhanced Version');
  console.log('===============================================');
  
  const inputFile = 'ACKS_II_Content/Rulebook/56_spell_descriptions.md';
  const outputFile = 'src/data/all-spells.json';
  
  // Extract spells
  const spells = extractSpellsFromFile(inputFile);
  
  console.log(`\n📊 Extraction Summary:`);
  console.log(`   Total spells extracted: ${spells.length}`);
  
  if (spells.length > 0) {
    // Ensure output directory exists
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write to file
    fs.writeFileSync(outputFile, JSON.stringify(spells, null, 2));
    console.log(`✅ Spells saved to: ${outputFile}`);
    
    // Show sample of extracted spells
    console.log(`\n🎯 Sample extracted spells:`);
    spells.slice(0, 10).forEach(spell => {
      console.log(`   - ${spell.name} (Level ${spell.level})`);
    });
    
    if (spells.length > 10) {
      console.log(`   ... and ${spells.length - 10} more spells`);
    }
    
    // Show level distribution
    const levelCounts = {};
    spells.forEach(spell => {
      levelCounts[spell.level] = (levelCounts[spell.level] || 0) + 1;
    });
    
    console.log(`\n📈 Spell Level Distribution:`);
    Object.keys(levelCounts).sort((a, b) => parseInt(a) - parseInt(b)).forEach(level => {
      console.log(`   Level ${level}: ${levelCounts[level]} spells`);
    });
    
  } else {
    console.log('❌ No spells were extracted');
  }
}

if (require.main === module) {
  main();
}

module.exports = { extractSpellsFromFile, parseSpellSection }; 