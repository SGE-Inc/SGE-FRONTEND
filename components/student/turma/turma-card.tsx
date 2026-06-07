"use client";

import { FileText, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DisciplinaSala } from "./turma-data";

interface TurmaCardProps {
  disciplina: DisciplinaSala;
  onClick: () => void;
}

export function TurmaCard({ disciplina, onClick }: TurmaCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 text-left cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-xl text-white text-lg font-bold tracking-wide shadow-sm",
            disciplina.cor,
          )}
        >
          {disciplina.sigla}
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
          <FileText className="size-3" />
          {disciplina.materiais.length}
        </span>
      </div>

      <h3 className="text-base font-semibold text-zinc-900 mb-1">
        {disciplina.nome}
      </h3>

      <p className="flex items-center gap-1.5 text-xs text-zinc-500 mt-auto">
        <Users className="size-3.5 shrink-0 text-zinc-400" />
        {disciplina.professorNome}
      </p>
    </button>
  );
}
