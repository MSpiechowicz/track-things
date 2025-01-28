'use client';

import DashboardProjects from "@/components/dashboard/DashboardProjects";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/store/dashboardStore";
import { useUserStore } from "@/store/userStore";
import { DASHBOARD_VIEWS } from "@/utils/contants/dashboardViews";
import { FolderKanban } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { currentView, setCurrentView } = useDashboardStore();
  const { isUserLoggedIn } = useUserStore();

  useEffect(() => {
    if (!isUserLoggedIn()) {
      router.push('/signin');
    }
  }, [isUserLoggedIn, router]);

  function renderView() {
    switch (currentView) {
      case DASHBOARD_VIEWS.PROJECTS:
        return <DashboardProjects />;
      default:
        return <DashboardProjects />;
    }
  }

  if (!isUserLoggedIn()) {
    return null;
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
