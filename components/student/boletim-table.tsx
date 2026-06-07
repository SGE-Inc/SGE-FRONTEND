"use client";

import { cn } from "@/lib/utils";
import { type BoletimData, isNegativa } from "./boletim-data";

interface BoletimTableProps {
  data: BoletimData;
}

function NoteCell({ value }: { value: string | number }) {
  if (value === "-") {
    return (
      <td className="border border-zinc-200 px-2 py-2 text-center text-sm text-zinc-400 font-medium">
        -
      </td>
    );
  }
  const neg = isNegativa(value);
  return (
    <td
      className={cn(
        "border border-zinc-200 px-2 py-2 text-center text-sm font-bold",
        neg ? "text-red-600" : "text-blue-700",
      )}
    >
      {value}
    </td>
  );
}

export function BoletimTable({ data }: BoletimTableProps) {
  return (
    <div className="rounded-lg border border-zinc-200 overflow-hidden">
      {/* Student info header */}
      <div className="bg-zinc-100 border-b border-zinc-200 px-3 py-2 flex flex-wrap gap-x-6 gap-y-1">
        <span className="text-xs font-bold text-zinc-800 uppercase tracking-wide">
          Nome: Benjamim Etiene Tshimbu Tambue
        </span>
        <span className="text-xs font-bold text-zinc-600 uppercase">
          Nº: 11
        </span>
        <span className="text-xs font-bold text-zinc-600 uppercase">
          Proc: 80727
        </span>
        <span className="text-xs font-bold text-zinc-600 uppercase">
          Turma: QI10B
        </span>
      </div>

      <table className="w-full border-collapse text-sm">
        {/* Trimestre title row */}
        <thead>
          <tr>
            <td
              colSpan={8}
              className="bg-primary text-white text-center text-xs font-bold uppercase tracking-widest py-2"
            >
              {data.trimestre}
            </td>
          </tr>

          {/* Column headers */}
          <tr className="bg-primary text-white text-xs font-bold uppercase">
            <th className="border border-primary/30 px-2 py-2 text-left w-[28px]">
              Nº
            </th>
            <th className="border border-primary/30 px-2 py-2 text-left">
              Disciplina Curriculares
            </th>
            {/* FALTAS merged header */}
            <th
              colSpan={2}
              className="border border-primary/30 px-2 py-1 text-center w-[70px]"
            >
              Faltas
              <div className="flex justify-around mt-0.5 text-[10px] font-semibold">
                <span>J</span>
                <span>I</span>
              </div>
            </th>
            <th className="border border-primary/30 px-2 py-2 text-center w-[42px]">
              PP
            </th>
            <th className="border border-primary/30 px-2 py-2 text-center w-[42px]">
              PT
            </th>
            <th className="border border-primary/30 px-2 py-2 text-center w-[42px]">
              MT
            </th>
          </tr>
        </thead>

        <tbody>
          {data.disciplinas.map((d, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <tr
                key={d.n}
                className={cn(
                  "border-b border-zinc-100",
                  isEven ? "bg-[#f5c9a0]/40" : "bg-white",
                )}
              >
                {/* Nº */}
                <td className="border border-zinc-200 px-2 py-2 text-center text-sm text-zinc-600 font-medium">
                  {d.n}
                </td>
                {/* Disciplina */}
                <td className="border border-zinc-200 px-2 py-2 text-xs font-semibold text-zinc-800 uppercase tracking-wide">
                  {d.nome}
                </td>
                {/* Faltas J */}
                <td className="border border-zinc-200 px-2 py-2 text-center text-sm text-zinc-400">
                  {d.faltasJ}
                </td>
                {/* Faltas I */}
                <td className="border border-zinc-200 px-2 py-2 text-center text-sm text-zinc-400">
                  {d.faltasI}
                </td>
                <NoteCell value={d.pp} />
                <NoteCell value={d.pt} />
                <NoteCell value={d.mt} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
