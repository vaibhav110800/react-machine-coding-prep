import React, { useState } from "react";
import useDebouncedValue from "../../hooks/useDebouncedValue";

export default function DebounceDemo() {
  const [q, setQ] = useState("");
  const deb = useDebouncedValue(q, 500);
  return (
    <div style={{ padding: 16 }}>
      <h3>Debounce Demo</h3>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Type..."
      />
      <div>Debounced: {deb}</div>
    </div>
  );
}
