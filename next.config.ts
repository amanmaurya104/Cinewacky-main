import type { NextConfig } from "next";

// Media folders under `public/` whose contents are content-stable: once a file
// with a given name is published it is never edited in place. Next serves
// `public/` with `Cache-Control: public, max-age=0` by default, which makes the
// browser re-request every still, GIF and video on each page load — the single
// biggest cost on repeat visits here. If you ever need to replace one of these
// files, publish it under a new name so caches pick it up.
const IMMUTABLE_MEDIA = [
  "/projects/:path*",
  "/showcase/:path*",
  "/showcase-thumbs/:path*",
  "/documentaries/:path*",
  "/logo/:path*",
  "/textures/:path*",
];

const nextConfig: NextConfig = {
  images: {
    // AVIF first (smaller), WebP for everything that can't take AVIF.
    formats: ["image/avif", "image/webp"],
    // Required from Next 16 on; 75 is the `next/image` default.
    qualities: [60, 75],
    // Optimized derivatives are safe to hold for a year — the cache key already
    // includes the source path, width and quality.
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return IMMUTABLE_MEDIA.map((source) => ({
      source,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    }));
  },
};

export default nextConfig;
