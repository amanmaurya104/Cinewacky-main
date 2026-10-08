// Absolute origin of the deployed site, used for metadataBase, the sitemap and
// robots.txt. Set NEXT_PUBLIC_SITE_URL (e.g. https://example.com) in the
// production environment; the localhost fallback only suits development.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
