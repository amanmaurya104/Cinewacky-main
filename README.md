This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://example.com`) in production; the sitemap, robots.txt and social metadata use it.

## Project structure

```
app/                  Routes. /project/[slug] is a project; /project/[slug]/[storySlug]
                      is a story or documentary under it. sitemap.ts, robots.ts.
components/
  layout/             Site-wide chrome: SiteHeader, SiteMenu
  showcase/           Homepage scroll showcase
  project/            Project pages (video stack and mosaic layouts)
  story/              Story pages
  documentary/        Shared pieces at the root (DocumentaryVideo, SilentLoop);
    archive/ craft/   one folder per documentary theme. standard/ is the
    dragon/ ...       default theme.
  maintenance/        The /maintenance screen
  ui/                 Generic, reusable UI (galleries, cards, pixel image)
data/                 Site content: projects, stories, documentaries, navigation
lib/                  Logic over that content (lookups, hrefs, fonts, site URL)
hooks/                Reusable React hooks
types/                Shared TypeScript types
styles/               Global CSS per area; styles/documentary/ holds one file per theme
scripts/              Media build scripts (npm run media:*)
public/               Served assets
```

### Publishing a page

Unfinished pages link to `/maintenance` and redirect there if visited directly.

- **Project:** set `ready: true` on it in `data/projects.ts`.
- **Story or documentary under Reel Vibe Uncut:** add its slug to `LIVE_REEL_PAGES` in `lib/stories.ts`.
- **Experience / Achievements / Contact:** set `ready: true` in `data/navigation.ts`.

The menu, homepage, project pages and sitemap all follow these flags.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
