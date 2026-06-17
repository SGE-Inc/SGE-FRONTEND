"use client";

import { useState } from "react";
import {
  Shield,
  KeyRound,
  ClipboardList,
  Briefcase,
  Plus,
  Check,
  X,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ADMINISTRADORES_MOCK,
  PERMISSOES_MOCK,
  CARGOS_MOCK,
  AUDIT_LOGS,
  type Administrador,
  type Permissao,
  type Cargo,
  type RoleSistema,
} from "./equipa-data";

type TabId = "administradores" | "permissoes" | "auditoria" | "cargos";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  {
    id: "administradores",
    label: "Administradores",
    icon: <Shield className="size-3.5" />,
  },
  {
    id: "permissoes",
    label: "Perfis de Acesso",
    icon: <KeyRound className="size-3.5" />,
  },
  {
    id: "auditoria",
    label: "Logs de Auditoria",
    icon: <ClipboardList className="size-3.5" />,
  },
  {
    id: "cargos",
    label: "Cargos/Funções",
    icon: <Briefcase className="size-3.5" />,
  },
];

/* ─── Tabela genérica ─── */
function THead({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold text-white">
      {children}
    </th>
  );
}
function THeadCenter({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-center text-xs font-semibold text-white">
      {children}
    </th>
  );
}

/* ─── Tab: Administradores ─── */
function AdministradoresTab() {
  const [admins, setAdmins] = useState<Administrador[]>(ADMINISTRADORES_MOCK);
  const [search, setSearch] = useState("");
  const [novo, setNovo] = useState({
    nome: "",
    email: "",
    username: "",
    cargo: "Professor",
  });

  const filtered = admins.filter(
    (a) =>
      a.nome.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.username.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleAtivo = (id: string) =>
    setAdmins((p) =>
      p.map((a) => (a.id === id ? { ...a, ativo: !a.ativo } : a)),
    );

  const addAdmin = () => {
    if (!novo.nome || !novo.email) return;
    setAdmins((p) => [
      ...p,
      {
        id: `a${Date.now()}`,
        ...novo,
        role: "admin",
        ativo: true,
        ultimoAcesso: "---",
      },
    ]);
    setNovo({ nome: "", email: "", username: "", cargo: "Professor" });
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-bold text-zinc-800">
        Gestão de Administradores do Sistema
      </p>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Pesquisar administradores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-md border border-zinc-200 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 p-4 flex flex-col gap-3">
        <p className="text-xs font-bold text-zinc-500 uppercase">
          Adicionar Administrador
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
          <select
            value={novo.cargo}
            onChange={(e) => setNovo((p) => ({ ...p, cargo: e.target.value }))}
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {CARGOS_MOCK.map((c) => (
              <option key={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <Button
            size="sm"
            onClick={addAdmin}
            className="bg-primary hover:bg-primary/90 text-white gap-2"
          >
            <Plus className="size-3.5" />
            Adicionar
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-primary text-xs font-semibold">
              <THead>Nome</THead>
              <THead>Email</THead>
              <THead>Username</THead>
              <THead>Cargo</THead>
              <THeadCenter>Perfil</THeadCenter>
              <THeadCenter>Último Acesso</THeadCenter>
              <THeadCenter>Estado</THeadCenter>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, idx) => (
              <tr
                key={a.id}
                className={cn(
                  "border-b border-zinc-100",
                  idx % 2 === 1 && "bg-[#f5c9a0]/15",
                )}
              >
                <td className="px-4 py-3 text-sm font-semibold text-zinc-800">
                  {a.nome}
                </td>
                <td className="px-4 py-3 text-xs text-zinc-600">{a.email}</td>
                <td className="px-4 py-3 text-xs font-mono text-zinc-600">
                  {a.username}
                </td>
                <td className="px-4 py-3 text-xs text-zinc-600">{a.cargo}</td>
                <td className="px-4 py-3 text-center">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] font-semibold",
                      a.role === "superadmin"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-blue-50 text-blue-700 border-blue-200",
                    )}
                  >
                    {a.role === "superadmin" ? "Super Admin" : "Admin"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-xs text-zinc-400 text-center">
                  {a.ultimoAcesso}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleAtivo(a.id)}
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[11px] font-semibold border transition-colors",
                      a.ativo
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-zinc-100 text-zinc-500 border-zinc-200",
                    )}
                  >
                    {a.ativo ? "Activo" : "Inactivo"}
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

/* ─── Tab: Permissões ─── */
function PermissoesTab() {
  const [permissoes, setPermissoes] = useState<Permissao[]>(PERMISSOES_MOCK);

  const toggle = (
    id: string,
    role: keyof Omit<Permissao, "id" | "modulo" | "descricao">,
  ) =>
    setPermissoes((p) =>
      p.map((perm) =>
        perm.id === id ? { ...perm, [role]: !perm[role] } : perm,
      ),
    );

  const allChecked = (
    role: keyof Omit<Permissao, "id" | "modulo" | "descricao">,
  ) => permissoes.every((p) => p[role]);
  const toggleAll = (
    role: keyof Omit<Permissao, "id" | "modulo" | "descricao">,
  ) =>
    setPermissoes((p) =>
      p.map((perm) => ({ ...perm, [role]: !allChecked(role) })),
    );

  const roles: { key: RoleSistema; label: string; color: string }[] = [
    { key: "admin", label: "Admin", color: "bg-primary/10 text-primary" },
    { key: "professor", label: "Professor", color: "bg-blue-50 text-blue-700" },
    { key: "aluno", label: "Aluno", color: "bg-zinc-100 text-zinc-600" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-bold text-zinc-800">
        Perfis de Acesso — Permissões por Role
      </p>

      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-primary text-xs font-semibold">
              <th className="px-4 py-3 text-left text-white">Módulo</th>
              <th className="px-4 py-3 text-left text-white">Descrição</th>
              {roles.map((r) => (
                <th
                  key={r.key}
                  className="px-4 py-3 text-center text-white min-w-[90px]"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>{r.label}</span>
                    <button
                      onClick={() => toggleAll(r.key)}
                      title="Alternar todas"
                      className="text-white/60 hover:text-white transition-colors text-[10px] underline"
                    >
                      {allChecked(r.key) ? "limpar" : "tudo"}
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissoes.map((perm, idx) => (
              <tr
                key={perm.id}
                className={cn(
                  "border-b border-zinc-100",
                  idx % 2 === 1 && "bg-[#f5c9a0]/15",
                )}
              >
                <td className="px-4 py-3 text-sm font-semibold text-zinc-800">
                  {perm.modulo}
                </td>
                <td className="px-4 py-3 text-xs text-zinc-500">
                  {perm.descricao}
                </td>
                {roles.map((r) => (
                  <td key={r.key} className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggle(perm.id, r.key)}
                      className={cn(
                        "flex size-7 items-center justify-center rounded-md border transition-colors mx-auto",
                        perm[r.key]
                          ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                          : "bg-white border-zinc-200 text-zinc-300 hover:border-zinc-300",
                      )}
                    >
                      {perm[r.key] ? (
                        <Check className="size-3.5" />
                      ) : (
                        <X className="size-3.5" />
                      )}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Tab: Logs de Auditoria ─── */
const LOG_CONFIG: Record<string, { bg: string; text: string; label: string }> =
  {
    login: { bg: "bg-blue-50", text: "text-blue-600", label: "Login" },
    matricula: {
      bg: "bg-primary/10",
      text: "text-primary",
      label: "Matrícula",
    },
    nota: { bg: "bg-emerald-50", text: "text-emerald-600", label: "Nota" },
    aviso: { bg: "bg-amber-50", text: "text-amber-600", label: "Aviso" },
    config: { bg: "bg-zinc-100", text: "text-zinc-600", label: "Config" },
    exame: { bg: "bg-purple-50", text: "text-purple-600", label: "Exame" },
  };

const ROLE_BADGE: Record<string, string> = {
  admin: "bg-primary/10 text-primary border-primary/20",
  professor: "bg-blue-50 text-blue-700 border-blue-200",
  aluno: "bg-zinc-100 text-zinc-600 border-zinc-200",
};

function AuditoriaTab() {
  const [filterTipo, setFilterTipo] = useState<string>("todos");
  const logs =
    filterTipo === "todos"
      ? AUDIT_LOGS
      : AUDIT_LOGS.filter((l) => l.tipo === filterTipo);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-zinc-800">Logs de Auditoria</p>
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-semibold text-zinc-500 uppercase mr-1">
            Filtrar:
          </span>
          {(
            [
              "todos",
              "login",
              "matricula",
              "nota",
              "aviso",
              "config",
              "exame",
            ] as const
          ).map((t) => (
            <button
              key={t}
              onClick={() => setFilterTipo(t)}
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] font-semibold border transition-colors capitalize",
                filterTipo === t
                  ? "bg-primary text-white border-primary"
                  : "text-zinc-500 border-zinc-200 hover:border-zinc-300",
              )}
            >
              {t === "todos" ? "Todos" : (LOG_CONFIG[t]?.label ?? t)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 divide-y divide-zinc-100">
        {logs.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-zinc-400">
            Nenhum log encontrado.
          </div>
        )}
        {logs.map((log) => {
          const cfg = LOG_CONFIG[log.tipo];
          return (
            <div
              key={log.id}
              className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-50/60 transition-colors"
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg mt-0.5",
                  cfg?.bg ?? "bg-zinc-100",
                )}
              >
                <span
                  className={cn(
                    "size-3.5 text-[10px] font-bold",
                    cfg?.text ?? "text-zinc-500",
                  )}
                >
                  {log.tipo.charAt(0).toUpperCase()}
                </span>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-800 leading-snug">
                  {log.descricao}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-[10px] text-zinc-500 font-medium">
                    {log.utilizador}
                  </span>
                  <span className="text-[10px] text-zinc-300">·</span>
                  <span className="text-[10px] text-zinc-400">
                    {log.data} às {log.hora}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] border",
                    ROLE_BADGE[log.role] ?? "",
                  )}
                >
                  {log.role === "admin"
                    ? "Admin"
                    : log.role === "professor"
                      ? "Professor"
                      : "Aluno"}
                </Badge>
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    cfg?.text ?? "text-zinc-500",
                  )}
                >
                  {cfg?.label ?? log.tipo}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Tab: Cargos ─── */
function CargosTab() {
  const [cargos, setCargos] = useState<Cargo[]>(CARGOS_MOCK);
  const [novo, setNovo] = useState({
    nome: "",
    descricao: "",
    tipo: "academico" as Cargo["tipo"],
  });

  const addCargo = () => {
    if (!novo.nome) return;
    setCargos((p) => [...p, { ...novo, id: `c${Date.now()}`, membros: 0 }]);
    setNovo({ nome: "", descricao: "", tipo: "academico" });
  };

  const TIPO_CONFIG: Record<string, { label: string; class: string }> = {
    academico: {
      label: "Académico",
      class: "bg-blue-50 text-blue-700 border-blue-200",
    },
    administrativo: {
      label: "Administrativo",
      class: "bg-amber-50 text-amber-700 border-amber-200",
    },
    suporte: {
      label: "Suporte",
      class: "bg-purple-50 text-purple-700 border-purple-200",
    },
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-bold text-zinc-800">
        Definição de Cargos / Funções
      </p>

      <div className="rounded-xl border border-zinc-200 p-4 flex flex-col gap-3">
        <p className="text-xs font-bold text-zinc-500 uppercase">Novo Cargo</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            value={novo.nome}
            onChange={(e) => setNovo((p) => ({ ...p, nome: e.target.value }))}
            placeholder="Nome do cargo"
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <input
            type="text"
            value={novo.descricao}
            onChange={(e) =>
              setNovo((p) => ({ ...p, descricao: e.target.value }))
            }
            placeholder="Descrição"
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 sm:col-span-2"
          />
          <select
            value={novo.tipo}
            onChange={(e) =>
              setNovo((p) => ({ ...p, tipo: e.target.value as Cargo["tipo"] }))
            }
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="academico">Académico</option>
            <option value="administrativo">Administrativo</option>
            <option value="suporte">Suporte</option>
          </select>
        </div>
        <div>
          <Button
            size="sm"
            onClick={addCargo}
            className="bg-primary hover:bg-primary/90 text-white gap-2"
          >
            <Plus className="size-3.5" />
            Criar Cargo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cargos.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-zinc-200 p-4 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-zinc-800">{c.nome}</p>
              <Badge
                variant="outline"
                className={cn("text-[10px]", TIPO_CONFIG[c.tipo]?.class ?? "")}
              >
                {TIPO_CONFIG[c.tipo]?.label ?? c.tipo}
              </Badge>
            </div>
            <p className="text-xs text-zinc-500">{c.descricao}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-primary">
                {c.membros}
              </span>
              <span className="text-[10px] text-zinc-400">
                membro{c.membros !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main ─── */
export function EquipaConfig() {
  const [activeTab, setActiveTab] = useState<TabId>("administradores");

  return (
    <div className="flex flex-col gap-5">
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

      <div className="rounded-xl border border-zinc-200 bg-white p-5">
        {activeTab === "administradores" && <AdministradoresTab />}
        {activeTab === "permissoes" && <PermissoesTab />}
        {activeTab === "auditoria" && <AuditoriaTab />}
        {activeTab === "cargos" && <CargosTab />}
      </div>
    </div>
  );
}
