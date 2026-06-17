import { DashPage } from "@/components/layouts/dash-page";
import { EstudantesManager } from "@/components/admin/student/estudantes-manager";

export default function InformaticStudentPage() {
  return (
    <DashPage parent={{ label: "Estudantes", href: "#" }} title="Informática">
      <EstudantesManager curso="Informática" />
    </DashPage>
  );
}
