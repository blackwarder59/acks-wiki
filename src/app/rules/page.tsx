/**
 * Rules Page - ACKS II Rulebook Content
 * 
 * Displays the converted rulebook content organized by categories
 */

import Link from 'next/link';
import { Book, Users, Sword, Sparkles, Coins, Scroll, Crown, Globe, Search, BookOpen, ArrowRight } from 'lucide-react';

// Chapter configs copied locally to avoid fs import issues
const CHAPTER_CONFIGS = [
  {
    id: 'chapter-1-characters',
    chapterNumber: 1,
    title: 'Characters',
    description: 'Character creation, attributes, and basic character mechanics'
  },
  {
    id: 'chapter-2-classes', 
    chapterNumber: 2,
    title: 'Classes',
    description: 'Character classes with progression tables and class features'
  },
  {
    id: 'chapter-3-proficiencies',
    chapterNumber: 3,
    title: 'Proficiencies',
    description: 'Skills and abilities characters can learn and master'
  },
  {
    id: 'chapter-4-equipment',
    chapterNumber: 4,
    title: 'Equipment',
    description: 'Weapons, armor, gear, and adventuring equipment'
  },
  {
    id: 'chapter-5-spells',
    chapterNumber: 5,
    title: 'Spells',
    description: 'Magic system, spell lists, and complete spell descriptions'
  }
];

interface RulebookSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  files: string[];
  color: string;
}

export default async function RulesPage() {

  // Categorize the rulebook content
  const sections: RulebookSection[] = [
    {
      id: 'character-creation',
      title: 'Character Creation',
      description: 'Everything needed to create and develop characters',
      icon: <Users className="w-6 h-6" />,
      color: 'blue',
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
    {
      id: 'classes',
      title: 'Character Classes',
      description: 'Core and campaign classes with full progression details',
      icon: <Crown className="w-6 h-6" />,
      color: 'purple',
      files: [
        '25_chapter_2_classes',
        '26_character_templates_and_intellect_scores',
        '27_core_classes',
        '28_campaign_classes', 
        '29_demi_human_classes'
      ]
    },
    {
      id: 'proficiencies',
      title: 'Proficiencies',
      description: 'Skills and abilities characters can learn',
      icon: <Scroll className="w-6 h-6" />,
      color: 'green',
      files: [
        '30_chapter_3_proficiencies',
        '31_the_basics_of_proficiencies',
        '32_starting_proficiencies',
        '33_gaining_proficiencies',
        '34_proficiency_lists',
        '35_proficiency_descriptions'
      ]
    },
    {
      id: 'equipment',
      title: 'Equipment & Gear',
      description: 'Weapons, armor, and adventuring equipment',
      icon: <Sword className="w-6 h-6" />,
      color: 'orange',
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
    {
      id: 'spells',
      title: 'Spells & Magic',
      description: 'Complete spell system and magical rules',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'indigo',
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
    {
      id: 'adventures',
      title: 'Adventures',
      description: 'Dungeon delving, wilderness exploration, and encounters',
      icon: <Globe className="w-6 h-6" />,
      color: 'emerald',
      files: [
        '57_chapter_6_adventures',
        '58_dungeon_delves',
        '59_wilderness_expeditions',
        '60_encounters',
        '61_combat',
        '62_earning_experience_from_adventures'
      ]
    },
    {
      id: 'voyages',
      title: 'Voyages',
      description: 'Sea travel, naval combat, and maritime adventures',
      icon: <Coins className="w-6 h-6" />,
      color: 'cyan',
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
    {
      id: 'campaigns',
      title: 'Campaigns',
      description: 'Domain management, politics, and high-level play',
      icon: <Crown className="w-6 h-6" />,
      color: 'red',
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
    {
      id: 'armies',
      title: 'Armies & War',
      description: 'Military organization and mass combat',
      icon: <Sword className="w-6 h-6" />,
      color: 'stone',
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
    {
      id: 'maneuvers',
      title: 'Maneuvers & Strategy', 
      description: 'Strategic movement and campaign maneuvers',
      icon: <Globe className="w-6 h-6" />,
      color: 'amber',
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
    {
      id: 'battles',
      title: 'Battles',
      description: 'Large-scale combat and warfare',
      icon: <Sword className="w-6 h-6" />,
      color: 'rose',
      files: [
        '97_chapter_11_battles',
        '98_strategic_situations',
        '99_running_a_battle'
      ]
    },
    {
      id: 'appendices',
      title: 'Setting & Appendices',
      description: 'The Auran Empire setting and reference materials',
      icon: <Book className="w-6 h-6" />,
      color: 'violet',
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
  ];

  // All sections without filtering

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          ACKS II Rulebook
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          The complete rules for the Adventurer Conqueror King System. From character creation to 
          domain management, everything you need to run epic campaigns in the Auran Empire.
        </p>
      </div>



      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-2xl font-bold text-foreground">118</div>
          <div className="text-sm text-muted-foreground">Rule Sections</div>
        </div>
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-2xl font-bold text-foreground">12</div>
          <div className="text-sm text-muted-foreground">Chapters</div>
        </div>
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-2xl font-bold text-foreground">Complete</div>
          <div className="text-sm text-muted-foreground">Game System</div>
        </div>
      </div>

      {/* Browse by Chapter - NEW REORGANIZED STRUCTURE */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Browse by Chapter</h2>
          <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
            NEW
          </span>
        </div>
        <p className="text-muted-foreground mb-6 max-w-3xl">
          Experience the ACKS II Rulebook in its intended chapter-based organization. 
          Each chapter includes comprehensive navigation, cross-references, and all related content.
        </p>
        
        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHAPTER_CONFIGS.map((chapter) => (
            <Link 
              key={chapter.id}
              href={`/rules/${chapter.id}`}
              className="group"
            >
              <div className="p-4 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                      Ch. {chapter.chapterNumber}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {chapter.title}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {chapter.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Legacy Browse by Topic */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Search className="w-6 h-6 text-muted-foreground" />
          <h2 className="text-2xl font-bold text-foreground">Browse by Topic</h2>
          <span className="text-sm bg-muted text-muted-foreground px-2 py-1 rounded-full">
            Legacy View
          </span>
        </div>
        <p className="text-muted-foreground mb-6 max-w-3xl">
          Browse rules organized by gameplay topics. This view groups related sections together 
          for quick reference during play.
        </p>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link 
            key={section.id}
            href={`/rules/${section.id}`}
            className="group"
          >
            <div className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer h-full">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 bg-${section.color}-500/10 rounded-lg`}>
                  {section.icon}
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {section.files.length} sections
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                {section.title}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {section.description}
              </p>
            </div>
          </Link>
        ))}
      </div>


    </div>
  );
} 