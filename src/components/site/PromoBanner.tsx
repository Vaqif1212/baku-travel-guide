export function PromoBanner({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="bg-gold px-4 py-2.5 text-center text-sm font-semibold text-green-deep">{text}</div>
  );
}
