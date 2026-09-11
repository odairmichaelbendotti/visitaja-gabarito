import type { ReactNode } from "react";
import Sidebar from "@/app/components/Sidebar";
import RequireAuth from "@/lib/auth/RequireAuth";
import SettingsTabs from "./SettingsTabs";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth requirePlan>
      <div className="flex h-dvh flex-col lg:flex-row">
        <Sidebar activePage="settings" />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          <header className="flex shrink-0 items-center gap-3 border-b border-border-subtle bg-surface px-8 py-4">
            <h1 className="font-display text-title-l text-content">
              Configurações
            </h1>
          </header>

          <main className="flex flex-1 flex-col items-center gap-6 p-8">
            <div className="flex w-full max-w-230 flex-col gap-6">
              <SettingsTabs />
              {children}
            </div>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
