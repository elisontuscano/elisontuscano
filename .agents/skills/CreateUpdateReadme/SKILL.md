---
name: CreateUpdateReadme
description: >-
  Creates or updates a modern, fancy README file for the portfolio repository to make it look professional, senior engineer level, tailored for a personal website.
---

# CreateUpdateReadme Skill

This skill instructs the agent to create or update the repository's `README.md` file to make it look modern, visually appealing, and highly professional. Since this repository hosts a personal portfolio website, the README should focus on showcasing the project's architecture, tech stack, and design rather than installation instructions for other users.

## Principles of a Modern Portfolio README

When executing this skill, follow these principles and include the following sections to craft an impressive `README.md`:

### 1. Visual Hero Section
- **Banner/Header**: Use a `<p align="center">` block with an appealing banner image or screenshot of the portfolio. 
- **Headline**: A centered `<h3>` clearly stating whose portfolio it is and what the project represents.
- **Description**: A short, centered paragraph explaining the core purpose of the site.
- **Quick Links**: A centered `<p>` containing bolded links separated by `&nbsp;·&nbsp;` (e.g., Live Website, Author's LinkedIn, Architecture Spec).
- **Badges**: A centered `<p>` with `shields.io` badges for the tech stack (e.g., React, TypeScript, Vite) and deployment status.

### 2. About the Project
- A concise summary of the portfolio's design philosophy (e.g., responsive, data-driven, fast).
- Showcase key features or sections of the website (e.g., Projects, Blog, Papershelf) using a clean markdown table or bullet points. Include small screenshots if available.

### 3. Tech Stack & Architecture
- Highlight the technologies used in a clean, scannable format.
- Mention the architecture (e.g., Static site, no backend, JSON data-driven content).
- If applicable, include a small mermaid diagram illustrating the build or deployment process.

### 4. Local Development
- Provide minimal, clean instructions for running the project locally for development purposes.
- Use code blocks for standard commands (e.g., `npm install`, `npm run dev`, `npm test`).

### 5. Deployment
- Briefly explain how the site is deployed (e.g., built with Vite and deployed to GitHub Pages).

### Formatting Rules
- Use HTML tags like `<p align="center">` and `<table>` for advanced layout where standard markdown is insufficient.
- Use collapsible `<details>` tags if there is dense technical information (like project structure) to keep the main view clean.
- Keep the tone professional, welcoming, and concise.

## Workflow

1. Read the project's source code, existing `README.md`, or the architecture spec (`dev/spec/001-architecture-design.md`) to understand the project deeply.
2. Identify key visual assets (logos, screenshots of the site) in the repository to include.
3. Generate a comprehensive, beautiful `README.md` using the structure above.
4. Replace the existing `README.md` or write the new content.
5. Provide a summary of the enhancements to the user.
