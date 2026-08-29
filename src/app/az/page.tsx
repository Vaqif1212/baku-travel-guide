import type { Metadata } from "next";
import { HomePage } from "@/components/site/HomePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("az");

export default function Page() {
  return <HomePage locale="az" />;
}
