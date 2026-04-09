import { DashPage } from "@/components/dash-page"

export default function TeamConfigPage() {
  return (
    <DashPage parent={{ label: "Configurações", href: "#" }} title="Equipa">
      <div className="min-h-[60vh] rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
        Gestão da equipa
      </div>
    </DashPage>
  )
}