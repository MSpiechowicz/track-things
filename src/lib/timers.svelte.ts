interface UseElapsedTimeProps {
  duration?: number;
}

export function useElapsedTime({ duration = 1500 }: UseElapsedTimeProps = {}) {
  let progress = $state(0);
  let isFinished = $state(false);
  let isRunning = $state(false);

  $effect(() => {
    const startTime = performance.now();

    const interval = setInterval(() => {
      isRunning = true;

      const elapsed = performance.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);

      progress = currentProgress;

      if (elapsed >= duration) {
        clearInterval(interval);

        setTimeout(() => {
          isFinished = true;
          isRunning = false;
        }, 150);
      }
    }, 60);

    return () => clearInterval(interval);
  });

  return {
    progress,
    isFinished,
    isRunning,
  };
}
