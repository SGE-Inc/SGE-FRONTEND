import { DashPage } from "@/components/dash-page";

export default function InformacoesPage() {
    return (
        <DashPage title="Informações">
            <div className="rounded-xl bg-muted/50 p-6">
                <h1 className="text-2xl font-bold mb-4">Informações do Aluno</h1>
                <p><strong>Nome:</strong> João Silva</p>
                <p><strong>Matrícula:</strong> 20240001</p>
                <p><strong>Curso:</strong> Engenharia Informática</p>
                <p><strong>Ano de Ingresso:</strong> 2024</p>
            </div>
        </DashPage>
    );
}