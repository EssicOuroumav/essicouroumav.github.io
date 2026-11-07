"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "../i18n";
import { LangSwitch, ThemeToggle } from "./ui";

const anchors = ["#services", "#work", "#tools", "#journey"];

export default function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="top">
      <div className="bar">
        <a href="/#top" className="brand" onClick={() => setOpen(false)}>
          Cisse<span>Vamourou</span>
        </a>
        <nav className={open ? "nav open" : "nav"} id="main-nav">
          {anchors.map((href, i) => (
            <a key={href} href={`/${href}`} onClick={() => setOpen(false)}>
              {t.nav[i]}
            </a>
          ))}
          <a className="btn solid sm nav-cta" href="/#contact" onClick={() => setOpen(false)}>
            {t.contact}
          </a>
        </nav>
        <div className="actions">
          <LangSwitch />
          <ThemeToggle />
          <a className="btn solid sm bar-cta" href="/#contact">
            {t.contact}
          </a>
          <button
            type="button"
            className="icon-btn burger"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? t.close : t.menu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
