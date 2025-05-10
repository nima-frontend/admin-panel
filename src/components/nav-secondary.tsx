"use client"

import * as React from "react"
import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSegmentView } from "@/store/segment-view"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    icon: Icon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>)
 {
   const setView = useSegmentView((state) => state.setView)
    const handleClick = (title: string) => {
      switch (title) {
        case "Settings":
          setView("settings")
          break
        case "Get Help":
          setView("getHelp")
          break
        case "Search":
          setView("search")
          break
        default:
          setView("dashboard")
          break
      }
    }
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton onClick={()=>handleClick(item.title)} >
                  <item.icon />
                  <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
