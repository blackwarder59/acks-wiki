## The Basics

The Abstract Wilderness rules assume that an organized group of **adventurers** goes on an **expedition** into the wilderness. The expedition will span multiple days, and can contain any number of adventurers, henchmen, mercenaries, hangers-on, and so on. Any expedition has an **Expedition Level**, which is calculated as the sum of the levels of all leveled characters, divided by six. Round any fractions down.

EXAMPLE 1: An expedition consists of a party of 3 6th, 1 5th, and 1 4th level PCs, and all of their henchmen, three of which are 4th level, five of which are 3rd level, and two of which are 2nd level. The sum of all their levels is 58. Dividing by six, this expedition has an Expedition Level of 9. (9.667, rounded down to 9.)

EXAMPLE 2: Another expedition consists of two 10th level PCs and their two henchmen, each 6th level. The sum of all their levels is 32. Dividing by six, this expedition has an Expedition Level of 5. (5.333, rounded down to 5).

Each adventurer in an expedition, as well as each platoon-scale unit that contributes to Army Adjustment (see below), is considered a single **participant** in the expedition. Participants in the expedition contribute to its success and are eligible for experience and gold. They are also at risk of injury and death, as described in Resolution, below. An expedition will also have a **scaling modifier** based on the number of participants. More details on the Scaling Modifier can be found on p. XX.

Unlike Abstract Dungeon exploration, which abstracts exploration and combat in the entire dungeon delve, Abstract Wilderness only abstracts the combat. Movement through, and exploration of, the wilderness should be handled with the standard rules for Wilderness Expeditions (see Chapter 2: **Adventures** and the ***ACKS II******Revised Rulebook****,* p. XX) and you should stock each hex with lairs following the usual procedures (p. XX). When the expedition encounters a pre-placed or random monster, group of monsters, or monster lair, the Abstract Wilderness rules can then be used to resolve the combat (or evasion). After the encounter is resolved, the ordinary mechanics for treasure and XP are applied.

#### Challenge Adjustments

Each wilderness encounter encountered has a **monster level** and **challenge adjustment**. The monster level is based on the power of the monster in general. The challenge adjustment reflects the variance in danger. The challenge adjustment is applied as a difficulty step bonus or penalty to your resolution roll. (The effect of the challenge adjustment can be reduced by your Army Adjustment; see below for more on Army Adjustments.)

###### Calculating Challenge Adjustment

To calculate the challenge adjustment for a monster encounter in the wilderness, follow these steps.

1. Calculate the **total XP value (XPV)** of the encounter by adding up the XPV of each individual monster encountered, including ordinary monsters, champions, leaders, animals, etc.
2. Find the **individual XPV** for the ordinary monster appearing in the encounter.
3. Consult the Monster Level table, below, and use the ordinary monster’s XPV value to determine the **monster level** and **monster XP divisor**. Write down the monster level for future reference.
4. Divide the total XPV by the monster XP divisor to find its **encounter quotient**.
5. Consult the Challenge Adjustment by Encounter Quotient table and use the encounter quotient to determine the **challenge adjustment** for the encounter.

|  |  |  |
| --- | --- | --- |
| **Monster Level** | |  |
| **Monster Individual XP Value** | **Level** | **Monster XP Divisor** |
| 1-15 | 1 | 90 |
| 20-47 | 2 | 140 |
| 50-150 | 3 | 320 |
| 175-475 | 4 | 625 |
| 500-1,140 | 5 | 1,835 |
| 1,200+ | 6 | 4,795 |

|  |  |
| --- | --- |
| **Encounter Quotient** | **Challenge Adjustment** |
| **0.25 or less** | +2 |
| **0.26 to 0.99** | +1 |
| **1 to 1.5** | +0 |
| **1.51 to 2** | -1 |
| **Greater than 2** | Divide encounter quotient by -2, round down, times -1 |

EXAMPLE: An expedition is exploring an unsettled hex when it has a monster encounter. The Judge rolls on the monster encounter tables and determines it is an orc encounter. The Judge rolls 1d100 to see if the orcs are in a lair, and rolls a 73; they are not in lair. A wilderness encounter with orcs consists of 2d6 gangs, each of which has 2d4 orcs. The Judge rolls for 8 gangs, consisting of 5, 3, 2, 3, 4, 6, 5, and 7 orcs, for a total of 35 orcs. Each gang is led by a champion, and the warband is led by a sub-chieftain. Each ordinary orc is worth 10 XP; each champion is worth 15 XP, and the sub-chieftain is worth 20. The total XP value of the wilderness encounter is therefore 350 + (15 \* 8) + 20 = 490.

Since the ordinary orc is worth 10 XP, it is monster level 1 with a challenge divisor of 90. Therefore, the Judge divides the total XPV (490) by the challenge divisor (90) to gets an encounter quotient of 5.44. Consulting the Encounter Quotient table, he sees that an encounter quotient of 5.44 requires further calculation. 5.44 divided by 2 yields 2.72; 2.72 rounds down to 2; 2 x -1 = -2. Therefore the challenge adjustment for the encounter is -2.

What if there had been more orcs, such that the total XPV of the encounter was 540 XP? In that case, the encounter quotient would have been 540 / 90 = 6. That would have yielded a challenge adjustment of 6 / 2 x -1 = -3.

#### Army Adjustment

Of course, if you’re going to be facing horrifically dangerous monsters in large quantities out in the middle of nowhere, it helps to have an **army**. Abstract Wilderness recognizes that. To determine your Army Adjustment, divide your army into platoon-scale units. You may benefit from a maximum number of platoon-scale units equal to the number of leveled characters of 3rd level or higher in your expedition. Your Army Adjustment is equal to the sum of the **Battle Rating** of all participating units.

EXAMPLE 1: An expedition containing six leveled characters brings 90 light infantry into the wilderness. 90 light infantry is three platoon-scale units, so they may all participate. These particular light infantry have a Battle Rating of 1 per unit. This expedition’s Army Adjustment is therefore +3.

EXAMPLE 2: An expedition containing four leveled characters brings along 120 light infantry, 60 heavy cavalry, and 120 archers. Because they contain only four leveled characters, they may not effectively command their entire army, and benefit only from the best four units. They choose to have their four platoon-scale units of heavy cavalry participate in the expedition. These units have BR 6 each, giving the expedition an Army Adjustment of +24.

To determine the effect that your Army Adjustment has on resolution, first determine the **Army Level** of your army units. For all units composed of normal humans (i.e., not leveled characters), this is an Army Level of 1. For other units, this is based on the individual XP value of the creatures composing your army, as if they were monsters (consult the Monster Level table above). In the case of cavalry, use the XP value of the member of the pair in command of the actions (Judge’s discretion, but usually, this is the rider).

For each level that the encounter’s Monster Level is greater than Army Level, divide the Army Adjustment by 2 (reducing it in half). Then add the modified Army Adjustment to the Challenge Adjustment**, to a maximum of +2,** to determine the final Challenge Adjustment. Round fractions of 0.5 or greater up, fractions of 0.49 or less down.

EXAMPLE 1: The first expedition has encountered a Monster Level 4 encounter with a Challenge Adjustment of -3. The expedition has an Army Adjustment of +3 and an Army Level of 1. Monster Level 4 – Army Level 1 = 3, so the Army Adjustment must be divided by 2 three times. Three3 divided by two 2 is 1.5, divided by two 2 is 0.75, divided by two 2 is 0.375, rounded down to 0. 90 ordinary light infantry does not help them in this situation, as the monsters simply drive through them.

EXAMPLE 2: The second expedition has encountered a Monster Level 4 encounter with a Challenge Adjustment of -3. Their army’s Army Level is still 1, but the Army Adjustment is +24. 24 divided by two is 12, divided by two is 6, divided by two is 3. Taking the Challenge Adjustment of -3 and adding 3 gives an adjustment of +0, which is much more likely to produce a good outcome!

Example 3: An expedition with an Army Adjustment of +24 and Army Level of 1 encounters a Monster Level 1 encounter with a Challenge Adjustment of -13. Since the Army Level equals the Monster Level, the full Army Adjustment is applied. Adding the Army Adjustment to the Challenge Adjustment indicates a result of +11. However, the maximum adjustment is +2 from this stage. The expedition adds +2 steps to their resolution roll.

**Designer’s Note:** Why does the Army Adjustment use Battle Rating instead of basing everything on experience value? To reflect the differences that equipment, training, and organization make. Light infantry and heavy infantry are both composed of normal men with an XP value of 5, but on the battlefield, the better training and equipment of heavy infantry makes them significantly more effective, reflected in their higher Battle Rating. For battles where both sides are trained military and would theoretically benefit from these sorts of things equally, ***Domains at War*** or one of its subsystems may be a better way to resolve the fight than Abstract Wilderness.
