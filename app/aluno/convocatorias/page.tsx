"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashPage } from "@/components/layouts/dash-page";

interface Convocatoria {
  id: number;
  trimestre: string;
  dataEmissao: string;
  dataRealizacao: string;
  hora: string;
  sala: string;
  agenda: string[];
}

const CONVOCATORIAS: Convocatoria[] = [
  {
    id: 1,
    trimestre: "I TRIMESTRE",
    dataEmissao: "15/01/2026",
    dataRealizacao: "24/01/2026",
    hora: "08:00 às 09:00",
    sala: "81 (PAVILHÕES)",
    agenda: [
      "Informações Gerais;",
      "Aproveitamento Pedagógico do I TRIMESTRE;",
      "Outros assuntos.",
    ],
  },
];

function ConvocatoriaPreview({ c }: { c: Convocatoria }) {
  // Format dataRealizacao as "24 de janeiro de 2026, sábado"
  const [day, month, year] = c.dataRealizacao.split("/");
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  const weekdays = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];
  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const weekday = weekdays[dateObj.getDay()];
  const monthName = months[dateObj.getMonth()];
  const formattedDate = `${day} de ${monthName} de ${year}`;

  const [emisDay, emisMonth, emisYear] = c.dataEmissao.split("/");
  const emisMonthName = months[Number(emisMonth) - 1];
  const formattedEmissao = `${emisDay} de ${emisMonthName} de ${emisYear}`;

  return (
    <div className="flex justify-center py-4">
      <div
        className="w-full max-w-[520px] rounded border border-zinc-300 bg-white px-10 py-8 shadow-sm"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {/* Header: logos + turma */}
        <div className="flex items-start justify-between mb-4">
          {/* Logos placeholder (two circular seals) */}
          <div className="flex items-center gap-3">
            {/* Seal 1 */}
            <div className="size-[72px] rounded-full border-2 border-zinc-400 flex items-center justify-center bg-zinc-50 overflow-hidden shrink-0">
              <svg viewBox="0 0 72 72" width="72" height="72">
                <circle
                  cx="36"
                  cy="36"
                  r="34"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                />
                <circle
                  cx="36"
                  cy="36"
                  r="26"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <text
                  x="36"
                  y="30"
                  textAnchor="middle"
                  fontSize="5.5"
                  fill="#6b7280"
                  fontWeight="bold"
                >
                  INSTITUTO
                </text>
                <text
                  x="36"
                  y="37"
                  textAnchor="middle"
                  fontSize="5"
                  fill="#6b7280"
                >
                  POLITÉCNICO
                </text>
                <text
                  x="36"
                  y="44"
                  textAnchor="middle"
                  fontSize="4.5"
                  fill="#6b7280"
                >
                  INDUSTRIAL
                </text>
                <text
                  x="36"
                  y="51"
                  textAnchor="middle"
                  fontSize="4.5"
                  fill="#6b7280"
                >
                  DE LUANDA
                </text>
                <text
                  x="36"
                  y="22"
                  textAnchor="middle"
                  fontSize="4"
                  fill="#9ca3af"
                >
                  Gabinete do Director
                </text>
              </svg>
            </div>
            {/* Seal 2 */}
            <div className="size-[64px] rounded-full border-2 border-zinc-300 flex items-center justify-center bg-zinc-50 overflow-hidden shrink-0">
              <svg viewBox="0 0 64 64" width="64" height="64">
                <circle
                  cx="32"
                  cy="32"
                  r="30"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                />
                <rect
                  x="18"
                  y="20"
                  width="28"
                  height="20"
                  rx="2"
                  fill="none"
                  stroke="#D2691E"
                  strokeWidth="1.5"
                />
                <rect
                  x="22"
                  y="24"
                  width="8"
                  height="6"
                  rx="1"
                  fill="#D2691E"
                  opacity="0.6"
                />
                <rect
                  x="34"
                  y="24"
                  width="8"
                  height="6"
                  rx="1"
                  fill="#D2691E"
                  opacity="0.4"
                />
                <rect
                  x="22"
                  y="32"
                  width="20"
                  height="4"
                  rx="1"
                  fill="#D2691E"
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>

          {/* Turma */}
          <div className="text-right text-sm">
            <span className="text-zinc-600">TURMA: </span>
            <span className="font-bold text-zinc-900">QI10B</span>
          </div>
        </div>

        {/* Institution name */}
        <div className="text-center mb-1">
          <p className="text-xs font-semibold text-primary tracking-wide uppercase">
            Instituto Politécnico Industrial de Luanda
          </p>
          <p className="text-xs text-zinc-600 uppercase tracking-wide">
            (Gabinete do Director)
          </p>
        </div>

        {/* Title */}
        <p className="text-center text-sm font-bold text-zinc-900 my-3 tracking-widest uppercase">
          Convocatória
        </p>

        {/* Body text - justified */}
        <div className="text-[12.5px] text-zinc-800 leading-relaxed text-justify space-y-3">
          <p>
            A Direcção do Instituto Politécnico Industrial de Luanda
            supracitada, vem por intermédio desta convocar o(a) Encarregado(a)
            de educação de <strong>BENJAMIM ETIENE TSHIMBU TAMBUE</strong> para
            um <strong>encontro informativo</strong> a ter lugar no dia{" "}
            <strong>{formattedDate}</strong>, {weekday}, das{" "}
            <strong>{c.hora}</strong> na sala <strong>{c.sala}</strong> desta
            instituição de ensino com a seguinte agenda:
          </p>

          {/* Agenda bullets */}
          <ul className="space-y-0.5 pl-2">
            {c.agenda.map((item, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-zinc-600 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Sign-off */}
          <p className="font-bold">
            Instituto Politécnico Industrial de Luanda, aos {formattedEmissao}
          </p>

          {/* Obs */}
          <p className="text-[11.5px] text-zinc-600">
            Obs.: A direcção da escola declina qualquer responsabilidade
            decorrente da não comparência do(a) convocado(a).
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ConvocatoriasPage() {
  const [selectedId, setSelectedId] = useState<number | null>(
    CONVOCATORIAS[0].id,
  );

  const selected = CONVOCATORIAS.find((c) => c.id === selectedId) ?? null;

  return (
    <DashPage title="Convocatórias">
      {/* Page title */}
      <div className="flex items-center gap-2 -mt-1">
        <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
        <h1 className="text-2xl font-bold text-zinc-900">
          Pré-visualização da convocatória
        </h1>
      </div>

      {/* Preview area — shown when a row is selected */}
      {selected && <ConvocatoriaPreview c={selected} />}

      {/* Helper text */}
      <p className="text-xs text-primary font-medium -mb-1">
        Clique em uma das linhas abaixo para visualizar os detalhes
      </p>

      {/* Table */}
      <div className="rounded-lg border border-zinc-200 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr_1fr_120px] bg-primary text-white text-sm font-semibold">
          <div className="px-5 py-3">Trimestre</div>
          <div className="px-5 py-3">Data de emissão</div>
          <div className="px-5 py-3">Data de Realização</div>
          <div className="px-5 py-3 text-center">Operações</div>
        </div>

        {/* Rows */}
        {CONVOCATORIAS.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedId(c.id === selectedId ? null : c.id)}
            className={cn(
              "grid grid-cols-[1fr_1fr_1fr_120px] border-t border-zinc-100 cursor-pointer transition-colors",
              selectedId === c.id
                ? "bg-orange-50"
                : "bg-white hover:bg-zinc-50",
            )}
          >
            <div className="px-5 py-4 text-sm text-zinc-800 font-medium">
              {c.trimestre}
            </div>
            <div className="px-5 py-4 text-sm text-zinc-500">
              {c.dataEmissao}
            </div>
            <div className="px-5 py-4 text-sm text-zinc-500">
              {c.dataRealizacao}
            </div>
            <div className="px-5 py-4 flex justify-center items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(c.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex size-9 items-center justify-center rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                title="Ver convocatória"
              >
                <ExternalLink className="size-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Footer count */}
        <div className="border-t border-zinc-100 bg-white px-5 py-3 text-center">
          <span className="text-xs text-zinc-400 font-medium">
            Convocatórias emitidas ({CONVOCATORIAS.length})
          </span>
        </div>
      </div>
    </DashPage>
  );
}
