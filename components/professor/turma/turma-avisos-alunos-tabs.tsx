"use client";

import { useState } from "react";
import {
  Send,
  Trash2,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type Aviso, type Aluno, type Disciplina } from "./turma-data";

// ── Avisos Tab ────────────────────────────────────────────────────────────────

interface AvisosTabProps {
  disciplina: Disciplina;
  avisos: Aviso[];
  onAdd: (a: Omit<Aviso, "id">) => void;
  onRemove: (id: string) => void;
}

export function AvisosTab({
  disciplina,
  avisos,
  onAdd,
  onRemove,
}: AvisosTabProps) {
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");

  const handlePublicar = () => {
    if (!texto.trim()) {
      setError("O aviso não pode estar vazio.");
      return;
    }
    onAdd({
      texto: texto.trim(),
      data: new Date().toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      disciplinaId: disciplina.id,
      autor: "Prof. Margarida Silva",
    });
    setTexto("");
    setError("");
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Compose */}
      <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-4">
        <label className="text-xs font-semibold text-zinc-700">
          Publicar aviso para a turma {disciplina.turma}
        </label>
        <textarea
          value={texto}
          onChange={(e) => {
            setTexto(e.target.value);
            setError("");
          }}
          placeholder="Escreva um aviso, lembrete ou nota importante..."
          rows={3}
          className={cn(
            "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none transition",
            error ? "border-red-400" : "border-zinc-200",
          )}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <div className="flex justify-end">
          <Button
            onClick={handlePublicar}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white gap-2"
          >
            <Send className="size-3.5" />
            Publicar Aviso
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          Avisos publicados ({avisos.length})
        </p>

        {avisos.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-200 py-10 text-center">
            <p className="text-sm text-zinc-400">
              Nenhum aviso publicado ainda.
            </p>
          </div>
        )}

        {avisos.map((a) => (
          <div
            key={a.id}
            className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-amber-50/40 p-4"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 mt-0.5">
              <AlertCircle className="size-4" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-zinc-800 leading-relaxed">{a.texto}</p>
              <p className="text-[10px] text-zinc-400 mt-1.5">
                {a.autor} · {a.data}
              </p>
            </div>
            <button
              onClick={() => onRemove(a.id)}
              className="flex size-7 shrink-0 items-center justify-center rounded-md text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Alunos Tab ────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  regular: {
    label: "Regular",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  atencao: {
    label: "Atenção",
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50 text-amber-700 border-amber-200",
  },
  risco: {
    label: "Risco",
    icon: AlertCircle,
    color: "text-red-600",
    bg: "bg-red-50 text-red-700 border-red-200",
  },
};

interface AlunosTabProps {
  alunos: Aluno[];
  disciplina: Disciplina;
}

export function AlunosTab({ alunos, disciplina }: AlunosTabProps) {
  const [search, setSearch] = useState("");

  const filtered = alunos.filter(
    (a) =>
      a.nome.toLowerCase().includes(search.toLowerCase()) ||
      a.numero.includes(search),
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Summary pills */}
      <div className="flex items-center gap-3 flex-wrap">
        {(["regular", "atencao", "risco"] as Aluno["status"][]).map((s) => {
          const count = alunos.filter((a) => a.status === s).length;
          const cfg = STATUS_CONFIG[s];
          return (
            <div
              key={s}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
                cfg.bg,
              )}
            >
              <cfg.icon className="size-3.5" />
              {cfg.label}: {count}
            </div>
          );
        })}
        <span className="text-xs text-zinc-400 ml-auto">
          {alunos.length} alunos na turma
        </span>
      </div>

      {/* Search */}
      <div className="relative w-56">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Pesquisar aluno..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-zinc-200 bg-white pl-9 pr-3 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-primary text-white text-xs font-semibold">
              <th className="px-4 py-3 text-left w-10">Nº</th>
              <th className="px-4 py-3 text-left">Nome</th>
              <th className="px-4 py-3 text-center w-24">Média</th>
              <th className="px-4 py-3 text-center w-20">Faltas</th>
              <th className="px-4 py-3 text-center w-28">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-zinc-400"
                >
                  Nenhum aluno encontrado.
                </td>
              </tr>
            )}
            {filtered.map((aluno, idx) => {
              const cfg = STATUS_CONFIG[aluno.status];
              const isEven = idx % 2 === 1;
              const mediaColor =
                aluno.media >= 14
                  ? "text-emerald-600"
                  : aluno.media >= 10
                    ? "text-blue-600"
                    : "text-red-600";

              return (
                <tr
                  key={aluno.id}
                  className={cn(
                    "border-b border-zinc-100 hover:bg-zinc-50 transition-colors cursor-pointer",
                    isEven ? "bg-[#f5c9a0]/20" : "bg-white",
                  )}
                >
                  <td className="px-4 py-3 text-zinc-500 font-medium">
                    {aluno.numero}
                  </td>
                  <td className="px-4 py-3 font-semibold text-zinc-800 uppercase text-xs tracking-wide">
                    {aluno.nome}
                  </td>
                  <td
                    className={cn(
                      "px-4 py-3 text-center font-bold",
                      mediaColor,
                    )}
                  >
                    {aluno.media.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 text-center text-zinc-500">
                    {aluno.faltas}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] border inline-flex items-center gap-1",
                        cfg.bg,
                      )}
                    >
                      <cfg.icon className="size-3" />
                      {cfg.label}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
