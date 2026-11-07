import Link from "next/link";
export function Logo() {
  return <Link href="/" className="logo" aria-label="Folio home">
    <svg className="logo-mark" viewBox="0 0 28 32" width="24" height="28" aria-hidden="true">
      <path d="M3 1.5h15.5L26.5 9.5V30.5H3z" fill="currentColor" />
      <path d="M18.5 1.5V9.5H26.5" fill="none" stroke="var(--logo-fold, #0b2820)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 15h13M8 19.5h13M8 24h8" stroke="var(--logo-fold, #0b2820)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
    <span className="logo-word">folio<span className="logo-dot">.</span></span>
  </Link>;
}
