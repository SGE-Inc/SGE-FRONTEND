"use client";

import { useState } from "react";
import { UserPlus, X } from "lucide-react";
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
  type Estudante,
  type EstudanteFormData,
  type StatusEstudante,
  type Curso,
} from "./estudantes-data";

interface EstudanteFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: EstudanteFormData) => void;
  estudante?: Estudante | null;
  turmasDisponiveis: string[];
  curso: Curso;
}

const EMPTY_FORM: EstudanteFormData = {
  nome: "",
  numeroProcesso: "",
  turma: "",
  anoClasse: "10ª",
  contacto: "",
  email: "",
  documentoTipo: "BI",
  documentoNumero: "",
  encarregadoNome: "",
  encarregadoContacto: "",
  encarregadoParentesco: "",
  dataNascimento: "",
  genero: "Masculino",
  endereco: "",
  status: "activo",
};

type FieldName = keyof EstudanteFormData;
type Errors = Partial<Record<FieldName, string>>;

interface FormFieldProps {
  label: string;
  name: FieldName;
  value: string;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (name: FieldName, value: string) => void;
}

function FormField({
  label,
  name,
  value,
  error,
  type = "text",
  placeholder,
  required,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-zinc-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
          error ? "border-red-400" : "border-zinc-200",
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function FormContent({
  estudante,
  onSave,
  onClose,
  turmasDisponiveis,
  curso,
}: {
  estudante?: Estudante | null;
  onSave: (data: EstudanteFormData) => void;
  onClose: () => void;
  turmasDisponiveis: string[];
  curso: Curso;
}) {
  const isEdit = !!estudante;
  const [form, setForm] = useState<EstudanteFormData>(
    estudante
      ? {
          nome: estudante.nome,
          numeroProcesso: estudante.numeroProcesso,
          turma: estudante.turma,
          anoClasse: estudante.anoClasse,
          contacto: estudante.contacto,
          email: estudante.email,
          documentoTipo: estudante.documento.tipo,
          documentoNumero: estudante.documento.numero,
          encarregadoNome: estudante.encarregado.nome,
          encarregadoContacto: estudante.encarregado.contacto,
          encarregadoParentesco: estudante.encarregado.parentesco,
          dataNascimento: estudante.dataNascimento,
          genero: estudante.genero,
          endereco: estudante.endereco,
          status: estudante.status,
        }
      : EMPTY_FORM,
  );
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.nome.trim()) e.nome = "Nome obrigatório";
    if (!form.numeroProcesso.trim())
      e.numeroProcesso = "Nº Processo obrigatório";
    if (!form.turma) e.turma = "Selecione uma turma";
    if (!form.contacto.trim()) e.contacto = "Contacto obrigatório";
    if (!form.email.trim()) e.email = "Email obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email inválido";
    if (!form.documentoNumero.trim())
      e.documentoNumero = "Nº do documento obrigatório";
    if (!form.encarregadoNome.trim())
      e.encarregadoNome = "Nome do encarregado obrigatório";
    if (!form.encarregadoContacto.trim())
      e.encarregadoContacto = "Contacto do encarregado obrigatório";
    if (!form.dataNascimento.trim())
      e.dataNascimento = "Data de nascimento obrigatória";
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

  const handleFieldChange = (name: FieldName, value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <UserPlus className="size-4 text-primary" />
          {isEdit ? "Editar Estudante" : "Matricular Novo Estudante"}
        </DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-5 py-2 max-h-[65vh] overflow-y-auto pr-1">
        {/* Dados Pessoais */}
        <div>
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary shrink-0" />
            Dados Pessoais
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FormField
                label="Nome Completo"
                name="nome"
                value={form.nome}
                error={errors.nome}
                placeholder="Nome completo do estudante"
                required
                onChange={handleFieldChange}
              />
            </div>
            <FormField
              label="Nº Processo"
              name="numeroProcesso"
              value={form.numeroProcesso}
              error={errors.numeroProcesso}
              placeholder="Ex: DL24001"
              required
              onChange={handleFieldChange}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Género <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                {(["Masculino", "Feminino"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleFieldChange("genero", g)}
                    className={cn(
                      "rounded-md px-3 py-2 text-xs font-semibold border transition-colors",
                      form.genero === g
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300",
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <FormField
              label="Data de Nascimento"
              name="dataNascimento"
              value={form.dataNascimento}
              error={errors.dataNascimento}
              placeholder="Ex: 15/03/2008"
              required
              onChange={handleFieldChange}
            />
            <FormField
              label="Contacto"
              name="contacto"
              value={form.contacto}
              error={errors.contacto}
              placeholder="9XX XXX XXX"
              required
              onChange={handleFieldChange}
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              error={errors.email}
              placeholder="email@ipil.ao"
              required
              onChange={handleFieldChange}
            />
            <div className="sm:col-span-2">
              <FormField
                label="Endereço"
                name="endereco"
                value={form.endereco}
                error={errors.endereco}
                placeholder="Endereço completo"
                onChange={handleFieldChange}
              />
            </div>
          </div>
        </div>

        {/* Documento */}
        <div className="border-t border-zinc-100 pt-4">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary shrink-0" />
            Documento de Identificação
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Tipo <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                {(["BI", "Passaporte"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleFieldChange("documentoTipo", t)}
                    className={cn(
                      "rounded-md px-3 py-2 text-xs font-semibold border transition-colors",
                      form.documentoTipo === t
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <FormField
              label="Nº do Documento"
              name="documentoNumero"
              value={form.documentoNumero}
              error={errors.documentoNumero}
              placeholder="Ex: 001234567LA045"
              required
              onChange={handleFieldChange}
            />
          </div>
        </div>

        {/* Encarregado */}
        <div className="border-t border-zinc-100 pt-4">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary shrink-0" />
            Encarregado de Educação
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FormField
                label="Nome Completo"
                name="encarregadoNome"
                value={form.encarregadoNome}
                error={errors.encarregadoNome}
                placeholder="Nome do encarregado"
                required
                onChange={handleFieldChange}
              />
            </div>
            <FormField
              label="Contacto"
              name="encarregadoContacto"
              value={form.encarregadoContacto}
              error={errors.encarregadoContacto}
              placeholder="9XX XXX XXX"
              required
              onChange={handleFieldChange}
            />
            <FormField
              label="Parentesco"
              name="encarregadoParentesco"
              value={form.encarregadoParentesco}
              error={errors.encarregadoParentesco}
              placeholder="Ex: Pai, Mãe, Tutor"
              onChange={handleFieldChange}
            />
          </div>
        </div>

        {/* Turma / Curso / Status */}
        <div className="border-t border-zinc-100 pt-4">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary shrink-0" />
            Matrícula
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Turma <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {turmasDisponiveis.map((t) => {
                  const sel = form.turma === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleFieldChange("turma", t)}
                      className={cn(
                        "rounded-md px-2.5 py-1 text-xs font-medium border transition-colors",
                        sel
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300",
                      )}
                    >
                      {t}
                      {sel && <X className="inline size-3 ml-1 -mt-0.5" />}
                    </button>
                  );
                })}
              </div>
              {errors.turma && (
                <p className="text-xs text-red-500">{errors.turma}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Curso
              </label>
              <p className="rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-600 bg-zinc-50">
                {curso}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Estado
              </label>
              <div className="flex gap-2 flex-wrap">
                {(
                  ["activo", "inactivo", "transferido"] as StatusEstudante[]
                ).map((s) => {
                  const labels = {
                    activo: "Activo",
                    inactivo: "Inactivo",
                    transferido: "Transferido",
                  };
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleFieldChange("status", s)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-semibold border transition-colors",
                        form.status === s
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300",
                      )}
                    >
                      {labels[s]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter className="border-t border-zinc-100 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {isEdit ? "Guardar Alterações" : "Matricular Estudante"}
        </Button>
      </DialogFooter>
    </>
  );
}

export function EstudanteFormDialog({
  open,
  onClose,
  onSave,
  estudante,
  turmasDisponiveis,
  curso,
}: EstudanteFormProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl">
        <FormContent
          key={open ? (estudante?.id ?? "new") : "closed"}
          estudante={estudante}
          onSave={onSave}
          onClose={onClose}
          turmasDisponiveis={turmasDisponiveis}
          curso={curso}
        />
      </DialogContent>
    </Dialog>
  );
}
