import React, { useEffect, useState } from "react";
import { throttle } from "../../utils/throttle";

export default function ThrottleDemo() {
  const [x, setX] = useState(0);
  useEffect(() => {
    const onMove = throttle((e: MouseEvent) => setX(e.clientX), 100);
    window.addEventListener("mousemove", onMove as EventListener);
    return () =>
      window.removeEventListener("mousemove", onMove as EventListener);
  }, []);
  return (
    <div style={{ padding: 16 }}>
      <h3>Throttle Demo</h3>
      <div>Mouse X: {x}</div>
    </div>
  );
}
