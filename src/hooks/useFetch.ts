// src/hooks/useFetch.ts
import { useEffect, useState, useRef } from "react";

export default function useFetch<T = any>(url?: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!url) return;
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError(null);
    fetch(url, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Network error");
        return r.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
