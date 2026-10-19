/**
 * Whether a page is open to visitors. A `draft` page redirects to
 * /maintenance, links to it go there instead, and the sitemap leaves it out.
 * Rules for combining statuses live in lib/publishing.ts.
 */
export type PublishStatus = 'live' | 'draft';
