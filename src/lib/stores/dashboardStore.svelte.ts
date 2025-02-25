import { DASHBOARD_VIEWS } from "$lib/constants";

interface DashboardStore {
  currentView: typeof DASHBOARD_VIEWS[keyof typeof DASHBOARD_VIEWS];
  setCurrentView: (view: typeof DASHBOARD_VIEWS[keyof typeof DASHBOARD_VIEWS]) => void;
  resetViews: () => void;
  isChildView: boolean;
  goBack: () => void;
}

export const dashboardStore = $state<DashboardStore>({
  currentView: DASHBOARD_VIEWS.TRACKING,
  setCurrentView: (view: typeof DASHBOARD_VIEWS[keyof typeof DASHBOARD_VIEWS]) => {
    dashboardStore.currentView = view;
    dashboardStore.isChildView = false;
    dashboardStore.goBack = () => {};
  },
  resetViews: () => {
    dashboardStore.isChildView = false;
    dashboardStore.goBack = () => {};
  },
  isChildView: false,
  goBack: () => {},
});
