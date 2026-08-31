import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { localizeTour, localizeTestimonial } from "@/lib/localize";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { localBusinessJsonLd, faqJsonLd } from "@/lib/seo";

import { HtmlLangSync } from "./HtmlLangSync";
import { PromoBanner } from "./PromoBanner";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { TrustStats } from "./TrustStats";
import { About } from "./About";
import { ToursSection } from "./ToursSection";
import { Gallery } from "./Gallery";
import { Testimonials } from "./Testimonials";
import { Faq } from "./Faq";
import { CtaBand } from "./CtaBand";
import { ContactSection, Footer } from "./Footer";

export async function HomePage({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const [tours, testimonials, settings] = await Promise.all([
    prisma.tour.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    getSettings(),
  ]);

  const promoText =
    locale === "ru" ? settings.promoTextRu : locale === "az" ? settings.promoTextAz : settings.promoTextEn;

  const contact = {
    phone: settings.phone,
    email: settings.email,
    instagram: settings.instagram,
    whatsapp: settings.whatsapp,
    whatsapp2: settings.whatsapp2,
    telegram: settings.telegram,
    facebook: settings.facebook,
  };

  const businessJsonLd = localBusinessJsonLd({
    phone: settings.phone,
    email: settings.email,
    instagram: settings.instagram,
    facebook: settings.facebook,
  });
  const faqSchema = faqJsonLd(dict.faq.items);

  return (
    <div className="min-h-screen bg-bg" lang={dict.htmlLang}>
      <HtmlLangSync lang={dict.htmlLang} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {settings.promoEnabled && promoText && <PromoBanner text={promoText} />}
      <Header locale={locale} whatsapp={settings.whatsapp} />
      <main>
        <Hero locale={locale} whatsapp={settings.whatsapp} phone={settings.phone} />
        <TrustStats locale={locale} />
        <About locale={locale} />
        <ToursSection
          locale={locale}
          tours={tours.map((t) => localizeTour(t, locale))}
          rates={{ usdRate: settings.usdRate, rubRate: settings.rubRate }}
        />
        <Gallery locale={locale} />
        <Testimonials
          locale={locale}
          testimonials={testimonials.map((t) => localizeTestimonial(t, locale))}
          googleReviewLink={settings.googleReviewLink}
        />
        <Faq locale={locale} />
        <CtaBand locale={locale} whatsapp={settings.whatsapp} />
        <ContactSection locale={locale} contact={contact} />
      </main>
      <Footer locale={locale} contact={contact} />
    </div>
  );
}
