/**
 * UI Components Index
 * 
 * Exports all reusable UI components for the ACKS II Wiki.
 * These components provide enhanced user interface functionality
 * with responsive design and accessibility features.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

// Responsive table components
export { 
  ResponsiveTable,
  type TableColumn,
  type SortConfig,
  type ResponsiveTableProps 
} from './responsive-table';

export { 
  MobileCardTable,
  type CardField,
  type MobileCardTableProps,
  columnsToFields 
} from './mobile-card-table';

export { 
  AdaptiveTable,
  type ViewMode,
  type BreakpointConfig,
  type AdaptiveTableProps 
} from './adaptive-table';

// Cross-reference components
export {
  LinkableText,
  type LinkStyle,
  type LinkableTextProps
} from './linkable-text';

// Tooltip components
export {
  TooltipProvider,
  useTooltip,
  type TooltipPosition,
  type TooltipConfig
} from './tooltip-provider';

export {
  TooltipTrigger,
  useTooltipTrigger,
  type TooltipTriggerProps
} from './tooltip-trigger';

export {
  ContentPreview,
  AsyncContentPreview,
  type ContentPreviewProps
} from './content-preview';

// Performance and lazy loading components
export {
  LazyImage,
  useImagePreloader,
  generateResponsiveImageUrls,
  type LazyImageProps,
  type LazyImageConfig
} from './lazy-image';

export {
  ContentPlaceholder,
  SkeletonBase,
  SkeletonText,
  MonsterCardPlaceholder,
  SpellCardPlaceholder,
  EquipmentTablePlaceholder,
  ClassDescriptionPlaceholder,
  RuleSectionPlaceholder,
  SearchResultPlaceholder,
  CardGridPlaceholder,
  ListPlaceholder
} from './content-placeholders';

export {
  VirtualizedList,
  useVirtualizedList,
  type VirtualizedListProps,
  type VirtualizedListConfig,
  type VirtualizedListItemProps
} from './virtualized-list';

// Interactive features components
export {
  CopyButton,
  useCopyToClipboard,
  createCopyContent,
  type CopyButtonProps,
  type CopyButtonConfig,
  type CopyFormat
} from './copy-button';

export {
  Backlinks,
  type BacklinksProps,
  type BacklinksConfig,
  type BacklinkSortOption,
  type BacklinkFilters
} from './backlinks';

// Base content card component
export {
  BaseContentCard,
  type BaseContentCardProps
} from '../content/base-content-card'; 