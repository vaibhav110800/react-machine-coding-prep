import React, { useEffect, useState } from "react";
import useDebouncedValue from "../../hooks/useDebouncedValue";

export default function SearchDebounce() {
  const [q, setQ] = useState("");
  const debounced = useDebouncedValue(q, 400);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debounced) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    // Example using a fake API (you can swap)
    fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        debounced
      )}&per_page=5`,
      {
        signal: controller.signal,
      }
    )
      .then((r) => r.json())
      .then((json) =>
        setResults((json.items || []).map((i: any) => i.full_name))
      )
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error(err);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [debounced]);

  return (
    <div style={{ padding: 16 }}>
      <h3>Search (debounced)</h3>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search repos (github)"
      />
      {loading && <div>Loading...</div>}
      <ul>
        {results.map((r, idx) => (
          <li key={idx}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
