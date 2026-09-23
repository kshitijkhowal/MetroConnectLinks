export function MetroMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="16" fill="#1976d2" />
      <path
        d="M14 42V24.5c0-3.6 2.7-6.5 6.2-6.5h23.6c3.5 0 6.2 2.9 6.2 6.5V42"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path d="M20 42h24" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="22.5" cy="44.5" r="3.2" fill="white" />
      <circle cx="41.5" cy="44.5" r="3.2" fill="white" />
      <path d="M18 30h28" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="22" y="22" width="7" height="6" rx="1.2" fill="white" />
      <rect x="35" y="22" width="7" height="6" rx="1.2" fill="white" />
    </svg>
  );
}
