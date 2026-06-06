"use client";

import { useAuth } from "@/hooks/use-auth";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  LayoutDashboard,
  Calendar,
  CalendarClock,
  IdCard,
  AlertTriangle,
  Bell,
  Info,
  Users,
  FileText,
} from "lucide-react";

const adminNav = [
  { title: "Dashboard", url: "/admin/dashboard", icon: <TerminalSquareIcon /> },
  {
    title: "Professores",
    url: "#",
    icon: <BotIcon />,
    items: [
      { title: "Informática", url: "/admin/professores/informatica" },
      { title: "Electrónica", url: "/admin/professores/eletronica" },
    ],
  },
  {
    title: "Estudantes",
    url: "#",
    icon: <BookOpenIcon />,
    items: [
      { title: "Informática", url: "/admin/estudantes/informatica" },
      { title: "Electrónica", url: "/admin/estudantes/eletronica" },
    ],
  },
  {
    title: "Exames",
    url: "#",
    icon: <GalleryVerticalEndIcon />,
    items: [
      { title: "Informática", url: "/admin/exames/informatica" },
      { title: "Electrónica", url: "/admin/exames/eletronica" },
    ],
  },
  {
    title: "Configurações",
    url: "#",
    icon: <Settings2Icon />,
    items: [
      { title: "Geral", url: "/admin/configuracoes/geral" },
      { title: "Equipa", url: "/admin/configuracoes/equipa" },
    ],
  },
];

const alunoNav = [
  { title: "Dashboard", url: "/aluno/dashboard", icon: <LayoutDashboard /> },
  { title: "Horário", url: "/aluno/horario", icon: <Calendar /> },
  {
    title: "Horário de Provas",
    url: "/aluno/horario-de-provas",
    icon: <CalendarClock />,
  },
  { title: "Boletins", url: "/aluno/boletins", icon: <BookOpenIcon /> },
  { title: "Cartão", url: "/aluno/cartao", icon: <IdCard /> },
  { title: "Faltas", url: "/aluno/faltas", icon: <AlertTriangle /> },
  { title: "Convocatórias", url: "/aluno/convocatorias", icon: <Bell /> },
  { title: "Informações", url: "/aluno/informacoes", icon: <Info /> },
];

const professorNav = [
  {
    title: "Dashboard",
    url: "/professor/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Estudantes / Classes",
    url: "/professor/estudantes",
    icon: <Users />,
  },
  { title: "Exames", url: "/professor/exames", icon: <FileText /> },
  { title: "Schedules", url: "/professor/schedules", icon: <Calendar /> },
];

const navByRole = {
  admin: adminNav,
  aluno: alunoNav,
  professor: professorNav,
} as const;

export function AppSidebar(props: React.ComponentProps<typeof SidebarRoot>) {
  const { user, loading } = useAuth();

  const navItems = user ? navByRole[user.role] : [];

  return (
    <SidebarRoot collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEndIcon className="size-4" />
          </div>
          <span className="text-sm font-medium">SGE</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <NavMain items={navItems} />
        )}
      </SidebarContent>
      <SidebarRail />
    </SidebarRoot>
  );
}
