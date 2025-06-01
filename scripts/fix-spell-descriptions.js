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
    .replace(/[\*]/g, '') // Remove asterisks
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to extract description from spell HTML
function extractSpellDescription(html) {
  if (!html) return '';
  
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  // Get all paragraphs
  const paragraphs = Array.from(document.querySelectorAll('p'));
  
  if (paragraphs.length === 0) return '';
  
  // Skip the first paragraph which has the spell type/range/duration info
  // The actual description starts from the second paragraph onwards
  const descriptionParagraphs = paragraphs.slice(1);
  
  if (descriptionParagraphs.length === 0) return '';
  
  // Extract text content from remaining paragraphs
  let description = '';
  descriptionParagraphs.forEach(p => {
    const text = p.textContent.trim();
    if (text.length > 0) {
             if (description) description += '\n\n';
      description += text;
    }
  });
  
  return description.trim();
}

async function fixSpellDescriptions() {
  try {
    console.log('🔮 Starting spell description fix...\n');

    // Read the spell descriptions file
    console.log('📖 Reading spell descriptions from converted rulebook...');
    const spellDescriptionsPath = path.join(__dirname, '..', 'converted', 'rulebook', '56_spell_descriptions.json');
    
    if (!fs.existsSync(spellDescriptionsPath)) {
      throw new Error(`Spell descriptions file not found: ${spellDescriptionsPath}`);
    }
    
    const spellData = JSON.parse(fs.readFileSync(spellDescriptionsPath, 'utf8'));
    
    if (!spellData.sections || !Array.isArray(spellData.sections)) {
      throw new Error('No sections found in spell descriptions file');
    }
    
    console.log('🔍 Extracting spell descriptions from sections...');
    const spellDescriptions = new Map();
    
    // Process all sections looking for spells
    spellData.sections.forEach((section, index) => {
      const spellName = section.title?.trim();
      
      if (!spellName) {
        console.log(`⚠️  Section ${index} has no title, skipping`);
        return;
      }
      
      // Skip non-spell sections (like index, definitions, etc.)
      const skipSections = [
        'Spell Index', 'Spell Terms and Definitions', 'Affected Creature', 'Ally', 
        'Animal', 'Baseline Hit Dice', 'Beholding', 'Caster', 'Caster level', 
        'Concentration', 'Dead', 'Dispelled', 'Enchanted Creature', 'Enemy', 
        'Humanoid', 'Living', 'Indefinite', 'Object', 'Perpetual', 'Plant', 
        'Recipient', 'Sapiency', 'Special', 'Stationary Concentration', 
        'Structure', 'Target', 'Touch'
      ];
      
      if (skipSections.includes(spellName)) {
        return;
      }
      
      // Extract the description
      const description = extractSpellDescription(section.html);
      
      if (description && description.length > 50) { // Only count as found if we have substantial content
        const spellId = slugify(spellName);
        spellDescriptions.set(spellId, {
          name: spellName,
          description: description,
          html: section.html
        });
        console.log(`✅ Found description for: ${spellName}`);
      } else {
        console.log(`⚠️  No substantial description found for: ${spellName}`);
      }
    });

    console.log(`\n📊 Successfully extracted ${spellDescriptions.size} spell descriptions`);

    // Read existing spell files and update them
    const spellFiles = [
      { path: 'src/data/all-spells.json', name: 'all-spells.json' },
      { path: 'src/data/real-spells.json', name: 'real-spells.json' }
    ];

    for (const spellFile of spellFiles) {
      const filePath = path.join(__dirname, '..', spellFile.path);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${spellFile.name} not found, skipping`);
        continue;
      }

             console.log(`\n📝 Updating ${spellFile.name}...`);
      const spells = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      let updatedCount = 0;

      spells.forEach(spell => {
        // Use title if available, otherwise use name
        const spellName = spell.title || spell.name;
        if (!spellName) {
          console.log(`  ⚠️  Spell has no title or name, skipping:`, spell);
          return;
        }
        const spellId = slugify(spellName);
        const foundSpell = spellDescriptions.get(spellId);
        
        if (foundSpell) {
          // Update the spell with description
          spell.description = foundSpell.description;
          updatedCount++;
          console.log(`  ✅ Updated: ${spellName}`);
        } else {
          console.log(`  ⚠️  No description found for: ${spellName}`);
        }
      });

      // Write back the updated file
      fs.writeFileSync(filePath, JSON.stringify(spells, null, 2));
      console.log(`✅ Updated ${updatedCount} spells in ${spellFile.name}`);
    }

    // Display some sample descriptions
         console.log('\n🎯 Sample spell descriptions extracted:');
    let sampleCount = 0;
    for (const [id, spell] of spellDescriptions.entries()) {
      if (sampleCount >= 3) break;
             console.log(`\n📜 ${spell.name}:`);
      console.log(`   ${spell.description.substring(0, 200)}...`);
      sampleCount++;
    }

         console.log('\n🎉 Spell description fix completed successfully!');
    console.log(`📊 Total descriptions extracted: ${spellDescriptions.size}`);
    
  } catch (error) {
    console.error('❌ Error fixing spell descriptions:', error);
    process.exit(1);
  }
}

fixSpellDescriptions(); 