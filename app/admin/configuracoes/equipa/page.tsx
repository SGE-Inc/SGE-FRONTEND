import { DashPage } from "@/components/layouts/dash-page";
import { EquipaConfig } from "@/components/admin/settings/equipa-config";

export default function TeamConfigPage() {
  return (
    <DashPage parent={{ label: "Configurações", href: "#" }} title="Equipa">
      <EquipaConfig />
    </DashPage>
  );
}
