"use client";

import { useEffect, useRef, useState } from "react";
import { slugify } from "@/lib/slugify";

export function SlugField({
  label,
  name,
  defaultValue,
  watchName,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  /** name of the sibling title input in the same form whose value auto-fills this slug */
  watchName: string;
  hint?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  // Existing items keep their slug fixed (don't silently break URLs); only brand-new items auto-fill.
  const [touched, setTouched] = useState(!!defaultValue);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (touched) return;
    const form = ref.current?.closest("form");
    const titleInput = form?.querySelector<HTMLInputElement>(`[name="${watchName}"]`);
    if (!titleInput) return;
    const onInput = () => setValue(slugify(titleInput.value));
    titleInput.addEventListener("input", onInput);
    return () => titleInput.removeEventListener("input", onInput);
  }, [watchName, touched]);

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{label}</span>
      <input
        ref={ref}
        name={name}
        value={value}
        onChange={(e) => {
          setTouched(true);
          setValue(e.target.value);
        }}
        required
        className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 font-mono text-sm transition-colors focus:border-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/15"
      />
      {hint && <span className="mt-1 block text-[11px] text-neutral-400">{hint}</span>}
    </label>
  );
}
