import type { Metadata } from "next";
import { Unbounded, Plus_Jakarta_Sans } from "next/font/google";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${unbounded.variable} ${jakarta.variable} min-h-full antialiased`}>{children}</body>
    </html>
  );
}
