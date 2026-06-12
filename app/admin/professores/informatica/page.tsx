import { DashPage } from "@/components/layouts/dash-page";
import { ProfessoresManager } from "@/components/admin/teacher/professores-manager";

export default function InformaticTeacherPage() {
  return (
    <DashPage parent={{ label: "Professores", href: "#" }} title="Informática">
      <ProfessoresManager curso="Informática" />
    </DashPage>
  );
}