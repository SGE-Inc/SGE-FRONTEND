"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { DashPage } from "@/components/layouts/dash-page";
import { HorarioTable } from "@/components/student/horario-table";
import { ProfessoresDisciplinas } from "@/components/student/teachers-sumarys";

export default function ProfessorHorarioPage() {
  const [showProfessores, setShowProfessores] = useState(false);

  return (
    <DashPage title="Horário">
      {/* ── Section: Horário da minha turma ── */}
      <div className="flex flex-col gap-4">
        {/* Title row */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
            Horário da minha turma (QI10B)
          </h2>

          {/* Professores toggle button */}
          <button
            onClick={() => setShowProfessores((v) => !v)}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
          >
            Professores
            <ChevronDown
              className={`size-4 transition-transform ${showProfessores ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Schedule table */}
        <HorarioTable />
      </div>

      {/* ── Section: Professores das Disciplinas (toggle) ── */}
      {showProfessores && (
        <div className="mt-2">
          <ProfessoresDisciplinas />
        </div>
      )}
    </DashPage>
  );
}
