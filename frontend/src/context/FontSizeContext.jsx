import { createContext, useContext, useState, useEffect } from "react";

const FontSizeContext = createContext();

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error("useFontSize must be used within a FontSizeProvider");
  }
  return context;
};

const MIN_SIZE = 12;
const MAX_SIZE = 22;
const DEFAULT_SIZE = 16;
const STEP = 1;

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(() => {
    try {
      const stored = localStorage.getItem("fontSize");
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed >= MIN_SIZE && parsed <= MAX_SIZE) {
        return parsed;
      }
    } catch (_) {}
    return DEFAULT_SIZE;
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  const increase = () =>
    setFontSize((prev) => Math.min(prev + STEP, MAX_SIZE));

  const decrease = () =>
    setFontSize((prev) => Math.max(prev - STEP, MIN_SIZE));

  const reset = () => setFontSize(DEFAULT_SIZE);

  return (
    <FontSizeContext.Provider
      value={{ fontSize, increase, decrease, reset, MIN_SIZE, MAX_SIZE }}
    >
      {children}
    </FontSizeContext.Provider>
  );
};
