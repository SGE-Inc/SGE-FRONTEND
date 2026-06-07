# Funcionalidades e Conteúdos — SGE

> **Sistema de Gestão Escolar** — Frontend (Next.js 16 + Tailwind v4 + shadcn/ui)
>
> **Legenda:**
> - ✅ **Implementado** — Tela funcional com dados mock
> - 🟡 **Parcial** — Esqueleto/página criada mas sem conteúdo real
> - ⬜ **Não implementado** — Apenas planeado
> - 🔧 **Acabado de criar** — Implementado recentemente

---

## 1. Aluno (`/aluno/*`)

### 1.1. Dashboard (`/aluno/dashboard`) ✅
- **Conteúdo:**
  - `StudentProfileCard` — Foto, nome, número, turma, classe
  - `ClassRankingCard` — Ranking da turma (30 alunos), filtro por trimestre, destaque do aluno logado
  - `TotalNotasCard` — Gráfico radial (recharts) com total de notas positivas vs negativas
  - `MelhoresDisciplinasCard` — Gráfico pie (recharts) com top 3 disciplinas
- **Dados:** Mock estático (aluno Benjamin, turma QI10B)

### 1.2. Meu Perfil (`/aluno/meu-perfil`) ✅
- **Conteúdo:**
  - `PerfilHeader` — Avatar com anel cónico, nome, role, turma, número, badge QR, biografia + contactos
  - Grid 3×2 de `SectionCard`:
    1. Dados Pessoais (género, altura, estado civil)
    2. Dados Complementares (nome do pai, mãe, naturalidade)
    3. Documentação (tipo documento, nº identificação, emissão, validade)
    4. Dados de Localização (província, município, comuna)
    5. Dados Académicas (área formação, curso, classe, turno, turma, número)
    6. Dados do Encarregado (nome, parentesco, género, data nascimento, telefone, email)
- **Dados:** `PERFIL_MOCK` — 32 campos mock

### 1.3. Minha Turma (`/aluno/minha-turma`) 🔧
- **Conteúdo:**
  - Grid de cards de disciplinas (Matemática, Português, Inglês, Física, Química, etc.)
  - Cada card: sigla colorida, nome, professor, contagem de materiais
- **Por disciplina (`/aluno/minha-turma/[id]`):**
  - Cabeçalho com nome e professor
  - Lista de materiais partilhados (expansível):
    - Ícone por tipo (PDF, Word, Excel, CSV, Imagem)
    - Nome, tamanho, data
    - Botão de download
    - Nota do professor (caixa amarela)
  - Botão "Submeter Material":
    - Upload de ficheiros (PDF, .doc, .xls, .csv, imagens)
    - Descrição opcional
    - Simulação de submissão (mock)
- **Dados:** `DISCIPLINAS` — 11 disciplinas, 22 materiais, todos mock

### 1.4. Horário (`/aluno/horario`) ✅
- **Conteúdo:**
  - `HorarioTable` — Tabela semanal (Seg–Sex) com 6 tempos manhã + 6 tarde
  - Separadores: INTERVALO, MUDANÇA DE TURNO
  - Botão "Professores" toggle → `ProfessoresDisciplinas` grid com busca
- **Dados:** Mock (turma QI10B, 11 professores)

### 1.5. Horário de Provas (`/aluno/horario-de-provas`) ✅
- **Conteúdo:**
  - Filtros: Select de Trimestre (I/II/III) + Calendário (1ª/2ª Prova)
  - `ProvasTable` — Tabela scrollável horizontalmente com horário de exames
- **Dados:** `PROVAS_DATA` — 3 trimestres × 2 calendários, mock completo

### 1.6. Boletins (`/aluno/boletins`) ✅
- **Conteúdo:**
  - Select de Trimestre
  - `BoletimTable` — Tabela de notas por disciplina (Nº, Disciplina, Faltas J/I, PP, PT, MT)
    - Células coloridas: vermelho (<10), azul (≥10)
  - `MediaCard` — Gauge circular SVG com média
  - `EstatisticaCard` — Gráfico SVG de linha/área (MT vs PP por disciplina)
- **Dados:** `BOLETIM_DATA` — 11 disciplinas × 3 trimestres

### 1.7. Convocatórias (`/aluno/convocatorias`) ✅
- **Conteúdo:**
  - `ConvocatoriaPreview` — Carta formal estilo documento:
    - Selos SVG circulares (instituição)
    - Texto jurídico-institucional em Português
    - Agenda com bullets
  - Tabela de convocatórias com seleção de linha
  - Botão "Ver" com `ExternalLink`
- **Dados:** Mock (1 convocatória para turma QI10B)

### 1.8. Informações (`/aluno/informacoes`) ✅
- **Conteúdo:**
  - Campo de busca/filtro
  - `InformacoesTable` — Tabela de avisos (Nº, Título, Descrição, Link)
  - `InformacaoModal` — Dialog com conteúdo completo + lightbox para imagem
- **Dados:** `INFORMACOES` — 7 avisos mock

### 1.9. Cartão (`/aluno/cartao`) ⬜
- **Não implementado.** Ideia: cartão virtual do estudante com foto, nome, número, curso, validade e QR code.

### 1.10. Faltas (`/aluno/faltas`) ⬜
- **Não implementado.** Ideia: registo de faltas por disciplina com gráfico de presenças.

---

## 2. Professor (`/professor/*`)

> **Estado atual:** todas as páginas são placeholders. Abaixo está a visão do que cada tela DEVE conter.

### 2.1. Dashboard (`/professor/dashboard`) 🟡
- **Atualmente:** Página vazia (apenas `DashPage` com título)
- **O que deve conter:**
  - Cartões de estatísticas:
    - Total de aulas lecionadas (hoje/semana/mês)
    - Total de estudantes sob sua responsabilidade
    - Próximo exame/data importante
    - Média geral da turma
  - Calendário semanal com suas aulas
  - Lista rápida de próximos eventos / exames
  - Últimos materiais partilhados com a turma
  - Gráfico de desempenho geral da(s) turma(s)
- **Dados:** A buscar do backend (dashboard do professor)

### 2.2. Horário (`/professor/horario`) ✅ (reutiliza componentes do aluno)
- **Conteúdo:** Igual ao `/aluno/horario` — reusa `HorarioTable` + `ProfessoresDisciplinas`
- Página idêntica à do aluno por agora (partilha o mesmo componente)

### 2.3. Horário de Provas (`/professor/horario-de-provas`) ✅ (reutiliza componentes do aluno)
- **Conteúdo:** Igual ao `/aluno/horario-de-provas` — reusa `ProvasTable`

### 2.4. Minha Turma / Sala de Aula (`/professor/turma`) ⬜
- **Atualmente:** Placeholder "Lista de estudantes em construção..."
- **O que deve conter:**
  - **Visão geral da turma:** grid de disciplinas que o professor leciona
  - **Ao entrar numa disciplina:**
    - Gestão de materiais:
      - **Partilhar material:** upload de ficheiro + nota/descrição obrigatória
      - Lista de materiais partilhados (com data, visível para alunos)
      - Possibilidade de remover/editar material
    - **Submissões dos alunos:**
      - Lista de materiais submetidos pelos alunos (pendentes de aprovação)
      - Aprovar ou rejeitar submissão
      - Deixar comentário na devolução
    - **Informações:** campo para publicar avisos/notas para a turma
  - Dados dos estudantes da turma (tabela clicável com perfil resumido)

### 2.5. Estudantes / Classes (`/professor/estudantes`) 🟡
- **Atualmente:** Placeholder "Lista de estudantes em construção..."
- **O que deve conter:**
  - Tabela de estudantes com:
    - Nome, número, turma, disciplina
    - Notas (PP, PT, MT) por trimestre
    - Total de faltas
  - Filtros: por turma, por disciplina, por trimestre
  - Ação: ver perfil completo do estudante (modal ou página separada)
  - Ação: lançar notas (formulário inline ou modal)
  - Exportar dados (CSV/Excel)

### 2.6. Exames (`/professor/exames`) 🟡
- **Atualmente:** Placeholder "Lista de exames em construção..."
- **O que deve conter:**
  - Calendário de exames da(s) turma(s)
  - Registo de notas de exame
  - Histórico de exames anteriores
  - Criação de novo exame (data, sala, disciplina, trimestre, tipo)
  - Estatísticas: taxa de aprovação, média por disciplina

### 2.7. Perfil do Professor ⬜
- **Não implementado.** Ideia: dados pessoais, contacto, disciplinas que leciona, horário.

---

## 3. Admin (`/admin/*`)

> **Estado atual:** estrutura de páginas criada com placeholders. Abaixo está a especificação completa de cada tela.

### 3.1. Dashboard (`/admin/dashboard`) 🟡
- **Atualmente:** Placeholder `<h1>Dashboard</h1>`
- **O que deve conter:**
  - Cartões de visão geral do sistema:
    - Total de estudantes (activos/inactivos)
    - Total de professores
    - Total de turmas
    - Taxa de aprovação geral
  - Gráficos:
    - Distribuição de estudantes por curso
    - Evolução de matrículas (por ano/mês)
    - Média geral por disciplina
  - Últimos logs de actividade / auditoria
  - Calendário académico resumido

### 3.2. Professores (`/admin/professores/{curso}`) 🟡
- **Cursos:** Informática, Electrónica
- **Atualmente:** 3 cards placeholder (Total, Activos, Turmas) + "Lista de professores"
- **O que deve conter:**
  - **Gestão de professores:**
    - Tabela com: Nome, Email, Disciplinas, Turmas, Contacto, Status (Activo/Inactivo)
    - CRUD completo:
      - **Criar:** formulário com nome, email, senha, disciplinas, turmas, contacto
      - **Editar:** alterar dados do professor
      - **Desactivar/Eliminar:** com confirmação
    - Filtros: por disciplina, por turma, por status
    - Busca por nome/email
  - Atribuição de disciplinas e turmas a professores
  - Importar/exportar lista (CSV/Excel)

### 3.3. Estudantes (`/admin/estudantes/{curso}`) 🟡
- **Cursos:** Informática, Electrónica
- **Atualmente:** 3 cards placeholder (Total, Matriculados, Aprovados) + "Lista de estudantes"
- **O que deve conter:**
  - **Gestão de estudantes:**
    - Tabela com: Nome, Nº Processo, Turma, Contacto, Status (Activo/Inactivo/Transferido)
    - CRUD completo:
      - **Matricular:** formulário completo (dados pessoais, documento, encarregado, turma)
      - **Editar:** alterar dados do estudante
      - **Transferir de turma/curso**
      - **Desactivar/Anular matrícula**
    - Filtros: por turma, por ano/classe, por status
    - Busca por nome/número/processo
  - Visualização de perfil completo do estudante
  - Histórico académico do estudante
  - Importar/exportar lista (CSV/Excel)

### 3.4. Exames (`/admin/exames/{curso}`) 🟡
- **Cursos:** Informática, Electrónica
- **Atualmente:** 3 cards placeholder (Agendados, Realizados, Taxa Aprovação) + "Calendário exames"
- **O que deve conter:**
  - **Gestão de exames:**
    - Calendário global de exames por curso/trimestre
    - Tabela de exames: Disciplina, Turma, Data, Sala, Tipo (1ª/2ª Prova), Estado
    - CRUD:
      - **Agendar exame:** disciplina, turma, data, hora, sala, trimestre, tipo
      - **Editar/Remover exame**
      - **Lançar resultados** (notas por estudante)
    - Estatísticas: taxa de aprovação por disciplina/curso, média geral
    - Histórico de exames anteriores
  - Definição de épocas de exame (calendário académico)

### 3.5. Configurações — Geral (`/admin/configuracoes/geral`) 🟡
- **Atualmente:** Placeholder "Configurações gerais da plataforma"
- **O que deve conter:**
  - Informações da instituição (nome, logotipo, endereço, contactos)
  - Configuração de ano lectivo
  - Definição de trimestres/períodos
  - Configuração de cursos (Informática, Electrónica) e turmas
  - Definição de disciplinas por curso/classe
  - Parâmetros de avaliação (peso PP, PT, MT por trimestre)
  - Gestão de utilizadores (admin password, criação de outros admins)

### 3.6. Configurações — Equipa (`/admin/configuracoes/equipa`) 🟡
- **Atualmente:** Placeholder "Gestão da equipa"
- **O que deve conter:**
  - Gestão de administradores do sistema
  - Perfis de acesso (permissões por role)
  - Logs de auditoria (quem fez o quê, quando)
  - Definição de cargos/funções

---

## 4. Funcionalidades Transversais

### 4.1. Autenticação ✅
- **Implementado:** Mock com `localStorage`
  - 3 users de teste: `admin001`, `DL23001`, `PROF001` (senha: `1234`)
  - Redirecionamento por role após login
  - `RoleGuard` protege rotas por role
- **Planeado:** Migrar para NextAuth.js v5 com JWT + httpOnly cookie
- `authflow.md` contém a especificação completa do backend

### 4.2. Sidebar Responsiva ✅
- Sidebar colapsável por role (admin | aluno | professor)
- Submenus para itens com filhos (admin: cursos por departamento)
- Destaque da rota activa

### 4.3. Tema Claro/Escuro ⬜
- `next-themes` está nas dependências mas não implementado
- CSS variables preparadas para dark mode (`@custom-variant dark`)
- Falta implementar o `ThemeProvider` e o toggle

---

## 5. Resumo do Estado por Role

| Funcionalidade | Aluno | Professor | Admin |
|---|---|---|---|
| Dashboard | ✅ | 🟡 | 🟡 |
| Perfil | ✅ | ⬜ | ⬜ |
| Minha Turma (sala de aula) | 🔧 | ⬜ | — |
| Horário | ✅ | ✅ | — |
| Horário de Provas | ✅ | ✅ | — |
| Boletins / Notas | ✅ | 🟡 | — |
| Convocatórias | ✅ | — | — |
| Informações | ✅ | — | — |
| Cartão | ⬜ | — | — |
| Faltas | ⬜ | 🟡 | — |
| Gestão de Professores | — | — | 🟡 |
| Gestão de Estudantes | — | 🟡 | 🟡 |
| Gestão de Exames | — | 🟡 | 🟡 |
| Configurações | — | — | 🟡 |
| Submeter Material | 🔧 | — | — |
| Aprovar Submissões | — | ⬜ | — |

> **Legenda:** ✅ Implementado · 🟡 Placeholder · ⬜ Não implementado · 🔧 Acabado · — Não se aplica

---

## 6. Sugestões de Próximos Passos

1. **Professor — Minha Turma (Sala de Aula):** Gestão de materiais + aprovação de submissões + avisos
2. **Professor — Estudantes:** Lançamento de notas, registo de faltas, tabela de estudantes
3. **Admin — CRUD completo** de professores, estudantes e exames
4. **Migrar autenticação mock** para backend real com NextAuth.js
5. **Tema escuro** usando `next-themes`
6. **Páginas de erro:** `not-found.tsx` e `loading.tsx` em cada rota
7. **Responsividade:** testar e ajustar todos os breakpoints
