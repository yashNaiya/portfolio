# Yash Naiya — portfolio

A single-page 3D portfolio. The hero is a live three.js scene of books floating in a ring (it follows the mouse and pauses when off-screen); projects sit on a 3D bookcase (recent and earlier shelves) and slide out when picked; skills are stacks of books and education entries are library index cards. Palette: #F7F3EA cream, #DDD2BF sand, #A58A6A tan, #65745B sage, #34352F charcoal.

Built with React 19, Vite 8 and three.js. No UI framework — styling lives in `src/styles.css`, the 3D hero in `src/scene.js`.

## Run it

Requires Node.js 20.19 or newer.

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Editing content

All text comes from `src/data.js`:

- `profile` — name, email, phone, links, resume path, Formspree form id
- `projects` — each book on the bookcase: `shelf` (`recent` or `earlier`), title, `short` spine text, dates, stack, bullet points, optional screenshot, `link`, and the spine's `color`, `height` and `width`
- `experience`, `education`, `skills`

**Project links:** the three recent projects and the LeetCode extension have `link: '#'` as a placeholder. Replace it with the GitHub or demo URL and the "View project" link opens it in a new tab.

To swap the resume, replace `public/Yash-Naiya-Resume.pdf`.

## Deploying (Netlify)

Build command `npm run build`, publish directory `dist`. It's a single page with anchor links, so no redirect rules are needed.

## What changed from the previous version

| Before | Now | Why |
| --- | --- | --- |
| Create React App (`react-scripts` 5) | Vite 8 | CRA is deprecated and no longer maintained |
| React 18 | React 19 | current major |
| `node-sass` | removed | deprecated; no Sass was in use |
| `react-tsparticles` / `tsparticles` | removed | `react-tsparticles` is deprecated |
| `@mui/material`, `@mui/icons-material`, `@emotion/*` | removed | replaced by plain CSS; much smaller bundle |
| `react-router-dom` | removed | the site is now one page |
| — | `three` 0.186 | powers the 3D hero |
| `react-pdf`, `react-simple-image-slider` | removed | resume is shown on the page and downloadable as PDF |
| `@formspree/react` | plain `fetch` to the same Formspree form | v3 pulls in Stripe libraries the site doesn't need |
| `react-type-animation` | small built-in typing effect | one less dependency; respects reduced motion |
| `react-github-calendar`, `react-activity-calendar`, testing libraries, `web-vitals` | removed | were installed but unused |
| React 16 + Babel UMD scripts in `index.html` | removed | loaded on every visit but never used |
