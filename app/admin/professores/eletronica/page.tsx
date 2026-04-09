import { DashPage } from "@/components/dash-page"

export default function EletronicaTeacherPage() {
  return (
    <DashPage parent={{ label: "Professores", href: "#" }} title="Electrónica">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">Total de Professores</div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">Activos</div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">Turmas</div>
      </div>
      <div className="min-h-[60vh] rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
        Lista de professores de Electrónica
      </div>
    </DashPage>
  )
}