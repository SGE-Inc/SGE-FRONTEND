import { DashPage } from "@/components/dash-page"

export default function EletronicaStudentPage() {
  return (
    <DashPage parent={{ label: "Estudantes", href: "#" }} title="Electrónica">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">Total de Estudantes</div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">Matriculados</div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">Aprovados</div>
      </div>
      <div className="min-h-[60vh] rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
        Lista de estudantes de Electrónica
      </div>
    </DashPage>
  )
}