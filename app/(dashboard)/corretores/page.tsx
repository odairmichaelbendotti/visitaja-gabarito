import type { Metadata } from "next";
import Avatar from "@/app/components/Avatar";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import FormField from "@/app/components/FormField";
import Sidebar from "@/app/components/Sidebar";
import TableHeader from "@/app/components/TableHeader";
import RequireAuth from "@/lib/auth/RequireAuth";

export const metadata: Metadata = {
  title: "Corretores · VisitaJá",
};

function WarningIcon({ className = "size-5.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 22" fill="none" aria-hidden className={className}>
      <path
        d="M11 2.75L19.25 17.4167H2.75L11 2.75Z"
        stroke="currentColor"
        strokeWidth={1.83333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 9.16667V12.8333M11 15.5833H11.0092"
        stroke="currentColor"
        strokeWidth={1.83333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STATUS = {
  active: { tone: "success", label: "Ativa" },
  activeMasc: { tone: "success", label: "Ativo" },
  pending: { tone: "warning", label: "Convite pendente" },
} as const;

const TEAM = [
  {
    name: "Marina Rocha",
    role: "Administradora",
    email: "marina@ancoraimoveis.com.br",
    properties: 12,
    visits: 18,
    status: STATUS.active,
  },
  {
    name: "Rafael Nunes",
    role: "Corretor",
    email: "rafael@ancoraimoveis.com.br",
    properties: 9,
    visits: 15,
    status: STATUS.activeMasc,
  },
  {
    name: "Juliana Prado",
    role: "Corretora",
    email: "juliana@ancoraimoveis.com.br",
    properties: 7,
    visits: 11,
    status: STATUS.active,
  },
  {
    name: "Camila Duarte",
    role: "Corretora",
    email: "camila@ancoraimoveis.com.br",
    properties: 6,
    visits: 9,
    status: STATUS.active,
  },
  {
    name: "Diego Ramos",
    role: "Corretor",
    email: "diego@ancoraimoveis.com.br",
    properties: 5,
    visits: 8,
    status: STATUS.activeMasc,
  },
  {
    name: "Fernanda Alves",
    role: "Corretora",
    email: "fernanda@ancoraimoveis.com.br",
    properties: 4,
    visits: 6,
    status: STATUS.pending,
  },
  {
    name: "Bruno Machado",
    role: "Corretor",
    email: "bruno@ancoraimoveis.com.br",
    properties: 3,
    visits: 4,
    status: STATUS.activeMasc,
  },
];

export default function AgentsPage() {
  return (
    <RequireAuth requirePlan>
      <div className="flex h-dvh flex-col lg:flex-row">
        <Sidebar activePage="agents" />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          <header className="flex shrink-0 items-center gap-3 border-b border-border-subtle bg-surface px-8 py-4">
            <h1 className="flex-1 font-display text-title-l text-content">
              Corretores
            </h1>
            <Button variant="primary" disabled>
              Novo corretor
            </Button>
          </header>

          <main className="flex flex-col gap-6 p-8">
            <div className="flex w-full items-center gap-3 rounded-md border border-content-warning bg-warning-subtle p-4">
              <span className="shrink-0 text-content-warning">
                <WarningIcon />
              </span>
              <div className="flex flex-1 flex-col gap-0.5 text-body-s">
                <p className="text-label-m text-content">
                  Você atingiu o limite de 20 corretores do plano Profissional
                </p>
                <p className="text-body-s text-content-muted">
                  Para cadastrar novos corretores, faça upgrade para o plano
                  Avançado (até 50 corretores).
                </p>
              </div>
              <Button variant="secondary" href="/escolher-plano">
                Ver plano Avançado
              </Button>
            </div>

            <div className="flex flex-col items-start gap-6 lg:flex-row">
              <Card className="w-full flex-1">
                <div className="flex w-full items-center gap-2">
                  <span className="flex-1 font-display text-title-s text-content">
                    Equipe
                  </span>
                  <Badge tone="accent">20 / 20 no plano</Badge>
                </div>

                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-150 border-collapse">
                    <thead>
                      <tr>
                        <TableHeader align="left">Corretor</TableHeader>
                        <TableHeader align="center">E-mail</TableHeader>
                        <TableHeader align="center">Imóveis</TableHeader>
                        <TableHeader align="center">Visitas / mês</TableHeader>
                        <TableHeader align="right">Status</TableHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {TEAM.map((member) => (
                        <tr
                          key={member.email}
                          className="border-b border-border-subtle last:border-0"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Avatar name={member.name} size="m" />
                              <div className="min-w-0">
                                <p className="truncate text-label-s text-content">
                                  {member.name}
                                </p>
                                <p className="truncate text-body-s text-content-subtle">
                                  {member.role}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-body-s text-content-muted">
                            {member.email}
                          </td>
                          <td className="px-4 py-3 text-center text-body-s text-content-muted">
                            {member.properties}
                          </td>
                          <td className="px-4 py-3 text-center text-body-s text-content-muted">
                            {member.visits}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Badge tone={member.status.tone}>
                              {member.status.label}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-body-s text-content-subtle">
                  Mostrando 7 de 20 corretores
                </p>
              </Card>

              <Card className="w-full lg:w-95">
                <span className="font-display text-title-s text-content">
                  Cadastrar corretor
                </span>

                <FormField
                  id="agent-name"
                  label="Nome completo"
                  helperText=""
                  disabled
                />
                <FormField
                  id="agent-email"
                  label="E-mail"
                  type="email"
                  helperText=""
                  disabled
                />
                <FormField
                  id="agent-phone"
                  label="Telefone"
                  type="tel"
                  helperText=""
                  disabled
                />

                <Button variant="primary" disabled className="w-full">
                  Adicionar corretor
                </Button>

                <p className="text-body-s text-content-warning">
                  Formulário bloqueado: o plano Profissional já está com 20 de
                  20 corretores.
                </p>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
