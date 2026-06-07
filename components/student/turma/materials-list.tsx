"use client";

import { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Material } from "./turma-data";

interface MaterialsListProps {
  materiais: Material[];
}

const iconMap = {
  pdf: FileText,
  doc: FileSpreadsheet,
  xls: FileSpreadsheet,
  csv: FileSpreadsheet,
  img: FileImage,
  outro: File,
};

const labelMap: Record<string, string> = {
  pdf: "PDF",
  doc: "Word",
  xls: "Excel",
  csv: "CSV",
  img: "Imagem",
  outro: "Ficheiro",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function MaterialRow({ material }: { material: Material }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[material.tipo] ?? File;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white transition hover:border-zinc-300">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-4 px-4 py-3.5 text-left cursor-pointer"
      >
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            material.tipo === "pdf" && "bg-red-100 text-red-600",
            material.tipo === "doc" && "bg-blue-100 text-blue-600",
            material.tipo === "xls" && "bg-emerald-100 text-emerald-600",
            material.tipo === "csv" && "bg-green-100 text-green-600",
            material.tipo === "img" && "bg-purple-100 text-purple-600",
            material.tipo === "outro" && "bg-zinc-100 text-zinc-600",
          )}
        >
          <Icon className="size-5" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-zinc-900 truncate">
            {material.titulo}
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">
            {labelMap[material.tipo]} &middot; {material.tamanho} &middot;{" "}
            {formatDate(material.data)}
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`/api/download/${material.ficheiro}`, "_blank");
          }}
        >
          <Download className="size-4" />
        </Button>

        <div className="text-zinc-400">
          {expanded ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-zinc-100 px-4 py-3 space-y-2">
          <p className="text-sm text-zinc-700 leading-relaxed">
            {material.descricao}
          </p>
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
            <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-0.5">
              Nota do Professor
            </p>
            <p className="text-sm text-amber-900">{material.nota}</p>
          </div>
          <p className="text-xs text-zinc-400">
            Partilhado por {material.professor} em {formatDate(material.data)}
          </p>
        </div>
      )}
    </div>
  );
}

export function MaterialsList({ materiais }: MaterialsListProps) {
  if (materiais.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 py-12">
        <FileText className="size-10 text-zinc-300 mb-3" />
        <p className="text-sm text-zinc-500">
          Nenhum material partilhado nesta disciplina ainda.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {materiais.map((material) => (
        <MaterialRow key={material.id} material={material} />
      ))}
    </div>
  );
}
