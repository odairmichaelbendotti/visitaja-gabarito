import type { Metadata } from "next";
import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import BrandLogoLink from "@/lib/auth/BrandLogoLink";
import LogoutButton from "@/lib/auth/LogoutButton";
import RequireAuth from "@/lib/auth/RequireAuth";
import CurrentUser from "@/lib/auth/CurrentUser";

export const metadata: Metadata = {
  title: "Onboarding · VisitaJá",
};

function CalendarIcon({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      <path
        d="M13.3333 3.332V9.9992M26.6667 3.332V9.9992M5 16.6664H35M8.33333 6.6656H31.6667C33.5076 6.6656 35 8.1581 35 9.9992V33.3344C35 35.1755 33.5076 36.668 31.6667 36.668H8.33333C6.49238 36.668 5 35.1755 5 33.3344V9.9992C5 8.1581 6.49238 6.6656 8.33333 6.6656Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

const PENDING_INVITE = {
  company: "Rocha & Lima Imóveis",
  invitedBy: "Marina Rocha",
  role: "Corretor",
};

export default function OnboardingPage() {
  return (
    <RequireAuth>
      <div className="flex min-h-dvh flex-1 flex-col bg-canvas">
        <header className="flex items-center justify-between border-b border-border-subtle bg-surface px-6 py-4 lg:px-16">
          <BrandLogoLink className="font-display text-title-m" />
          <CurrentUser />
        </header>

        <main className="flex flex-1 items-center justify-center p-6 lg:p-16">
          <Card className="w-full max-w-135 items-center gap-8 text-center">
            <span className="flex size-20 items-center justify-center rounded-full bg-brand-subtle text-content-brand">
              <CalendarIcon />
            </span>

            <div className="flex flex-col gap-3">
              <h1 className="font-display text-title-xl text-content">
                Para começar, escolha um plano ou aceite o convite de uma
                imobiliária
              </h1>
              <p className="text-body-m text-content-muted">
                Você ainda não tem um plano ativo. Selecione uma assinatura ou
                aceite um convite pendente para acessar o painel e começar a
                gerenciar visitas.
              </p>
            </div>

            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full flex-col gap-3">
                <span className="text-label-m text-content">
                  Convites pendentes
                </span>
                <div className="flex w-full items-center gap-4 rounded-lg border border-border-subtle bg-surface p-4 text-left">
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-label-m text-content">
                      {PENDING_INVITE.company}
                    </span>
                    <span className="text-body-s text-content-muted">
                      Convidado por {PENDING_INVITE.invitedBy} para o papel de{" "}
                      {PENDING_INVITE.role}
                    </span>
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-2">
                    <Button variant="primary">Aceitar</Button>
                    <button
                      type="button"
                      className="cursor-pointer rounded-md px-6 py-3 text-label-m text-content-muted transition-colors hover:bg-muted"
                    >
                      Recusar
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex w-full items-center gap-2">
                <hr className="flex-1 border-border-subtle" />
                <span className="text-body-s text-content-subtle">ou</span>
                <hr className="flex-1 border-border-subtle" />
              </div>

              <div className="flex w-full flex-col gap-3 text-left">
                <span className="text-label-m text-content">
                  Assinar um plano
                </span>
                <p className="text-body-s text-content-muted">
                  Se preferir, escolha um plano que se encaixe no seu perfil e
                  comece a usar o VisitaJá agora mesmo.
                </p>
                <Button
                  variant="primary"
                  href="/assinatura/escolher-plano"
                  className="w-full"
                >
                  Escolher um plano
                </Button>
              </div>
            </div>

            <LogoutButton className="w-full rounded-md px-6 py-3 text-center text-label-m text-content-muted transition-colors hover:bg-muted">
              Sair da conta
            </LogoutButton>
          </Card>
        </main>
      </div>
    </RequireAuth>
  );
}
