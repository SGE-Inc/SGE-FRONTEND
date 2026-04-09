import { DashPage } from "@/components/dash-page";

export default function BoletinsPage() {
  return (
    <DashPage title="Boletins">
      <div className="rounded-xl bg-muted/50 p-6">
        <table className="w-full">
          <thead><tr><th>Disciplina</th><th>Nota</th></tr></thead>
          <tbody>
            <tr><td>Informática</td><td>16</td></tr>
            <tr><td>Electrónica</td><td>13</td></tr>
          </tbody>
        </table>
      </div>
    </DashPage>
  );
}