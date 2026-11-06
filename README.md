# Montessori 1 — Parent Syllabus Guide

Web app for parents to browse **Montessori 1 monthly portions** with plain-language explanations, classroom context, and home activities—not just PDF headings.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Updating syllabus from PDFs

Place monthly portion PDFs in the project root, then:

```bash
npm run generate:syllabus
```

This refreshes `src/data/syllabus.json` from all `*.pdf` files.

### Topic pictures, rhymes, and sounds

Each topic shows **named cards** (what to recognize — mat, cow, colours, letters, etc.), plus rhyme lyrics with **Play rhyme**, and listen buttons. Rules in `src/lib/topicContent/resolve.ts` cover all syllabus lines; exact lists live in `src/data/topicContent/catalog.ts` and `bundles.ts`.

Optional reference SVGs (e.g. flag) use `object-contain` — not cropped. Replace with your school photos in `public/content/images/` and point to them in `bundles.ts`.

## Build for production

```bash
npm run build
npm run preview
```

### GitHub Pages (`*.github.io/<repo>/`)

The Vite **`base`** is set to `/CBSE-Montessori-Syllabus/` for production so scripts and `public/` assets load under that subpath. If you rename the repository, update `GITHUB_PAGES_BASE` in `vite.config.ts` to `/<new-repo-name>/` (trailing slash required), then rebuild and redeploy.

**Deploy:** push to `main`. The workflow [`.github/workflows/static.yml`](.github/workflows/static.yml) runs `npm ci`, `npm run build`, and publishes the **`dist`** folder. In the repo **Settings → Pages**, set the source to **GitHub Actions** (not “Deploy from a branch” uploading the raw repo—that serves `index.html` with `/src/main.tsx` and causes **404** on `main.tsx`).

Parent checkmarks (“We talked about this at home”) are stored in the browser’s local storage only.
