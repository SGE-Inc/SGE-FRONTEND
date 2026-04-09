import { DashPage } from "@/components/dash-page";

export default function HorarioPage() {
    return (
        <DashPage title="Horário">
            <div className="rounded-xl bg-muted/50 p-6">
                <h1 className="text-2xl font-bold mb-4">Horário</h1>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Dia</th>
                            <th>Hora</th>
                            <th>Disciplina</th>
                            <th>Sala</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Segunda-feira</td>
                            <td>09:00 - 10:30</td>
                            <td>Informática</td>
                            <td>A101</td>
                        </tr>
                        <tr>
                            <td>Terça-feira</td>
                            <td>11:00 - 12:30</td>
                            <td>Electrónica</td>
                            <td>B202</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </DashPage>
    );
}