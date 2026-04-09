import { DashPage } from "@/components/dash-page";

export default function StudentDashboardPage() {
  return (
    <DashPage title="Dashboard">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 flex flex-col items-center justify-center text-sm">📅 Hoje: Matemática 08:00</div>
        <div className="aspect-video rounded-xl bg-muted/50 flex flex-col items-center justify-center text-sm">📝 Próxima prova: Física</div>
        <div className="aspect-video rounded-xl bg-muted/50 flex flex-col items-center justify-center text-sm">📊 Média: 14.5</div>
      </div>
      <div className="min-h-[60vh] flex-1 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
        Bem-vindo ao teu dashboard, João!
      </div>
    </DashPage>
  );
}