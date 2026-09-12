import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Badge from "@/app/components/Badge";
import BrandLogoLink from "@/lib/auth/BrandLogoLink";
import { getPropertyBySlug, PROPERTIES } from "@/lib/data/properties";
import BookingForm from "./BookingForm";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ corretor?: string }>;
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

function LocationPinIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M8 14C8 14 12.6667 10.5333 12.6667 6.66667C12.6667 6.05383 12.546 5.447 12.3114 4.88081C12.0769 4.31462 11.7332 3.80017 11.2998 3.36683C10.8665 2.93349 10.352 2.58975 9.78586 2.35523C9.21967 2.12071 8.61284 2 8 2C7.38716 2 6.78033 2.12071 6.21414 2.35523C5.64796 2.58975 5.13351 2.93349 4.70017 3.36683C4.26683 3.80017 3.92308 4.31462 3.68856 4.88081C3.45404 5.447 3.33333 6.05383 3.33333 6.66667C3.33333 10.5333 8 14 8 14Z"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8.33333C8.92047 8.33333 9.66667 7.58714 9.66667 6.66667C9.66667 5.74619 8.92047 5 8 5C7.07953 5 6.33333 5.74619 6.33333 6.66667C6.33333 7.58714 7.07953 8.33333 8 8.33333Z"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function PublicPropertyPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  // The `corretor` param comes from the link copied in /imoveis/[slug] — it
  // identifies who shared it, so the visit created here can be credited to
  // that corretor instead of always assuming the property's listed agent.
  const { corretor } = await searchParams;
  const agentEmail = corretor ?? property.agent.email;

  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <header className="flex items-center gap-3 border-b border-border-subtle bg-surface px-6 py-4 lg:px-16">
        <BrandLogoLink className="font-display text-title-m" />
        <div className="flex-1" />
        <span className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-body-s text-content-subtle">
            Anunciado por
          </span>
          <span className="text-label-s text-content">Âncora Imóveis</span>
        </span>
      </header>

      <main className="flex flex-col items-start gap-10 px-6 py-10 lg:flex-row lg:px-16">
        <div className="flex w-full min-w-0 flex-1 flex-col gap-6">
          <div className="flex w-full gap-2">
            <div
              className={`h-95 flex-1 rounded-md bg-gradient-to-br ${property.gradient}`}
            />
            <div className="flex w-45 shrink-0 flex-col gap-2">
              {property.galleryGradients.slice(0, 3).map((gradient, index) => (
                <div
                  key={index}
                  className={`h-30 w-full rounded-md bg-gradient-to-br ${gradient}`}
                />
              ))}
              <div className="flex h-15 w-full items-center justify-center rounded-md bg-muted">
                <span className="text-label-s text-content-muted">
                  + 8 fotos
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge tone="brand">{property.category}</Badge>
              <Badge tone="success">
                {property.status === "available"
                  ? "Disponível para visita"
                  : "Reservado"}
              </Badge>
            </div>
            <h1 className="font-display text-display-l text-content">
              {property.address}
            </h1>
            <div className="flex items-center gap-1 text-content-muted">
              <LocationPinIcon className="size-4 shrink-0" />
              <span className="text-body-m">{property.locationNote}</span>
            </div>
            <div className="flex flex-wrap items-end gap-3 pt-2">
              <span className="font-display text-title-xl text-content">
                {property.price}
              </span>
              <span className="text-body-s text-content-subtle">
                {property.priceExtra}
              </span>
            </div>
          </div>

          <div className="flex w-full flex-wrap gap-8 rounded-lg border border-border-subtle bg-surface p-4">
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="font-display text-title-s text-content">
                {property.publicStats.area}
              </span>
              <span className="text-body-s text-content-subtle">
                Área útil
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="font-display text-title-s text-content">
                {property.publicStats.bedrooms}
              </span>
              <span className="text-body-s text-content-subtle">
                Dormitórios
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="font-display text-title-s text-content">
                {property.publicStats.parking}
              </span>
              <span className="text-body-s text-content-subtle">Vagas</span>
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="font-display text-title-s text-content">
                {property.publicStats.floor}
              </span>
              <span className="text-body-s text-content-subtle">Andar</span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <h2 className="font-display text-title-m text-content">
              Sobre o imóvel
            </h2>
            <p className="text-body-m text-content-muted">
              {property.description}
            </p>
          </div>

          <div className="flex w-full flex-col gap-2">
            <h2 className="font-display text-title-m text-content">
              Características
            </h2>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-body-s text-content-muted"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <h2 className="font-display text-title-m text-content">
              Localização
            </h2>
            <div className="relative flex h-55 w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-gray-100 to-gray-200">
              <span className="flex items-center gap-1 rounded-full bg-surface px-3 py-2 shadow-sm">
                <LocationPinIcon className="size-4 shrink-0 text-content-brand" />
                <span className="text-label-s text-content">
                  {property.address.split("—")[0].trim()}
                </span>
              </span>
            </div>
          </div>
        </div>

        <BookingForm
          slug={property.slug}
          agent={property.agent}
          agentEmail={agentEmail}
        />
      </main>
    </div>
  );
}
