import type { Metadata } from "next";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/Button";
import LogoutButton from "@/lib/auth/LogoutButton";
import RequireAuth from "@/lib/auth/RequireAuth";
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

const STEPS = [
  { number: 1, label: "Plano" },
  { number: 2, label: "Imobiliária" },
  { number: 3, label: "Pagamento" },
  { number: 4, label: "Pronto" },
];

const PLANS = [
  {
    value: "essential",
    name: "Essencial",
    price: "R$ 149",
    tier: "até 10 corretores",
    items: [
      "1 link público por imóvel",
      "Agenda por corretor",
      "Contatos de quem agenda",
    ],
  },
  {
    value: "professional",
    name: "Profissional",
    price: "R$ 279",
    tier: "até 20 corretores",
    items: [
      "Tudo do Essencial",
      "Página do imóvel personalizada",
      "Lembrete automático + relatórios",
    ],
    default: true,
  },
  {
    value: "advanced",
    name: "Avançado",
    price: "R$ 549",
    tier: "até 50 corretores",
    items: [
      "Tudo do Profissional",
      "Vários administradores",
      "Marca da imobiliária + exportação",
    ],
  },
  {
    value: "enterprise",
    name: "Sob consulta",
    price: null,
    tier: "acima de 50 corretores",
    items: [
      "Faixa personalizada",
      "Onboarding assistido",
      "SLA e integração com CRM",
    ],
  },
];

export default function ChoosePlanPage() {
  return (
    <RequireAuth>
      <div className="flex h-dvh flex-col bg-canvas">
        {/* Topbar */}
        <header className="shrink-0 border-b border-border-subtle bg-surface px-6 py-4 lg:px-16">
          <div className="mx-auto flex max-w-6xl items-center gap-6">
            <span className="font-display text-title-m">
              <span className="text-content">Visita</span>
              <span className="text-content-brand">Já</span>
            </span>

            <ol className="hidden flex-1 items-center justify-center gap-2 sm:flex">
              {STEPS.map((step, i) => {
                const active = step.number === 1;
                return (
                  <li key={step.number} className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      <span
                        className={`flex size-6 items-center justify-center rounded-full text-label-s ${
                          active
                            ? "bg-brand text-on-brand"
                            : "bg-muted text-content-subtle"
                        }`}
                      >
                        {step.number}
                      </span>
                      <span
                        className={`text-label-s ${active ? "text-content" : "text-content-subtle"}`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 ? (
                      <span className="h-0.5 w-7 bg-border" />
                    ) : null}
                  </li>
                );
              })}
            </ol>

            <LogoutButton className="ml-auto text-label-m text-content-muted transition-colors hover:text-content sm:ml-0" />
          </div>
        </header>

        {/* Content */}
        <main className="flex min-h-0 flex-1 justify-center overflow-y-auto px-6 py-8 lg:px-16 lg:py-10">
          <div className="flex w-full max-w-6xl flex-col gap-8 self-center">
            <div className="flex w-full flex-col items-center gap-2 text-center">
              <h1 className="font-display text-title-xl text-content">
                Escolha o plano da sua imobiliária
              </h1>
              <p className="max-w-xl text-body-l text-content-muted">
                Você pode trocar de faixa quando a equipe crescer. Sem
                fidelidade.
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
          </div>
        </main>
      </div>
    </RequireAuth>
  );
}
