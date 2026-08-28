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
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: "Baku Travel Guide",
    description: "Private tour guide, driver and translator service in Baku, Azerbaijan.",
    areaServed: { "@type": "City", name: "Baku" },
    address: { "@type": "PostalAddress", addressLocality: "Baku", addressCountry: "AZ" },
    availableLanguage: ["Russian", "Azerbaijani", "English"],
  };
}
