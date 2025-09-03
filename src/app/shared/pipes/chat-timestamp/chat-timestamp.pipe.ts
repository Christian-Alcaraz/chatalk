import { ChangeDetectorRef, NgZone, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatTimestamp',
  pure: false,
})
export class ChatTimestampPipe implements PipeTransform {
  private value!: Date;
  private latestText!: string;
  private timer: any;

  constructor(
    private ref: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {}

  transform(value: Date | string | number): string {
    if (!value) return '';

    this.value = new Date(value);
    this.clearTimer();
    this.latestText = this.formatTime(this.value);

    this.ngZone.runOutsideAngular(() => {
      const timeToNextUpdate = this.getSecondsUntilNextMinute() * 1000;
      this.timer = setTimeout(() => {
        this.ngZone.run(() => this.ref.markForCheck());
      }, timeToNextUpdate);
    });

    return this.latestText;
  }

  private formatTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return 'just now';
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return 'yesterday';
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  }

  private getSecondsUntilNextMinute(): number {
    const now = new Date();
    return 60 - now.getSeconds();
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }
}
