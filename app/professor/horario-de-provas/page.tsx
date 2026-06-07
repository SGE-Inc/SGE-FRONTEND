"use client";

import { useState } from "react";
import { DashPage } from "@/components/layouts/dash-page";
import { ProvasTable } from "@/components/student/provas-table";
import {
  PROVAS_DATA,
  type TrimestreProva,
  type Calendario,
} from "@/components/student/horario-provas-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TRIMESTRES: TrimestreProva[] = [
  "I TRIMESTRE",
  "II TRIMESTRE",
  "III TRIMESTRE",
];

const CALENDARIOS: Calendario[] = [
  "1ª PROVA DOS PROFESSORES",
  "2ª PROVA DOS PROFESSORES",
];

export default function ProfessorHorarioDeProvasPage() {
  const [trimestre, setTrimestre] = useState<TrimestreProva>("II TRIMESTRE");
  const [calendario, setCalendario] = useState<Calendario>(
    "1ª PROVA DOS PROFESSORES",
  );

  const data = PROVAS_DATA[trimestre][calendario];

  return (
    <DashPage title="Horário de Provas">
      {/* Page title */}
      <div className="flex items-center gap-2 -mt-1">
        <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
        <h1 className="text-2xl font-bold text-zinc-900">
          Horário de Provas da minha turma (QI10B)
        </h1>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 font-medium">Trimestre</label>
          <Select
            value={trimestre}
            onValueChange={(v) => setTrimestre(v as TrimestreProva)}
          >
            <SelectTrigger className="w-40 bg-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TRIMESTRES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 font-medium">
            Calendário
          </label>
          <Select
            value={calendario}
            onValueChange={(v) => setCalendario(v as Calendario)}
          >
            <SelectTrigger className="w-56 bg-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CALENDARIOS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Scrollable provas table */}
      <ProvasTable data={data} />
    </DashPage>
  );
}
