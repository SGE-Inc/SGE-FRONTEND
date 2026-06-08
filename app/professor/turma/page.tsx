"use client";

import { useState, useMemo } from "react";
import {
  ArrowLeft,
  BookOpen,
  FileUp,
  Upload,
  Megaphone,
  Users,
} from "lucide-react";
import { DashPage } from "@/components/layouts/dash-page";
import {
  DISCIPLINAS,
  MATERIAIS as MATERIAIS_MOCK,
  SUBMISSOES as SUBMISSOES_MOCK,
  AVISOS as AVISOS_MOCK,
  ALUNOS,
  type Disciplina,
  type Material,
  type Submissao,
  type Aviso,
} from "@/components/professor/turma/turma-data";
import { cn } from "@/lib/utils";
import { DisciplinasGrid } from "@/components/professor/turma/turma-disciplinas-grid";
import { MateriaisTab } from "@/components/professor/turma/turma-materiais-tab";
import { SubmissoesTab } from "@/components/professor/turma/turma-submissoes-tab";
import {
  AlunosTab,
  AvisosTab,
} from "@/components/professor/turma/turma-avisos-alunos-tabs";

type Tab = "materiais" | "submissoes" | "avisos" | "alunos";

const TABS: { key: Tab; label: string; icon: typeof BookOpen }[] = [
  { key: "materiais", label: "Materiais", icon: FileUp },
  { key: "submissoes", label: "Submissões", icon: Upload },
  { key: "avisos", label: "Avisos", icon: Megaphone },
  { key: "alunos", label: "Alunos", icon: Users },
];

export default function ProfessorTurmaPage() {
  const [selectedDisciplina, setSelectedDisciplina] =
    useState<Disciplina | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("materiais");

  // Local state for CRUD operations (in real app: API calls)
  const [materiais, setMateriais] = useState<Material[]>(MATERIAIS_MOCK);
  const [submissoes, setSubmissoes] = useState<Submissao[]>(SUBMISSOES_MOCK);
  const [avisos, setAvisos] = useState<Aviso[]>(AVISOS_MOCK);

  const disciplina = selectedDisciplina;

  // Filtered by disciplina
  const filteredMateriais = useMemo(
    () => materiais.filter((m) => m.disciplinaId === disciplina?.id),
    [materiais, disciplina],
  );
  const filteredSubmissoes = useMemo(
    () => submissoes.filter((s) => s.disciplinaId === disciplina?.id),
    [submissoes, disciplina],
  );
  const filteredAvisos = useMemo(
    () => avisos.filter((a) => a.disciplinaId === disciplina?.id),
    [avisos, disciplina],
  );

  const pendentes = filteredSubmissoes.filter(
    (s) => s.status === "pendente",
  ).length;

  // Handlers
  const handleAddMaterial = (m: Omit<Material, "id">) => {
    setMateriais((prev) => [{ ...m, id: `m${Date.now()}` }, ...prev]);
  };
  const handleRemoveMaterial = (id: string) => {
    setMateriais((prev) => prev.filter((m) => m.id !== id));
  };
  const handleToggleVisivel = (id: string) => {
    setMateriais((prev) =>
      prev.map((m) => (m.id === id ? { ...m, visivel: !m.visivel } : m)),
    );
  };
  const handleAprovar = (id: string, comentario: string) => {
    setSubmissoes((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: "aprovado", comentario: comentario || undefined }
          : s,
      ),
    );
  };
  const handleRejeitar = (id: string, comentario: string) => {
    setSubmissoes((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "rejeitado", comentario } : s,
      ),
    );
  };
  const handleAddAviso = (a: Omit<Aviso, "id">) => {
    setAvisos((prev) => [{ ...a, id: `a${Date.now()}` }, ...prev]);
  };
  const handleRemoveAviso = (id: string) => {
    setAvisos((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <DashPage title="Minha Turma">
      {!disciplina ? (
        // ── View 1: Disciplinas overview grid ──
        <DisciplinasGrid
          disciplinas={DISCIPLINAS}
          onSelect={(d) => {
            setSelectedDisciplina(d);
            setActiveTab("materiais");
          }}
        />
      ) : (
        // ── View 2: Disciplina detail ──
        <div className="flex flex-col gap-5">
          {/* Back + breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedDisciplina(null)}
              className="flex size-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 transition-colors"
            >
              <ArrowLeft className="size-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block size-2.5 rounded-full bg-primary shrink-0" />
                <h2 className="text-xl font-bold text-zinc-900">
                  {disciplina.nome}
                </h2>
                <span
                  className={cn("text-sm font-semibold", disciplina.corText)}
                >
                  · Turma {disciplina.turma}
                </span>
              </div>
              <p className="text-xs text-zinc-400 ml-4.5">
                {disciplina.totalAlunos} alunos · {filteredMateriais.length}{" "}
                materiais
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-zinc-200">
            {TABS.map(({ key, label, icon: Icon }) => {
              const isActive = activeTab === key;
              const showBadge = key === "submissoes" && pendentes > 0;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={cn(
                    "relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-zinc-500 hover:text-zinc-800",
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                  {showBadge && (
                    <span className="flex size-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white">
                      {pendentes}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div>
            {activeTab === "materiais" && (
              <MateriaisTab
                disciplina={disciplina}
                materiais={filteredMateriais}
                onAdd={handleAddMaterial}
                onRemove={handleRemoveMaterial}
                onToggleVisivel={handleToggleVisivel}
              />
            )}
            {activeTab === "submissoes" && (
              <SubmissoesTab
                submissoes={filteredSubmissoes}
                onAprovar={handleAprovar}
                onRejeitar={handleRejeitar}
              />
            )}
            {activeTab === "avisos" && (
              <AvisosTab
                disciplina={disciplina}
                avisos={filteredAvisos}
                onAdd={handleAddAviso}
                onRemove={handleRemoveAviso}
              />
            )}
            {activeTab === "alunos" && (
              <AlunosTab alunos={ALUNOS} disciplina={disciplina} />
            )}
          </div>
        </div>
      )}
    </DashPage>
  );
}
