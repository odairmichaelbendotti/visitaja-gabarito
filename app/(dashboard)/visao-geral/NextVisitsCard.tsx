"use client";

import { useState } from "react";
import Badge from "@/app/components/Badge";
import Card from "@/app/components/Card";
import TableHeader from "@/app/components/TableHeader";
import { getPropertyBySlug } from "@/lib/data/properties";
import { useVisitsStore } from "@/lib/store/visits";
import PropertyDetailModal from "./PropertyDetailModal";

const STATUS = {
  confirmed: { tone: "success", label: "Confirmada" },
  pending: { tone: "warning", label: "Pendente" },
} as const;

const SCHEDULE = [
  {
    when: "Hoje 14:00",
    slug: "oscar-freire-980",
    agent: "Marina Rocha",
    client: "Bruno Tavares",
    status: "confirmed",
  },
  {
    when: "Hoje 16:30",
    slug: "atlantica-2000",
    agent: "Rafael Nunes",
    client: "Carla Menezes",
    status: "pending",
  },
  {
    when: "Amanhã 09:00",
    slug: "fradique-coutinho-1200",
    agent: "Juliana Prado",
    client: "Diego Ramos",
    status: "confirmed",
  },
  {
    when: "Amanhã 11:00",
    slug: "harmonia-745",
    agent: "Marina Rocha",
    client: "Fernanda Lima",
    status: "confirmed",
  },
  {
    when: "Qui 10:00",
    slug: "alameda-santos-1500",
    agent: "Rafael Nunes",
    client: "Paulo Costa",
    status: "pending",
  },
] as const;

export default function NextVisitsCard() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const liveVisits = useVisitsStore((state) => state.visits);

  const rows = [
    ...liveVisits.map((visit) => ({
      key: visit.id,
      when: `${visit.weekday} ${visit.day} · ${visit.time}`,
      slug: visit.propertySlug,
      agent: getPropertyBySlug(visit.propertySlug)?.agent.name ?? "—",
      client: visit.clientName,
      status: visit.status,
    })),
    ...SCHEDULE.map((visit) => ({ key: visit.slug, ...visit })),
  ];

  return (
    <Card className="w-full flex-1">
      <span className="font-display text-title-s text-content">
        Próximas visitas
      </span>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-150 border-collapse">
          <thead>
            <tr>
              <TableHeader align="left">Quando</TableHeader>
              <TableHeader align="center">Corretor</TableHeader>
              <TableHeader align="center">Cliente</TableHeader>
              <TableHeader align="center">Status</TableHeader>
              <TableHeader align="right" className="w-32">
                Ações
              </TableHeader>
            </tr>
          </thead>
          <tbody>
            {rows.map((visit) => (
              <tr
                key={visit.key}
                className="border-b border-border-subtle last:border-0"
              >
                <td className="px-4 py-3 text-label-s text-content">
                  {visit.when}
                </td>
                <td className="px-4 py-3 text-center text-body-m text-content-muted">
                  {visit.agent}
                </td>
                <td className="px-4 py-3 text-center text-body-m text-content-muted">
                  {visit.client}
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge tone={STATUS[visit.status].tone}>
                    {STATUS[visit.status].label}
                  </Badge>
                </td>
                <td className="w-32 py-3 pl-4 whitespace-nowrap">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(visit.slug)}
                      className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-subtle px-3 py-1.5 text-label-s text-content-brand transition-colors hover:bg-purple-100"
                    >
                      Ver imóvel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PropertyDetailModal
        slug={selectedSlug}
        onClose={() => setSelectedSlug(null)}
      />
    </Card>
  );
}
