# Plan of Action: ACKS II Wiki Revised Rulebook Reorganization

## I. Goal

To reorganize the Revised Rulebook section of the ACKS II wiki to be structured by chapter, making it user-friendly and aligned with the ACKS II Revised Rulebook source material. This involves:
1.  Implementing a top-level navigation based on the main chapters and appendices of the ACKS II Revised Rulebook.
2.  Collating content from numerous individual markdown files from `ACKS_II_Content/Rulebook/` into their respective chapter and section pages on the wiki.
3.  Ensuring clear navigation within chapters to their various subsections, using specific filenames for content.
4.  Preparing for the future integration of images and diagrams.

## II. Proposed Wiki Structure

### A. Top-Level Navigation & Pages

The main rulebook section will be accessible via a primary path (e.g., `/rules`). This page will serve as a landing page with links to the following main chapter and appendix pages:

1.  **`/rules/chapter-1-characters`**
2.  **`/rules/chapter-2-classes`**
3.  **`/rules/chapter-3-proficiencies`**
4.  **`/rules/chapter-4-equipment`**
5.  **`/rules/chapter-5-spells`**
6.  **`/rules/chapter-6-adventures`**
7.  **`/rules/chapter-7-voyages`**
8.  **`/rules/chapter-8-campaigns`**
9.  **`/rules/chapter-9-armies`**
10. **`/rules/chapter-10-maneuvers`**
11. **`/rules/chapter-11-battles`**
12. **`/rules/chapter-12-sieges`**
13. **`/rules/appendix-a-auran-empire`**
14. **`/rules/appendix-b-conditions`**
15. **`/rules/appendix-c-wounds-and-woe`**

### B. Page Layout & Features (for each chapter/appendix page)

*   **Title**: Clearly indicating the chapter/appendix number and name.
*   **Content Area**: Displaying the collated text from the source markdown files, with H2/H3 headings for sub-sections derived from original filenames/headings.
*   **On-Page Navigation (for long chapters)**: A sticky Table of Contents or similar mechanism for easy navigation to sub-sections.
*   **Breadcrumbs**: e.g., `Home > Rules > Chapter 1: Characters`.
*   **Cross-Chapter Navigation**:
    *   "Previous Chapter" / "Next Chapter" links.

### C. Source File Mapping to Wiki Pages

This section details which source markdown files from `ACKS_II_Content/Rulebook/` will populate each wiki page. Each chapter page will begin with its main "Chapter X" file (if one exists with that specific naming), followed by content from subsequent numerically ordered files until the next chapter marker. The files listed are considered the complete set from the source directory for each chapter.

*   **`/rules/chapter-1-characters` (Chapter 1: Characters)**
    *   Primary Content: `ACKS_II_Content/Rulebook/09_chapter_1_characters.md`
    *   *(Sub-sections will be derived from the content of `09_chapter_1_characters.md`. The numerical gap before Chapter 2's files is noted as per the source directory's structure.)*

*   **`/rules/chapter-2-classes` (Chapter 2: Classes)**
    *   Primary Content: `ACKS_II_Content/Rulebook/25_chapter_2_classes.md`
    *   Individual Class Sub-sections (each from its own file in `ACKS_II_Content/Rulebook/`):
        *   `assassin.md`
        *   `barbarian.md`
        *   `bard.md`
        *   `bladedancer.md`
        *   `crusader.md`
        *   `dwarven_craftpriest.md`
        *   `dwarven_vaultguard.md`
        *   `elven_nightblade.md`
        *   `elven_spellsword.md`
        *   `explorer.md`
        *   `fighter.md`
        *   `mage.md`
        *   `nobiran_wonderworker.md`
        *   `paladin.md`
        *   `priestess.md`
        *   `shaman.md`
        *   `thief.md`
        *   `venturer.md`
        *   `warlock.md`
        *   `witch.md`
    *   *(The numerical gap before Chapter 3's files is noted as per the source directory's structure.)*

*   **`/rules/chapter-3-proficiencies` (Chapter 3: Proficiencies)**
    *   Primary Content: `ACKS_II_Content/Rulebook/30_chapter_3_proficiencies.md`
    *   Additional Content/Sub-sections from `ACKS_II_Content/Rulebook/`:
        *   `33_gaining_proficiencies.md`
        *   `34_proficiency_lists.md`
    *   *(The numerical gaps (e.g., 31_*, 32_*) are noted as per the source directory's structure.)*

*   **`/rules/chapter-4-equipment` (Chapter 4: Equipment)**
    *   Primary Content: `ACKS_II_Content/Rulebook/36_chapter_4_equipment.md`
    *   Additional Content/Sub-sections from `ACKS_II_Content/Rulebook/`:
        *   `41_equipment_descriptions.md`
        *   `42_masterwork_equipment_optional.md`
        *   `43_scavenged_equipment.md`
        *   `44_encumbrance_and_equipment.md`
        *   `45_hirelings_henchmen_mercenaries_and_specialists.md`
        *   `46_expected_living_expenses_optional.md`
        *   `47_construction_projects.md`
    *   *(The numerical gaps (e.g., 37_*-40_*) are noted as per the source directory's structure.)*

*   **`/rules/chapter-5-spells` (Chapter 5: Spells)**
    *   Primary Content: `ACKS_II_Content/Rulebook/48_chapter_5_spells.md`
    *   Additional Content/Sub-sections from `ACKS_II_Content/Rulebook/`:
        *   `49_spells_and_spell_casters.md`
        *   `50_spell_lists_by_magic_type.md`
        *   `51_spell_repertoires.md`
        *   `52_spell_reversal.md`
        *   `53_spell_signatures.md`
        *   `54_spell_types.md`
        *   `55_spell_lists_&_repertoires.md`
        *   `56_spell_descriptions.md`

*   **`/rules/chapter-6-adventures` (Chapter 6: Adventures)**
    *   Primary Content: `ACKS_II_Content/Rulebook/57_chapter_6_adventures.md`
    *   Additional Content/Sub-sections from `ACKS_II_Content/Rulebook/`:
        *   `58_dungeon_delves.md`
        *   `59_wilderness_expeditions.md`
        *   `60_encounters.md`
        *   `61_combat.md`
        *   `62_earning_experience_from_adventures.md`

*   **`/rules/chapter-7-voyages` (Chapter 7: Voyages)**
    *   Primary Content: `ACKS_II_Content/Rulebook/63_chapter_7_voyages.md`
    *   Additional Content/Sub-sections from `ACKS_II_Content/Rulebook/`:
        *   `64_seafarers.md`
        *   `65_sea_vessels.md`
        *   `66_sea_voyages.md`
        *   `67_sea_encounters.md`
        *   `68_sea_combat.md`
        *   `69_river_voyages.md`

*   **`/rules/chapter-8-campaigns` (Chapter 8: Campaigns)**
    *   Primary Content: `ACKS_II_Content/Rulebook/70_chapter_8_campaigns.md`
    *   Additional Content/Sub-sections from `ACKS_II_Content/Rulebook/`:
        *   `71_activities_during_the_campaign.md`
        *   `72_followers_and_strongholds.md`
        *   `73_domains_and_realms.md`
        *   `74_politics_and_power.md`
        *   `75_hideouts_and_hijinks.md`
        *   `76_mercantile_ventures.md`
        *   `77_sanctums_and_dungeons.md`
        *   `78_magic_research.md`
        *   `79_congregants_and_divine_power.md`
        *   `80_earning_experience_from_campaigns.md`

*   **`/rules/chapter-9-armies` (Chapter 9: Armies)**
    *   Primary Content: `ACKS_II_Content/Rulebook/81_chapter_9_armies.md`
    *   Additional Content/Sub-sections from `ACKS_II_Content/Rulebook/`:
        *   `82_army_troops.md`
        *   `83_army_organization.md`
        *   `84_army_command.md`
        *   `85_organization_and_command_in_very_small_or_very_lar.md`
        *   `86_troop_characteristics_summary.md`
        *   `87_unit_characteristics_summary.md`

*   **`/rules/chapter-10-maneuvers` (Chapter 10: Maneuvers)**
    *   Primary Content: `ACKS_II_Content/Rulebook/88_chapter_10_maneuvers.md`
    *   Additional Content/Sub-sections from `ACKS_II_Content/Rulebook/`:
        *   `89_regions.md`
        *   `90_campaign_activities.md`
        *   `91_strategic_stance.md`
        *   `92_moving_armies.md`
        *   `93_supplying_armies.md`
        *   `94_equipment_availability_on_campaign.md`
        *   `95_reconnaissance_and_intelligence.md`
        *   `96_invading_conquering_occupying_and_pillaging_domain.md`

*   **`/rules/chapter-11-battles` (Chapter 11: Battles)**
    *   Primary Content: `ACKS_II_Content/Rulebook/97_chapter_11_battles.md`
    *   Additional Content/Sub-sections from `ACKS_II_Content/Rulebook/`:
        *   `98_strategic_situations.md`
        *   `99_running_a_battle.md`
        *   `100_ending_battles.md`
        *   `101_aftermath_of_battles.md`

*   **`/rules/chapter-12-sieges` (Chapter 12: Sieges)**
    *   Primary Content: `ACKS_II_Content/Rulebook/102_chapter_12_sieges.md`
    *   Additional Content/Sub-sections from `ACKS_II_Content/Rulebook/`:
        *   `103_methods_of_siege.md`
        *   `104_siege_mechanics.md`
        *   `105_blockade.md`
        *   `106_reduction.md`
        *   `107_assault.md`
        *   `108_ending_sieges.md`
        *   `109_sieges_simplified.md`

*   **`/rules/appendix-a-auran-empire` (Appendix A: Auran Empire)**
    *   Primary Content: `ACKS_II_Content/Rulebook/110_appendix_a_auran_empire.md`
    *   Additional Content/Sub-sections from `ACKS_II_Content/Rulebook/`:
        *   `111_overview.md`
        *   `112_lands.md`
        *   `113_timeline.md`
        *   `114_customs.md`
        *   `115_people.md`
        *   `116_languages.md`

*   **`/rules/appendix-b-conditions` (Appendix B: Conditions)**
    *   Content from: `ACKS_II_Content/Rulebook/117_appendix_b_conditions.md`

*   **`/rules/appendix-c-wounds-and-woe` (Appendix C: Wounds and Woe)**
    *   Content from: `ACKS_II_Content/Rulebook/118_appendix_c_wounds_and_woe.md`

## III. Implementation Steps

### Phase 1: Setup & Core Chapter/Appendix Pages

1.  **Create `RULEBOOK_REORG_PLAN.md`**: (This file).
2.  **Create Basic Page Structure & Routing (Next.js)**:
    *   `pages/rules/index.tsx` (Main landing page for the Rulebook)
    *   For each chapter and appendix identified above, create a corresponding route and basic page file (e.g., `pages/rules/chapter-1-characters.tsx`, `pages/rules/appendix-a-auran-empire.tsx`).
3.  **Populate Core Chapter/Appendix Pages**:
    *   For each created page, collate the content from its mapped markdown files (as per section II.C), presenting content from each source file as a distinct, headed sub-section.
    *   Design the main `/rules/index.tsx` page with links to all chapter and appendix pages.

### Phase 2: Intra-Chapter Navigation & Content Refinement

1.  **Develop Intra-Chapter Navigation**:
    *   Implement on-page Table of Contents for lengthy chapter pages.
2.  **Content Formatting and Styling**:
    *   Ensure consistent formatting (tables, lists, etc.).
3.  **Image Integration (Deferred)**:
    *   Create a dedicated image directory (e.g., `public/images/rulebook/`).
    *   During content collation, add placeholder text (e.g., `<!-- IMAGE: [original_figure_caption_or_description] -->`) where images are expected based on original document context.
    *   Actual image placement will occur when image files are available and mapped to these placeholders.
4.  **Cross-referencing (Initial Pass)**:
    *   Begin identifying and converting textual page references (e.g., "see page XX") to internal wiki links.

### Phase 3: Review & Finalization

1.  **Implement Breadcrumbs**: Add breadcrumb navigation.
2.  **Implement Prev/Next Chapter/Appendix Navigation**: On chapter/appendix pages.
3.  **Finalize Cross-Referencing**: Complete the conversion of all page references.
4.  **Review and Test**:
    *   Thoroughly review all pages for content accuracy, completeness, broken links, and display issues (including image placeholders).
    *   Test navigation flows.

## IV. Content Sourcing and Management

*   Primary Text Source: Individual markdown files within `ACKS_II_Content/Rulebook/`.
*   Structure: Based on the numerical prefixes of filenames and explicit "Chapter X" markers found in some filenames. The source file mapping in II.C is considered complete based on the contents of the `ACKS_II_Content/Rulebook/` directory.

## V. Open Questions & Considerations (Addressed)

*   **Content Presentation on Chapter Pages:** Content from multiple markdown files will be presented on a single chapter page with each original file becoming a distinct, clearly headed sub-section.
*   **Images and Diagrams:** A strategy for deferred image integration is in place (placeholders and dedicated directory). Actual images will be integrated when provided.
*   **Internal Cross-References:** A phased approach to convert textual page references to internal wiki links is planned.

--- 