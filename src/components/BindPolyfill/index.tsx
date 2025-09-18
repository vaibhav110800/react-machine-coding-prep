import React from "react";
import { bindPolyfill } from "../../utils/bindPolyfill";

function greet(this: any, message: string) {
  return `${this.name}: ${message}`;
}

export default function BindPolyfillDemo() {
  const bound = bindPolyfill(greet, { name: "Alice" }, "Hello");
  return (
    <div style={{ padding: 16 }}>
      <h3>bind() polyfill demo</h3>
      <div>{bound()}</div>
    </div>
  );
}
