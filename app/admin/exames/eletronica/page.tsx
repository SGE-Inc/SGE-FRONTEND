import { DashPage } from "@/components/dash-page"

export default function EletronicaExamsPage() {
  return (
    <DashPage parent={{ label: "Exames", href: "#" }} title="Electrónica">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">Exames Agendados</div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">Realizados</div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">Taxa de Aprovação</div>
      </div>
      <div className="min-h-[60vh] rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
        Calendário de exames de Electrónica
      </div>
    </DashPage>
  )
}