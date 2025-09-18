import React from "react";
import { asyncRunner } from "../../utils/asyncGenerators";

export default function AsyncGeneratorsDemo() {
  async function run() {
    await asyncRunner(function* () {
      const a = yield Promise.resolve(1);
      const b = yield Promise.resolve(2);
      return a + b;
    });
    alert("done");
  }
  return (
    <div style={{ padding: 16 }}>
      <h3>Async via Generators</h3>
      <button onClick={run}>Run</button>
    </div>
  );
}
