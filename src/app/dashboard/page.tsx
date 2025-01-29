'use client';

import DashboardProjects from "@/components/dashboard/DashboardProjects";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDashboardStore } from "@/store/dashboardStore";
import { useUserStore } from "@/store/userStore";
import { DASHBOARD_VIEWS } from "@/utils/contants/dashboardViews";
import { FolderKanban } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { currentView, setCurrentView } = useDashboardStore();
  const { isUserLoggedIn } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const checkAuthAndSetLoading = async () => {
      if (!isUserLoggedIn()) {
        router.push('/signin');
      }

      // Ensure minimum 1.5s loading time
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(1500 - elapsedTime, 0);

      await new Promise(resolve => setTimeout(resolve, remainingTime));
      setIsLoading(false);
    };

    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + 2, 100);
      });
    }, 20);

    void checkAuthAndSetLoading();

    return () => clearInterval(interval);
  }, [isUserLoggedIn, router]);

  function renderView() {
    switch (currentView) {
      case DASHBOARD_VIEWS.PROJECTS:
        return <DashboardProjects />;
      default:
        return <DashboardProjects />;
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-[60%] max-w-md">
          <Progress
            value={progress}
            className="bg-white"
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-gray-400">Loading...</p>
            <p className="text-sm text-gray-400">{progress}%</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isUserLoggedIn()) {
    return null;
  }

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
