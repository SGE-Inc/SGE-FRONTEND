"use client";

import {
  ClipboardList,
  Users,
  Package,
  FileText,
  FileType2,
  Link2,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  type ProximoEvento,
  type MaterialPartilhado,
} from "./professor-dashboard-data";

// ── Proximos Eventos ──────────────────────────────────────────────────────────

const EVENTO_STYLES: Record<
  ProximoEvento["tipo"],
  { icon: typeof ClipboardList; color: string; badge: string }
> = {
  exame: {
    icon: ClipboardList,
    color: "text-red-500",
    badge: "bg-red-50 text-red-600 border-red-200",
  },
  reuniao: {
    icon: Users,
    color: "text-blue-500",
    badge: "bg-blue-50 text-blue-600 border-blue-200",
  },
  entrega: {
    icon: Package,
    color: "text-amber-500",
    badge: "bg-amber-50 text-amber-600 border-amber-200",
  },
};

const TIPO_LABELS: Record<ProximoEvento["tipo"], string> = {
  exame: "Exame",
  reuniao: "Reunião",
  entrega: "Entrega",
};

interface ProximosEventosProps {
  eventos: ProximoEvento[];
}

export function ProximosEventos({ eventos }: ProximosEventosProps) {
  return (
    <Card className="rounded-xl border border-zinc-200 shadow-none h-full">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-zinc-900">
          <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
          Próximos Eventos
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-1 flex flex-col divide-y divide-zinc-100">
        {eventos.map((ev, i) => {
          const style = EVENTO_STYLES[ev.tipo];
          const Icon = style.icon;
          return (
            <div key={i} className="flex items-start gap-3 py-3">
              <span
                className={cn(
                  "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-zinc-50",
                  style.color,
                )}
              >
                <Icon className="size-3.5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-zinc-800 leading-snug">
                  {ev.titulo}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-[10px] text-zinc-400">
                    <Calendar className="size-3" />
                    {ev.data}
                  </span>
                  <span className="text-[10px] text-zinc-400">·</span>
                  <span className="text-[10px] text-zinc-400">{ev.turma}</span>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn("text-[10px] shrink-0 border", style.badge)}
              >
                {TIPO_LABELS[ev.tipo]}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

// ── Materiais Partilhados ─────────────────────────────────────────────────────

const MATERIAL_ICONS: Record<MaterialPartilhado["tipo"], typeof FileText> = {
  pdf: FileText,
  doc: FileType2,
  link: Link2,
};

const MATERIAL_COLORS: Record<MaterialPartilhado["tipo"], string> = {
  pdf: "bg-red-50 text-red-500",
  doc: "bg-blue-50 text-blue-500",
  link: "bg-emerald-50 text-emerald-500",
};

interface MateriaisProps {
  materiais: MaterialPartilhado[];
}

export function MateriaisPartilhados({ materiais }: MateriaisProps) {
  return (
    <Card className="rounded-xl border border-zinc-200 shadow-none h-full">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-zinc-900">
          <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
          Últimos Materiais Partilhados
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-1 flex flex-col divide-y divide-zinc-100">
        {materiais.map((mat, i) => {
          const Icon = MATERIAL_ICONS[mat.tipo];
          return (
            <div key={i} className="flex items-center gap-3 py-3">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg",
                  MATERIAL_COLORS[mat.tipo],
                )}
              >
                <Icon className="size-4" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-zinc-800 truncate">
                  {mat.titulo}
                </p>
                <p className="text-[10px] text-zinc-400 mt-0.5">
                  {mat.disciplina} · {mat.turma} · {mat.data}
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase text-zinc-400 shrink-0">
                {mat.tipo}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
