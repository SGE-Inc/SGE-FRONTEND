export interface PerfilData {
  // Header
  nome: string;
  role: string;
  turma: string;
  numero: string;
  avatarUrl?: string;
  dadosPreenchidos: number; // percentage 0-100

  // Biografia & contactos
  biografia: string | null;
  dataNascimento: string | null;
  telefone: string | null;
  email: string | null;
  morada: string | null;

  // Dados Pessoais
  genero: string | null;
  altura: string | null;
  estadoCivil: string | null;

  // Dados Complementares
  nomePai: string | null;
  nomeMae: string | null;
  naturalidade: string | null;

  // Documentação
  tipoDocumento: string | null;
  numeroIdentificacao: string | null;
  dataEmissao: string | null;
  validadeDocumento: string | null;

  // Dados de Localização
  provincia: string | null;
  municipio: string | null;
  comuna: string | null;

  // Dados Académicas
  areaFormacao: string | null;
  curso: string | null;
  classe: string | null;
  turno: string | null;
  turmaAcad: string | null;
  numeroAcad: string | null;

  // Dados do Encarregado
  encarregadoNome: string | null;
  encarregadoGrauParentesco: string | null;
  encarregadoGenero: string | null;
  encarregadoDataNascimento: string | null;
  encarregadoTelefone: string | null;
  encarregadoEmail: string | null;
}

export const PERFIL_MOCK: PerfilData = {
  nome: "BENJAMIM ETIENE TSHIMBU TAMBUE",
  role: "Aluno",
  turma: "QI10B",
  numero: "80727",
  avatarUrl: undefined,
  dadosPreenchidos: 76,

  biografia: null,
  dataNascimento: null,
  telefone: "941557492",
  email: null,
  morada: "CASA Nº516 BAIRRO CAZENGA",

  genero: "Masculino",
  altura: "1.41",
  estadoCivil: "Solteiro",

  nomePai: "TAMBUE GUSTAVO",
  nomeMae: "MADALENA TSHIMBU",
  naturalidade: "KILAMBA KIAXI KILAMBA KIAXI",

  tipoDocumento: "Bilhete de Identidade",
  numeroIdentificacao: "021528943LA053",
  dataEmissao: "22/02/2021",
  validadeDocumento: "21/02/2026",

  provincia: "LUANDA",
  municipio: "CAZENGA",
  comuna: "CAZENGA",

  areaFormacao: "Química",
  curso: "Técnico de Química Industrial",
  classe: "10ª Classe",
  turno: "Manhã",
  turmaAcad: "QI10B",
  numeroAcad: "11",

  encarregadoNome: null,
  encarregadoGrauParentesco: null,
  encarregadoGenero: null,
  encarregadoDataNascimento: null,
  encarregadoTelefone: null,
  encarregadoEmail: null,
};
