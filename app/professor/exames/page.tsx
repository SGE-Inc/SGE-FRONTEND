import { DashPage } from "@/components/layouts/dash-page";
import { ProfessorExames } from "@/components/professor/exames-list";

export default function ExamesPage() {
  return (
    <DashPage title="Exames">
      <ProfessorExames />
    </DashPage>
  );
}
