"use client";

import { useState } from "react";
import { EstudantesTable } from "./estudantes-table";
import {
  ESTUDANTES_MOCK,
  type Estudante,
  type EstudanteFormData,
  type Curso,
  TURMAS_INFORMATICA,
  TURMAS_ELECTRONICA,
  getAnoFromTurma,
} from "./estudantes-data";

interface EstudantesManagerProps {
  curso: Curso;
}

export function EstudantesManager({ curso }: EstudantesManagerProps) {
  const [estudantes, setEstudantes] = useState<Estudante[]>(
    ESTUDANTES_MOCK.filter((e) => e.curso === curso),
  );

  const turmas =
    curso === "Informática" ? TURMAS_INFORMATICA : TURMAS_ELECTRONICA;

  const handleAdd = (data: EstudanteFormData) => {
    const novo: Estudante = {
      id: `e${Date.now()}`,
      nome: data.nome.toUpperCase(),
      numeroProcesso: data.numeroProcesso.toUpperCase(),
      turma: data.turma,
      curso,
      anoClasse: getAnoFromTurma(data.turma),
      contacto: data.contacto,
      email: data.email,
      documento: { tipo: data.documentoTipo, numero: data.documentoNumero },
      encarregado: {
        nome: data.encarregadoNome,
        contacto: data.encarregadoContacto,
        parentesco: data.encarregadoParentesco,
      },
      dataNascimento: data.dataNascimento,
      genero: data.genero,
      status: data.status,
      dataMatricula: new Date().toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      endereco: data.endereco,
    };
    setEstudantes((prev) => [novo, ...prev]);
  };

  const handleEdit = (id: string, data: EstudanteFormData) => {
    setEstudantes((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              nome: data.nome.toUpperCase(),
              numeroProcesso: data.numeroProcesso.toUpperCase(),
              turma: data.turma,
              anoClasse: getAnoFromTurma(data.turma),
              contacto: data.contacto,
              email: data.email,
              documento: {
                tipo: data.documentoTipo,
                numero: data.documentoNumero,
              },
              encarregado: {
                nome: data.encarregadoNome,
                contacto: data.encarregadoContacto,
                parentesco: data.encarregadoParentesco,
              },
              dataNascimento: data.dataNascimento,
              genero: data.genero,
              endereco: data.endereco,
              status: data.status,
            }
          : e,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setEstudantes((prev) => prev.filter((e) => e.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setEstudantes((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;
        const next =
          e.status === "activo"
            ? "inactivo"
            : e.status === "inactivo"
              ? "activo"
              : "activo";
        return { ...e, status: next as Estudante["status"] };
      }),
    );
  };

  return (
    <EstudantesTable
      estudantes={estudantes}
      curso={curso}
      turmas={turmas}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggleStatus={handleToggleStatus}
    />
  );
}
