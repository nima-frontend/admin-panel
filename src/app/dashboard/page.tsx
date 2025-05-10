'use client'
import { AppSidebar } from "@/components/app-sidebar"
import MainSegment from "@/components/layout/main-segment"
import { SiteHeader } from "@/components/site-header"
import { BillingSegment } from "@/components/layout/billing-segment"
import NotificationSegment from "@/components/layout/notification-segment"
import { useSegmentView } from "@/store/segment-view"
import AccountSegment from "@/components/layout/account-segment"
import LifeCycleSegment from "@/components/layout/lifeCycle-segment"
import AnalyticsSegment from "@/components/layout/analytics-segment"
import ProjectsSegment from "@/components/layout/projects-segment"
import TeamSegment from "@/components/layout/team-segment"
import DataLibrarySegment from "@/components/layout/dataLibrary-segment"
import ReportsSegment from "@/components/layout/reports-segment"
import WordAssistant from "@/components/layout/wordAssistant"
import SettingSegment from "@/components/layout/setting-segment"
import GetHelpSegment from "@/components/layout/getHelp-segment"
import SearchSegment from "@/components/layout/search-segment"


import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"


export default function Page() {
  const view = useSegmentView((state) => state.view)
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {view === 'dashboard' && <MainSegment />}
        {view === 'account' && <AccountSegment />}
        {view === 'billing' && <BillingSegment />}
        {view === 'notifications' && <NotificationSegment />}
        {view === 'lifeCycle' && <LifeCycleSegment />}
        {view === 'analytics' && <AnalyticsSegment />}
        {view === 'projects' && <ProjectsSegment />}
        {view === 'team' && <TeamSegment />}
        {view === 'dataLibrary' && <DataLibrarySegment />}
        {view === 'reports' && <ReportsSegment />}
        {view === 'wordAssistant' && <WordAssistant />}
        {view === 'settings' && <SettingSegment />}
        {view === 'getHelp' && <GetHelpSegment />}
        {view === 'search' && <SearchSegment />}
      </SidebarInset>
    </SidebarProvider>
  )
}
