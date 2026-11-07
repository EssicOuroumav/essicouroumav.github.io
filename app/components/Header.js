"use client";
import { profile } from "../data";
import { useLang } from "../i18n";
import { withBase } from "../base";
import { LangSwitch, LiveClock, ThemeToggle } from "./ui";

const links = ["/#top", "/projets/", "/#journey", "/#contact"];

// Barre du haut (marque, heure, réglages) + pilule de navigation flottante en bas de l'écran.
export default function Header() {
  const { t } = useLang();
  return (
    <>
      <header className="top">
        <a href={withBase("/")} className="brand" aria-label={profile.name}>
          <span className="brand-mark" aria-hidden="true">
            CV
          </span>
          <span className="brand-name">
            Cisse <em>Vamourou</em>
          </span>
        </a>
        <p className="top-meta mono">
          <span className="dot" aria-hidden="true" />
          {t.status}
          <span className="sep" aria-hidden="true" />
          Abidjan <LiveClock timeZone={profile.timeZone} />
        </p>
        <div className="top-actions">
          <LangSwitch />
          <ThemeToggle />
        </div>
      </header>
      <nav className="dock" aria-label={t.menuLabel}>
        {links.map((href, i) => (
          <a key={href} href={withBase(href)}>
            {t.nav[i]}
          </a>
        ))}
      </nav>
    </>
  );
}
