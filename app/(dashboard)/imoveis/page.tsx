import type { Metadata } from "next";
import Link from "next/link";
import Avatar from "@/app/components/Avatar";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/Button";
import Sidebar from "@/app/components/Sidebar";
import RequireAuth from "@/lib/auth/RequireAuth";
import { PROPERTIES } from "@/lib/data/properties";

export const metadata: Metadata = {
  title: "Imóveis · VisitaJá",
};

function SearchIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M7.33333 12C9.91066 12 12 9.91066 12 7.33333C12 4.756 9.91066 2.66667 7.33333 2.66667C4.756 2.66667 2.66667 4.756 2.66667 7.33333C2.66667 9.91066 4.756 12 7.33333 12Z"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 14L11.1333 11.1333"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FILTERS = [
  { label: "Todos (37)", active: true },
  { label: "Disponível (29)", active: false },
  { label: "Reservado (8)", active: false },
];

export default function PropertiesPage() {
  return (
    <RequireAuth requirePlan>
      <div className="flex h-dvh flex-col lg:flex-row">
        <Sidebar activePage="properties" />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          <header className="flex shrink-0 items-center gap-3 border-b border-border-subtle bg-surface px-8 py-4">
            <h1 className="flex-1 font-display text-title-l text-content">
              Imóveis
            </h1>
            <Button variant="primary" href="/imoveis/cadastrar">
              Novo imóvel
            </Button>
          </header>

          <main className="flex flex-col gap-6 p-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 has-[:focus]:border-border-focus has-[:focus]:ring-2 has-[:focus]:ring-border-focus">
                <span className="shrink-0 text-content-subtle">
                  <SearchIcon />
                </span>
                <label htmlFor="search-imoveis" className="sr-only">
                  Buscar imóveis
                </label>
                <input
                  id="search-imoveis"
                  type="search"
                  placeholder="Buscar por endereço, bairro ou corretor"
                  className="w-72 bg-transparent text-body-s text-content outline-none placeholder:text-content-subtle"
                />
              </div>

              <div className="flex flex-wrap gap-0.5">
                {FILTERS.map((filter) => (
                  <button
                    key={filter.label}
                    type="button"
                    className={`cursor-pointer rounded-full px-3 py-2 text-label-s transition-colors ${
                      filter.active
                        ? "bg-brand text-on-brand hover:bg-brand-hover"
                        : "border border-border bg-surface text-content-muted hover:bg-muted"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PROPERTIES.map((property) => (
                <Link
                  key={property.slug}
                  href={`/imoveis/${property.slug}`}
                  className="flex flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-sm transition-shadow hover:shadow-md"
                >
                  <div
                    className={`flex h-50 items-start rounded-t-lg bg-gradient-to-br p-3 ${property.gradient}`}
                  >
                    <Badge tone={property.status === "available" ? "success" : "warning"}>
                      {property.status === "available" ? "Disponível" : "Reservado"}
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-0.5 p-4">
                    <span className="text-label-s uppercase text-content-brand">
                      {property.category}
                    </span>
                    <span className="font-display text-title-s text-content">
                      {property.address}
                    </span>
                    <span className="font-display text-title-s text-content">
                      {property.price}
                    </span>
                    <span className="text-body-s text-content-subtle">
                      {property.details}
                    </span>

                    <hr className="my-2 border-border-subtle" />

                    <div className="flex items-center gap-2">
                      <Avatar name={property.agent.name} size="s" />
                      <span className="flex-1 truncate text-body-s text-content-muted">
                        {property.agent.name}
                      </span>
                      <span className="shrink-0 text-label-s text-content-success">
                        link ativo
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
