export function SkylineDecor({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 340"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 340 L0 220 L120 220 L140 120 L160 220 L280 220 L300 60 L320 220 L440 220 L470 150 L500 220 L620 220 Q660 60 700 220 Q740 40 780 220 Q820 90 860 220 L980 220 L1010 140 L1040 220 L1160 220 L1190 100 L1220 220 L1440 220 L1440 340 Z"
        fill="var(--green-darker)"
      />
    </svg>
  );
}

export function OrnamentDecor({ className }: { className?: string }) {
  return (
    <svg className={className} width="220" height="220" viewBox="0 0 220 220" fill="none" aria-hidden="true">
      <circle cx="110" cy="110" r="90" stroke="var(--gold)" strokeWidth="1" />
      <circle cx="110" cy="110" r="65" stroke="var(--gold)" strokeWidth="1" />
      <path
        d="M110 20 L120 100 L200 110 L120 120 L110 200 L100 120 L20 110 L100 100 Z"
        stroke="var(--gold)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
