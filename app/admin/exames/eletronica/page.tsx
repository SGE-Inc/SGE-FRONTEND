import { DashPage } from "@/components/layouts/dash-page";
import { ExamesManager } from "@/components/admin/exam/exames-manager";

export default function EletronicaExamsPage() {
  return (
    <DashPage parent={{ label: "Exames", href: "#" }} title="Electrónica">
      <ExamesManager curso="Electrónica" />
    </DashPage>
  );
}
