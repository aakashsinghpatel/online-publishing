import { effect, signal, Signal } from "@angular/core";

export function debounceSignal<T>(
  source: Signal<T>,
  duration: number,
): Signal<T> {
  let debounce = signal<T>(source());
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  effect((onCleanup) => {
    const value = source();
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
      timeoutId = setTimeout(() => {
        debounce.set(value);
        if (timeoutId != null) clearTimeout(timeoutId);
      }, duration);

    onCleanup(() => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    });
  });
  return debounce;
}
