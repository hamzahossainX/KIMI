# Contributing to NOVA

Thanks for taking the time to look at this project. NOVA is a dark, immersive
single-page portfolio built with the Next.js App Router, Tailwind CSS, Framer
Motion and React Three Fiber. The site content — the persona "Kael Voss", the
project names, the statistics and the placeholder imagery — is demo content for
a portfolio **template**, not a real person's live site. Contributions that
improve the template are welcome; contributions that add fabricated credentials
to the demo content are not.

## What is useful here

| Area | Examples |
| --- | --- |
| Bug fixes | Broken layout at a specific breakpoint, hydration warnings, motion that fires twice, `next/image` misconfiguration |
| Accessibility | Focus states, keyboard navigation of the mobile menu, ARIA labelling, `prefers-reduced-motion` support, colour contrast |
| Performance | Reducing the three.js bundle, lowering canvas DPR cost on low-end devices, deferring offscreen work, image sizing |
| Documentation | Clearer setup steps, corrections, deployment notes |
| New sections or components | Anything that fits the existing design language and token set |

Before starting anything large, open an issue and describe the change. It saves
you from building something that does not fit the direction of the project.

## Development setup

Prerequisites:

- **Node.js 18.17 or newer** — required by Next.js 14. The project is developed
  against Node 22.
- **npm** — the repository commits `package-lock.json`, so npm is the expected
  package manager.

```bash
# 1. Fork the repository on GitHub, then clone your fork
git clone https://github.com/<your-username>/KIMI.git
cd KIMI

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open <http://localhost:3000>.

Available scripts (these are the only ones defined in `package.json`):

| Script | Purpose |
| --- | --- |
| `npm run dev` | Next.js development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | `next lint` — note that no ESLint configuration is committed yet, so the first run will offer to create one |

Keep your fork in sync with `main` before opening a pull request.

## Branch naming

Branch off `main` using a type prefix and a short, hyphenated slug:

```
feat/reduced-motion-support
fix/navbar-scroll-lock
docs/contributing-guide
chore/bump-three
ci/pages-deploy
refactor/hero-parallax
```

Prefixes in use: `feat/`, `fix/`, `docs/`, `chore/`, `ci/`, `refactor/`.

## Commit convention

Commits follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short imperative summary>
```

The scope is the component, route or config file the change touches — for
example `hero`, `nav`, `portfolio`, `about`, `contact`, `canvas`, `readme`,
`tailwind`, `deps`.

| Type | Meaning | Example |
| --- | --- | --- |
| `feat` | A new user-facing capability | `feat(hero): add reduced-motion fallback for the parallax headline` |
| `fix` | A bug fix | `fix(nav): close the mobile menu when a hash link is followed` |
| `docs` | Documentation only | `docs(readme): document the basePath needed for GitHub Pages` |
| `style` | Formatting, whitespace, class ordering — no behaviour change | `style(portfolio): sort tailwind classes consistently` |
| `refactor` | Restructuring without changing behaviour | `refactor(about): extract the skill bar into its own component` |
| `perf` | A measurable performance improvement | `perf(canvas): cap dpr at 1.5 on coarse pointers` |
| `chore` | Housekeeping that is not source or docs | `chore: add .editorconfig` |
| `ci` | Workflow and automation changes | `ci: build and deploy to github pages on push to main` |
| `build` | Dependencies and build configuration | `build(deps): bump three to 0.164.1` |

Write the summary in the imperative mood, lowercase, with no trailing period.
Keep the subject line under about 72 characters and put the reasoning in the
body.

## Code style

- **TypeScript strict mode.** `tsconfig.json` sets `strict: true`. Do not widen
  types with `any` to silence the compiler.
- **Function components with explicit prop types.** Declare a `type` or
  `interface` for props rather than inlining a large object literal.
- **`"use client"` only where it is needed.** A component earns the directive by
  using hooks, browser APIs, or Framer Motion / React Three Fiber. `components/Footer.tsx`
  is deliberately a server component — keep it that way, and prefer server
  components for any new static section.
- **Tailwind utilities over custom CSS.** `app/globals.css` holds the Tailwind
  layers, a small set of base rules (the `:root` accent variable, the `body`
  defaults, `::selection` and the scrollbar treatment) and the `.glass`,
  `.text-stroke` and `.noise` utilities. Add a new utility there only when a
  utility class composition genuinely cannot express it.
- **Design tokens live in `tailwind.config.ts`.** Colours (`void`, `carbon`,
  `ash`, `line`, `accent`, `violet`), the `font-display` / `font-body` families
  and the `marquee` / `shimmer` keyframes are defined there. Reference the
  tokens; do not hard-code hex values in components.
- **Reuse the shared easing curve.** Motion in this project uses
  `[0.22, 1, 0.36, 1]`, declared as a module-level `ease` constant in `Hero`,
  `Portfolio`, `About` and `Contact`; `Navbar` inlines the same curve. New
  transitions should use the same curve so the site keeps one rhythm.
- **Formatting:** two-space indentation, double-quoted strings, semicolons — the
  same as the existing source. `.editorconfig` covers indentation, UTF-8 and LF
  line endings; there is no Prettier configuration in the repository, so match
  the surrounding code by hand.

## Before opening a pull request

- [ ] `npm run build` completes without errors or new warnings
- [ ] `npx tsc --noEmit` is clean
- [ ] Checked at mobile, tablet and desktop widths (roughly 375px, 768px and 1440px)
- [ ] No errors or warnings in the browser console, including hydration warnings
- [ ] No placeholder persona text shipped where it does not belong — the demo
      copy stays in the demo sections
- [ ] No secrets, `.env` files, or credentials of any kind (the project has none
      and should keep it that way)
- [ ] `node_modules/`, `.next/` and `out/` are not committed

## Pull request process

1. Keep each pull request focused on one change. Split unrelated fixes.
2. Fill in the pull request template.
3. Link the issue the PR addresses (`Closes #12`).
4. Include before/after screenshots or a short screen capture for anything
   visual — this is a design-led project and review depends on seeing it.
5. Expect review comments, and push follow-up commits to the same branch rather
   than force-pushing over the review history where you can avoid it.
6. The CI workflow (`npx tsc --noEmit` and `npm run build` on Node 18, 20 and
   22) must be green before a PR is merged.

## Reporting bugs

Open an issue with:

- What you expected and what actually happened
- Steps to reproduce
- Browser, operating system and Node.js version
- Viewport width if the problem is layout- or motion-related
- Console output and a screenshot or recording where relevant

## Requesting features

Describe the problem before the solution: what is missing, who it affects, and
how it fits the existing design language. Reference the section or component it
would touch.

## Security issues

Do not open a public issue for a security problem. Follow the disclosure process
in [SECURITY.md](SECURITY.md).

## Code of conduct

Be respectful. Assume good faith. Critique the code, not the person. Harassment,
personal attacks, and discriminatory language are not acceptable in issues, pull
requests, or any other project space.

Maintainers may edit, hide, or remove contributions that break these terms, and
may block repeat offenders. Report unacceptable behaviour privately to
<hamzahossain3842@gmail.com>. Reports are handled confidentially.

## License

By contributing, you agree that your contributions are licensed under the
[MIT License](LICENSE) that covers this project.
