"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type TurmaDesempenho } from "./professor-dashboard-data";

interface DesempenhoTurmasProps {
  turmas: TurmaDesempenho[];
}

const TURMA_COLORS = [
  { bar: "#D2691E", light: "bg-primary/10 text-primary" },
  { bar: "#3b82f6", light: "bg-blue-50 text-blue-600" },
  { bar: "#10b981", light: "bg-emerald-50 text-emerald-600" },
];

export function DesempenhoTurmas({ turmas }: DesempenhoTurmasProps) {
  const W = 340;
  const H = 140;
  const padL = 36;
  const padR = 16;
  const padT = 12;
  const padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = 20;
  const n = turmas.length;
  const groupW = chartW / n;
  const barW = Math.min(36, groupW * 0.55);

  const yPos = (val: number) => padT + chartH - (val / maxVal) * chartH;
  const xCenter = (i: number) => padL + i * groupW + groupW / 2;

  const yTicks = [0, 5, 10, 15, 20];

  return (
    <Card className="rounded-xl border border-zinc-200 shadow-none">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-zinc-900">
          <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
          Desempenho por Turma
        </CardTitle>
        <p className="text-xs text-zinc-400 mt-0.5">
          média de II Trimestre · escala 0-20
        </p>
      </CardHeader>

      <CardContent className="px-5 pb-5 pt-2 flex flex-col gap-5">
        {/* Bar chart */}
        <svg
          width="100%"
          viewBox={`0 0 ${W} ${H}`}
          className="overflow-visible"
        >
          {/* Grid lines */}
          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={padL}
                x2={W - padR}
                y1={yPos(tick)}
                y2={yPos(tick)}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
              <text
                x={padL - 5}
                y={yPos(tick) + 4}
                textAnchor="end"
                fontSize="9"
                fill="#9ca3af"
              >
                {tick}
              </text>
            </g>
          ))}

          {/* Bars */}
          {turmas.map((t, i) => {
            const color = TURMA_COLORS[i % TURMA_COLORS.length];
            const barH = Math.max(2, (t.media / maxVal) * chartH);
            const barX = xCenter(i) - barW / 2;
            const barY = yPos(t.media);

            return (
              <g key={t.turma}>
                {/* Bar */}
                <rect
                  x={barX}
                  y={barY}
                  width={barW}
                  height={barH}
                  rx="4"
                  fill={color.bar}
                  fillOpacity="0.85"
                />
                {/* Value label on top */}
                <text
                  x={xCenter(i)}
                  y={barY - 4}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="700"
                  fill={color.bar}
                >
                  {t.media}
                </text>
                {/* Turma label */}
                <text
                  x={xCenter(i)}
                  y={padT + chartH + 14}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#6b7280"
                  fontWeight="600"
                >
                  {t.turma}
                </text>
              </g>
            );
          })}

          {/* Baseline */}
          <line
            x1={padL}
            x2={W - padR}
            y1={padT + chartH}
            y2={padT + chartH}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        </svg>

        {/* Turma detail rows */}
        <div className="flex flex-col gap-2">
          {turmas.map((t, i) => {
            const color = TURMA_COLORS[i % TURMA_COLORS.length];
            return (
              <div key={t.turma} className="flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex shrink-0 items-center justify-center rounded px-2 py-0.5 text-xs font-bold",
                    color.light,
                  )}
                >
                  {t.turma}
                </span>
                <span className="text-xs text-zinc-500 flex-1 truncate">
                  {t.disciplina}
                </span>
                {/* Progress bar */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="h-1.5 w-24 rounded-full bg-zinc-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${t.positivas}%`,
                        backgroundColor:
                          TURMA_COLORS[i % TURMA_COLORS.length].bar,
                        opacity: 0.85,
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-zinc-700 w-10 text-right">
                    {t.positivas}% +
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[10px] text-zinc-400">
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-sm bg-emerald-400" />
            Positivas (≥10)
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-sm bg-red-400" />
            Negativas (&lt;10)
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
