# ACKS II Wiki Deployment Guide
*Complete guide from development to production*

## 🎯 Overview: What We're Building

Your ACKS II wiki will be a **static website** that:
- Loads instantly (under 2 seconds)
- Works on phones, tablets, and computers
- Has powerful search across all content
- Works offline after first visit
- Costs almost nothing to host

## 🏗️ The Complete Pipeline

### Phase 1: Development Setup (Day 1)
```bash
# 1. Create the project
npx create-next-app@latest acks-wiki --typescript --tailwind --eslint --app
cd acks-wiki

# 2. Install additional dependencies
npm install fuse.js lucide-react @types/node
npm install -D @types/fuse.js
```

### Phase 2: Content Processing (Days 2-3)
```typescript
// This converts your markdown files to JSON data
// We'll build this together using Cursor AI

// Example: Process monsters
interface Monster {
  id: string;
  name: string;
  type: string[];
  hitDice: string;
  armorClass: number;
  // ... all the ACKS II monster data
}

// The processor reads your split files and creates:
// - data/monsters.json (292 monsters)
// - data/spells.json (300+ spells) 
// - data/classes.json (20+ classes)
// - data/cross-references.json (all the links)
```

### Phase 3: Website Development (Days 4-6)
```typescript
// We'll create components like:
<MonsterCard monster={monster} />     // Display monster stats
<SpellList spells={spells} />         // Show spell lists
<SearchBar onSearch={handleSearch} /> // Universal search
<Navigation />                        // Mobile-friendly menu
```

### Phase 4: Deployment (Day 7)

#### Option A: Vercel (Recommended - FREE)
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy (one command!)
vercel

# That's it! Your site is live at: https://acks-wiki-yourname.vercel.app
```

#### Option B: Netlify (Alternative - Also FREE)
```bash
# 1. Build the site
npm run build

# 2. Drag the 'out' folder to netlify.com
# Your site is live!
```

## 🌐 How Hosting Works (Simple Explanation)

### Traditional Hosting vs Modern Hosting

**Old Way (Complex):**
- Rent a server ($50+/month)
- Install software
- Manage security updates
- Handle traffic spikes
- Worry about downtime

**Modern Way (What We'll Use):**
- Upload your files to Vercel/Netlify
- They handle everything automatically
- Scales to millions of users
- 99.9% uptime guaranteed
- **FREE for most projects**

### Why Vercel is Perfect for Us

1. **Zero Configuration**: Just connect your GitHub repo
2. **Automatic Deployments**: Push code → site updates automatically
3. **Global CDN**: Fast loading worldwide
4. **Free Tier**: Generous limits for personal projects
5. **Custom Domains**: Use your own domain name

## 📁 Project Structure (What We'll Build)

```
acks-wiki/
├── public/                    # Static files (images, icons)
│   ├── monsters/             # Monster images
│   └── favicon.ico           # Site icon
├── src/
│   ├── app/                  # Next.js 14 app directory
│   │   ├── layout.tsx        # Main layout
│   │   ├── page.tsx          # Homepage
│   │   ├── monsters/         # Monster pages
│   │   ├── spells/           # Spell pages
│   │   └── classes/          # Class pages
│   ├── components/           # Reusable UI components
│   │   ├── MonsterCard.tsx   # Monster display
│   │   ├── SearchBar.tsx     # Search functionality
│   │   └── Navigation.tsx    # Site navigation
│   ├── data/                 # Processed ACKS II content
│   │   ├── monsters.json     # All 292 monsters
│   │   ├── spells.json       # All spells
│   │   └── classes.json      # All classes
│   └── lib/                  # Utility functions
│       ├── search.ts         # Search engine
│       └── content.ts        # Content helpers
├── scripts/                  # Build scripts
│   └── process-content.ts    # Convert markdown to JSON
└── package.json             # Project dependencies
```

## 🔄 Development Workflow

### Daily Development Process
```bash
# 1. Start development server
npm run dev
# Your site runs at http://localhost:3000

# 2. Make changes to code
# 3. See changes instantly in browser
# 4. When ready, deploy:
git add .
git commit -m "Add monster search feature"
git push
# Vercel automatically deploys the update!
```

### Content Update Process
```bash
# When you want to add new ACKS II content:
# 1. Add new markdown files to ACKS_II_Content/
# 2. Run the content processor:
npm run process-content

# 3. Deploy the update:
git add .
git commit -m "Add new monsters from supplement"
git push
# Site updates automatically!
```

## 💰 Costs (Spoiler: Almost Free!)

### Free Tier Limits (More Than Enough for ACKS II Wiki)
- **Vercel Free**: 100GB bandwidth/month, unlimited sites
- **Domain**: $10-15/year (optional - you get a free subdomain)
- **Total Monthly Cost**: $0-1.25

### When You Might Pay
- Custom domain: ~$12/year (like ackswiki.com)
- Heavy traffic: 100GB+ bandwidth/month (unlikely for RPG wiki)
- Advanced features: Analytics, forms (not needed initially)

## 🚀 Deployment Steps (Detailed)

### Step 1: Prepare Your Code
```bash
# Make sure everything works locally
npm run build
npm run start
# Test the production build
```

### Step 2: Set Up Version Control
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial ACKS II wiki"

# Create GitHub repository (free)
# Push your code to GitHub
git remote add origin https://github.com/yourusername/acks-wiki.git
git push -u origin main
```

### Step 3: Deploy to Vercel
```bash
# Option A: Command line
vercel

# Option B: Web interface
# 1. Go to vercel.com
# 2. Sign up with GitHub
# 3. Import your repository
# 4. Click "Deploy"
```

### Step 4: Configure Domain (Optional)
```bash
# If you buy a custom domain:
# 1. Add domain in Vercel dashboard
# 2. Update DNS settings (Vercel provides instructions)
# 3. SSL certificate is automatic
```

## 🔧 Environment Setup

### Required Software
```bash
# 1. Node.js (JavaScript runtime)
# Download from nodejs.org - get the LTS version

# 2. Git (version control)
# Download from git-scm.com

# 3. Code editor (you already have Cursor!)

# 4. Terminal/Command line (built into macOS)
```

### Verification Commands
```bash
# Check if everything is installed
node --version    # Should show v18+ or v20+
npm --version     # Should show 9+ or 10+
git --version     # Should show 2.30+
```

## 📊 Monitoring & Analytics

### Built-in Monitoring (Free)
- **Vercel Analytics**: Page views, performance metrics
- **Lighthouse Scores**: Automatic performance testing
- **Error Tracking**: Automatic error reporting

### Optional Analytics
- **Google Analytics**: Detailed user behavior (free)
- **Plausible**: Privacy-focused analytics ($9/month)

## 🔄 Continuous Deployment Pipeline

### Automatic Workflow
```
Code Change → Git Push → Vercel Build → Live Site Update
     ↓            ↓           ↓            ↓
  (2 minutes)  (instant)  (2-3 minutes)  (instant)
```

### Branch Strategy
```bash
# main branch: Production site
# dev branch: Testing new features
# feature branches: Individual features

# Workflow:
git checkout -b add-spell-search
# Make changes
git push origin add-spell-search
# Create pull request
# Merge to main → automatic deployment
```

## 🛠️ Maintenance & Updates

### Regular Tasks (Monthly)
- Update dependencies: `npm update`
- Check performance: Lighthouse audit
- Review analytics: User behavior insights
- Content updates: New ACKS II material

### Backup Strategy
- Code: Automatically backed up on GitHub
- Content: Version controlled with git
- Site: Vercel keeps deployment history
- **You can't lose your work!**

## 🎯 Success Metrics

### Week 1 Goals
- [ ] Site loads in under 2 seconds
- [ ] All 620 content files accessible
- [ ] Search works across all content
- [ ] Mobile-friendly design
- [ ] Live on custom domain

### Month 1 Goals
- [ ] 100+ daily active users
- [ ] 90+ Lighthouse performance score
- [ ] Community feedback integration
- [ ] SEO optimization complete

## 🆘 Troubleshooting Common Issues

### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Issues
```bash
# Check Vercel logs
vercel logs
# Redeploy
vercel --prod
```

### Performance Issues
```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

## 🎉 Going Live Checklist

### Pre-Launch
- [ ] All content processed correctly
- [ ] Search functionality working
- [ ] Mobile responsive design
- [ ] Cross-references linking properly
- [ ] Performance optimized (Lighthouse 90+)
- [ ] Error handling implemented

### Launch Day
- [ ] Deploy to production
- [ ] Test on multiple devices
- [ ] Share with ACKS II community
- [ ] Monitor for issues
- [ ] Collect user feedback

### Post-Launch
- [ ] Monitor analytics
- [ ] Fix any reported issues
- [ ] Plan next features
- [ ] Community engagement

---

## 🤝 Next Steps

1. **Let's start with the project setup** - I'll help you create the Next.js project
2. **Process your content** - Convert your split markdown files to JSON
3. **Build the components** - Create the search and display functionality
4. **Deploy to Vercel** - Get your site live online
5. **Iterate based on feedback** - Improve based on user needs

Ready to start building? We can begin with setting up the Next.js project and processing your ACKS II content! 