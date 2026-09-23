/** ShubhInvite mark: a diya flame inside a rounded app-icon badge — traditional motif, modern container. */
export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="12" fill="#5b1f2e" />
      <path
        d="M11 24c3 3 6 4 9 4s6-1 9-4c-1 4-4.5 7-9 7s-8-3-9-7Z"
        fill="#d9770f"
      />
      <path
        d="M20 17c-2-2.5-1.5-5.5.5-7.5.5 2.5 2 3 2 5 0 1.5-1 2.5-2.5 2.5Z"
        fill="#fbf3e6"
      />
    </svg>
  );
}
