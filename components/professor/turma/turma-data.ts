// ── Types ─────────────────────────────────────────────────────────────────────

export interface Disciplina {
  id: string;
  nome: string;
  turma: string;
  totalAlunos: number;
  materiaisCount: number;
  submissoesCount: number; // pending
  cor: string; // tailwind bg class
  corText: string;
}

export interface Material {
  id: string;
  titulo: string;
  descricao: string;
  tipo: "pdf" | "doc" | "link" | "img";
  url?: string;
  data: string;
  disciplinaId: string;
  visivel: boolean;
}

export interface Submissao {
  id: string;
  alunoNome: string;
  alunoNumero: string;
  titulo: string;
  descricao: string;
  tipo: "pdf" | "doc" | "link" | "img";
  data: string;
  disciplinaId: string;
  status: "pendente" | "aprovado" | "rejeitado";
  comentario?: string;
}

export interface Aviso {
  id: string;
  texto: string;
  data: string;
  disciplinaId: string;
  autor: string;
}

export interface Aluno {
  id: string;
  nome: string;
  numero: string;
  media: number;
  faltas: number;
  status: "regular" | "atencao" | "risco";
}

// ── Mock data ─────────────────────────────────────────────────────────────────

export const DISCIPLINAS: Disciplina[] = [
  {
    id: "qui-qi10b",
    nome: "Química",
    turma: "QI10B",
    totalAlunos: 32,
    materiaisCount: 5,
    submissoesCount: 3,
    cor: "bg-primary/10",
    corText: "text-primary",
  },
  {
    id: "qorg-qi11a",
    nome: "Química Orgânica",
    turma: "QI11A",
    totalAlunos: 28,
    materiaisCount: 3,
    submissoesCount: 1,
    cor: "bg-blue-50",
    corText: "text-blue-700",
  },
  {
    id: "qanal-qi12b",
    nome: "Q. Analítica",
    turma: "QI12B",
    totalAlunos: 27,
    materiaisCount: 4,
    submissoesCount: 0,
    cor: "bg-emerald-50",
    corText: "text-emerald-700",
  },
];

export const MATERIAIS: Material[] = [
  {
    id: "m1",
    titulo: "Ficha de exercícios — Reacções Ácido-Base",
    descricao:
      "Exercícios práticos sobre equilíbrio ácido-base para consolidação dos conteúdos.",
    tipo: "pdf",
    data: "05/06/2026",
    disciplinaId: "qui-qi10b",
    visivel: true,
  },
  {
    id: "m2",
    titulo: "Slides — Tabela Periódica e Tendências",
    descricao:
      "Apresentação completa sobre periodicidade e propriedades dos elementos.",
    tipo: "doc",
    data: "28/05/2026",
    disciplinaId: "qui-qi10b",
    visivel: true,
  },
  {
    id: "m3",
    titulo: "Vídeo — Reacções de Oxidação-Redução",
    descricao:
      "Vídeo demonstrativo das principais reacções redox no laboratório.",
    tipo: "link",
    data: "20/05/2026",
    disciplinaId: "qui-qi10b",
    visivel: true,
  },
  {
    id: "m4",
    titulo: "Teste formativo — Estequiometria",
    descricao:
      "Teste de avaliação formativa com 10 questões sobre cálculos estequiométricos.",
    tipo: "pdf",
    data: "14/05/2026",
    disciplinaId: "qui-qi10b",
    visivel: false,
  },
  {
    id: "m5",
    titulo: "Resumo — Ligações Químicas",
    descricao: "Síntese dos tipos de ligações: iónica, covalente e metálica.",
    tipo: "doc",
    data: "02/05/2026",
    disciplinaId: "qui-qi10b",
    visivel: true,
  },
  {
    id: "m6",
    titulo: "Slides — Hidrocarbonetos Aromáticos",
    descricao: "Conteúdo sobre benzeno e derivados aromáticos.",
    tipo: "doc",
    data: "03/06/2026",
    disciplinaId: "qorg-qi11a",
    visivel: true,
  },
  {
    id: "m7",
    titulo: "Vídeo — Titulação Potenciométrica",
    descricao: "Demonstração prática de titulação em laboratório.",
    tipo: "link",
    data: "01/06/2026",
    disciplinaId: "qanal-qi12b",
    visivel: true,
  },
];

export const SUBMISSOES: Submissao[] = [
  {
    id: "s1",
    alunoNome: "LUÍS ANTÓNIO",
    alunoNumero: "80701",
    titulo: "Relatório — Titulação Ácido-Base",
    descricao:
      "Relatório do trabalho prático realizado no laboratório na semana de 2 de junho.",
    tipo: "pdf",
    data: "07/06/2026",
    disciplinaId: "qui-qi10b",
    status: "pendente",
  },
  {
    id: "s2",
    alunoNome: "LEONARDO BAPTISTA",
    alunoNumero: "80702",
    titulo: "Exercícios resolvidos — Estequiometria",
    descricao: "Resolução completa da ficha de exercícios distribuída em aula.",
    tipo: "doc",
    data: "06/06/2026",
    disciplinaId: "qui-qi10b",
    status: "pendente",
  },
  {
    id: "s3",
    alunoNome: "CLÁUDIA GARCIA",
    alunoNumero: "80704",
    titulo: "Resumo — Reacções de Oxidação",
    descricao: "Resumo elaborado sobre as reacções de oxidação-redução.",
    tipo: "doc",
    data: "05/06/2026",
    disciplinaId: "qui-qi10b",
    status: "pendente",
  },
  {
    id: "s4",
    alunoNome: "PEDRO PUPO",
    alunoNumero: "80705",
    titulo: "Trabalho — Isómeros",
    descricao:
      "Trabalho de pesquisa sobre os tipos de isómeros em química orgânica.",
    tipo: "pdf",
    data: "04/06/2026",
    disciplinaId: "qui-qi10b",
    status: "aprovado",
    comentario: "Bom trabalho! Estrutura clara e bem fundamentada.",
  },
  {
    id: "s5",
    alunoNome: "ANA FERREIRA",
    alunoNumero: "80706",
    titulo: "Relatório Lab — Cromatografia",
    descricao: "Relatório da experiência de cromatografia em papel.",
    tipo: "pdf",
    data: "03/06/2026",
    disciplinaId: "qui-qi10b",
    status: "rejeitado",
    comentario:
      "O relatório está incompleto. Falta a secção de conclusões e a análise de resultados.",
  },
  {
    id: "s6",
    alunoNome: "SARA LOPES",
    alunoNumero: "80708",
    titulo: "Resumo — Benzeno",
    descricao: "Resumo sobre a estrutura e propriedades do benzeno.",
    tipo: "doc",
    data: "06/06/2026",
    disciplinaId: "qorg-qi11a",
    status: "pendente",
  },
];

export const AVISOS: Aviso[] = [
  {
    id: "a1",
    texto:
      "Lembrem-se: a 2ª Prova dos Professores de Química é no dia 18 de junho. Revejam os conteúdos de estequiometria e equilíbrio químico.",
    data: "08/06/2026",
    disciplinaId: "qui-qi10b",
    autor: "Prof. Margarida Silva",
  },
  {
    id: "a2",
    texto:
      "A aula de 11 de junho será no laboratório (sala B3). Tragam bata e caderno de laboratório.",
    data: "06/06/2026",
    disciplinaId: "qui-qi10b",
    autor: "Prof. Margarida Silva",
  },
];

export const ALUNOS: Aluno[] = [
  {
    id: "a1",
    nome: "LUÍS ANTÓNIO",
    numero: "80701",
    media: 17.5,
    faltas: 0,
    status: "regular",
  },
  {
    id: "a2",
    nome: "LEONARDO BAPTISTA",
    numero: "80702",
    media: 16.2,
    faltas: 1,
    status: "regular",
  },
  {
    id: "a3",
    nome: "BENJAMIM TAMBUE",
    numero: "80727",
    media: 14.8,
    faltas: 2,
    status: "regular",
  },
  {
    id: "a4",
    nome: "CLÁUDIA GARCIA",
    numero: "80704",
    media: 13.1,
    faltas: 3,
    status: "regular",
  },
  {
    id: "a5",
    nome: "PEDRO PUPO",
    numero: "80705",
    media: 12.4,
    faltas: 5,
    status: "atencao",
  },
  {
    id: "a6",
    nome: "ANA FERREIRA",
    numero: "80706",
    media: 11.9,
    faltas: 4,
    status: "atencao",
  },
  {
    id: "a7",
    nome: "DIOGO MENDES",
    numero: "80707",
    media: 10.5,
    faltas: 6,
    status: "atencao",
  },
  {
    id: "a8",
    nome: "SARA LOPES",
    numero: "80708",
    media: 9.8,
    faltas: 8,
    status: "risco",
  },
  {
    id: "a9",
    nome: "MIGUEL COSTA",
    numero: "80709",
    media: 8.2,
    faltas: 10,
    status: "risco",
  },
  {
    id: "a10",
    nome: "BEATRIZ SILVA",
    numero: "80710",
    media: 15.3,
    faltas: 1,
    status: "regular",
  },
  {
    id: "a11",
    nome: "RAFAEL SOUSA",
    numero: "80711",
    media: 14.0,
    faltas: 2,
    status: "regular",
  },
  {
    id: "a12",
    nome: "INÊS MARTINS",
    numero: "80712",
    media: 13.7,
    faltas: 3,
    status: "regular",
  },
];
