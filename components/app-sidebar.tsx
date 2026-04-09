"use client"

import * as React from "react"
import {
  AudioLinesIcon,
  BookOpenIcon,
  BotIcon,
  GalleryVerticalEndIcon,
  Settings2Icon,
  TerminalIcon,
  TerminalSquareIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  navMain: [
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
],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}