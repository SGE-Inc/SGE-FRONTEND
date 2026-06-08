"use client";

import { useState } from "react";
import { Plus, Calendar, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EXAMES_LISTA,
  type ExameItem,
  type Trimestre,
  formatDate,
} from "./professor-data";

const estadoLabel: Record<string, { label: string; class: string }> = {
  agendado: { label: "Agendado", class: "bg-blue-100 text-blue-700" },
  realizado: { label: "Realizado", class: "bg-emerald-100 text-emerald-700" },
  cancelado: { label: "Cancelado", class: "bg-red-100 text-red-700" },
};

export function ProfessorExames() {
  const [exames, setExames] = useState(EXAMES_LISTA);
  const [createOpen, setCreateOpen] = useState(false);
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [filterTrimestre, setFilterTrimestre] = useState<string>("todos");

  const [novaDisciplina, setNovaDisciplina] = useState("Matemática");
  const [novaTurma, setNovaTurma] = useState("QI10B");
  const [novaData, setNovaData] = useState("");
  const [novaHora, setNovaHora] = useState("");
  const [novaSala, setNovaSala] = useState("");
  const [novoTipo, setNovoTipo] = useState<ExameItem["tipo"]>("1ª PROVA");
  const [novoTrimestre, setNovoTrimestre] = useState<Trimestre>("II TRIMESTRE");

  const filtered = exames.filter((e) => {
    if (filterEstado !== "todos" && e.estado !== filterEstado) return false;
    if (filterTrimestre !== "todos" && e.trimestre !== filterTrimestre)
      return false;
    return true;
  });

  const handleCreate = () => {
    if (!novaData || !novaHora || !novaSala) return;
    const novo: ExameItem = {
      id: `e${Date.now()}`,
      disciplina: novaDisciplina,
      turma: novaTurma,
      data: novaData,
      hora: novaHora,
      sala: novaSala,
      tipo: novoTipo,
      trimestre: novoTrimestre,
      estado: "agendado",
    };
    setExames([novo, ...exames]);
    setCreateOpen(false);
    setNovaData("");
    setNovaHora("");
    setNovaSala("");
  };

  const agendados = exames.filter((e) => e.estado === "agendado").length;
  const realizados = exames.filter((e) => e.estado === "realizado").length;
  const taxaAprov =
    realizados > 0
      ? Math.round(
          (exames.filter((e) => e.estado === "realizado").length /
            exames.length) *
            100,
        )
      : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3 flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <Calendar className="size-5" />
          </div>
          <div>
            <p className="text-xs text-zinc-500">Agendados</p>
            <p className="text-xl font-bold text-zinc-900">{agendados}</p>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3 flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <Calendar className="size-5" />
          </div>
          <div>
            <p className="text-xs text-zinc-500">Realizados</p>
            <p className="text-xl font-bold text-zinc-900">{realizados}</p>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3 flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
            <Filter className="size-5" />
          </div>
          <div>
            <p className="text-xs text-zinc-500">Taxa de Realização</p>
            <p className="text-xl font-bold text-zinc-900">{taxaAprov}%</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Select value={filterEstado} onValueChange={setFilterEstado}>
            <SelectTrigger className="w-36 bg-white">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="agendado">Agendados</SelectItem>
              <SelectItem value="realizado">Realizados</SelectItem>
              <SelectItem value="cancelado">Cancelados</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterTrimestre} onValueChange={setFilterTrimestre}>
            <SelectTrigger className="w-40 bg-white">
              <SelectValue placeholder="Trimestre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="I TRIMESTRE">I TRIMESTRE</SelectItem>
              <SelectItem value="II TRIMESTRE">II TRIMESTRE</SelectItem>
              <SelectItem value="III TRIMESTRE">III TRIMESTRE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="size-4" />
          Novo Exame
        </Button>
      </div>

      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-primary text-white text-left text-xs font-semibold uppercase tracking-wide">
                <th className="px-4 py-3 border border-primary/30">
                  Disciplina
                </th>
                <th className="px-4 py-3 border border-primary/30 text-center">
                  Turma
                </th>
                <th className="px-4 py-3 border border-primary/30">Data</th>
                <th className="px-4 py-3 border border-primary/30 text-center">
                  Hora
                </th>
                <th className="px-4 py-3 border border-primary/30 text-center">
                  Sala
                </th>
                <th className="px-4 py-3 border border-primary/30">Tipo</th>
                <th className="px-4 py-3 border border-primary/30">
                  Trimestre
                </th>
                <th className="px-4 py-3 border border-primary/30 text-center">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((exame, idx) => (
                <tr
                  key={exame.id}
                  className={cn(
                    "border-b border-zinc-100",
                    idx % 2 === 1 && "bg-[#f5c9a0]/40",
                  )}
                >
                  <td className="px-4 py-3 text-sm font-semibold text-zinc-800 border border-zinc-200">
                    {exame.disciplina}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-600 text-center border border-zinc-200">
                    {exame.turma}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-700 border border-zinc-200">
                    {formatDate(exame.data)}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-600 text-center border border-zinc-200">
                    {exame.hora}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-600 text-center border border-zinc-200">
                    {exame.sala}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-700 border border-zinc-200">
                    {exame.tipo}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-600 border border-zinc-200">
                    {exame.trimestre}
                  </td>
                  <td className="px-4 py-3 text-center border border-zinc-200">
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                        estadoLabel[exame.estado].class,
                      )}
                    >
                      {estadoLabel[exame.estado].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <Calendar className="size-8 text-zinc-300 mb-2" />
            <p className="text-sm text-zinc-500">Nenhum exame encontrado.</p>
          </div>
        )}
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agendar Novo Exame</DialogTitle>
            <DialogDescription>
              Preencha os dados para criar um novo exame.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">
                Disciplina
              </label>
              <select
                value={novaDisciplina}
                onChange={(e) => setNovaDisciplina(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option>Matemática</option>
                <option>Física</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">Turma</label>
              <select
                value={novaTurma}
                onChange={(e) => setNovaTurma(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option>QI10B</option>
                <option>QI11A</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">Data</label>
              <Input
                type="date"
                value={novaData}
                onChange={(e) => setNovaData(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">Hora</label>
              <Input
                type="time"
                value={novaHora}
                onChange={(e) => setNovaHora(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">Sala</label>
              <Input
                value={novaSala}
                onChange={(e) => setNovaSala(e.target.value)}
                placeholder="Ex: Sala 201"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">Tipo</label>
              <select
                value={novoTipo}
                onChange={(e) =>
                  setNovoTipo(e.target.value as ExameItem["tipo"])
                }
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option>1ª PROVA</option>
                <option>2ª PROVA</option>
                <option>EXAME FINAL</option>
                <option>RECURSO</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">
                Trimestre
              </label>
              <select
                value={novoTrimestre}
                onChange={(e) => setNovoTrimestre(e.target.value as Trimestre)}
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option>I TRIMESTRE</option>
                <option>II TRIMESTRE</option>
                <option>III TRIMESTRE</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!novaData || !novaHora || !novaSala}
            >
              Agendar Exame
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
