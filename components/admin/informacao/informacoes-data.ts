export type EstadoInformacao = "publicado" | "rascunho";

export interface InformacaoItem {
  id: string;
  titulo: string;
  descricao: string;
  conteudo: string;
  dataPublicacao: string;
  imagemUrl?: string;
  link?: string;
  hasIcon?: boolean;
  autor: string;
  estado: EstadoInformacao;
  importante: boolean;
}

export interface InformacaoFormData {
  titulo: string;
  descricao: string;
  conteudo: string;
  dataPublicacao: string;
  imagemUrl?: string;
  link?: string;
  hasIcon?: boolean;
  estado: EstadoInformacao;
  importante: boolean;
}

export const INFORMACOES_MOCK: InformacaoItem[] = [
  {
    id: "i1",
    titulo: "CONVOCATÓRIA - TELEFONES RETIDOS EM ÉPOCAS DE PROVA",
    descricao: "CONVOCATÓRIA A Direcção do Instit...",
    conteudo:
      "CONVOCATÓRIA\n\nA Direcção do Instituto Politécnico Industrial de Luanda informa a todos os encarregados de educação e estudantes que, durante as épocas de prova, não é permitido o uso de telemóveis nas salas de exame. Os aparelhos retidos serão devolvidos após o término das provas mediante apresentação do bilhete de identidade do estudante ou encarregado de educação.",
    dataPublicacao: "2026-01-10",
    hasIcon: false,
    autor: "Direcção",
    estado: "publicado",
    importante: true,
  },
  {
    id: "i2",
    titulo: "COMUNICADO OFICIAL - VENDA DE FOLHA DE PROVAS",
    descricao: "COMUNICADO OFICIAL Assunto: Venda de Folha de Provas",
    conteudo:
      "COMUNICADO OFICIAL\n\nAssunto: Venda de Folha de Provas\n\nA Direcção do Instituto Politécnico Industrial de Luanda vem por este meio informar que as folhas de prova já se encontram disponíveis para venda na secretaria da instituição, ao preço unitário de 200 Kwanzas.\n\nRecomenda-se a todos os estudantes que adquiram as suas folhas com antecedência, evitando constrangimentos no dia das provas.",
    dataPublicacao: "2026-01-15",
    hasIcon: true,
    autor: "Secretaria",
    estado: "publicado",
    importante: false,
  },
  {
    id: "i3",
    titulo: "5ª EDIÇÃO DAS OLIMPÍADAS DE MATEMÁTICA – 2026",
    descricao: "COMUNICADO OFICIAL A Coordenação Pedagógica...",
    conteudo:
      "COMUNICADO OFICIAL\n\nA Coordenação Pedagógica do Instituto Politécnico Industrial de Luanda vem por este meio comunicar a realização da 5ª Edição das Olimpíadas de Matemática – 2026.\n\nA competição destina-se a todos os estudantes regularmente matriculados e terá lugar nas instalações desta instituição.\n\nQuem não participar não terá continuidade.",
    dataPublicacao: "2026-03-06",
    imagemUrl:
      "https://placehold.co/480x320/E97B2E/ffffff?text=5ª+Olimpíadas+Matemática",
    hasIcon: true,
    autor: "Coordenação Pedagógica",
    estado: "publicado",
    importante: true,
  },
  {
    id: "i4",
    titulo: "Encerramento do Período de Lançamento de Notas",
    descricao: "Encerramento do Período de Lançamento de Notas do I Trimestre",
    conteudo:
      "Encerramento do Período de Lançamento de Notas\n\nInformamos a todos os docentes que o período de lançamento de notas do I Trimestre encerra no próximo dia 28 de fevereiro de 2026. Após esta data, não serão aceites lançamentos de notas sem autorização expressa da Direcção.",
    dataPublicacao: "2026-02-20",
    hasIcon: false,
    autor: "Direcção",
    estado: "publicado",
    importante: false,
  },
  {
    id: "i5",
    titulo: "PRORROGAÇÃO PARA AS INSCRIÇÕES DOS EXAMES ESPECIAIS!",
    descricao: "MELHORES CUMPRIMENTOS. A DIRECÇÃO DO IPIL...",
    conteudo:
      "MELHORES CUMPRIMENTOS.\n\nA DIRECÇÃO DO IPIL vem por este meio informar que o prazo para inscrições dos Exames Especiais foi prorrogado até ao dia 15 de Março de 2026.\n\nOs estudantes interessados devem dirigir-se à secretaria da instituição munidos dos documentos necessários.",
    dataPublicacao: "2026-03-01",
    hasIcon: true,
    autor: "Direcção",
    estado: "publicado",
    importante: true,
  },
  {
    id: "i6",
    titulo: "Horário de Provas - III Trimestre",
    descricao: "Divulgação do calendário de provas do III Trimestre",
    conteudo:
      "Divulgação do calendário de provas do III Trimestre.\n\nOs exames terão início no dia 06 de outubro de 2026. Consultem o calendário completo na secretaria.",
    dataPublicacao: "2026-09-01",
    hasIcon: false,
    autor: "Secretaria",
    estado: "rascunho",
    importante: false,
  },
];

export const ESTADO_CONFIG: Record<
  EstadoInformacao,
  { label: string; class: string }
> = {
  publicado: {
    label: "Publicado",
    class: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  rascunho: {
    label: "Rascunho",
    class: "bg-zinc-100 text-zinc-600 border-zinc-200",
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
