import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function UseFetchDemo() {
  const [query, setQuery] = useState("react");
  const { data, loading, error } = useFetch<any>(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(
      query
    )}&per_page=5`
  );
  return (
    <div style={{ padding: 16 }}>
      <h3>useFetch</h3>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{String(error)}</div>}
      <ul>
        {data?.items?.map((it: any) => (
          <li key={it.id}>{it.full_name}</li>
        ))}
      </ul>
    </div>
  );
}
