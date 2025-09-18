import React from "react";
import { once } from "../../utils/once";

export default function OnceDemo() {
  const fn = once(() => console.log("only once"));
  return (
    <div style={{ padding: 16 }}>
      <h3>Once Demo</h3>
      <button onClick={() => fn()}>Call once</button>
    </div>
  );
}
