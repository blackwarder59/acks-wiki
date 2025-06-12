import { Metadata } from 'next';
import { ChapterTemplate } from '@/components/rulebook/chapter-template';

/**
 * Hirelings Section - Chapter 4 Equipment Subsection
 * Contains rules for hiring various types of NPCs and their costs
 * from ACKS II Rulebook file 45_hirelings_henchmen_mercenaries_and_specialists.md
 */

const HIRELINGS_CONTENT = {
  chapterNumber: '4',
  title: 'Hirelings, Henchmen, Mercenaries, and Specialists',
  description: 'Rules for hiring NPCs including costs, loyalty, and capabilities',
  introduction: 'Adventurers often need to hire various types of NPCs to assist them in their endeavors. This section covers the different types of hired help available and their costs.',
  sections: [
    {
      id: 'types-of-hired-help',
      title: 'Types of Hired Help',
      level: 2,
      content: `<p>There are several categories of hired NPCs, each with different capabilities, costs, and loyalty:</p>

<h3>Hirelings</h3>
<p>Hirelings are temporary employees hired for specific tasks or periods. They are not personally loyal to the employer and will abandon dangerous situations. Hirelings include:</p>
<ul>
<li><strong>Porters:</strong> Carry equipment and supplies</li>
<li><strong>Torchbearers:</strong> Provide light and basic assistance</li>
<li><strong>Linkboys:</strong> Guide through cities and towns</li>
<li><strong>Laborers:</strong> Perform manual work</li>
</ul>

<h3>Henchmen</h3>
<p>Henchmen are loyal followers who adventure alongside the party. They are actual characters with classes and levels, though typically lower level than their employer. Henchmen:</p>
<ul>
<li>Have personal loyalty to their employer</li>
<li>Share in adventures and treasure</li>
<li>Can advance in level</li>
<li>Will follow into dangerous situations</li>
</ul>

<h3>Mercenaries</h3>
<p>Mercenaries are professional soldiers hired for military service. They are more reliable than hirelings in combat but less loyal than henchmen. Mercenaries include:</p>
<ul>
<li><strong>Light Infantry:</strong> Leather armor, spear, and shield</li>
<li><strong>Heavy Infantry:</strong> Chain mail, spear, and shield</li>
<li><strong>Archers:</strong> Leather armor and bow</li>
<li><strong>Crossbowmen:</strong> Leather armor and crossbow</li>
<li><strong>Light Cavalry:</strong> Leather armor, spear, shield, and horse</li>
<li><strong>Heavy Cavalry:</strong> Chain mail, lance, shield, and warhorse</li>
</ul>

<h3>Specialists</h3>
<p>Specialists are skilled professionals hired for their expertise. They include:</p>
<ul>
<li><strong>Engineers:</strong> Design and oversee construction</li>
<li><strong>Sages:</strong> Provide research and knowledge</li>
<li><strong>Spies:</strong> Gather information</li>
<li><strong>Assassins:</strong> Eliminate targets</li>
<li><strong>Animal Trainers:</strong> Train and handle animals</li>
<li><strong>Artisans:</strong> Create specialized items</li>
</ul>`
    },

    {
      id: 'hiring-costs',
      title: 'Hiring Costs',
      level: 2,
      content: `<p>The cost to hire NPCs varies based on their type, skill level, and the danger involved:</p>

<h3>Hirelings</h3>
<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Daily Wage</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Notes</th>
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
<tr>
<td>Porter</td>
<td>1sp/day</td>
<td>Can carry 6 stone, will not enter dungeons</td>
</tr>
<tr>
<td>Torchbearer</td>
<td>1sp/day</td>
<td>Will enter dungeons, flees from combat</td>
</tr>
<tr>
<td>Linkboy</td>
<td>5cp/day</td>
<td>Knows local area, will not adventure</td>
</tr>
<tr>
<td>Laborer</td>
<td>2sp/day</td>
<td>Skilled manual work, will not fight</td>
</tr>
</tbody>
</table>

<h3>Mercenaries</h3>
<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Monthly Wage</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Equipment Provided</th>
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
<tr>
<td>Light Infantry</td>
<td>4gp/month</td>
<td>Leather armor, spear, shield, dagger</td>
</tr>
<tr>
<td>Heavy Infantry</td>
<td>6gp/month</td>
<td>Chain mail, spear, shield, sword</td>
</tr>
<tr>
<td>Archer</td>
<td>5gp/month</td>
<td>Leather armor, bow, 30 arrows, dagger</td>
</tr>
<tr>
<td>Crossbowman</td>
<td>4gp/month</td>
<td>Leather armor, crossbow, 30 bolts, dagger</td>
</tr>
<tr>
<td>Light Cavalry</td>
<td>15gp/month</td>
<td>Leather armor, spear, shield, sword, riding horse</td>
</tr>
<tr>
<td>Heavy Cavalry</td>
<td>20gp/month</td>
<td>Chain mail, lance, shield, sword, warhorse</td>
</tr>
</tbody>
</table>

<h3>Specialists</h3>
<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Monthly Wage</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Capabilities</th>
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
<tr>
<td>Engineer</td>
<td>250gp/month</td>
<td>Design fortifications, siege engines, construction projects</td>
</tr>
<tr>
<td>Sage</td>
<td>200gp/month</td>
<td>Research, translation, arcane knowledge</td>
</tr>
<tr>
<td>Spy</td>
<td>150gp/month</td>
<td>Infiltration, information gathering, surveillance</td>
</tr>
<tr>
<td>Assassin</td>
<td>300gp/month</td>
<td>Elimination, stealth, poison use</td>
</tr>
<tr>
<td>Animal Trainer</td>
<td>100gp/month</td>
<td>Train and handle exotic animals</td>
</tr>
<tr>
<td>Master Artisan</td>
<td>100gp/month</td>
<td>Create masterwork items, teach apprentices</td>
</tr>
</tbody>
</table>`
    },

    {
      id: 'loyalty-morale',
      title: 'Loyalty and Morale',
      level: 2,
      content: `<p>Different types of hired help have different loyalty levels and morale ratings:</p>

<h3>Morale Ratings</h3>
<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Base Morale</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Loyalty</th>
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
<tr>
<td>Hirelings</td>
<td>6</td>
<td>None - flee at first sign of danger</td>
</tr>
<tr>
<td>Mercenaries</td>
<td>8</td>
<td>Professional - will fight but may retreat</td>
</tr>
<tr>
<td>Henchmen</td>
<td>7+CHA modifier</td>
<td>Personal - will follow into most dangers</td>
</tr>
<tr>
<td>Specialists</td>
<td>9</td>
<td>Professional - focused on their specialty</td>
</tr>
</tbody>
</table>

<h3>Morale Modifiers</h3>
<p>Various factors can modify morale:</p>
<ul>
<li><strong>Employer's Charisma:</strong> +/- CHA modifier (henchmen only)</li>
<li><strong>Success:</strong> +1 after a successful adventure</li>
<li><strong>Failure:</strong> -1 after a failed adventure</li>
<li><strong>Death of Comrades:</strong> -1 per death witnessed</li>
<li><strong>Exceptional Treatment:</strong> +1 for bonuses, good treatment</li>
<li><strong>Poor Treatment:</strong> -1 for underpayment, mistreatment</li>
</ul>`
    },

    {
      id: 'managing-npcs',
      title: 'Managing NPCs',
      level: 2,
      content: `<h3>Hiring Process</h3>
<p>Finding and hiring NPCs requires time and sometimes special circumstances:</p>
<ul>
<li><strong>Hirelings:</strong> 1 day in any settlement</li>
<li><strong>Mercenaries:</strong> 1d4 days in cities, may require guilds/contacts</li>
<li><strong>Specialists:</strong> 1d4 weeks, only in large cities</li>
<li><strong>Henchmen:</strong> Special recruitment through play</li>
</ul>

<h3>Payment and Upkeep</h3>
<p>NPCs must be paid regularly and provided with basic necessities:</p>
<ul>
<li><strong>Payment:</strong> Daily for hirelings, monthly for others</li>
<li><strong>Food and Lodging:</strong> 2sp/day per NPC in civilized areas</li>
<li><strong>Equipment:</strong> Employer responsible for maintenance and replacement</li>
<li><strong>Medical Care:</strong> Healing costs for injured NPCs</li>
</ul>

<h3>NPC Advancement</h3>
<p>Henchmen can gain experience and advance in level:</p>
<ul>
<li><strong>Experience:</strong> Henchmen receive half the experience their employer gains</li>
<li><strong>Treasure:</strong> Henchmen typically receive a half-share of treasure</li>
<li><strong>Equipment:</strong> Henchmen may request better equipment as they advance</li>
</ul>`
    }
  ]
};

export const metadata: Metadata = {
  title: 'Hirelings & Specialists - Chapter 4: Equipment - ACKS II Wiki',
  description: 'Rules for hiring NPCs including costs, loyalty, and capabilities in ACKS II',
  keywords: ['ACKS II', 'hirelings', 'henchmen', 'mercenaries', 'specialists', 'NPCs'],
};

export default function HirelingsPage() {
  const navigation = {
    previous: {
      href: '/rules/chapter-4-equipment/encumbrance',
      title: 'Encumbrance & Equipment'
    },
    next: {
      href: '/rules/chapter-4-equipment/living-expenses',
      title: 'Living Expenses'
    }
  };

  return (
    <ChapterTemplate 
      chapterNumber={HIRELINGS_CONTENT.chapterNumber}
      title={HIRELINGS_CONTENT.title}
      description={HIRELINGS_CONTENT.description}
      introduction={HIRELINGS_CONTENT.introduction}
      sections={HIRELINGS_CONTENT.sections.map(section => ({
        ...section,
        content: <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: section.content }} />
      }))}
      previousChapter={navigation.previous}
      nextChapter={navigation.next}
    />
  );
} 