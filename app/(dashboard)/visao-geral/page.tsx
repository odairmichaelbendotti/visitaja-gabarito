import type { Metadata } from "next";
import Avatar from "@/app/components/Avatar";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import Sidebar from "@/app/components/Sidebar";
import TableHeader from "@/app/components/TableHeader";
import RequireAuth from "@/lib/auth/RequireAuth";

export const metadata: Metadata = {
  title: "Visão geral · VisitaJá",
};

const ICONS: Record<string, string[]> = {
  calendar: [
    "M13.5 3.75H4.5C3.67157 3.75 3 4.42157 3 5.25V14.25C3 15.0784 3.67157 15.75 4.5 15.75H13.5C14.3284 15.75 15 15.0784 15 14.25V5.25C15 4.42157 14.3284 3.75 13.5 3.75Z",
    "M3 7.5H15M6 2.25V5.25M12 2.25V5.25",
  ],
  trending: [
    "M2.25 12.75L6.75 8.25L9.75 11.25L15.75 5.25",
    "M12 5.25H15.75V9",
  ],
  home: [
    "M3 8.25L9 3.75L15 8.25",
    "M4.5 7.5V14.25H13.5V7.5",
    "M7.5 14.25V10.5H10.5V14.25",
  ],
  agents: [
    "M6.75 8.625C8.19975 8.625 9.375 7.44975 9.375 6C9.375 4.55025 8.19975 3.375 6.75 3.375C5.30025 3.375 4.125 4.55025 4.125 6C4.125 7.44975 5.30025 8.625 6.75 8.625Z",
    "M1.875 15C1.875 13.7071 2.38861 12.4671 3.30285 11.5529C4.21709 10.6386 5.45707 10.125 6.75 10.125C8.04293 10.125 9.28291 10.6386 10.1971 11.5529C11.1114 12.4671 11.625 13.7071 11.625 15",
    "M12 3.75C12.6962 3.75 13.3639 4.02656 13.8562 4.51884C14.3484 5.01113 14.625 5.67881 14.625 6.375C14.625 7.07119 14.3484 7.73887 13.8562 8.23116C13.3639 8.72344 12.6962 9 12 9M16.125 15C16.125 14.0376 15.8401 13.0966 15.3062 12.2958C14.7724 11.495 14.0134 10.8702 13.125 10.5",
  ],
};

function StatIcon({ icon }: { icon: string }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden className="size-4.5">
      {ICONS[icon].map((d) => (
        <path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

const STATS = [
  {
    icon: "calendar",
    label: "Visitas de hoje",
    value: "4",
    detail: "2 confirmadas · 2 aguardando",
  },
  {
    icon: "trending",
    label: "Visitas nesta semana",
    value: "23",
    detail: "+18% vs. semana passada",
  },
  {
    icon: "home",
    label: "Imóveis ativos",
    value: "37",
    detail: "5 com visita agendada",
  },
  {
    icon: "agents",
    label: "Corretores no plano",
    value: "14 de 20",
    detail: "6 vagas ainda disponíveis",
    progress: 70,
  },
];

const STATUS = {
  confirmed: { tone: "success", label: "Confirmada" },
  pending: { tone: "warning", label: "Pendente" },
} as const;

const SCHEDULE = [
  {
    when: "Hoje 14:00",
    propertyId: "#IM001",
    address: "R. Oscar Freire, 980",
    agent: "Marina Rocha",
    client: "Bruno Tavares",
    status: "confirmed",
  },
  {
    when: "Hoje 16:30",
    propertyId: "#IM002",
    address: "Av. Faria Lima, 3477",
    agent: "Rafael Nunes",
    client: "Carla Menezes",
    status: "pending",
  },
  {
    when: "Amanhã 09:00",
    propertyId: "#IM003",
    address: "R. Fradique Coutinho, 1200",
    agent: "Juliana Prado",
    client: "Diego Ramos",
    status: "confirmed",
  },
  {
    when: "Amanhã 11:00",
    propertyId: "#IM004",
    address: "R. Harmonia, 745",
    agent: "Marina Rocha",
    client: "Fernanda Lima",
    status: "confirmed",
  },
  {
    when: "Qui 10:00",
    propertyId: "#IM005",
    address: "Al. Santos, 1500",
    agent: "Rafael Nunes",
    client: "Paulo Costa",
    status: "pending",
  },
] as const;

const POPULAR_PROPERTIES = [
  {
    address: "Rua Oscar Freire, 980 — Jardins",
    bookings: "7 agendamentos esta semana",
  },
  {
    address: "Av. Faria Lima, 3477 — Itaim Bibi",
    bookings: "5 agendamentos esta semana",
  },
  {
    address: "Rua Fradique Coutinho, 1200 — Pinheiros",
    bookings: "4 agendamentos esta semana",
  },
  {
    address: "Rua Harmonia, 745 — Vila Madalena",
    bookings: "3 agendamentos esta semana",
  },
];

export default function OverviewPage() {
  return (
    <RequireAuth requirePlan>
      <div className="flex h-dvh flex-col lg:flex-row">
        <Sidebar activePage="overview" />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          <header className="flex shrink-0 items-center gap-3 border-b border-border-subtle bg-surface px-8 py-4">
            <h1 className="flex-1 font-display text-title-l text-content">
              Visão geral
            </h1>
            <Button variant="primary">Novo imóvel</Button>
          </header>

          <main className="flex flex-col gap-8 p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat) => (
                <Card key={stat.label}>
                  <div className="flex w-full items-center gap-2">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-brand-subtle text-content-brand">
                      <StatIcon icon={stat.icon} />
                    </span>
                    <span className="text-body-s text-content-subtle">
                      {stat.label}
                    </span>
                  </div>
                  <span className="font-display text-title-xl text-content">
                    {stat.value}
                  </span>
                  {stat.progress != null ? (
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-1.5 rounded-full bg-brand"
                        style={{ width: `${stat.progress}%` }}
                      />
                    </div>
                  ) : null}
                  <span className="text-body-s text-content-muted">
                    {stat.detail}
                  </span>
                </Card>
              ))}
            </div>

            <div className="flex flex-col items-start gap-4 lg:flex-row">
              <Card className="w-full flex-1">
                <span className="font-display text-title-s text-content">
                  Próximas visitas
                </span>
                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-150 border-collapse">
                    <thead>
                      <tr>
                        <TableHeader align="center">Quando</TableHeader>
                        <TableHeader align="center">Imóvel</TableHeader>
                        <TableHeader align="left">Corretor</TableHeader>
                        <TableHeader align="center">Cliente</TableHeader>
                        <TableHeader align="right">Status</TableHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {SCHEDULE.map((visit) => (
                        <tr
                          key={visit.propertyId}
                          className="border-b border-border-subtle last:border-0"
                        >
                          <td className="px-4 py-3 text-center text-label-s text-content">
                            {visit.when}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col items-center gap-0.5">
                              <Badge tone="neutral">{visit.propertyId}</Badge>
                              <span className="text-center text-label-s text-content-muted">
                                {visit.address}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Avatar name={visit.agent} size="s" />
                              <span className="whitespace-nowrap text-body-m text-content-muted">
                                {visit.agent}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-body-m text-content-muted">
                            {visit.client}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Badge tone={STATUS[visit.status].tone}>
                              {STATUS[visit.status].label}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="w-full lg:w-95">
                <span className="font-display text-title-s text-content">
                  Imóveis com mais procura
                </span>
                {POPULAR_PROPERTIES.map((property) => (
                  <div
                    key={property.address}
                    className="flex w-full items-center gap-2"
                  >
                    <span
                      aria-hidden
                      className="size-11 shrink-0 rounded-sm bg-gradient-to-br from-gray-300 to-gray-400"
                    />
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="truncate text-label-s text-content">
                        {property.address}
                      </span>
                      <span className="whitespace-nowrap text-body-s text-content-subtle">
                        {property.bookings}
                      </span>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
