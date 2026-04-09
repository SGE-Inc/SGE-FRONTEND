import { DashPage } from "@/components/dash-page";

export default function CartaoPage() {
    return (
        <DashPage title="Cartão de Estudante">
            <div className="rounded-xl bg-muted/50 p-6">
                <h1 className="text-2xl font-bold mb-4">Cartão de Estudante</h1>
                <p>Nome: João Silva</p>
                <p>Número de Estudante: 12345678</p>
                <p>Curso: Engenharia Informática</p>
                <p>Validade: 01/01/2024 - 31/12/2024</p>
            </div>
        </DashPage>
    );
}