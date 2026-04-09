import { DashPage } from "@/components/dash-page"

export default function GeneralConfigPage() {
  return (
    <DashPage parent={{ label: "Configurações", href: "#" }} title="Geral">
      <div className="min-h-[60vh] rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
        Configurações gerais da plataforma
      </div>
    </DashPage>
  )
}