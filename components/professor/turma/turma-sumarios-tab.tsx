"use client";

import { useState, useMemo } from "react";
import { Plus, Save, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { type Aluno } from "./turma-data";

interface Sumario {
  id: string;
  data: string;
  conteudo: string;
  sumario: string;
  presentes: string[]; // alunoIds
}

interface SumariosTabProps {
  alunos: Aluno[];
}

const SUMARIOS_MOCK: Sumario[] = [
  {
    id: "s1",
    data: "2026-06-01",
    conteudo:
      "Introdução às reacções ácido-base. Definição de ácido e base segundo Arrhenius e Brønsted-Lowry.",
    sumario:
      "Sumário: Correcção do TPC. Introdução às reacções ácido-base. Resolução de exercícios.",
    presentes: [
      "a1",
      "a2",
      "a3",
      "a4",
      "a5",
      "a6",
      "a7",
      "a8",
      "a10",
      "a11",
      "a12",
    ],
  },
  {
    id: "s2",
    data: "2026-06-04",
    conteudo:
      "Escala de pH. Cálculo de pH de ácidos e bases fortes. Indicadores ácido-base.",
    sumario:
      "Sumário: Escala de pH. Cálculo de pH. Experiência com indicadores ácido-base.",
    presentes: ["a1", "a2", "a3", "a4", "a5", "a6", "a8", "a10", "a11"],
  },
  {
    id: "s3",
    data: "2026-06-08",
    conteudo:
      "Reacções de neutralização. Titulação ácido-base. Cálculos estequiométricos.",
    sumario:
      "Sumário: Correcção do TPC. Reacções de neutralização. Introdução à titulação.",
    presentes: ["a1", "a2", "a3", "a4", "a5", "a6", "a10", "a11", "a12"],
  },
];

export function SumariosTab({ alunos }: SumariosTabProps) {
  const [sumarios, setSumarios] = useState<Sumario[]>(SUMARIOS_MOCK);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Sumario | null>(null);

  const filteredSumarios = useMemo(
    () => sumarios.sort((a, b) => b.data.localeCompare(a.data)),
    [sumarios],
  );

  const handleAdd = (data: {
    data: string;
    conteudo: string;
    sumario: string;
    presentes: string[];
  }) => {
    const novo: Sumario = {
      id: `s${Date.now()}`,
      ...data,
    };
    setSumarios((prev) => [novo, ...prev]);
    setFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setSumarios((prev) => prev.filter((s) => s.id !== id));
    setConfirmDelete(null);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-400">
          {filteredSumarios.length} sumário
          {filteredSumarios.length !== 1 ? "s" : ""} registado
          {filteredSumarios.length !== 1 ? "s" : ""}
        </p>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white gap-2"
          onClick={() => {
            setEditingSumario(null);
            setFormOpen(true);
          }}
        >
          <Plus className="size-3.5" />
          Novo Sumário
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {filteredSumarios.length === 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white px-6 py-12 text-center">
            <BookOpen className="size-8 text-zinc-300 mx-auto mb-3" />
            <p className="text-sm text-zinc-400">Nenhum sumário registado.</p>
          </div>
        )}
        {filteredSumarios.map((s) => {
          const totalAlunos = alunos.length;
          const presentes = s.presentes.length;
          const ausentes = totalAlunos - presentes;
          return (
            <div
              key={s.id}
              className="rounded-xl border border-zinc-200 bg-white overflow-hidden"
            >
              <div className="px-5 py-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary">
                      {new Date(s.data).toLocaleDateString("pt-PT", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-xs text-zinc-400">·</span>
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        presentes > ausentes
                          ? "text-emerald-600"
                          : "text-amber-600",
                      )}
                    >
                      {presentes}/{totalAlunos} presentes
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-zinc-800 mb-1">
                    {s.conteudo}
                  </p>
                  <p className="text-xs text-zinc-500 italic">{s.sumario}</p>
                  {ausentes > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="text-[10px] text-zinc-400 font-medium mr-1">
                        Ausentes:
                      </span>
                      {s.presentes.length < totalAlunos && (
                        <span className="text-[10px] text-red-500">
                          {alunos
                            .filter((a) => !s.presentes.includes(a.id))
                            .map((a) => a.nome.split(" ")[0])
                            .join(", ")}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setConfirmDelete(s)}
                  className="shrink-0 flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={formOpen} onOpenChange={(v) => !v && setFormOpen(false)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="size-4 text-primary" />
              Novo Sumário
            </DialogTitle>
          </DialogHeader>
          <SumarioForm
            alunos={alunos}
            onSave={handleAdd}
            onClose={() => setFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!confirmDelete}
        onOpenChange={(v) => !v && setConfirmDelete(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <Trash2 className="size-4" />
              Remover Sumário
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-zinc-600">
            Tem a certeza que deseja remover este sumário?
          </p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setConfirmDelete(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmDelete && handleDelete(confirmDelete.id)}
            >
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SumarioForm({
  alunos,
  onSave,
  onClose,
}: {
  alunos: Aluno[];
  onSave: (data: {
    data: string;
    conteudo: string;
    sumario: string;
    presentes: string[];
  }) => void;
  onClose: () => void;
}) {
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [conteudo, setConteudo] = useState("");
  const [sumario, setSumario] = useState("");
  const [presentes, setPresentes] = useState<string[]>(alunos.map((a) => a.id));

  const toggleAluno = (id: string) => {
    setPresentes((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleSave = () => {
    if (!data || !conteudo || !sumario) return;
    onSave({ data, conteudo, sumario, presentes });
  };

  const totalAlunos = alunos.length;
  const presentesCount = presentes.length;

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-zinc-700">
          Data <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-zinc-700">
          Conteúdo Lecionado <span className="text-red-500">*</span>
        </label>
        <textarea
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          placeholder="Descreva o conteúdo lecionado na aula..."
          className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm resize-none"
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-zinc-700">
          Sumário <span className="text-red-500">*</span>
        </label>
        <textarea
          value={sumario}
          onChange={(e) => setSumario(e.target.value)}
          placeholder="Escreva o sumário da aula..."
          className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm resize-none"
          rows={2}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-zinc-700">
            Presenças
          </label>
          <span className="text-xs text-zinc-400">
            {presentesCount}/{totalAlunos} presentes
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto rounded-lg border border-zinc-200 p-2">
          {alunos.map((a) => {
            const isPresente = presentes.includes(a.id);
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => toggleAluno(a.id)}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs font-semibold border transition-colors text-left",
                  isPresente
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300",
                )}
              >
                {a.nome.split(" ")[0]} {a.nome.split(" ").pop()}
              </button>
            );
          })}
        </div>
      </div>

      <DialogFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-white gap-2"
        >
          <Save className="size-3.5" />
          Registar Sumário
        </Button>
      </DialogFooter>
    </div>
  );
}
