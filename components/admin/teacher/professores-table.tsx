"use client";

import { useState, useMemo } from "react";
import {
  Search, Plus, Download, Upload,
  Pencil, Trash2, PowerOff, Power,
  ChevronDown, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ProfessorFormDialog } from "./professor-form-dialog";
import {
  type Professor, type ProfessorFormData,
  type StatusProfessor, type Curso,
  STATUS_CONFIG,
} from "./professores-data";

// ── Avatar initials ───────────────────────────────────────────────────────────
function AvatarInitials({ nome }: { nome: string }) {
  const parts = nome.trim().split(" ").filter(Boolean);
  const initials = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : parts[0]?.slice(0, 2) ?? "?";
  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
      {initials}
    </div>
  );
}

// ── Stats bar ─────────────────────────────────────────────────────────────────
function StatsBar({ professores }: { professores: Professor[] }) {
  const total    = professores.length;
  const activos  = professores.filter((p) => p.status === "activo").length;
  const inactivos= professores.filter((p) => p.status === "inactivo").length;
  const licenca  = professores.filter((p) => p.status === "licenca").length;
  const turmas   = new Set(professores.flatMap((p) => p.turmas)).size;

  const items = [
    { label: "Total",    value: total,    color: "text-zinc-900" },
    { label: "Activos",  value: activos,  color: "text-emerald-600" },
    { label: "Inactivos",value: inactivos,color: "text-zinc-400" },
    { label: "Licença",  value: licenca,  color: "text-amber-600" },
    { label: "Turmas",   value: turmas,   color: "text-primary" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {items.map(({ label, value, color }) => (
        <div key={label} className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
          <p className={cn("text-2xl font-bold", color)}>{value}</p>
          <p className="text-xs text-zinc-400 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface ProfessoresTableProps {
  professores: Professor[];
  curso: Curso;
  disciplinas: string[];
  turmas: string[];
  onAdd:    (data: ProfessorFormData) => void;
  onEdit:   (id: string, data: ProfessorFormData) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function ProfessoresTable({
  professores, curso, disciplinas, turmas,
  onAdd, onEdit, onDelete, onToggleStatus,
}: ProfessoresTableProps) {
  // Filters
  const [search, setSearch]               = useState("");
  const [filterStatus, setFilterStatus]   = useState<StatusProfessor | "todos">("todos");
  const [filterDisciplina, setFilterDisciplina] = useState<string>("todas");
  const [filterTurma, setFilterTurma]     = useState<string>("todas");

  // Dialog state
  const [formOpen, setFormOpen]           = useState(false);
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Professor | null>(null);

  // Filtered list
  const filtered = useMemo(() => {
    return professores.filter((p) => {
      const matchSearch =
        p.nome.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "todos" || p.status === filterStatus;
      const matchDisc   = filterDisciplina === "todas" || p.disciplinas.includes(filterDisciplina);
      const matchTurma  = filterTurma === "todas" || p.turmas.includes(filterTurma);
      return matchSearch && matchStatus && matchDisc && matchTurma;
    });
  }, [professores, search, filterStatus, filterDisciplina, filterTurma]);

  const handleEdit = (p: Professor) => {
    setEditingProfessor(p);
    setFormOpen(true);
  };

  const handleSave = (data: ProfessorFormData) => {
    if (editingProfessor) {
      onEdit(editingProfessor.id, data);
    } else {
      onAdd(data);
    }
    setFormOpen(false);
    setEditingProfessor(null);
  };

  // CSV export
  const handleExport = () => {
    const header = "Nome,Email,Contacto,Disciplinas,Turmas,Status\n";
    const rows = professores.map((p) =>
      `"${p.nome}","${p.email}","${p.contacto}","${p.disciplinas.join("; ")}","${p.turmas.join("; ")}","${p.status}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `professores-${curso.toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeFiltersCount = [
    filterStatus !== "todos",
    filterDisciplina !== "todas",
    filterTurma !== "todas",
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col gap-5">
      {/* Stats */}
      <StatsBar professores={professores} />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Left: search + filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Pesquisar por nome ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-md border border-zinc-200 bg-white pl-9 pr-3 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>

          {/* Filter dropdown */}
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
            <DropdownMenuContent align="start" className="w-56 p-3 flex flex-col gap-3">
              {/* Status filter */}
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">Estado</p>
                <div className="flex flex-wrap gap-1">
                  {(["todos", "activo", "inactivo", "licenca"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-semibold border transition-colors capitalize",
                        filterStatus === s
                          ? "bg-primary text-white border-primary"
                          : "text-zinc-500 border-zinc-200 hover:border-zinc-300"
                      )}
                    >
                      {s === "todos" ? "Todos" : STATUS_CONFIG[s].label}
                    </button>
                  ))}
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Disciplina filter */}
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">Disciplina</p>
                <select
                  value={filterDisciplina}
                  onChange={(e) => setFilterDisciplina(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2 py-1.5 text-xs text-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary/30"
                >
                  <option value="todas">Todas as disciplinas</option>
                  {disciplinas.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Turma filter */}
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">Turma</p>
                <select
                  value={filterTurma}
                  onChange={(e) => setFilterTurma(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2 py-1.5 text-xs text-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary/30"
                >
                  <option value="todas">Todas as turmas</option>
                  {turmas.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {activeFiltersCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <button
                    onClick={() => { setFilterStatus("todos"); setFilterDisciplina("todas"); setFilterTurma("todas"); }}
                    className="text-xs text-red-500 hover:text-red-700 text-left font-medium"
                  >
                    Limpar filtros
                  </button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={handleExport}>
            <Download className="size-3.5" />
            Exportar CSV
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="size-3.5" />
            Importar
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white gap-2"
            onClick={() => { setEditingProfessor(null); setFormOpen(true); }}
          >
            <Plus className="size-4" />
            Novo Professor
          </Button>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-zinc-400">
        {filtered.length} professor{filtered.length !== 1 ? "es" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        {filtered.length !== professores.length && ` de ${professores.length}`}
      </p>

      {/* Table */}
      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm min-w-[800px]">
            <thead>
              <tr className="bg-primary text-white text-xs font-semibold">
                <th className="px-4 py-3 text-left">Professor</th>
                <th className="px-4 py-3 text-left">Contacto</th>
                <th className="px-4 py-3 text-left">Disciplinas</th>
                <th className="px-4 py-3 text-left">Turmas</th>
                <th className="px-4 py-3 text-center w-28">Estado</th>
                <th className="px-4 py-3 text-center w-32">Acções</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-zinc-400">
                    Nenhum professor encontrado.
                  </td>
                </tr>
              )}
              {filtered.map((p, idx) => {
                const { badge, dot } = STATUS_CONFIG[p.status];
                const isEven = idx % 2 === 1;
                return (
                  <tr
                    key={p.id}
                    className={cn(
                      "border-b border-zinc-100 hover:bg-zinc-50/60 transition-colors",
                      isEven ? "bg-[#f5c9a0]/15" : "bg-white"
                    )}
                  >
                    {/* Professor */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <AvatarInitials nome={p.nome} />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-zinc-800 uppercase leading-snug">
                            {p.nome}
                          </p>
                          <p className="text-[11px] text-zinc-400 truncate">{p.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contacto */}
                    <td className="px-4 py-3 text-xs text-zinc-600">{p.contacto}</td>

                    {/* Disciplinas */}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.disciplinas.map((d) => (
                          <Badge
                            key={d}
                            variant="outline"
                            className="text-[10px] bg-primary/5 text-primary border-primary/20 font-medium"
                          >
                            {d}
                          </Badge>
                        ))}
                      </div>
                    </td>

                    {/* Turmas */}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.turmas.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold bg-zinc-100 text-zinc-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 text-center">
                      <Badge
                        variant="outline"
                        className={cn("text-[11px] border inline-flex items-center gap-1.5", badge)}
                      >
                        <span className={cn("size-1.5 rounded-full shrink-0", dot)} />
                        {STATUS_CONFIG[p.status].label}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        {/* Edit */}
                        <button
                          onClick={() => handleEdit(p)}
                          title="Editar"
                          className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
                        >
                          <Pencil className="size-3.5" />
                        </button>

                        {/* Toggle status */}
                        <button
                          onClick={() => onToggleStatus(p.id)}
                          title={p.status === "activo" ? "Desactivar" : "Activar"}
                          className={cn(
                            "flex size-7 items-center justify-center rounded-md transition-colors",
                            p.status === "activo"
                              ? "text-zinc-400 hover:bg-amber-50 hover:text-amber-600"
                              : "text-zinc-400 hover:bg-emerald-50 hover:text-emerald-600"
                          )}
                        >
                          {p.status === "activo" ? <PowerOff className="size-3.5" /> : <Power className="size-3.5" />}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setConfirmDelete(p)}
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

      {/* Form Dialog */}
      <ProfessorFormDialog
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingProfessor(null); }}
        onSave={handleSave}
        professor={editingProfessor}
        disciplinasDisponiveis={disciplinas}
        turmasDisponiveis={turmas}
      />

      {/* Confirm Delete Dialog */}
      <Dialog open={!!confirmDelete} onOpenChange={(v) => !v && setConfirmDelete(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <Trash2 className="size-4" />
              Eliminar Professor
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 flex flex-col gap-3">
            <p className="text-sm text-zinc-600">
              Tem a certeza que deseja eliminar permanentemente o professor:
            </p>
            <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-4 py-3">
              <p className="text-sm font-bold text-zinc-800 uppercase">{confirmDelete?.nome}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{confirmDelete?.email}</p>
            </div>
            <p className="text-xs text-red-500 font-medium">
              ⚠ Esta acção não pode ser desfeita.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancelar</Button>
            <Button
              variant="destructive"
              onClick={() => { if (confirmDelete) { onDelete(confirmDelete.id); setConfirmDelete(null); } }}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}