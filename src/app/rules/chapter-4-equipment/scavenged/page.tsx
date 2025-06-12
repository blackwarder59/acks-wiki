import { Metadata } from 'next';
import { ChapterTemplate } from '@/components/rulebook/chapter-template';

/**
 * Scavenged Equipment Section - Chapter 4 Equipment Subsection
 * Contains rules for damaged and found equipment with condition penalties
 * from ACKS II Rulebook file 43_scavenged_equipment.md
 */

const SCAVENGED_CONTENT = {
  chapterNumber: '4',
  title: 'Scavenged Equipment',
  description: 'Rules for damaged and found equipment with reduced performance',
  introduction: 'Sometimes adventurers will find equipment in dungeons, recover it from slain opponents, or purchase it second-hand from disreputable dealers. Such equipment is often damaged, worn, or of questionable quality, and may not perform as well as new equipment.',
  sections: [
    {
      id: 'equipment-condition',
      title: 'Equipment Condition',
      level: 2,
      content: `<p>Scavenged equipment comes in one of four conditions: Good, Fair, Poor, or Terrible. The condition of a piece of scavenged equipment affects both its performance and its value.</p>

<h3>Determining Condition</h3>
<p>When equipment is found or scavenged, roll 2d6 on the Equipment Condition table to determine its condition:</p>

<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">2d6 Roll</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Condition</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Value</th>
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
<tr>
<td>2-3</td>
<td>Terrible</td>
<td>10% of normal</td>
</tr>
<tr>
<td>4-6</td>
<td>Poor</td>
<td>25% of normal</td>
</tr>
<tr>
<td>7-9</td>
<td>Fair</td>
<td>50% of normal</td>
</tr>
<tr>
<td>10-12</td>
<td>Good</td>
<td>75% of normal</td>
</tr>
</tbody>
</table>`
    },

    {
      id: 'condition-effects-weapons',
      title: 'Condition Effects on Weapons',
      level: 2,
      content: `<p>The condition of a weapon affects its performance in combat:</p>

<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Condition</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Attack Roll Penalty</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Damage Penalty</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Breakage</th>
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
<tr>
<td>Good</td>
<td>-1</td>
<td>-1</td>
<td>Breaks on natural 1</td>
</tr>
<tr>
<td>Fair</td>
<td>-2</td>
<td>-1</td>
<td>Breaks on natural 1-2</td>
</tr>
<tr>
<td>Poor</td>
<td>-3</td>
<td>-2</td>
<td>Breaks on natural 1-3</td>
</tr>
<tr>
<td>Terrible</td>
<td>-4</td>
<td>-2</td>
<td>Breaks on natural 1-4</td>
</tr>
</tbody>
</table>

<p>When a weapon breaks, it becomes useless and cannot be repaired. A broken weapon may still be sold for scrap metal or wood at 10% of its scavenged value.</p>`
    },

    {
      id: 'condition-effects-armor',
      title: 'Condition Effects on Armor',
      level: 2,
      content: `<p>The condition of armor affects its protective capability:</p>

<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Condition</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">AC Penalty</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Weight Increase</th>
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
<tr>
<td>Good</td>
<td>-1</td>
<td>+1 stone</td>
</tr>
<tr>
<td>Fair</td>
<td>-1</td>
<td>+2 stone</td>
</tr>
<tr>
<td>Poor</td>
<td>-2</td>
<td>+3 stone</td>
</tr>
<tr>
<td>Terrible</td>
<td>-2</td>
<td>+4 stone</td>
</tr>
</tbody>
</table>

<p>The AC penalty represents gaps, tears, missing pieces, or bent sections that reduce the armor's effectiveness. The weight increase represents broken straps, extra padding needed for comfort, or awkward fit.</p>`
    },

    {
      id: 'condition-effects-equipment',
      title: 'Condition Effects on Other Equipment',
      level: 2,
      content: `<p>Other equipment suffers penalties based on its condition:</p>

<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Condition</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Performance Penalty</th>
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
<tr>
<td>Good</td>
<td>-1 to relevant proficiency throws</td>
</tr>
<tr>
<td>Fair</td>
<td>-2 to relevant proficiency throws</td>
</tr>
<tr>
<td>Poor</td>
<td>-3 to relevant proficiency throws</td>
</tr>
<tr>
<td>Terrible</td>
<td>-4 to relevant proficiency throws</td>
</tr>
</tbody>
</table>

<p>Examples include: thieves' tools imposing penalties on lockpicking and trap disarming, musical instruments imposing penalties on Performance, rope imposing penalties on climbing, etc.</p>`
    },

    {
      id: 'repairing-equipment',
      title: 'Repairing Scavenged Equipment',
      level: 2,
      content: `<p>Scavenged equipment can be repaired to improve its condition, but it can never be restored to better than "Good" condition through repair alone.</p>

<h3>Repair Costs</h3>
<p>The cost to improve equipment by one condition level is:</p>
<ul>
<li><strong>Weapons:</strong> 25% of the item's normal (new) cost</li>
<li><strong>Armor:</strong> 50% of the item's normal (new) cost</li>
<li><strong>Other Equipment:</strong> 25% of the item's normal (new) cost</li>
</ul>

<h3>Repair Time</h3>
<p>Repairing equipment requires access to appropriate tools and materials. The time required is:</p>
<ul>
<li><strong>Weapons:</strong> 1 day per condition level improved</li>
<li><strong>Armor:</strong> 1 week per condition level improved</li>
<li><strong>Other Equipment:</strong> 1 day per condition level improved</li>
</ul>

<p>A character with the appropriate crafting proficiency (Weaponsmithing, Armorsmithing, etc.) can perform the repairs themselves. Otherwise, the work must be done by a professional craftsman.</p>`
    }
  ]
};

export const metadata: Metadata = {
  title: 'Scavenged Equipment - Chapter 4: Equipment - ACKS II Wiki',
  description: 'Rules for damaged and found equipment with reduced performance in ACKS II',
  keywords: ['ACKS II', 'scavenged equipment', 'damaged weapons', 'broken armor', 'equipment condition'],
};

export default function ScavengedEquipmentPage() {
  const navigation = {
    previous: {
      href: '/rules/chapter-4-equipment/masterwork',
      title: 'Masterwork Equipment'
    },
    next: {
      href: '/rules/chapter-4-equipment/encumbrance',
      title: 'Encumbrance & Equipment'
    }
  };

  return (
    <ChapterTemplate 
      chapterNumber={SCAVENGED_CONTENT.chapterNumber}
      title={SCAVENGED_CONTENT.title}
      description={SCAVENGED_CONTENT.description}
      introduction={SCAVENGED_CONTENT.introduction}
      sections={SCAVENGED_CONTENT.sections.map(section => ({
        ...section,
        content: <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: section.content }} />
      }))}
      previousChapter={navigation.previous}
      nextChapter={navigation.next}
    />
  );
} 