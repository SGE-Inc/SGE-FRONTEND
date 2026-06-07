"use client";

import { useState } from "react";
import { Search, Download, Eye, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ALUNOS_NOTAS,
  type AlunoNota,
  type Trimestre,
  isNegativa,
} from "./professor-data";

const TRIMESTRES: Trimestre[] = [
  "I TRIMESTRE",
  "II TRIMESTRE",
  "III TRIMESTRE",
];
const TURMAS = ["Todas", "QI10B", "QI11A"];

export function ProfessorEstudantesTable() {
  const [search, setSearch] = useState("");
  const [turma, setTurma] = useState("Todas");
  const [trimestre, setTrimestre] = useState<Trimestre>("II TRIMESTRE");
  const [selectedAluno, setSelectedAluno] = useState<AlunoNota | null>(null);

  const filtered = ALUNOS_NOTAS.filter((a) => {
    const matchSearch =
      a.nome.toLowerCase().includes(search.toLowerCase()) ||
      a.numero.includes(search);
    const matchTurma = turma === "Todas" || a.turma === turma;
    return matchSearch && matchTurma;
  });

  const positivas = filtered.filter((a) => !isNegativa(a.mt)).length;
  const negativas = filtered.filter((a) => isNegativa(a.mt)).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por nome ou número..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
          />
        </div>

        <Select value={turma} onValueChange={setTurma}>
          <SelectTrigger className="w-32 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TURMAS.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={trimestre}
          onValueChange={(v) => setTrimestre(v as Trimestre)}
        >
          <SelectTrigger className="w-40 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TRIMESTRES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="secondary">
          <Download className="size-4" />
          Exportar
        </Button>
      </div>

      <div className="flex items-center gap-4 text-sm text-zinc-500">
        <span>
          Total: <strong className="text-zinc-800">{filtered.length}</strong>{" "}
          estudantes
        </span>
        <span className="text-emerald-600">
          Positivas: <strong>{positivas}</strong>
        </span>
        <span className="text-red-600">
          Negativas: <strong>{negativas}</strong>
        </span>
      </div>

      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-primary text-white text-left text-xs font-semibold uppercase tracking-wide">
                <th className="px-4 py-3 border border-primary/30">Nº</th>
                <th className="px-4 py-3 border border-primary/30">Nome</th>
                <th className="px-4 py-3 border border-primary/30 text-center">
                  Turma
                </th>
                <th className="px-4 py-3 border border-primary/30 text-center w-[50px]">
                  Faltas J
                </th>
                <th className="px-4 py-3 border border-primary/30 text-center w-[50px]">
                  Faltas I
                </th>
                <th className="px-4 py-3 border border-primary/30 text-center w-[60px]">
                  PP
                </th>
                <th className="px-4 py-3 border border-primary/30 text-center w-[60px]">
                  PT
                </th>
                <th className="px-4 py-3 border border-primary/30 text-center w-[60px]">
                  MT
                </th>
                <th className="px-4 py-3 border border-primary/30 text-center w-[60px]">
                  Acções
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((aluno, idx) => {
                const isEven = idx % 2 === 1;
                const negMt = isNegativa(aluno.mt);
                return (
                  <tr
                    key={aluno.id}
                    className={cn(
                      "border-b border-zinc-100",
                      isEven && "bg-[#f5c9a0]/40",
                    )}
                  >
                    <td className="px-4 py-2.5 text-sm text-zinc-600 font-medium border border-zinc-200">
                      {aluno.numero}
                    </td>
                    <td className="px-4 py-2.5 text-sm font-semibold text-zinc-800 border border-zinc-200">
                      {aluno.nome}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-zinc-600 text-center border border-zinc-200">
                      {aluno.turma}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-zinc-500 text-center border border-zinc-200">
                      {aluno.faltasJ}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-zinc-500 text-center border border-zinc-200">
                      {aluno.faltasI}
                    </td>
                    <td className="px-4 py-2.5 text-sm font-bold text-center border border-zinc-200">
                      {aluno.pp}
                    </td>
                    <td className="px-4 py-2.5 text-sm font-bold text-center border border-zinc-200">
                      {aluno.pt}
                    </td>
                    <td
                      className={cn(
                        "px-4 py-2.5 text-sm font-bold text-center border border-zinc-200",
                        negMt ? "text-red-600" : "text-blue-700",
                      )}
                    >
                      {aluno.mt}
                    </td>
                    <td className="px-4 py-2.5 text-center border border-zinc-200">
                      <button
                        onClick={() => setSelectedAluno(aluno)}
                        className="rounded-md p-1.5 text-primary hover:bg-primary/10 transition"
                        title="Ver perfil"
                      >
                        <Eye className="size-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <User className="size-8 text-zinc-300 mb-2" />
            <p className="text-sm text-zinc-500">
              Nenhum estudante encontrado.
            </p>
          </div>
        )}
      </div>

      <Dialog
        open={selectedAluno !== null}
        onOpenChange={(o) => !o && setSelectedAluno(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Perfil do Estudante</DialogTitle>
            <DialogDescription>
              Dados académicos e notas do aluno.
            </DialogDescription>
          </DialogHeader>

          {selectedAluno && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-xs text-zinc-500">Nome</span>
                  <p className="font-semibold text-zinc-900">
                    {selectedAluno.nome}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">Número</span>
                  <p className="font-semibold text-zinc-900">
                    {selectedAluno.numero}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">Turma</span>
                  <p className="font-semibold text-zinc-900">
                    {selectedAluno.turma}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">Trimestre</span>
                  <p className="font-semibold text-zinc-900">{trimestre}</p>
                </div>
              </div>

              <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">PP (Prova Professor):</span>
                  <span
                    className={cn(
                      "font-bold",
                      isNegativa(selectedAluno.pp)
                        ? "text-red-600"
                        : "text-blue-700",
                    )}
                  >
                    {selectedAluno.pp}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">PT (Prova Trimestral):</span>
                  <span
                    className={cn(
                      "font-bold",
                      isNegativa(selectedAluno.pt)
                        ? "text-red-600"
                        : "text-blue-700",
                    )}
                  >
                    {selectedAluno.pt}
                  </span>
                </div>
                <div className="border-t border-zinc-200 pt-2 flex justify-between text-sm font-semibold">
                  <span className="text-zinc-700">MT (Média Trimestral):</span>
                  <span
                    className={cn(
                      "font-bold",
                      isNegativa(selectedAluno.mt)
                        ? "text-red-600"
                        : "text-blue-700",
                    )}
                  >
                    {selectedAluno.mt}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-sm text-zinc-500">
                <span>Faltas Justificadas: {selectedAluno.faltasJ}</span>
                <span>Faltas Injustificadas: {selectedAluno.faltasI}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
