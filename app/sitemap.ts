import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Only the homepage is a real route — /connected now redirects to /.
  return [
    {
      url: "https://dockpops.com/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
