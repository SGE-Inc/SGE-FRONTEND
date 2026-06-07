"use client";

import {
  BookOpen,
  Users,
  Clock,
  TrendingUp,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DASHBOARD_STATS,
  PROXIMOS_EVENTOS,
  PROFESSOR_MATERIAIS,
} from "./professor-data";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
  });
}

export function ProfessorDashboard() {
  const stats = DASHBOARD_STATS;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Total de Aulas
            </CardTitle>
            <BookOpen className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-zinc-900">
              {stats.totalAulas}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {stats.totalHoras}h lectivas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Estudantes
            </CardTitle>
            <Users className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-zinc-900">
              {stats.estudantes}
            </p>
            <p className="text-xs text-zinc-500 mt-1">{stats.turmas} turmas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Média Geral
            </CardTitle>
            <TrendingUp className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-zinc-900">
              {stats.mediaGeral}/20
            </p>
            <p className="text-xs text-emerald-600 mt-1">Bom desempenho</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Horas Lectivas
            </CardTitle>
            <Clock className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-zinc-900">
              {stats.totalHoras}h
            </p>
            <p className="text-xs text-zinc-500 mt-1">Este mês</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-4" />
              Próximos Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {PROXIMOS_EVENTOS.map((evento) => (
                <div
                  key={evento.titulo}
                  className="flex items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2.5"
                >
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold ${
                      evento.tipo === "exame"
                        ? "bg-red-500"
                        : evento.tipo === "reuniao"
                          ? "bg-blue-500"
                          : "bg-amber-500"
                    }`}
                  >
                    {evento.tipo === "exame"
                      ? "E"
                      : evento.tipo === "reuniao"
                        ? "R"
                        : "P"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 truncate">
                      {evento.titulo}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {formatDate(evento.data)} às {evento.hora}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] font-medium uppercase text-zinc-400 tracking-wide">
                    {evento.disciplina}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="size-4" />
              Últimos Materiais Partilhados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {PROFESSOR_MATERIAIS.slice(0, 4).map((mat) => (
                <div
                  key={mat.id}
                  className="flex items-center gap-3 rounded-lg border border-zinc-100 px-3 py-2.5"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase">
                    {mat.tipo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 truncate">
                      {mat.titulo}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {mat.disciplinaNome} &middot; {formatDate(mat.data)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
