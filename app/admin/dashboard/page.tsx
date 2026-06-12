import { DashPage } from "@/components/layouts/dash-page";
import { AdminStatCards } from "@/components/admin/admin-stat-cards";
import { DistribuicaoCursosChart, EvolucaoMatriculasChart } from "@/components/admin/admin-charts-recharts";
import { MediaDisciplinasChart } from "@/components/admin/admin-media-disciplinas";
import { AuditLogCard, CalendarioAcademicoCard } from "@/components/admin/admin-audit-calendario";
import {
  ADMIN_STATS,
  DISTRIBUICAO_CURSOS,
  EVOLUCAO_MATRICULAS,
  MEDIA_DISCIPLINAS,
  AUDIT_LOGS,
  CALENDARIO_ACADEMICO,
} from "@/components/admin/admin-dashboard-data";

export default function DashboardPage() {
  return (
    <DashPage title="Dashboard">
      {/* ── Row 1: 4 stat cards ── */}
      <AdminStatCards stats={ADMIN_STATS} />

      {/* ── Row 2: Distribuição por curso + Evolução de matrículas ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DistribuicaoCursosChart data={DISTRIBUICAO_CURSOS} />
        <EvolucaoMatriculasChart data={EVOLUCAO_MATRICULAS} />
      </div>

      {/* ── Row 3: Média por disciplina (2/3) + Calendário académico (1/3) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <MediaDisciplinasChart data={MEDIA_DISCIPLINAS} />
        </div>
        <div className="lg:col-span-1">
          <CalendarioAcademicoCard eventos={CALENDARIO_ACADEMICO} />
        </div>
      </div>

      {/* ── Row 4: Audit log full width ── */}
      <AuditLogCard logs={AUDIT_LOGS} />
    </DashPage>
  );
}