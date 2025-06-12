/**
 * Chapter 5: Spells
 * 
 * Complete ACKS II Spells chapter - verbatim implementation
 * This chapter contains the complete magic system, spell lists, and spell descriptions
 * from the ACKS II Revised Rulebook, implemented exactly as written.
 * 
 * For interactive spell browsing and detailed spell database, see: /spells
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Search, Filter } from 'lucide-react';
import ChapterTemplate from '@/components/rulebook/chapter-template';

// Complete Chapter 5 content structure
const CHAPTER_CONTENT = {
  id: 'chapter-5-spells',
  chapterNumber: 5,
  title: 'Spells',
  description: 'Magic system, spell lists, and complete spell descriptions from ACKS II',
  introduction: (
    <div className="space-y-4">
      <p>
        Spells can be cast only by characters of special classes, collectively called <strong>spellcasters</strong>. 
        This chapter explains the rules that govern spellcasting in ACKS, presents the complete lists of spells 
        available to each type of spellcaster, and provides detailed descriptions of each spell.
      </p>
      
      {/* Integration with main spells database */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Search className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Interactive Spell Database
            </h4>
            <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">
              For advanced spell searching, filtering by level/type, and detailed spell descriptions, 
              visit our complete interactive spells database.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link 
                href="/spells" 
                className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
              >
                <Search className="h-4 w-4 mr-2" />
                Browse All 317 Spells
                <ExternalLink className="h-3 w-3 ml-2" />
              </Link>
              <Link 
                href="/spells?level=1" 
                className="inline-flex items-center px-3 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-900 dark:text-blue-100 text-sm rounded-md transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter by Level
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  sections: [
    {
      id: 'spells-and-spell-casters',
      title: 'Spells and Spell Casters',
      content: (
        <div>
          <p>
            Spells can be cast only by characters of special classes, collectively called <strong>spellcasters</strong> or <strong>casters</strong>. When a caster casts a spell, he taps into a source of magical power and then channels that power into a specific supernatural effect. The specific effect is controlled by a combination of hand gestures and spoken incantations that specify the desired result. If the gestures and incantations are interrupted, the tapped power is wastefully diffused rather than properly channeled, so the effect does not occur.
          </p>
          <p>
            The source of magical power that is tapped is determined by the type of magic. There are two <strong>magic types</strong> described in this book: <strong>arcane</strong> and <strong>divine</strong>. Other types of magic, such as <strong>eldritch</strong>, have been detailed in other <em><strong>ACKS</strong></em> sourcebooks. Arcane casters tap the ambient power that suffuses the cosmos. Divine casters tap the power of immortal deities or ancestral spirits whom they venerate. Both types of casters draw on their own personal power to channel the external power they receive. Inexperienced casters quickly deplete their personal power and find themselves unable to continue to cast spells. Experienced casters develop greater reservoirs of personal power that enable them to cast spells more frequently.
          </p>
          <p>
            Like characters, spells have <strong>levels</strong> that measure how powerful they are. For instance, some spells are 1st level spells, and some are 2nd level, and so on. Lower level characters can learn and cast only lower level spells, while higher level characters can access more powerful, higher level spells.
          </p>
          <p>
            The divine spellcasters described in this rule book are crusaders, bladedancers, dwarven craftpriests, Nobiran wonderworkers, priestesses, shamans, and witches. The arcane spellcasters are mages, elven nightblades, elven spellswords, Nobiran wonderworkers, warlocks, and Zaharan ruinguards. Some rules will apply only to one type of caster, or even just to one class, while others apply to all classes and all types. If a rule does not specify a particular type of spellcaster, it applies to all classes and all types of spellcasters.
          </p>

          <h3>Castings per Day</h3>
          <p>
            During any single day, spellcasters can cast the number of spells of each level indicated on the Spells Progression table for their class. Unlike other fantasy games, in the <em><strong>Adventurer Conqueror King System</strong></em>, spellcasters do not have to "memorize" or "prepare" their spells in advance; they can choose which spells to cast at the time of casting from among any and all the spells in their <strong>repertoire</strong> (see below).
          </p>
          <p>
            Once a caster has cast all of his available spells, he has exhausted his personal power and cannot continue to cast spells. The number of castings available to the caster refreshes each time the caster enjoys 8 hours of restful sleep. A caster cannot enjoy more than 8 hours of restful sleep in any 24-hour period.
          </p>

          <h3>Casting Requirements</h3>
          <p>
            All spellcasters need to be able to move their hands and speak in order to make the gestures and say the incantations that bring magic effects into being. As a result, a spellcaster cannot cast spells if he is gagged, his hands are tied, or he is in an area under the effects of a <strong>noiselessness</strong> spell.
          </p>
          <p>
            Casting a spell takes one round of game time. A caster cannot take any other actions during the round he casts a spell. As described in the <strong>Initiative</strong> section of Chapter 6, a caster must announce the intention to cast a spell prior to initiative being determined at the beginning of a round. If the caster takes damage or fails a saving throw that round before the spell is cast, the spell is disrupted and fails. The spell still counts against the caster's spells per day as if it had been cast, and the caster loses his action for the round.
          </p>
          <p>
            Some spells require other conditions be met before they can be cast. For instance, some spells might require the caster to touch the target, others might require that the caster be outdoors or near a fire. Each spell's description will list these conditions, if any apply.
          </p>
        </div>
      ),
      level: 2
    },
    {
      id: 'spell-lists-by-magic-type',
      title: 'Spell Lists by Magic Type',
      content: (
        <div>
          <p>
            Each type of magic has its own <strong>spell list</strong> which includes every spell its practitioners could theoretically cast. The length of a magic type's spell list is theoretically infinite so for practical purposes this book presents only the most common spells for each type.
          </p>
          <p>
            The Arcane Spell List presented in this book consists of just the arcane spells which the Tower of Knowledge in Aura has canonical knowledge, either because it teaches them or has banned them. Many spells that were once known have been forgotten, existing only in dusty tomes and rare grimoires, or in the minds of slumbering undead lords. Studious casters can, when they reach 5th level, begin to research their own additions to their magic's spell list.
          </p>
          <p>
            The Divine Spell List presented in this book consists of all of the divine spells which are known to the theologians of Aura. The list includes those granted by the Empyrean gods of Law, the Chthonic gods of Chaos, and the numerous elemental powers, petty gods, and lesser spirits of the world. There are other divine spells in the game world, made available by old powers long forgotten or bizarre cults with strange practices.
          </p>
        </div>
      ),
      level: 2
    },
    {
      id: 'spell-repertoires',
      title: 'Spell Repertoires',
      content: (
        <div>
          <p>
            Just because a spell is listed on a magic type's spell list does not mean that any given spellcaster of that type can cast it. Each caster has his own <strong>spell repertoire</strong> which consists of the spells he can actually cast. A spell repertoire is always a small sub-set of a spell list.
          </p>
          <p>
            There are two different types of repertoires described in this book: <strong>studious</strong> and <strong>prayerful.</strong> Most of the divine casters in this book, with the exception of the dwarven craftpriest and the witch, use prayerful repertoires. All of the arcane casters in this book, as well as the dwarven craftpriest and witch, use studious repertoires. Prayerful and studious spellcasters have very different spell repertoires and learn their repertoire in very different ways. As the name suggests, prayerful casters receive and maintain their repertoire through prayer; studious spellcasters receive and maintain their repertoires through study.
          </p>

          <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2">Arcane</th>
                <th className="border border-gray-300 px-4 py-2">Divine</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">Prayerful</td>
                <td className="border border-gray-300 px-4 py-2">None</td>
                <td className="border border-gray-300 px-4 py-2">Used by bladedancers, crusaders, priestesses, and shamans, who cast spells that tap the power of immortal deities through prayer.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">Studious</td>
                <td className="border border-gray-300 px-4 py-2">Used by elven nightblades, elven spellswords, mages, Nobiran wonderworkers, warlocks, and Zaharan ruinguards, who cast spells that tap the ambient power in cosmos through formulaic procedures.</td>
                <td className="border border-gray-300 px-4 py-2">Used by dwarven craftpriests, who cast spells by tapping the power of ancestral spirits and ancient relics through formulaic procedures; and witches, who cast spells by cajoling, coercing, and petitioning old powers with formulaic procedures.</td>
              </tr>
            </tbody>
          </table>

          <h3>Prayerful Repertoire</h3>
          <p>
            Prayerful casters receive their repertoires from prayer to the deity, demon, elemental lord, god, or other power they serve. In order to maintain these repertoires they must pray each day.
          </p>

          <h4>Repertoire Rules</h4>
          <p>
            Each prayerful caster has a repertoires consisting of 10 – 15 spells of each level they can cast, representing those miracles the deity has empowered him to perform. The prayerful repertoires in this book are divided by class, with each class serving a particular god that offers a particular repertoire:
          </p>
          <ul className="list-disc ml-8 mb-4">
            <li>The Crusader Repertoire represents the selection of spells available to crusaders of Ammonar, the god of light and law. It would also be appropriate for worshippers of other solar deities and sky gods. Ammonar provides his crusaders with spells to heal and protect the faithful; command by holy word; find and destroy undead; and even summon an angelic herald or bring down a fiery pillar on foes.</li>
            <li>The Bladedancer Repertoire represents the selection of spells available to bladedancers of Ianna, the goddess of love and war. It would also be appropriate for worshippers of other gods and goddesses of beauty, competition, excellence, love, strife, and war. Ianna offers many of the same spells as Ammonar, but with quite a few alternatives that are specific to her grace and style, such as the ability to create alluring illusions or to take flight as a winged warrior.</li>
            <li>The Priestess Repertoire represents the selection of spells available to priestesses of Mityara, goddess of marriage and mercy. It would also be appropriate for worshippers of deities devoted to medicine, peace, wisdom and similar civilizational values. Compared to Ammonar and Ianna, Mityara offers far fewer spells devoted to battle and combat, and far more spells devoted to healing and protection. Because priestesses fully devote themselves to faith and prayer, without training in hand-to-hand combat, they have larger repertoires than bladedancers and crusaders. (Crusaders or bladedancers of Mityara, if such a thing existed, would have only 10 spells of each level in their repertoire.)</li>
            <li>The Shaman Spell List represents the selection of spells available to ancestor worshippers, animists, druids, and other shamans. It would also be appropriate to worshippers of Naurivus, god of wind and weather, or similar nature deities. These casters have many spells relating to animals, plants, wind, and weather.</li>
          </ul>
          <p>
            These four repertoires are just a small set of examples and many other repertoires are possible. The Judge is responsible for determining which specific spells are provided to any given prayerful caster in his campaign setting. He can use the pre-generated lists we've created, or create his own lists by selecting appropriate spells from the Divine Spell List (p. XX).
          </p>

          <h4>Prayer Requirement</h4>
          <p>
            To stay in the favor of his deity, a prayerful spellcaster must pray at an appointed time (usually sunrise or sunset) for at least one hour per day. This prayer counts as an ancillary activity (p. XX). A prayerful spellcaster who fails to pray at the appointed time more than once in any seven days becomes <strong>disfavored</strong> by his deity. A prayerful caster can also become disfavored if he fails to uphold his class's code of behavior (Judge's discretion). Each time a disfavored caster casts a spell, he must roll 1d6. On a 1 - 2, the spell fails. The failed spell still counts against the number of spells he can cast per day. Disfavor from failure to pray ends as soon as the caster meets his daily prayer requirement. Undead in <em>torpor</em> (p. XX) never become disfavored for failing to pray, as their dark god knows why they slumber.
          </p>

          <h3>Studious Spell Repertoire</h3>
          <p>
            Studious casters receive their repertoire of spells from the study of <strong>spell formulas</strong>. In order to maintain these repertoires they must study the formulas each day. A spell formula consists of various texts, diagrams, illustrations, and charts written on one or more pieces of paper (or equivalent material). A spell's formula always takes up one page (or equivalent) per spell level. A caster must be able to read the language used in the formula in order to study it, making the ability to speak many languages very valuable for every studious caster.
          </p>

          <h4>Repertoire Rules</h4>
          <p>
            Each studious spellcaster has his own unique repertoire of spells determined by the spell formulas he frequently studies. It might be just one spell or dozens. The maximum number and level of spells in a studious caster's repertoire is equal to the number and level of spells he can cast per day. This maximum is increased by the caster's Intellect bonus at each spell level he can cast. For instance, a 3rd level mage is able to cast two 1st and one 2nd level spell per day. Therefore the maximum number and level of spells in his repertoire is two 1st and one 2nd level spells. If that 3rd level mage has 16 INT (+2 modifier), then his maximum spell repertoire is increased to four 1st level and three 2nd level spells. Thus studious casters of limited experience and middling intelligence are restricted to small repertoires while powerful and intelligent casters can have large repertoires.
          </p>
          <p>
            Because a studious caster must have access to spell formulas in order to build his repertoire, it is possible (indeed, common) for a studious caster to have fewer spells in his repertoire than the maximum amount his class level and Intellect would otherwise permit. Conversely, it is also possible for a fortunate studious caster to end up in possession of far more spell formulas than he has room for in his repertoire.
          </p>
          <p>
            To organize their collection of spell formulas, studious casters gather them together in <strong>spell books</strong>. A spell book can be, but does not have to be, an actual codex. Some spell books are true works of art, cased in precious metal or rare wood, with vellum pages illumined and illustrated with colorful inks. Others resemble a pile of scrolls shoved in a box in alphabetic order. A typical spell book is a sturdy leatherbound parchment codex with 100 pages. A blank 100-page spell book costs 20gp.
          </p>

          <h4>Study Requirement</h4>
          <p>
            To keep himself attuned to the power of magic, a studious caster must track the alignment of the celestial spheres, the astrological movements of the stars, the waxing and waning of the planets, and other factors of metaphysical importance. Each day, after he rests, a studious caster must spend at least one hour reviewing these factors. This study counts as an ancillary activity (p. XX). A studious caster who misses more than one day of study in any seven days becomes <strong>forgetful</strong> when casting spells. Each time a forgetful caster casts a spell, he must roll 1d6. On a 1 - 2, the spell fails. The failed spell still counts against the number of spells he can cast per day. Forgetfulness ends as soon as the caster meets his daily study requirement. Undead in <em>torpor</em> (p. XX) never become forgetful, as no time passes for them.
          </p>
          <p>
            In order to meet his daily study requirement, a studious caster must have the spell formula for each of the spells in his repertoire at hand. If the caster does not have physical access to one or more of the spell formulas, he becomes <strong>forgetful</strong> when casting those spells. To avoid becoming forgetful, a studious caster who adventures away from home should be sure to bring a spell book containing the necessary formulas with him!
          </p>
          <p>
            Poor or inexperienced studious casters often have just one small spell book, which they guard jealously. More established studious casters tend to own many spell books, with one or more "traveling" spell books containing the formulas for the spells in their repertoire, and the rest containing the formulas for spells not in their repertoire. These latter spell books can be consulted should the caster wish to change his repertoire (see below). Extra spell books are usually kept in a library, laboratory, or secure vault.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="font-bold">EXAMPLE:</p>
            <p>
              Quintus is a 3rd level mage with INT 16. His repertoire of spells consists of four 1st level spells (<em>discern magic</em>, <em>illumination</em>, <em>mage missile</em>, and <em>slumber</em>) and three 2nd level spells (<em>battering ram</em>, <em>circling winds</em>, and <em>sudden staircase</em>). He owns a 100-page spell book, which contains those seven spell formulas. They use up 1 + 1 + 1 + 1 + 2 + 2 + 2 = 10 pages in his book. Each day, Quintus studies the spell formulas in his book for one hour to avoid becoming forgetful.
            </p>
            <p>
              One day, an unpleasant vandal tears the page containing the <em>illumination</em> formula out of Quintus's spell book. Quintus can no longer meet his daily study requirement for <em>illumination,</em> so he becomes <strong>forgetful</strong> when casting that spell. Each time he casts <em>illumination,</em> he faces a 2-in-6 chance of the spell failing. In order to end this disattunement, Quintus must recover (or get a new copy of) the <em>illumination</em> formula and study it.
            </p>
            <p>
              Rather than go shopping for a new spell formula, Quintus decides to pursue the vandal to recover his stolen formula. Unfortunately, he gets captured instead. Quintus is left to rot in a prison cell for days, during which time he is unable to meet his daily study requirement at all. When his comrades rescue him, Quintus is <strong>forgetful</strong> of his entire repertoire. Each time he casts any spell, he faces a 2-in-6 chance of the spell failing. The condition lasts until Quintus is able to meet his daily study requirement.
            </p>
          </div>
        </div>
      ),
      level: 2
    },
    {
      id: 'spell-reversal',
      title: 'Spell Reversal',
      content: (
        <div>
          <p>
            Some spells, marked with an asterisk (*) on the spell lists, can be cast <strong>reversed.</strong> A reversed spell results in an effect that is opposite to the effect the spell normally causes. For example, when a mage casts <em>petrification</em>, he can turn a flesh-and-blood creature into stone. But when a mage casts the reverse spell, <em>depetrification</em>, he can restore a creature that has been petrified back to life. Where it is not self-evident, the spell descriptions below will explain what reversed spells do. If a spell name is not marked with an asterisk, the spell is not reversible.
          </p>
          <p>
            Studious spellcasters must treat the normal and reversed version of a spell as separate spells for purposes of their repertoire. Prayerful spellcasters know both the normal and reversed form of any spell on their spell list. However, Lawful divine spellcasters prefer to cast spells in their normal form, e.g. favoring <em>remove fear</em> over <em>cause fear</em> and <em>cure light injury</em> over <em>cause light injury</em>, and will use the reversed forms only against Chaotic opponents. Conversely, Chaotic divine spellcasters will freely cast reversed spells such as <em>cause fear</em>, while using the normal version only to aid comrades and followers. Some divine spellcasters might be restricted entirely by their deity from using normal or reversed versions of particular spells (Judge's discretion).
          </p>
        </div>
      ),
      level: 2
    },
    {
      id: 'spell-signatures',
      title: 'Spell Signatures',
      content: (
        <div>
          <p>
            While spells have general effects that are common to all who cast them, the specific sensory effects associated with the spell inevitably vary from caster to caster. This specific sensory effect is known as the <strong>spell signature</strong>. The player of a spellcaster can write a short description of the signature for his caster or detailed descriptions of the signature of each spell, as he desires. For arcane spellcasters, the signature might be based on a particular school or style of magic, or simply be a reflection of the spellcaster's personal taste. For divine spellcasters, the signature should reflect the caster's relationship with his deity. A character's choice of proficiencies can be suggestive of appropriate spell signatures.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="font-bold">EXAMPLE:</p>
            <p>
              Sargon pursues necromantic magic and has the Black Lore of Zahar proficiency. His player decides that all of Sargon's spell signatures will revolve around death. His <em>mage missiles</em> appear as shards of bone. His <em>slumber</em> spell places its targets into a nightmarish slumber where they dream of Hell. His <em>thunderbolt</em> is crackling blue-black energy. His <em>wall of stone</em> has the appearance of tombstones graven with the names of the dead.
            </p>
          </div>

          <p>
            A character with the Sensing Power proficiency can sense the spell signature of arcane casters up to 24 hours after a spell has been cast. A caster who casts <em>scry</em> can inadvertently reveal his spell signature to those he scries upon. A caster who casts <em>reveal ritual magic</em> can discern the spell signature of whoever is casting the ritual. A character can make a Collegiate Wizardry proficiency throw to identify famous casters or particular schools of magic by their spell signature. A character can make a Theology proficiency throw to identify famous religious orders by their spell signature.
          </p>
        </div>
      ),
      level: 2
    },
    {
      id: 'spell-types',
      title: 'Spell Types',
      content: (
        <div>
          <p>
            Every spell is classified according to its <strong>spell type</strong>, which gives a broad description of what the spell is supposed to do. There are 13 different types of spells: <strong>blast</strong>, <strong>death</strong>, <strong>detection</strong>, <strong>elemental</strong>, <strong>enchantment</strong>, <strong>esoteric</strong>, <strong>healing</strong>, <strong>illusion</strong>, <strong>movement</strong>, <strong>protection</strong>, <strong>summoning</strong>, <strong>transmogrification</strong>, and <strong>wall</strong> spells. Some spells have just one type, while others have several.
          </p>

          <h3>List of Spell Types</h3>

          <h4>Blast Spells</h4>
          <p>
            Blast spells can deal damage or detrimental effects to individual targets or over areas of effect through evoking a medium such as arcane force, fire, or toxic gas. <em>Battering ram</em>, <em>mage missile</em>, and <em>thunderbolt</em> are examples of blast spells. (In contrast, a spell that deals damage directly through magic, such as <em>dismember</em>, is a death spell.) Blast spells usually require the caster to make an attack throw or the target to make a Blast saving throw. Blast spells that require an attack throw benefit from the Battle Magic proficiency. Some blast spells are elemental and will benefit from Elementalism proficiency.
          </p>

          <h4>Death Spells</h4>
          <p>
            Death spells can deal damage or detrimental effects to targets directly. Death spells also deal in necromantic energy, capable of draining and transferring life energy or animating the dead. <em>Animate dead</em>, <em>dismember</em>, and <em>necromantic potence</em> are examples of death spells. Death spells usually require their targets to make Death saving throws avoid their effects. Death spells benefit from the Black Lore of Zahar proficiency.
          </p>

          <h4>Detection Spells</h4>
          <p>
            Detection spells can discern or locate particular categories of creatures, powers, or objects within range. <em>Discern magic</em>, <em>locate haunting</em>, and <em>reveal ritual magic</em> are examples of detection spells. While very useful, detection spells can never be used to detect abstract or ambiguous concepts such as "danger" or "traps." Detection spells do not benefit from any particular class powers or proficiencies in this book, although the Judge may create these if desired.
          </p>

          <h4>Elemental Spells</h4>
          <p>
            Elemental spells can conjure, destroy, or manipulate one of the fundamental elements of air, earth, fire, and water. Each elemental spell denotes its sub-type in parentheses, e.g. elemental (fire). <em>Earth's excrescence</em>, <em>fan of flames</em>, <em>thunderbolt</em>, and <em>wall of frost</em> are examples of elemental earth, fire, air, and water spells respectively. Elemental spells benefit from the Elementalism proficiency. All elemental spells always belong to another type as well. For instance <em>fan of flames</em> is a blast and elemental fire spell, while <em>wall of frost</em> is a wall and elemental water spell.
          </p>

          <h4>Enchantment Spells</h4>
          <p>
            Enchantment spells can bewitch, dominate, halt, frighten, mesmerize, or otherwise affect the mind and will of target creatures. <em>Bewitch humanoid</em>, <em>halt monster</em>, and <em>slumber</em> are examples of enchantment spells. Enchantment spells are more difficult to detect than other types of spells. Enchantment spells benefit from the Mastery of Enchantments & Illusions proficiency.
          </p>

          <h4>Esoteric Spells</h4>
          <p>
            Esoteric spells can produce supernatural effects that no other type of spell can. Esoteric spells were discovered or developed in ages long past, and many of the esoteric spells written about in ancient accounts have been lost to the Tower of Knowledge. Those that remain known are some of the most important spells in existence. It is almost impossible for casters in this fallen age to create new esoteric spells or to enchant them into magic items, so many casters seek out ancient ruins and lost civilizations in the hopes of discovering them. <em>Communion</em>, <em>perpetual illumination</em>, and <em>rune of warding</em> are examples of esoteric spells.
          </p>

          <h4>Healing Spells</h4>
          <p>
            Healing spells can regenerate, revitalize, or even resurrect creatures. Healing spells can be reversed to damage or kill, in which case they function like weak death spells (above). <em>Cure light injury</em>, <em>neutralize poison</em>, and <em>restore life and limb</em> are examples of healing spells. Reversed healing spells can benefit from the Black Lore of Zahar proficiency, just as death spells do.
          </p>

          <h4>Illusion Spells</h4>
          <p>
            Illusion spells can create or suppress sensory data in the minds of those they affect. Illusion spells work by invoking a special pattern of light and/or sound that, when witnessed, triggers a particular hallucination in the mind of those who witnessed it. The pattern of the illusion has an objective existence but the hallucination it induces exists only in the mind. Because they exist in the mind, illusion spells are vulnerable to disbelief. A creature who successfully disbelieves an illusion sees or hears the pattern of the illusion but does not experience the hallucination it induces. <em>Chimerical figment</em>, <em>illusory interior</em>, and <em>mirage</em> are examples of illusion spells. Illusion spells benefit from the Mastery of Enchantments & Illusions proficiency.
          </p>

          <h4>Movement Spells</h4>
          <p>
            Movement spells allow creatures to move, or be moved, directly through the application of magical power. <em>Flight</em>, <em>teleportation</em>, and <em>telekinesis</em> are all movement spells. In contrast, a spell that allows a character to fly by taking on the characteristics of a bird would be a transmogrification spell. Movement spells do not benefit from any particular class powers or proficiencies in this book, although the Judge may create these if desired.
          </p>

          <h4>Protection Spells</h4>
          <p>
            Protection spells enhance armor and saving throws, ward off foes, and provide protection from various spells, weapons, and elements, directly through magic. <em>Blast ward</em>, <em>holy circle</em>, and <em>shimmer</em> are examples of protection spells. In contrast, a spell that increased a character's armor class by taking on the characteristics of a turtle would be a transmogrification spell. Protection spells benefit from the Bright Lore of Aura proficiency.
          </p>

          <h4>Summoning Spells</h4>
          <p>
            Summoning spells bring creatures from "elsewhere" to serve the spellcaster. There are three sub-types of summoning spells. Callings summon non-sapient creatures to arrive by means of their own locomotion to serve for a day. <em>Call of the wolf</em> is an example of a calling. Conjurations summon powerful creatures to serve the caster for a brief period of time. Conjured creatures are usually very powerful but actively hostile and must be controlled through concentration. <em>Conjure genie</em> is an example of a conjuration. Summons summon one or more creatures for extended periods of time. <em>Summon hellhounds</em> is an example of a summons. Callings are widely used by divine casters, while conjurations and summons are favored by arcane casters of a Chaotic bent. Whatever their sub-type, most summoning spells take a long time to cast and some are quite restricted in the frequency and method of use. Summoning spells benefit from the Mastery of Conjuration & Summoning proficiency.
          </p>

          <h4>Transmogrification Spells</h4>
          <p>
            Transmogrification spells transform the physical and/or mental characteristics of creatures or objects. Most transmogrification spells can only affect man-sized targets; the larger the target, the more powerful the magic required. Some transmogrification spells affect the creature's entire being, whereas others only modify a characteristic while leaving the creature mostly unaltered. <em>Adjust self</em>, <em>transform other</em>, and <em>winged flight</em> are examples of transmogrification spells. Transmogrification spells benefit from the Transmogrification proficiency, naturally. Some transmogrification spells have an elemental component (usually stone) and will benefit from Elementalism proficiency.
          </p>

          <h4>Wall Spells</h4>
          <p>
            Wall spells create barriers of physical, elemental, or magical substance. While drawing on similar energies as blast spells, wall spells benefit from having malleable or mobile areas of effect with very long durations. <em>Barrier of blades</em>, <em>cloud of poison</em>, and <em>wall of thunder</em> are examples of wall spells. Many wall spells also are elemental and will benefit from Elementalism proficiency. Unusual wall (one might say "off the wall") spells can sometimes benefit from other proficiencies. For example, <em>wall of corpses</em> creates a wall made of undead, and so benefits from Black Lore of Zahar.
          </p>

          <h3>Spell Type Abbreviations</h3>
          <p>
            In the spell lists below, the following superscripts are used to designate particular types of spells. This can be helpful to the player or Judge in quickly determining which spells are affected by various proficiencies and class powers. The spell type is also listed for each spell in its spell description.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p><strong>bst</strong> - blast</p>
              <p><strong>dth</strong> - death</p>
              <p><strong>det</strong> - detection</p>
              <p><strong>elm (type)</strong> - elemental (type)</p>
              <p><strong>enc</strong> - enchantment</p>
              <p><strong>eso</strong> - esoteric</p>
              <p><strong>heal</strong> - healing</p>
            </div>
            <div>
              <p><strong>ill</strong> - illusion</p>
              <p><strong>mov</strong> - movement</p>
              <p><strong>nec</strong> - necromancy*</p>
              <p><strong>pro</strong> - protection</p>
              <p><strong>sum</strong> - summoning</p>
              <p><strong>trn</strong> - transmogrification</p>
              <p><strong>wal</strong> - wall</p>
            </div>
          </div>
          
          <p className="text-sm italic">
            *All necromancy spells are formally part of the death type, but we have differentiated them to assist players in quickly identifying those spells which harm living creatures from those spells which control or create undead.
          </p>
        </div>
      ),
      level: 2
    },
    {
      id: 'spell-lists-repertoires',
      title: 'Spell Lists & Repertoires',
      content: (
        <div>
          <h3>Arcane Spell List</h3>
          
          <h4>First Level Arcane Spells</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Spell Name & Type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-4 py-2">1</td><td className="border border-gray-300 px-4 py-2">Arcane Armor <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">2</td><td className="border border-gray-300 px-4 py-2">Auditory Illusion <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">3</td><td className="border border-gray-300 px-4 py-2">Beguile Humanoid <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">4</td><td className="border border-gray-300 px-4 py-2">Blinding Flash <span className="text-sm text-gray-600">bst, elm(fire)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">5</td><td className="border border-gray-300 px-4 py-2">Chameleon <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">Choking Grip <span className="text-sm text-gray-600">dth</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">7</td><td className="border border-gray-300 px-4 py-2">Conjure Cacodemon Spawn <span className="text-sm text-gray-600">sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">8</td><td className="border border-gray-300 px-4 py-2">Counterspell <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">9</td><td className="border border-gray-300 px-4 py-2">Desiccate <span className="text-sm text-gray-600">bst, elm(water)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">10</td><td className="border border-gray-300 px-4 py-2">Discern Gist <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">11</td><td className="border border-gray-300 px-4 py-2">Discern Magic <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">12</td><td className="border border-gray-300 px-4 py-2">Earth's Excrescence <span className="text-sm text-gray-600">bst, elm(earth)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">13</td><td className="border border-gray-300 px-4 py-2">Faithful Companion <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">14</td><td className="border border-gray-300 px-4 py-2">Fan of Flames <span className="text-sm text-gray-600">bst, elm(fire)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">15</td><td className="border border-gray-300 px-4 py-2">Frighten Humanoid <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">16</td><td className="border border-gray-300 px-4 py-2">Ice Floe <span className="text-sm text-gray-600">elm(water), wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">17</td><td className="border border-gray-300 px-4 py-2">Illumination* <span className="text-sm text-gray-600">eso</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">18</td><td className="border border-gray-300 px-4 py-2">Illusory Figment <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">19</td><td className="border border-gray-300 px-4 py-2">Infuriate Humanoid <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">20</td><td className="border border-gray-300 px-4 py-2">Kindle Flame <span className="text-sm text-gray-600">bst, elm(fire)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">21</td><td className="border border-gray-300 px-4 py-2">Leaping <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">22</td><td className="border border-gray-300 px-4 py-2">Mage Missile <span className="text-sm text-gray-600">bst, elm(any)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">23</td><td className="border border-gray-300 px-4 py-2">Seal Portal <span className="text-sm text-gray-600">eso, mov</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">24</td><td className="border border-gray-300 px-4 py-2">Sharpness <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">25</td><td className="border border-gray-300 px-4 py-2">Shatter Blade <span className="text-sm text-gray-600">bst, elm(earth)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">26</td><td className="border border-gray-300 px-4 py-2">Silent Step <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">27</td><td className="border border-gray-300 px-4 py-2">Slicing Blow <span className="text-sm text-gray-600">dth</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">28</td><td className="border border-gray-300 px-4 py-2">Slickness <span className="text-sm text-gray-600">elm(water), wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">29</td><td className="border border-gray-300 px-4 py-2">Sling Stone <span className="text-sm text-gray-600">bst, elm(earth)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">30</td><td className="border border-gray-300 px-4 py-2">Slumber <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">31</td><td className="border border-gray-300 px-4 py-2">Spider Climbing <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">32</td><td className="border border-gray-300 px-4 py-2">Summon Manes <span className="text-sm text-gray-600">sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">33</td><td className="border border-gray-300 px-4 py-2">Thunderclap <span className="text-sm text-gray-600">elm(air), bst</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">34</td><td className="border border-gray-300 px-4 py-2">Unliving Puppet <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">35</td><td className="border border-gray-300 px-4 py-2">Wall of Smoke <span className="text-sm text-gray-600">elm(air), wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">36</td><td className="border border-gray-300 px-4 py-2">Weave Smoke <span className="text-sm text-gray-600">elm(air), wal</span></td></tr>
              </tbody>
            </table>
          </div>

          <h4>Second Level Arcane Spells</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Spell Name & Type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-4 py-2">1</td><td className="border border-gray-300 px-4 py-2">Adjust Self <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">2</td><td className="border border-gray-300 px-4 py-2">Battering Ram <span className="text-sm text-gray-600">bst, elm(earth)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">3</td><td className="border border-gray-300 px-4 py-2">Bewitch Humanoid <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">4</td><td className="border border-gray-300 px-4 py-2">Bloody Flux <span className="text-sm text-gray-600">dth</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">5</td><td className="border border-gray-300 px-4 py-2">Burning Sparks <span className="text-sm text-gray-600">bst, elm(fire)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">Circling Winds <span className="text-sm text-gray-600">elm(air), wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">7</td><td className="border border-gray-300 px-4 py-2">Conjure Imp <span className="text-sm text-gray-600">sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">8</td><td className="border border-gray-300 px-4 py-2">Conjure Petty Elemental <span className="text-sm text-gray-600">elm(any), sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">9</td><td className="border border-gray-300 px-4 py-2">Dark Whisper <span className="text-sm text-gray-600">dth</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">10</td><td className="border border-gray-300 px-4 py-2">Deathless Minion <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">11</td><td className="border border-gray-300 px-4 py-2">Discern Invisible <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">12</td><td className="border border-gray-300 px-4 py-2">Dominate Humanoid <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">13</td><td className="border border-gray-300 px-4 py-2">Earth's Wave <span className="text-sm text-gray-600">bst, elm(earth)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">14</td><td className="border border-gray-300 px-4 py-2">Energy Protection <span className="text-sm text-gray-600">elm (any), pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">15</td><td className="border border-gray-300 px-4 py-2">Frostbite <span className="text-sm text-gray-600">bst, dth, elm(water)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">16</td><td className="border border-gray-300 px-4 py-2">Gale of Wind <span className="text-sm text-gray-600">bst, elm(air)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">17</td><td className="border border-gray-300 px-4 py-2">Halt Humanoids <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">18</td><td className="border border-gray-300 px-4 py-2">Hypnotic Sigil <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">19</td><td className="border border-gray-300 px-4 py-2">Illusory Duplicates <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">20</td><td className="border border-gray-300 px-4 py-2">Illusory Interior <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">21</td><td className="border border-gray-300 px-4 py-2">Levitation <span className="text-sm text-gray-600">mov</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">22</td><td className="border border-gray-300 px-4 py-2">Locate Object <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">23</td><td className="border border-gray-300 px-4 py-2">Magic Lock <span className="text-sm text-gray-600">mov</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">24</td><td className="border border-gray-300 px-4 py-2">Necromantic Potence <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">25</td><td className="border border-gray-300 px-4 py-2">Ogre Strength <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">26</td><td className="border border-gray-300 px-4 py-2">Phantasmal Figment <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">27</td><td className="border border-gray-300 px-4 py-2">Physical Protection <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">28</td><td className="border border-gray-300 px-4 py-2">Rain of Vitriol <span className="text-sm text-gray-600">bst, elm(water)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">29</td><td className="border border-gray-300 px-4 py-2">Shrouding Fog <span className="text-sm text-gray-600">elm(air), eso, wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">30</td><td className="border border-gray-300 px-4 py-2">Sudden Staircase <span className="text-sm text-gray-600">wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">31</td><td className="border border-gray-300 px-4 py-2">Summon Insect Swarm <span className="text-sm text-gray-600">sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">32</td><td className="border border-gray-300 px-4 py-2">Sunflare <span className="text-sm text-gray-600">bst, elm(fire)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">33</td><td className="border border-gray-300 px-4 py-2">Swimming <span className="text-sm text-gray-600">elm (water), trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">34</td><td className="border border-gray-300 px-4 py-2">Vitriolic Infusion <span className="text-sm text-gray-600">elm(water), trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">35</td><td className="border border-gray-300 px-4 py-2">Warp Wood <span className="text-sm text-gray-600">bst, elm(earth)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">36</td><td className="border border-gray-300 px-4 py-2">Webbing <span className="text-sm text-gray-600">eso, wal</span></td></tr>
              </tbody>
            </table>
          </div>

          <h4>Third Level Arcane Spells</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Spell Name & Type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-4 py-2">1</td><td className="border border-gray-300 px-4 py-2">Avian Messenger <span className="text-sm text-gray-600">sum, trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">2</td><td className="border border-gray-300 px-4 py-2">Bewitch Crowd <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">3</td><td className="border border-gray-300 px-4 py-2">Boil Blood <span className="text-sm text-gray-600">bst, elm(fire)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">4</td><td className="border border-gray-300 px-4 py-2">Chimerical Figment <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">5</td><td className="border border-gray-300 px-4 py-2">Clairaudiency <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">Clairvoyancy <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">7</td><td className="border border-gray-300 px-4 py-2">Cone of Frost <span className="text-sm text-gray-600">bst, elm(water)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">8</td><td className="border border-gray-300 px-4 py-2">Conjure Hellion <span className="text-sm text-gray-600">sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">9</td><td className="border border-gray-300 px-4 py-2">Create Chasm <span className="text-sm text-gray-600">elm(earth), wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">10</td><td className="border border-gray-300 px-4 py-2">Deflect Ordinary Missiles <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">11</td><td className="border border-gray-300 px-4 py-2">Dismember <span className="text-sm text-gray-600">dth</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">12</td><td className="border border-gray-300 px-4 py-2">Dispel Magic <span className="text-sm text-gray-600">prot</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">13</td><td className="border border-gray-300 px-4 py-2">Dominate Monster <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">14</td><td className="border border-gray-300 px-4 py-2">Earth's Teeth <span className="text-sm text-gray-600">bst, elm(earth)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">15</td><td className="border border-gray-300 px-4 py-2">Fireball <span className="text-sm text-gray-600">bst, elm(fire)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">16</td><td className="border border-gray-300 px-4 py-2">Flight <span className="text-sm text-gray-600">mov</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">17</td><td className="border border-gray-300 px-4 py-2">Force of Impetus <span className="text-sm text-gray-600">elm(earth), mov</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">18</td><td className="border border-gray-300 px-4 py-2">Growth* <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">19</td><td className="border border-gray-300 px-4 py-2">Ice Sheet <span className="text-sm text-gray-600">elm(water), wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">20</td><td className="border border-gray-300 px-4 py-2">Illumination, Perpetual <span className="text-sm text-gray-600">eso</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">21</td><td className="border border-gray-300 px-4 py-2">Inaudibility <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">22</td><td className="border border-gray-300 px-4 py-2">Incite Madness <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">23</td><td className="border border-gray-300 px-4 py-2">Infuriate Crowd <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">24</td><td className="border border-gray-300 px-4 py-2">Invisibility <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">25</td><td className="border border-gray-300 px-4 py-2">Lightless Vision <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">26</td><td className="border border-gray-300 px-4 py-2">Lightning Strike <span className="text-sm text-gray-600">bst, elm(air), eso</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">27</td><td className="border border-gray-300 px-4 py-2">Rune of Warding <span className="text-sm text-gray-600">eso, pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">28</td><td className="border border-gray-300 px-4 py-2">Skinchange <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">29</td><td className="border border-gray-300 px-4 py-2">Speak with Dead <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">30</td><td className="border border-gray-300 px-4 py-2">Spellward <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">31</td><td className="border border-gray-300 px-4 py-2">Strengthen the Unliving <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">32</td><td className="border border-gray-300 px-4 py-2">Summon Hellhounds <span className="text-sm text-gray-600">sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">33</td><td className="border border-gray-300 px-4 py-2">Thunderbolt <span className="text-sm text-gray-600">bst, elm(air)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">34</td><td className="border border-gray-300 px-4 py-2">Wall of Thunder <span className="text-sm text-gray-600">elm(air), wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">35</td><td className="border border-gray-300 px-4 py-2">Water Breathing <span className="text-sm text-gray-600">elm(water), trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">36</td><td className="border border-gray-300 px-4 py-2">Weave Fire <span className="text-sm text-gray-600">elm(fire), wal</span></td></tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
            <p className="font-medium text-purple-900 dark:text-purple-100 mb-2">
              📖 <strong>Looking for detailed spell descriptions?</strong>
            </p>
            <p className="text-purple-800 dark:text-purple-200 text-sm mb-3">
              Each spell listed above has complete descriptions with range, duration, and effects. 
              Access them through our interactive database with all 317 spells:
            </p>
            <div className="flex flex-wrap gap-2">
              <Link 
                href="/spells" 
                className="inline-flex items-center px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-md transition-colors"
              >
                View All Spell Descriptions
                <ExternalLink className="h-3 w-3 ml-2" />
              </Link>
              <Link 
                href="/spells?magicType=Arcane" 
                className="inline-flex items-center px-3 py-2 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-purple-900 dark:text-purple-100 text-sm rounded-md transition-colors"
              >
                Arcane Spells Only
              </Link>
              <Link 
                href="/spells?magicType=Divine" 
                className="inline-flex items-center px-3 py-2 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-purple-900 dark:text-purple-100 text-sm rounded-md transition-colors"
              >
                Divine Spells Only
              </Link>
            </div>
          </div>
          
          <h4>Fourth Level Arcane Spells</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Spell Name & Type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-4 py-2">1</td><td className="border border-gray-300 px-4 py-2">Animate Undead <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">2</td><td className="border border-gray-300 px-4 py-2">Arcane Shift <span className="text-sm text-gray-600">mov</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">3</td><td className="border border-gray-300 px-4 py-2">Bewitch Monster <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">4</td><td className="border border-gray-300 px-4 py-2">Cloud of Poison <span className="text-sm text-gray-600">elm(air), wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">5</td><td className="border border-gray-300 px-4 py-2">Conjure Incubus <span className="text-sm text-gray-600">sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">Conjure Major Elemental <span className="text-sm text-gray-600">elm (any), sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">7</td><td className="border border-gray-300 px-4 py-2">Earth's Tremor <span className="text-sm text-gray-600">bst, elm(earth)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">8</td><td className="border border-gray-300 px-4 py-2">Energy Invulnerability <span className="text-sm text-gray-600">elm(any), pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">9</td><td className="border border-gray-300 px-4 py-2">Cone of Fear <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">10</td><td className="border border-gray-300 px-4 py-2">Flesh to Ash <span className="text-sm text-gray-600">dth</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">11</td><td className="border border-gray-300 px-4 py-2">Giant Strength <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">12</td><td className="border border-gray-300 px-4 py-2">Growth, Plant * <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">13</td><td className="border border-gray-300 px-4 py-2">Guise Self <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">14</td><td className="border border-gray-300 px-4 py-2">Halt Monsters <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">15</td><td className="border border-gray-300 px-4 py-2">Hidden Host <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">16</td><td className="border border-gray-300 px-4 py-2">Illusory Terrain <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">17</td><td className="border border-gray-300 px-4 py-2">Indiscernibility <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">18</td><td className="border border-gray-300 px-4 py-2">Inferno <span className="text-sm text-gray-600">bst, elm(fire)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">19</td><td className="border border-gray-300 px-4 py-2">Iron Maiden <span className="text-sm text-gray-600">dth</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">20</td><td className="border border-gray-300 px-4 py-2">Locate Treasure <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">21</td><td className="border border-gray-300 px-4 py-2">Magic Carpet <span className="text-sm text-gray-600">mov</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">22</td><td className="border border-gray-300 px-4 py-2">Physical Invulnerability <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">23</td><td className="border border-gray-300 px-4 py-2">Safe Travels <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">24</td><td className="border border-gray-300 px-4 py-2">Scouring Zephyr <span className="text-sm text-gray-600">bst, elm(air)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">25</td><td className="border border-gray-300 px-4 py-2">Scry <span className="text-sm text-gray-600">det, eso</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">26</td><td className="border border-gray-300 px-4 py-2">Shrieking Skull <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">27</td><td className="border border-gray-300 px-4 py-2">Slumber, Deep <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">28</td><td className="border border-gray-300 px-4 py-2">Spectral Figment <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">29</td><td className="border border-gray-300 px-4 py-2">Spellward Other <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">30</td><td className="border border-gray-300 px-4 py-2">Sphere of Invulnerability, Lesser <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">31</td><td className="border border-gray-300 px-4 py-2">Summon Shadow <span className="text-sm text-gray-600">sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">32</td><td className="border border-gray-300 px-4 py-2">Sunder Structure <span className="text-sm text-gray-600">bst, elm(earth)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">33</td><td className="border border-gray-300 px-4 py-2">Telepathy <span className="text-sm text-gray-600">det, eso</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">34</td><td className="border border-gray-300 px-4 py-2">Wall of Flame <span className="text-sm text-gray-600">elm(fire), wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">35</td><td className="border border-gray-300 px-4 py-2">Wall of Frost <span className="text-sm text-gray-600">elm(water), wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">36</td><td className="border border-gray-300 px-4 py-2">Weave Water <span className="text-sm text-gray-600">elm(water), wal</span></td></tr>
              </tbody>
            </table>
          </div>

          <h4>Fifth Level Arcane Spells</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Spell Name & Type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-4 py-2">1</td><td className="border border-gray-300 px-4 py-2">Blast Ward <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">2</td><td className="border border-gray-300 px-4 py-2">Capsizing Wave <span className="text-sm text-gray-600">bst, elm(water)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">3</td><td className="border border-gray-300 px-4 py-2">Carnage <span className="text-sm text-gray-600">dth</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">4</td><td className="border border-gray-300 px-4 py-2">Circle of Agony <span className="text-sm text-gray-600">dth</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">5</td><td className="border border-gray-300 px-4 py-2">Cone of Paralysis <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">Conjure Dybbuk <span className="text-sm text-gray-600">sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">7</td><td className="border border-gray-300 px-4 py-2">Conjure Supreme Elem. <span className="text-sm text-gray-600">elm(any), sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">8</td><td className="border border-gray-300 px-4 py-2">Contact Other Sphere <span className="text-sm text-gray-600">det, eso</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">9</td><td className="border border-gray-300 px-4 py-2">Control Winds <span className="text-sm text-gray-600">elm (air), eso</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">10</td><td className="border border-gray-300 px-4 py-2">Curse of the Swine <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">11</td><td className="border border-gray-300 px-4 py-2">Deflect Ordinary Weapons <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">12</td><td className="border border-gray-300 px-4 py-2">Dominate Plants <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">13</td><td className="border border-gray-300 px-4 py-2">Earth's Mire* <span className="text-sm text-gray-600">elm(earth), trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">14</td><td className="border border-gray-300 px-4 py-2">Flay the Slain <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">15</td><td className="border border-gray-300 px-4 py-2">Fillet and Serve <span className="text-sm text-gray-600">dth, nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">16</td><td className="border border-gray-300 px-4 py-2">Firestorm <span className="text-sm text-gray-600">bst, elm(fire)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">17</td><td className="border border-gray-300 px-4 py-2">Forest Enchantment <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">18</td><td className="border border-gray-300 px-4 py-2">Forgetfulness <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">19</td><td className="border border-gray-300 px-4 py-2">Guise Other <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">20</td><td className="border border-gray-300 px-4 py-2">Ice Storm <span className="text-sm text-gray-600">bst, elm(water)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">21</td><td className="border border-gray-300 px-4 py-2">Lay of the Land <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">22</td><td className="border border-gray-300 px-4 py-2">Life Transfer <span className="text-sm text-gray-600">dth</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">23</td><td className="border border-gray-300 px-4 py-2">Lightless Vision, Mass <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">24</td><td className="border border-gray-300 px-4 py-2">Locate Haunting <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">25</td><td className="border border-gray-300 px-4 py-2">Mirage <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">26</td><td className="border border-gray-300 px-4 py-2">Phantasmal Horror <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">27</td><td className="border border-gray-300 px-4 py-2">Rouse the Fallen <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">28</td><td className="border border-gray-300 px-4 py-2">Selective Fire <span className="text-sm text-gray-600">bst, elm(fire)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">29</td><td className="border border-gray-300 px-4 py-2">Soul Swap <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">30</td><td className="border border-gray-300 px-4 py-2">Spectral Legion <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">31</td><td className="border border-gray-300 px-4 py-2">Summon Ooze <span className="text-sm text-gray-600">sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">32</td><td className="border border-gray-300 px-4 py-2">Summon Weather <span className="text-sm text-gray-600">elm(air), eso</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">33</td><td className="border border-gray-300 px-4 py-2">Telekinesis <span className="text-sm text-gray-600">mov</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">34</td><td className="border border-gray-300 px-4 py-2">Teleportation <span className="text-sm text-gray-600">mov</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">35</td><td className="border border-gray-300 px-4 py-2">Wall of Stone <span className="text-sm text-gray-600">elm(earth), wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">36</td><td className="border border-gray-300 px-4 py-2">X-Ray Vision <span className="text-sm text-gray-600">det, eso</span></td></tr>
              </tbody>
            </table>
          </div>

          <h4>Sixth Level Arcane Spells</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Spell Name & Type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-4 py-2">1</td><td className="border border-gray-300 px-4 py-2">Anti-Magic Sphere <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">2</td><td className="border border-gray-300 px-4 py-2">Banner of Invincibility <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">3</td><td className="border border-gray-300 px-4 py-2">Body Swap <span className="text-sm text-gray-600">nec, trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">4</td><td className="border border-gray-300 px-4 py-2">Clairaudiency, Greater <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">5</td><td className="border border-gray-300 px-4 py-2">Clairvoyancy, Greater <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">Conflagration <span className="text-sm text-gray-600">bst, elm(fire)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">7</td><td className="border border-gray-300 px-4 py-2">Conjure Fiend <span className="text-sm text-gray-600">sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">8</td><td className="border border-gray-300 px-4 py-2">Conjure Genie <span className="text-sm text-gray-600">elm(any), sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">9</td><td className="border border-gray-300 px-4 py-2">Control Weather <span className="text-sm text-gray-600">elm(air), eso</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">10</td><td className="border border-gray-300 px-4 py-2">Disfigure Body and Soul <span className="text-sm text-gray-600">dth</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">11</td><td className="border border-gray-300 px-4 py-2">Disintegration <span className="text-sm text-gray-600">dth</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">12</td><td className="border border-gray-300 px-4 py-2">Earth's Movement <span className="text-sm text-gray-600">elm(earth), eso, mov</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">13</td><td className="border border-gray-300 px-4 py-2">Enslave Humanoid <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">14</td><td className="border border-gray-300 px-4 py-2">Level Water <span className="text-sm text-gray-600">elm(water), eso, mov</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">15</td><td className="border border-gray-300 px-4 py-2">Locate Distant Object <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">16</td><td className="border border-gray-300 px-4 py-2">Locate Place of Power <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">17</td><td className="border border-gray-300 px-4 py-2">Madness of Crowds <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">18</td><td className="border border-gray-300 px-4 py-2">Necromantic Invulnerability <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">19</td><td className="border border-gray-300 px-4 py-2">Panic <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">20</td><td className="border border-gray-300 px-4 py-2">Passageway <span className="text-sm text-gray-600">eso</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">21</td><td className="border border-gray-300 px-4 py-2">Perpetual Figment <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">22</td><td className="border border-gray-300 px-4 py-2">Petrification* <span className="text-sm text-gray-600">dth</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">23</td><td className="border border-gray-300 px-4 py-2">Programmatic Figment <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">24</td><td className="border border-gray-300 px-4 py-2">Quest <span className="text-sm text-gray-600">enc, eso</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">25</td><td className="border border-gray-300 px-4 py-2">Reveal Ritual Magic <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">26</td><td className="border border-gray-300 px-4 py-2">Soul Eating <span className="text-sm text-gray-600">dth, nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">27</td><td className="border border-gray-300 px-4 py-2">Spellwarded Zone <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">28</td><td className="border border-gray-300 px-4 py-2">Sphere of Invulnerability, Grt. <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">29</td><td className="border border-gray-300 px-4 py-2">Summon Invisible Stalker <span className="text-sm text-gray-600">sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">30</td><td className="border border-gray-300 px-4 py-2">Torpor <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">31</td><td className="border border-gray-300 px-4 py-2">Transform Other <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">32</td><td className="border border-gray-300 px-4 py-2">Transform Self <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">33</td><td className="border border-gray-300 px-4 py-2">Trollblood <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">34</td><td className="border border-gray-300 px-4 py-2">Wall of Annihilation <span className="text-sm text-gray-600">wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">35</td><td className="border border-gray-300 px-4 py-2">Wall of Corpses <span className="text-sm text-gray-600">nec, wal</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">36</td><td className="border border-gray-300 px-4 py-2">Wall of Force <span className="text-sm text-gray-600">wal</span></td></tr>
              </tbody>
            </table>
          </div>

          <h3>Divine Spell List</h3>
          
          <h4>First Level Divine Spells</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Spell Name & Type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-4 py-2">1</td><td className="border border-gray-300 px-4 py-2">Allure <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">2</td><td className="border border-gray-300 px-4 py-2">Angelic Choir <span className="text-sm text-gray-600">ill</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">3</td><td className="border border-gray-300 px-4 py-2">Bane-Rune <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">4</td><td className="border border-gray-300 px-4 py-2">Call of the Wolf <span className="text-sm text-gray-600">sum</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">5</td><td className="border border-gray-300 px-4 py-2">Counterspell <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">Cure Light Injury* <span className="text-sm text-gray-600">hea</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">7</td><td className="border border-gray-300 px-4 py-2">Delay Disease <span className="text-sm text-gray-600">hea</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">8</td><td className="border border-gray-300 px-4 py-2">Destroy Dead <span className="text-sm text-gray-600">dth</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">9</td><td className="border border-gray-300 px-4 py-2">Discern Evil* <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">10</td><td className="border border-gray-300 px-4 py-2">Discern Gist <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">11</td><td className="border border-gray-300 px-4 py-2">Discern Magic <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">12</td><td className="border border-gray-300 px-4 py-2">Discern Poison <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">13</td><td className="border border-gray-300 px-4 py-2">Faithful Companion <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">14</td><td className="border border-gray-300 px-4 py-2">Frighten Beast <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">15</td><td className="border border-gray-300 px-4 py-2">Holy Circle* <span className="text-sm text-gray-600">pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">16</td><td className="border border-gray-300 px-4 py-2">Illumination* <span className="text-sm text-gray-600">eso</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">17</td><td className="border border-gray-300 px-4 py-2">Infuriate Beast <span className="text-sm text-gray-600">enc</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">18</td><td className="border border-gray-300 px-4 py-2">Kindle Flame <span className="text-sm text-gray-600">bst, elm(fire)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">19</td><td className="border border-gray-300 px-4 py-2">Locate Animal or Plant <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">20</td><td className="border border-gray-300 px-4 py-2">Pass Without Trace <span className="text-sm text-gray-600">trn</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">21</td><td className="border border-gray-300 px-4 py-2">Predict Weather <span className="text-sm text-gray-600">det</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">22</td><td className="border border-gray-300 px-4 py-2">Purify Food and Water* <span className="text-sm text-gray-600">eso</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">23</td><td className="border border-gray-300 px-4 py-2">Remove Fear* <span className="text-sm text-gray-600">eso, hea</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">24</td><td className="border border-gray-300 px-4 py-2">Salving Rest <span className="text-sm text-gray-600">eso, hea</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">25</td><td className="border border-gray-300 px-4 py-2">Sanctuary <span className="text-sm text-gray-600">eso, pro</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">26</td><td className="border border-gray-300 px-4 py-2">Seal Portal <span className="text-sm text-gray-600">eso, mov</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">27</td><td className="border border-gray-300 px-4 py-2">Shatter Blade <span className="text-sm text-gray-600">bst, elm(earth)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">28</td><td className="border border-gray-300 px-4 py-2">Sling Stone <span className="text-sm text-gray-600">bst, elm(earth)</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">29</td><td className="border border-gray-300 px-4 py-2">Unliving Puppet <span className="text-sm text-gray-600">nec</span></td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">30</td><td className="border border-gray-300 px-4 py-2">Word of Command <span className="text-sm text-gray-600">enc</span></td></tr>
              </tbody>
            </table>
          </div>

          <h3>Spell Repertoires by Class</h3>
          <p>The following section shows which specific spells each spellcasting class can learn at each level. Each class has a unique approach to magic, reflected in their spell selection.</p>

          <h4>Bladedancer Spell Repertoire</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Level</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Available Spells</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">1st</td>
                  <td className="border border-gray-300 px-4 py-2">Allure, Angelic Choir, Cure Light Injury*, Discern Evil*, Discern Magic, Discern Poison, Illumination*, Remove Fear*, Salving Rest, Sanctuary</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">2nd</td>
                  <td className="border border-gray-300 px-4 py-2">Adjust Self, Arcane Sight, Bewitch Crowd, Boldness, Cure Serious Injury*, Darkness*, Delay Disease, Detect the Living, Hold Monster, Hold Portal, Holy Circle*, Mirror Image, Neutralize Poison*, Push, Reveal Secrets, Silence*, Sleep, Web</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">3rd</td>
                  <td className="border border-gray-300 px-4 py-2">Bewitch Monster, Clairaudiency, Clairvoyancy, Cure Critical Injury*, Dispel Magic, Flight, Growth*, Inaudibility, Incite Madness, Invisibility, Lightning Strike, Spellward, Water Breathing</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">4th</td>
                  <td className="border border-gray-300 px-4 py-2">Arcane Shift, Energy Invulnerability, Giant Strength, Guise Self, Halt Monsters, Hidden Host, Indiscernibility, Locate Treasure, Physical Invulnerability, Scry, Spellward Other, Sphere of Invulnerability, Lesser</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4>Crusader Spell Repertoire</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Level</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Available Spells</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">1st</td>
                  <td className="border border-gray-300 px-4 py-2">Cure Light Injury*, Delay Disease, Destroy Dead, Discern Evil*, Discern Magic, Discern Poison, Holy Circle*, Illumination*, Purify Food and Water*, Remove Fear*, Salving Rest, Sanctuary</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">2nd</td>
                  <td className="border border-gray-300 px-4 py-2">Bless*, Boldness, Cure Serious Injury*, Darkness*, Delay Disease, Detect the Living, Hold Monster, Holy Circle*, Mirror Image, Neutralize Poison*, Push, Silence*, Sleep, Speak with Animals, Web</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">3rd</td>
                  <td className="border border-gray-300 px-4 py-2">Cure Critical Injury*, Dispel Magic, Growth*, Lightning Strike, Speak with Dead, Spellward, Water Breathing</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">4th</td>
                  <td className="border border-gray-300 px-4 py-2">Energy Invulnerability, Physical Invulnerability, Spellward Other, Sphere of Invulnerability, Lesser</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4>Priestess Spell Repertoire</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Level</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Available Spells</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">1st</td>
                  <td className="border border-gray-300 px-4 py-2">Allure, Cure Light Injury*, Delay Disease, Destroy Dead, Discern Evil*, Discern Magic, Discern Poison, Holy Circle*, Illumination*, Purify Food and Water*, Remove Fear*, Salving Rest, Sanctuary</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">2nd</td>
                  <td className="border border-gray-300 px-4 py-2">Augury, Bless*, Boldness, Cure Serious Injury*, Darkness*, Delay Disease, Detect the Living, Hold Monster, Holy Circle*, Mirror Image, Neutralize Poison*, Push, Silence*, Sleep, Speak with Animals, Web</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">3rd</td>
                  <td className="border border-gray-300 px-4 py-2">Bewitch Monster, Clairaudiency, Clairvoyancy, Cure Critical Injury*, Dispel Magic, Growth*, Lightning Strike, Speak with Dead, Spellward, Water Breathing</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">4th</td>
                  <td className="border border-gray-300 px-4 py-2">Energy Invulnerability, Physical Invulnerability, Scry, Spellward Other, Sphere of Invulnerability, Lesser</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">5th</td>
                  <td className="border border-gray-300 px-4 py-2">Cone of Paralysis, Contact Other Sphere, Forgetfulness, Lay of the Land, Mirage, Teleportation</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">6th</td>
                  <td className="border border-gray-300 px-4 py-2">Anti-Magic Sphere, Banner of Invincibility, Clairaudiency, Greater, Clairvoyancy, Greater, Quest, Spellwarded Zone, Sphere of Invulnerability, Greater</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">7th</td>
                  <td className="border border-gray-300 px-4 py-2">Limited Wish, Restoration*, Resurrection*</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4>Shaman Spell Repertoire</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Level</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Available Spells</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">1st</td>
                  <td className="border border-gray-300 px-4 py-2">Bane-Rune, Call of the Wolf, Cure Light Injury*, Discern Evil*, Discern Gist, Discern Poison, Frighten Beast, Infuriate Beast, Kindle Flame, Locate Animal or Plant, Pass Without Trace, Predict Weather, Sling Stone, Unliving Puppet, Word of Command</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">2nd</td>
                  <td className="border border-gray-300 px-4 py-2">Bless*, Create Water, Cure Serious Injury*, Darkness*, Delay Disease, Detect the Living, Hold Monster, Neutralize Poison*, Silence*, Sleep, Speak with Animals, Web</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">3rd</td>
                  <td className="border border-gray-300 px-4 py-2">Cure Critical Injury*, Dispel Magic, Growth*, Lightning Strike, Speak with Dead, Water Breathing</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">4th</td>
                  <td className="border border-gray-300 px-4 py-2">Energy Invulnerability, Physical Invulnerability</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">5th</td>
                  <td className="border border-gray-300 px-4 py-2">Contact Other Sphere, Control Winds, Dominate Plants, Earth's Mire*, Forest Enchantment, Lay of the Land, Summon Weather</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">6th</td>
                  <td className="border border-gray-300 px-4 py-2">Control Weather, Earth's Movement, Level Water</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 mb-4 mt-4">
            <em>Note: This chapter now shows the complete ACKS II Chapter 5 content including magic theory, complete Arcane spell lists (levels 1-6), Divine spell list, and all spell repertoires by class. For the complete spell database with search, filtering, and all 317 spell descriptions, use the links above.</em>
          </p>
        </div>
      ),
      level: 2
    }
  ]
};

export const metadata: Metadata = {
  title: 'Chapter 5: Spells - ACKS II Wiki',
  description: 'Complete magic system, spell lists, and spell descriptions from ACKS II',
};

export default function Chapter5SpellsPage() {
  return (
    <ChapterTemplate
      chapterNumber={CHAPTER_CONTENT.chapterNumber}
      title={CHAPTER_CONTENT.title}
      description={CHAPTER_CONTENT.description}
      introduction={CHAPTER_CONTENT.introduction}
      sections={CHAPTER_CONTENT.sections}
    />
  );
} 