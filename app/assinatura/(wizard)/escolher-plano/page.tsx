import type { Metadata } from "next";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/Button";
import { PLANS } from "../../plans";
import PlanForm from "./PlanForm";

export const metadata: Metadata = {
  title: "Escolha o plano · VisitaJá",
};

/*
  Tailwind only recognizes classes that appear in full in the file — that's
  why the per-plan summary uses this map instead of building the class with
  a template string (`group-has-[...${value}...]` wouldn't be detected).
*/
const SUMMARY_CLASS: Record<string, string> = {
  essential:
    "hidden text-body-m text-content-muted group-has-[input[value=essential]:checked]/plan:block",
  professional:
    "hidden text-body-m text-content-muted group-has-[input[value=professional]:checked]/plan:block",
  advanced:
    "hidden text-body-m text-content-muted group-has-[input[value=advanced]:checked]/plan:block",
  enterprise:
    "hidden text-body-m text-content-muted group-has-[input[value=enterprise]:checked]/plan:block",
};

export default function ChoosePlanPage() {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <h1 className="font-display text-title-xl text-content">
          Escolha o plano da sua imobiliária
        </h1>
        <p className="max-w-xl text-body-l text-content-muted">
          Você pode trocar de faixa quando a equipe crescer. Sem fidelidade.
        </p>
      </div>

      <PlanForm>
        <fieldset className="group/plan flex flex-col gap-6 border-0 p-0">
          <legend className="sr-only">Escolha do plano</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan) => (
              <label
                key={plan.value}
                className="group/option relative flex cursor-pointer flex-col gap-3 rounded-lg border border-border bg-canvas p-6 transition-colors has-checked:border-2 has-checked:border-border-brand has-checked:bg-surface has-checked:shadow-md"
              >
                <input
                  type="radio"
                  name="plan"
                  value={plan.value}
                  defaultChecked={plan.default}
                  className="sr-only"
                />
                <div className="flex items-center gap-2">
                  <span className="size-5 shrink-0 rounded-full border border-gray-300 group-has-checked/option:border-4 group-has-checked/option:border-border-brand group-has-checked/option:bg-surface" />
                  <span className="flex-1 font-display text-title-m text-content">
                    {plan.name}
                  </span>
                  <Badge
                    tone="brand"
                    className="invisible group-has-checked/option:visible"
                  >
                    Selecionado
                  </Badge>
                </div>

                <div className="flex items-end gap-0.5">
                  {plan.price ? (
                    <>
                      <span className="font-display text-title-l text-content">
                        {plan.price}
                      </span>
                      <span className="text-body-s text-content-subtle">
                        /mês
                      </span>
                    </>
                  ) : (
                    <span className="font-display text-title-l text-content">
                      Vamos conversar
                    </span>
                  )}
                </div>

                <span className="text-label-m text-content-brand">
                  {plan.tier}
                </span>

                <ul className="flex list-inside list-disc flex-col gap-0.5 text-body-s text-content-muted marker:text-content-subtle">
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </label>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {PLANS.map((plan) => (
              <p key={plan.value} className={SUMMARY_CLASS[plan.value]}>
                Plano selecionado: {plan.name}
                {plan.price ? ` — ${plan.price}/mês` : ""}
              </p>
            ))}
            <Button type="submit" variant="primary" className="ml-auto">
              Continuar
            </Button>
          </div>
        </fieldset>
      </PlanForm>
    </>
  );
}
