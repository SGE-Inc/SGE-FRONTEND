"use client";

import {
  LogIn, ClipboardList, FileText, Megaphone,
  Settings, BookOpen, CalendarDays, GraduationCap,
  Palmtree, Users, Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type AuditLog, type EventoAcademico, type LogTipo } from "./admin-dashboard-data";

// ── Audit Log ─────────────────────────────────────────────────────────────────

const LOG_CONFIG: Record<
  LogTipo,
  { icon: typeof LogIn; bg: string; text: string; label: string }
> = {
  login:     { icon: LogIn,         bg: "bg-blue-50",    text: "text-blue-600",   label: "Login" },
  matricula: { icon: GraduationCap, bg: "bg-primary/10", text: "text-primary",    label: "Matrícula" },
  nota:      { icon: FileText,      bg: "bg-emerald-50", text: "text-emerald-600",label: "Nota" },
  aviso:     { icon: Megaphone,     bg: "bg-amber-50",   text: "text-amber-600",  label: "Aviso" },
  config:    { icon: Settings,      bg: "bg-zinc-100",   text: "text-zinc-600",   label: "Config" },
  exame:     { icon: ClipboardList, bg: "bg-purple-50",  text: "text-purple-600", label: "Exame" },
};

const ROLE_BADGE: Record<AuditLog["role"], string> = {
  admin:     "bg-primary/10 text-primary border-primary/20",
  professor: "bg-blue-50 text-blue-700 border-blue-200",
  aluno:     "bg-zinc-100 text-zinc-600 border-zinc-200",
};

const ROLE_LABEL: Record<AuditLog["role"], string> = {
  admin: "Admin", professor: "Professor", aluno: "Aluno",
};

interface AuditLogProps { logs: AuditLog[] }

export function AuditLogCard({ logs }: AuditLogProps) {
  return (
    <Card className="rounded-xl border border-zinc-200 shadow-none">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-zinc-900">
          <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
          Últimos Logs de Actividade
        </CardTitle>
        <p className="text-xs text-zinc-400 mt-0.5">auditoria das últimas acções no sistema</p>
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-1 flex flex-col divide-y divide-zinc-100">
        {logs.map((log) => {
          const cfg = LOG_CONFIG[log.tipo];
          const Icon = cfg.icon;
          return (
            <div key={log.id} className="flex items-start gap-3 py-3">
              {/* Icon */}
              <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg mt-0.5", cfg.bg)}>
                <Icon className={cn("size-3.5", cfg.text)} />
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-800 leading-snug">{log.descricao}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-[10px] text-zinc-500 font-medium truncate">
                    {log.utilizador}
                  </span>
                  <span className="text-[10px] text-zinc-300">·</span>
                  <span className="text-[10px] text-zinc-400">{log.data} às {log.hora}</span>
                </div>
              </div>

              {/* Role badge */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <Badge variant="outline" className={cn("text-[10px] border", ROLE_BADGE[log.role])}>
                  {ROLE_LABEL[log.role]}
                </Badge>
                <span className={cn("text-[10px] font-medium", cfg.text)}>
                  {cfg.label}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

// ── Calendário Académico ──────────────────────────────────────────────────────

const EVENTO_CONFIG: Record<
  EventoAcademico["tipo"],
  { icon: typeof CalendarDays; bg: string; text: string; border: string }
> = {
  trimestre: { icon: BookOpen,      bg: "bg-primary/10", text: "text-primary",     border: "border-primary/20" },
  exame:     { icon: ClipboardList, bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200" },
  ferias:    { icon: Palmtree,      bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  reuniao:   { icon: Users,         bg: "bg-blue-50",    text: "text-blue-600",    border: "border-blue-200" },
  entrega:   { icon: Package,       bg: "bg-amber-50",   text: "text-amber-600",   border: "border-amber-200" },
};

// Sort by date
function parsePTDate(d: string) {
  const [day, month, year] = d.split("/").map(Number);
  return new Date(year, month - 1, day);
}

interface CalendarioProps { eventos: EventoAcademico[] }

export function CalendarioAcademicoCard({ eventos }: CalendarioProps) {
  const sorted = [...eventos].sort(
    (a, b) => parsePTDate(a.data).getTime() - parsePTDate(b.data).getTime()
  );

  // Group by month
  const byMonth: Record<string, EventoAcademico[]> = {};
  sorted.forEach((ev) => {
    const [, month, year] = ev.data.split("/");
    const key = `${month}/${year}`;
    if (!byMonth[key]) byMonth[key] = [];
    byMonth[key].push(ev);
  });

  const monthNames = [
    "", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  return (
    <Card className="rounded-xl border border-zinc-200 shadow-none">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-zinc-900">
          <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
          Calendário Académico
        </CardTitle>
        <p className="text-xs text-zinc-400 mt-0.5">eventos do ano lectivo 2025-2026</p>
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-1 flex flex-col gap-4">
        {Object.entries(byMonth).map(([key, evs]) => {
          const [month] = key.split("/");
          const monthName = monthNames[Number(month)];
          return (
            <div key={key}>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                {monthName}
              </p>
              <div className="flex flex-col gap-1.5">
                {evs.map((ev) => {
                  const cfg = EVENTO_CONFIG[ev.tipo];
                  const Icon = cfg.icon;
                  const [day] = ev.data.split("/");
                  return (
                    <div
                      key={ev.id}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border px-3 py-2.5",
                        cfg.bg, cfg.border
                      )}
                    >
                      {/* Day number */}
                      <div className="flex flex-col items-center shrink-0 w-8">
                        <span className={cn("text-lg font-bold leading-none", cfg.text)}>
                          {day}
                        </span>
                      </div>

                      <div className="w-px h-8 bg-current opacity-20 shrink-0" />

                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Icon className={cn("size-3.5 shrink-0", cfg.text)} />
                        <span className="text-xs font-medium text-zinc-800 truncate">
                          {ev.titulo}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}