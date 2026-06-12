# Documentação Técnica do Backend — SGE (Sistema de Gestão Escolar)

> **Instituto Politécnico Industrial de Luanda — Angola**
> **Stack:** NestJS + PostgreSQL + Prisma ORM + JWT + bcrypt

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Arquitectura do Sistema](#2-arquitectura-do-sistema)
3. [Modelo de Dados (Prisma Schema)](#3-modelo-de-dados-prisma-schema)
4. [Fluxo de Autenticação](#4-fluxo-de-autenticação)
5. [Registo de Aluno (Fluxo Completo)](#5-registo-de-aluno-fluxo-completo)
6. [Registo de Professor](#6-registo-de-professor)
7. [Registo de Administrador](#7-registo-de-administrador)
8. [API Endpoints — Aluno](#8-api-endpoints--aluno)
9. [API Endpoints — Professor](#9-api-endpoints--professor)
10. [API Endpoints — Administrador](#10-api-endpoints--administrador)
11. [API Endpoints — Autenticação](#11-api-endpoints--autenticação)
12. [Geração de Credenciais](#12-geração-de-credenciais)
13. [Controlo de Acesso (RBAC)](#13-controlo-de-acesso-rbac)
14. [Segurança](#14-segurança)
15. [Estrutura de Pastas (Backend)](#15-estrutura-de-pastas-backend)

---

## 1. Visão Geral

O **SGE (Sistema de Gestão Escolar)** é uma plataforma de gestão académica para o Instituto Politécnico Industrial de Luanda. O sistema possui **três perfis de utilizador**:

| Perfil | Descrição |
|---|---|
| **Aluno** | Acede a boletins, horários, materiais, submete trabalhos, vê convocatórias e informações institucionais |
| **Professor** | Gere turmas, partilha materiais, avalia submissões, lança notas, cria exames |
| **Administrador** | Gere professores, estudantes, exames e configurações do sistema |

---

## 2. Arquitectura do Sistema

```
┌─────────────────────────────────────────────────────┐
│                     Frontend                         │
│              (Next.js 16 + shadcn/ui)                │
│     Aluno Pages · Professor Pages · Admin Pages      │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP/HTTPS + JWT (Bearer)
┌──────────────────────▼──────────────────────────────┐
│                    Backend (NestJS)                   │
│  ┌─────────┐ ┌───────────┐ ┌──────────┐ ┌────────┐ │
│  │  Auth   │ │  Modules  │ │ Guards/  │ │Filters/│ │
│  │ Module  │ │  (CRUD)   │ │Intercept.│ │Pipes   │ │
│  └────┬────┘ └─────┬─────┘ └────┬─────┘ └────┬───┘ │
│       └────────────┴────────────┴─────────────┘     │
│                      Prisma ORM                      │
└──────────────────────┬──────────────────────────────┘
                       │
              ┌────────▼────────┐
              │   PostgreSQL    │
              │   (Database)    │
              └─────────────────┘
```

---

## 3. Modelo de Dados (Prisma Schema)

### 3.1. User (Tabela Base)

```prisma
enum Role {
  ALUNO
  PROFESSOR
  ADMIN
}

enum UserStatus {
  PENDENTE   // Apenas para alunos em espera de aprovação
  ATIVO
  INATIVO
  TRANSFERIDO
}

model User {
  id              String     @id @default(uuid())
  nome            String
  email           String?    @unique
  telefone        String?
  numeroUtilizador String?   @unique  // Gerado automaticamente
  senhaHash       String
  role            Role
  status          UserStatus @default(ATIVO)
  avatar          String?
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt

  // Relações específicas por role
  aluno           Aluno?
  professor       Professor?
  admin           Admin?
  submissoes      Submissao[]
  notas           Nota[]

  @@map("users")
}
```

### 3.2. Aluno

```prisma
model Aluno {
  id                       String   @id @default(uuid())
  userId                   String   @unique
  user                     User     @relation(fields: [userId], references: [id])

  // Dados do formulário de registo
  dataNascimento           DateTime
  tipoIdentificacao        String   // "BI", "Passaporte", etc.
  numeroIdentificacao      String   // Nº do BI
  numeroProcesso           String   @unique  // Nº de processo do aluno
  ultimaClasseFrequentada  String   // Ex: "9ª Classe"
  ultimaTurma              String   // Última turma frequentada ou a frequentar
  fotoFrenteBI             String?  // URL da foto do BI (frente)
  FotoVersoBI              String?  // URL da foto do BI (verso)

  // Dados complementares (preenchidos após aprovação)
  turmaId                  String?
  turma                    Turma?   @relation(fields: [turmaId], references: [id])
  curso                    String?  // Ex: "Técnico de Química Industrial"
  turno                    String?  // "Manhã", "Tarde"
  classe                   String?  // Ex: "10ª Classe"

  // Dados pessoais
  genero                   String?
  altura                   String?
  estadoCivil              String?
  nomePai                  String?
  nomeMae                  String?
  naturalidade             String?
  dataEmissaoBI            DateTime?
  validadeBI               DateTime?
  provincia                String?
  municipio                String?
  comuna                   String?

  // Dados do encarregado
  encarregadoNome          String?
  encarregadoParentesco    String?
  encarregadoGenero        String?
  encarregadoDataNascimento DateTime?
  encarregadoTelefone      String?
  encarregadoEmail         String?

  // Relações
  submissoes               Submissao[]
  notas                    Nota[]

  @@map("alunos")
}
```

### 3.3. Professor

```prisma
model Professor {
  id              String   @id @default(uuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])

  cargo           String   // Ex: "Professor de Matemática"
  contacto        String?
  disciplinas     ProfessorDisciplina[]
  materiais       Material[]
  horarios        Horario[]

  @@map("professores")
}
```

### 3.4. Admin

```prisma
model Admin {
  id              String   @id @default(uuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])

  configuracoes   Configuracao[]

  @@map("admins")
}
```

### 3.5. Curso

```prisma
model Curso {
  id              String   @id @default(uuid())
  nome            String   // "Informática", "Electrónica"
  sigla           String   // "INF", "ELE"
  turmas          Turma[]
  disciplinas     Disciplina[]

  @@map("cursos")
}
```

### 3.6. Turma

```prisma
model Turma {
  id              String   @id @default(uuid())
  nome            String   // "QI10B", "QI11A"
  cursoId         String
  curso           Curso    @relation(fields: [cursoId], references: [id])
  anoLectivo      String
  turno           String   // "Manhã", "Tarde"
  alunos          Aluno[]
  exames          Exame[]
  convocatorias   Convocatoria[]
  horarios        Horario[]
  professorDisciplinas ProfessorDisciplina[]

  @@map("turmas")
}
```

### 3.7. Disciplina

```prisma
model Disciplina {
  id              String   @id @default(uuid())
  nome            String   // "Química", "Matemática"
  sigla           String   // "QUI", "MAT"
  cursoId         String
  curso           Curso    @relation(fields: [cursoId], references: [id])
  cor             String?  // Cor para UI
  materiais       Material[]
  submissoes      Submissao[]
  exames          Exame[]
  notas           Nota[]
  horarios        Horario[]
  professorDisciplinas ProfessorDisciplina[]

  @@map("disciplinas")
}
```

### 3.8. ProfessorDisciplina

```prisma
model ProfessorDisciplina {
  professorId   String
  professor     Professor @relation(fields: [professorId], references: [id])
  disciplinaId  String
  disciplina    Disciplina @relation(fields: [disciplinaId], references: [id])
  turmaId       String
  turma         Turma     @relation(fields: [turmaId], references: [id])

  @@id([professorId, disciplinaId, turmaId])
  @@map("professor_disciplinas")
}
```

### 3.9. Material

```prisma
model Material {
  id              String   @id @default(uuid())
  titulo          String
  descricao       String?
  ficheiroUrl     String
  tipo            String   // "pdf", "doc", "link", "img"
  dataPublicacao  DateTime @default(now())
  visivel         Boolean  @default(true)
  professorId     String
  professor       Professor @relation(fields: [professorId], references: [id])
  disciplinaId    String
  disciplina      Disciplina @relation(fields: [disciplinaId], references: [id])

  @@map("materiais")
}
```

### 3.10. Submissao

```prisma
enum StatusSubmissao {
  PENDENTE
  APROVADO
  REJEITADO
}

model Submissao {
  id              String   @id @default(uuid())
  descricao       String?
  ficheiroUrl     String
  dataSubmissao   DateTime @default(now())
  status          StatusSubmissao @default(PENDENTE)
  comentario      String?  // Feedback do professor
  alunoId         String
  aluno           Aluno    @relation(fields: [alunoId], references: [id])
  disciplinaId    String
  disciplina      Disciplina @relation(fields: [disciplinaId], references: [id])

  @@map("submissoes")
}
```

### 3.11. Exame

```prisma
model Exame {
  id              String   @id @default(uuid())
  tipo            String   // "1_PROVA", "2_PROVA"
  data            DateTime
  sala            String
  trimestre       String   // "I TRIMESTRE", "II TRIMESTRE", "III TRIMESTRE"
  disciplinaId    String
  disciplina      Disciplina @relation(fields: [disciplinaId], references: [id])
  turmaId         String
  turma           Turma    @relation(fields: [turmaId], references: [id])
  createdAt       DateTime @default(now())

  @@map("exames")
}
```

### 3.12. Nota

```prisma
model Nota {
  id                    String  @id @default(uuid())
  pp                    Float?  // Prova Prática (0-20)
  pt                    Float?  // Prova Teórica (0-20)
  mt                    Float?  // Média Trimestral (0-20)
  faltasJustificadas    Int     @default(0)
  faltasInjustificadas  Int     @default(0)
  trimestre             String  // "I TRIMESTRE", "II TRIMESTRE", "III TRIMESTRE"
  alunoId               String
  aluno                 Aluno   @relation(fields: [alunoId], references: [id])
  disciplinaId          String
  disciplina            Disciplina @relation(fields: [disciplinaId], references: [id])

  @@unique([alunoId, disciplinaId, trimestre])
  @@map("notas")
}
```

### 3.13. Convocatoria

```prisma
model Convocatoria {
  id              String   @id @default(uuid())
  titulo          String
  descricao       String
  data            DateTime
  turmaId         String
  turma           Turma    @relation(fields: [turmaId], references: [id])
  createdAt       DateTime @default(now())

  @@map("convocatorias")
}
```

### 3.14. Horario

```prisma
model Horario {
  id              String   @id @default(uuid())
  diaSemana       String   // "segunda", "terca", "quarta", "quinta", "sexta"
  periodo         Int      // 1-12 (6 manhã + 6 tarde)
  disciplinaId    String
  disciplina      Disciplina @relation(fields: [disciplinaId], references: [id])
  professorId     String
  professor       Professor @relation(fields: [professorId], references: [id])
  turmaId         String
  turma           Turma    @relation(fields: [turmaId], references: [id])

  @@unique([diaSemana, periodo, turmaId])
  @@map("horarios")
}
```

### 3.15. Informacao

```prisma
model Informacao {
  id              String   @id @default(uuid())
  titulo          String
  descricao       String
  imagemUrl       String?
  dataPublicacao  DateTime @default(now())

  @@map("informacoes")
}
```

### 3.16. Configuracao

```prisma
model Configuracao {
  id              String   @id @default(uuid())
  chave           String   @unique
  valor           String
  adminId         String
  admin           Admin    @relation(fields: [adminId], references: [id])
  updatedAt       DateTime @updatedAt

  @@map("configuracoes")
}
```

### 3.17. Tabela de Registo de Aluno (PendingRegistration)

```prisma
model PendingRegistration {
  id                       String   @id @default(uuid())
  nomeCompleto             String
  dataNascimento           DateTime
  tipoIdentificacao        String
  numeroIdentificacao      String   // Nº do BI
  numeroProcesso           String   @unique
  ultimaClasseFrequentada  String
  ultimaTurma              String
  telefone                 String
  email                    String?
  fotoFrenteBI             String
  fotoVersoBI              String
  status                   String   @default("pendente") // "pendente", "aprovado", "rejeitado"
  createdAt                DateTime @default(now())
  updatedAt                DateTime @updatedAt
  reviewedBy               String?  // ID do admin que revisou
  reviewedAt               DateTime?
  observacao               String?  // Motivo da rejeição, se aplicável

  @@map("pending_registrations")
}
```

---

## 4. Fluxo de Autenticação

### 4.1. Login

```
┌──────────┐     ┌───────────┐     ┌──────────┐     ┌──────────────┐
│ Utilizador│     │  Frontend │     │  Backend  │     │  PostgreSQL   │
└────┬─────┘     └─────┬─────┘     └─────┬─────┘     └──────┬───────┘
     │                  │                  │                  │
     │  /login          │                  │                  │
     │─────────────────>│                  │                  │
     │                  │  POST /auth/login│                  │
     │                  │─────────────────>│                  │
     │                  │                  │  SELECT user     │
     │                  │                  │─────────────────>│
     │                  │                  │<──────────────── │
     │                  │                  │                  │
     │                  │                  │ bcrypt.compare() │
     │                  │                  │  (senha)         │
     │                  │                  │                  │
     │                  │  200 {token,     │                  │
     │                  │  user}           │                  │
     │                  │<─────────────────│                  │
     │                  │                  │                  │
     │  Redireciona     │                  │                  │
     │  /{role}/dashboard│                 │                  │
     │<─────────────────│                  │                  │
```

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "numeroUtilizador": "80727021528943",
  "senha": "SGE@2026#abc"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "nome": "BENJAMIM TAMBUE",
    "email": "benjamim@email.com",
    "role": "aluno",
    "avatar": null
  }
}
```

**Response (401):**
```json
{
  "statusCode": 401,
  "message": "Credenciais inválidas"
}
```

### 4.2. Logout

O logout é feito no frontend: o token JWT armazenado no `localStorage` (ou httpOnly cookie) é removido e o utilizador é redirecionado para `/login`.

### 4.3. Verificação de Token

**Endpoint:** `GET /api/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "id": "uuid",
  "nome": "BENJAMIM TAMBUE",
  "email": "benjamim@email.com",
  "role": "aluno",
  "avatar": null,
  "perfil": {
    "turma": "QI10B",
    "numero": "80727"
  }
}
```

### 4.4. Alteração de Senha

**Endpoint:** `PATCH /api/auth/change-password`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "senhaAtual": "SGE@2026#abc",
  "novaSenha": "NovaSenha@2026#xyz"
}
```

**Regras de senha forte:**
- Mínimo 8 caracteres
- Pelo menos 1 letra maiúscula
- Pelo menos 1 letra minúscula
- Pelo menos 1 número
- Pelo menos 1 caractere especial (`@#$%^&*!`)

---

## 5. Registo de Aluno (Fluxo Completo)

### 5.1. Formulário de Registo (Público)

O aluno preenche o formulário de pré-registo com os seguintes campos:

| Campo | Tipo | Obrigatório |
|---|---|---|
| `nomeCompleto` | string | Sim |
| `dataNascimento` | date | Sim |
| `tipoIdentificacao` | string ("BI", "Passaporte") | Sim |
| `numeroIdentificacao` | string (Nº do BI/Passaporte) | Sim |
| `numeroProcesso` | string | Sim |
| `ultimaClasseFrequentada` | string | Sim |
| `ultimaTurma` | string | Sim |
| `telefone` | string | Sim |
| `email` | string | Não |
| `fotoFrenteBI` | file (upload) | Sim |
| `fotoVersoBI` | file (upload) | Sim |

**Endpoint:** `POST /api/registrations`

**Request (multipart/form-data):**
```
nomeCompleto: "BENJAMIM ETIENE TSHIMBU TAMBUE"
dataNascimento: "2005-03-15"
tipoIdentificacao: "BI"
numeroIdentificacao: "021528943LA053"
numeroProcesso: "80727"
ultimaClasseFrequentada: "9ª Classe"
ultimaTurma: "QI10B"
telefone: "941557492"
email: "benjamim@email.com"
fotoFrenteBI: (file)
fotoVersoBI: (file)
```

**Response (201):**
```json
{
  "message": "Pré-registo submetido com sucesso. Aguarde aprovação do administrador.",
  "registrationId": "uuid"
}
```

### 5.2. Admin — Lista de Alunos Pendentes

**Endpoint:** `GET /api/admin/registrations?status=pendente`

**Response (200):**
```json
{
  "registrations": [
    {
      "id": "uuid",
      "nomeCompleto": "BENJAMIM ETIENE TSHIMBU TAMBUE",
      "numeroProcesso": "80727",
      "numeroIdentificacao": "021528943LA053",
      "dataNascimento": "2005-03-15",
      "telefone": "941557492",
      "email": "benjamim@email.com",
      "ultimaClasseFrequentada": "9ª Classe",
      "ultimaTurma": "QI10B",
      "fotoFrenteBI": "/uploads/bis/frente_uuid.jpg",
      "fotoVersoBI": "/uploads/bis/verso_uuid.jpg",
      "createdAt": "2026-06-01T10:30:00Z"
    }
  ],
  "total": 15
}
```

### 5.3. Admin — Aprovar Registo de Aluno

**Endpoint:** `POST /api/admin/registrations/:id/approve`

Quando o admin aprova, o backend:

1. Gera o **número de utilizador**: `{numeroProcesso}{numeroIdentificacao}` (apenas dígitos)
   - Ex: `80727021528943` (numeroProcesso="80727" + numeroIdentificacao="021528943LA053")
2. Gera uma **senha temporária** forte automática
3. Cria o registo na tabela `User` com `role=ALUNO` e `status=ATIVO`
4. Cria o registo na tabela `Aluno` com os dados do formulário
5. Move o `PendingRegistration` para `status=aprovado`
6. (Opcional) Envia um email/SMS com as credenciais para o aluno

**Request Body:**
```json
{
  "turmaId": "uuid-da-turma",
  "curso": "Técnico de Química Industrial",
  "turno": "Manhã",
  "classe": "10ª Classe"
}
```

**Response (200):**
```json
{
  "message": "Aluno aprovado com sucesso",
  "aluno": {
    "id": "uuid",
    "nome": "BENJAMIM ETIENE TSHIMBU TAMBUE",
    "numeroUtilizador": "80727021528943",
    "turma": "QI10B"
  },
  "credenciais": {
    "numeroUtilizador": "80727021528943",
    "senhaTemporaria": "SGE@2026#aB3x"
  }
}
```

### 5.4. Admin — Rejeitar Registo de Aluno

**Endpoint:** `POST /api/admin/registrations/:id/reject`

**Request Body:**
```json
{
  "observacao": "Documentos ilegíveis. Por favor, reenvie fotos do BI com melhor resolução."
}
```

---

## 6. Registo de Professor

O administrador cadastra o professor diretamente na plataforma.

### 6.1. Admin — Criar Professor

**Endpoint:** `POST /api/admin/professors`

**Request Body:**
```json
{
  "nome": "Prof. Maria Silva",
  "email": "maria@prof.ao",
  "telefone": "923456789",
  "cargo": "Professor de Matemática",
  "disciplinas": [
    { "disciplinaId": "uuid-matematica", "turmaId": "uuid-qi10b" },
    { "disciplinaId": "uuid-fisica", "turmaId": "uuid-qi11a" }
  ]
}
```

**Processo no backend:**
1. Gera o **número de utilizador**: `PROF{timestamp}`
   - Ex: `PROF1718234567`
2. Gera uma **senha temporária** forte
3. Cria o registo na tabela `User` com `role=PROFESSOR` e `status=ATIVO`
4. Cria o registo na tabela `Professor` com os dados
5. Cria as associações em `ProfessorDisciplina`

**Response (201):**
```json
{
  "message": "Professor criado com sucesso",
  "professor": {
    "id": "uuid",
    "nome": "Prof. Maria Silva",
    "numeroUtilizador": "PROF1718234567",
    "email": "maria@prof.ao",
    "cargo": "Professor de Matemática"
  },
  "credenciais": {
    "numeroUtilizador": "PROF1718234567",
    "senhaTemporaria": "SGE@2026#kL9m"
  }
}
```

### 6.2. Admin — Listar Professores

**Endpoint:** `GET /api/admin/professors?curso=informatica`

### 6.3. Admin — Editar Professor

**Endpoint:** `PATCH /api/admin/professors/:id`

### 6.4. Admin — Desactivar/Eliminar Professor

**Endpoint:** `PATCH /api/admin/professors/:id/status`

---

## 7. Registo de Administrador

### 7.1. Auto-registo do Primeiro Admin (Setup)

**Endpoint:** `POST /api/setup`

**Request Body:**
```json
{
  "nome": "Administrador",
  "email": "admin@escola.ao",
  "telefone": "912345678",
  "senha": "AdminForte@2026#1"
}
```

**Regras:**
- Apenas disponível quando não existe nenhum admin no sistema
- Após o primeiro admin ser criado, este endpoint é desactivado

**Response (201):**
```json
{
  "message": "Administrador criado com sucesso",
  "admin": {
    "id": "uuid",
    "nome": "Administrador",
    "numeroUtilizador": "ADMIN001",
    "email": "admin@escola.ao"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 7.2. Admin — Criar Novo Admin (Apenas Admin existente)

**Endpoint:** `POST /api/admin/admins`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "nome": "Co-Administrador",
  "email": "coadmin@escola.ao",
  "telefone": "987654321",
  "senha": "OutraSenhaForte@2026#2"
}
```

---

## 8. API Endpoints — Aluno

### 8.1. Dashboard

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/aluno/dashboard` | Dados do dashboard do aluno (perfil, ranking, gráficos) |

**Response:**
```json
{
  "perfil": {
    "nome": "BENJAMIM ETIENE TSHIMBU TAMBUE",
    "numero": "80727",
    "turma": "QI10B",
    "classe": "10ª Classe",
    "avatar": null
  },
  "ranking": {
    "posicao": 3,
    "total": 30,
    "alunos": [
      { "posicao": 1, "nome": "LUÍS ANTÓNIO", "pontuacao": 17.5 },
      { "posicao": 2, "nome": "LEONARDO BAPTISTA", "pontuacao": 16.2 },
      { "posicao": 3, "nome": "BENJAMIM TAMBUE", "pontuacao": 14.8 }
    ]
  },
  "notasResumo": {
    "positivas": 8,
    "negativas": 2
  },
  "topDisciplinas": [
    { "nome": "Química", "media": 20 },
    { "nome": "Química Orgânica", "media": 19 },
    { "nome": "Informática", "media": 18 }
  ]
}
```

### 8.2. Perfil

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/aluno/perfil` | Perfil completo do aluno (~32 campos) |
| `PATCH` | `/api/aluno/perfil` | Actualizar dados do perfil |

**Response (GET):**
```json
{
  "nome": "BENJAMIM ETIENE TSHIMBU TAMBUE",
  "role": "Aluno",
  "turma": "QI10B",
  "numero": "80727",
  "dadosPreenchidos": 76,
  "biografia": null,
  "dataNascimento": "2005-03-15",
  "telefone": "941557492",
  "email": null,
  "genero": "Masculino",
  "altura": "1.41",
  "estadoCivil": "Solteiro",
  "nomePai": "TAMBUE GUSTAVO",
  "nomeMae": "MADALENA TSHIMBU",
  "naturalidade": "KILAMBA KIAXI",
  "tipoDocumento": "Bilhete de Identidade",
  "numeroIdentificacao": "021528943LA053",
  "dataEmissao": "22/02/2021",
  "validadeDocumento": "21/02/2026",
  "provincia": "LUANDA",
  "municipio": "CAZENGA",
  "comuna": "CAZENGA",
  "areaFormacao": "Química",
  "curso": "Técnico de Química Industrial",
  "classe": "10ª Classe",
  "turno": "Manhã",
  "turmaAcad": "QI10B",
  "numeroAcad": "11",
  "encarregadoNome": null,
  "encarregadoGrauParentesco": null,
  "encarregadoGenero": null,
  "encarregadoDataNascimento": null,
  "encarregadoTelefone": null,
  "encarregadoEmail": null
}
```

### 8.3. Minha Turma

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/aluno/turma/disciplinas` | Grid de disciplinas do aluno |
| `GET` | `/api/aluno/turma/disciplinas/:id` | Detalhe da disciplina |
| `GET` | `/api/aluno/turma/disciplinas/:id/materiais` | Materiais partilhados |

**Response (GET /disciplinas):**
```json
{
  "disciplinas": [
    {
      "id": "uuid-matematica",
      "nome": "Matemática",
      "sigla": "MAT",
      "cor": "#3B82F6",
      "professor": "Prof. João Santos",
      "materiaisCount": 5
    }
  ]
}
```

**Response (GET /disciplinas/:id/materiais):**
```json
{
  "materiais": [
    {
      "id": "uuid",
      "titulo": "Ficha de exercícios — Reacções Ácido-Base",
      "descricao": "Exercícios práticos...",
      "tipo": "pdf",
      "tamanho": "2.4 MB",
      "url": "/uploads/materiais/ficha.pdf",
      "dataPublicacao": "05/06/2026",
      "professor": "Prof. Margarida Silva",
      "nota": "Revisem os conceitos de pH antes de resolver."
    }
  ]
}
```

### 8.4. Submissão de Material

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/aluno/submissoes` | Submeter material/trabalho |
| `GET` | `/api/aluno/submissoes?disciplinaId=:id` | Histórico de submissões |

**Request (POST):**
```json
{
  "disciplinaId": "uuid",
  "descricao": "Relatório do trabalho prático de laboratório",
  "ficheiro": (file upload)
}
```

### 8.5. Horário

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/aluno/horario` | Horário semanal do aluno |

### 8.6. Horário de Provas

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/aluno/horario-provas?trimestre=I&calendario=1` | Calendário de exames |

### 8.7. Boletins

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/aluno/boletins?trimestre=I` | Notas por trimestre |

**Response:**
```json
{
  "trimestre": "I TRIMESTRE",
  "media": 14,
  "disciplinas": [
    { "n": 1, "nome": "PORTUGUÊS", "faltasJ": "-", "faltasI": "-", "pp": 14, "pt": 11, "mt": 13 }
  ]
}
```

### 8.8. Convocatórias

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/aluno/convocatorias` | Lista de convocatórias |
| `GET` | `/api/aluno/convocatorias/:id` | Detalhe da convocatória |

### 8.9. Informações

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/informacoes` | Avisos institucionais |
| `GET` | `/api/informacoes/:id` | Detalhe do aviso |

---

## 9. API Endpoints — Professor

### 9.1. Dashboard

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/professor/dashboard` | Dashboard com estatísticas |

**Response:**
```json
{
  "stats": {
    "aulasLeccionadas": { "value": 24, "sub": "este mês" },
    "totalEstudantes": { "value": 87, "sub": "sob responsabilidade" },
    "proximoExame": { "value": "18 Jun", "sub": "Química · QI10B" },
    "mediaGeral": { "value": 14.2, "sub": "média das turmas" }
  },
  "agendaSemanal": [
    { "dia": "Seg", "aulas": [ { "hora": "07:00", "turma": "QI10B", "disciplina": "Química" } ] }
  ],
  "proximosEventos": [
    { "tipo": "exame", "titulo": "2ª Prova dos Professores — Química", "data": "18/06/2026" }
  ],
  "materiaisRecentes": [
    { "titulo": "Ficha de exercícios", "disciplina": "Química", "turma": "QI10B", "data": "05/06/2026" }
  ],
  "desempenhoTurmas": [
    { "turma": "QI10B", "disciplina": "Química", "media": 14.2, "positivas": 78, "negativas": 22 }
  ]
}
```

### 9.2. Minha Turma (Sala de Aula)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/professor/turma/disciplinas` | Disciplinas que lecciona |
| `GET` | `/api/professor/turma/disciplinas/:id` | Detalhe da disciplina |
| `GET` | `/api/professor/turma/disciplinas/:id/materiais` | Materiais da disciplina |
| `POST` | `/api/professor/materiais` | Partilhar novo material |
| `DELETE` | `/api/professor/materiais/:id` | Remover material |
| `PATCH` | `/api/professor/materiais/:id/visibilidade` | Alternar visibilidade |
| `GET` | `/api/professor/submissoes?disciplinaId=:id` | Submissões dos alunos |
| `PATCH` | `/api/professor/submissoes/:id/aprovar` | Aprovar submissão |
| `PATCH` | `/api/professor/submissoes/:id/rejeitar` | Rejeitar submissão |
| `GET` | `/api/professor/avisos?disciplinaId=:id` | Avisos da disciplina |
| `POST` | `/api/professor/avisos` | Publicar aviso |
| `DELETE` | `/api/professor/avisos/:id` | Remover aviso |
| `GET` | `/api/professor/turma/alunos?disciplinaId=:id` | Lista de alunos |

### 9.3. Estudantes

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/professor/estudantes?search=&turmaId=&trimestre=` | Lista de estudantes com filtros |
| `GET` | `/api/professor/estudantes/:id` | Perfil completo do estudante |

### 9.4. Exames

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/professor/exames?status=&trimestre=` | Lista de exames |
| `POST` | `/api/professor/exames` | Criar novo exame |

**Request (POST /exames):**
```json
{
  "tipo": "1_PROVA",
  "data": "2026-06-18",
  "sala": "B3",
  "trimestre": "II TRIMESTRE",
  "disciplinaId": "uuid",
  "turmaId": "uuid"
}
```

### 9.5. Notas

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/professor/notas?turmaId=&disciplinaId=&trimestre=` | Lista de notas |
| `PATCH` | `/api/professor/notas/:id` | Lançar/editar nota |
| `POST` | `/api/professor/notas/batch` | Lançar notas em lote |

### 9.6. Horários

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/professor/horario` | Horário do professor |
| `GET` | `/api/professor/horario-provas?trimestre=&calendario=` | Horário de provas |

---

## 10. API Endpoints — Administrador

### 10.1. Dashboard

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/admin/dashboard` | Visão geral do sistema |

**Response:**
```json
{
  "totalEstudantes": { "activos": 450, "inactivos": 12, "pendentes": 15 },
  "totalProfessores": 28,
  "totalTurmas": 14,
  "taxaAprovacaoGeral": 76.5,
  "distribuicaoPorCurso": [
    { "curso": "Informática", "estudantes": 230 },
    { "curso": "Electrónica", "estudantes": 220 }
  ],
  "evolucaoMatriculas": [
    { "ano": "2024", "total": 420 },
    { "ano": "2025", "total": 450 }
  ],
  "ultimosLogs": [
    { "acao": "Criou professor", "admin": "Administrador", "data": "2026-06-08T10:00:00Z" }
  ]
}
```

### 10.2. Gestão de Professores

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/admin/professors?curso=informatica` | Lista de professores por curso |
| `POST` | `/api/admin/professors` | Criar professor |
| `GET` | `/api/admin/professors/:id` | Detalhe do professor |
| `PATCH` | `/api/admin/professors/:id` | Editar professor |
| `DELETE` | `/api/admin/professors/:id` | Remover professor |
| `PATCH` | `/api/admin/professors/:id/status` | Activar/desactivar professor |

### 10.3. Gestão de Estudantes

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/admin/students?curso=informatica&status=&turmaId=` | Lista de estudantes |
| `GET` | `/api/admin/students/:id` | Perfil completo do estudante |
| `PATCH` | `/api/admin/students/:id` | Editar estudante |
| `DELETE` | `/api/admin/students/:id` | Remover estudante |
| `PATCH` | `/api/admin/students/:id/transfer` | Transferir de turma |
| `PATCH` | `/api/admin/students/:id/status` | Alterar status |
| `GET` | `/api/admin/students/:id/historico` | Histórico académico |

### 10.4. Gestão de Registo de Alunos (Pré-registo)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/admin/registrations?status=pendente` | Lista de pré-registos |
| `GET` | `/api/admin/registrations/:id` | Detalhe do pré-registo |
| `POST` | `/api/admin/registrations/:id/approve` | Aprovar e criar aluno |
| `POST` | `/api/admin/registrations/:id/reject` | Rejeitar com observação |

### 10.5. Gestão de Exames

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/admin/exams?curso=informatica&trimestre=` | Calendário de exames |
| `POST` | `/api/admin/exams` | Agendar exame |
| `PATCH` | `/api/admin/exams/:id` | Editar exame |
| `DELETE` | `/api/admin/exams/:id` | Remover exame |
| `POST` | `/api/admin/exams/:id/results` | Lançar resultados |

### 10.6. Configurações

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/admin/config` | Listar configurações |
| `PATCH` | `/api/admin/config` | Actualizar configurações |
| `GET` | `/api/admin/cursos` | Listar cursos |
| `POST` | `/api/admin/cursos` | Criar curso |
| `GET` | `/api/admin/turmas` | Listar turmas |
| `POST` | `/api/admin/turmas` | Criar turma |
| `GET` | `/api/admin/disciplinas` | Listar disciplinas |
| `POST` | `/api/admin/disciplinas` | Criar disciplina |
| `GET` | `/api/admin/admins` | Listar administradores |
| `POST` | `/api/admin/admins` | Criar administrador |
| `GET` | `/api/admin/logs` | Logs de auditoria |

---

## 11. API Endpoints — Autenticação

| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| `POST` | `/api/auth/login` | Login (ID + senha) | Público |
| `POST` | `/api/auth/change-password` | Alterar senha | Autenticado |
| `POST` | `/api/auth/forgot-password` | Solicitar reset de senha | Público |
| `POST` | `/api/auth/reset-password` | Reset de senha com token | Público (com token) |
| `GET` | `/api/auth/me` | Dados do utilizador logado | Autenticado |
| `POST` | `/api/registrations` | Pré-registo de aluno | Público |
| `POST` | `/api/setup` | Setup inicial do admin | Público (1x) |

---

## 12. Geração de Credenciais

### 12.1. Número de Utilizador

**Aluno:**
```
{numeroProcesso}{digitos_do_numero_identificacao}
```
- Ex: `numeroProcesso="80727"`, `numeroIdentificacao="021528943LA053"` → `80727021528943`
- Apenas dígitos numéricos são extraídos do nº de identificação

**Professor:**
```
PROF{timestamp_unix}
```
- Ex: `PROF1718234567`

**Admin:**
```
ADMIN{sequencial}
```
- Ex: `ADMIN001`, `ADMIN002`

### 12.2. Senha Temporária

Gerada automaticamente com o formato:
```
SGE@{ano}#{4_caracteres_aleatorios}
```
- Ex: `SGE@2026#aB3x`, `SGE@2026#kL9m`
- Inclui: letras maiúsculas, minúsculas, números e caracteres especiais
- 12 caracteres no total
- Obrigatório alterar no primeiro login (frontend deve forçar alteração)

---

## 13. Controlo de Acesso (RBAC)

### 13.1. Roles e Permissões

| Recurso | Aluno | Professor | Admin |
|---|---|---|---|
| Dashboard próprio | ✅ | ✅ | ✅ |
| Perfil próprio | ✅ | ✅ | ✅ |
| Ver materiais | ✅ | ✅ | ✅ |
| Submeter materiais | ✅ | ❌ | ❌ |
| Partilhar materiais | ❌ | ✅ | ❌ |
| Avaliar submissões | ❌ | ✅ | ❌ |
| Lançar notas | ❌ | ✅ | ❌ |
| Criar exames | ❌ | ✅ | ✅ |
| Gerir professores | ❌ | ❌ | ✅ |
| Gerir estudantes | ❌ | ❌ | ✅ |
| Aprovar registos | ❌ | ❌ | ✅ |
| Configurar sistema | ❌ | ❌ | ✅ |
| Ver relatórios | ❌ | ❌ | ✅ |

### 13.2. Guards (NestJS)

```typescript
// Exemplo de guard de role
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly requiredRole: Role) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.user.role === this.requiredRole;
  }
}
```

**Uso nos controladores:**
```typescript
@Controller('admin/professors')
@UseGuards(JwtAuthGuard, new RolesGuard(Role.ADMIN))
export class AdminProfessorController {}
```

---

## 14. Segurança

### 14.1. Senhas
- Armazenadas com **bcrypt** (salt rounds: 12)
- Senha temporária deve ser alterada no primeiro login
- Validação de senha forte no backend

### 14.2. JWT
- Algoritmo: HS256
- Expiração: 24 horas (configurável)
- Payload: `{ sub: userId, role: Role, iat, exp }`
- Assinado com chave secreta do servidor

### 14.3. Protecção de Rotas
- Rotas públicas: `/api/auth/login`, `/api/registrations`, `/api/setup`
- Rotas protegidas: requerem `Authorization: Bearer <token>`
- Rotas de admin: requerem role `ADMIN`

### 14.4. Upload de Ficheiros
- Tipos permitidos: `pdf`, `doc`, `docx`, `xls`, `xlsx`, `csv`, `jpg`, `jpeg`, `png`
- Tamanho máximo: 10MB
- Armazenamento: directório `/uploads/` com subdirectórios por tipo
- Nomes gerados com UUID para evitar colisões

### 14.5. HTTPS
- Toda a comunicação entre frontend e backend deve ser HTTPS
- Certificado SSL/TLS configurado no servidor de produção

### 14.6. Headers de Segurança
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

---

## 15. Estrutura de Pastas (Backend)

```
sge-backend/
├── prisma/
│   ├── schema.prisma          # Schema da base de dados
│   └── seed.ts                # Dados de seed para desenvolvimento
│
├── src/
│   ├── main.ts                # Bootstrap do NestJS
│   ├── app.module.ts          # Módulo raiz
│   │
│   ├── auth/                  # Módulo de autenticação
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   └── guards/
│   │       ├── jwt-auth.guard.ts
│   │       └── roles.guard.ts
│   │
│   ├── alunos/                # Módulo do aluno
│   │   ├── alunos.module.ts
│   │   ├── alunos.controller.ts
│   │   └── alunos.service.ts
│   │
│   ├── professores/           # Módulo do professor
│   │   ├── professores.module.ts
│   │   ├── professores.controller.ts
│   │   └── professores.service.ts
│   │
│   ├── admin/                 # Módulo do administrador
│   │   ├── admin.module.ts
│   │   ├── admin.controller.ts
│   │   └── admin.service.ts
│   │
│   ├── registrations/         # Módulo de pré-registo
│   │   ├── registrations.module.ts
│   │   ├── registrations.controller.ts
│   │   └── registrations.service.ts
│   │
│   ├── materiais/             # Módulo de materiais
│   │   ├── materiais.module.ts
│   │   ├── materiais.controller.ts
│   │   └── materiais.service.ts
│   │
│   ├── submissoes/            # Módulo de submissões
│   │   ├── submissoes.module.ts
│   │   ├── submissoes.controller.ts
│   │   └── submissoes.service.ts
│   │
│   ├── exames/                # Módulo de exames
│   │   ├── exames.module.ts
│   │   ├── exames.controller.ts
│   │   └── exames.service.ts
│   │
│   ├── notas/                 # Módulo de notas
│   │   ├── notas.module.ts
│   │   ├── notas.controller.ts
│   │   └── notas.service.ts
│   │
│   ├── turmas/                # Módulo de turmas
│   │   ├── turmas.module.ts
│   │   ├── turmas.controller.ts
│   │   └── turmas.service.ts
│   │
│   ├── horarios/              # Módulo de horários
│   │   ├── horarios.module.ts
│   │   ├── horarios.controller.ts
│   │   └── horarios.service.ts
│   │
│   └── common/                # Módulos comuns
│       ├── decorators/
│       │   └── current-user.decorator.ts
│       ├── filters/
│       │   └── http-exception.filter.ts
│       ├── interceptors/
│       │   └── transform.interceptor.ts
│       └── dto/
│           ├── pagination.dto.ts
│           └── api-response.dto.ts
│
├── uploads/                   # Ficheiros enviados
│   ├── materiais/
│   ├── submissoes/
│   └── bis/                   # Fotos do BI (alunos)
│
├── test/                      # Testes
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .env                       # Variáveis de ambiente
├── .env.example
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── nest-cli.json
└── README.md
```

---

## Diagrama de Fluxo — Registo de Aluno

```
┌──────────┐     ┌───────────┐     ┌──────────────┐     ┌──────────┐
│  Aluno    │     │  Frontend │     │   Backend    │     │   Admin  │
└────┬─────┘     └─────┬─────┘     └──────┬───────┘     └────┬─────┘
     │                  │                  │                  │
     │  Preenche        │                  │                  │
     │  formulário      │                  │                  │
     │─────────────────>│                  │                  │
     │                  │ POST /registrations│                │
     │                  │─────────────────>│                  │
     │                  │                  │ Cria             │
     │                  │                  │ PendingRegistration
     │                  │                  │                  │
     │  201 Created     │                  │                  │
     │<─────────────────│                  │                  │
     │                  │                  │                  │
     │                  │                  │  (Admin vê)      │
     │                  │                  │<─────────────────│
     │                  │                  │  GET /admin/     │
     │                  │                  │  registrations   │
     │                  │                  │─────────────────>│
     │                  │                  │                  │
     │                  │                  │  Admin revê docs │
     │                  │                  │  e aprova/rejeita│
     │                  │                  │<─────────────────│
     │                  │                  │                  │
     │                  │                  │  POST /approve   │
     │                  │                  │  ────────────    │
     │                  │                  │  • Gera nº      │
     │                  │                  │  • Gera senha   │
     │                  │                  │  • Cria User +  │
     │                  │                  │    Aluno        │
     │                  │                  │                  │
     │  (Recebe SMS/    │                  │  200 (credenciais)│
     │   Email com      │                  │─────────────────>│
     │   credenciais)   │                  │                  │
     │<─────────────────│                  │                  │
     │                  │                  │                  │
     │  Login com       │                  │                  │
     │  credenciais     │                  │                  │
     │─────────────────>│  POST /auth/login│                  │
     │                  │─────────────────>│                  │
     │                  │                  │  Valida          │
     │                  │<────────────────│                  │
     │                  │  200 {token}     │                  │
     │<─────────────────│                  │                  │
     │                  │                  │                  │
     │  Altera senha    │                  │                  │
     │─────────────────>│  PATCH /change-password             │
     │                  │─────────────────>│                  │
     │                  │                  │  bcrypt hash     │
     │                  │<────────────────│                  │
     │                  │  200 OK          │                  │
     │<─────────────────│                  │                  │
```

---

> **Documentação gerada a partir do codebase do frontend (SGE-FRONTEND)**
> Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui
> Backend planeado em NestJS + PostgreSQL + Prisma ORM
