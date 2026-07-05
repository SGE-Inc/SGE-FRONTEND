"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Download,
  Upload,
  Pencil,
  Trash2,
  PowerOff,
  Power,
  ChevronDown,
  Filter,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { EstudanteFormDialog } from "./estudante-form-dialog";
import { EstudanteDetailDialog } from "./estudante-detail";
import {
  type Estudante,
  type EstudanteFormData,
  type StatusEstudante,
  type Curso,
  STATUS_CONFIG,
} from "./estudantes-data";

function AvatarInitials({ nome }: { nome: string }) {
  const parts = nome.trim().split(" ").filter(Boolean);
  const initials =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : (parts[0]?.slice(0, 2) ?? "?");
  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
      {initials}
    </div>
  );
}

function StatsBar({ estudantes }: { estudantes: Estudante[] }) {
  const total = estudantes.length;
  const activos = estudantes.filter((e) => e.status === "activo").length;
  const inactivos = estudantes.filter((e) => e.status === "inactivo").length;
  const transferidos = estudantes.filter(
    (e) => e.status === "transferido",
  ).length;
  const turmas = new Set(estudantes.map((e) => e.turma)).size;
  const aprovados = estudantes.filter((e) => e.aprovado === true).length;

  const items = [
    { label: "Total", value: total, color: "text-zinc-900" },
    { label: "Activos", value: activos, color: "text-emerald-600" },
    { label: "Inactivos", value: inactivos, color: "text-zinc-400" },
    { label: "Transferidos", value: transferidos, color: "text-amber-600" },
    { label: "Aprovados", value: aprovados, color: "text-primary" },
    { label: "Turmas", value: turmas, color: "text-blue-600" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {items.map(({ label, value, color }) => (
        <div
          key={label}
          className="rounded-xl border border-zinc-200 bg-white px-4 py-3"
        >
          <p className={cn("text-2xl font-bold", color)}>{value}</p>
          <p className="text-xs text-zinc-400 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}

interface EstudantesTableProps {
  estudantes: Estudante[];
  curso: Curso;
  turmas: string[];
  onAdd: (data: EstudanteFormData) => void;
  onEdit: (id: string, data: EstudanteFormData) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function EstudantesTable({
  estudantes,
  curso,
  turmas,
  onAdd,
  onEdit,
  onDelete,
  onToggleStatus,
}: EstudantesTableProps) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<StatusEstudante | "todos">(
    "todos",
  );
  const [filterTurma, setFilterTurma] = useState<string>("todas");
  const [filterAno, setFilterAno] = useState<string>("todas");

  const [formOpen, setFormOpen] = useState(false);
  const [editingEstudante, setEditingEstudante] = useState<Estudante | null>(
    null,
  );
  const [confirmDelete, setConfirmDelete] = useState<Estudante | null>(null);
  const [detailEstudante, setDetailEstudante] = useState<Estudante | null>(
    null,
  );

  const filtered = useMemo(() => {
    return estudantes.filter((e) => {
      const matchSearch =
        e.nome.toLowerCase().includes(search.toLowerCase()) ||
        e.numeroProcesso.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "todos" || e.status === filterStatus;
      const matchTurma = filterTurma === "todas" || e.turma === filterTurma;
      const matchAno = filterAno === "todas" || e.anoClasse === filterAno;
      return matchSearch && matchStatus && matchTurma && matchAno;
    });
  }, [estudantes, search, filterStatus, filterTurma, filterAno]);

  const handleEdit = (e: Estudante) => {
    setEditingEstudante(e);
    setFormOpen(true);
  };

  const handleSave = (data: EstudanteFormData) => {
    if (editingEstudante) {
      onEdit(editingEstudante.id, data);
    } else {
      onAdd(data);
    }
    setFormOpen(false);
    setEditingEstudante(null);
  };

  const handleExport = () => {
    const header = "Nome,Nº Processo,Turma,Contacto,Email,Curso,Status\n";
    const rows = estudantes
      .map(
        (e) =>
          `"${e.nome}","${e.numeroProcesso}","${e.turma}","${e.contacto}","${e.email}","${e.curso}","${e.status}"`,
      )
      .join("\n");
    const blob = new Blob(["\uFEFF" + header + rows], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `estudantes-${curso.toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx,.xls";
    input.onchange = (ev) => {
      const file = (ev.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split("\n").filter(Boolean);
        if (lines.length < 2) return;
        const parsed: EstudanteFormData[] = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i]
            .split(",")
            .map((c) => c.replace(/^"|"$/g, "").trim());
          if (cols.length < 6) continue;
          const turma = cols[2];
          parsed.push({
            nome: cols[0],
            numeroProcesso: cols[1],
            turma,
            anoClasse: "10ª",
            contacto: cols[3],
            email: cols[4],
            documentoTipo: "BI",
            documentoNumero: cols[1],
            encarregadoNome: "",
            encarregadoContacto: "",
            encarregadoParentesco: "",
            dataNascimento: "01/01/2000",
            genero: "Masculino",
            endereco: "",
            status: "activo",
          });
        }
        parsed.forEach((p) => onAdd(p));
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const activeFiltersCount = [
    filterStatus !== "todos",
    filterTurma !== "todas",
    filterAno !== "todas",
  ].filter(Boolean).length;

  const anoOptions = useMemo(() => {
    const anos = new Set(estudantes.map((e) => e.anoClasse));
    return Array.from(anos).sort();
  }, [estudantes]);

  return (
    <div className="flex flex-col gap-5">
      <StatsBar estudantes={estudantes} />

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Pesquisar por nome, processo ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-md border border-zinc-200 bg-white pl-9 pr-3 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="size-3.5" />
                Filtros
                {activeFiltersCount > 0 && (
                  <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-white font-bold">
                    {activeFiltersCount}
                  </span>
                )}
                <ChevronDown className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 p-3 flex flex-col gap-3"
            >
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Estado
                </p>
                <div className="flex flex-wrap gap-1">
                  {(
                    ["todos", "activo", "inactivo", "transferido"] as const
                  ).map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-semibold border transition-colors capitalize",
                        filterStatus === s
                          ? "bg-primary text-white border-primary"
                          : "text-zinc-500 border-zinc-200 hover:border-zinc-300",
                      )}
                    >
                      {s === "todos" ? "Todos" : STATUS_CONFIG[s].label}
                    </button>
                  ))}
                </div>
              </div>

              <DropdownMenuSeparator />

              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Turma
                </p>
                <select
                  value={filterTurma}
                  onChange={(e) => setFilterTurma(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2 py-1.5 text-xs text-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary/30"
                >
                  <option value="todas">Todas as turmas</option>
                  {turmas.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Ano / Classe
                </p>
                <select
                  value={filterAno}
                  onChange={(e) => setFilterAno(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2 py-1.5 text-xs text-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary/30"
                >
                  <option value="todas">Todos os anos</option>
                  {anoOptions.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              {activeFiltersCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <button
                    onClick={() => {
                      setFilterStatus("todos");
                      setFilterTurma("todas");
                      setFilterAno("todas");
                    }}
                    className="text-xs text-red-500 hover:text-red-700 text-left font-medium"
                  >
                    Limpar filtros
                  </button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleExport}
          >
            <Download className="size-3.5" />
            Exportar CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleImport}
          >
            <Upload className="size-3.5" />
            Importar
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white gap-2"
            onClick={() => {
              setEditingEstudante(null);
              setFormOpen(true);
            }}
          >
            <Plus className="size-4" />
            Matricular
          </Button>
        </div>
      </div>

      <p className="text-xs text-zinc-400">
        {filtered.length} estudante{filtered.length !== 1 ? "s" : ""} encontrado
        {filtered.length !== 1 ? "s" : ""}
        {filtered.length !== estudantes.length && ` de ${estudantes.length}`}
      </p>

      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm min-w-[900px]">
            <thead>
              <tr className="bg-primary text-white text-xs font-semibold">
                <th className="px-4 py-3 text-left">Estudante</th>
                <th className="px-4 py-3 text-left">Nº Processo</th>
                <th className="px-4 py-3 text-left">Turma</th>
                <th className="px-4 py-3 text-left">Contacto</th>
                <th className="px-4 py-3 text-center w-24">Média</th>
                <th className="px-4 py-3 text-center w-28">Estado</th>
                <th className="px-4 py-3 text-center w-36">Acções</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-sm text-zinc-400"
                  >
                    Nenhum estudante encontrado.
                  </td>
                </tr>
              )}
              {filtered.map((e, idx) => {
                const { badge, dot } = STATUS_CONFIG[e.status];
                const isEven = idx % 2 === 1;
                return (
                  <tr
                    key={e.id}
                    className={cn(
                      "border-b border-zinc-100 hover:bg-zinc-50/60 transition-colors",
                      isEven ? "bg-[#f5c9a0]/15" : "bg-white",
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <AvatarInitials nome={e.nome} />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-zinc-800 uppercase leading-snug">
                            {e.nome}
                          </p>
                          <p className="text-[11px] text-zinc-400 truncate">
                            {e.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-xs font-mono font-semibold text-zinc-700">
                        {e.numeroProcesso}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold bg-zinc-100 text-zinc-600">
                        {e.turma}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-xs text-zinc-600">
                      {e.contacto}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {e.mediaGeral != null ? (
                        <span
                          className={cn(
                            "text-xs font-bold",
                            e.mediaGeral >= 10
                              ? "text-emerald-600"
                              : "text-red-500",
                          )}
                        >
                          {e.mediaGeral.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-xs text-zinc-300">---</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[11px] border inline-flex items-center gap-1.5",
                          badge,
                        )}
                      >
                        <span
                          className={cn("size-1.5 rounded-full shrink-0", dot)}
                        />
                        {STATUS_CONFIG[e.status].label}
                      </Badge>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          href={`/admin/estudantes/${e.id}`}
                          title="Ver perfil"
                          className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="size-3.5" />
                        </Link>
                        <button
                          onClick={() => handleEdit(e)}
                          title="Editar"
                          className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <button
                          onClick={() => onToggleStatus(e.id)}
                          title={
                            e.status === "activo" ? "Desactivar" : "Activar"
                          }
                          className={cn(
                            "flex size-7 items-center justify-center rounded-md transition-colors",
                            e.status === "activo"
                              ? "text-zinc-400 hover:bg-amber-50 hover:text-amber-600"
                              : "text-zinc-400 hover:bg-emerald-50 hover:text-emerald-600",
                          )}
                        >
                          {e.status === "activo" ? (
                            <PowerOff className="size-3.5" />
                          ) : (
                            <Power className="size-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => setConfirmDelete(e)}
                          title="Eliminar"
                          className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <EstudanteFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingEstudante(null);
        }}
        onSave={handleSave}
        estudante={editingEstudante}
        turmasDisponiveis={turmas}
        curso={curso}
      />

      <EstudanteDetailDialog
        estudante={detailEstudante}
        open={!!detailEstudante}
        onClose={() => setDetailEstudante(null)}
      />

      <Dialog
        open={!!confirmDelete}
        onOpenChange={(v) => !v && setConfirmDelete(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <Trash2 className="size-4" />
              Eliminar Estudante
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 flex flex-col gap-3">
            <p className="text-sm text-zinc-600">
              Tem a certeza que deseja eliminar permanentemente o estudante:
            </p>
            <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-4 py-3">
              <p className="text-sm font-bold text-zinc-800 uppercase">
                {confirmDelete?.nome}
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                {confirmDelete?.numeroProcesso}
              </p>
            </div>
            <p className="text-xs text-red-500 font-medium">
              ⚠ Esta acção não pode ser desfeita.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmDelete) {
                  onDelete(confirmDelete.id);
                  setConfirmDelete(null);
                }
              }}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
