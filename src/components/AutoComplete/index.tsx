import React, { useEffect, useRef, useState } from "react";
import useDebouncedValue from "../../hooks/useDebouncedValue";

export default function AutoComplete() {
  const [q, setQ] = useState("");
  const debounced = useDebouncedValue(q, 300);
  const [list, setList] = useState<string[]>([]);
  const [index, setIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!debounced) return setList([]);
    fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(
        debounced
      )}&per_page=5`
    )
      .then((r) => r.json())
      .then((json) => setList((json.items || []).map((i: any) => i.login)))
      .catch(() => setList([]));
  }, [debounced]);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown")
      setIndex((i) => Math.min(i + 1, list.length - 1));
    if (e.key === "ArrowUp") setIndex((i) => Math.max(i - 1, 0));
    if (e.key === "Enter" && index >= 0) {
      setQ(list[index]);
      setList([]);
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h3>AutoComplete</h3>
      <input
        value={q}
        ref={inputRef}
        onChange={(e) => {
          setQ(e.target.value);
          setIndex(-1);
        }}
        onKeyDown={onKey}
        aria-autocomplete="list"
        aria-controls="suggestions"
      />
      <ul id="suggestions" role="listbox">
        {list.map((item, i) => (
          <li
            key={item}
            role="option"
            aria-selected={i === index}
            style={{ background: i === index ? "#eee" : undefined }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
