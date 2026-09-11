import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Avatar from "@/app/components/Avatar";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import Sidebar from "@/app/components/Sidebar";
import RequireAuth from "@/lib/auth/RequireAuth";
import { getPropertyBySlug, PROPERTIES } from "@/lib/data/properties";
import CopyLinkButton from "./CopyLinkButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROPERTIES.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  return { title: `${property?.address ?? "Imóvel"} · VisitaJá` };
}

function BackIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="currentColor"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M3.33333 2.66667H6L7.33333 6L5.33333 7.33333C6.08443 8.75402 7.24598 9.91557 8.66667 10.6667L10 8.66667L13.3333 10V12.6667C13.3333 13.0203 13.1929 13.3594 12.9428 13.6095C12.6928 13.8595 12.3536 14 12 14C9.44639 13.7137 7.06588 12.5681 5.24889 10.7511C3.4319 8.93412 2.28631 6.55361 2 4C2 3.64638 2.14048 3.30724 2.39052 3.05719C2.64057 2.80714 2.97971 2.66667 3.33333 2.66667Z"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M12.6667 3.33333H3.33333C2.59695 3.33333 2 3.93029 2 4.66667V11.3333C2 12.0697 2.59695 12.6667 3.33333 12.6667H12.6667C13.403 12.6667 14 12.0697 14 11.3333V4.66667C14 3.93029 13.403 3.33333 12.6667 3.33333Z"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66667 4.66667L8 8.66667L13.3333 4.66667"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const publicLink = `visitaja.com.br/imovel/${property.slug}`;

  return (
    <RequireAuth requirePlan>
      <div className="flex h-dvh flex-col lg:flex-row">
        <Sidebar activePage="properties" />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          <header className="flex shrink-0 items-center gap-3 border-b border-border-subtle bg-surface px-8 py-4">
            <div className="flex flex-1 items-center gap-2 min-w-0">
              <Link
                href="/imoveis"
                aria-label="Voltar para Imóveis"
                className="flex shrink-0 items-center justify-center rounded-md p-1 text-content-subtle transition-colors hover:bg-muted hover:text-content"
              >
                <BackIcon />
              </Link>
              <h1 className="truncate font-display text-title-l text-content">
                {property.address}
              </h1>
            </div>
            <Button variant="ghost">Editar</Button>
            <Button variant="secondary">Abrir página pública</Button>
          </header>

          <main className="flex min-w-0 flex-col items-start gap-6 p-8 lg:flex-row">
            <div className="flex w-full min-w-0 flex-1 flex-col gap-4">
              <div
                className={`h-75 w-full rounded-lg bg-gradient-to-br ${property.gradient}`}
              />
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {property.galleryGradients.map((gradient, index) => (
                  <div
                    key={index}
                    className={`h-20 w-full rounded-sm bg-gradient-to-br ${gradient}`}
                  />
                ))}
              </div>

              <Card className="w-full">
                <div className="flex items-center gap-2">
                  <Badge tone="brand">{property.category}</Badge>
                  <Badge tone={property.status === "available" ? "success" : "warning"}>
                    {property.status === "available" ? "Disponível" : "Reservado"}
                  </Badge>
                </div>

                <span className="font-display text-title-m text-content">
                  {property.fullAddress}
                </span>

                <div className="flex flex-wrap items-end gap-4">
                  <span className="font-display text-title-l text-content">
                    {property.price}
                  </span>
                  <span className="text-body-s text-content-subtle">
                    {property.priceExtra}
                  </span>
                </div>

                <span className="text-body-m text-content-muted">
                  {property.fullDetails}
                </span>

                <hr className="w-full border-border-subtle" />

                <span className="text-label-m text-content">Características</span>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-muted px-2 py-0.5 text-body-s text-content-muted"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <span className="text-label-m text-content">Descrição</span>
                <p className="text-body-s text-content-muted">
                  {property.description}
                </p>
              </Card>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-4 lg:w-95">
              <div className="flex w-full flex-col gap-3 rounded-lg border-[1.5px] border-border-brand bg-brand-subtle p-4">
                <span className="font-display text-title-s text-content">
                  Link público do imóvel
                </span>
                <div className="w-full rounded-md border border-border-brand bg-surface px-3 py-2">
                  <span className="text-link-m text-content-brand">
                    {publicLink}
                  </span>
                </div>
                <CopyLinkButton link={publicLink} />
                <p className="text-label-s text-content-brand">
                  Compartilhar no WhatsApp · Gerar QR Code
                </p>
                <p className="text-body-s text-content-muted">
                  {property.stats.visitsThisMonth} visitas já foram agendadas
                  por este link.
                </p>
              </div>

              <Card className="w-full">
                <span className="text-label-m text-content-subtle">
                  Corretor responsável
                </span>
                <div className="flex w-full items-center gap-2">
                  <Avatar name={property.agent.name} size="l" />
                  <div className="min-w-0">
                    <p className="truncate font-display text-title-s text-content">
                      {property.agent.name}
                    </p>
                    <p className="truncate text-body-s text-content-subtle">
                      {property.agent.role} · {property.agent.activeProperties}{" "}
                      imóveis ativos
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-body-s text-content-muted">
                  <span className="text-content-subtle">
                    <PhoneIcon />
                  </span>
                  {property.agent.phone}
                </div>
                <div className="flex items-center gap-2 text-body-s text-content-muted">
                  <span className="text-content-subtle">
                    <EmailIcon />
                  </span>
                  {property.agent.email}
                </div>
              </Card>

              <Card className="w-full">
                <span className="text-label-m text-content-subtle">
                  Desempenho do imóvel
                </span>
                <div className="flex w-full items-center gap-2">
                  <span className="flex-1 text-body-s text-content-muted">
                    Visitas neste mês
                  </span>
                  <span className="text-label-s text-content">
                    {property.stats.visitsThisMonth}
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="flex-1 text-body-s text-content-muted">
                    Comparecimento
                  </span>
                  <span className="text-label-s text-content">
                    {property.stats.attendanceRate}
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="flex-1 text-body-s text-content-muted">
                    Publicado em
                  </span>
                  <span className="text-label-s text-content">
                    {property.stats.publishedAt}
                  </span>
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
