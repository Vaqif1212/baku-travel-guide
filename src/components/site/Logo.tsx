export function Logo({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18" stroke="var(--gold)" strokeWidth="1.3" />
      <line x1="7" y1="27.5" x2="33" y2="27.5" stroke="var(--gold)" strokeWidth="1" opacity="0.45" />
      <path
        d="M20 9c3 4 5 8 3 12-1 2.5-2 3.5-3 4.5-1-1-2-2-3-4.5-2-4 0-8 3-12Z"
        fill="var(--gold)"
      />
      <path
        d="M11.5 16c2 3 3.5 5.5 2 8-.7 1-1.4 1.6-2 2.2-.6-.6-1.3-1.2-2-2.2-1.5-2.5 0-5 2-8Z"
        fill="var(--gold)"
        opacity="0.85"
      />
      <path
        d="M28.5 16c2 3 3.5 5.5 2 8-.7 1-1.4 1.6-2 2.2-.6-.6-1.3-1.2-2-2.2-1.5-2.5 0-5 2-8Z"
        fill="var(--gold)"
        opacity="0.85"
      />
    </svg>
  );
}
