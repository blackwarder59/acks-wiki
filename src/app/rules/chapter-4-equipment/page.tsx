/**
 * Chapter 4: Equipment
 * 
 * Comprehensive equipment system covering the economic backbone of ACKS:
 * - Basic equipment mechanics
 * - Currency and monetary systems
 * - Equipment purchasing and market availability
 * - Complete equipment catalogs
 * - Encumbrance systems
 * - Hiring mechanics
 * - Living expenses
 * - Construction projects
 */

import { Metadata } from 'next';
import ChapterTemplate from '@/components/rulebook/chapter-template';

// Complete Chapter 4 content structure
const CHAPTER_CONTENT = {
  id: 'chapter-4-equipment',
  chapterNumber: 4,
  title: 'Equipment',
  description: 'Weapons, armor, goods, hirelings, and construction in the world of ACKS II',
  introduction: '<p>Adventurers need weapons, armor, equipment, mounts, vehicles, or hirelings. If your campaign is using templates, each adventurer will already have his starting assets. If not, the player should roll 3d6 x 10 to determine his adventurer\'s starting gold pieces.</p><p>Each character should purchase equipment suitable for their class. For example, fighters should purchase arms and armor to fight monsters and survive blows, while thieves need rope, crowbars, thieves\' tools, and other equipment to scale obstacles, find traps, and open locks. Crusaders will require holy symbols to drive back undead and mages will need spellbooks to record their dweomers.</p>',

  sections: [
    {
      id: 'the-basics-of-equipment',
      title: 'The Basics of Equipment',
      level: 2,
      content: `<p>Equipment in ACKS II encompasses far more than just weapons and armor. It includes tools, supplies, vehicles, vessels, livestock, property, and even intangible assets like reputation and relationships. Understanding how equipment works is essential to playing the game effectively.</p>

<h3>Equipment Properties</h3>
<p>All equipment has several key properties that determine how it functions in the game:</p>

<h4>Weight and Encumbrance</h4>
<p>Every item has a weight measured in stones (1 stone = 14 pounds). Characters can carry a limited amount of weight before becoming encumbered, which affects movement and combat ability.</p>

<h4>Durability and Condition</h4>
<p>Equipment can be damaged, worn, or destroyed through use, combat, or environmental hazards. Items have different levels of durability based on their construction and materials.</p>

<h4>Quality Levels</h4>
<p>Equipment comes in various quality levels:</p>
<ul>
<li><strong>Crude:</strong> Poorly made items that break easily</li>
<li><strong>Common:</strong> Standard quality equipment</li>
<li><strong>Superior:</strong> Well-crafted items that last longer</li>
<li><strong>Masterwork:</strong> Exceptional quality with game benefits</li>
</ul>

<h4>Availability and Rarity</h4>
<p>Not all equipment is available in every location. Market availability depends on:</p>
<ul>
<li>Settlement size and prosperity</li>
<li>Local resources and trade routes</li>
<li>Cultural and technological factors</li>
<li>Political and economic conditions</li>
</ul>

<h3>Equipment Categories</h3>
<p>Equipment is organized into several major categories:</p>

<h4>Personal Equipment</h4>
<ul>
<li>Weapons (melee, missile, siege)</li>
<li>Armor and shields</li>
<li>Clothing and accessories</li>
<li>Tools and implements</li>
<li>Supplies and consumables</li>
</ul>

<h4>Transportation</h4>
<ul>
<li>Mounts and riding animals</li>
<li>Vehicles (carts, wagons, sleds)</li>
<li>Vessels (boats, ships)</li>
<li>Infrastructure (roads, bridges)</li>
</ul>

<h4>Property and Holdings</h4>
<ul>
<li>Real estate (houses, shops, land)</li>
<li>Productive assets (mills, mines, farms)</li>
<li>Fortifications (towers, walls, castles)</li>
<li>Religious and civic buildings</li>
</ul>

<h3>Using Equipment</h3>
<p>Equipment use in ACKS II follows these general principles:</p>

<h4>Appropriate Tools</h4>
<p>Having the right tool for the job provides bonuses to ability checks and proficiency throws. Conversely, lacking proper equipment may impose penalties or make certain tasks impossible.</p>

<h4>Maintenance and Care</h4>
<p>Equipment requires regular maintenance to remain functional. Neglected items may become damaged or lose effectiveness over time.</p>

<h4>Modification and Customization</h4>
<p>With appropriate skills and resources, equipment can be modified, repaired, or enhanced. Master craftsmen can create items with special properties or exceptional quality.</p>`
    },

    {
      id: 'purchasing-equipment',
      title: 'Purchasing Equipment',
      level: 2,
      content: `<p>The arms, armor, and mundane gear available for purchase are listed from the <strong>Equipment List</strong> tables. The equipment and other items listed on the Equipment List tables are described in detail in the <strong>Equipment Descriptions</strong> section.</p>

<p>Should the players wish to purchase items not provided in the equipment lists, the Judge can use the items available as guidelines for determining new items' characteristics and prices.</p>

<p>All purchases should be recorded on the character sheet, noting how much money remains afterward. Most adventurers do not begin play with enough wealth to get everything they want — indeed, the quest for wealth is one of the primary motives for adventuring at all!</p>

<h3>Equipment Availability</h3>
<p>Adventurers might sometimes wish to purchase equipment in greater volume than the town they are in can handle. This is not normally a concern when characters are just beginning their career. But if experienced adventurers decide they want to use a dragon's hoard to equip all their followers with fur cloaks (15gp each) and purchase a dozen heavy warhorses (750gp each) with plate barding (600gp each), they may find such goods are simply unavailable in the quantities they desire!</p>

<p>The amount of equipment available for purchase is determined by the price of the equipment relative to the size of the <strong>market</strong> the adventurers are in. A market can be anything from a village's humble fair to a city-state's outdoor bazaar to the ports of a major metropolis. Markets are rated by <strong>market class</strong> from I to VI, which rate their size and importance. The vast mercantile hubs of empires, with urban populations of 100,000 or more, constitute Class I. Major ports, national capitals, and other large cities of 25,000 or more inhabitants constitute Class II. Provincial capitals and medium-sized cities of 8,750 to 25,000 inhabitants make up Class III. Small cities and large towns of 3,000 to 8,750 inhabitants make up Class IV. Small towns and large villages of 1,250 to 3,000 inhabitants are Class V. A village of 1,250 inhabitants or less is Class VI. Market classes are also important for hiring henchmen, as discussed in the <strong>Hirelings</strong>, <strong>Henchmen</strong>, <strong>Mercenaries</strong>, <strong>and Specialists</strong> section below, and for trade and commerce, as discussed in the <strong>Mercantile Ventures</strong> section in the <strong>Campaigns</strong> chapter.</p>

<p>The <strong>Equipment Availability by Market Class</strong> table shows how many units of any piece of equipment are available in each type of market each month. Some values will indicate a percentage chance; this is chance of one unit being present at all in any given month. The values given are the number of each specific item, not the total number of items at that price level. For instance, a Class IV market will have 10 swords, 10 battle axes, and 10 of each other item priced at 2-10gp. Multiple small items sold as a bundle (such as 6 spikes, 6 torches, 20 arrows, etc) count as one item for purposes of the Equipment Availability by Market Class table. The values are per party, representing those merchants who they know and transact with. Very large parties (12 or more adventurers) who devote a dedicated activity to shopping can purchase twice as much. (If the campaign involves multiple parties of adventurers, the maximum monthly number of items available across all parties is ten times the value shown.)</p>

<table>
<thead>
<tr>
<th><strong>Equipment Availability by Market Class</strong></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
</tr>
<tr>
<th><strong>Price</strong></th>
<th><strong>Class I</strong></th>
<th><strong>Class II</strong></th>
<th><strong>Class III</strong></th>
<th><strong>Class IV</strong></th>
<th><strong>Class V</strong></th>
<th><strong>Class VI</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>1gp or less</td>
<td>2,750</td>
<td>700</td>
<td>425</td>
<td>100</td>
<td>35</td>
<td>15</td>
</tr>
<tr>
<td>2gp – 10gp</td>
<td>300</td>
<td>70</td>
<td>35</td>
<td>10</td>
<td>3</td>
<td>1</td>
</tr>
<tr>
<td>11 – 100gp</td>
<td>20</td>
<td>5</td>
<td>2</td>
<td>1</td>
<td>25%</td>
<td>10%</td>
</tr>
<tr>
<td>101 – 1,000gp</td>
<td>7</td>
<td>2</td>
<td>1</td>
<td>25%</td>
<td>10%</td>
<td>5%</td>
</tr>
<tr>
<td>1,001 – 10,000gp</td>
<td>2</td>
<td>1</td>
<td>25%</td>
<td>10%</td>
<td>5%</td>
<td>1%</td>
</tr>
<tr>
<td>10,001gp or more</td>
<td>25%</td>
<td>10%</td>
<td>3%</td>
<td>1%</td>
<td>NA</td>
<td>NA</td>
</tr>
</tbody>
</table>

<p><strong>EXAMPLE:</strong> Marcus is in Cyfaraun, a Class III market. He wants to buy a war galley (60,000gp), medium warhorse (250gp), 2 suits of plate armor (60gp each), 50 swords (10gp each), and 200 flasks of common oil (3sp each). A Class III market has 425 units of any equipment priced 1gp or less, so he can buy the 200 flasks of oil. A Class III market has only 35 units of equipment priced 10gp or less, so only 35 swords are available. Since he needs weapons, he settles on 35 swords and 15 battle axes. A Class III market has 2 units of equipment priced at 11 – 100gp and 1 unit at 101 – 1,000gp, so he can buy the 2 suits of plate armor and medium warhorse. There is only a 3% chance of a war galley being available, and the Judge rolls a 42; Marcus cannot find that type of ship in Cyfaraun this month.</p>

<p>Adventurers can sell equipment in good condition in the market subject to the same limits of market availability that apply to purchase. Sales of equipment beyond those limits requires mercantile activity (p. XX). Scavenged or otherwise poor-quality equipment will sell for a lower price (p. XX).</p>

<h3>Importing Equipment</h3>
<p>If equipment the adventurers desire to purchase is not available, they can pay a merchant to import it for them from a larger market, either a local hub (+1 market class) or a regional hub (+2 market class). The advantage of importing equipment is that more equipment is available. The number of items that can be imported is determined by the size of the market from which the items will be imported. The disadvantage of importing equipment is that it is not immediately available. Imports arrive from a local hub after 2d6 days and from a regional hub after 2d6 weeks. On a roll of 12, the items are lost or stolen in transit and never show up. Adventurers can also commission construction projects for items (p. XX).</p>`
    },

    {
      id: 'coins-and-money',
      title: 'Coins and Money',
      level: 2,
      content: `<table>
<thead>
<tr>
<th></th>
<th><strong>Exchange Value</strong></th>
<th></th>
<th></th>
<th></th>
<th></th>
</tr>
<tr>
<th><strong>Coins</strong></th>
<th><strong>Cp</strong></th>
<th><strong>Sp</strong></th>
<th><strong>Ep</strong></th>
<th><strong>Gp</strong></th>
<th><strong>Pp</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>Copper Piece (cp) =</td>
<td>1</td>
<td>1/10</td>
<td>1/50</td>
<td>1/100</td>
<td>1/500</td>
</tr>
<tr>
<td>Silver Piece (sp) =</td>
<td>10</td>
<td>1</td>
<td>1/5</td>
<td>1/10</td>
<td>1/50</td>
</tr>
<tr>
<td>Electrum Piece (ep) =</td>
<td>50</td>
<td>5</td>
<td>1</td>
<td>1/2</td>
<td>1/10</td>
</tr>
<tr>
<td>Gold Piece (gp) =</td>
<td>100</td>
<td>10</td>
<td>2</td>
<td>1</td>
<td>1/5</td>
</tr>
<tr>
<td>Platinum Piece (pp) =</td>
<td>500</td>
<td>50</td>
<td>10</td>
<td>5</td>
<td>1</td>
</tr>
</tbody>
</table>

<p>Equipment is purchased using money. Paper currency is non-existent in the world of the Auran Empire, so money takes the form of coins of precious metal. The copper piece is the most widely-used coin. A copper piece (cp) purchases a loaf of bread or three pints of cheap ale. 10cp make a silver piece (sp). 10sp or 100cp make a gold piece (gp). These three coins are the most widely used in the civilized world. Less commonly seen are electrum pieces (ep), each worth 5sp, and platinum pieces (pp), each worth 5gp.</p>

<h3>What's a Gold Piece Worth?</h3>
<p>To put the value of currency in perspective, the Standard of Living table, below, shows how far a gold piece will go towards cost of living at different standards of comfort. A single gold piece is enough for a peasant to subsist at a wretched quality of life. Early in their career, adventurers will typically live on a few dozen gold pieces per month, enough to eat and sleep at an inn. A dragon's treasure hoard of 50,000gp might keep a village of peasants alive for decade, but merely cover a prince's monthly budget. Wealth is assumed to be highly concentrated in <strong><em>ACKS</em></strong> campaign worlds.</p>

<table>
<thead>
<tr>
<th><strong>Standard of Living</strong></th>
<th><strong>Monthly Cost</strong></th>
<th><strong>Common Professions</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>Wretched</td>
<td>1gp – 3gp</td>
<td>Indentured servants, serfs, and unskilled laborers</td>
</tr>
<tr>
<td>Meager</td>
<td>3gp – 12gp</td>
<td>Skilled laborers and apprentice artisans</td>
</tr>
<tr>
<td>Adequate</td>
<td>12gp – 40gp</td>
<td>Journeyman artisans, 1st level adventurers</td>
</tr>
<tr>
<td>Comfortable</td>
<td>40gp – 100gp</td>
<td>Master artisans or yeomen farmers (85 acres), 2nd level adventurers</td>
</tr>
<tr>
<td>Prosperous</td>
<td>100gp – 450gp</td>
<td>Master professionals or landed patrician (200 acres), 3rd – 4th level adventurers</td>
</tr>
<tr>
<td>Affluent</td>
<td>450gp – 2,000gp</td>
<td>Barons or wealthy patricians, 5th – 7th level adventurers</td>
</tr>
<tr>
<td>Sumptuous</td>
<td>2,000 – 12,000gp</td>
<td>Viscounts or counts, 8th – 9th level adventurers</td>
</tr>
<tr>
<td>Luxurious</td>
<td>12,000 – 80,000gp</td>
<td>Dukes or princes, 10th – 12th level adventurers</td>
</tr>
<tr>
<td>Lavishly Opulent</td>
<td>80,000gp+</td>
<td>Kings or emperors, 13th – 14th level adventurers</td>
</tr>
</tbody>
</table>`
    },

    {
      id: 'purchasing-equipment',
      title: 'Purchasing Equipment',
      level: 2,
      content: `<p>Acquiring equipment in ACKS II involves more than simply paying the listed price. Market conditions, availability, quality, and negotiation all play important roles in what characters can buy and at what cost.</p>

<h3>Market Availability</h3>
<p>Equipment availability depends primarily on settlement size and local conditions:</p>

<h4>Settlement Categories</h4>
<table className="equipment-table">
<thead>
<tr><th>Settlement Type</th><th>Population</th><th>Available Equipment</th><th>Price Modifier</th></tr>
</thead>
<tbody>
<tr><td>Hamlet</td><td>20-80</td><td>Basic tools, simple weapons</td><td>+50%</td></tr>
<tr><td>Village</td><td>81-400</td><td>Common equipment, leather armor</td><td>+25%</td></tr>
<tr><td>Town</td><td>401-2,000</td><td>Most standard equipment</td><td>Normal</td></tr>
<tr><td>City</td><td>2,001-12,000</td><td>All standard, some exotic</td><td>Normal</td></tr>
<tr><td>Metropolis</td><td>12,000+</td><td>Everything, including masterwork</td><td>-10%</td></tr>
</tbody>
</table>

<h4>Availability Rolls</h4>
<p>For items not automatically available, roll 1d20 + settlement modifier:</p>
<ul>
<li><strong>Common Items:</strong> Available on 5+</li>
<li><strong>Uncommon Items:</strong> Available on 10+</li>
<li><strong>Rare Items:</strong> Available on 15+</li>
<li><strong>Very Rare Items:</strong> Available on 20+</li>
</ul>

<h3>Price Negotiation</h3>
<p>Characters can attempt to negotiate better prices through successful Charisma-based ability checks:</p>

<h4>Buying (Bargaining)</h4>
<ul>
<li><strong>Success by 5+:</strong> 10% discount</li>
<li><strong>Success by 10+:</strong> 20% discount</li>
<li><strong>Success by 15+:</strong> 30% discount</li>
<li><strong>Failure by 10+:</strong> Merchant refuses further deals</li>
</ul>

<h4>Selling</h4>
<ul>
<li><strong>Base Price:</strong> 50% of purchase price</li>
<li><strong>Success by 5+:</strong> 60% of purchase price</li>
<li><strong>Success by 10+:</strong> 70% of purchase price</li>
<li><strong>Success by 15+:</strong> 80% of purchase price</li>
</ul>

<h3>Bulk Purchases</h3>
<p>Large quantity purchases may qualify for volume discounts:</p>

<ul>
<li><strong>10-99 items:</strong> 5% discount</li>
<li><strong>100-999 items:</strong> 10% discount</li>
<li><strong>1,000+ items:</strong> 15% discount</li>
</ul>

<h3>Special Purchase Conditions</h3>

<h4>Rush Orders</h4>
<p>Expedited delivery typically costs 50-100% extra and may require availability rolls even for common items.</p>

<h4>Custom Work</h4>
<p>Specially commissioned items cost 25-200% more than standard versions, depending on complexity and customization level.</p>

<h4>Quality Grades</h4>
<ul>
<li><strong>Crude Quality:</strong> 50% price, -1 to relevant rolls</li>
<li><strong>Standard Quality:</strong> Normal price</li>
<li><strong>Superior Quality:</strong> 150% price, +1 to durability</li>
<li><strong>Masterwork Quality:</strong> 300-500% price, mechanical benefits</li>
</ul>

<h3>Payment Methods</h3>

<h4>Immediate Payment</h4>
<p>Cash transactions receive standard pricing and no additional complications.</p>

<h4>Credit Arrangements</h4>
<p>Characters with established reputation may arrange credit:</p>
<ul>
<li><strong>Interest Rate:</strong> 10-20% per month</li>
<li><strong>Collateral:</strong> Often required for large purchases</li>
<li><strong>Default Consequences:</strong> Legal action, reputation loss</li>
</ul>

<h4>Barter and Trade</h4>
<p>Non-monetary exchanges are common, especially in frontier areas:</p>
<ul>
<li>Services in exchange for goods</li>
<li>Equipment trades and swaps</li>
<li>Information as payment</li>
<li>Future favors and obligations</li>
</ul>

<h3>Merchant Relationships</h3>
<p>Building good relationships with merchants provides long-term benefits:</p>

<h4>Reputation Effects</h4>
<ul>
<li><strong>Trusted Customer:</strong> 5% discount, first pick of new inventory</li>
<li><strong>Valued Client:</strong> 10% discount, special orders accepted</li>
<li><strong>Business Partner:</strong> 15% discount, exclusive access to rare items</li>
</ul>

<h4>Maintaining Relationships</h4>
      <ul>
<li>Prompt payment on credit purchases</li>
<li>Regular business volume</li>
<li>Referrals and recommendations</li>
<li>Protection and assistance when needed</li>
</ul>`
    },

    {
      id: 'hirelings-henchmen-mercenaries-specialists', 
      title: 'Hirelings, Henchmen, Mercenaries, and Specialists',
      level: 2,
      content: `<p>In addition to buying equipment, adventurers may also spend their money to hire various NPCs, known as <strong>hirelings</strong>, to assist them. There are three types of hirelings. <strong>Henchmen</strong> are NPC sidekicks, companions, and associates. Henchmen are typically very loyal and are willing to take reasonable risks; in particular, they are the only sort of hireling who will generally accompany an adventurer into a dungeon, lair, or ruin. <strong>Mercenaries</strong> are hired soldiers, and will guard, patrol, and otherwise serve in wilderness settings, but only as part of a larger force, not an adventuring party. <strong>Specialists</strong> are hired individuals who have a particular trade or who have special knowledge; they will rarely go on adventures at all unless it is directly related to their specialty. <strong>Followers</strong> are a special type of hireling that only becomes available to characters of 9th level or higher who have established a stronghold (see p. XX). Followers will undertake the same tasks as henchmen.</p>

<h3>Recruiting Hirelings</h3>

<table>
<thead>
<tr><th><strong>Market Class</strong></th><th><strong>Cost Per Week Per Hireling Type</strong></th></tr>
</thead>
<tbody>
<tr><td>I</td><td>1d6+15gp</td></tr>
<tr><td>II</td><td>1d10+10gp</td></tr>
<tr><td>III</td><td>1d8+5gp</td></tr>
<tr><td>IV</td><td>1d6+3gp</td></tr>
<tr><td>V</td><td>1d6gp</td></tr>
<tr><td>VI</td><td>1d3gp</td></tr>
</tbody>
</table>

<table>
<thead>
<tr><th colspan="2"><strong>Reaction to Hiring Offer</strong></th></tr>
<tr><th><strong>Adjusted Die Roll</strong></th><th><strong>Result</strong></th></tr>
</thead>
<tbody>
<tr><td>2-</td><td>Refuse and slander</td></tr>
<tr><td>3 – 5</td><td>Refuse</td></tr>
<tr><td>6 – 8</td><td>Try Again</td></tr>
<tr><td>9 – 11</td><td>Accept</td></tr>
<tr><td>12+</td><td>Accept with élan</td></tr>
</tbody>
</table>

<h4>Hireling Availability by Market Class</h4>

<h5>Mercenary Availability by Market Class</h5>
<table>
<thead>
<tr>
<th>Mercenary</th>
<th><strong>Class I</strong></th>
<th><strong>Class II</strong></th>
<th><strong>Class III</strong></th>
<th><strong>Class IV</strong></th>
<th><strong>Class V</strong></th>
<th><strong>Class VI</strong></th>
<th><strong>Wage</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>Light Infantry</td>
<td>4d100</td>
<td>5d20</td>
<td>5d10</td>
<td>3d4</td>
<td>1d6</td>
<td>1d2</td>
<td>By race</td>
</tr>
<tr>
<td>Heavy Infantry</td>
<td>2d100</td>
<td>5d10</td>
<td>3d8</td>
<td>1d8</td>
<td>1d3</td>
<td>1 (85%)</td>
<td>By race</td>
</tr>
<tr>
<td>Slinger</td>
<td>8d20</td>
<td>4d10</td>
<td>2d10</td>
<td>1d6</td>
<td>1d2</td>
<td>1 (70%)</td>
<td>By race</td>
</tr>
<tr>
<td>Bowman</td>
<td>8d20</td>
<td>4d10</td>
<td>2d10</td>
<td>1d6</td>
<td>1d2</td>
<td>1 (70%)</td>
<td>By race</td>
</tr>
<tr>
<td>Crossbowman</td>
<td>8d20</td>
<td>4d10</td>
<td>2d10</td>
<td>1d6</td>
<td>1d2</td>
<td>1 (70%)</td>
<td>By race</td>
</tr>
<tr>
<td>Composite Bowman/Longbowman*</td>
<td>4d20</td>
<td>2d10</td>
<td>1d10</td>
<td>1d3</td>
<td>1</td>
<td>1 (33%)</td>
<td>By race</td>
</tr>
<tr>
<td>Light Cavalry</td>
<td>4d20</td>
<td>2d10</td>
<td>1d10</td>
<td>1d3</td>
<td>1</td>
<td>1 (33%)</td>
<td>By race</td>
</tr>
<tr>
<td>Mounted Crossbowman</td>
<td>3d20</td>
<td>4d4</td>
<td>2d4</td>
<td>1d2</td>
<td>1 (75%)</td>
<td>1 (25%)</td>
<td>By race</td>
</tr>
<tr>
<td>Horse Archers</td>
<td>3d20</td>
<td>4d4</td>
<td>2d4</td>
<td>1d3</td>
<td>1 (70%)</td>
<td>1 (23%)</td>
<td>By race</td>
</tr>
<tr>
<td>Medium Cavalry</td>
<td>3d20</td>
<td>4d4</td>
<td>2d4</td>
<td>1d2</td>
<td>1 (70%)</td>
<td>1 (23%)</td>
<td>By race</td>
</tr>
<tr>
<td>Heavy Cavalry</td>
<td>4d10</td>
<td>1d10</td>
<td>1d6</td>
<td>1d2 (50%)</td>
<td>1 (50%)</td>
<td>1 (15%)</td>
<td>By race</td>
</tr>
<tr>
<td>Cataphract Cavalry</td>
<td>3d10</td>
<td>1d8</td>
<td>1d4</td>
<td>1d2 (33%)</td>
<td>1 (40%)</td>
<td>1 (10%)</td>
<td>By race</td>
</tr>
</tbody>
</table>

<h5>Henchmen Availability by Market Class</h5>
<table>
<thead>
<tr>
<th>Henchman</th>
<th><strong>Class I</strong></th>
<th><strong>Class II</strong></th>
<th><strong>Class III</strong></th>
<th><strong>Class IV</strong></th>
<th><strong>Class V</strong></th>
<th><strong>Class VI</strong></th>
<th><strong>Wage</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>0th level</td>
<td>4d100</td>
<td>5d20</td>
<td>4d8</td>
<td>3d4</td>
<td>1d6</td>
<td>1d2</td>
<td>12gp/month</td>
</tr>
<tr>
<td>1st level</td>
<td>5d10</td>
<td>2d6</td>
<td>1d4</td>
<td>1d2</td>
<td>1 (65%)</td>
<td>1 (20%)</td>
<td>25gp/month</td>
</tr>
<tr>
<td>2nd level</td>
<td>3d10</td>
<td>2d4</td>
<td>1d3</td>
<td>1</td>
<td>1 (40%)</td>
<td>1 (15%)</td>
<td>50gp/month</td>
</tr>
<tr>
<td>3rd level</td>
<td>1d10</td>
<td>1d3</td>
<td>1 (85%)</td>
<td>1 (33%)</td>
<td>1 (15%)</td>
<td>1 (5%)</td>
<td>100gp/month</td>
</tr>
<tr>
<td>4th level</td>
<td>1d6</td>
<td>1d2</td>
<td>1 (45%)</td>
<td>1 (15%)</td>
<td>1 (5%)</td>
<td>-</td>
<td>200gp/month</td>
</tr>
</tbody>
</table>

<h5>Specialist Availability by Market Class</h5>
<table>
<thead>
<tr>
<th>Specialist</th>
<th><strong>Class I</strong></th>
<th><strong>Class II</strong></th>
<th><strong>Class III</strong></th>
<th><strong>Class IV</strong></th>
<th><strong>Class V</strong></th>
<th><strong>Class VI</strong></th>
<th><strong>Wage</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>Alchemist</td>
<td>1d10</td>
<td>1d3</td>
<td>1</td>
<td>1 (33%)</td>
<td>1 (15%)</td>
<td>1 (5%)</td>
<td>250gp/month</td>
</tr>
<tr>
<td>Animal Trainer — Common</td>
<td>5d10</td>
<td>2d6</td>
<td>1d6</td>
<td>1d2</td>
<td>1 (65%)</td>
<td>1 (20%)</td>
<td>25gp/month</td>
</tr>
<tr>
<td>Animal Trainer — Wild</td>
<td>3d10</td>
<td>2d4</td>
<td>1d4</td>
<td>1</td>
<td>1 (40%)</td>
<td>1 (15%)</td>
<td>75gp/month</td>
</tr>
<tr>
<td>Animal Trainer — Giant/Prehistoric</td>
<td>2d10</td>
<td>1d6</td>
<td>1d3</td>
<td>1 (65%)</td>
<td>1 (25%)</td>
<td>1 (10%)</td>
<td>150gp/month</td>
</tr>
<tr>
<td>Animal Trainer – Fantastic</td>
<td>1d10</td>
<td>1d3</td>
<td>1</td>
<td>1 (33%)</td>
<td>1 (15%)</td>
<td>1 (5%)</td>
<td>250gp/month</td>
</tr>
<tr>
<td>Armorer</td>
<td>3d10</td>
<td>2d4</td>
<td>1d4</td>
<td>1</td>
<td>1 (40%)</td>
<td>1 (15%)</td>
<td>75gp/month</td>
</tr>
<tr>
<td>Artisan (common)</td>
<td>6d10</td>
<td>4d4</td>
<td>2d4</td>
<td>2</td>
<td>1 (80%)</td>
<td>1 (30%)</td>
<td>75gp/month</td>
</tr>
<tr>
<td>Artisan (uncommon)</td>
<td>3d10</td>
<td>2d4</td>
<td>1d4</td>
<td>1</td>
<td>1 (40%)</td>
<td>1 (15%)</td>
<td>75gp/month</td>
</tr>
<tr>
<td>Artisan (rare)</td>
<td>2d8</td>
<td>1d4</td>
<td>1d2</td>
<td>1 (50%)</td>
<td>1 (20%)</td>
<td>1 (5%)</td>
<td>75gp/month</td>
</tr>
<tr>
<td>Artillerist</td>
<td>5d10</td>
<td>2d6</td>
<td>1d6</td>
<td>1d2</td>
<td>1 (65%)</td>
<td>1 (20%)</td>
<td>25gp/month</td>
</tr>
<tr>
<td>Copyist</td>
<td>4d100</td>
<td>5d20</td>
<td>5d10</td>
<td>3d4</td>
<td>1d6</td>
<td>1d2</td>
<td>1gp/page</td>
</tr>
<tr>
<td>Engineer</td>
<td>1d10</td>
<td>1d3</td>
<td>1</td>
<td>1 (33%)</td>
<td>1 (15%)</td>
<td>1 (5%)</td>
<td>250gp/month</td>
</tr>
<tr>
<td>Healer</td>
<td>5d10</td>
<td>2d6</td>
<td>1d6</td>
<td>1d2</td>
<td>1 (65%)</td>
<td>1 (20%)</td>
<td>1gp/day/patient</td>
</tr>
<tr>
<td>Healer — Physicker</td>
<td>3d10</td>
<td>2d4</td>
<td>1d4</td>
<td>1</td>
<td>1 (40%)</td>
<td>1 (15%)</td>
<td>2gp/day/patient</td>
</tr>
<tr>
<td>Healer — Chirurgeon</td>
<td>1d10</td>
<td>1d3</td>
<td>1</td>
<td>1 (33%)</td>
<td>1 (15%)</td>
<td>1 (5%)</td>
<td>4gp/day/patient</td>
</tr>
<tr>
<td>Laborer – Skilled</td>
<td>1d4x100</td>
<td>1d3x100</td>
<td>1d4x50</td>
<td>8d6</td>
<td>4d6</td>
<td>2d4</td>
<td>6gp/month</td>
</tr>
<tr>
<td>Laborer – Unskilled</td>
<td>3d4x100</td>
<td>3d3x100</td>
<td>3d4x50</td>
<td>8d6x3</td>
<td>4d6x3</td>
<td>2d4x3</td>
<td>3gp/month</td>
</tr>
<tr>
<td>Lawyer</td>
<td>2d8</td>
<td>1d4</td>
<td>1d2</td>
<td>1 (50%)</td>
<td>1 (20%)</td>
<td>1 (5%)</td>
<td>100gp/month</td>
</tr>
<tr>
<td>Mariner — Captain</td>
<td>4d6</td>
<td>1d6</td>
<td>1d3</td>
<td>1 (80%)</td>
<td>1 (33%)</td>
<td>1 (10%)</td>
<td>100gp/month</td>
</tr>
<tr>
<td>Mariner — Master</td>
<td>1d6</td>
<td>1d2</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>250gp/month</td>
</tr>
<tr>
<td>Mariner — Navigator</td>
<td>5d10</td>
<td>1d12</td>
<td>1d6</td>
<td>1d2</td>
<td>1 (60%)</td>
<td>1 (45%)</td>
<td>25gp/month</td>
</tr>
<tr>
<td>Mariner — Sailor</td>
<td>4d100</td>
<td>5d20</td>
<td>5d10</td>
<td>3d4</td>
<td>1d6</td>
<td>1d2</td>
<td>6gp/month</td>
</tr>
<tr>
<td>Mariner — Rower</td>
<td>4d100</td>
<td>5d20</td>
<td>5d10</td>
<td>3d4</td>
<td>1d6</td>
<td>1d2</td>
<td>6gp/month</td>
</tr>
<tr>
<td>Mercenary Officer — Lieutenant</td>
<td>1d10</td>
<td>1d3</td>
<td>1</td>
<td>1 (33%)</td>
<td>1 (15%)</td>
<td>1 (5%)</td>
<td>200gp/month</td>
</tr>
<tr>
<td>Mercenary Officer — Captain</td>
<td>1d6</td>
<td>1d2</td>
<td>1 (65%)</td>
<td>1 (15%)</td>
<td>1 (5%)</td>
<td>-</td>
<td>800gp/month</td>
</tr>
<tr>
<td>Mercenary Officer — Colonel</td>
<td>1d2</td>
<td>1 (25%)</td>
<td>1 (15%)</td>
<td>1 (5%)</td>
<td>-</td>
<td>-</td>
<td>3,000gp/month</td>
</tr>
<tr>
<td>Mercenary Officer — General</td>
<td>1 (15%)</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>12,000gp/month</td>
</tr>
<tr>
<td>Sage</td>
<td>1d6</td>
<td>1d2</td>
<td>1 (65%)</td>
<td>1 (15%)</td>
<td>1 (5%)</td>
<td>-</td>
<td>500gp/month</td>
</tr>
<tr>
<td>Scout — Pathfinder or Land Surveyor</td>
<td>5d10</td>
<td>1d12</td>
<td>1d6</td>
<td>1d2</td>
<td>1 (60%)</td>
<td>1 (45%)</td>
<td>25gp/month</td>
</tr>
<tr>
<td>Siege Engineer</td>
<td>3d10</td>
<td>2d4</td>
<td>1d4</td>
<td>1</td>
<td>1 (40%)</td>
<td>1 (15%)</td>
<td>50gp/month</td>
</tr>
</tbody>
</table>

<h3>Morale and Loyalty</h3>

<p>Every hireling has a <strong>morale score</strong> and a <strong>loyalty score</strong>. Morale is a hireling's confidence in battle. Loyalty is a hireling's fidelity to his employer. A hireling can have a high morale but low loyalty — a treacherous berserker, for example, might have +4 morale (he would never flee in combat) but -4 loyalty (he'd betray his employer). A hireling can also have a high loyalty and low morale. For instance, a cowardly accountant might be impossible to bribe and committed to lifetime service to his employer, but he'd flee at the merest sight of a beastman.</p>

<table>
<thead>
<tr><th colspan="2"><strong>Hireling Loyalty</strong></th></tr>
<tr><th><strong>Adjusted Die Roll (2d6)</strong></th><th><strong>Result</strong></th></tr>
</thead>
<tbody>
<tr><td>2-</td><td>Hostility</td></tr>
<tr><td>3 – 5</td><td>Resignation</td></tr>
<tr><td>6 – 8</td><td>Grudging Loyalty</td></tr>
<tr><td>9 – 11</td><td>Loyalty</td></tr>
<tr><td>12+</td><td>Fanatic Loyalty</td></tr>
</tbody>
</table>`
    },

    {
      id: 'living-expenses',
      title: 'Expected Living Expenses',
      level: 2,
      content: `<p>In ACKS II, characters must maintain lifestyle expenses that reflect their social status and position. These ongoing costs represent not just survival needs, but the social and political obligations that come with wealth and power.</p>

<h3>Monthly Living Expenses by Social Class</h3>

<table className="equipment-table">
<thead>
<tr><th>Social Class</th><th>Monthly Cost</th><th>Lifestyle Description</th><th>Social Benefits</th></tr>
</thead>
<tbody>
<tr><td>Destitute</td><td>0 gp</td><td>Begging, scavenging, sleeping rough</td><td>None - social pariah</td></tr>
<tr><td>Wretched</td><td>3 gp</td><td>Peasant hovel, gruel and scraps</td><td>Minimal respect from equals</td></tr>
<tr><td>Poor</td><td>10 gp</td><td>Small cottage, simple meals</td><td>Basic social interactions</td></tr>
<tr><td>Common</td><td>30 gp</td><td>Decent home, regular meals</td><td>Full participation in community</td></tr>
<tr><td>Comfortable</td><td>100 gp</td><td>Nice house, good food and clothing</td><td>Respected citizen, minor influence</td></tr>
<tr><td>Wealthy</td><td>300 gp</td><td>Fine mansion, luxury goods</td><td>Significant social influence</td></tr>
<tr><td>Aristocratic</td><td>1,000 gp</td><td>Palace, gourmet cuisine, servants</td><td>Political power, noble connections</td></tr>
<tr><td>Royal</td><td>3,000+ gp</td><td>Multiple residences, royal luxuries</td><td>Sovereign authority</td></tr>
</tbody>
</table>

<h3>Social Obligations</h3>
<p>Higher social classes have expensive social obligations including gift-giving, hospitality, and maintaining retainers:</p>

<h4>Expected Generosity</h4>
<ul>
<li><strong>Comfortable:</strong> 10% of lifestyle cost for gifts/charity</li>
<li><strong>Wealthy:</strong> 15% of lifestyle cost for social obligations</li>
<li><strong>Aristocratic:</strong> 20% of lifestyle cost for political necessities</li>
<li><strong>Royal:</strong> 25% of lifestyle cost for state functions</li>
</ul>

<h4>Consequences of Inappropriate Spending</h4>
<ul>
<li><strong>Living Below Status:</strong> Social reputation penalties, reduced political influence</li>
<li><strong>Living Above Means:</strong> Debt accumulation, eventual financial ruin</li>
</ul>

<p>In ACKS, lifestyle expenses are not optional - they represent the economic reality of maintaining social position in a feudal society where reputation directly translates to political power.</p>`
    },

    {
      id: 'construction-projects',
      title: 'Construction Projects',
      level: 2,
      content: `<p>Construction in ACKS II represents the ultimate expression of character achievement and domain development. From simple buildings to massive fortifications, construction projects require careful planning, significant resources, and skilled management.</p>

<h3>Construction Costs</h3>

<h4>Residential Buildings</h4>
<table className="equipment-table">
<thead>
<tr><th>Building Type</th><th>Size</th><th>Cost</th><th>Construction Time</th><th>Requirements</th></tr>
</thead>
<tbody>
<tr><td>Cottage</td><td>20x20 ft</td><td>300 gp</td><td>1-2 months</td><td>Common materials</td></tr>
<tr><td>House</td><td>30x30 ft</td><td>1,000 gp</td><td>3-4 months</td><td>Skilled carpenters</td></tr>
<tr><td>Mansion</td><td>60x60 ft</td><td>5,000 gp</td><td>8-12 months</td><td>Master craftsmen</td></tr>
<tr><td>Palace</td><td>120x120 ft</td><td>25,000 gp</td><td>2-3 years</td><td>Architect, specialists</td></tr>
</tbody>
</table>

<h4>Commercial Buildings</h4>
<table className="equipment-table">
<thead>
<tr><th>Building Type</th><th>Size</th><th>Cost</th><th>Construction Time</th><th>Special Features</th></tr>
</thead>
<tbody>
<tr><td>Shop</td><td>20x30 ft</td><td>500 gp</td><td>2-3 months</td><td>Display areas, storage</td></tr>
<tr><td>Inn</td><td>40x60 ft</td><td>3,000 gp</td><td>6-8 months</td><td>Multiple rooms, common area</td></tr>
<tr><td>Warehouse</td><td>60x80 ft</td><td>2,000 gp</td><td>4-6 months</td><td>Large open spaces</td></tr>
<tr><td>Market Hall</td><td>80x100 ft</td><td>8,000 gp</td><td>10-14 months</td><td>Vendor stalls, public access</td></tr>
</tbody>
</table>

<h4>Fortifications</h4>
<table className="equipment-table">
<thead>
<tr><th>Fortification Type</th><th>Dimensions</th><th>Cost</th><th>Construction Time</th><th>Defense Value</th></tr>
</thead>
<tbody>
<tr><td>Wooden Palisade</td><td>100 ft section</td><td>500 gp</td><td>1 month</td><td>Basic protection</td></tr>
<tr><td>Stone Wall</td><td>100 ft section</td><td>2,500 gp</td><td>4 months</td><td>Strong defense</td></tr>
<tr><td>Tower (Small)</td><td>20x20 ft base</td><td>5,000 gp</td><td>6 months</td><td>Excellent visibility</td></tr>
<tr><td>Tower (Large)</td><td>40x40 ft base</td><td>15,000 gp</td><td>12 months</td><td>Command center</td></tr>
<tr><td>Gatehouse</td><td>30x20 ft</td><td>8,000 gp</td><td>8 months</td><td>Controlled access</td></tr>
<tr><td>Keep</td><td>60x60 ft</td><td>50,000 gp</td><td>2 years</td><td>Ultimate stronghold</td></tr>
</tbody>
</table>

<h3>Construction Management</h3>

<h4>Required Personnel</h4>
<ul>
<li><strong>Laborers:</strong> 1 gp/month, general construction work</li>
<li><strong>Carpenters:</strong> 3 gp/month, woodworking and framing</li>
<li><strong>Masons:</strong> 4 gp/month, stonework and foundations</li>
<li><strong>Architect:</strong> 100 gp/month, complex project design</li>
<li><strong>Engineer:</strong> 75 gp/month, structural and siege engineering</li>
</ul>

<h4>Construction Challenges</h4>
<ul>
<li><strong>Environmental Factors:</strong> Terrain, weather, and location significantly impact costs and timelines</li>
<li><strong>Political Requirements:</strong> Building permits (10% of project cost), guild approval, and noble consent needed</li>
<li><strong>Resource Management:</strong> Securing adequate materials and skilled labor</li>
<li><strong>Economic Impact:</strong> Large projects affect local economy and may require infrastructure development</li>
</ul>

<p>Construction projects represent major investments that can define a character's legacy and establish the foundation for domain rulership in ACKS II. From simple strongholds to massive castle complexes, these projects demonstrate the transition from adventurer to ruler.</p>`
    },
    {
      id: 'equipment-lists',
      title: 'Equipment Lists',  
      level: 2,
      content: `<h3>Weapons</h3>

<h4>Bows/Crossbows</h4>
<table>
<thead>
<tr>
<th>Bows/Crossbows</th>
<th>Type</th>
<th>Damage</th>
<th>Enc. (stone)</th>
<th>Short</th>
<th>Med.</th>
<th>Long</th>
<th>Cost</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Arbalest</td>
<td>Missile</td>
<td>1d8 pierce</td>
<td>1</td>
<td>180'</td>
<td>360'</td>
<td>480'</td>
<td>50gp</td>
<td>Cleave 2, Handy, Slow</td>
</tr>
<tr>
<td>Crossbow</td>
<td>Missile</td>
<td>1d6 pierce</td>
<td>1/6</td>
<td>140'</td>
<td>280'</td>
<td>420'</td>
<td>30gp</td>
<td>Cleave 2, Handy, Slow</td>
</tr>
<tr>
<td>Case, 20 Bolts</td>
<td>Ammunition</td>
<td>-</td>
<td>1/6</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>2gp</td>
<td>-</td>
</tr>
<tr>
<td>Composite Bow</td>
<td>Missile</td>
<td>1d6 pierce</td>
<td>1</td>
<td>120'</td>
<td>240'</td>
<td>360'</td>
<td>40gp</td>
<td>Cleave 3 + STR mod</td>
</tr>
<tr>
<td>Long Bow</td>
<td>Missile</td>
<td>1d6 pierce</td>
<td>1</td>
<td>120'</td>
<td>240'</td>
<td>360'</td>
<td>7gp</td>
<td>Cleave 3 + STR mod</td>
</tr>
<tr>
<td>Short Bow</td>
<td>Missile</td>
<td>1d6 pierce</td>
<td>1/6</td>
<td>75'</td>
<td>150'</td>
<td>300'</td>
<td>3gp</td>
<td></td>
</tr>
<tr>
<td>Quiver, 20 Arrows</td>
<td>Ammunition</td>
<td>-</td>
<td>1/6</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>1gp</td>
<td>-</td>
</tr>
<tr>
<td>1 Silver Arrow</td>
<td>Ammunition</td>
<td>-</td>
<td>0</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>5gp</td>
<td>Silver</td>
</tr>
</tbody>
</table>

<h4>Axes</h4>
<table>
<thead>
<tr>
<th>Axes</th>
<th>Type</th>
<th>Damage</th>
<th>Enc. (stone)</th>
<th>Short</th>
<th>Med.</th>
<th>Long</th>
<th>Cost</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Battle Axe</td>
<td>Medium Melee</td>
<td>1d6/1d8 slash</td>
<td>1/6</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>7gp</td>
<td>-</td>
</tr>
<tr>
<td>Great Axe</td>
<td>Large Melee</td>
<td>1d10 slash</td>
<td>1</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>10gp</td>
<td>-</td>
</tr>
<tr>
<td>Hand Axe</td>
<td>Small Melee/Missile</td>
<td>1d6 slash</td>
<td>1/6</td>
<td>15'</td>
<td>30'</td>
<td>45'</td>
<td>4gp</td>
<td>Thrown</td>
</tr>
</tbody>
</table>

<h4>Bludgeons</h4>
<table>
<thead>
<tr>
<th>Bludgeons</th>
<th>Type</th>
<th>Damage</th>
<th>Enc. (stone)</th>
<th>Short</th>
<th>Med.</th>
<th>Long</th>
<th>Cost</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Club</td>
<td>Tiny Melee</td>
<td>1d4 bludgeon</td>
<td>1/6</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>1gp</td>
<td>-</td>
</tr>
<tr>
<td>Flail</td>
<td>Medium Melee</td>
<td>1d6/1d8 bludgeon</td>
<td>1/6</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>5gp</td>
<td>-</td>
</tr>
<tr>
<td>Mace</td>
<td>Medium Melee</td>
<td>1d6/1d8 bludgeon</td>
<td>1/6</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>5gp</td>
<td>-</td>
</tr>
<tr>
<td>Morning Star</td>
<td>Large Melee</td>
<td>1d10 bludgeon</td>
<td>1</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>10gp</td>
<td>-</td>
</tr>
<tr>
<td>Warhammer</td>
<td>Small Melee/Missile</td>
<td>1d6 bludgeon</td>
<td>1/6</td>
<td>15'</td>
<td>30'</td>
<td>45'</td>
<td>5gp</td>
<td>Thrown</td>
</tr>
</tbody>
</table>

<h4>Swords/Daggers</h4>
<table>
<thead>
<tr>
<th>Swords/Daggers</th>
<th>Type</th>
<th>Damage</th>
<th>Enc. (stone)</th>
<th>Short</th>
<th>Med.</th>
<th>Long</th>
<th>Cost</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Knife</td>
<td>Tiny Melee/Missile</td>
<td>1d3 pierce</td>
<td>1/6</td>
<td>15'</td>
<td>30'</td>
<td>45'</td>
<td>1gp</td>
<td>Thrown</td>
</tr>
<tr>
<td>Dagger</td>
<td>Tiny Melee/Missile</td>
<td>1d4 pierce</td>
<td>1/6</td>
<td>15'</td>
<td>30'</td>
<td>45'</td>
<td>3gp</td>
<td>Thrown</td>
</tr>
<tr>
<td>Silver Dagger</td>
<td>Tiny Melee/Missile</td>
<td>1d4 pierce</td>
<td>1/6</td>
<td>15'</td>
<td>30'</td>
<td>45'</td>
<td>30gp</td>
<td>Silver, Thrown</td>
</tr>
<tr>
<td>Short Sword</td>
<td>Small Melee</td>
<td>1d6 pierce slash</td>
<td>1/6</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>7gp</td>
<td>-</td>
</tr>
<tr>
<td>Sword</td>
<td>Medium Melee</td>
<td>1d6/1d8 pierce slash</td>
<td>1/6</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>10gp</td>
<td>-</td>
</tr>
        <tr>
<td>Two-Handed Sword</td>
<td>Large Melee</td>
<td>1d10 pierce slash</td>
<td>1</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>15gp</td>
<td>-</td>
</tr>
</tbody>
</table>

<h4>Spears/Polearms</h4>
<table>
<thead>
<tr>
<th>Spears/Polearms</th>
<th>Type</th>
<th>Damage</th>
<th>Enc. (stone)</th>
<th>Short</th>
<th>Med.</th>
<th>Long</th>
<th>Cost</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Dart (5)</td>
<td>Missile</td>
<td>1d4 pierce</td>
<td>1/6</td>
<td>15'</td>
<td>45'</td>
<td>75'</td>
<td>2gp</td>
<td>Thrown</td>
</tr>
<tr>
<td>Javelin</td>
<td>Small Melee/Missile</td>
<td>1d6 pierce</td>
<td>1/6</td>
<td>30'</td>
<td>60'</td>
<td>120'</td>
<td>1gp</td>
<td>Thrown</td>
</tr>
<tr>
<td>Lance</td>
<td>Large Melee</td>
<td>1d10 pierce</td>
<td>1</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>1gp</td>
<td>Impact, Long, Mounted</td>
</tr>
<tr>
<td>Polearm</td>
<td>Large Melee</td>
<td>1d10 pierce slash</td>
<td>1</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>7gp</td>
<td>Impact, Long</td>
</tr>
<tr>
<td>Spear</td>
<td>Med. Melee/Missile</td>
<td>1d6/1d8 pierce</td>
<td>1</td>
<td>30'</td>
<td>60'</td>
<td>120'</td>
<td>3gp</td>
<td>Impact, Long, Thrown</td>
</tr>
</tbody>
</table>

<h4>Other Weapons</h4>
<table>
<thead>
<tr>
<th>Other Weapons</th>
<th>Type</th>
<th>Damage</th>
<th>Enc. (stone)</th>
<th>Short</th>
<th>Med.</th>
<th>Long</th>
<th>Cost</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bola</td>
<td>Missile</td>
<td>1d2 bludgeon</td>
<td>1/6</td>
<td>15'</td>
<td>30'</td>
<td>45'</td>
<td>5gp</td>
<td>Entangling, Thrown</td>
</tr>
<tr>
<td>Military Oil</td>
<td>Missile</td>
<td>1d8 fire</td>
<td>1/6</td>
<td>15'</td>
<td>45'</td>
<td>75'</td>
<td>2gp</td>
<td>Thrown</td>
</tr>
<tr>
<td>Cestus</td>
<td>Small Melee</td>
<td>1d3 bludgeon</td>
<td>1/6</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>3gp</td>
<td>-</td>
</tr>
<tr>
<td>Net</td>
<td>Medium Melee/Missile</td>
<td>-</td>
<td>1</td>
<td>10'</td>
<td>15'</td>
<td>20'</td>
<td>1gp</td>
<td>Entangling, Thrown</td>
</tr>
<tr>
<td>Rock</td>
<td>Medium Melee/Missile</td>
<td>1d3 bludgeon</td>
<td>1/6</td>
<td>15'</td>
<td>30'</td>
<td>45'</td>
<td>-</td>
<td>Thrown</td>
</tr>
<tr>
<td>Sap</td>
<td>Tiny Melee</td>
<td>1d4 bludgeon</td>
<td>1/6</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>1gp</td>
<td>Incapacitating</td>
</tr>
<tr>
<td>Sling</td>
<td>Missile</td>
<td>1d4 bludgeon</td>
<td>1/6</td>
<td>60'</td>
<td>120'</td>
<td>240'</td>
<td>2gp</td>
<td>Handy</td>
</tr>
<tr>
<td>Staff Sling</td>
<td>Large Melee/Missile</td>
<td>1d6 bludgeon</td>
<td>1</td>
<td>75'</td>
<td>150'</td>
<td>300'</td>
<td>3gp</td>
<td>-</td>
</tr>
<tr>
<td>30 Sling Stones</td>
<td>Ammunition</td>
<td>-</td>
<td>1/6</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>Staff</td>
<td>Large Melee</td>
<td>1d6 bludgeon</td>
<td>1</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>1gp</td>
<td>-</td>
</tr>
<tr>
<td>Whip</td>
<td>Small Melee</td>
<td>1d2 slash</td>
<td>1/6</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>5gp</td>
<td>Flexible</td>
</tr>
</tbody>
</table>

<p><strong>Type</strong> determines which weapon proficiencies and fighting styles are required to use the weapon. Note that small melee weapons are those wielded with just one hand, medium melee weapons are those wielded with either one or two hands, and large melee weapons are those requiring two hands to wield. Missile weapons are wielded with two hands unless Handy or Thrown (q.v.). <strong>Damage</strong> is the number of hit points a target loses when successfully attacked by the weapon. Damage can be modified by attributes, class powers, magic, and proficiencies.</p>

<p><strong>Encumbrance</strong> is the weight of the weapon. 1 stone is approximately 10 – 15 lbs. Most small and medium weapons weigh 1/6 stone while most large weapons weigh 1 stone. <strong>Short/Medium/Long</strong> indicates the distance (in feet) that the weapon can be fired at short, medium, and long range. Attacks at medium range suffer a -2 penalty while attacks at long range suffer a -5 penalty. <strong>Cost</strong> is the price of a clean, well-made weapon in an urban settlement. Rusty, shoddy weapons can sometimes be purchased for less, but have worse characteristics (Judge's discretion). <strong>Special</strong> calls out any peculiar features of the weapon. The special features include:</p>

<ul>
<li><em>Cleave:</em> The weapon is limited in the number of cleaves it can perform in a round. The limit is listed after the Cleave tag.</li>
<li><em>Entangling:</em> The weapon grants a +2 bonus to attack throws when used to make a knockdown or wrestling special maneuver.</li>
<li><em>Flexible:</em> The weapon grants a +2 bonus to attack throws when used to make a disarm or knockdown special maneuver.</li>
<li><em>Handy:</em> The missile weapon only requires one hand, enabling it to be used with a shield. If a missile weapon is both slow and handy, it can only be used with a shield while the combatant is dismounted and stationary.</li>
<li><em>Impact:</em> The weapon deals an additional die of impact damage when used in or against a charge. Impact damage is of the same type as the weapon ordinarily delivers.</li>
<li><em>Incapacitating:</em> The weapon grants a +2 bonus to attack throws when used to make an incapacitation special maneuver.</li>
<li><em>Long:</em> The weapon can be used to attack targets from the second rank that are <strong>engaged</strong> with an ally in the front rank. However, any attack throw of a natural 1 made with the weapon breaks its shaft. It costs 1gp to repair the break. Until repaired, the weapon can be used as an off-balance (-1 to attacks throw) dagger and/or staff.</li>
<li><em>Mounted:</em> The weapon only requires one hand if the character is mounted.</li>
<li><em>Silver:</em> The weapon's blade has been coated in silver. Silver versions of other common weapons can be found or commissioned for 10x the listed price of the weapon. Apart from gaining the Silver feature, the weapon's characteristics do not change.</li>
<li><em>Slow:</em> The weapon cannot be fired on consecutive combat rounds unless the character remains stationary or is mounted.</li>
<li><em>Thrown:</em> The weapon can be thrown as a missile.</li>
</ul>

<h3>Armor and Barding</h3>

<table>
<thead>
<tr>
<th>Armor</th>
<th>Type</th>
<th>AC</th>
<th>Enc. (stone)</th>
<th>Cost</th>
<th>Special</th>
</tr>
</thead>
<tbody>
<tr>
<td>Hide and Fur Armor</td>
<td>Very Light Armor</td>
<td>1</td>
<td>1</td>
<td>10gp</td>
<td>-</td>
</tr>
<tr>
<td>Padded Armor</td>
<td>Very Light Armor</td>
<td>1</td>
<td>1</td>
<td>10gp</td>
<td>-</td>
</tr>
<tr>
<td>Leather Armor</td>
<td>Light Armor</td>
<td>2</td>
<td>2</td>
<td>20gp</td>
<td>-</td>
</tr>
<tr>
<td>Arena Armor, Light</td>
<td>Light Armor</td>
<td>2</td>
<td>2</td>
<td>30gp</td>
<td>Revealing</td>
</tr>
<tr>
<td>Ring Mail</td>
<td>Medium Armor</td>
<td>3</td>
<td>3</td>
<td>30gp</td>
<td>-</td>
</tr>
<tr>
<td>Scale Armor</td>
<td>Medium Armor</td>
<td>3</td>
<td>3</td>
<td>30gp</td>
<td>-</td>
</tr>
<tr>
<td>Chain Mail Armor</td>
<td>Medium Armor</td>
<td>4</td>
<td>4</td>
<td>40gp</td>
<td>-</td>
</tr>
<tr>
<td>Laminated Linen Armor</td>
<td>Medium Armor</td>
<td>4</td>
<td>4</td>
<td>40gp</td>
<td>-</td>
</tr>
<tr>
<td>Arena Armor, Heavy</td>
<td>Medium Armor</td>
<td>4</td>
<td>4</td>
<td>50gp</td>
<td>Revealing</td>
</tr>
<tr>
<td>Banded Plate Armor</td>
<td>Heavy Armor</td>
<td>5</td>
<td>5</td>
<td>50gp</td>
<td>-</td>
</tr>
<tr>
<td>Lamellar Armor</td>
<td>Heavy Armor</td>
<td>5</td>
<td>5</td>
<td>50gp</td>
<td>-</td>
</tr>
<tr>
<td>Plate Armor</td>
<td>Heavy Armor</td>
<td>6</td>
<td>6</td>
<td>60gp</td>
<td>Scarce</td>
</tr>
<tr>
<td>Shield</td>
<td>Shield</td>
<td>+1</td>
<td>1</td>
<td>10gp</td>
<td>-</td>
</tr>
<tr>
<td>Shield, Mirror</td>
<td>Shield</td>
<td>+1</td>
<td>1</td>
<td>250gp</td>
<td>-</td>
</tr>
<tr>
<td>Helmet, Heavy</td>
<td>Heavy Armor</td>
<td>-</td>
<td>1/6</td>
<td>20gp</td>
<td>Enclosing</td>
</tr>
<tr>
<td>Helmet, Light</td>
<td>Light Armor</td>
<td>-</td>
<td>1/6</td>
<td>0 gp (5gp)</td>
<td>-</td>
</tr>
</tbody>
</table>

<table>
<thead>
<tr>
<th>Barding</th>
<th>Type</th>
<th>AC</th>
<th>Enc. (stone)*</th>
<th>Cost*</th>
<th>Special</th>
</tr>
</thead>
<tbody>
<tr>
<td>Barding, Leather</td>
<td>Barding</td>
<td>1</td>
<td>Varies</td>
<td>Varies</td>
<td>-</td>
</tr>
<tr>
<td>Barding, Scale</td>
<td>Barding</td>
<td>2</td>
<td>Varies</td>
<td>Varies</td>
<td>-</td>
</tr>
<tr>
<td>Barding, Chain</td>
<td>Barding</td>
<td>3</td>
<td>Varies</td>
<td>Varies</td>
<td>-</td>
</tr>
<tr>
<td>Barding, Lamellar</td>
<td>Barding</td>
<td>4</td>
<td>Varies</td>
<td>Varies</td>
<td>-</td>
</tr>
<tr>
<td>Barding, Plate</td>
<td>Barding</td>
<td>5</td>
<td>Varies</td>
<td>Varies</td>
<td>Scarce</td>
</tr>
<tr>
<td>Barding, Spiked</td>
<td>Barding</td>
<td>-</td>
<td>-</td>
<td>+50%</td>
<td>Spiked</td>
</tr>
</tbody>
</table>
<p>*Encumbrance and cost can vary for creatures of different sizes.</p>

<p><strong>Type</strong> determines which armor proficiencies or fighting styles are required. <strong>AC</strong> indicates the armor class granted. <strong>Encumbrance</strong> is the weight of the armor. <strong>Cost</strong> is the price of a clean, well-made item in an urban settlement. Rusty, shoddy armor can sometimes be purchased for less, but have worse characteristics (Judge's discretion). <strong>Special</strong> calls out any peculiar features of the armor, including:</p>

<ul>
<li><em>Enclosing:</em> Wearing the item imposes a -1 penalty to surprise rolls and -4 penalty to proficiency throws to hear noise, but grants a +2 bonus on d20 rolls made on the Mortal Wounds table.</li>
<li><em>Revealing:</em> Characters with clean-limbed bodies (STR, DEX, CON, and CHA all 11+) gain a +1 bonus to Seduction reaction rolls when wearing the armor. Why they do not gain this bonus while naked or in revealing clothes of an ordinary sort is still being researched by the sages of the Tower of Knowledge.</li>
<li><em>Scarce:</em> Scarce armors are generally available at only one-half the usual volume noted in the Equipment Availability by Market Class table. However, scarce armor is available at full volume at markets in dwarven settlements.</li>
<li><em>Spiked:</em> Barding with spikes adds +1 damage per die to the animal's bite, claw, hoof, tail, tusk, or trample attacks.</li>
</ul>

<h3>Adventuring Equipment</h3>

<table>
<thead>
<tr>
<th>Item</th>
<th>Enc. (stone)</th>
<th>Cost</th>
</tr>
</thead>
<tbody>
<tr>
<td>Backpack</td>
<td>1</td>
<td>2gp</td>
</tr>
<tr>
<td>Belt Pouch</td>
<td>1/6</td>
<td>1gp</td>
</tr>
<tr>
<td>Blanket</td>
<td>1/6</td>
<td>5sp</td>
</tr>
<tr>
<td>Candles, 12</td>
<td>1/6</td>
<td>1gp</td>
</tr>
<tr>
<td>Case, Map/Scroll</td>
<td>1/6</td>
<td>2gp</td>
</tr>
<tr>
<td>Chain, 10 feet</td>
<td>2</td>
<td>30gp</td>
</tr>
<tr>
<td>Chest, Large</td>
<td>4</td>
<td>20gp</td>
</tr>
<tr>
<td>Chest, Small</td>
<td>2</td>
<td>10gp</td>
</tr>
<tr>
<td>Chalk, 12 pieces</td>
<td>1/6</td>
<td>3sp</td>
</tr>
<tr>
<td>Crowbar</td>
<td>1</td>
<td>2gp</td>
</tr>
<tr>
<td>Glass Vial or Crystal Bottle</td>
<td>1/6</td>
<td>1gp</td>
</tr>
<tr>
<td>Grappling Hook</td>
<td>1</td>
<td>5gp</td>
</tr>
<tr>
<td>Hammer</td>
<td>1/6</td>
<td>2gp</td>
</tr>
<tr>
<td>Holy Symbol, Wooden</td>
<td>1/6</td>
<td>2gp</td>
</tr>
<tr>
<td>Holy Symbol, Silver</td>
<td>1/6</td>
<td>25gp</td>
</tr>
<tr>
<td>Holy Water</td>
<td>1/6</td>
<td>25gp</td>
</tr>
<tr>
<td>Ink, 1 oz.</td>
<td>1/6</td>
<td>8gp</td>
</tr>
<tr>
<td>Iron Spikes, 6</td>
<td>1</td>
<td>1gp</td>
</tr>
<tr>
<td>Lantern</td>
<td>1</td>
<td>10gp</td>
</tr>
<tr>
<td>Lockpicks</td>
<td>1/6</td>
<td>25gp</td>
</tr>
<tr>
<td>Mirror, Polished Steel</td>
<td>1/6</td>
<td>5gp</td>
</tr>
<tr>
<td>Oil, Common (1 flask)</td>
<td>1/6</td>
<td>3sp</td>
</tr>
<tr>
<td>Parchment or Paper, 1 sheet</td>
<td>1/6</td>
<td>1sp</td>
</tr>
<tr>
<td>Pole, 10 foot</td>
<td>1</td>
<td>1gp</td>
</tr>
<tr>
<td>Quill</td>
<td>1/6</td>
<td>1sp</td>
</tr>
<tr>
<td>Quiver or Case, 20 arrows</td>
<td>1/6</td>
<td>1gp</td>
</tr>
<tr>
<td>Rations, Iron (1 week)</td>
<td>1</td>
<td>1gp</td>
</tr>
<tr>
<td>Rations, Standard (1 week)</td>
<td>2</td>
<td>3gp</td>
</tr>
<tr>
<td>Rope, Hemp (50 feet)</td>
<td>1</td>
<td>2gp</td>
</tr>
<tr>
<td>Rope, Silk (50 feet)</td>
<td>1</td>
<td>10gp</td>
</tr>
<tr>
<td>Sack, Large</td>
<td>1/6</td>
<td>2gp</td>
</tr>
<tr>
<td>Sack, Small</td>
<td>1/6</td>
<td>1gp</td>
</tr>
<tr>
<td>Sealing Wax</td>
<td>1/6</td>
<td>1gp</td>
</tr>
<tr>
<td>Spellbook</td>
<td>1</td>
<td>20gp</td>
</tr>
<tr>
<td>Spellbook, Travelling</td>
<td>1/6</td>
<td>10gp</td>
</tr>
<tr>
<td>Stakes and Mallet</td>
<td>1</td>
<td>3gp</td>
</tr>
<tr>
<td>Thieves' Tools</td>
<td>1/6</td>
<td>25gp</td>
</tr>
<tr>
<td>Tinder Box</td>
<td>1/6</td>
<td>8sp</td>
</tr>
<tr>
<td>Torches, 6</td>
<td>1</td>
<td>1sp</td>
</tr>
<tr>
<td>Waterskin</td>
<td>1/6</td>
<td>1gp</td>
</tr>
<tr>
<td>Wine Skin</td>
<td>1/6</td>
<td>2gp</td>
</tr>
<tr>
<td>Winter Blanket</td>
<td>1</td>
<td>5gp</td>
</tr>
<tr>
<td>Wolfsbane, 1 sprig</td>
<td>1/6</td>
<td>1gp</td>
</tr>
</tbody>
</table>

<h3>Clothing</h3>

<table>
<thead>
<tr>
<th>Item</th>
<th>Enc. (stone)</th>
<th>Cost</th>
</tr>
</thead>
<tbody>
<tr>
<td>Belt, Leather</td>
<td>1/6</td>
<td>2sp</td>
</tr>
<tr>
<td>Boots, Leather</td>
<td>1/6</td>
<td>3gp</td>
</tr>
<tr>
<td>Cassock</td>
<td>1/6</td>
<td>7gp</td>
</tr>
<tr>
<td>Cloak</td>
<td>1/6</td>
<td>1gp</td>
</tr>
<tr>
<td>Cloak, Fur</td>
<td>1/6</td>
<td>15gp</td>
</tr>
<tr>
<td>Dress, Common</td>
<td>1/6</td>
<td>4gp</td>
</tr>
<tr>
<td>Dress, Formal</td>
<td>1/6</td>
<td>100gp</td>
</tr>
<tr>
<td>Garb, Peasant</td>
<td>1/6</td>
<td>3sp</td>
</tr>
<tr>
<td>Garb, Traveling</td>
<td>1/6</td>
<td>2gp</td>
</tr>
<tr>
<td>Robe</td>
<td>1/6</td>
<td>6gp</td>
</tr>
<tr>
<td>Sandals</td>
<td>1/6</td>
<td>1sp</td>
</tr>
<tr>
<td>Toga</td>
<td>1/6</td>
<td>5gp</td>
</tr>
<tr>
<td>Tunic and Hose</td>
<td>1/6</td>
<td>8sp</td>
</tr>
</tbody>
</table>

<h3>Domesticated Animals</h3>

<table>
<thead>
<tr>
<th>Animal</th>
<th>Move</th>
<th>Enc. (stone)</th>
<th>Cost</th>
</tr>
</thead>
<tbody>
<tr>
<td>Camel</td>
<td>50'/turn</td>
<td>30</td>
<td>100gp</td>
</tr>
<tr>
<td>Dog, Hunting</td>
<td>120'/turn</td>
<td>3</td>
<td>17gp</td>
</tr>
<tr>
<td>Dog, War</td>
<td>120'/turn</td>
<td>4</td>
<td>75gp</td>
</tr>
<tr>
<td>Donkey</td>
<td>40'/turn</td>
<td>20</td>
<td>8gp</td>
</tr>
<tr>
<td>Hawk, Trained</td>
<td>450'/turn</td>
<td>1/6</td>
<td>20gp</td>
</tr>
<tr>
<td>Horse, Draft</td>
<td>60'/turn</td>
<td>40</td>
<td>40gp</td>
</tr>
<tr>
<td>Horse, Riding</td>
<td>80'/turn</td>
<td>25</td>
<td>75gp</td>
</tr>
<tr>
<td>Horse, War, Heavy</td>
<td>60'/turn</td>
<td>45</td>
<td>750gp</td>
</tr>
<tr>
<td>Horse, War, Medium</td>
<td>80'/turn</td>
<td>30</td>
<td>250gp</td>
</tr>
<tr>
<td>Mule</td>
<td>40'/turn</td>
<td>20</td>
<td>20gp</td>
</tr>
<tr>
<td>Pony</td>
<td>80'/turn</td>
<td>15</td>
<td>40gp</td>
</tr>
<tr>
<td>Pony, War</td>
<td>80'/turn</td>
<td>20</td>
<td>100gp</td>
</tr>
</tbody>
</table>

<h3>Foodstuffs</h3>

<table>
<thead>
<tr>
<th>Item</th>
<th>Enc. (stone)</th>
<th>Cost</th>
</tr>
</thead>
<tbody>
<tr>
<td>Ale, 1 gallon</td>
<td>1</td>
<td>4sp</td>
</tr>
<tr>
<td>Bread, 1 loaf</td>
<td>1/6</td>
<td>5cp</td>
</tr>
<tr>
<td>Cheese, 1 lb</td>
<td>1/6</td>
<td>2sp</td>
</tr>
<tr>
<td>Dried Fish, 1 lb</td>
<td>1/6</td>
<td>1sp</td>
</tr>
<tr>
<td>Dried Fruit, 1 lb</td>
<td>1/6</td>
<td>1gp</td>
</tr>
<tr>
<td>Grain or Hay, 1 day (animal)</td>
<td>1</td>
<td>5cp</td>
</tr>
<tr>
<td>Meat, 1 lb</td>
<td>1/6</td>
<td>1sp</td>
</tr>
<tr>
<td>Nuts, 1 lb</td>
<td>1/6</td>
<td>1gp</td>
</tr>
<tr>
<td>Wine, 1 gallon</td>
<td>1</td>
<td>2gp</td>
</tr>
<tr>
<td>Wine, Expensive, 1 gallon</td>
<td>1</td>
<td>10gp</td>
</tr>
</tbody>
</table>

<h3>Lodging</h3>

<table>
<thead>
<tr>
<th>Type</th>
<th>Cost per Day</th>
</tr>
</thead>
<tbody>
<tr>
<td>Cottage</td>
<td>2sp</td>
</tr>
<tr>
<td>Inn, Poor</td>
<td>6cp</td>
</tr>
<tr>
<td>Inn, Average</td>
<td>3sp</td>
</tr>
<tr>
<td>Inn, Superb</td>
<td>2gp</td>
</tr>
<tr>
<td>Suite, Noble</td>
<td>10gp</td>
</tr>
</tbody>
</table>

<h3>Poisons</h3>

<table>
<thead>
<tr>
<th>Poison</th>
<th>Type</th>
<th>Cost</th>
</tr>
</thead>
<tbody>
<tr>
<td>Arsenic</td>
<td>Ingested</td>
<td>150gp</td>
</tr>
<tr>
<td>Belladonna</td>
<td>Ingested</td>
<td>100gp</td>
</tr>
<tr>
<td>Cyanide</td>
<td>Ingested</td>
<td>200gp</td>
</tr>
<tr>
<td>Curare</td>
<td>Injury</td>
<td>150gp</td>
</tr>
<tr>
<td>Hemlock</td>
<td>Ingested</td>
<td>100gp</td>
</tr>
<tr>
<td>Snake Venom</td>
<td>Injury</td>
<td>200gp</td>
</tr>
<tr>
<td>Spider Venom</td>
<td>Injury</td>
<td>100gp</td>
</tr>
<tr>
<td>Strychnine</td>
<td>Ingested</td>
<td>250gp</td>
</tr>
</tbody>
</table>

<h3>Structures</h3>

<table>
<thead>
<tr>
<th>Structure</th>
<th>Cost</th>
</tr>
</thead>
<tbody>
<tr>
<td>Cottage</td>
<td>300gp</td>
</tr>
<tr>
<td>Fortified Tower, Small</td>
<td>2,000gp</td>
</tr>
<tr>
<td>Great Hall</td>
<td>3,000gp</td>
</tr>
<tr>
<td>Guard Tower, Large</td>
<td>3,000gp</td>
</tr>
<tr>
<td>Inn, Large</td>
<td>5,000gp</td>
</tr>
<tr>
<td>Statue</td>
<td>5,000gp</td>
</tr>
<tr>
<td>Temple</td>
<td>25,000gp</td>
</tr>
<tr>
<td>Wall Section, 20' length, 10' high</td>
<td>5,000gp</td>
</tr>
</tbody>
</table>

<h3>Vehicles</h3>

<table>
<thead>
<tr>
<th>Vehicle</th>
<th>Capacity (stone)</th>
<th>Cost</th>
</tr>
</thead>
<tbody>
<tr>
<td>Cart</td>
<td>800</td>
<td>100gp</td>
</tr>
<tr>
<td>Chariot</td>
<td>100</td>
<td>200gp</td>
</tr>
<tr>
<td>Sleigh</td>
<td>600</td>
<td>200gp</td>
</tr>
<tr>
<td>Wagon</td>
<td>1,200</td>
<td>200gp</td>
</tr>
</tbody>
</table>

<h3>Vessels</h3>

<table>
<thead>
<tr>
<th>Vessel</th>
<th>Length</th>
<th>Beam</th>
<th>Cargo Capacity (stone)</th>
<th>Cost</th>
</tr>
</thead>
<tbody>
<tr>
<td>Boat, River</td>
<td>20'-30'</td>
<td>8'-10'</td>
<td>3,000</td>
<td>4,000gp</td>
</tr>
<tr>
<td>Boat, Sailing</td>
<td>20'-40'</td>
<td>10'-15'</td>
<td>5,000</td>
<td>2,000gp</td>
</tr>
<tr>
<td>Canoe</td>
<td>15'</td>
<td>3'</td>
<td>60</td>
<td>40gp</td>
</tr>
<tr>
<td>Galley, Small</td>
<td>60'-80'</td>
<td>10'-15'</td>
<td>15,000</td>
<td>10,000gp</td>
</tr>
<tr>
<td>Galley, Large</td>
<td>100'-130'</td>
<td>15'-20'</td>
<td>40,000</td>
<td>26,500gp</td>
</tr>
<tr>
<td>Galley, War</td>
<td>100'-130'</td>
<td>20'-30'</td>
<td>30,000</td>
<td>60,000gp</td>
</tr>
<tr>
<td>Longship</td>
<td>60'-80'</td>
<td>10'-15'</td>
<td>4,000</td>
<td>15,000gp</td>
</tr>
<tr>
<td>Raft</td>
<td>10' × 10'</td>
<td>-</td>
<td>1,000</td>
<td>1gp</td>
</tr>
<tr>
<td>Ship, Merchant, Small</td>
<td>60'-80'</td>
<td>20'-30'</td>
<td>20,000</td>
<td>10,000gp</td>
</tr>
<tr>
<td>Ship, Merchant, Large</td>
<td>100'-130'</td>
<td>25'-35'</td>
<td>60,000</td>
<td>20,000gp</td>
</tr>
<tr>
<td>Ship, War</td>
<td>100'-130'</td>
<td>25'-35'</td>
<td>30,000</td>
<td>40,000gp</td>
</tr>
<tr>
<td>Troop Transport, Small</td>
<td>90'-110'</td>
<td>20'-30'</td>
<td>16,000</td>
<td>16,600gp</td>
</tr>
<tr>
<td>Troop Transport, Large</td>
<td>130'-160'</td>
<td>30'-40'</td>
<td>35,000</td>
<td>33,100gp</td>
</tr>
</tbody>
</table>

<h3>War Machines</h3>

<table>
<thead>
<tr>
<th>War Machine</th>
<th>Range</th>
<th>Damage</th>
<th>Rate of Fire</th>
<th>Crew</th>
<th>Cost</th>
</tr>
</thead>
<tbody>
<tr>
<td>Ballista, Light</td>
<td>460'</td>
<td>3d6</td>
<td>1 per 5 rounds</td>
<td>2</td>
<td>500gp</td>
</tr>
<tr>
<td>Ballista, Heavy</td>
<td>660'</td>
<td>3d10</td>
<td>1 per 8 rounds</td>
<td>4</td>
<td>750gp</td>
</tr>
<tr>
<td>Catapult, Light</td>
<td>300'</td>
<td>4d6</td>
<td>1 per 5 rounds</td>
<td>3</td>
<td>550gp</td>
</tr>
<tr>
<td>Catapult, Heavy</td>
<td>480'</td>
<td>5d8</td>
<td>1 per 8 rounds</td>
<td>4</td>
<td>800gp</td>
</tr>
<tr>
<td>Ram, Battering</td>
<td>-</td>
<td>3d6+9</td>
<td>1 per round</td>
<td>6-8</td>
<td>100gp</td>
</tr>
<tr>
<td>Trebuchet</td>
<td>600'</td>
<td>8d6</td>
<td>1 per 10 rounds</td>
<td>8</td>
<td>1,200gp</td>
</tr>
</tbody>
</table>`
    },

    {
      id: 'equipment-descriptions',
      title: 'Equipment Descriptions',
      level: 2,
      content: `<p>The arms, armor, and mundane gear available for purchase are listed from the <strong>Equipment List</strong> tables. The equipment and other items listed on the Equipment List tables are described in detail in this section.</p>

<h3>Weapon Descriptions</h3>
<p>All daggers and swords come with a simple sheath or scabbard. All other melee weapons come with a strap that can be hung from an adventurer's harness, belt, or shoulder strap. Decorative scabbards can be purchased separately as adventuring equipment.</p>

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

<p><strong>Whip:</strong> This is a long, single-tailed whip of the sort used to herd cattle. Used as a weapon, it grants +2 bonus to attack throws made to disarm or knock down opponents (see Special Maneuvers on p. XX). Whips are common throughout Aurëpos.</p>

<h3>Armor Descriptions</h3>
<p><strong>Barding:</strong> Armor fitted to draft animals and war mounts. Barding AC and encumbrance is based on the creature wearing it. Barding adds 50 stone to the creature's encumbrance and cannot be worn by creatures smaller than wolf-sized. War-trained animals can be equipped with spiked barding for an additional 25% of the base cost. Spiked barding enables the creature to deal +2 points of damage with charge attacks.</p>

<p><strong>Leather Armor:</strong> Soft, flexible leather armor, hardened by boiling in oil. Leather armor consists of a leather tunic covering the torso, leather vambraces protecting the forearms, and thick leather trousers. It offers modest protection while minimally impeding movement. Some versions of leather armor are studded with metal rivets in order to provide slightly better protection.</p>

<p><strong>Chain Mail:</strong> Flexible armor made of interlocking metal rings. Chain mail includes a long coat (called a hauberk) extending to the mid thigh, split front and back for riding, with sleeves extending to the elbows. A cloth gambeson is worn underneath to prevent chafing. Chain mail covers most of the body and provides reasonably good protection without great encumbrance.</p>

<p><strong>Lamellar Armor:</strong> Flexible armor made from small metal or leather plates (called lamellae) laced together in parallel rows. Lamellar armor typically includes a lamellar cuirass (breastplate and backplate), lamellar arm guards, and a lamellar skirt extending to the mid-thigh, all worn over quilted cloth or leather. Historically popular throughout Eurasia, lamellar armor is the favorite armor in the Sunset Kingdoms and Krysea.</p>

<p><strong>Scale Mail:</strong> A tunic of leather or cloth covered with overlapping pieces of metal, much like the scales of a fish. Scale mail provides good protection and mobility. Scale mail was historically popular in the ancient world. In Aurëpos, scale mail is common in Kemesh, Somirea, the Sunset Kingdoms, and the Ivory Kingdoms.</p>

<p><strong>Splint Mail:</strong> Armor consisting of metal strips fastened to a leather backing. Splint mail includes a breastplate and backplate and arm guards fastened to the strips of metal which extend down the limbs. A cloth gambeson is worn underneath to prevent chafing. Splint mail was popular in medieval Russia and Eastern Europe. In Aurëpos, splint mail is most common in Jutland and among dwarves.</p>

<p><strong>Banded Mail:</strong> This armor is made of overlapping strips of metal sewn to a backing of leather and chainmail. The metal strips cover vital areas, while the chain mail and leather protect the joints and moveable parts of the body where rigid metal would hinder movement. A padded layer is worn beneath the banded mail. Banded mail is heavier than splint mail, but provides better protection.</p>

<p><strong>Plate Mail:</strong> The finest suit of armor an adventurer can acquire, plate mail is made of solid metal plates from head to toe, fitted to the wearer's form. Plate mail includes a full helm, breastplate and backplate, full arm guards, gauntlets, a metal skirt, cuisses (thigh guards), greaves (shin guards), and sollerets (metal shoes). Plate mail is expertly worked so that the suits are comfortable to the wearer despite their weight.</p>

<p><strong>Shield:</strong> Shields are protective devices worn on one arm. A character equipped with a shield improves his armor class by 1 (e.g. an unarmored character (AC 0) with a shield has AC 1). Shields can be crafted from wood, leather, or metal, or from combinations of all three.</p>`
    },

    {
      id: 'related-sections',
      title: 'Related Equipment Sections',
      level: 2,
      content: `<div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">Detailed Equipment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Core Equipment Rules</h4>
            <ul className="space-y-1">
              <li><a href="/rules/chapter-4-equipment/descriptions" className="text-blue-600 dark:text-blue-400 hover:underline">Equipment Descriptions</a></li>
              <li><a href="/rules/chapter-4-equipment/masterwork" className="text-blue-600 dark:text-blue-400 hover:underline">Masterwork Equipment</a></li>
              <li><a href="/rules/chapter-4-equipment/scavenged" className="text-blue-600 dark:text-blue-400 hover:underline">Scavenged Equipment</a></li>
              <li><a href="/rules/chapter-4-equipment/encumbrance" className="text-blue-600 dark:text-blue-400 hover:underline">Encumbrance & Equipment</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Advanced Systems</h4>
            <ul className="space-y-1">
              <li><a href="/rules/chapter-4-equipment/hirelings" className="text-blue-600 dark:text-blue-400 hover:underline">Hirelings & Specialists</a></li>
              <li><a href="/rules/chapter-4-equipment/living-expenses" className="text-blue-600 dark:text-blue-400 hover:underline">Living Expenses</a></li>
              <li><a href="/rules/chapter-4-equipment/construction" className="text-blue-600 dark:text-blue-400 hover:underline">Construction Projects</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Equipment Database:</strong> Browse and search all equipment at <a href="/equipment" className="text-blue-600 dark:text-blue-400 hover:underline">/equipment</a>
          </p>
        </div>
      </div>`
    }
  ]
};

export const metadata: Metadata = {
  title: 'Chapter 4: Equipment - ACKS II Wiki',
  description: 'Complete equipment system for ACKS II including currency, purchasing, encumbrance, hiring, and construction',
  keywords: ['ACKS II', 'equipment', 'currency', 'coins', 'purchasing', 'encumbrance', 'hiring', 'construction'],
};

export default function Chapter4EquipmentPage() {
  const navigation = {
    previous: {
      href: '/rules/chapter-3-proficiencies',
      title: 'Chapter 3: Proficiencies'
    }
    // Next chapter would be added here when available
  };

  // Ensure sections are properly defined
  const sections = CHAPTER_CONTENT.sections || [];

  return (
    <ChapterTemplate 
      chapterNumber={CHAPTER_CONTENT.chapterNumber}
      title={CHAPTER_CONTENT.title}
      description={CHAPTER_CONTENT.description}
      introduction={CHAPTER_CONTENT.introduction || ''}
      sections={sections.filter(Boolean).map(section => ({
        ...section,
        content: <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: section.content }} />
      }))}
      previousChapter={navigation.previous}
    />
  );
} 