import { DashPage } from "@/components/layouts/dash-page";
import { GeralConfig } from "@/components/admin/settings/geral-config";

export default function GeneralConfigPage() {
  return (
    <DashPage parent={{ label: "Configurações", href: "#" }} title="Geral">
      <GeralConfig />
    </DashPage>
  );
}
