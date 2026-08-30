"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export function QrCodeCard({ value, title, downloadLabel, filename }: { value: string; title: string; downloadLabel: string; filename: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    if (!value || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, value, { width: 220, margin: 1, color: { dark: "#1F3B2E", light: "#FFFFFF" } })
      .then(() => setReady(true))
      .catch(() => setReady(false));
  }, [value]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  if (!value) return null;

  return (
    <div className="mt-4 flex items-center gap-5 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      <canvas ref={canvasRef} className="rounded-md bg-white shadow-sm" />
      <div>
        <div className="text-xs font-semibold text-neutral-600">{title}</div>
        <button
          type="button"
          onClick={download}
          disabled={!ready}
          className="mt-2.5 rounded-lg bg-[#1F3B2E] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#16291F] disabled:opacity-50"
        >
          {downloadLabel}
        </button>
      </div>
    </div>
  );
}
