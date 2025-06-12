import { Metadata } from 'next';
import ChapterTemplate from '@/components/rulebook/chapter-template';

/**
 * Chapter 2: Classes Page
 * 
 * ACKS II Rulebook - Chapter 2
 */

// Class categorization for Chapter 2 organization (copied locally to avoid fs imports)
const CLASS_CATEGORIES = {
  core: ['fighter.md', 'explorer.md', 'thief.md', 'mage.md', 'crusader.md', 'venturer.md'],
  campaign: ['assassin.md', 'barbarian.md', 'bard.md', 'bladedancer.md', 'paladin.md', 'priestess.md', 'shaman.md', 'warlock.md', 'witch.md'],
  demiHuman: ['dwarven_craftpriest.md', 'dwarven_vaultguard.md', 'elven_nightblade.md', 'elven_spellsword.md', 'nobiran_wonderworker.md', 'zaharan_ruinguard.md']
};

// Chapter content with organized class sections and navigation tables
const CHAPTER_CONTENT = {
  id: 'chapter-2-classes',
  chapterNumber: 2,
  title: 'Classes',
  description: 'Character classes with progression tables and class features',
  introduction: `Classes define what your character can do, how they progress, and what role they fill in an adventuring party. Each class has unique abilities, restrictions, and methods of advancement that shape the character's capabilities and playstyle.

ACKS II features three categories of classes: Core classes available to all campaigns, Campaign classes for specific settings and themes, and Demi-Human classes for non-human characters. Each class offers a distinct path through the game world.`,
  sections: [
    {
      id: 'character-templates-and-intellect-scores',
      title: 'Character Templates and Intellect Scores',
      level: 2,
      content: `<h1>Character Templates and Intellect Scores</h1>

<p>Character templates provide ready-made character concepts that combine class features with background elements. These templates help new players quickly create interesting characters while showing experienced players different ways to approach familiar classes.</p>

<h2>Using Templates</h2>
<p>Templates are optional tools that:</p>
<ul>
<li>Suggest ability score priorities for optimal performance</li>
<li>Recommend starting proficiencies that fit the character concept</li>
<li>Provide background elements like homeland and social class</li>
<li>Offer roleplaying guidance and character motivations</li>
</ul>

<h2>Intellect Scores and Spellcasting</h2>
<p>Spellcasting classes use their key ability score to determine:</p>
<ul>
<li><strong>Maximum Spell Level:</strong> The highest level of spells the character can cast</li>
<li><strong>Bonus Spells:</strong> Additional spells per day based on high ability scores</li>
<li><strong>Spell Success:</strong> The chance of successfully casting spells</li>
</ul>

<table>
<thead>
<tr><th>Ability Score</th><th>Max Spell Level</th><th>Bonus 1st</th><th>Bonus 2nd</th><th>Bonus 3rd</th><th>Bonus 4th</th><th>Bonus 5th</th><th>Bonus 6th</th></tr>
</thead>
<tbody>
<tr><td>9-11</td><td>4th</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>12</td><td>5th</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>13</td><td>6th</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>14</td><td>6th</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>15</td><td>6th</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>16</td><td>6th</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>17</td><td>6th</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>18</td><td>6th</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td></tr>
</tbody>
</table>`
    },
    {
      id: 'core-classes',
      title: 'Core Classes',
      level: 2,
      content: generateClassSectionContent('Core Classes', 'The fundamental character classes available to all players', CLASS_CATEGORIES.core)
    },
    {
      id: 'campaign-classes',
      title: 'Campaign Classes',
      level: 2,
      content: generateClassSectionContent('Campaign Classes', 'Specialized classes for specific campaign settings and themes', CLASS_CATEGORIES.campaign)
    },
    {
      id: 'demi-human-classes',
      title: 'Demi-Human Classes',
      level: 2,
      content: generateClassSectionContent('Demi-Human Classes', 'Racial classes for non-human characters', CLASS_CATEGORIES.demiHuman)
    }
  ]
};

function generateClassSectionContent(title: string, description: string, classFiles: string[]) {
  let content = `<h2>${title}</h2>\n\n<p>${description}</p>\n\n`;
  
  // Add class navigation table
  content += `<table>\n<thead>\n<tr><th>Class</th><th>Key Attribute</th><th>Hit Dice</th><th>Max Level</th><th>Description</th></tr>\n</thead>\n<tbody>\n`;
  
  // Class data extracted from the files (simplified for this example)
  const classData: { [key: string]: any } = {
    'fighter.md': {
      name: 'Fighter',
      keyAttr: 'Strength',
      hitDice: 'd8',
      maxLevel: '14',
      description: 'A master of weapons and warfare, trained in all forms of combat'
    },
    'explorer.md': {
      name: 'Explorer',
      keyAttr: 'Dexterity',
      hitDice: 'd6',
      maxLevel: '14',
      description: 'A skilled scout and outdoorsman, at home in the wilderness'
    },
    'thief.md': {
      name: 'Thief',
      keyAttr: 'Dexterity',
      hitDice: 'd4',
      maxLevel: '14',
      description: 'A cunning rogue who relies on stealth and guile'
    },
    'mage.md': {
      name: 'Mage',
      keyAttr: 'Intelligence',
      hitDice: 'd4',
      maxLevel: '14',
      description: 'A scholar of arcane magic who wields powerful spells'
    },
    'crusader.md': {
      name: 'Crusader',
      keyAttr: 'Wisdom',
      hitDice: 'd8',
      maxLevel: '14',
      description: 'A holy warrior who combines martial prowess with divine magic'
    },
    'venturer.md': {
      name: 'Venturer',
      keyAttr: 'Charisma',
      hitDice: 'd6',
      maxLevel: '14',
      description: 'A charismatic leader focused on trade and negotiation'
    },
    'assassin.md': {
      name: 'Assassin',
      keyAttr: 'Dexterity',
      hitDice: 'd6',
      maxLevel: '14',
      description: 'A deadly killer who strikes from the shadows'
    },
    'barbarian.md': {
      name: 'Barbarian',
      keyAttr: 'Strength',
      hitDice: 'd8',
      maxLevel: '14',
      description: 'A fierce warrior from uncivilized lands'
    },
    'bard.md': {
      name: 'Bard',
      keyAttr: 'Charisma',
      hitDice: 'd6',
      maxLevel: '14',
      description: 'A performer and storyteller with magical abilities'
    },
    'bladedancer.md': {
      name: 'Bladedancer',
      keyAttr: 'Dexterity',
      hitDice: 'd6',
      maxLevel: '14',
      description: 'A graceful warrior-dancer who fights with finesse'
    },
    'paladin.md': {
      name: 'Paladin',
      keyAttr: 'Charisma',
      hitDice: 'd8',
      maxLevel: '14',
      description: 'A righteous champion dedicated to law and good'
    },
    'priestess.md': {
      name: 'Priestess',
      keyAttr: 'Wisdom',
      hitDice: 'd6',
      maxLevel: '14',
      description: 'A female servant of the divine with healing powers'
    },
    'shaman.md': {
      name: 'Shaman',
      keyAttr: 'Wisdom',
      hitDice: 'd6',
      maxLevel: '14',
      description: 'A spiritual guide who communes with nature spirits'
    },
    'warlock.md': {
      name: 'Warlock',
      keyAttr: 'Intelligence',
      hitDice: 'd6',
      maxLevel: '14',
      description: 'A male practitioner of eldritch magic and forbidden lore'
    },
    'witch.md': {
      name: 'Witch',
      keyAttr: 'Intelligence',
      hitDice: 'd4',
      maxLevel: '14',
      description: 'A female practitioner of eldritch magic and forbidden lore'
    },
    'dwarven_craftpriest.md': {
      name: 'Dwarven Craftpriest',
      keyAttr: 'Wisdom',
      hitDice: 'd8',
      maxLevel: '10',
      description: 'A dwarven cleric who blesses forge and battle'
    },
    'dwarven_vaultguard.md': {
      name: 'Dwarven Vaultguard',
      keyAttr: 'Strength',
      hitDice: 'd10',
      maxLevel: '12',
      description: 'A dwarven fighter specialized in defending strongholds'
    },
    'elven_nightblade.md': {
      name: 'Elven Nightblade',
      keyAttr: 'Intelligence',
      hitDice: 'd6',
      maxLevel: '11',
      description: 'An elven spellsword who blends magic and combat'
    },
    'elven_spellsword.md': {
      name: 'Elven Spellsword',
      keyAttr: 'Intelligence',
      hitDice: 'd6',
      maxLevel: '10',
      description: 'An elven warrior-mage trained in both arts'
    },
    'nobiran_wonderworker.md': {
      name: 'Nobiran Wonderworker',
      keyAttr: 'Intelligence',
      hitDice: 'd4',
      maxLevel: '11',
      description: 'A Nobiran mage specializing in illusion and enchantment'
    },
    'zaharan_ruinguard.md': {
      name: 'Zaharan Ruinguard',
      keyAttr: 'Intelligence',
      hitDice: 'd6',
      maxLevel: '10',
      description: 'A Zaharan warrior who protects ancient ruins and secrets'
    }
  };
  
  for (const classFile of classFiles) {
    const data = classData[classFile];
    if (data) {
      const classId = classFile.replace('.md', '').replace(/_/g, '-');
      content += `<tr><td><a href="/classes/${classId}"><strong>${data.name}</strong></a></td><td>${data.keyAttr}</td><td>${data.hitDice}</td><td>${data.maxLevel}</td><td>${data.description}</td></tr>\n`;
    }
  }
  
  content += `</tbody>\n</table>\n\n`;
  content += `<p>Click on any class name above to view detailed information including progression tables, special abilities, and recommended proficiencies.</p>`;
  
  return content;
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Chapter ${CHAPTER_CONTENT.chapterNumber}: ${CHAPTER_CONTENT.title} | ACKS II Rulebook`,
    description: CHAPTER_CONTENT.description,
  };
}

export default function Chapter2ClassesPage() {
  const navigation = {
    previous: {
      href: '/rules/chapter-1-characters',
      title: 'Chapter 1: Characters'
    },
    next: {
      href: '/rules/chapter-3-proficiencies',
      title: 'Chapter 3: Proficiencies'
    }
  };

  return (
    <ChapterTemplate
      chapterNumber={CHAPTER_CONTENT.chapterNumber}
      title={CHAPTER_CONTENT.title}
      description={CHAPTER_CONTENT.description}
      introduction={CHAPTER_CONTENT.introduction}
      sections={CHAPTER_CONTENT.sections.map(section => ({
        ...section,
        content: <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: section.content }} />
      }))}
      previousChapter={navigation.previous}
      nextChapter={navigation.next}
    />
  );
} 