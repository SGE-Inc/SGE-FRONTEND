import { DashPage } from "@/components/layouts/dash-page";
import { ConvocatoriasManager } from "@/components/admin/convocatoria/convocatorias-manager";

export default function AdminConvocatoriasPage() {
  return (
    <DashPage title="Convocatórias">
      <ConvocatoriasManager />
    </DashPage>
  );
}
