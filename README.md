# NOVA

**A dark, motion-heavy single-page portfolio built with Next.js 14, React Three Fiber and Framer Motion.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.3-050505?style=flat-square&logo=nextdotjs&logoColor=a3e635)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18.3-0c0c0e?style=flat-square&logo=react&logoColor=a3e635)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-16161a?style=flat-square&logo=typescript&logoColor=a3e635)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-0c0c0e?style=flat-square&logo=tailwindcss&logoColor=a3e635)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/three.js-0.164-16161a?style=flat-square&logo=threedotjs&logoColor=a3e635)](https://threejs.org)
[![React Three Fiber](https://img.shields.io/badge/R3F-8.16-16161a?style=flat-square)](https://docs.pmnd.rs/react-three-fiber)
[![License: MIT](https://img.shields.io/badge/License-MIT-8b5cf6?style=flat-square)](LICENSE)
[![Deploy: GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-050505?style=flat-square&logo=githubpages&logoColor=a3e635)](.github/workflows/deploy.yml)

---

NOVA is a portfolio **template** — a complete, opinionated front end built around a fictional 3D-artist persona called "Kael Voss." The persona, the biography, the stat counters, the nine project titles and the contact address are all placeholder content, and the imagery is served from [picsum.photos](https://picsum.photos) rather than from real renders. Nothing here represents a real person, real clients or real awards; the footer says as much on the live page.

It is intended for 3D artists, motion designers, photographers and front-end developers who want a finished starting point instead of a blank `create-next-app`. Replace the copy, swap the WebGL centrepiece for your own model, point the images at your CDN, and it is your site.

**Deployed site (once the first Pages run completes):** <https://hamzahossainX.github.io/KIMI/>

The URL is reserved but returns 404 until the repository has been pushed and Pages has been switched to the GitHub Actions source (see [Deployment](#deployment)).

---

## Features

| Feature | Where it lives |
| --- | --- |
| WebGL hero: distorted torus knot with metallic material, floating motion, 140 sparkle particles, scene fog and a lerped pointer-parallax rig | `components/CanvasScene.tsx` |
| Scroll-linked parallax and fade on the hero content via `useScroll` / `useTransform` | `components/Hero.tsx` |
| Masked line-reveal typography — each headline line animates out of an `overflow-hidden` clip | `components/Hero.tsx` |
| Infinite CSS marquee driven by a Tailwind keyframe (28s linear loop) | `components/Hero.tsx`, `tailwind.config.ts` |
| CSS-column masonry gallery with grayscale-to-color hover, image scale and a sliding metadata overlay | `components/Portfolio.tsx` |
| Scroll-triggered skill meters that animate width once on entry | `components/About.tsx` |
| Glassmorphism system as a single reusable `.glass` utility (blur, translucent fill, hairline border) | `app/globals.css` |
| Procedural film-grain overlay from an inline `feTurbulence` SVG data URI — no image request | `app/globals.css` |
| Scroll-aware glass navbar with an animated mobile drawer | `components/Navbar.tsx` |
| Fluid `clamp()` type and column breakpoints, laid out for phone through desktop widths | throughout |
| Reduced dependency surface: seven runtime dependencies, no UI kit, no icon package (glyphs are plain Unicode) | `package.json` |

---

## Tech stack

| Layer | Technology | Version | Why |
| --- | --- | --- | --- |
| Framework | Next.js (App Router) | 14.2.3 | Server components by default, `next/font` self-hosting, first-class static export |
| UI runtime | React / React DOM | 18.3 | Concurrent rendering, the baseline every dependency here targets |
| Language | TypeScript | 5.4 | `strict: true`, `bundler` module resolution, `@/*` path alias |
| Styling | Tailwind CSS | 3.4 | Design tokens live in one config file; no stylesheet sprawl |
| Animation | Framer Motion | 11 | Declarative scroll-linked values, `whileInView`, `AnimatePresence` exits |
| 3D engine | three.js | 0.164 | The WebGL renderer under everything below |
| 3D bindings | @react-three/fiber | 8.16 | Expresses the scene graph as React components |
| 3D helpers | @react-three/drei | 9.105 | `Float`, `MeshDistortMaterial`, `Sparkles` |
| CSS pipeline | PostCSS + Autoprefixer | 8.4 / 10.4 | Tailwind's build step and vendor prefixing |
| Fonts | `next/font/google` | bundled | Space Grotesk (display) + Inter (body), self-hosted at build time |

---

## Getting started

### Prerequisites

- **Node.js 18.17 or newer** (required by Next.js 14). Development was verified on Node **22.22.2** with npm **10.9.7**.
- npm (the repository ships a committed `package-lock.json`).

### Install and run

```bash
git clone https://github.com/hamzahossainX/KIMI.git
cd KIMI
npm install
npm run dev
```

Open <http://localhost:3000>.

### Available scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `npm run dev` | `next dev` | Development server with hot reload |
| `npm run build` | `next build` | Production build |
| `npm start` | `next start` | Serve the production build (Node server mode only — see [Deployment](#deployment)) |
| `npm run lint` | `next lint` | Next.js lint pass |

> `npm run lint` is Next.js's built-in wrapper. No ESLint config file is committed yet, so the first run will prompt you to choose a configuration.

---

## Project structure

```
.
├── .github/
│   ├── workflows/ci.yml         # typecheck + build on PRs and pushes to main
│   ├── workflows/deploy.yml     # static export → GitHub Pages
│   ├── dependabot.yml           # weekly npm + Actions updates
│   └── PULL_REQUEST_TEMPLATE.md
├── app/
│   ├── globals.css          # 41  Tailwind layers, scrollbar, .glass/.text-stroke/.noise utilities
│   ├── layout.tsx           # 20  Root layout, next/font wiring, page metadata
│   └── page.tsx             # 19  Server component that composes the six sections
├── components/
│   ├── About.tsx            # 122 Bio copy, animated skill meters, stat cards, tag chips
│   ├── CanvasScene.tsx      # 70  R3F canvas: torus knot, lights, fog, sparkles, pointer rig
│   ├── Contact.tsx          # 127 Social links and the (simulated) contact form
│   ├── Footer.tsx           # 13  Wordmark, copyright, placeholder-art disclaimer
│   ├── Hero.tsx             # 138 Parallax headline, line reveals, marquee, dynamic canvas import
│   ├── Navbar.tsx           # 92  Scroll-aware glass header with mobile drawer
│   └── Portfolio.tsx        # 107 Nine-project CSS-column masonry grid
├── next.config.mjs          # Remote image patterns; static-export switch (see Deployment)
├── package.json             # 7 runtime deps, 8 dev deps
├── package-lock.json        # committed; CI installs with `npm ci`
├── postcss.config.mjs       # tailwindcss + autoprefixer
├── tailwind.config.ts       # Palette, fonts, marquee/shimmer keyframes
├── tsconfig.json            # strict mode, "@/*" path alias
├── .editorconfig
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── SECURITY.md
```

The ten files under `app/` and `components/` total 749 lines of source. `node_modules/`, `.next/` and `out/` are ignored.

---

## Customization guide

### 1. Rename the persona

The name is hardcoded in five files. Replace every occurrence:

| File | What to change |
| --- | --- |
| `app/layout.tsx` | `metadata.title` — `"KAEL VOSS — Digital Sculptor & 3D Artist"`; `metadata.description` — `"Portfolio of Kael Voss: …"` |
| `components/Navbar.tsx` | The wordmark `KAEL<span className="text-accent">.</span>VOSS` |
| `components/Hero.tsx` | Eyebrow `Digital Sculptor — CGI Artist`, the three headline lines, and the intro line `I'm Kael Voss — …` |
| `components/Footer.tsx` | The wordmark and `© 2026 Kael Voss Studio — All renders are placeholder art.` |
| `components/Contact.tsx` | Both the `href="mailto:hello@kaelvoss.studio"` and the visible link text |

A quick audit before you start:

```bash
grep -rn "KAEL\|Kael\|kaelvoss" app components
```

Also update the four entries in the `socials` array in `components/Contact.tsx` — they currently point at the ArtStation, Behance, Instagram and X homepages, not at any real profile.

### 2. Replace the torus knot with your own model

`components/CanvasScene.tsx` renders a procedural `torusKnotGeometry`. To load a real asset, put a `.glb` in `public/` and swap the `Sculpture` component:

```tsx
import { useGLTF, Float, MeshDistortMaterial } from "@react-three/drei";

function Sculpture() {
  const { scene } = useGLTF("/models/sculpture.glb");
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.4}>
      <primitive object={scene} scale={1.4} />
    </Float>
  );
}

useGLTF.preload("/models/sculpture.glb");
```

Keep the file small — it downloads on the client. Draco- or Meshopt-compress anything over a few megabytes, and remember that with `basePath` set (see [Deployment](#deployment)) you should reference the asset through a `basePath`-aware path rather than a bare `/models/...` string.

Two knobs worth keeping: `dpr={[1, 2]}` on the `<Canvas>` caps the render resolution on high-density displays, and the lights in `CanvasScene.tsx` use the palette accent (`#a3e635`) alongside a deeper violet (`#7c3aed`) that is close to, but not the same as, the `violet` token, so the 3D and the 2D read as one design.

### 3. Swap the placeholder imagery

`components/Portfolio.tsx` builds every image URL from a `seed` field:

```tsx
src={`https://picsum.photos/seed/${p.seed}/900/${p.h}`}
```

Replace the nine objects in the `projects` array with your own `title`, `tag`, `year` and image URL, and change the `<Image>` `src` to that URL. Each entry's `h` sets the intrinsic height that drives the masonry rhythm, so vary it to keep the columns uneven.

If your images come from a new host, add it to `next.config.mjs`:

```js
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.yourcdn.com" },
  ],
},
```

Self-hosted files under `public/` need no `remotePatterns` entry at all.

### 4. Edit skills, stats and copy

In `components/About.tsx`: the `skills` array (name plus a 0–100 `level` that drives the meter width), the three stat cards (`10+` / `120+` / `14`), the three bio paragraphs, and the "Also fluent in" chip list.

### 5. Retune the palette

Everything visual derives from `tailwind.config.ts`:

| Token | Value | Role |
| --- | --- | --- |
| `void` | `#050505` | Page background, also the scene fog colour |
| `carbon` | `#0c0c0e` | Card surfaces |
| `ash` | `#16161a` | Raised surfaces |
| `line` | `rgba(255,255,255,0.08)` | Hairline dividers |
| `accent` | `#a3e635` | Primary accent (lime) |
| `violet` | `#8b5cf6` | Secondary accent |

Change `accent` in two places for a complete recolour: `tailwind.config.ts` and the `--accent` custom property in `app/globals.css` (it drives `::selection`). The scene lights in `CanvasScene.tsx` carry their own hex values.

Fonts are declared in `app/layout.tsx`. Swap `Space_Grotesk` or `Inter` for any other `next/font/google` family; the CSS variable names stay the same, so Tailwind's `font-display` and `font-body` keep working.

### 6. Wire up the contact form

**The form does not send anything.** `handleSubmit` in `components/Contact.tsx` calls `preventDefault()`, waits 900 ms and flips local state to show a success message. There is no `fetch`, no third-party form service and no backend. It is a visual demonstration only.

To make it real, replace the handler body with a request to your endpoint:

```tsx
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSending(true);
  const data = new FormData(e.currentTarget);
  const res = await fetch("https://your-form-endpoint.example/submit", {
    method: "POST",
    body: data,
  });
  setSending(false);
  if (res.ok) setSent(true);
};
```

You will also need to add `name` attributes to the inputs — they currently have none, because nothing reads them.

Before you ship a real endpoint: add server-side validation, rate limiting, spam and bot protection, and a privacy notice explaining what you do with submitted messages. As shipped, this repository collects nothing, so none of that applies; the moment you connect a backend, all of it does. Note also that a static export (the GitHub Pages path below) has no server of its own, so the endpoint must be an external service or a separately hosted API.

---

## Deployment

### GitHub Pages (primary path)

Deployment runs through GitHub Actions from `.github/workflows/deploy.yml`, with `.github/workflows/ci.yml` type-checking and building on pull requests.

The build is controlled by a single environment variable. When `GITHUB_PAGES=true`, `next.config.mjs` switches into static-export mode:

```js
const isGithubPages = process.env.GITHUB_PAGES === 'true';

// when isGithubPages:
//   output:       "export"      → emits a static site into out/
//   basePath:     "/KIMI"       → routes are served from the project subpath
//   assetPrefix:  "/KIMI/"      → assets resolve under the same subpath
//   images.unoptimized: true    → required; no image optimizer exists in export mode
```

The `basePath` is required because this is a **project page**, served from `https://hamzahossainX.github.io/KIMI/` rather than from a domain root. Without it, every asset would 404.

One-time repository setup: **Settings → Pages → Source → GitHub Actions**. After that, every push to `main` publishes.

To reproduce the Pages build locally, note first that it hardcodes the `/KIMI` prefix into every emitted URL, so `out/` cannot be served at a static server's root — it has to sit under a `/KIMI` path. Copy it into a prefix directory first:

```bash
GITHUB_PAGES=true npm run build          # writes ./out
mkdir -p .preview/KIMI && cp -r out/. .preview/KIMI/
npx serve .preview                       # open http://localhost:3000/KIMI/
```

`npm start` will not work on that build either — `next start` runs a Node server, which static export does not produce. For a root-served local preview, build without `GITHUB_PAGES` and use `npm run dev` or `npm run build && npm start`.

**Static-export caveats**

- `next/image` optimization is disabled (`images.unoptimized: true`). Images are served at their source resolution, so size and compress them yourself before uploading.
- No API routes, route handlers, server actions or middleware. This site uses none of those, so nothing is lost here.

### Deploying elsewhere (Vercel, Netlify, any Node host)

Omit `GITHUB_PAGES` entirely. The config falls back to the default Next.js build: no `basePath`, no `assetPrefix`, and full `next/image` optimization. Import the repository, keep the default `npm run build`, and deploy. On a custom domain served from the root, the `basePath` would be wrong anyway.

---

## Performance and accessibility

**Performance**

- The React Three Fiber bundle is loaded with `dynamic(..., { ssr: false })` in `components/Hero.tsx`, keeping three.js off the server render and off the critical path. A solid `bg-void` block stands in while it loads, so there is no layout shift.
- `dpr={[1, 2]}` clamps the canvas pixel ratio, capping GPU cost on 3x displays.
- Fonts go through `next/font/google`, which downloads and self-hosts the font files at build time. There are no render-blocking stylesheet requests to `fonts.googleapis.com` and no runtime connection to a third-party font origin.
- The film-grain overlay is an inline SVG data URI, not an image request.
- The scroll listener in `components/Navbar.tsx` is registered `{ passive: true }` and removed on unmount.
- Portfolio reveals use `viewport={{ once: true }}`, so each card animates exactly once.

**Accessibility**

- Semantic landmarks throughout: `<main>` wraps the page, `<header>` and `<nav>` for navigation, `<footer>` for the footer, and each section is a `<section>` with a stable `id` for anchor navigation.
- The mobile menu button carries `aria-label="Toggle menu"`.
- The decorative WebGL canvas is marked `aria-hidden`, so screen readers skip it entirely.
- All portfolio images have `alt` text derived from the project title.
- External links use `target="_blank"` with `rel="noreferrer"`, which blocks reverse tabnabbing and referrer leakage.

### Roadmap / known gaps

These are real, currently unaddressed, and listed here rather than glossed over:

- **No `prefers-reduced-motion` handling.** Nothing in the codebase reads the media query. Every animation runs for every visitor. This is the highest-priority gap.
- **No WebGL fallback.** If a device cannot create a WebGL2 context, the hero renders with an empty background instead of a static image.
- **Masonry reorders content visually.** CSS multi-column layout fills column by column, so the on-screen order does not match DOM order. Keyboard and screen-reader traversal follows the DOM.
- **Form inputs use placeholders instead of `<label>` elements,** and carry no `name` attributes. Both need fixing before the form is wired to a real endpoint.
- **The mobile menu button has no `aria-expanded`** to communicate open/closed state.
- **No automated tests.** There is no test runner, no test script and no test files.
- **No committed ESLint or Prettier configuration.** `npm run lint` will ask you to generate one on first use.

---

## Browser support

Modern evergreen browsers — recent Chrome, Edge, Firefox and Safari. The hero requires **WebGL2**; the rest of the page relies on CSS `backdrop-filter`, CSS multi-column layout and `clamp()`.

---

## Security

This is a fully client-side static site with no backend, no data collection and no secrets. See [SECURITY.md](SECURITY.md) for the threat model, the third-party origins involved, the hosting limitations of GitHub Pages, and how to report a vulnerability.

---

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, coding conventions and the pull request process.

## License

Released under the MIT License. Copyright (c) 2026 Ismail Hossen. See [LICENSE](LICENSE).

The placeholder images are served from picsum.photos at runtime and are not part of this repository or its license.

## Author

**Ismail Hossen** — [@hamzahossainX](https://github.com/hamzahossainX)
