const fs = require('fs');

/**
 * Filter Real ACKS II Spells
 * 
 * This script filters the extracted spell data to remove definition terms
 * and keep only actual spells with proper magic type and spell type data.
 */

function filterRealSpells() {
  console.log('🔍 Filtering real spells from extracted data...');
  
  // Read the extracted spells
  const allSpells = JSON.parse(fs.readFileSync('src/data/all-spells.json', 'utf8'));
  
  // Filter to keep only real spells
  const realSpells = allSpells.filter(spell => {
    // Must have a spell type (actual spells have types like "transmogrification", "necromancy", etc.)
    if (!spell.spellType || spell.spellType.trim() === '') {
      return false;
    }
    
    // Must have range and duration
    if (!spell.range || !spell.duration || spell.range.trim() === '' || spell.duration.trim() === '') {
      return false;
    }
    
    // Skip obvious definition terms
    const definitionTerms = [
      'affected creature', 'ally', 'animal', 'baseline hit dice', 'beholding',
      'caster', 'caster level', 'concentration', 'dead', 'dispelled',
      'enchanted creature', 'enemy', 'humanoid', 'living', 'indefinite',
      'object', 'perpetual', 'plant', 'recipient', 'sapiency', 'special',
      'stationary concentration', 'structure', 'target', 'touch'
    ];
    
    if (definitionTerms.includes(spell.name.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  console.log(`📊 Filtering Results:`);
  console.log(`   Original spells: ${allSpells.length}`);
  console.log(`   Real spells: ${realSpells.length}`);
  console.log(`   Filtered out: ${allSpells.length - realSpells.length}`);
  
  // Save filtered spells
  fs.writeFileSync('src/data/real-spells.json', JSON.stringify(realSpells, null, 2));
  console.log(`✅ Real spells saved to: src/data/real-spells.json`);
  
  // Show sample of real spells
  console.log(`\n🎯 Sample real spells:`);
  realSpells.slice(0, 10).forEach(spell => {
    console.log(`   - ${spell.name} (${spell.magicType} ${spell.level}, ${spell.spellType})`);
  });
  
  if (realSpells.length > 10) {
    console.log(`   ... and ${realSpells.length - 10} more spells`);
  }
  
  // Show level distribution
  const levelCounts = {};
  realSpells.forEach(spell => {
    levelCounts[spell.level] = (levelCounts[spell.level] || 0) + 1;
  });
  
  console.log(`\n📈 Real Spell Level Distribution:`);
  Object.keys(levelCounts).sort((a, b) => parseInt(a) - parseInt(b)).forEach(level => {
    console.log(`   Level ${level}: ${levelCounts[level]} spells`);
  });
  
  return realSpells;
}

if (require.main === module) {
  filterRealSpells();
}

module.exports = { filterRealSpells }; 