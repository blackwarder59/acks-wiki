import { Metadata } from 'next';
import { ChapterTemplate } from '@/components/rulebook/chapter-template';

/**
 * Masterwork Equipment Section - Chapter 4 Equipment Subsection
 * Contains optional rules for masterwork equipment with enhanced statistics
 * from ACKS II Rulebook file 42_masterwork_equipment_optional.md
 */

const MASTERWORK_CONTENT = {
  chapterNumber: '4',
  title: 'Masterwork Equipment (Optional)',
  description: 'Optional rules for masterwork equipment with enhanced performance',
  introduction: 'These are optional rules for masterwork equipment. Masterwork equipment offers enhanced performance compared to standard equipment, at a proportionally higher cost.',
  sections: [
    {
      id: 'masterwork-weapons',
      title: 'Masterwork Weapons',
      level: 2,
      content: `<p>Masterwork weapons are made by expert weaponsmiths using superior materials and techniques. A masterwork weapon grants a +1 bonus on attack throws and damage rolls made with it. These bonuses do not stack with any magical bonuses.</p>
      
<p>The cost to have a weapon masterworked is +300gp above the normal cost of the weapon. Thus a masterwork sword would cost 310gp (10gp base + 300gp masterwork). Masterwork ammunition grants the same +1 bonus on attack throws and damage rolls. The cost to have 30 arrows, bolts, or other pieces of ammunition masterworked is +60gp. Masterwork ammunition loses this property when used.</p>
      
<p>Any weapon with a total bonus of +1 or higher (whether magical or masterwork) is considered to be a magical weapon for the purpose of harming creatures that can only be harmed by magic weapons.</p>`
    },
    
    {
      id: 'masterwork-armor',
      title: 'Masterwork Armor',
      level: 2,
      content: `<p>Masterwork armor is fitted by expert armorers using superior materials and techniques. It is lighter and less bulky than ordinary armor. Masterwork armor weighs 1 stone less than ordinary armor (minimum 1 stone) and provides a +1 bonus to Armor Class. These bonuses do not stack with any magical bonuses.</p>
      
<p>The cost to have armor masterworked is +150gp above the normal cost of the armor. Thus masterwork chain mail would cost 190gp (40gp base + 150gp masterwork). The cost to have a shield masterworked is +153gp. Masterwork barding follows the same rules as masterwork armor, but costs +300gp to masterwork.</p>`
    },
    
    {
      id: 'masterwork-instruments',
      title: 'Masterwork Musical Instruments',
      level: 2,
      content: `<p>A masterwork musical instrument grants a +1 circumstance bonus on Performance proficiency throws made with it. A masterwork musical instrument costs +100gp above the normal cost of the instrument.</p>
      
<p>An exquisite musical instrument grants a +2 circumstance bonus on Performance proficiency throws made with it. An exquisite musical instrument costs +1,000gp above the normal cost of the instrument.</p>`
    },
    
    {
      id: 'masterwork-structures',
      title: 'Masterwork Structures and Vessels',
      level: 2,
      content: `<p>Structures and vessels may also be built as masterwork. Masterwork structures have 25% more structural hit points than ordinary structures. Masterwork vessels are 25% faster than ordinary vessels and have 25% more structural hit points. The cost to make a structure or vessel masterwork is +50% above the normal cost.</p>`
    },
    
    {
      id: 'availability',
      title: 'Availability of Masterwork Equipment',
      level: 2,
      content: `<p>Masterwork equipment is not readily available in most markets. In settlements with population of less than 1,000, masterwork equipment is not available at all. In larger settlements, masterwork equipment may be available based on the following guidelines:</p>
      
<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Settlement Size</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Availability</th>
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
<tr>
<td>Small City (1,000-4,999)</td>
<td>25% chance of specific masterwork item being available</td>
</tr>
<tr>
<td>Large City (5,000-24,999)</td>
<td>50% chance of specific masterwork item being available</td>
</tr>
<tr>
<td>Metropolis (25,000+)</td>
<td>75% chance of specific masterwork item being available</td>
</tr>
</tbody>
</table>

<p>If a masterwork item is not available, it can be commissioned. Commission time is typically 1d4+1 weeks for weapons and armor, 2d4 weeks for instruments, and considerably longer for structures and vessels.</p>`
    }
  ]
};

export const metadata: Metadata = {
  title: 'Masterwork Equipment - Chapter 4: Equipment - ACKS II Wiki',
  description: 'Optional rules for masterwork equipment with enhanced performance in ACKS II',
  keywords: ['ACKS II', 'masterwork equipment', 'enhanced weapons', 'improved armor'],
};

export default function MasterworkEquipmentPage() {
  const navigation = {
    previous: {
      href: '/rules/chapter-4-equipment/descriptions',
      title: 'Equipment Descriptions'
    },
    next: {
      href: '/rules/chapter-4-equipment/scavenged',
      title: 'Scavenged Equipment'
    }
  };

  return (
    <ChapterTemplate 
      chapterNumber={MASTERWORK_CONTENT.chapterNumber}
      title={MASTERWORK_CONTENT.title}
      description={MASTERWORK_CONTENT.description}
      introduction={MASTERWORK_CONTENT.introduction}
      sections={MASTERWORK_CONTENT.sections.map(section => ({
        ...section,
        content: <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: section.content }} />
      }))}
      previousChapter={navigation.previous}
      nextChapter={navigation.next}
    />
  );
} 