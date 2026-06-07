import { DashPage } from "@/components/layouts/dash-page";
import { InfoRow, SectionCard } from "@/components/student/perfil-components";
import { PERFIL_MOCK } from "@/components/student/perfil-data";
import { PerfilHeader } from "@/components/student/perfil-header";

export default function MeuPerfilPage() {
  const p = PERFIL_MOCK;

  return (
    <DashPage title="Meu Perfil">
      <PerfilHeader perfil={p} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dados Pessoais */}
        <SectionCard title="Dados Pessoais">
          <InfoRow label="Género:" value={p.genero} />
          <InfoRow label="Altura:" value={p.altura} />
          <InfoRow label="Estado Civil:" value={p.estadoCivil} />
        </SectionCard>

        {/* Dados Complementares */}
        <SectionCard title="Dados Complementares">
          <InfoRow
            label="Nome do Pai:"
            value={p.nomePai}
            valueClassName="uppercase font-medium"
          />
          <InfoRow
            label="Nome da Mãe:"
            value={p.nomeMae}
            valueClassName="uppercase font-medium"
          />
          <InfoRow
            label="Naturalidade:"
            value={p.naturalidade}
            valueClassName="uppercase font-medium"
          />
        </SectionCard>

        {/* Documentação */}
        <SectionCard title="Documentação">
          <InfoRow label="Tipo do Documento:" value={p.tipoDocumento} />
          <InfoRow label="Nº de Identificação:" value={p.numeroIdentificacao} />
          <InfoRow label="Data de Emissão:" value={p.dataEmissao} />
          <InfoRow label="Validade do Documento:" value={p.validadeDocumento} />
        </SectionCard>
      </div>

      {/* ── Row 2: 3 cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dados de Localização */}
        <SectionCard title="Dados de Localização">
          <InfoRow
            label="Provincia:"
            value={p.provincia}
            valueClassName="uppercase font-medium"
          />
          <InfoRow
            label="Município:"
            value={p.municipio}
            valueClassName="uppercase font-medium"
          />
          <InfoRow
            label="Comuna:"
            value={p.comuna}
            valueClassName="uppercase font-medium"
          />
        </SectionCard>

        {/* Dados Académicas */}
        <SectionCard title="Dados Acadêmicas">
          <InfoRow label="Área de Formação:" value={p.areaFormacao} />
          <InfoRow label="Curso:" value={p.curso} />
          <InfoRow label="Classe:" value={p.classe} />
          <InfoRow label="Turno:" value={p.turno} />
          <InfoRow label="Turma:" value={p.turmaAcad} />
          <InfoRow label="Número:" value={p.numeroAcad} />
        </SectionCard>

        {/* Dados do Encarregado */}
        <SectionCard title="Dados do Encarregado">
          <InfoRow label="Nome:" value={p.encarregadoNome} />
          <InfoRow
            label="Grau Parentesco:"
            value={p.encarregadoGrauParentesco}
          />
          <InfoRow label="Gênero:" value={p.encarregadoGenero} />
          <InfoRow
            label="Data de Nascimento:"
            value={p.encarregadoDataNascimento}
          />
          <InfoRow label="Telefone:" value={p.encarregadoTelefone} />
          <InfoRow label="Email:" value={p.encarregadoEmail} />
        </SectionCard>
      </div>
    </DashPage>
  );
}
