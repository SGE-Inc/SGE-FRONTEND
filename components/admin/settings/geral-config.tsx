"use client";

import { useState } from "react";
import {
  Building2,
  Calendar,
  BookOpen,
  GraduationCap,
  LayoutGrid,
  Scale,
  Shield,
  Save,
  Plus,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  INSTITUICAO_MOCK,
  ANO_LECTIVO_MOCK,
  TRIMESTRES_MOCK,
  CURSOS_MOCK,
  DISCIPLINAS_MOCK,
  TURMAS_MOCK,
  PARAMETROS_AVALIACAO_MOCK,
  UTILIZADORES_ADMIN_MOCK,
  type Instituicao,
  type AnoLectivo,
  type TrimestreConfig,
  type CursoConfig,
  type DisciplinaCurso,
  type TurmaConfig,
  type ParametroAvaliacao,
  type UtilizadorAdmin,
  type CursoNome,
} from "./geral-data";

type TabId =
  | "instituicao"
  | "ano"
  | "disciplinas"
  | "trimestres"
  | "cursos"
  | "avaliacao"
  | "utilizadores";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  {
    id: "instituicao",
    label: "Instituição",
    icon: <Building2 className="size-3.5" />,
  },
  { id: "ano", label: "Ano Lectivo", icon: <Calendar className="size-3.5" /> },
  {
    id: "trimestres",
    label: "Trimestres",
    icon: <LayoutGrid className="size-3.5" />,
  },
  {
    id: "cursos",
    label: "Cursos",
    icon: <GraduationCap className="size-3.5" />,
  },
  {
    id: "disciplinas",
    label: "Disciplinas",
    icon: <BookOpen className="size-3.5" />,
  },
  { id: "avaliacao", label: "Avaliação", icon: <Scale className="size-3.5" /> },
  {
    id: "utilizadores",
    label: "Utilizadores",
    icon: <Shield className="size-3.5" />,
  },
];

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-zinc-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
      />
    </div>
  );
}

function InstituicaoTab() {
  const [data, setData] = useState<Instituicao>(INSTITUICAO_MOCK);
  const [saved, setSaved] = useState(false);
  const handle = (k: keyof Instituicao, v: string) =>
    setData((p) => ({ ...p, [k]: v }));
  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-zinc-800">
          Informações da Instituição
        </p>
        <Button
          size="sm"
          onClick={save}
          className={cn(
            "gap-2 text-white",
            saved ? "bg-emerald-600" : "bg-primary hover:bg-primary/90",
          )}
        >
          <Save className="size-3.5" />
          {saved ? "Guardado!" : "Guardar"}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextField
          label="Nome da Instituição"
          value={data.nome}
          onChange={(v) => handle("nome", v)}
        />
        <TextField
          label="Sigla"
          value={data.sigla}
          onChange={(v) => handle("sigla", v)}
        />
        <TextField
          label="Director"
          value={data.diretor}
          onChange={(v) => handle("diretor", v)}
        />
        <div className="sm:col-span-2 lg:col-span-3">
          <TextField
            label="Endereço"
            value={data.endereco}
            onChange={(v) => handle("endereco", v)}
          />
        </div>
        <TextField
          label="Telefone"
          value={data.telefone}
          onChange={(v) => handle("telefone", v)}
        />
        <TextField
          label="Email"
          value={data.email}
          onChange={(v) => handle("email", v)}
        />
        <TextField
          label="Website"
          value={data.website}
          onChange={(v) => handle("website", v)}
        />
      </div>
    </div>
  );
}

function AnoLectivoTab() {
  const [anos, setAnos] = useState<AnoLectivo[]>(ANO_LECTIVO_MOCK);
  const [novoAno, setNovoAno] = useState("");
  const toggleAtivo = (ano: string) =>
    setAnos((p) => p.map((a) => ({ ...a, ativo: a.ano === ano })));
  const addAno = () => {
    if (!novoAno) return;
    const [start] = novoAno.split("-");
    setAnos((p) => [
      ...p,
      {
        ano: novoAno,
        dataInicio: `${start}-09-01`,
        dataFim: `${Number(start) + 1}-07-31`,
        ativo: false,
      },
    ]);
    setNovoAno("");
  };
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-bold text-zinc-800">
        Configuração do Ano Lectivo
      </p>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={novoAno}
          onChange={(e) => setNovoAno(e.target.value)}
          placeholder="Ex: 2027-2028"
          className="w-48 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <Button
          size="sm"
          onClick={addAno}
          className="bg-primary hover:bg-primary/90 text-white gap-2"
        >
          <Plus className="size-3.5" />
          Adicionar
        </Button>
      </div>
      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-primary text-white text-xs font-semibold">
              <th className="px-4 py-3 text-left">Ano Lectivo</th>
              <th className="px-4 py-3 text-left">Início</th>
              <th className="px-4 py-3 text-left">Fim</th>
              <th className="px-4 py-3 text-center w-28">Estado</th>
            </tr>
          </thead>
          <tbody>
            {anos.map((a, idx) => (
              <tr
                key={a.ano}
                className={cn(
                  "border-b border-zinc-100",
                  idx % 2 === 1 && "bg-[#f5c9a0]/15",
                )}
              >
                <td className="px-4 py-3 text-sm font-semibold text-zinc-800">
                  {a.ano}
                </td>
                <td className="px-4 py-3 text-xs text-zinc-600">
                  {a.dataInicio}
                </td>
                <td className="px-4 py-3 text-xs text-zinc-600">{a.dataFim}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleAtivo(a.ano)}
                    className={cn(
                      "rounded-full px-3 py-1 text-[11px] font-semibold border transition-colors",
                      a.ativo
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-white text-zinc-400 border-zinc-200",
                    )}
                  >
                    {a.ativo ? "Activo" : "Definir como activo"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TrimestresTab() {
  const [trimestres, setTrimestres] =
    useState<TrimestreConfig[]>(TRIMESTRES_MOCK);
  const update = (id: string, k: keyof TrimestreConfig, v: string) =>
    setTrimestres((p) => p.map((t) => (t.id === id ? { ...t, [k]: v } : t)));
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-bold text-zinc-800">
        Definição de Trimestres / Períodos
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trimestres.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border border-zinc-200 p-4 flex flex-col gap-3"
          >
            <p className="text-xs font-bold text-primary uppercase">{t.nome}</p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-zinc-500">
                  Início
                </label>
                <input
                  type="date"
                  value={t.dataInicio}
                  onChange={(e) => update(t.id, "dataInicio", e.target.value)}
                  className="rounded-md border border-zinc-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-zinc-500">
                  Fim
                </label>
                <input
                  type="date"
                  value={t.dataFim}
                  onChange={(e) => update(t.id, "dataFim", e.target.value)}
                  className="rounded-md border border-zinc-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CursosTab() {
  const [cursos] = useState<CursoConfig[]>(CURSOS_MOCK);
  const [turmas, setTurmas] = useState<TurmaConfig[]>(TURMAS_MOCK);
  const [novaTurma, setNovaTurma] = useState({
    nome: "",
    curso: "Informática" as CursoNome,
    classe: "10ª",
    vagas: 30,
  });
  const addTurma = () => {
    if (!novaTurma.nome) return;
    setTurmas((p) => [
      ...p,
      { ...novaTurma, id: `t${Date.now()}`, vagas: Number(novaTurma.vagas) },
    ]);
    setNovaTurma({
      nome: "",
      curso: "Informática" as CursoNome,
      classe: "10ª",
      vagas: 30,
    });
  };
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-bold text-zinc-800">Cursos</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cursos.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-zinc-200 p-4 flex items-center gap-4"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <GraduationCap className="size-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-800">{c.nome}</p>
              <p className="text-xs text-zinc-500">
                {c.descricao} · Sigla {c.sigla}
              </p>
              <Badge
                variant="outline"
                className={cn(
                  "mt-1 text-[10px]",
                  c.ativo
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-zinc-100 text-zinc-500",
                )}
              >
                {c.ativo ? "Activo" : "Inactivo"}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-100 pt-5">
        <p className="text-sm font-bold text-zinc-800 mb-3">Turmas</p>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <input
            type="text"
            value={novaTurma.nome}
            onChange={(e) =>
              setNovaTurma((p) => ({ ...p, nome: e.target.value }))
            }
            placeholder="Ex: IN13A"
            className="w-28 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <select
            value={novaTurma.curso}
            onChange={(e) =>
              setNovaTurma((p) => ({
                ...p,
                curso: e.target.value as CursoNome,
              }))
            }
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option>Informática</option>
            <option>Electrónica</option>
          </select>
          <select
            value={novaTurma.classe}
            onChange={(e) =>
              setNovaTurma((p) => ({ ...p, classe: e.target.value }))
            }
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option>10ª</option>
            <option>11ª</option>
            <option>12ª</option>
          </select>
          <input
            type="number"
            value={novaTurma.vagas}
            onChange={(e) =>
              setNovaTurma((p) => ({ ...p, vagas: Number(e.target.value) }))
            }
            placeholder="Vagas"
            className="w-20 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <Button
            size="sm"
            onClick={addTurma}
            className="bg-primary hover:bg-primary/90 text-white gap-1"
          >
            <Plus className="size-3.5" />
            Adicionar
          </Button>
        </div>
        <div className="rounded-xl border border-zinc-200 overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-primary text-white text-xs font-semibold">
                <th className="px-4 py-3 text-left">Turma</th>
                <th className="px-4 py-3 text-left">Curso</th>
                <th className="px-4 py-3 text-left">Classe</th>
                <th className="px-4 py-3 text-center">Vagas</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((t, idx) => (
                <tr
                  key={t.id}
                  className={cn(
                    "border-b border-zinc-100",
                    idx % 2 === 1 && "bg-[#f5c9a0]/15",
                  )}
                >
                  <td className="px-4 py-3 text-sm font-semibold text-zinc-800">
                    {t.nome}
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-600">{t.curso}</td>
                  <td className="px-4 py-3 text-xs text-zinc-600">
                    {t.classe}
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-600 text-center">
                    {t.vagas}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DisciplinasTab() {
  const [disciplinas, setDisciplinas] =
    useState<DisciplinaCurso[]>(DISCIPLINAS_MOCK);
  const [filterCurso, setFilterCurso] = useState<CursoNome | "todas">("todas");
  const [filterClasse, setFilterClasse] = useState<string>("todas");
  const [novaDisc, setNovaDisc] = useState({
    nome: "",
    curso: "Informática" as CursoNome,
    classe: "10ª",
    cargaHoraria: 3,
  });

  const filtered = disciplinas.filter((d) => {
    if (filterCurso !== "todas" && d.curso !== filterCurso) return false;
    if (filterClasse !== "todas" && d.classe !== filterClasse) return false;
    return true;
  });

  const classes = Array.from(new Set(disciplinas.map((d) => d.classe))).sort();

  const addDisc = () => {
    if (!novaDisc.nome) return;
    setDisciplinas((p) => [...p, { ...novaDisc, id: `d${Date.now()}` }]);
    setNovaDisc({
      nome: "",
      curso: "Informática" as CursoNome,
      classe: "10ª",
      cargaHoraria: 3,
    });
  };

  const removeDisc = (id: string) =>
    setDisciplinas((p) => p.filter((d) => d.id !== id));

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-bold text-zinc-800">
        Disciplinas por Curso / Classe
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-semibold text-zinc-500 uppercase">
            Curso:
          </span>
          {(["todas", "Informática", "Electrónica"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilterCurso(c)}
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] font-semibold border transition-colors",
                filterCurso === c
                  ? "bg-primary text-white border-primary"
                  : "text-zinc-500 border-zinc-200",
              )}
            >
              {c === "todas" ? "Todas" : c}
            </button>
          ))}
        </div>
        <span className="text-zinc-300">|</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-semibold text-zinc-500 uppercase">
            Classe:
          </span>
          {(["todas", ...classes] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilterClasse(c)}
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] font-semibold border transition-colors",
                filterClasse === c
                  ? "bg-primary text-white border-primary"
                  : "text-zinc-500 border-zinc-200",
              )}
            >
              {c === "todas" ? "Todas" : c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <input
          type="text"
          value={novaDisc.nome}
          onChange={(e) => setNovaDisc((p) => ({ ...p, nome: e.target.value }))}
          placeholder="Nome da disciplina"
          className="w-48 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <select
          value={novaDisc.curso}
          onChange={(e) =>
            setNovaDisc((p) => ({ ...p, curso: e.target.value as CursoNome }))
          }
          className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option>Informática</option>
          <option>Electrónica</option>
        </select>
        <select
          value={novaDisc.classe}
          onChange={(e) =>
            setNovaDisc((p) => ({ ...p, classe: e.target.value }))
          }
          className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option>10ª</option>
          <option>11ª</option>
          <option>12ª</option>
        </select>
        <input
          type="number"
          value={novaDisc.cargaHoraria}
          onChange={(e) =>
            setNovaDisc((p) => ({ ...p, cargaHoraria: Number(e.target.value) }))
          }
          placeholder="Carga horária"
          className="w-28 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <Button
          size="sm"
          onClick={addDisc}
          className="bg-primary hover:bg-primary/90 text-white gap-1"
        >
          <Plus className="size-3.5" />
          Adicionar
        </Button>
      </div>

      <p className="text-xs text-zinc-400">
        {filtered.length} disciplina{filtered.length !== 1 ? "s" : ""}
      </p>

      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-primary text-white text-xs font-semibold">
              <th className="px-4 py-3 text-left">Disciplina</th>
              <th className="px-4 py-3 text-left">Curso</th>
              <th className="px-4 py-3 text-center">Classe</th>
              <th className="px-4 py-3 text-center">Carga Horária</th>
              <th className="px-4 py-3 text-center w-16"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, idx) => (
              <tr
                key={d.id}
                className={cn(
                  "border-b border-zinc-100",
                  idx % 2 === 1 && "bg-[#f5c9a0]/15",
                )}
              >
                <td className="px-4 py-3 text-sm font-semibold text-zinc-800">
                  {d.nome}
                </td>
                <td className="px-4 py-3 text-xs text-zinc-600">{d.curso}</td>
                <td className="px-4 py-3 text-xs text-zinc-600 text-center">
                  {d.classe}
                </td>
                <td className="px-4 py-3 text-xs text-zinc-600 text-center">
                  {d.cargaHoraria}h/sem
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => removeDisc(d.id)}
                    title="Remover"
                    className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors mx-auto"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AvaliacaoTab() {
  const [params, setParams] = useState<ParametroAvaliacao[]>(
    PARAMETROS_AVALIACAO_MOCK,
  );
  const totalPeso = params.reduce((s, p) => s + p.peso, 0);
  const update = (
    id: string,
    k: keyof ParametroAvaliacao,
    v: number | string,
  ) =>
    setParams((p) =>
      p.map((par) => (par.id === id ? { ...par, [k]: v } : par)),
    );
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-bold text-zinc-800">Parâmetros de Avaliação</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {params.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-zinc-200 p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="bg-primary/5 text-primary border-primary/20 text-xs font-bold"
              >
                {p.sigla}
              </Badge>
              <span className="text-xs text-zinc-400">Ordem {p.ordem}</span>
            </div>
            <p className="text-sm font-bold text-zinc-800">{p.nome}</p>
            <p className="text-xs text-zinc-500">{p.descricao}</p>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-zinc-500">
                Peso ({p.peso}%)
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={p.peso}
                onChange={(e) => update(p.id, "peso", Number(e.target.value))}
                className="w-full accent-primary h-1.5"
              />
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>0%</span>
                <span className="font-bold text-primary">{p.peso}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "rounded-xl border px-4 py-3 flex items-center justify-between",
          totalPeso === 100
            ? "border-emerald-200 bg-emerald-50"
            : "border-red-200 bg-red-50",
        )}
      >
        <div>
          <p className="text-sm font-semibold text-zinc-800">Total dos Pesos</p>
          <p className="text-xs text-zinc-500">
            {totalPeso === 100
              ? "Os parâmetros somam 100% — correcto."
              : `Os parâmetros somam ${totalPeso}% — deve somar exactamente 100%.`}
          </p>
        </div>
        <span
          className={cn(
            "text-lg font-bold",
            totalPeso === 100 ? "text-emerald-600" : "text-red-500",
          )}
        >
          {totalPeso}%
        </span>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
        <p className="text-xs font-semibold text-zinc-700 mb-1">
          Fórmula de Cálculo da Média Trimestral (MT)
        </p>
        <p className="text-xs text-zinc-500 font-mono">
          MT = (PP × {params.find((p) => p.sigla === "PP")?.peso ?? 0}% + PT ×{" "}
          {params.find((p) => p.sigla === "PT")?.peso ?? 0}% + MAC ×{" "}
          {params.find((p) => p.sigla === "MAC")?.peso ?? 0}%) / 100
        </p>
        <p className="text-xs text-zinc-400 mt-1">
          Onde: PP = Prova dos Professores · PT = Prova Trimestral · MAC = Média
          das Avaliações Contínuas
        </p>
      </div>
    </div>
  );
}

function UtilizadoresTab() {
  const [users, setUsers] = useState<UtilizadorAdmin[]>(
    UTILIZADORES_ADMIN_MOCK,
  );
  const [novo, setNovo] = useState({
    nome: "",
    email: "",
    username: "",
    password: "",
  });
  const addUser = () => {
    if (!novo.nome || !novo.email || !novo.username) return;
    setUsers((p) => [
      ...p,
      { id: `u${Date.now()}`, ...novo, role: "admin" as const, ativo: true },
    ]);
    setNovo({ nome: "", email: "", username: "", password: "" });
  };
  const toggleAtivo = (id: string) =>
    setUsers((p) =>
      p.map((u) => (u.id === id ? { ...u, ativo: !u.ativo } : u)),
    );
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-bold text-zinc-800">
        Gestão de Utilizadores Administrativos
      </p>

      <div className="rounded-xl border border-zinc-200 p-4 flex flex-col gap-4">
        <p className="text-xs font-bold text-zinc-500 uppercase">
          Criar Novo Administrador
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            value={novo.nome}
            onChange={(e) => setNovo((p) => ({ ...p, nome: e.target.value }))}
            placeholder="Nome completo"
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <input
            type="email"
            value={novo.email}
            onChange={(e) => setNovo((p) => ({ ...p, email: e.target.value }))}
            placeholder="Email"
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <input
            type="text"
            value={novo.username}
            onChange={(e) =>
              setNovo((p) => ({ ...p, username: e.target.value }))
            }
            placeholder="Username"
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <input
            type="password"
            value={novo.password}
            onChange={(e) =>
              setNovo((p) => ({ ...p, password: e.target.value }))
            }
            placeholder="Senha"
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <Button
            size="sm"
            onClick={addUser}
            className="bg-primary hover:bg-primary/90 text-white gap-2"
          >
            <Plus className="size-3.5" />
            Criar Administrador
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-primary text-white text-xs font-semibold">
              <th className="px-4 py-3 text-left">Nome</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-center">Perfil</th>
              <th className="px-4 py-3 text-center w-24">Estado</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr
                key={u.id}
                className={cn(
                  "border-b border-zinc-100",
                  idx % 2 === 1 && "bg-[#f5c9a0]/15",
                )}
              >
                <td className="px-4 py-3 text-sm font-semibold text-zinc-800">
                  {u.nome}
                </td>
                <td className="px-4 py-3 text-xs text-zinc-600">{u.email}</td>
                <td className="px-4 py-3 text-xs font-mono text-zinc-600">
                  {u.username}
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] font-semibold",
                      u.role === "superadmin"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-blue-50 text-blue-700 border-blue-200",
                    )}
                  >
                    {u.role === "superadmin" ? "Super Admin" : "Admin"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleAtivo(u.id)}
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[11px] font-semibold border transition-colors",
                      u.ativo
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-zinc-100 text-zinc-500 border-zinc-200",
                    )}
                  >
                    {u.ativo ? "Activo" : "Inactivo"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function GeralConfig() {
  const [activeTab, setActiveTab] = useState<TabId>("instituicao");

  return (
    <div className="flex flex-col gap-5">
      {/* Tabs */}
      <div className="flex overflow-x-auto gap-1 bg-zinc-100 rounded-lg p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors",
              activeTab === tab.id
                ? "bg-white text-zinc-800 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700",
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5">
        {activeTab === "instituicao" && <InstituicaoTab />}
        {activeTab === "ano" && <AnoLectivoTab />}
        {activeTab === "trimestres" && <TrimestresTab />}
        {activeTab === "cursos" && <CursosTab />}
        {activeTab === "disciplinas" && <DisciplinasTab />}
        {activeTab === "avaliacao" && <AvaliacaoTab />}
        {activeTab === "utilizadores" && <UtilizadoresTab />}
      </div>
    </div>
  );
}
