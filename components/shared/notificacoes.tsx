"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  Calendar,
  FileText,
  AlertTriangle,
  Info,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificacaoTipo =
  | "exame"
  | "aviso"
  | "convocatoria"
  | "nota"
  | "informacao"
  | "sucesso";

export interface Notificacao {
  id: string;
  tipo: NotificacaoTipo;
  titulo: string;
  descricao: string;
  data: string;
  lida: boolean;
  link?: string;
}

const TIPO_CONFIG: Record<
  NotificacaoTipo,
  { icon: typeof Bell; class: string }
> = {
  exame: { icon: Calendar, class: "bg-blue-50 text-blue-700 border-blue-200" },
  aviso: {
    icon: AlertTriangle,
    class: "bg-amber-50 text-amber-700 border-amber-200",
  },
  convocatoria: {
    icon: Bell,
    class: "bg-purple-50 text-purple-700 border-purple-200",
  },
  nota: {
    icon: FileText,
    class: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  informacao: { icon: Info, class: "bg-sky-50 text-sky-700 border-sky-200" },
  sucesso: {
    icon: CheckCheck,
    class: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

export const NOTIFICACOES_MOCK: Notificacao[] = [
  {
    id: "n1",
    tipo: "exame",
    titulo: "Exame de Matemática",
    descricao:
      "O exame de Matemática do II Trimestre foi agendado para 18 de junho.",
    data: "2026-06-10",
    lida: false,
  },
  {
    id: "n2",
    tipo: "nota",
    titulo: "Notas Publicadas",
    descricao:
      "As notas do I Trimestre já se encontram disponíveis no boletim.",
    data: "2026-06-08",
    lida: false,
  },
  {
    id: "n3",
    tipo: "convocatoria",
    titulo: "Convocatória de Encarregados",
    descricao:
      "Reunião de encarregados de educação marcada para 24 de janeiro.",
    data: "2026-01-15",
    lida: true,
  },
  {
    id: "n4",
    tipo: "aviso",
    titulo: "Alteração de Horário",
    descricao: "A aula de Física de quarta-feira foi alterada para as 10:00.",
    data: "2026-06-05",
    lida: false,
  },
  {
    id: "n5",
    tipo: "informacao",
    titulo: "Olimpíadas de Matemática",
    descricao:
      "Inscrições abertas para a 5ª Edição das Olimpíadas de Matemática.",
    data: "2026-03-01",
    lida: true,
  },
  {
    id: "n6",
    tipo: "sucesso",
    titulo: "Material Submetido com Sucesso",
    descricao:
      "O seu material 'Relatório de Laboratório' foi submetido e aguarda aprovação.",
    data: "2026-06-07",
    lida: false,
  },
  {
    id: "n7",
    tipo: "exame",
    titulo: "Prazo de Inscrição",
    descricao:
      "O prazo para inscrição nos exames especiais termina em 15 de março.",
    data: "2026-03-01",
    lida: true,
  },
  {
    id: "n8",
    tipo: "aviso",
    titulo: "Manutenção do Sistema",
    descricao:
      "O sistema estará indisponível no sábado das 14:00 às 18:00 para manutenção.",
    data: "2026-06-12",
    lida: false,
  },
];

interface NotificacoesListProps {
  notificacoes: Notificacao[];
  onToggleLida: (id: string) => void;
}

export function NotificacoesList({
  notificacoes,
  onToggleLida,
}: NotificacoesListProps) {
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState<NotificacaoTipo | "todas">(
    "todas",
  );
  const [filterLida, setFilterLida] = useState<string>("todas");

  const filtered = notificacoes.filter((n) => {
    const matchSearch =
      n.titulo.toLowerCase().includes(search.toLowerCase()) ||
      n.descricao.toLowerCase().includes(search.toLowerCase());
    const matchTipo = filterTipo === "todas" || n.tipo === filterTipo;
    const matchLida =
      filterLida === "todas" || (filterLida === "lida" ? n.lida : !n.lida);
    return matchSearch && matchTipo && matchLida;
  });

  const lidas = notificacoes.filter((n) => n.lida).length;
  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
          <p className="text-2xl font-bold text-zinc-900">
            {notificacoes.length}
          </p>
          <p className="text-xs text-zinc-400 mt-0.5">Total</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
          <p className="text-2xl font-bold text-blue-600">{naoLidas}</p>
          <p className="text-xs text-zinc-400 mt-0.5">Não lidas</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
          <p className="text-2xl font-bold text-emerald-600">{lidas}</p>
          <p className="text-xs text-zinc-400 mt-0.5">Lidas</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
          <p className="text-2xl font-bold text-amber-600">
            {
              notificacoes.filter(
                (n) => n.tipo === "exame" || n.tipo === "aviso",
              ).length
            }
          </p>
          <p className="text-xs text-zinc-400 mt-0.5">Urgentes</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Pesquisar notificações..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-md border border-zinc-200 bg-white pl-9 pr-3 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={filterTipo}
            onChange={(e) =>
              setFilterTipo(e.target.value as NotificacaoTipo | "todas")
            }
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary/30"
          >
            <option value="todas">Todos os tipos</option>
            <option value="exame">Exames</option>
            <option value="aviso">Avisos</option>
            <option value="convocatoria">Convocações</option>
            <option value="nota">Notas</option>
            <option value="informacao">Informações</option>
            <option value="sucesso">Sucessos</option>
          </select>
          <select
            value={filterLida}
            onChange={(e) => setFilterLida(e.target.value)}
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary/30"
          >
            <option value="todas">Todos os estados</option>
            <option value="naolida">Não lidas</option>
            <option value="lida">Lidas</option>
          </select>
        </div>
      </div>

      <p className="text-xs text-zinc-400">
        {filtered.length} notificação{filtered.length !== 1 ? "ões" : ""}{" "}
        encontrada{filtered.length !== 1 ? "s" : ""}
        {filtered.length !== notificacoes.length &&
          ` de ${notificacoes.length}`}
      </p>

      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white px-6 py-12 text-center">
            <Bell className="size-8 text-zinc-300 mx-auto mb-3" />
            <p className="text-sm text-zinc-400">
              Nenhuma notificação encontrada.
            </p>
          </div>
        )}
        {filtered.map((n) => {
          const { icon: Icon, class: tipoClass } = TIPO_CONFIG[n.tipo];
          return (
            <div
              key={n.id}
              className={cn(
                "rounded-xl border border-zinc-200 bg-white px-5 py-4 flex items-start gap-4 transition-colors hover:bg-zinc-50/60",
                !n.lida && "border-l-4 border-l-primary",
              )}
            >
              <div
                className={cn("rounded-lg border p-2.5 shrink-0", tipoClass)}
              >
                <Icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      !n.lida ? "text-zinc-900" : "text-zinc-600",
                    )}
                  >
                    {n.titulo}
                  </p>
                  {!n.lida && (
                    <span className="size-1.5 rounded-full bg-primary shrink-0" />
                  )}
                </div>
                <p className="text-xs text-zinc-500 line-clamp-2">
                  {n.descricao}
                </p>
                <p className="text-[11px] text-zinc-400 mt-1">{n.data}</p>
              </div>
              <button
                onClick={() => onToggleLida(n.id)}
                className={cn(
                  "shrink-0 flex size-8 items-center justify-center rounded-md transition-colors",
                  n.lida
                    ? "text-zinc-300 hover:text-zinc-500"
                    : "text-primary hover:text-primary/70",
                )}
                title={n.lida ? "Marcar como não lida" : "Marcar como lida"}
              >
                <CheckCheck className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
