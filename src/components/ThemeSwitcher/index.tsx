import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<
  { theme: Theme; toggle: () => void } | undefined
>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || "light"
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.style.setProperty(
      "--bg",
      theme === "dark" ? "#222" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--fg",
      theme === "dark" ? "#fff" : "#000"
    );
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

export default function ThemeSwitcherDemo() {
  return (
    <ThemeProvider>
      <Inner />
    </ThemeProvider>
  );
}

function Inner() {
  const { theme, toggle } = useTheme();
  return (
    <div
      style={{
        padding: 16,
        background: "var(--bg)",
        color: "var(--fg)",
        minHeight: 120,
      }}
    >
      <h3>Theme Switcher</h3>
      <div>Current: {theme}</div>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
