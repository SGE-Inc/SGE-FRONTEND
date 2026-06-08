export type Trimestre = "I TRIMESTRE" | "II TRIMESTRE" | "III TRIMESTRE";

export interface ProfessorInfo {
  id: string;
  nome: string;
  email: string;
  disciplinas: string[];
  turmas: string[];
}

export interface AulaStats {
  totalHoras: number;
  totalAulas: number;
  mediaGeral: number;
  estudantes: number;
  turmas: number;
}

export interface ProximoEvento {
  tipo: "exame" | "reuniao" | "prazo";
  titulo: string;
  data: string;
  hora: string;
  disciplina: string;
}

export interface ProfessorMaterial {
  id: string;
  titulo: string;
  descricao: string;
  tipo: "pdf" | "doc" | "xls" | "csv" | "img" | "outro";
  ficheiro: string;
  tamanho: string;
  data: string;
  disciplinaId: string;
  disciplinaNome: string;
}

export interface SubmissaoAluno {
  id: string;
  alunoNome: string;
  alunoNumero: string;
  titulo: string;
  descricao: string;
  tipo: string;
  ficheiro: string;
  tamanho: string;
  data: string;
  disciplinaId: string;
  status: "pendente" | "aprovado" | "rejeitado";
  comentario?: string;
}

export interface AlunoNota {
  id: string;
  nome: string;
  numero: string;
  turma: string;
  faltasJ: string;
  faltasI: string;
  pp: string | number;
  pt: string | number;
  mt: string | number;
}

export interface ExameItem {
  id: string;
  disciplina: string;
  turma: string;
  data: string;
  hora: string;
  sala: string;
  tipo: "1ª PROVA" | "2ª PROVA" | "EXAME FINAL" | "RECURSO";
  trimestre: Trimestre;
  estado: "agendado" | "realizado" | "cancelado";
}

export const PROFESSOR_MOCK: ProfessorInfo = {
  id: "PROF001",
  nome: "Prof. Maria Silva",
  email: "maria@prof.ao",
  disciplinas: ["Matemática", "Física"],
  turmas: ["QI10B", "QI11A"],
};

export const DASHBOARD_STATS: AulaStats = {
  totalHoras: 24,
  totalAulas: 32,
  mediaGeral: 14,
  estudantes: 58,
  turmas: 2,
};

export const PROXIMOS_EVENTOS: ProximoEvento[] = [
  {
    tipo: "exame",
    titulo: "Teste de Matemática - QI10B",
    data: "2026-06-12",
    hora: "08:00",
    disciplina: "Matemática",
  },
  {
    tipo: "exame",
    titulo: "Teste de Física - QI11A",
    data: "2026-06-15",
    hora: "10:00",
    disciplina: "Física",
  },
  {
    tipo: "prazo",
    titulo: "Entrega de notas I Trimestre",
    data: "2026-06-20",
    hora: "17:00",
    disciplina: "Ambas",
  },
  {
    tipo: "reuniao",
    titulo: "Reunião de Professores",
    data: "2026-06-10",
    hora: "14:00",
    disciplina: "-",
  },
];

export const PROFESSOR_MATERIAIS: ProfessorMaterial[] = [
  {
    id: "pm1",
    titulo: "Funções Trigonométricas",
    descricao: "Material de apoio sobre funções seno, cosseno e tangente.",
    tipo: "pdf",
    ficheiro: "funcoes_trigonometricas.pdf",
    tamanho: "2.4 MB",
    data: "2026-05-20",
    disciplinaId: "mat",
    disciplinaNome: "Matemática",
  },
  {
    id: "pm2",
    titulo: "Exercícios de Limites",
    descricao: "Lista de exercícios sobre limites de funções.",
    tipo: "doc",
    ficheiro: "exercicios_limites.docx",
    tamanho: "1.1 MB",
    data: "2026-05-15",
    disciplinaId: "mat",
    disciplinaNome: "Matemática",
  },
  {
    id: "pm3",
    titulo: "Leis de Newton",
    descricao: "Material explicativo sobre as três leis de Newton.",
    tipo: "pdf",
    ficheiro: "leis_newton.pdf",
    tamanho: "4.1 MB",
    data: "2026-05-19",
    disciplinaId: "fis",
    disciplinaNome: "Física",
  },
  {
    id: "pm4",
    titulo: "Exercícios de Cinemática",
    descricao: "Lista de exercícios sobre movimento uniforme.",
    tipo: "pdf",
    ficheiro: "cinematica_exercicios.pdf",
    tamanho: "2.0 MB",
    data: "2026-05-05",
    disciplinaId: "fis",
    disciplinaNome: "Física",
  },
];

export const SUBMISSOES_PENDENTES: SubmissaoAluno[] = [
  {
    id: "s1",
    alunoNome: "Igor Francisco Pedro",
    alunoNumero: "20",
    titulo: "Resolução Exercícios Limites",
    descricao: "Resolução dos exercícios ímpares da lista de limites.",
    tipo: "pdf",
    ficheiro: "resolucao_limites_igor.pdf",
    tamanho: "1.8 MB",
    data: "2026-05-25",
    disciplinaId: "mat",
    status: "pendente",
  },
  {
    id: "s2",
    alunoNome: "Ana Paula Santos",
    alunoNumero: "05",
    titulo: "Trabalho Prático - Leis de Newton",
    descricao: "Apresentação sobre a 2ª Lei de Newton com exemplos práticos.",
    tipo: "doc",
    ficheiro: "trabalho_newton_ana.docx",
    tamanho: "2.3 MB",
    data: "2026-05-24",
    disciplinaId: "fis",
    status: "pendente",
  },
  {
    id: "s3",
    alunoNome: "Carlos Mendes",
    alunoNumero: "11",
    titulo: "Exercícios Adicionais",
    descricao: "Exercícios extras sobre integrais.",
    tipo: "pdf",
    ficheiro: "exercicios_extra_carlos.pdf",
    tamanho: "0.9 MB",
    data: "2026-05-23",
    disciplinaId: "mat",
    status: "aprovado",
    comentario: "Bom trabalho! Continue assim.",
  },
  {
    id: "s4",
    alunoNome: "Marta Lopes",
    alunoNumero: "18",
    titulo: "Experiência - Plano Inclinado",
    descricao: "Dados e resultados da experiência laboratorial.",
    tipo: "xls",
    ficheiro: "plano_inclinado_marta.xlsx",
    tamanho: "0.6 MB",
    data: "2026-05-22",
    disciplinaId: "fis",
    status: "rejeitado",
    comentario:
      "Faltam os cálculos de incerteza. Refazer e submeter novamente.",
  },
];

export const ALUNOS_NOTAS: AlunoNota[] = [
  {
    id: "a1",
    nome: "Igor Francisco Pedro",
    numero: "20",
    turma: "QI10B",
    faltasJ: "2",
    faltasI: "0",
    pp: 15,
    pt: 14,
    mt: 15,
  },
  {
    id: "a2",
    nome: "Ana Paula Santos",
    numero: "05",
    turma: "QI10B",
    faltasJ: "0",
    faltasI: "1",
    pp: 16,
    pt: 17,
    mt: 17,
  },
  {
    id: "a3",
    nome: "Carlos Mendes",
    numero: "11",
    turma: "QI10B",
    faltasJ: "1",
    faltasI: "0",
    pp: 13,
    pt: 12,
    mt: 13,
  },
  {
    id: "a4",
    nome: "Marta Lopes",
    numero: "18",
    turma: "QI10B",
    faltasJ: "3",
    faltasI: "1",
    pp: 10,
    pt: 11,
    mt: 11,
  },
  {
    id: "a5",
    nome: "Benjamim Etiene Tshimbu Tambue",
    numero: "11",
    turma: "QI10B",
    faltasJ: "0",
    faltasI: "0",
    pp: 18,
    pt: 17,
    mt: 18,
  },
  {
    id: "a6",
    nome: "Sofia Andrade",
    numero: "24",
    turma: "QI10B",
    faltasJ: "0",
    faltasI: "0",
    pp: 19,
    pt: 20,
    mt: 20,
  },
  {
    id: "a7",
    nome: "João Menezes",
    numero: "09",
    turma: "QI10B",
    faltasJ: "4",
    faltasI: "2",
    pp: 8,
    pt: 9,
    mt: 9,
  },
  {
    id: "a8",
    nome: "Diana Cabral",
    numero: "07",
    turma: "QI10B",
    faltasJ: "1",
    faltasI: "0",
    pp: 14,
    pt: 15,
    mt: 15,
  },
  {
    id: "a9",
    nome: "Lucas Pereira",
    numero: "15",
    turma: "QI10B",
    faltasJ: "0",
    faltasI: "1",
    pp: 12,
    pt: 11,
    mt: 12,
  },
  {
    id: "a10",
    nome: "Rita Gomes",
    numero: "22",
    turma: "QI10B",
    faltasJ: "0",
    faltasI: "0",
    pp: 17,
    pt: 18,
    mt: 18,
  },
  {
    id: "a11",
    nome: "Pedro Afonso",
    numero: "02",
    turma: "QI11A",
    faltasJ: "2",
    faltasI: "0",
    pp: 11,
    pt: 13,
    mt: 12,
  },
  {
    id: "a12",
    nome: "Cláudia Neto",
    numero: "06",
    turma: "QI11A",
    faltasJ: "0",
    faltasI: "0",
    pp: 16,
    pt: 15,
    mt: 16,
  },
  {
    id: "a13",
    nome: "André Cardoso",
    numero: "03",
    turma: "QI11A",
    faltasJ: "1",
    faltasI: "1",
    pp: 9,
    pt: 10,
    mt: 10,
  },
  {
    id: "a14",
    nome: "Tânia Soares",
    numero: "25",
    turma: "QI11A",
    faltasJ: "0",
    faltasI: "0",
    pp: 20,
    pt: 19,
    mt: 20,
  },
  {
    id: "a15",
    nome: "Hélio Martins",
    numero: "14",
    turma: "QI11A",
    faltasJ: "3",
    faltasI: "2",
    pp: 7,
    pt: 8,
    mt: 8,
  },
];

export const EXAMES_LISTA: ExameItem[] = [
  {
    id: "e1",
    disciplina: "Matemática",
    turma: "QI10B",
    data: "2026-06-12",
    hora: "08:00",
    sala: "Sala 201",
    tipo: "1ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "agendado",
  },
  {
    id: "e2",
    disciplina: "Física",
    turma: "QI11A",
    data: "2026-06-15",
    hora: "10:00",
    sala: "Sala 203",
    tipo: "1ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "agendado",
  },
  {
    id: "e3",
    disciplina: "Matemática",
    turma: "QI10B",
    data: "2026-04-10",
    hora: "08:00",
    sala: "Sala 201",
    tipo: "1ª PROVA",
    trimestre: "I TRIMESTRE",
    estado: "realizado",
  },
  {
    id: "e4",
    disciplina: "Física",
    turma: "QI11A",
    data: "2026-04-12",
    hora: "10:00",
    sala: "Sala 203",
    tipo: "1ª PROVA",
    trimestre: "I TRIMESTRE",
    estado: "realizado",
  },
  {
    id: "e5",
    disciplina: "Matemática",
    turma: "QI10B",
    data: "2026-05-22",
    hora: "08:00",
    sala: "Sala 205",
    tipo: "2ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "realizado",
  },
  {
    id: "e6",
    disciplina: "Física",
    turma: "QI11A",
    data: "2026-05-25",
    hora: "10:00",
    sala: "Sala 207",
    tipo: "2ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "agendado",
  },
  {
    id: "e7",
    disciplina: "Matemática",
    turma: "QI11A",
    data: "2026-06-19",
    hora: "08:00",
    sala: "Sala 210",
    tipo: "EXAME FINAL",
    trimestre: "II TRIMESTRE",
    estado: "agendado",
  },
];

export function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function isNegativa(val: string | number): boolean {
  if (val === "-") return false;
  return Number(val) < 10;
}
