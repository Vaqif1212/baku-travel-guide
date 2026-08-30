"use client";

import { useState } from "react";
import type { AdminLocale } from "@/lib/adminI18n";
import { AdminLangSwitcher } from "./AdminLangSwitcher";
import { AdminNav } from "./AdminNav";
import { IconLogout } from "./icons";
import { Logo } from "@/components/site/Logo";

type NavLabels = { overview: string; tours: string; blog: string; testimonials: string; messages: string; settings: string; logout: string };

export function AdminShell({
  locale,
  labels,
  logoutAction,
  children,
}: {
  locale: AdminLocale;
  labels: NavLabels;
  logoutAction: () => Promise<void>;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3.5 sm:hidden">
        <div className="flex items-center gap-2.5">
          <Logo size={26} />
          <span className="text-sm font-bold text-neutral-900">Baku Travel Guide</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-b border-neutral-200 bg-white px-4 pb-4 sm:hidden">
          <div className="mb-4">
            <AdminLangSwitcher locale={locale} />
          </div>
          <div onClick={() => setOpen(false)}>
            <AdminNav labels={labels} />
          </div>
          <form action={logoutAction} className="mt-3 border-t border-neutral-100 pt-3">
            <button type="submit" className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700">
              <IconLogout />
              {labels.logout}
            </button>
          </form>
        </div>
      )}

      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r border-neutral-200 bg-white sm:flex sm:flex-col">
          <div className="flex items-center gap-2.5 border-b border-neutral-100 px-5 py-5">
            <Logo size={28} />
            <div>
              <div className="text-sm font-bold leading-tight text-neutral-900">Baku Travel Guide</div>
              <div className="text-xs text-neutral-400">Admin</div>
            </div>
          </div>

          <div className="px-5 pt-4">
            <AdminLangSwitcher locale={locale} />
          </div>

          <div className="flex-1 px-3 pt-4">
            <AdminNav labels={labels} />
          </div>

          <form action={logoutAction} className="border-t border-neutral-100 p-3">
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
            >
              <IconLogout />
              {labels.logout}
            </button>
          </form>
        </aside>
        <main className="min-w-0 flex-1 p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
