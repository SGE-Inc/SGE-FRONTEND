import { DashPage } from "@/components/layouts/dash-page";
import { StudentProfileCard } from "@/components/student/student-profile-card";
import { ClassRankingCard } from "@/components/student/class-ranking-card";
import { TotalNotasCard } from "@/components/student/total-point-card";
import { MelhoresDisciplinasCard } from "@/components/student/best-sumary-card";

export default function StudentDashboardPage() {
  return (
    <DashPage title="Dashboard">
      {/* Linha 1: Perfil + Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StudentProfileCard />
        <ClassRankingCard />
      </div>

      {/* Linha 2: Total de Notas + Três Melhores Disciplinas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TotalNotasCard />
        <MelhoresDisciplinasCard />
      </div>
    </DashPage>
  );
}
