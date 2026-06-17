export type CursoNome = "Informática" | "Electrónica";

export interface Instituicao {
  nome: string;
  sigla: string;
  logotipo: string;
  endereco: string;
  telefone: string;
  email: string;
  website: string;
  diretor: string;
}

export interface AnoLectivo {
  ano: string;
  dataInicio: string;
  dataFim: string;
  ativo: boolean;
}

export interface TrimestreConfig {
  id: string;
  nome: string;
  dataInicio: string;
  dataFim: string;
}

export interface CursoConfig {
  id: string;
  nome: CursoNome;
  sigla: string;
  descricao: string;
  ativo: boolean;
}

export interface DisciplinaCurso {
  id: string;
  nome: string;
  curso: CursoNome;
  classe: string;
  cargaHoraria: number;
}

export interface TurmaConfig {
  id: string;
  nome: string;
  curso: CursoNome;
  classe: string;
  vagas: number;
}

export interface ParametroAvaliacao {
  id: string;
  nome: string;
  sigla: string;
  descricao: string;
  peso: number;
  ordem: number;
}

export interface UtilizadorAdmin {
  id: string;
  nome: string;
  email: string;
  username: string;
  role: "superadmin" | "admin";
  ativo: boolean;
}

export const INSTITUICAO_MOCK: Instituicao = {
  nome: "Instituto Politécnico Industrial de Luanda",
  sigla: "IPIL",
  logotipo: "",
  endereco: "Rua do IMIL, nº 100, Bairro Operário, Luanda",
  telefone: "222 123 456",
  email: "geral@ipil.ao",
  website: "www.ipil.ao",
  diretor: "Prof. Dr. António Carlos Fernandes",
};

export const ANO_LECTIVO_MOCK: AnoLectivo[] = [
  {
    ano: "2024-2025",
    dataInicio: "2024-09-01",
    dataFim: "2025-07-31",
    ativo: false,
  },
  {
    ano: "2025-2026",
    dataInicio: "2025-09-01",
    dataFim: "2026-07-31",
    ativo: true,
  },
  {
    ano: "2026-2027",
    dataInicio: "2026-09-01",
    dataFim: "2027-07-31",
    ativo: false,
  },
];

export const TRIMESTRES_MOCK: TrimestreConfig[] = [
  {
    id: "t1",
    nome: "I Trimestre",
    dataInicio: "2025-09-01",
    dataFim: "2025-11-30",
  },
  {
    id: "t2",
    nome: "II Trimestre",
    dataInicio: "2025-12-01",
    dataFim: "2026-03-15",
  },
  {
    id: "t3",
    nome: "III Trimestre",
    dataInicio: "2026-03-16",
    dataFim: "2026-07-31",
  },
];

export const CURSOS_MOCK: CursoConfig[] = [
  {
    id: "c1",
    nome: "Informática",
    sigla: "IN",
    descricao: "Técnico de Informática",
    ativo: true,
  },
  {
    id: "c2",
    nome: "Electrónica",
    sigla: "EL",
    descricao: "Técnico de Electrónica",
    ativo: true,
  },
];

export const DISCIPLINAS_MOCK: DisciplinaCurso[] = [
  {
    id: "d1",
    nome: "Informática",
    curso: "Informática",
    classe: "10ª",
    cargaHoraria: 6,
  },
  {
    id: "d2",
    nome: "Programação",
    curso: "Informática",
    classe: "10ª",
    cargaHoraria: 5,
  },
  {
    id: "d3",
    nome: "Redes e Sistemas",
    curso: "Informática",
    classe: "10ª",
    cargaHoraria: 4,
  },
  {
    id: "d4",
    nome: "Base de Dados",
    curso: "Informática",
    classe: "11ª",
    cargaHoraria: 5,
  },
  {
    id: "d5",
    nome: "Sistemas Operativos",
    curso: "Informática",
    classe: "11ª",
    cargaHoraria: 4,
  },
  {
    id: "d6",
    nome: "Programação Avançada",
    curso: "Informática",
    classe: "11ª",
    cargaHoraria: 5,
  },
  {
    id: "d7",
    nome: "Segurança Informática",
    curso: "Informática",
    classe: "12ª",
    cargaHoraria: 4,
  },
  {
    id: "d8",
    nome: "Desenvolvimento Web",
    curso: "Informática",
    classe: "12ª",
    cargaHoraria: 5,
  },
  {
    id: "d9",
    nome: "Inteligência Artificial",
    curso: "Informática",
    classe: "12ª",
    cargaHoraria: 4,
  },
  {
    id: "d10",
    nome: "Matemática",
    curso: "Informática",
    classe: "10ª",
    cargaHoraria: 4,
  },
  {
    id: "d11",
    nome: "Matemática",
    curso: "Informática",
    classe: "11ª",
    cargaHoraria: 4,
  },
  {
    id: "d12",
    nome: "Matemática",
    curso: "Informática",
    classe: "12ª",
    cargaHoraria: 4,
  },
  {
    id: "d13",
    nome: "Português",
    curso: "Informática",
    classe: "10ª",
    cargaHoraria: 3,
  },
  {
    id: "d14",
    nome: "Português",
    curso: "Informática",
    classe: "11ª",
    cargaHoraria: 3,
  },
  {
    id: "d15",
    nome: "Português",
    curso: "Informática",
    classe: "12ª",
    cargaHoraria: 3,
  },
  {
    id: "d16",
    nome: "Inglês",
    curso: "Informática",
    classe: "10ª",
    cargaHoraria: 3,
  },
  {
    id: "d17",
    nome: "Inglês",
    curso: "Informática",
    classe: "11ª",
    cargaHoraria: 3,
  },
  {
    id: "d18",
    nome: "Inglês",
    curso: "Informática",
    classe: "12ª",
    cargaHoraria: 3,
  },
  {
    id: "d19",
    nome: "FAI",
    curso: "Informática",
    classe: "10ª",
    cargaHoraria: 2,
  },
  {
    id: "d20",
    nome: "FAI",
    curso: "Informática",
    classe: "11ª",
    cargaHoraria: 2,
  },
  {
    id: "d21",
    nome: "FAI",
    curso: "Informática",
    classe: "12ª",
    cargaHoraria: 2,
  },
  {
    id: "d22",
    nome: "Educação Física",
    curso: "Informática",
    classe: "10ª",
    cargaHoraria: 2,
  },
  {
    id: "d23",
    nome: "Educação Física",
    curso: "Informática",
    classe: "11ª",
    cargaHoraria: 2,
  },
  {
    id: "d24",
    nome: "Educação Física",
    curso: "Informática",
    classe: "12ª",
    cargaHoraria: 2,
  },
  {
    id: "d25",
    nome: "Electrónica Analógica",
    curso: "Electrónica",
    classe: "10ª",
    cargaHoraria: 5,
  },
  {
    id: "d26",
    nome: "Electrónica Digital",
    curso: "Electrónica",
    classe: "10ª",
    cargaHoraria: 5,
  },
  {
    id: "d27",
    nome: "Electrotecnia",
    curso: "Electrónica",
    classe: "10ª",
    cargaHoraria: 4,
  },
  {
    id: "d28",
    nome: "Telecomunicações",
    curso: "Electrónica",
    classe: "11ª",
    cargaHoraria: 5,
  },
  {
    id: "d29",
    nome: "Sistemas Embebidos",
    curso: "Electrónica",
    classe: "11ª",
    cargaHoraria: 4,
  },
  {
    id: "d30",
    nome: "Instrumentação",
    curso: "Electrónica",
    classe: "11ª",
    cargaHoraria: 4,
  },
  {
    id: "d31",
    nome: "Automação Industrial",
    curso: "Electrónica",
    classe: "12ª",
    cargaHoraria: 5,
  },
  {
    id: "d32",
    nome: "Robótica",
    curso: "Electrónica",
    classe: "12ª",
    cargaHoraria: 4,
  },
  {
    id: "d33",
    nome: "Manutenção Electrónica",
    curso: "Electrónica",
    classe: "12ª",
    cargaHoraria: 4,
  },
  {
    id: "d34",
    nome: "Física",
    curso: "Electrónica",
    classe: "10ª",
    cargaHoraria: 4,
  },
  {
    id: "d35",
    nome: "Física",
    curso: "Electrónica",
    classe: "11ª",
    cargaHoraria: 4,
  },
  {
    id: "d36",
    nome: "Física",
    curso: "Electrónica",
    classe: "12ª",
    cargaHoraria: 4,
  },
  {
    id: "d37",
    nome: "Matemática",
    curso: "Electrónica",
    classe: "10ª",
    cargaHoraria: 4,
  },
  {
    id: "d38",
    nome: "Matemática",
    curso: "Electrónica",
    classe: "11ª",
    cargaHoraria: 4,
  },
  {
    id: "d39",
    nome: "Matemática",
    curso: "Electrónica",
    classe: "12ª",
    cargaHoraria: 4,
  },
  {
    id: "d40",
    nome: "Português",
    curso: "Electrónica",
    classe: "10ª",
    cargaHoraria: 3,
  },
  {
    id: "d41",
    nome: "Português",
    curso: "Electrónica",
    classe: "11ª",
    cargaHoraria: 3,
  },
  {
    id: "d42",
    nome: "Português",
    curso: "Electrónica",
    classe: "12ª",
    cargaHoraria: 3,
  },
  {
    id: "d43",
    nome: "Inglês",
    curso: "Electrónica",
    classe: "10ª",
    cargaHoraria: 3,
  },
  {
    id: "d44",
    nome: "Inglês",
    curso: "Electrónica",
    classe: "11ª",
    cargaHoraria: 3,
  },
  {
    id: "d45",
    nome: "Inglês",
    curso: "Electrónica",
    classe: "12ª",
    cargaHoraria: 3,
  },
  {
    id: "d46",
    nome: "FAI",
    curso: "Electrónica",
    classe: "10ª",
    cargaHoraria: 2,
  },
  {
    id: "d47",
    nome: "FAI",
    curso: "Electrónica",
    classe: "11ª",
    cargaHoraria: 2,
  },
  {
    id: "d48",
    nome: "FAI",
    curso: "Electrónica",
    classe: "12ª",
    cargaHoraria: 2,
  },
  {
    id: "d49",
    nome: "Educação Física",
    curso: "Electrónica",
    classe: "10ª",
    cargaHoraria: 2,
  },
  {
    id: "d50",
    nome: "Educação Física",
    curso: "Electrónica",
    classe: "11ª",
    cargaHoraria: 2,
  },
  {
    id: "d51",
    nome: "Educação Física",
    curso: "Electrónica",
    classe: "12ª",
    cargaHoraria: 2,
  },
];

export const TURMAS_MOCK: TurmaConfig[] = [
  { id: "t1", nome: "IN10A", curso: "Informática", classe: "10ª", vagas: 35 },
  { id: "t2", nome: "IN10B", curso: "Informática", classe: "10ª", vagas: 35 },
  { id: "t3", nome: "IN11A", curso: "Informática", classe: "11ª", vagas: 30 },
  { id: "t4", nome: "IN11B", curso: "Informática", classe: "11ª", vagas: 30 },
  { id: "t5", nome: "IN12A", curso: "Informática", classe: "12ª", vagas: 25 },
  { id: "t6", nome: "IN12B", curso: "Informática", classe: "12ª", vagas: 25 },
  { id: "t7", nome: "EL10A", curso: "Electrónica", classe: "10ª", vagas: 35 },
  { id: "t8", nome: "EL10B", curso: "Electrónica", classe: "10ª", vagas: 35 },
  { id: "t9", nome: "EL11A", curso: "Electrónica", classe: "11ª", vagas: 30 },
  { id: "t10", nome: "EL11B", curso: "Electrónica", classe: "11ª", vagas: 30 },
  { id: "t11", nome: "EL12A", curso: "Electrónica", classe: "12ª", vagas: 25 },
  { id: "t12", nome: "EL12B", curso: "Electrónica", classe: "12ª", vagas: 25 },
];

export const PARAMETROS_AVALIACAO_MOCK: ParametroAvaliacao[] = [
  {
    id: "p1",
    nome: "Prova dos Professores",
    sigla: "PP",
    descricao: "Média das provas aplicadas pelo professor",
    peso: 40,
    ordem: 1,
  },
  {
    id: "p2",
    nome: "Prova Trimestral",
    sigla: "PT",
    descricao: "Prova aplicada no final de cada trimestre",
    peso: 30,
    ordem: 2,
  },
  {
    id: "p3",
    nome: "Média das Avaliações Contínuas",
    sigla: "MAC",
    descricao: "Média dos trabalhos, exercícios e participação",
    peso: 30,
    ordem: 3,
  },
];

export const UTILIZADORES_ADMIN_MOCK: UtilizadorAdmin[] = [
  {
    id: "u1",
    nome: "Administrador Principal",
    email: "admin@ipil.ao",
    username: "admin001",
    role: "superadmin",
    ativo: true,
  },
  {
    id: "u2",
    nome: "Secretaria Académica",
    email: "secretaria@ipil.ao",
    username: "sec001",
    role: "admin",
    ativo: true,
  },
  {
    id: "u3",
    nome: "Coordenador Informática",
    email: "coord.inf@ipil.ao",
    username: "coordinf",
    role: "admin",
    ativo: false,
  },
];
