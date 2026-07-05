export type EstadoConvocatoria = "rascunho" | "emitida" | "arquivada";
export type Trimestre = "I TRIMESTRE" | "II TRIMESTRE" | "III TRIMESTRE";

export interface ConvocatoriaItem {
  id: string;
  titulo: string;
  trimestre: Trimestre;
  dataEmissao: string;
  dataRealizacao: string;
  hora: string;
  sala: string;
  agenda: string[];
  turma: string;
  curso: string;
  destinatarios: string;
  estado: EstadoConvocatoria;
  observacoes?: string;
}

export interface ConvocatoriaFormData {
  titulo: string;
  trimestre: Trimestre;
  dataEmissao: string;
  dataRealizacao: string;
  hora: string;
  sala: string;
  agenda: string[];
  turma: string;
  curso: string;
  destinatarios: string;
  observacoes?: string;
}

export const CURSOS = ["Informática", "Electrónica"] as const;

export const TURMAS = [
  "IN10A",
  "IN10B",
  "IN11A",
  "IN11B",
  "IN12A",
  "IN12B",
  "EL10A",
  "EL10B",
  "EL11A",
  "EL11B",
  "EL12A",
  "EL12B",
];

export const SALAS = [
  "81 (PAVILHÕES)",
  "Sala Magna",
  "Sala 101",
  "Sala 102",
  "Sala 201",
  "Sala 202",
  "Anfiteatro A",
  "Anfiteatro B",
];

export const CONVOCATORIAS_MOCK: ConvocatoriaItem[] = [
  {
    id: "c1",
    titulo: "Reunião de Encarregados de Educação - I Trimestre",
    trimestre: "I TRIMESTRE",
    dataEmissao: "2026-01-15",
    dataRealizacao: "2026-01-24",
    hora: "08:00 às 09:00",
    sala: "81 (PAVILHÕES)",
    agenda: [
      "Informações Gerais",
      "Aproveitamento Pedagógico do I TRIMESTRE",
      "Outros assuntos",
    ],
    turma: "QI10B",
    curso: "Informática",
    destinatarios: "Encarregados de Educação",
    estado: "emitida",
  },
  {
    id: "c2",
    titulo: "Reunião de Pais - II Trimestre",
    trimestre: "II TRIMESTRE",
    dataEmissao: "2026-04-10",
    dataRealizacao: "2026-04-25",
    hora: "09:00 às 10:30",
    sala: "Sala Magna",
    agenda: [
      "Análise de resultados do I Trimestre",
      "Calendário de provas do II Trimestre",
      "Assuntos gerais",
    ],
    turma: "IN10A",
    curso: "Informática",
    destinatarios: "Todos os Encarregados",
    estado: "rascunho",
  },
  {
    id: "c3",
    titulo: "Reunião - Comportamento Discente",
    trimestre: "I TRIMESTRE",
    dataEmissao: "2026-02-20",
    dataRealizacao: "2026-03-05",
    hora: "10:00 às 11:30",
    sala: "Sala 101",
    agenda: [
      "Questões disciplinares",
      "Medidas correctivas",
      "Plano de acompanhamento",
    ],
    turma: "EL11A",
    curso: "Electrónica",
    destinatarios: "Encarregados de Educação",
    estado: "emitida",
  },
  {
    id: "c4",
    titulo: "Reunião Geral de Encarregados",
    trimestre: "III TRIMESTRE",
    dataEmissao: "2026-07-01",
    dataRealizacao: "2026-07-15",
    hora: "08:30 às 10:00",
    sala: "Anfiteatro A",
    agenda: [
      "Balanço do ano lectivo",
      "Exames finais",
      "Renovação de matrículas",
      "Outros assuntos",
    ],
    turma: "Todas",
    curso: "Informática",
    destinatarios: "Todos os Encarregados",
    estado: "rascunho",
  },
];

export const ESTADO_CONFIG: Record<
  EstadoConvocatoria,
  { label: string; class: string }
> = {
  rascunho: {
    label: "Rascunho",
    class: "bg-zinc-100 text-zinc-600 border-zinc-200",
  },
  emitida: {
    label: "Emitida",
    class: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  arquivada: {
    label: "Arquivada",
    class: "bg-blue-50 text-blue-700 border-blue-200",
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
