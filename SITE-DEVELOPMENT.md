# Building & Maintaining This Site

> A short record of how this portfolio is built, deployed, and maintained — the
> stack, the workflow, and the conventions that keep it easy to update.
>
> **Last updated:** August 2026 · React 19 · Vite 8 · Tailwind CSS v4 · GitHub Pages

---

## Table of Contents

1. [The Big Picture](#1-the-big-picture)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Local Development](#4-local-development)
5. [Where Content Lives](#5-where-content-lives)
6. [Pages & Routing](#6-pages--routing)
7. [Styling & Theme](#7-styling--theme)
8. [Deployment](#8-deployment)
9. [Maintenance Checklist](#9-maintenance-checklist)
10. [Lessons Learned](#10-lessons-learned)

---

## 1. The Big Picture

A single-page React app served as static files from **GitHub Pages**. The whole
workflow is: edit content → commit → push → a GitHub Actions workflow builds and
publishes the site automatically.

- **No backend, no database** — it's a static bundle of HTML/CSS/JS
- **Content is data** — everything editable lives in `src/data/resume.js`
  (plus a couple of markdown pages), never in the components
- **Deploy is a push** — `main` is the only branch; a workflow handles the rest

The site currently has **three routes**, all hash-based so they work on a static
host without any server config:

| Route | Page |
|-------|------|
| `#/` | Home — hero, summary, skills, experience, certifications, education |
| `#/homelab` | [Self-Hosting on a Raspberry Pi 5](https://github.com/wamik25apr/wamik25apr.github.io/blob/main/PI-SERVER-SETUP-WEBSITE.md) |
| `#/site` | This page |

---

## 2. Tech Stack

| Tool | Version | Why |
|------|---------|-----|
| React | 19 | Components + hooks; the app shell |
| Vite | 8 | Dev server, bundling, HMR — fast and zero-config for static sites |
| Tailwind CSS | 4 | Utility-first styling; theme tokens via CSS `@theme` |
| react-markdown | latest | Renders the markdown pages (`?raw` imports) |
| remark-gfm | latest | GitHub-flavored markdown (tables, task lists) |
| GitHub Pages | — | Static hosting, free and tied to the repo |

No router library — routing is a ~15-line hash parser in `src/App.jsx` (see
[Pages & Routing](#6-pages--routing)). No CMS, no SSR, no framework beyond React.

---

## 3. Project Structure

```
├── .github/workflows/deploy.yml   # build + publish on push to main
├── public/                        # static assets (profile.jpg, favicon.svg)
├── src/
│   ├── components/                # Navbar, Hero, Summary, Skills, Experience,
│   │                              # Certifications, Education, Footer, MarkdownPage
│   ├── data/resume.js             # ALL resume content (single source of truth)
│   ├── App.jsx                    # page composition + hash routing
│   ├── index.css                  # Tailwind v4 entry + theme tokens + markdown styles
│   └── main.jsx                   # React entry point
├── PI-SERVER-SETUP-WEBSITE.md     # Homelab page content (markdown)
├── SITE-DEVELOPMENT.md            # this page's content (markdown)
├── index.html                     # HTML shell
└── package.json
```

Key idea: **components hold structure, `resume.js` holds content.** Adding a new
skill, job, or certification means editing one data file — no JSX changes.

---

## 4. Local Development

```bash
npm install      # once, after cloning
npm run dev      # start dev server with hot reload → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

The dev server hot-reloads on save. Preview is a good final check before pushing,
since it serves the exact `dist/` output that GitHub Pages will host.

---

## 5. Where Content Lives

| What you want to change | Where |
|-------------------------|-------|
| Name, title, contacts, skills, jobs, certifications, education | `src/data/resume.js` |
| Homepage section copy / highlights | `src/data/resume.js` |
| Theme colors and fonts | `src/index.css` → `@theme` block |
| Pi server guide | `PI-SERVER-SETUP-WEBSITE.md` |
| This page | `SITE-DEVELOPMENT.md` |

Markdown pages are imported with Vite's `?raw` suffix, so the `.md` files at the
repo root **are** the source of truth — editing them and pushing updates the site.

### Adding a new section to the homepage

1. Add the content to `src/data/resume.js`
2. Create a component in `src/components/` (copy the pattern from `Skills.jsx` —
   a `<section id="...">` + `SectionHeading`)
3. Import it in `src/App.jsx` and render it inside `<main>`
4. Add the nav link in `src/components/Navbar.jsx`

### Adding a new markdown page

1. Drop a `.md` file at the repo root
2. Create a thin wrapper component that renders
   `<MarkdownPage markdown={...} page="slug" ... />` (copy `SiteBuild.jsx`)
3. Add a `#/slug` route in `src/App.jsx`
4. Link to it from the Navbar/Footer

---

## 6. Pages & Routing

`src/App.jsx` implements hash routing:

```jsx
function parseRoute(hash) {
  if (hash.startsWith("#/homelab")) {
    return { page: "homelab", anchor: hash.slice("#/homelab".length).replace(/^\/+/, "") };
  }
  if (hash.startsWith("#/site")) {
    return { page: "site", anchor: hash.slice("#/site".length).replace(/^\/+/, "") };
  }
  const rest = hash.slice(1);
  return { page: "home", anchor: rest && rest !== "/" ? rest : null };
}
```

- Any hash starting with `#/` is a **page route**; anything else is a **section
  anchor** on the home page (`#about`, `#skills`, …)
- `MarkdownPage` rewrites in-page anchors (`#step-5--docker-setup`) to
  `#/homelab/step-5--docker-setup` so the table of contents stays on the page
- Heading IDs are generated to match GitHub's slug algorithm, so the markdown
  TOC links work without editing the `.md` files

---

## 7. Styling & Theme

Tailwind v4 defines the design tokens in `src/index.css`:

```css
@theme {
  --font-sans: "Mulish", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --color-primary-500: #8b5cf6; /* violet */
  --color-primary-600: #7c3aed;
  /* ... */
}
```

- **Background:** `#0a0611` (near-black purple), set on `body`
- **Accent:** violet → fuchsia gradients (`from-violet-500 to-fuchsia-600`)
- **Fonts:** Mulish (body) + JetBrains Mono (code/labels), loaded from Google Fonts
- **Markdown pages:** styled by the `.md-content` rules at the bottom of
  `index.css` (headings, code blocks, tables, blockquotes, lists) — designed to
  match the same dark violet look

---

## 8. Deployment

`.github/workflows/deploy.yml` runs on every push to `main` (and on demand via
**Actions → Run workflow**):

```yaml
on:
  push:
    branches: ["main"]
  workflow_dispatch:
```

It does four things:

1. Checks out the code
2. Installs dependencies with `npm ci`
3. Builds with `npm run build` → `dist/`
4. Uploads `dist/` and publishes it via GitHub Pages

**To ship a change:** commit and push to `main`. The workflow rebuilds and the
site is live in ~1–2 minutes at `https://wamik25apr.github.io/`.

> GitHub Pages is configured to **Source: GitHub Actions** (repo → Settings →
> Pages). Because this is a user site (`*.github.io`), the branch pages would
> also need a custom domain setup — the Actions route avoids all of that.

---

## 9. Maintenance Checklist

Before every push:

- [ ] `npm run build` succeeds with no errors
- [ ] `npm run preview` — check the home page and both markdown pages render
- [ ] New content verified on desktop + mobile (nav collapses on small screens)
- [ ] Markdown page TOC links still jump to the right section
- [ ] No secrets/keys in committed files (the DuckDNS token in the Pi guide is a placeholder)

---

## 10. Lessons Learned

**Hash routing beats a router for static hosting.** No server config, no 404
rewrites, deep links work. The tiny parser in `App.jsx` is all it takes.

**`?raw` markdown imports keep prose out of JSX.** Big guides stay readable in
GitHub and render in the app with the same styles. The `.md` file is the source
of truth; the component is just a shell.

**`src/data/resume.js` as a single source of truth.** The longest part of a site
update is deciding what to write, not where to write it. One data file covers
name, skills, jobs, certifications, education, and contacts — components map
over it, so nothing is duplicated.

**Tailwind v4 tokens centralize the look.** Changing the accent color is one line
in `index.css`. The violet/fuchsia identity is a token, not a magic hex scattered
across components.

**GitHub Actions is the whole CI/CD.** No Jenkins, no Docker, no domain server —
push to `main`, Pages serves `dist/`. The workflow is the entire "pipeline."

---

*This page is itself a rendered markdown file (`SITE-DEVELOPMENT.md`) — editing
it and pushing is a real-world example of how the site is maintained.*
