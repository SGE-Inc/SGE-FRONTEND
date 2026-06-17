export type StatusEstudante = "activo" | "inactivo" | "transferido";
export type Curso = "Informática" | "Electrónica";
export type AnoClasse = "10ª" | "11ª" | "12ª";

export interface Encarregado {
  nome: string;
  contacto: string;
  parentesco: string;
}

export interface Documento {
  tipo: "BI" | "Passaporte";
  numero: string;
}

export interface Estudante {
  id: string;
  nome: string;
  numeroProcesso: string;
  turma: string;
  curso: Curso;
  anoClasse: AnoClasse;
  contacto: string;
  email: string;
  documento: Documento;
  encarregado: Encarregado;
  dataNascimento: string;
  genero: "Masculino" | "Feminino";
  status: StatusEstudante;
  dataMatricula: string;
  endereco: string;
  mediaGeral?: number;
  aprovado?: boolean;
}

export interface EstudanteFormData {
  nome: string;
  numeroProcesso: string;
  turma: string;
  anoClasse: AnoClasse;
  contacto: string;
  email: string;
  documentoTipo: "BI" | "Passaporte";
  documentoNumero: string;
  encarregadoNome: string;
  encarregadoContacto: string;
  encarregadoParentesco: string;
  dataNascimento: string;
  genero: "Masculino" | "Feminino";
  endereco: string;
  status: StatusEstudante;
}

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

export const ANO_CLASSE_MAP: Record<string, AnoClasse> = {
  "10ª": "10ª",
  "11ª": "11ª",
  "12ª": "12ª",
};

export function getAnoFromTurma(turma: string): AnoClasse {
  const match = turma.match(/(\d+)/);
  if (!match) return "10ª";
  const ano = parseInt(match[1], 10);
  if (ano === 11) return "11ª";
  if (ano === 12) return "12ª";
  return "10ª";
}

export const ESTUDANTES_MOCK: Estudante[] = [
  {
    id: "e1",
    nome: "JOÃO CARLOS AMBRÓSIO",
    numeroProcesso: "DL23001",
    turma: "IN10A",
    curso: "Informática",
    anoClasse: "10ª",
    contacto: "923 456 001",
    email: "joao.ambrosio@ipil.ao",
    documento: { tipo: "BI", numero: "001234567LA045" },
    encarregado: {
      nome: "Maria Ambrósio",
      contacto: "912 345 001",
      parentesco: "Mãe",
    },
    dataNascimento: "15/03/2008",
    genero: "Masculino",
    status: "activo",
    dataMatricula: "10/02/2023",
    endereco: "Rua da Sagrada Esperança, nº 45, Luanda",
    mediaGeral: 14.5,
    aprovado: true,
  },
  {
    id: "e2",
    nome: "ANA SOFIA KIPUENA",
    numeroProcesso: "DL23002",
    turma: "IN10A",
    curso: "Informática",
    anoClasse: "10ª",
    contacto: "934 567 002",
    email: "ana.kipuena@ipil.ao",
    documento: { tipo: "BI", numero: "002345678LA046" },
    encarregado: {
      nome: "João Kipuena",
      contacto: "923 456 002",
      parentesco: "Pai",
    },
    dataNascimento: "22/07/2008",
    genero: "Feminino",
    status: "activo",
    dataMatricula: "10/02/2023",
    endereco: "Bairro Prenda, Rua 4, nº 12, Luanda",
    mediaGeral: 16.2,
    aprovado: true,
  },
  {
    id: "e3",
    nome: "MÁRIO PEDRO KATIAVALA",
    numeroProcesso: "DL23003",
    turma: "IN10B",
    curso: "Informática",
    anoClasse: "10ª",
    contacto: "912 789 003",
    email: "mario.katiavala@ipil.ao",
    documento: { tipo: "BI", numero: "003456789LA047" },
    encarregado: {
      nome: "Pedro Katiavala",
      contacto: "934 567 003",
      parentesco: "Pai",
    },
    dataNascimento: "05/11/2008",
    genero: "Masculino",
    status: "activo",
    dataMatricula: "10/02/2023",
    endereco: "Rua do Carmo, nº 78, Luanda",
    mediaGeral: 11.0,
    aprovado: true,
  },
  {
    id: "e4",
    nome: "LÚCIA HELENA TOMÁS",
    numeroProcesso: "DL23004",
    turma: "IN11A",
    curso: "Informática",
    anoClasse: "11ª",
    contacto: "925 111 004",
    email: "lucia.tomas@ipil.ao",
    documento: { tipo: "BI", numero: "004567890LA048" },
    encarregado: {
      nome: "Helena Tomás",
      contacto: "912 111 004",
      parentesco: "Mãe",
    },
    dataNascimento: "30/01/2007",
    genero: "Feminino",
    status: "activo",
    dataMatricula: "12/02/2022",
    endereco: "Bairro Maianga, Rua 7, nº 34, Luanda",
    mediaGeral: 9.5,
    aprovado: false,
  },
  {
    id: "e5",
    nome: "FERNANDO KITUMBI JÚNIOR",
    numeroProcesso: "DL23005",
    turma: "IN11B",
    curso: "Informática",
    anoClasse: "11ª",
    contacto: "933 222 005",
    email: "fernando.kitumbi@ipil.ao",
    documento: { tipo: "Passaporte", numero: "PA123456" },
    encarregado: {
      nome: "Fernando Kitumbi",
      contacto: "945 333 005",
      parentesco: "Pai",
    },
    dataNascimento: "18/06/2007",
    genero: "Masculino",
    status: "activo",
    dataMatricula: "12/02/2022",
    endereco: "Rua da Samba, nº 90, Luanda",
    mediaGeral: 13.8,
    aprovado: true,
  },
  {
    id: "e6",
    nome: "ADRIANA MADALENA COSTA",
    numeroProcesso: "DL23006",
    turma: "IN12A",
    curso: "Informática",
    anoClasse: "12ª",
    contacto: "927 333 006",
    email: "adriana.costa@ipil.ao",
    documento: { tipo: "BI", numero: "006789012LA050" },
    encarregado: {
      nome: "Madalena Costa",
      contacto: "914 444 006",
      parentesco: "Mãe",
    },
    dataNascimento: "09/09/2006",
    genero: "Feminino",
    status: "activo",
    dataMatricula: "14/02/2021",
    endereco: "Bairro Benfica, Rua 12, nº 56, Luanda",
    mediaGeral: 17.1,
    aprovado: true,
  },
  {
    id: "e7",
    nome: "GABRIEL MANUEL LOPES",
    numeroProcesso: "DL23007",
    turma: "IN12B",
    curso: "Informática",
    anoClasse: "12ª",
    contacto: "936 555 007",
    email: "gabriel.lopes@ipil.ao",
    documento: { tipo: "BI", numero: "007890123LA051" },
    encarregado: {
      nome: "Manuel Lopes",
      contacto: "923 666 007",
      parentesco: "Pai",
    },
    dataNascimento: "02/12/2006",
    genero: "Masculino",
    status: "inactivo",
    dataMatricula: "14/02/2021",
    endereco: "Rua de Alvalade, nº 23, Luanda",
    mediaGeral: 8.0,
    aprovado: false,
  },
  {
    id: "e8",
    nome: "ISABEL NATÁLIA SANTOS",
    numeroProcesso: "DL23008",
    turma: "IN10B",
    curso: "Informática",
    anoClasse: "10ª",
    contacto: "914 777 008",
    email: "isabel.santos@ipil.ao",
    documento: { tipo: "BI", numero: "008901234LA052" },
    encarregado: {
      nome: "Natália Santos",
      contacto: "925 888 008",
      parentesco: "Mãe",
    },
    dataNascimento: "14/04/2008",
    genero: "Feminino",
    status: "transferido",
    dataMatricula: "10/02/2023",
    endereco: "Bairro Cacuaco, Rua 3, Luanda",
    mediaGeral: 12.3,
    aprovado: true,
  },
  {
    id: "e9",
    nome: "SIMÃO LOURENÇO PAULO",
    numeroProcesso: "DL23009",
    turma: "EL10A",
    curso: "Electrónica",
    anoClasse: "10ª",
    contacto: "921 111 009",
    email: "simao.paulo@ipil.ao",
    documento: { tipo: "BI", numero: "009012345LA053" },
    encarregado: {
      nome: "Lourenço Paulo",
      contacto: "932 222 009",
      parentesco: "Pai",
    },
    dataNascimento: "20/05/2008",
    genero: "Masculino",
    status: "activo",
    dataMatricula: "10/02/2023",
    endereco: "Rua dos Coqueiros, nº 11, Luanda",
    mediaGeral: 10.5,
    aprovado: true,
  },
  {
    id: "e10",
    nome: "MARTA FILIPA GOMES",
    numeroProcesso: "DL23010",
    turma: "EL10A",
    curso: "Electrónica",
    anoClasse: "10ª",
    contacto: "935 333 010",
    email: "marta.gomes@ipil.ao",
    documento: { tipo: "BI", numero: "010123456LA054" },
    encarregado: {
      nome: "Filipe Gomes",
      contacto: "946 444 010",
      parentesco: "Pai",
    },
    dataNascimento: "03/09/2008",
    genero: "Feminino",
    status: "activo",
    dataMatricula: "10/02/2023",
    endereco: "Bairro Palanca, Rua 9, nº 67, Luanda",
    mediaGeral: 14.0,
    aprovado: true,
  },
  {
    id: "e11",
    nome: "NUNO MIGUEL SILVA",
    numeroProcesso: "DL23011",
    turma: "EL11A",
    curso: "Electrónica",
    anoClasse: "11ª",
    contacto: "928 555 011",
    email: "nuno.silva@ipil.ao",
    documento: { tipo: "BI", numero: "011234567LA055" },
    encarregado: {
      nome: "Miguel Silva",
      contacto: "917 666 011",
      parentesco: "Pai",
    },
    dataNascimento: "17/02/2007",
    genero: "Masculino",
    status: "activo",
    dataMatricula: "12/02/2022",
    endereco: "Rua do Mar, nº 88, Luanda",
    mediaGeral: 11.2,
    aprovado: true,
  },
  {
    id: "e12",
    nome: "CÁTIA ANDREIA JORGE",
    numeroProcesso: "DL23012",
    turma: "EL11B",
    curso: "Electrónica",
    anoClasse: "11ª",
    contacto: "913 777 012",
    email: "catia.jorge@ipil.ao",
    documento: { tipo: "Passaporte", numero: "PA789012" },
    encarregado: {
      nome: "André Jorge",
      contacto: "929 888 012",
      parentesco: "Pai",
    },
    dataNascimento: "28/10/2007",
    genero: "Feminino",
    status: "activo",
    dataMatricula: "12/02/2022",
    endereco: "Bairro Viana, Rua 2, nº 45, Luanda",
    mediaGeral: 15.7,
    aprovado: true,
  },
  {
    id: "e13",
    nome: "PAULO SÉRGIO NETO",
    numeroProcesso: "DL23013",
    turma: "EL12A",
    curso: "Electrónica",
    anoClasse: "12ª",
    contacto: "926 999 013",
    email: "paulo.neto@ipil.ao",
    documento: { tipo: "BI", numero: "013456789LA057" },
    encarregado: {
      nome: "Sérgio Neto",
      contacto: "915 000 013",
      parentesco: "Pai",
    },
    dataNascimento: "11/07/2006",
    genero: "Masculino",
    status: "activo",
    dataMatricula: "14/02/2021",
    endereco: "Rua das Flores, nº 33, Luanda",
    mediaGeral: 9.0,
    aprovado: false,
  },
  {
    id: "e14",
    nome: "ELISA MARTA KAMBUALA",
    numeroProcesso: "DL23014",
    turma: "EL12B",
    curso: "Electrónica",
    anoClasse: "12ª",
    contacto: "931 222 014",
    email: "elisa.kambuala@ipil.ao",
    documento: { tipo: "BI", numero: "014567890LA058" },
    encarregado: {
      nome: "Marta Kambuala",
      contacto: "944 333 014",
      parentesco: "Mãe",
    },
    dataNascimento: "25/12/2006",
    genero: "Feminino",
    status: "inactivo",
    dataMatricula: "14/02/2021",
    endereco: "Bairro Rocha Pinto, Rua 5, Luanda",
    mediaGeral: 6.5,
    aprovado: false,
  },
];

export const STATUS_CONFIG: Record<
  StatusEstudante,
  { label: string; badge: string; dot: string }
> = {
  activo: {
    label: "Activo",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  inactivo: {
    label: "Inactivo",
    badge: "bg-zinc-100 text-zinc-500 border-zinc-200",
    dot: "bg-zinc-400",
  },
  transferido: {
    label: "Transferido",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-400",
  },
};
