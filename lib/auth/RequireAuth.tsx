"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/user";

interface RequireAuthProps {
  children: ReactNode;
  /**
   * On top of requiring login, requires that the user has already chosen a
   * plan — without one, sends them to /onboarding instead of showing the content.
   */
  requirePlan?: boolean;
}

/**
 * Requires a session to show the content. Without a logged-in user, sends
 * to /login?redirecionar=<route> — login comes back here afterward. With
 * `requirePlan`, someone logged in but still without a plan goes to /onboarding.
 *
 * Usage: wrap whatever the `page.tsx` returns.
 *   export default function MyPage() {
 *     return <RequireAuth requirePlan>{...content...}</RequireAuth>;
 *   }
 */
export default function RequireAuth({
  children,
  requirePlan = false,
}: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useUserStore((state) => state.hydrated);
  const user = useUserStore((state) => state.user);
  const loggedIn = user !== null;
  const missingPlan = requirePlan && loggedIn && user.plan == null;

  useEffect(() => {
    if (!hydrated) return;
    if (!loggedIn) {
      router.replace(`/login?redirecionar=${encodeURIComponent(pathname)}`);
    } else if (missingPlan) {
      router.replace("/onboarding");
    }
  }, [hydrated, loggedIn, missingPlan, pathname, router]);

  // While localStorage hasn't loaded yet, or while one of the redirects
  // above is on its way, don't show the protected content.
  if (!hydrated || !loggedIn || missingPlan) {
    return (
      <div className="flex min-h-dvh flex-1 items-center justify-center bg-canvas">
        <p className="text-body-m text-content-muted">Carregando…</p>
      </div>
    );
  }

  return <>{children}</>;
}
