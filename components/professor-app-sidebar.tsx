"use client";
import * as React from "react";
import {
  LayoutDashboard,
  Calendar,
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
import { Users, FileText } from "lucide-react";

const data = {
  user: { name: "Prof. Maria Silva", email: "maria@prof.ao", avatar: "/avatars/prof.jpg" },
  navMain: [
    { title: "Dashboard", url: "/professor/dashboard", icon: <LayoutDashboard /> },
    { title: "Estudantes / Classes", url: "/professor/estudantes", icon: <Users /> },
    { title: "Exames", url: "/professor/exames", icon: <FileText /> },
    { title: "Schedules", url: "/professor/schedules", icon: <Calendar /> },
  ],
};

export function ProfessorAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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