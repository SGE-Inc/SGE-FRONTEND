import { StudentAppSidebar } from "@/components/student-app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AlunoLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <StudentAppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}