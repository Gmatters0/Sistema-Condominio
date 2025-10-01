import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Calendar,
  Wrench,
  Users,
  Archive,
  MessageCircle,
  ClipboardList,
  Mail,
  Home,
} from "lucide-react";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Agendamento de Áreas Comuns",
    url: "/",
    icon: Calendar,
  },
  {
    title: "Ordem de Serviço",
    url: "/",
    icon: Wrench,
  },
  {
    title: "Controle de Visitantes",
    url: "/",
    icon: Users,
  },
  {
    title: "Patrimônio",
    url: "/",
    icon: Archive,
  },
  {
    title: "Cadastro de Avisos",
    url: "/",
    icon: MessageCircle,
  },
  {
    title: "Quadro de Avisos",
    url: "/",
    icon: ClipboardList,
  },
  {
    title: "Disparo de E-mails",
    url: "/",
    icon: Mail,
  },
]

function SidebarComponent() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default SidebarComponent