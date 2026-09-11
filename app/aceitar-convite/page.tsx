import type { Metadata } from "next";
import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/Button";
import Sidebar from "@/app/components/Sidebar";

export const metadata: Metadata = {
  title: "Convite para administrador · VisitaJá",
};

const INVITE = {
  company: "Âncora Imóveis",
  companyInitials: "AI",
  plan: "Profissional",
  invitedBy: "Marina Rocha",
  expiresIn: "6 dias",
};

export default function AcceptInvitePage() {
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden lg:flex-row">
      <Sidebar activePage="overview" />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center border-b border-border-subtle bg-surface px-8 py-4">
          <span className="font-display text-title-l text-content">
            Visão geral
          </span>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-8">
          <div className="flex gap-4">
            <div className="h-30 flex-1 rounded-md border border-border bg-surface" />
            <div className="h-30 flex-1 rounded-md border border-border bg-surface" />
            <div className="h-30 flex-1 rounded-md border border-border bg-surface" />
          </div>
          <div className="flex-1 rounded-lg border border-border bg-surface" />
        </main>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-gray-950/40 p-4 backdrop-blur-sm">
        <div className="flex w-full max-w-130 flex-col items-center gap-6 rounded-lg bg-surface p-8 shadow-sm">
          <span className="font-display text-title-m">
            <span className="text-content">Visita</span>
            <span className="text-content-brand">Já</span>
          </span>

          <span className="flex size-16 items-center justify-center rounded-full bg-brand-subtle font-display text-title-l text-content-brand">
            {INVITE.companyInitials}
          </span>

          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="font-display text-title-l text-content">
              Convite para administrador
            </h1>
            <p className="text-body-m text-content-muted">
              A imobiliária {INVITE.company} convidou você para ser
              administrador do painel. Como administrador, você terá acesso
              completo às configurações, corretores e imóveis.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 rounded-md border border-border bg-canvas p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-label-s uppercase text-content-subtle">
                Imobiliária
              </span>
              <span className="text-label-m text-content">
                {INVITE.company}
              </span>
            </div>
            <hr className="w-full border-border" />
            <div className="flex items-center justify-between gap-3">
              <span className="text-label-s uppercase text-content-subtle">
                Plano
              </span>
              <span className="text-label-m text-content">{INVITE.plan}</span>
            </div>
            <hr className="w-full border-border" />
            <div className="flex items-center justify-between gap-3">
              <span className="text-label-s uppercase text-content-subtle">
                Convidado por
              </span>
              <div className="flex items-center gap-2">
                <Avatar name={INVITE.invitedBy} size="s" />
                <span className="text-label-m text-content">
                  {INVITE.invitedBy}
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <Button variant="secondary" className="flex-1">
              Recusar
            </Button>
            <Button variant="primary" className="flex-1">
              Aceitar convite
            </Button>
          </div>

          <p className="text-body-s text-content-subtle">
            Este convite expira em {INVITE.expiresIn}.
          </p>
        </div>
      </div>
    </div>
  );
}
