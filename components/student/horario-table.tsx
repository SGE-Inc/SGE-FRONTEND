"use client";

import { cn } from "@/lib/utils";

type Slot = string | null; // null = "Sem disciplina" (cinza)

interface ScheduleRow {
  tempo: string;
  hora: string;
  seg: Slot;
  ter: Slot;
  qua: Slot;
  qui: Slot;
  sex: Slot;
}

interface SeparatorRow {
  type: "separator";
  label: string;
}

type Row = ScheduleRow | SeparatorRow;

const SCHEDULE: Row[] = [
  // ── MANHÃ ──────────────────────────────────────────────────
  {
    tempo: "1 Tempo",
    hora: "07:00\n07:45",
    seg: "FAI",
    ter: "Informática",
    qua: "Química Orgânica",
    qui: "Inglês",
    sex: "Q.ANAL",
  },
  {
    tempo: "2 Tempo",
    hora: "07:50\n08:35",
    seg: "FAI",
    ter: "Informática",
    qua: "Química Orgânica",
    qui: "Física",
    sex: "Q.ANAL",
  },
  {
    tempo: "3 Tempo",
    hora: "08:40\n09:25",
    seg: "Português",
    ter: "Q.ANAL",
    qua: "Matemática",
    qui: "Física",
    sex: "Matemática",
  },

  { type: "separator", label: "INTERVALO (09:26 - 09:39)" },

  {
    tempo: "4 Tempo",
    hora: "09:40\n10:25",
    seg: "Química",
    ter: "Física",
    qua: "Matemática",
    qui: "TEC.LAB",
    sex: "Matemática",
  },
  {
    tempo: "5 Tempo",
    hora: "10:30\n11:15",
    seg: "Química Orgânica",
    ter: "Inglês",
    qua: "Química",
    qui: "TEC.LAB",
    sex: "Português",
  },
  {
    tempo: "6 Tempo",
    hora: "11:20\n12:05",
    seg: "Química Orgânica",
    ter: "Inglês",
    qua: "Química",
    qui: "TEC.LAB",
    sex: "Português",
  },

  { type: "separator", label: "MUDANÇA DE TURNO - TARDE" },

  // ── TARDE ──────────────────────────────────────────────────
  {
    tempo: "1 Tempo",
    hora: "12:30\n13:15",
    seg: null,
    ter: null,
    qua: null,
    qui: null,
    sex: null,
  },
  {
    tempo: "2 Tempo",
    hora: "13:20\n14:05",
    seg: null,
    ter: null,
    qua: null,
    qui: null,
    sex: null,
  },
  {
    tempo: "3 Tempo",
    hora: "14:10\n14:55",
    seg: null,
    ter: null,
    qua: "Educação Física",
    qui: null,
    sex: null,
  },

  { type: "separator", label: "INTERVALO (14:56 - 15:09)" },

  {
    tempo: "4 Tempo",
    hora: "15:10\n15:55",
    seg: null,
    ter: null,
    qua: "Educação Física",
    qui: null,
    sex: null,
  },
  {
    tempo: "5 Tempo",
    hora: "16:00\n16:45",
    seg: null,
    ter: null,
    qua: null,
    qui: null,
    sex: null,
  },
  {
    tempo: "6 Tempo",
    hora: "16:50\n17:35",
    seg: null,
    ter: null,
    qua: null,
    qui: null,
    sex: null,
  },
];

function Cell({ value }: { value: Slot }) {
  const isEmpty = value === null;
  return (
    <td
      className={cn(
        "border border-zinc-200 px-3 py-2.5 text-center text-sm",
        isEmpty ? "bg-zinc-100 text-zinc-400 italic" : "bg-white text-zinc-700",
      )}
    >
      {isEmpty ? "Sem disciplina" : value}
    </td>
  );
}

export function HorarioTable() {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-200">
      <table className="w-full min-w-[700px] border-collapse text-sm">
        {/* Header */}
        <thead>
          <tr className="bg-primary text-white text-center">
            <th className="border border-primary/20 px-4 py-3 font-semibold w-[110px]">
              Tempo
            </th>
            <th className="border border-primary/20 px-4 py-3 font-semibold w-[100px]">
              Hora
            </th>
            <th className="border border-primary/20 px-4 py-3 font-semibold">
              Segunda-feira
            </th>
            <th className="border border-primary/20 px-4 py-3 font-semibold">
              Terça-feira
            </th>
            <th className="border border-primary/20 px-4 py-3 font-semibold">
              Quarta-feira
            </th>
            <th className="border border-primary/20 px-4 py-3 font-semibold">
              Quinta-feira
            </th>
            <th className="border border-primary/20 px-4 py-3 font-semibold">
              Sexta-feira
            </th>
          </tr>
        </thead>

        <tbody>
          {SCHEDULE.map((row, idx) => {
            if ("type" in row) {
              return (
                <tr key={idx} className="bg-zinc-50">
                  <td
                    colSpan={7}
                    className="border border-zinc-200 px-4 py-2 text-center text-xs font-bold tracking-wider text-zinc-500 uppercase"
                  >
                    {row.label}
                  </td>
                </tr>
              );
            }

            return (
              <tr key={idx} className="hover:bg-zinc-50/60 transition-colors">
                {/* Tempo */}
                <td className="border border-zinc-200 px-3 py-2.5 text-center text-sm text-zinc-600 font-medium bg-white">
                  {row.tempo}
                </td>
                {/* Hora — two lines */}
                <td className="border border-zinc-200 px-3 py-2.5 text-center bg-white">
                  {row.hora.split("\n").map((h, i) => (
                    <div
                      key={i}
                      className="text-xs text-zinc-500 leading-tight"
                    >
                      {h}
                    </div>
                  ))}
                </td>
                <Cell value={row.seg} />
                <Cell value={row.ter} />
                <Cell value={row.qua} />
                <Cell value={row.qui} />
                <Cell value={row.sex} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
