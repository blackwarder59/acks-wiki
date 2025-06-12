/**
 * Content Loading Utility for ACKS II Rulebook
 * 
 * Handles loading and processing markdown content from ACKS_II_Content/Rulebook/
 * directory for use in the chapter template system.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { ChapterContent } from '@/lib/types/content';

/**
 * Represents a section of chapter content
 */
export interface ChapterSection {
  id: string;
  title: string;
  content: string;
  level: number;
  sourceFile?: string;
}

/**
 * Represents a complete chapter with all its content
 */
export interface ChapterContent {
  id: string;
  chapterNumber: number | string;
  title: string;
  description?: string;
  introduction?: string;
  sections: ChapterSection[];
  appendix?: boolean;
}

/**
 * Configuration for a chapter including source file mappings
 */
export interface ChapterConfig {
  id: string;
  chapterNumber: number | string;
  title: string;
  description?: string;
  sourceFiles: string[];
  appendix?: boolean;
  introduction?: {
    sourceFile: string;
    section?: string;
  };
}

/**
 * Class categories for organizing Chapter 2
 */
interface ClassCategories {
  core: string[];
  campaign: string[];
  demiHuman: string[];
}

/**
 * Class categorization for Chapter 2 organization
 */
const CLASS_CATEGORIES: ClassCategories = {
  core: ['fighter.md', 'explorer.md', 'thief.md', 'mage.md', 'crusader.md', 'venturer.md'],
  campaign: ['assassin.md', 'barbarian.md', 'bard.md', 'bladedancer.md', 'paladin.md', 'priestess.md', 'shaman.md', 'warlock.md', 'witch.md'],
  demiHuman: ['dwarven_craftpriest.md', 'dwarven_vaultguard.md', 'elven_nightblade.md', 'elven_spellsword.md', 'nobiran_wonderworker.md', 'zaharan_ruinguard.md']
};

/**
 * Chapter configuration mapping based on RULEBOOK_REORG_PLAN.md
 */
export const CHAPTER_CONFIGS: ChapterConfig[] = [
  {
    id: 'chapter-1-characters',
    chapterNumber: 1,
    title: 'Characters',
    description: 'Character creation, attributes, and basic character mechanics',
    sourceFiles: [
      '09_chapter_1_characters.md',
      '10_creating_a_character.md',
      '11_character_attributes.md',
      '12_combat_characteristics.md',
      '13_class_powers.md',
      '14_hit_points.md',
      '15_armor_class.md',
      '16_proficiencies.md',
      '17_speed_and_encumbrance.md',
      '18_homeland.md',
      '19_languages.md',
      '20_starting_age.md',
      '21_size_and_weight.md',
      '22_alignment.md',
      '23_adventuring_parties.md',
      '24_activities.md'
    ],
    introduction: {
      sourceFile: '09_chapter_1_characters.md'
    }
  },
  {
    id: 'chapter-2-classes',
    chapterNumber: 2,
    title: 'Classes',
    description: 'Character classes with progression tables and class features',
    sourceFiles: [
      '25_chapter_2_classes.md',
      '26_character_templates_and_intellect_scores.md',
      '27_core_classes.md',
      '28_campaign_classes.md',
      '29_demi_human_classes.md'
    ],
    introduction: {
      sourceFile: '25_chapter_2_classes.md'
    }
  },
  {
    id: 'chapter-3-proficiencies',
    chapterNumber: 3,
    title: 'Proficiencies',
    description: 'Skills and abilities that characters can learn and develop',
    sourceFiles: [
      '30_chapter_3_proficiencies.md',
      '33_gaining_proficiencies.md',
      '34_proficiency_lists.md'
    ],
    introduction: {
      sourceFile: '30_chapter_3_proficiencies.md'
    }
  },
  {
    id: 'chapter-4-equipment',
    chapterNumber: 4,
    title: 'Equipment',
    description: 'Weapons, armor, gear, and construction projects',
    sourceFiles: [
      '36_chapter_4_equipment.md',
      '41_equipment_descriptions.md',
      '42_masterwork_equipment_optional.md',
      '43_scavenged_equipment.md',
      '44_encumbrance_and_equipment.md',
      '45_hirelings_henchmen_mercenaries_and_specialists.md',
      '46_expected_living_expenses_optional.md',
      '47_construction_projects.md'
    ],
    introduction: {
      sourceFile: '36_chapter_4_equipment.md'
    }
  },
  {
    id: 'chapter-5-spells',
    chapterNumber: 5,
    title: 'Spells',
    description: 'Magic system, spell casting, and complete spell descriptions',
    sourceFiles: [
      '48_chapter_5_spells.md',
      '49_spells_and_spell_casters.md',
      '50_spell_lists_by_magic_type.md',
      '51_spell_repertoires.md',
      '52_spell_reversal.md',
      '53_spell_signatures.md',
      '54_spell_types.md',
      '55_spell_lists_&_repertoires.md',
      '56_spell_descriptions.md'
    ],
    introduction: {
      sourceFile: '48_chapter_5_spells.md'
    }
  },
  {
    id: 'chapter-6-adventures',
    chapterNumber: 6,
    title: 'Adventures',
    description: 'Dungeon delving, wilderness exploration, and combat',
    sourceFiles: [
      '57_chapter_6_adventures.md',
      '58_dungeon_delves.md',
      '59_wilderness_expeditions.md',
      '60_encounters.md',
      '61_combat.md',
      '62_earning_experience_from_adventures.md'
    ],
    introduction: {
      sourceFile: '57_chapter_6_adventures.md'
    }
  },
  {
    id: 'chapter-7-voyages',
    chapterNumber: 7,
    title: 'Voyages',
    description: 'Sea travel, naval combat, and maritime adventures',
    sourceFiles: [
      '63_chapter_7_voyages.md',
      '64_seafarers.md',
      '65_sea_vessels.md',
      '66_sea_voyages.md',
      '67_sea_encounters.md',
      '68_sea_combat.md',
      '69_river_voyages.md'
    ],
    introduction: {
      sourceFile: '63_chapter_7_voyages.md'
    }
  },
  {
    id: 'chapter-8-campaigns',
    chapterNumber: 8,
    title: 'Campaigns',
    description: 'Domain management, politics, and high-level campaign play',
    sourceFiles: [
      '70_chapter_8_campaigns.md',
      '71_activities_during_the_campaign.md',
      '72_followers_and_strongholds.md',
      '73_domains_and_realms.md',
      '74_politics_and_power.md',
      '75_hideouts_and_hijinks.md',
      '76_mercantile_ventures.md',
      '77_sanctums_and_dungeons.md',
      '78_magic_research.md',
      '79_congregants_and_divine_power.md',
      '80_earning_experience_from_campaigns.md'
    ],
    introduction: {
      sourceFile: '70_chapter_8_campaigns.md'
    }
  },
  {
    id: 'chapter-9-armies',
    chapterNumber: 9,
    title: 'Armies',
    description: 'Military organization, troop types, and army management',
    sourceFiles: [
      '81_chapter_9_armies.md',
      '82_army_troops.md',
      '83_army_organization.md',
      '84_army_command.md',
      '85_organization_and_command_in_very_small_or_very_lar.md',
      '86_troop_characteristics_summary.md',
      '87_unit_characteristics_summary.md'
    ],
    introduction: {
      sourceFile: '81_chapter_9_armies.md'
    }
  },
  {
    id: 'chapter-10-maneuvers',
    chapterNumber: 10,
    title: 'Maneuvers',
    description: 'Strategic movement, campaign activities, and army supply',
    sourceFiles: [
      '88_chapter_10_maneuvers.md',
      '89_regions.md',
      '90_campaign_activities.md',
      '91_strategic_stance.md',
      '92_moving_armies.md',
      '93_supplying_armies.md',
      '94_equipment_availability_on_campaign.md',
      '95_reconnaissance_and_intelligence.md',
      '96_invading_conquering_occupying_and_pillaging_domain.md'
    ],
    introduction: {
      sourceFile: '88_chapter_10_maneuvers.md'
    }
  },
  {
    id: 'chapter-11-battles',
    chapterNumber: 11,
    title: 'Battles',
    description: 'Large-scale combat, battle resolution, and warfare tactics',
    sourceFiles: [
      '97_chapter_11_battles.md',
      '98_strategic_situations.md',
      '99_running_a_battle.md',
      '100_ending_battles.md',
      '101_aftermath_of_battles.md'
    ],
    introduction: {
      sourceFile: '97_chapter_11_battles.md'
    }
  },
  {
    id: 'chapter-12-sieges',
    chapterNumber: 12,
    title: 'Sieges',
    description: 'Siege warfare, fortress assault, and defensive strategies',
    sourceFiles: [
      '102_chapter_12_sieges.md',
      '103_methods_of_siege.md',
      '104_siege_mechanics.md',
      '105_blockade.md',
      '106_reduction.md',
      '107_assault.md',
      '108_ending_sieges.md',
      '109_sieges_simplified.md'
    ],
    introduction: {
      sourceFile: '102_chapter_12_sieges.md'
    }
  },
  {
    id: 'appendix-a-auran-empire',
    chapterNumber: 'A',
    title: 'Auran Empire',
    description: 'The default campaign setting for ACKS II',
    sourceFiles: [
      '110_appendix_a_auran_empire.md',
      '111_overview.md',
      '112_lands.md',
      '113_timeline.md',
      '114_customs.md',
      '115_people.md',
      '116_languages.md'
    ],
    appendix: true,
    introduction: {
      sourceFile: '110_appendix_a_auran_empire.md'
    }
  },
  {
    id: 'appendix-b-conditions',
    chapterNumber: 'B',
    title: 'Conditions',
    description: 'Status effects and conditions that affect characters',
    sourceFiles: ['117_appendix_b_conditions.md'],
    appendix: true,
    introduction: {
      sourceFile: '117_appendix_b_conditions.md'
    }
  },
  {
    id: 'appendix-c-wounds-and-woe',
    chapterNumber: 'C',
    title: 'Wounds and Woe',
    description: 'Optional rules for injuries and lasting consequences',
    sourceFiles: ['118_appendix_c_wounds_and_woe.md'],
    appendix: true,
    introduction: {
      sourceFile: '118_appendix_c_wounds_and_woe.md'
    }
  }
];

// Helper functions
const getRulebookBasePath = () => path.join(process.cwd(), 'src', 'lib', 'content', 'rulebook');

const readMarkdownFile = (filePath: string) => {
  try {
    const fullPath = path.join(getRulebookBasePath(), filePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { frontmatter: data, content: marked(content) };
  } catch (error) {
    console.error(`Error reading markdown file: ${filePath}`, error);
    throw new Error(`Could not read file: ${filePath}`);
  }
};

const getChapterNavigation = (currentChapterId: string) => {
  const currentIndex = CHAPTER_CONFIGS.findIndex(c => c.id === currentChapterId);
  if (currentIndex === -1) return {};

  const previous = CHAPTER_CONFIGS[currentIndex - 1];
  const next = CHAPTER_CONFIGS[currentIndex + 1];

  return {
    previousChapter: previous ? { href: `/rules/${previous.id}`, title: previous.title } : undefined,
    nextChapter: next ? { href: `/rules/${next.id}`, title: next.title } : undefined
  };
};

/**
 * Loads and processes all content for a given chapter ID.
 * This is the primary function for fetching chapter data for the template.
 */
export async function loadFullChapter(chapterId: string): Promise<ChapterContent> {
  const config = CHAPTER_CONFIGS.find(c => c.id === chapterId);

  if (!config) {
    throw new Error(`Configuration for chapter "${chapterId}" not found.`);
  }

  let introduction = '';
  if (config.introduction) {
    const introFile = readMarkdownFile(config.introduction.sourceFile);
    introduction = introFile.content;
  }

  const sections = config.sourceFiles.map(filename => {
    // Avoid duplicating introduction content in sections
    if (config.introduction && filename === config.introduction.sourceFile) {
      return null;
    }
    
    const { frontmatter, content } = readMarkdownFile(filename);
    const title = frontmatter.title || filename.replace('.md', '').replace(/_/g, ' ');
    const id = frontmatter.id || title.toLowerCase().replace(/\s+/g, '-');
    
    return {
      id,
      title,
      content,
      level: frontmatter.level || 2, // Default to h2 level
      sourceFile: filename,
    };
  }).filter((section): section is ChapterSection => section !== null);

  const navigation = getChapterNavigation(chapterId);

  return {
    id: config.id,
    chapterNumber: config.chapterNumber,
    title: config.title,
    description: config.description,
    appendix: config.appendix,
    introduction,
    sections,
    ...navigation,
  };
}

/**
 * Gets all chapter IDs for static path generation.
 */
export function getAllChapterIds() {
  return CHAPTER_CONFIGS.map(config => config.id);
}

/**
 * Retrieves the configuration for a single chapter.
 */
export function getChapterConfig(chapterId: string) {
  const config = CHAPTER_CONFIGS.find(c => c.id === chapterId);
  return config || null;
} 