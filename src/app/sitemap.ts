import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.SITE_URL ?? "https://bakutravelguide.example";
  const [posts, tours] = await Promise.all([
    prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.tour.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const tourUrls = tours.flatMap((t) => [
    { url: `${base}/tours/${t.slug}`, lastModified: t.updatedAt, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/az/tours/${t.slug}`, lastModified: t.updatedAt, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/en/tours/${t.slug}`, lastModified: t.updatedAt, changeFrequency: "monthly" as const, priority: 0.7 },
  ]);

  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/az`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/en`, changeFrequency: "weekly", priority: 0.9 },
    ...tourUrls,
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
