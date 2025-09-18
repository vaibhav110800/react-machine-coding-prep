import React, { useCallback, useState, memo } from "react";

const Display = memo(({ value }: { value: number }) => {
  console.log("Display render");
  return <div>Count: {value}</div>;
});

export default function Counter() {
  const [count, setCount] = useState(0);

  const inc = useCallback(() => setCount((c) => c + 1), []);
  const dec = useCallback(() => setCount((c) => c - 1), []);
  const reset = useCallback(() => setCount(0), []);

  return (
    <div style={{ padding: 16 }}>
      <h3>Counter</h3>
      <Display value={count} />
      <button onClick={inc} aria-label="increment">
        +
      </button>
      <button onClick={dec} aria-label="decrement">
        -
      </button>
      <button onClick={reset} aria-label="reset">
        reset
      </button>
    </div>
  );
}
