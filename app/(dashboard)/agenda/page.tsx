import type { Metadata } from "next";
import Button from "@/app/components/Button";
import Sidebar from "@/app/components/Sidebar";
import RequireAuth from "@/lib/auth/RequireAuth";

export const metadata: Metadata = {
  title: "Agenda · VisitaJá",
};

function ChevronLeftIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const DAYS = ["Seg 8", "Ter 9", "Qua 10", "Qui 11", "Sex 12", "Sáb 13", "Dom 14"];
const HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const AGENTS = {
  marina: { name: "Marina Rocha", dot: "bg-brand", chipBg: "bg-brand-subtle", chipText: "text-content-brand" },
  rafael: { name: "Rafael Nunes", dot: "bg-accent", chipBg: "bg-accent-subtle", chipText: "text-content-warning" },
  juliana: { name: "Juliana Prado", dot: "bg-content-success", chipBg: "bg-success-subtle", chipText: "text-content-success" },
  camila: { name: "Camila Duarte", dot: "bg-content-warning", chipBg: "bg-warning-subtle", chipText: "text-content-warning" },
} as const;

const EVENTS = [
  { day: 0, hour: "09:00", place: "Oscar Freire, 980", agent: AGENTS.marina },
  { day: 3, hour: "09:00", place: "Av. Atlântica, 2000", agent: AGENTS.juliana },
  { day: 1, hour: "10:00", place: "Fradique Coutinho", agent: AGENTS.juliana },
  { day: 4, hour: "10:00", place: "Harmonia, 745", agent: AGENTS.juliana },
  { day: 2, hour: "11:00", place: "Padre Chagas, 415", agent: AGENTS.camila },
  { day: 5, hour: "11:00", place: "Fradique Coutinho", agent: AGENTS.camila },
  { day: 3, hour: "13:00", place: "Oscar Freire, 980", agent: AGENTS.marina },
  { day: 0, hour: "14:00", place: "Faria Lima, 3477", agent: AGENTS.rafael },
  { day: 2, hour: "15:00", place: "Alameda Santos", agent: AGENTS.rafael },
  { day: 1, hour: "16:00", place: "Harmonia, 745", agent: AGENTS.marina },
  { day: 4, hour: "17:00", place: "Faria Lima, 3477", agent: AGENTS.rafael },
];

const GRID_COLUMNS = "grid-cols-[72px_repeat(7,minmax(0,1fr))]";

export default function SchedulePage() {
  return (
    <RequireAuth requirePlan>
      <div className="flex h-dvh flex-col lg:flex-row">
        <Sidebar activePage="schedule" />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          <header className="flex shrink-0 flex-wrap items-center gap-3 border-b border-border-subtle bg-surface px-8 py-4">
            <h1 className="font-display text-title-l text-content">
              Agenda geral
            </h1>

            <div className="flex items-center gap-2 rounded-md bg-muted px-2 py-0.5">
              <button
                type="button"
                aria-label="Semana anterior"
                className="flex cursor-pointer items-center justify-center rounded-sm p-0.5 text-content-muted transition-colors hover:bg-border hover:text-content"
              >
                <ChevronLeftIcon />
              </button>
              <span className="text-label-s text-content">
                8 – 14 de setembro de 2026
              </span>
              <button
                type="button"
                aria-label="Próxima semana"
                className="flex cursor-pointer items-center justify-center rounded-sm p-0.5 text-content-muted transition-colors hover:bg-border hover:text-content"
              >
                <ChevronRightIcon />
              </button>
            </div>

            <div className="flex-1" />

            <Button variant="secondary">Todos os corretores</Button>
            <Button variant="primary">Nova visita</Button>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-8">
            <div className="flex flex-wrap items-center gap-4">
              {Object.values(AGENTS).map((agent) => (
                <div key={agent.name} className="flex items-center gap-0.5">
                  <span className={`size-2.5 shrink-0 rounded-full ${agent.dot}`} />
                  <span className="text-body-s text-content-muted">
                    {agent.name}
                  </span>
                </div>
              ))}
              <div className="flex-1" />
              <span className="text-label-s text-content-subtle">
                {EVENTS.length} visitas nesta semana
              </span>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface">
              <div className={`grid ${GRID_COLUMNS} border-b border-border bg-muted`}>
                <div className="h-11" />
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="flex items-center justify-center border-l border-border py-2 text-label-s text-content-muted"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className={`grid ${GRID_COLUMNS} border-t border-border-subtle first:border-t-0`}
                >
                  <div className="px-2 py-1">
                    <span className="text-body-m text-content-subtle">
                      {hour}
                    </span>
                  </div>
                  {DAYS.map((_, dayIndex) => {
                    const event = EVENTS.find(
                      (item) => item.day === dayIndex && item.hour === hour,
                    );
                    return (
                      <div
                        key={dayIndex}
                        className="min-h-16 border-l border-border-subtle p-0.5"
                      >
                        {event ? (
                          <div
                            className={`h-full rounded-sm p-0.5 ${event.agent.chipBg}`}
                          >
                            <span
                              className={`block truncate text-label-s ${event.agent.chipText}`}
                            >
                              {event.hour} · {event.place}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
