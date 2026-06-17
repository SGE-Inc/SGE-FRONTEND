"use client";

import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { EPOCAS_EXAMES, type Trimestre, formatDateShort } from "./exames-data";

const TRIMESTRE_ORDER: Trimestre[] = [
  "I TRIMESTRE",
  "II TRIMESTRE",
  "III TRIMESTRE",
];

const TIPO_COLORS: Record<string, string> = {
  "1ª PROVA": "border-l-blue-400 bg-blue-50/50",
  "2ª PROVA": "border-l-emerald-400 bg-emerald-50/50",
  "EXAME FINAL": "border-l-amber-400 bg-amber-50/50",
  RECURSO: "border-l-red-400 bg-red-50/50",
  "EXAME DE ADMISSÃO": "border-l-purple-400 bg-purple-50/50",
};

export function ExameEpocas() {
  const grouped = TRIMESTRE_ORDER.map((trimestre) => ({
    trimestre,
    epocas: EPOCAS_EXAMES.filter((e) => e.trimestre === trimestre),
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Calendar className="size-4 text-primary" />
        <p className="text-sm font-semibold text-zinc-800">
          Épocas de Exame (Calendário Académico)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {grouped.map(({ trimestre, epocas }) => (
          <div
            key={trimestre}
            className="rounded-xl border border-zinc-200 overflow-hidden"
          >
            <div className="bg-primary/5 px-4 py-2.5 border-b border-zinc-200">
              <p className="text-xs font-bold text-primary uppercase tracking-wide">
                {trimestre.replace(" TRIMESTRE", "º Trimestre")}
              </p>
            </div>
            <div className="flex flex-col divide-y divide-zinc-100">
              {epocas.length === 0 && (
                <p className="px-4 py-4 text-xs text-zinc-400 text-center">
                  Nenhuma época definida
                </p>
              )}
              {epocas.map((epoca) => (
                <div
                  key={epoca.id}
                  className={cn(
                    "px-4 py-3 border-l-2 transition-colors hover:bg-zinc-50/60",
                    TIPO_COLORS[epoca.tipo] ?? "border-l-zinc-300",
                  )}
                >
                  <p className="text-xs font-semibold text-zinc-800">
                    {epoca.label}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock className="size-3 text-zinc-400 shrink-0" />
                    <span className="text-[11px] text-zinc-500">
                      {formatDateShort(epoca.dataInicio)} –{" "}
                      {formatDateShort(epoca.dataFim)}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "inline-block mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      epoca.tipo === "1ª PROVA"
                        ? "bg-blue-100 text-blue-700"
                        : epoca.tipo === "2ª PROVA"
                          ? "bg-emerald-100 text-emerald-700"
                          : epoca.tipo === "EXAME FINAL"
                            ? "bg-amber-100 text-amber-700"
                            : epoca.tipo === "RECURSO"
                              ? "bg-red-100 text-red-700"
                              : "bg-purple-100 text-purple-700",
                    )}
                  >
                    {epoca.tipo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
