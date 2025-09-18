import React, { useEffect, useState } from "react";

type Todo = { id: string; text: string; done: boolean };

const STORAGE_KEY = "rtodo:v1";

export default function TodoLocalStorage() {
  const [items, setItems] = useState<Todo[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage unavailable
    }
  }, [items]);

  function add() {
    if (!text.trim()) return;
    setItems((prev) => [
      { id: Date.now().toString(), text: text.trim(), done: false },
      ...prev,
    ]);
    setText("");
  }

  function toggle(id: string) {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div style={{ padding: 16 }}>
      <h3>Todo (LocalStorage)</h3>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={add}>Add</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => toggle(item.id)}
            />
            <span
              style={{ textDecoration: item.done ? "line-through" : undefined }}
            >
              {item.text}
            </span>
            <button onClick={() => remove(item.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
