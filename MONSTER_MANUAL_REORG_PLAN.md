# Plan of Action: ACKS II Wiki Monster Manual Reorganization

## I. Goal

To reorganize the Monster Manual section of the ACKS II wiki to be more structured, user-friendly, and aligned with the ACKS II Monstrous Manual source material. This involves:
1.  Implementing a top-level navigation based on the main chapters of the ACKS II Monstrous Manual.
2.  Within the "Monster Listings" chapter, organizing monsters by their official ACKS II Monster Type, based on the `Type:` field found in individual monster stat blocks.
3.  Ensuring individual monster pages (rendered from `.mdx` content files) clearly separate detailed descriptive content from a concise combat statistics "card" (which can be an MDX component).
4.  Sourcing content accurately from both the main `ACKS II Monstrous Manual v46 - Part X.md` files and the granular markdown files in `ACKS_II_Content/Monstrous_Manual/`.
5.  Structuring the new section using Next.js, with `.tsx` files for page routing and logic, and `.mdx` files for the primary content of each page.

## II. Proposed Wiki Structure

### A. Top-Level Navigation & Pages

The main monster manual section will be accessible via a primary path (e.g., `/monsters`). This page will serve as a landing page with links to the following main chapter pages. Each linked page will be a Next.js route (`page.tsx`) rendering content from a corresponding `.mdx` file.

1.  **`/monsters/overview`**: Content for "Chapter 1: Monster Overview."
    *   Route file: `src/app/monsters/overview/page.tsx`
    *   Content file: e.g., `src/content/monsters/overview.mdx` (or similar organized path for content files)
2.  **`/monsters/listings`**: Landing page for "Chapter 2: Monster Listings." This page will list monster types, linking to sub-pages for each type.
    *   Route file: `src/app/monsters/listings/page.tsx`
    *   Content file: e.g., `src/content/monsters/listings-overview.mdx`
3.  **`/monsters/rules`**: Content for "Chapter 3: Monster Rules."
    *   Route file: `src/app/monsters/rules/page.tsx`
    *   Content file: e.g., `src/content/monsters/rules.mdx`
4.  **`/monsters/creation`**: Content for "Chapter 4: Monster Creation."
    *   Route file: `src/app/monsters/creation/page.tsx`
    *   Content file: e.g., `src/content/monsters/creation.mdx`

### B. "Chapter 2: Monster Listings" Organization

The `/monsters/listings` page will link to pages for each **Official ACKS II Monster Type** (Beast, Construct, Dragon, Elemental, Fey, Fiend, Humanoid, Monstrosity, Undead, Vermin, Other).

Example structure for a monster type: `/monsters/listings/beast`
*   This page lists all monsters of the "Beast" type.
*   Route file: `src/app/monsters/listings/[monsterType]/page.tsx` (dynamic route)
*   Content: This page will dynamically generate links to individual monster pages. The page itself might render a simple `src/content/monsters/listings/monster-type-template.mdx` if needed for surrounding text.

Example structure for an individual monster: `/monsters/listings/beast/wolf`
*   This page displays the full details for the "Wolf" monster.
*   Route file: `src/app/monsters/listings/[monsterType]/[monsterName]/page.tsx` (dynamic route)
*   Content file: e.g., `src/content/monsters/listings/beast/wolf.mdx`

### C. Individual Monster Page Layout (`.mdx` Content)

Each individual monster's `.mdx` content file will contain:
1.  **Monster Name (H1)**
2.  **Image(s)** (Placeholder or actual, with upload functionality planned)
3.  **Full Descriptive Text:** Lore, behavior, habitat, ecology, etc., derived from the source files.
4.  **Combat Stat Card (MDX Component):**
    *   A visually distinct section.
    *   Data parsed from the three Markdown tables in the source files:
        *   `[Monster Name] Primary Characteristics`
        *   `[Monster Name] Secondary Characteristics`
        *   `[Monster Name] Encounter Set-Up`
    *   The `Type:` field from the stat block will be used for categorization and possibly displayed.
5.  **Spoils/Treasure Information**
6.  **Other relevant sections** (e.g., special rules, variants if not complex enough for own page).

### D. Source File Mapping to Wiki Pages

*   **Chapter 1: Monster Overview (`/monsters/overview`)**
    *   Primary content from `ACKS_II_Content/Monstrous_Manual/000_monster_overview.md`. This will be structured into `src/content/monsters/overview.mdx`.
*   **Chapter 2: Monster Listings (`/monsters/listings/[type]/[name]`)**
    *   Individual monster `.mdx` files will be created/populated from:
        *   `ACKS_II_Content/Monstrous_Manual/Monster_Listings_A/`
        *   `ACKS_II_Content/Monstrous_Manual/Monster_Listings_B/`
    *   The `Type:` field in each monster's stat block (from source files) will determine its primary category (e.g., Beast, Undead) and thus its URL path and `.mdx` file location (e.g., `src/content/monsters/listings/beast/[monsterName].mdx`).
*   **Chapter 3: Monster Rules (`/monsters/rules`)**
    *   Primary content from `ACKS_II_Content/Monstrous_Manual/182_monster_rules_overview.md` and related files like `183_monster_hit_dice.md`, `184_monster_morale.md`, etc. These will be collated and structured into `src/content/monsters/rules.mdx`.
*   **Chapter 4: Monster Creation (`/monsters/creation`)**
    *   Primary content from `ACKS_II_Content/Monstrous_Manual/224_monster_creation_overview.md` and associated detailed files (e.g., `225_concept.md`, `226_characteristics.md`). These will be collated and structured into `src/content/monsters/creation.mdx`.

### E. Special Handling for Complex Entries (Content in `.mdx` with potential custom components)

Certain monster entries are more complex and will require special handling for their `.mdx` content files and potentially custom React components within those MDX files.

1.  **Dragons (`071_dragon.md`):**
    *   The primary Dragon page (e.g., `/monsters/listings/dragon/dragon-overview` or similar, rendering content from `src/content/monsters/listings/dragon/dragon-overview.mdx`) will present:
        *   General dragon lore from the start of `071_dragon.md`.
        *   All relevant characteristic tables (Age, Color/Habitat, Primary, Secondary, Encounter).
        *   Links to individual dragon color pages if deemed necessary, or include all color-specific details within the main MDX via components or structured sections.
2.  **Elementals (`076_elemental.md`):**
    *   A main Elemental page (e.g., `/monsters/listings/elemental/elemental-overview`, rendering content from `src/content/monsters/listings/elemental/elemental-overview.mdx`) will:
        *   Contain general elemental lore.
        *   Present stat tables for all elemental types (Air, Earth, Fire, Water) and tiers (Lesser, Intermediate, Greater, Noble), potentially using MDX components for each type/tier.
3.  **Beastman Group (`022_beastman.md` plus specific types like `023_beastman_bugbear.md`):**
    *   A main Beastman landing page (e.g., `/monsters/listings/humanoid/beastman-overview`, rendering `src/content/monsters/listings/humanoid/beastman-overview.mdx`) will synthesize content from `022_beastman.md` (general lore) and `029_beastman_special_rules.md`.
    *   This overview page will link to individual pages for each beastman type (Bugbear, Gnoll, Goblin, Hobgoblin, Kobold, Orc), e.g., `/monsters/listings/humanoid/bugbear` (rendering content from `src/content/monsters/listings/humanoid/bugbear.mdx`). Each of these individual `.mdx` files will contain the specific stats and lore for that type.
4.  **Herd Animals (`138_herd_animal.md`):**
    *   The main `herd-animal-overview.mdx` file (e.g., `src/content/monsters/listings/beast/herd-animal-overview.mdx`) will list the various herd animals detailed within (Aurochs, Deer, Giant Ram, etc.).
    *   Each specific herd animal will have its stats presented on this overview page, possibly using a repeatable MDX component for consistency. Alternatively, if content is substantial, individual sub-pages (rendering `aurochs.mdx`, `deer.mdx`) could be linked.
5.  **Vampires (`102_vampire.md` from Listings_B):**
    *   Similar to Dragons, the main `vampire.mdx` file (e.g., `src/content/monsters/listings/undead/vampire.mdx`) will be comprehensive, including general vampire lore, then detailed sections/stats for "Fledgling Vampire," "Mature Vampire," and "Vampire Lord," potentially using MDX components to structure these variants.
6.  **Lycanthropes (`162_lycanthrope.md` and specific type files like `163_lycanthrope_werebear.md`):**
    *   A main `lycanthrope-overview.mdx` (e.g., `src/content/monsters/listings/humanoid/lycanthrope-overview.mdx`) will contain general lycanthropy rules and lore from `162_lycanthrope.md`.
    *   It will link to individual `.mdx` pages for each type (Werebear, Wereboar, Wererat, Werewolf), e.g., rendering `src/content/monsters/listings/humanoid/werebear.mdx`, each containing specific stats and adjusted lore.
7.  **Giant Worms (`118_worm_giant_overview.md` and specific type files like `119_worm_giant_purple.md`):**
    *   A main `giant-worm-overview.mdx` (e.g., `src/content/monsters/listings/vermin/giant-worm-overview.mdx`) will contain general lore from `118_worm_giant_overview.md`.
    *   It will link to individual `.mdx` pages for each type (Purple Worm, Rock Worm, Sand Worm), e.g., rendering `src/content/monsters/listings/vermin/purple-worm.mdx`.

## III. Implementation Steps

### Phase 1: Initial Setup & Basic Page Structure

1.  **Project Setup:**
    *   Ensure Next.js project is initialized.
    *   Install and configure necessary MDX processing libraries (e.g., `@next/mdx`, `remark-gfm`). This might involve updating `next.config.js` (or `next.config.mjs`).
2.  **Create Basic Directory Structure for Routes (`.tsx`) and Content (`.mdx`):**
    *   **App Routes (`src/app/monsters/`):**
        *   `overview/page.tsx`
        *   `listings/page.tsx`
        *   `listings/[monsterType]/page.tsx`
        *   `listings/[monsterType]/[monsterName]/page.tsx`
        *   `rules/page.tsx`
        *   `creation/page.tsx`
    *   **Content Files (e.g., `src/content/monsters/`):** Create a parallel directory structure for `.mdx` files.
        *   `src/content/monsters/overview.mdx`
        *   `src/content/monsters/listings-overview.mdx` (for the `/listings` page)
        *   `src/content/monsters/rules.mdx`
        *   `src/content/monsters/creation.mdx`
        *   Subdirectories for monster listings, e.g., `src/content/monsters/listings/beast/`, `src/content/monsters/listings/undead/`, etc.
3.  **Create Placeholder `.tsx` Route Files and `.mdx` Content Files:**
    *   For each route, the `.tsx` file should be set up to import and render its corresponding `.mdx` file.
    *   The placeholder `.mdx` files should contain basic "Coming Soon" or chapter title text.
4.  **Implement Basic Navigation:**
    *   Update main site navigation to include a link to `/monsters`.
    *   The `/monsters/page.tsx` route (if you have one for the root of `/monsters`, or the primary layout) should render links derived from the main chapter structure. The content for the `/monsters` landing page itself might come from a `src/content/monsters/index.mdx`.

### Phase 2: Content Population & Parsing for Monster Listings

1.  **Develop Parsing Logic/Scripts:**
    *   Create scripts or functions to read the source monster markdown files from `ACKS_II_Content/Monstrous_Manual/Monster_Listings_A/` and `B/`.
    *   Extract: Monster Name, `Type:` field, descriptive text, and the three stat tables.
2.  **Populate Individual Monster `.mdx` Files:**
    *   For each monster, generate/populate its corresponding `.mdx` file in the `src/content/monsters/listings/[type]/` directory.
    *   The `.mdx` file will include the descriptive text and a structured representation of the stat tables (initially can be Markdown tables, later an MDX component).
3.  **Develop Monster Stat Card MDX Component:**
    *   Create a React component (`CombatStatCard.tsx`) that takes monster stat data as props and displays it in a clean, card-like format.
    *   This component will be imported and used within the individual monster `.mdx` files.
4.  **Populate `/monsters/listings/[monsterType]/page.tsx`:**
    *   These pages should dynamically list all monsters of that type (linking to their individual pages). This might involve reading the directory structure of the `.mdx` content files or using a manifest. The `.tsx` file will handle this logic and render links.
5.  **Implement Special Handling for Complex Entries:**
    *   Structure the `.mdx` files and any necessary MDX components for Dragons, Elementals, Beastmen, Herd Animals, Vampires, Lycanthropes, and Giant Worms as detailed in Section II.E. This might involve more complex parsing and content aggregation logic for generating these specific `.mdx` files.

### Phase 3: Content Population for Overview, Rules, & Creation Chapters

1.  **Collate and Structure Content into `.mdx` files:**
    *   For Chapter 1 (Overview), Chapter 3 (Rules), and Chapter 4 (Creation), review the corresponding source markdown files in `ACKS_II_Content/Monstrous_Manual/`.
    *   Organize and reformat this content into their respective primary `.mdx` files (`src/content/monsters/overview.mdx`, `src/content/monsters/rules.mdx`, `src/content/monsters/creation.mdx`). This will likely involve manual editing and structuring.
2.  **Cross-Referencing and Internal Linking:**
    *   Begin adding internal links between monster pages (within MDX) and relevant rules or overview sections.
3.  **Image Integration (Initial Pass):**
    *   If image file details are available from the designer, start incorporating image placeholders or actual images into the `.mdx` files. Implement basic image display, potentially using an MDX image component.

### Phase 4: Refinement & Review

1.  **Styling:** Apply consistent styling to monster pages, stat cards (MDX component), and chapter content.
2.  **Navigation Refinements:** Ensure smooth navigation within the monster manual section, handled by Next.js routing and links within `.mdx` files.
3.  **Review and Testing:** Thoroughly review all content for accuracy, formatting, and broken links. Test on various devices.
4.  **Address "Open Questions" fully** (e.g., finalize image integration strategy).

## IV. Open Questions & Considerations

1.  **MDX Component Design:**
    *   Final design and props for the `CombatStatCard` MDX component.
    *   Need for other reusable MDX components (e.g., for specific table formats, callouts).
2.  **Image Handling & Optimization:**
    *   Strategy for storing, referencing, and optimizing monster images once available.
    *   How to handle missing images gracefully.
    *   User interface for uploading/associating images if that becomes a feature.
3.  **Inter-Book Linking Strategy:**
    *   How will monster entries link to relevant rules in the Rulebook or concepts in the Judges Journal (and vice-versa)? This will be important for the "advanced wiki."
4.  **"Other" Category Refinement:**
    *   As we process all monsters, the "Other" category under Monster Listings should be minimized. Most monsters should fit into official ACKS types. If truly unique monsters exist that don't fit, "Other" can be their home. This will be an ongoing assessment during Phase 2.
5.  **Source File Accuracy & Updates:**
    *   The plan relies on the content within `ACKS_II_Content/Monstrous_Manual/` being the definitive source for this reorganization. Any updates to these files during the process will need to be managed carefully. It's assumed these files are more granular and potentially more up-to-date for individual entries than the very large "Ready for Layout" main book files for this specific task of extracting individual monster data. Chapters 1, 3, and 4 will also lean heavily on these granular files.
6.  **MDX Setup in Next.js:**
    *   Ensure the Next.js project is properly configured to process `.mdx` files, including any remark/rehype plugins needed for features like GFM (GitHub Flavored Markdown), slug generation for headings, custom components, etc. This involves setting up `@next/mdx` in `next.config.mjs` (or `.js`).
    *   Determine where `.mdx` content files will live (e.g., alongside `page.tsx` files, or in a dedicated `src/content/` directory) and how they will be imported/loaded by the `page.tsx` route files. (Current plan leans towards `src/content/`).

---
*This plan provides a detailed roadmap. Specific implementation details may evolve as development progresses.* 