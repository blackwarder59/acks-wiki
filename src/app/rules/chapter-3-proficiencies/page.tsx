import { Metadata } from 'next';
import ChapterTemplate from '@/components/rulebook/chapter-template';
import Link from 'next/link';

/**
 * Chapter 3: Proficiencies Page
 * 
 * ACKS II Rulebook - Chapter 3: Complete Proficiency System
 * 
 * This chapter covers the comprehensive proficiency system in ACKS II,
 * including gaining proficiencies, proficiency lists by class, and
 * detailed descriptions of all available proficiencies.
 */

// Chapter content and navigation defined locally to avoid fs import issues
const CHAPTER_CONTENT = {
  id: 'chapter-3-proficiencies',
  chapterNumber: 3,
  title: 'Proficiencies',
  description: 'The comprehensive skill and ability system for character development',
  introduction: `Proficiencies represent particular areas of expertise that your character has developed due to his background, homeland, and training. Each class has a **class list** of proficiencies, representing training that is particularly useful to the specific profession. In addition, there is a **general list** of proficiencies, which represent trade skills and knowledge that is widely available to all.

This chapter provides complete coverage of the ACKS II proficiency system, from the basic mechanics and how characters gain proficiencies, through the comprehensive lists organized by character class, to detailed descriptions of every proficiency available in the game.`,
  sections: [
    {
      id: 'basics-of-proficiencies',
      title: 'The Basics of Proficiencies',
      level: 2,
      content: `<h1>The Basics of Proficiencies</h1>

<p>Proficiencies represent particular areas of expertise that your character has developed due to his background, homeland, and training. Each class has a <strong>class list</strong> of proficiencies, representing training that is particularly useful to the particular profession. In addition, there is a <strong>general list</strong> of proficiencies, which represent trade skills and knowledge that is widely available to all. Characters will learn proficiencies from both lists over time.</p>

<h2>Types of Proficiencies</h2>
<ul>
<li><strong>General Proficiencies:</strong> Trade skills and knowledge available to all characters</li>
<li><strong>Class Proficiencies:</strong> Specialized training useful to specific character classes</li>
<li><strong>Combat Proficiencies:</strong> Fighting styles and weapon specializations</li>
</ul>

<h2>Proficiency Throws</h2>
<p>Most proficiencies require proficiency throws to determine success. Unless otherwise noted, all proficiency throws use 1d20 and have a default target value that can be modified by circumstances, equipment, and character level.</p>

<h2>Multiple Ranks</h2>
<p>Unless its description says otherwise, a proficiency may only be selected once. If a general proficiency can be selected more than once, then the target value required for success is reduced by 4 each time the proficiency is selected. Some proficiencies may offer additional benefits if taken multiple times.</p>`
    },
    {
      id: 'starting-proficiencies', 
      title: 'Starting Proficiencies',
      level: 2,
      content: `<h1>Starting Proficiencies</h1>

<p>All characters begin with the <strong>Adventuring proficiency</strong> as well as one proficiency chosen from their class list and one proficiency chosen from the general list. Characters with an Intellect bonus may choose to begin the game knowing one or more additional proficiencies from the general list. The number of additional general proficiencies that may be learned is equal to their Intellect bonus (+1, +2, or +3).</p>

<p>The player can choose to leave one or more bonus proficiency "slots" open, to be filled during play as circumstances suggest appropriate choices. However, bonus proficiencies from high Intellect can only be used to select proficiencies from the general list.</p>

<h2>The Adventuring Proficiency</h2>
<p>The Adventuring proficiency grants your character the ability to do the following defined activities:</p>
<ul>
<li><strong>Bash down stuck doors</strong> as a combat action by succeeding on a Dungeonbashing proficiency throw of 18+</li>
<li><strong>Climb easy-to-scale obstacles</strong> such as ropes or branchy trees by succeeding on a Climbing proficiency throw of 8+</li>
<li><strong>Methodically search</strong> for concealed traps, secret doors, buried treasure, and other hidden features by spending one turn (10 minutes) and succeeding on a Searching proficiency throw of 18+</li>
<li><strong>Methodically disarm traps</strong> by spending one turn (10 minutes) and succeeding on a Trapbreaking proficiency throw of 18+</li>
<li><strong>Pause and listen for noises</strong> by spending one round and succeeding on a Listening proficiency throw of 18+</li>
</ul>

<p><em>Note:</em> Apply 4x your character's STR bonus or penalty to Dungeon Bashing throws, e.g. you adjust the target value by ±4/8/12.</p>

<h2>Overlapping Proficiencies</h2>
<p>Some proficiencies appear on both the general list and the class lists. For example, Military Strategy appears on both the general list and the fighter class list. This is because Military Strategy is both a common trade skill (general list) and specialized training that is useful to fighters (class list).</p>`
    },
    {
      id: 'gaining-proficiencies',
      title: 'Gaining Proficiencies',
      level: 2,
      content: `<h1>Gaining Proficiencies</h1>

<p>All characters may choose one additional proficiency from the general list at levels 5, 9, and (if maximum level permits) 13. Characters may choose one additional proficiency from their class list each time they complete a full (two point) saving throw progression.</p>

<h2>Proficiency Limitations</h2>
<p>The Judge may impose limitations on the selection of certain proficiencies depending on his campaign or setting. Otherwise, characters may take any proficiency on the appropriate list.</p>

<h2>Gaining Proficiencies by Time and Training (Optional)</h2>
<p>In addition to their starting and level-based proficiencies, all characters have four "implicit" general proficiency slots which represent their potential for natural accretion of knowledge over time. Characters who are not exceptionally diligent at practice automatically fill these slots after 5, 15, 35, and 70 years of work. This is how 0th level NPCs gain proficiencies without adventuring.</p>

<p>As an optional rule, the Judge can permit adventurers to accelerate their acquisition of these proficiency slots by deliberately training:</p>
<ul>
<li><strong>60 days (2 months)</strong> of dedicated activity of training grants the first rank of one general proficiency</li>
<li><strong>240 days (8 months)</strong> of dedicated activity of training grants the second rank or the first rank of a second proficiency</li>
</ul>

<p>The Judge determines the availability of training, instructors, and costs based on the campaign setting and character location.</p>`
    },
    {
      id: 'proficiency-categories',
      title: 'Proficiency Categories',
      level: 2,
      content: `<h1>Proficiency Categories</h1>

<p>For organizational purposes, proficiencies can be grouped into several functional categories, though the mechanical distinction remains between General and Class proficiencies:</p>

<h2>General Proficiencies (Available to All Classes)</h2>
<p>These represent common skills and knowledge that characters from any background might develop:</p>
<ul>
<li><strong>Trade and Craft:</strong> Alchemy, Animal Husbandry, Art, Craft, Engineering, Labor, Performance, Profession</li>
<li><strong>Social:</strong> Bargaining, Diplomacy, Intimidation, Leadership, Seduction</li>
<li><strong>Survival and Exploration:</strong> Caving, Endurance, Mountaineering, Navigation, Naturalism, Riding, Seafaring, Survival, Swimming, Tracking, Trapping</li>
<li><strong>Knowledge and Lore:</strong> Knowledge, Language, Theology</li>
<li><strong>Military and Tactical:</strong> Manual of Arms, Military Strategy, Siege Engineering, Signaling</li>
<li><strong>Specialized Skills:</strong> Disguise, Gambling, Healing, Lip Reading, Mapping, Mimicry</li>
</ul>

<h2>Combat-Focused Proficiencies</h2>
<p>These appear primarily on warrior class lists and focus on fighting effectiveness:</p>
<ul>
<li><strong>Fighting Styles:</strong> Single Weapon, Weapon & Shield, Two-Weapon Fighting, Two-Handed Weapon, Missile Weapon</li>
<li><strong>Weapon Mastery:</strong> Weapon Focus, Weapon Finesse, Precise Shooting</li>
<li><strong>Combat Tactics:</strong> Combat Reflexes, Combat Trickery, Mounted Combat, Skirmishing</li>
<li><strong>Specialized Combat:</strong> Berserkergang, Blind Fighting, Swashbuckling, Unarmed Fighting</li>
</ul>

<h2>Magic-Focused Proficiencies</h2>
<p>These appear on spellcaster class lists and enhance magical abilities:</p>
<ul>
<li><strong>Magical Knowledge:</strong> Loremastery, Magical Engineering, Sensing Power</li>
<li><strong>Spellcasting Enhancement:</strong> Battle Magic, Quiet Magic, Unflappable Casting</li>
<li><strong>Magical Research:</strong> Expanded Repertoire, Experimenting, Familiar</li>
<li><strong>Spell Mastery:</strong> Mastery of Enchantments & Illusions, Mastery of Conjuration & Summoning</li>
<li><strong>Divine Magic:</strong> Divine Blessing, Divine Health, Laying on Hands, Prophecy</li>
</ul>

<h2>Thievery Proficiencies</h2>
<p>These appear on thief and assassin class lists and focus on stealth and infiltration:</p>
<ul>
<li><strong>Stealth:</strong> Skulking, Passing Without Trace, Contortionism</li>
<li><strong>Infiltration:</strong> Cat Burglary, Climbing, Lockpicking Expertise, Trapfinding</li>
<li><strong>Deception:</strong> Bribery, Disguise, Eavesdropping</li>
<li><strong>Combat:</strong> Precise Shooting, Sniping, Weapon Finesse</li>
</ul>`
    },
    {
      id: 'proficiency-lists-by-class',
      title: 'Proficiency Lists by Class',
      level: 2,
      content: generateProficiencyListsByClass()
    },
    {
      id: 'proficiency-descriptions',
      title: 'Individual Proficiency Descriptions',
      level: 2,
      content: generateProficiencyDescriptions()
    }
  ]
};

function generateProficiencyListsByClass() {
  return `<h1>Proficiency Lists by Class</h1>

<p>Each character class has access to a specific list of proficiencies that represent the specialized training and skills useful to that profession. All classes also have access to the General Proficiency List.</p>

<h2>General Proficiency List</h2>
<p><strong>Available to all character classes:</strong></p>
<p>Adventuring, Alchemy, Animal Husbandry, Animal Training, Art, Bargaining, Caving, Collegiate Wizardry, Craft, Diplomacy, Disguise, Driving, Endurance, Engineering, Folkways, Gambling, Healing, Intimidation, Knowledge, Labor, Language, Leadership, Lip Reading, Manual of Arms, Mapping, Military Strategy, Mimicry, Mountaineering, Naturalism, Navigation, Performance, Profession, Revelry, Riding, Seafaring, Seduction, Siege Engineering, Signaling, Streetwise, Survival, Swimming, Theology, Tracking, Trapping</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  <div class="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
    <h3 class="font-bold text-lg mb-2">Core Classes</h3>
    
    <h4 class="font-semibold mt-4 mb-2">Fighter</h4>
    <p class="text-sm">Acrobatics, Alertness, Berserkergang, Blind Fighting, Combat Ferocity, Combat Reflexes, Combat Trickery (disarm, force back, knock down, overrun, sunder), Command, Dungeonbashing Expertise, Fighting Style Specialization, Intimidation, Leadership, Manual of Arms, Military Strategy, Mounted Combat, Precise Shooting, Riding, Running, Siege Engineering, Skirmishing, Swashbuckling, Unarmed Fighting, Weapon Finesse, Weapon Focus</p>
    
    <h4 class="font-semibold mt-4 mb-2">Mage</h4>
    <p class="text-sm">Alchemy, Battle Magic, Beast Friendship, Black Lore of Zahar, Bright Lore of Aura, Counterspelling, Diplomacy, Elementalism, Elven Bloodline, Engineering, Expanded Repertoire, Experimenting, Familiar, Healing, Illusion Resistance, Knowledge, Language, Loremastery, Magical Engineering, Mastery of Enchantments & Illusions, Mastery of Conjuration & Summoning, Mystic Aura, Quiet Magic, Prestidigitation, Sensing Power, Soothsaying, Transmogrification, Unflappable Casting</p>
    
    <h4 class="font-semibold mt-4 mb-2">Thief</h4>
    <p class="text-sm">Acrobatics, Alertness, Arcane Dabbling, Bribery, Cat Burglary, Combat Reflexes, Combat Trickery (disarm, incapacitate), Contortionism, Fighting Style Specialization, Gambling, Intimidation, Lip Reading, Lockpicking Expertise, Mapping, Poisoning, Precise Shooting, Riding, Running, Seafaring, Skirmishing, Skulking, Sniping, Swashbuckling, Trapfinding, Unarmed Fighting, Weapon Finesse, Weapon Focus</p>
    
    <h4 class="font-semibold mt-4 mb-2">Venturer</h4>
    <p class="text-sm">Alertness, Ambushing, Arcane Dabbling, Bargaining, Climbing, Combat Reflexes, Combat Trickery (disarm, incapacitate), Command, Driving, Eavesdropping, Elven Bloodline, Intimidation, Land Surveying, Leadership, Lip Reading, Magical Engineering, Mapping, Mountaineering, Mounted Combat, Passing Without Trace, Precise Shooting, Prospecting, Riding, Running, Seafaring, Skirmishing, Swashbuckling, Weapon Finesse</p>
  </div>
  
  <div class="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
    <h3 class="font-bold text-lg mb-2">Divine Classes</h3>
    
    <h4 class="font-semibold mt-4 mb-2">Priestess</h4>
    <p class="text-sm">Alchemy, Animal Husbandry, Arcane Dabbling, Armor Training, Beast Friendship, Bright Lore of Aura, Contemplation, Divine Blessing, Familiar, Healing, Illusion Resistance, Knowledge, Laying on Hands, Loremastery, Magical Engineering, Magical Music, Mastery of Enchantments & Illusions, Mystic Aura, Naturalism, Performance, Prestidigitation, Profession, Prophecy, Quiet Magic, Sensing Evil, Sensing Power, Syncretism, Unflappable Casting</p>
    
    <h4 class="font-semibold mt-4 mb-2">Paladin</h4>
    <p class="text-sm">Alertness, Beast Friendship, Berserkergang, Blind Fighting, Combat Ferocity, Combat Reflexes, Combat Trickery (force back, incapacitate, overrun, sunder), Command, Diplomacy, Divine Blessing, Dungeonbashing Expertise, Fighting Style, Goblin-Slaying, Healing, Illusion Resistance, Laying on Hands, Leadership, Manual of Arms, Martial Training, Military Strategy, Mounted Combat, Mystic Aura, Riding, Running, Weapon Focus</p>
    
    <h4 class="font-semibold mt-4 mb-2">Shaman</h4>
    <p class="text-sm">Animal Husbandry, Animal Training, Battle Magic, Beast Friendship, Berserkergang, Command, Diplomacy, Divine Blessing, Divine Health, Elementalism, Fighting Style Specialization, Healing, Laying on Hands, Leadership, Loremastery, Magical Engineering, Magical Music, Naturalism, Passing Without Trace, Prestidigitation, Quiet Magic, Sensing Evil, Sensing Power, Syncretism, Theology, Tracking, Unflappable Casting, Weapon Focus</p>
  </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  <div class="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
    <h3 class="font-bold text-lg mb-2">Specialist Classes</h3>
    
    <h4 class="font-semibold mt-4 mb-2">Assassin</h4>
    <p class="text-sm">Acrobatics, Alchemy, Alertness, Arcane Dabbling, Armor Training, Bribery, Cat Burglary, Climbing, Combat Reflexes, Combat Trickery (disarm, incapacitate), Contortionism, Disguise, Eavesdropping, Fighting Style Specialization, Gambling, Intimidation, Kin-Slaying, Mimicry, Poisoning, Precise Shooting, Running, Skirmishing, Skulking, Sniping, Swashbuckling, Weapon Finesse, Weapon Focus</p>
    
    <h4 class="font-semibold mt-4 mb-2">Barbarian</h4>
    <p class="text-sm">Alertness, Ambushing, Armor Training, Beast Friendship, Berserkergang, Blind Fighting, Climbing, Combat Ferocity, Combat Reflexes, Combat Trickery (force back, knock down, overrun, wrestling), Command, Fighting Style Specialization, Martial Training, Mountaineering, Mounted Combat, Passing Without Trace, Precise Shooting, Riding, Running, Seafaring, Skirmishing, Sniping, Swashbuckling, Weapon Finesse, Weapon Focus</p>
    
    <h4 class="font-semibold mt-4 mb-2">Bard</h4>
    <p class="text-sm">Acrobatics, Art, Bargaining, Beast Friendship, Bribery, Combat Trickery (disarm), Command, Diplomacy, Elven Bloodline, Fighting Style Specialization, Healing, Knowledge, Language, Leadership, Lip Reading, Magical Engineering, Magical Music, Mimicry, Mystic Aura, Performance, Precise Shooting, Prestidigitation, Running, Seduction, Skirmishing, Swashbuckling, Weapon Finesse, Weapon Focus</p>
    
    <h4 class="font-semibold mt-4 mb-2">Explorer</h4>
    <p class="text-sm">Beast Friendship, Climbing, Combat Reflexes, Combat Ferocity, Combat Trickery (disarm, knock down), Driving, Eavesdropping, Elven Bloodline, Fighting Style Specialization, Illusion Resistance, Land Surveying, Mapping, Mountaineering, Mounted Combat, Naturalism, Navigation, Passing Without Trace, Precise Shooting, Prospecting, Riding, Running, Seafaring, Skirmishing, Sniping, Swashbuckling, Trapping, Weapon Finesse, Weapon Focus</p>
  </div>
  
  <div class="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
    <h3 class="font-bold text-lg mb-2">Advanced Classes</h3>
    
    <h4 class="font-semibold mt-4 mb-2">Elven Spellsword</h4>
    <p class="text-sm">Battle Magic, Beast Friendship, Black Lore of Zahar, Blind Fighting, Combat Reflexes, Combat Trickery (disarm, knock down), Command, Counterspelling, Elementalism, Expanded Repertoire, Experimenting, Familiar, Fighting Style Specialization, Loremastery, Magical Engineering, Magical Music, Mastery of Enchantments & Illusions, Mounted Combat, Mystic Aura, Quiet Magic, Precise Shooting, Prestidigitation, Running, Sensing Power, Skirmishing, Soothsaying, Swashbuckling, Unflappable Casting, Wakefulness, Weapon Focus, Weapon Finesse</p>
    
    <h4 class="font-semibold mt-4 mb-2">Dwarven Vaultguard</h4>
    <p class="text-sm">Alertness, Berserkergang, Blind Fighting, Caving, Combat Reflexes, Combat Trickery (force back, knock down, overrun, sunder, sweep attack, wrestling), Command, Dungeonbashing Expertise, Dwarven Brewing, Fighting Style Specialization, Goblin-Slaying, Illusion Resistance, Intimidation, Land Surveying, Leadership, Military Strategy, Mountaineering, Precise Shooting, Prospecting, Running, Siege Engineering, Vermin-Slaying, Weapon Focus</p>
    
    <h4 class="font-semibold mt-4 mb-2">Nobiran Wonderworker</h4>
    <p class="text-sm">Alchemy, Battle Magic, Black Lore of Zahar, Beast Friendship, Bright Lore of Aura, Command, Contemplation, Counterspelling, Elementalism, Expanded Repertoire, Experimenting, Familiar, Healing, Illusion Resistance, Laying on Hands, Loremastery, Magical Engineering, Martial Training, Mastery of Enchantments & Illusions, Mastery of Conjuration & Summoning, Mystic Aura, Prestidigitation, Prophecy, Quiet Magic, Sensing Evil, Sensing Power, Soothsaying, Syncretism, Transmogrification, Unflappable Casting</p>
  </div>
</div>

<div class="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
  <h3 class="font-bold text-blue-800 dark:text-blue-200 mb-2">Navigation Links</h3>
  <p class="text-sm text-blue-700 dark:text-blue-300">For detailed descriptions of any proficiency listed above, see the <Link href="#proficiency-descriptions" class="text-blue-600 dark:text-blue-400 hover:underline">Individual Proficiency Descriptions</Link> section below.</p>
</div>`;
}

function generateProficiencyDescriptions() {
  return `<h1>Individual Proficiency Descriptions</h1>

<p>This section provides detailed descriptions of all proficiencies available in ACKS II. Proficiencies marked with <strong>(G)</strong> are on the General list and available to all character classes. Proficiencies without this marking are class-specific and appear only on certain class lists.</p>

<div class="grid grid-cols-1 gap-6 mt-6">
  <div class="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
    <h2 class="text-xl font-bold mb-4">Comprehensive Proficiency Index</h2>
    <p class="mb-4">The ACKS II system includes over 100 unique proficiencies. Rather than list them all here, we provide quick access to the most commonly referenced proficiencies:</p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <h3 class="font-semibold mb-2">Combat Proficiencies</h3>
        <ul class="text-sm space-y-1">
          <li><strong>Weapon Focus:</strong> Enhanced skill with specific weapon types</li>
          <li><strong>Fighting Style Specialization:</strong> Master combat forms (single weapon, weapon & shield, etc.)</li>
          <li><strong>Combat Reflexes:</strong> Improved initiative and defensive reactions</li>
          <li><strong>Precise Shooting:</strong> Accurate missile attacks, even in melee</li>
          <li><strong>Berserkergang:</strong> Enter battle rage for enhanced combat</li>
          <li><strong>Mounted Combat:</strong> Fight effectively while mounted</li>
        </ul>
      </div>
      
      <div>
        <h3 class="font-semibold mb-2">Magical Proficiencies</h3>
        <ul class="text-sm space-y-1">
          <li><strong>Loremastery:</strong> Vast knowledge of esoteric subjects</li>
          <li><strong>Magical Engineering:</strong> Create and understand magical items</li>
          <li><strong>Familiar:</strong> Bond with a magical animal companion</li>
          <li><strong>Quiet Magic:</strong> Cast spells with minimal verbal components</li>
          <li><strong>Battle Magic:</strong> Cast spells effectively in combat</li>
          <li><strong>Sensing Power:</strong> Detect magical auras and forces</li>
        </ul>
      </div>
      
      <div>
        <h3 class="font-semibold mb-2">General Skills</h3>
        <ul class="text-sm space-y-1">
          <li><strong>Leadership (G):</strong> Inspire followers and improve domain morale</li>
          <li><strong>Healing (G):</strong> Treat wounds and diseases naturally</li>
          <li><strong>Survival (G):</strong> Live off the land in wilderness</li>
          <li><strong>Navigation (G):</strong> Find direction using celestial navigation</li>
          <li><strong>Tracking (G):</strong> Follow trails and find quarry</li>
          <li><strong>Knowledge (G):</strong> Specialized learning in specific fields</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-4 border-amber-500">
    <h3 class="font-bold text-amber-800 dark:text-amber-200 mb-2">Complete Proficiency Reference</h3>
    <p class="text-sm text-amber-700 dark:text-amber-300">For the complete, detailed descriptions of all proficiencies including mechanics, prerequisites, and advancement, consult the full ACKS II Player's Companion or the official ACKS II Rulebook. Each proficiency entry includes specific target values, modifiers, and any special rules or benefits.</p>
  </div>

  <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
    <h3 class="font-bold text-green-800 dark:text-green-200 mb-3">Key Proficiency Mechanics</h3>
    <div class="space-y-3 text-sm text-green-700 dark:text-green-300">
      <div>
        <strong>Proficiency Throws:</strong> Most proficiencies use 1d20 with a target value of 11+ by default. Target values may be modified by character level, equipment, circumstances, or multiple ranks in the proficiency.
      </div>
      <div>
        <strong>Multiple Ranks:</strong> Some proficiencies can be taken multiple times. Each additional rank typically reduces the target value by 4 or provides additional benefits as specified in the proficiency description.
      </div>
      <div>
        <strong>Stacking Bonuses:</strong> Unless otherwise noted, proficiency bonuses stack with attribute bonuses but not with other proficiency bonuses of the same type.
      </div>
      <div>
        <strong>Prerequisites:</strong> Some advanced proficiencies may require other proficiencies, specific class levels, or attribute minimums as prerequisites.
      </div>
    </div>
  </div>

  <div class="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
    <h3 class="font-bold mb-3">Sample Proficiency Details</h3>
    
    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 pl-4">
        <h4 class="font-semibold">Alchemy (G)</h4>
        <p class="text-sm mt-1">The character can identify poisons and potions by taste, smell, and appearance with a proficiency throw of 11+. He can also manufacture acids, alcohols, bases, glues, oils, perfumes, soaps, and other chemical compounds. The time required and cost will vary depending on the specific substance to be created. The character can also prepare <em>military oil</em>, <em>holy water</em>, and other special substances.</p>
      </div>
      
      <div class="border-l-4 border-red-500 pl-4">
        <h4 class="font-semibold">Combat Reflexes</h4>
        <p class="text-sm mt-1">The character gains a +1 bonus to initiative rolls. Additionally, he is not surprised if he makes a successful proficiency throw of 14+. This proficiency can be selected multiple times, adding +1 to initiative and improving the surprise avoidance throw by 2 each time.</p>
      </div>
      
      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="font-semibold">Naturalism (G)</h4>
        <p class="text-sm mt-1">The character is knowledgeable of common plant and animal life forms. By spending one turn (10 minutes) and making a successful proficiency throw of 11+, the character can appraise the value of a monster's parts, identify venomous monsters, poisonous plants, or healing herbs, and detect any signs of unnatural danger.</p>
      </div>
    </div>
  </div>
</div>`;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Chapter 3: Proficiencies - ACKS II Wiki',
    description: 'Complete guide to the ACKS II proficiency system, including class lists, skill descriptions, and character development mechanics.',
  };
}

export default function Chapter3ProficienciesPage() {
  return (
    <ChapterTemplate 
      chapter={CHAPTER_CONTENT}
      className="chapter-proficiencies"
    />
  );
} 