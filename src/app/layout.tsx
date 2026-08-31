import type { Metadata } from "next";
import { headers } from "next/headers";
import { Unbounded, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "cyrillic-ext"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://bakutravelguide.example"),
  title: {
    default: "Baku Travel Guide",
    template: "%s · Baku Travel Guide",
  },
};

// Applies the saved theme before paint, so there's no light-mode flash
// for visitors who chose dark last time.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = (await headers()).get("x-pathname") ?? "/";
  const lang = pathname.startsWith("/az") ? "az" : pathname.startsWith("/en") ? "en" : "ru";

  return (
    <html lang={lang} className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${unbounded.variable} ${jakarta.variable} min-h-full antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
