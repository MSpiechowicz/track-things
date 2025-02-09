class Timer {
  progress = $state(0);
  isFinished = $state(false);
  isNotFinished = $state(true);

  setProgress(value: number) {
    this.progress += Math.min(Math.max(value, 0), 100);

    if (this.progress >= 100) {
      this.isFinished = true;
      this.isNotFinished = false;
    }
  }

  reset() {
    this.progress = 0;
    this.isFinished = false;
    this.isNotFinished = true;
  }
}

export const timer = new Timer();
