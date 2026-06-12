"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type MediaDisciplina } from "./admin-dashboard-data";

interface MediaDisciplinasChartProps {
  data: MediaDisciplina[];
}

function getMediaColor(media: number) {
  if (media >= 15) return { bar: "#10b981", badge: "bg-emerald-50 text-emerald-700" };
  if (media >= 12) return { bar: "#3b82f6", badge: "bg-blue-50 text-blue-700" };
  if (media >= 10) return { bar: "#f59e0b", badge: "bg-amber-50 text-amber-700" };
  return { bar: "#ef4444", badge: "bg-red-50 text-red-700" };
}

export function MediaDisciplinasChart({ data }: MediaDisciplinasChartProps) {
  const sorted = [...data].sort((a, b) => b.media - a.media);
  const max = 20;

  return (
    <Card className="rounded-xl border border-zinc-200 shadow-none">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-zinc-900">
          <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
          Média Geral por Disciplina
        </CardTitle>
        <p className="text-xs text-zinc-400 mt-0.5">I Trimestre 2026 · escala 0-20</p>
      </CardHeader>
      <CardContent className="px-5 pb-5 flex flex-col gap-3">
        {sorted.map((d) => {
          const { bar, badge } = getMediaColor(d.media);
          const pct = (d.media / max) * 100;
          return (
            <div key={d.abrev} className="flex items-center gap-3">
              {/* Abrev badge */}
              <span className={cn("inline-flex shrink-0 w-12 justify-center rounded px-1.5 py-0.5 text-[11px] font-bold", badge)}>
                {d.abrev}
              </span>

              {/* Bar */}
              <div className="flex-1 h-5 rounded-full bg-zinc-100 overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: bar }}
                />
              </div>

              {/* Media value */}
              <span className="shrink-0 w-10 text-right text-sm font-bold text-zinc-800">
                {d.media.toFixed(1)}
              </span>

              {/* Positivas % */}
              <span className="shrink-0 w-12 text-right text-xs text-zinc-400">
                {d.positivas}% +
              </span>
            </div>
          );
        })}

        {/* Scale legend */}
        <div className="flex items-center gap-4 pt-2 border-t border-zinc-100 text-[10px] text-zinc-400 flex-wrap">
          {[
            { color: "bg-emerald-400", label: "≥ 15 — Excelente" },
            { color: "bg-blue-400",    label: "12–14 — Bom" },
            { color: "bg-amber-400",   label: "10–11 — Suficiente" },
            { color: "bg-red-400",     label: "< 10 — Insuficiente" },
          ].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-1">
              <span className={cn("inline-block size-2 rounded-sm", color)} />
              {label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}