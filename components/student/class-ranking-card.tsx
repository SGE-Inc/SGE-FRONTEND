"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

type Period = "todos" | "i-trimestre" | "ii-trimestre" | "iii-trimestre";

interface RankingEntry {
  position: number;
  name: string;
  score: number;
  isCurrentUser?: boolean;
}

const RANKING_DATA: RankingEntry[] = [
  { position: 1, name: "LUÍS ANTÓNIO", score: 745 },
  { position: 2, name: "LEONARDO BAPTISTA", score: 734 },
  { position: 3, name: "BENJAMIM TAMBUE", score: 696, isCurrentUser: true },
  { position: 4, name: "CLÁUDIA GARCIA", score: 642 },
  { position: 5, name: "PEDRO PUPO", score: 633 },
  { position: 6, name: "ANA FERREIRA", score: 621 },
  { position: 7, name: "DIOGO MENDES", score: 610 },
  { position: 8, name: "SARA LOPES", score: 598 },
  { position: 9, name: "MIGUEL COSTA", score: 587 },
  { position: 10, name: "BEATRIZ SILVA", score: 574 },
  { position: 11, name: "RAFAEL SOUSA", score: 562 },
  { position: 12, name: "INÊS MARTINS", score: 551 },
  { position: 13, name: "TIAGO OLIVEIRA", score: 540 },
  { position: 14, name: "MARTA RODRIGUES", score: 528 },
  { position: 15, name: "HUGO FERNANDES", score: 517 },
  { position: 16, name: "CAROLINA PEREIRA", score: 505 },
  { position: 17, name: "JOÃO SANTOS", score: 494 },
  { position: 18, name: "FILIPA GOMES", score: 482 },
  { position: 19, name: "PEDRO ALVES", score: 471 },
  { position: 20, name: "RITA CARVALHO", score: 459 },
  { position: 21, name: "NUNO RIBEIRO", score: 448 },
  { position: 22, name: "DANIELA MOREIRA", score: 436 },
  { position: 23, name: "ANDREIA PINTO", score: 425 },
  { position: 24, name: "FÁBIO CUNHA", score: 413 },
  { position: 25, name: "LEONOR ARAÚJO", score: 402 },
  { position: 26, name: "GONÇALO TEIXEIRA", score: 390 },
  { position: 27, name: "MARIANA FONSECA", score: 379 },
  { position: 28, name: "SIMÃO CORREIA", score: 367 },
  { position: 29, name: "PATRÍCIA NEVES", score: 356 },
  { position: 30, name: "ALEXANDRE LIMA", score: 344 },
];

function getMedalEmoji(position: number) {
  if (position === 1) return "🥇";
  if (position === 2) return "🥈";
  if (position === 3) return "🥉";
  return "🏅";
}

const PERIODS: { key: Period; label: string; locked?: boolean }[] = [
  { key: "todos", label: "TODOS" },
  { key: "i-trimestre", label: "I TRIMESTRE" },
  { key: "ii-trimestre", label: "II TRIMESTRE" },
  { key: "iii-trimestre", label: "III TRIMESTRE", locked: true },
];

export function ClassRankingCard() {
  const [activePeriod, setActivePeriod] = useState<Period>("todos");

  return (
    <div className="flex flex-col rounded-lg border border-zinc-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 p-5 sticky top-0 bg-white z-10 pb-0">
        <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
          <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
          Ranking da Minha Turma
        </h2>

        {/* Period filters */}
        <div className="flex items-center gap-2 justify-center flex-wrap pb-2">
          {PERIODS.map(({ key, label, locked }) => (
            <button
              key={key}
              onClick={() => !locked && setActivePeriod(key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-sm px-3 py-1 text-[11px] font-semibold tracking-wide transition-colors",
                activePeriod === key
                  ? "bg-primary text-white"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200",
                locked && "opacity-70 cursor-not-allowed",
              )}
            >
              {label}
              {locked && <Lock className="size-3" />}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="p-6 pt-0 overflow-hidden flex flex-col">
        <div className="custom_scroll flex-grow pt-0 relative overflow-y-auto max-h-[340px] shadow-inner">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="py-2.5 px-4 text-left font-semibold w-[90px]">
                  Posição
                </th>
                <th className="py-2.5 px-4 text-left font-semibold">Nome</th>
                <th className="py-2.5 px-4 text-right font-semibold">
                  Pontuação
                </th>
              </tr>
            </thead>
            <tbody>
              {RANKING_DATA.map((entry) => (
                <tr
                  key={entry.position}
                  className={cn(
                    "border-b border-zinc-100 transition-colors",
                    entry.isCurrentUser
                      ? "bg-orange-100 font-semibold"
                      : "hover:bg-zinc-50",
                  )}
                >
                  <td className="py-2.5 px-4 text-center text-zinc-700 font-medium">
                    {entry.position}
                  </td>
                  <td className="py-2.5 px-4 text-zinc-800 uppercase tracking-wide text-xs">
                    {entry.name}
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <span className="inline-flex items-center justify-end gap-2 text-zinc-700 font-medium">
                      <span>{getMedalEmoji(entry.position)}</span>
                      <span>{entry.score}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
