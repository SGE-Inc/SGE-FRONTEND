"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type WeeklyLesson } from "./professor-dashboard-data";

interface WeeklyCalendarProps {
  schedule: WeeklyLesson[];
  todayDia?: string; // e.g. "Seg"
}

const DISCIPLINA_COLORS: Record<string, string> = {
  Química: "bg-primary/15 text-primary border-primary/30",
  "Química Orgânica": "bg-blue-50 text-blue-700 border-blue-200",
  "Q. Analítica": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function getColor(disciplina: string) {
  return (
    DISCIPLINA_COLORS[disciplina] ?? "bg-zinc-100 text-zinc-600 border-zinc-200"
  );
}

export function WeeklyCalendar({
  schedule,
  todayDia = "Seg",
}: WeeklyCalendarProps) {
  return (
    <Card className="rounded-xl border border-zinc-200 shadow-none h-full">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-zinc-900">
          <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
          Calendário Semanal
        </CardTitle>
        <p className="text-xs text-zinc-400 mt-0.5">
          semana de 09 a 13 de junho
        </p>
      </CardHeader>

      <CardContent className="px-5 pb-5 pt-2">
        <div className="grid grid-cols-5 gap-2">
          {schedule.map((day) => {
            const isToday = day.dia === todayDia;
            return (
              <div key={day.dia} className="flex flex-col gap-1.5">
                {/* Day header */}
                <div
                  className={cn(
                    "rounded-lg px-2 py-2 text-center",
                    isToday
                      ? "bg-primary text-white"
                      : "bg-zinc-50 text-zinc-600",
                  )}
                >
                  <p className="text-xs font-bold">{day.dia}</p>
                  <p
                    className={cn(
                      "text-[10px]",
                      isToday ? "text-white/80" : "text-zinc-400",
                    )}
                  >
                    {day.date}
                  </p>
                </div>

                {/* Lessons */}
                <div className="flex flex-col gap-1">
                  {day.aulas.length === 0 ? (
                    <div className="rounded border border-dashed border-zinc-200 px-2 py-3 text-center">
                      <p className="text-[10px] text-zinc-300">—</p>
                    </div>
                  ) : (
                    day.aulas.map((aula, i) => (
                      <div
                        key={i}
                        className={cn(
                          "rounded border px-2 py-1.5 text-[10px] leading-tight",
                          getColor(aula.disciplina),
                        )}
                      >
                        <p className="font-semibold">{aula.hora}</p>
                        <p className="truncate">{aula.disciplina}</p>
                        <p className="text-[9px] opacity-70">{aula.turma}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
