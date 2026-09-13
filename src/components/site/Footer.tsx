import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { ContactForm } from "./ContactForm";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";

type ContactInfo = {
  phone: string;
  email: string;
  instagram: string;
  whatsapp: string;
  whatsapp2: string;
  telegram: string;
  facebook: string;
};

export function ContactSection({ locale, contact }: { locale: Locale; contact: ContactInfo }) {
  const dict = getDict(locale);
  return (
    <section id="contact" className="bg-bg py-20 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-fg sm:text-3xl">{dict.nav.contact}</h2>
          <div className="mt-6 space-y-2 text-sm text-muted">
            <p>{contact.phone}</p>
            {contact.whatsapp2 && <p>+{contact.whatsapp2}</p>}
            <p>{contact.email}</p>
            <p>Баку, Азербайджан</p>
          </div>
          <div className="mt-8 h-44 overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Baku, Azerbaijan"
              src="https://www.google.com/maps?q=Baku,Azerbaijan&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <ContactForm locale={locale} />
        </Reveal>
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
            <div className="flex items-center gap-2.5">
              <Logo size={24} />
              <div className="font-display text-lg text-cream">{dict.siteName}</div>
            </div>
            <p className="mt-3.5 max-w-xs text-sm leading-relaxed">{dict.footer.tagline}</p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm">
              {contact.instagram && (
                <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                  Instagram
                </a>
              )}
              {contact.facebook && (
                <a href={`https://facebook.com/${contact.facebook}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                  Facebook
                </a>
              )}
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                WhatsApp
              </a>
              {contact.whatsapp2 && (
                <a href={`https://wa.me/${contact.whatsapp2}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                  WhatsApp 2
                </a>
              )}
              {contact.telegram && (
                <a href={`https://t.me/${contact.telegram}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                  Telegram
                </a>
              )}
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-cream">{dict.footer.navTitle}</div>
            <div className="mt-4 flex flex-col gap-2.5 text-sm">
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="transition-colors hover:text-gold">
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
          <a href="#" className="transition-colors hover:text-gold">
            {dict.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
