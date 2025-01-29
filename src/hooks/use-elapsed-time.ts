import { useEffect, useState } from "react";

interface UseElapsedTimeReturn {
  progress: number;
  isFinished: boolean;
}

export function useElapsedTime(duration = 1500): UseElapsedTimeReturn {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(currentProgress);

      if (elapsed >= duration) {
        clearInterval(interval);

        setTimeout(() => {
          setIsFinished(true);
        }, 150);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [duration]);

  return { progress: Math.round(progress), isFinished };
}
