"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/configuracoes/plano", label: "Plano" },
  { href: "/configuracoes/equipe", label: "Equipe" },
];

export default function SettingsTabs() {
  const pathname = usePathname();

  return (
    <div className="flex w-full gap-1 border-b border-border-subtle">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`border-b-2 px-3 py-2 text-label-m transition-colors ${
              active
                ? "border-border-brand text-content-brand"
                : "border-transparent text-content-subtle hover:text-content-muted"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
