import { create } from "zustand"

type View = "dashboard" | "billing" | "notifications" | "account" | "lifeCycle" | "analytics" | "projects" | "team" | "dataLibrary" | "reports" | "wordAssistant" | "settings" | "getHelp" | "search"

interface DashboardViewState {
  view: View
  setView: (view: View) => void
}

export const useSegmentView = create<DashboardViewState>((set) => ({
  view: "dashboard",
  setView: (view) => set({ view }),
}))
