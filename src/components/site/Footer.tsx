import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { ContactForm } from "./ContactForm";

type ContactInfo = { phone: string; email: string; instagram: string; whatsapp: string; telegram: string };

export function ContactSection({ locale, contact }: { locale: Locale; contact: ContactInfo }) {
  const dict = getDict(locale);
  return (
    <section id="contact" className="bg-bg py-20 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-fg sm:text-3xl">{dict.nav.contact}</h2>
          <div className="mt-6 space-y-2 text-sm text-muted">
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
            <p>Баку, Азербайджан</p>
          </div>
          <div className="mt-8 flex h-44 items-center justify-center rounded border border-border bg-bg-alt text-muted">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22s7-6.5 7-12A7 7 0 0 0 5 10c0 5.5 7 12 7 12Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span className="ml-3 text-sm">Баку, Азербайджан</span>
          </div>
        </div>
        <ContactForm locale={locale} />
      </div>
    </section>
  );
}

export function Footer({ locale, contact }: { locale: Locale; contact: ContactInfo }) {
  const dict = getDict(locale);
  const home = locale === "ru" ? "" : `/${locale}`;
  const nav = [
    { href: `${home}/#tours`, label: dict.nav.tours },
    { href: `${home}/#about`, label: dict.nav.about },
    { href: `${home}/#reviews`, label: dict.nav.reviews },
    { href: "/blog", label: dict.nav.blog },
    { href: `${home}/#contact`, label: dict.nav.contact },
  ];
  return (
    <footer className="bg-green-darker pt-16 text-cream/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-gold/15 pb-12 sm:grid-cols-3">
          <div>
            <div className="font-display text-lg text-cream">{dict.siteName}</div>
            <p className="mt-3.5 max-w-xs text-sm leading-relaxed">{dict.footer.tagline}</p>
            <div className="mt-5 flex gap-5 text-sm">
              <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                Instagram
              </a>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                WhatsApp
              </a>
              <a href={`https://t.me/${contact.telegram}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                Telegram
              </a>
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-cream">{dict.footer.navTitle}</div>
            <div className="mt-4 flex flex-col gap-2.5 text-sm">
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="hover:text-gold">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-cream">{dict.footer.contactTitle}</div>
            <div className="mt-4 space-y-2 text-sm leading-loose">
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <span>{dict.footer.rights}</span>
          <a href="#" className="hover:text-gold">
            {dict.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
