import React, { useEffect, useRef, useState } from "react";

export default function InfiniteScroll() {
  const [items, setItems] = useState<number[]>(() =>
    Array.from({ length: 20 }, (_, i) => i + 1)
  );
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            setItems((prev) => [
              ...prev,
              ...Array.from({ length: 20 }, (_, i) => prev.length + i + 1),
            ]);
            setLoading(false);
          }, 800);
        }
      },
      { root: null, rootMargin: "200px" }
    );
    if (loader.current) obs.observe(loader.current);
    return () => obs.disconnect();
  }, [loading]);

  return (
    <div style={{ padding: 16 }}>
      <h3>Infinite Scroll</h3>
      <ul>
        {items.map((i) => (
          <li key={i}>Item {i}</li>
        ))}
      </ul>
      <div ref={loader} style={{ height: 1 }} />
      {loading && <div>Loading more...</div>}
    </div>
  );
}
