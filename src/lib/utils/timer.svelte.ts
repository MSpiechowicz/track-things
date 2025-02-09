class Timer {
  progress = $state(0);
  isFinished = $state(false);
  isNotFinished = $state(true);

  setProgress(value: number) {
    this.progress = value;

    if (this.progress >= 100) {
      setTimeout(() => {
        this.isFinished = true;
        this.isNotFinished = false;
      }, 100);
    }
  }

  reset() {
    this.progress = 0;
    this.isFinished = false;
    this.isNotFinished = true;
  }
}

export const timer = new Timer();
