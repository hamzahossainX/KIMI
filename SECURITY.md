# Security Policy

## Overview

NOVA is a fully static, client-rendered marketing/portfolio site built with Next.js 14 (App Router). Every component ships to the browser; nothing in this repository executes on a server at request time.

Confirmed by reading the source:

- **No server-side execution.** There are no API routes, no route handlers, no server actions and no middleware in `app/`.
- **No persistence.** No database, no cache layer, no file writes. A repository-wide grep finds no `localStorage`, `sessionStorage`, `document.cookie`, `fetch(`, or `XMLHttpRequest` usage in `app/` or `components/`.
- **No authentication or sessions.** There is nothing to log into, so there is no session, token or cookie handling to attack.
- **No secrets.** No `process.env` references in application code, no `.env` files, and `.env*` is listed in `.gitignore`.
- **No dynamic HTML.** No `dangerouslySetInnerHTML`, `innerHTML`, `eval()` or `new Function()` anywhere in the source.

The realistic threat model is therefore **low**. There is no user data to exfiltrate and no server process to compromise. Inflating that would waste your time and ours.

The attack surface that genuinely exists is:

| Surface | Why it matters |
| --- | --- |
| The npm dependency tree | The `three` / `@react-three/fiber` / `@react-three/drei` / `framer-motion` stack pulls a large transitive graph. A malicious or compromised package executes at build time and ships to every visitor. |
| The GitHub Actions build/publish pipeline (`ci.yml`, `deploy.yml`) | Workflow code runs with repository credentials. Over-broad `GITHUB_TOKEN` permissions, unpinned third-party actions, or interpolation of untrusted input into a `run:` block are the standard ways a static-site repo gets compromised. |
| `https://picsum.photos` | The single third-party origin loaded at runtime, used for placeholder imagery. It is outside this project's control. |

Note also that this is a **demonstration build**. The persona "Kael Voss", the project names, the statistics and the address `hello@kaelvoss.studio` are placeholder content, not a real identity. Treat them as such when assessing anything that looks like data exposure.

## Supported Versions

This project has a single release line. Fixes land on `main`; there are no maintenance branches or backports.

| Version | Supported |
| --- | --- |
| `main` (latest commit) | Yes |
| Tagged releases older than the latest | No |
| Forks and vendored copies | No — the fork owner is responsible |

If you are running an older commit, update to the current `main` before reporting.

## Reporting a Vulnerability

**Do not open a public GitHub issue for a security vulnerability.** Public issues disclose the problem before a fix exists.

**Preferred channel — GitHub private vulnerability reporting:**

<https://github.com/hamzahossainX/KIMI/security/advisories/new>

(Also reachable from the repository's **Security** tab → **Report a vulnerability**.) This keeps the report private, gives us a place to draft a fix, and produces a proper advisory when the issue is resolved.

**Fallback — email:** <hamzahossain3842@gmail.com>. Use this only if you cannot access the advisory form. Email is unencrypted; do not include exploit code you would not want in a mailbox.

### What to include

A report we can act on contains:

1. **Affected file and commit** — path plus the commit SHA or tag you tested.
2. **Reproduction** — exact steps, browser and version, and any input required. A minimal reproduction beats a long narrative.
3. **Impact** — what an attacker gains. Given the static architecture, be specific about who is harmed and how.
4. **Suggested fix**, if you have one. Optional, always welcome.

Screenshots and short recordings help. Automated scanner output pasted without analysis does not.

### Response targets

| Stage | Target |
| --- | --- |
| Acknowledgement of your report | Within 72 hours |
| Triage decision (confirmed / not reproducible / out of scope) | Within 7 days |
| Fix released, or a documented decision not to fix, for confirmed issues | Within 30 days |

This is a personally maintained project, not a funded security team. These are honest targets, not a contractual SLA. If a deadline is going to slip, you will be told rather than ignored.

### Disclosure

Please allow **90 days** of coordinated disclosure from the acknowledgement date before publishing, or until a fix ships — whichever comes first. If you need to publish sooner, say so in the report and we will agree a timeline.

There is **no paid bounty**. Reporters are credited by name or handle in the published advisory and in the commit or release notes, unless you ask to stay anonymous.

## Scope

| In scope | Out of scope |
| --- | --- |
| XSS, HTML or script injection reachable through code in `app/` or `components/` | Findings against `picsum.photos`, GitHub Pages, or GitHub's own infrastructure — report those to their owners |
| Supply-chain integrity issues in `package.json` / `package-lock.json` (malicious, typosquatted or compromised packages) | Missing HTTP security headers on GitHub Pages — a documented host limitation, see below |
| Dependency confusion against any package this project resolves | Self-XSS requiring the victim to paste code into their own console |
| CI/CD workflow misconfiguration: over-broad `GITHUB_TOKEN` permissions, script injection via untrusted workflow inputs, unpinned or hijackable actions, `pull_request_target` misuse | Clickjacking on a static page with no authenticated state and no state-changing action |
| Secrets or credentials leaked in the repository or its git history | Volumetric denial of service, traffic flooding, or resource exhaustion against a CDN-hosted static site |
| Build-time code execution triggered by repository content | Scanner output or best-practice deviations with no demonstrated impact |
| Vulnerabilities in a pinned dependency version that are actually reachable from this application's code | Social engineering, phishing, or physical attacks against the maintainer |

A finding in a dependency that is **not reachable** from this application's code (for example, a Node-only sink in a package used solely at build time) is still worth telling us about — it will be handled as a routine dependency upgrade rather than an advisory.

## Data Handling and Privacy

**The contact form does not transmit anything. No data is collected, transmitted, stored or shared by this site.**

This is the single most important fact in this document, so here is the actual implementation from `components/Contact.tsx`:

```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSending(true);
  setTimeout(() => {
    setSending(false);
    setSent(true);
  }, 900);
};
```

The handler cancels the browser's native submit, flips two pieces of local React state, and after 900 ms renders a success message. There is no `fetch`, no `XMLHttpRequest`, no form action attribute and no third-party form service. The inputs are uncontrolled and carry no `name` attributes — their values are never read, never leave the component, and are discarded when the page unloads. The `required` and `type="email"` attributes are browser-side UX validation only and carry no security weight.

There are also **no analytics, no tracking pixels and no telemetry** of any kind in this repository.

> **Warning — if you wire this form to a real backend, this section stops being true.**
>
> The moment the form posts anywhere, you are processing personal data and become the data controller for it. Before shipping that change you must add:
>
> - **Server-side validation and output encoding.** Client-side `required` attributes are trivially bypassed; never trust submitted values.
> - **Rate limiting** per IP and per session on the receiving endpoint.
> - **Bot and spam mitigation** (a challenge, a proof-of-work check, or an equivalent) — an unprotected public contact endpoint is found and abused within days.
> - **Transport security**: HTTPS only, with the endpoint on an origin you control.
> - **A privacy notice** stating what is collected, why, where it is stored, how long it is retained, and how to request deletion — plus whatever your jurisdiction requires (GDPR, CCPA and similar).
> - **Secret handling** for any API key the backend needs. Never inline a key into client code; anything in a `NEXT_PUBLIC_*` variable is public.

## Third-Party Content

`https://picsum.photos` is the **only** third-party origin contacted at runtime. It is allowlisted in the `images` block of `next.config.mjs`, where `isGithubPages` is that file's `process.env.GITHUB_PAGES === 'true'` flag:

```js
images: {
  unoptimized: isGithubPages,
  remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
}
```

and used in `components/Portfolio.tsx` as the source for all nine placeholder project images. It is a third-party service outside this project's control: it can change what it returns, go offline, or be compromised. **Replace it with self-hosted assets before any production deployment.** That removes the origin from your CSP and your availability dependencies at the same time.

Fonts are **not** a runtime third-party request. `app/layout.tsx` loads Space Grotesk and Inter through `next/font/google`, which downloads and self-hosts the font files at build time. Visitors make no request to `fonts.googleapis.com` or `fonts.gstatic.com`.

Outbound links to external sites (`components/Contact.tsx`) use `target="_blank"` together with `rel="noreferrer"`, which blocks reverse tabnabbing via `window.opener` and suppresses the `Referer` header. This has been verified in the source.

## Content Security Policy and HTTP Headers

**GitHub Pages cannot serve custom HTTP response headers.** If the site is hosted there, `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options` and `Referrer-Policy` **cannot be set**. That is a hosting limitation, not an oversight, and it is why missing headers on the Pages deployment are out of scope above. A `<meta http-equiv="Content-Security-Policy">` tag is a partial substitute at best — it cannot express `frame-ancestors` and it applies only after the document starts parsing.

If you host behind a platform that does support headers (Vercel, Netlify, Cloudflare, nginx), the following is a workable starting policy **for this codebase specifically**:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://picsum.photos;
  font-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

Why each non-obvious directive is what it is:

- **`script-src 'unsafe-inline'`** — Next.js inlines its bootstrap and server-component payload in `<script>` tags in the generated HTML. Removing `'unsafe-inline'` requires nonce-based CSP, which requires middleware to generate a per-request nonce, which opts routes out of static rendering. This project has no middleware and is deliberately static, so the tradeoff is not worth it here. If you add a server layer anyway, switch to nonces.
- **`style-src 'unsafe-inline'`** — required twice over: `next/font` injects a `<style>` block for the self-hosted font faces, and Framer Motion animates by writing inline `style` attributes on elements on every frame. Dropping `'unsafe-inline'` stops the animations, not just the styling.
- **`img-src data:`** — the film-grain overlay in `app/globals.css` (`.noise::after`, applied to `<body>` in `app/layout.tsx`) is an inline SVG `feTurbulence` texture embedded as a `data:` URI in `background-image`. Without `data:`, the grain silently disappears.
- **`img-src https://picsum.photos`** — the portfolio imagery. Keep this until the images are self-hosted; drop it the moment they are. On a normal build the Next.js optimizer proxies the images same-origin via `/_next/image`; under `GITHUB_PAGES=true` the static export sets `images.unoptimized`, so the browser fetches `picsum.photos` directly. Allowlisting the origin covers both deployment shapes.
- **`connect-src 'self'`** — the application makes no outbound requests at runtime. Note that `next dev` uses a websocket for hot reload; this policy is intended for production builds only.
- **`frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`** — free wins. Nothing here embeds the site or uses plugins or a `<base>` tag.

Applying a naive `default-src 'self'` policy without the `'unsafe-inline'` and `data:` allowances above will produce a page that loads but has no fonts, no animation and no grain, usually with no visible error other than console noise. Test with the CSP in report-only mode first.

## Dependency and Supply-Chain Security

This is the highest-value area to get right, because a compromised build-time dependency reaches every visitor.

- **Dependabot version updates are already configured** in `.github/dependabot.yml`: weekly `npm` and `github-actions` checks, with minor and patch bumps grouped into a single pull request so the `three` / R3F / Framer Motion tree does not drift years behind while majors still arrive individually. That file is all version updates need — there is no toggle to flip. Separately enable Dependabot **alerts** and **security updates** under Settings → Code security; those two are repository settings, not file configuration.
- **Run `npm audit` regularly** and before every release. Treat findings reachable from application code as blocking; document the rest.
- **`package-lock.json` is committed**, so installs are reproducible and every transitive version is pinned to an integrity hash. Do not delete it, and do not regenerate it casually inside an unrelated change.
- **CI must use `npm ci`, never `npm install`.** `npm ci` installs exactly what the lockfile specifies and fails if `package.json` and the lockfile disagree; `npm install` will happily rewrite the lockfile mid-pipeline.
- **Review transitive updates in the 3D stack carefully.** `three`, `@react-three/fiber` and `@react-three/drei` move fast and are version-coupled; read the diff of a lockfile change rather than merging it on green CI alone.
- **`next` is pinned exactly (`14.2.3`)**, not range-matched. Bump it deliberately and read the release notes when you do.
- **The two shipped workflows already scope `GITHUB_TOKEN` to least privilege.** `.github/workflows/ci.yml` declares `permissions: contents: read` at the workflow level, and `.github/workflows/deploy.yml` does the same while granting `pages: write` and `id-token: write` to the Pages deploy job alone. Any new workflow must follow that rule: read-only at the top, extra scopes only on the job that needs them.
- **Those workflows reference actions by major-version tag, not commit SHA.** They use first-party `actions/*` only — `checkout@v4`, `setup-node@v4`, `configure-pages@v5`, `upload-pages-artifact@v3`, `deploy-pages@v4`. A mutable tag is a dependency whose owner can silently change what it points at, so pin to full commit SHAs if your threat model does not extend that trust to the `actions` org. For any third-party action, treat SHA pinning as mandatory rather than optional.
- **Never interpolate untrusted input into a `run:` block.** Values such as `github.event.pull_request.title` or a branch name are attacker-controlled; pass them through `env:` and reference the environment variable inside the script instead of `${{ ... }}` templating.

## Hardening Checklist for Forks and Deployments

Before you put a copy of this site in front of real traffic:

- [ ] Replace all placeholder content — persona, project names, statistics — with your own. Nothing in the demo copy is factual.
- [ ] Replace the demo address `hello@kaelvoss.studio` and the generic social links in `components/Contact.tsx` with real ones.
- [ ] Self-host the portfolio imagery and remove `picsum.photos` from `next.config.mjs` and from your CSP.
- [ ] Decide what the contact form does. Either leave it as an inert demo and say so on the page, or wire it to a real backend and implement everything in the warning above.
- [ ] If your host supports response headers, set the CSP and the other headers above. If you are on GitHub Pages, accept that you cannot, and document it rather than claiming protection you do not have.
- [ ] Enable branch protection on `main`: require pull requests, require status checks to pass, and disallow force pushes.
- [ ] Enable secret scanning **and push protection** so a credential is blocked at push time rather than discovered afterwards.
- [ ] Enable Dependabot alerts and security updates in Settings → Code security (version updates already ship in `.github/dependabot.yml`).
- [ ] Keep `GITHUB_TOKEN` permissions minimal in every workflow — the two shipped workflows already are — and decide whether to pin the `actions/*` references to commit SHAs.
- [ ] Never commit `.env` files. `.env*` is already covered by `.gitignore` — verify it is still there after any merge.
- [ ] If a secret is ever committed, rotate it first and rewrite history second. Rewriting history alone does not un-leak anything.

## Thanks

Security research takes real time and is usually unpaid. If you take the trouble to find a problem here and report it privately, you have our genuine thanks — you will get a straight answer, a fix or a clear explanation of why not, and credit for the work.
