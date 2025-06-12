/**
 * Test Page for ChapterTemplate Component (Subtask 17.1 Testing)
 * 
 * This page demonstrates and tests the ChapterTemplate functionality with:
 * - Real ACKS II content examples
 * - Various content types (tables, lists, text)
 * - Navigation features
 * - Responsive behavior
 * - Integration with content loading system
 */

'use client';

import React from 'react';
import { ChapterTemplate } from '@/components/rulebook/chapter-template';

// Define ChapterSection interface locally since it's not exported
interface ChapterSection {
  id: string;
  title: string;
  content: React.ReactNode;
  level: number;
}

/**
 * Sample ACKS II character creation content for testing
 */
const characterCreationContent = (
  <div className="space-y-6">
    <p>
      Creating a character in ACKS II involves several key steps that will determine 
      your character's capabilities, background, and role in the world.
    </p>
    
    <h3 id="ability-scores" className="text-xl font-semibold">Ability Scores</h3>
    <p>
      Every character has six ability scores that determine their natural capabilities:
    </p>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong>Strength (STR):</strong> Physical power and muscle</li>
      <li><strong>Intelligence (INT):</strong> Reasoning ability and memory</li>
      <li><strong>Wisdom (WIS):</strong> Perception and insight</li>
      <li><strong>Dexterity (DEX):</strong> Agility and reflexes</li>
      <li><strong>Constitution (CON):</strong> Health and endurance</li>
      <li><strong>Charisma (CHA):</strong> Force of personality and leadership</li>
    </ul>

    <h3 id="ability-score-generation" className="text-xl font-semibold">Ability Score Generation</h3>
    <p>
      Roll 3d6 six times and assign the results to your six ability scores in any order you choose.
      Alternatively, you may use the standard array: 16, 14, 13, 12, 10, 8.
    </p>

    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
      <p className="text-blue-800">
        <strong>Design Note:</strong> The ability to assign scores freely allows players to 
        create the character concept they envision while maintaining game balance.
      </p>
    </div>
  </div>
);

/**
 * Sample class selection content with tables
 */
const classSelectionContent = (
  <div className="space-y-6">
    <p>
      ACKS II features six core character classes, each with distinct capabilities and roles:
    </p>

    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Class</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Key Ability</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Hit Die</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Primary Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Fighter</td>
            <td className="border border-gray-300 px-4 py-2">Strength</td>
            <td className="border border-gray-300 px-4 py-2">1d8</td>
            <td className="border border-gray-300 px-4 py-2">Combat specialist</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">Explorer</td>
            <td className="border border-gray-300 px-4 py-2">Constitution</td>
            <td className="border border-gray-300 px-4 py-2">1d6</td>
            <td className="border border-gray-300 px-4 py-2">Wilderness expert</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Thief</td>
            <td className="border border-gray-300 px-4 py-2">Dexterity</td>
            <td className="border border-gray-300 px-4 py-2">1d4</td>
            <td className="border border-gray-300 px-4 py-2">Stealth and skills</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">Mage</td>
            <td className="border border-gray-300 px-4 py-2">Intelligence</td>
            <td className="border border-gray-300 px-4 py-2">1d4</td>
            <td className="border border-gray-300 px-4 py-2">Arcane magic</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Crusader</td>
            <td className="border border-gray-300 px-4 py-2">Wisdom</td>
            <td className="border border-gray-300 px-4 py-2">1d8</td>
            <td className="border border-gray-300 px-4 py-2">Divine magic and combat</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">Venturer</td>
            <td className="border border-gray-300 px-4 py-2">Charisma</td>
            <td className="border border-gray-300 px-4 py-2">1d6</td>
            <td className="border border-gray-300 px-4 py-2">Social and economic</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 id="class-requirements" className="text-xl font-semibold">Class Requirements</h3>
    <p>
      Some classes have minimum ability score requirements:
    </p>
    <ul className="list-disc pl-6 space-y-1">
      <li>Crusader requires Wisdom 9+</li>
      <li>All other classes have no requirements</li>
    </ul>
  </div>
);

/**
 * Sample equipment and finishing touches content
 */
const equipmentContent = (
  <div className="space-y-6">
    <p>
      Your character's starting equipment depends on their class and background:
    </p>

    <h3 id="starting-funds" className="text-xl font-semibold">Starting Funds</h3>
    <p>
      Roll 3d6 × 10 gold pieces for starting money, then purchase equipment from the equipment lists.
    </p>

    <h3 id="armor-and-weapons" className="text-xl font-semibold">Armor and Weapons</h3>
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-semibold mb-2">Common Armor Types</h4>
        <ul className="space-y-1 text-sm">
          <li>• Leather Armor (AC 2, 10 gp)</li>
          <li>• Chain Mail (AC 4, 40 gp)</li>
          <li>• Plate Mail (AC 6, 60 gp)</li>
          <li>• Shield (+1 AC, 15 gp)</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Common Weapons</h4>
        <ul className="space-y-1 text-sm">
          <li>• Sword (1d8 damage, 10 gp)</li>
          <li>• Battle Axe (1d8 damage, 7 gp)</li>
          <li>• Bow (1d6 damage, 25 gp)</li>
          <li>• Dagger (1d4 damage, 3 gp)</li>
        </ul>
      </div>
    </div>

    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
      <p className="text-yellow-800">
        <strong>Important:</strong> Remember to calculate your character's Armor Class (AC) 
        based on their armor and Dexterity bonus!
      </p>
    </div>

    <h3 id="final-details" className="text-xl font-semibold">Final Details</h3>
    <p>
      Complete your character by choosing:
    </p>
    <ol className="list-decimal pl-6 space-y-1">
      <li>Character name and appearance</li>
      <li>Background or profession before adventuring</li>
      <li>Personality traits and motivations</li>
      <li>Starting spells (for spellcasters)</li>
    </ol>
  </div>
);

/**
 * Test sections data
 */
const testSections: ChapterSection[] = [
  {
    id: 'character-creation',
    title: 'Character Creation Process',
    content: characterCreationContent,
    level: 2
  },
  {
    id: 'class-selection',
    title: 'Choosing Your Class',
    content: classSelectionContent,
    level: 2
  },
  {
    id: 'equipment-setup',
    title: 'Equipment and Final Details',
    content: equipmentContent,
    level: 2
  }
];

/**
 * Test page component
 */
export default function TestChapterTemplatePage() {
  return (
    <div className="min-h-screen">
      {/* Development notice */}
      <div className="bg-blue-600 text-white px-4 py-2 text-sm">
        <div className="max-w-4xl mx-auto">
          📝 <strong>Development Test Page</strong> - Testing ChapterTemplate component (Subtask 17.1)
        </div>
      </div>

      <ChapterTemplate
        chapterNumber={1}
        title="Characters"
        description="A comprehensive guide to creating and developing characters in ACKS II"
        introduction={
          <div className="space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              This chapter will guide you through the process of creating a character for ACKS II. 
              Whether you're new to tabletop RPGs or a veteran player, you'll find everything you 
              need to bring your character concept to life.
            </p>
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <p className="text-green-800">
                <strong>Testing Note:</strong> This page demonstrates the ChapterTemplate component 
                with realistic ACKS II content, including proper heading hierarchy, navigation, 
                and responsive design features.
              </p>
            </div>
          </div>
        }
        sections={testSections}
        appendix={false}
        previousChapter={{
          href: '/rules/introduction',
          title: 'Introduction to ACKS II'
        }}
        nextChapter={{
          href: '/rules/chapter-2-adventuring',
          title: 'Adventuring'
        }}
      />

      {/* Testing controls and info */}
      <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-xs">
        <h4 className="font-semibold text-sm mb-2">🧪 Testing Features:</h4>
        <ul className="text-xs space-y-1 text-gray-600">
          <li>✅ Responsive sidebar navigation</li>
          <li>✅ Table of contents generation</li>
          <li>✅ Smooth scrolling to sections</li>
          <li>✅ Mobile menu functionality</li>
          <li>✅ Previous/next navigation</li>
          <li>✅ Content rendering (tables, lists)</li>
          <li>✅ Accessibility features</li>
          <li>✅ Local storage persistence</li>
        </ul>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Resize window to test responsive behavior
          </p>
        </div>
      </div>
    </div>
  );
} 