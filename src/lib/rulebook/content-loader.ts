import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { ChapterContent } from '@/lib/types/content';

const CHAPTER_CONFIGS = [
  {
    "id": "chapter-1-characters",
    "title": "Characters",
    "chapterNumber": 1,
    "description": "This chapter provides the rules for creating and developing player characters.",
    "files": [
      "09_chapter_1_characters.md",
      "10_creating_a_character.md",
      "11_character_attributes.md",
      "12_combat_characteristics.md",
      "13_class_powers.md",
      "14_hit_points.md",
      "15_armor_class.md",
      "16_proficiencies.md",
      "17_speed_and_encumbrance.md",
      "18_homeland.md",
      "19_languages.md",
      "20_starting_age.md",
      "21_size_and_weight.md",
      "22_alignment.md",
      "23_adventuring_parties.md",
      "24_activities.md"
    ]
  },
  {
    "id": "chapter-2-classes",
    "title": "Classes",
    "chapterNumber": 2,
    "description": "This chapter details the various character classes available in ACKS.",
    "files": [
      "25_chapter_2_classes.md",
      "26_character_templates_and_intellect_scores.md",
      "27_core_classes.md",
      "fighter.md",
      "mage.md",
      "thief.md",
      "assassin.md",
      "bard.md",
      "bladedancer.md",
      "explorer.md",
      "venturer.md",
      "28_campaign_classes.md",
      "barbarian.md",
      "dwarven_vaultguard.md",
      "elven_spellsword.md",
      "priestess.md",
      "warlock.md",
      "29_demi_human_classes.md",
      "dwarven_craftpriest.md",
      "elven_nightblade.md",
      "nobiran_wonderworker.md",
      "paladin.md",
      "shaman.md",
      "witch.md",
      "zaharan_ruinguard.md",
      "crusader.md"
    ]
  },
  {
    "id": "chapter-3-proficiencies",
    "title": "Proficiencies",
    "chapterNumber": 3,
    "description": "This chapter covers the system of proficiencies that characters can learn.",
    "files": [
      "30_chapter_3_proficiencies.md",
      "31_the_basics_of_proficiencies.md",
      "32_starting_proficiencies.md",
      "33_gaining_proficiencies.md",
      "34_proficiency_lists.md",
      "35_proficiency_descriptions.md"
    ]
  },
  {
    "id": "chapter-4-equipment",
    "title": "Equipment",
    "chapterNumber": 4,
    "description": "This chapter details the arms, armor, and adventuring gear available for purchase.",
    "files": [
      "36_chapter_4_equipment.md",
      "37_the_basics_of_equipment.md",
      "38_coins_and_money.md",
      "39_purchasing_equipment.md",
      "40_equipment_lists.md",
      "41_equipment_descriptions.md",
      "42_masterwork_equipment_optional.md",
      "43_scavenged_equipment.md",
      "44_encumbrance_and_equipment.md",
      "45_hirelings_henchmen_mercenaries_and_specialists.md",
      "46_expected_living_expenses_optional.md",
      "47_construction_projects.md"
    ]
  },
  {
    "id": "chapter-5-spells",
    "title": "Spells",
    "chapterNumber": 5,
    "description": "This chapter explains the rules that govern spellcasting, spell lists, and detailed spell descriptions.",
    "files": [
      "48_chapter_5_spells.md",
      "50_spell_lists_by_magic_type.md",
      "51_spell_repertoires.md",
      "52_spell_reversal.md",
      "53_spell_signatures.md",
      "54_spell_types.md",
      "55_spell_lists_&_repertoires.md",
      "56_spell_descriptions.md"
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
