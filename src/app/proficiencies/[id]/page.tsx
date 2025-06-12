import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

/**
 * Individual Proficiency Page
 * 
 * Dynamic route for showing detailed proficiency information
 */

// Proficiency data defined locally to avoid fs imports
const PROFICIENCY_DATA = {
  // General Proficiencies
  'alchemy': {
    id: 'alchemy',
    name: 'Alchemy',
    category: 'General',
    prerequisites: 'None',
    description: 'The character is skilled in the creation of potions, oils, and other alchemical substances. This proficiency allows the character to brew magical and mundane concoctions using appropriate equipment and ingredients.',
    details: `**Alchemy** allows characters to create a wide variety of useful substances:

**Mundane Alchemical Items:**
- Acids and solvents
- Adhesives and cements
- Dyes and pigments
- Perfumes and incenses
- Soap and cleaning agents

**Magical Potions:** (requires magical ingredients)
- Healing potions
- Antidotes
- Enhancement elixirs
- Temporary magical effects

**Requirements:**
- Alchemical laboratory or portable alchemy kit
- Appropriate ingredients and reagents
- Time (varies by complexity)
- Gold cost for materials

**Time Required:** 1 day per 100gp value of the item being created.

**Success Rate:** Automatic for mundane items, magical items may require ability checks or special knowledge.`
  },
  'animal-husbandry': {
    id: 'animal-husbandry',
    name: 'Animal Husbandry',
    category: 'General',
    prerequisites: 'None',
    description: 'The character understands the breeding, care, and management of domesticated animals. This includes knowledge of animal behavior, nutrition, breeding programs, and disease prevention.',
    details: `**Animal Husbandry** provides expertise in managing livestock and working animals:

**Breeding Programs:**
- Selective breeding for desired traits
- Improving animal bloodlines
- Managing breeding schedules

**Animal Care:**
- Proper nutrition and feeding
- Disease prevention and treatment
- Housing and shelter requirements

**Economic Benefits:**
- Increased animal productivity
- Higher market value for livestock
- Reduced animal mortality rates

**Applications:**
- Managing a ranch or farm
- Improving cavalry mounts
- Breeding war animals
- Trading in livestock markets`
  },
  'animal-training': {
    id: 'animal-training',
    name: 'Animal Training',
    category: 'General',
    prerequisites: 'None',
    description: 'The character can train animals to perform specific tasks and behaviors. This includes both basic obedience training and specialized skill development.',
    details: `**Animal Training** allows characters to teach animals useful behaviors:

**Basic Training:**
- House training and basic commands
- Leash training and following
- Simple tricks and responses

**Specialized Training:**
- Guard duties and protection
- Hunting and tracking assistance
- Performing specific work tasks
- Combat assistance (war animals)

**Training Time:** Varies by animal intelligence and task complexity
- Simple commands: 1-2 weeks
- Complex behaviors: 1-3 months
- Specialized skills: 3-6 months

**Trainable Animals:**
- Dogs, horses, cats (easiest)
- Bears, wolves, big cats (moderate)
- Birds of prey, exotic animals (difficult)

**Limitations:** Cannot train unintelligent creatures or those with Intelligence 3 or higher.`
  },
  'art': {
    id: 'art',
    name: 'Art',
    category: 'General',
    prerequisites: 'None',
    description: 'The character is skilled in creating works of art and craft. This includes painting, sculpture, music, poetry, and other creative endeavors.',
    details: `**Art** encompasses various creative disciplines:

**Visual Arts:**
- Painting and drawing
- Sculpture and carving
- Jewelry making and metalwork
- Textile arts and weaving

**Performing Arts:**
- Music (instrumental or vocal)
- Dance and choreography
- Theater and acting
- Storytelling and oratory

**Literary Arts:**
- Poetry and verse
- Historical chronicles
- Fictional narratives
- Academic treatises

**Benefits:**
- Create valuable artistic works
- Earn income through commissions
- Gain social recognition and patronage
- Preserve cultural knowledge

**Market Value:** Exceptional works can command high prices from nobles and collectors.`
  },
  'bargaining': {
    id: 'bargaining',
    name: 'Bargaining',
    category: 'General',
    prerequisites: 'None',
    description: 'The character is skilled at negotiating favorable prices and terms in commercial transactions. This includes knowledge of market values, negotiation tactics, and reading people.',
    details: `**Bargaining** improves commercial interactions:

**Price Negotiation:**
- Reduce purchase costs by 10-25%
- Increase selling prices by 10-25%
- Negotiate better terms for services

**Market Knowledge:**
- Assess true value of goods
- Identify overpriced items
- Recognize valuable opportunities

**Negotiation Tactics:**
- Read body language and tells
- Apply appropriate pressure
- Find mutually beneficial solutions
- Know when to walk away

**Applications:**
- Equipment purchases
- Hiring retainers and services
- Trade negotiations
- Contract agreements

**Social Benefits:** Reputation as a fair dealer can open new business opportunities.`
  },
  // Add more proficiencies as needed - this is a sample set
  'beast-friendship': {
    id: 'beast-friendship',
    name: 'Beast Friendship',
    category: 'General',
    prerequisites: 'None',
    description: 'The character can communicate with and befriend wild animals, gaining their trust and potentially their aid.',
    details: `**Beast Friendship** allows characters to interact peacefully with wild creatures:

**Animal Communication:**
- Understand basic animal emotions and intentions
- Convey simple concepts through gestures and sounds
- Calm aggressive or frightened animals

**Friendship Benefits:**
- Animals won't attack unless provoked
- May provide warnings of danger
- Possible assistance in simple tasks
- Information about local area

**Limitations:**
- Only affects natural animals, not monsters
- Intelligent creatures (Int 3+) are unaffected
- Magical beasts may resist the effect
- Very hungry or territorial animals may ignore friendship

**Duration:** Effects last while the character remains calm and non-threatening.`
  }
};

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const proficiency = PROFICIENCY_DATA[id as keyof typeof PROFICIENCY_DATA];
  
  if (!proficiency) {
    return {
      title: 'Proficiency Not Found | ACKS II Wiki',
    };
  }

  return {
    title: `${proficiency.name} | ACKS II Proficiencies`,
    description: proficiency.description,
  };
}

export default async function ProficiencyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const proficiency = PROFICIENCY_DATA[id as keyof typeof PROFICIENCY_DATA];

  if (!proficiency) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/rules" className="hover:text-foreground">
          Rules
        </Link>
        <span>→</span>
        <Link href="/rules/chapter-3-proficiencies" className="hover:text-foreground">
          Chapter 3: Proficiencies
        </Link>
        <span>→</span>
        <span className="text-foreground font-medium">{proficiency.name}</span>
      </nav>

      {/* Proficiency Header */}
      <div className="border-b border-border pb-6 mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">{proficiency.name}</h1>
        
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium text-muted-foreground">Category:</span>
            <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full">
              {proficiency.category}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-medium text-muted-foreground">Prerequisites:</span>
            <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full">
              {proficiency.prerequisites}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Description</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {proficiency.description}
        </p>
      </div>

      {/* Detailed Information */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <h2>Details</h2>
        <div dangerouslySetInnerHTML={{ __html: proficiency.details.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
      </div>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-border">
        <Link 
          href="/rules/chapter-3-proficiencies"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          Back to Proficiencies
        </Link>
      </div>

      {/* Notice for missing proficiencies */}
      {!proficiency && (
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            This proficiency page is being developed. More detailed information will be added soon.
          </p>
        </div>
      )}
    </div>
  );
}

// Generate static paths for known proficiencies
export async function generateStaticParams() {
  return Object.keys(PROFICIENCY_DATA).map((id) => ({
    id,
  }));
} 