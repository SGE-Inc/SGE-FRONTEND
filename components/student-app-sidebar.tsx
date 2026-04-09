"use client";
import * as React from "react";
import {
  LayoutDashboard,
  Calendar,
  CalendarClock,
  BookOpen,
  IdCard,
  AlertTriangle,
  Bell,
  Info,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: { name: "João Estudante", email: "joao@student.ao", avatar: "/avatars/student.jpg" },
  navMain: [
    { title: "Dashboard", url: "/aluno/dashboard", icon: <LayoutDashboard /> },
    { title: "Horário", url: "/aluno/horario", icon: <Calendar /> },
    { title: "Horário de Provas", url: "/aluno/horario-de-provas", icon: <CalendarClock /> },
    { title: "Boletins", url: "/aluno/boletins", icon: <BookOpen /> },
    { title: "Cartão", url: "/aluno/cartao", icon: <IdCard /> },
    { title: "Faltas", url: "/aluno/faltas", icon: <AlertTriangle /> },
    { title: "Convocatórias", url: "/aluno/convocatorias", icon: <Bell /> },
    { title: "Informações", url: "/aluno/informacoes", icon: <Info /> },
  ],
};

export function StudentAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* TeamSwitcher se quiseres */}</SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}