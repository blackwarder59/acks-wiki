import { Metadata } from 'next';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Proficiencies Index Page
 * 
 * Main landing page for browsing all ACKS II proficiencies
 * Provides search, filtering, and navigation to individual proficiency pages
 */

// Define proficiency categories for organization
const PROFICIENCY_CATEGORIES = [
  { id: 'general', name: 'General Proficiencies', description: 'Available to all character classes' },
  { id: 'combat', name: 'Combat Proficiencies', description: 'Fighting styles and weapon expertise' },
  { id: 'magical', name: 'Magical Proficiencies', description: 'Spellcasting and magical knowledge' },
  { id: 'divine', name: 'Divine Proficiencies', description: 'Religious and divine abilities' },
  { id: 'thievery', name: 'Thievery Proficiencies', description: 'Stealth and infiltration skills' },
  { id: 'knowledge', name: 'Knowledge & Lore', description: 'Scholarly and academic skills' },
  { id: 'survival', name: 'Survival & Exploration', description: 'Wilderness and travel abilities' },
  { id: 'social', name: 'Social & Performance', description: 'Interpersonal and artistic skills' },
  { id: 'craft', name: 'Craft & Trade', description: 'Professional and artisan skills' }
];

// Comprehensive proficiency data
const ALL_PROFICIENCIES = [
  // General Proficiencies (marked with category: 'general')
  { id: 'adventuring', name: 'Adventuring', category: 'general', description: 'Basic adventuring skills including climbing, searching, and survival' },
  { id: 'alchemy', name: 'Alchemy', category: 'general', description: 'Creation of potions, oils, and alchemical substances' },
  { id: 'animal-husbandry', name: 'Animal Husbandry', category: 'general', description: 'Breeding, care, and management of domesticated animals' },
  { id: 'animal-training', name: 'Animal Training', category: 'general', description: 'Training animals to perform specific tasks and behaviors' },
  { id: 'art', name: 'Art', category: 'general', description: 'Creation of visual, performing, and literary arts' },
  { id: 'bargaining', name: 'Bargaining', category: 'general', description: 'Negotiating favorable prices and commercial terms' },
  { id: 'caving', name: 'Caving', category: 'survival', description: 'Navigation and survival in underground environments' },
  { id: 'collegiate-wizardry', name: 'Collegiate Wizardry', category: 'magical', description: 'Formal magical education and academic spellcasting' },
  { id: 'craft', name: 'Craft', category: 'craft', description: 'Creation of goods using specialized tools and techniques' },
  { id: 'diplomacy', name: 'Diplomacy', category: 'social', description: 'Peaceful negotiation and conflict resolution' },
  { id: 'disguise', name: 'Disguise', category: 'general', description: 'Altering appearance to avoid recognition' },
  { id: 'driving', name: 'Driving', category: 'general', description: 'Operating wagons, carts, and other vehicles' },
  { id: 'endurance', name: 'Endurance', category: 'survival', description: 'Extended physical activity and resistance to fatigue' },
  { id: 'engineering', name: 'Engineering', category: 'craft', description: 'Design and construction of mechanical devices and structures' },
  { id: 'folkways', name: 'Folkways', category: 'knowledge', description: 'Understanding of local customs and cultural practices' },
  { id: 'gambling', name: 'Gambling', category: 'social', description: 'Games of chance and reading opponents' },
  { id: 'healing', name: 'Healing', category: 'general', description: 'Natural treatment of wounds and diseases' },
  { id: 'intimidation', name: 'Intimidation', category: 'social', description: 'Using fear and presence to influence others' },
  { id: 'knowledge', name: 'Knowledge', category: 'knowledge', description: 'Specialized learning in specific academic fields' },
  { id: 'labor', name: 'Labor', category: 'craft', description: 'Physical work and manual labor skills' },
  { id: 'language', name: 'Language', category: 'knowledge', description: 'Speaking, reading, and writing additional languages' },
  { id: 'leadership', name: 'Leadership', category: 'social', description: 'Inspiring and commanding followers effectively' },
  { id: 'lip-reading', name: 'Lip Reading', category: 'general', description: 'Understanding speech by watching lip movements' },
  { id: 'manual-of-arms', name: 'Manual of Arms', category: 'combat', description: 'Military drill and weapon ceremony' },
  { id: 'mapping', name: 'Mapping', category: 'survival', description: 'Creating and interpreting maps and layouts' },
  { id: 'military-strategy', name: 'Military Strategy', category: 'combat', description: 'Tactical knowledge and mass combat leadership' },
  { id: 'mimicry', name: 'Mimicry', category: 'social', description: 'Imitating animal calls and foreign accents' },
  { id: 'mountaineering', name: 'Mountaineering', category: 'survival', description: 'Climbing mountains and cliff faces with gear' },
  { id: 'naturalism', name: 'Naturalism', category: 'knowledge', description: 'Knowledge of plants, animals, and natural phenomena' },
  { id: 'navigation', name: 'Navigation', category: 'survival', description: 'Finding direction using celestial and landmark navigation' },
  { id: 'performance', name: 'Performance', category: 'social', description: 'Music, dance, theater, and other entertainment arts' },
  { id: 'profession', name: 'Profession', category: 'craft', description: 'Expertise in a specific professional occupation' },
  { id: 'revelry', name: 'Revelry', category: 'social', description: 'Carousing, drinking, and social festivities' },
  { id: 'riding', name: 'Riding', category: 'general', description: 'Riding horses and other mounts in various conditions' },
  { id: 'seafaring', name: 'Seafaring', category: 'survival', description: 'Navigation and survival on ships and boats' },
  { id: 'seduction', name: 'Seduction', category: 'social', description: 'Romantic influence and physical attraction' },
  { id: 'siege-engineering', name: 'Siege Engineering', category: 'combat', description: 'Operating and constructing siege weapons' },
  { id: 'signaling', name: 'Signaling', category: 'general', description: 'Communication using flags, horns, and signals' },
  { id: 'streetwise', name: 'Streetwise', category: 'social', description: 'Understanding urban culture and criminal networks' },
  { id: 'survival', name: 'Survival', category: 'survival', description: 'Living off the land in wilderness environments' },
  { id: 'swimming', name: 'Swimming', category: 'general', description: 'Movement and survival in water' },
  { id: 'theology', name: 'Theology', category: 'knowledge', description: 'Religious doctrine and divine knowledge' },
  { id: 'tracking', name: 'Tracking', category: 'survival', description: 'Following trails and finding quarry' },
  { id: 'trapping', name: 'Trapping', category: 'survival', description: 'Setting snares and capturing animals' },

  // Combat Proficiencies
  { id: 'acrobatics', name: 'Acrobatics', category: 'combat', description: 'Jumping, tumbling, and agile movement in combat' },
  { id: 'alertness', name: 'Alertness', category: 'combat', description: 'Enhanced awareness and surprise detection' },
  { id: 'berserkergang', name: 'Berserkergang', category: 'combat', description: 'Entering battle rage for enhanced combat ability' },
  { id: 'blind-fighting', name: 'Blind Fighting', category: 'combat', description: 'Fighting effectively in darkness or while blinded' },
  { id: 'combat-ferocity', name: 'Combat Ferocity', category: 'combat', description: 'Increased damage and intimidation in battle' },
  { id: 'combat-reflexes', name: 'Combat Reflexes', category: 'combat', description: 'Improved initiative and defensive reactions' },
  { id: 'combat-trickery', name: 'Combat Trickery', category: 'combat', description: 'Special combat maneuvers like disarm and knock down' },
  { id: 'command', name: 'Command', category: 'combat', description: 'Military leadership and troop coordination' },
  { id: 'dungeonbashing-expertise', name: 'Dungeonbashing Expertise', category: 'combat', description: 'Enhanced ability to break down doors and barriers' },
  { id: 'fighting-style-specialization', name: 'Fighting Style Specialization', category: 'combat', description: 'Mastery of specific weapon combinations' },
  { id: 'mounted-combat', name: 'Mounted Combat', category: 'combat', description: 'Fighting effectively while mounted' },
  { id: 'precise-shooting', name: 'Precise Shooting', category: 'combat', description: 'Accurate missile attacks, even in melee' },
  { id: 'running', name: 'Running', category: 'combat', description: 'Enhanced movement speed and endurance' },
  { id: 'skirmishing', name: 'Skirmishing', category: 'combat', description: 'Light infantry tactics and mobile warfare' },
  { id: 'sniping', name: 'Sniping', category: 'combat', description: 'Long-range precision shooting' },
  { id: 'swashbuckling', name: 'Swashbuckling', category: 'combat', description: 'Agile fighting with finesse weapons' },
  { id: 'unarmed-fighting', name: 'Unarmed Fighting', category: 'combat', description: 'Hand-to-hand combat without weapons' },
  { id: 'weapon-finesse', name: 'Weapon Finesse', category: 'combat', description: 'Using dexterity instead of strength for certain weapons' },
  { id: 'weapon-focus', name: 'Weapon Focus', category: 'combat', description: 'Enhanced skill with specific weapon types' },

  // Magical Proficiencies
  { id: 'battle-magic', name: 'Battle Magic', category: 'magical', description: 'Casting spells effectively during combat' },
  { id: 'beast-friendship', name: 'Beast Friendship', category: 'magical', description: 'Communicating with and befriending wild animals' },
  { id: 'black-lore-of-zahar', name: 'Black Lore of Zahar', category: 'magical', description: 'Dark magical knowledge and necromantic arts' },
  { id: 'bright-lore-of-aura', name: 'Bright Lore of Aura', category: 'magical', description: 'Light magic and divine illumination' },
  { id: 'counterspelling', name: 'Counterspelling', category: 'magical', description: 'Disrupting and canceling enemy spells' },
  { id: 'elementalism', name: 'Elementalism', category: 'magical', description: 'Mastery of elemental forces and magic' },
  { id: 'elven-bloodline', name: 'Elven Bloodline', category: 'magical', description: 'Innate elven magical heritage and abilities' },
  { id: 'expanded-repertoire', name: 'Expanded Repertoire', category: 'magical', description: 'Learning spells beyond normal class limits' },
  { id: 'experimenting', name: 'Experimenting', category: 'magical', description: 'Creating new spells and magical effects' },
  { id: 'familiar', name: 'Familiar', category: 'magical', description: 'Bonding with a magical animal companion' },
  { id: 'illusion-resistance', name: 'Illusion Resistance', category: 'magical', description: 'Enhanced saves against illusions and mental effects' },
  { id: 'loremastery', name: 'Loremastery', category: 'magical', description: 'Vast knowledge of esoteric and magical subjects' },
  { id: 'magical-engineering', name: 'Magical Engineering', category: 'magical', description: 'Creating and understanding magical items and constructs' },
  { id: 'magical-music', name: 'Magical Music', category: 'magical', description: 'Using music to create magical effects' },
  { id: 'mastery-of-enchantments-illusions', name: 'Mastery of Enchantments & Illusions', category: 'magical', description: 'Enhanced mastery of mind magic and illusions' },
  { id: 'mastery-of-conjuration-summoning', name: 'Mastery of Conjuration & Summoning', category: 'magical', description: 'Enhanced ability to summon and create' },
  { id: 'mystic-aura', name: 'Mystic Aura', category: 'magical', description: 'Projecting an aura of magical power' },
  { id: 'prestidigitation', name: 'Prestidigitation', category: 'magical', description: 'Minor magical tricks and cantrips' },
  { id: 'quiet-magic', name: 'Quiet Magic', category: 'magical', description: 'Casting spells with minimal verbal components' },
  { id: 'sensing-power', name: 'Sensing Power', category: 'magical', description: 'Detecting magical auras and supernatural forces' },
  { id: 'soothsaying', name: 'Soothsaying', category: 'magical', description: 'Divination and fortune-telling abilities' },
  { id: 'transmogrification', name: 'Transmogrification', category: 'magical', description: 'Shape-changing and transformation magic' },
  { id: 'unflappable-casting', name: 'Unflappable Casting', category: 'magical', description: 'Maintaining concentration while casting under pressure' },

  // Divine Proficiencies
  { id: 'contemplation', name: 'Contemplation', category: 'divine', description: 'Deep meditation and spiritual reflection' },
  { id: 'divine-blessing', name: 'Divine Blessing', category: 'divine', description: 'Channeling divine favor and protection' },
  { id: 'divine-health', name: 'Divine Health', category: 'divine', description: 'Immunity to disease and enhanced vitality' },
  { id: 'laying-on-hands', name: 'Laying on Hands', category: 'divine', description: 'Healing through divine touch' },
  { id: 'prophecy', name: 'Prophecy', category: 'divine', description: 'Receiving divine visions and prophecies' },
  { id: 'righteous-rebuke', name: 'Righteous Rebuke', category: 'divine', description: 'Channeling divine wrath against enemies' },
  { id: 'sensing-evil', name: 'Sensing Evil', category: 'divine', description: 'Detecting evil intentions and creatures' },
  { id: 'sensing-good', name: 'Sensing Good', category: 'divine', description: 'Detecting good intentions and creatures' },
  { id: 'syncretism', name: 'Syncretism', category: 'divine', description: 'Blending different religious traditions' },

  // Thievery Proficiencies
  { id: 'arcane-dabbling', name: 'Arcane Dabbling', category: 'thievery', description: 'Limited magical ability for non-spellcasters' },
  { id: 'bribery', name: 'Bribery', category: 'thievery', description: 'Corrupting officials and gaining illegal favors' },
  { id: 'cat-burglary', name: 'Cat Burglary', category: 'thievery', description: 'Breaking into buildings and stealing valuables' },
  { id: 'climbing', name: 'Climbing', category: 'thievery', description: 'Scaling walls and surfaces without equipment' },
  { id: 'contortionism', name: 'Contortionism', category: 'thievery', description: 'Squeezing through tight spaces and escaping bonds' },
  { id: 'eavesdropping', name: 'Eavesdropping', category: 'thievery', description: 'Listening to private conversations undetected' },
  { id: 'lockpicking-expertise', name: 'Lockpicking Expertise', category: 'thievery', description: 'Enhanced ability to pick locks and bypass security' },
  { id: 'passing-without-trace', name: 'Passing Without Trace', category: 'thievery', description: 'Moving without leaving tracks or signs' },
  { id: 'poisoning', name: 'Poisoning', category: 'thievery', description: 'Knowledge and use of toxins and venoms' },
  { id: 'skulking', name: 'Skulking', category: 'thievery', description: 'Enhanced stealth and hiding abilities' },
  { id: 'trapfinding', name: 'Trapfinding', category: 'thievery', description: 'Detecting and disarming traps and snares' },

  // Specialized Proficiencies
  { id: 'ambushing', name: 'Ambushing', category: 'combat', description: 'Setting up and executing surprise attacks' },
  { id: 'armor-training', name: 'Armor Training', category: 'combat', description: 'Proficiency with armor types beyond class limits' },
  { id: 'dwarven-brewing', name: 'Dwarven Brewing', category: 'craft', description: 'Traditional dwarven ale and spirit creation' },
  { id: 'goblin-slaying', name: 'Goblin-Slaying', category: 'combat', description: 'Enhanced effectiveness against goblinoid creatures' },
  { id: 'kin-slaying', name: 'Kin-Slaying', category: 'combat', description: 'Ability to harm creatures normally immune to non-magical weapons' },
  { id: 'land-surveying', name: 'Land Surveying', category: 'craft', description: 'Measuring and mapping land for development' },
  { id: 'martial-training', name: 'Martial Training', category: 'combat', description: 'Weapon proficiencies beyond class restrictions' },
  { id: 'prospecting', name: 'Prospecting', category: 'craft', description: 'Finding and evaluating mineral deposits' },
  { id: 'reliquarianism', name: 'Reliquarianism', category: 'divine', description: 'Creating and empowering holy relics' },
  { id: 'vermin-slaying', name: 'Vermin-Slaying', category: 'combat', description: 'Enhanced effectiveness against insects and small creatures' },
  { id: 'wakefulness', name: 'Wakefulness', category: 'magical', description: 'Reduced need for sleep and enhanced vigilance' }
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Proficiencies - ACKS II Wiki',
    description: 'Complete directory of ACKS II proficiencies, organized by category with detailed descriptions and class availability.',
  };
}

export default function ProficienciesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          ACKS II Proficiencies
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Comprehensive directory of all proficiencies available in Adventurer Conqueror King System II. 
          Browse by category, search for specific abilities, or explore individual proficiency details.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <div className="flex items-start">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Quick Reference
              </h3>
              <div className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                <p>• <strong>General Proficiencies:</strong> Available to all character classes</p>
                <p>• <strong>Class Proficiencies:</strong> Restricted to specific classes</p>
                <p>• <strong>Multiple Ranks:</strong> Some proficiencies can be taken multiple times for enhanced effect</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Chapter Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/rules/chapter-3-proficiencies" 
            className="block p-4 bg-white dark:bg-gray-700 rounded-lg shadow hover:shadow-md transition-shadow border"
          >
            <h3 className="font-semibold text-blue-600 dark:text-blue-400">Chapter 3: Proficiencies</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Complete chapter covering proficiency mechanics, gaining proficiencies, and class lists
            </p>
          </Link>
          
          <Link 
            href="/rules/chapter-2-classes" 
            className="block p-4 bg-white dark:bg-gray-700 rounded-lg shadow hover:shadow-md transition-shadow border"
          >
            <h3 className="font-semibold text-green-600 dark:text-green-400">Chapter 2: Classes</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Character classes and their specific proficiency lists
            </p>
          </Link>
        </div>
      </div>

      {/* Search and Filter Section */}
      <ProficiencyBrowser proficiencies={ALL_PROFICIENCIES} categories={PROFICIENCY_CATEGORIES} />
    </div>
  );
}

// Client component for interactive functionality
'use client';

function ProficiencyBrowser({ proficiencies, categories }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Filter and sort proficiencies
  const filteredProficiencies = proficiencies
    .filter(prof => {
      const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prof.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || prof.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

  // Group proficiencies by category for organized display
  const proficienciesByCategory = categories.reduce((acc, category) => {
    acc[category.id] = filteredProficiencies.filter(prof => prof.category === category.id);
    return acc;
  }, {});

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Proficiencies
            </label>
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="name">Name (A-Z)</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredProficiencies.length} of {proficiencies.length} proficiencies
        </div>
      </div>

      {/* Proficiency Results */}
      {selectedCategory === 'all' ? (
        // Show by category when all are selected
        <div className="space-y-8">
          {categories.map(category => {
            const categoryProfs = proficienciesByCategory[category.id];
            if (categoryProfs.length === 0) return null;
            
            return (
              <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {category.description} • {categoryProfs.length} proficiencies
                  </p>
                </div>
                <div className="p-6">
                  <ProficiencyGrid proficiencies={categoryProfs} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Show filtered results
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <ProficiencyGrid proficiencies={filteredProficiencies} />
        </div>
      )}
    </div>
  );
}

function ProficiencyGrid({ proficiencies }) {
  if (proficiencies.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No proficiencies match your current filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {proficiencies.map(proficiency => (
        <Link
          key={proficiency.id}
          href={`/proficiencies/${proficiency.id}`}
          className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            {proficiency.name}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
              {proficiency.category.charAt(0).toUpperCase() + proficiency.category.slice(1)}
            </span>
            {proficiency.category === 'general' && (
              <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                General
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {proficiency.description}
          </p>
        </Link>
      ))}
    </div>
  );
} 