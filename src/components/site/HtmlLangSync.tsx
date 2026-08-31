"use client";

import { useEffect } from "react";

/**
 * The root layout is shared by /, /az and /en and must stay a plain
 * static component (no request-time APIs) so every page keeps being
 * statically generated. This sets the real <html lang> client-side
 * instead — cheap, and search engines already get the correct
 * language from the URL path + hreflang alternates either way.
 */
export function HtmlLangSync({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
