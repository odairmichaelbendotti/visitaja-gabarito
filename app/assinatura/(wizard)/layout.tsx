import type { ReactNode } from "react";
import BrandLogoLink from "@/lib/auth/BrandLogoLink";
import LogoutButton from "@/lib/auth/LogoutButton";
import RequireAuth from "@/lib/auth/RequireAuth";
import StepIndicator from "./StepIndicator";

export default function SubscriptionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="flex min-h-dvh flex-col bg-canvas">
        <header className="shrink-0 border-b border-border-subtle bg-surface px-6 py-4 lg:px-16">
          <div className="mx-auto flex max-w-6xl items-center gap-6">
            <BrandLogoLink className="font-display text-title-m" />
            <StepIndicator />
            <LogoutButton className="ml-auto text-label-m text-content-muted transition-colors hover:text-content sm:ml-0" />
          </div>
        </header>

        <main className="flex flex-1 justify-center px-6 py-8 lg:px-16 lg:py-10">
          <div className="flex w-full max-w-6xl flex-col gap-8 self-center">
            {children}
          </div>
        </main>
      </div>
    </RequireAuth>
  );
}
