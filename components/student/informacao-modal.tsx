"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Informacao } from "./informacoes-data";

interface InformacaoModalProps {
  informacao: Informacao | null;
  total: number;
  open: boolean;
  onClose: () => void;
}

export function InformacaoModal({
  informacao,
  total,
  open,
  onClose,
}: InformacaoModalProps) {
  const [imgExpanded, setImgExpanded] = useState(false);

  if (!informacao) return null;

  const [day, month, year] = informacao.dataPublicacao.split("/");
  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const formattedDate = `${day}/${month}/${year}`;

  // Parse conteudo — split by \n\n for paragraphs, \n for line breaks
  const paragraphs = informacao.conteudo.split("\n\n");

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
        <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto p-0 gap-0">
          {/* Header */}
          <DialogHeader className="px-6 pt-5 pb-3 border-b border-zinc-100">
            <DialogTitle className="text-base font-bold text-zinc-900">
              Informações Importantes
            </DialogTitle>
            <p className="text-xs text-primary font-medium mt-0.5">
              {total} informação{total !== 1 ? "s" : ""} para você
            </p>
          </DialogHeader>

          {/* Body */}
          <div className="px-6 py-4 flex flex-col gap-4">
            {/* Image block */}
            {informacao.imagemUrl && (
              <div className="relative border border-zinc-200 rounded-md overflow-hidden bg-zinc-50">
                {/* Ampliar button */}
                <button
                  onClick={() => setImgExpanded(true)}
                  className="absolute top-2 right-2 z-10 flex items-center gap-1.5 rounded bg-white border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 hover:bg-zinc-50 shadow-sm transition-colors"
                >
                  Clique para ampliar
                </button>
                <button
                  onClick={() => setImgExpanded(true)}
                  className="absolute bottom-2 right-2 z-10 flex size-7 items-center justify-center rounded bg-white border border-zinc-200 text-zinc-500 hover:bg-zinc-50 shadow-sm transition-colors"
                >
                  <Maximize2 className="size-3.5" />
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={informacao.imagemUrl}
                  alt={informacao.titulo}
                  className="w-full object-contain max-h-[260px] cursor-pointer"
                  onClick={() => setImgExpanded(true)}
                />
              </div>
            )}

            {/* Meta */}
            <p className="text-xs text-primary font-medium">
              Publicado em {formattedDate}
            </p>

            {/* Title in body */}
            <h2 className="text-sm font-bold text-zinc-900 flex items-start gap-2">
              {informacao.hasIcon && (
                <span className="text-base shrink-0">📢</span>
              )}
              {informacao.titulo}
            </h2>

            {/* Body content */}
            <div className="text-sm text-zinc-700 space-y-3">
              {paragraphs.map((para, i) => {
                // Detect bullet lines
                if (para.includes("\n•") || para.startsWith("•")) {
                  const lines = para.split("\n");
                  return (
                    <div key={i} className="space-y-1">
                      {lines.map((line, j) =>
                        line.startsWith("•") ? (
                          <div
                            key={j}
                            className="flex items-start gap-2 text-sm"
                          >
                            {informacao.hasIcon && j === 0 ? (
                              <span className="shrink-0">📢</span>
                            ) : null}
                            <span className="shrink-0 text-zinc-500">•</span>
                            <span>{line.slice(1).trim()}</span>
                          </div>
                        ) : (
                          <p key={j} className={line ? "" : "h-2"}>
                            {line}
                          </p>
                        ),
                      )}
                    </div>
                  );
                }
                // Regular paragraph
                const lines = para.split("\n");
                return (
                  <div key={i} className="space-y-1">
                    {lines.map((line, j) =>
                      line ? (
                        <p key={j}>{line}</p>
                      ) : (
                        <div key={j} className="h-1" />
                      ),
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orange scrollbar accent — right edge */}
          <div className="absolute right-0 top-[60px] bottom-0 w-1 bg-primary/30 rounded-r-md pointer-events-none" />
        </DialogContent>
      </Dialog>

      {/* Lightbox for expanded image */}
      {imgExpanded && informacao.imagemUrl && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80"
          onClick={() => setImgExpanded(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={informacao.imagemUrl}
            alt={informacao.titulo}
            className="max-w-[90vw] max-h-[90vh] rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
