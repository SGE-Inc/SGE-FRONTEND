"use client";

import { useState } from "react";
import { UserPlus, X } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import {
  type Professor, type ProfessorFormData, type StatusProfessor,
} from "./professores-data";

interface ProfessorFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProfessorFormData) => void;
  professor?: Professor | null;
  disciplinasDisponiveis: string[];
  turmasDisponiveis: string[];
}

const EMPTY_FORM: ProfessorFormData = {
  nome: "", email: "", senha: "", contacto: "",
  disciplinas: [], turmas: [], status: "activo",
};

type Errors = Partial<Record<keyof ProfessorFormData, string>>;

interface FormFieldProps {
  label: string;
  name: keyof ProfessorFormData;
  value: string;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (name: keyof ProfessorFormData, value: string) => void;
}

function FormField({ label, name, value, error, type = "text", placeholder, required, onChange }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-zinc-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
          error ? "border-red-400" : "border-zinc-200"
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface FormContentProps {
  professor?: Professor | null;
  onSave: (data: ProfessorFormData) => void;
  onClose: () => void;
  disciplinasDisponiveis: string[];
  turmasDisponiveis: string[];
}

function FormContent({ professor, onSave, onClose, disciplinasDisponiveis, turmasDisponiveis }: FormContentProps) {
  const isEdit = !!professor;
  const [form, setForm] = useState<ProfessorFormData>(
    professor
      ? {
          nome: professor.nome,
          email: professor.email,
          senha: "",
          contacto: professor.contacto,
          disciplinas: [...professor.disciplinas],
          turmas: [...professor.turmas],
          status: professor.status,
        }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.nome.trim()) e.nome = "Nome obrigatório";
    if (!form.email.trim()) e.email = "Email obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido";
    if (!isEdit && !form.senha.trim()) e.senha = "Senha obrigatória";
    if (!isEdit && form.senha.length < 6) e.senha = "Mínimo 6 caracteres";
    if (!form.contacto.trim()) e.contacto = "Contacto obrigatório";
    if (form.disciplinas.length === 0) e.disciplinas = "Selecione pelo menos uma disciplina";
    if (form.turmas.length === 0) e.turmas = "Selecione pelo menos uma turma";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(form);
  };

  const toggleItem = (key: "disciplinas" | "turmas", item: string) => {
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(item)
        ? f[key].filter((x) => x !== item)
        : [...f[key], item],
    }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleFieldChange = (name: keyof ProfessorFormData, value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <UserPlus className="size-4 text-primary" />
          {isEdit ? "Editar Professor" : "Novo Professor"}
        </DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
        <div className="sm:col-span-2">
          <FormField
            label="Nome Completo" name="nome" value={form.nome} error={errors.nome}
            placeholder="Nome completo do professor" required onChange={handleFieldChange}
          />
        </div>

        <FormField
          label="Email" name="email" type="email" value={form.email} error={errors.email}
          placeholder="email@ipil.ao" required onChange={handleFieldChange}
        />

        <FormField
          label="Contacto / Telefone" name="contacto" value={form.contacto} error={errors.contacto}
          placeholder="9XX XXX XXX" required onChange={handleFieldChange}
        />

        <div className="sm:col-span-2">
          <FormField
            label={isEdit ? "Nova Senha (deixe vazio para manter)" : "Senha"}
            name="senha" type="password" value={form.senha} error={errors.senha}
            placeholder="Mínimo 6 caracteres" required={!isEdit} onChange={handleFieldChange}
          />
        </div>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">Estado</label>
          <div className="flex gap-2">
            {(["activo", "inactivo", "licenca"] as StatusProfessor[]).map((s) => {
              const labels = { activo: "Activo", inactivo: "Inactivo", licenca: "Licença" };
              return (
                <button
                  key={s}
                  onClick={() => setForm((f) => ({ ...f, status: s }))}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold border transition-colors",
                    form.status === s
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300"
                  )}
                >
                  {labels[s]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sm:col-span-2 flex flex-col gap-2">
          <label className="text-xs font-semibold text-zinc-700">
            Disciplinas <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {disciplinasDisponiveis.map((d) => {
              const sel = form.disciplinas.includes(d);
              return (
                <button
                  key={d}
                  onClick={() => toggleItem("disciplinas", d)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-medium border transition-colors",
                    sel
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                  )}
                >
                  {d}
                  {sel && <X className="inline size-3 ml-1 -mt-0.5" />}
                </button>
              );
            })}
          </div>
          {errors.disciplinas && <p className="text-xs text-red-500">{errors.disciplinas}</p>}
        </div>

        <div className="sm:col-span-2 flex flex-col gap-2">
          <label className="text-xs font-semibold text-zinc-700">
            Turmas <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {turmasDisponiveis.map((t) => {
              const sel = form.turmas.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleItem("turmas", t)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-medium border transition-colors",
                    sel
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                  )}
                >
                  {t}
                  {sel && <X className="inline size-3 ml-1 -mt-0.5" />}
                </button>
              );
            })}
          </div>
          {errors.turmas && <p className="text-xs text-red-500">{errors.turmas}</p>}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white">
          {isEdit ? "Guardar Alterações" : "Criar Professor"}
        </Button>
      </DialogFooter>
    </>
  );
}

export function ProfessorFormDialog({
  open, onClose, onSave, professor,
  disciplinasDisponiveis, turmasDisponiveis,
}: ProfessorFormProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <FormContent
          key={open ? professor?.id ?? "new" : "closed"}
          professor={professor}
          onSave={onSave}
          onClose={onClose}
          disciplinasDisponiveis={disciplinasDisponiveis}
          turmasDisponiveis={turmasDisponiveis}
        />
      </DialogContent>
    </Dialog>
  );
}