import { DashPage } from "@/components/dash-page";

export default function ConvocatoriasPage() {
    return (
        <DashPage title="Convocatórias">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Convocatórias</h1>
                <p>Não existem convocatórias disponíveis no momento.</p>
            </div>
        </DashPage>
    );
}