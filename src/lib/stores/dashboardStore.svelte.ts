import { DASHBOARD_VIEWS } from "$lib/constants";

export const dashboardStore = $state({
  currentView: DASHBOARD_VIEWS.PROJECTS,
});
