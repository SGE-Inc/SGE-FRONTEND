"use client";

import { useState } from "react";
import {
  FileText,
  FileType2,
  Link2,
  ImageIcon,
  Eye,
  EyeOff,
  Trash2,
  Pencil,
  Plus,
  Upload,
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
import { type Material, type Disciplina } from "./turma-data";

const TYPE_ICONS: Record<Material["tipo"], typeof FileText> = {
  pdf: FileText,
  doc: FileType2,
  link: Link2,
  img: ImageIcon,
};

const TYPE_COLORS: Record<Material["tipo"], string> = {
  pdf: "bg-red-50 text-red-500",
  doc: "bg-blue-50 text-blue-500",
  link: "bg-emerald-50 text-emerald-600",
  img: "bg-purple-50 text-purple-500",
};

interface MateriaisTabProps {
  disciplina: Disciplina;
  materiais: Material[];
  onAdd: (m: Omit<Material, "id">) => void;
  onRemove: (id: string) => void;
  onToggleVisivel: (id: string) => void;
}

export function MateriaisTab({
  disciplina,
  materiais,
  onAdd,
  onRemove,
  onToggleVisivel,
}: MateriaisTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    tipo: "pdf" as Material["tipo"],
    url: "",
    visivel: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.titulo.trim()) e.titulo = "Título obrigatório";
    if (!form.descricao.trim()) e.descricao = "Descrição obrigatória";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onAdd({
      titulo: form.titulo,
      descricao: form.descricao,
      tipo: form.tipo,
      url: form.url || undefined,
      data: new Date()
        .toLocaleDateString("pt-PT", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "/"),
      disciplinaId: disciplina.id,
      visivel: form.visivel,
    });
    setForm({ titulo: "", descricao: "", tipo: "pdf", url: "", visivel: true });
    setErrors({});
    setShowForm(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          {materiais.length} material{materiais.length !== 1 ? "is" : ""}{" "}
          partilhado{materiais.length !== 1 ? "s" : ""}
        </p>
        <Button
          onClick={() => setShowForm(true)}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white gap-2"
        >
          <Plus className="size-4" />
          Partilhar Material
        </Button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {materiais.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-200 py-10 text-center">
            <p className="text-sm text-zinc-400">
              Nenhum material partilhado ainda.
            </p>
          </div>
        )}

        {materiais.map((m) => {
          const Icon = TYPE_ICONS[m.tipo];
          return (
            <div
              key={m.id}
              className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 hover:border-zinc-300 transition-colors"
            >
              {/* Icon */}
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg",
                  TYPE_COLORS[m.tipo],
                )}
              >
                <Icon className="size-4" />
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-zinc-800">
                    {m.titulo}
                  </p>
                  {!m.visivel && (
                    <Badge
                      variant="outline"
                      className="text-[10px] border-zinc-200 text-zinc-400"
                    >
                      Oculto
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">
                  {m.descricao}
                </p>
                <p className="text-[10px] text-zinc-300 mt-1">{m.data}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onToggleVisivel(m.id)}
                  title={m.visivel ? "Ocultar" : "Tornar visível"}
                  className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
                >
                  {m.visivel ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeOff className="size-4" />
                  )}
                </button>
                <button
                  onClick={() => setConfirmDelete(m.id)}
                  title="Remover"
                  className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Add material dialog ── */}
      <Dialog
        open={showForm}
        onOpenChange={(v) => {
          if (!v) {
            setShowForm(false);
            setErrors({});
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="size-4 text-primary" />
              Partilhar Material
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            {/* Título */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Título <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.titulo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, titulo: e.target.value }))
                }
                placeholder="Ex: Ficha de exercícios — Aula 5"
                className={cn(
                  "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
                  errors.titulo ? "border-red-400" : "border-zinc-200",
                )}
              />
              {errors.titulo && (
                <p className="text-xs text-red-500">{errors.titulo}</p>
              )}
            </div>

            {/* Descrição */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Descrição / Nota <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.descricao}
                onChange={(e) =>
                  setForm((f) => ({ ...f, descricao: e.target.value }))
                }
                placeholder="Descreva o conteúdo e objectivo deste material..."
                rows={3}
                className={cn(
                  "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none",
                  errors.descricao ? "border-red-400" : "border-zinc-200",
                )}
              />
              {errors.descricao && (
                <p className="text-xs text-red-500">{errors.descricao}</p>
              )}
            </div>

            {/* Tipo */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Tipo de Material
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["pdf", "doc", "link", "img"] as Material["tipo"][]).map(
                  (t) => {
                    const Icon = TYPE_ICONS[t];
                    return (
                      <button
                        key={t}
                        onClick={() => setForm((f) => ({ ...f, tipo: t }))}
                        className={cn(
                          "flex flex-col items-center gap-1 rounded-lg border py-2.5 text-xs font-semibold transition-colors",
                          form.tipo === t
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-zinc-200 text-zinc-500 hover:border-zinc-300",
                        )}
                      >
                        <Icon className="size-4" />
                        {t.toUpperCase()}
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            {/* URL (opcional) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                URL / Link{" "}
                <span className="text-zinc-400 font-normal">(opcional)</span>
              </label>
              <input
                type="url"
                value={form.url}
                onChange={(e) =>
                  setForm((f) => ({ ...f, url: e.target.value }))
                }
                placeholder="https://..."
                className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>

            {/* Upload placeholder */}
            <div className="rounded-lg border-2 border-dashed border-zinc-200 px-4 py-6 text-center">
              <Upload className="size-6 text-zinc-300 mx-auto mb-1" />
              <p className="text-xs text-zinc-400">
                Arraste um ficheiro ou{" "}
                <span className="text-primary cursor-pointer underline">
                  clique para selecionar
                </span>
              </p>
              <p className="text-[10px] text-zinc-300 mt-0.5">
                PDF, DOC, IMG — máx. 20MB
              </p>
            </div>

            {/* Visível toggle */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div
                onClick={() => setForm((f) => ({ ...f, visivel: !f.visivel }))}
                className={cn(
                  "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
                  form.visivel ? "bg-primary" : "bg-zinc-200",
                )}
              >
                <span
                  className={cn(
                    "inline-block size-3.5 rounded-full bg-white shadow transition-transform",
                    form.visivel ? "translate-x-4" : "translate-x-0.5",
                  )}
                />
              </div>
              <span className="text-sm text-zinc-700">
                Visível para os alunos
              </span>
            </label>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowForm(false);
                setErrors({});
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Partilhar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Confirm delete dialog ── */}
      <Dialog
        open={!!confirmDelete}
        onOpenChange={(v) => !v && setConfirmDelete(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Remover Material</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-zinc-600 py-2">
            Tem a certeza que deseja remover este material? Esta acção não pode
            ser desfeita.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmDelete) {
                  onRemove(confirmDelete);
                  setConfirmDelete(null);
                }
              }}
            >
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
