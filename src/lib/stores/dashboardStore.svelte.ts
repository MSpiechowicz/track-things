import { DASHBOARD_VIEWS } from "$lib/constants";

interface DashboardStore {
  currentView: typeof DASHBOARD_VIEWS[keyof typeof DASHBOARD_VIEWS];
  isChildView: boolean;
  goBack: () => void;
}

export const dashboardStore = $state<DashboardStore>({
  currentView: DASHBOARD_VIEWS.PROJECTS,
  isChildView: false,
  goBack: () => {},
});
