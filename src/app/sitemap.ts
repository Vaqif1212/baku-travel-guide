import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL ?? "https://bakutravelguide.example";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/az`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/en`, changeFrequency: "weekly", priority: 0.9 },
  ];
}
