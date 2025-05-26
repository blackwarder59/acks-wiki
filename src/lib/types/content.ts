/**
 * ACKS II Content Type Definitions
 * 
 * This file contains TypeScript interfaces for all ACKS II content types
 * based on the structure found in the markdown files. These interfaces
 * define the shape of data after parsing the markdown content.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

// ============================================================================
// BASE INTERFACES AND ENUMS
// ============================================================================

/**
 * Base interface for all content items with common properties
 */
export interface BaseContent {
  /** Unique identifier for the content item */
  id: string;
  /** Display title of the content */
  title: string;
  /** Brief description or summary */
  description?: string;
  /** Source file path where this content was parsed from */
  sourceFile: string;
  /** Content category (Rulebook, Judges_Journal, Monstrous_Manual) */
  category: ContentCategory;
  /** Type of content within the category */
  contentType: ContentType;
  /** Cross-references to other content items */
  crossReferences?: CrossReference[];
  /** Tags for categorization and search */
  tags?: string[];
  /** Last modified timestamp */
  lastModified?: Date;
}

/**
 * Content categories from the ACKS II source material
 */
export enum ContentCategory {
  RULEBOOK = 'Rulebook',
  JUDGES_JOURNAL = 'Judges_Journal',
  MONSTROUS_MANUAL = 'Monstrous_Manual'
}

/**
 * Types of content within each category
 */
export enum ContentType {
  MONSTER = 'monster',
  SPELL = 'spell',
  CLASS = 'class',
  EQUIPMENT = 'equipment',
  RULE = 'rule',
  PROFICIENCY = 'proficiency',
  DOMAIN_RULE = 'domain_rule',
  JUDGE_TOOL = 'judge_tool'
}

/**
 * Cross-reference to another content item
 */
export interface CrossReference {
  /** ID of the referenced content */
  targetId: string;
  /** Type of reference (mentions, requires, etc.) */
  referenceType: ReferenceType;
  /** Context where the reference appears */
  context?: string;
}

/**
 * Types of cross-references between content
 */
export enum ReferenceType {
  MENTIONS = 'mentions',
  REQUIRES = 'requires',
  RELATED = 'related',
  VARIANT = 'variant',
  PREREQUISITE = 'prerequisite'
}

// ============================================================================
// MONSTER INTERFACES
// ============================================================================

/**
 * Complete monster definition from the Monstrous Manual
 */
export interface Monster extends BaseContent {
  contentType: ContentType.MONSTER;
  /** Primary characteristics table data */
  primaryCharacteristics: MonsterPrimaryCharacteristics;
  /** Secondary characteristics table data */
  secondaryCharacteristics?: MonsterSecondaryCharacteristics;
  /** Encounter setup information */
  encounterSetup: MonsterEncounterSetup;
  /** Combat behavior and special abilities */
  combat?: MonsterCombat;
  /** Ecological information and habitat */
  ecology?: MonsterEcology;
  /** Treasure and components that can be harvested */
  spoils?: MonsterSpoils;
  /** Base64 encoded image data if present */
  image?: string;
  /** Full descriptive text */
  description: string;
}

/**
 * Primary characteristics from monster stat block
 */
export interface MonsterPrimaryCharacteristics {
  /** Monster type and subtype */
  type: string;
  /** Size category and weight */
  size: string;
  /** Land movement speed */
  speedLand?: string;
  /** Flying movement speed */
  speedFly?: string;
  /** Swimming movement speed */
  speedSwim?: string;
  /** Armor class value */
  armorClass: number;
  /** Hit dice notation */
  hitDice: string;
  /** Number and types of attacks */
  attacks: string;
  /** Damage notation for attacks */
  damage: string;
  /** Saving throw progression */
  save: string;
  /** Morale modifier */
  morale: string;
  /** Vision types and ranges */
  vision: string;
  /** Other sensory abilities */
  otherSenses?: string;
  /** Proficiencies possessed */
  proficiencies?: string;
  /** Normal carrying capacity */
  normalLoad?: string;
}

/**
 * Secondary characteristics for monsters
 */
export interface MonsterSecondaryCharacteristics {
  /** Expedition movement speed */
  expeditionSpeed?: string;
  /** Daily supply cost */
  supplyCost?: string;
  /** Training time required */
  trainingPeriod?: string;
  /** Training difficulty modifier */
  trainingModifier?: string;
  /** Battle rating for combat */
  battleRating?: string;
  /** Lifespan stages */
  lifespan?: string;
  /** Reproduction rate and method */
  reproduction?: string;
  /** Value when untrained */
  untrainedValue?: string;
  /** Value when trained */
  trainedValue?: string;
}

/**
 * Encounter setup information
 */
export interface MonsterEncounterSetup {
  /** Percentage chance of lair encounter */
  lair?: string;
  /** Dungeon encounter details */
  dungeonEnc?: string;
  /** Wilderness encounter group sizes */
  wildernessEnc?: string;
  /** Moral alignment */
  alignment: string;
  /** Treasure type carried */
  treasureType?: string;
  /** Experience points awarded */
  xp: number;
}

/**
 * Combat abilities and tactics
 */
export interface MonsterCombat {
  /** Special combat abilities */
  specialAbilities?: string[];
  /** Combat tactics description */
  tactics?: string;
  /** Damage immunities or resistances */
  resistances?: string[];
}

/**
 * Ecological and habitat information
 */
export interface MonsterEcology {
  /** Natural habitat description */
  habitat?: string;
  /** Offspring information */
  offspring?: string;
  /** Behavioral notes */
  behavior?: string;
}

/**
 * Treasure and harvestable components
 */
export interface MonsterSpoils {
  /** Components for magic research */
  magicComponents?: MagicComponent[];
  /** Valuable parts (claws, teeth, etc.) */
  valuableParts?: ValuablePart[];
  /** Training requirements */
  trainingNotes?: string;
}

/**
 * Magic research component
 */
export interface MagicComponent {
  /** Name of the component */
  name: string;
  /** Weight in stone */
  weight: string;
  /** Gold piece value */
  value: number;
  /** Spells this component can be used for */
  spells: string[];
}

/**
 * Valuable monster part
 */
export interface ValuablePart {
  /** Name of the part */
  name: string;
  /** Weight in stone */
  weight: string;
  /** Gold piece value */
  value: number;
  /** Quantity available */
  quantity?: string;
}

// ============================================================================
// SPELL INTERFACES
// ============================================================================

/**
 * Complete spell definition
 */
export interface Spell extends BaseContent {
  contentType: ContentType.SPELL;
  /** Magic type (Arcane or Divine) */
  magicType: MagicType;
  /** Spell level (1-6) */
  level: number;
  /** Spell type classification */
  spellType: string;
  /** Casting range */
  range: string;
  /** Effect duration */
  duration: string;
  /** Full spell description */
  description: string;
  /** Spell school or category */
  school?: string;
  /** Components required for casting */
  components?: SpellComponent[];
  /** Saving throw information */
  savingThrow?: string;
  /** Spell resistance information */
  spellResistance?: string;
}

/**
 * Magic types available in ACKS II
 */
export enum MagicType {
  ARCANE = 'Arcane',
  DIVINE = 'Divine'
}

/**
 * Spell component requirement
 */
export interface SpellComponent {
  /** Type of component */
  type: ComponentType;
  /** Description of the component */
  description: string;
  /** Whether component is consumed */
  consumed?: boolean;
}

/**
 * Types of spell components
 */
export enum ComponentType {
  VERBAL = 'verbal',
  SOMATIC = 'somatic',
  MATERIAL = 'material',
  FOCUS = 'focus'
}

// ============================================================================
// CHARACTER CLASS INTERFACES
// ============================================================================

/**
 * Complete character class definition
 */
export interface CharacterClass extends BaseContent {
  contentType: ContentType.CLASS;
  /** Primary attribute for the class */
  keyAttribute: string;
  /** Minimum requirements to play the class */
  requirements: string;
  /** Hit dice type */
  hitDice: string;
  /** Maximum level achievable */
  maximumLevel: number;
  /** Level progression table */
  levelProgression: LevelProgression[];
  /** Attack and saving throw progression */
  combatProgression: CombatProgression[];
  /** Combat proficiencies and abilities */
  combatCharacteristics: CombatCharacteristics;
  /** Starting class powers */
  startingPowers: ClassPower[];
  /** Additional powers gained by level */
  additionalPowers: ClassPower[];
  /** Proficiency progression rules */
  proficiencyProgression: ProficiencyProgression;
  /** Available class proficiencies */
  classProficiencies: string[];
  /** Starting templates for character creation */
  templates: ClassTemplate[];
  /** Full class description */
  description: string;
}

/**
 * Level progression entry
 */
export interface LevelProgression {
  /** Experience points required */
  experience: number;
  /** Title at this level */
  title: string;
  /** Level number */
  level: number;
  /** Hit dice at this level */
  hitDice: string;
  /** Damage bonus at this level */
  damageBonus: string;
  /** Additional level-specific information */
  notes?: string;
}

/**
 * Combat progression by level
 */
export interface CombatProgression {
  /** Level or level range */
  level: string;
  /** Paralysis saving throw */
  paralysis: string;
  /** Death saving throw */
  death: string;
  /** Blast saving throw */
  blast: string;
  /** Implements saving throw */
  implements: string;
  /** Spells saving throw */
  spells: string;
  /** Attack throw target */
  attackThrow: string;
}

/**
 * Combat characteristics and proficiencies
 */
export interface CombatCharacteristics {
  /** Weapon proficiencies */
  weaponProficiencies: string;
  /** Armor proficiencies */
  armorProficiencies: string;
  /** Fighting style proficiencies */
  fightingStyles: string;
  /** Combat progression notes */
  progressionNotes: string;
}

/**
 * Class power or ability
 */
export interface ClassPower {
  /** Name of the power */
  name: string;
  /** Level when power is gained */
  level: number;
  /** Description of the power */
  description: string;
  /** Whether power is active or passive */
  type: PowerType;
}

/**
 * Types of class powers
 */
export enum PowerType {
  ACTIVE = 'active',
  PASSIVE = 'passive',
  TRIGGERED = 'triggered'
}

/**
 * Proficiency progression rules
 */
export interface ProficiencyProgression {
  /** Starting proficiencies */
  starting: string;
  /** Class proficiency progression */
  classProficiencies: string;
  /** General proficiency progression */
  generalProficiencies: string;
}

/**
 * Character creation template
 */
export interface ClassTemplate {
  /** Dice roll range for this template */
  rollRange: string;
  /** Template name */
  name: string;
  /** Starting proficiencies */
  proficiencies: string[];
  /** Starting equipment list */
  equipment: string;
  /** Encumbrance total */
  encumbrance?: string;
}

// ============================================================================
// EQUIPMENT INTERFACES
// ============================================================================

/**
 * Equipment item definition
 */
export interface Equipment extends BaseContent {
  contentType: ContentType.EQUIPMENT;
  /** Equipment category */
  equipmentCategory: EquipmentCategory;
  /** Cost in gold pieces */
  cost: number;
  /** Weight in stone */
  weight: number;
  /** Damage dice if weapon */
  damage?: string;
  /** Armor class if armor */
  armorClass?: number;
  /** Range if missile weapon */
  range?: string;
  /** Special properties */
  properties?: string[];
  /** Detailed description */
  description: string;
  /** Availability in different markets */
  availability?: EquipmentAvailability;
}

/**
 * Equipment categories
 */
export enum EquipmentCategory {
  WEAPON = 'weapon',
  ARMOR = 'armor',
  SHIELD = 'shield',
  GEAR = 'gear',
  TOOL = 'tool',
  TRANSPORT = 'transport',
  TRADE_GOOD = 'trade_good'
}

/**
 * Equipment availability in different market types
 */
export interface EquipmentAvailability {
  /** Available in village markets */
  village?: boolean;
  /** Available in town markets */
  town?: boolean;
  /** Available in city markets */
  city?: boolean;
  /** Special availability notes */
  notes?: string;
}

// ============================================================================
// RULE AND PROFICIENCY INTERFACES
// ============================================================================

/**
 * Game rule definition
 */
export interface Rule extends BaseContent {
  contentType: ContentType.RULE;
  /** Rule category */
  ruleCategory: RuleCategory;
  /** Detailed rule text */
  ruleText: string;
  /** Examples of rule application */
  examples?: string[];
  /** Related rules */
  relatedRules?: string[];
}

/**
 * Categories of game rules
 */
export enum RuleCategory {
  COMBAT = 'combat',
  MAGIC = 'magic',
  EXPLORATION = 'exploration',
  DOMAIN = 'domain',
  CAMPAIGN = 'campaign'
}

/**
 * Proficiency definition
 */
export interface Proficiency extends BaseContent {
  contentType: ContentType.PROFICIENCY;
  /** Proficiency category */
  proficiencyCategory: ProficiencyCategory;
  /** Detailed description */
  description: string;
  /** Mechanical effects */
  effects: string;
  /** Prerequisites if any */
  prerequisites?: string[];
  /** Classes that can take this proficiency */
  availableToClasses?: string[];
}

/**
 * Categories of proficiencies
 */
export enum ProficiencyCategory {
  GENERAL = 'general',
  CLASS = 'class',
  FIGHTING_STYLE = 'fighting_style'
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Union type for all content types
 */
export type AnyContent = Monster | Spell | CharacterClass | Equipment | Rule | Proficiency;

/**
 * Content search result
 */
export interface SearchResult {
  /** The content item */
  content: AnyContent;
  /** Search relevance score */
  score: number;
  /** Matched text snippets */
  highlights?: string[];
}

/**
 * Content collection for a specific type
 */
export interface ContentCollection<T extends AnyContent> {
  /** Array of content items */
  items: T[];
  /** Total count */
  total: number;
  /** Collection metadata */
  metadata: CollectionMetadata;
}

/**
 * Metadata for content collections
 */
export interface CollectionMetadata {
  /** When collection was last updated */
  lastUpdated: Date;
  /** Source files processed */
  sourceFiles: string[];
  /** Processing statistics */
  processingStats: ProcessingStats;
}

/**
 * Statistics from content processing
 */
export interface ProcessingStats {
  /** Total files processed */
  filesProcessed: number;
  /** Files with errors */
  filesWithErrors: number;
  /** Processing time in milliseconds */
  processingTime: number;
  /** Cross-references found */
  crossReferencesFound: number;
}

/**
 * Error information for failed parsing
 */
export interface ParseError {
  /** Source file where error occurred */
  sourceFile: string;
  /** Line number if available */
  lineNumber?: number;
  /** Error message */
  message: string;
  /** Error severity */
  severity: ErrorSeverity;
}

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
} 