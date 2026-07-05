"use client";

import { useState, useMemo, useCallback } from "react";
import { Save, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  type Disciplina,
  type Aluno,
  type NotaAluno,
  type NotasDisciplina,
  type Trimestre,
  NOTAS_MOCK,
  TRIMESTRES,
  AVALIACOES,
} from "./turma-data";

interface NotasTabProps {
  disciplina: Disciplina;
  alunos: Aluno[];
}

function NotaInput({
  value,
  onChange,
  disabled,
}: {
  value: number | null;
  onChange: (v: number | null) => void;
  disabled?: boolean;
}) {
  const [localValue, setLocalValue] = useState(
    value != null ? value.toString() : "",
  );
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (v: string) => {
    setLocalValue(v);
    if (v === "") {
      setIsInvalid(false);
      onChange(null);
      return;
    }
    const num = parseFloat(v);
    if (isNaN(num) || num < 0 || num > 20) {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);
    onChange(Math.round(num * 10) / 10);
  };

  return (
    <div className="relative">
      <input
        type="text"
        inputMode="decimal"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-16 rounded-md border px-2 py-1.5 text-xs text-center font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
          isInvalid
            ? "border-red-400 bg-red-50 text-red-700"
            : value != null
              ? value >= 10
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700"
              : "border-zinc-200 bg-white text-zinc-800",
        )}
        placeholder="—"
      />
      {isInvalid && (
        <div className="absolute -top-1.5 -right-1.5">
          <AlertCircle className="size-3.5 text-red-500" />
        </div>
      )}
    </div>
  );
}

function FaltasInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <input
      type="number"
      min={0}
      max={100}
      value={value}
      onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
      className="w-14 rounded-md border border-zinc-200 px-2 py-1.5 text-xs text-center font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
    />
  );
}

export function NotasTab({ disciplina, alunos }: NotasTabProps) {
  const [trimestre, setTrimestre] = useState<Trimestre>("I TRIMESTRE");
  const [notasData, setNotasData] = useState<NotasDisciplina[]>(() => {
    const existing = NOTAS_MOCK.filter((n) => n.disciplinaId === disciplina.id);
    if (existing.length > 0) return existing;
    return TRIMESTRES.map((t) => ({
      disciplinaId: disciplina.id,
      trimestre: t,
      notas: alunos.map((a) => ({
        alunoId: a.id,
        pp: null,
        pt: null,
        mac: null,
        mt: null,
        faltas: 0,
      })),
    }));
  });
  const [saved, setSaved] = useState(false);

  const currentNotas = useMemo(
    () => notasData.find((n) => n.trimestre === trimestre),
    [notasData, trimestre],
  );

  const getNota = useCallback(
    (alunoId: string) => {
      return currentNotas?.notas.find((n) => n.alunoId === alunoId);
    },
    [currentNotas],
  );

  const updateNota = (
    alunoId: string,
    field: keyof NotaAluno,
    value: number | null,
  ) => {
    setNotasData((prev) =>
      prev.map((nd) => {
        if (nd.trimestre !== trimestre) return nd;
        return {
          ...nd,
          notas: nd.notas.map((n) =>
            n.alunoId === alunoId ? { ...n, [field]: value } : n,
          ),
        };
      }),
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const alunosComNotas = useMemo(
    () =>
      alunos.map((a) => {
        const notas = getNota(a.id);
        const pp = notas?.pp ?? null;
        const pt = notas?.pt ?? null;
        const mac = notas?.mac ?? null;
        const mt = notas?.mt ?? null;
        const vals = [pp, pt, mac, mt].filter((v) => v != null) as number[];
        const media =
          vals.length > 0
            ? vals.reduce((s, v) => s + v, 0) / vals.length
            : null;
        return { ...a, pp, pt, mac, mt, faltas: notas?.faltas ?? 0, media };
      }),
    [alunos, getNota],
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-xs text-zinc-500 font-semibold">Trimestre:</p>
          <div className="flex gap-1">
            {TRIMESTRES.map((t) => (
              <button
                key={t}
                onClick={() => setTrimestre(t)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-semibold border transition-colors",
                  trimestre === t
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300",
                )}
              >
                {t.replace(" TRIMESTRE", "")}º
              </button>
            ))}
          </div>
        </div>

        <Button
          size="sm"
          className={cn(
            "gap-2 transition-all",
            saved
              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
              : "bg-primary hover:bg-primary/90 text-white",
          )}
          onClick={handleSave}
        >
          <Save className="size-3.5" />
          {saved ? "Guardado!" : "Guardar Notas"}
        </Button>
      </div>

      {/* Info */}
      <div className="flex items-center gap-4 text-[11px] text-zinc-400">
        <span className="flex items-center gap-1">
          <span className="inline-block size-2.5 rounded bg-emerald-50 border border-emerald-200" />
          ≥ 10 valores
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block size-2.5 rounded bg-red-50 border border-red-200" />
          &lt; 10 valores
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block size-2.5 rounded bg-white border border-zinc-200" />
          Não lançado
        </span>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm min-w-[800px]">
            <thead>
              <tr className="bg-primary text-white text-xs font-semibold">
                <th className="px-4 py-3 text-left min-w-[180px]">Aluno</th>
                <th className="px-4 py-3 text-center min-w-[64px]">Nº</th>
                {AVALIACOES.map(({ key, label }) => (
                  <th key={key} className="px-3 py-3 text-center min-w-[64px]">
                    {label}
                  </th>
                ))}
                <th className="px-3 py-3 text-center min-w-[56px]">Faltas</th>
                <th className="px-4 py-3 text-center min-w-[56px]">Média</th>
              </tr>
            </thead>
            <tbody>
              {alunosComNotas.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-sm text-zinc-400"
                  >
                    Nenhum aluno encontrado para esta disciplina.
                  </td>
                </tr>
              )}
              {alunosComNotas.map((a, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <tr
                    key={a.id}
                    className={cn(
                      "border-b border-zinc-100 transition-colors",
                      isEven ? "bg-[#f5c9a0]/15" : "bg-white",
                    )}
                  >
                    <td className="px-4 py-2.5">
                      <p className="text-xs font-bold text-zinc-800 uppercase">
                        {a.nome}
                      </p>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className="text-xs font-mono font-semibold text-zinc-500">
                        {a.numero}
                      </span>
                    </td>
                    {AVALIACOES.map(({ key }) => (
                      <td key={key} className="px-3 py-2.5 text-center">
                        <NotaInput
                          value={a[key] as number | null}
                          onChange={(v) => updateNota(a.id, key, v)}
                        />
                      </td>
                    ))}
                    <td className="px-3 py-2.5 text-center">
                      <FaltasInput
                        value={a.faltas}
                        onChange={(v) => updateNota(a.id, "faltas", v)}
                      />
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {a.media != null ? (
                        <span
                          className={cn(
                            "text-xs font-bold",
                            a.media >= 10 ? "text-emerald-600" : "text-red-500",
                          )}
                        >
                          {a.media.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-xs text-zinc-300">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3">
        <p className="text-xs font-semibold text-zinc-500 mb-1">
          Legenda de Avaliações
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-zinc-600">
          <span>
            <strong>PP</strong> — Prova Presencial
          </span>
          <span>
            <strong>PT</strong> — Prova Teórica
          </span>
          <span>
            <strong>MAC</strong> — Média de Avaliação Contínua
          </span>
          <span>
            <strong>MT</strong> — Média de Trabalho
          </span>
        </div>
      </div>
    </div>
  );
}
