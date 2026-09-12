"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/Button";
import FormField from "@/app/components/FormField";
import type { PropertyAgent } from "@/lib/data/properties";
import { useVisitsStore } from "@/lib/store/visits";

function ShieldCheckIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path
        d="M7 1.75L11.6667 3.5V7C11.6667 9.91667 9.625 11.6667 7 12.25C4.375 11.6667 2.33333 9.91667 2.33333 7V3.5L7 1.75Z"
        stroke="currentColor"
        strokeWidth={1.16667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 7L6.41667 8.16667L8.75 5.83333"
        stroke="currentColor"
        strokeWidth={1.16667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MONTH_LABEL = "set";
const MONTH_DAYS = 30;
const WEEKDAY_SHORT = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const WEEKDAY_FULL = [
  "domingo",
  "segunda",
  "terça",
  "quarta",
  "quinta",
  "sexta",
  "sábado",
];
// The 9th of the month is a "terça" in this project's example calendar —
// every other day's weekday is derived from that anchor, keeping the whole
// month consistent instead of hardcoding one week.
const ANCHOR_DAY = 9;
const ANCHOR_WEEKDAY_INDEX = 2;

function weekdayIndexOf(day: number): number {
  return (((ANCHOR_WEEKDAY_INDEX + (day - ANCHOR_DAY)) % 7) + 7) % 7;
}

function dayInfoFor(day: number) {
  const index = weekdayIndexOf(day);
  return { day, weekday: WEEKDAY_SHORT[index], fullWeekday: WEEKDAY_FULL[index] };
}

// Today, in this project's example calendar — days before it can't be
// picked, same as a real booking flow wouldn't let you schedule in the past.
const TODAY_DAY = 12;

// Visits only happen Monday–Saturday, from today through the end of the
// month — Sundays and past days are filtered out before the remaining days
// get split into 6-day pages the visitor can navigate between.
const VISIBLE_DAYS = Array.from(
  { length: MONTH_DAYS - TODAY_DAY + 1 },
  (_, i) => i + TODAY_DAY,
).filter((day) => weekdayIndexOf(day) !== 0);

const WEEKS: number[][] = [];
for (let i = 0; i < VISIBLE_DAYS.length; i += 6) {
  WEEKS.push(VISIBLE_DAYS.slice(i, i + 6));
}

function weekIndexForDay(day: number): number {
  const index = WEEKS.findIndex((week) => week.includes(day));
  return index === -1 ? 0 : index;
}

const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:30", "17:30"];

const EXPLICIT_UNAVAILABLE: Record<number, string[]> = {
  9: ["14:00"],
  10: ["09:00", "17:30"],
  11: ["11:00", "16:30"],
  12: ["09:00"],
  13: ["15:00", "17:30"],
  15: ["10:00", "14:00"],
};

function unavailableForDay(day: number): string[] {
  if (EXPLICIT_UNAVAILABLE[day]) return EXPLICIT_UNAVAILABLE[day];
  return [TIME_SLOTS[day % TIME_SLOTS.length], TIME_SLOTS[(day + 3) % TIME_SLOTS.length]];
}

function firstAvailableTime(day: number): string {
  const unavailable = unavailableForDay(day);
  return TIME_SLOTS.find((slot) => !unavailable.includes(slot)) ?? TIME_SLOTS[0];
}

export default function BookingForm({
  slug,
  agent,
  agentEmail,
}: {
  slug: string;
  agent: PropertyAgent;
  agentEmail: string;
}) {
  const router = useRouter();
  const addVisit = useVisitsStore((state) => state.addVisit);
  const [selectedDay, setSelectedDay] = useState(TODAY_DAY);
  const [selectedTime, setSelectedTime] = useState(() =>
    firstAvailableTime(TODAY_DAY),
  );
  const [weekIndex, setWeekIndex] = useState(() => weekIndexForDay(TODAY_DAY));

  const dayInfo = dayInfoFor(selectedDay);
  const unavailable = unavailableForDay(selectedDay);
  const currentWeek = WEEKS[weekIndex];
  const canGoToPreviousWeek = weekIndex > 0;
  const canGoToNextWeek = weekIndex < WEEKS.length - 1;

  function handleSelectDay(day: number) {
    setSelectedDay(day);
    setSelectedTime(firstAvailableTime(day));
  }

  function handleChangeWeek(delta: 1 | -1) {
    setWeekIndex((current) => {
      const nextIndex = current + delta;
      if (nextIndex < 0 || nextIndex >= WEEKS.length) return current;
      const firstDay = WEEKS[nextIndex][0];
      setSelectedDay(firstDay);
      setSelectedTime(firstAvailableTime(firstDay));
      return nextIndex;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "Bruno Tavares");
    const email = String(data.get("email") || "bruno.tavares@email.com");
    const phone = String(data.get("phone") || "");

    addVisit({
      propertySlug: slug,
      agentEmail,
      weekday: dayInfo.weekday,
      day: dayInfo.day,
      time: selectedTime,
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
    });

    const params = new URLSearchParams({
      weekday: dayInfo.fullWeekday,
      day: String(dayInfo.day),
      time: selectedTime,
      name,
      email,
    });
    router.push(`/imovel/${slug}/confirmacao?${params.toString()}`);
  }

  return (
    <div className="flex w-full shrink-0 flex-col gap-4 rounded-xl border border-border-subtle bg-surface p-6 shadow-lg lg:w-105">
      <span className="font-display text-title-m text-content">
        Agende sua visita
      </span>

      <div className="flex w-full items-center gap-2 rounded-md bg-muted p-2">
        <Avatar name={agent.name} size="m" />
        <div className="min-w-0">
          <p className="truncate text-label-s text-content">{agent.name}</p>
          <p className="truncate text-body-s text-content-subtle">
            {agent.role} responsável · responde em ~1h
          </p>
        </div>
      </div>

      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div className="flex w-full items-center gap-2">
              <button
                type="button"
                disabled={!canGoToPreviousWeek}
                onClick={() => handleChangeWeek(-1)}
                aria-label="Semana anterior"
                className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-sm text-title-s text-content-muted transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:text-content-subtle disabled:hover:bg-transparent"
              >
                ‹
              </button>
              <span className="flex-1 text-label-m text-content">
                Escolha o dia
              </span>
              <span className="text-body-s text-content-subtle">
                {currentWeek[0]} – {currentWeek[currentWeek.length - 1]}{" "}
                {MONTH_LABEL}
              </span>
              <button
                type="button"
                disabled={!canGoToNextWeek}
                onClick={() => handleChangeWeek(1)}
                aria-label="Próxima semana"
                className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-sm text-title-s text-content-brand transition-colors hover:bg-brand-subtle disabled:cursor-not-allowed disabled:text-content-subtle disabled:hover:bg-transparent"
              >
                ›
              </button>
            </div>
            <div className="flex w-full gap-0.5">
              {currentWeek.map((day) => {
                const item = dayInfoFor(day);
                const active = item.day === selectedDay;
                return (
                  <button
                    key={item.day}
                    type="button"
                    onClick={() => handleSelectDay(item.day)}
                    className={`flex flex-1 cursor-pointer flex-col items-center gap-0.5 rounded-md px-0.5 py-2 text-label-m transition-colors ${
                      active
                        ? "bg-brand text-on-brand"
                        : "border border-border bg-surface text-content hover:bg-muted"
                    }`}
                  >
                    <span
                      className={`text-body-s ${active ? "text-on-brand" : "text-content-subtle"}`}
                    >
                      {item.weekday}
                    </span>
                    <span>{item.day}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-label-m text-content">
              Horários de {dayInfo.fullWeekday}, {dayInfo.day} set
            </span>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => {
                const isUnavailable = unavailable.includes(slot);
                const active = slot === selectedTime;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isUnavailable}
                    onClick={() => setSelectedTime(slot)}
                    className={`cursor-pointer rounded-md px-4 py-2 text-label-s transition-colors disabled:cursor-not-allowed disabled:bg-muted disabled:text-content-subtle ${
                      active
                        ? "bg-brand text-on-brand"
                        : "border border-border bg-surface text-content hover:bg-muted"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <FormField
              id="visitor-name"
              name="name"
              label="Seu nome"
              placeholder="Bruno Tavares"
              helperText=""
            />
            <FormField
              id="visitor-email"
              name="email"
              label="E-mail"
              type="email"
              placeholder="bruno.tavares@email.com"
              helperText=""
            />
            <FormField
              id="visitor-phone"
              name="phone"
              label="Telefone / WhatsApp"
              type="tel"
              placeholder="(11) 99145-2280"
              helperText=""
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Confirmar visita · {dayInfo.weekday} {dayInfo.day}, {selectedTime}
          </Button>
        </form>

      <div className="flex items-start gap-1 text-content-subtle">
        <span className="mt-0.5 shrink-0">
          <ShieldCheckIcon />
        </span>
        <p className="text-body-s">
          Sem senha e sem código. Confirmação na hora, por e-mail.
        </p>
      </div>
    </div>
  );
}
