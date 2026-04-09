import { ProfessorAppSidebar } from "@/components/professor-app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function ProfessorLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ProfessorAppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}