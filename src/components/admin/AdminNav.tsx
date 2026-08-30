"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconGrid, IconMap, IconDocument, IconStar, IconMail, IconSettings } from "./icons";

export function AdminNav({
  labels,
}: {
  labels: { overview: string; tours: string; blog: string; testimonials: string; messages: string; settings: string };
}) {
  const pathname = usePathname();

  const items = [
    { href: "/admin", label: labels.overview, icon: IconGrid, exact: true },
    { href: "/admin/tours", label: labels.tours, icon: IconMap },
    { href: "/admin/blog", label: labels.blog, icon: IconDocument },
    { href: "/admin/testimonials", label: labels.testimonials, icon: IconStar },
    { href: "/admin/messages", label: labels.messages, icon: IconMail },
    { href: "/admin/settings", label: labels.settings, icon: IconSettings },
  ];

  return (
    <nav className="flex flex-col gap-0.5">
      {items.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? "bg-[#1F3B2E] text-white" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            }`}
          >
            <Icon className={active ? "text-[#C9A227]" : "text-neutral-400"} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
