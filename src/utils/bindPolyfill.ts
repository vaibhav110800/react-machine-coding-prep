// src/utils/bindPolyfill.ts
export function bindPolyfill(fn: Function, thisArg: any, ...boundArgs: any[]) {
  return function (this: any, ...args: any[]) {
    const isNew = this instanceof (fn as any);
    const context = isNew ? this : thisArg;
    return fn.apply(context, [...boundArgs, ...args]);
  };
}
