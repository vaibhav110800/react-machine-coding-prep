import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = { id: string; text: string; done: boolean };
const todoSlice = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {
    add: (state, action: PayloadAction<{ text: string }>) => {
      state.unshift({
        id: Date.now().toString(),
        text: action.payload.text,
        done: false,
      });
    },
    toggle: (state, action: PayloadAction<{ id: string }>) => {
      const t = state.find((s) => s.id === action.payload.id);
      if (t) t.done = !t.done;
    },
    remove: (state, action: PayloadAction<{ id: string }>) =>
      state.filter((s) => s.id !== action.payload.id),
  },
});

export const { add, toggle, remove } = todoSlice.actions;
export default todoSlice.reducer;
