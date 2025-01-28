export const DASHBOARD_VIEWS = {
  PROJECTS: 'projects',
  SETTINGS: 'settings',
} as const;

export type DashboardView = typeof DASHBOARD_VIEWS[keyof typeof DASHBOARD_VIEWS];
