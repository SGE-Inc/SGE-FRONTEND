import { DashPage } from "@/components/layouts/dash-page";
import { ProfessorDashboard } from "@/components/professor/professor-dashboard";

export default function ProfessorDashboardPage() {
  return (
    <DashPage title="Meu Painel">
      <ProfessorDashboard />
    </DashPage>
  );
}
