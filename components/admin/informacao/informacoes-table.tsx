"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  Filter,
  Eye,
  EyeOff,
  Star,
  ImageIcon,
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
import { InformacaoFormDialog } from "./informacao-form-dialog";
import {
  type InformacaoItem,
  type InformacaoFormData,
  type EstadoInformacao,
  ESTADO_CONFIG,
  formatDate,
} from "./informacoes-data";

function InformacaoDetail({ info }: { info: InformacaoItem }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {info.imagemUrl && !imageError && (
        <div className="rounded-lg overflow-hidden border border-zinc-200">
          <img
            src={info.imagemUrl}
            alt={info.titulo}
            className="w-full h-48 object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className={cn("text-[11px] border", ESTADO_CONFIG[info.estado].class)}
        >
          {ESTADO_CONFIG[info.estado].label}
        </Badge>
        {info.importante && (
          <Badge
            variant="outline"
            className="text-[11px] border-amber-200 bg-amber-50 text-amber-700"
          >
            Importante
          </Badge>
        )}
        {info.hasIcon && (
          <Badge
            variant="outline"
            className="text-[11px] border-blue-200 bg-blue-50 text-blue-700"
          >
            Com ícone
          </Badge>
        )}
      </div>

      <div>
        <p className="text-xs text-zinc-400">Autor</p>
        <p className="text-sm font-semibold text-zinc-800">{info.autor}</p>
      </div>

      <div>
        <p className="text-xs text-zinc-400">Data de Publicação</p>
        <p className="text-sm font-semibold text-zinc-800">
          {formatDate(info.dataPublicacao)}
        </p>
      </div>

      <div>
        <p className="text-xs text-zinc-400">Descrição</p>
        <p className="text-sm text-zinc-700">{info.descricao}</p>
      </div>

      <div>
        <p className="text-xs text-zinc-400">Conteúdo</p>
        <div className="text-sm text-zinc-700 whitespace-pre-wrap rounded-lg bg-zinc-50 border border-zinc-100 p-4">
          {info.conteudo}
        </div>
      </div>

      {info.link && (
        <div>
          <p className="text-xs text-zinc-400">Link</p>
          <p className="text-sm text-primary font-medium">{info.link}</p>
        </div>
      )}
    </div>
  );
}

interface InformacoesTableProps {
  informacoes: InformacaoItem[];
  onAdd: (data: InformacaoFormData) => void;
  onEdit: (id: string, data: InformacaoFormData) => void;
  onDelete: (id: string) => void;
  onToggleEstado: (id: string) => void;
}

export function InformacoesTable({
  informacoes,
  onAdd,
  onEdit,
  onDelete,
  onToggleEstado,
}: InformacoesTableProps) {
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState<EstadoInformacao | "todos">(
    "todos",
  );
  const [filterImportante, setFilterImportante] = useState<string>("todas");

  const [formOpen, setFormOpen] = useState(false);
  const [editingInformacao, setEditingInformacao] =
    useState<InformacaoItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<InformacaoItem | null>(
    null,
  );
  const [detailInfo, setDetailInfo] = useState<InformacaoItem | null>(null);

  const filtered = useMemo(() => {
    return informacoes.filter((i) => {
      const matchSearch =
        i.titulo.toLowerCase().includes(search.toLowerCase()) ||
        i.descricao.toLowerCase().includes(search.toLowerCase()) ||
        i.autor.toLowerCase().includes(search.toLowerCase());
      const matchEstado = filterEstado === "todos" || i.estado === filterEstado;
      const matchImportante =
        filterImportante === "todas" ||
        (filterImportante === "sim" ? i.importante : !i.importante);
      return matchSearch && matchEstado && matchImportante;
    });
  }, [informacoes, search, filterEstado, filterImportante]);

  const handleEdit = (i: InformacaoItem) => {
    setEditingInformacao(i);
    setFormOpen(true);
  };

  const handleSave = (data: InformacaoFormData) => {
    if (editingInformacao) {
      onEdit(editingInformacao.id, data);
    } else {
      onAdd(data);
    }
    setFormOpen(false);
    setEditingInformacao(null);
  };

  const activeFiltersCount = [
    filterEstado !== "todos",
    filterImportante !== "todas",
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Pesquisar por título, descrição ou autor..."
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
                  {(["todos", "publicado", "rascunho"] as const).map((s) => (
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
                  Importante
                </p>
                <div className="flex flex-wrap gap-1">
                  {(["todas", "sim", "não"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setFilterImportante(v)}
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-semibold border transition-colors capitalize",
                        filterImportante === v
                          ? "bg-primary text-white border-primary"
                          : "text-zinc-500 border-zinc-200 hover:border-zinc-300",
                      )}
                    >
                      {v === "todas"
                        ? "Todos"
                        : v === "sim"
                          ? "Importante"
                          : "Normal"}
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
                      setFilterImportante("todas");
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
            setEditingInformacao(null);
            setFormOpen(true);
          }}
        >
          <Plus className="size-4" />
          Nova Informação
        </Button>
      </div>

      <p className="text-xs text-zinc-400">
        {filtered.length} informação{filtered.length !== 1 ? "ões" : ""}{" "}
        encontrada
        {filtered.length !== 1 ? "s" : ""}
        {filtered.length !== informacoes.length && ` de ${informacoes.length}`}
      </p>

      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm min-w-[900px]">
            <thead>
              <tr className="bg-primary text-white text-xs font-semibold">
                <th className="px-4 py-3 text-left">Título</th>
                <th className="px-4 py-3 text-left">Autor</th>
                <th className="px-4 py-3 text-left">Data</th>
                <th className="px-4 py-3 text-center w-20">Importante</th>
                <th className="px-4 py-3 text-center w-24">Estado</th>
                <th className="px-4 py-3 text-center w-44">Acções</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-zinc-400"
                  >
                    Nenhuma informação encontrada.
                  </td>
                </tr>
              )}
              {filtered.map((i, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <tr
                    key={i.id}
                    className={cn(
                      "border-b border-zinc-100 hover:bg-zinc-50/60 transition-colors",
                      isEven ? "bg-[#f5c9a0]/15" : "bg-white",
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {i.hasIcon && (
                          <ImageIcon className="size-3.5 text-zinc-400 shrink-0" />
                        )}
                        <p className="text-xs font-bold text-zinc-800">
                          {i.titulo}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-600">
                      {i.autor}
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-700">
                      {formatDate(i.dataPublicacao)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {i.importante ? (
                        <Star className="size-4 text-amber-500 fill-amber-500 mx-auto" />
                      ) : (
                        <Star className="size-4 text-zinc-200 mx-auto" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[11px] border",
                          ESTADO_CONFIG[i.estado].class,
                        )}
                      >
                        {ESTADO_CONFIG[i.estado].label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setDetailInfo(i)}
                          title="Visualizar"
                          className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="size-3.5" />
                        </button>
                        <button
                          onClick={() => handleEdit(i)}
                          title="Editar"
                          className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <button
                          onClick={() => onToggleEstado(i.id)}
                          title={
                            i.estado === "publicado"
                              ? "Marcar como rascunho"
                              : "Publicar"
                          }
                          className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                        >
                          {i.estado === "publicado" ? (
                            <EyeOff className="size-3.5" />
                          ) : (
                            <Eye className="size-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => setConfirmDelete(i)}
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

      <InformacaoFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingInformacao(null);
        }}
        onSave={handleSave}
        informacao={editingInformacao}
      />

      <Dialog
        open={!!detailInfo}
        onOpenChange={(v) => !v && setDetailInfo(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="size-4 text-primary" />
              {detailInfo?.titulo}
            </DialogTitle>
          </DialogHeader>
          {detailInfo && <InformacaoDetail info={detailInfo} />}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailInfo(null)}>
              Fechar
            </Button>
          </DialogFooter>
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
              Remover Informação
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 flex flex-col gap-3">
            <p className="text-sm text-zinc-600">
              Tem a certeza que deseja remover permanentemente a informação:
            </p>
            <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-4 py-3">
              <p className="text-sm font-bold text-zinc-800">
                {confirmDelete?.titulo}
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                {confirmDelete ? formatDate(confirmDelete.dataPublicacao) : ""}
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
