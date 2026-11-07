"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { dict } from "./dict";

export { dict };

const LangContext = createContext({ lang: "fr", t: dict.fr, setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState("fr");

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem("lang");
    } catch {}
    const browser = (navigator.language || "fr").toLowerCase().startsWith("fr") ? "fr" : "en";
    const initial = saved === "fr" || saved === "en" ? saved : browser;
    if (initial !== "fr") setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {}
  };

  return <LangContext.Provider value={{ lang, t: dict[lang], setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  // tr() accepte une chaîne simple ou un objet { fr, en }.
  const tr = (v) => (v && typeof v === "object" ? v[ctx.lang] ?? v.fr : v);
  return { ...ctx, tr };
}
