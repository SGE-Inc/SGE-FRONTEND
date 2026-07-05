"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
  type InformacaoItem,
  type InformacaoFormData,
  type EstadoInformacao,
} from "./informacoes-data";

interface InformacaoFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: InformacaoFormData) => void;
  informacao?: InformacaoItem | null;
}

const EMPTY_FORM: InformacaoFormData = {
  titulo: "",
  descricao: "",
  conteudo: "",
  dataPublicacao: "",
  imagemUrl: "",
  link: "",
  hasIcon: false,
  estado: "rascunho",
  importante: false,
};

type FieldName = keyof InformacaoFormData;
type Errors = Partial<Record<FieldName | string, string>>;

function FormContent({
  informacao,
  onSave,
  onClose,
}: {
  informacao?: InformacaoItem | null;
  onSave: (data: InformacaoFormData) => void;
  onClose: () => void;
}) {
  const isEdit = !!informacao;
  const [form, setForm] = useState<InformacaoFormData>(
    informacao
      ? {
          titulo: informacao.titulo,
          descricao: informacao.descricao,
          conteudo: informacao.conteudo,
          dataPublicacao: informacao.dataPublicacao,
          imagemUrl: informacao.imagemUrl ?? "",
          link: informacao.link ?? "",
          hasIcon: informacao.hasIcon ?? false,
          estado: informacao.estado,
          importante: informacao.importante,
        }
      : EMPTY_FORM,
  );
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.titulo) e.titulo = "Título obrigatório";
    if (!form.descricao) e.descricao = "Descrição obrigatória";
    if (!form.conteudo) e.conteudo = "Conteúdo obrigatório";
    if (!form.dataPublicacao) e.dataPublicacao = "Data obrigatória";
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
      imagemUrl: form.imagemUrl || undefined,
      link: form.link || undefined,
    });
  };

  const handleField = (name: FieldName, value: string | boolean) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (typeof value === "string") {
      setErrors((er) => ({ ...er, [name]: undefined }));
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Plus className="size-4 text-primary" />
          {isEdit ? "Editar Informação" : "Nova Informação"}
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
            placeholder="Título da informação"
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
              errors.titulo ? "border-red-400" : "border-zinc-200",
            )}
          />
          {errors.titulo && (
            <p className="text-xs text-red-500">{errors.titulo}</p>
          )}
        </div>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Descrição <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.descricao}
            onChange={(e) => handleField("descricao", e.target.value)}
            placeholder="Breve descrição da informação"
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
              errors.descricao ? "border-red-400" : "border-zinc-200",
            )}
          />
          {errors.descricao && (
            <p className="text-xs text-red-500">{errors.descricao}</p>
          )}
        </div>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Conteúdo <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.conteudo}
            onChange={(e) => handleField("conteudo", e.target.value)}
            placeholder="Conteúdo completo da informação..."
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none",
              errors.conteudo ? "border-red-400" : "border-zinc-200",
            )}
            rows={6}
          />
          {errors.conteudo && (
            <p className="text-xs text-red-500">{errors.conteudo}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            Data de Publicação <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={form.dataPublicacao}
            onChange={(e) => handleField("dataPublicacao", e.target.value)}
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition",
              errors.dataPublicacao ? "border-red-400" : "border-zinc-200",
            )}
          />
          {errors.dataPublicacao && (
            <p className="text-xs text-red-500">{errors.dataPublicacao}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">Estado</label>
          <div className="flex gap-1.5">
            {(["rascunho", "publicado"] as EstadoInformacao[]).map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => handleField("estado", e)}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs font-semibold border transition-colors capitalize",
                  form.estado === e
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300",
                )}
              >
                {e === "publicado" ? "Publicado" : "Rascunho"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">
            URL da Imagem
          </label>
          <input
            type="text"
            value={form.imagemUrl ?? ""}
            onChange={(e) => handleField("imagemUrl", e.target.value)}
            placeholder="https://..."
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">Link</label>
          <input
            type="text"
            value={form.link ?? ""}
            onChange={(e) => handleField("link", e.target.value)}
            placeholder="https://..."
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.importante}
              onChange={(e) => handleField("importante", e.target.checked)}
              className="rounded border-zinc-300 text-primary focus:ring-primary/30"
            />
            <span className="text-xs font-semibold text-zinc-700">
              Importante
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.hasIcon ?? false}
              onChange={(e) => handleField("hasIcon", e.target.checked)}
              className="rounded border-zinc-300 text-primary focus:ring-primary/30"
            />
            <span className="text-xs font-semibold text-zinc-700">
              Mostrar ícone
            </span>
          </label>
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
          {isEdit ? "Guardar Alterações" : "Criar Informação"}
        </Button>
      </DialogFooter>
    </>
  );
}

export function InformacaoFormDialog({
  open,
  onClose,
  onSave,
  informacao,
}: InformacaoFormProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <FormContent
          key={open ? (informacao?.id ?? "new") : "closed"}
          informacao={informacao}
          onSave={onSave}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
