"use client";

import { useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { DashPage } from "@/components/layouts/dash-page";
import { SectionCard, InfoRow } from "@/components/student/perfil-components";
import { ProfessorPerfilHeader } from "@/components/professor/professor-perfil-header";
import {
  PROFESSOR_PERFIL_MOCK,
  type ProfessorPerfilData,
} from "@/components/professor/professor-perfil-data";
import { Button } from "@/components/ui/button";

type EditablePerfil = Omit<
  ProfessorPerfilData,
  | "nome"
  | "role"
  | "departamento"
  | "funcionarioId"
  | "dadosPreenchidos"
  | "avatarUrl"
  | "disciplinas"
  | "turmas"
> & {
  disciplinas: string;
  turmas: string;
};

export default function ProfessorMeuPerfilPage() {
  const [perfil, setPerfil] = useState(PROFESSOR_PERFIL_MOCK);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<EditablePerfil>(() => {
    const {
      nome,
      role,
      departamento,
      funcionarioId,
      dadosPreenchidos,
      avatarUrl,
      ...rest
    } = PROFESSOR_PERFIL_MOCK;
    return {
      ...rest,
      disciplinas: rest.disciplinas.join(", "),
      turmas: rest.turmas.join(", "),
    };
  });

  const handleSave = () => {
    setPerfil((prev) => ({
      ...prev,
      ...form,
      disciplinas: form.disciplinas.split(",").map((s) => s.trim()),
      turmas: form.turmas.split(",").map((s) => s.trim()),
    }));
    setEditing(false);
  };

  const handleCancel = () => {
    const {
      nome,
      role,
      departamento,
      funcionarioId,
      dadosPreenchidos,
      avatarUrl,
      ...rest
    } = perfil;
    setForm({
      ...rest,
      disciplinas: rest.disciplinas.join(", "),
      turmas: rest.turmas.join(", "),
    });
    setEditing(false);
  };

  const update = (key: keyof EditablePerfil, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DashPage title="Meu Perfil">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-zinc-400">
          {editing ? "A editar perfil..." : "Perfil apenas de leitura"}
        </p>
        {!editing ? (
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
            onClick={() => setEditing(true)}
          >
            <Pencil className="size-3.5" />
            Editar Perfil
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="gap-2"
              onClick={handleCancel}
            >
              <X className="size-3.5" />
              Cancelar
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white gap-2"
              onClick={handleSave}
            >
              <Save className="size-3.5" />
              Guardar
            </Button>
          </div>
        )}
      </div>

      <ProfessorPerfilHeader perfil={perfil} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <SectionCard title="Dados Pessoais">
          {editing ? (
            <>
              <EditField
                label="Género:"
                value={form.genero ?? ""}
                onChange={(v) => update("genero", v)}
                options={["Masculino", "Feminino"]}
              />
              <EditField
                label="Estado Civil:"
                value={form.estadoCivil ?? ""}
                onChange={(v) => update("estadoCivil", v)}
                options={["Solteiro", "Casado", "Divorciado", "Viúvo"]}
              />
            </>
          ) : (
            <>
              <InfoRow label="Género:" value={perfil.genero} />
              <InfoRow label="Estado Civil:" value={perfil.estadoCivil} />
            </>
          )}
        </SectionCard>

        <SectionCard title="Dados Complementares">
          {editing ? (
            <>
              <EditField
                label="Nome do Pai:"
                value={form.nomePai ?? ""}
                onChange={(v) => update("nomePai", v)}
              />
              <EditField
                label="Nome da Mãe:"
                value={form.nomeMae ?? ""}
                onChange={(v) => update("nomeMae", v)}
              />
              <EditField
                label="Naturalidade:"
                value={form.naturalidade ?? ""}
                onChange={(v) => update("naturalidade", v)}
              />
            </>
          ) : (
            <>
              <InfoRow
                label="Nome do Pai:"
                value={perfil.nomePai}
                valueClassName="uppercase font-medium"
              />
              <InfoRow
                label="Nome da Mãe:"
                value={perfil.nomeMae}
                valueClassName="uppercase font-medium"
              />
              <InfoRow
                label="Naturalidade:"
                value={perfil.naturalidade}
                valueClassName="uppercase font-medium"
              />
            </>
          )}
        </SectionCard>

        <SectionCard title="Documentação">
          {editing ? (
            <>
              <EditField
                label="Tipo do Documento:"
                value={form.tipoDocumento ?? ""}
                onChange={(v) => update("tipoDocumento", v)}
                options={["Bilhete de Identidade", "Passaporte", "Cédula"]}
              />
              <EditField
                label="Nº de Identificação:"
                value={form.numeroIdentificacao ?? ""}
                onChange={(v) => update("numeroIdentificacao", v)}
              />
              <EditField
                label="Data de Emissão:"
                value={form.dataEmissao ?? ""}
                onChange={(v) => update("dataEmissao", v)}
              />
              <EditField
                label="Validade do Documento:"
                value={form.validadeDocumento ?? ""}
                onChange={(v) => update("validadeDocumento", v)}
              />
            </>
          ) : (
            <>
              <InfoRow
                label="Tipo do Documento:"
                value={perfil.tipoDocumento}
              />
              <InfoRow
                label="Nº de Identificação:"
                value={perfil.numeroIdentificacao}
              />
              <InfoRow label="Data de Emissão:" value={perfil.dataEmissao} />
              <InfoRow
                label="Validade do Documento:"
                value={perfil.validadeDocumento}
              />
            </>
          )}
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard title="Dados de Localização">
          {editing ? (
            <>
              <EditField
                label="Província:"
                value={form.provincia ?? ""}
                onChange={(v) => update("provincia", v)}
              />
              <EditField
                label="Município:"
                value={form.municipio ?? ""}
                onChange={(v) => update("municipio", v)}
              />
              <EditField
                label="Comuna:"
                value={form.comuna ?? ""}
                onChange={(v) => update("comuna", v)}
              />
            </>
          ) : (
            <>
              <InfoRow
                label="Província:"
                value={perfil.provincia}
                valueClassName="uppercase font-medium"
              />
              <InfoRow
                label="Município:"
                value={perfil.municipio}
                valueClassName="uppercase font-medium"
              />
              <InfoRow
                label="Comuna:"
                value={perfil.comuna}
                valueClassName="uppercase font-medium"
              />
            </>
          )}
        </SectionCard>

        <SectionCard title="Dados Profissionais">
          {editing ? (
            <>
              <EditField
                label="Disciplinas:"
                value={form.disciplinas}
                onChange={(v) => update("disciplinas", v)}
                placeholder="separadas por vírgula"
              />
              <EditField
                label="Turmas:"
                value={form.turmas}
                onChange={(v) => update("turmas", v)}
                placeholder="separadas por vírgula"
              />
              <EditField
                label="Data de Admissão:"
                value={form.dataAdmissao ?? ""}
                onChange={(v) => update("dataAdmissao", v)}
              />
              <EditField
                label="Habilitações:"
                value={form.habilitacoes ?? ""}
                onChange={(v) => update("habilitacoes", v)}
              />
            </>
          ) : (
            <>
              <InfoRow
                label="Disciplinas:"
                value={perfil.disciplinas.join(", ")}
              />
              <InfoRow label="Turmas:" value={perfil.turmas.join(", ")} />
              <InfoRow label="Data de Admissão:" value={perfil.dataAdmissao} />
              <InfoRow label="Habilitações:" value={perfil.habilitacoes} />
            </>
          )}
        </SectionCard>
      </div>
    </DashPage>
  );
}

function EditField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options?: string[];
  placeholder?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-xs font-semibold text-zinc-700 shrink-0">
        {label}
      </span>
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-44 rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary/30"
        >
          <option value="">Seleccione...</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-44 rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary/30"
          placeholder={placeholder ?? label.replace(":", "")}
        />
      )}
    </div>
  );
}
