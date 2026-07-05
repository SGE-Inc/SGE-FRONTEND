"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileText, GraduationCap } from "lucide-react";
import { DashPage } from "@/components/layouts/dash-page";
import { SectionCard, InfoRow } from "@/components/student/perfil-components";
import { ESTUDANTES_MOCK } from "@/components/admin/student/estudantes-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminStudentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const estudante = ESTUDANTES_MOCK.find((e) => e.id === params.id);

  if (!estudante) {
    return (
      <DashPage title="Estudante não encontrado">
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-zinc-500">Estudante não encontrado.</p>
          <Button
            variant="secondary"
            onClick={() => router.push("/admin/estudantes/informatica")}
          >
            Voltar
          </Button>
        </div>
      </DashPage>
    );
  }

  return (
    <DashPage
      parent={{ label: "Estudantes", href: "/admin/estudantes/informatica" }}
      title={estudante.nome}
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
              {estudante.nome}
            </h2>
            <Badge
              variant="outline"
              className="text-[11px] text-zinc-500 border-zinc-200"
            >
              {estudante.numeroProcesso}
            </Badge>
          </div>
          <p className="text-xs text-zinc-400 ml-4.5">
            {estudante.curso} · {estudante.turma}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            router.push(`/admin/estudantes/${estudante.id}/boletim`)
          }
          className="gap-2"
        >
          <FileText className="size-3.5" />
          Ver Boletim
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionCard title="Dados Pessoais">
          <InfoRow label="Nome Completo:" value={estudante.nome} />
          <InfoRow
            label="Data de Nascimento:"
            value={estudante.dataNascimento}
          />
          <InfoRow label="Género:" value={estudante.genero} />
          <InfoRow label="Contacto:" value={estudante.contacto} />
          <InfoRow label="Email:" value={estudante.email} />
          <InfoRow label="Endereço:" value={estudante.endereco} />
        </SectionCard>

        <SectionCard title="Documentação">
          <InfoRow
            label="Tipo de Documento:"
            value={estudante.documento.tipo}
          />
          <InfoRow label="Nº Documento:" value={estudante.documento.numero} />
        </SectionCard>

        <SectionCard title="Dados do Encarregado">
          <InfoRow label="Nome:" value={estudante.encarregado.nome} />
          <InfoRow label="Contacto:" value={estudante.encarregado.contacto} />
          <InfoRow
            label="Parentesco:"
            value={estudante.encarregado.parentesco}
          />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionCard title="Dados Académicos">
          <InfoRow label="Curso:" value={estudante.curso} />
          <InfoRow label="Turma:" value={estudante.turma} />
          <InfoRow label="Ano/Classe:" value={estudante.anoClasse} />
          <InfoRow label="Nº Processo:" value={estudante.numeroProcesso} />
          <InfoRow label="Data de Matrícula:" value={estudante.dataMatricula} />
        </SectionCard>

        <SectionCard title="Situação Académica">
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-semibold text-zinc-800">Estado:</span>
            <Badge
              variant="outline"
              className={cn(
                "text-[11px] border",
                estudante.status === "activo"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : estudante.status === "inactivo"
                    ? "bg-zinc-100 text-zinc-500 border-zinc-200"
                    : "bg-amber-50 text-amber-700 border-amber-200",
              )}
            >
              {estudante.status === "activo"
                ? "Activo"
                : estudante.status === "inactivo"
                  ? "Inactivo"
                  : "Transferido"}
            </Badge>
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-semibold text-zinc-800">
              Média Geral:
            </span>
            <span
              className={cn(
                "text-sm font-bold",
                estudante.mediaGeral != null
                  ? estudante.mediaGeral >= 10
                    ? "text-emerald-600"
                    : "text-red-500"
                  : "text-zinc-400",
              )}
            >
              {estudante.mediaGeral != null
                ? `${estudante.mediaGeral.toFixed(1)} valores`
                : "---"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-semibold text-zinc-800">
              Aprovação:
            </span>
            {estudante.aprovado != null ? (
              <span
                className={cn(
                  "text-sm font-bold",
                  estudante.aprovado ? "text-emerald-600" : "text-red-500",
                )}
              >
                {estudante.aprovado ? "Aprovado" : "Reprovado"}
              </span>
            ) : (
              <span className="text-sm text-zinc-400">---</span>
            )}
          </div>
        </SectionCard>
      </div>
    </DashPage>
  );
}
