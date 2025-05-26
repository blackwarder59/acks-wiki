# Git Workflow Reference for ACKS II Wiki

## 🎯 Overview

This is a comprehensive reference document for Git workflow procedures. For quick access during development, see the **Cursor rule**: [git_workflow.mdc](mdc:.cursor/rules/git_workflow.mdc)

> **💡 Quick Access**: The essential Git workflow is available as a Cursor rule for instant access during development. This document provides additional context and detailed procedures.

This guide establishes a safe development workflow with rollback capabilities for the ACKS II Wiki project. Every successful implementation will be committed to Git, allowing us to rollback if we encounter unsolvable errors.

## 📋 Repository Information

- **Repository**: https://github.com/blackwarder59/acks-wiki.git
- **Main Branch**: `main`
- **Current Status**: Initial project setup complete (651 files, 147,623 lines)

## 🔄 Development Workflow

### 1. Before Starting Work

```bash
# Always start with a clean, up-to-date repository
git status                    # Check current status
git pull origin main         # Get latest changes
```

### 2. Working on Tasks

```bash
# Create a feature branch for each task
git checkout -b task-1-project-setup

# Work on the task following TaskMaster specifications
# Make incremental commits as you progress
git add .
git commit -m "feat(task-1): implement basic Next.js setup

- Initialize Next.js 14 with TypeScript and Tailwind
- Configure project structure
- Add basic configuration files"

# Continue working and committing
git add .
git commit -m "feat(task-1): add content processing utilities

- Create TypeScript interfaces for ACKS content
- Add markdown parsing functions
- Implement basic validation"
```

### 3. After Successful Implementation

```bash
# When task is complete and tested
git checkout main
git merge task-1-project-setup
git push origin main

# Update TaskMaster status
# Mark task as complete in TaskMaster
```

### 4. Rollback Strategies

#### Quick Rollback (Last Commit)
```bash
# Undo the last commit but keep changes
git reset --soft HEAD~1

# Undo the last commit and discard changes
git reset --hard HEAD~1
```

#### Rollback to Specific Commit
```bash
# View commit history
git log --oneline

# Rollback to specific commit (keep changes)
git reset --soft <commit-hash>

# Rollback to specific commit (discard changes)
git reset --hard <commit-hash>
```

#### Create Rollback Branch
```bash
# Create a new branch from a previous commit
git checkout -b rollback-to-working-state <commit-hash>
git push origin rollback-to-working-state
```

## 🏷️ Commit Message Convention

We use conventional commits for clear history:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples:
```bash
git commit -m "feat(content): add monster data processing pipeline"
git commit -m "fix(search): resolve fuzzy search performance issue"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(components): extract reusable search component"
```

## 🚨 Emergency Procedures

### If Something Breaks Badly

1. **Stop immediately** - Don't make more changes
2. **Check Git status**: `git status`
3. **Stash current changes**: `git stash`
4. **Return to last working state**: `git reset --hard HEAD`
5. **Or rollback to specific commit**: `git reset --hard <last-working-commit>`

### If You Need to Recover Stashed Work

```bash
# List stashes
git stash list

# Apply most recent stash
git stash apply

# Apply specific stash
git stash apply stash@{0}

# Drop stash after applying
git stash drop
```

## 📊 Branch Strategy

### Main Branch (`main`)
- Always deployable
- Only merge completed, tested features
- Protected branch (no direct pushes)

### Feature Branches
- One branch per TaskMaster task
- Naming: `task-<number>-<short-description>`
- Examples:
  - `task-1-project-setup`
  - `task-2-content-processing`
  - `task-3-search-system`

### Hotfix Branches
- For urgent fixes
- Naming: `hotfix-<description>`
- Merge directly to main after testing

## 🔍 Monitoring Progress

### Check Repository Status
```bash
# View current branch and status
git status

# View commit history
git log --oneline --graph

# View all branches
git branch -a

# View remote status
git remote -v
```

### Sync with Remote
```bash
# Push current branch
git push origin <branch-name>

# Push and set upstream
git push -u origin <branch-name>

# Pull latest changes
git pull origin main
```

## 🎯 TaskMaster Integration

### After Each Task Completion

1. **Test the implementation thoroughly**
2. **Commit all changes with descriptive message**
3. **Push to GitHub**
4. **Update TaskMaster task status to 'done'**
5. **Move to next task**

### Commit Template for Tasks
```bash
git commit -m "feat(task-<id>): <task-title>

- <key implementation detail 1>
- <key implementation detail 2>
- <key implementation detail 3>

Closes: Task <id>
Testing: <brief testing notes>"
```

## 🛡️ Safety Checklist

Before each commit:
- [ ] Code runs without errors
- [ ] No console errors or warnings
- [ ] Basic functionality tested
- [ ] No sensitive data in commit
- [ ] Commit message is descriptive

Before each push:
- [ ] All tests pass (when we have them)
- [ ] Code is properly formatted
- [ ] Documentation updated if needed
- [ ] TaskMaster status updated

## 📝 Recovery Documentation

Keep track of:
- Last known working commit hash
- Current task being worked on
- Any experimental changes in progress
- Dependencies or environment changes

### Quick Reference Commands

```bash
# Emergency reset to last working state
git reset --hard HEAD

# View last 10 commits
git log --oneline -10

# Create backup branch before risky changes
git checkout -b backup-$(date +%Y%m%d-%H%M%S)

# Return to main and get latest
git checkout main && git pull origin main
```

---

**Remember**: When in doubt, commit early and commit often. It's easier to rollback small changes than to lose hours of work! 