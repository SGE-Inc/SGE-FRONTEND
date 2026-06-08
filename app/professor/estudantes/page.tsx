import { DashPage } from "@/components/layouts/dash-page";
import { ProfessorEstudantesTable } from "@/components/professor/estudantes-table";

export default function ProfessorEstudantesPage() {
  return (
    <DashPage title="Estudantes">
      <ProfessorEstudantesTable />
    </DashPage>
  );
}
