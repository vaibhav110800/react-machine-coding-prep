import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { increment, decrement, reset } from "../../store";

export default function ReduxCounter() {
  const value = useSelector((s: RootState) => s.counter.value);
  const dispatch = useDispatch();
  return (
    <div style={{ padding: 16 }}>
      <h3>Redux Counter</h3>
      <div>{value}</div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>reset</button>
    </div>
  );
}
