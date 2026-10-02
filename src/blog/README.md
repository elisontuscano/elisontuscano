# Blog

This directory will contain blog posts written in Markdown format.

## File Format

Each blog post is a `.md` file with YAML frontmatter:

```markdown
---
title: "My Blog Post Title"
date: "2026-10-01"
summary: "A brief summary of the post."
tags: ["tag1", "tag2"]
readingTime: "5 min read"
---

Blog content goes here...
```

## Adding a New Post

1. Create a new `.md` file in this directory (e.g., `my-new-post.md`).
2. Add the YAML frontmatter block with title, date, summary, tags, and readingTime.
3. Write your content below the frontmatter.
4. Update the blog index in `src/website/src/data/` if not auto-generated.
