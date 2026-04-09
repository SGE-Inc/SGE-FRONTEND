import { DashPage } from "@/components/dash-page";

export default function HorarioDeProvasPage() {
    return (
        <DashPage title="Horário de Provas">
            <div className="rounded-xl bg-muted/50 p-6">
                <h1 className="text-2xl font-bold mb-4">Horário de Provas</h1>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Disciplina</th>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Sala</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Informática</td>
                            <td>20/06/2024</td>
                            <td>09:00 - 11:00</td>
                            <td>A101</td>
                        </tr>
                        <tr>
                            <td>Electrónica</td>
                            <td>22/06/2024</td>
                            <td>14:00 - 16:00</td>
                            <td>B202</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </DashPage>
    );
}