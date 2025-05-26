/**
 * Content Display Components Index
 * 
 * Exports all content display components for the ACKS II Wiki.
 * These components provide structured, responsive displays for
 * different types of ACKS II content.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

// Base content card component
export { BaseContentCard } from './base-content-card';

// Monster display components
export { 
  MonsterCard, 
  CompactMonsterCard,
  type MonsterCardProps 
} from './monster-card';

// Spell display components
export { 
  SpellList,
  type SpellListProps 
} from './spell-list';

// Character class display components
export { 
  ClassDescription, 
  CompactClassDescription,
  type ClassDescriptionProps 
} from './class-description';

// Equipment display components
export { 
  EquipmentTable,
  EnhancedEquipmentTable,
  type EquipmentTableProps 
} from './equipment-table';

// Rule display components
export { 
  RuleSection, 
  CompactRuleSection,
  type RuleSectionProps 
} from './rule-section'; 