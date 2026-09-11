import { effect, signal, Signal } from "@angular/core";

export function throttleSignal<T>(
  source: Signal<T>,
  duration: number,
): Signal<T> {
  const throttledSignal = signal<T>(source());
  let settimeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExecuted = 0;
  effect((onCleanup) => {
    const value = source();
    const now = Date.now();
    const remainingTime = duration - (now - lastExecuted);

    if (remainingTime <= 0) {
      throttledSignal.set(value);
      lastExecuted = now;
    } else {
      if (settimeoutId !== null) {
        clearTimeout(settimeoutId);
      }
      settimeoutId = setTimeout(() => {
        throttledSignal.set(value);
        lastExecuted = Date.now();
        settimeoutId = null;
      }, remainingTime);
    }
    /* if (settimeoutId == null) {
      settimeoutId = setTimeout(() => {
        throttledSignal.set(value);
        settimeoutId = null;
        lastExecuted = Date.now()
      }, duratiion);
    } */

    onCleanup(() => {
      if (settimeoutId != null) clearTimeout(settimeoutId);
      settimeoutId = null;
    });
  });
  return throttledSignal;
}
