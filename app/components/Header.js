"use client";
import { profile } from "../data";
import { useLang } from "../i18n";
import { withBase } from "../base";
import { LangSwitch, LiveClock, ThemeToggle } from "./ui";

const links = ["/#top", "/projets/", "/#journey", "/#contact"];

// Barre du haut en pilules (comme la référence) ; posée sur le hero rouge de l'accueil.
export default function Header() {
  const { t } = useLang();
  return (
    <header className="top">
      <nav className="top-left" aria-label={t.menuLabel}>
        <a href={withBase("/")} className="avatar" aria-label={profile.name}>
          <img src={withBase(profile.photo)} alt="" width="80" height="80" />
        </a>
        {links.slice(0, 3).map((href, i) => (
          <a key={href} className="pill" href={withBase(href)}>
            {t.nav[i]}
          </a>
        ))}
      </nav>
      <a href={withBase("/")} className="wordmark">
        <span className="wordmark-dot" aria-hidden="true" />
        cisse<b>vamourou</b>
      </a>
      <div className="top-right">
        <span className="pill ghost clock mono">
          ABJ <LiveClock timeZone={profile.timeZone} />
        </span>
        <a className="pill" href={withBase(links[3])}>
          {t.nav[3]}
        </a>
        <LangSwitch />
        <ThemeToggle />
      </div>
    </header>
  );
}
