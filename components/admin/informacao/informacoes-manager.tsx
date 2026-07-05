"use client";

import { useState } from "react";
import { InformacoesTable } from "./informacoes-table";
import {
  INFORMACOES_MOCK,
  type InformacaoItem,
  type InformacaoFormData,
} from "./informacoes-data";

export function InformacoesManager() {
  const [informacoes, setInformacoes] =
    useState<InformacaoItem[]>(INFORMACOES_MOCK);

  const handleAdd = (data: InformacaoFormData) => {
    const nova: InformacaoItem = {
      id: `i${Date.now()}`,
      titulo: data.titulo,
      descricao: data.descricao,
      conteudo: data.conteudo,
      dataPublicacao: data.dataPublicacao,
      imagemUrl: data.imagemUrl,
      link: data.link,
      hasIcon: data.hasIcon,
      autor: "Administrador",
      estado: data.estado,
      importante: data.importante,
    };
    setInformacoes((prev) => [nova, ...prev]);
  };

  const handleEdit = (id: string, data: InformacaoFormData) => {
    setInformacoes((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              titulo: data.titulo,
              descricao: data.descricao,
              conteudo: data.conteudo,
              dataPublicacao: data.dataPublicacao,
              imagemUrl: data.imagemUrl,
              link: data.link,
              hasIcon: data.hasIcon,
              estado: data.estado,
              importante: data.importante,
            }
          : i,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setInformacoes((prev) => prev.filter((i) => i.id !== id));
  };

  const handleToggleEstado = (id: string) => {
    setInformacoes((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        return {
          ...i,
          estado: (i.estado === "publicado"
            ? "rascunho"
            : "publicado") as InformacaoItem["estado"],
        };
      }),
    );
  };

  return (
    <InformacoesTable
      informacoes={informacoes}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggleEstado={handleToggleEstado}
    />
  );
}
