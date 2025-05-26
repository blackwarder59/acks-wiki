## Continental Economics

As part of creating ***ACKS II****,* we built a model of the entire economy of Aurëpos, which in turn enabled us to simulate everything from the average age of a baron to the amount of iron produced annually in Krysea. The effects of this simulation are implicit in every demographic and economic mechanic in the game.

### Continental Population Data

The first step in our econometric analysis of Aurëpos was demographics. The tables below show the total population of the continent, along with how that population is allocated. Mathematically there are 5.86 people in the realm per 5-person family. From that excess of 0.86 people per family are drawn the “special individuals,” who include garrison troops, camp followers, tithed clergy, mages, thieves, mercenaries, bandits, specialists, adventurers, and everyone else who isn’t a peasant, miner, bourgeoise, or aristocrat.

Note that the peasant population has been divided into farming, mining, and lumberjacking. The peasant population was first assigned to mining labor in the necessary ratios to work the mines generated for Aurëpos using the ***AXIOMS***article *Ore Never Changes* and ***By This Axe****,* which in turn were based on the proportions of the actual Roman Empire. The peasant population was then assigned to lumberjacking in sufficient numbers to produce charcoal to support the mining families and firewood to support the total population. The remaining peasant population was then assigned to farming.

Little historical data exists on the ratio of grain farms to pastures to vineyards to groves. To ascertain the proportions of the different types of farms, we incremented over and over again through the possible combinations until we found a set that produced the following outcomes:

* Enough calories were produced to feed the population, including horses.
* Enough olive oil and wine were produced to match historical consumption of those goods.
* Enough fleece and leather were produced to manufacture 2.5 garments per peasant family per year.

|  |  |
| --- | --- |
| **Total Population** | **Population** |
| Total Persons | 66,067,940 |
| Total Working Adults | 32,360,432 |
| Total Families | 11,274,392 |
| **Family Breakdown** | **Population** |
| Peasant Families | 10,136,511 |
| Urban Families | 1,137,882 |
| Noble Families | 40,444 |
| Special Individuals | 9,730,759 |
| Horses | 4,129,246 |
| **Peasant Breakdown** | **Population** |
| Farming Families | 8,874,962 |
| Mining Families | 978,024 |
| Lumberjacking Families | 282,524 |

|  |  |
| --- | --- |
| **Farming Breakdown** | **Population** |
| Grain Farming Families | 6,567,472 |
| Sheep Herding Families | 621,247 |
| Pig Farming Families | 443,748 |
| Olive Growing Families | 443,748 |
| Cattle Ranching Families | 354,998 |
| Goat Herding Families | 266,249 |
| Winemaking Families | 177,499 |
| **Mining Breakdown** | **Population** |
| Stone Quarrying Families | 447,494 |
| Copper Mining Families | 134,679 |
| Iron Mining Families | 274,865 |
| Gold Mining Families | 68,564 |
| Gem Mining Families | 28,283 |
| Silver-Lead Mining Families | 25,140 |

### Continental Economic Production

Abovewe presented a microeconomic model of an average peasant family, which operated a 30 acre farm with an ox, 3 cows, 1 pig, and 32 sheep. From this it produced 16.25gp per month of crops, milk, wool, meat, and goods per month. Of this produce, 12gp per month are paid in rents and taxes, leaving the peasant family with a subsistence income of 4.25gp per month.

Below, we have presented a macroeconomic model of total production of goods when peasant families are allocated to a broad variety of tasks. The GP values per unit are previously published ***ACKS***prices*.* We have separately presented an analysis showing that these prices are historically plausible; see the ***AXIOMS*** article “*The Price of Everything*” for more details.

The production levels for timber, stone, iron, lead, copper, silver, gold, and gems follow directly from the rules in *Ore Never Changes* and are the population-adjusted equivalent to Roman production levels or are implied by those values (e.g. charcoal for timber).

The production levels for each individual type of farm are based on historical data for the productivity and expenses of operating different types of farms.The production level for “other goods” was determined by calculating the number of labor days available to the farming families (500 days per family) and then subtracting the labor days required to operate the farms. The surplus labor days were then assigned to produce “other goods” at a rate of 1sp of goods per day. Some of these “goods” may actually be services, but for purposes of our model they are categorized together.

The macroeconomic model shows that the average peasant family produces 16.27gp per month, virtually identical to the 16.25gp per month produced by our peasant family in our microeconomic model. The ***ACKS II***economy thus functions both top-down and bottom-up in a coherent manner.

|  |  |  |  |
| --- | --- | --- | --- |
| **Good** | **Annual Production** | **GP Value/Unit** | **GP Value** |
| Firewood | 50,571,000 tons | 1gp/ton | 50,571,000gp |
| Stone | 29,735,000 tons | 2.23gp/ton | 63,635,000gp |
| Grain | 31,435,000 tons | 4gp/quarter | 524,000,000gp |
| Milk | 17,755,000 tons | 4cp/lbs | 443,875,000gp |
| Olives | 9,300,000 tons | 1cp/lbs | 185,850,000gp |
| Wine | 6,670,000 tons | 5sp/lbs | 166,730,000gp |
| Fleece | 4,690,000 tons | 6.6cp/lbs | 260,000,000gp |
| Other Goods | 286,750 tons | 1sp/day of labor | 16,400,000gp |
| Leather | 206,000 tons | 1sp/gallon | 27,235,000gp |
| Iron Ore | 102,500 tons | 45cp/lbs | 92,250,000gp |
| Lead Ore | 100,000 tons | 1.25cp/lbs | 2,500,000gp |
| Copper Ore | 18,750 tons | 1gp/lbs | 37,600,000gp |
| Silver Ore | 250 tons | 10gp/lbs | 5,000,000gp |
| Semiprecious Gems | 37.5 tons | 66.6gp/lbs | 4,995,000gp |
| Gold Ore | 11.25 tons | 100gp/lbs | 2,250,000gp |
| Precious Gems | 2.0 tons | 500gp/lbs | 1,965,000gp |
| Total GP Production | | | 2,201,725,00gp |
| GP Production/Family | | | 16.27gp/month |
|  |  | Ruler’s GP Revenue/Family | 12gp/month |
|  |  | GP Consumption/Family | 4.27gp/month |
