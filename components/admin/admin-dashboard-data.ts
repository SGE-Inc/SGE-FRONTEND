// ── Stat cards ────────────────────────────────────────────────────────────────
export interface AdminStat {
  label: string;
  value: string | number;
  sub: string;
  icon: "students" | "teachers" | "classes" | "approval";
  trend: { value: string; up: boolean };
}

// ── Recharts data ─────────────────────────────────────────────────────────────
export interface CursoDistribuicao {
  curso: string;
  abrev: string;
  total: number;
  fill: string;
}

export interface MatriculaEvolucao {
  mes: string;
  "2024": number;
  "2025": number;
  "2026": number;
}

export interface MediaDisciplina {
  disciplina: string;
  abrev: string;
  media: number;
  positivas: number; // %
}

// ── Audit log ─────────────────────────────────────────────────────────────────
export type LogTipo = "login" | "matricula" | "nota" | "aviso" | "config" | "exame";

export interface AuditLog {
  id: string;
  tipo: LogTipo;
  descricao: string;
  utilizador: string;
  role: "admin" | "professor" | "aluno";
  data: string;
  hora: string;
}

// ── Calendario académico ──────────────────────────────────────────────────────
export interface EventoAcademico {
  id: string;
  titulo: string;
  data: string;
  tipo: "trimestre" | "exame" | "ferias" | "reuniao" | "entrega";
}

// ══════════════════════════════════════════════════════════════════════════════
// MOCK DATA
// ══════════════════════════════════════════════════════════════════════════════

export const ADMIN_STATS: AdminStat[] = [
  {
    label: "Total de Estudantes",
    value: 1_248,
    sub: "1 190 activos · 58 inactivos",
    icon: "students",
    trend: { value: "+34 este trimestre", up: true },
  },
  {
    label: "Total de Professores",
    value: 64,
    sub: "60 activos · 4 licença",
    icon: "teachers",
    trend: { value: "+2 este mês", up: true },
  },
  {
    label: "Total de Turmas",
    value: 38,
    sub: "Ano lectivo 2025-2026",
    icon: "classes",
    trend: { value: "mesmo que ano anterior", up: true },
  },
  {
    label: "Taxa de Aprovação",
    value: "78%",
    sub: "I Trimestre · todas as turmas",
    icon: "approval",
    trend: { value: "+3% vs trimestre anterior", up: true },
  },
];

export const DISTRIBUICAO_CURSOS: CursoDistribuicao[] = [
  { curso: "Técnico de Química Industrial",       abrev: "Química",      total: 312, fill: "#D2691E" },
  { curso: "Técnico de Electrónica",              abrev: "Electrónica",  total: 287, fill: "#3b82f6" },
  { curso: "Técnico de Informática",              abrev: "Informática",  total: 264, fill: "#10b981" },
  { curso: "Técnico de Mecânica",                 abrev: "Mecânica",     total: 198, fill: "#f59e0b" },
  { curso: "Técnico de Electricidade",            abrev: "Electricidade",total: 187, fill: "#8b5cf6" },
];

export const EVOLUCAO_MATRICULAS: MatriculaEvolucao[] = [
  { mes: "Jan", "2024": 210, "2025": 238, "2026": 252 },
  { mes: "Fev", "2024": 215, "2025": 241, "2026": 258 },
  { mes: "Mar", "2024": 220, "2025": 245, "2026": 261 },
  { mes: "Abr", "2024": 218, "2025": 242, "2026": 259 },
  { mes: "Mai", "2024": 222, "2025": 248, "2026": 265 },
  { mes: "Jun", "2024": 225, "2025": 251, "2026": 270 },
  { mes: "Jul", "2024": 190, "2025": 212, "2026": 220 },
  { mes: "Ago", "2024": 195, "2025": 218, "2026": 228 },
  { mes: "Set", "2024": 228, "2025": 255, "2026": 275 },
  { mes: "Out", "2024": 231, "2025": 258, "2026": 0 },
  { mes: "Nov", "2024": 229, "2025": 255, "2026": 0 },
  { mes: "Dez", "2024": 224, "2025": 250, "2026": 0 },
];

export const MEDIA_DISCIPLINAS: MediaDisciplina[] = [
  { disciplina: "Química",          abrev: "QUI",  media: 14.2, positivas: 78 },
  { disciplina: "Física",           abrev: "FIS",  media: 12.8, positivas: 68 },
  { disciplina: "Matemática",       abrev: "MAT",  media: 11.5, positivas: 61 },
  { disciplina: "Inglês",           abrev: "ING",  media: 15.1, positivas: 83 },
  { disciplina: "Português",        abrev: "PORT", media: 13.7, positivas: 75 },
  { disciplina: "Informática",      abrev: "INF",  media: 15.8, positivas: 88 },
  { disciplina: "Q. Analítica",     abrev: "QANL", media: 13.4, positivas: 72 },
  { disciplina: "Química Orgânica", abrev: "QORG", media: 13.9, positivas: 76 },
];

export const AUDIT_LOGS: AuditLog[] = [
  {
    id: "l1",
    tipo: "matricula",
    descricao: "Nova matrícula registada: DANIEL COSTA — QI10C",
    utilizador: "Admin IPIL",
    role: "admin",
    data: "12/06/2026",
    hora: "09:14",
  },
  {
    id: "l2",
    tipo: "nota",
    descricao: "Notas do I Trimestre lançadas — Química · QI10B",
    utilizador: "Prof. Margarida Silva",
    role: "professor",
    data: "12/06/2026",
    hora: "08:52",
  },
  {
    id: "l3",
    tipo: "login",
    descricao: "Sessão iniciada no portal do aluno",
    utilizador: "Benjamim Tambue (80727)",
    role: "aluno",
    data: "12/06/2026",
    hora: "08:30",
  },
  {
    id: "l4",
    tipo: "exame",
    descricao: "Exame criado: 2ª Prova dos Professores — Q. Analítica · 22/06",
    utilizador: "Prof. Ernesto Lukoki",
    role: "professor",
    data: "11/06/2026",
    hora: "17:05",
  },
  {
    id: "l5",
    tipo: "aviso",
    descricao: "Informação publicada: Prorrogação das inscrições para exames especiais",
    utilizador: "Admin IPIL",
    role: "admin",
    data: "11/06/2026",
    hora: "14:22",
  },
  {
    id: "l6",
    tipo: "config",
    descricao: "Calendário académico actualizado — III Trimestre 2026",
    utilizador: "Admin IPIL",
    role: "admin",
    data: "10/06/2026",
    hora: "11:47",
  },
  {
    id: "l7",
    tipo: "matricula",
    descricao: "Matrícula inactivada: CARLOS MENDES — QI11A (transferência)",
    utilizador: "Admin IPIL",
    role: "admin",
    data: "10/06/2026",
    hora: "10:03",
  },
  {
    id: "l8",
    tipo: "nota",
    descricao: "Correcção de nota: SARA LOPES — Física · de 8 para 10",
    utilizador: "Prof. Ernesto Lukoki",
    role: "professor",
    data: "09/06/2026",
    hora: "16:30",
  },
];

export const CALENDARIO_ACADEMICO: EventoAcademico[] = [
  { id: "c1", titulo: "Início do II Trimestre",             data: "07/04/2026", tipo: "trimestre" },
  { id: "c2", titulo: "1ª Prova dos Professores",           data: "09/06/2026", tipo: "exame" },
  { id: "c3", titulo: "Fim da 1ª Prova dos Professores",    data: "13/06/2026", tipo: "exame" },
  { id: "c4", titulo: "Reunião Pedagógica Intercalar",      data: "20/06/2026", tipo: "reuniao" },
  { id: "c5", titulo: "2ª Prova dos Professores",           data: "22/06/2026", tipo: "exame" },
  { id: "c6", titulo: "Entrega de Notas — II Trimestre",    data: "30/06/2026", tipo: "entrega" },
  { id: "c7", titulo: "Férias Escolares",                   data: "04/07/2026", tipo: "ferias" },
  { id: "c8", titulo: "Início do III Trimestre",            data: "28/07/2026", tipo: "trimestre" },
];