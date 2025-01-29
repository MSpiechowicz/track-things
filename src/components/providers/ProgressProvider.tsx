"use client";

import { ClientOnly } from "../ClientOnly";
import { Progress } from "../ui/progress";

export default function ProgressProvider({ progress }: { progress?: number }) {
  return (
    <ClientOnly>
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-[60%] max-w-md">
          <Progress value={progress} />
          <div className="mt-1 flex items-center justify-between">
            <p className="text-sm text-gray-400">Loading...</p>
            <p className="text-sm text-gray-400">{progress}%</p>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
