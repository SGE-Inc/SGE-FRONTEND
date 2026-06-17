"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  Filter,
  Calendar,
  List,
  ClipboardList,
  ChevronRight,
  ChevronLeft,
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
import { ExameFormDialog } from "./exame-form-dialog";
import { ExameResultadosDialog } from "./exame-resultados-dialog";
import { ExameEpocas } from "./exame-epocas";
import {
  type ExameItem,
  type ExameFormData,
  type EstadoExame,
  type Trimestre,
  type TipoExame,
  type Curso,
  ESTADO_CONFIG,
  formatDate,
  formatDateShort,
} from "./exames-data";

function CalendarView({ exames }: { exames: ExameItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  const uniqueDates = useMemo(() => {
    const dates = new Set(exames.map((e) => e.data));
    return Array.from(dates).sort();
  }, [exames]);

  const timeSlots = useMemo(() => {
    const slots = new Set(exames.map((e) => e.hora));
    return Array.from(slots).sort();
  }, [exames]);

  const getExames = (data: string, hora: string) =>
    exames.filter((e) => e.data === data && e.hora === hora);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Calendar className="size-4 text-primary" />
        <p className="text-sm font-semibold text-primary">
          Calendário de Exames
        </p>
      </div>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex size-9 items-center justify-center rounded-full bg-zinc-700 text-white shadow-lg hover:bg-zinc-600 transition-colors"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex size-9 items-center justify-center rounded-full bg-zinc-700 text-white shadow-lg hover:bg-zinc-600 transition-colors"
          >
            <ChevronRight className="size-5" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="w-full overflow-x-auto rounded-lg border border-zinc-200 shadow-inner pb-2 p-1"
          style={{ scrollbarWidth: "thin" }}
        >
          <table className="w-full border-collapse text-sm overflow-hidden rounded-md">
            <thead>
              <tr className="bg-primary text-white text-center text-xs font-semibold">
                <th className="border border-primary/20 px-4 py-3 text-left min-w-[100px] sticky left-0 bg-primary z-10">
                  Horário
                </th>
                {uniqueDates.map((data) => (
                  <th
                    key={data}
                    className="border border-primary/20 px-3 py-3 min-w-[150px] whitespace-nowrap"
                  >
                    {formatDateShort(data)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((hora) => (
                <tr
                  key={hora}
                  className="border-b border-zinc-100 hover:bg-zinc-50/60 transition-colors"
                >
                  <td className="border border-zinc-200 px-4 py-3 text-xs font-semibold text-zinc-700 bg-white sticky left-0 z-10 whitespace-nowrap">
                    {hora}
                  </td>
                  {uniqueDates.map((data) => {
                    const exams = getExames(data, hora);
                    return (
                      <td
                        key={`${data}-${hora}`}
                        className={cn(
                          "border border-zinc-200 px-3 py-3 text-center text-xs min-w-[150px] align-top",
                          exams.length > 0 ? "bg-white" : "bg-zinc-50",
                        )}
                      >
                        {exams.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            {exams.map((ex) => (
                              <div
                                key={ex.id}
                                className={cn(
                                  "rounded-md px-2 py-1 text-[10px] font-semibold border",
                                  ex.estado === "agendado"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : ex.estado === "realizado"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : "bg-red-50 text-red-700 border-red-200",
                                )}
                              >
                                <p className="leading-tight">{ex.disciplina}</p>
                                <p className="text-[9px] opacity-70">
                                  {ex.turma} · {ex.sala}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {timeSlots.length === 0 && (
                <tr>
                  <td
                    colSpan={uniqueDates.length + 1}
                    className="px-4 py-10 text-center text-sm text-zinc-400"
                  >
                    Nenhum exame agendado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface ExamesTableProps {
  exames: ExameItem[];
  curso: Curso;
  disciplinas: string[];
  turmas: string[];
  onAdd: (data: ExameFormData) => void;
  onEdit: (id: string, data: ExameFormData) => void;
  onDelete: (id: string) => void;
  onToggleEstado: (id: string) => void;
}

export function ExamesTable({
  exames,
  curso,
  disciplinas,
  turmas,
  onAdd,
  onEdit,
  onDelete,
  onToggleEstado,
}: ExamesTableProps) {
  const [viewMode, setViewMode] = useState<"tabela" | "calendario">("tabela");
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState<EstadoExame | "todos">(
    "todos",
  );
  const [filterTrimestre, setFilterTrimestre] = useState<Trimestre | "todas">(
    "todas",
  );
  const [filterTipo, setFilterTipo] = useState<TipoExame | "todas">("todas");
  const [filterTurma, setFilterTurma] = useState<string>("todas");

  const [formOpen, setFormOpen] = useState(false);
  const [editingExame, setEditingExame] = useState<ExameItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<ExameItem | null>(null);
  const [resultadosOpen, setResultadosOpen] = useState(false);
  const [resultadosExame, setResultadosExame] = useState<ExameItem | null>(
    null,
  );

  const filtered = useMemo(() => {
    return exames.filter((e) => {
      const matchSearch =
        e.disciplina.toLowerCase().includes(search.toLowerCase()) ||
        e.turma.toLowerCase().includes(search.toLowerCase()) ||
        e.sala.toLowerCase().includes(search.toLowerCase());
      const matchEstado = filterEstado === "todos" || e.estado === filterEstado;
      const matchTrimestre =
        filterTrimestre === "todas" || e.trimestre === filterTrimestre;
      const matchTipo = filterTipo === "todas" || e.tipo === filterTipo;
      const matchTurma = filterTurma === "todas" || e.turma === filterTurma;
      return (
        matchSearch && matchEstado && matchTrimestre && matchTipo && matchTurma
      );
    });
  }, [exames, search, filterEstado, filterTrimestre, filterTipo, filterTurma]);

  const handleEdit = (e: ExameItem) => {
    setEditingExame(e);
    setFormOpen(true);
  };

  const handleSave = (data: ExameFormData) => {
    if (editingExame) {
      onEdit(editingExame.id, data);
    } else {
      onAdd(data);
    }
    setFormOpen(false);
    setEditingExame(null);
  };

  const handleResultados = (e: ExameItem) => {
    setResultadosExame(e);
    setResultadosOpen(true);
  };

  const activeFiltersCount = [
    filterEstado !== "todos",
    filterTrimestre !== "todas",
    filterTipo !== "todas",
    filterTurma !== "todas",
  ].filter(Boolean).length;

  const turmaOptions = useMemo(() => {
    return Array.from(new Set(exames.map((e) => e.turma))).sort();
  }, [exames]);

  return (
    <div className="flex flex-col gap-5">
      {/* View Toggle */}
      <div className="flex items-center gap-2 bg-zinc-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setViewMode("tabela")}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
            viewMode === "tabela"
              ? "bg-white text-zinc-800 shadow-sm"
              : "text-zinc-500 hover:text-zinc-700",
          )}
        >
          <List className="size-3.5" />
          Tabela
        </button>
        <button
          onClick={() => setViewMode("calendario")}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
            viewMode === "calendario"
              ? "bg-white text-zinc-800 shadow-sm"
              : "text-zinc-500 hover:text-zinc-700",
          )}
        >
          <Calendar className="size-3.5" />
          Calendário
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Pesquisar por disciplina, turma ou sala..."
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
                    ["todos", "agendado", "realizado", "cancelado"] as const
                  ).map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilterEstado(s)}
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-semibold border transition-colors capitalize",
                        filterEstado === s
                          ? "bg-primary text-white border-primary"
                          : "text-zinc-500 border-zinc-200 hover:border-zinc-300",
                      )}
                    >
                      {s === "todos" ? "Todos" : ESTADO_CONFIG[s].label}
                    </button>
                  ))}
                </div>
              </div>

              <DropdownMenuSeparator />

              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Trimestre
                </p>
                <div className="flex flex-wrap gap-1">
                  {(
                    [
                      "todas",
                      "I TRIMESTRE",
                      "II TRIMESTRE",
                      "III TRIMESTRE",
                    ] as const
                  ).map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilterTrimestre(t)}
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-semibold border transition-colors",
                        filterTrimestre === t
                          ? "bg-primary text-white border-primary"
                          : "text-zinc-500 border-zinc-200 hover:border-zinc-300",
                      )}
                    >
                      {t === "todas" ? "Todos" : t.replace(" TRIMESTRE", "º")}
                    </button>
                  ))}
                </div>
              </div>

              <DropdownMenuSeparator />

              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Tipo
                </p>
                <select
                  value={filterTipo}
                  onChange={(e) =>
                    setFilterTipo(e.target.value as TipoExame | "todas")
                  }
                  className="w-full rounded-md border border-zinc-200 px-2 py-1.5 text-xs text-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary/30"
                >
                  <option value="todas">Todos os tipos</option>
                  <option value="1ª PROVA">1ª Prova</option>
                  <option value="2ª PROVA">2ª Prova</option>
                  <option value="EXAME FINAL">Exame Final</option>
                  <option value="RECURSO">Recurso</option>
                </select>
              </div>

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
                  {turmaOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {activeFiltersCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <button
                    onClick={() => {
                      setFilterEstado("todos");
                      setFilterTrimestre("todas");
                      setFilterTipo("todas");
                      setFilterTurma("todas");
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

        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white gap-2"
          onClick={() => {
            setEditingExame(null);
            setFormOpen(true);
          }}
        >
          <Plus className="size-4" />
          Agendar Exame
        </Button>
      </div>

      <p className="text-xs text-zinc-400">
        {filtered.length} exame{filtered.length !== 1 ? "s" : ""} encontrado
        {filtered.length !== 1 ? "s" : ""}
        {filtered.length !== exames.length && ` de ${exames.length}`}
      </p>

      {/* Content */}
      {viewMode === "calendario" ? (
        <CalendarView exames={filtered} />
      ) : (
        <div className="rounded-xl border border-zinc-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm min-w-[950px]">
              <thead>
                <tr className="bg-primary text-white text-xs font-semibold">
                  <th className="px-4 py-3 text-left">Disciplina</th>
                  <th className="px-4 py-3 text-left">Turma</th>
                  <th className="px-4 py-3 text-left">Data</th>
                  <th className="px-4 py-3 text-center">Hora</th>
                  <th className="px-4 py-3 text-center">Sala</th>
                  <th className="px-4 py-3 text-left">Tipo</th>
                  <th className="px-4 py-3 text-center w-24">Estado</th>
                  <th className="px-4 py-3 text-center w-36">Acções</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-10 text-center text-sm text-zinc-400"
                    >
                      Nenhum exame encontrado.
                    </td>
                  </tr>
                )}
                {filtered.map((ex, idx) => {
                  const isEven = idx % 2 === 1;
                  return (
                    <tr
                      key={ex.id}
                      className={cn(
                        "border-b border-zinc-100 hover:bg-zinc-50/60 transition-colors",
                        isEven ? "bg-[#f5c9a0]/15" : "bg-white",
                      )}
                    >
                      <td className="px-4 py-3">
                        <p className="text-xs font-bold text-zinc-800">
                          {ex.disciplina}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold bg-zinc-100 text-zinc-600">
                          {ex.turma}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-zinc-700">
                        {formatDate(ex.data)}
                      </td>
                      <td className="px-4 py-3 text-xs text-zinc-600 text-center font-mono">
                        {ex.hora}
                      </td>
                      <td className="px-4 py-3 text-xs text-zinc-600 text-center">
                        {ex.sala}
                      </td>
                      <td className="px-4 py-3 text-xs text-zinc-700">
                        {ex.tipo}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[11px] border",
                            ESTADO_CONFIG[ex.estado].class,
                          )}
                        >
                          {ESTADO_CONFIG[ex.estado].label}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleResultados(ex)}
                            title="Lançar resultados"
                            className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                          >
                            <ClipboardList className="size-3.5" />
                          </button>
                          <button
                            onClick={() => handleEdit(ex)}
                            title="Editar"
                            className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
                          >
                            <Pencil className="size-3.5" />
                          </button>
                          <button
                            onClick={() => onToggleEstado(ex.id)}
                            title={
                              ex.estado === "agendado"
                                ? "Marcar realizado"
                                : "Reagendar"
                            }
                            className={cn(
                              "flex size-7 items-center justify-center rounded-md transition-colors",
                              "text-zinc-400 hover:bg-amber-50 hover:text-amber-600",
                            )}
                          >
                            <Calendar className="size-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDelete(ex)}
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
      )}

      {/* Épocas de Exame */}
      <ExameEpocas />

      {/* Form Dialog */}
      <ExameFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingExame(null);
        }}
        onSave={handleSave}
        exame={editingExame}
        disciplinas={disciplinas}
        turmas={turmas}
        curso={curso}
      />

      {/* Resultados Dialog */}
      <ExameResultadosDialog
        open={resultadosOpen}
        onClose={() => {
          setResultadosOpen(false);
          setResultadosExame(null);
        }}
        exame={resultadosExame}
      />

      {/* Confirm Delete Dialog */}
      <Dialog
        open={!!confirmDelete}
        onOpenChange={(v) => !v && setConfirmDelete(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <Trash2 className="size-4" />
              Remover Exame
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 flex flex-col gap-3">
            <p className="text-sm text-zinc-600">
              Tem a certeza que deseja remover permanentemente o exame:
            </p>
            <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-4 py-3">
              <p className="text-sm font-bold text-zinc-800">
                {confirmDelete?.disciplina}
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                {confirmDelete?.turma} ·{" "}
                {confirmDelete ? formatDate(confirmDelete.data) : ""} ·{" "}
                {confirmDelete?.hora}
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
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
