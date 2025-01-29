"use client";

import DashboardProjects from "@/components/dashboard/DashboardProjects";
import ProgressProvider from "@/components/providers/ProgressProvider";
import { Button } from "@/components/ui/button";
import { useElapsedTime } from "@/hooks/use-elapsed-time";
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
  const { progress, isFinished } = useElapsedTime();

  useEffect(() => {
    if (!isUserLoggedIn()) {
      router.push("/signin");
    }
  }, []);

  function renderView() {
    switch (currentView) {
      case DASHBOARD_VIEWS.PROJECTS:
        return <DashboardProjects />;
      default:
        return <DashboardProjects />;
    }
  }

  if (!isFinished && isUserLoggedIn()) {
    return <ProgressProvider progress={progress} />;
  }

  if (isFinished && isUserLoggedIn()) {
    return (
      <div className="flex h-full w-full gap-8">
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

  return null;
}
