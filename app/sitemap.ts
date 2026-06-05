import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Real routes: homepage + privacy policy. /connected redirects to /.
  return [
    {
      url: "https://dockpops.com/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://dockpops.com/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
