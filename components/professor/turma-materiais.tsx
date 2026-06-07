"use client";

import { useState } from "react";
import { Plus, Trash2, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PROFESSOR_MATERIAIS,
  PROFESSOR_MOCK,
  type ProfessorMaterial,
  formatDate,
} from "./professor-data";

const iconMap: Record<string, string> = {
  pdf: "PDF",
  doc: "Word",
  xls: "Excel",
  csv: "CSV",
  img: "Img",
  outro: "File",
};

export function TurmaMateriais() {
  const [materiais, setMateriais] = useState(PROFESSOR_MATERIAIS);
  const [addOpen, setAddOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("mat");

  const disciplinas = PROFESSOR_MOCK.disciplinas;
  const disciplinaOptions = [
    { id: "mat", nome: "Matemática" },
    { id: "fis", nome: "Física" },
  ];

  const filtered =
    disciplinas.length > 0
      ? materiais.filter((m) =>
          disciplinaOptions.some((d) => d.id === m.disciplinaId),
        )
      : materiais;

  const handleAdd = () => {
    if (!titulo) return;
    const novo: ProfessorMaterial = {
      id: `pm${Date.now()}`,
      titulo,
      descricao,
      tipo: "pdf",
      ficheiro: `${titulo.toLowerCase().replace(/\s+/g, "_")}.pdf`,
      tamanho: "0.5 MB",
      data: new Date().toISOString().split("T")[0],
      disciplinaId,
      disciplinaNome:
        disciplinaOptions.find((d) => d.id === disciplinaId)?.nome ?? "",
    };
    setMateriais([novo, ...materiais]);
    setTitulo("");
    setDescricao("");
    setAddOpen(false);
  };

  const handleRemove = (id: string) => {
    setMateriais(materiais.filter((m) => m.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900">
          Materiais Partilhados
        </h3>
        <Button onClick={() => setAddOpen(true)}>
          <Plus className="size-4" />
          Novo Material
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 py-10">
          <FileText className="size-8 text-zinc-300 mb-2" />
          <p className="text-sm text-zinc-500">
            Nenhum material partilhado ainda.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((mat) => (
            <div
              key={mat.id}
              className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white px-4 py-3"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold uppercase">
                {iconMap[mat.tipo] ?? "File"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-900 truncate">
                  {mat.titulo}
                </p>
                <p className="text-xs text-zinc-500">
                  {mat.disciplinaNome} &middot; {mat.tamanho} &middot;{" "}
                  {formatDate(mat.data)}
                </p>
              </div>
              <button
                onClick={() => handleRemove(mat.id)}
                className="rounded-full p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Partilhar Novo Material</DialogTitle>
            <DialogDescription>
              Preencha os dados do material que será disponibilizado para os
              alunos.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">
                Disciplina
              </label>
              <select
                value={disciplinaId}
                onChange={(e) => setDisciplinaId(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {disciplinaOptions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">
                Título
              </label>
              <Input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Exercícios de Revisão"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">
                Descrição / Nota
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Instruções ou observações sobre o material..."
                rows={3}
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>

            <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
              <p className="text-xs text-amber-800">
                Esta nota será visível para os alunos quando acederem ao
                material.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdd} disabled={!titulo}>
              Partilhar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
