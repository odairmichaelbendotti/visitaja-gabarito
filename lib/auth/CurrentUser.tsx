"use client";

import Avatar from "@/app/components/Avatar";
import { useUserStore } from "@/lib/store/user";

/**
 * Logged-in user's name + avatar, for navbars on protected pages.
 * Renders nothing without a session (shouldn't happen inside RequireAuth).
 */
export default function CurrentUser() {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <span className="text-label-m text-content-muted">{user.name}</span>
      <Avatar name={user.name} size="s" tone="solid" />
    </div>
  );
}
