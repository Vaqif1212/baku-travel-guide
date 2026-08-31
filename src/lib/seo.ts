import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const COPY: Record<Locale, { title: string; description: string; path: string }> = {
  ru: {
    title: "Baku Travel Guide — личный гид, водитель и переводчик в Баку",
    description:
      "Экскурсии по Баку и Азербайджану с русскоговорящим гидом Анаром: Гобустан, Янардаг, Старый город. Индивидуальные и групповые туры.",
    path: "/",
  },
  az: {
    title: "Baku Travel Guide — Bakıda şəxsi bələdçi və sürücü",
    description:
      "Anar ilə Bakı və Azərbaycan turları: Qobustan, Yanardağ, Köhnə şəhər. Fərdi və qrup turları.",
    path: "/az",
  },
  en: {
    title: "Baku Travel Guide — Private Guide & Driver in Baku",
    description:
      "Explore Baku and Azerbaijan with guide Anar: Gobustan, Yanar Dag, the Old City. Private and group tours in Russian, Azerbaijani and English.",
    path: "/en",
  },
};

export function buildMetadata(locale: Locale): Metadata {
  const copy = COPY[locale];
  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: {
      canonical: copy.path,
      languages: { ru: "/", az: "/az", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: copy.path,
      siteName: "Baku Travel Guide",
      locale: locale === "ru" ? "ru_RU" : locale === "az" ? "az_AZ" : "en_US",
      type: "website",
      images: [{ url: "/images/hero-flame-towers.jpg", width: 1920, height: 1280, alt: copy.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: ["/images/hero-flame-towers.jpg"],
    },
  };
}

type ContactForSchema = { phone: string; email: string; instagram: string; facebook: string };

export function localBusinessJsonLd(contact: ContactForSchema) {
  const siteUrl = process.env.SITE_URL ?? "https://baku-travel-guide.vercel.app";
  const sameAs = [
    contact.instagram ? `https://instagram.com/${contact.instagram}` : null,
    contact.facebook ? `https://facebook.com/${contact.facebook}` : null,
  ].filter((x): x is string => Boolean(x));

  return {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: "Baku Travel Guide",
    description: "Private tour guide, driver and translator service in Baku, Azerbaijan.",
    url: siteUrl,
    image: `${siteUrl}/images/anar-bottle-house.jpg`,
    telephone: contact.phone || undefined,
    email: contact.email || undefined,
    areaServed: { "@type": "City", name: "Baku" },
    address: { "@type": "PostalAddress", addressLocality: "Baku", addressCountry: "AZ" },
    availableLanguage: ["Russian", "Azerbaijani", "English"],
    sameAs: sameAs.length ? sameAs : undefined,
    founder: { "@type": "Person", name: "Anar Rustamov", jobTitle: "Tour Guide" },
  };
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
