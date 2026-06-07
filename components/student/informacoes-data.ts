export interface Informacao {
  id: number;
  titulo: string;
  descricao: string;
  conteudo: string;
  dataPublicacao: string;
  imagemUrl?: string;
  link?: string;
  hasIcon?: boolean;
}

export const INFORMACOES: Informacao[] = [
  {
    id: 1,
    titulo: "CONVOCATÓRIA - TELEFONES RETIDOS EM ÉPOCAS DE PROVA",
    descricao: "CONVOCATÓRIA A Direcção do Instit...",
    conteudo:
      "CONVOCATÓRIA\n\nA Direcção do Instituto Politécnico Industrial de Luanda informa a todos os encarregados de educação e estudantes que, durante as épocas de prova, não é permitido o uso de telemóveis nas salas de exame. Os aparelhos retidos serão devolvidos após o término das provas mediante apresentação do bilhete de identidade do estudante ou encarregado de educação.",
    dataPublicacao: "10/01/2026",
    hasIcon: false,
  },
  {
    id: 2,
    titulo: "COMUNICADO OFICIAL - 🏅 VENDA DE FOLHA DE PROVAS.",
    descricao: "COMUNICADO OFICIAL Assunto: Venda de Folha de Provas",
    conteudo:
      "COMUNICADO OFICIAL\n\nAssunto: Venda de Folha de Provas\n\nA Direcção do Instituto Politécnico Industrial de Luanda vem por este meio informar que as folhas de prova já se encontram disponíveis para venda na secretaria da instituição, ao preço unitário de 200 Kwanzas.\n\nRecomenda-se a todos os estudantes que adquiram as suas folhas com antecedência, evitando constrangimentos no dia das provas.",
    dataPublicacao: "15/01/2026",
    hasIcon: true,
  },
  {
    id: 3,
    titulo:
      "COMUNICADO OFICIAL - 5ª EDIÇÃO DAS OLIMPÍADAS DE MATEMÁTICA – 2026.",
    descricao: "COMUNICADO OFICIAL A Coordenação Pedagógica...",
    conteudo:
      'COMUNICADO OFICIAL\n\nA Coordenação Pedagógica do Instituto Politécnico Industrial de Luanda vem por este meio comunicar a realização da 5ª Edição das Olimpíadas de Matemática – 2026.\n\nA competição destina-se a todos os estudantes regularmente matriculados e terá lugar nas instalações desta instituição.\n\nQuem não participar não terá continuidade.\n\n"O segredo está em: RACIOCINAR, SUPERAR, VENCER."',
    dataPublicacao: "06/03/2026",
    imagemUrl:
      "https://placehold.co/480x320/E97B2E/ffffff?text=5ª+Olimpíadas+Matemática",
    hasIcon: true,
  },
  {
    id: 4,
    titulo: "Encerramento do Período de Lançamento de Notas",
    descricao: "Encerramento do Período de Lançamento de Notas do I Trimestre",
    conteudo:
      "Encerramento do Período de Lançamento de Notas\n\nInformamos a todos os docentes que o período de lançamento de notas do I Trimestre encerra no próximo dia 28 de fevereiro de 2026. Após esta data, não serão aceites lançamentos de notas sem autorização expressa da Direcção.",
    dataPublicacao: "20/02/2026",
    hasIcon: false,
  },
  {
    id: 5,
    titulo: "PRORROGAÇÃO PARA AS INSCRIÇÕES DOS EXAMES ESPECIAIS!",
    descricao: "MELHORES CUMPRIMENTOS. A DIRECÇÃO DO IPIL...",
    conteudo:
      "MELHORES CUMPRIMENTOS.\n\nA DIRECÇÃO DO IPIL vem por este meio informar que o prazo para inscrições dos Exames Especiais foi prorrogado até ao dia 15 de Março de 2026.\n\nOs estudantes interessados devem dirigir-se à secretaria da instituição munidos dos documentos necessários.\n\nMelhores cumprimentos,\nA Direcção",
    dataPublicacao: "01/03/2026",
    hasIcon: true,
  },
  {
    id: 6,
    titulo:
      "Convite – Abertura dos Jogos Escolares Municipais do Rangel 2025/2026",
    descricao: "Convite – Abertura dos Jogos Escolares Municipais do Rangel",
    conteudo:
      "Convite\n\nA Direcção do Instituto Politécnico Industrial de Luanda tem a honra de convidar toda a comunidade escolar para a cerimónia de Abertura dos Jogos Escolares Municipais do Rangel 2025/2026, que decorrerá no Estádio Municipal do Rangel.\n\nA participação de todos é fundamental para o sucesso deste evento desportivo.",
    dataPublicacao: "10/03/2026",
    hasIcon: true,
  },
  {
    id: 7,
    titulo:
      "COMUNICADO IMPORTANTE DA COMISSÃO DE PAIS E ENCARREGADOS DE EDUCAÇÃO",
    descricao: "COMUNICADO IMPORTANTE O Instituto...",
    conteudo:
      "COMUNICADO IMPORTANTE\n\nA Comissão de Pais e Encarregados de Educação do Instituto Politécnico Industrial de Luanda informa que haverá uma reunião geral no próximo sábado, pelas 09:00 horas, na sala magna da instituição.\n\nA presença de todos os encarregados de educação é obrigatória.\n\nOrdem do dia:\n• Aprovação do regulamento interno;\n• Eleição dos representantes dos pais;\n• Informações gerais.",
    dataPublicacao: "12/03/2026",
    hasIcon: true,
  },
];
