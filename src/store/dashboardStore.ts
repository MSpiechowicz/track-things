import { DASHBOARD_VIEWS, type DashboardView } from "@/utils/contants/dashboardViews";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DashboardState {
  currentView: DashboardView;
  currentProjectId: string | null;
  setCurrentView: (view: DashboardView) => void;
  setCurrentProjectId: (projectId: string | null) => void;
  resetDashboard: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      currentView: DASHBOARD_VIEWS.PROJECTS,
      currentProjectId: null,
      setCurrentView: (view) => set({ currentView: view }),
      setCurrentProjectId: (projectId) => set({ currentProjectId: projectId }),
      resetDashboard: () => set({ currentView: DASHBOARD_VIEWS.PROJECTS, currentProjectId: null }),
    }),
    {
      name: "dashboard-storage",
    }
  )
);
