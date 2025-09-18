// src/utils/throttle.ts
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  limit = 300
) {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - last >= limit) {
      last = now;
      fn(...args);
    } else {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        last = Date.now();
        fn(...args);
      }, limit - (now - last));
    }
  };
}
