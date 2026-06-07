"use client";

import { useState } from "react";
import { Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Professor {
  disciplina: string;
  sigla: string;
  abrev: string;
  nome: string;
}

const PROFESSORES: Professor[] = [
  {
    disciplina: "Português",
    sigla: "PORT",
    abrev: "POR",
    nome: "CLÁUDIO SANGO NEVES",
  },
  {
    disciplina: "Inglês",
    sigla: "ING",
    abrev: "ING",
    nome: "JOSÉ HENRIQUES GONÇALVES",
  },
  {
    disciplina: "Formação de Atitudes Integradoras",
    sigla: "FAI",
    abrev: "FAI",
    nome: "VALENTINA TCHISSINGUI SATOTO CAMBINDA",
  },
  {
    disciplina: "Matemática",
    sigla: "MAT",
    abrev: "MAT",
    nome: "ARMANDO DOMINGOS MANUEL",
  },
  {
    disciplina: "Física",
    sigla: "FIS",
    abrev: "FIS",
    nome: "ERNESTO PAULO LUKOKI",
  },
  {
    disciplina: "Química",
    sigla: "QUI",
    abrev: "QUI",
    nome: "MARGARIDA FELICIANA SILVA",
  },
  {
    disciplina: "Química Orgânica",
    sigla: "QORG",
    abrev: "QOR",
    nome: "TERESA AUGUSTO CAETANO",
  },
  {
    disciplina: "Informática",
    sigla: "INF",
    abrev: "INF",
    nome: "DOMINGOS MANUEL SEBASTIÃO",
  },
  {
    disciplina: "Q. Analítica",
    sigla: "QANL",
    abrev: "QAN",
    nome: "FILOMENA COSTA RODRIGUES",
  },
  {
    disciplina: "Tecnologia de Laboratório",
    sigla: "TLAB",
    abrev: "TLA",
    nome: "SIMÃO PEDRO BWALYA",
  },
  {
    disciplina: "Educação Física",
    sigla: "EDF",
    abrev: "EDF",
    nome: "ANTÓNIO GUILHERME SOARES",
  },
];

// Generate a deterministic background color per abbreviation
const COLORS: Record<string, string> = {
  POR: "bg-emerald-600",
  ING: "bg-sky-600",
  FAI: "bg-amber-600",
  MAT: "bg-violet-600",
  FIS: "bg-blue-600",
  QUI: "bg-orange-500",
  QOR: "bg-rose-600",
  INF: "bg-teal-600",
  QAN: "bg-lime-600",
  TLA: "bg-indigo-600",
  EDF: "bg-red-600",
};

export function ProfessoresDisciplinas() {
  const [search, setSearch] = useState("");

  const filtered = PROFESSORES.filter(
    (p) =>
      p.disciplina.toLowerCase().includes(search.toLowerCase()) ||
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.sigla.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
          <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
          Professores das Disciplinas
        </h2>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por disciplina ou professor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md border border-zinc-200 bg-white pl-9 pr-4 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/40 w-72 transition"
          />
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((prof) => (
          <div
            key={prof.sigla}
            className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-4"
          >
            {/* Avatar badge */}
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-md text-white text-xs font-bold tracking-wide",
                COLORS[prof.abrev] ?? "bg-zinc-500",
              )}
            >
              {prof.abrev}
            </div>

            {/* Info */}
            <div className="min-w-0 flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-zinc-900 truncate">
                {prof.disciplina}{" "}
                <span className="text-xs font-normal text-zinc-400">
                  ({prof.sigla})
                </span>
              </p>
              <p className="flex items-center gap-1.5 text-xs text-zinc-500 truncate">
                <User className="size-3.5 shrink-0 text-zinc-400" />
                {prof.nome}
              </p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-zinc-400 py-6">
            Nenhum professor encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
