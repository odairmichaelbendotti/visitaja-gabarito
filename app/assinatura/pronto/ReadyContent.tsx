"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import { useUserStore } from "@/lib/store/user";
import { getPlan } from "../plans";

function CheckIcon({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden className={className}>
      <path
        d="M30 9L13.5 25.5L6 18"
        stroke="currentColor"
        strokeWidth={3.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path
        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
        stroke="currentColor"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.08333 10.4167L9.16667 12.5L12.9167 7.91667"
        stroke="currentColor"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ReadyContent() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const plan = getPlan(user?.plan);
  const email = user?.email ?? "marina@ancoraimoveis.com.br";

  const NEXT_STEPS = [
    `Cadastre seus corretores (${plan.maxAgents ? `até ${plan.maxAgents}` : "quantos precisar"} no plano ${plan.name})`,
    "Cadastre o primeiro imóvel com fotos, endereço e valor",
    "Copie o link do imóvel e compartilhe com os interessados",
  ];

  return (
    <div className="flex w-full max-w-170 flex-col items-center gap-6 overflow-hidden">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-success-subtle text-content-success">
        <CheckIcon className="size-6" />
      </span>

      <div className="flex max-w-125 flex-col items-center gap-2 text-center">
        <h1 className="font-display text-title-l text-content">
          Pagamento confirmado. Bem-vindo ao VisitaJá!
        </h1>
        <p className="text-body-s text-content-muted">
          Enviamos o recibo e o link de acesso para {email}. O plano{" "}
          {plan.name} já está ativo.
        </p>
      </div>

      <div className="flex w-full flex-col gap-4 rounded-lg border border-border-subtle bg-surface p-6 shadow-sm">
        <span className="font-display text-title-s text-content">
          Seu primeiro acesso
        </span>

        <div className="flex w-full items-center gap-2">
          <span className="w-45 shrink-0 text-body-s text-content-subtle">
            Endereço do painel
          </span>
          <span className="text-link-m text-content-brand">
            ancoraimoveis.visitaja.com.br
          </span>
        </div>
        <div className="flex w-full items-center gap-2">
          <span className="w-45 shrink-0 text-body-s text-content-subtle">
            Usuário
          </span>
          <span className="text-label-m text-content">{email}</span>
        </div>
        <div className="flex w-full items-center gap-2">
          <span className="w-45 shrink-0 text-body-s text-content-subtle">
            Senha
          </span>
          <span className="text-label-m text-content">
            Você define ao abrir o painel
          </span>
        </div>

        <Button
          variant="primary"
          className="w-full"
          onClick={() => router.push("/visao-geral")}
        >
          Abrir o painel
        </Button>
      </div>

      <div className="flex w-full flex-col gap-2">
        <span className="font-display text-title-s text-content">
          Próximos passos no painel
        </span>
        {NEXT_STEPS.map((step) => (
          <div key={step} className="flex items-center gap-2">
            <span className="shrink-0 text-content-brand">
              <CheckCircleIcon className="size-4" />
            </span>
            <p className="text-body-s text-content-muted">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
