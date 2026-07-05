export interface ProfessorPerfilData {
  nome: string;
  role: string;
  departamento: string;
  funcionarioId: string;
  avatarUrl?: string;
  dadosPreenchidos: number;

  biografia: string | null;
  dataNascimento: string | null;
  telefone: string | null;
  email: string | null;
  morada: string | null;

  genero: string | null;
  estadoCivil: string | null;

  nomePai: string | null;
  nomeMae: string | null;
  naturalidade: string | null;

  tipoDocumento: string | null;
  numeroIdentificacao: string | null;
  dataEmissao: string | null;
  validadeDocumento: string | null;

  provincia: string | null;
  municipio: string | null;
  comuna: string | null;

  disciplinas: string[];
  turmas: string[];
  dataAdmissao: string | null;
  habilitacoes: string | null;
}

export const PROFESSOR_PERFIL_MOCK: ProfessorPerfilData = {
  nome: "MARIA SILVA SANTOS",
  role: "Professora",
  departamento: "Ciências Exactas",
  funcionarioId: "PROF001",
  dadosPreenchidos: 82,

  biografia:
    "Docente de Matemática e Física há 8 anos. Mestre em Ensino da Matemática pela Universidade Agostinho Neto.",
  dataNascimento: "15/03/1985",
  telefone: "923 456 789",
  email: "maria.silva@prof.ao",
  morada: "Rua das Flores, nº 45, Bairro Alvalade, Luanda",

  genero: "Feminino",
  estadoCivil: "Casada",

  nomePai: "ANTÓNIO SANTOS",
  nomeMae: "ISABEL SANTOS",
  naturalidade: "LUANDA",

  tipoDocumento: "Bilhete de Identidade",
  numeroIdentificacao: "007854321LA045",
  dataEmissao: "10/06/2020",
  validadeDocumento: "09/06/2030",

  provincia: "LUANDA",
  municipio: "VIANA",
  comuna: "ALVALADE",

  disciplinas: ["Matemática", "Física"],
  turmas: ["QI10B", "QI11A"],
  dataAdmissao: "02/09/2018",
  habilitacoes: "Mestrado em Ensino da Matemática",
};
