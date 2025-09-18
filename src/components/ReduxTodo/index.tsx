import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { add, toggle, remove } from "../../store/todos";

export default function ReduxTodo() {
  const [text, setText] = useState("");
  const todos = useSelector((s: RootState) => (s as any).todos as any[]);
  const dispatch = useDispatch();
  return (
    <div style={{ padding: 16 }}>
      <h3>Redux Todo</h3>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button
        onClick={() => {
          if (text.trim()) {
            dispatch(add({ text: text.trim() }));
            setText("");
          }
        }}
      >
        Add
      </button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => dispatch(toggle({ id: t.id }))}
            />
            <span
              style={{ textDecoration: t.done ? "line-through" : undefined }}
            >
              {t.text}
            </span>
            <button onClick={() => dispatch(remove({ id: t.id }))}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
