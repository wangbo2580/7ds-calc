import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://7dscalc.com",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://7dscalc.com/team-builder",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://7dscalc.com/weapon-optimizer",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://7dscalc.com/damage-calculator",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://7dscalc.com/tier-list",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://7dscalc.com/reroll-guide",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://7dscalc.com/banners",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
