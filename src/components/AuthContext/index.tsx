import React, { createContext, useContext, useReducer } from "react";

type State = { user: { name: string } | null };
type Action = { type: "login"; payload: { name: string } } | { type: "logout" };

const AuthContext = createContext<any>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "login":
      return { user: action.payload };
    case "logout":
      return { user: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { user: null });
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function AuthContextDemo() {
  return (
    <AuthProvider>
      <Inner />
    </AuthProvider>
  );
}

function Inner() {
  const { state, dispatch } = useContext(AuthContext);
  return (
    <div style={{ padding: 16 }}>
      <h3>Auth Context</h3>
      <div>User: {state.user ? state.user.name : "None"}</div>
      <button
        onClick={() =>
          dispatch({ type: "login", payload: { name: "Vaibhav" } })
        }
      >
        Login
      </button>
      <button onClick={() => dispatch({ type: "logout" })}>Logout</button>
    </div>
  );
}
