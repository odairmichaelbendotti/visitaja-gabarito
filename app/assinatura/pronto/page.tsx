import type { Metadata } from "next";
import RequireAuth from "@/lib/auth/RequireAuth";
import ReadyContent from "./ReadyContent";

export const metadata: Metadata = {
  title: "Tudo pronto · VisitaJá",
};

export default function ReadyPage() {
  return (
    <RequireAuth requirePlan>
      <div className="flex h-dvh flex-col items-center justify-center overflow-hidden bg-canvas px-6 py-10 lg:px-16">
        <ReadyContent />
      </div>
    </RequireAuth>
  );
}
