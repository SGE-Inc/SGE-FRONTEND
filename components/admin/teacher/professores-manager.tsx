"use client";

import { useState } from "react";
import { ProfessoresTable } from "./professores-table";
import {
  PROFESSORES_MOCK,
  type Professor,
  type ProfessorFormData,
  type Curso,
  DISCIPLINAS_INFORMATICA,
  DISCIPLINAS_ELECTRONICA,
  TURMAS_INFORMATICA,
  TURMAS_ELECTRONICA,
} from "./professores-data";

interface ProfessoresManagerProps {
  curso: Curso;
}

export function ProfessoresManager({ curso }: ProfessoresManagerProps) {
  const [professores, setProfessores] = useState<Professor[]>(
    PROFESSORES_MOCK.filter((p) => p.curso === curso)
  );

  const disciplinas =
    curso === "Informática" ? DISCIPLINAS_INFORMATICA : DISCIPLINAS_ELECTRONICA;
  const turmas =
    curso === "Informática" ? TURMAS_INFORMATICA : TURMAS_ELECTRONICA;

  const handleAdd = (data: ProfessorFormData) => {
    const novo: Professor = {
      id: `p${Date.now()}`,
      nome: data.nome.toUpperCase(),
      email: data.email,
      contacto: data.contacto,
      disciplinas: data.disciplinas,
      turmas: data.turmas,
      status: data.status,
      curso,
      dataAdmissao: new Date().toLocaleDateString("pt-PT", {
        day: "2-digit", month: "2-digit", year: "numeric",
      }),
    };
    setProfessores((prev) => [novo, ...prev]);
  };

  const handleEdit = (id: string, data: ProfessorFormData) => {
    setProfessores((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              nome: data.nome.toUpperCase(),
              email: data.email,
              contacto: data.contacto,
              disciplinas: data.disciplinas,
              turmas: data.turmas,
              status: data.status,
            }
          : p
      )
    );
  };

  const handleDelete = (id: string) => {
    setProfessores((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setProfessores((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const next =
          p.status === "activo" ? "inactivo" :
          p.status === "inactivo" ? "activo" :
          "activo"; // licenca → activo
        return { ...p, status: next };
      })
    );
  };

  return (
    <ProfessoresTable
      professores={professores}
      curso={curso}
      disciplinas={disciplinas}
      turmas={turmas}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggleStatus={handleToggleStatus}
    />
  );
}