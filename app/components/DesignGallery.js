"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { designCategories } from "../designs";
import { useLang } from "../i18n";
import { withBase } from "../base";

const total = designCategories.reduce((n, c) => n + c.items.length, 0);
// Quatre familles de formats : chaque grille a une proportion unique, les visuels y sont centrés.
const FAMILY = { portrait: "portrait", a4: "portrait", story: "portrait", square: "square", landscape: "landscape", wide: "landscape", tall: "tall" };
const FORMATS = ["portrait", "square", "landscape", "tall"];

// Regroupe les visuels d'une catégorie par famille de format, puis par client.
const byFormat = (items) =>
  FORMATS.map((f) => [f, items.filter((it) => FAMILY[it.f] === f).sort((a, b) => a.client.localeCompare(b.client))]).filter(([, list]) => list.length);

// Galerie « Design graphique » : une section par catégorie, puis un bloc par format,
// chaque visuel avec son titre, son client et sa nature. Vue agrandie au clic.
// Aucun lien externe : les visuels sont servis par le site lui-même.
export default function DesignGallery() {
  const { t, tr } = useLang();
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace("#", "");
      if (designCategories.some((c) => c.key === h)) setFilter(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const cats = filter === "all" ? designCategories : designCategories.filter((c) => c.key === filter);
  // Ordre d'affichage à plat (catégorie, puis format) pour naviguer dans la vue agrandie.
  const flat = useMemo(() => cats.flatMap((c) => byFormat(c.items).flatMap(([, list]) => list)), [cats]);
  const indexOf = new Map(flat.map((it, i) => [it.src, i]));

  const close = useCallback(() => setOpen(-1), []);
  const step = useCallback((d) => setOpen((i) => (i + d + flat.length) % flat.length), [flat.length]);

  useEffect(() => {
    if (open < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const cur = open >= 0 ? flat[open] : null;
  const label = (it) => `${tr(it.title)} · ${it.client}`;

  return (
    <section className="sec projects-page">
      <div className="pp-head">
        <p className="kicker mono">
          <span>({String(total).padStart(2, "0")})</span>
          {t.designKicker}
        </p>
        <h1 className="pp-title">{t.designH}</h1>
        <p className="sec-intro">{t.designIntro}</p>
      </div>
      <div className="filters dg-filters" role="group" aria-label={t.designFilters}>
        <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
          {t.designAll} <span className="mono">{total}</span>
        </button>
        {designCategories.map((c) => (
          <button key={c.key} type="button" aria-pressed={filter === c.key} onClick={() => setFilter(c.key)}>
            {tr(c.label)} <span className="mono">{c.items.length}</span>
          </button>
        ))}
      </div>

      {cats.map((c) => (
        <section key={c.key} className="dg-cat" aria-labelledby={`dg-${c.key}`}>
          <header className="dg-cat-head">
            <h2 id={`dg-${c.key}`}>{tr(c.label)}</h2>
            <p>
              <span className="mono">
                {c.items.length} {t.designVisuals}
              </span>
              {tr(c.desc)}
            </p>
          </header>
          {byFormat(c.items).map(([f, list]) => (
            <div key={f} className="dg-fmt">
              <p className="dg-fmt-label mono">
                {t.designFormats[f]} <span>{list.length}</span>
              </p>
              <ul className={`dg-grid dg-${f}`}>
                {list.map((it) => (
                  <li key={it.src}>
                    <button type="button" className="dg-card" onClick={() => setOpen(indexOf.get(it.src))} data-cursor="view" aria-label={`${t.designOpen} : ${label(it)}`}>
                      <span className="dg-media">
                        <img src={withBase(it.src)} alt="" width={it.w} height={it.h} loading="lazy" decoding="async" />
                      </span>
                      <span className="dg-info">
                        <b>{tr(it.title)}</b>
                        <span className="dg-meta">
                          <span>{it.client}</span>
                          <span className="dg-kind">{t.designKinds[it.k]}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      {cur && (
        <div className="dg-box" role="dialog" aria-modal="true" aria-label={label(cur)} onClick={close}>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={withBase(cur.src)} alt={label(cur)} width={cur.w} height={cur.h} />
            <figcaption>
              <b>{tr(cur.title)}</b>
              <span>
                {cur.client} · {t.designKinds[cur.k]} · {t.designFormats[FAMILY[cur.f]]}
              </span>
              <span className="mono">
                {open + 1} / {flat.length}
              </span>
            </figcaption>
          </figure>
          <button type="button" className="dg-btn dg-close" onClick={close} aria-label={t.designClose} autoFocus>
            <X size={22} aria-hidden="true" />
          </button>
          <button type="button" className="dg-btn dg-prev" onClick={(e) => (e.stopPropagation(), step(-1))} aria-label={t.designPrev}>
            <ArrowLeft size={22} aria-hidden="true" />
          </button>
          <button type="button" className="dg-btn dg-next" onClick={(e) => (e.stopPropagation(), step(1))} aria-label={t.designNext}>
            <ArrowRight size={22} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
