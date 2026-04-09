import { DashPage } from "@/components/dash-page";

export default function FaltasPage() {
    return (
        <DashPage title="Faltas">
            <div className="rounded-xl bg-muted/50 p-6">
                <h1 className="text-2xl font-bold mb-4">Faltas</h1>
                <p>Não existem faltas registadas no momento.</p>
            </div>
        </DashPage>
    );
}