import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import DashboardContainer from "./DashboardContainer";

export default function Projects() {
  return (
    <DashboardContainer title="Projects">
      <div className="mt-24 flex flex-1 flex-col items-center gap-4 text-center">
        <Ghost className="!h-24 !w-24" />
        <div className="space-y-2">
          <h3 className="text-2xl font-medium">There are no projects!</h3>
          <p className="text-lg text-neutral-500">Please create a new project to get started.</p>
        </div>
        <Button className="mt-2">
          <span>Create New Project</span>
        </Button>
      </div>
    </DashboardContainer>
  );
}
