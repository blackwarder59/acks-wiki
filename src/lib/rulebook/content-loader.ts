import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { ChapterContent } from '@/lib/types/content';

export const CHAPTER_CONFIGS = [
  {
    "id": "introduction",
    "title": "Introduction",
    "chapterNumber": 0,
    "description": "An introduction to the Adventurer Conqueror King System, including the basics of the game, how to use the rulebook, and common abbreviations.",
    "files": [
      "02_introduction.md",
      "03_about_the_game.md",
      "04_how_to_use_this_book.md",
      "05_the_basics_of_the_game.md",
      "06_dice.md",
      "07_rolling_and_throwing_the_dice.md",
      "08_common_abbreviations.md"
    ]
  },
  {
    "id": "chapter-1-characters",
    "title": "Characters",
    "chapterNumber": 1,
    "description": "This chapter provides the rules for creating and developing player characters.",
    "files": [
      "09_chapter_1_characters.md", "10_creating_a_character.md", "11_character_attributes.md", "12_combat_characteristics.md", "13_class_powers.md", "14_hit_points.md", "15_armor_class.md", "16_proficiencies.md", "17_speed_and_encumbrance.md", "18_homeland.md", "19_languages.md", "20_starting_age.md", "21_size_and_weight.md", "22_alignment.md", "23_adventuring_parties.md", "24_activities.md"
    ]
  },
  {
    "id": "chapter-2-classes",
    "title": "Classes",
    "chapterNumber": 2,
    "description": "This chapter details the various character classes available in ACKS.",
    "files": [
      "25_chapter_2_classes.md", "26_character_templates_and_intellect_scores.md", "27_core_classes.md", "fighter.md", "mage.md", "thief.md", "assassin.md", "bard.md", "bladedancer.md", "explorer.md", "venturer.md", "28_campaign_classes.md", "barbarian.md", "dwarven_vaultguard.md", "elven_spellsword.md", "priestess.md", "warlock.md", "29_demi_human_classes.md", "dwarven_craftpriest.md", "elven_nightblade.md", "nobiran_wonderworker.md", "paladin.md", "shaman.md", "witch.md", "zaharan_ruinguard.md", "crusader.md"
    ]
  },
  {
    "id": "chapter-3-proficiencies",
    "title": "Proficiencies",
    "chapterNumber": 3,
    "description": "This chapter covers the system of proficiencies that characters can learn.",
    "files": [
      "30_chapter_3_proficiencies.md", "31_the_basics_of_proficiencies.md", "32_starting_proficiencies.md", "33_gaining_proficiencies.md", "34_proficiency_lists.md", "35_proficiency_descriptions.md"
    ]
  },
  {
    "id": "chapter-4-equipment",
    "title": "Equipment",
    "chapterNumber": 4,
    "description": "This chapter details the arms, armor, and adventuring gear available for purchase.",
    "files": [
      "36_chapter_4_equipment.md", "37_the_basics_of_equipment.md", "38_coins_and_money.md", "39_purchasing_equipment.md", "40_equipment_lists.md", "41_equipment_descriptions.md", "42_masterwork_equipment_optional.md", "43_scavenged_equipment.md", "44_encumbrance_and_equipment.md", "45_hirelings_henchmen_mercenaries_and_specialists.md", "46_expected_living_expenses_optional.md", "47_construction_projects.md"
    ]
  },
  {
    "id": "chapter-5-spells",
    "title": "Spells",
    "chapterNumber": 5,
    "description": "This chapter explains the rules that govern spellcasting, spell lists, and detailed spell descriptions.",
    "files": [
      "48_chapter_5_spells.md", "49_spells_and_spell_casters.md", "50_spell_lists_by_magic_type.md", "51_spell_repertoires.md", "52_spell_reversal.md", "53_spell_signatures.md", "54_spell_types.md", "55_spell_lists_&_repertoires.md", "56_spell_descriptions.md"
    ]
  },
  {
    "id": "chapter-6-adventures",
    "title": "Adventures",
    "chapterNumber": 6,
    "description": "This chapter covers the rules for running adventures, including dungeon delves, wilderness expeditions, encounters, combat, and earning experience.",
    "files": [
      "57_chapter_6_adventures.md", "58_dungeon_delves.md", "59_wilderness_expeditions.md", "60_encounters.md", "61_combat.md", "62_earning_experience_from_adventures.md"
    ]
  },
  {
    "id": "chapter-7-voyages",
    "title": "Voyages",
    "chapterNumber": 7,
    "description": "This chapter provides rules for sea and river voyages, including vessels, encounters, and combat at sea.",
    "files": [
      "63_chapter_7_voyages.md", "64_seafarers.md", "65_sea_vessels.md", "66_sea_voyages.md", "67_sea_encounters.md", "68_sea_combat.md", "69_river_voyages.md"
    ]
  },
  {
    "id": "chapter-8-campaigns",
    "title": "Campaigns",
    "chapterNumber": 8,
    "description": "This chapter details long-term campaign play, including domain management, followers, strongholds, and magical research.",
    "files": [
      "70_chapter_8_campaigns.md", "71_activities_during_the_campaign.md", "72_followers_and_strongholds.md", "73_domains_and_realms.md", "74_politics_and_power.md", "75_hideouts_and_hijinks.md", "76_mercantile_ventures.md", "77_sanctums_and_dungeons.md", "78_magic_research.md", "79_congregants_and_divine_power.md", "80_earning_experience_from_campaigns.md"
    ]
  },
  {
    "id": "chapter-9-armies",
    "title": "Armies",
    "chapterNumber": 9,
    "description": "This chapter provides rules for raising and managing armies, including troop types and organization.",
    "files": [
      "81_chapter_9_armies.md", "82_army_troops.md", "83_army_organization.md", "84_army_command.md", "85_organization_and_command_in_very_small_or_very_lar.md", "86_troop_characteristics_summary.md", "87_unit_characteristics_summary.md"
    ]
  },
  {
    "id": "chapter-10-maneuvers",
    "title": "Maneuvers",
    "chapterNumber": 10,
    "description": "This chapter covers strategic maneuvers for armies on campaign, including movement, supply, and reconnaissance.",
    "files": [
        "88_chapter_10_maneuvers.md", "89_regions.md", "90_campaign_activities.md", "91_strategic_stance.md", "92_moving_armies.md", "93_supplying_armies.md", "94_equipment_availability_on_campaign.md", "95_reconnaissance_and_intelligence.md", "96_invading_conquering_occupying_and_pillaging_domain.md"
    ]
  },
  {
    "id": "chapter-11-battles",
    "title": "Battles",
    "chapterNumber": 11,
    "description": "This chapter provides rules for running battles between armies.",
    "files": [
        "97_chapter_11_battles.md", "98_strategic_situations.md", "99_running_a_battle.md", "100_ending_battles.md", "101_aftermath_of_battles.md"
    ]
  },
  {
    "id": "chapter-12-sieges",
    "title": "Sieges",
    "chapterNumber": 12,
    "description": "This chapter provides rules for sieges, including different methods and their mechanics.",
    "files": [
        "102_chapter_12_sieges.md", "103_methods_of_siege.md", "104_siege_mechanics.md", "105_blockade.md", "106_reduction.md", "107_assault.md", "108_ending_sieges.md", "109_sieges_simplified.md"
    ]
  },
  {
    "id": "appendix-a-auran-empire",
    "title": "Appendix A: Auran Empire",
    "chapterNumber": 13,
    "description": "This appendix provides an overview of the Auran Empire, including its lands, timeline, customs, people, and languages.",
    "files": [
      "110_appendix_a_auran_empire.md", "111_overview.md", "112_lands.md", "113_timeline.md", "114_customs.md", "115_people.md", "116_languages.md"
    ]
  },
  {
    "id": "appendix-b-conditions",
    "title": "Appendix B: Conditions",
    "chapterNumber": 14,
    "description": "This appendix provides rules and conditions for various scenarios and situations.",
    "files": [
      "117_appendix_b_conditions.md"
    ]
  },
  {
    "id": "appendix-c-wounds-and-woe",
    "title": "Appendix C: Wounds and Woe",
    "chapterNumber": 15,
    "description": "This appendix details critical hit tables and other effects of grievous injuries.",
    "files": [
      "118_appendix_c_wounds_and_woe.md"
    ]
  }
];

// Helper function to generate a slug from a title
const slugify = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};


const getRulebookBasePath = () => path.join(process.cwd(), 'src', 'lib', 'content', 'rulebook');

export const getChapterConfig = (chapterId: string) => {
  return CHAPTER_CONFIGS.find(c => c.id === chapterId);
};

export const loadFullChapter = async (chapterId: string): Promise<ChapterContent | null> => {
  const chapterConfig = getChapterConfig(chapterId);
  if (!chapterConfig) return null;

  const fullContent = chapterConfig.files.map(file => {
    const filePath = path.join(getRulebookBasePath(), file);
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      console.error(`Could not read file: ${filePath}`);
      return '';
    }
  }).join('\n\n');

  const { data: frontmatter, content } = matter(fullContent);
  
  const tokens = marked.lexer(content);
  
  const sections: { id: string; title: string; content: string; level: number }[] = [];
  let sectionPromises: Promise<{ id: string; title: string; content: string; level: number }>[] = [];
  
  let currentSection: { id: string; title: string; raw: string; level: number } | null = null;
  
  tokens.forEach(token => {
    if (token.type === 'heading' && (token.depth === 1 || token.depth === 2)) {
      if (currentSection) {
        const { id, title, raw, level } = currentSection;
        sectionPromises.push(
          Promise.resolve(marked(raw)).then(html => ({
            id,
            title,
            content: html,
            level,
          }))
        );
      }
      const title = token.text;
      const id = slugify(title);
      currentSection = { id, title, raw: '', level: token.depth };
    } else if (currentSection) {
        currentSection.raw += token.raw;
    }
  });

  if (currentSection) {
    const { id, title, raw, level } = currentSection;
    sectionPromises.push(
      Promise.resolve(marked(raw)).then(html => ({
        id,
        title,
        content: html,
        level,
      }))
    );
  }

  const resolvedSections = await Promise.all(sectionPromises);

  const currentIndex = CHAPTER_CONFIGS.findIndex(c => c.id === chapterId);
  
  const getChapterNav = (index: number) => {
    if (index >= 0 && index < CHAPTER_CONFIGS.length) {
      const config = CHAPTER_CONFIGS[index];
      return { href: `/rules/${config.id}`, title: config.title };
    }
    return undefined;
  };
  
  const previousChapter = getChapterNav(currentIndex - 1);
  const nextChapter = getChapterNav(currentIndex + 1);

  const introductionHtml = frontmatter.introduction ? await marked(frontmatter.introduction) : '';

  return {
    id: chapterId,
    title: chapterConfig.title,
    chapterNumber: chapterConfig.chapterNumber,
    description: frontmatter.description || chapterConfig.description || '',
    introduction: introductionHtml,
    sections: resolvedSections,
    appendix: frontmatter.appendix || false,
    previousChapter,
    nextChapter,
  };
};
