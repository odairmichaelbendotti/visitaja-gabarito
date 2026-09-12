import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/Button";
import { getPropertyBySlug, PROPERTIES } from "@/lib/data/properties";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    weekday?: string;
    day?: string;
    time?: string;
    name?: string;
    email?: string;
  }>;
}

export function generateStaticParams() {
  return PROPERTIES.map((property) => ({ slug: property.slug }));
}

export const metadata: Metadata = {
  title: "Visita confirmada · VisitaJá",
};

function CheckIcon({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden className={className}>
      <path
        d="M30 9L13.5 25.5L6 18"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden className={className}>
      <path
        d="M13.5 3.75H4.5C3.67157 3.75 3 4.42157 3 5.25V14.25C3 15.0784 3.67157 15.75 4.5 15.75H13.5C14.3284 15.75 15 15.0784 15 14.25V5.25C15 4.42157 14.3284 3.75 13.5 3.75Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 7.5H15M6 2.25V5.25M12 2.25V5.25"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden className={className}>
      <path
        d="M9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 5.25V9L11.25 10.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationPinIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden className={className}>
      <path
        d="M9 15.75C9 15.75 14.25 11.85 14.25 7.5C14.25 6.81056 14.1142 6.12787 13.8504 5.49091C13.5865 4.85395 13.1998 4.2752 12.7123 3.78769C12.2248 3.30018 11.646 2.91347 11.0091 2.64963C10.3721 2.3858 9.68944 2.25 9 2.25C8.31056 2.25 7.62787 2.3858 6.99091 2.64963C6.35395 2.91347 5.7752 3.30018 5.28769 3.78769C4.80018 4.2752 4.41347 4.85395 4.14963 5.49091C3.8858 6.12787 3.75 6.81056 3.75 7.5C3.75 11.85 9 15.75 9 15.75Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.375C10.0355 9.375 10.875 8.53553 10.875 7.5C10.875 6.46447 10.0355 5.625 9 5.625C7.96447 5.625 7.125 6.46447 7.125 7.5C7.125 8.53553 7.96447 9.375 9 9.375Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default async function VisitConfirmedPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const query = await searchParams;
  const weekday = query.weekday ?? "quarta";
  const day = query.day ?? "10";
  const time = query.time ?? "11:00";
  const visitorEmail = query.email ?? "bruno.tavares@email.com";
  const agentFirstName = property.agent.name.split(" ")[0];
  const neighborhood = property.address.split("—")[1]?.trim() ?? property.address;
  const fullAddress = `${property.fullAddress}`;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-canvas">
      <main className="flex flex-1 flex-col items-center justify-center gap-5 overflow-hidden px-6 py-4 lg:px-16">
        <div className="flex w-full max-w-160 flex-col items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-full bg-success-subtle text-content-success">
            <CheckIcon className="size-7" />
          </span>

          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="font-display text-title-xl text-content">
              Visita confirmada!
            </h1>
            <p className="text-body-m text-content-muted">
              Enviamos os detalhes e um lembrete para {visitorEmail}.{" "}
              {agentFirstName} vai te encontrar no imóvel no horário marcado.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-5 shadow-sm">
            <div className="flex w-full items-center gap-3">
              <div
                className={`h-14 w-18 shrink-0 rounded-sm bg-gradient-to-br ${property.gradient}`}
              />
              <div className="min-w-0">
                <p className="truncate text-body-s text-content-subtle">
                  {property.category} · {neighborhood}
                </p>
                <p className="truncate font-display text-title-s text-content">
                  {property.fullAddress.split("·")[0].trim()}
                </p>
              </div>
            </div>

            <hr className="w-full border-border-subtle" />

            <div className="flex w-full items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-brand-subtle text-content-brand">
                <CalendarIcon />
              </span>
              <div className="min-w-0">
                <p className="text-body-s text-content-subtle">Data</p>
                <p className="text-label-m text-content">
                  {capitalize(weekday)}, {day} de setembro de 2026
                </p>
              </div>
            </div>

            <div className="flex w-full items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-brand-subtle text-content-brand">
                <ClockIcon />
              </span>
              <div className="min-w-0">
                <p className="text-body-s text-content-subtle">Horário</p>
                <p className="text-label-m text-content">
                  {time} — chegue 5 minutos antes
                </p>
              </div>
            </div>

            <div className="flex w-full items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-brand-subtle text-content-brand">
                <LocationPinIcon />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-body-s text-content-subtle">Endereço</p>
                <p className="truncate text-label-m text-content">
                  {fullAddress}
                </p>
              </div>
            </div>

            <hr className="w-full border-border-subtle" />

            <div className="flex w-full flex-wrap items-center gap-3">
              <Avatar name={property.agent.name} size="l" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-label-m text-content">
                  {property.agent.name} · {property.agent.role.toLowerCase()}{" "}
                  responsável
                </p>
                <p className="truncate text-body-s text-content-subtle">
                  {property.agent.phone} · {property.agent.email}
                </p>
              </div>
              <Button variant="secondary">Chamar no WhatsApp</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
