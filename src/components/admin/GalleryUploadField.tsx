"use client";

import { useRef, useState } from "react";

export function GalleryUploadField({
  label,
  name,
  defaultValue = [],
  chooseLabel,
  uploadingLabel,
  removeLabel,
}: {
  label: string;
  name: string;
  defaultValue?: string[];
  chooseLabel: string;
  uploadingLabel: string;
  removeLabel: string;
}) {
  const [images, setImages] = useState<string[]>(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadOne(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data.url as string;
  }

  async function handleFiles(files: FileList) {
    setUploading(true);
    setError(null);
    try {
      // Uploaded one at a time (not Promise.all) so a slow connection
      // doesn't fire a dozen simultaneous uploads at once.
      for (const file of Array.from(files)) {
        const url = await uploadOne(file);
        setImages((prev) => [...prev, url]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeAt(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{label}</span>
      {images.map((url) => (
        <input key={url} type="hidden" name={name} value={url} />
      ))}
      <div className="flex flex-wrap items-center gap-3">
        {images.map((url, i) => (
          <div key={url} className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-neutral-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              title={removeLabel}
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) handleFiles(files);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-neutral-300 text-xs font-semibold text-neutral-500 transition-colors hover:border-[#1F3B2E] hover:text-[#1F3B2E] disabled:opacity-50"
        >
          {uploading ? uploadingLabel : chooseLabel}
        </button>
      </div>
      {error && <span className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}
    </div>
  );
}
