"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import { useUserStore } from "@/lib/store/user";
import { getPlan } from "../../plans";

export default function PayButton() {
  const router = useRouter();
  const planValue = useUserStore((state) => state.user?.plan);
  const plan = getPlan(planValue);
  const total = plan.price ? `${plan.price},00` : "o valor combinado";

  return (
    <Button
      variant="primary"
      onClick={() => router.push("/assinatura/pronto")}
    >
      Pagar {total} e ativar o painel
    </Button>
  );
}
