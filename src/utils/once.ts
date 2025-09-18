// src/utils/once.ts
export function once<T extends (...args: any[]) => any>(fn: T) {
  let called = false;
  let result: ReturnType<T>;
  return (...args: Parameters<T>): ReturnType<T> => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result!;
  };
}
