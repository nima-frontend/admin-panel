"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSegmentView } from "@/store/segment-view"

export function NavMain({
  items,
}: {
  items: {
    title: string
    icon?: Icon
  }[]
}) {

  const setView = useSegmentView((state) => state.setView)
  const handleClick = (title: string) => {
    switch (title) {
      case "Dashboard":
        setView("dashboard")
        break
      case "Lifecycle":
        setView("lifeCycle")
        break
      case "Analytics":
        setView("analytics")
        break
      case "Projects":
        setView("projects")
        break
      case "Team":
        setView("team")
        break
      default:
        setView("dashboard")
        break
    }
  }
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
              onClick={()=>setView("notifications")}
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}  onClick={() => handleClick(item.title)}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
// function useDashboardView(arg0: (state: any) => any) {
//   throw new Error("Function not implemented.")
// }

