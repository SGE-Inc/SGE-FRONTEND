"use client";

import { useState } from "react";
import { ClipboardList, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type ExameItem, type ExameResultado } from "./exames-data";

interface ResultadosDialogProps {
  open: boolean;
  onClose: () => void;
  exame: ExameItem | null;
}

const ALUNOS_MOCK: ExameResultado[] = [
  { estudanteId: "a1", estudanteNome: "João Carlos Ambrósio", nota: 0 },
  { estudanteId: "a2", estudanteNome: "Ana Sofia Kipuena", nota: 0 },
  { estudanteId: "a3", estudanteNome: "Mário Pedro Katiavala", nota: 0 },
  { estudanteId: "a4", estudanteNome: "Lúcia Helena Tomás", nota: 0 },
  { estudanteId: "a5", estudanteNome: "Fernando Kitumbi Júnior", nota: 0 },
  { estudanteId: "a6", estudanteNome: "Adriana Madalena Costa", nota: 0 },
];

export function ExameResultadosDialog({
  open,
  onClose,
  exame,
}: ResultadosDialogProps) {
  const [resultados, setResultados] = useState<ExameResultado[]>(ALUNOS_MOCK);
  const [saved, setSaved] = useState(false);

  const handleNotaChange = (id: string, value: string) => {
    const nota = Math.min(20, Math.max(0, Number(value) || 0));
    setResultados((prev) =>
      prev.map((r) => (r.estudanteId === id ? { ...r, nota } : r)),
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  if (!exame) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardList className="size-4 text-primary" />
            Lançar Resultados
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-zinc-50 border border-zinc-200 px-4 py-3 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-zinc-500">Disciplina:</span>
              <p className="font-semibold text-zinc-800">{exame.disciplina}</p>
            </div>
            <div>
              <span className="text-zinc-500">Turma:</span>
              <p className="font-semibold text-zinc-800">{exame.turma}</p>
            </div>
            <div>
              <span className="text-zinc-500">Data:</span>
              <p className="font-semibold text-zinc-800">{exame.data}</p>
            </div>
            <div>
              <span className="text-zinc-500">Tipo:</span>
              <p className="font-semibold text-zinc-800">{exame.tipo}</p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 overflow-hidden">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-white text-xs font-semibold">
                  <th className="px-3 py-2.5 text-left">#</th>
                  <th className="px-3 py-2.5 text-left">Estudante</th>
                  <th className="px-3 py-2.5 text-center w-24">Nota (0-20)</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((r, idx) => (
                  <tr
                    key={r.estudanteId}
                    className={cn(
                      "border-b border-zinc-100",
                      idx % 2 === 1 && "bg-[#f5c9a0]/15",
                    )}
                  >
                    <td className="px-3 py-2 text-xs text-zinc-400">
                      {idx + 1}
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs font-semibold text-zinc-800">
                        {r.estudanteNome}
                      </p>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        min={0}
                        max={20}
                        step={0.5}
                        value={r.nota}
                        onChange={(e) =>
                          handleNotaChange(r.estudanteId, e.target.value)
                        }
                        className={cn(
                          "w-20 mx-auto block rounded-md border px-2 py-1.5 text-xs font-bold text-center focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
                          r.nota >= 10
                            ? "text-emerald-700 border-emerald-200 bg-emerald-50"
                            : r.nota > 0
                              ? "text-red-700 border-red-200 bg-red-50"
                              : "text-zinc-500 border-zinc-200 bg-white",
                        )}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={saved}
            className={cn(
              "gap-2",
              saved ? "bg-emerald-600" : "bg-primary hover:bg-primary/90",
              "text-white",
            )}
          >
            <Save className="size-3.5" />
            {saved ? "Resultados Lançados!" : "Lançar Resultados"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
