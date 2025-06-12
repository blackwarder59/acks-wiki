/**
 * Dynamic Rule Section Page
 * 
 * Displays the converted rulebook content for a specific section
 * using the actual converted files from the manual conversion process
 */

import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { MarkdownHtmlDisplay } from '@/components/content/markdown-html-display';

interface RuleSectionPageProps {
  params: Promise<{
    section: string;
  }>;
}

// Section configurations matching the main rules page
const sectionConfigs = {
  'character-creation': {
    title: 'Character Creation',
    description: 'Everything needed to create and develop characters',
    files: [
      '10_creating_a_character',
      '11_character_attributes', 
      '12_combat_characteristics',
      '13_class_powers',
      '14_hit_points',
      '15_armor_class',
      '16_proficiencies',
      '17_speed_and_encumbrance',
      '18_homeland',
      '19_languages',
      '20_starting_age',
      '21_size_and_weight',
      '22_alignment',
      '23_adventuring_parties',
      '24_activities'
    ]
  },
  'classes': {
    title: 'Character Classes',
    description: 'Core and campaign classes with full progression details',
    files: [
      '25_chapter_2_classes',
      '26_character_templates_and_intellect_scores',
      '27_core_classes',
      '28_campaign_classes', 
      '29_demi_human_classes'
    ]
  },
  'proficiencies': {
    title: 'Proficiencies',
    description: 'Skills and abilities characters can learn',
    files: [
      '30_chapter_3_proficiencies',
      '31_the_basics_of_proficiencies',
      '32_starting_proficiencies',
      '33_gaining_proficiencies',
      '34_proficiency_lists',
      '35_proficiency_descriptions'
    ]
  },
  'equipment': {
    title: 'Equipment & Gear',
    description: 'Weapons, armor, and adventuring equipment',
    files: [
      '36_chapter_4_equipment',
      '37_the_basics_of_equipment',
      '38_coins_and_money',
      '39_purchasing_equipment',
      '40_equipment_lists',
      '41_equipment_descriptions',
      '42_masterwork_equipment_optional',
      '43_scavenged_equipment',
      '44_encumbrance_and_equipment',
      '45_hirelings_henchmen_mercenaries_and_specialists',
      '46_expected_living_expenses_optional',
      '47_construction_projects'
    ]
  },
  'spells': {
    title: 'Spells & Magic',
    description: 'Complete spell system and magical rules',
    files: [
      '48_chapter_5_spells',
      '49_spells_and_spell_casters',
      '50_spell_lists_by_magic_type',
      '51_spell_repertoires',
      '52_spell_reversal',
      '53_spell_signatures',
      '54_spell_types',
      '55_spell_lists_&_repertoires',
      '56_spell_descriptions'
    ]
  },
  'adventures': {
    title: 'Adventures',
    description: 'Dungeon delving, wilderness exploration, and encounters',
    files: [
      '57_chapter_6_adventures',
      '58_dungeon_delves',
      '59_wilderness_expeditions',
      '60_encounters',
      '61_combat',
      '62_earning_experience_from_adventures'
    ]
  },
  'voyages': {
    title: 'Voyages',
    description: 'Sea travel, naval combat, and maritime adventures',
    files: [
      '63_chapter_7_voyages',
      '64_seafarers',
      '65_sea_vessels',
      '66_sea_voyages',
      '67_sea_encounters',
      '68_sea_combat',
      '69_river_voyages'
    ]
  },
  'campaigns': {
    title: 'Campaigns',
    description: 'Domain management, politics, and high-level play',
    files: [
      '70_chapter_8_campaigns',
      '71_activities_during_the_campaign',
      '72_followers_and_strongholds',
      '73_domains_and_realms',
      '74_politics_and_power',
      '75_hideouts_and_hijinks',
      '76_mercantile_ventures',
      '77_sanctums_and_dungeons',
      '78_magic_research',
      '79_congregants_and_divine_power',
      '80_earning_experience_from_campaigns'
    ]
  },
  'armies': {
    title: 'Armies & War',
    description: 'Military organization and mass combat',
    files: [
      '81_chapter_9_armies',
      '82_army_troops',
      '83_army_organization',
      '84_army_command',
      '85_organization_and_command_in_very_small_or_very_lar',
      '86_troop_characteristics_summary',
      '87_unit_characteristics_summary'
    ]
  },
  'maneuvers': {
    title: 'Maneuvers & Strategy', 
    description: 'Strategic movement and campaign maneuvers',
    files: [
      '88_chapter_10_maneuvers',
      '89_regions',
      '90_campaign_activities',
      '91_strategic_stance',
      '92_moving_armies',
      '93_supplying_armies',
      '94_equipment_availability_on_campaign',
      '95_reconnaissance_and_intelligence',
      '96_invading_conquering_occupying_and_pillaging_domain'
    ]
  },
  'battles': {
    title: 'Battles',
    description: 'Large-scale combat and warfare',
    files: [
      '97_chapter_11_battles',
      '98_strategic_situations',
      '99_running_a_battle'
    ]
  },
  'appendices': {
    title: 'Setting & Appendices',
    description: 'The Auran Empire setting and reference materials',
    files: [
      '110_appendix_a_auran_empire',
      '111_overview',
      '112_lands',
      '113_timeline',
      '114_customs',
      '115_people',
      '116_languages',
      '117_appendix_b_conditions',
      '118_appendix_c_wounds_and_woe'
    ]
  }
};

/**
 * Server-side function to load and combine section content
 * This runs only on the server and won't be bundled for the client
 */
async function loadSectionContent(sectionConfig: { title: string; description: string; files: string[] }) {
  const combinedContent = {
    html: '',
    sections: [] as { title: string; level: number; html: string }[],
    metadata: {
      title: sectionConfig.title,
      description: sectionConfig.description,
      fileCount: sectionConfig.files.length
    },
    rawMarkdown: ''
  };

  // Process each file in the section
  for (const fileName of sectionConfig.files) {
    try {
      const filePath = path.join(process.cwd(), 'converted', 'rulebook', `${fileName}.json`);
      
      // Check if file exists and read it
      try {
        await fs.access(filePath);
        const fileData = await fs.readFile(filePath, 'utf-8');
        const fileContent = JSON.parse(fileData);
        
        // Add to combined HTML
        combinedContent.html += fileContent.html + '\n\n';
        
        // Add sections if they exist
        if (fileContent.sections && Array.isArray(fileContent.sections)) {
          combinedContent.sections.push(...fileContent.sections);
        }
        
        // Add to raw markdown
        if (fileContent.rawMarkdown) {
          combinedContent.rawMarkdown += fileContent.rawMarkdown + '\n\n';
        }
      } catch {
        // File doesn't exist or can't be read, skip it
        console.warn(`File ${fileName}.json not found or unreadable`);
      }
    } catch (error) {
      console.error(`Error loading file ${fileName}:`, error);
    }
  }

  return combinedContent;
}

export default async function RuleSectionPage({ params }: RuleSectionPageProps) {
  const { section } = await params;
  
  // Get section configuration
  const sectionConfig = sectionConfigs[section as keyof typeof sectionConfigs];
  
  if (!sectionConfig) {
    notFound();
  }

  // Load and combine all files for this section using server-side function
  const combinedContent = await loadSectionContent(sectionConfig);

  // If no content was loaded, show an error
  if (!combinedContent.html.trim()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/rules" 
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Rules
          </Link>
          
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {sectionConfig.title}
            </h1>
            <p className="text-muted-foreground">
              Content is being processed. Please check back soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <Link 
          href="/rules" 
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Rules
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {sectionConfig.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            {sectionConfig.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{sectionConfig.files.length} sections</span>
            <span>•</span>
            <span>Complete rulebook content</span>
          </div>
        </div>

        {/* Content Display */}
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <MarkdownHtmlDisplay 
            content={{
              html: combinedContent.html,
              sections: [{
                title: 'Full Content',
                level: 1,
                html: combinedContent.html
              }],
              metadata: {
                name: sectionConfig.title
              },
              rawMarkdown: combinedContent.rawMarkdown
            }}
            contentType="rule"
          />
        </div>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: RuleSectionPageProps) {
  const { section } = await params;
  const sectionConfig = sectionConfigs[section as keyof typeof sectionConfigs];
  
  if (!sectionConfig) {
    return {
      title: 'Section Not Found',
    };
  }

  return {
    title: `${sectionConfig.title} - ACKS II Rules`,
    description: sectionConfig.description,
  };
} 