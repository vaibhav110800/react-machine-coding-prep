export function asyncRunner<T = any>(
  genFn: () => Generator<any, T, any>
): Promise<T> {
  const it = genFn();

  function step(
    nextF: (arg?: any) => IteratorResult<any, T>,
    arg?: any
  ): Promise<T> {
    let result: IteratorResult<any, T>;
    try {
      result = nextF(arg);
    } catch (err) {
      return Promise.reject(err);
    }

    if (result.done) {
      return Promise.resolve(result.value);
    }

    return Promise.resolve(result.value).then(
      (val) => step((arg) => it.next(arg), val),
      (err) => step((arg) => it.throw?.(arg)!, err)
    );
  }

  return step((arg) => it.next(arg));
}
