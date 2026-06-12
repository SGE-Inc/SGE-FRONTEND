import { DashPage } from "@/components/layouts/dash-page";
import { ProfessoresManager } from "@/components/admin/teacher/professores-manager";

export default function EletronicaTeacherPage() {
  return (
    <DashPage parent={{ label: "Professores", href: "#" }} title="Electrónica">
      <ProfessoresManager curso="Electrónica" />
    </DashPage>
  );
}