"use client";

import { X, GraduationCap, FileText, User, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type Estudante, STATUS_CONFIG } from "./estudantes-data";

interface EstudanteDetailProps {
  estudante: Estudante | null;
  open: boolean;
  onClose: () => void;
}

function AvatarInitials({ nome }: { nome: string }) {
  const parts = nome.trim().split(" ").filter(Boolean);
  const initials =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : (parts[0]?.slice(0, 2) ?? "?");
  return (
    <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold uppercase">
      {initials}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-b-0">
      <span className="text-xs text-zinc-500">{label}</span>
      <span className="text-xs font-semibold text-zinc-800 text-right max-w-[60%]">
        {value}
      </span>
    </div>
  );
}

export function EstudanteDetailDialog({
  estudante,
  open,
  onClose,
}: EstudanteDetailProps) {
  if (!estudante) return null;
  const { dot, badge } = STATUS_CONFIG[estudante.status];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="size-4 text-primary" />
            Perfil do Estudante
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center gap-4">
            <AvatarInitials nome={estudante.nome} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-zinc-800 uppercase">
                {estudante.nome}
              </p>
              <p className="text-xs text-zinc-400">
                {estudante.numeroProcesso}
              </p>
              <Badge
                variant="outline"
                className={cn(
                  "text-[11px] border inline-flex items-center gap-1.5 mt-1",
                  badge,
                )}
              >
                <span className={cn("size-1.5 rounded-full shrink-0", dot)} />
                {STATUS_CONFIG[estudante.status].label}
              </Badge>
            </div>
          </div>

          {/* Dados Pessoais */}
          <div>
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2 flex items-center gap-2">
              <User className="size-3.5 shrink-0" />
              Dados Pessoais
            </h4>
            <div className="rounded-lg border border-zinc-200 divide-y divide-zinc-100 px-3">
              <InfoRow
                label="Data de Nascimento"
                value={estudante.dataNascimento}
              />
              <InfoRow label="Género" value={estudante.genero} />
              <InfoRow label="Contacto" value={estudante.contacto} />
              <InfoRow label="Email" value={estudante.email} />
              <InfoRow label="Endereço" value={estudante.endereco} />
            </div>
          </div>

          {/* Documento */}
          <div>
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2 flex items-center gap-2">
              <FileText className="size-3.5 shrink-0" />
              Documento
            </h4>
            <div className="rounded-lg border border-zinc-200 divide-y divide-zinc-100 px-3">
              <InfoRow label="Tipo" value={estudante.documento.tipo} />
              <InfoRow
                label="Nº Documento"
                value={estudante.documento.numero}
              />
            </div>
          </div>

          {/* Encarregado */}
          <div>
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2 flex items-center gap-2">
              <BookOpen className="size-3.5 shrink-0" />
              Encarregado de Educação
            </h4>
            <div className="rounded-lg border border-zinc-200 divide-y divide-zinc-100 px-3">
              <InfoRow label="Nome" value={estudante.encarregado.nome} />
              <InfoRow
                label="Contacto"
                value={estudante.encarregado.contacto}
              />
              <InfoRow
                label="Parentesco"
                value={estudante.encarregado.parentesco}
              />
            </div>
          </div>

          {/* Dados Académicos */}
          <div>
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2 flex items-center gap-2">
              <GraduationCap className="size-3.5 shrink-0" />
              Dados Académicos
            </h4>
            <div className="rounded-lg border border-zinc-200 divide-y divide-zinc-100 px-3">
              <InfoRow label="Curso" value={estudante.curso} />
              <InfoRow label="Turma" value={estudante.turma} />
              <InfoRow label="Ano / Classe" value={estudante.anoClasse} />
              <InfoRow
                label="Data de Matrícula"
                value={estudante.dataMatricula}
              />
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-zinc-500">Média Geral</span>
                <span
                  className={cn(
                    "text-xs font-bold",
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
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-zinc-500">
                  Estado de Aprovação
                </span>
                {estudante.aprovado != null ? (
                  <Badge
                    variant="outline"
                    className={cn(
                      estudante.aprovado
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-red-50 text-red-700 border-red-200",
                    )}
                  >
                    {estudante.aprovado ? "Aprovado" : "Reprovado"}
                  </Badge>
                ) : (
                  <span className="text-xs text-zinc-400">---</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
