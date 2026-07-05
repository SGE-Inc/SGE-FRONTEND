"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Upload, ClipboardCheck } from "lucide-react";
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

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="size-4 text-primary" />
            <h3 className="text-sm font-semibold text-zinc-800">Presenças</h3>
          </div>

          <div className="rounded-xl border border-zinc-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm min-w-[500px]">
                <thead>
                  <tr className="bg-primary text-white text-xs font-semibold">
                    <th className="px-4 py-2.5 text-left">Data</th>
                    <th className="px-4 py-2.5 text-left">Conteúdo</th>
                    <th className="px-4 py-2.5 text-center w-24">Presença</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      data: "08/06/2026",
                      conteudo:
                        "Reacções de neutralização. Titulação ácido-base.",
                      presente: true,
                    },
                    {
                      data: "04/06/2026",
                      conteudo: "Escala de pH. Cálculo de pH.",
                      presente: true,
                    },
                    {
                      data: "01/06/2026",
                      conteudo: "Introdução às reacções ácido-base.",
                      presente: true,
                    },
                    {
                      data: "28/05/2026",
                      conteudo:
                        "Correcção do TPC. Exercícios de estequiometria.",
                      presente: false,
                    },
                  ].map((p, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-zinc-100 hover:bg-zinc-50/60"
                    >
                      <td className="px-4 py-2.5 text-xs text-zinc-700 font-medium">
                        {p.data}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-zinc-500">
                        {p.conteudo}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-xs font-semibold",
                            p.presente ? "text-emerald-600" : "text-red-500",
                          )}
                        >
                          {p.presente ? "Presente" : "Falta"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <SubmitMaterialDialog
        open={submitOpen}
        onOpenChange={setSubmitOpen}
        disciplinaNome={disciplina.nome}
      />
    </DashPage>
  );
}
