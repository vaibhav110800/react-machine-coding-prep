// src/utils/flatten.ts
export function flatten(arr: any[]): any[] {
  const res: any[] = [];
  const stack = [...arr];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      for (let i = next.length - 1; i >= 0; i--) stack.push(next[i]);
    } else {
      res.push(next);
    }
  }
  return res.reverse();
}
