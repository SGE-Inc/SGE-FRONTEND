export interface Material {
  id: string;
  titulo: string;
  descricao: string;
  tipo: "pdf" | "doc" | "xls" | "csv" | "img" | "outro";
  ficheiro: string;
  tamanho: string;
  professor: string;
  data: string;
  nota: string;
}

export interface DisciplinaSala {
  id: string;
  nome: string;
  sigla: string;
  cor: string;
  professor: string;
  professorNome: string;
  materiais: Material[];
}

const CORES: Record<string, string> = {
  POR: "bg-emerald-500",
  ING: "bg-sky-500",
  FAI: "bg-amber-500",
  MAT: "bg-violet-500",
  FIS: "bg-blue-500",
  QUI: "bg-orange-500",
  QOR: "bg-rose-500",
  INF: "bg-teal-500",
  QAN: "bg-lime-500",
  TLA: "bg-indigo-500",
  EDF: "bg-red-500",
};

export const DISCIPLINAS: DisciplinaSala[] = [
  {
    id: "mat",
    nome: "Matemática",
    sigla: "MAT",
    cor: CORES.MAT,
    professor: "PROF001",
    professorNome: "Armando Domingos Manuel",
    materiais: [
      {
        id: "m1",
        titulo: "Funções Trigonométricas",
        descricao: "Material de apoio sobre funções seno, cosseno e tangente.",
        tipo: "pdf",
        ficheiro: "funcoes_trigonometricas.pdf",
        tamanho: "2.4 MB",
        professor: "Armando Domingos Manuel",
        data: "2026-05-20",
        nota: "Estudem os gráficos de cada função. Haverá exercícios na próxima aula.",
      },
      {
        id: "m2",
        titulo: "Exercícios de Limites",
        descricao: "Lista de exercícios sobre limites de funções.",
        tipo: "doc",
        ficheiro: "exercicios_limites.docx",
        tamanho: "1.1 MB",
        professor: "Armando Domingos Manuel",
        data: "2026-05-15",
        nota: "Entregar resolvido até dia 25/05.",
      },
      {
        id: "m3",
        titulo: "Tabela de Derivadas",
        descricao: "Tabela com as principais derivadas para consulta.",
        tipo: "pdf",
        ficheiro: "tabela_derivadas.pdf",
        tamanho: "0.8 MB",
        professor: "Armando Domingos Manuel",
        data: "2026-05-10",
        nota: "Podem imprimir e levar para a sala de aula.",
      },
    ],
  },
  {
    id: "port",
    nome: "Português",
    sigla: "POR",
    cor: CORES.POR,
    professor: "PROF002",
    professorNome: "Cláudio Sango Neves",
    materiais: [
      {
        id: "m4",
        titulo: "Análise Sintática",
        descricao:
          "Apostila completa sobre análise sintática de períodos compostos.",
        tipo: "pdf",
        ficheiro: "analise_sintatica.pdf",
        tamanho: "3.2 MB",
        professor: "Cláudio Sango Neves",
        data: "2026-05-18",
        nota: "Foco na diferenciação entre coordenação e subordinação.",
      },
      {
        id: "m5",
        titulo: "Redação - Texto Dissertativo",
        descricao: "Guia para produção de texto dissertativo-argumentativo.",
        tipo: "doc",
        ficheiro: "redacao_dissertativa.docx",
        tamanho: "1.5 MB",
        professor: "Cláudio Sango Neves",
        data: "2026-05-12",
        nota: "Tema da próxima redação: 'O papel da tecnologia na educação'.",
      },
    ],
  },
  {
    id: "ing",
    nome: "Inglês",
    sigla: "ING",
    cor: CORES.ING,
    professor: "PROF003",
    professorNome: "José Henriques Gonçalves",
    materiais: [
      {
        id: "m6",
        titulo: "Verb Tenses Summary",
        descricao: "Resumo dos tempos verbais em inglês com exemplos.",
        tipo: "pdf",
        ficheiro: "verb_tenses.pdf",
        tamanho: "1.8 MB",
        professor: "José Henriques Gonçalves",
        data: "2026-05-22",
        nota: "Revisem os tempos verbais para o teste da próxima semana.",
      },
      {
        id: "m7",
        titulo: "Reading Comprehension",
        descricao: "Textos com exercícios de interpretação.",
        tipo: "csv",
        ficheiro: "reading_comprehension.csv",
        tamanho: "0.5 MB",
        professor: "José Henriques Gonçalves",
        data: "2026-05-08",
        nota: "Os dados do CSV podem ser importados para o Excel para análise.",
      },
    ],
  },
  {
    id: "fis",
    nome: "Física",
    sigla: "FIS",
    cor: CORES.FIS,
    professor: "PROF004",
    professorNome: "Ernesto Paulo Lukoki",
    materiais: [
      {
        id: "m8",
        titulo: "Leis de Newton",
        descricao:
          "Material explicativo sobre as três leis de Newton com exemplos práticos.",
        tipo: "pdf",
        ficheiro: "leis_newton.pdf",
        tamanho: "4.1 MB",
        professor: "Ernesto Paulo Lukoki",
        data: "2026-05-19",
        nota: "Importante: entender a relação entre força, massa e aceleração.",
      },
      {
        id: "m9",
        titulo: "Experiência - Plano Inclinado",
        descricao: "Dados da experiência laboratorial sobre plano inclinado.",
        tipo: "xls",
        ficheiro: "plano_inclinado.xlsx",
        tamanho: "0.9 MB",
        professor: "Ernesto Paulo Lukoki",
        data: "2026-05-14",
        nota: "Completar a tabela com os dados recolhidos em laboratório.",
      },
      {
        id: "m10",
        titulo: "Exercícios de Cinemática",
        descricao:
          "Lista de exercícios sobre movimento rectilíneo uniforme e uniformemente variado.",
        tipo: "pdf",
        ficheiro: "cinematica_exercicios.pdf",
        tamanho: "2.0 MB",
        professor: "Ernesto Paulo Lukoki",
        data: "2026-05-05",
        nota: "Resolver os exercícios ímpares para a próxima aula.",
      },
    ],
  },
  {
    id: "qui",
    nome: "Química",
    sigla: "QUI",
    cor: CORES.QUI,
    professor: "PROF005",
    professorNome: "Margarida Feliciana Silva",
    materiais: [
      {
        id: "m11",
        titulo: "Tabela Periódica Interactiva",
        descricao: "Arquivo com links e informações sobre a tabela periódica.",
        tipo: "pdf",
        ficheiro: "tabela_periodica.pdf",
        tamanho: "5.3 MB",
        professor: "Margarida Feliciana Silva",
        data: "2026-05-21",
        nota: "Memorizar os elementos dos grupos 1, 2, 17 e 18.",
      },
      {
        id: "m12",
        titulo: "Ligações Químicas",
        descricao: "Resumo sobre ligações iónicas, covalentes e metálicas.",
        tipo: "doc",
        ficheiro: "ligacoes_quimicas.docx",
        tamanho: "1.3 MB",
        professor: "Margarida Feliciana Silva",
        data: "2026-05-11",
        nota: "Preparar apresentação sobre um tipo de ligação à escolha.",
      },
    ],
  },
  {
    id: "qorg",
    nome: "Química Orgânica",
    sigla: "QOR",
    cor: CORES.QOR,
    professor: "PROF006",
    professorNome: "Teresa Augusto Caetano",
    materiais: [
      {
        id: "m13",
        titulo: "Hidrocarbonetos",
        descricao: "Classificação e nomenclatura dos hidrocarbonetos.",
        tipo: "pdf",
        ficheiro: "hidrocarbonetos.pdf",
        tamanho: "3.0 MB",
        professor: "Teresa Augusto Caetano",
        data: "2026-05-17",
        nota: "Exercícios de nomenclatura no final do documento.",
      },
      {
        id: "m14",
        titulo: "Reacções Orgânicas",
        descricao: "Principais tipos de reacções em química orgânica.",
        tipo: "pdf",
        ficheiro: "reaccoes_organicas.pdf",
        tamanho: "2.7 MB",
        professor: "Teresa Augusto Caetano",
        data: "2026-05-07",
        nota: "Foco em reacções de substituição e adição.",
      },
    ],
  },
  {
    id: "inf",
    nome: "Informática",
    sigla: "INF",
    cor: CORES.INF,
    professor: "PROF007",
    professorNome: "Domingos Manuel Sebastião",
    materiais: [
      {
        id: "m15",
        titulo: "Algoritmos - Pseudocódigo",
        descricao: "Introdução à lógica de programação com pseudocódigo.",
        tipo: "pdf",
        ficheiro: "algoritmos_pseudocodigo.pdf",
        tamanho: "2.1 MB",
        professor: "Domingos Manuel Sebastião",
        data: "2026-05-23",
        nota: "Implementar os algoritmos em linguagem C como exercício.",
      },
      {
        id: "m16",
        titulo: "Estruturas de Dados",
        descricao: "Material sobre listas, pilhas e filas.",
        tipo: "doc",
        ficheiro: "estruturas_dados.docx",
        tamanho: "1.9 MB",
        professor: "Domingos Manuel Sebastião",
        data: "2026-05-16",
        nota: "Código-fonte incluído no documento para testes.",
      },
      {
        id: "m17",
        titulo: "Dados da Turma",
        descricao: "Registo de notas e presenças em formato CSV.",
        tipo: "csv",
        ficheiro: "dados_turma.csv",
        tamanho: "0.3 MB",
        professor: "Domingos Manuel Sebastião",
        data: "2026-05-09",
        nota: "Usar estes dados para o projecto de análise de dados.",
      },
    ],
  },
  {
    id: "qanl",
    nome: "Q. Analítica",
    sigla: "QAN",
    cor: CORES.QAN,
    professor: "PROF008",
    professorNome: "Filomena Costa Rodrigues",
    materiais: [
      {
        id: "m18",
        titulo: "Métodos de Separação",
        descricao:
          "Técnicas de separação de misturas: destilação, filtração, cromatografia.",
        tipo: "pdf",
        ficheiro: "metodos_separacao.pdf",
        tamanho: "3.5 MB",
        professor: "Filomena Costa Rodrigues",
        data: "2026-05-20",
        nota: "Associar cada método ao tipo de mistura correspondente.",
      },
    ],
  },
  {
    id: "faI",
    nome: "Formação de Atitudes Integradoras",
    sigla: "FAI",
    cor: CORES.FAI,
    professor: "PROF009",
    professorNome: "Valentina Tchissingui Satoto Cambinda",
    materiais: [
      {
        id: "m19",
        titulo: "Ética e Cidadania",
        descricao: "Reflexão sobre ética, cidadania e convivência social.",
        tipo: "pdf",
        ficheiro: "etica_cidadania.pdf",
        tamanho: "1.6 MB",
        professor: "Valentina Tchissingui Satoto Cambinda",
        data: "2026-05-13",
        nota: "Preparar um texto de reflexão sobre um dos temas abordados.",
      },
    ],
  },
  {
    id: "tla",
    nome: "Tecnologia de Laboratório",
    sigla: "TLA",
    cor: CORES.TLA,
    professor: "PROF010",
    professorNome: "Simão Pedro Bwalya",
    materiais: [
      {
        id: "m20",
        titulo: "Normas de Segurança",
        descricao: "Manual de boas práticas e segurança em laboratório.",
        tipo: "pdf",
        ficheiro: "normas_seguranca.pdf",
        tamanho: "4.0 MB",
        professor: "Simão Pedro Bwalya",
        data: "2026-05-18",
        nota: "Leitura obrigatória antes da próxima aula prática.",
      },
      {
        id: "m21",
        titulo: "Instrumentos de Laboratório",
        descricao: "Catálogo com imagens e descrições dos instrumentos.",
        tipo: "img",
        ficheiro: "instrumentos_lab.jpg",
        tamanho: "6.2 MB",
        professor: "Simão Pedro Bwalya",
        data: "2026-05-06",
        nota: "Identificar cada instrumento e a sua função.",
      },
    ],
  },
  {
    id: "edf",
    nome: "Educação Física",
    sigla: "EDF",
    cor: CORES.EDF,
    professor: "PROF011",
    professorNome: "António Guilherme Soares",
    materiais: [
      {
        id: "m22",
        titulo: "Regras de Modalidades Desportivas",
        descricao:
          "Compilação das regras de futebol, basquetebol and voleibol.",
        tipo: "pdf",
        ficheiro: "regras_desporto.pdf",
        tamanho: "2.8 MB",
        professor: "António Guilherme Soares",
        data: "2026-05-15",
        nota: "Serão sorteadas modalidades para apresentação em grupo.",
      },
    ],
  },
];

export function getDisciplinaBySlug(slug: string): DisciplinaSala | undefined {
  return DISCIPLINAS.find((d) => d.id === slug);
}
