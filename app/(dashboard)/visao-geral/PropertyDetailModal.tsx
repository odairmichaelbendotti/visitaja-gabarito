"use client";

import Avatar from "@/app/components/Avatar";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import { getPropertyBySlug } from "@/lib/data/properties";
import { useVisitsStore } from "@/lib/store/visits";

function XCircleIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden className="size-3.5">
      <path
        d="M8.75 5.25L5.25 8.75M5.25 5.25L8.75 8.75M12.83 7C12.83 10.22 10.22 12.83 7 12.83C3.78 12.83 1.17 10.22 1.17 7C1.17 3.78 3.78 1.17 7 1.17C10.22 1.17 12.83 3.78 12.83 7Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

const STATUS_TONE = {
  available: { label: "Ativo", tone: "success" },
  reserved: { label: "Reservado", tone: "warning" },
} as const;

const VISIT_TONE = {
  confirmed: { label: "Confirmada", tone: "success" },
  pending: { label: "Pendente", tone: "warning" },
  done: { label: "Finalizada", tone: "neutral" },
} as const;

const MODAL_EXTRAS: Record<
  string,
  {
    code: string;
    cep: string;
    city: string;
    bathrooms: string;
    visits: { when: string; client: string; status: keyof typeof VISIT_TONE }[];
  }
> = {
  "oscar-freire-980": {
    code: "#IM001",
    cep: "01426-001",
    city: "São Paulo, SP",
    bathrooms: "2",
    visits: [
      { when: "Hoje 14:00", client: "Bruno Tavares", status: "confirmed" },
      { when: "Amanhã 11:00", client: "Fernanda Lima", status: "pending" },
      { when: "15 Set 09:00", client: "Diego Ramos", status: "done" },
    ],
  },
  "atlantica-2000": {
    code: "#IM002",
    cep: "22070-000",
    city: "Rio de Janeiro, RJ",
    bathrooms: "3",
    visits: [
      { when: "Hoje 16:30", client: "Carla Menezes", status: "pending" },
      { when: "10 Set 10:00", client: "Paulo Costa", status: "done" },
    ],
  },
  "fradique-coutinho-1200": {
    code: "#IM003",
    cep: "05416-001",
    city: "São Paulo, SP",
    bathrooms: "1",
    visits: [
      { when: "Amanhã 09:00", client: "Diego Ramos", status: "confirmed" },
      { when: "12 Set 15:00", client: "Bruno Tavares", status: "done" },
    ],
  },
  "harmonia-745": {
    code: "#IM004",
    cep: "05435-000",
    city: "São Paulo, SP",
    bathrooms: "1",
    visits: [
      { when: "Amanhã 11:00", client: "Fernanda Lima", status: "confirmed" },
      { when: "8 Set 14:00", client: "Carla Menezes", status: "done" },
    ],
  },
  "alameda-santos-1500": {
    code: "#IM005",
    cep: "01419-002",
    city: "São Paulo, SP",
    bathrooms: "1",
    visits: [
      { when: "Qui 10:00", client: "Paulo Costa", status: "pending" },
      { when: "5 Set 09:00", client: "Diego Ramos", status: "done" },
    ],
  },
};

interface PropertyDetailModalProps {
  slug: string | null;
  onClose: () => void;
}

export default function PropertyDetailModal({
  slug,
  onClose,
}: PropertyDetailModalProps) {
  const property = slug ? getPropertyBySlug(slug) : undefined;
  const extra = slug ? MODAL_EXTRAS[slug] : undefined;
  const liveVisits = useVisitsStore((state) => state.visits);
  const propertyLiveVisits = slug
    ? liveVisits.filter((visit) => visit.propertySlug === slug)
    : [];
  const visits = [
    ...propertyLiveVisits.map((visit) => ({
      when: `${visit.weekday} ${visit.day} · ${visit.time}`,
      client: visit.clientName,
      status: visit.status,
    })),
    ...(extra?.visits ?? []),
  ];

  return (
    <Modal open={!!(property && extra)} onClose={onClose} className="w-full max-w-205">
      {property && extra ? (
        <>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge tone="brand">{extra.code}</Badge>
              <Badge tone={STATUS_TONE[property.status].tone}>
                {STATUS_TONE[property.status].label}
              </Badge>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-muted text-content transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus focus-visible:outline-none"
            >
              <XCircleIcon />
            </button>
          </div>

          <div className="flex flex-col gap-0.5">
            <h2 className="font-display text-title-m text-content">
              {property.address}
            </h2>
            <p className="text-body-s text-content-muted">
              {extra.city} · CEP {extra.cep}
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-4 lg:flex-row">
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <span
                aria-hidden
                className={`h-28 w-full shrink-0 rounded-md bg-gradient-to-br ${property.gradient}`}
              />

              <div className="flex w-full flex-col gap-2 rounded-md bg-canvas p-3">
                <div className="flex w-full items-start gap-4">
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-label-s text-content-subtle">
                      TIPO
                    </span>
                    <span className="text-body-s text-content">
                      {property.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-label-s text-content-subtle">
                      ÁREA
                    </span>
                    <span className="text-body-s text-content">
                      {property.publicStats.area}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-label-s text-content-subtle">
                      VALOR
                    </span>
                    <span className="text-body-s text-content-brand">
                      {property.price}
                    </span>
                  </div>
                </div>
                <div className="h-px w-full bg-border" />
                <div className="flex w-full items-start gap-4">
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-label-s text-content-subtle">
                      QUARTOS
                    </span>
                    <span className="text-body-s text-content">
                      {property.publicStats.bedrooms}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-label-s text-content-subtle">
                      BANHEIROS
                    </span>
                    <span className="text-body-s text-content">
                      {extra.bathrooms}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-label-s text-content-subtle">
                      VAGAS
                    </span>
                    <span className="text-body-s text-content">
                      {property.publicStats.parking}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-1.5">
                <span className="text-label-s text-content-muted">
                  CORRETOR RESPONSÁVEL
                </span>
                <div className="flex w-full items-center gap-2 rounded-md bg-muted p-2">
                  <Avatar name={property.agent.name} />
                  <div className="flex flex-col">
                    <span className="text-label-s text-content">
                      {property.agent.name}
                    </span>
                    <span className="text-body-s text-content-subtle">
                      {property.agent.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 lg:w-65">
              <span className="text-label-s text-content-muted">
                HISTÓRICO DE VISITAS
              </span>
              <div className="flex w-full flex-col gap-1.5">
                {visits.map((visit) => (
                  <div
                    key={visit.when + visit.client}
                    className="flex w-full flex-col gap-1.5 rounded-sm border border-border p-2.5"
                  >
                    <div className="flex w-full items-start justify-between">
                      <span className="text-label-s text-content">
                        {visit.when}
                      </span>
                      <Badge tone={VISIT_TONE[visit.status].tone}>
                        {VISIT_TONE[visit.status].label}
                      </Badge>
                    </div>
                    <span className="text-body-s text-content-muted">
                      {visit.client}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button variant="secondary" className="w-full">
            Editar imóvel
          </Button>
        </>
      ) : null}
    </Modal>
  );
}
