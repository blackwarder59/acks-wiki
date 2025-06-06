# Plan of Action: ACKS II Wiki Judges Journal Reorganization

## I. Goal

To reorganize the Judges Journal section of the ACKS II wiki to be structured by its main "Parts" and then by chapter, making it user-friendly and aligned with the ACKS II Judges Journal source material. This involves:
1.  Implementing a top-level navigation based on the five main Parts of the Judges Journal.
2.  Within each Part, creating pages for its constituent chapters, using content from identified source files and the official Table of Contents.
3.  Sourcing content accurately from both the main `ACKS II Judges Journal v57 Ready for Layout.md` and the granular files in `ACKS_II_Content/Judges_Journal/`.
4.  Ensuring clear navigation within the Judges Journal section.
5.  Preparing for the future integration of images, diagrams, and accurate cross-references.

## II. Proposed Wiki Structure

### A. Top-Level Navigation & Pages

The main Judges Journal section will be accessible via a primary path (e.g., `/judges-journal`). This page will serve as a landing page with links to the following "Part" pages:

1.  **`/judges-journal/part-1-praxis`**
2.  **`/judges-journal/part-2-construction`**
3.  **`/judges-journal/part-3-abstraction`**
4.  **`/judges-journal/part-4-customization`**
5.  **`/judges-journal/part-5-appendices`**

### B. Individual "Part" and Chapter Page Structure

*   **"Part" Page Title**: e.g., "Part I: Praxis", "Part III: Abstraction"
*   **"Part" Page Content**:
    *   A brief overview of the Part, based on the "How To Use This Book" section of the Judges Journal and the provided Table of Contents images.
    *   Links to each chapter contained within that Part.
*   **Chapter Page Title**: e.g., "Chapter 1: Foundations", "Chapter 10: Abstract Dungeons" (derived from source file names or main document ToC)
*   **Chapter Page Content**: The specific content of that chapter. Content from multiple granular `.md` files will be presented as distinct, clearly headed sub-sections on a single chapter page.
*   **Navigation**:
    *   Breadcrumbs (e.g., `Home > Judges Journal > Part I: Praxis > Chapter 1: Foundations`).
    *   "Previous/Next Chapter" and "Previous/Next Part" links where appropriate.

### C. Source File Mapping to Wiki Pages

This section outlines which source markdown files will populate wiki pages. The chapter structure for Parts I and II will be definitively established during implementation by referencing the **user-provided Table of Contents images** from the `ACKS II Judges Journal v57 Ready for Layout.md` document. For Parts III, IV, and V, the `ACKS_II_Content/Judges_Journal/` directory provides a more direct file-to-chapter/section mapping, which will also be cross-referenced with the ToC images.

*   **`/judges-journal/part-1-praxis` (Part I: Praxis)**
    *   Overview: Introduces gamemastering sandbox campaigns and core judge rules.
    *   **Chapter Structure & Titles**: To be defined during Phase 1 implementation based on the user-provided Table of Contents images for Part I.
    *   **Content Sourcing**: Primarily from relevant sections of `ACKS II Judges Journal v57 Ready for Layout.md`. The existing granular files in `ACKS_II_Content/Judges_Journal/` (e.g., `72_0th_level_npcs.md` through `75_npc_miscellaneous_possessions.md`) will be mapped to the appropriate chapters identified from the ToC.

*   **`/judges-journal/part-2-construction` (Part II: Construction)**
    *   Overview: Methodology for creating fantasy campaign settings.
    *   **Chapter Structure & Titles**: To be defined during Phase 1 implementation based on the user-provided Table of Contents images for Part II.
    *   **Content Sourcing**: Primarily from relevant sections of `ACKS II Judges Journal v57 Ready for Layout.md`. Any granular files from `ACKS_II_Content/Judges_Journal/` that fall numerically between Part I and Part III content will be mapped here based on the ToC.

*   **`/judges-journal/part-3-abstraction` (Part III: Abstraction)**
    *   Part Overview Page Content from: `ACKS_II_Content/Judges_Journal/76_part_iii_abstraction.md`
    *   **`.../abstraction/chapter-10-abstract-dungeons` (Chapter 10: Abstract Dungeons)** (titles from ToC)
        *   Content from:
            *   `ACKS_II_Content/Judges_Journal/77_chapter_10_abstract_dungeons.md` (Introduction)
            *   `ACKS_II_Content/Judges_Journal/78_the_basics.md`
            *   `ACKS_II_Content/Judges_Journal/79_the_dungeon.md`
            *   `ACKS_II_Content/Judges_Journal/80_abstract_dungeon_foray_resolution.md`
            *   `ACKS_II_Content/Judges_Journal/84_example_of_abstract_dungeon_resolution.md`
            *   `ACKS_II_Content/Judges_Journal/85_optional_rules.md`
    *   **`.../abstraction/chapter-11-abstract-wilderness` (Chapter 11: Abstract Wilderness)** (titles from ToC)
        *   Content from:
            *   `ACKS_II_Content/Judges_Journal/86_chapter_11_abstract_wilderness.md` (Introduction)
            *   `ACKS_II_Content/Judges_Journal/87_the_basics.md`
            *   `ACKS_II_Content/Judges_Journal/88_abstract_wilderness_encounter_resolution.md`
            *   `ACKS_II_Content/Judges_Journal/89_abstract_wilderness_encounters_evasion.md`
            *   `ACKS_II_Content/Judges_Journal/90_treasure_and_experience.md`
            *   `ACKS_II_Content/Judges_Journal/91_optional_rules.md`

*   **`/judges-journal/part-4-customization` (Part IV: Customization)**
    *   Part Overview Page Content from: `ACKS_II_Content/Judges_Journal/92_part_iv_customization.md`
    *   **`.../customization/chapter-12-custom-classes` (Chapter 12: Custom Classes)** (titles from ToC)
        *   Content from files `93_` through `111_` in `ACKS_II_Content/Judges_Journal/`.
    *   **`.../customization/chapter-13-custom-races` (Chapter 13: Custom Races)** (titles from ToC)
        *   Content from files `112_` through `116_` in `ACKS_II_Content/Judges_Journal/`.
    *   **`.../customization/chapter-14-custom-spells` (Chapter 14: Custom Spells)** (titles from ToC)
        *   Content from files `117_` through `120_` in `ACKS_II_Content/Judges_Journal/`.
    *   **`.../customization/chapter-15-custom-magic-types` (Chapter 15: Custom Magic Types)** (titles from ToC)
        *   Content from files `121_` through `129_` in `ACKS_II_Content/Judges_Journal/`.
    *   **`.../customization/chapter-16-custom-rules` (Chapter 16: Custom Rules)** (titles from ToC)
        *   Content from files `130_` through `144_` in `ACKS_II_Content/Judges_Journal/`.

*   **`/judges-journal/part-5-appendices` (Part V: Appendices)**
    *   Part Overview Page Content from: `ACKS_II_Content/Judges_Journal/145_part_v_appendices.md`
    *   **`.../appendices/appendix-a-adventures` (Appendix A: Adventures Scenarios)**
        *   Wiki page to have sub-pages for each adventure scenario listed in the ToC (e.g., "The Shrine of Sanuaqu", "The Lair of Bakh Botcha", etc.).
        *   Content for these sub-pages to be extracted from the main `ACKS II Judges Journal v57 Ready for Layout.md` as `ACKS_II_Content/Judges_Journal/146_appendix_a_adventures_add_files_separately.md` appears to be a placeholder.
    *   **`.../appendices/appendix-b-backer-memorial` (Appendix B: Backer Memorial)**
        *   Content to be sourced from the main `ACKS II Judges Journal v57 Ready for Layout.md` (per ToC pg 481).
    *   **`.../appendices/appendix-c-cosmology` (Appendix C: Cosmology)**
        *   Content from `ACKS_II_Content/Judges_Journal/` files `147_` through `157_`. (The ToC section "Divine Power" is part of Cosmology).
    *   **`.../appendices/appendix-e-economics` (Appendix E: Economics)**
        *   Content from `ACKS_II_Content/Judges_Journal/` files `158_` through `164_`.
    *   **`.../appendices/appendix-n-recommended-reading` (Appendix N: Recommended Reading)**
        *   Content from `ACKS_II_Content/Judges_Journal/` files `165_` through `168_`.
    *   **`.../appendices/appendix-p-parties` (Appendix P: Parties)**
        *   Content from `ACKS_II_Content/Judges_Journal/` files `169_` through `174_`.
    *   **`.../appendices/resources` (Appendix: Resources)**
        *   Content to be sourced from the main `ACKS II Judges Journal v57 Ready for Layout.md` (per ToC pg 461).
    *   **`.../appendices/indexes` (Appendix: Indexes)**
        *   Content to be sourced from the main `ACKS II Judges Journal v57 Ready for Layout.md` (per ToC pg 475).
    *   *(Note: Appendices D, F-M, O are not apparent in the provided ToC snippets or file listings and are assumed not to be major distinct sections unless identified during main document review.)*

## III. Implementation Steps

### Phase 1: Setup & Core Structure

1.  **Create `JUDGES_JOURNAL_REORG_PLAN.md`**: (This file).
2.  **Define Full Chapter Structure for Parts I & II**: Using the user-provided Table of Contents images, map out the exact chapter titles and sequence for Part I and Part II. This will inform the page creation in the next step.
3.  **Create Basic Page Structure & Routing (Next.js)**:
    *   `pages/judges-journal/index.tsx` (Main landing page)
    *   For each "Part" (Praxis, Construction, Abstraction, Customization, Appendices), create a route and basic page file (e.g., `pages/judges-journal/praxis.tsx`).
    *   Within each Part's directory, create sub-routes/pages for each Chapter (for Parts I & II, this uses the structure from step 2; for Parts III-V, this uses the structure from section II.C).
4.  **Populate Core "Part" and Chapter Pages (Initial Pass)**:
    *   For each created page, begin collating content from its mapped markdown file(s) or relevant sections of `ACKS II Judges Journal v57 Ready for Layout.md`.
    *   Design the main `/judges-journal/index.tsx` page with links to all "Part" pages.
    *   Design "Part" pages with overviews and links to their respective chapters.

### Phase 2: Content Collation & Navigation

1.  **Detailed Content Mapping & Collation**:
    *   For Parts I & II, meticulously segment the main JJ markdown file (based on ToC) to populate the defined chapter pages.
    *   For Parts III-V, ensure all listed .md files are correctly placed and their content integrated.
2.  **Develop Intra-Chapter/Section Navigation**:
    *   Implement on-page Tables of Contents or clear H2/H3 headings for sub-sections within each chapter page.
3.  **Formatting and Styling**: Apply consistent styling.
4.  **Image Integration (Deferred)**:
    *   Create a dedicated image directory (e.g., `public/images/judges-journal/`).
    *   During content collation, add placeholder text (e.g., `<!-- IMAGE: [original_figure_caption_or_description] -->`) where images are expected based on original document context.
    *   Actual image placement will occur when image files are available and mapped to these placeholders.
5.  **Cross-referencing (Initial Pass)**:
    *   Begin identifying and converting textual page references (e.g., "see page XX") to internal wiki links.

### Phase 3: Review & Finalization

1.  **Implement Breadcrumbs and Prev/Next Navigation**.
2.  **Finalize Cross-Referencing**: Complete the conversion of all page references.
3.  **Review and Test**: Content accuracy, link integrity, display issues (including image placeholders).

## IV. Content Sourcing

*   Overall Structure (Parts, Chapters within Parts I & II, specific Appendices like B, Resources, Indexes): `ACKS II Judges Journal v57 Ready for Layout.md` (guided by user-provided Table of Contents images).
*   Content for Chapters in Parts III, IV, V and Appendices C, E, N, P: Individual markdown files within `ACKS_II_Content/Judges_Journal/`.
*   Content for Adventure Scenarios in Appendix A: To be extracted from `ACKS II Judges Journal v57 Ready for Layout.md`.

## V. Open Questions & Considerations (Addressed)

*   **Definitive Chapter List for Parts I & II**: To be finalized during implementation using the user-provided Table of Contents images as the primary reference.
*   **Presentation of Collated Content**: Content from multiple granular .md files will be presented on a single chapter page with each original file becoming a distinct, clearly headed sub-section.
*   **Appendices Structure**: The plan reflects the visible appendices (A, C, E, N, P from granular files; B, Resources, Indexes from main ToC/doc). Other lettered appendices (D, F-M, O) are assumed minor or non-existent unless found in the full ToC of the main document.
*   **Handling of Images, Diagrams, and Internal Page References**: A strategy for deferred image integration (placeholders, dedicated directory) and phased cross-reference conversion is in place, consistent with other book plans.

--- 