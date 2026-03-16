import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://7dscalc.com",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
