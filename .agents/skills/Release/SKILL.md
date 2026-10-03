---
name: Release
description: Orchestrates a full release cycle, syncing branches, updating the README, and publishing a new tagged version to the main branch.
---

# Release Skill

Use this skill when the user requests to release the project or publish a new version. This skill orchestrates a complete release workflow, ensuring branches are in sync, documentation is updated, and a new version is tagged and pushed.

## Workflow

Follow these steps exactly to complete a release:

### 1. Pre-flight Checks
- Check the git status: `git status`.
- Ensure there are no uncommitted changes. If there are, ask the user to commit or stash them before proceeding.

### 2. Sync Development Branch
- Checkout the development branch: `git checkout development`
- Pull latest changes with rebase: `git pull --rebase origin development`

### 3. Update README
- The README might need to reflect the latest state of the project.
- Read and follow the instructions from the `CreateUpdateReadme` skill (`.agents/skills/CreateUpdateReadme/SKILL.md`). You may invoke a subagent to perform this task if appropriate.
- After the README update is completed, check for changes: `git status`.
- If `README.md` was modified, commit it:
  - `git add README.md`
  - `git commit -m "docs: update README for release"`

### 4. Sync and Merge to Main
- Checkout the main branch: `git checkout main`
- Pull latest changes with rebase: `git pull --rebase origin main`
- Merge the development branch into main: `git merge development`

### 5. Versioning
- List existing version tags to determine the next version: `git tag --list 'v*' --sort=-v:refname`
- If no tags exist, start with version `v1.0.0`.
- If tags exist, determine the appropriate version bump (e.g., if current is `v1.0.0`, next might be `v1.1.0` or `v1.0.1` based on the changes, or just ask the user). If the user didn't specify, use a minor version bump (e.g. `v1.0.0` -> `v1.1.0`).
- Create the annotated tag: `git tag -a v<VERSION> -m "Release v<VERSION>"` (e.g., `git tag -a v1.0.0 -m "Release v1.0.0"`)

### 6. Publish Release
- Push the main branch: `git push origin main`
- Push the new tags: `git push origin --tags`
- Finally, checkout development again: `git checkout development`
- Push development to ensure any README changes are on the remote: `git push origin development`

### 7. Completion
- Summarize the release for the user, listing the new version tag and confirming that the main branch has been successfully updated and pushed.
