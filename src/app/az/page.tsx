import type { Metadata } from "next";
import { HomePage } from "@/components/site/HomePage";
import { buildMetadata, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("az");

export default function Page() {
  const jsonLd = localBusinessJsonLd();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePage locale="az" />
    </>
  );
}
