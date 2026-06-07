"use client";

import { useState, useRef } from "react";
import { Upload, File, X, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SubmitMaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disciplinaNome: string;
}

export function SubmitMaterialDialog({
  open,
  onOpenChange,
  disciplinaNome,
}: SubmitMaterialDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [descricao, setDescricao] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFile(null);
      setDescricao("");
      onOpenChange(false);
    }, 2000);
  };

  const handleClose = () => {
    if (!submitting) {
      setFile(null);
      setDescricao("");
      setSubmitted(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Submeter Material</DialogTitle>
          <DialogDescription>
            Partilhe um ficheiro com a turma de{" "}
            <span className="font-semibold text-foreground">
              {disciplinaNome}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Upload className="size-6" />
            </div>
            <p className="text-sm font-semibold text-zinc-900">
              Material submetido com sucesso!
            </p>
            <p className="text-xs text-zinc-500">
              O professor irá analisar o ficheiro.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div
              onClick={() => fileRef.current?.click()}
              className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 py-8 transition hover:border-primary/40 hover:bg-primary/5"
            >
              {file ? (
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <File className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-900 truncate max-w-[250px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                    className="rounded-full p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Upload className="size-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-zinc-900">
                      Clique para seleccionar um ficheiro
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      PDF, Word, Excel, CSV, Imagens (max. 20MB)
                    </p>
                  </div>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg,.gif,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">
                Descrição (opcional)
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Adicione uma descrição ao seu material..."
                rows={3}
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
              />
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-2">
              <AlertCircle className="size-4 shrink-0 text-blue-500 mt-0.5" />
              <p className="text-xs text-blue-800">
                O material será analisado pelo professor antes de ser
                disponibilizado para a turma.
              </p>
            </div>
          </div>
        )}

        {!submitted && (
          <DialogFooter>
            <Button variant="ghost" onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={!file || submitting}>
              {submitting ? "A submeter..." : "Submeter Material"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
