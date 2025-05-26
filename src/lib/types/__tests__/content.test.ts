/**
 * Test file for ACKS II Content Type Definitions
 * 
 * This file validates that all TypeScript interfaces compile correctly
 * and can be used to create sample objects that match the expected structure.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import {
  // Base types
  ContentCategory,
  ContentType,
  ReferenceType,
  
  // Monster types
  Monster,
  
  // Spell types
  Spell,
  MagicType,
  ComponentType,
  
  // Class types
  CharacterClass,
  PowerType,
  
  // Equipment types
  Equipment,
  EquipmentCategory,
  
  // Rule types
  Rule,
  RuleCategory,
  Proficiency,
  ProficiencyCategory,
  
  // Utility types
  AnyContent,
  SearchResult,
  ContentCollection,
  ParseError,
  ErrorSeverity
} from '../content';

describe('ACKS II Content Type Definitions', () => {
  
  describe('Monster Interface', () => {
    it('should create a valid Monster object', () => {
      const sampleMonster: Monster = {
        id: 'griffon',
        title: 'Griffon',
        description: 'Powerful, majestic creatures crossbred from eagles and lions.',
        sourceFile: 'ACKS_II_Content/Monstrous_Manual/Monster_Listings_A/127_griffon.md',
        category: ContentCategory.MONSTROUS_MANUAL,
        contentType: ContentType.MONSTER,
        crossReferences: [
          {
            targetId: 'eagle',
            referenceType: ReferenceType.RELATED,
            context: 'forebody and wings'
          }
        ],
        tags: ['monstrosity', 'bestial', 'flying'],
        primaryCharacteristics: {
          type: 'Monstrosity (bestial)',
          size: 'Large (82 st.)',
          speedLand: '40\' / 120\'',
          speedFly: '120\' / 360\'',
          armorClass: 4,
          hitDice: '7*',
          attacks: '3 (2 talons, bite 4+)',
          damage: '1d4 {S!} /1d4 {S!} /2d8 {P!}',
          save: 'F4',
          morale: '+1',
          vision: 'Acute Vision, Lightless Vision (60\'), Night Vision',
          otherSenses: 'Standard',
          proficiencies: 'Alertness',
          normalLoad: '30 st.'
        },
        secondaryCharacteristics: {
          expeditionSpeed: '144 miles (air) or 24 miles (land)',
          supplyCost: '16gp (carnivorous)',
          trainingPeriod: '6 months',
          trainingModifier: '+2',
          battleRating: '1.32 (individual), 79 (unit)',
          lifespan: 'E/1/3/6/22/33/44/55',
          reproduction: '1d3 eggs per 6 years',
          untrainedValue: '5,000gp(A)/2,500gp(J)/1,785gp(E)',
          trainedValue: '72,500gp (war mount)'
        },
        encounterSetup: {
          lair: '25%',
          dungeonEnc: 'None',
          wildernessEnc: 'Pride (2d8) / Aerie (2d8)',
          alignment: 'Neutral',
          treasureType: 'P',
          xp: 790
        },
        combat: {
          specialAbilities: ['acute vision', 'dive attack', 'grab'],
          tactics: 'Prefers horseflesh, attacks horses first',
          resistances: []
        },
        ecology: {
          habitat: 'Mountain aeries',
          offspring: '25% chance of 1d3 eggs or 1 juvenile',
          behavior: 'Intensely protective of young'
        },
        spoils: {
          magicComponents: [
            {
              name: 'beak',
              weight: '2 3/6 st',
              value: 150,
              spells: ['sharpness', 'striking', 'swift sword']
            },
            {
              name: 'eyes',
              weight: '2 3/6 st',
              value: 150,
              spells: ['banner of invincibility', 'dominate humanoid', 'remove fear']
            }
          ],
          valuableParts: [
            {
              name: 'talons',
              weight: '1/6 st',
              value: 4,
              quantity: '2'
            }
          ],
          trainingNotes: 'Can only be trained by monster whispering'
        },
        description: 'Griffons are powerful, majestic creatures crossbred from eagles and lions...'
      };

      // Test that the object compiles and has expected properties
      expect(sampleMonster.contentType).toBe(ContentType.MONSTER);
      expect(sampleMonster.primaryCharacteristics.armorClass).toBe(4);
      expect(sampleMonster.encounterSetup.xp).toBe(790);
      expect(sampleMonster.spoils?.magicComponents).toHaveLength(2);
    });
  });

  describe('Spell Interface', () => {
    it('should create a valid Spell object', () => {
      const sampleSpell: Spell = {
        id: 'adjust-self',
        title: 'Adjust Self',
        description: 'Grants the caster the ability to alter his shape into that of any other humanoid creature.',
        sourceFile: 'ACKS_II_Content/Rulebook/56_spell_descriptions.md',
        category: ContentCategory.RULEBOOK,
        contentType: ContentType.SPELL,
        magicType: MagicType.ARCANE,
        level: 2,
        spellType: 'transmogrification',
        range: 'self',
        duration: '6 turns + 1 turn/caster level',
        school: 'transmutation',
        components: [
          {
            type: ComponentType.VERBAL,
            description: 'Spoken incantation',
            consumed: false
          },
          {
            type: ComponentType.SOMATIC,
            description: 'Hand gestures',
            consumed: false
          }
        ],
        description: 'This spell grants the caster the ability to alter his shape into that of any other humanoid creature...'
      };

      expect(sampleSpell.contentType).toBe(ContentType.SPELL);
      expect(sampleSpell.magicType).toBe(MagicType.ARCANE);
      expect(sampleSpell.level).toBe(2);
      expect(sampleSpell.components).toHaveLength(2);
    });
  });

  describe('Character Class Interface', () => {
    it('should create a valid CharacterClass object', () => {
      const sampleClass: CharacterClass = {
        id: 'fighter',
        title: 'Fighter',
        description: 'Fighters are experts in the arts of combat and war.',
        sourceFile: 'ACKS_II_Content/Rulebook/27_core_classes.md',
        category: ContentCategory.RULEBOOK,
        contentType: ContentType.CLASS,
        keyAttribute: 'STR',
        requirements: 'None',
        hitDice: '1d8',
        maximumLevel: 14,
        levelProgression: [
          {
            experience: 0,
            title: 'Man-at-Arms',
            level: 1,
            hitDice: '1d8',
            damageBonus: '+1'
          },
          {
            experience: 2000,
            title: 'Warrior',
            level: 2,
            hitDice: '2d8',
            damageBonus: '+1'
          }
        ],
        combatProgression: [
          {
            level: '1',
            paralysis: '13+',
            death: '14+',
            blast: '15+',
            implements: '16+',
            spells: '17+',
            attackThrow: '10+'
          }
        ],
        combatCharacteristics: {
          weaponProficiencies: 'All weapons',
          armorProficiencies: 'All armor',
          fightingStyles: 'All three optional styles',
          progressionNotes: 'Advance by two points every three levels'
        },
        startingPowers: [
          {
            name: 'Manual of Arms',
            level: 1,
            description: 'Highly experienced in military discipline, physical fitness, and weapon drill.',
            type: PowerType.PASSIVE
          }
        ],
        additionalPowers: [
          {
            name: 'Battlefield Prowess',
            level: 5,
            description: 'Presence inspires troops he leads.',
            type: PowerType.PASSIVE
          }
        ],
        proficiencyProgression: {
          starting: 'One class proficiency and one general proficiency',
          classProficiencies: 'Additional at 3rd, 6th, 9th, and 12th level',
          generalProficiencies: 'Additional at 5th, 9th, and 13th level'
        },
        classProficiencies: [
          'Acrobatics', 'Alertness', 'Berserkergang', 'Blind Fighting'
        ],
        templates: [
          {
            rollRange: '3-4',
            name: 'Thug',
            proficiencies: ['Combat Ferocity', 'Intimidation'],
            equipment: 'Short bow, quiver with 20 arrows, morning star...',
            encumbrance: '4 4/6 st'
          }
        ],
        description: 'Fighters are experts in the arts of combat and war. In the Auran Empire...'
      };

      expect(sampleClass.contentType).toBe(ContentType.CLASS);
      expect(sampleClass.maximumLevel).toBe(14);
      expect(sampleClass.levelProgression).toHaveLength(2);
      expect(sampleClass.startingPowers).toHaveLength(1);
    });
  });

  describe('Equipment Interface', () => {
    it('should create a valid Equipment object', () => {
      const sampleEquipment: Equipment = {
        id: 'long-sword',
        title: 'Long Sword',
        description: 'A versatile one-handed sword with a straight, double-edged blade.',
        sourceFile: 'ACKS_II_Content/Rulebook/40_equipment_lists.md',
        category: ContentCategory.RULEBOOK,
        contentType: ContentType.EQUIPMENT,
        equipmentCategory: EquipmentCategory.WEAPON,
        cost: 15,
        weight: 1,
        damage: '1d8',
        properties: ['versatile', 'slashing'],
        availability: {
          village: false,
          town: true,
          city: true,
          notes: 'Common in civilized areas'
        },
        description: 'A versatile one-handed sword with a straight, double-edged blade...'
      };

      expect(sampleEquipment.contentType).toBe(ContentType.EQUIPMENT);
              expect(sampleEquipment.equipmentCategory).toBe(EquipmentCategory.WEAPON);
      expect(sampleEquipment.cost).toBe(15);
      expect(sampleEquipment.weight).toBe(1);
    });
  });

  describe('Rule Interface', () => {
    it('should create a valid Rule object', () => {
      const sampleRule: Rule = {
        id: 'combat-initiative',
        title: 'Combat Initiative',
        description: 'Rules for determining action order in combat.',
        sourceFile: 'ACKS_II_Content/Rulebook/61_combat.md',
        category: ContentCategory.RULEBOOK,
        contentType: ContentType.RULE,
        ruleCategory: RuleCategory.COMBAT,
        ruleText: 'At the start of each round, each side rolls 1d6 for initiative...',
        examples: [
          'Party rolls 4, monsters roll 2. Party acts first.',
          'On tied initiative, actions are simultaneous.'
        ],
        relatedRules: ['surprise', 'combat-sequence']
      };

      expect(sampleRule.contentType).toBe(ContentType.RULE);
      expect(sampleRule.ruleCategory).toBe(RuleCategory.COMBAT);
      expect(sampleRule.examples).toHaveLength(2);
    });
  });

  describe('Proficiency Interface', () => {
    it('should create a valid Proficiency object', () => {
      const sampleProficiency: Proficiency = {
        id: 'alertness',
        title: 'Alertness',
        description: 'Character is always alert to danger and hard to surprise.',
        sourceFile: 'ACKS_II_Content/Rulebook/35_proficiency_descriptions.md',
        category: ContentCategory.RULEBOOK,
        contentType: ContentType.PROFICIENCY,
        proficiencyCategory: ProficiencyCategory.GENERAL,
        effects: '+1 bonus to avoid surprise, +2 bonus to Searching and Listening throws',
        prerequisites: [],
        availableToClasses: ['Fighter', 'Explorer', 'Thief'],
        description: 'Character is always alert to danger and hard to surprise...'
      };

      expect(sampleProficiency.contentType).toBe(ContentType.PROFICIENCY);
      expect(sampleProficiency.proficiencyCategory).toBe(ProficiencyCategory.GENERAL);
      expect(sampleProficiency.availableToClasses).toHaveLength(3);
    });
  });

  describe('Utility Types', () => {
    it('should create valid SearchResult objects', () => {
      const sampleMonster: Monster = {
        id: 'test-monster',
        title: 'Test Monster',
        sourceFile: 'test.md',
        category: ContentCategory.MONSTROUS_MANUAL,
        contentType: ContentType.MONSTER,
        primaryCharacteristics: {
          type: 'Test',
          size: 'Medium',
          armorClass: 5,
          hitDice: '1d8',
          attacks: '1',
          damage: '1d6',
          save: 'F1',
          morale: '0',
          vision: 'Normal'
        },
        encounterSetup: {
          alignment: 'Neutral',
          xp: 10
        },
        description: 'A test monster'
      };

      const searchResult: SearchResult = {
        content: sampleMonster,
        score: 0.85,
        highlights: ['Test Monster', 'test monster']
      };

      expect(searchResult.content.contentType).toBe(ContentType.MONSTER);
      expect(searchResult.score).toBe(0.85);
      expect(searchResult.highlights).toHaveLength(2);
    });

    it('should create valid ContentCollection objects', () => {
      const collection: ContentCollection<Monster> = {
        items: [],
        total: 0,
        metadata: {
          lastUpdated: new Date(),
          sourceFiles: ['test1.md', 'test2.md'],
          processingStats: {
            filesProcessed: 2,
            filesWithErrors: 0,
            processingTime: 1500,
            crossReferencesFound: 5
          }
        }
      };

      expect(collection.total).toBe(0);
      expect(collection.metadata.sourceFiles).toHaveLength(2);
      expect(collection.metadata.processingStats.filesProcessed).toBe(2);
    });

    it('should create valid ParseError objects', () => {
      const parseError: ParseError = {
        sourceFile: 'test.md',
        lineNumber: 42,
        message: 'Invalid table format',
        severity: ErrorSeverity.WARNING
      };

      expect(parseError.severity).toBe(ErrorSeverity.WARNING);
      expect(parseError.lineNumber).toBe(42);
    });
  });

  describe('Type Guards and Union Types', () => {
    it('should work with AnyContent union type', () => {
      const contents: AnyContent[] = [
        {
          id: 'test-monster',
          title: 'Test Monster',
          sourceFile: 'test.md',
          category: ContentCategory.MONSTROUS_MANUAL,
          contentType: ContentType.MONSTER,
          primaryCharacteristics: {
            type: 'Test',
            size: 'Medium',
            armorClass: 5,
            hitDice: '1d8',
            attacks: '1',
            damage: '1d6',
            save: 'F1',
            morale: '0',
            vision: 'Normal'
          },
          encounterSetup: {
            alignment: 'Neutral',
            xp: 10
          },
          description: 'A test monster'
        } as Monster,
        {
          id: 'test-spell',
          title: 'Test Spell',
          sourceFile: 'test.md',
          category: ContentCategory.RULEBOOK,
          contentType: ContentType.SPELL,
          magicType: MagicType.ARCANE,
          level: 1,
          spellType: 'test',
          range: 'touch',
          duration: 'instantaneous',
          description: 'A test spell'
        } as Spell
      ];

      expect(contents).toHaveLength(2);
      expect(contents[0].contentType).toBe(ContentType.MONSTER);
      expect(contents[1].contentType).toBe(ContentType.SPELL);
    });
  });
}); 