'use client';

import DashboardProjects from "@/components/dashboard/DashboardProjects";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/store/dashboardStore";
import { DASHBOARD_VIEWS } from "@/utils/contants/dashboardViews";
import { FolderKanban } from "lucide-react";


export default function DashboardPage() {
  const { currentView, setCurrentView } = useDashboardStore();

  function renderView() {
    switch (currentView) {
      case DASHBOARD_VIEWS.PROJECTS:
        return <DashboardProjects />;
      default:
        return <DashboardProjects />;
    }
  }

  return (
    <div className="flex h-full w-full gap-8">
      {/* Left Section - Projects List */}
      <div className="w-[20%] min-w-[250px]">
        <Button
          variant="ghost"
          className="text-white"
          onClick={() => setCurrentView(DASHBOARD_VIEWS.PROJECTS)}
        >
          <FolderKanban className="!h-5 !w-5" />
          <span className="text-lg font-medium">Projects</span>
        </Button>
      </div>
      {renderView()}
    </div>
  );
}
