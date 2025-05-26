# ACKS II Wiki Pipeline Visualization

## 📊 Complete Development & Deployment Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ACKS II WIKI PIPELINE                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CONTENT       │    │   PROCESSING    │    │   DEVELOPMENT   │    │   PRODUCTION    │
│   (Your Files)  │───▶│   (Scripts)     │───▶│   (Next.js)     │───▶│   (Live Site)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │                       │
         ▼                       ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ • 620 MD files  │    │ • Parse content │    │ • React pages   │    │ • Vercel hosting│
│ • 292 monsters  │    │ • Extract data  │    │ • Search engine │    │ • Global CDN    │
│ • 300+ spells   │    │ • Create JSON   │    │ • Mobile UI     │    │ • Auto scaling  │
│ • 20+ classes   │    │ • Cross-refs    │    │ • Dark mode     │    │ • SSL/HTTPS     │
│ • Images/tables │    │ • Validation    │    │ • Offline mode  │    │ • Custom domain │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔄 Daily Workflow (After Initial Setup)

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   EDIT      │    │    TEST     │    │   DEPLOY    │    │    LIVE     │
│   CODE      │───▶│   LOCALLY   │───▶│   TO WEB    │───▶│   UPDATES   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                    │                    │                    │
      ▼                    ▼                    ▼                    ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ • Fix bugs  │    │ • Run tests │    │ • Git push  │    │ • Users see │
│ • Add pages │    │ • Check UI  │    │ • Auto build│    │   changes   │
│ • Update    │    │ • Verify    │    │ • Deploy    │    │ • Monitor   │
│   content   │    │   search    │    │   (3 mins)  │    │   metrics   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## 💰 Cost Breakdown (Monthly)

```
┌─────────────────────────────────────────────────────────────────┐
│                        HOSTING COSTS                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FREE TIER (Recommended for Start)                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Vercel Free:        $0/month                            │   │
│  │ • 100GB bandwidth                                       │   │
│  │ • Unlimited sites                                       │   │
│  │ • SSL certificates                                      │   │
│  │ • Global CDN                                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  OPTIONAL UPGRADES                                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Custom Domain:      $12/year (ackswiki.com)            │   │
│  │ Analytics Pro:      $0 (Vercel includes basic)         │   │
│  │ Extra Bandwidth:    $20/month (if >100GB)              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  TOTAL MONTHLY COST: $0-1 (first year)                         │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Performance Expectations

```
┌─────────────────────────────────────────────────────────────────┐
│                      SITE PERFORMANCE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  LOADING SPEEDS                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ First Visit:        < 2 seconds                         │   │
│  │ Return Visits:      < 0.5 seconds                       │   │
│  │ Search Results:     < 100ms                             │   │
│  │ Page Navigation:    Instant                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  CAPACITY                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Concurrent Users:   1000+ (auto-scaling)                │   │
│  │ Content Volume:     620 pages + search index            │   │
│  │ Mobile Support:     100% responsive                     │   │
│  │ Offline Mode:       Works after first visit             │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠️ Technology Stack Explained

```
┌─────────────────────────────────────────────────────────────────┐
│                     TECH STACK LAYERS                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FRONTEND (What Users See)                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ React Components:   Monster cards, search bars          │   │
│  │ Tailwind CSS:       Beautiful, responsive styling       │   │
│  │ TypeScript:         Fewer bugs, better code             │   │
│  │ Next.js:            Fast loading, SEO optimization      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  BACKEND (Data Processing)                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Content Parser:     Markdown → JSON conversion          │   │
│  │ Search Engine:      Fuse.js for fuzzy search            │   │
│  │ Cross-References:   Automatic linking system            │   │
│  │ Static Generation:  Pre-built pages for speed           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  HOSTING (Infrastructure)                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Vercel Platform:    Automatic deployments               │   │
│  │ Global CDN:         Fast loading worldwide              │   │
│  │ Edge Functions:     Server logic at the edge            │   │
│  │ GitHub Integration: Version control + auto-deploy       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 📱 User Experience Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER JOURNEY                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FIRST-TIME VISITOR                                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1. Lands on homepage                                    │   │
│  │ 2. Sees search bar + content categories                 │   │
│  │ 3. Searches for "owlbear" or browses monsters           │   │
│  │ 4. Finds detailed stat block with cross-references     │   │
│  │ 5. Clicks linked spells/abilities                       │   │
│  │ 6. Bookmarks useful content                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  RETURNING USER (GM DURING GAME)                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1. Opens site on phone                                  │   │
│  │ 2. Instantly loads (cached)                             │   │
│  │ 3. Quick search for monster stats                       │   │
│  │ 4. Finds info in < 5 seconds                            │   │
│  │ 5. Game continues smoothly                              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 🔧 Development Environment Setup

```bash
# Prerequisites Check
node --version     # Need v18+ (you probably have this)
npm --version      # Comes with Node.js
git --version      # Built into macOS

# Project Creation (5 minutes)
npx create-next-app@latest acks-wiki --typescript --tailwind --eslint --app
cd acks-wiki
npm install fuse.js lucide-react

# Development Server
npm run dev        # Site runs at http://localhost:3000

# Production Build
npm run build      # Creates optimized version
npm run start      # Tests production build locally

# Deployment
git init
git add .
git commit -m "Initial commit"
# Push to GitHub, connect to Vercel = LIVE SITE!
``` 