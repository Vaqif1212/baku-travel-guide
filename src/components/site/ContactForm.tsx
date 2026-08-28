"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";

export function ContactForm({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          contact: data.get("contact"),
          text: data.get("text"),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <h3 className="font-display text-xl font-bold text-fg">{dict.contactForm.title}</h3>
      <p className="mt-2 text-sm text-muted">{dict.contactForm.subtitle}</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          name="name"
          required
          maxLength={200}
          placeholder={dict.contactForm.name}
          className="w-full rounded-sm border border-border bg-bg-alt px-4 py-3 text-sm text-fg placeholder:text-muted focus:border-gold focus:outline-none"
        />
        <input
          name="contact"
          required
          maxLength={200}
          placeholder={dict.contactForm.contact}
          className="w-full rounded-sm border border-border bg-bg-alt px-4 py-3 text-sm text-fg placeholder:text-muted focus:border-gold focus:outline-none"
        />
        <textarea
          name="text"
          required
          maxLength={4000}
          rows={4}
          placeholder={dict.contactForm.message}
          className="w-full resize-none rounded-sm border border-border bg-bg-alt px-4 py-3 text-sm text-fg placeholder:text-muted focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-sm bg-green-deep py-3.5 text-sm font-bold text-cream hover:bg-green-mid transition-colors disabled:opacity-60"
        >
          {status === "sending" ? dict.contactForm.sending : dict.contactForm.submit}
        </button>
        {status === "success" && <p className="text-sm font-semibold text-green-deep dark:text-gold">{dict.contactForm.success}</p>}
        {status === "error" && <p className="text-sm font-semibold text-red-600">{dict.contactForm.error}</p>}
      </form>
    </div>
  );
}
