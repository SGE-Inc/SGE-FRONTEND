import { DashPage } from "@/components/layouts/dash-page";
import { EstudantesManager } from "@/components/admin/student/estudantes-manager";

export default function EletronicaStudentPage() {
  return (
    <DashPage parent={{ label: "Estudantes", href: "#" }} title="Electrónica">
      <EstudantesManager curso="Electrónica" />
    </DashPage>
  );
}
