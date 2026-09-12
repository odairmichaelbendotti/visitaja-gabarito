import type { ReactNode } from "react";
import type { Metadata } from "next";
import Button from "@/app/components/Button";
import FormField from "@/app/components/FormField";
import Card from "@/app/components/Card";
import Badge from "@/app/components/Badge";
import Avatar from "@/app/components/Avatar";
import TableHeader from "@/app/components/TableHeader";
import Sidebar from "@/app/components/Sidebar";
import SelectField from "@/app/components/SelectField";
import ModalPreview from "./ModalPreview";

export const metadata: Metadata = {
  title: "Preview de componentes · VisitaJá",
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="appear flex flex-col gap-4">
      <h2 className="font-display text-title-l text-content">{title}</h2>
      {children}
    </section>
  );
}

function Sample({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-label-s text-content-subtle">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-display-l text-content">
          VisitaJá · Componentes base
        </h1>
        <p className="text-body-l text-content-muted">
          Uma instância de cada variante dos componentes de{" "}
          <code className="text-body-m text-content-brand">app/components</code>.
        </p>
      </header>

      <Section title="Botão">
        <p className="text-body-s text-content-subtle">
          Hover e foco são estados de CSS — passe o mouse ou navegue por Tab.
        </p>
        <Sample label="Primário — default / desabilitado">
          <Button variant="primary" />
          <Button variant="primary" disabled />
        </Sample>
        <Sample label="Secundário — default / desabilitado">
          <Button variant="secondary" />
          <Button variant="secondary" disabled />
        </Sample>
        <Sample label="Fantasma — default / desabilitado">
          <Button variant="ghost" />
          <Button variant="ghost" disabled />
        </Sample>
      </Section>

      <Section title="Campo de formulário">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            id="field-default"
            placeholder="voce@imobiliaria.com.br"
          />
          <FormField
            id="field-error"
            defaultValue="contato@"
            error="Digite um e-mail válido."
          />
          <FormField
            id="field-disabled"
            placeholder="voce@imobiliaria.com.br"
            helperText="Campo indisponível neste plano."
            disabled
          />
          <FormField
            id="field-focus"
            placeholder="voce@imobiliaria.com.br"
            helperText="Clique no campo para ver o estado de foco."
          />
        </div>
      </Section>

      <Section title="Campo de seleção">
        <p className="text-body-s text-content-subtle">
          Clique em um campo para ver o estado Aberto.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <SelectField id="select-default" />
          <SelectField id="select-filled" defaultValue="Opção 2" />
          <SelectField
            id="select-error"
            defaultValue="Opção 2"
            error="Campo obrigatório"
          />
          <SelectField id="select-disabled" disabled />
        </div>
      </Section>

      <Section title="Card">
        <div className="flex flex-wrap gap-6">
          {(["default", "highlight"] as const).map((emphasis) => (
            <Card key={emphasis} emphasis={emphasis} className="w-75">
              <span className="text-label-s text-content-brand">
                APARTAMENTO
              </span>
              <span className="font-display text-title-m text-content">
                Rua Fradique Coutinho, 1200 — Pinheiros
              </span>
              <span className="text-body-s text-content-muted">
                72 m² · 2 dormitórios · 1 vaga · R$ 4.900/mês
              </span>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Badge">
        <div className="flex flex-wrap gap-3">
          <Badge tone="neutral">Rascunho</Badge>
          <Badge tone="brand">Novo</Badge>
          <Badge tone="success">Confirmada</Badge>
          <Badge tone="warning">Pendente</Badge>
          <Badge tone="error">Cancelada</Badge>
          <Badge tone="accent">Limite atingido</Badge>
        </div>
      </Section>

      <Section title="Avatar">
        <Sample label="Iniciais — P / M / G">
          <Avatar name="Marina Rocha" size="s" />
          <Avatar name="Marina Rocha" size="m" />
          <Avatar name="Marina Rocha" size="l" />
        </Sample>
        <Sample label="Foto — P / M / G">
          <Avatar name="Marina Rocha" src="/demo/corretora.png" size="s" />
          <Avatar name="Marina Rocha" src="/demo/corretora.png" size="m" />
          <Avatar name="Marina Rocha" src="/demo/corretora.png" size="l" />
        </Sample>
        <Sample label="Tom — sutil (padrão) / sólido / neutro">
          <Avatar name="Marina Rocha" tone="subtle" />
          <Avatar name="Marina Rocha" tone="solid" />
          <Avatar name="Marina Rocha" tone="neutral" />
        </Sample>
      </Section>

      <Section title="Cabeçalho de tabela">
        <table className="w-full max-w-xl border-collapse overflow-hidden rounded-md">
          <thead>
            <tr>
              <TableHeader align="left" sortDirection="none">
                Corretor responsável
              </TableHeader>
              <TableHeader align="center" sortDirection="none">
                Imóvel
              </TableHeader>
              <TableHeader align="left" sortDirection="asc">
                Cliente
              </TableHeader>
              <TableHeader align="right" sortDirection="desc">
                Valor
              </TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr className="text-body-s text-content-muted">
              <td className="px-4 py-3">Marina Rocha</td>
              <td className="px-4 py-3 text-center">R. Oscar Freire, 980</td>
              <td className="px-4 py-3">João Prado</td>
              <td className="px-4 py-3 text-right">R$ 4.900</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section title="Modal">
        <ModalPreview />
      </Section>

      <Section title="Sidebar">
        <div className="flex flex-wrap gap-6">
          {(
            ["overview", "agents", "properties", "settings"] as const
          ).map((page) => (
            <div
              key={page}
              className="h-112 overflow-hidden rounded-lg border border-border-subtle shadow-sm"
            >
              <Sidebar activePage={page} />
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
