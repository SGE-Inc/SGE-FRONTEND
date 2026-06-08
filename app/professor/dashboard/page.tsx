import { DashPage } from "@/components/layouts/dash-page";
import {
  MATERIAIS,
  PROXIMOS_EVENTOS,
  STATS,
  TURMAS_DESEMPENHO,
  WEEKLY_SCHEDULE,
} from "@/components/professor/dashboard/professor-dashboard-data";
import { DesempenhoTurmas } from "@/components/professor/dashboard/professor-desempenho-turmas";
import {
  MateriaisPartilhados,
  ProximosEventos,
} from "@/components/professor/dashboard/professor-eventos-materiais";
import { ProfessorStatCards } from "@/components/professor/dashboard/professor-stat-cards";
import { WeeklyCalendar } from "@/components/professor/dashboard/professor-weekly-calendar";

export default function ProfessorDashboardPage() {
  return (
    <DashPage title="Meu Painel">
      <ProfessorStatCards stats={STATS} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <WeeklyCalendar schedule={WEEKLY_SCHEDULE} todayDia="Seg" />
        </div>
        <div className="lg:col-span-1">
          <ProximosEventos eventos={PROXIMOS_EVENTOS} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DesempenhoTurmas turmas={TURMAS_DESEMPENHO} />
        <MateriaisPartilhados materiais={MATERIAIS} />
      </div>
    </DashPage>
  );
}
