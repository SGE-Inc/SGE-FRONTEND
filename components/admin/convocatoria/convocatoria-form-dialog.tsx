"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
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
  type ConvocatoriaItem,
  type ConvocatoriaFormData,
  type Trimestre,
  TURMAS,
  CURSOS,
  SALAS,
} from "./convocatorias-data";

interface ConvocatoriaFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ConvocatoriaFormData) => void;
  convocatoria?: ConvocatoriaItem | null;
}

const EMPTY_FORM: ConvocatoriaFormData = {
  titulo: "",
  trimestre: "I TRIMESTRE",
  dataEmissao: "",
  dataRealizacao: "",
  hora: "",
  sala: "",
  agenda: [""],
  turma: "",
  curso: "Informática",
  destinatarios: "",
};

type FieldName = keyof ConvocatoriaFormData;
type Errors = Partial<Record<FieldName | string, string>>;

function FormContent({
  convocatoria,
  onSave,
  onClose,
}: {
  convocatoria?: ConvocatoriaItem | null;
  onSave: (data: ConvocatoriaFormData) => void;
  onClose: () => void;
}) {
  const isEdit = !!convocatoria;
  const [form, setForm] = useState<ConvocatoriaFormData>(
    convocatoria
      ? {
          titulo: convocatoria.titulo,
          trimestre: convocatoria.trimestre,
          dataEmissao: convocatoria.dataEmissao,
          dataRealizacao: convocatoria.dataRealizacao,
          hora: convocatoria.hora,
          sala: convocatoria.sala,
          agenda: convocatoria.agenda,
          turma: convocatoria.turma,
          curso: convocatoria.curso,
          destinatarios: convocatoria.destinatarios,
          observacoes: convocatoria.observacoes,
        }
      : EMPTY_FORM,
  );
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.titulo) e.titulo = "Título obrigatório";
    if (!form.dataEmissao) e.dataEmissao = "Data de emissão obrigatória";
    if (!form.dataRealizacao)
      e.dataRealizacao = "Data de realização obrigatória";
    if (!form.hora) e.hora = "Hora obrigatória";
    if (!form.sala) e.sala = "Selecione uma sala";
    if (!form.turma) e.turma = "Selecione uma turma";
    if (!form.destinatarios) e.destinatarios = "Destinatários obrigatório";
    const agendaValida = form.agenda.filter((a) => a.trim().length > 0);
    if (agendaValida.length === 0)
      e.agenda = "Adicione pelo menos um item à agenda";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave({
      ...form,
      agenda: form.agenda.filter((a) => a.trim().length > 0),
    });
  };

  const handleField = (name: FieldName, value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleAgendaChange = (index: number, value: string) => {
    setForm((f) => {
      const newAgenda = [...f.agenda];
      newAgenda[index] = value;
      return { ...f, agenda: newAgenda };
    });
  };

  const addAgendaItem = () => {
    setForm((f) => ({ ...f, agenda: [...f.agenda, ""] }));
  };

  const removeAgendaItem = (index: number) => {
    setForm((f) => ({
      ...f,
      agenda: f.agenda.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Plus className="size-4 text-primary" />
          {isEdit ? "Editar Convocatória" : "Nova Convocatória"}
        </DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 max-h-[60vh] overflow-y-auto pr-2">
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.titulo}
            onChange={(e) => handleField("titulo", e.target.value)}
            placeholder="Ex: Reunião de Encarregados - I Trimestre"
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
              errors.titulo ? "border-red-400" : "border-zinc-200",
            )}
          />
          {errors.titulo && (
            <p className="text-xs text-red-500">{errors.titulo}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">Curso</label>
          <select
            value={form.curso}
            onChange={(e) => handleField("curso", e.target.value)}
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition bg-white"
          >
            {CURSOS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
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
            {TURMAS.map((t) => (
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
            Data de Emissão <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={form.dataEmissao}
            onChange={(e) => handleField("dataEmissao", e.target.value)}
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
              errors.dataEmissao ? "border-red-400" : "border-zinc-200",
            )}
          />
          {errors.dataEmissao && (
            <p className="text-xs text-red-500">{errors.dataEmissao}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Data de Realização <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={form.dataRealizacao}
            onChange={(e) => handleField("dataRealizacao", e.target.value)}
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
              errors.dataRealizacao ? "border-red-400" : "border-zinc-200",
            )}
          />
          {errors.dataRealizacao && (
            <p className="text-xs text-red-500">{errors.dataRealizacao}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Hora <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.hora}
            onChange={(e) => handleField("hora", e.target.value)}
            placeholder="Ex: 08:00 às 09:00"
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

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Destinatários <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.destinatarios}
            onChange={(e) => handleField("destinatarios", e.target.value)}
            placeholder="Ex: Encarregados de Educação"
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
              errors.destinatarios ? "border-red-400" : "border-zinc-200",
            )}
          />
          {errors.destinatarios && (
            <p className="text-xs text-red-500">{errors.destinatarios}</p>
          )}
        </div>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Agenda <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col gap-2">
            {form.agenda.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-mono shrink-0">
                  {index + 1}.
                </span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleAgendaChange(index, e.target.value)}
                  placeholder="Item da agenda"
                  className={cn(
                    "flex-1 rounded-md border px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
                    errors.agenda ? "border-red-400" : "border-zinc-200",
                  )}
                />
                {form.agenda.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAgendaItem(index)}
                    className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addAgendaItem}
            className="flex items-center gap-1 text-xs text-primary font-semibold hover:text-primary/80 transition-colors mt-1"
          >
            <Plus className="size-3" />
            Adicionar item
          </button>
          {errors.agenda && (
            <p className="text-xs text-red-500">{errors.agenda}</p>
          )}
        </div>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Observações
          </label>
          <textarea
            value={form.observacoes ?? ""}
            onChange={(e) => handleField("observacoes", e.target.value)}
            placeholder="Observações opcionais..."
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
          {isEdit ? "Guardar Alterações" : "Criar Convocatória"}
        </Button>
      </DialogFooter>
    </>
  );
}

export function ConvocatoriaFormDialog({
  open,
  onClose,
  onSave,
  convocatoria,
}: ConvocatoriaFormProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <FormContent
          key={open ? (convocatoria?.id ?? "new") : "closed"}
          convocatoria={convocatoria}
          onSave={onSave}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
