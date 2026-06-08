"use client";

import { BookOpen, Users, FileUp, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type Disciplina } from "./turma-data";

interface DisciplinasGridProps {
  disciplinas: Disciplina[];
  onSelect: (d: Disciplina) => void;
}

export function DisciplinasGrid({
  disciplinas,
  onSelect,
}: DisciplinasGridProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Section title */}
      <div className="flex items-center gap-2">
        <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
        <h2 className="text-xl font-bold text-zinc-900">Minhas Disciplinas</h2>
      </div>
      <p className="text-sm text-zinc-400 -mt-2">
        Selecione uma disciplina para gerir materiais, submissões e avisos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {disciplinas.map((d) => (
          <Card
            key={d.id}
            onClick={() => onSelect(d)}
            className="rounded-xl border border-zinc-200 shadow-none cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all group"
          >
            <CardContent className="p-5 flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    "flex size-11 items-center justify-center rounded-xl",
                    d.cor,
                  )}
                >
                  <BookOpen className={cn("size-5", d.corText)} />
                </div>
                <ChevronRight className="size-4 text-zinc-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>

              {/* Name + turma */}
              <div>
                <p className="text-base font-bold text-zinc-900">{d.nome}</p>
                <p className={cn("text-sm font-medium mt-0.5", d.corText)}>
                  Turma {d.turma}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Users className="size-3.5" />
                  {d.totalAlunos} alunos
                </span>
                <span className="flex items-center gap-1">
                  <FileUp className="size-3.5" />
                  {d.materiaisCount} materiais
                </span>
              </div>

              {/* Pending submissions badge */}
              {d.submissoesCount > 0 && (
                <Badge className="self-start bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50 text-xs font-medium">
                  {d.submissoesCount} submissão
                  {d.submissoesCount > 1 ? "ões" : ""} pendente
                  {d.submissoesCount > 1 ? "s" : ""}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
