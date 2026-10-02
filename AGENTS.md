# AGENTS.md — elisontuscano.github.io

> Project-level rules and context for all AI agents working in this repository.

---

## Project Overview

This is **Elison Tuscano's** personal portfolio website — a static, responsive
site hosted on **GitHub Pages** at `elisontuscano.github.io`. It is built with
**React 18+ (Vite)**, **TypeScript**, and **CSS Modules**. There is no backend;
all content is driven by static JSON and Markdown files.

### Key URLs

| What            | URL                                              |
|-----------------|--------------------------------------------------|
| Live site       | https://elisontuscano.github.io                  |
| Repository      | https://github.com/elisontuscano/elisontuscano   |
| Spec (primary)  | `dev/spec/001-architecture-design.md`             |

---

## Tech Stack

| Layer               | Technology                                      |
|---------------------|-------------------------------------------------|
| Framework           | React 18+ (Vite)                                |
| Language            | TypeScript (strict)                             |
| Styling             | CSS Modules + CSS custom properties             |
| Routing             | React Router v6 (HashRouter)                    |
| Icons               | react-icons (Feather + FontAwesome subsets)      |
| Markdown            | react-markdown + remark-gfm                     |
| Syntax Highlighting | rehype-highlight or prism-react-renderer         |
| Linting             | ESLint + Prettier                               |
| Build / Deploy      | Vite → `npm run build` → gh-pages npm package   |

---

## Repository Structure

```
elisontuscano/
├── .agents/                           # Agent customizations (skills, rules)
│   └── skills/
│       └── feature-implementation/    # Skill: end-to-end feature implementation
├── dev/
│   └── spec/                          # Requirement & design specifications
│       └── 001-architecture-design.md
├── src/
│   ├── attachments/                   # Static assets (resume PDF, etc.)
│   │   └── Elison_Tuscano_resume.pdf
│   ├── website/                       # React frontend source code
│   │   ├── public/                    # Vite public assets (favicon, OG image, resume copy)
│   │   ├── src/                       # React source
│   │   │   ├── main.tsx               # Entry point
│   │   │   ├── App.tsx                # Router + layout
│   │   │   ├── theme/                 # ThemeContext, CSS variables, global styles
│   │   │   ├── components/            # Reusable UI components
│   │   │   │   ├── Layout/            # Header, Footer, ScrollProgress, Layout
│   │   │   │   ├── Home/              # Hero, About, Experience, Skills, Education, etc.
│   │   │   │   ├── Projects/          # ProjectCard, ProjectGrid
│   │   │   │   ├── Blogs/             # BlogCard, BlogList, BlogPost
│   │   │   │   ├── Papershelf/        # PaperCard, PaperList
│   │   │   │   └── common/            # SocialPill, Card, ThemeToggle, TypingAnimation, etc.
│   │   │   ├── pages/                 # Page-level components (HomePage, ProjectsPage, etc.)
│   │   │   ├── data/                  # Static JSON content files
│   │   │   ├── content/blogs/         # Markdown blog posts
│   │   │   ├── hooks/                 # Custom React hooks
│   │   │   └── types/                 # TypeScript interfaces
│   │   ├── index.html                 # Vite HTML entry
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── blog/                          # Blog content in Markdown (future)
│   └── tests/                         # Unit and integration tests
├── LICENSE
└── README.md
```

### Directory Purposes

| Directory           | Purpose                                                         |
|---------------------|-----------------------------------------------------------------|
| `dev/spec/`         | All specifications and requirement documents live here          |
| `src/attachments/`  | Static attachments like resume PDFs                             |
| `src/website/`      | The React frontend application (Vite project root)             |
| `src/blog/`         | Markdown blog posts (future — content authored here)           |
| `src/tests/`        | Unit tests, integration tests, and test utilities              |
| `.agents/`          | Agent skills, rules, and customizations                        |

---

## Git Branching Strategy

| Branch        | Purpose                                                    |
|---------------|------------------------------------------------------------|
| `main`        | Production-ready code; deployed to GitHub Pages            |
| `development` | Integration branch; all feature branches merge here first  |
| `feature/*`   | Short-lived branches for individual features               |

### Workflow

1. All new work branches off `development`.
2. Feature branches are named `feature/<short-description>`.
3. PRs target `development` and require code review.
4. `development` is merged to `main` for production releases.

---

## Coding Conventions

### TypeScript

- **Strict mode** enabled (`"strict": true` in `tsconfig.json`).
- Use **interfaces** over `type` aliases for object shapes.
- All exports should be **named** (no default exports except page components).
- Define shared types in `src/website/src/types/index.ts`.

### React

- **Functional components only** — no class components.
- Use **hooks** for state and side effects.
- Keep components focused — one responsibility per component.
- Data flows top-down via props; use Context for cross-cutting concerns (theme).

### CSS

- Use **CSS Modules** (`.module.css`) for component-scoped styles.
- Use **CSS custom properties** (defined in `src/website/src/theme/variables.css`) for all colors, spacing, and typography.
- Never hardcode colors — always reference `var(--token-name)`.
- Mobile-first approach: base styles for mobile, `@media (min-width: ...)` for larger screens.

### File Naming

- React components: `PascalCase.tsx` (e.g., `Hero.tsx`, `ProjectCard.tsx`)
- CSS Modules: `PascalCase.module.css` (e.g., `Hero.module.css`)
- Hooks: `camelCase.ts` prefixed with `use` (e.g., `useTheme.ts`)
- Data files: `kebab-case.json` (e.g., `experience.json`)
- Test files: `PascalCase.test.tsx` or `camelCase.test.ts`

### Commit Messages

Follow **Conventional Commits**:

```
feat: add user authentication endpoint
fix: handle null email in validation
test: add unit tests for auth service
chore: configure eslint rule for auth module
docs: update README with deployment steps
style: fix formatting in Hero component
refactor: extract typing animation logic to custom hook
```

---

## Testing

- **Test framework**: Vitest (recommended for Vite projects) or Jest.
- **Test location**: `src/tests/` for all test files.
- **Coverage**: Aim for meaningful coverage of logic, hooks, and utilities.
- **Naming**: `<ComponentOrModule>.test.tsx` or `<utility>.test.ts`.
- **All existing tests must pass** before any PR is merged.

### Running Tests

```bash
cd src/website
npm test                    # Run all tests
npm test -- --coverage      # Run with coverage report
```

---

## Linting & Formatting

- **ESLint**: Enforces code quality rules.
- **Prettier**: Enforces consistent formatting.
- **All lint errors must be resolved** before any PR is merged.

### Running Lint

```bash
cd src/website
npm run lint                # ESLint
npm run format:check        # Prettier check
npm run format              # Prettier fix
```

---

## Data Files

All content is driven by static JSON files in `src/website/src/data/`. To update
site content (experience, projects, skills, etc.), edit the relevant JSON file —
no component changes needed.

| File                  | Content                                |
|-----------------------|----------------------------------------|
| `profile.json`        | Name, titles, bio, social links        |
| `experience.json`     | Work experience entries                |
| `education.json`      | Education entries                      |
| `skills.json`         | Skills grouped by category             |
| `certifications.json` | Certifications list                    |
| `projects.json`       | Projects metadata                      |
| `papers.json`         | Papershelf entries                     |

---

## Pages & Routes

| Route              | Page Component    | Description              |
|--------------------|-------------------|--------------------------|
| `/#/`              | `HomePage`        | Home with all sections   |
| `/#/projects`      | `ProjectsPage`    | Projects grid            |
| `/#/blogs`         | `BlogsPage`       | Blog listing             |
| `/#/blogs/:slug`   | `BlogPostPage`    | Individual blog post     |
| `/#/papershelf`    | `PapershelfPage`  | Papers and notes         |

---

## Deployment

The site is deployed to GitHub Pages as a static build.

```bash
cd src/website
npm run build       # Build to dist/
npm run deploy      # Deploy to gh-pages branch
```

The `gh-pages` npm package pushes the `dist/` directory to the `gh-pages` branch
which GitHub Pages serves.

---

## Important Rules for Agents

1. **Always read the spec first.** Before implementing any feature, read the
   relevant spec in `dev/spec/`. The architecture design spec
   (`001-architecture-design.md`) is the source of truth for the website.

2. **Do not modify specs.** Specification files in `dev/spec/` are authored by
   the user. Agents must implement what the specs say, not modify them.

3. **All tests must pass.** Never submit code that breaks existing tests. If
   your change intentionally modifies behavior, update the affected tests and
   document why.

4. **All lint checks must pass.** Run ESLint and Prettier before considering
   any implementation complete.

5. **Feature branches only.** Never commit directly to `main` or `development`.
   Always create a `feature/*` branch from `development`.

6. **PR to `development`.** All pull requests target the `development` branch,
   never `main` directly.

7. **Keep PRs focused.** One feature per PR. Do not bundle unrelated changes.

8. **Preserve existing comments and documentation.** Do not remove comments or
   docstrings unless they are directly contradicted by your changes.

9. **Use the feature-implementation skill.** When implementing a feature from a
   spec, follow the `.agents/skills/feature-implementation/SKILL.md` workflow.

10. **No hardcoded content in components.** All display content comes from JSON
    data files. Components are generic and data-driven.
