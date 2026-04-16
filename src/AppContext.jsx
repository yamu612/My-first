import React, { createContext, useContext, useState } from "react";
import translations from "./translations";

const AppContext = createContext();

export const themes = {
  blue:   { name: "Blue",   primary: "#2563eb", hover: "#1d4ed8", light: "#eff6ff", surface: "#f0f4f8" },
  green:  { name: "Green",  primary: "#16a34a", hover: "#15803d", light: "#f0fdf4", surface: "#f0fdf4" },
  purple: { name: "Purple", primary: "#7c3aed", hover: "#6d28d9", light: "#f5f3ff", surface: "#faf5ff" },
  orange: { name: "Orange", primary: "#ea580c", hover: "#c2410c", light: "#fff7ed", surface: "#fff7ed" },
};

export function AppProvider({ children }) {
  const [language, setLanguage] = useState("english");
  const [themeName, setThemeName] = useState("blue");

  const t = translations[language];
  const theme = themes[themeName];

  return (
    <AppContext.Provider value={{ language, setLanguage, themeName, setThemeName, t, theme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
