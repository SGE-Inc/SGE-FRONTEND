// ── Types ─────────────────────────────────────────────────────────────────────

export type StatusProfessor = "activo" | "inactivo" | "licenca";
export type Curso = "Informática" | "Electrónica";

export interface Professor {
  id: string;
  nome: string;
  email: string;
  contacto: string;
  disciplinas: string[];
  turmas: string[];
  status: StatusProfessor;
  curso: Curso;
  dataAdmissao: string;
  avatarInitials?: string;
}

export interface ProfessorFormData {
  nome: string;
  email: string;
  senha: string;
  contacto: string;
  disciplinas: string[];
  turmas: string[];
  status: StatusProfessor;
}

// ── Disciplinas por curso ─────────────────────────────────────────────────────

export const DISCIPLINAS_INFORMATICA = [
  "Informática", "Programação", "Redes e Sistemas",
  "Base de Dados", "Sistemas Operativos", "Matemática",
  "Inglês", "Português", "FAI", "Educação Física",
];

export const DISCIPLINAS_ELECTRONICA = [
  "Electrónica Analógica", "Electrónica Digital", "Electrotecnia",
  "Telecomunicações", "Física", "Matemática",
  "Inglês", "Português", "FAI", "Educação Física",
];

export const TURMAS_INFORMATICA = [
  "IN10A", "IN10B", "IN11A", "IN11B", "IN12A", "IN12B",
];

export const TURMAS_ELECTRONICA = [
  "EL10A", "EL10B", "EL11A", "EL11B", "EL12A", "EL12B",
];

// ── Mock data ─────────────────────────────────────────────────────────────────

export const PROFESSORES_MOCK: Professor[] = [
  // ── Informática ──
  {
    id: "p1",
    nome: "DOMINGOS MANUEL SEBASTIÃO",
    email: "domingos.sebastiao@ipil.ao",
    contacto: "923 456 789",
    disciplinas: ["Informática", "Programação"],
    turmas: ["IN10A", "IN10B", "IN11A"],
    status: "activo",
    curso: "Informática",
    dataAdmissao: "15/02/2019",
  },
  {
    id: "p2",
    nome: "CARLOS ANTÓNIO FERREIRA",
    email: "carlos.ferreira@ipil.ao",
    contacto: "912 334 556",
    disciplinas: ["Redes e Sistemas", "Sistemas Operativos"],
    turmas: ["IN11B", "IN12A"],
    status: "activo",
    curso: "Informática",
    dataAdmissao: "03/09/2020",
  },
  {
    id: "p3",
    nome: "MARIANA JOANA LOPES",
    email: "mariana.lopes@ipil.ao",
    contacto: "934 112 200",
    disciplinas: ["Base de Dados", "Programação"],
    turmas: ["IN12A", "IN12B"],
    status: "activo",
    curso: "Informática",
    dataAdmissao: "10/01/2021",
  },
  {
    id: "p4",
    nome: "PEDRO AUGUSTO NETO",
    email: "pedro.neto@ipil.ao",
    contacto: "941 789 001",
    disciplinas: ["Matemática"],
    turmas: ["IN10A", "IN10B", "IN11A", "IN11B"],
    status: "activo",
    curso: "Informática",
    dataAdmissao: "22/08/2018",
  },
  {
    id: "p5",
    nome: "ANA BEATRIZ SOUSA",
    email: "ana.sousa@ipil.ao",
    contacto: "927 654 321",
    disciplinas: ["Inglês", "Português"],
    turmas: ["IN10A", "IN11A", "IN12A"],
    status: "licenca",
    curso: "Informática",
    dataAdmissao: "07/03/2022",
  },
  {
    id: "p6",
    nome: "JOÃO BAPTISTA CUNHA",
    email: "joao.cunha@ipil.ao",
    contacto: "915 200 400",
    disciplinas: ["Educação Física", "FAI"],
    turmas: ["IN10A", "IN10B", "IN11A", "IN11B", "IN12A", "IN12B"],
    status: "activo",
    curso: "Informática",
    dataAdmissao: "11/09/2017",
  },
  {
    id: "p7",
    nome: "ROSA FILOMENA TEIXEIRA",
    email: "rosa.teixeira@ipil.ao",
    contacto: "933 100 200",
    disciplinas: ["Programação", "Base de Dados"],
    turmas: ["IN10B", "IN11B"],
    status: "inactivo",
    curso: "Informática",
    dataAdmissao: "14/02/2020",
  },

  // ── Electrónica ──
  {
    id: "p8",
    nome: "ARMINDO CELESTINO PINTO",
    email: "armindo.pinto@ipil.ao",
    contacto: "924 567 890",
    disciplinas: ["Electrónica Analógica", "Electrónica Digital"],
    turmas: ["EL10A", "EL10B", "EL11A"],
    status: "activo",
    curso: "Electrónica",
    dataAdmissao: "01/09/2016",
  },
  {
    id: "p9",
    nome: "FERNANDA GRAÇA MENDES",
    email: "fernanda.mendes@ipil.ao",
    contacto: "912 888 000",
    disciplinas: ["Electrotecnia", "Telecomunicações"],
    turmas: ["EL11B", "EL12A"],
    status: "activo",
    curso: "Electrónica",
    dataAdmissao: "05/02/2018",
  },
  {
    id: "p10",
    nome: "SIMÃO PEDRO NASCIMENTO",
    email: "simao.nascimento@ipil.ao",
    contacto: "935 444 333",
    disciplinas: ["Física", "Electrónica Digital"],
    turmas: ["EL12A", "EL12B"],
    status: "activo",
    curso: "Electrónica",
    dataAdmissao: "12/08/2019",
  },
  {
    id: "p11",
    nome: "LURDES CATARINA VIEIRA",
    email: "lurdes.vieira@ipil.ao",
    contacto: "941 000 123",
    disciplinas: ["Matemática"],
    turmas: ["EL10A", "EL10B", "EL11A", "EL11B"],
    status: "activo",
    curso: "Electrónica",
    dataAdmissao: "20/01/2020",
  },
  {
    id: "p12",
    nome: "HÉLDER FRANCISCO SANTOS",
    email: "helder.santos@ipil.ao",
    contacto: "927 321 654",
    disciplinas: ["Inglês", "Português"],
    turmas: ["EL10A", "EL11A", "EL12A"],
    status: "licenca",
    curso: "Electrónica",
    dataAdmissao: "09/03/2021",
  },
  {
    id: "p13",
    nome: "CONCEIÇÃO MARIA RODRIGUES",
    email: "conceicao.rodrigues@ipil.ao",
    contacto: "916 700 800",
    disciplinas: ["FAI", "Educação Física"],
    turmas: ["EL10A", "EL10B", "EL11A", "EL11B", "EL12A", "EL12B"],
    status: "activo",
    curso: "Electrónica",
    dataAdmissao: "30/08/2017",
  },
  {
    id: "p14",
    nome: "NUNO ALEXANDRE COSTA",
    email: "nuno.costa@ipil.ao",
    contacto: "933 900 100",
    disciplinas: ["Telecomunicações", "Electrónica Analógica"],
    turmas: ["EL10B", "EL11B"],
    status: "inactivo",
    curso: "Electrónica",
    dataAdmissao: "15/02/2022",
  },
];

// ── Status config ─────────────────────────────────────────────────────────────

export const STATUS_CONFIG: Record<
  StatusProfessor,
  { label: string; badge: string; dot: string }
> = {
  activo:   { label: "Activo",   badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  inactivo: { label: "Inactivo", badge: "bg-zinc-100 text-zinc-500 border-zinc-200",         dot: "bg-zinc-400" },
  licenca:  { label: "Licença",  badge: "bg-amber-50 text-amber-700 border-amber-200",       dot: "bg-amber-400" },
};