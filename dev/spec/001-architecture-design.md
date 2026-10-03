# Architecture Design Spec — elisontuscano.github.io

> **Version:** 1.0  
> **Author:** Elison Tuscano  
> **Date:** 2026-10-02  
> **Status:** Draft  

---

## 1. Overview

A static, responsive personal portfolio website for **Elison Tuscano** hosted on **GitHub Pages** at `elisontuscano.github.io`. The site is built with **React** (via Vite), uses component-driven architecture, supports **dark/light mode**, and is fully static (no backend).

### 1.1 Design References

| Site | What to take from it |
|---|---|
| [tascano.github.io](https://tascano.github.io/) | Single-page resume layout, avatar + name + subtitle typing animation, "Download Resume" link, scroll progress bar, dark mode toggle (floating circle button), section reveal animations, card hover effects, skill pill styling, accent-color theming |
| [arpitbhayani.me](https://arpitbhayani.me/) | Multi-page navigation (Projects, Blogs, Papershelf), explore-card grid, dark mode toggle in navbar (sun/moon icon), recent-items lists with dates, clean typography, social pill links |

### 1.2 Goals

- Modern, clean, minimal design with smooth animations
- Mobile-first responsive layout
- Four pages: **Home**, **Projects**, **Blogs**, **Papershelf**
- Dark/light mode with persistence (localStorage)
- Downloadable resume PDF
- Content driven by static JSON/Markdown data files (easy to update)
- Deployed as a static build to GitHub Pages via `gh-pages` branch

---

## 2. Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | **React 18+** (with Vite) | Fast build, modern DX, component model |
| Language | **TypeScript** | Type safety, better IDE support |
| Styling | **CSS Modules** + CSS custom properties | Scoped styles, theme variables, no heavy CSS-in-JS runtime |
| Routing | **React Router v6** (HashRouter) | Client-side routing compatible with GitHub Pages (no server rewrites) |
| Icons | **react-icons** (Feather + FontAwesome subsets) | Tree-shakeable, lightweight |
| Markdown | **react-markdown** + **remark-gfm** | Render blog/paper notes from `.md` files |
| Syntax Highlighting | **rehype-highlight** or **prism-react-renderer** | Code blocks in blogs |
| Build / Deploy | **Vite** → `npm run build` → **gh-pages** npm package | Zero-config static deploy |
| Linting | **ESLint** + **Prettier** | Code quality |

### 2.1 No Backend

All data lives in static JSON and Markdown files inside the repo. No API calls, no CMS, no database.

---

## 3. Repository Structure

```
elisontuscano/
├── public/
│   ├── favicon.ico
│   ├── og-image.png                    # Open Graph preview image
│   └── Elison_Tuscano_resume.pdf       # Downloadable resume
├── src/
│   ├── main.tsx                        # Entry point
│   ├── App.tsx                         # Router + layout
│   ├── theme/
│   │   ├── ThemeContext.tsx             # Dark/light mode context + provider
│   │   ├── variables.css               # CSS custom properties (colors, spacing)
│   │   └── global.css                  # Reset, typography, base styles
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx              # Navbar with nav links + dark mode toggle
│   │   │   ├── Header.module.css
│   │   │   ├── Footer.tsx              # Footer with social links + copyright
│   │   │   ├── Footer.module.css
│   │   │   ├── ScrollProgress.tsx      # Top scroll progress bar
│   │   │   └── Layout.tsx              # Wraps Header + children + Footer
│   │   ├── Home/
│   │   │   ├── Hero.tsx                # Avatar, name, typing subtitle, resume link, contacts
│   │   │   ├── Hero.module.css
│   │   │   ├── AboutSection.tsx        # "About Me" paragraph
│   │   │   ├── ExperienceSection.tsx   # Work experience cards
│   │   │   ├── SkillsSection.tsx       # Skill pills grid
│   │   │   ├── EducationSection.tsx    # Education timeline
│   │   │   ├── CertificationsSection.tsx
│   │   │   └── SectionReveal.tsx       # Intersection Observer wrapper for animations
│   │   ├── Projects/
│   │   │   ├── ProjectCard.tsx         # Individual project card
│   │   │   ├── ProjectCard.module.css
│   │   │   └── ProjectGrid.tsx         # Grid of project cards
│   │   ├── Blogs/
│   │   │   ├── BlogCard.tsx            # Blog preview card with date
│   │   │   ├── BlogCard.module.css
│   │   │   ├── BlogList.tsx            # List of blog cards
│   │   │   └── BlogPost.tsx            # Full blog post renderer (Markdown)
│   │   ├── Papershelf/
│   │   │   ├── PaperCard.tsx           # Paper entry with link + notes
│   │   │   ├── PaperCard.module.css
│   │   │   └── PaperList.tsx           # List/grid of papers
│   │   └── common/
│   │       ├── SocialPill.tsx          # Reusable social link pill
│   │       ├── SectionTitle.tsx        # Section heading with animated underline
│   │       ├── Card.tsx                # Base card component with hover animation
│   │       ├── SkillBadge.tsx          # Individual skill tag
│   │       ├── ThemeToggle.tsx         # Sun/Moon toggle button
│   │       └── TypingAnimation.tsx     # Typing effect for subtitles
│   ├── pages/
│   │   ├── HomePage.tsx                # Composes Home/* sections
│   │   ├── ProjectsPage.tsx            # Composes Projects/*
│   │   ├── BlogsPage.tsx               # Blog listing
│   │   ├── BlogPostPage.tsx            # Individual blog post
│   │   └── PapershelfPage.tsx          # Composes Papershelf/*
│   ├── data/
│   │   ├── profile.json                # Name, title, bio, contacts, social links
│   │   ├── experience.json             # Work experience entries
│   │   ├── education.json              # Education entries
│   │   ├── skills.json                 # Skills by category
│   │   ├── certifications.json         # Certifications list
│   │   ├── projects.json               # Projects metadata
│   │   └── papers.json                 # Papershelf entries
│   ├── content/
│   │   └── blogs/                      # Markdown blog posts
│   │       ├── my-first-post.md
│   │       └── ...
│   ├── hooks/
│   │   ├── useTheme.ts                 # Custom hook for theme context
│   │   ├── useScrollProgress.ts        # Custom hook for scroll %
│   │   └── useIntersectionObserver.ts  # Custom hook for section reveal
│   └── types/
│       └── index.ts                    # Shared TypeScript interfaces
├── dev/
│   └── spec/
│       └── 001-architecture-design.md  # This file
├── attachments/
│   └── Elison_Tuscano_resume.pdf       # Source resume (copied to public/ at build)
├── index.html                          # Vite HTML entry
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Data Models (TypeScript Interfaces)

All data types are defined in `src/types/index.ts`.

```typescript
// ─── Profile ────────────────────────────────────────────────────
export interface SocialLink {
  platform: string;       // "github" | "linkedin" | "email" | "phone" | "twitter"
  url: string;
  label: string;          // Display label e.g. "elisontuscano"
  icon: string;           // Icon key from react-icons
}

export interface Profile {
  firstName: string;      // "Elison"
  lastName: string;       // "Tuscano"
  titles: string[];       // Rotating subtitles for typing animation
  location: string;       // "Sunnyvale, CA"
  avatarUrl: string;      // Path to avatar image
  bio: string;            // About me paragraph (HTML allowed)
  socialLinks: SocialLink[];
  resumeUrl: string;      // Path to downloadable PDF
}

// ─── Experience ─────────────────────────────────────────────────
export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;      // "Nov 2024"
  endDate: string;        // "Present" | "Aug 2024"
  techStack: string[];
  bullets: string[];      // Achievement bullet points
}

// ─── Education ──────────────────────────────────────────────────
export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

// ─── Skills ─────────────────────────────────────────────────────
export interface SkillCategory {
  category: string;       // "AI & GenAI" | "Languages & Frameworks" | ...
  skills: string[];
}

// ─── Certification ──────────────────────────────────────────────
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

// ─── Project ────────────────────────────────────────────────────
export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  repoUrl?: string;       // GitHub link
  liveUrl?: string;       // Live demo link
  imageUrl?: string;      // Screenshot/thumbnail
  featured: boolean;      // Show on home page
  date: string;           // "2024-11" for sorting
}

// ─── Blog ───────────────────────────────────────────────────────
export interface BlogMeta {
  slug: string;           // URL slug and filename
  title: string;
  date: string;           // ISO date string
  summary: string;        // 1-2 sentence preview
  tags: string[];
  readingTime?: string;   // "5 min read"
}

// ─── Paper ──────────────────────────────────────────────────────
export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  url: string;            // Link to paper PDF / arxiv
  notesUrl?: string;      // Link to personal notes
  tags: string[];
  summary?: string;       // One-line summary
}
```

---

## 5. Page Specifications

### 5.1 Home Page (`/`)

The home page is a single scrollable page composed of multiple sections, inspired by tascano.github.io's layout but with more sections and modern design.

#### 5.1.1 Hero Section

| Element | Detail |
|---|---|
| **Avatar** | Circular/rounded image, 84-100px, subtle hover scale + rotate |
| **Name** | `<h1>` — First name in `--text` color, last name in `--accent` color |
| **Typing subtitle** | Rotating titles: `"Senior Software Engineer"`, `"AI & Cloud Platform Engineer"`, `"Full-Stack Developer"`, `"Systems & SRE"` — typed with cursor animation |
| **Resume download** | `<a>` with PDF icon + "Download Resume" label. Links to `/Elison_Tuscano_resume.pdf` with `download` attribute |
| **Contact links** | Row of icon + label links: Email, Phone, LinkedIn, GitHub |

#### 5.1.2 About Section

A styled paragraph block with Elison's professional summary:

> Senior Software Engineer with 5+ years of experience across full-stack development, distributed systems, cloud platform engineering, and SRE. Skilled in Python, React, and TypeScript, with experience designing scalable systems on AWS, automating infrastructure with Terraform and Kubernetes, and optimizing CI/CD pipelines. Engineered a production-grade generative AI solution on an HPC platform, including a Retrieval-Augmented Generation (RAG) pipeline on AWS Bedrock and LLM-powered troubleshooting agents. Proven track record of improving system reliability and reducing costs by $270K+.

#### 5.1.3 Experience Section

Card-based layout. Each card contains:
- Company name (bold) + Role
- Date range + location
- Tech stack as colored pills
- Achievement bullets (collapsible on mobile — show first 3, "Show more" toggle)

**Data (from resume):**

| Company | Role | Period |
|---|---|---|
| Amazon | Software Development Engineer II | Nov 2024 – Present |
| Visa Inc. | Senior Site Reliability Engineer (DevOps) | Jun 2022 – Aug 2024 |
| Tata Consultancy Services | Software Engineer, Data Platform | Sep 2021 – May 2022 |
| Code Science Technologies | Full Stack Software Developer | Jun 2018 – Jun 2019 |

#### 5.1.4 Skills Section

Categorized skill pills displayed in a flex-wrap grid, grouped by category:

| Category | Skills |
|---|---|
| AI & GenAI | AWS Bedrock, Amazon Bedrock AgentCore, RAG, LLMs, LLM Agents, MCP, Embeddings, Vector Search, Prompt Engineering |
| Languages & Frameworks | Python, Java, React, JavaScript, TypeScript, Node.js, Flask, Shell, SQL, NoSQL |
| Databases | PostgreSQL, Redis, MongoDB, DynamoDB, AWS RDS |
| Cloud Platforms | AWS (EC2, Lambda, S3, Redshift, Glue, CodePipeline), Google Cloud (BigQuery, Data Studio), Microsoft Azure |
| DevOps | Docker, Kubernetes, Splunk, Grafana, Prometheus, Jenkins, Ansible, Linux, Terraform, Git |
| Big Data & Analytics | Tableau, BigQuery, TensorFlow, PyTorch, Apache Spark, Hadoop, Kafka, Airflow |

Each pill should have a hover effect (slight lift + accent background).

#### 5.1.5 Education Section

Timeline-style cards:

| Degree | Institution | Period |
|---|---|---|
| MS Artificial Intelligence / Data Science | Campbellsville University | Jul 2024 – Mar 2026 |
| MS Computer Science | University of Texas at Arlington | Aug 2019 – May 2021 |
| BS Computer Science | University of Mumbai | Jun 2015 – May 2019 |

#### 5.1.6 Certifications Section

Simple list or card:
- HashiCorp Terraform Associate (003)

---

### 5.2 Projects Page (`/projects`)

A grid of project cards. Each card shows:
- Project name (linked to repo/live URL)
- Description paragraph
- Tech stack pills
- Links: GitHub repo icon, Live demo icon (if available)
- Optional thumbnail image

Layout: Responsive grid — 3 columns desktop, 2 tablet, 1 mobile.

**Initial data:** Placeholder entries to be filled later. The JSON structure supports easy additions.

```json
// Example entry in projects.json
{
  "id": "portfolio-site",
  "name": "Personal Portfolio",
  "description": "My personal portfolio website built with React, TypeScript, and Vite. Hosted on GitHub Pages.",
  "techStack": ["React", "TypeScript", "Vite", "CSS Modules"],
  "repoUrl": "https://github.com/elisontuscano/elisontuscano",
  "liveUrl": "https://elisontuscano.github.io",
  "featured": true,
  "date": "2026-10"
}
```

---

### 5.3 Blogs Page (`/blogs`)

A chronological list of blog posts.

#### Blog List View (`/blogs`)
- Cards showing: title, date, summary, tags, reading time
- Sorted newest-first
- Optional tag filter chips at top

#### Blog Post View (`/blogs/:slug`)
- Full Markdown rendering with:
  - Headings, paragraphs, lists
  - Code blocks with syntax highlighting
  - Images
  - Tables (GFM)
- Back link to blog list
- Date + reading time header

**Content source:** Markdown files in `src/content/blogs/`. Each `.md` file has YAML frontmatter:

```markdown
---
title: "My First Blog Post"
date: "2026-10-01"
summary: "An introduction to my blog."
tags: ["general"]
readingTime: "3 min read"
---

Blog content here...
```

**Blog index:** A `blogs-index.json` file (auto-generated or manually maintained) lists metadata for all posts so the listing page doesn't need to parse all Markdown files.

---

### 5.4 Papershelf Page (`/papershelf`)

Inspired by arpitbhayani.me/papershelf. A list/grid of research papers and technical notes.

Each entry shows:
- Paper title (linked to external paper URL — ArXiv, PDF, etc.)
- Authors + year
- Tags/topics
- Optional one-line personal summary
- Optional link to personal notes (Google Drive, Notion, or internal Markdown)

Layout: Simple list with subtle card styling. Grouped by topic or sorted by date.

---

## 6. Component Specifications

### 6.1 Header (`components/Layout/Header.tsx`)

```
┌─────────────────────────────────────────────────────────────────┐
│  Elison Tuscano        Projects  Blogs  Papershelf   [☀/🌙]   │
└─────────────────────────────────────────────────────────────────┘
```

- **Logo/Name:** Left-aligned. Links to `/`. Bold, italic font. First name default color, last name accent color.
- **Nav links:** Right-aligned. `Projects`, `Blogs`, `Papershelf`. Active link highlighted with accent underline.
- **Dark mode toggle:** Sun/Moon icon button. Rightmost in the nav.
- **Mobile:** Hamburger menu icon. Nav links in a slide-down or slide-right drawer.
- **Sticky:** Fixed to top with subtle border-bottom and backdrop blur.

### 6.2 ThemeToggle (`components/common/ThemeToggle.tsx`)

- Reads and writes `data-theme` attribute on `<html>` element
- Persists choice in `localStorage` under key `"theme"`
- Default theme: `"light"` (or respects `prefers-color-scheme` media query)
- Renders sun icon (☀) in dark mode, moon icon (🌙) in light mode
- Smooth icon transition (rotate + fade)

### 6.3 ScrollProgress (`components/Layout/ScrollProgress.tsx`)

- Fixed bar at very top of viewport (above header)
- Width = scroll percentage of page
- Accent color gradient
- Height: 3-4px

### 6.4 SectionReveal (`components/Home/SectionReveal.tsx`)

- Wraps each homepage section
- Uses `IntersectionObserver` to add `.visible` class when section enters viewport
- Animates: `opacity: 0 → 1`, `translateY(30px) → 0`
- `threshold: 0.1`, triggers once

### 6.5 TypingAnimation (`components/common/TypingAnimation.tsx`)

- Accepts `string[]` of titles to cycle through
- Types each string character-by-character, pauses, then backspaces, then types next
- Blinking cursor (`|`) at end
- Configurable typing speed, pause duration

### 6.6 Card (`components/common/Card.tsx`)

Base card with:
- Rounded corners (8px)
- Subtle border (`--card-border`)
- Background (`--card-bg`)
- Hover: translateY(-4px), box-shadow with accent color glow, border-color → accent
- Transition: 0.3s ease

### 6.7 SectionTitle (`components/common/SectionTitle.tsx`)

- `<h2>` with section name
- Animated gradient line extending to the right (scales from 0 to full width on section reveal)
- Flex layout: title + line

---

## 7. Theming & Design Tokens

### 7.1 CSS Custom Properties (`src/theme/variables.css`)

```css
:root {
  /* ── Light theme (default) ── */
  --accent: #2563eb;          /* Blue accent — professional */
  --bg: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #111111;
  --text-secondary: #333333;
  --text-muted: #6b7280;
  --card-bg: #ffffff;
  --card-border: #e5e7eb;
  --skill-bg: #f3f4f6;
  --border-light: #e5e7eb;
  
  /* ── Spacing ── */
  --max-width: 1000px;
  --section-gap: 3rem;
  --card-radius: 8px;
  --card-padding: 1.25rem;
  
  /* ── Typography ── */
  --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, monospace;
}

[data-theme="dark"] {
  --bg: #0f0f0f;
  --bg-secondary: #1a1a1a;
  --text-primary: #e8e8e8;
  --text-secondary: #d0d0d0;
  --text-muted: #9ca3af;
  --card-bg: #1a1a1a;
  --card-border: #2a2a2a;
  --skill-bg: #262626;
  --border-light: #374151;
}
```

### 7.2 Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | `< 640px` | Single column, hamburger nav, compact cards |
| Tablet | `640px – 1024px` | 2-column grids, full nav |
| Desktop | `> 1024px` | 3-column grids, max-width container |

---

## 8. Routing

Using `HashRouter` for GitHub Pages compatibility (no server-side rewrites).

| Route | Page Component | Description |
|---|---|---|
| `/#/` | `HomePage` | Home with all sections |
| `/#/projects` | `ProjectsPage` | Projects grid |
| `/#/blogs` | `BlogsPage` | Blog listing |
| `/#/blogs/:slug` | `BlogPostPage` | Individual blog post |
| `/#/papershelf` | `PapershelfPage` | Papers and notes |

---

## 9. Static Data Files

All content is stored in `src/data/` as JSON files. This makes it trivial to update content without touching components.

### 9.1 `profile.json`

```json
{
  "firstName": "Elison",
  "lastName": "Tuscano",
  "titles": [
    "Senior Software Engineer",
    "AI & Cloud Platform Engineer",
    "Full-Stack Developer",
    "Systems & SRE"
  ],
  "location": "Sunnyvale, CA",
  "avatarUrl": "/images/avatar.jpg",
  "bio": "Senior Software Engineer with 5+ years of experience across full-stack development, distributed systems, cloud platform engineering, and SRE. Skilled in Python, React, and TypeScript, with experience designing scalable systems on AWS, automating infrastructure with Terraform and Kubernetes, and optimizing CI/CD pipelines. Engineered a production-grade generative AI solution on an HPC platform, including a Retrieval-Augmented Generation (RAG) pipeline on AWS Bedrock and LLM-powered troubleshooting agents. Proven track record of improving system reliability and reducing costs by $270K+.",
  "socialLinks": [
    { "platform": "email", "url": "mailto:elisontuscano@gmail.com", "label": "elisontuscano@gmail.com", "icon": "FiMail" },
    { "platform": "phone", "url": "tel:+16822464666", "label": "+1 (682)-246-4666", "icon": "FiPhone" },
    { "platform": "linkedin", "url": "https://linkedin.com/in/elisontuscano", "label": "LinkedIn", "icon": "FiLinkedin" },
    { "platform": "github", "url": "https://github.com/elisontuscano", "label": "GitHub", "icon": "FiGithub" }
  ],
  "resumeUrl": "/Elison_Tuscano_resume.pdf"
}
```

### 9.2 `experience.json`

```json
[
  {
    "id": "amazon",
    "company": "Amazon",
    "role": "Software Development Engineer II",
    "location": "Sunnyvale, CA",
    "startDate": "Nov 2024",
    "endDate": "Present",
    "techStack": ["React", "TypeScript", "Python", "AWS", "Redshift", "QuickSight", "Grafana", "CloudWatch", "Bedrock", "MCP"],
    "bullets": [
      "Built a scalable, cloud-based High-Performance Computing (HPC) platform to execute heavy compute workloads like AI training, chip design and complex simulations, processing over 10 million jobs annually",
      "Developed LLM-powered troubleshooting and admin agents for HPC and DCV diagnostics and remediation, reducing SLA incidents by 20%",
      "Designed an MCP (Model Context Protocol) server framework exposing platform modules and REST APIs to LLM agents over local (SSH) and remote (Bedrock AgentCore) servers",
      "Implemented a production RAG application on AWS Bedrock that lets users query HPC job and simulation data in natural language",
      "Architected a KPI analytics pipeline using AWS Glue, Redshift, and QuickSight, saving $100K+ in cost",
      "Engineered a filesystem monitoring service, reducing costs by $120K per year",
      "Extended on-demand DCV virtual desktop service with idle-detection, saving $50K+ annually",
      "Engineered multi-region support for the HPC platform, reducing compute costs by 30%",
      "Led end-to-end release management lifecycle ensuring zero-downtime upgrades across production clusters"
    ]
  },
  {
    "id": "visa",
    "company": "Visa Inc.",
    "role": "Senior Site Reliability Engineer (DevOps)",
    "location": "",
    "startDate": "Jun 2022",
    "endDate": "Aug 2024",
    "techStack": ["Docker", "Red Hat", "OpenShift", "Kubernetes", "Linux", "Jenkins", "Ansible", "Splunk", "Grafana", "Prometheus"],
    "bullets": [
      "Automated vulnerability findings reporting, saving 8 hours of manual work weekly",
      "Migrated client-facing environment (4000 TPS) from VMs to Docker containers with Kubernetes",
      "Created dynamic monitoring dashboards and alerts with Splunk, Prometheus, and Grafana, reducing SLA incidents by 30%",
      "Designed a CI/CD pipeline on AWS using CodePipeline, CodeDeploy, S3, CodeArtifact, CloudFormation, and Terraform for 10+ applications",
      "Led root-cause analysis on production incidents and built Python/Bash automation to remediate recurring failures"
    ]
  },
  {
    "id": "tcs",
    "company": "Tata Consultancy Services",
    "role": "Software Engineer, Data Platform",
    "location": "",
    "startDate": "Sep 2021",
    "endDate": "May 2022",
    "techStack": ["Google Cloud", "BigQuery", "Data Studio", "Python", "Scala", "Apache Spark", "HDFS", "Kafka", "Airflow"],
    "bullets": [
      "Facilitated migration of product data from Oracle to Google Cloud ensuring 99.99% availability",
      "Designed and streamlined a data pipeline for ETL, data warehousing, and application integration",
      "Implemented Kafka for real-time data streaming and Spark MLlib for market analysis"
    ]
  },
  {
    "id": "codescience",
    "company": "Code Science Technologies",
    "role": "Full Stack Software Developer",
    "location": "",
    "startDate": "Jun 2018",
    "endDate": "Jun 2019",
    "techStack": ["AWS", "Python", "Flask", "PHP", "Laravel", "React", "Node.js", "MySQL", "DynamoDB", "JavaScript"],
    "bullets": [
      "Architected scalable AWS solutions resulting in 20% decrease in infrastructure cost",
      "Optimized database performance with AWS RDS and DynamoDB, achieving 25% improvement in query response time"
    ]
  }
]
```

### 9.3 `education.json`

```json
[
  {
    "id": "campbellsville",
    "degree": "Master's",
    "field": "Artificial Intelligence / Data Science",
    "institution": "Campbellsville University",
    "location": "",
    "startDate": "Jul 2024",
    "endDate": "Mar 2026"
  },
  {
    "id": "uta",
    "degree": "Master's",
    "field": "Computer Science",
    "institution": "University of Texas at Arlington",
    "location": "Texas",
    "startDate": "Aug 2019",
    "endDate": "May 2021"
  },
  {
    "id": "mumbai",
    "degree": "Bachelor's",
    "field": "Computer Science",
    "institution": "University of Mumbai",
    "location": "Mumbai",
    "startDate": "Jun 2015",
    "endDate": "May 2019"
  }
]
```

### 9.4 `skills.json`

```json
[
  {
    "category": "AI & GenAI",
    "skills": ["AWS Bedrock", "Bedrock AgentCore", "RAG", "LLMs", "LLM Agents", "MCP", "Embeddings", "Vector Search", "Prompt Engineering"]
  },
  {
    "category": "Languages & Frameworks",
    "skills": ["Python", "Java", "React", "JavaScript", "TypeScript", "Node.js", "Flask", "Shell", "SQL", "NoSQL"]
  },
  {
    "category": "Databases",
    "skills": ["PostgreSQL", "Redis", "MongoDB", "DynamoDB", "AWS RDS"]
  },
  {
    "category": "Cloud Platforms",
    "skills": ["AWS", "EC2", "Lambda", "S3", "Redshift", "Glue", "CodePipeline", "Google Cloud", "BigQuery", "Microsoft Azure"]
  },
  {
    "category": "DevOps",
    "skills": ["Docker", "Kubernetes", "Splunk", "Grafana", "Prometheus", "Jenkins", "Ansible", "Linux", "Terraform", "Git"]
  },
  {
    "category": "Big Data & Analytics",
    "skills": ["Tableau", "TensorFlow", "PyTorch", "Apache Spark", "Hadoop", "Kafka", "Airflow"]
  }
]
```

### 9.5 `certifications.json`

```json
[
  {
    "id": "terraform",
    "name": "HashiCorp Terraform Associate (003)",
    "issuer": "HashiCorp",
    "date": "",
    "credentialUrl": ""
  }
]
```

### 9.6 `projects.json`

```json
[
  {
    "id": "portfolio",
    "name": "Personal Portfolio",
    "description": "This portfolio website — built with React, TypeScript, and Vite. Deployed on GitHub Pages with dark mode, responsive design, and component-driven architecture.",
    "techStack": ["React", "TypeScript", "Vite", "CSS Modules"],
    "repoUrl": "https://github.com/elisontuscano/elisontuscano",
    "liveUrl": "https://elisontuscano.github.io",
    "featured": true,
    "date": "2026-10"
  }
]
```

### 9.7 `papers.json`

```json
[
  {
    "id": "example-paper",
    "title": "Example Paper Title",
    "authors": ["Author A", "Author B"],
    "year": 2024,
    "url": "https://arxiv.org/abs/xxxx.xxxxx",
    "tags": ["LLMs", "RAG"],
    "summary": "A brief note about what this paper covers."
  }
]
```

---

## 10. Animations & Interactions

| Animation | Where | Detail |
|---|---|---|
| **Fade-in + slide-up** | All homepage sections | `opacity: 0→1`, `translateY(30px→0)`, triggered by IntersectionObserver |
| **Typing effect** | Hero subtitle | Character-by-character typing with blinking cursor, cycling through titles |
| **Scroll progress bar** | Top of viewport | Width proportional to scroll position, accent color |
| **Card hover lift** | All cards | `translateY(-4px)`, accent box-shadow, accent border |
| **Skill pill hover** | Skills section | `translateY(-2px)`, background → accent |
| **Avatar hover** | Hero | `scale(1.05) rotate(2deg)` |
| **Nav link active** | Header | Accent underline on active route |
| **Section line** | Section titles | Gradient line scales from 0 → full width on reveal |
| **Theme transition** | Entire page | `background` and `color` transition: 0.3s ease |
| **Resume link hover** | Hero | `translateX(5px)` |

---

## 11. SEO & Meta

### 11.1 HTML Meta Tags (in `index.html`)

```html
<title>Elison Tuscano — Software Engineer</title>
<meta name="description" content="Elison Tuscano — Senior Software Engineer. AI & Cloud Platform Engineering, Full-Stack Development, SRE. Currently at Amazon." />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" href="/favicon.ico" />

<!-- Open Graph -->
<meta property="og:title" content="Elison Tuscano — Software Engineer" />
<meta property="og:description" content="Senior Software Engineer at Amazon. AI & Cloud Platform Engineering, Full-Stack Development, SRE." />
<meta property="og:image" content="https://elisontuscano.github.io/og-image.png" />
<meta property="og:url" content="https://elisontuscano.github.io" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Elison Tuscano — Software Engineer" />
<meta name="twitter:description" content="Senior Software Engineer at Amazon. AI, Cloud, Full-Stack, SRE." />
<meta name="twitter:image" content="https://elisontuscano.github.io/og-image.png" />
```

### 11.2 Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Elison Tuscano",
  "jobTitle": "Software Development Engineer II",
  "worksFor": { "@type": "Organization", "name": "Amazon" },
  "url": "https://elisontuscano.github.io",
  "sameAs": [
    "https://github.com/elisontuscano",
    "https://linkedin.com/in/elisontuscano"
  ]
}
```

---

## 12. Build & Deployment

### 12.1 Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Root for username.github.io repo
  build: {
    outDir: 'dist',
  },
});
```

### 12.2 GitHub Pages Deployment

**Option A (recommended): `gh-pages` npm package**

```json
// package.json scripts
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**Option B: GitHub Actions CI/CD**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 12.3 Resume PDF Handling

- Source file: `attachments/Elison_Tuscano_resume.pdf`
- Copy to `public/Elison_Tuscano_resume.pdf` (Vite serves `public/` as-is)
- Link in Hero: `<a href="/Elison_Tuscano_resume.pdf" download>`

---

## 13. Implementation Plan (Phased)

### Phase 1 — Scaffold & Core (Day 1)
1. Initialize Vite + React + TypeScript project
2. Set up repo structure (`src/`, `public/`, `dev/spec/`)
3. Implement theme system (CSS variables, ThemeContext, ThemeToggle)
4. Build Layout components (Header, Footer, ScrollProgress)
5. Set up React Router with HashRouter
6. Create placeholder pages

### Phase 2 — Home Page (Day 2)
1. Build Hero component (avatar, name, typing animation, resume link, contacts)
2. Build SectionReveal wrapper
3. Build About, Experience, Skills, Education, Certifications sections
4. Populate all JSON data files from resume
5. Wire up scroll progress bar

### Phase 3 — Projects & Papershelf (Day 3)
1. Build ProjectCard and ProjectGrid components
2. Build PaperCard and PaperList components
3. Wire up Projects and Papershelf pages with JSON data
4. Add placeholder content

### Phase 4 — Blogs (Day 3-4)
1. Build BlogCard, BlogList, BlogPost components
2. Set up Markdown rendering pipeline (react-markdown + remark-gfm + rehype-highlight)
3. Create blog index and sample blog post
4. Wire up blog routing (`/blogs` and `/blogs/:slug`)

### Phase 5 — Polish & Deploy (Day 4)
1. Responsive testing and fixes (mobile, tablet, desktop)
2. Animation tuning
3. SEO meta tags and JSON-LD
4. Favicon, OG image
5. Deploy to GitHub Pages
6. Verify live site

---

## 14. Acceptance Criteria

- [ ] Site loads at `elisontuscano.github.io` (or `localhost:5173` in dev)
- [ ] Home page displays all resume sections with correct data
- [ ] Dark/light mode toggles correctly and persists across page loads
- [ ] Scroll progress bar tracks scroll position
- [ ] Typing animation cycles through titles smoothly
- [ ] All sections fade in on scroll (IntersectionObserver)
- [ ] Header navigation works across all 4 pages
- [ ] Mobile hamburger menu opens/closes correctly
- [ ] Resume PDF downloads when "Download Resume" is clicked
- [ ] Projects page renders project cards from JSON
- [ ] Blogs page lists blog posts; individual posts render Markdown
- [ ] Papershelf page lists papers with external links
- [ ] Cards have hover animations (lift + shadow + accent border)
- [ ] All text content matches resume data exactly
- [ ] No console errors or TypeScript warnings
- [ ] Lighthouse performance score ≥ 90
- [ ] Site is fully responsive at 320px, 768px, and 1440px widths

---

## 15. Open Decisions

| # | Decision | Options | Recommendation |
|---|---|---|---|
| 1 | Accent color | Blue (`#2563eb`), Gold (`#fdb515` like tascano), Green, Custom | Blue — professional and readable in both themes |
| 2 | Blog content format | Markdown files in repo vs. external CMS | Markdown in repo — simpler, version-controlled |
| 3 | HashRouter vs BrowserRouter | HashRouter (safe for GH Pages) vs BrowserRouter + 404.html hack | HashRouter — zero config, reliable |
| 4 | Avatar image | Photo vs. illustration vs. initials | Need avatar image from Elison |
| 5 | Custom domain | `elisontuscano.github.io` vs. custom domain | Start with github.io, add custom later |
