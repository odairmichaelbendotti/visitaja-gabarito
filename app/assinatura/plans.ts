export interface Plan {
  value: string;
  name: string;
  price: string | null;
  tier: string;
  /** Corretor seat limit, or `null` for the custom/unlimited "Sob consulta" plan. */
  maxAgents: number | null;
  items: string[];
  default?: boolean;
}

export const PLANS: Plan[] = [
  {
    value: "essential",
    name: "Essencial",
    price: "R$ 149",
    tier: "até 10 corretores",
    maxAgents: 10,
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
    maxAgents: 20,
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
    maxAgents: 50,
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
    maxAgents: null,
    items: [
      "Faixa personalizada",
      "Onboarding assistido",
      "SLA e integração com CRM",
    ],
  },
];

export function getPlan(value: string | null | undefined): Plan {
  return (
    PLANS.find((plan) => plan.value === value) ??
    PLANS.find((plan) => plan.default) ??
    PLANS[0]
  );
}
