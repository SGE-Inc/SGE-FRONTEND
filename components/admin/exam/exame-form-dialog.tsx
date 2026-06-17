"use client";

import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  type ExameItem,
  type ExameFormData,
  type TipoExame,
  type Trimestre,
  type Curso,
  SALAS,
} from "./exames-data";

interface ExameFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ExameFormData) => void;
  exame?: ExameItem | null;
  disciplinas: string[];
  turmas: string[];
  curso: Curso;
}

const EMPTY_FORM: ExameFormData = {
  disciplina: "",
  turma: "",
  data: "",
  hora: "",
  sala: "",
  tipo: "1ª PROVA",
  trimestre: "II TRIMESTRE",
};

type FieldName = keyof ExameFormData;
type Errors = Partial<Record<FieldName | string, string>>;

function FormContent({
  exame,
  onSave,
  onClose,
  disciplinas,
  turmas,
}: {
  exame?: ExameItem | null;
  onSave: (data: ExameFormData) => void;
  onClose: () => void;
  disciplinas: string[];
  turmas: string[];
}) {
  const isEdit = !!exame;
  const [form, setForm] = useState<ExameFormData>(
    exame
      ? {
          disciplina: exame.disciplina,
          turma: exame.turma,
          data: exame.data,
          hora: exame.hora,
          sala: exame.sala,
          tipo: exame.tipo,
          trimestre: exame.trimestre,
          observacoes: exame.observacoes,
        }
      : EMPTY_FORM,
  );
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.disciplina) e.disciplina = "Selecione uma disciplina";
    if (!form.turma) e.turma = "Selecione uma turma";
    if (!form.data) e.data = "Data obrigatória";
    if (!form.hora) e.hora = "Hora obrigatória";
    if (!form.sala) e.sala = "Selecione uma sala";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave(form);
  };

  const handleField = (name: FieldName, value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <CalendarPlus className="size-4 text-primary" />
          {isEdit ? "Editar Exame" : "Agendar Novo Exame"}
        </DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Disciplina <span className="text-red-500">*</span>
          </label>
          <select
            value={form.disciplina}
            onChange={(e) => handleField("disciplina", e.target.value)}
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition bg-white",
              errors.disciplina ? "border-red-400" : "border-zinc-200",
            )}
          >
            <option value="">Seleccionar disciplina</option>
            {disciplinas.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.disciplina && (
            <p className="text-xs text-red-500">{errors.disciplina}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Turma <span className="text-red-500">*</span>
          </label>
          <select
            value={form.turma}
            onChange={(e) => handleField("turma", e.target.value)}
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition bg-white",
              errors.turma ? "border-red-400" : "border-zinc-200",
            )}
          >
            <option value="">Seleccionar turma</option>
            {turmas.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.turma && (
            <p className="text-xs text-red-500">{errors.turma}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Data <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={form.data}
            onChange={(e) => handleField("data", e.target.value)}
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
              errors.data ? "border-red-400" : "border-zinc-200",
            )}
          />
          {errors.data && <p className="text-xs text-red-500">{errors.data}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Hora <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            value={form.hora}
            onChange={(e) => handleField("hora", e.target.value)}
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
              errors.hora ? "border-red-400" : "border-zinc-200",
            )}
          />
          {errors.hora && <p className="text-xs text-red-500">{errors.hora}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Sala <span className="text-red-500">*</span>
          </label>
          <select
            value={form.sala}
            onChange={(e) => handleField("sala", e.target.value)}
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition bg-white",
              errors.sala ? "border-red-400" : "border-zinc-200",
            )}
          >
            <option value="">Seleccionar sala</option>
            {SALAS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.sala && <p className="text-xs text-red-500">{errors.sala}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Tipo de Prova
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(
              ["1ª PROVA", "2ª PROVA", "EXAME FINAL", "RECURSO"] as TipoExame[]
            ).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleField("tipo", t)}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs font-semibold border transition-colors",
                  form.tipo === t
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Trimestre
          </label>
          <div className="flex gap-1.5">
            {(
              ["I TRIMESTRE", "II TRIMESTRE", "III TRIMESTRE"] as Trimestre[]
            ).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleField("trimestre", t)}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs font-semibold border transition-colors",
                  form.trimestre === t
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300",
                )}
              >
                {t.replace(" TRIMESTRE", "")}º
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Observações
          </label>
          <textarea
            value={form.observacoes ?? ""}
            onChange={(e) => handleField("observacoes", e.target.value)}
            placeholder="Observações opcionais sobre o exame..."
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none"
            rows={2}
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {isEdit ? "Guardar Alterações" : "Agendar Exame"}
        </Button>
      </DialogFooter>
    </>
  );
}

export function ExameFormDialog({
  open,
  onClose,
  onSave,
  exame,
  disciplinas,
  turmas,
  curso,
}: ExameFormProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <FormContent
          key={open ? (exame?.id ?? "new") : "closed"}
          exame={exame}
          onSave={onSave}
          onClose={onClose}
          disciplinas={disciplinas}
          turmas={turmas}
        />
      </DialogContent>
    </Dialog>
  );
}
