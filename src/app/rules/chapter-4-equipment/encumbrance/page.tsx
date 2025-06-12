import { Metadata } from 'next';
import { ChapterTemplate } from '@/components/rulebook/chapter-template';

/**
 * Encumbrance and Equipment Section - Chapter 4 Equipment Subsection
 * Contains rules for carrying capacity and movement penalties
 * from ACKS II Rulebook file 44_encumbrance_and_equipment.md
 */

const ENCUMBRANCE_CONTENT = {
  chapterNumber: '4',
  title: 'Encumbrance and Equipment',
  description: 'Rules for carrying capacity, movement penalties, and equipment management',
  introduction: 'Characters can only carry so much equipment before becoming encumbered. The weight of equipment affects movement speed, stealth, and other activities.',
  sections: [
    {
      id: 'encumbrance-basics',
      title: 'Encumbrance Basics',
      level: 2,
      content: `<p>Equipment weight is measured in <strong>stone</strong>. One stone is roughly equivalent to 14 pounds. A character's carrying capacity is based on their Strength score:</p>

<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Strength Score</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Carrying Capacity</th>
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
<tr><td>3</td><td>1 stone</td></tr>
<tr><td>4-5</td><td>2 stone</td></tr>
<tr><td>6-8</td><td>3 stone</td></tr>
<tr><td>9-12</td><td>4 stone</td></tr>
<tr><td>13-15</td><td>5 stone</td></tr>
<tr><td>16-17</td><td>6 stone</td></tr>
<tr><td>18</td><td>7 stone</td></tr>
</tbody>
</table>

<p>This represents the maximum weight a character can carry without penalty. Characters can carry more, but suffer encumbrance penalties.</p>`
    },

    {
      id: 'encumbrance-levels',
      title: 'Encumbrance Levels',
      level: 2,
      content: `<p>Characters have different levels of encumbrance based on how much they are carrying relative to their carrying capacity:</p>

<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Encumbrance Level</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Weight Carried</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Movement Penalty</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Other Penalties</th>
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
<tr>
<td>Unencumbered</td>
<td>Up to carrying capacity</td>
<td>None</td>
<td>None</td>
</tr>
<tr>
<td>Lightly Encumbered</td>
<td>Up to 1.5× carrying capacity</td>
<td>-10' movement</td>
<td>-1 penalty to stealth</td>
</tr>
<tr>
<td>Heavily Encumbered</td>
<td>Up to 2× carrying capacity</td>
<td>-20' movement</td>
<td>-2 penalty to stealth, initiative</td>
</tr>
<tr>
<td>Severely Encumbered</td>
<td>Up to 3× carrying capacity</td>
<td>-30' movement</td>
<td>-4 penalty to stealth, initiative, attack throws</td>
</tr>
</tbody>
</table>

<p>Characters cannot carry more than 3 times their carrying capacity. Attempting to do so means they must drop items until they are within their maximum limit.</p>`
    },

    {
      id: 'armor-encumbrance',
      title: 'Armor and Encumbrance',
      level: 2,
      content: `<p>Worn armor contributes to encumbrance, but characters gradually adapt to their armor's weight through training and experience. The effective encumbrance of armor decreases over time:</p>

<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time Worn</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Effective Encumbrance</th>
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
<tr>
<td>First week</td>
<td>Full weight</td>
</tr>
<tr>
<td>After 1 week</td>
<td>75% of weight</td>
</tr>
<tr>
<td>After 1 month</td>
<td>50% of weight</td>
</tr>
<tr>
<td>After 3 months</td>
<td>25% of weight</td>
</tr>
</tbody>
</table>

<p>This represents the character becoming accustomed to moving and fighting in armor. The reduction applies only to worn armor, not armor carried as equipment.</p>`
    },

    {
      id: 'containers-organization',
      title: 'Containers and Organization',
      level: 2,
      content: `<p>Proper containers and organization can help characters manage their equipment more effectively:</p>

<h3>Backpacks and Sacks</h3>
<p>A backpack can hold up to 4 stone of equipment. A large sack can hold up to 6 stone. Items stored in containers are easier to organize but may take longer to access in combat situations.</p>

<h3>Belt Pouches and Scabbards</h3>
<p>Small items worn on a belt (daggers, pouches, scroll cases) can be drawn quickly. Characters can have up to 4 such items readily accessible without penalty.</p>

<h3>Retrieving Items</h3>
<p>Drawing an item depends on where it is stored:</p>
<ul>
<li><strong>Belt/Ready Items:</strong> Free action (can be done while moving or attacking)</li>
<li><strong>Top of Backpack:</strong> 1 round</li>
<li><strong>Buried in Pack:</strong> 2-4 rounds (Judge's discretion)</li>
<li><strong>Dropped Items:</strong> 1 round to pick up</li>
</ul>`
    },

    {
      id: 'special-situations',
      title: 'Special Encumbrance Situations',
      level: 2,
      content: `<h3>Swimming</h3>
<p>Characters wearing armor or carrying more than their normal carrying capacity suffer penalties when swimming:</p>
<ul>
<li><strong>Leather Armor or Less:</strong> No penalty</li>
<li><strong>Chain Mail or Heavier:</strong> -4 penalty to swimming throws</li>
<li><strong>Plate Mail:</strong> -8 penalty to swimming throws</li>
<li><strong>Encumbered:</strong> Additional -2 penalty per encumbrance level</li>
</ul>

<h3>Climbing</h3>
<p>Encumbrance affects climbing ability:</p>
<ul>
<li><strong>Lightly Encumbered:</strong> -1 penalty to climbing throws</li>
<li><strong>Heavily Encumbered:</strong> -2 penalty to climbing throws</li>
<li><strong>Severely Encumbered:</strong> -4 penalty to climbing throws</li>
</ul>

<h3>Stealth</h3>
<p>Heavy equipment makes stealth more difficult:</p>
<ul>
<li><strong>Metal Armor:</strong> -2 penalty to stealth throws</li>
<li><strong>Encumbrance:</strong> Additional penalties as listed in Encumbrance Levels table</li>
</ul>`
    }
  ]
};

export const metadata: Metadata = {
  title: 'Encumbrance & Equipment - Chapter 4: Equipment - ACKS II Wiki',
  description: 'Rules for carrying capacity, movement penalties, and equipment management in ACKS II',
  keywords: ['ACKS II', 'encumbrance', 'carrying capacity', 'movement speed', 'equipment weight'],
};

export default function EncumbranceEquipmentPage() {
  const navigation = {
    previous: {
      href: '/rules/chapter-4-equipment/scavenged',
      title: 'Scavenged Equipment'
    },
    next: {
      href: '/rules/chapter-4-equipment/hirelings',
      title: 'Hirelings & Specialists'
    }
  };

  return (
    <ChapterTemplate 
      chapterNumber={ENCUMBRANCE_CONTENT.chapterNumber}
      title={ENCUMBRANCE_CONTENT.title}
      description={ENCUMBRANCE_CONTENT.description}
      introduction={ENCUMBRANCE_CONTENT.introduction}
      sections={ENCUMBRANCE_CONTENT.sections.map(section => ({
        ...section,
        content: <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: section.content }} />
      }))}
      previousChapter={navigation.previous}
      nextChapter={navigation.next}
    />
  );
} 