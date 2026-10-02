// ─── Profile ────────────────────────────────────────────────────
export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  icon: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  titles: string[];
  location: string;
  avatarUrl: string;
  bio: string;
  socialLinks: SocialLink[];
  resumeUrl: string;
}

// ─── Experience ─────────────────────────────────────────────────
export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  techStack: string[];
  bullets: string[];
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
  category: string;
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
  repoUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  date: string;
}

// ─── Blog ───────────────────────────────────────────────────────
export interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime?: string;
}

// ─── Paper ──────────────────────────────────────────────────────
export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  url: string;
  notesUrl?: string;
  tags: string[];
  summary?: string;
}
