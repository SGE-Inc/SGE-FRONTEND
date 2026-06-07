"use client";

import { useState } from "react";
import { BookOpen, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashPage } from "@/components/layouts/dash-page";
import { TurmaMateriais } from "@/components/professor/turma-materiais";
import { TurmaSubmissoes } from "@/components/professor/turma-submissoes";
import { PROFESSOR_MOCK } from "@/components/professor/professor-data";

const disciplinasInfo = [
  {
    id: "mat",
    nome: "Matemática",
    sigla: "MAT",
    cor: "bg-violet-500",
    turmas: ["QI10B", "QI11A"],
  },
  {
    id: "fis",
    nome: "Física",
    sigla: "FIS",
    cor: "bg-blue-500",
    turmas: ["QI10B"],
  },
];

type Tab = "materiais" | "submissoes";

export default function ProfessorTurmaPage() {
  const [disciplinaAtiva, setDisciplinaAtiva] = useState(disciplinasInfo[0].id);
  const [tab, setTab] = useState<Tab>("materiais");

  const disciplina = disciplinasInfo.find((d) => d.id === disciplinaAtiva);

  return (
    <DashPage
      parent={{ label: "Turma", href: "#" }}
      title={disciplina?.nome ?? "Turma"}
    >
      <div className="flex items-center gap-2">
        {disciplinasInfo.map((d) => (
          <button
            key={d.id}
            onClick={() => setDisciplinaAtiva(d.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition",
              disciplinaAtiva === d.id
                ? "bg-primary text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200",
            )}
          >
            <div className={cn("size-3 rounded-full", d.cor)} />
            {d.nome}
            <span className="text-[10px] opacity-70">
              ({d.turmas.join(", ")})
            </span>
          </button>
        ))}
      </div>

      <div className="flex gap-1 border-b border-zinc-200">
        {[
          { id: "materiais" as Tab, label: "Materiais", icon: BookOpen },
          { id: "submissoes" as Tab, label: "Submissões", icon: Upload },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition border-b-2 -mb-[1px]",
              tab === t.id
                ? "border-primary text-primary"
                : "border-transparent text-zinc-500 hover:text-zinc-700",
            )}
          >
            <t.icon className="size-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "materiais" && <TurmaMateriais />}
      {tab === "submissoes" && <TurmaSubmissoes />}
    </DashPage>
  );
}
