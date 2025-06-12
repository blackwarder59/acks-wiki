import { Metadata } from 'next';
import { ChapterTemplate } from '@/components/rulebook/chapter-template';

/**
 * Equipment Descriptions Section - Chapter 4 Equipment Subsection
 * Contains detailed descriptions of all weapons, armor, and equipment
 * from ACKS II Rulebook file 41_equipment_descriptions.md
 */

const DESCRIPTIONS_CONTENT = {
  chapterNumber: '4',
  title: 'Equipment Descriptions',
  description: 'Detailed descriptions of all weapons, armor, and equipment in ACKS II',
  introduction: 'The arms, armor, and mundane gear available for purchase are listed from the Equipment List tables. The equipment and other items listed on the Equipment List tables are described in detail in this section.',
  sections: [
    {
      id: 'weapon-descriptions',
      title: 'Weapon Descriptions',
      level: 2,
      content: `<p>All daggers and swords come with a simple sheath or scabbard. All other melee weapons come with a strap that can be hung from an adventurer's harness, belt, or shoulder strap. Decorative scabbards can be purchased separately as adventuring equipment.</p>

<p><strong>Arbalest:</strong> An arbalest is a heavy crossbow, pulled with the mechanical assistance of a rack and pinion or windlass. Historical examples include the late medieval arbalest and the Three Kingdoms era Chinese heavy crossbow. In Aurëpos, only dwarves manufacture arbalests in wide numbers, though all races and realms buy and use them.</p>

<p><strong>Axe, Battle:</strong> This is a single- or double-bitted axe with a 24" to 48" haft, designed for battle and useable with one or two hands. Historical examples include the Scythian sagaris, Viking bearded and skeg axe, Celtic war axe, medieval battle axe, and Persian tabarzin. In Aurëpos, battle axes are popular with Jutlandic dwarves and humans and Meniri dwarves, as well as with beastmen.</p>

<p><strong>Axe, Great:</strong> This is a double-bitted axe or long-shafted single-bitted axe, with a 48" or longer haft, requiring two hands to use. Historical examples included the Greek double-bitted labrys, Viking long bearded axe, and the English longaxe. In Aurëpos, great axes are popular with Jutlandic dwarves and humans and Meniri dwarves.</p>

<p><strong>Axe, Hand:</strong> This is a single-bitted axe, with a 12" to 24" haft, balanced for throwing. Historical examples include the Frankish francisca, American tomahawk, and African mambele and kasuyu. In Aurëpos hand axes are popular with the Jutlanders (both dwarves and humans), the Meniri dwarves, and the various races of beastmen. They are favored by explorers throughout the continent because they can serve as tools as well as weapons.</p>

<p><strong>Bola:</strong> These are throwing weapons made of weights on the ends of interconnected cords, designed to capture animals by entangling their legs. A character can use a bola to make a knock down or wrestling maneuver (as described in <strong>Special Maneuvers</strong>, p. XX) with a thrown attack. In Aurëpos, bolas are popular with the elves of Northern Argollë and the tribes of the Ivory Kingdoms.</p>

<p><strong>Bow, Composite:</strong> A composite bow is a recurved bow made of laminated wood, horn, and sinew. Composite bows are time consuming and expensive to craft but offer a better combination of mobility and power than long bows or short bows. Historical examples include the Scythian horn bow, Chinese laminated bamboo bow, Greek and Roman composite bow, Mongolian composite bow, and Japanese yumi. Composite bows are popular throughout Aurëpos, but especially among the Kryseans, Northern Argollëans, and Skysos.</p>

<p><strong>Bow, Long:</strong> A long bow is made from a single piece of wood, as tall as the person who uses it. Equal in range and power to more expensive composite bows, long bows require substantial strength (STR 9 or more) and cannot be used by mounted troops. Historical examples include the ancient Indian long bow, the Nubian long bow, and the Welsh and English long bow. In Aurëpos, long bows are popular in Northern Argollë, Southern Argollë, Rorn, Somirea, and the Ivory Kingdoms.</p>

<p><strong>Bow, Short:</strong> A short bow is made from a single piece of wood, usually around 4' tall. Short bows lack the range and power of either long bows or composite bows, but are cheap and fast to make. Historical examples include the Neolithic short bow and Comanche self bow. Short bows are popular among every race and realm in Aurëpos.</p>

<p><strong>Cestus:</strong> A pair of armored battle gloves, made with leather strips and fitted with blades, spikes, and/or iron plates. Characters equipped with cestus may deal 1d3 points of lethal damage with a punch. In the Auran Empire, cestuses are used in gladiatorial contests.</p>

<p><strong>Club:</strong> A club is any simple bludgeon used to batter opponents.</p>

<p><strong>Crossbow:</strong> A crossbow is a bow mounted cross-wise on a stock with a trigger. It fires squat projectiles called bolts. Crossbows are light enough to pull by hand or with a quick drawing lever and are much easier to use than bows. Historical examples are the Greek gastraphetes, Roman arcuballista, Chinese handheld crossbow, and the medieval crossbow with cavalry cranequin. In Aurëpos, the best crossbows are of dwarvish make, although the Celdoreans, Niceans, and Tireneans also manufacture and use them. They are rare in Jutland and Rorn.</p>

<p><strong>Dagger:</strong> A dagger has a small 6" to 12" blade, either single-edged for cutting, or doubled edged for stabbing. Daggers may be used in melee or for throwing. Historical examples include the Asian kris, medieval poniard, Japanese tanto, Scottish dirk, and Renaissance stiletto. Some daggers have blades coated with silver for use against enchanted creatures. Daggers are popular among every race and realm in Aurëpos.</p>

<p><strong>Dart:</strong> A dart is any small projectile designed to be thrown. Most darts are fletched wooden shafts, ranging in length from 6" to 2' long, but they may also be metal spikes or stars. Historical examples include the Roman plumbata, Macedonian kestros, and Japanese shuriken. In Aurëpos, darts are common in Krysea, Tirenea, and the Ivory Kingdoms.</p>

<p><strong>Flail:</strong> This is a bludgeoning weapon derived from the agricultural flail with a striking head connected to the haft by a flexible chain. Flails are useable with one or two hands. Historical examples include the medieval ball-and-chain, Japanese rentsuru and nunchaku, and Chinese meteor hammer. Flails were highly favored among the old Zaharan nobility and remain popular in Celdorea, Kemesh, and Somirea.</p>

<p><strong>Javelin:</strong> Javelins are short spears, 3' to 6' long, designed for throwing. Historical examples include the Greek javelin, Roman pilum and verutum, early medieval angon, and Zulu assegai. Javelins are popular among every race and realm of Aurëpos.</p>

<p><strong>Lance:</strong> Lances are long spears, 12' to 16' in length, designed for mounted warriors. Despite their length, they can be used one-handed if mounted. If used on foot with two hands, a lance can be used to attack targets from behind an ally. Lances inflict double damage when used in or against a charge. However, any attack throw of natural 1 made with a lance breaks its shaft. Historical examples include the Greek xyston, Persian and Byzantine kontos, and medieval lance. Lances are used by cavalry throughout Aurëpos.</p>

<p><strong>Mace:</strong> A mace is a bludgeoning weapon consisting of a 2' to 3' wood or metal shaft and a heavy stone or metal head, useable with one or two hands. Historical examples include the Egyptian bronze-headed mace, medieval flanged mace, Persian horseman's mace, Russian pernach, and Slavic bulawa. In the Auran Empire, maces are popular among the crusaders and paladins of Ammonar.</p>

<p><strong>Morning Star:</strong> This is any type of large mace-liked weapon with a spiked metal head. Any flails and maces too large to be used one-handed can also be treated as morning stars. Historical examples include the medieval morning star, German chain-morning star, English holy water sprinkler, Flemish goedendag, and Japanese tetsubo. Like flails, morning stars were popular in ancient Zahar and remain so in its successor states.</p>

<p><strong>Net:</strong> This is a round, weighted cast net designed to entangle and entrap opponents. The chief historical example is the net of the Roman retiarius. A character using a net gets a +2 bonus on attack throws to wrestle or knockdown opponents (see <strong>Special Maneuvers</strong>, p. XX). In the Auran Empire, nets are often used in gladiatorial arenas. They are also popular in Northern Argollë and the Ivory Kingdoms.</p>

<p><strong>Polearm:</strong> Polearms are two-handed slashing and piercing weapons with a metal head and a long wooden shaft. Polearms range in length from 6' to 21'. Polearms can be used to attack from the second rank in melee, and inflict double damage when used in or against a charge. However, any attack throw of natural 1 made with a polearm breaks its shaft. Historical examples include the Thracian rhomphaia, Dacian falx, and Macedonian sarissa; the medieval bill, fauchard, glaive, guisarme, halberd, partisan, pike, ranseur, spetum, and voulge; the Chinese gun dao; and the Japanese bisento, nagamaki, and naginata.</p>

<p><strong>Sap:</strong> A sap consists of a heavyweight material wrapped inside a leather sack. Used as a weapon, it provides a +2 bonus to attack throws made to incapacitate opponents (as described in <strong>Special Maneuvers</strong>, p. xx). Saps are only common among criminal sorts.</p>

<p><strong>Sling:</strong> A sling is a projectile weapon, made of braided flax, hemp or wool cord, used to hurl small stones or lead bullets. Sling ammunition costs nothing and weighs 1/6 st. per 30 shots. Slings were used by all armies of the ancient world. Historical examples include the Hebrew shepherd's sling and Greek peltast's sling. Slings are popular among all races and realms in Aurëpos.</p>

<p><strong>Spear:</strong> Wooden shafts, 6' to 8' in length, with metal heads designed for thrusting, spears are the main weapon of the common soldier. Spears can be used one- or two-handed. Characters armed with spears can attack from behind an ally and inflict double damage when used in or against a charge. However, any attack throw of natural 1 made with a spear breaks its shaft. Historical examples include the Hoplite doru, the medieval winged spear, and the Japanese yari. Spears are, by far, the most common weapon in the Auran Empire, used by every race and realm.</p>

<p><strong>Staff:</strong> A staff is a common weapon made from a stick of hardwood 4' to 6' long, and used two-handed. (A one-handed staff is a club.) Historical examples include the English quarterstaff, Japanese bo stick, and Chinese gun. Staffs are widely popular in Aurëpos.</p>

<p><strong>Staff-Sling:</strong> A staff-sling is nothing more than a sling attached to a staff. Like staffs, and unlike slings, staff-slings require two hands to use. A staff-sling can be used to hurl burning oil at longer range than it can be thrown, but the chance of a botch is increased to 1-3 on 1d20. A staff-sling can be used in melee as a staff, but if the wielder rolls an unmodified 1 on his attack throw, the sling breaks off from the staff. The chief historical example is the Roman fustibalus. Staff-slings are used throughout Aurëpos.</p>

<p><strong>Sword:</strong> The classic weapon of knights and kings, the sword includes straight and curved slashing and thrusting blades of 30" to 40" in length useable with one or two hands. Historical examples include the Roman spatha, Viking sword, medieval knightly sword and falchion, Japanese katana, and Chinese jian and dao. Swords are popular throughout the military and noble classes of the continent, as well as among Jutlandic huscarls and Rornish knights.</p>

<p><strong>Sword, Short:</strong> The short sword includes straight and curved slashing and thrusting blades, generally less than 30" in length, meant to be used with one hand. Historical examples include the Egyptian khopesh, Greek xiphos, Roman gladius, Japanese wakizashi, Arab scimitar, Persian shamshir, Turkish yatagan, and Indian talwar. After the spear, short swords are the most common infantry weapon in Aurëpos. Curved short swords are a common cavalry weapon in the Sunset Kingdoms.</p>

<p><strong>Sword, Two-Handed:</strong> The two-handed sword includes straight and curved slashing and thrusting blades, 40" or more in length, requiring two hands to use effectively. Historical examples include the medieval longsword, the Renaissance zweihänder, Scottish claymore, Japanese no-dachi, and Chinese zhanmadao. Two-handed swords were favored by the ruinguards of ancient Zahar, but are not widely seen nowadays, except among the Jutlandic barbarians.</p>

<p><strong>Warhammer:</strong> A warhammer is a bludgeoning weapon with a 2' to 3' wooden or metal shaft and a broad metal head shaped like a hammer. It is designed for crushing armor. The chief historical example is the late medieval warhammer, while the chief fantasy examples is Thor's warhammer. In the Auran Empire, Warhammers are popular with crusaders of Türas and with dwarven vaultguards.</p>

<p><strong>Whip:</strong> This is a long, single-tailed whip of the sort used to herd cattle. Used as a weapon, it grants +2 bonus to attack throws made to disarm or knock down opponents (see Special Maneuvers on p. XX). Whips are common throughout Aurëpos.</p>`
    },

    {
      id: 'armor-descriptions',
      title: 'Armor Descriptions',
      level: 2,
      content: `<p><strong>Barding:</strong> Armor fitted to draft animals and war mounts. Barding AC and encumbrance is based on the creature wearing it. Barding adds 50 stone to the creature's encumbrance and cannot be worn by creatures smaller than wolf-sized. War-trained animals can be equipped with spiked barding for an additional 25% of the base cost. Spiked barding enables the creature to deal +2 points of damage with charge attacks.</p>

<p><strong>Leather Armor:</strong> Soft, flexible leather armor, hardened by boiling in oil. Leather armor consists of a leather tunic covering the torso, leather vambraces protecting the forearms, and thick leather trousers. It offers modest protection while minimally impeding movement. Some versions of leather armor are studded with metal rivets in order to provide slightly better protection.</p>

<p><strong>Chain Mail:</strong> Flexible armor made of interlinking metal rings. Chain mail includes a long coat (called a hauberk) extending to the mid thigh, split front and back for riding, with sleeves extending to the elbows. A cloth gambeson is worn underneath to prevent chafing. Chain mail covers most of the body and provides reasonably good protection without great encumbrance.</p>

<p><strong>Lamellar Armor:</strong> Flexible armor made from small metal or leather plates (called lamellae) laced together in parallel rows. Lamellar armor typically includes a lamellar cuirass (breastplate and backplate), lamellar arm guards, and a lamellar skirt extending to the mid-thigh, all worn over quilted cloth or leather. Historically popular throughout Eurasia, lamellar armor is the favorite armor in the Sunset Kingdoms and Krysea.</p>

<p><strong>Scale Mail:</strong> A tunic of leather or cloth covered with overlapping pieces of metal, much like the scales of a fish. Scale mail provides good protection and mobility. Scale mail was historically popular in the ancient world. In Aurëpos, scale mail is common in Kemesh, Somirea, the Sunset Kingdoms, and the Ivory Kingdoms.</p>

<p><strong>Splint Mail:</strong> Armor consisting of metal strips fastened to a leather backing. Splint mail includes a breastplate and backplate and arm guards fastened to the strips of metal which extend down the limbs. A cloth gambeson is worn underneath to prevent chafing. Splint mail was popular in medieval Russia and Eastern Europe. In Aurëpos, splint mail is most common in Jutland and among dwarves.</p>

<p><strong>Banded Mail:</strong> This armor is made of overlapping strips of metal sewn to a backing of leather and chainmail. The metal strips cover vital areas, while the chain mail and leather protect the joints and moveable parts of the body where rigid metal would hinder movement. A padded layer is worn beneath the banded mail. Banded mail is heavier than splint mail, but provides better protection.</p>

<p><strong>Plate Mail:</strong> The finest suit of armor an adventurer can acquire, plate mail is made of solid metal plates from head to toe, fitted to the wearer's form. Plate mail includes a full helm, breastplate and backplate, full arm guards, gauntlets, a metal skirt, cuisses (thigh guards), greaves (shin guards), and sollerets (metal shoes). Plate mail is expertly worked so that the suits are comfortable to the wearer despite their weight.</p>

<p><strong>Shield:</strong> Shields are protective devices worn on one arm. A character equipped with a shield improves his armor class by 1 (e.g. an unarmored character (AC 0) with a shield has AC 1). Shields can be crafted from wood, leather, or metal, or from combinations of all three.</p>`
    }
  ]
};

export const metadata: Metadata = {
  title: 'Equipment Descriptions - Chapter 4: Equipment - ACKS II Wiki',
  description: 'Detailed descriptions of all weapons, armor, and equipment in ACKS II',
  keywords: ['ACKS II', 'equipment descriptions', 'weapons', 'armor', 'items'],
};

export default function EquipmentDescriptionsPage() {
  const navigation = {
    previous: {
      href: '/rules/chapter-4-equipment',
      title: 'Chapter 4: Equipment'
    },
    next: {
      href: '/rules/chapter-4-equipment/masterwork',
      title: 'Masterwork Equipment'
    }
  };

  return (
    <ChapterTemplate 
      chapterNumber={DESCRIPTIONS_CONTENT.chapterNumber}
      title={DESCRIPTIONS_CONTENT.title}
      description={DESCRIPTIONS_CONTENT.description}
      introduction={DESCRIPTIONS_CONTENT.introduction}
      sections={DESCRIPTIONS_CONTENT.sections.map(section => ({
        ...section,
        content: <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: section.content }} />
      }))}
      previousChapter={navigation.previous}
      nextChapter={navigation.next}
    />
  );
} 