"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/user";

/**
 * Ends the example session. It's an action with a side effect (not just
 * navigation), so it's a `<button>`. On a page protected by RequireAuth,
 * the guard itself already sends to /login as soon as the session is gone —
 * here we just ask for "/" as the destination for anyone not on a protected route.
 */
export default function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const logout = useUserStore((state) => state.logout);

  function handleClick() {
    logout();
    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`cursor-pointer ${className}`}
    >
      Sair
    </button>
  );
}
