export class Timer {
  progress = $state(0);
  isFinished = $state(false);
  isRunning = $state(true);

  setProgress(value: number) {
    this.progress = value;

    if (this.progress >= 100) {
      setTimeout(() => {
        this.isFinished = true;
        this.isRunning = false;
      }, 100);
    }
  }

  reset() {
    this.progress = 0;
    this.isFinished = false;
    this.isRunning = true;
  }
}
