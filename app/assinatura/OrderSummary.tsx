"use client";

import type { ReactNode } from "react";
import Card from "@/app/components/Card";
import { useUserStore } from "@/lib/store/user";
import { getPlan } from "./plans";

interface OrderSummaryProps {
  note?: ReactNode;
}

export default function OrderSummary({
  note = "Você só é cobrado após confirmar o pagamento.",
}: OrderSummaryProps) {
  const planValue = useUserStore((state) => state.user?.plan);
  const plan = getPlan(planValue);
  const total = plan.price ? `${plan.price},00` : "Vamos conversar";

  return (
    <Card className="w-full shrink-0 lg:w-90">
      <span className="font-display text-title-s text-content">
        Resumo do pedido
      </span>

      <div className="flex w-full items-center gap-2">
        <span className="flex-1 text-body-s text-content-subtle">Plano</span>
        <span className="text-body-s text-content-muted">{plan.name}</span>
      </div>
      <div className="flex w-full items-center gap-2">
        <span className="flex-1 text-body-s text-content-subtle">Faixa</span>
        <span className="text-body-s text-content-muted">{plan.tier}</span>
      </div>
      <div className="flex w-full items-center gap-2">
        <span className="flex-1 text-body-s text-content-subtle">
          Cobrança
        </span>
        <span className="text-body-s text-content-muted">
          Mensal, renova 9/out/2026
        </span>
      </div>

      <hr className="w-full border-border-subtle" />

      <div className="flex w-full items-center gap-2">
        <span className="flex-1 text-label-m text-content">Total hoje</span>
        <span className="font-display text-title-s text-content">
          {total}
        </span>
      </div>

      <p className="text-body-s text-content-subtle">{note}</p>
    </Card>
  );
}
