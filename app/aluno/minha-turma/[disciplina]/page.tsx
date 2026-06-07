"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { DashPage } from "@/components/layouts/dash-page";
import { MaterialsList } from "@/components/student/turma/materials-list";
import { SubmitMaterialDialog } from "@/components/student/turma/submit-material-dialog";
import { Button } from "@/components/ui/button";
import { getDisciplinaBySlug } from "@/components/student/turma/turma-data";
import { cn } from "@/lib/utils";

export default function DisciplinaPage() {
  const params = useParams();
  const router = useRouter();
  const disciplina = getDisciplinaBySlug(params.disciplina as string);
  const [submitOpen, setSubmitOpen] = useState(false);

  if (!disciplina) {
    return (
      <DashPage title="Disciplina não encontrada">
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-zinc-500">Disciplina não encontrada.</p>
          <Button
            variant="secondary"
            onClick={() => router.push("/aluno/minha-turma")}
          >
            Voltar para Minha Turma
          </Button>
        </div>
      </DashPage>
    );
  }

  return (
    <DashPage
      parent={{ label: "Minha Turma", href: "/aluno/minha-turma" }}
      title={disciplina.nome}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-xl text-white text-lg font-bold tracking-wide shadow-sm",
                disciplina.cor,
              )}
            >
              {disciplina.sigla}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                {disciplina.nome}
              </h2>
              <p className="text-sm text-zinc-500">
                Professor: {disciplina.professorNome} &middot;{" "}
                {disciplina.materiais.length} material(is)
              </p>
            </div>
          </div>

          <Button onClick={() => setSubmitOpen(true)}>
            <Upload className="size-4" />
            Submeter Material
          </Button>
        </div>

        <MaterialsList materiais={disciplina.materiais} />
      </div>

      <SubmitMaterialDialog
        open={submitOpen}
        onOpenChange={setSubmitOpen}
        disciplinaNome={disciplina.nome}
      />
    </DashPage>
  );
}
