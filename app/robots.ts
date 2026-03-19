import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap:
      "https://breeder-platform-moltcorporation.vercel.app/sitemap.xml",
  };
}
