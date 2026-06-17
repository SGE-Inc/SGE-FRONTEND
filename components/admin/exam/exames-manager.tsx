"use client";

import { useState } from "react";
import { ExamesTable } from "./exames-table";
import {
  EXAMES_MOCK,
  type ExameItem,
  type ExameFormData,
  type Curso,
  DISCIPLINAS_INFORMATICA,
  DISCIPLINAS_ELECTRONICA,
  TURMAS_INFORMATICA,
  TURMAS_ELECTRONICA,
} from "./exames-data";

interface ExamesManagerProps {
  curso: Curso;
}

export function ExamesManager({ curso }: ExamesManagerProps) {
  const [exames, setExames] = useState<ExameItem[]>(
    EXAMES_MOCK.filter((e) => e.curso === curso),
  );

  const disciplinas =
    curso === "Informática" ? DISCIPLINAS_INFORMATICA : DISCIPLINAS_ELECTRONICA;
  const turmas =
    curso === "Informática" ? TURMAS_INFORMATICA : TURMAS_ELECTRONICA;

  const handleAdd = (data: ExameFormData) => {
    const novo: ExameItem = {
      id: `ex${Date.now()}`,
      disciplina: data.disciplina,
      turma: data.turma,
      data: data.data,
      hora: data.hora,
      sala: data.sala,
      tipo: data.tipo,
      trimestre: data.trimestre,
      estado: "agendado",
      curso,
      observacoes: data.observacoes,
    };
    setExames((prev) => [novo, ...prev]);
  };

  const handleEdit = (id: string, data: ExameFormData) => {
    setExames((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              disciplina: data.disciplina,
              turma: data.turma,
              data: data.data,
              hora: data.hora,
              sala: data.sala,
              tipo: data.tipo,
              trimestre: data.trimestre,
              observacoes: data.observacoes,
            }
          : e,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setExames((prev) => prev.filter((e) => e.id !== id));
  };

  const handleToggleEstado = (id: string) => {
    setExames((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;
        const next =
          e.estado === "agendado"
            ? "realizado"
            : e.estado === "realizado"
              ? "cancelado"
              : "agendado";
        return { ...e, estado: next as ExameItem["estado"] };
      }),
    );
  };

  return (
    <ExamesTable
      exames={exames}
      curso={curso}
      disciplinas={disciplinas}
      turmas={turmas}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggleEstado={handleToggleEstado}
    />
  );
}
