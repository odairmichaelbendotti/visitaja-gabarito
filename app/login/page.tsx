import type { Metadata } from "next";
import Button from "@/app/components/Button";
import BrandLogoLink from "@/lib/auth/BrandLogoLink";
import { EXAMPLE_CREDENTIALS } from "@/lib/store/user";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Entrar · VisitaJá",
};

function CalendarIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path
        d="M6.66667 1.666V4.9996M13.3333 1.666V4.9996M2.5 8.3332H17.5M7.5 13.3336L9.16667 15.0004L12.5 11.6668M4.16667 3.3328H15.8333C16.7538 3.3328 17.5 4.07905 17.5 4.9996V16.6672C17.5 17.5877 16.7538 18.334 15.8333 18.334H4.16667C3.24619 18.334 2.5 17.5877 2.5 16.6672V4.9996C2.5 4.07905 3.24619 3.3328 4.16667 3.3328Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoogleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={className}>
      <path
        d="M18.1712 8.36792H17.5V8.33333H10V11.6667H14.7096C14.0225 13.6071 12.1762 15 10 15C7.23875 15 5 12.7612 5 10C5 7.23875 7.23875 5 10 5C11.2746 5 12.4342 5.48083 13.3171 6.26625L15.6742 3.90917C14.1858 2.52208 12.195 1.66667 10 1.66667C5.39792 1.66667 1.66667 5.39792 1.66667 10C1.66667 14.6021 5.39792 18.3333 10 18.3333C14.6021 18.3333 18.3333 14.6021 18.3333 10C18.3333 9.44125 18.2758 8.89583 18.1712 8.36792Z"
        fill="#FFC107"
      />
      <path
        d="M2.6275 6.12125L5.36542 8.12917C6.10625 6.295 7.90042 5 10 5C11.2746 5 12.4342 5.48083 13.3171 6.26625L15.6742 3.90917C14.1858 2.52208 12.195 1.66667 10 1.66667C6.79917 1.66667 4.02333 3.47375 2.6275 6.12125Z"
        fill="#FF3D00"
      />
      <path
        d="M10 18.3333C12.1525 18.3333 14.1083 17.5096 15.5871 16.17L13.0079 13.9875C12.1431 14.6452 11.0864 15.0009 10 15C7.8325 15 5.99208 13.6179 5.29875 11.6892L2.58125 13.7829C3.96042 16.4817 6.76125 18.3333 10 18.3333Z"
        fill="#4CAF50"
      />
      <path
        d="M18.1712 8.36792H17.5V8.33333H10V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.9879L13.0079 13.9871L15.5871 16.1696C15.4046 16.3354 18.3333 14.1667 18.3333 10C18.3333 9.44125 18.2758 8.89583 18.1712 8.36792Z"
        fill="#1976D2"
      />
    </svg>
  );
}

function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="flex items-center justify-center rounded-md bg-surface p-1.5 text-brand">
        <CalendarIcon />
      </span>
      <span className="font-display text-title-l text-on-brand">
        VisitaJá
      </span>
    </div>
  );
}

const STATS = [
  { value: "+50k", label: "VISITAS MARCADAS" },
  { value: "-70%", label: "DE NO-SHOWS" },
];

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col lg:flex-row">
      {/* Brand panel (large screens only) */}
      <div className="relative hidden shrink-0 flex-col justify-between overflow-hidden bg-brand p-16 text-on-brand lg:flex lg:w-1/2">
        <div
          aria-hidden
          className="absolute -top-50 -right-50 size-150 rounded-full bg-white/5"
        />
        <div
          aria-hidden
          className="absolute -bottom-25 -left-25 size-100 rounded-full bg-gray-950/10"
        />

        <BrandLogo className="relative" />

        <div className="relative flex flex-col gap-6">
          <h1 className="font-display text-display-xl">
            Bem-vindo de volta ao VisitaJá.
          </h1>
          <p className="max-w-130 text-body-l text-on-brand/80">
            Acesse o painel da sua imobiliária e acompanhe visitas, corretores
            e imóveis em um só lugar.
          </p>
        </div>

        <div className="relative flex gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="font-display text-title-xl">
                {stat.value}
              </span>
              <span className="text-label-s text-on-brand/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-surface p-6 lg:p-16">
        <span className="flex items-center gap-2 lg:hidden">
          <span className="flex items-center justify-center rounded-md bg-brand-subtle p-1.5 text-content-brand">
            <CalendarIcon />
          </span>
          <BrandLogoLink className="font-display text-title-l" />
        </span>

        <div className="flex w-full max-w-105 flex-col items-center gap-6">
          <h2 className="font-display text-title-m text-content">
            Entrar na sua conta
          </h2>

          <p className="w-full rounded-md bg-brand-subtle px-4 py-3 text-center text-body-s text-content-brand">
            Sem backend ainda — use{" "}
            <strong>{EXAMPLE_CREDENTIALS.email}</strong> /{" "}
            <strong>{EXAMPLE_CREDENTIALS.password}</strong> para testar
          </p>

          <Button variant="secondary" className="w-full">
            <GoogleIcon />
            Entrar com Google
          </Button>

          <div className="flex w-full items-center gap-3">
            <hr className="flex-1 border-border" />
            <span className="text-label-s text-content-muted">ou</span>
            <hr className="flex-1 border-border" />
          </div>

          <LoginForm />

          <Button variant="ghost" href="/" className="w-full">
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
