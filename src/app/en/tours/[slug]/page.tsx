import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { TourDetailPage } from "@/components/site/TourDetailPage";
import { localizeTour } from "@/lib/localize";

export async function generateStaticParams() {
  const tours = await prisma.tour.findMany({ where: { published: true }, select: { slug: true } });
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = await prisma.tour.findUnique({ where: { slug } });
  if (!tour) return {};
  const view = localizeTour(tour, "en");
  return {
    title: view.title,
    description: view.description,
    alternates: { canonical: `/en/tours/${slug}` },
    openGraph: {
      title: view.title,
      description: view.description,
      url: `/en/tours/${slug}`,
      siteName: "Baku Travel Guide",
      locale: "en_US",
      type: "website",
      images: view.imageUrl ? [{ url: view.imageUrl, alt: view.title }] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <TourDetailPage locale="en" slug={slug} />;
}
