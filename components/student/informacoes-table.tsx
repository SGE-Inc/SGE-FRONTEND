"use client";

import { cn } from "@/lib/utils";
import { type Informacao } from "./informacoes-data";
import { ImageIcon } from "lucide-react";

interface InformacoesTableProps {
  informacoes: Informacao[];
  onSelect: (info: Informacao) => void;
}

export function InformacoesTable({
  informacoes,
  onSelect,
}: InformacoesTableProps) {
  return (
    <div className="rounded-lg border border-zinc-200 overflow-hidden">
      <table className="w-full border-collapse text-sm">
        {/* Header */}
        <thead>
          <tr className="bg-primary text-white text-sm font-semibold">
            <th className="px-4 py-3 text-center w-[48px]">Nº</th>
            <th className="px-4 py-3 text-center">Título</th>
            <th className="px-4 py-3 text-center">Descrição</th>
            <th className="px-4 py-3 text-center w-[80px]">Imagem</th>
            <th className="px-4 py-3 text-center w-[64px]">Link</th>
          </tr>
        </thead>
        <tbody>
          {informacoes.map((info, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <tr
                key={info.id}
                onClick={() => onSelect(info)}
                className={cn(
                  "border-b border-zinc-100 cursor-pointer transition-colors",
                  isEven
                    ? "bg-[#f5c9a0]/50 hover:bg-[#f5c9a0]/80"
                    : "bg-white hover:bg-zinc-50",
                )}
              >
                {/* Nº */}
                <td className="px-4 py-3 text-center text-zinc-600 font-medium">
                  {info.id}
                </td>

                {/* Título */}
                <td className="px-4 py-3 text-center">
                  <span className="text-primary font-medium text-xs leading-snug">
                    {info.hasIcon && <span className="mr-1">📢</span>}
                    {info.titulo}
                  </span>
                </td>

                {/* Descrição */}
                <td className="px-4 py-3 text-center">
                  <span className="text-xs text-zinc-600 line-clamp-2">
                    {info.hasIcon && <span className="mr-1">📢</span>}
                    {info.descricao}
                  </span>
                </td>

                {/* Imagem thumbnail */}
                <td className="px-4 py-3 text-center">
                  {info.imagemUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={info.imagemUrl}
                      alt={info.titulo}
                      className="size-10 object-cover rounded border border-zinc-200 mx-auto"
                    />
                  ) : (
                    <div className="size-10 mx-auto rounded border border-zinc-200 bg-zinc-100 flex items-center justify-center">
                      <ImageIcon className="size-4 text-zinc-400" />
                    </div>
                  )}
                </td>

                {/* Link */}
                <td className="px-4 py-3 text-center text-xs text-zinc-400 font-medium">
                  {info.link ? (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-primary underline"
                    >
                      Abrir
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            );
          })}

          {informacoes.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-8 text-center text-sm text-zinc-400"
              >
                Nenhuma informação encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
