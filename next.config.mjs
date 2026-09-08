/**
 * Next.js configuration.
 *
 * GITHUB_PAGES contract:
 *   Set GITHUB_PAGES=true ONLY in the GitHub Pages deployment workflow. It switches the
 *   build to a fully static export (`out/`) and rewrites asset/route URLs for the project
 *   subpath https://hamzahossainX.github.io/KIMI/.
 *
 *   Unset (the normal case) nothing changes: `npm run dev` and `npm run build` behave
 *   exactly as they did before, served from the root path with the Next.js image optimizer
 *   enabled.
 *
 *   `images.unoptimized` is required under `output: 'export'` because the static export has
 *   no server to run the optimizer on.
 */

/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = 'KIMI';

const nextConfig = {
  ...(isGithubPages && {
    output: 'export',
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  }),
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
  },
  reactStrictMode: true,
};

export default nextConfig;
