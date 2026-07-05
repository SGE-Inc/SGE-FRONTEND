"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  Filter,
  Send,
  Archive,
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
import { ConvocatoriaFormDialog } from "./convocatoria-form-dialog";
import {
  type ConvocatoriaItem,
  type ConvocatoriaFormData,
  type EstadoConvocatoria,
  type Trimestre,
  ESTADO_CONFIG,
  formatDate,
} from "./convocatorias-data";

function ConvocatoriaPreview({ c }: { c: ConvocatoriaItem }) {
  const [day, month, year] = c.dataRealizacao.split("-");
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  const weekdays = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];
  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const weekday = weekdays[dateObj.getDay()];
  const monthName = months[dateObj.getMonth()];
  const formattedDate = `${Number(day)} de ${monthName} de ${year}`;

  const [emisDay, emisMonth, emisYear] = c.dataEmissao.split("-");
  const emisMonthName = months[Number(emisMonth) - 1];
  const formattedEmissao = `${Number(emisDay)} de ${emisMonthName} de ${emisYear}`;

  return (
    <div className="flex justify-center py-4">
      <div
        className="w-full max-w-[520px] rounded border border-zinc-300 bg-white px-10 py-8 shadow-sm"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-[72px] rounded-full border-2 border-zinc-400 flex items-center justify-center bg-zinc-50 overflow-hidden shrink-0">
              <svg viewBox="0 0 72 72" width="72" height="72">
                <circle
                  cx="36"
                  cy="36"
                  r="34"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                />
                <circle
                  cx="36"
                  cy="36"
                  r="26"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <text
                  x="36"
                  y="30"
                  textAnchor="middle"
                  fontSize="5.5"
                  fill="#6b7280"
                  fontWeight="bold"
                >
                  INSTITUTO
                </text>
                <text
                  x="36"
                  y="37"
                  textAnchor="middle"
                  fontSize="5"
                  fill="#6b7280"
                >
                  POLITÉCNICO
                </text>
                <text
                  x="36"
                  y="44"
                  textAnchor="middle"
                  fontSize="4.5"
                  fill="#6b7280"
                >
                  INDUSTRIAL
                </text>
                <text
                  x="36"
                  y="51"
                  textAnchor="middle"
                  fontSize="4.5"
                  fill="#6b7280"
                >
                  DE LUANDA
                </text>
                <text
                  x="36"
                  y="22"
                  textAnchor="middle"
                  fontSize="4"
                  fill="#9ca3af"
                >
                  Gabinete do Director
                </text>
              </svg>
            </div>
            <div className="size-[64px] rounded-full border-2 border-zinc-300 flex items-center justify-center bg-zinc-50 overflow-hidden shrink-0">
              <svg viewBox="0 0 64 64" width="64" height="64">
                <circle
                  cx="32"
                  cy="32"
                  r="30"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                />
                <rect
                  x="18"
                  y="20"
                  width="28"
                  height="20"
                  rx="2"
                  fill="none"
                  stroke="#D2691E"
                  strokeWidth="1.5"
                />
                <rect
                  x="22"
                  y="24"
                  width="8"
                  height="6"
                  rx="1"
                  fill="#D2691E"
                  opacity="0.6"
                />
                <rect
                  x="34"
                  y="24"
                  width="8"
                  height="6"
                  rx="1"
                  fill="#D2691E"
                  opacity="0.4"
                />
                <rect
                  x="22"
                  y="32"
                  width="20"
                  height="4"
                  rx="1"
                  fill="#D2691E"
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>
          <div className="text-right text-sm">
            <span className="text-zinc-600">TURMA: </span>
            <span className="font-bold text-zinc-900">{c.turma}</span>
          </div>
        </div>

        <div className="text-center mb-1">
          <p className="text-xs font-semibold text-primary tracking-wide uppercase">
            Instituto Politécnico Industrial de Luanda
          </p>
          <p className="text-xs text-zinc-600 uppercase tracking-wide">
            (Gabinete do Director)
          </p>
        </div>

        <p className="text-center text-sm font-bold text-zinc-900 my-3 tracking-widest uppercase">
          Convocatória
        </p>

        <div className="text-[12.5px] text-zinc-800 leading-relaxed text-justify space-y-3">
          <p>
            A Direcção do Instituto Politécnico Industrial de Luanda
            supracitada, vem por intermédio desta convocar{" "}
            {c.destinatarios.toLowerCase()} da turma <strong>{c.turma}</strong>{" "}
            para {c.titulo.toLowerCase()} a ter lugar no dia{" "}
            <strong>{formattedDate}</strong>, {weekday}, das{" "}
            <strong>{c.hora}</strong> na sala <strong>{c.sala}</strong> desta
            instituição de ensino com a seguinte agenda:
          </p>

          <ul className="space-y-0.5 pl-2">
            {c.agenda.map((item, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-zinc-600 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="font-bold">
            Instituto Politécnico Industrial de Luanda, aos {formattedEmissao}
          </p>

          <p className="text-[11.5px] text-zinc-600">
            Obs.: A direcção da escola declina qualquer responsabilidade
            decorrente da não comparência do(a) convocado(a).
          </p>
        </div>
      </div>
    </div>
  );
}

function StatsBar({ convocatorias }: { convocatorias: ConvocatoriaItem[] }) {
  const total = convocatorias.length;
  const emitidas = convocatorias.filter((c) => c.estado === "emitida").length;
  const rascunhos = convocatorias.filter((c) => c.estado === "rascunho").length;
  const arquivadas = convocatorias.filter(
    (c) => c.estado === "arquivada",
  ).length;

  const items = [
    { label: "Total", value: total, color: "text-zinc-900" },
    { label: "Emitidas", value: emitidas, color: "text-emerald-600" },
    { label: "Rascunhos", value: rascunhos, color: "text-amber-600" },
    { label: "Arquivadas", value: arquivadas, color: "text-blue-600" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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

interface ConvocatoriasTableProps {
  convocatorias: ConvocatoriaItem[];
  onAdd: (data: ConvocatoriaFormData) => void;
  onEdit: (id: string, data: ConvocatoriaFormData) => void;
  onDelete: (id: string) => void;
  onToggleEstado: (id: string) => void;
}

export function ConvocatoriasTable({
  convocatorias,
  onAdd,
  onEdit,
  onDelete,
  onToggleEstado,
}: ConvocatoriasTableProps) {
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState<
    EstadoConvocatoria | "todos"
  >("todos");
  const [filterTrimestre, setFilterTrimestre] = useState<Trimestre | "todas">(
    "todas",
  );
  const [previewId, setPreviewId] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingConvocatoria, setEditingConvocatoria] =
    useState<ConvocatoriaItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<ConvocatoriaItem | null>(
    null,
  );

  const filtered = useMemo(() => {
    return convocatorias.filter((c) => {
      const matchSearch =
        c.titulo.toLowerCase().includes(search.toLowerCase()) ||
        c.turma.toLowerCase().includes(search.toLowerCase()) ||
        c.destinatarios.toLowerCase().includes(search.toLowerCase());
      const matchEstado = filterEstado === "todos" || c.estado === filterEstado;
      const matchTrimestre =
        filterTrimestre === "todas" || c.trimestre === filterTrimestre;
      return matchSearch && matchEstado && matchTrimestre;
    });
  }, [convocatorias, search, filterEstado, filterTrimestre]);

  const handleEdit = (c: ConvocatoriaItem) => {
    setEditingConvocatoria(c);
    setFormOpen(true);
  };

  const handleSave = (data: ConvocatoriaFormData) => {
    if (editingConvocatoria) {
      onEdit(editingConvocatoria.id, data);
    } else {
      onAdd(data);
    }
    setFormOpen(false);
    setEditingConvocatoria(null);
  };

  const activeFiltersCount = [
    filterEstado !== "todos",
    filterTrimestre !== "todas",
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col gap-5">
      <StatsBar convocatorias={convocatorias} />

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Pesquisar por título, turma ou destinatário..."
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
                  {(["todos", "rascunho", "emitida", "arquivada"] as const).map(
                    (s) => (
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
                    ),
                  )}
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

              {activeFiltersCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <button
                    onClick={() => {
                      setFilterEstado("todos");
                      setFilterTrimestre("todas");
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
            setEditingConvocatoria(null);
            setFormOpen(true);
          }}
        >
          <Plus className="size-4" />
          Nova Convocatória
        </Button>
      </div>

      <p className="text-xs text-zinc-400">
        {filtered.length} convocatória{filtered.length !== 1 ? "s" : ""}{" "}
        encontrada
        {filtered.length !== 1 ? "s" : ""}
        {filtered.length !== convocatorias.length &&
          ` de ${convocatorias.length}`}
      </p>

      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm min-w-[950px]">
            <thead>
              <tr className="bg-primary text-white text-xs font-semibold">
                <th className="px-4 py-3 text-left">Título</th>
                <th className="px-4 py-3 text-left">Turma</th>
                <th className="px-4 py-3 text-left">Data de Realização</th>
                <th className="px-4 py-3 text-left">Trimestre</th>
                <th className="px-4 py-3 text-left">Destinatários</th>
                <th className="px-4 py-3 text-center w-24">Estado</th>
                <th className="px-4 py-3 text-center w-44">Acções</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-sm text-zinc-400"
                  >
                    Nenhuma convocatória encontrada.
                  </td>
                </tr>
              )}
              {filtered.map((c, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <tr
                    key={c.id}
                    className={cn(
                      "border-b border-zinc-100 hover:bg-zinc-50/60 transition-colors",
                      isEven ? "bg-[#f5c9a0]/15" : "bg-white",
                    )}
                  >
                    <td className="px-4 py-3">
                      <p className="text-xs font-bold text-zinc-800">
                        {c.titulo}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold bg-zinc-100 text-zinc-600">
                        {c.turma}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-700">
                      {formatDate(c.dataRealizacao)}
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-600">
                      {c.trimestre.replace(" TRIMESTRE", "º")}
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-600">
                      {c.destinatarios}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[11px] border",
                          ESTADO_CONFIG[c.estado].class,
                        )}
                      >
                        {ESTADO_CONFIG[c.estado].label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() =>
                            setPreviewId(previewId === c.id ? null : c.id)
                          }
                          title="Pré-visualizar"
                          className={cn(
                            "flex size-7 items-center justify-center rounded-md transition-colors",
                            previewId === c.id
                              ? "bg-primary/10 text-primary"
                              : "text-zinc-400 hover:bg-blue-50 hover:text-blue-600",
                          )}
                        >
                          <Eye className="size-3.5" />
                        </button>
                        <button
                          onClick={() => handleEdit(c)}
                          title="Editar"
                          className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <button
                          onClick={() => onToggleEstado(c.id)}
                          title={
                            c.estado === "rascunho"
                              ? "Emitir"
                              : c.estado === "emitida"
                                ? "Arquivar"
                                : "Reabrir"
                          }
                          className={cn(
                            "flex size-7 items-center justify-center rounded-md transition-colors",
                            "text-zinc-400 hover:bg-amber-50 hover:text-amber-600",
                          )}
                        >
                          {c.estado === "rascunho" ? (
                            <Send className="size-3.5" />
                          ) : c.estado === "emitida" ? (
                            <Archive className="size-3.5" />
                          ) : (
                            <Send className="size-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => setConfirmDelete(c)}
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

      {previewId && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
              Pré-visualização
            </p>
            <button
              onClick={() => setPreviewId(null)}
              className="text-xs text-zinc-400 hover:text-zinc-700"
            >
              Fechar
            </button>
          </div>
          <ConvocatoriaPreview
            c={convocatorias.find((c) => c.id === previewId)!}
          />
        </div>
      )}

      <ConvocatoriaFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingConvocatoria(null);
        }}
        onSave={handleSave}
        convocatoria={editingConvocatoria}
      />

      <Dialog
        open={!!confirmDelete}
        onOpenChange={(v) => !v && setConfirmDelete(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <Trash2 className="size-4" />
              Remover Convocatória
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 flex flex-col gap-3">
            <p className="text-sm text-zinc-600">
              Tem a certeza que deseja remover permanentemente a convocatória:
            </p>
            <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-4 py-3">
              <p className="text-sm font-bold text-zinc-800">
                {confirmDelete?.titulo}
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                {confirmDelete?.turma} ·{" "}
                {confirmDelete ? formatDate(confirmDelete.dataRealizacao) : ""}
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
