"use client";

import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/user";

/**
 * Only interactive piece of the screen — the plan's visual selection stays
 * pure CSS (`:has()`), this just reads the checked radio on submit and
 * saves it to the store. `display: contents` keeps the <form> from
 * interfering with the layout of the <fieldset> it wraps.
 */
export default function PlanForm({ children }: { children: ReactNode }) {
  const router = useRouter();
  const choosePlan = useUserStore((state) => state.choosePlan);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const plan = new FormData(event.currentTarget).get("plan");
    if (typeof plan === "string") {
      choosePlan(plan);
    }
    router.push("/assinatura/imobiliaria");
  }

  return (
    <form className="contents" onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
