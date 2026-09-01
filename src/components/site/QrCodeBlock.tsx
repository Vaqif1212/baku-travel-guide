"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export function QrCodeBlock({ value, hint, downloadLabel }: { value: string; hint: string; downloadLabel: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    if (!value || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, value, { width: 132, margin: 1, color: { dark: "#1F3B2E", light: "#FFFFFF" } })
      .then(() => setReady(true))
      .catch(() => setReady(false));
  }, [value]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "google-review-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  if (!value) return null;

  return (
    <div className="mt-6 inline-flex flex-col items-center gap-2.5">
      <canvas ref={canvasRef} className="rounded-xl border border-gold/25 bg-cream p-2" />
      <p className="text-xs text-cream/50">{hint}</p>
      <button
        type="button"
        onClick={download}
        disabled={!ready}
        className="text-xs font-bold text-gold underline-offset-2 transition-colors hover:text-gold-light hover:underline disabled:opacity-40"
      >
        {downloadLabel}
      </button>
    </div>
  );
}
