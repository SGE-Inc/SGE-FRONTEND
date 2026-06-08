"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  FileText,
  FileType2,
  Link2,
  ImageIcon,
  MessageSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type Submissao } from "./turma-data";

const TYPE_ICONS: Record<Submissao["tipo"], typeof FileText> = {
  pdf: FileText,
  doc: FileType2,
  link: Link2,
  img: ImageIcon,
};

const TYPE_COLORS: Record<Submissao["tipo"], string> = {
  pdf: "bg-red-50 text-red-500",
  doc: "bg-blue-50 text-blue-500",
  link: "bg-emerald-50 text-emerald-600",
  img: "bg-purple-50 text-purple-500",
};

const STATUS_BADGE: Record<Submissao["status"], string> = {
  pendente: "bg-amber-50 text-amber-700 border-amber-200",
  aprovado: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejeitado: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_LABEL: Record<Submissao["status"], string> = {
  pendente: "Pendente",
  aprovado: "Aprovado",
  rejeitado: "Rejeitado",
};

interface SubmissoesTabProps {
  submissoes: Submissao[];
  onAprovar: (id: string, comentario: string) => void;
  onRejeitar: (id: string, comentario: string) => void;
}

type FilterStatus = "todos" | Submissao["status"];

export function SubmissoesTab({
  submissoes,
  onAprovar,
  onRejeitar,
}: SubmissoesTabProps) {
  const [filter, setFilter] = useState<FilterStatus>("pendente");
  const [modal, setModal] = useState<{
    sub: Submissao;
    action: "aprovar" | "rejeitar";
  } | null>(null);
  const [comentario, setComentario] = useState("");
  const [comentErr, setComentErr] = useState("");

  const filtered =
    filter === "todos"
      ? submissoes
      : submissoes.filter((s) => s.status === filter);

  const pendentes = submissoes.filter((s) => s.status === "pendente").length;

  const handleConfirm = () => {
    if (!modal) return;
    if (modal.action === "rejeitar" && !comentario.trim()) {
      setComentErr("O comentário é obrigatório ao rejeitar.");
      return;
    }
    if (modal.action === "aprovar") onAprovar(modal.sub.id, comentario);
    else onRejeitar(modal.sub.id, comentario);
    setModal(null);
    setComentario("");
    setComentErr("");
  };

  const FILTERS: { key: FilterStatus; label: string }[] = [
    { key: "pendente", label: `Pendentes (${pendentes})` },
    { key: "aprovado", label: "Aprovadas" },
    { key: "rejeitado", label: "Rejeitadas" },
    { key: "todos", label: "Todas" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Filter pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition-colors border",
              filter === f.key
                ? "bg-primary text-white border-primary"
                : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-200 py-10 text-center">
            <p className="text-sm text-zinc-400">
              Nenhuma submissão encontrada.
            </p>
          </div>
        )}

        {filtered.map((sub) => {
          const Icon = TYPE_ICONS[sub.tipo];
          return (
            <div
              key={sub.id}
              className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4"
            >
              {/* Type icon */}
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg",
                  TYPE_COLORS[sub.tipo],
                )}
              >
                <Icon className="size-4" />
              </span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-zinc-800">
                    {sub.titulo}
                  </p>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] border",
                      STATUS_BADGE[sub.status],
                    )}
                  >
                    {STATUS_LABEL[sub.status]}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">
                  {sub.descricao}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-zinc-400">
                  <span className="font-medium text-zinc-600">
                    {sub.alunoNome}
                  </span>
                  <span>Nº {sub.alunoNumero}</span>
                  <span>{sub.data}</span>
                </div>

                {/* Comentario (when resolved) */}
                {sub.comentario && (
                  <div className="mt-2 flex items-start gap-1.5 rounded-md bg-zinc-50 border border-zinc-100 px-3 py-2">
                    <MessageSquare className="size-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-zinc-500 italic">
                      {sub.comentario}
                    </p>
                  </div>
                )}
              </div>

              {/* Action buttons — only for pending */}
              {sub.status === "pendente" && (
                <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                  <button
                    onClick={() => {
                      setModal({ sub, action: "aprovar" });
                      setComentario("");
                      setComentErr("");
                    }}
                    className="flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1.5 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                  >
                    <CheckCircle2 className="size-3.5" />
                    Aprovar
                  </button>
                  <button
                    onClick={() => {
                      setModal({ sub, action: "rejeitar" });
                      setComentario("");
                      setComentErr("");
                    }}
                    className="flex items-center gap-1 rounded-md bg-red-50 text-red-700 border border-red-200 px-2.5 py-1.5 text-xs font-semibold hover:bg-red-100 transition-colors"
                  >
                    <XCircle className="size-3.5" />
                    Rejeitar
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Dialog */}
      <Dialog
        open={!!modal}
        onOpenChange={(v) => {
          if (!v) {
            setModal(null);
            setComentario("");
            setComentErr("");
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle
              className={cn(
                "flex items-center gap-2",
                modal?.action === "aprovar"
                  ? "text-emerald-700"
                  : "text-red-700",
              )}
            >
              {modal?.action === "aprovar" ? (
                <>
                  <CheckCircle2 className="size-4" /> Aprovar Submissão
                </>
              ) : (
                <>
                  <XCircle className="size-4" /> Rejeitar Submissão
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {modal && (
            <div className="flex flex-col gap-4 py-2">
              <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-4 py-3">
                <p className="text-xs font-semibold text-zinc-700">
                  {modal.sub.titulo}
                </p>
                <p className="text-[10px] text-zinc-400 mt-0.5">
                  {modal.sub.alunoNome} · Nº {modal.sub.alunoNumero}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700">
                  Comentário
                  {modal.action === "rejeitar" && (
                    <span className="text-red-500"> *</span>
                  )}
                  {modal.action === "aprovar" && (
                    <span className="text-zinc-400 font-normal">
                      {" "}
                      (opcional)
                    </span>
                  )}
                </label>
                <textarea
                  value={comentario}
                  onChange={(e) => {
                    setComentario(e.target.value);
                    setComentErr("");
                  }}
                  placeholder={
                    modal.action === "aprovar"
                      ? "Deixe um elogio ou nota..."
                      : "Explique o motivo da rejeição..."
                  }
                  rows={3}
                  className={cn(
                    "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none transition",
                    comentErr ? "border-red-400" : "border-zinc-200",
                  )}
                />
                {comentErr && (
                  <p className="text-xs text-red-500">{comentErr}</p>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setModal(null);
                setComentario("");
                setComentErr("");
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              className={cn(
                "text-white",
                modal?.action === "aprovar"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-red-600 hover:bg-red-700",
              )}
            >
              {modal?.action === "aprovar"
                ? "Confirmar Aprovação"
                : "Confirmar Rejeição"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
