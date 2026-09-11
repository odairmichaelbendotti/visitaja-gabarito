import type { Metadata } from "next";
import Avatar from "@/app/components/Avatar";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import TableHeader from "@/app/components/TableHeader";

export const metadata: Metadata = {
  title: "Configurações · Equipe · VisitaJá",
};

const ADMINS = [
  {
    name: "Marina Rocha",
    email: "marina@ancoraimoveis.com.br",
    role: "Proprietária",
    since: "12 jan 2025",
    pending: false,
    removable: false,
  },
  {
    name: "Carlos Mendes",
    email: "carlos@ancoraimoveis.com.br",
    role: "Administrador",
    since: "3 mar 2025",
    pending: false,
    removable: true,
  },
  {
    name: "Ana Silva",
    email: "ana@ancoraimoveis.com.br",
    role: "Administrador",
    since: "15 jul 2025",
    pending: false,
    removable: true,
  },
  {
    name: "Roberto Lima",
    email: "roberto@imoveisrj.com.br",
    role: "Administrador",
    since: "10 set 2026",
    pending: true,
    removable: true,
  },
];

const pendingCount = ADMINS.filter((admin) => admin.pending).length;
const activeCount = ADMINS.length - pendingCount;

export default function SettingsTeamPage() {
  return (
    <>
      <Card className="w-full">
        <div className="flex w-full flex-col gap-3 rounded-md border border-border-subtle p-4">
          <span className="font-display text-title-s text-content">
            Adicionar administrador
          </span>
          <label htmlFor="admin-email" className="text-label-m text-content">
            Buscar usuário por e-mail
          </label>
          <div className="flex w-full items-center gap-4">
            <input
              id="admin-email"
              type="email"
              placeholder="Digite o e-mail do usuário"
              className="w-full flex-1 rounded-md border border-border bg-surface px-4 py-2 text-body-m text-content outline-none transition placeholder:text-content-subtle hover:border-content-subtle focus:border-2 focus:border-border-focus focus:shadow-brand"
            />
            <Button variant="primary" disabled>
              Adicionar como admin
            </Button>
          </div>
          <p className="text-body-s text-content-muted">
            O usuário precisa ter uma conta ativa no VisitaJá para ser
            adicionado como administrador.
          </p>
        </div>

        <div className="flex w-full items-center justify-between">
          <span className="font-display text-title-s text-content">
            Administradores atuais
          </span>
          <span className="text-body-s text-content-muted">
            {activeCount} administradores · {pendingCount} convite pendente
          </span>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-150 border-collapse">
            <thead>
              <tr>
                <TableHeader align="left">Administrador</TableHeader>
                <TableHeader align="left">E-mail</TableHeader>
                <TableHeader align="left">Papel</TableHeader>
                <TableHeader align="left">Desde</TableHeader>
                <TableHeader align="right">Ação</TableHeader>
              </tr>
            </thead>
            <tbody>
              {ADMINS.map((admin) => (
                <tr
                  key={admin.email}
                  className="border-b border-border-subtle last:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar
                        name={admin.name}
                        size="s"
                        tone={admin.pending ? "neutral" : "subtle"}
                      />
                      <span
                        className={`whitespace-nowrap text-label-s ${
                          admin.pending ? "text-content-muted" : "text-content"
                        }`}
                      >
                        {admin.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-body-s text-content-muted">
                    {admin.email}
                  </td>
                  <td className="px-4 py-3">
                    {admin.pending ? (
                      <Badge tone="warning">Pendente</Badge>
                    ) : (
                      <span className="text-body-s text-content-muted">
                        {admin.role}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-body-s text-content-muted">
                    {admin.since}
                  </td>
                  <td className="py-1 text-right">
                    {admin.removable ? (
                      <button
                        type="button"
                        className={`inline-flex cursor-pointer items-center justify-center rounded-md px-6 py-3 text-label-m whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus ${
                          admin.pending
                            ? "text-content-warning hover:bg-warning-subtle"
                            : "text-content-danger hover:bg-danger-subtle"
                        }`}
                      >
                        {admin.pending ? "Cancelar convite" : "Remover"}
                      </button>
                    ) : (
                      <span className="pr-4 text-body-s text-content-subtle">
                        —
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-body-s text-content-muted">
          Administradores têm acesso completo ao painel, incluindo
          configurações e gestão de corretores. O proprietário do plano não
          pode ser removido. Convites pendentes expiram em 7 dias.
        </p>
      </Card>
    </>
  );
}
