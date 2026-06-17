import {
  AUDIT_LOGS,
  type AuditLog,
} from "@/components/admin/admin-dashboard-data";
export { AUDIT_LOGS, type AuditLog };

export type RoleSistema = "admin" | "professor" | "aluno";

export interface Permissao {
  id: string;
  modulo: string;
  descricao: string;
  admin: boolean;
  professor: boolean;
  aluno: boolean;
}

export interface Cargo {
  id: string;
  nome: string;
  descricao: string;
  tipo: "academico" | "administrativo" | "suporte";
  membros: number;
}

export interface Administrador {
  id: string;
  nome: string;
  email: string;
  username: string;
  cargo: string;
  role: "superadmin" | "admin";
  ativo: boolean;
  ultimoAcesso: string;
}

export const PERMISSOES_MOCK: Permissao[] = [
  {
    id: "p1",
    modulo: "Dashboard",
    descricao: "Visualizar dashboard com indicadores",
    admin: true,
    professor: true,
    aluno: true,
  },
  {
    id: "p2",
    modulo: "Estudantes",
    descricao: "Gerir estudantes (CRUD completo)",
    admin: true,
    professor: false,
    aluno: false,
  },
  {
    id: "p3",
    modulo: "Professores",
    descricao: "Gerir professores (CRUD completo)",
    admin: true,
    professor: false,
    aluno: false,
  },
  {
    id: "p4",
    modulo: "Turmas",
    descricao: "Gerir turmas e matérias",
    admin: true,
    professor: true,
    aluno: false,
  },
  {
    id: "p5",
    modulo: "Exames",
    descricao: "Gerir exames e calendário de provas",
    admin: true,
    professor: true,
    aluno: false,
  },
  {
    id: "p6",
    modulo: "Notas",
    descricao: "Lançar e consultar notas",
    admin: true,
    professor: true,
    aluno: false,
  },
  {
    id: "p7",
    modulo: "Boletins",
    descricao: "Consultar boletins de notas",
    admin: true,
    professor: true,
    aluno: true,
  },
  {
    id: "p8",
    modulo: "Horários",
    descricao: "Visualizar horários de aulas e provas",
    admin: true,
    professor: true,
    aluno: true,
  },
  {
    id: "p9",
    modulo: "Convocatórias",
    descricao: "Emitir e consultar convocatórias",
    admin: true,
    professor: true,
    aluno: true,
  },
  {
    id: "p10",
    modulo: "Informações / Avisos",
    descricao: "Publicar e consultar avisos",
    admin: true,
    professor: true,
    aluno: true,
  },
  {
    id: "p11",
    modulo: "Configurações",
    descricao: "Aceder às configurações do sistema",
    admin: true,
    professor: false,
    aluno: false,
  },
  {
    id: "p12",
    modulo: "Utilizadores",
    descricao: "Gerir utilizadores e permissões",
    admin: true,
    professor: false,
    aluno: false,
  },
  {
    id: "p13",
    modulo: "Relatórios",
    descricao: "Gerar relatórios académicos e estatísticos",
    admin: true,
    professor: true,
    aluno: false,
  },
  {
    id: "p14",
    modulo: "Perfil Próprio",
    descricao: "Editar próprio perfil e dados pessoais",
    admin: true,
    professor: true,
    aluno: true,
  },
  {
    id: "p15",
    modulo: "Submissões",
    descricao: "Submeter trabalhos e materiais",
    admin: false,
    professor: false,
    aluno: true,
  },
];

export const CARGOS_MOCK: Cargo[] = [
  {
    id: "c1",
    nome: "Director Geral",
    descricao: "Responsável máximo pela instituição",
    tipo: "administrativo",
    membros: 1,
  },
  {
    id: "c2",
    nome: "Director Pedagógico",
    descricao: "Supervisiona o plano curricular e actividades lectivas",
    tipo: "academico",
    membros: 1,
  },
  {
    id: "c3",
    nome: "Chefe de Departamento",
    descricao: "Coordena as disciplinas de um departamento",
    tipo: "academico",
    membros: 2,
  },
  {
    id: "c4",
    nome: "Coordenador de Curso",
    descricao: "Responsável por um curso (Informática/Electrónica)",
    tipo: "academico",
    membros: 2,
  },
  {
    id: "c5",
    nome: "Secretário Académico",
    descricao: "Gestão de matrículas, processos e arquivo",
    tipo: "administrativo",
    membros: 3,
  },
  {
    id: "c6",
    nome: "Administrador de Sistema",
    descricao: "Gestão técnica da plataforma e utilizadores",
    tipo: "suporte",
    membros: 1,
  },
  {
    id: "c7",
    nome: "Técnico de Informática",
    descricao: "Suporte técnico e manutenção dos equipamentos",
    tipo: "suporte",
    membros: 2,
  },
  {
    id: "c8",
    nome: "Professor",
    descricao: "Docente responsável por disciplinas e turmas",
    tipo: "academico",
    membros: 14,
  },
];

export const ADMINISTRADORES_MOCK: Administrador[] = [
  {
    id: "a1",
    nome: "António Carlos Fernandes",
    email: "antonio.fernandes@ipil.ao",
    username: "acfernandes",
    cargo: "Director Geral",
    role: "superadmin",
    ativo: true,
    ultimoAcesso: "14/06/2026 09:30",
  },
  {
    id: "a2",
    nome: "Maria da Conceição Santos",
    email: "maria.santos@ipil.ao",
    username: "mcsantos",
    cargo: "Director Pedagógico",
    role: "admin",
    ativo: true,
    ultimoAcesso: "14/06/2026 08:15",
  },
  {
    id: "a3",
    nome: "João Pedro Lukombo",
    email: "joao.lukombo@ipil.ao",
    username: "jplukombo",
    cargo: "Secretário Académico",
    role: "admin",
    ativo: true,
    ultimoAcesso: "13/06/2026 17:45",
  },
  {
    id: "a4",
    nome: "Ana Paula Kiala",
    email: "ana.kiala@ipil.ao",
    username: "apkiala",
    cargo: "Administrador de Sistema",
    role: "admin",
    ativo: true,
    ultimoAcesso: "14/06/2026 10:00",
  },
  {
    id: "a5",
    nome: "Fernando Miguel Tavares",
    email: "fernando.tavares@ipil.ao",
    username: "fmtavares",
    cargo: "Coordenador de Curso",
    role: "admin",
    ativo: false,
    ultimoAcesso: "10/06/2026 14:20",
  },
];
