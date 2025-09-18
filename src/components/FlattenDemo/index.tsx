import React, { useMemo } from "react";
import { flatten } from "../../utils/flatten";

export default function FlattenDemo() {
  const nested = useMemo(() => [1, [2, [3, [4]], 5], [6]], []);
  const flat = flatten(nested);
  return (
    <div style={{ padding: 16 }}>
      <h3>Flatten Demo</h3>
      <div>Nested: {JSON.stringify(nested)}</div>
      <div>Flat: {JSON.stringify(flat)}</div>
    </div>
  );
}
