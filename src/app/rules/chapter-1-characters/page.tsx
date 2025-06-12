import { Metadata } from 'next';
import ChapterTemplate from '@/components/rulebook/chapter-template';

// Chapter content defined locally to avoid fs import issues
const CHAPTER_CONTENT = {
  id: 'chapter-1-characters',
  chapterNumber: 1,
  title: 'Characters',
  description: 'Character creation, attributes, and basic character mechanics',
  introduction: `Characters are the heroes of your ACKS II adventures. This chapter covers everything needed to create memorable characters, from determining their basic attributes to understanding their capabilities and limitations.

Whether you're creating a mighty fighter, a cunning thief, or a wise mage, this chapter provides the foundation for bringing your character to life in the world of ACKS II.`,
  sections: [
    {
      id: 'character-creation',
      title: 'Character Creation',
      level: 2,
      content: `<h1>Creating a Character</h1>

<p>Creating a character in ACKS II follows a structured process that ensures balanced and interesting characters. The steps include:</p>

<ol>
<li><strong>Roll Ability Scores:</strong> Determine your character's six ability scores using 3d6 for each.</li>
<li><strong>Choose a Class:</strong> Select from the available classes based on your ability scores and preferences.</li>
<li><strong>Calculate Secondary Characteristics:</strong> Determine hit points, armor class, and other derived values.</li>
<li><strong>Select Proficiencies:</strong> Choose starting proficiencies based on your class and Intelligence.</li>
<li><strong>Determine Background:</strong> Establish your character's homeland, languages, and starting age.</li>
<li><strong>Purchase Equipment:</strong> Buy starting gear with your beginning funds.</li>
<li><strong>Final Details:</strong> Add personality, appearance, and other character details.</li>
</ol>

<h2>Ability Scores</h2>
<p>The six ability scores form the foundation of your character:</p>

<ul>
<li><strong>Strength (STR):</strong> Physical power and muscle</li>
<li><strong>Intelligence (INT):</strong> Reasoning ability and memory</li>
<li><strong>Wisdom (WIS):</strong> Awareness and insight</li>
<li><strong>Dexterity (DEX):</strong> Agility and reflexes</li>
<li><strong>Constitution (CON):</strong> Health and endurance</li>
<li><strong>Charisma (CHA):</strong> Force of personality and leadership</li>
</ul>`
    },
    {
      id: 'ability-modifiers',
      title: 'Ability Score Modifiers',
      level: 2,
      content: `<h1>Ability Score Modifiers</h1>

<p>Each ability score provides a modifier that affects various game mechanics:</p>

<table>
<thead>
<tr><th>Score</th><th>Modifier</th></tr>
</thead>
<tbody>
<tr><td>3</td><td>-3</td></tr>
<tr><td>4-5</td><td>-2</td></tr>
<tr><td>6-8</td><td>-1</td></tr>
<tr><td>9-12</td><td>0</td></tr>
<tr><td>13-15</td><td>+1</td></tr>
<tr><td>16-17</td><td>+2</td></tr>
<tr><td>18</td><td>+3</td></tr>
</tbody>
</table>

<p>These modifiers apply to various rolls and calculations throughout the game.</p>`
    },
    {
      id: 'secondary-characteristics',
      title: 'Secondary Characteristics',
      level: 2,
      content: `<h1>Secondary Characteristics</h1>

<p>Several important characteristics are derived from your ability scores and class:</p>

<h2>Hit Points</h2>
<p>Hit points represent your character's ability to avoid or absorb damage. You start with maximum hit points for your class's hit die plus your Constitution modifier.</p>

<h2>Armor Class</h2>
<p>Armor Class (AC) determines how difficult you are to hit in combat. It's calculated as 10 + Dexterity modifier + armor bonus + shield bonus.</p>

<h2>Attack Throws</h2>
<p>Your base attack throw determines your accuracy in combat. This improves as you gain levels in your chosen class.</p>

<h2>Saving Throws</h2>
<p>Five saving throws protect against different threats:</p>
<ul>
<li>Petrification & Paralysis</li>
<li>Poison & Death</li>
<li>Blast & Breath</li>
<li>Staffs & Wands</li>
<li>Spells</li>
</ul>`
    }
  ]
};

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Chapter ${CHAPTER_CONTENT.chapterNumber}: ${CHAPTER_CONTENT.title} | ACKS II Rulebook`,
    description: CHAPTER_CONTENT.description,
  };
}

/**
 * Chapter 1: Characters Page
 * 
 * ACKS II Rulebook - Chapter 1
 */
export default function Chapter1CharactersPage() {
  const navigation = {
    next: {
      href: '/rules/chapter-2-classes',
      title: 'Chapter 2: Classes'
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
      nextChapter={navigation.next}
    />
  );
} 