"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { whatsappHref } from "@/lib/contact";
import { LangSwitcher } from "./LangSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

export function Header({ locale, whatsapp }: { locale: Locale; whatsapp: string }) {
  const dict = getDict(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const home = locale === "ru" ? "" : `/${locale}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const navItems = [
    { href: `${home}/#tours`, label: dict.nav.tours },
    { href: `${home}/#about`, label: dict.nav.about },
    { href: `${home}/#reviews`, label: dict.nav.reviews },
    { href: "/blog", label: dict.nav.blog },
    { href: `${home}/#contact`, label: dict.nav.contact },
  ];

  return (
    <header
      className={`sticky top-0 z-40 bg-bg-header transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/20" : ""
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href={locale === "ru" ? "/" : `/${locale}`} className="flex items-center gap-3">
          <Logo size={30} />
          <span className="font-display text-lg font-bold text-cream sm:text-xl">{dict.siteName}</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm text-cream transition-colors hover:text-gold"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <ThemeToggle labels={dict.themeToggle} />
          <LangSwitcher locale={locale} />
          <a
            href={whatsappHref(whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-green-deep transition-all hover:scale-[1.05] hover:bg-gold-light active:scale-[0.97]"
          >
            {dict.headerCta}
          </a>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-cream lg:hidden"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="animate-fade-in-down border-t border-gold/20 px-5 pb-6 lg:hidden">
          <nav className="flex flex-col gap-4 pt-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm text-cream hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex items-center gap-4">
            <ThemeToggle labels={dict.themeToggle} />
            <LangSwitcher locale={locale} />
          </div>
          <a
            href={whatsappHref(whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block rounded-full bg-gold px-5 py-3 text-center text-sm font-bold text-green-deep"
          >
            {dict.headerCta}
          </a>
        </div>
      )}
    </header>
  );
}
