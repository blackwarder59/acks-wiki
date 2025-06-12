import { Metadata } from 'next';
import { ChapterTemplate } from '@/components/rulebook/chapter-template';

/**
 * Living Expenses Section - Chapter 4 Equipment Subsection
 * Contains optional rules for character living expenses and lifestyle costs
 * from ACKS II Rulebook file 46_expected_living_expenses_optional.md
 */

const LIVING_EXPENSES_CONTENT = {
  chapterNumber: '4',
  title: 'Expected Living Expenses (Optional)',
  description: 'Optional rules for character living expenses and lifestyle maintenance',
  introduction: 'These are optional rules for tracking character living expenses. Different social classes have different expected standards of living that must be maintained.',
  sections: [
    {
      id: 'lifestyle-standards',
      title: 'Lifestyle Standards',
      level: 2,
      content: `<p>Characters are expected to maintain a certain standard of living based on their social class and status. This affects not only their monthly expenses but also how they are perceived by others.</p>

<h3>Social Classes and Expected Lifestyles</h3>
<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Social Class</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Expected Lifestyle</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Monthly Cost</th>
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
<tr>
<td>Slave/Serf</td>
<td>Wretched</td>
<td>0gp (provided by master)</td>
</tr>
<tr>
<td>Peasant/Laborer</td>
<td>Squalid</td>
<td>3gp/month</td>
</tr>
<tr>
<td>Artisan/Soldier</td>
<td>Poor</td>
<td>6gp/month</td>
</tr>
<tr>
<td>Merchant/Professional</td>
<td>Modest</td>
<td>12gp/month</td>
</tr>
<tr>
<td>Minor Noble/Guildmaster</td>
<td>Comfortable</td>
<td>25gp/month</td>
</tr>
<tr>
<td>Major Noble/High Priest</td>
<td>Wealthy</td>
<td>50gp/month</td>
</tr>
<tr>
<td>Royalty/Archmage</td>
<td>Aristocratic</td>
<td>100gp/month</td>
</tr>
</tbody>
</table>

<p>Characters who fail to maintain their expected lifestyle may suffer social consequences, including loss of reputation, difficulty obtaining credit, and reduced effectiveness in social situations.</p>`
    },

    {
      id: 'lifestyle-descriptions',
      title: 'Lifestyle Descriptions',
      level: 2,
      content: `<h3>Wretched</h3>
<p>You have no home and live in whatever shelter you can find. You eat whatever scraps you can obtain. Your clothes are little more than rags, and you own virtually nothing of value. Disease and exposure are constant threats.</p>

<h3>Squalid</h3>
<p>You live in a one-room hovel in the poorest part of town. You eat simple food—vegetables, bread, and the occasional bit of meat. Your clothes are patched but serviceable. Violence and disease are common in your neighborhood.</p>

<h3>Poor</h3>
<p>You live in a small apartment or room in a boarding house in a poor neighborhood. You eat plain but adequate food. Your clothes are simple but clean. You can maintain basic hygiene and health.</p>

<h3>Modest</h3>
<p>You live in a small house in a middle-class neighborhood or a nice apartment. You eat good food and can afford a few luxuries. Your clothes are well-made and fashionable. You can afford basic professional services.</p>

<h3>Comfortable</h3>
<p>You live in a nice house in a good neighborhood. You eat well and can afford many luxuries. Your clothes are of fine quality and latest fashion. You employ a few servants and can afford quality professional services.</p>

<h3>Wealthy</h3>
<p>You live in a large house or small mansion in an excellent neighborhood. You eat the finest food and enjoy many luxuries. Your clothes are expertly tailored from the finest materials. You employ a staff of servants and have access to the best professional services.</p>

<h3>Aristocratic</h3>
<p>You live in a mansion or palace. You eat exotic delicacies and enjoy every luxury. Your clothes are works of art made from the rarest materials. You employ a large staff and have access to exclusive services and privileges.</p>`
    },

    {
      id: 'lifestyle-effects',
      title: 'Lifestyle Effects',
      level: 2,
      content: `<p>A character's lifestyle affects their social interactions and opportunities:</p>

<h3>Social Reaction Modifiers</h3>
<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Lifestyle vs. NPC Class</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reaction Modifier</th>
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
<tr>
<td>2+ classes above NPC</td>
<td>+2 (impressed by wealth/status)</td>
</tr>
<tr>
<td>1 class above NPC</td>
<td>+1 (respectful)</td>
</tr>
<tr>
<td>Same class as NPC</td>
<td>0 (neutral)</td>
</tr>
<tr>
<td>1 class below NPC</td>
<td>-1 (condescending)</td>
</tr>
<tr>
<td>2+ classes below NPC</td>
<td>-2 (disdainful)</td>
</tr>
</tbody>
</table>

<h3>Other Benefits and Drawbacks</h3>
<p><strong>Higher Lifestyles Provide:</strong></p>
<ul>
<li><strong>Access:</strong> Entry to exclusive establishments and social circles</li>
<li><strong>Credit:</strong> Ability to obtain loans and conduct business on reputation</li>
<li><strong>Information:</strong> Access to rumors and intelligence through social networks</li>
<li><strong>Services:</strong> Priority treatment from professionals and craftsmen</li>
</ul>

<p><strong>Lower Lifestyles May Suffer:</strong></p>
<ul>
<li><strong>Exclusion:</strong> Banned from certain establishments and social events</li>
<li><strong>Suspicion:</strong> Treated with distrust by authorities and merchants</li>
<li><strong>Health:</strong> Increased chance of disease in squalid conditions</li>
<li><strong>Crime:</strong> Higher chance of being victim of theft or violence</li>
</ul>`
    },

    {
      id: 'maintaining-lifestyle',
      title: 'Maintaining Lifestyle',
      level: 2,
      content: `<h3>Payment Schedules</h3>
<p>Living expenses are typically paid monthly in advance. Characters who cannot afford their expected lifestyle must either:</p>
<ul>
<li><strong>Lower their lifestyle</strong> temporarily (with social consequences)</li>
<li><strong>Take on debt</strong> to maintain appearances</li>
<li><strong>Find alternative income sources</strong> quickly</li>
</ul>

<h3>Lifestyle Changes</h3>
<p>Characters can change their lifestyle, but there are restrictions:</p>
<ul>
<li><strong>Raising Lifestyle:</strong> Can be done immediately if funds are available</li>
<li><strong>Lowering Lifestyle:</strong> Takes 1 month to adjust social expectations</li>
<li><strong>Temporary Changes:</strong> Short-term lifestyle changes for adventures or travel</li>
</ul>

<h3>Group Lifestyles</h3>
<p>Adventuring parties may choose to pool resources for a shared lifestyle:</p>
<ul>
<li><strong>Shared Housing:</strong> Characters can split the cost of housing appropriate to the highest-status member</li>
<li><strong>Individual Standards:</strong> Each character maintains their own personal appearance and social activities</li>
<li><strong>Public Appearances:</strong> The group's public image is based on the lowest common denominator</li>
</ul>

<h3>Special Circumstances</h3>
<p><strong>Adventuring:</strong> While actively adventuring, characters may reduce their lifestyle costs by 50% as they spend time away from civilization.</p>

<p><strong>Imprisonment:</strong> Incarcerated characters cannot maintain their lifestyle, suffering -1 to reaction rolls per month imprisoned when they return to society.</p>

<p><strong>Exile:</strong> Exiled characters must establish a new social position in their new location, starting at Poor lifestyle regardless of their previous status.</p>`
    }
  ]
};

export const metadata: Metadata = {
  title: 'Living Expenses - Chapter 4: Equipment - ACKS II Wiki',
  description: 'Optional rules for character living expenses and lifestyle maintenance in ACKS II',
  keywords: ['ACKS II', 'living expenses', 'lifestyle', 'social class', 'monthly costs'],
};

export default function LivingExpensesPage() {
  const navigation = {
    previous: {
      href: '/rules/chapter-4-equipment/hirelings',
      title: 'Hirelings & Specialists'
    },
    next: {
      href: '/rules/chapter-4-equipment/construction',
      title: 'Construction Projects'
    }
  };

  return (
    <ChapterTemplate 
      chapterNumber={LIVING_EXPENSES_CONTENT.chapterNumber}
      title={LIVING_EXPENSES_CONTENT.title}
      description={LIVING_EXPENSES_CONTENT.description}
      introduction={LIVING_EXPENSES_CONTENT.introduction}
      sections={LIVING_EXPENSES_CONTENT.sections.map(section => ({
        ...section,
        content: <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: section.content }} />
      }))}
      previousChapter={navigation.previous}
      nextChapter={navigation.next}
    />
  );
} 