"use client";

import { useRouter } from "next/navigation";
import { DashPage } from "@/components/layouts/dash-page";
import { TurmaCard } from "@/components/student/turma/turma-card";
import { DISCIPLINAS } from "@/components/student/turma/turma-data";

export default function MinhaTurmaPage() {
  const router = useRouter();

  return (
    <DashPage title="Minha Turma">
      <div className="space-y-2">
        <p className="text-sm text-zinc-500">
          Selecione uma disciplina para aceder aos materiais partilhados pelos
          professores.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {DISCIPLINAS.map((disciplina) => (
          <TurmaCard
            key={disciplina.id}
            disciplina={disciplina}
            onClick={() => router.push(`/aluno/minha-turma/${disciplina.id}`)}
          />
        ))}
      </div>
    </DashPage>
  );
}
