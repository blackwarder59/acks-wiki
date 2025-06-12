#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to slugify spell names for IDs
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[*]/g, '') // Remove asterisks
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Extract spell names from table rows
function extractSpellsFromTable(tableHtml) {
  const dom = new JSDOM(tableHtml);
  const document = dom.window.document;
  const rows = document.querySelectorAll('tbody tr');
  
  const spells = [];
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 2) {
      let spellName = cells[1].textContent.trim();
      
      // Clean up spell name - remove spell school abbreviations at the end
      // Pattern: spell name followed by space and 3-letter school code like "pro", "enc", etc.
      spellName = spellName.replace(/\s+(pro|enc|det|hea|dth|nec|ill|trn|eso|mov|bst|elm\([^)]*\)|wal|sum).*$/i, '');
      
      // Remove asterisks (mark reversible spells)
      spellName = spellName.replace(/[*]/g, '');
      
      // Trim any remaining whitespace
      spellName = spellName.trim();
      
      if (spellName) {
        spells.push(spellName);
      }
    }
  });
  
  return spells;
}

async function addSpellClasses() {
  try {
    console.log('🔮 Starting spell class assignment...\\n');

    // Load the spell lists data
    const spellListsPath = path.join(__dirname, '../converted/rulebook/55_spell_lists_&_repertoires.json');
    if (!fs.existsSync(spellListsPath)) {
      console.error('❌ Spell lists file not found:', spellListsPath);
      return;
    }

    const spellListsData = JSON.parse(fs.readFileSync(spellListsPath, 'utf8'));
    const dom = new JSDOM(spellListsData.html);
    const document = dom.window.document;

    // Extract class spell mappings
    const classSpellMappings = new Map();
    
    // Find all h6 headings (these are the class/list names)
    const classHeadings = document.querySelectorAll('h6');
    
    classHeadings.forEach(heading => {
      const className = heading.textContent.trim();
      console.log(`📖 Processing ${className}...`);
      
      // Map heading names to simplified class names
      let simplifiedClassName = '';
      if (className.includes('Arcane Spell List')) {
        simplifiedClassName = 'Mage';
      } else if (className.includes('Divine Spell List')) {
        simplifiedClassName = 'Cleric';
      } else if (className.includes('Bladedancer')) {
        simplifiedClassName = 'Bladedancer';
      } else if (className.includes('Crusader')) {
        simplifiedClassName = 'Crusader';
      } else if (className.includes('Priestess')) {
        simplifiedClassName = 'Priestess';
      } else if (className.includes('Shaman')) {
        simplifiedClassName = 'Shaman';
      }
      
      if (!simplifiedClassName) return;
      
      // Find all tables after this heading until the next h6
      let currentElement = heading.nextElementSibling;
      const classSpells = new Set();
      
      while (currentElement && currentElement.tagName !== 'H6') {
        if (currentElement.tagName === 'TABLE') {
          const spells = extractSpellsFromTable(currentElement.outerHTML);
          spells.forEach(spell => classSpells.add(spell));
        }
        currentElement = currentElement.nextElementSibling;
      }
      
      console.log(`  ✅ Found ${classSpells.size} spells for ${simplifiedClassName}`);
      
      // Add each spell to the mapping
      classSpells.forEach(spellName => {
        const spellId = slugify(spellName);
        if (!classSpellMappings.has(spellId)) {
          classSpellMappings.set(spellId, { name: spellName, classes: [] });
        }
        classSpellMappings.get(spellId).classes.push(simplifiedClassName);
      });
    });

    console.log(`\\n📊 Total unique spells mapped: ${classSpellMappings.size}`);

    // Load and update spell files
    const spellFiles = [
      { name: 'all-spells.json', path: path.join(__dirname, '../src/data/all-spells.json') },
      { name: 'real-spells.json', path: path.join(__dirname, '../src/data/real-spells.json') }
    ];

    for (const spellFile of spellFiles) {
      if (!fs.existsSync(spellFile.path)) {
        console.log(`⚠️  File not found: ${spellFile.name}`);
        continue;
      }

      console.log(`\\n📝 Updating ${spellFile.name}...`);
      const spells = JSON.parse(fs.readFileSync(spellFile.path, 'utf8'));
      let updatedCount = 0;
      let notFoundCount = 0;

      spells.forEach(spell => {
        const spellName = spell.name;
        if (!spellName) return;
        
        const spellId = slugify(spellName);
        const classMapping = classSpellMappings.get(spellId);
        
        if (classMapping) {
          spell.classes = [...new Set(classMapping.classes)]; // Remove duplicates
          updatedCount++;
          console.log(`  ✅ Updated: ${spellName} → [${spell.classes.join(', ')}]`);
        } else {
          console.log(`  ⚠️  No class mapping found for: ${spellName}`);
          notFoundCount++;
        }
      });

      // Save updated file
      fs.writeFileSync(spellFile.path, JSON.stringify(spells, null, 2));
      console.log(`  📊 Updated ${updatedCount} spells, ${notFoundCount} not found`);
    }

    // Show sample class distributions
    console.log('\\n🎯 Sample class distributions:');
    const classDistribution = new Map();
    classSpellMappings.forEach(({ classes }) => {
      classes.forEach(className => {
        classDistribution.set(className, (classDistribution.get(className) || 0) + 1);
      });
    });

    classDistribution.forEach((count, className) => {
      console.log(`  📊 ${className}: ${count} spells`);
    });

    console.log('\\n🎉 Spell class assignment completed successfully!');

  } catch (error) {
    console.error('❌ Error adding spell classes:', error);
    throw error;
  }
}

// Run the script
addSpellClasses().catch(console.error); 