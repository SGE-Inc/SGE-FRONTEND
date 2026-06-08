"use client";

import { useState } from "react";
import { Check, X, FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SUBMISSOES_PENDENTES, type SubmissaoAluno } from "./professor-data";

const statusLabel: Record<string, { label: string; class: string }> = {
  pendente: { label: "Pendente", class: "bg-amber-100 text-amber-700" },
  aprovado: { label: "Aprovado", class: "bg-emerald-100 text-emerald-700" },
  rejeitado: { label: "Rejeitado", class: "bg-red-100 text-red-700" },
};

export function TurmaSubmissoes() {
  const [submissoes, setSubmissoes] = useState(SUBMISSOES_PENDENTES);
  const [selectedSub, setSelectedSub] = useState<SubmissaoAluno | null>(null);
  const [comentario, setComentario] = useState("");
  const [viewOpen, setViewOpen] = useState(false);
  const [filter, setFilter] = useState<
    "todas" | "pendente" | "aprovado" | "rejeitado"
  >("todas");

  const filtered =
    filter === "todas"
      ? submissoes
      : submissoes.filter((s) => s.status === filter);

  const handleAprovar = (id: string) => {
    setSubmissoes(
      submissoes.map((s) =>
        s.id === id ? { ...s, status: "aprovado" as const, comentario } : s,
      ),
    );
    setViewOpen(false);
    setSelectedSub(null);
    setComentario("");
  };

  const handleRejeitar = (id: string) => {
    setSubmissoes(
      submissoes.map((s) =>
        s.id === id ? { ...s, status: "rejeitado" as const, comentario } : s,
      ),
    );
    setViewOpen(false);
    setSelectedSub(null);
    setComentario("");
  };

  const openReview = (sub: SubmissaoAluno) => {
    setSelectedSub(sub);
    setComentario(sub.comentario ?? "");
    setViewOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900">
          Submissões dos Alunos
        </h3>
        <div className="flex gap-1">
          {(["todas", "pendente", "aprovado", "rejeitado"] as const).map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition",
                  filter === f
                    ? "bg-primary text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200",
                )}
              >
                {f === "todas" ? "Todas" : statusLabel[f].label}
              </button>
            ),
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 py-10">
          <FileText className="size-8 text-zinc-300 mb-2" />
          <p className="text-sm text-zinc-500">Nenhuma submissão encontrada.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white px-4 py-3 cursor-pointer hover:border-zinc-300 transition"
              onClick={() => openReview(sub)}
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-900 truncate">
                  {sub.titulo}
                </p>
                <p className="text-xs text-zinc-500">
                  {sub.alunoNome} (#{sub.alunoNumero}) &middot; {sub.tamanho}
                </p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  statusLabel[sub.status].class,
                )}
              >
                {statusLabel[sub.status].label}
              </span>
              <ExternalLink className="size-4 text-zinc-400 shrink-0" />
            </div>
          ))}
        </div>
      )}

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Revisão de Submissão</DialogTitle>
          </DialogHeader>

          {selectedSub && (
            <div className="space-y-4">
              <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3 space-y-2">
                <div>
                  <span className="text-xs font-medium text-zinc-500">
                    Aluno
                  </span>
                  <p className="text-sm font-semibold text-zinc-900">
                    {selectedSub.alunoNome} (#{selectedSub.alunoNumero})
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-zinc-500">
                    Título
                  </span>
                  <p className="text-sm text-zinc-800">{selectedSub.titulo}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-zinc-500">
                    Descrição
                  </span>
                  <p className="text-sm text-zinc-600">
                    {selectedSub.descricao}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>Tipo: {selectedSub.tipo.toUpperCase()}</span>
                  <span>Tamanho: {selectedSub.tamanho}</span>
                  <span>Data: {selectedSub.data}</span>
                </div>
              </div>

              <Button variant="secondary" className="w-full">
                <ExternalLink className="size-4" />
                Visualizar Ficheiro
              </Button>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700">
                  Comentário do Professor
                </label>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Deixe um comentário para o aluno..."
                  rows={3}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            {selectedSub?.status === "pendente" && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => handleRejeitar(selectedSub.id)}
                >
                  <X className="size-4" />
                  Rejeitar
                </Button>
                <Button onClick={() => handleAprovar(selectedSub.id)}>
                  <Check className="size-4" />
                  Aprovar
                </Button>
              </>
            )}
            {selectedSub?.status !== "pendente" && (
              <Button variant="ghost" onClick={() => setViewOpen(false)}>
                Fechar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
