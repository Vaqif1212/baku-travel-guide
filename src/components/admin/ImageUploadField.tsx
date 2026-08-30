"use client";

import { useRef, useState } from "react";

export function ImageUploadField({
  label,
  name,
  defaultValue,
  chooseLabel,
  uploadingLabel,
  removeLabel,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  chooseLabel: string;
  uploadingLabel: string;
  removeLabel: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setValue(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{label}</span>
      <input type="hidden" name={name} value={value} />
      <div className="flex items-center gap-4">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-20 w-20 rounded-lg border border-neutral-200 object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-dashed border-neutral-300 text-[10px] text-neutral-400">
            —
          </div>
        )}
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:border-[#1F3B2E] hover:text-[#1F3B2E] disabled:opacity-50"
          >
            {uploading ? uploadingLabel : chooseLabel}
          </button>
          {value && !uploading && (
            <button
              type="button"
              onClick={() => setValue("")}
              className="text-left text-xs font-medium text-red-600 hover:underline"
            >
              {removeLabel}
            </button>
          )}
          {error && <span className="text-xs font-medium text-red-600">{error}</span>}
        </div>
      </div>
    </div>
  );
}
