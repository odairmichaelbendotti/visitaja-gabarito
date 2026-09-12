"use client";

import { usePathname } from "next/navigation";

const STEPS = [
  { number: 1, label: "Plano", href: "/assinatura/escolher-plano" },
  { number: 2, label: "Imobiliária", href: "/assinatura/imobiliaria" },
  { number: 3, label: "Pagamento", href: "/assinatura/pagamento" },
  { number: 4, label: "Pronto", href: "/assinatura/pronto" },
];

export default function StepIndicator() {
  const pathname = usePathname();
  const currentStep =
    STEPS.find((step) => step.href === pathname)?.number ?? 1;

  return (
    <ol className="hidden flex-1 items-center justify-center gap-2 sm:flex">
      {STEPS.map((step, index) => {
        const reached = step.number <= currentStep;
        const isCurrent = step.number === currentStep;
        const nextReached =
          index < STEPS.length - 1 && STEPS[index + 1].number <= currentStep;
        return (
          <li key={step.number} className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <span
                className={`flex size-6 items-center justify-center rounded-full text-label-s ${
                  reached
                    ? "bg-brand text-on-brand"
                    : "bg-muted text-content-subtle"
                }`}
              >
                {step.number}
              </span>
              <span
                className={`text-label-s ${isCurrent ? "text-content" : "text-content-subtle"}`}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 ? (
              <span
                className={`h-0.5 w-7 ${nextReached ? "bg-brand" : "bg-border"}`}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
