class Timer {
	private startTime = $state<number | null>(null);
	private duration = $state(1500);
	private elapsed = $state(0);
	private intervalId: number | null = null;

  constructor(duration?: number) {
    if (duration) {
      this.duration = duration;
    }
  }

	start() {
		this.startTime = Date.now();
		this.elapsed = 0;

		this.intervalId = window.setInterval(() => {
			if (this.startTime === null) {
				return;
			}

			this.elapsed = Date.now() - this.startTime;

			if (this.elapsed >= this.duration) {
				this.stop();
			}
		}, 10); // Update every 10ms for smooth animation
	}

	stop() {
		if (this.intervalId) {
			window.clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	reset() {
		this.stop();
		this.startTime = null;
		this.elapsed = 0;
	}

	get progress() {
		return Math.min(this.elapsed / this.duration, 1);
	}

	get isFinished() {
		return this.elapsed >= this.duration;
	}

	get isRunning() {
		return !this.isFinished;
	}
}

export const timer = new Timer(1000);
