# ACKS II Wiki

A comprehensive, searchable wiki for the Adventurer Conqueror King System II (ACKS II) tabletop RPG.

## 🎯 Project Overview

This project transforms the ACKS II rulebooks, monster manual, and judge's journal into an interactive, mobile-friendly wiki with powerful search capabilities and cross-referenced content.

### Features

- **📱 Mobile-First Design**: Optimized for use during game sessions
- **🔍 Powerful Search**: Real-time search across all content with filters
- **🔗 Cross-References**: Automatic linking between related content
- **🌙 Dark Mode**: Perfect for low-light gaming environments
- **⚡ Fast Performance**: Sub-2-second load times, works offline
- **📊 Comprehensive Content**: 620+ pages covering rules, monsters, spells, classes

## 🏗️ Technology Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Search**: Fuse.js for client-side fuzzy search
- **Deployment**: Vercel
- **Content**: Processed from 620 markdown files
- **Project Management**: TaskMaster AI

## 📊 Content Statistics

- **Total Files**: 620 structured markdown files
- **Monsters**: 292 individual creatures
- **Spells**: 300+ spells across all classes
- **Classes**: 20+ character classes
- **Rules**: Complete core rules and optional systems

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (you have v23.11.0 ✅)
- Git (you have v2.47.0 ✅)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/blackwarder59/acks-wiki.git
cd acks-wiki

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Content Processing
npm run process-content    # Process ACKS II markdown files
npm run validate-content   # Validate processed content

# TaskMaster Integration
npm run tasks              # View current tasks
npm run next-task          # Show next task to work on
```

## 📁 Project Structure

```
acks-wiki/
├── ACKS_II_Content/           # Source markdown files (620 files)
│   ├── Rulebook/             # Core rules (118 files)
│   ├── Judges_Journal/       # GM tools (174 files)
│   └── Monstrous_Manual/     # Monsters (327 files)
├── src/
│   ├── app/                  # Next.js 14 app directory
│   ├── components/           # React components
│   ├── data/                 # Processed JSON content
│   └── lib/                  # Utility functions
├── tasks/                    # TaskMaster project management
├── scripts/                  # Build and processing scripts
└── public/                   # Static assets
```

## 🔄 Development Workflow

This project uses TaskMaster for organized development:

1. **Check Current Tasks**: `npm run tasks`
2. **Get Next Task**: `npm run next-task`
3. **Work on Task**: Follow task details and acceptance criteria
4. **Test Implementation**: Run tests and verify functionality
5. **Commit Changes**: Git commit with descriptive message
6. **Update Task Status**: Mark task as complete
7. **Move to Next Task**: Repeat process

### Git Workflow

We use a structured Git workflow with TaskMaster integration and rollback safety. See [git_workflow.mdc](mdc:.cursor/rules/git_workflow.mdc) for complete guidelines.

```bash
# TaskMaster-integrated workflow
git checkout -b task-<id>-<description>
# Work on task, commit frequently
git add .
git commit -m "feat(task-<id>): implement feature X"
# Test, merge, and update TaskMaster
git checkout main && git merge task-<id>-<description>
git push origin main
```

## 📋 Current Development Status

### Completed Tasks
- [x] Project initialization with TaskMaster
- [x] Content splitting and organization (620 files)
- [x] Git repository setup
- [x] Task complexity analysis

### In Progress
- [ ] Task 1: Project Setup and Foundation

### Upcoming Tasks
- [ ] Task 2: Content Processing System (6 subtasks)
- [ ] Task 3: Search and Navigation System (5 subtasks)
- [ ] Task 4: Content Display Components
- [ ] Task 5: Performance Optimization (6 subtasks)
- [ ] Task 6: Deployment and Quality Assurance

## 🎯 Performance Targets

- **Load Time**: < 2 seconds on 3G
- **Search Response**: < 100ms
- **Bundle Size**: < 500KB
- **Lighthouse Score**: 90+ (Performance, Accessibility, SEO)
- **Mobile Support**: 100% responsive

## 🧪 Testing Strategy

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: Content processing and search functionality
- **E2E Tests**: Critical user journeys
- **Performance Tests**: Load times and bundle analysis
- **Accessibility Tests**: Screen reader and keyboard navigation

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Basic functionality on older browsers

## 🚀 Deployment

The application will be deployed on Vercel with automatic deployments:

- **Repository**: https://github.com/blackwarder59/acks-wiki.git
- **Production**: [Coming Soon - will be deployed after Task 6]
- **Preview**: Automatic preview deployments for pull requests
- **Analytics**: Built-in Vercel analytics

## 🤝 Contributing

1. Check current tasks with TaskMaster
2. Pick up the next available task
3. Create a feature branch
4. Implement following task specifications
5. Test thoroughly
6. Submit pull request
7. Update task status

## 📄 License

This project is for educational and community use. ACKS II content is owned by Autarch LLC.

## 🔗 Links

- **ACKS II Official**: [Autarch LLC](https://www.autarch.co/)
- **TaskMaster**: Project management via AI
- **Vercel**: Deployment platform
- **Next.js**: React framework

## 📞 Support

For issues or questions:
1. Check TaskMaster task details
2. Review project documentation
3. Create GitHub issue
4. Contact project maintainer

---

**Built with ❤️ for the ACKS II community** 