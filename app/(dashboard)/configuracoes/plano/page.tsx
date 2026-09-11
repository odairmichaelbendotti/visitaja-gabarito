import type { Metadata } from "next";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/Button";
import Card from "@/app/components/Card";

export const metadata: Metadata = {
  title: "Configurações · Plano · VisitaJá",
};

function DownloadIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path
        d="M7 2.33333V8.75M4.08333 6.41667L7 9.33333L9.91667 6.41667"
        stroke="currentColor"
        strokeWidth={1.16667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.91667 11.6667H11.0833"
        stroke="currentColor"
        strokeWidth={1.16667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PLAN = {
  name: "Plano Profissional",
  agentsUsed: 14,
  agentsLimit: 20,
  price: "R$ 279,00/mês",
  renewsAt: "9 de outubro de 2026",
};

const USAGE = [
  { label: "Corretores", value: "14 de 20" },
  { label: "Imóveis ativos", value: "37 (ilimitado no plano)" },
  { label: "Links públicos gerados", value: "37" },
  { label: "Visitas agendadas no mês", value: "148" },
];

const PLANS_COMPARE = [
  { name: "Essencial", price: "R$ 149", tier: "até 10 corretores", current: false },
  { name: "Profissional", price: "R$ 279", tier: "até 20 corretores", current: true },
  { name: "Avançado", price: "R$ 549", tier: "até 50 corretores", current: false },
  { name: "Sob consulta", price: "—", tier: "+50 corretores", current: false },
];

const BILLING = [
  { label: "Razão social", value: "Âncora Imóveis Ltda" },
  { label: "CNPJ", value: "51.482.377/0001-09" },
  { label: "E-mail financeiro", value: "financeiro@ancoraimoveis.com.br" },
  { label: "Forma de pagamento", value: "Visa terminando em 3391" },
];

const INVOICES = [
  { month: "Setembro / 2026", amount: "R$ 279,00" },
  { month: "Agosto / 2026", amount: "R$ 279,00" },
  { month: "Julho / 2026", amount: "R$ 279,00" },
];

export default function SettingsPlanPage() {
  const usagePercent = Math.round((PLAN.agentsUsed / PLAN.agentsLimit) * 100);

  return (
    <>
      <Card className="w-full">
        <div className="flex w-full flex-wrap items-center gap-2">
          <div className="flex flex-1 flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="font-display text-title-m text-content">
                {PLAN.name}
              </span>
              <Badge tone="success">Ativo</Badge>
            </div>
            <span className="text-body-s text-content-subtle">
              até {PLAN.agentsLimit} corretores · {PLAN.price} · renova em{" "}
              {PLAN.renewsAt}
            </span>
          </div>
          <Button variant="secondary">Mudar de plano</Button>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-brand"
            style={{ width: `${usagePercent}%` }}
          />
        </div>
        <span className="text-body-s text-content-muted">
          {PLAN.agentsUsed} de {PLAN.agentsLimit} corretores em uso —{" "}
          {PLAN.agentsLimit - PLAN.agentsUsed} vagas restantes
        </span>
      </Card>

      <Card className="w-full">
        <span className="font-display text-title-s text-content">
          Uso no ciclo atual
        </span>
        {USAGE.map((item) => (
          <div key={item.label} className="flex w-full items-center gap-3">
            <span className="flex-1 text-body-s text-content-subtle">
              {item.label}
            </span>
            <span className="text-label-s text-content">{item.value}</span>
          </div>
        ))}
      </Card>

      <Card className="w-full">
        <div className="flex w-full items-center gap-2">
          <span className="flex-1 font-display text-title-s text-content">
            Comparar faixas
          </span>
          <Button variant="primary">Fazer upgrade para Avançado</Button>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
          {PLANS_COMPARE.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col gap-0.5 rounded-md border p-3 ${
                plan.current
                  ? "border-2 border-border-brand bg-brand-subtle"
                  : "border-border-subtle bg-canvas"
              }`}
            >
              <span
                className={`text-label-s ${
                  plan.current ? "text-content-brand" : "text-content"
                }`}
              >
                {plan.name}
              </span>
              <span className="font-display text-title-s text-content">
                {plan.price}
              </span>
              <span className="text-body-s text-content-subtle">
                {plan.tier}
              </span>
              {plan.current ? (
                <span className="text-body-s text-content-brand">
                  Plano atual
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </Card>

      <Card className="w-full">
        <span className="font-display text-title-s text-content">
          Dados de cobrança
        </span>

        {BILLING.map((item) => (
          <div key={item.label} className="flex w-full items-center gap-3">
            <span className="flex-1 text-body-s text-content-subtle">
              {item.label}
            </span>
            <span className="text-body-s text-content-muted">
              {item.value}
            </span>
          </div>
        ))}

        <hr className="w-full border-border-subtle" />

        <span className="text-label-m text-content">Faturas recentes</span>
        {INVOICES.map((invoice) => (
          <div
            key={invoice.month}
            className="flex w-full items-center gap-3 border-b border-border-subtle py-2 last:border-0"
          >
            <span className="flex-1 text-body-s text-content-muted">
              {invoice.month}
            </span>
            <span className="text-label-s text-content">
              {invoice.amount}
            </span>
            <Badge tone="success">Paga</Badge>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-0.5 text-label-s text-content-brand transition-colors hover:text-brand-hover"
            >
              <DownloadIcon />
              PDF
            </button>
          </div>
        ))}
      </Card>

      <div className="flex w-full flex-wrap items-center gap-3 rounded-lg border border-content-danger bg-danger-subtle p-4">
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="text-label-m text-content">
            Cancelar assinatura
          </span>
          <span className="text-body-s text-content-muted">
            O painel fica ativo até o fim do ciclo. Depois disso, os links
            públicos param de aceitar agendamentos.
          </span>
        </div>
        <Button variant="secondary">Cancelar plano</Button>
      </div>
    </>
  );
}
