"use client";

import Link from "next/link";
import { useIsLoggedIn } from "@/lib/store/user";

interface BrandLogoLinkProps {
  className?: string;
}

/**
 * The "VisitaJá" wordmark used on public pages. Logged-in visitors can click
 * it to jump back to the dashboard; logged-out visitors see plain text —
 * there's nowhere sensible to send them without a session.
 */
export default function BrandLogoLink({ className = "" }: BrandLogoLinkProps) {
  const loggedIn = useIsLoggedIn();

  const content = (
    <>
      <span className="text-content">Visita</span>
      <span className="text-content-brand">Já</span>
    </>
  );

  if (loggedIn) {
    return (
      <Link
        href="/visao-geral"
        className={`transition-opacity hover:opacity-80 ${className}`}
      >
        {content}
      </Link>
    );
  }

  return <span className={className}>{content}</span>;
}
