"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { DashPage } from "@/components/layouts/dash-page";
import { SectionCard, InfoRow } from "@/components/student/perfil-components";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ALUNOS_NOTAS } from "@/components/professor/professor-data";

const totalFaltas = (a: { faltasJ: string; faltasI: string }) =>
  (parseInt(a.faltasJ) || 0) + (parseInt(a.faltasI) || 0);

export default function ProfessorStudentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const aluno = ALUNOS_NOTAS.find(
    (a) => a.numero === params.id || a.id === params.id,
  );

  if (!aluno) {
    return (
      <DashPage title="Aluno não encontrado">
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-zinc-500">Aluno não encontrado.</p>
          <Button
            variant="secondary"
            onClick={() => router.push("/professor/estudantes")}
          >
            Voltar
          </Button>
        </div>
      </DashPage>
    );
  }

  const pp = typeof aluno.pp === "number" ? aluno.pp : parseInt(aluno.pp) || 0;
  const pt = typeof aluno.pt === "number" ? aluno.pt : parseInt(aluno.pt) || 0;
  const mt = typeof aluno.mt === "number" ? aluno.mt : parseInt(aluno.mt) || 0;
  const media = ((pp + pt + mt) / 3).toFixed(1);

  return (
    <DashPage
      parent={{ label: "Estudantes", href: "/professor/estudantes" }}
      title={aluno.nome}
    >
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => router.back()}
          className="flex size-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 transition-colors"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
            <h2 className="text-xl font-bold text-zinc-900 uppercase">
              {aluno.nome}
            </h2>
            <Badge
              variant="outline"
              className="text-[11px] text-zinc-500 border-zinc-200"
            >
              Nº {aluno.numero}
            </Badge>
          </div>
          <p className="text-xs text-zinc-400 ml-4.5">Turma {aluno.turma}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionCard title="Informação do Aluno">
          <InfoRow label="Nome:" value={aluno.nome} />
          <InfoRow label="Nº de Aluno:" value={aluno.numero} />
          <InfoRow label="Turma:" value={aluno.turma} />
        </SectionCard>

        <SectionCard title="Desempenho Académico">
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-semibold text-zinc-800">PP:</span>
            <span
              className={cn(
                "text-sm font-bold",
                pp >= 10 ? "text-emerald-600" : "text-red-500",
              )}
            >
              {pp} valores
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-semibold text-zinc-800">PT:</span>
            <span
              className={cn(
                "text-sm font-bold",
                pt >= 10 ? "text-emerald-600" : "text-red-500",
              )}
            >
              {pt} valores
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-semibold text-zinc-800">MT:</span>
            <span
              className={cn(
                "text-sm font-bold",
                mt >= 10 ? "text-emerald-600" : "text-red-500",
              )}
            >
              {mt} valores
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-semibold text-zinc-800">Média:</span>
            <span
              className={cn(
                "text-sm font-bold",
                parseFloat(media) >= 10 ? "text-emerald-600" : "text-red-500",
              )}
            >
              {media}
            </span>
          </div>
        </SectionCard>

        <SectionCard title="Presenças">
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-semibold text-zinc-800">
              Faltas Justificadas:
            </span>
            <span className="text-sm font-bold text-zinc-700">
              {aluno.faltasJ}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-semibold text-zinc-800">
              Faltas Injustificadas:
            </span>
            <span className="text-sm font-bold text-zinc-700">
              {aluno.faltasI}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-semibold text-zinc-800">
              Total de Faltas:
            </span>
            <span
              className={cn(
                "text-sm font-bold",
                totalFaltas(aluno) > 5 ? "text-red-500" : "text-zinc-700",
              )}
            >
              {totalFaltas(aluno)}
            </span>
          </div>
        </SectionCard>
      </div>
    </DashPage>
  );
}
