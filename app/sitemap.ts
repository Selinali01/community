import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://community.bubblelab.ai",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
