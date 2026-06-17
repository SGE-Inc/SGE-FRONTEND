export type TipoExame =
  | "1ª PROVA"
  | "2ª PROVA"
  | "EXAME FINAL"
  | "RECURSO"
  | "EXAME DE ADMISSÃO";
export type EstadoExame = "agendado" | "realizado" | "cancelado";
export type Trimestre = "I TRIMESTRE" | "II TRIMESTRE" | "III TRIMESTRE";
export type Curso = "Informática" | "Electrónica";

export interface ExameItem {
  id: string;
  disciplina: string;
  turma: string;
  data: string;
  hora: string;
  sala: string;
  tipo: TipoExame;
  trimestre: Trimestre;
  estado: EstadoExame;
  curso: Curso;
  observacoes?: string;
}

export interface ExameFormData {
  disciplina: string;
  turma: string;
  data: string;
  hora: string;
  sala: string;
  tipo: TipoExame;
  trimestre: Trimestre;
  observacoes?: string;
}

export interface ExameResultado {
  estudanteId: string;
  estudanteNome: string;
  nota: number;
}

export interface EpocaExame {
  id: string;
  label: string;
  trimestre: Trimestre;
  dataInicio: string;
  dataFim: string;
  tipo: TipoExame;
}

export const DISCIPLINAS_INFORMATICA = [
  "Informática",
  "Programação",
  "Redes e Sistemas",
  "Base de Dados",
  "Sistemas Operativos",
  "Matemática",
  "Inglês",
  "Português",
  "FAI",
  "Educação Física",
];

export const DISCIPLINAS_ELECTRONICA = [
  "Electrónica Analógica",
  "Electrónica Digital",
  "Electrotecnia",
  "Telecomunicações",
  "Física",
  "Matemática",
  "Inglês",
  "Português",
  "FAI",
  "Educação Física",
];

export const TURMAS_INFORMATICA = [
  "IN10A",
  "IN10B",
  "IN11A",
  "IN11B",
  "IN12A",
  "IN12B",
];

export const TURMAS_ELECTRONICA = [
  "EL10A",
  "EL10B",
  "EL11A",
  "EL11B",
  "EL12A",
  "EL12B",
];

export const SALAS = [
  "Sala 101",
  "Sala 102",
  "Sala 103",
  "Sala 104",
  "Sala 105",
  "Sala 201",
  "Sala 202",
  "Sala 203",
  "Sala 204",
  "Sala 205",
  "Lab. Informática 1",
  "Lab. Informática 2",
  "Lab. Electrónica",
  "Lab. Física",
  "Anfiteatro A",
  "Anfiteatro B",
];

export const EXAMES_MOCK: ExameItem[] = [
  {
    id: "ex1",
    disciplina: "Informática",
    turma: "IN10A",
    data: "2026-06-12",
    hora: "08:00",
    sala: "Lab. Informática 1",
    tipo: "1ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "agendado",
    curso: "Informática",
  },
  {
    id: "ex2",
    disciplina: "Programação",
    turma: "IN10B",
    data: "2026-06-12",
    hora: "10:00",
    sala: "Lab. Informática 2",
    tipo: "1ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "agendado",
    curso: "Informática",
  },
  {
    id: "ex3",
    disciplina: "Matemática",
    turma: "IN11A",
    data: "2026-06-15",
    hora: "08:00",
    sala: "Sala 201",
    tipo: "2ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "agendado",
    curso: "Informática",
  },
  {
    id: "ex4",
    disciplina: "Redes e Sistemas",
    turma: "IN11B",
    data: "2026-06-15",
    hora: "10:00",
    sala: "Sala 203",
    tipo: "2ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "agendado",
    curso: "Informática",
  },
  {
    id: "ex5",
    disciplina: "Base de Dados",
    turma: "IN12A",
    data: "2026-06-18",
    hora: "08:00",
    sala: "Lab. Informática 1",
    tipo: "EXAME FINAL",
    trimestre: "II TRIMESTRE",
    estado: "agendado",
    curso: "Informática",
  },
  {
    id: "ex6",
    disciplina: "Português",
    turma: "IN10A",
    data: "2026-04-08",
    hora: "08:00",
    sala: "Sala 101",
    tipo: "1ª PROVA",
    trimestre: "I TRIMESTRE",
    estado: "realizado",
    curso: "Informática",
  },
  {
    id: "ex7",
    disciplina: "Inglês",
    turma: "IN10B",
    data: "2026-04-10",
    hora: "10:00",
    sala: "Sala 102",
    tipo: "1ª PROVA",
    trimestre: "I TRIMESTRE",
    estado: "realizado",
    curso: "Informática",
  },
  {
    id: "ex8",
    disciplina: "Matemática",
    turma: "IN11A",
    data: "2026-04-12",
    hora: "08:00",
    sala: "Sala 201",
    tipo: "1ª PROVA",
    trimestre: "I TRIMESTRE",
    estado: "realizado",
    curso: "Informática",
  },
  {
    id: "ex9",
    disciplina: "Informática",
    turma: "IN10A",
    data: "2026-05-20",
    hora: "08:00",
    sala: "Lab. Informática 1",
    tipo: "2ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "realizado",
    curso: "Informática",
  },
  {
    id: "ex10",
    disciplina: "Programação",
    turma: "IN10B",
    data: "2026-05-22",
    hora: "10:00",
    sala: "Lab. Informática 2",
    tipo: "2ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "realizado",
    curso: "Informática",
  },
  {
    id: "ex11",
    disciplina: "FAI",
    turma: "IN10A",
    data: "2026-03-25",
    hora: "14:00",
    sala: "Anfiteatro A",
    tipo: "1ª PROVA",
    trimestre: "I TRIMESTRE",
    estado: "cancelado",
    curso: "Informática",
    observacoes: "Cancelado por motivo de feriado nacional",
  },
  {
    id: "ex12",
    disciplina: "Electrónica Digital",
    turma: "EL10A",
    data: "2026-06-12",
    hora: "08:00",
    sala: "Lab. Electrónica",
    tipo: "1ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "agendado",
    curso: "Electrónica",
  },
  {
    id: "ex13",
    disciplina: "Electrónica Analógica",
    turma: "EL10B",
    data: "2026-06-12",
    hora: "10:00",
    sala: "Lab. Electrónica",
    tipo: "1ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "agendado",
    curso: "Electrónica",
  },
  {
    id: "ex14",
    disciplina: "Física",
    turma: "EL11A",
    data: "2026-06-15",
    hora: "08:00",
    sala: "Sala 202",
    tipo: "2ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "agendado",
    curso: "Electrónica",
  },
  {
    id: "ex15",
    disciplina: "Telecomunicações",
    turma: "EL11B",
    data: "2026-06-15",
    hora: "10:00",
    sala: "Sala 204",
    tipo: "2ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "agendado",
    curso: "Electrónica",
  },
  {
    id: "ex16",
    disciplina: "Electrotecnia",
    turma: "EL12A",
    data: "2026-06-18",
    hora: "08:00",
    sala: "Sala 205",
    tipo: "EXAME FINAL",
    trimestre: "II TRIMESTRE",
    estado: "agendado",
    curso: "Electrónica",
  },
  {
    id: "ex17",
    disciplina: "Matemática",
    turma: "EL10A",
    data: "2026-04-08",
    hora: "08:00",
    sala: "Sala 101",
    tipo: "1ª PROVA",
    trimestre: "I TRIMESTRE",
    estado: "realizado",
    curso: "Electrónica",
  },
  {
    id: "ex18",
    disciplina: "Física",
    turma: "EL11A",
    data: "2026-04-10",
    hora: "10:00",
    sala: "Sala 202",
    tipo: "1ª PROVA",
    trimestre: "I TRIMESTRE",
    estado: "realizado",
    curso: "Electrónica",
  },
  {
    id: "ex19",
    disciplina: "Electrónica Digital",
    turma: "EL10A",
    data: "2026-05-20",
    hora: "08:00",
    sala: "Lab. Electrónica",
    tipo: "2ª PROVA",
    trimestre: "II TRIMESTRE",
    estado: "realizado",
    curso: "Electrónica",
  },
  {
    id: "ex20",
    disciplina: "Inglês",
    turma: "EL10B",
    data: "2026-03-25",
    hora: "08:00",
    sala: "Sala 102",
    tipo: "1ª PROVA",
    trimestre: "I TRIMESTRE",
    estado: "cancelado",
    curso: "Electrónica",
    observacoes: "Cancelado, reagendado para 28/03",
  },
];

export const EPOCAS_EXAMES: EpocaExame[] = [
  {
    id: "ep1",
    label: "1ª Prova dos Professores",
    trimestre: "I TRIMESTRE",
    dataInicio: "2026-02-09",
    dataFim: "2026-02-24",
    tipo: "1ª PROVA",
  },
  {
    id: "ep2",
    label: "2ª Prova dos Professores",
    trimestre: "I TRIMESTRE",
    dataInicio: "2026-03-03",
    dataFim: "2026-03-14",
    tipo: "2ª PROVA",
  },
  {
    id: "ep3",
    label: "1ª Prova dos Professores",
    trimestre: "II TRIMESTRE",
    dataInicio: "2026-05-11",
    dataFim: "2026-05-23",
    tipo: "1ª PROVA",
  },
  {
    id: "ep4",
    label: "2ª Prova dos Professores",
    trimestre: "II TRIMESTRE",
    dataInicio: "2026-06-03",
    dataFim: "2026-06-14",
    tipo: "2ª PROVA",
  },
  {
    id: "ep5",
    label: "Exames Finais",
    trimestre: "II TRIMESTRE",
    dataInicio: "2026-06-17",
    dataFim: "2026-07-01",
    tipo: "EXAME FINAL",
  },
  {
    id: "ep6",
    label: "Exames de Recurso",
    trimestre: "II TRIMESTRE",
    dataInicio: "2026-07-06",
    dataFim: "2026-07-10",
    tipo: "RECURSO",
  },
  {
    id: "ep7",
    label: "1ª Prova dos Professores",
    trimestre: "III TRIMESTRE",
    dataInicio: "2026-09-01",
    dataFim: "2026-09-12",
    tipo: "1ª PROVA",
  },
  {
    id: "ep8",
    label: "2ª Prova dos Professores",
    trimestre: "III TRIMESTRE",
    dataInicio: "2026-09-22",
    dataFim: "2026-10-03",
    tipo: "2ª PROVA",
  },
  {
    id: "ep9",
    label: "Exames Finais",
    trimestre: "III TRIMESTRE",
    dataInicio: "2026-10-06",
    dataFim: "2026-10-17",
    tipo: "EXAME FINAL",
  },
  {
    id: "ep10",
    label: "Exames de Admissão",
    trimestre: "III TRIMESTRE",
    dataInicio: "2026-10-20",
    dataFim: "2026-10-31",
    tipo: "EXAME DE ADMISSÃO",
  },
];

export const ESTADO_CONFIG: Record<
  EstadoExame,
  { label: string; class: string }
> = {
  agendado: {
    label: "Agendado",
    class: "bg-blue-50 text-blue-700 border-blue-200",
  },
  realizado: {
    label: "Realizado",
    class: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  cancelado: {
    label: "Cancelado",
    class: "bg-red-50 text-red-700 border-red-200",
  },
};

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
