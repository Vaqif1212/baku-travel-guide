import type { Metadata } from "next";
import { HomePage } from "@/components/site/HomePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("en");

export default function Page() {
  return <HomePage locale="en" />;
}
