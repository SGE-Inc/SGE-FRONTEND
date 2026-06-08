// ── Types ─────────────────────────────────────────────────────────────────────

export interface StatCard {
  label: string;
  value: string | number;
  sub: string;
  icon: "book" | "users" | "calendar" | "chart";
  trend?: { value: string; up: boolean };
}

export interface WeeklyLesson {
  dia: string; // "Seg", "Ter", ...
  date: string; // "09/06"
  aulas: { hora: string; turma: string; disciplina: string }[];
}

export interface ProximoEvento {
  tipo: "exame" | "reuniao" | "entrega";
  titulo: string;
  data: string;
  turma: string;
}

export interface MaterialPartilhado {
  titulo: string;
  disciplina: string;
  turma: string;
  data: string;
  tipo: "pdf" | "doc" | "link";
}

export interface TurmaDesempenho {
  turma: string;
  disciplina: string;
  media: number; // 0-20
  positivas: number; // percentage
  negativas: number;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

export const STATS: StatCard[] = [
  {
    label: "Aulas Leccionadas",
    value: 24,
    sub: "este mês",
    icon: "book",
    trend: { value: "+3 esta semana", up: true },
  },
  {
    label: "Total de Estudantes",
    value: 87,
    sub: "sob responsabilidade",
    icon: "users",
    trend: { value: "3 turmas", up: true },
  },
  {
    label: "Próximo Exame",
    value: "18 Jun",
    sub: "Química · QI10B",
    icon: "calendar",
    trend: { value: "em 10 dias", up: false },
  },
  {
    label: "Média Geral",
    value: "14.2",
    sub: "média das turmas",
    icon: "chart",
    trend: { value: "+0.8 vs trimestre anterior", up: true },
  },
];

export const WEEKLY_SCHEDULE: WeeklyLesson[] = [
  {
    dia: "Seg",
    date: "09/06",
    aulas: [
      { hora: "07:00", turma: "QI10B", disciplina: "Química" },
      { hora: "08:40", turma: "QI11A", disciplina: "Química Orgânica" },
    ],
  },
  {
    dia: "Ter",
    date: "10/06",
    aulas: [{ hora: "07:50", turma: "QI10B", disciplina: "Química" }],
  },
  {
    dia: "Qua",
    date: "11/06",
    aulas: [
      { hora: "07:00", turma: "QI11A", disciplina: "Química Orgânica" },
      { hora: "10:30", turma: "QI12B", disciplina: "Q. Analítica" },
    ],
  },
  {
    dia: "Qui",
    date: "12/06",
    aulas: [],
  },
  {
    dia: "Sex",
    date: "13/06",
    aulas: [
      { hora: "07:00", turma: "QI10B", disciplina: "Química" },
      { hora: "08:40", turma: "QI12B", disciplina: "Q. Analítica" },
      { hora: "10:30", turma: "QI11A", disciplina: "Química Orgânica" },
    ],
  },
];

export const PROXIMOS_EVENTOS: ProximoEvento[] = [
  {
    tipo: "exame",
    titulo: "2ª Prova dos Professores — Química",
    data: "18/06/2026",
    turma: "QI10B",
  },
  {
    tipo: "reuniao",
    titulo: "Reunião do Conselho Pedagógico",
    data: "20/06/2026",
    turma: "Todos",
  },
  {
    tipo: "exame",
    titulo: "2ª Prova dos Professores — Q. Analítica",
    data: "22/06/2026",
    turma: "QI12B",
  },
  {
    tipo: "entrega",
    titulo: "Entrega de Notas do II Trimestre",
    data: "30/06/2026",
    turma: "Todas as turmas",
  },
];

export const MATERIAIS: MaterialPartilhado[] = [
  {
    titulo: "Ficha de exercícios — Reacções Ácido-Base",
    disciplina: "Química",
    turma: "QI10B",
    data: "05/06/2026",
    tipo: "pdf",
  },
  {
    titulo: "Slides — Hidrocarbonetos Aromáticos",
    disciplina: "Química Orgânica",
    turma: "QI11A",
    data: "03/06/2026",
    tipo: "doc",
  },
  {
    titulo: "Vídeo — Titulação Potenciométrica",
    disciplina: "Q. Analítica",
    turma: "QI12B",
    data: "01/06/2026",
    tipo: "link",
  },
  {
    titulo: "Teste formativo — Estequiometria",
    disciplina: "Química",
    turma: "QI10B",
    data: "28/05/2026",
    tipo: "pdf",
  },
];

export const TURMAS_DESEMPENHO: TurmaDesempenho[] = [
  {
    turma: "QI10B",
    disciplina: "Química",
    media: 14.2,
    positivas: 78,
    negativas: 22,
  },
  {
    turma: "QI11A",
    disciplina: "Química Orgânica",
    media: 13.5,
    positivas: 72,
    negativas: 28,
  },
  {
    turma: "QI12B",
    disciplina: "Q. Analítica",
    media: 15.1,
    positivas: 85,
    negativas: 15,
  },
];
