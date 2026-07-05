import { DashPage } from "@/components/layouts/dash-page";
import { InformacoesManager } from "@/components/admin/informacao/informacoes-manager";

export default function AdminInformacoesPage() {
  return (
    <DashPage title="Informações">
      <InformacoesManager />
    </DashPage>
  );
}
