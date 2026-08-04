# Wamik Hossain — Portfolio

Portfolio site for **Khondekar Wamik Hossain**, a Google Cloud Platform Architect. Built with **React + Vite + Tailwind CSS v4** and deployed to **GitHub Pages**.

Live at: https://wamik25apr.github.io/

## Local development

```bash
npm install
npm run dev      # start dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deploying to GitHub Pages

The repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the site and publishes it to Pages on every push to `main`.

1. **Push** the code to `main`:

   ```bash
   git add -A
   git commit -m "feat: portfolio site"
   git push origin main
   ```

2. **Enable GitHub Pages** — go to **Settings → Pages** and set **Source** to **GitHub Actions** (this is a user-site repo, so the site is served from the repo root).

3. On the next push (or via **Actions → Deploy to GitHub Pages → Run workflow**), the site will be live at `https://wamik25apr.github.io/`.

## Project structure

```
├── public/                 # static assets (profile.jpg, favicon.svg)
├── src/
│   ├── components/         # Navbar, Hero, Summary, Skills, Experience, ...
│   ├── data/resume.js      # all resume content (single source of truth)
│   ├── App.jsx
│   ├── index.css           # Tailwind v4 entry + theme tokens
│   └── main.jsx
├── .github/workflows/deploy.yml
└── resume_accenture.typ    # source Typst resume
```

## Customization

All content lives in `src/data/resume.js`. Edit that file to update skills, experience, certifications, or contact details. The accent color and fonts are defined via Tailwind v4 `@theme` tokens in `src/index.css`.
