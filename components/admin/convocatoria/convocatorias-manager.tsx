"use client";

import { useState } from "react";
import { ConvocatoriasTable } from "./convocatorias-table";
import {
  CONVOCATORIAS_MOCK,
  type ConvocatoriaItem,
  type ConvocatoriaFormData,
} from "./convocatorias-data";

export function ConvocatoriasManager() {
  const [convocatorias, setConvocatorias] =
    useState<ConvocatoriaItem[]>(CONVOCATORIAS_MOCK);

  const handleAdd = (data: ConvocatoriaFormData) => {
    const nova: ConvocatoriaItem = {
      id: `c${Date.now()}`,
      titulo: data.titulo,
      trimestre: data.trimestre,
      dataEmissao: data.dataEmissao,
      dataRealizacao: data.dataRealizacao,
      hora: data.hora,
      sala: data.sala,
      agenda: data.agenda,
      turma: data.turma,
      curso: data.curso,
      destinatarios: data.destinatarios,
      estado: "rascunho",
      observacoes: data.observacoes,
    };
    setConvocatorias((prev) => [nova, ...prev]);
  };

  const handleEdit = (id: string, data: ConvocatoriaFormData) => {
    setConvocatorias((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              titulo: data.titulo,
              trimestre: data.trimestre,
              dataEmissao: data.dataEmissao,
              dataRealizacao: data.dataRealizacao,
              hora: data.hora,
              sala: data.sala,
              agenda: data.agenda,
              turma: data.turma,
              curso: data.curso,
              destinatarios: data.destinatarios,
              observacoes: data.observacoes,
            }
          : c,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setConvocatorias((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleEstado = (id: string) => {
    setConvocatorias((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const next =
          c.estado === "rascunho"
            ? "emitida"
            : c.estado === "emitida"
              ? "arquivada"
              : "rascunho";
        return { ...c, estado: next as ConvocatoriaItem["estado"] };
      }),
    );
  };

  return (
    <ConvocatoriasTable
      convocatorias={convocatorias}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggleEstado={handleToggleEstado}
    />
  );
}
