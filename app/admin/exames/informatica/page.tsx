import { DashPage } from "@/components/layouts/dash-page";
import { ExamesManager } from "@/components/admin/exam/exames-manager";

export default function InformaticExamsPage() {
  return (
    <DashPage parent={{ label: "Exames", href: "#" }} title="Informática">
      <ExamesManager curso="Informática" />
    </DashPage>
  );
}
